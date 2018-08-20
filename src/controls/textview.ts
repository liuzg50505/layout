namespace LayoutLzg{
    export class TextView extends ControlBase {

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
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type','TextView');
                $(this.rootElem).attr('layout-name',this.name);
                // eventTransparentDiv(this.rootElem);
            }
            return this.rootElem;
        }

        assembleDom(): void {
            this.spanElem = $("<span></span>")[0];
            $(this.getRootElement()).empty();
            if(this.width.type==DistanceType.fixed) $(this.getRootElement()).css('width',this.width.value+'px');
            if(this.height.type==DistanceType.fixed) $(this.getRootElement()).css('height',this.height.value+'px');
            $(this.getRootElement()).append(this.spanElem);
            $(this.spanElem).text(this._text);
            if(this._wordWrap)
                $(this.spanElem).css('word-break','break-all');
            else
                $(this.spanElem).css('word-break','normal');

        }

        doLayout(): void {
            super.doLayout();
            if(!this._selectable) {
                $(this.spanElem).css("user-select","none");
            }else {
                $(this.spanElem).css("user-select","");
            }
        }

        estimateHeight_auto(): number {
            return $(this.getRootElement()).find('span').height();
        }

        estimateWidth_auto(): number {
            return $(this.getRootElement()).find('span').width();
        }
    }
}