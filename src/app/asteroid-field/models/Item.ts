export interface Item {
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