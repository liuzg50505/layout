namespace LayoutLzg {

    import getObjectConfig = LayoutLzg.ObserverModel.getObjectConfig;
    import PropertyChangedEventArgs = LayoutLzg.ObserverModel.PropertyChangedEventArgs;

    export class DictPropertyGetter extends PropertyGetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        getValue(): any {
            return this.obj[this.propertyName];
        }

    }

    export class DictPropertySetter extends PropertySetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        setValue(value: any): void {
            this.obj[this.propertyName] = value;
        }

    }

    export class DictPropertyChangedListener extends PropertyChangedListener{

        private callbackfunc:any;

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        startListen(): void {
            let self = this;
            this.callbackfunc = function (args: PropertyChangedEventArgs) {
                self.callback.apply(this,[self.obj]);
            };
            ObserverModel.injectProperties(this.obj);
            ObserverModel.getObjectConfig(this.obj).addPropertyChangedCallback(this.callbackfunc);
        }

        stopListen(): void {
            ObserverModel.getObjectConfig(this.obj).removePropertyChangedCallback(this.callbackfunc);
        }

    }

    export class DictPropertyGetterProvider extends PropertyGetterProvider {
        canProvideGetter(obj: any, propertyName: string): boolean {
            return true;
        }

        getPropertyGetter(obj: any, propertyName: string): LayoutLzg.PropertyGetter {
            return new DictPropertyGetter(obj, propertyName);
        }
    }

    export class DictPropertySetterProvider extends PropertySetterProvider {
        canProvideSetter(obj: any, propertyName: string): boolean {
            return true;
        }

        getPropertySetter(obj: any, propertyName: string): PropertySetter {
            return new DictPropertySetter(obj, propertyName);
        }
    }

    export class DictPropertyChangedListenerProvider extends PropertyChangedListenerProvider{
        canProvideChangedListener(obj: any, propertyName: string): boolean {
            return true;
        }

        getPropertyChangedListener(obj: any, propertyName: string): PropertyChangedListener {
            return new DictPropertyChangedListener(obj, propertyName);
        }
    }


}