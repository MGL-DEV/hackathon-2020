export default interface Args {
    requiredSpeed: number;
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