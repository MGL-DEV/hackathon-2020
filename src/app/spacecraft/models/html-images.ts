export interface HtmlImages {
    [name: string]: {
        image: HTMLImageElement,
        size: { width: number, height: number}
    };
}