namespace LayoutLzg {

    export class StyleItem {
        name:string;
        propertyName:string;
        value:any;

        apply(rootControl:Control) {
            let control = VisualTree.findControlByName(rootControl, this.name);
            if(control==null) return;
            let setter = new ControlPropertySetter(control, this.propertyName);
            setter.setValue(this.value);
        }
    }

    export class Style {
        styleitems:List<StyleItem>;
        triggers:List<Trigger>;

        constructor() {
            this.styleitems = new List<StyleItem>();
            this.triggers = new List<Trigger>();
        }

        apply(rootControl:Control): void {
            if(!rootControl) return;
            for (let styleitem of this.styleitems) {
                styleitem.apply(rootControl);
            }

            for (let trigger of this.triggers)  {
                trigger.init();
            }
        }
    }


}