namespace LayoutLzg {

    export class TemplateControl extends ControlBase {
        private rootBorder : Border = new Border("rootBorder");
        private _visualTree : VisualTree;

        constructor(name: string) {
            super(name);
        }

        get visualTree(): VisualTree {
            return this._visualTree;
        }

        set visualTree(value: VisualTree) {
            if(value!=null) {
                value.parentControl = this;
            }
            this._visualTree = value;
        }

        getRootElement(): HTMLElement {
            return this.rootBorder.getRootElement();
        }

        assembleDom(): void {
            this.rootBorder.width = this.width;
            this.rootBorder.height = this.height;
            this.rootBorder.horizonAlignment = this.horizonAlignment;
            this.rootBorder.verticalAlignment = this.verticalAlignment;
            this.rootBorder.addChild(this._visualTree.rootContainer);
            this._visualTree.rootContainer.width = new Distance(DistanceType.auto,0);
            this._visualTree.rootContainer.height = new Distance(DistanceType.auto,0);
            this._visualTree.rootContainer.horizonAlignment = HorizonAlignment.Strech;
            this._visualTree.rootContainer.verticalAlignment = VerticalAlignment.Strech;

            this.rootBorder.parentSlot = this.parentSlot;
            this.rootBorder.parent = this.parent;

            this.rootBorder.initCalculableSlots();
            this.rootBorder.assembleDom();

        }

        doLayout(): void {
            this.rootBorder.doLayout();
        }

        estimateHeight_auto(): number {
            return this.rootBorder.estimateHeight();
        }

        estimateWidth_auto(): number {
            return this.rootBorder.estimateWidth();
        }
    }

    export class ContentPresenter extends Control{

        content:Control;

        getRootElement(): HTMLElement {
            return this.content.getRootElement();
        }

        estimateWidth(): number {
            return this.content.estimateWidth();
        }

        estimateHeight(): number {
            return this.content.estimateHeight();
        }

        doLayout(): void {
            this.content.doLayout();
        }

        dispose(): void {
        }

    }

    export class ItemsPresenter {

    }


}