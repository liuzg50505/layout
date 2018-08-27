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


        addChild(widget: LayoutLzg.Widget): void {
            super.addChild(widget);
            this.mainSlot.addChild(widget);
        }


        assembleDom(): void {
            emptyChildren(this.getRootElement());
            this.childWrappersMap.clear();

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

        calculateSlotsWidth(isBoundary:boolean): void {
            if(this.width.type==DistanceType.fixed){
                this.calculatedWidth = this.width.value;
                this.mainSlot.calculatedSlotWidth = this.width.value;
            }else if(this.parent&&this.horizonAlignment==HorizonAlignment.Strech&&isBoundary) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth - this.margin.left - this.margin.right;
                this.mainSlot.calculatedSlotWidth = this.calculatedWidth;
            }else {
                let wlist = this.children.map(t=>t.calculatedWidth+t.margin.left+t.margin.right);
                wlist = wlist.sort((a,b)=>b-a);
                if(wlist.length>0){
                    this.calculatedWidth = wlist[0];
                    this.mainSlot.calculatedSlotWidth=this.calculatedWidth;
                }
            }
        }


        calculateSlotsHeight(isBoundary:boolean): void {
            if(this.height.type==DistanceType.fixed){
                this.calculatedHeight = this.height.value;
                this.mainSlot.calculatedSlotHeight = this.height.value;
            }else if(this.parent&&this.verticalAlignment==VerticalAlignment.Strech&&isBoundary) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight - this.margin.top - this.margin.bottom;
                this.mainSlot.calculatedSlotHeight = this.parentSlot.calculatedSlotHeight;
            }else {
                let hlist = this.children.map(t=>t.calculatedHeight+t.margin.top+t.margin.bottom);
                hlist = hlist.sort((a,b)=>b-a);
                if(hlist.length>0){
                    this.calculatedHeight = hlist[0];
                    this.mainSlot.calculatedSlotHeight=this.calculatedHeight;
                }
            }

        }



    }
}