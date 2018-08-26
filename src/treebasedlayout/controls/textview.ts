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
                css(this.spanElem,'word-break','break-all');
            else
                css(this.spanElem,'word-break','normal');

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


        calculateSlotsHeight(isBoundary:boolean): void {
        }

        calculateSlotsWidth(isBoundary:boolean): void {
        }

        dispose(): void {

        }

        measureWidth(): number {
            return this.spanElem.offsetWidth;
        }

        measureHeight(): number {
            return this.spanElem.offsetHeight;
        }

    }
}