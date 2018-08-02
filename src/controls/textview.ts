namespace LayoutLzg{
    export class TextView extends Control {

        text:string;
        wordWrap:boolean;
        spanElem:HTMLElement;

        constructor(name: string,text:string) {
            super(name);
            this.text = text;
            this.width = new Distance(DistanceType.auto,0);
            this.height = new Distance(DistanceType.auto,0);
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type','TextView');
                $(this.rootElem).attr('layout-name',this.name);
            }
            return this.rootElem;
        }

        estimateWidth(): number {
            if(this.width.type==DistanceType.fixed) {
                return this.width.value;
            }
            let t = $(this.getRootElement()).find('span').width();
            return t;
        }

        estimateHeight(): number {
            if(this.height.type==DistanceType.fixed) {
                return this.height.value;
            }

            return $(this.getRootElement()).find('span').height();
        }

        assembleDom(): void {
            this.spanElem = $("<span></span>")[0];
            $(this.getRootElement()).empty();
            if(this.width.type==DistanceType.fixed) $(this.getRootElement()).css('width',this.width.value+'px');
            if(this.height.type==DistanceType.fixed) $(this.getRootElement()).css('height',this.height.value+'px');
            $(this.getRootElement()).append(this.spanElem);
            $(this.spanElem).text(this.text);
            if(this.wordWrap)
                $(this.spanElem).css('word-break','break-all');
            else
                $(this.spanElem).css('word-break','normal');

        }

        doLayout(): void {
        }
    }
}