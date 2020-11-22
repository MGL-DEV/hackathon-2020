
import { Args, Load } from "./index"
import CanvasLoadImages from "./canvas-load-images"

class Canvas {
    load: Load
    args: Args
    ctx: any
    radius = 35
    cursor: {
        isDown: boolean
    }
    constructor(args: Args) {
        this.load = new CanvasLoadImages();
        this.cursor = {
            isDown: false,
        }
        this.args = args;
        this.preload();
    }

    /** Defines only images */
    preload(): void {
        for (let item of this.args.images) {
            this.load.add(item.key, item.value)
        }

        this.load.onLoadedImages(() => {
            this.create()
        })
    }

    create(): void {
        if(!this.args.scale.canvasObject) {
            throw new Error("canvas not set")
        }

        if(this.args.scale.width !== undefined) {
            this.args.scale.canvasObject.width = this.args.scale.width
        }

        if(this.args.scale.height !== undefined) {
            this.args.scale.canvasObject.height = this.args.scale.height
        }
        window.addEventListener("touchstart", this.touchDownEvent.bind(this), false);
        window.addEventListener("mousedown", this.mouseDownEvent.bind(this), false);
        window.addEventListener("mouseup", this.eventUp.bind(this), false);
        window.addEventListener("touchend", this.eventUp.bind(this), false);

        window.addEventListener("touchmove", this.touchMoveEvent.bind(this), {passive: false });
        window.addEventListener("mousemove", this.mouseMoveEvent.bind(this), false);
        window.addEventListener("resize", this.resizeCanvas.bind(this), false);

        const ctx = this.args.scale.canvasProc.getContext("2d")
        ctx.drawImage(this.load.images.mask.image,
            0,
            0,
            this.args.scale.canvasProc.width,
            this.args.scale.canvasProc.height
        );

        this.ctx = this.args.scale.canvasObject.getContext("2d")
        this.ctx.drawImage(this.load.images.mask.image,
            0,
            0,
            this.args.scale.canvasObject.width,
            this.args.scale.canvasObject.height
        );
        this.ctx.globalCompositeOperation = "destination-out";
    }

    fullAmount(stride: number): number {
        let i: number
        let l: number
        let can = this.args.scale.canvasProc
        let ctx = can.getContext("2d");
        let count: number
        let total: number
        let pixels: any
        let pdata: any

        if (!stride || stride < 1) {
            stride = 1;
        }

        stride *= 10; // 4 elements per pixel

        pixels = ctx.getImageData(0, 0, can.width, can.height)

        pdata = pixels.data;
        l = pdata.length; // 4 entries per pixel

        total = (l / stride) || 0;

        for (i = count = 0; i < l; i += stride) {
            if (pdata[i] !== 0) {
                count++;
            }
        }
        return count / total;
    };

    eventUp() {
        this.cursor.isDown = false
    }

    mouseDownEvent(e: MouseEvent): void {
        this.eventDown({
            x: e.clientX,
            y: e.clientY
        })
    }

    touchDownEvent(e: TouchEvent): void {
        this.eventDown({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        })
    }

    eventDown(coord: { x: number, y: number }): void {
        this.cursor.isDown = true
        this.eventMove(coord)
    }

    mouseMoveEvent(e: MouseEvent): void {
        this.eventMove({
            x: e.clientX,
            y: e.clientY
        })
    }

    touchMoveEvent(e: TouchEvent): void {
        e.preventDefault()
        this.eventMove({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        })
    }

    eventMove(coord: { x: number, y: number }): boolean {
        if(this.cursor.isDown === false) return false
        const canvasCoord = this.getCoord(coord)
        this.erase(canvasCoord)
    }

    getCoord(coord: { x: number, y: number }):{ x: number, y: number } {
        const r = this.args.scale.canvasObject.getBoundingClientRect();
        return { x: coord.x - r.left, y: coord.y - r.top }
    }

    erase(coord: { x: number, y: number }) {
        const ctx = this.args.scale.canvasProc.getContext("2d")
        ctx.beginPath();
        ctx.arc(coord.x, coord.y- 270, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(coord.x, coord.y, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();

        let proc = (this.fullAmount(32) * 100) || 0
        if(proc < 18) {
            this.createCollisionEvent()
        }
    }

    createCollisionEvent() {
        const event = new Event("successWipe");
        window.dispatchEvent(event);
    }

    resizeCanvas() {
        this.args.scale.canvasObject.width = window.innerWidth
        this.args.scale.canvasObject.height = window.innerHeight
    }
}
export default Canvas