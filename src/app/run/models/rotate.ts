
import { Args, Load } from "./index"
import CanvasLoadImages from "./canvas-load-images"

export default class Rotate {
    load: Load
    args: Args
    ctx: any
    radius = 35
    angleSpeed = 0.0
    requiredSpeed = 0.5
    constructor(args: Args) {
        this.requiredSpeed = args.requiredSpeed
        this.load = new CanvasLoadImages();
        this.args = args;
        this.preload();
    }

    /** Defines only images */
    preload(): void {
        for (let item of this.args.images) {
            this.load.add(item.key, item.value, item.size)
        }

        this.load.onLoadedImages(() => {
            this.create()

            window.requestAnimationFrame(this.update.bind(this))
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

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position):void => {
                this.angleSpeed = position.coords.speed
            }, (error) => {
                console.log(error)
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        }

        window.addEventListener("resize", this.resizeCanvas.bind(this), false);

        this.ctx = this.args.scale.canvasObject.getContext("2d")
    }

    update(): void {
        this.ctx.clearRect(0, 0, this.args.scale.canvasObject.width, this.args.scale.canvasObject.height)
        const asset = this.load.images.ship

        this.ctx.save();
        const cx = (this.args.scale.canvasObject.width / 2)
        const cy = (this.args.scale.canvasObject.height / 2) - 125

        this.ctx.translate(
            cx,
            cy
        );
        this.ctx.rotate(Math.PI / 180 * (this.radius += this.angleSpeed));
        this.ctx.translate(
            cx * - 1,
            cy * - 1
        );
        this.ctx.drawImage(
            this.load.images.ship.image,
            (this.args.scale.canvasObject.width / 2) - (asset.size.width / 2),
            (this.args.scale.canvasObject.height / 2) - (asset.size.height - 50),
            asset.size.width,
            asset.size.height
        )

        this.ctx.restore();

        window.requestAnimationFrame(this.update.bind(this))
    }

    resizeCanvas() {
        this.args.scale.canvasObject.width = window.innerWidth
        this.args.scale.canvasObject.height = window.innerHeight
    }
}