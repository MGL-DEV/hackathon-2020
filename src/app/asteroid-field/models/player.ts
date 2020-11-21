export interface Player {
    health: number,
    speed: number,
    isDead: boolean,
    assets: string,
    coord: PlayerCoord,
    size: PlayerSize
}

interface PlayerSize {
    width: number,
    height: number
}

interface PlayerCoord {
    x: number,
    y: number
}