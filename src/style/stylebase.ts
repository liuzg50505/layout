namespace LayoutLzg {

    export class StyleItem {
        name:string;
        propertyName:string;
        value:any;

        apply(rootWidget:Widget) {
            let widget = VisualTree.findWidgetByName(rootWidget, this.name);
            if(widget==null) return;
            let setter = new WidgetPropertySetter(widget, this.propertyName);
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

        addStyleItem(widgetName:string, propertyName:string, value:any):void {
            let item = new StyleItem();
            item.name = widgetName;
            item.propertyName = propertyName;
            item.value = value;
            this.styleitems.add(item);
        }

        apply(rootWidget:Widget): void {
            if(!rootWidget) return;
            for (let styleitem of this.styleitems) {
                styleitem.apply(rootWidget);
            }

            for (let trigger of this.triggers)  {
                trigger.init();
            }
        }
    }


}