

namespace LayoutLzg {

    export class DomWidthPropertyGetter extends PropertyGetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        getValue(): any {
            let dom = <HTMLElement>this.obj;
            return dom.offsetWidth;
        }

    }

    export class DomWidthPropertySetter extends PropertySetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        setValue(value: any): void {
            let dom = <HTMLElement>this.obj;
            dom.style.width = value+"px";
        }

    }

    export class DomWidthPropertyGetterProvider extends PropertyGetterProvider{

        canProvideGetter(obj: any, propertyName: string): boolean {
            return obj instanceof HTMLElement && propertyName == "width";

        }

        getPropertyGetter(obj: any, propertyName: string): PropertyGetter {
            return new DomWidthPropertyGetter(obj, propertyName);
        }

    }

    export class DomWidthPropertySetterProvider extends PropertySetterProvider{

        canProvideSetter(obj: any, propertyName: string): boolean {
            return obj instanceof HTMLElement && propertyName == "width";

        }

        getPropertySetter(obj: any, propertyName: string): PropertySetter {
            return new DomWidthPropertySetter(obj, propertyName);
        }

    }


    export class DomHeightPropertyGetter extends PropertyGetter {
        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        getValue(): any {
            let dom = <HTMLElement>this.obj;
            return dom.offsetHeight;
        }
    }

    export class DomHeightPropertySetter extends PropertySetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        setValue(value: any): void {
            let dom = <HTMLElement>this.obj;
            dom.style.height = value+"px";
        }

    }

    export class DomHeightPropertyGetterProvider extends PropertyGetterProvider{

        canProvideGetter(obj: any, propertyName: string): boolean {
            return obj instanceof HTMLElement && propertyName == "height";

        }

        getPropertyGetter(obj: any, propertyName: string): PropertyGetter {
            return new DomHeightPropertyGetter(obj, propertyName);
        }

    }

    export class DomHeightPropertySetterProvider extends PropertySetterProvider{

        canProvideSetter(obj: any, propertyName: string): boolean {
            return obj instanceof HTMLElement && propertyName == "height";

        }

        getPropertySetter(obj: any, propertyName: string): PropertySetter {
            return new DomHeightPropertySetter(obj, propertyName);
        }

    }


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
                    self.callback.apply(self.dom,[self.dom]);
            };
            onEvent(this.dom,"resize",this.callbackfun);
        }

        stopListen(): void {
            offEvent(this.dom,"resize",this.callbackfun);
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