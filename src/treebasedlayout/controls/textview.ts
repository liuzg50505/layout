namespace LayoutLzg{
    export class TextView extends MesureableWidget {

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
            if(this.spanElem) {
                setElemText(this.spanElem,this._text);
            }
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
            if(!this.rootElem){
                this.rootElem = createElement("DIV");
                css(this.rootElem,'pointer-events','all');
                setattr(this.rootElem,'layout-type','TextView');
                setattr(this.rootElem,'layout-name',this.name);
            }
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
                css(this.spanElem,'white-space','');
            else
                css(this.spanElem,'white-space','nowrap');

        }

        doLayout(): void {
            // css(this.getRootElement(),'position','absolute');
            // css(this.getRootElement(),'width',this.calculatedWidth+'px');
            // css(this.getRootElement(),'height',this.calculatedHeight+'px');
            css(this.getRootElement(),"position","absolute");
            if(!this._selectable) {
                css(this.spanElem,"user-select","none");
            }else {
                css(this.spanElem,"user-select","");
            }
        }

        calculateSlotsWidth(isBoundary:boolean): void {
            if(this.width.type==DistanceType.fixed) {
                this.calculatedWidth = this.width.value;
            }else if(this.parent&&this.horizonAlignment==HorizonAlignment.Strech&&isBoundary) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth - this.margin.left - this.margin.right;
            }else {
                this.calculatedWidth = this.measureWidth();
            }
        }

        calculateSlotsHeight(isBoundary:boolean): void {
            if(this.height.type==DistanceType.fixed) {
                this.calculatedHeight = this.height.value;
            }else if(this.parent&&this.verticalAlignment==VerticalAlignment.Strech&&isBoundary) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight - this.margin.top - this.margin.bottom;
            }else {
                this.calculatedHeight = this.measureHeight();
            }
        }

        dispose(): void {

        }

        measureWidth(): number {
            if(this.parentSlot.calculatedSlotWidth==0){
                return measureElemSize(this.spanElem)[0];
            }else{
                return measureElemSize(this.spanElem,this.parentSlot.calculatedSlotWidth)[0];
            }
        }

        measureHeight(): number {
            if(this.parentSlot.calculatedSlotHeight==0){
                return measureElemSize(this.spanElem)[1];
            }else{
                return measureElemSize(this.spanElem,this.parentSlot.calculatedSlotHeight)[1];
            }
        }

    }
}