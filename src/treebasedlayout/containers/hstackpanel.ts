namespace LayoutLzg {
    export class Hstackpanel extends ContainerWidget {
        protected slotWrappersMap : Map<Slot,HTMLElement>;
        protected childWrappersMap: Map<Widget,HTMLElement>;

        constructor(name: string) {
            super(name);
            this.childWrappersMap = new Map<Widget, HTMLElement>();
            this.slotWrappersMap = new Map<Slot,HTMLElement>();
        }

        addChild(widget: LayoutLzg.Widget): void {
            super.addChild(widget);
            let slot = new Slot();
            slot.addChild(widget);
            this.slots.add(slot);
        }

        removeChild(widget: LayoutLzg.Widget): void {
            this.children.remove(widget);

            let tarSlot:Slot = null;
            for (let slot of this.slots) {
                for (let child of slot.children) {
                    if(child==widget){
                        tarSlot = slot;
                        break;
                    }
                }
                if(tarSlot!=null) break;
            }

            this.slots.remove(tarSlot);
        }

        clearChild(): void {
            this.slots.clear();
            this.children.clear();
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = createElement("DIV");
                css(this.rootElem,'pointer-events','all');
                setattr(this.rootElem,'layout-type','Hstackpanel');
                setattr(this.rootElem,'layout-name',this.name);
            }
            return this.rootElem;
        }

        assembleDom(): void {
            emptyChildren(this.getRootElement());
            this.slotWrappersMap.clear();
            this.childWrappersMap.clear();
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
                css(slotWrapperDiv,'top','0px');
                css(slotWrapperDiv,'bottom','0px');
                css(slotWrapperDiv,'left',pos+'px');
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

        calculateSlotsHeight(isBoundary: boolean): void {
            if(this.height.type==DistanceType.fixed){
                this.calculatedHeight = this.height.value;
                this.slots.forEach(t=>t.isBoundaryHeight = true);
            }else if(this.parent&&this.verticalAlignment==VerticalAlignment.Strech&&isBoundary) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight - this.margin.top - this.margin.bottom;
                this.slots.forEach(t=>t.isBoundaryHeight = true);
            }else {
                let hlist = this.children.map(t=>t.calculatedHeight+t.margin.top+t.margin.bottom);
                hlist = hlist.sort((a,b)=>b-a);
                if(hlist.length>0){
                    this.calculatedHeight = hlist[0];
                    for (let item of this.slots) {
                        item.isBoundaryHeight = false;
                        item.calculatedSlotHeight = this.calculatedHeight;
                    }
                }
            }
        }

        calculateSlotsWidth(isBoundary: boolean): void {
            if(this.width.type==DistanceType.fixed){
                this.calculatedWidth = this.width.value;
                for (let slot of this.slots) {
                    slot.isBoundaryWidth = false;
                    for (let child of slot.children) {
                        slot.calculatedSlotWidth = child.calculatedWidth+child.margin.left+child.margin.right;
                    }
                }
            }else if(this.parent&&this.horizonAlignment==HorizonAlignment.Strech&&isBoundary) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth - this.margin.top - this.margin.bottom;
                for (let slot of this.slots) {
                    slot.isBoundaryWidth = false;
                    for (let child of slot.children) {
                        slot.calculatedSlotWidth = child.calculatedWidth+child.margin.left+child.margin.right;
                    }
                }
            }else {
                let sum = 0;
                for (let i=0;i<this.slots.length;i++){
                    let slot = this.slots[i];
                    slot.isBoundaryWidth = false;
                    for (let child of slot.children) {
                        slot.calculatedSlotWidth = child.calculatedWidth+child.margin.left+child.margin.right;
                        sum+=slot.calculatedSlotWidth;
                    }
                }
                this.calculatedWidth = sum;
            }
        }



    }
}