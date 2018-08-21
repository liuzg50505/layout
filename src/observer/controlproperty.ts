namespace LayoutLzg {

    export class ControlPropertyGetter extends PropertyGetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        getValue(): any {
            let control:any = <VisualElement>this.obj;
            if(this.propertyName in control) {
                return control[this.propertyName];
            }
            return null;
        }

    }

    export class ControlPropertySetter extends PropertySetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        setValue(value: any): void {
            let control:any = <VisualElement>this.obj;
            if(this.propertyName in control) {
                control[this.propertyName] = value;
                let control1:Widget = <Widget>this.obj;
                control1.assembleDom();
                control1.calculateWidthFromTop();
                control1.calculateHeightFromTop();
                control1.doLayout();
            }
        }

    }

    export class ControlPropertyGetterProvider extends PropertyGetterProvider{

        canProvideGetter(obj: any, propertyName: string): boolean {
            return obj instanceof VisualElement;

        }

        getPropertyGetter(obj: any, propertyName: string): PropertyGetter {
            return new ControlPropertyGetter(obj, propertyName);
        }

    }

    export class ControlPropertySetterProvider extends PropertySetterProvider{

        canProvideSetter(obj: any, propertyName: string): boolean {
            return obj instanceof VisualElement;
        }

        getPropertySetter(obj: any, propertyName: string): PropertySetter {
            return new ControlPropertySetter(obj, propertyName);
        }

    }

    export class ControlPropertyChangedListener extends PropertyChangedListener{
        private control: VisualElement;
        private callbackfun:any;

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
            this.control = <VisualElement>obj;
        }

        startListen(): void {
            let self = this;
            this.callbackfun = function () {
                if(self.callback)
                    self.callback.apply(self.control,[self.control]);
            };
            this.control.addPropertyChangedListener(this.propertyName,this.callbackfun);
        }

        stopListen(): void {
            this.control.removePropertyChangedListener(this.callbackfun);
        }

    }

    export class ControlPropertyChangedListenerProvider extends PropertyChangedListenerProvider{

        getPropertyChangedListener(obj: any, propertyName: string): PropertyChangedListener {
            return new ControlPropertyChangedListener(obj,propertyName);
        }

        canProvideChangedListener(obj: any, propertyName: string): boolean {
            if (obj instanceof VisualElement) {
                let control = <VisualElement>obj;
                return control.getNotifyProperties().indexOf(propertyName)>-1;
            }
            return false;
        }

    }


}