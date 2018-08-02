namespace LayoutLzg{
    export class Rect extends Control {

        rx:number;
        ry:number;


        constructor(name: string) {
            super(name);
            this.rx = 0;
            this.ry = 0;
        }

        estimateWidth(): number {
            if(this.isParentSlotWidthCalculatable){
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
                    return this.parentSlotWidth - this.margin.left - this.margin.right;
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
            return super.estimateHeight();
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
            }
            return this.rootElem;
        }

        assembleDom(): void {
            super.assembleDom();
        }

        doLayout(): void {
            super.doLayout();
        }
    }
}