namespace LayoutLzg {

    export abstract class LayoutAlgorithm {

        protected layoutRoot:Widget;

        constructor(layoutRoot: LayoutLzg.Widget) {
            this.layoutRoot = layoutRoot;
        }


        abstract calculateWidthTree(): void;
        abstract calculateHeightTree(): void;

        doLayout():void {

        }

    }

}