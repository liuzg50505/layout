namespace LayoutLzg{
    export abstract class ControlBase extends Control {
        constructor(name:string) {
            super(name);
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).css("box-sizing","border-box")
            }
            return this.rootElem;
        }


        calculateWidthFromTop(): void {
        }

        calculateHeightFromTop(): void {
        }

        calculateWidthFromBottom(): void {
        }

        calculateHeightFromBottom(): void {
        }

        dispose(): void {
        }
    }
}