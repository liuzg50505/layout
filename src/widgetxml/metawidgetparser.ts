namespace LayoutLzg {

    export class MetaWidgetParser extends XmlWidgetParser{

        xmlSerializerProvider:XmlSerializerProvider;
        stringSerializerProvider:StringSerializerProvider;


        constructor(stringSerializerProvider?: StringSerializerProvider, xmlSerializerProvider?: XmlSerializerProvider) {
            super();
            this.xmlSerializerProvider = xmlSerializerProvider;
            this.stringSerializerProvider = stringSerializerProvider;
        }

        parseWidget(): Widget {
            let tagname = xmlTag(this.xml);
            let instance = Reflector.instance().newInstance(tagname);
            let properties = Reflector.instance().getClassProperties(tagname);

            for (let property of properties) {
                let type = property.propertyType;
                let propName = property.propertyName;

                let stringSerializer = this.stringSerializerProvider.getStringSerializerByType(type);
                let xmlSerializer = this.xmlSerializerProvider.getXmlSerializerByType(type);

                let b1 = xmlContainAttribute(this.xml,propName);
                let b2 = xmlContainChildTag(this.xml,propName);

                if(b1){
                    let xmlvalue = xmlGetAttribute(this.xml, propName);
                    let v = stringSerializer.deserialize(xmlvalue);
                    let setter = new ControlPropertySetter(instance, propName);
                    setter.setValue(v);
                }else if(b2){
                    let childxml = xmlGetChildByTag(this.xml, propName);
                    let v = xmlSerializer.deserialize(childxml);
                    let setter = new ControlPropertySetter(instance, propName);
                    setter.setValue(v);
                }
            }
            return instance;
        }

    }
}