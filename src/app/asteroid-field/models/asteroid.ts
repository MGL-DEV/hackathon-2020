
import { Args, Load, Player, Cursors, Item } from "./index"
import CanvasLoadImages from "./canvas-load-images"

export default class Asteroid {
    load: Load
    args: Args
    ctx: any
    player: Player
    asteroids: Item[]
    cursors: Cursors
    backgroundSpeed = 1.0
    backgroundHeight = 0
    backgroundFogSpeed = 1.5
    backgroundFogHeight = 0
    lastAsteroidCreated = 0
    constructor(args: Args) {
        this.load = new CanvasLoadImages();
        this.asteroids = []
        this.cursors = {
            left: { isDown: false},
            right: { isDown: false},
            up: { isDown: false},
            down: { isDown: false},
        }

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

        window.addEventListener("resize", this.resizeCanvas.bind(this), false);
        window.addEventListener("keydown", this.keydown.bind(this), false)
        window.addEventListener("keyup", this.keyup.bind(this), false)
        window.addEventListener("deviceorientation", this.handleOrientation.bind(this), true);

        this.ctx = this.args.scale.canvasObject.getContext("2d")


        this.createPlayer()

        this.generateAsteroid();
    }

    update(): void {
        this.ctx.clearRect(0, 0, this.args.scale.canvasObject.width, this.args.scale.canvasObject.height)

        this.renderBackground()
        this.playerMovement()

        /** Player */
        this.renderShip(this.player)
        /** Objects */
        if(this.asteroids !== undefined && this.asteroids.length > 0) {
            let i = this.asteroids.length - 1
            for(i; i > -1; --i) {
                const a = this.asteroids[i];

                if(a.coord.y > this.args.scale.canvasObject.height) {
                    this.asteroids.splice(this.asteroids.indexOf(a), 1)
                }

                a.coord.y += a.speed

                this.renderAsteroid(a)

                this.collision(a)
            }
        }

        if(this.asteroids.length < 4) {
            this.generateAsteroid();
        }

        window.requestAnimationFrame(this.update.bind(this))
    }

    playerMovement():void {
        if(this.cursors.left.isDown === true) {
            this.player.coord.x -= this.player.speed
        }
        if(this.cursors.right.isDown === true) {
            this.player.coord.x += this.player.speed
        }
        if(this.cursors.up.isDown === true) {
            this.player.coord.y -= this.player.speed
        }
        if(this.cursors.down.isDown === true) {
            this.player.coord.y += this.player.speed
        }
        if(this.player.coord.x < 0) this.player.coord.x = 0
        if(this.player.coord.x > this.args.scale.canvasObject.width - this.player.size.width) {
            this.player.coord.x = this.args.scale.canvasObject.width - this.player.size.width
        }
    }

    renderBackground():void {
        const background = this.load.images.background
        this.ctx.drawImage(
            background.image,
            0,
            0,
            this.args.scale.canvasObject.width,
            this.args.scale.canvasObject.height
        )
        this.renderFogBackground()
        this.renderStarBackground()
    }

    renderFogBackground(): void {
        const fogBackground = this.load.images.fog_background
        const imageHigherThanScreen = fogBackground.width > this.args.scale.canvasObject.width
        this.ctx.drawImage(
            fogBackground.image,
            imageHigherThanScreen ? fogBackground.width / 2 * -1 : 0,
            this.backgroundFogHeight,
            imageHigherThanScreen ? fogBackground.width : this.args.scale.canvasObject.width,
            this.args.scale.canvasObject.height
        )

        this.ctx.drawImage(
            fogBackground.image,
            imageHigherThanScreen ? fogBackground.width / 2 * -1 : 0,
            this.backgroundFogHeight - this.args.scale.canvasObject.height,
            imageHigherThanScreen ? fogBackground.width : this.args.scale.canvasObject.width,
            this.args.scale.canvasObject.height
        )

        this.backgroundFogHeight += this.backgroundFogSpeed;

        if(this.backgroundFogHeight >= this.args.scale.canvasObject.height) {
            this.backgroundFogHeight = 0
        }
    }

    renderStarBackground(): void {
        const starBackground = this.load.images.star_background
        const imageHigherThanScreen = starBackground.width > this.args.scale.canvasObject.width
        this.ctx.drawImage(
            starBackground.image,
            imageHigherThanScreen ? starBackground.width / 2 * -1 : 0,
            this.backgroundHeight,
            imageHigherThanScreen ? starBackground.width : this.args.scale.canvasObject.width,
            this.args.scale.canvasObject.height
        )

        this.ctx.drawImage(
            starBackground.image,
            imageHigherThanScreen ? starBackground.width / 2 * -1 : 0,
            this.backgroundHeight - this.args.scale.canvasObject.height,
            imageHigherThanScreen ? starBackground.width : this.args.scale.canvasObject.width,
            this.args.scale.canvasObject.height
        )

        this.backgroundHeight += this.backgroundSpeed;

        if(this.backgroundHeight >= this.args.scale.canvasObject.height) {
            this.backgroundHeight = 0
        }
    }

    createPlayer() {

        const asset = this.load.images.ship
        this.player = {
            health: 100,
            speed: 5,
            assets: "ship",
            isDead: false,
            coord: {
                x: (this.args.scale.canvasObject.width / 2) - (asset.size.width / 2),
                y: this.args.scale.canvasObject.height - asset.size.height - 40
            },
            size: {
                width: asset.size.width,
                height: asset.size.height
            }
        }
    }

    resizeCanvas() {
        this.args.scale.canvasObject.width = window.innerWidth
        this.args.scale.canvasObject.height = window.innerHeight
    }

    createCollisionEvent() {
        const event = new Event("shipDestroyed");
        window.dispatchEvent(event);
    }

    collision(asteroid: Item): void {

        if(asteroid.coord.x < this.player.coord.x &&
            (asteroid.coord.x + asteroid.size.width) > this.player.coord.x &&
            asteroid.coord.y < this.player.coord.y &&
            asteroid.coord.y + asteroid.size.height > this.player.coord.y
            ) {
            this.createCollisionEvent()
        }

        if(asteroid.coord.x < this.player.coord.x + this.player.size.width &&
            (asteroid.coord.x + asteroid.size.width) > this.player.coord.x + this.player.size.width &&
            asteroid.coord.y < this.player.coord.y &&
            asteroid.coord.y + asteroid.size.height > this.player.coord.y
            ) {
            this.createCollisionEvent()
        }

        if(asteroid.coord.x < this.player.coord.x &&
            (asteroid.coord.x + asteroid.size.width) > this.player.coord.x &&
            asteroid.coord.y < this.player.coord.y + this.player.size.height &&
            asteroid.coord.y + asteroid.size.height > this.player.coord.y + this.player.size.height
            ) {
            this.createCollisionEvent()
        }

        if(asteroid.coord.x < this.player.coord.x + this.player.size.width &&
            (asteroid.coord.x + asteroid.size.width) > this.player.coord.x + this.player.size.width &&
            asteroid.coord.y < this.player.coord.y + this.player.size.height &&
            asteroid.coord.y + asteroid.size.height > this.player.coord.y + this.player.size.height
            ) {
            this.createCollisionEvent()
        }
    }

    generateAsteroid(): boolean {
        if((Date.now() - this.lastAsteroidCreated) < 1500) {
            return false
        }

        const asteroidId = this.getRandom(1,4)
        const asteroidKey = `asteorid_${asteroidId}`

        if(this.load.images[asteroidKey] === undefined) {
            throw new Error("no asset found")
        }

        try {
            navigator.vibrate(100)
        } catch (error) { }

        this.lastAsteroidCreated = Date.now()
        const asset = this.load.images[asteroidKey]
        const x = this.getRandom(asset.size.width / 3, this.args.scale.canvasObject.width - asset.size.width - asset.size.width / 3)
        const y = -200
        const speed = this.getRandom(4, 5)

        this.asteroids.push({
            speed,
            assets: asteroidKey,
            coord: {
                x,
                y
            },
            size: {
                width: asset.size.width,
                height: asset.size.height
            }
        })
        return true
    }


    getRandom(min: number, max: number) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    handleOrientation(e: DeviceOrientationEvent) {
        if(e.gamma < - 5) {
            this.cursors.left.isDown = true
        } else {
            this.cursors.left.isDown = false
        }

        if(e.gamma > 5) {
            this.cursors.right.isDown = true
        } else {
            this.cursors.right.isDown = false
        }
    }

    keyup(e: KeyboardEvent): void {
        switch(e.key) {
            case "ArrowRight": {
                this.cursors.right.isDown = false
                break
            }
            case "ArrowUp": {
                this.cursors.up.isDown = false
                break
            }
            case "ArrowLeft": {
                this.cursors.left.isDown = false
                break
            }
            case "ArrowDown": {
                this.cursors.down.isDown = false
                break
            }
        }
    }

    keydown(e: KeyboardEvent): void {
        switch(e.key) {
            case "ArrowRight": {
                this.cursors.right.isDown = true
                break
            }
            case "ArrowUp": {
                this.cursors.up.isDown = true
                break
            }
            case "ArrowLeft": {
                this.cursors.left.isDown = true
                break
            }
            case "ArrowDown": {
                this.cursors.down.isDown = true
                break
            }
        }
    }

    renderAsteroid(object: Item): void {
        if(this.load.images[object.assets] !== undefined) {
            const assets = this.load.images[object.assets]
            /*this.ctx.beginPath();
            this.ctx.rect(object.coord.x, object.coord.y, object.size.width, object.size.height);
            this.ctx.stroke();*/
            this.ctx.drawImage(
                assets.image,
                object.coord.x,
                object.coord.y,
                object.size.width,
                object.size.height
            )
        } else {
            throw new Error("Object assets not loaded.")
        }
    }

    renderShip(object: Player): void {
        if(this.load.images[object.assets] !== undefined) {
            const assets = this.load.images[object.assets]
            this.ctx.drawImage(
                assets.image,
                object.coord.x,
                object.coord.y,
                object.size.width,
                object.size.height
            )
        } else {
            throw new Error("player assets not loaded.")
        }
    }
}