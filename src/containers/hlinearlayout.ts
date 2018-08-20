namespace LayoutLzg {
    export class Hlinearlayout extends ContainerControl{
        protected slotMap : Map<Slot,Distance>;
        protected slotWrappersMap : Map<Slot,HTMLElement>;
        protected childWrappersMap: Map<Control,HTMLElement>;

        constructor(name: string) {
            super(name);
            this.slotMap = new Map<Slot, Distance>();
            this.childWrappersMap = new Map<Control, HTMLElement>();
            this.slotWrappersMap = new Map<Slot,HTMLElement>();
        }

        addCell(distance:Distance) {
            let slot = new Slot();
            slot.container = this;
            this.slots.add(slot);
            this.slotMap.put(slot,distance);
        }

        setCell(control:Control, cellIndex:number) {
            const idx = this.children.indexOf(control);
            if(idx>-1){
                let slot = this.slots[cellIndex];
                slot.addChild(control);
            }
        }

        assembleDom(): void {
            $(this.getRootElement()).empty();

            for (let slot of this.slots){
                let slotWrapperDiv = $("<div></div>")[0];
                $(slotWrapperDiv).css('pointer-events','none');
                for (let child of slot.children) {
                    child.assembleDom();
                    let childWrapperDiv = $("<div></div>")[0];
                    $(childWrapperDiv).css('pointer-events','none');
                    $(childWrapperDiv).append(child.getRootElement());
                    $(slotWrapperDiv).append(childWrapperDiv);
                    this.childWrappersMap.put(child,childWrapperDiv);
                }
                this.slotWrappersMap.put(slot,slotWrapperDiv);
                $(this.getRootElement()).append(slotWrapperDiv);
            }
        }

        doLayout(): void {
            $(this.getRootElement()).css('position','absolute');
            $(this.getRootElement()).css('width',this.calculatedWidth+'px');
            $(this.getRootElement()).css('height',this.calculatedHeight+'px');

            let weightSum = 0;
            let fixSum = 0;
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let cellDefination = this.slotMap.get(slot);

                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
                if(cellDefination.type==DistanceType.fixed) fixSum += cellDefination.value;
            }

            let pos = 0;
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let slotWrapperDiv = this.slotWrappersMap.get(slot);
                let cellDefination = this.slotMap.get(slot);

                let cellh = 0;
                if(cellDefination.type==DistanceType.fixed) {
                    cellh=cellDefination.value;
                }else if(cellDefination.type==DistanceType.weight){
                    cellh = (this.calculatedHeight - fixSum)* cellDefination.value / weightSum;
                }

                $(slotWrapperDiv).css('position','absolute');
                $(slotWrapperDiv).css('left','0px');
                $(slotWrapperDiv).css('right','0px');
                $(slotWrapperDiv).css('top',pos+'px');
                $(slotWrapperDiv).css('height',cellh+'px');

                for (let child of slot.children) {
                    let childWrapperDiv = this.childWrappersMap.get(child);
                    $(childWrapperDiv).css('position','absolute');
                    $(childWrapperDiv).css('left',child.margin.left+'px');
                    $(childWrapperDiv).css('right',child.margin.right+'px');
                    $(childWrapperDiv).css('top',child.margin.top+'px');
                    $(childWrapperDiv).css('bottom',child.margin.bottom+'px');
                }
                slot.layoutChildren();
                pos+=cellh;
            }
        }


        calculateHeightFromTop(): void {
            if(this.height.type==DistanceType.fixed){
                this.calculatedHeight = this.height.value;
                for (let slot of this.slots) {
                    slot.isSlotHeightCalculatable = true;
                    slot.calculatedSlotHeight = this.height.value;
                }
                this.slots.forEach(t=>t.calculateHeightFromTop());
                return;
            }
            if(this.parentSlot&&this.parentSlot.isSlotHeightCalculatable&&this.verticalAlignment==VerticalAlignment.Strech) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight;
                for (let slot of this.slots) {
                    slot.isSlotHeightCalculatable = true;
                    slot.calculatedSlotHeight = this.parentSlot.calculatedSlotHeight;
                }
                this.slots.forEach(t=>t.calculateHeightFromTop());
                return;
            }
            // 终止向下计算，从下向上计算
            this.slots.forEach(t=>t.isSlotHeightCalculatable=false);
            this.calculateHeightFromBottom();
            for (let slot of this.slots) {
                slot.isSlotHeightCalculatable = true;
                slot.calculatedSlotHeight = this.calculatedHeight;
            }
            this.slots.forEach(t=>t.calculateHeightFromTop());
        }

        calculateWidthFromTop(): void {

            let weightSum = 0;
            let fixSum = 0;
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let cellDefination = this.slotMap.get(slot);

                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
                if(cellDefination.type==DistanceType.fixed) fixSum += cellDefination.value;
            }

            if(this.width.type==DistanceType.fixed){
                for (let slot of this.slots) {
                    let cellDefination = this.slotMap.get(slot);
                    let cellh = 0;
                    if(cellDefination.type==DistanceType.fixed) {
                        cellh=cellDefination.value;
                    }else if(cellDefination.type==DistanceType.weight){
                        cellh = (this.width.value - fixSum)* cellDefination.value / weightSum;
                    }
                    slot.isSlotWidthCalculatable = true;
                    slot.calculatedSlotWidth = cellh;
                }
                this.calculatedWidth = this.width.value;
                this.slots.forEach(t=>t.calculateWidthFromTop());
                return;
            }
            if(this.parentSlot&&this.parentSlot.isSlotWidthCalculatable&&this.horizonAlignment==HorizonAlignment.Strech) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth;
                for (let slot of this.slots) {
                    let cellDefination = this.slotMap.get(slot);
                    let cellh = 0;
                    if(cellDefination.type==DistanceType.fixed) {
                        cellh=cellDefination.value;
                    }else if(cellDefination.type==DistanceType.weight){
                        cellh = (this.parentSlot.calculatedSlotWidth - fixSum)* cellDefination.value / weightSum;
                    }
                    slot.isSlotWidthCalculatable = true;
                    slot.calculatedSlotWidth = cellh;
                }
                this.slots.forEach(t=>t.calculateWidthFromTop());
                return;
            }
            // 终止向下计算，从下向上计算
            this.slots.forEach(t=>t.isSlotWidthCalculatable=false);
            this.calculateWidthFromBottom();
            for (let slot of this.slots) {
                slot.isSlotWidthCalculatable = true;
                slot.calculatedSlotWidth = this.calculatedWidth;
            }
            this.slots.forEach(t=>t.calculateWidthFromTop());
        }

        calculateHeightFromBottom(): void {
            if(this.height.type==DistanceType.fixed) {
                this.calculateHeightFromTop();
                return;
            }
            for (let slot of this.slots)  {
                slot.calculateHeightFromBottom();
            }

            let heightlist = this.slots.map(t=>t.calculatedSlotHeight);
            heightlist.sort((a,b)=>b-a);
            let maxheight = 0;
            if(heightlist.length>0) maxheight = heightlist[0];

            this.calculatedHeight = maxheight;

        }

        calculateWidthFromBottom(): void {
            if(this.width.type==DistanceType.fixed) {
                this.calculateWidthFromTop();
                return;
            }
            for (let slot of this.slots)  {
                slot.calculateWidthFromBottom();
            }

            let sum = 0;
            for (let slot of this.slots) {
                sum+=slot.calculatedSlotWidth;
            }
            this.calculatedWidth = sum;
        }


        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type','Vlinearlayout');
                $(this.rootElem).attr('layout-name',this.name);
            }
            return this.rootElem;
        }



    }
}