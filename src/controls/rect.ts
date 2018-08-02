namespace LayoutLzg{
    export class Rect extends ControlBase {

        rx:number;
        ry:number;


        constructor(name: string) {
            super(name);
            this.rx = 0;
            this.ry = 0;
        }

        assembleDom(): void {
            super.assembleDom();
        }

        doLayout(): void {
            super.doLayout();
        }
    }
}