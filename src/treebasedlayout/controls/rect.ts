namespace LayoutLzg{
    export class Rect extends Widget {

        private _radius_bottom_left:number;
        private _radius_bottom_right:number;
        private _radius_top_left:number;
        private _radius_top_right:number;
        private _opacity:number;

        constructor(name: string) {
            super(name);
            this._radius_bottom_left = 0;
            this._radius_bottom_right = 0;
            this._radius_top_left = 0;
            this._radius_top_right = 0;
            this._opacity = 1;
        }


        get radius_bottom_left(): number {
            return this._radius_bottom_left;
        }

        set radius_bottom_left(value: number) {
            this._radius_bottom_left = value;
        }

        get radius_bottom_right(): number {
            return this._radius_bottom_right;
        }

        set radius_bottom_right(value: number) {
            this._radius_bottom_right = value;
        }

        get radius_top_left(): number {
            return this._radius_top_left;
        }

        set radius_top_left(value: number) {
            this._radius_top_left = value;
        }

        get radius_top_right(): number {
            return this._radius_top_right;
        }

        set radius_top_right(value: number) {
            this._radius_top_right = value;
        }

        set radius(value: number) {
            this._radius_bottom_left = value;
            this._radius_bottom_right = value;
            this._radius_top_left = value;
            this._radius_top_right = value;
        }

        get opacity(): number {
            return this._opacity;
        }

        set opacity(value: number) {
            this._opacity = value;
        }

        getRootElement(): HTMLElement {
            if(!this.rootElem){
                this.rootElem = createElement("DIV");
                css(this.rootElem,'box-sizing','border-box');
                css(this.rootElem,'pointer-events','all');
                setattr(this.rootElem, 'layout-type','Rect');
                setattr(this.rootElem, 'layout-name',this.name);
            }
            return this.rootElem;
        }

        assembleDom(): void {
            super.assembleDom();
        }

        doLayout(): void {
            css(this.getRootElement(),'position','absolute');
            css(this.getRootElement(),'width',this.calculatedWidth+'px');
            css(this.getRootElement(),'height',this.calculatedHeight+'px');
            // stroke and fill
            if(this.fill) this.fill.applyToBackground(this.rootElem);
            if(this.stroke) this.stroke.applyToBorder(this.rootElem,this.strokeThickness);
            // radius
            css(this.getRootElement(),"border-bottom-left-radius",this.radius_bottom_left+"px");
            css(this.getRootElement(),"border-bottom-right-radius",this.radius_bottom_right+"px");
            css(this.getRootElement(),"border-top-left-radius",this.radius_top_left+"px");
            css(this.getRootElement(),"border-top-right-radius",this.radius_top_right+"px");
            // opacity
            css(this.getRootElement(),"opacity",this.opacity);
            // shadow
            if(this.shadow) {
                css(this.getRootElement(),"box-shadow",this.shadow.toBoxShawdowString());
            }
        }


        calculateSlotsHeight(isBoundary:boolean): void {
            if(this.height.type==DistanceType.fixed){
                this.calculatedHeight = this.height.value;
            }else if(this.parent&&this.verticalAlignment==VerticalAlignment.Strech&&isBoundary) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight - this.margin.top - this.margin.bottom;
            }
        }

        calculateSlotsWidth(isBoundary:boolean): void {
            if(this.width.type==DistanceType.fixed){
                this.calculatedWidth = this.width.value;
            }else if(this.parent&&this.horizonAlignment==HorizonAlignment.Strech&&isBoundary) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth - this.margin.left - this.margin.right;
            }
        }

        dispose(): void {
        }
    }


}