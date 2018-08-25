namespace LayoutLzg {
    export class VStackPanel extends ContainerWidget{

        protected slotWrappersMap: Map<Slot,HTMLElement>;
        protected childWrappersMap: Map<Widget,HTMLElement>;

        constructor(name: string) {
            super(name);
            this.childWrappersMap = new Map<Widget, HTMLElement>();
            this.slotWrappersMap = new Map<Slot,HTMLElement>();
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = createElement("DIV");
                css(this.rootElem,'pointer-events','all');
                setattr(this.rootElem,'layout-type','VStackPanel');
                setattr(this.rootElem,'layout-name',this.name);
            }
            return this.rootElem;
        }


        addChild(widget: LayoutLzg.Widget): void {
            super.addChild(widget);
            let slot = new Slot();
            slot.addChild(widget);
            this.slots.add(slot);
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

                let cellh = slot.calculatedSlotHeight;

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

        calculateWidthFromBottom(): void {

        }

        calculateHeightFromTop(): void {
        }

        calculateHeightFromBottom(): void {
        }



    }
}