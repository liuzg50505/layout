namespace LayoutLzg{

    export class SolidColorBrush implements Brush{
        color:string;
        constructor(color:string){
            this.color = color;
        }

        applyToBackground(elem: HTMLElement): void {
            $(elem).css("background-color", this.color);
        }

        applyToBorder(elem: HTMLElement, thickness: LayoutLzg.Thickness): void {
            $(elem).css("border-color", this.color);

            $(elem).css("border-left-width", thickness.left+"px");
            $(elem).css("border-right-width", thickness.right+"px");
            $(elem).css("border-top-width", thickness.top+"px");
            $(elem).css("border-bottom-width", thickness.bottom+"px");

            $(elem).css("border-left-style", "solid");
            $(elem).css("border-right-style", "solid");
            $(elem).css("border-top-style", "solid");
            $(elem).css("border-bottom-style", "solid");
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