namespace LayoutLzg {

    export class TemplateControl extends Control {

        constructor(name: string) {
            super(name);
        }

        rootBorder : Border = new Border("rootBorder");
        visualTree : VisualTree;


        estimateWidth(): number {
            if(this.parentSlot.isSlotWidthCalculatable){
                if (this.horizonAlignment==HorizonAlignment.Center
                    ||this.horizonAlignment==HorizonAlignment.Left
                    ||this.horizonAlignment==HorizonAlignment.Right)
                {
                    if(this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }else if(this.width.type == DistanceType.auto) {
                        return this.rootBorder.estimateWidth();
                    }
                }else if(this.horizonAlignment==HorizonAlignment.Strech){
                    return this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                }
            }else{
                if(this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }else if(this.width.type == DistanceType.auto) {
                    return this.rootBorder.estimateWidth();
                }
            }
        }

        estimateHeight(): number {
            if(this.parentSlot.isSlotHeightCalculatable){
                if (this.verticalAlignment==VerticalAlignment.Center
                    ||this.verticalAlignment==VerticalAlignment.Top
                    ||this.verticalAlignment==VerticalAlignment.Bottom)
                {
                    if(this.height.type == DistanceType.fixed) {
                        return this.height.value;
                    }else if(this.height.type == DistanceType.auto) {
                        return this.rootBorder.estimateHeight();
                    }
                }else if(this.horizonAlignment==HorizonAlignment.Strech){
                    return this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                }
            }else{
                if(this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }else if(this.width.type == DistanceType.auto) {
                    this.rootBorder.estimateWidth();
                    return 0;
                }
            }
        }

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
    }



}