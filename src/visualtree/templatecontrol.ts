namespace LayoutLzg {

    export class TemplateControl extends Control {

        constructor(name: string) {
            super(name);
        }

        visualTree : VisualTree;


        estimateWidth(): number {
            return super.estimateWidth();
        }

        estimateHeight(): number {
            return super.estimateHeight();
        }

        getRootElement(): HTMLElement {
            return super.getRootElement();
        }

        assembleDom(): void {
            super.assembleDom();
        }

        doLayout(): void {
            super.doLayout();
        }
    }



}