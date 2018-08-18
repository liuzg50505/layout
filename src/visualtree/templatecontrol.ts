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
            this.rootBorder.width = new Distance(DistanceType.auto,0);
            this.rootBorder.height = new Distance(DistanceType.auto,0);
            this.rootBorder.horizonAlignment = HorizonAlignment.Strech;
            this.rootBorder.verticalAlignment = VerticalAlignment.Strech;
            this.rootBorder.addChild(this._visualTree.rootContainer);
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



}