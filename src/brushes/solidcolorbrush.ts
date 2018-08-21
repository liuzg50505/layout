namespace LayoutLzg{

    export class SolidColorBrush implements Brush{
        color:string;
        constructor(color:string){
            this.color = color;
        }

        applyToBackground(elem: HTMLElement): void {
            css(elem,"background-color", this.color);
        }

        applyToBorder(elem: HTMLElement, thickness: LayoutLzg.Thickness): void {
            css(elem,"border-color", this.color);

            css(elem,"border-left-width", thickness.left+"px");
            css(elem,"border-right-width", thickness.right+"px");
            css(elem,"border-top-width", thickness.top+"px");
            css(elem,"border-bottom-width", thickness.bottom+"px");

            css(elem,"border-left-style", "solid");
            css(elem,"border-right-style", "solid");
            css(elem,"border-top-style", "solid");
            css(elem,"border-bottom-style", "solid");
        }

        applyToBorderLeft(elem: HTMLElement, thickness: number): void {
            css(elem,"border-color", this.color);
            css(elem,"border-left-width", thickness+"px");
            css(elem,"border-left-style", "solid");
        }

        applyToBorderRight(elem: HTMLElement, thickness: number): void {
            css(elem,"border-color", this.color);
            css(elem,"border-right-width", thickness+"px");
            css(elem,"border-right-style", "solid");
        }

        applyToBorderTop(elem: HTMLElement, thickness: number): void {
            css(elem,"border-color", this.color);
            css(elem,"border-top-width", thickness+"px");
            css(elem,"border-top-style", "solid");
        }

        applyToBorderBottom(elem: HTMLElement, thickness: number): void {
            css(elem,"border-color", this.color);
            css(elem,"border-bottom-width", thickness+"px");
            css(elem,"border-bottom-style", "solid");
        }
    }

}