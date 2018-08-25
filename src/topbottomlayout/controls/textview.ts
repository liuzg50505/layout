namespace LayoutLzg{
    export class TextView extends WidgetBase {

        private _text:string;
        private _selectable:boolean;
        private _wordWrap:boolean;
        private spanElem:HTMLElement;

        constructor(name: string,text:string) {
            super(name);
            this._text = text;
            this._selectable = true;
            this.width = new Distance(DistanceType.auto,0);
            this.height = new Distance(DistanceType.auto,0);
            this.notifyProperties.push("text");
        }

        get text(): string {
            return this._text;
        }

        set text(value: string) {
            this._text = value;
        }

        get selectable(): boolean {
            return this._selectable;
        }

        set selectable(value: boolean) {
            this._selectable = value;
        }

        get wordWrap(): boolean {
            return this._wordWrap;
        }

        set wordWrap(value: boolean) {
            this._wordWrap = value;
        }

        getRootElement(): HTMLElement {
            super.getRootElement();
            setattr(this.rootElem,'layout-type','TextView');
            setattr(this.rootElem,'layout-name',this.name);
            return this.rootElem;
        }

        assembleDom(): void {
            this.spanElem = createElement("SPAN");
            emptyChildren(this.getRootElement());
            if(this.width.type==DistanceType.fixed) css(this.getRootElement(),'width',this.width.value+'px');
            if(this.height.type==DistanceType.fixed) css(this.getRootElement(),'height',this.height.value+'px');
            appendChild(this.getRootElement(),this.spanElem);
            setElemText(this.spanElem,this._text);
            if(this._wordWrap)
                css(this.spanElem,'word-break','break-all');
            else
                css(this.spanElem,'word-break','normal');

        }

        doLayout(): void {
            css(this.getRootElement(),'position','absolute');
            css(this.getRootElement(),'width',this.calculatedWidth+'px');
            css(this.getRootElement(),'height',this.calculatedHeight+'px');
            css(this.getRootElement(),"position","absolute");
            if(!this._selectable) {
                css(this.spanElem,"user-select","none");
            }else {
                css(this.spanElem,"user-select","");
            }
        }

        calculateWidthFromTop(): void {
            if (this.width.type == DistanceType.fixed) {
                this.calculatedWidth = this.width.value;
                return;
            }
            if(this.parentSlot&&this.parentSlot.isSlotWidthCalculatable&&this.horizonAlignment==HorizonAlignment.Strech) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth;
                return;
            }
            this.calculatedWidth = this.spanElem.offsetWidth;
        }
        calculateHeightFromTop(): void {
            if (this.height.type == DistanceType.fixed) {
                this.calculatedHeight = this.height.value;
                return;
            }
            if(this.parentSlot&&this.parentSlot.isSlotHeightCalculatable&&this.verticalAlignment==VerticalAlignment.Strech) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight;
                return;
            }
            this.calculatedHeight = this.spanElem.offsetHeight;
        }


        calculateWidthFromBottom(): void {
            if (this.width.type == DistanceType.fixed) {
                this.calculatedWidth = this.width.value;
                return;
            }
            this.calculatedWidth = this.spanElem.offsetWidth;
        }

        calculateHeightFromBottom(): void {
            if (this.height.type == DistanceType.fixed) {
                this.calculatedHeight = this.height.value;
                return;
            }
            this.calculatedHeight = this.spanElem.offsetHeight;
        }
    }
}