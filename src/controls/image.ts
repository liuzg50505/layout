namespace LayoutLzg{
    export class ImageView extends WidgetBase {

        imgElem:HTMLElement;
        src:string;

        constructor(name: string) {
            super(name);
        }

        assembleDom(): void {
            emptyChildren(this.getRootElement());

            if(this.imgElem==null) {
                this.imgElem = createElement("IMAGE");
                setattr(this.imgElem,'src',this.src);
            }
            appendChild(this.getRootElement(),this.imgElem);
            if(this.width.type==DistanceType.fixed) {
                css(this.getRootElement(),'width',this.width.value+'px');
                css(this.imgElem,'width',this.width.value+'px');
            }else{
                css(this.imgElem,'width','100%');
            }

            if(this.height.type==DistanceType.fixed) {
                css(this.getRootElement(),'height',this.height.value+'px');
                css(this.imgElem,'height',this.height.value+'px');
            }else{
                css(this.imgElem,'height','100%');
            }

        }

        doLayout(): void {
            
        }

    }
}