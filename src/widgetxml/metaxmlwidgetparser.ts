namespace LayoutLzg {

    export class MetaWidgetParser extends XmlWidgetParser{

        xmlSerializerProvider:XmlSerializerProvider;
        stringSerializerProvider:StringSerializerProvider;


        constructor(stringSerializerProvider?: StringSerializerProvider, xmlSerializerProvider?: XmlSerializerProvider) {
            super();
            this.xmlSerializerProvider = xmlSerializerProvider;
            this.stringSerializerProvider = stringSerializerProvider;
        }

        parseWidget(xml: string): Widget {
            let xmlWrapper = new XmlWrapper(xml);
            let tagname = xmlWrapper.tagName;
            let instance = Reflector.instance().newInstance(tagname);
            let properties = Reflector.instance().getClassProperties(tagname);

            for (let property of properties) {
                let type = property.propertyType;
                let propName = property.propertyName;

                let stringSerializer = this.stringSerializerProvider.getStringSerializerByType(type);
                let xmlSerializer = this.xmlSerializerProvider.getXmlSerializerByType(type);


                let b1 = xmlWrapper.hasAttr(propName);
                let b2 = xmlWrapper.hasChildByTag(propName);

                if(b1&&stringSerializer){
                    let xmlvalue = <string>xmlWrapper.attr(propName);
                    let v = stringSerializer.deserialize(xmlvalue);
                    let setter = new WidgetPropertySetter(instance, propName);
                    setter.setValue(v);
                }else if(b2&&xmlSerializer){
                    let childxml = xmlWrapper.getChildByTag(propName);
                    let v = xmlSerializer.deserialize(childxml.toString());
                    let setter = new WidgetPropertySetter(instance, propName);
                    setter.setValue(v);
                }
            }
            return instance;
        }

    }

}