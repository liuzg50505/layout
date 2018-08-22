namespace LayoutLzg {
    export class SetPropertyAction extends Action{

        control:Widget;
        propertyName:string;
        value:any;

        execute(): void {
            let setter = new WidgetPropertySetter(this.control, this.propertyName);
            setter.setValue(this.value);
        }
    }
}
