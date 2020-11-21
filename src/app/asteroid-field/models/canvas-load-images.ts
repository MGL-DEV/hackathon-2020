import { HtmlImages } from "./index"

class CanvasLoadImages {
    images: HtmlImages = {}
    count = 0
    loadedCount = 0

    // tslint:disable-next-line: ban-types
    onLoadedImages(callback: Function): void {
        window.addEventListener("loadedImages", () => {
            if(typeof callback === "function") {
                callback()
            }
        })
    }

    add(key: string, fileSrc: string, size: { width: number, height: number}): void {
        this.count++

        const image = new Image()
        image.src = fileSrc
        image.onload = () => {
            this.images[key] = {
                image,
                size
            }
            this.loadedCount++

            if(this.loadedCount === this.count) {
                const event = new Event("loadedImages")
                window.dispatchEvent(event)
            }
        }
    }
}

export default CanvasLoadImages