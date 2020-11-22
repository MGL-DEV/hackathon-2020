/// <reference types="@types/dom-mediacapture-record" />

import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { IDBService } from "@app/core/services/idb.service";
import { WebsocketService } from "@shared/services/websocket.service";

@Component({
    selector: "app-report",
    templateUrl: "./report.component.html",
    styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit, AfterViewInit {
    @ViewChild("video")
    video: ElementRef;
    recorder: any;
    recording = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public iDBService: IDBService,
        public websocketService: WebsocketService
    ) { }

    ngAfterViewInit(): void {
        const rect = this.video.nativeElement.getBoundingClientRect()

        const width = rect.width > rect.height ? rect.width : rect.height
        const height = rect.width > rect.height ? rect.height : rect.width
        navigator.mediaDevices.getUserMedia({
            video: {
                width,
                height
            }
        }).then(stream => {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play()
            this.video.nativeElement.captureStream = this.video.nativeElement.captureStream || this.video.nativeElement.mozCaptureStream;
            return new Promise(resolve => this.video.nativeElement.onplaying = resolve);
        })
    }

    ngOnInit(): void {
    }
    startRecording(stream: any): any {
        this.recorder = new MediaRecorder(stream);
        let data: any = [];

        this.recorder.ondataavailable = (event: { data: any; }) => data.push(event.data);
        this.recorder.start();

        let stopped = new Promise((resolve, reject) => {
            this.recorder.onstop = resolve;
            this.recorder.onerror = (event: { name: any; }) => reject(event.name);
        });

        this.wait(10000).then(
            () => this.recorder.state === "recording" && this.stop()
        );

        return Promise.all([
            stopped
        ])
            .then(() => data);
    }
    wait(delay: number): any {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    stop(): void {
        setTimeout(() => {
            this.video.nativeElement.srcObject.getTracks().forEach((track: { stop: () => any; }) => track.stop());
            this.recording = false;
            this.websocketService.send({
                status: 3
            })
            console.log("Recording stopped")
        }, 1000)
    }
    start(): void {
        console.log("Recording started")
        this.recording = true;
        this.toggleRec();
        this.startRecording(this.video.nativeElement.captureStream())
            .then(recordedChunks => {
                let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
                recordedBlob.arrayBuffer().then(text => {
                    this.iDBService.insert("report", {
                        key: "video",
                        value: text
                    })
                    this.next()
                });
            });
    }
    toggleRec(): void {
        let rec = (document.querySelector("#rec") as HTMLElement);
        if (rec.style.display === "none") {
            rec.style.display = "block";
        } else {
            rec.style.display = "none";
        }
        setTimeout(() => {
            if (this.recording) {
                this.toggleRec()
            } else {
                rec.style.display = "none";
            }
        }, 1000)
    }
    next(): void {
        this.router.navigateByUrl("/jsm9000/report-success");
    }

}
