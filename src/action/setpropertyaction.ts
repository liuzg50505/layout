namespace LayoutLzg {
    export class SetPropertyAction extends Action{

        control:Control;
        propertyName:string;
        value:any;

        execute(): void {
            let setter = new ControlPropertySetter(this.control, this.propertyName);
            setter.setValue(this.value);
        }
    }
}
