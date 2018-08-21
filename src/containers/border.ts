namespace LayoutLzg{
    export class Border extends ContainerWidget {

        protected mainSlot : Slot;
        protected childWrappersMap: Map<Widget,HTMLElement>;

        constructor(name:string) {
            super(name);
            this.mainSlot = new Slot();
            this.mainSlot.container = this;
            this.childWrappersMap = new Map<Widget, HTMLElement>();
            this.slots.push(this.mainSlot);
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = createElement("DIV");
                css(this.rootElem,'pointer-events','all');
                setattr(this.rootElem,'layout-type','Border');
                setattr(this.rootElem,'layout-name',this.name);
            }
            return this.rootElem;
        }


        addChild(control: LayoutLzg.Widget): void {
            super.addChild(control);
            this.mainSlot.addChild(control);
        }


        assembleDom(): void {
            emptyChildren(this.getRootElement());

            for(let i=0;i<this.children.length;i++){
                let child = this.children[i];
                child.assembleDom();

                let wrapperDiv = createElement("DIV");
                css(wrapperDiv,'pointer-events','none');
                setattr(wrapperDiv,'layout-tag','wrapper');
                this.childWrappersMap.put(child,wrapperDiv);
                appendChild(this.getRootElement(),wrapperDiv);
                appendChild(wrapperDiv,child.getRootElement());
            }
        }

        doLayout(): void {
            css(this.getRootElement(),'position','absolute');
            css(this.getRootElement(),'width',this.calculatedWidth+'px');
            css(this.getRootElement(),'height',this.calculatedHeight+'px');

            for (let slot of this.slots) {
                for (let child of slot.children) {
                    let wrapperDiv = this.childWrappersMap.get(child);

                    css(wrapperDiv,'position','absolute');
                    css(wrapperDiv,'left',child.margin.left+'px');
                    css(wrapperDiv,'right',child.margin.right+'px');
                    css(wrapperDiv,'top',child.margin.top+'px');
                    css(wrapperDiv,'bottom',child.margin.bottom+'px');
                }
                slot.layoutChildren();
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
                this.calculatedWidth = this.mainSlot.calculatedSlotWidth;
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
                for (let slot of this.slots) {
                    slot.isSlotHeightCalculatable = true;
                    slot.calculatedSlotHeight = this.parentSlot.calculatedSlotHeight;
                }
                this.slots.forEach(t=>t.calculateHeightFromTop());
                this.calculatedHeight = this.mainSlot.calculatedSlotHeight;
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
            this.calculatedWidth = this.mainSlot.calculatedSlotWidth;
        }

        calculateHeightFromBottom(): void {
            if(this.height.type==DistanceType.fixed) {
                this.calculateHeightFromTop();
                return;
            }
            for (let slot of this.slots)  {
                slot.calculateHeightFromBottom();
            }
            this.calculatedHeight = this.mainSlot.calculatedSlotHeight;
        }
    }
}