export default interface Args {
    asteroids: Item[]
    scale: Scale;
    images: Images[];
}

interface Scale {
    canvasObject: HTMLCanvasElement
    width: number
    height: number
}

interface Size {
    width: number;
    height: number;
};

interface Images {
    key: string
    value: string
    size: Size
}

interface Item {
    speed: number,
    assets: string,
    coord: Coord,
    size: Size
}

interface Size {
    width: number,
    height: number
}

interface Coord {
    x: number,
    y: number
}