namespace LayoutLzg {

    export class StyleItem {
        name:string;
        propertyName:string;
        value:any;

        apply(rootControl:Widget) {
            let control = VisualTree.findControlByName(rootControl, this.name);
            if(control==null) return;
            let setter = new WidgetPropertySetter(control, this.propertyName);
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

        addStyleItem(controlName:string, propertyName:string, value:any):void {
            let item = new StyleItem();
            item.name = controlName;
            item.propertyName = propertyName;
            item.value = value;
            this.styleitems.add(item);
        }

        apply(rootControl:Widget): void {
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