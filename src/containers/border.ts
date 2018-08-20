namespace LayoutLzg{
    export class Border extends ContainerControl {

        protected mainSlot : Slot;
        protected childWrappersMap: Map<Control,HTMLElement>;

        constructor(name:string) {
            super(name);
            this.mainSlot = new Slot();
            this.mainSlot.container = this;
            this.childWrappersMap = new Map<Control, HTMLElement>();
            this.slots.push(this.mainSlot);
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type','Border');
                $(this.rootElem).attr('layout-name',this.name);
            }
            return this.rootElem;
        }


        addChild(control: LayoutLzg.Control): void {
            super.addChild(control);
            this.mainSlot.addChild(control);
        }


        assembleDom(): void {
            $(this.getRootElement()).empty();

            for(let i=0;i<this.children.length;i++){
                let child = this.children[i];
                child.assembleDom();

                let wrapperDiv = $("<div></div>")[0];
                $(wrapperDiv).attr('layout-tag','wrapper');
                this.childWrappersMap.put(child,wrapperDiv);
                $(this.getRootElement()).append(wrapperDiv);
                $(wrapperDiv).append(child.getRootElement());
            }
        }

        doLayout(): void {
            $(this.getRootElement()).css('position','absolute');
            $(this.getRootElement()).css('width',this.calculatedWidth+'px');
            $(this.getRootElement()).css('height',this.calculatedHeight+'px');

            for (let slot of this.slots) {
                for (let child of slot.children) {
                    let wrapperDiv = this.childWrappersMap.get(child);

                    $(wrapperDiv).css('position','absolute');
                    $(wrapperDiv).css('left',child.margin.left+'px');
                    $(wrapperDiv).css('right',child.margin.right+'px');
                    $(wrapperDiv).css('top',child.margin.top+'px');
                    $(wrapperDiv).css('bottom',child.margin.bottom+'px');
                }
                slot.layoutChildren();
            }
        }


        calculateWidthFromTop(): void {
            if(this.width.type==DistanceType.fixed){
                this.calculatedWidth = this.width.value;
                for (let slot of this.slots) {
                    slot.isSlotWidthCalculatable = true;
                    slot.calulatedSlotWidth = this.width.value;
                }
                this.slots.forEach(t=>t.calculateWidthFromTop());
                return;
            }
            if(this.parentSlot&&this.parentSlot.isSlotWidthCalculatable&&this.horizonAlignment==HorizonAlignment.Strech) {
                this.calculatedWidth = this.mainSlot.calulatedSlotWidth;
                for (let slot of this.slots) {
                    slot.isSlotWidthCalculatable = true;
                    slot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth;
                }
                this.slots.forEach(t=>t.calculateWidthFromTop());
                return;
            }
            // 终止向下计算，从下向上计算
            this.slots.forEach(t=>t.isSlotWidthCalculatable=false);
            this.calculateWidthFromBottom();
            for (let slot of this.slots) {
                slot.isSlotWidthCalculatable = true;
                slot.calulatedSlotWidth = this.calculatedWidth;
            }
            this.slots.forEach(t=>t.calculateWidthFromTop());
        }


        calculateHeightFromTop(): void {
            if(this.height.type==DistanceType.fixed){
                this.calculatedHeight = this.height.value;
                for (let slot of this.slots) {
                    slot.isSlotHeightCalculatable = true;
                    slot.calulatedSlotHeight = this.height.value;
                }
                this.slots.forEach(t=>t.calculateHeightFromTop());
                return;
            }
            if(this.parentSlot&&this.parentSlot.isSlotHeightCalculatable&&this.verticalAlignment==VerticalAlignment.Strech) {
                for (let slot of this.slots) {
                    slot.isSlotHeightCalculatable = true;
                    slot.calulatedSlotHeight = this.parentSlot.calulatedSlotHeight;
                }
                this.slots.forEach(t=>t.calculateHeightFromTop());
                this.calculatedHeight = this.mainSlot.calulatedSlotHeight;
                return;
            }
            // 终止向下计算，从下向上计算
            this.slots.forEach(t=>t.isSlotHeightCalculatable=false);
            this.calculateHeightFromBottom();
            for (let slot of this.slots) {
                slot.isSlotHeightCalculatable = true;
                slot.calulatedSlotHeight = this.calculatedHeight;
            }
            this.slots.forEach(t=>t.calculateHeightFromTop());
        }


        calculateWidthFromBottom(): void {
            if(this.width.type==DistanceType.fixed) {
                this.calculateWidthFromTop();
                return;
            }
            for (let slot of this.slots)  {
                slot.calculateWidthFromBottom();
            }
            this.calculatedWidth = this.mainSlot.calulatedSlotWidth;
        }

        calculateHeightFromBottom(): void {
            if(this.height.type==DistanceType.fixed) {
                this.calculateHeightFromTop();
                return;
            }
            for (let slot of this.slots)  {
                slot.calculateHeightFromBottom();
            }
            this.calculatedHeight = this.mainSlot.calulatedSlotHeight;
        }
    }
}