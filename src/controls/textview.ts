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
            super.getRootElement();
            $(this.rootElem).attr('layout-type','TextView');
            $(this.rootElem).attr('layout-name',this.name);
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
            $(this.getRootElement()).css('position','absolute');
            $(this.getRootElement()).css('width',this.calculatedWidth+'px');
            $(this.getRootElement()).css('height',this.calculatedHeight+'px');
            $(this.getRootElement()).css("position","absolute");
            if(!this._selectable) {
                $(this.spanElem).css("user-select","none");
            }else {
                $(this.spanElem).css("user-select","");
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