namespace LayoutLzg {
    export class Vlinearlayout extends ContainerWidget{
        protected slotMap : Map<Slot,Distance>;
        protected slotWrappersMap : Map<Slot,HTMLElement>;
        protected childWrappersMap: Map<Widget,HTMLElement>;

        constructor(name: string) {
            super(name);
            this.slotMap = new Map<Slot, Distance>();
            this.childWrappersMap = new Map<Widget, HTMLElement>();
            this.slotWrappersMap = new Map<Slot,HTMLElement>();
        }

        addCell(distance:Distance) {
            let slot = new Slot();
            slot.container = this;
            this.slots.add(slot);
            this.slotMap.put(slot,distance);
        }

        setCell(widget:Widget, cellIndex:number) {
            const idx = this.children.indexOf(widget);
            if(idx>-1){
                let slot = this.slots[cellIndex];
                slot.addChild(widget);
            }
        }

        assembleDom(): void {
            emptyChildren(this.getRootElement());

            for (let slot of this.slots){
                let slotWrapperDiv = createElement("DIV");
                css(slotWrapperDiv,'pointer-events','none');
                for (let child of slot.children) {
                    child.assembleDom();
                    let childWrapperDiv = createElement("DIV");
                    css(childWrapperDiv,'pointer-events','none');
                    appendChild(childWrapperDiv,child.getRootElement());
                    appendChild(slotWrapperDiv,childWrapperDiv);
                    this.childWrappersMap.put(child,childWrapperDiv);
                }
                this.slotWrappersMap.put(slot,slotWrapperDiv);
                appendChild(this.getRootElement(),slotWrapperDiv);
            }
        }

        doLayout(): void {
            css(this.getRootElement(),'position','absolute');
            css(this.getRootElement(),'width',this.calculatedWidth+'px');
            css(this.getRootElement(),'height',this.calculatedHeight+'px');

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

                css(slotWrapperDiv,'position','absolute');
                css(slotWrapperDiv,'left','0px');
                css(slotWrapperDiv,'right','0px');
                css(slotWrapperDiv,'top',pos+'px');
                css(slotWrapperDiv,'height',cellh+'px');

                for (let child of slot.children) {
                    let childWrapperDiv = this.childWrappersMap.get(child);
                    css(childWrapperDiv,'position','absolute');
                    css(childWrapperDiv,'left',child.margin.left+'px');
                    css(childWrapperDiv,'right',child.margin.right+'px');
                    css(childWrapperDiv,'top',child.margin.top+'px');
                    css(childWrapperDiv,'bottom',child.margin.bottom+'px');
                }
                slot.layoutChildren();
                pos+=cellh;
            }
        }


        calculateWidthFromTop(): void {
            if(this.width.type==DistanceType.fixed){
                this.calculatedWidth = this.width.value;
                for (let slot of this.slots) {
                    slot.isSlotWidthCalculatable = true;
                    slot.calculatedSlotWidth = this.width.value;
                }
                this.slots.forEach(t=>t.calculateWidthFromTop());
                return;
            }
            if(this.parentSlot&&this.parentSlot.isSlotWidthCalculatable&&this.horizonAlignment==HorizonAlignment.Strech) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth;
                for (let slot of this.slots) {
                    slot.isSlotWidthCalculatable = true;
                    slot.calculatedSlotWidth = this.parentSlot.calculatedSlotWidth;
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

        calculateHeightFromTop(): void {

            let weightSum = 0;
            let fixSum = 0;
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let cellDefination = this.slotMap.get(slot);

                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
                if(cellDefination.type==DistanceType.fixed) fixSum += cellDefination.value;
            }

            if(this.height.type==DistanceType.fixed){
                for (let slot of this.slots) {
                    let cellDefination = this.slotMap.get(slot);
                    let cellh = 0;
                    if(cellDefination.type==DistanceType.fixed) {
                        cellh=cellDefination.value;
                    }else if(cellDefination.type==DistanceType.weight){
                        cellh = (this.height.value - fixSum)* cellDefination.value / weightSum;
                    }
                    slot.isSlotHeightCalculatable = true;
                    slot.calculatedSlotHeight = cellh;
                }
                this.calculatedHeight = this.height.value;
                this.slots.forEach(t=>t.calculateHeightFromTop());
                return;
            }
            if(this.parentSlot&&this.parentSlot.isSlotHeightCalculatable&&this.verticalAlignment==VerticalAlignment.Strech) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight;
                for (let slot of this.slots) {
                    let cellDefination = this.slotMap.get(slot);
                    let cellh = 0;
                    if(cellDefination.type==DistanceType.fixed) {
                        cellh=cellDefination.value;
                    }else if(cellDefination.type==DistanceType.weight){
                        cellh = (this.parentSlot.calculatedSlotHeight - fixSum)* cellDefination.value / weightSum;
                    }
                    slot.isSlotHeightCalculatable = true;
                    slot.calculatedSlotHeight = cellh;
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

        calculateWidthFromBottom(): void {
            if(this.width.type==DistanceType.fixed) {
                this.calculateWidthFromTop();
                return;
            }
            for (let slot of this.slots)  {
                slot.calculateWidthFromBottom();
            }

            let widthlist = this.slots.map(t=>t.calculatedSlotWidth);
            widthlist.sort((a,b)=>b-a);
            let maxwidth = 0;
            if(widthlist.length>0) maxwidth = widthlist[0];

            this.calculatedWidth = maxwidth;

        }

        calculateHeightFromBottom(): void {
            if(this.height.type==DistanceType.fixed) {
                this.calculateHeightFromTop();
                return;
            }
            for (let slot of this.slots)  {
                slot.calculateHeightFromBottom();
            }

            let sum = 0;
            for (let slot of this.slots) {
                sum+=slot.calculatedSlotHeight;
            }
            this.calculatedHeight = sum;

        }


        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = createElement("DIV");
                css(this.rootElem,'pointer-events','all');
                setattr(this.rootElem,'layout-type','Vlinearlayout');
                setattr(this.rootElem,'layout-name',this.name);
            }
            return this.rootElem;
        }



    }
}