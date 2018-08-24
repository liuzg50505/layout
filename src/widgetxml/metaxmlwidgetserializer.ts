namespace LayoutLzg {
    export class MetaWidgetSerializer extends XmlWidgetSerializer{
        xmlSerializerProvider:XmlSerializerProvider;
        stringSerializerProvider:StringSerializerProvider;


        constructor(stringSerializerProvider?: StringSerializerProvider, xmlSerializerProvider?: XmlSerializerProvider) {
            super();
            this.xmlSerializerProvider = xmlSerializerProvider;
            this.stringSerializerProvider = stringSerializerProvider;
        }

        serializeWidget(widget: Widget): string {
            let cons:any = widget.constructor;
            let className = cons.name;
            let xmlWrapper = new XmlWrapper("<"+className+"></"+className+">");
            let properties = Reflector.instance().getClassProperties(className);

            for (let property of properties) {
                let type = property.propertyType;
                let propName = property.propertyName;

                let stringSerializer = this.stringSerializerProvider.getStringSerializerByType(type);
                let xmlSerializer = this.xmlSerializerProvider.getXmlSerializerByType(type);

                let getter = new WidgetPropertyGetter(widget, propName);
                let value = getter.getValue();

                if(stringSerializer) {
                    let str = stringSerializer.serialize(value);
                    xmlWrapper.attr(propName, str);
                }else if(xmlSerializer) {
                    let xmlstr = xmlSerializer.serialize(value);
                    xmlWrapper.appendChild(new XmlWrapper(xmlstr));
                }
            }

            if(widget instanceof ContainerWidget) {
                let container = <ContainerWidget>widget;
                for (let childWidget of container.children) {
                    let childxml = this.serializeWidget(childWidget);
                    xmlWrapper.appendChild(
                        new XmlWrapper("<children></children>")
                            .appendChild(new XmlWrapper(childxml)));
                }
            }

            return xmlWrapper.toString();
        }

    }
}