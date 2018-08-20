namespace LayoutLzg{
    export class Rect extends ControlBase {

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
            let elem = super.getRootElement();
            $(elem).attr('layout-type','Rect');
            $(elem).attr('layout-name',this.name);
            return elem;
        }

        assembleDom(): void {
            super.assembleDom();
        }

        doLayout(): void {
            super.doLayout();
            $(this.getRootElement()).css('width',this.estimateWidth()+'px');
            $(this.getRootElement()).css('height',this.estimateHeight()+'px');
            // stroke and fill
            if(this.fill) this.fill.applyToBackground(this.rootElem);
            if(this.stroke) this.stroke.applyToBorder(this.rootElem,this.strokeThickness);
            // radius
            $(this.rootElem).css("border-bottom-left-radius",this.radius_bottom_left+"px");
            $(this.rootElem).css("border-bottom-right-radius",this.radius_bottom_right+"px");
            $(this.rootElem).css("border-top-left-radius",this.radius_top_left+"px");
            $(this.rootElem).css("border-top-right-radius",this.radius_top_right+"px");
            // opacity
            $(this.rootElem).css("opacity",this.opacity);
            // shadow
            if(this.shadow) {
                $(this.rootElem).css("box-shadow",this.shadow.toBoxShawdowString());
            }

        }

        estimateHeight_auto(): number {
            return 0;
        }

        estimateWidth_auto(): number {
             return 0;
        }
    }


}