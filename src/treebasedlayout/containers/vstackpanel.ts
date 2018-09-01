namespace LayoutLzg {
    export class Vstackpanel extends ContainerWidget {
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
                setattr(this.rootElem,'layout-type','Vstackpanel');
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
                css(slotWrapperDiv,'left','0px');
                css(slotWrapperDiv,'right','0px');
                css(slotWrapperDiv,'top',pos+'px');
                css(slotWrapperDiv,'height',slot.calculatedSlotHeight+'px');

                for (let child of slot.children) {
                    let childWrapperDiv = this.childWrappersMap.get(child);
                    css(childWrapperDiv,'position','absolute');
                    css(childWrapperDiv,'left',child.margin.left+'px');
                    css(childWrapperDiv,'right',child.margin.right+'px');
                    css(childWrapperDiv,'top',child.margin.top+'px');
                    css(childWrapperDiv,'bottom',child.margin.bottom+'px');
                }
                slot.layoutChildren();
                pos+=slot.calculatedSlotHeight;
            }
        }

        calculateSlotsWidth(isBoundary: boolean): void {
            if(this.width.type==DistanceType.fixed){
                this.calculatedWidth = this.width.value;
                this.slots.forEach(t=>t.isBoundaryWidth = true);
                for (let item of this.slots) {
                    item.calculatedSlotWidth = this.width.value;
                }
            }else if(this.parent&&this.horizonAlignment==HorizonAlignment.Strech&&isBoundary) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth - this.margin.left - this.margin.right;
                this.slots.forEach(t=>t.isBoundaryWidth = true);
                for (let item of this.slots) {
                    item.calculatedSlotWidth = this.calculatedWidth;
                }
            }else {
                let wlist = this.children.map(t=>t.calculatedWidth+t.margin.left+t.margin.right);
                wlist = wlist.sort((a,b)=>b-a);
                if(wlist.length>0){
                    this.calculatedWidth = wlist[0];
                    for (let item of this.slots) {
                        item.isBoundaryWidth = false;
                        item.calculatedSlotWidth = this.calculatedWidth;
                    }
                }
            }
        }

        calculateSlotsHeight(isBoundary: boolean): void {
            if(this.height.type==DistanceType.fixed){
                this.calculatedHeight = this.height.value;
                this.slots.forEach(t=>t.isBoundaryHeight = false);
                for (let i=0;i<this.slots.length;i++){
                    let slot = this.slots[i];
                    for (let child of slot.children) {
                        slot.calculatedSlotHeight = child.calculatedHeight+child.margin.top+child.margin.bottom;
                    }
                }

            }else if(this.parent&&this.verticalAlignment==VerticalAlignment.Strech&&isBoundary) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight - this.margin.top - this.margin.bottom;
                this.slots.forEach(t=>t.isBoundaryHeight = false);
                for (let i=0;i<this.slots.length;i++){
                    let slot = this.slots[i];
                    for (let child of slot.children) {
                        slot.calculatedSlotHeight = child.calculatedHeight+child.margin.top+child.margin.bottom;
                    }
                }
            }else {
                let sum = 0;
                for (let i=0;i<this.slots.length;i++){
                    let slot = this.slots[i];
                    slot.isBoundaryHeight = false;
                    for (let child of slot.children) {
                        slot.calculatedSlotHeight = child.calculatedHeight+child.margin.top+child.margin.bottom;
                        sum+=slot.calculatedSlotHeight;
                    }
                }
                this.calculatedHeight = sum;
            }
        }



    }
}