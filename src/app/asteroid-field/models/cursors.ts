export interface Cursors {
    left: Events
    right: Events
    up: Events
    down: Events
}

interface Events {
    isDown: boolean
}