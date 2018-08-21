namespace LayoutLzg {

    export class DomTextPropertyGetter extends PropertyGetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        getValue(): any {
            let dom = <HTMLElement>this.obj;
            if(dom.tagName=="INPUT"||dom.tagName=="input") {
                return getElemValue(dom);
            }
            return getElemText(dom);
        }

    }

    export class DomTextPropertySetter extends PropertySetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        setValue(value: any): void {
            let dom = <HTMLElement>this.obj;
            if(dom.tagName=="INPUT"||dom.tagName=="input") {
                setElemValue(dom,value);
                return;
            }
            setElemText(dom,value);
        }

    }

    export class DomTextPropertyGetterProvider extends PropertyGetterProvider{

        canProvideGetter(obj: any, propertyName: string): boolean {
            return obj instanceof HTMLElement && propertyName == "text";

        }

        getPropertyGetter(obj: any, propertyName: string): PropertyGetter {
            return new DomTextPropertyGetter(obj, propertyName);
        }

    }

    export class DomTextPropertySetterProvider extends PropertySetterProvider{

        canProvideSetter(obj: any, propertyName: string): boolean {
            return obj instanceof HTMLElement && propertyName == "text";

        }

        getPropertySetter(obj: any, propertyName: string): PropertySetter {
            return new DomTextPropertySetter(obj, propertyName);
        }

    }

    export class DomTextPropertyChangedListener extends PropertyChangedListener{
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
                    self.callback.apply(self.dom,[self.dom]);
            };
            onEvent(this.dom, "change",this.callbackfun);
        }

        stopListen(): void {
            offEvent(this.dom,"change",this.callbackfun);
        }

    }

    export class DomTextPropertyChangedListenerProvider extends PropertyChangedListenerProvider{

        getPropertyChangedListener(obj: any, propertyName: string): PropertyChangedListener {
            return new DomTextPropertyChangedListener(obj,propertyName);
        }

        canProvideChangedListener(obj: any, propertyName: string): boolean {
            if (obj instanceof HTMLElement) {
                if(propertyName=="text"){
                    return true;
                }
            }
            return false;
        }

    }

}