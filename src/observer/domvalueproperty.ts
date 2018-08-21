namespace LayoutLzg {

    export class DomValuePropertyGetter extends PropertyGetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        getValue(): any {
            let dom = <HTMLElement>this.obj;
            if(dom.tagName=="INPUT"||dom.tagName=="input") {
                let input = <HTMLInputElement>dom;
                if(input.type=="date") {
                    return input.valueAsDate;
                }else if(input.type=="checkbox"){
                    return input.checked;
                }else{
                    return getElemValue(dom);
                }
            }
            return getElemText(dom);
        }

    }

    export class DomValuePropertySetter extends PropertySetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        setValue(value: any): void {
            let dom = <HTMLElement>this.obj;
            if(dom.tagName=="INPUT"||dom.tagName=="input") {
                let input = <HTMLInputElement>dom;
                if(input.type=="date") {
                    input.value = value;
                }else if(input.type=="checkbox"){
                    input.checked = value;
                }else{
                    setElemValue(dom,value);
                    return;
                }
            }
            setElemText(dom, value);
        }

    }

    export class DomValuePropertyGetterProvider extends PropertyGetterProvider{

        canProvideGetter(obj: any, propertyName: string): boolean {
            return obj instanceof HTMLElement && propertyName == "value";

        }

        getPropertyGetter(obj: any, propertyName: string): PropertyGetter {
            return new DomValuePropertyGetter(obj, propertyName);
        }

    }

    export class DomValuePropertySetterProvider extends PropertySetterProvider{

        canProvideSetter(obj: any, propertyName: string): boolean {
            return obj instanceof HTMLElement && propertyName == "value";

        }

        getPropertySetter(obj: any, propertyName: string): PropertySetter {
            return new DomValuePropertySetter(obj, propertyName);
        }

    }

    export class DomValuePropertyChangedListener extends PropertyChangedListener{
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
            onEvent(this.dom, "change", this.callbackfun);
        }

        stopListen(): void {
            offEvent(this.dom,"resize",this.callbackfun);
        }

    }

    export class DomValuePropertyChangedListenerProvider extends PropertyChangedListenerProvider{

        getPropertyChangedListener(obj: any, propertyName: string): PropertyChangedListener {
            return new DomValuePropertyChangedListener(obj,propertyName);
        }

        canProvideChangedListener(obj: any, propertyName: string): boolean {
            if (obj instanceof HTMLElement) {
                if(propertyName=="value"){
                    return true;
                }
            }
            return false;
        }

    }

}