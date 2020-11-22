/// <reference types="@types/dom-mediacapture-record" />

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { IDBService } from "@app/core/services/idb.service";
import { WebsocketService } from "@shared/services/websocket.service";

@Component({
    selector: "app-report",
    templateUrl: "./report.component.html",
    styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit {
    video: any;
    recorder: any;
    recording = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public iDBService: IDBService,
        public websocketService: WebsocketService
    ) { }

    ngOnInit(): void {
        // setTimeout( () => this.next(), 2000);
        let button = document.querySelector(".record-button");

        button.addEventListener("touchstart", (event) => {
            this.start()
        });

        button.addEventListener("touchend", (event) => {
            this.stop()
        });

        this.video = document.querySelector("#video");
        const rect = this.video.getBoundingClientRect()

        const width = rect.width > rect.height ? rect.width : rect.height
        const height = rect.width > rect.height ? rect.height : rect.width
        navigator.mediaDevices.getUserMedia({
            video: {
                width,
                height
            },
            audio: true
        }).then(stream => {
            this.video.srcObject = stream;
            this.video.play()
            this.video.captureStream = this.video.captureStream || this.video.mozCaptureStream;
            return new Promise(resolve => this.video.onplaying = resolve);
        })


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
            this.video.srcObject.getTracks().forEach((track: { stop: () => any; }) => track.stop());
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
        this.startRecording(this.video.captureStream())
            .then(recordedChunks => {
                let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
                recordedBlob.arrayBuffer().then(text => {
                    this.iDBService.insert("report", {
                        key: "video",
                        value: text
                    })
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
