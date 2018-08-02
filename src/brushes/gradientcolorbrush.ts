namespace LayoutLzg{

    export class GradientColorBrush implements Brush{
        color:string;
        constructor(color:string){
            this.color = color;
        }

        applyToBackground(elem: HTMLElement): void {
        }

        applyToBorder(elem: HTMLElement, thickness: LayoutLzg.Thickness): void {
        }

        applyToBorderLeft(elem: HTMLElement, thickness: number): void {
        }

        applyToBorderRight(elem: HTMLElement, thickness: number): void {
        }

        applyToBorderTop(elem: HTMLElement, thickness: number): void {
        }

        applyToBorderBottom(elem: HTMLElement, thickness: number): void {
        }
    }

}