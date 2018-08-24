namespace LayoutLzg {
    export abstract class XmlSerializerProvider {

        abstract getXmlSerializerByType(type:string):XmlSerializer;

    }
}