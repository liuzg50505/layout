namespace LayoutLzg {

    export class TemplateControl extends ControlBase {

        constructor(name: string) {
            super(name);
        }

        rootBorder : Border = new Border("rootBorder");
        visualTree : VisualTree;


        getRootElement(): HTMLElement {
            return this.rootBorder.getRootElement();
        }

        assembleDom(): void {
            this.rootBorder.width = new Distance(DistanceType.auto,0);
            this.rootBorder.height = new Distance(DistanceType.auto,0);
            this.rootBorder.horizonAlignment = HorizonAlignment.Strech;
            this.rootBorder.verticalAlignment = VerticalAlignment.Strech;
            this.rootBorder.addChild(this.visualTree.rootContainer);
            this.visualTree.rootContainer.horizonAlignment = HorizonAlignment.Strech;
            this.visualTree.rootContainer.verticalAlignment = VerticalAlignment.Strech;

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