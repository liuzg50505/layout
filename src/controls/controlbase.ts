namespace LayoutLzg{
    export class ControlBase extends Control {
        constructor(name:string) {
            super(name);
        }

        estimateWidth(): number {
            if(this.parentSlot.isSlotWidthCalculatable){
                if (this.horizonAlignment==HorizonAlignment.Center
                    ||this.horizonAlignment==HorizonAlignment.Left
                    ||this.horizonAlignment==HorizonAlignment.Right)
                {
                    if(this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }else if(this.width.type == DistanceType.auto) {
                        return 0;
                    }
                }else if(this.horizonAlignment==HorizonAlignment.Strech){
                    return this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                }
            }else{
                if(this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }else if(this.width.type == DistanceType.auto) {
                        return 0;
                }
                return 0;
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
                        return 0;
                    }
                }else if(this.verticalAlignment==VerticalAlignment.Strech){
                    return this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
                }
            }else{
                if(this.height.type == DistanceType.fixed) {
                    return this.height.value;
                }else if(this.height.type == DistanceType.auto) {
                    return 0;
                }
                return 0;
            }        
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
            }
            return this.rootElem;
        }
    }
}