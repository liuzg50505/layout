namespace LayoutLzg {

    export class WidgetPropertyGetter extends PropertyGetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        getValue(): any {
            let widget:any = <VisualElement>this.obj;
            if(this.propertyName in widget) {
                return widget[this.propertyName];
            }
            return null;
        }

    }

    export class WidgetPropertySetter extends PropertySetter{

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
        }

        setValue(value: any): void {
            let widget:any = <VisualElement>this.obj;
            if(this.propertyName in widget) {
                widget[this.propertyName] = value;
                let widget1:Widget = <Widget>this.obj;
                widget1.assembleDom();
                widget1.calculateWidthFromTop();
                widget1.calculateHeightFromTop();
                widget1.doLayout();
            }
        }

    }

    export class WidgetPropertyGetterProvider extends PropertyGetterProvider{

        canProvideGetter(obj: any, propertyName: string): boolean {
            return obj instanceof VisualElement;

        }

        getPropertyGetter(obj: any, propertyName: string): PropertyGetter {
            return new WidgetPropertyGetter(obj, propertyName);
        }

    }

    export class WidgetPropertySetterProvider extends PropertySetterProvider{

        canProvideSetter(obj: any, propertyName: string): boolean {
            return obj instanceof VisualElement;
        }

        getPropertySetter(obj: any, propertyName: string): PropertySetter {
            return new WidgetPropertySetter(obj, propertyName);
        }

    }

    export class WidgetPropertyChangedListener extends PropertyChangedListener{
        private widget: VisualElement;
        private callbackfun:any;

        constructor(obj: any, propertyName: string) {
            super(obj, propertyName);
            this.widget = <VisualElement>obj;
        }

        startListen(): void {
            let self = this;
            this.callbackfun = function () {
                if(self.callback)
                    self.callback.apply(self.widget,[self.widget]);
            };
            this.widget.addPropertyChangedListener(this.propertyName,this.callbackfun);
        }

        stopListen(): void {
            this.widget.removePropertyChangedListener(this.callbackfun);
        }

    }

    export class WidgetPropertyChangedListenerProvider extends PropertyChangedListenerProvider{

        getPropertyChangedListener(obj: any, propertyName: string): PropertyChangedListener {
            return new WidgetPropertyChangedListener(obj,propertyName);
        }

        canProvideChangedListener(obj: any, propertyName: string): boolean {
            if (obj instanceof VisualElement) {
                let widget = <VisualElement>obj;
                return widget.getNotifyProperties().indexOf(propertyName)>-1;
            }
            return false;
        }

    }


}