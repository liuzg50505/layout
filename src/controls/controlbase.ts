namespace LayoutLzg{
    export abstract class ControlBase extends Control {
        constructor(name:string) {
            super(name);
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = createElement("DIV");
                css(this.rootElem,"box-sizing","border-box");
                css(this.rootElem,"pointer-events","all");
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