namespace LayoutLzg {
    export class Hlinearlayout extends ContainerWidget{
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

            let pos = 0;
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let slotWrapperDiv = this.slotWrappersMap.get(slot);

                css(slotWrapperDiv,'position','absolute');
                css(slotWrapperDiv,'top',pos+'px');
                css(slotWrapperDiv,'bottom','0px');
                css(slotWrapperDiv,'left','0px');
                css(slotWrapperDiv,'width',slot.calculatedSlotWidth+'px');

                for (let child of slot.children) {
                    let childWrapperDiv = this.childWrappersMap.get(child);
                    css(childWrapperDiv,'position','absolute');
                    css(childWrapperDiv,'left',child.margin.left+'px');
                    css(childWrapperDiv,'right',child.margin.right+'px');
                    css(childWrapperDiv,'top',child.margin.top+'px');
                    css(childWrapperDiv,'bottom',child.margin.bottom+'px');
                }
                slot.layoutChildren();
                pos+=slot.calculatedSlotWidth;
            }
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

        calculateSlotsWidth(isBoundary: boolean): void {
            let weightSum = 0;
            let fixSum = 0;
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let cellDefination = this.slotMap.get(slot);

                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
                if(cellDefination.type==DistanceType.fixed) fixSum += cellDefination.value;
            }

            if(this.width.type==DistanceType.fixed){
                for (let i=0;i<this.slots.length;i++){
                    let slot = this.slots[i];
                    let cellDefination = this.slotMap.get(slot);

                    let cellw = 0;
                    if(cellDefination.type==DistanceType.fixed) {
                        cellw=cellDefination.value;
                    }else if(cellDefination.type==DistanceType.weight){
                        cellw = (this.width.value - fixSum)* cellDefination.value / weightSum;
                    }

                    slot.calculatedSlotWidth = cellw;
                }

            }else if(this.parent&&this.horizonAlignment==HorizonAlignment.Strech&&isBoundary) {
                for (let i=0;i<this.slots.length;i++){
                    let slot = this.slots[i];
                    let cellDefination = this.slotMap.get(slot);

                    let cellw = 0;
                    if(cellDefination.type==DistanceType.fixed) {
                        cellw=cellDefination.value;
                    }else if(cellDefination.type==DistanceType.weight){
                        cellw = (this.parentSlot.calculatedSlotWidth - fixSum)* cellDefination.value / weightSum;
                    }

                    slot.calculatedSlotWidth = cellw;
                }
            }else {
                let wlist = this.children.map(t=>t.calculatedWidth+t.margin.left+t.margin.right);
                wlist = wlist.sort((a,b)=>b-a);
                if(wlist.length>0){
                    this.calculatedWidth = wlist[0];
                    this.slots.forEach(function (item) {
                        item.calculatedSlotWidth = this.calculatedWidth;
                    });
                }
            }
        }

        calculateSlotsHeight(isBoundary: boolean): void {
            if(this.height.type==DistanceType.fixed){
                this.slots.forEach(function (item) {
                    item.calculatedSlotHeight = this.height.value;
                });
            }else if(this.parent&&this.verticalAlignment==VerticalAlignment.Strech&&isBoundary) {
                this.slots.forEach(function (item) {
                    item.calculatedSlotHeight = this.parentSlot.calculatedSlotHeight;
                });
            }else {
                let hlist = this.children.map(t=>t.calculatedHeight+t.margin.top+t.margin.bottom);
                hlist = hlist.sort((a,b)=>b-a);
                if(hlist.length>0){
                    this.calculatedHeight = hlist[0];
                    this.slots.forEach(function (item) {
                        item.calculatedSlotHeight = this.calculatedHeight;
                    });
                }
            }
        }


    }
}