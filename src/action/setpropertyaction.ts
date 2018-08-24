namespace LayoutLzg {
    export class SetPropertyAction extends Action{

        widget:Widget;
        propertyName:string;
        value:any;

        execute(): void {
            let setter = new WidgetPropertySetter(this.widget, this.propertyName);
            setter.setValue(this.value);
        }
    }
}
