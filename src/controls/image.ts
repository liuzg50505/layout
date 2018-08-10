namespace LayoutLzg{
    export class ImageView extends ControlBase {

        imgElem:HTMLElement;
        src:string;

        constructor(name: string) {
            super(name);
        }

        assembleDom(): void { 
            $(this.getRootElement()).empty();

            if(this.imgElem==null) {
                this.imgElem = $("<img/>")[0];
                $(this.imgElem).attr('src',this.src);
            }
            $(this.getRootElement()).append(this.imgElem);
            if(this.width.type==DistanceType.fixed) {
                $(this.getRootElement()).css('width',this.width.value+'px');
                $(this.imgElem).css('width',this.width.value+'px');
            }else{
                $(this.imgElem).css('width','100%');
            }

            if(this.height.type==DistanceType.fixed) {
                $(this.getRootElement()).css('height',this.height.value+'px');
                $(this.imgElem).css('height',this.height.value+'px');
            }else{
                $(this.imgElem).css('height','100%');
            }

        }

        doLayout(): void {
            
        }

        estimateHeight_auto(): number {
            return 0;
        }

        estimateWidth_auto(): number {
            return 0;
        }
    }
}