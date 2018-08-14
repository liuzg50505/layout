

namespace LayoutLzg {

    export class DomSizePropertyChangedListener extends PropertyChangedListener{
        private dom: HTMLElement;
        private callbackfun:any;

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
            this.dom = <HTMLElement>obj;
        }

        startListen(): void {
            let self = this;
            this.callbackfun = function () {
                if(self.callback)
                    self.callback.apply(self.dom,[self.dom.offsetWidth]);
            };
            $(this.dom).resize(this.callbackfun);
        }

        stopListen(): void {
            $(this.dom).off("resize",this.callbackfun);
        }

    }

    export class DomSizePropertyChangedListenerProvider extends PropertyChangedListenerProvider{

        getPropertyChangedListener(obj: any, propertyName: string): PropertyChangedListener {
            return new DomSizePropertyChangedListener(obj,propertyName);
        }

        canProvideChangedListener(obj: any, propertyName: string): boolean {
            if (obj instanceof HTMLElement) {
                if(propertyName=="width"||propertyName=="height"){
                    return true;
                }
            }
            return false;
        }

    }

}