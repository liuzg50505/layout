namespace LayoutLzg {

    export class DomWidthPropertyChangedListener extends PropertyChangedListener{
        private dom: HTMLElement;

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
            this.dom = <HTMLElement>obj;
        }

        resizeCallback():void{
            this.listener.apply(this.dom,this.dom.offsetWidth);
        }

        startListen(): void {
            $(this.dom).resize(this.resizeCallback);
        }

        stopListen(): void {
            $(this.dom).off("resize",this.resizeCallback);
        }

    }


}