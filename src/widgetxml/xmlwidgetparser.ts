namespace LayoutLzg {

    export abstract class XmlWidgetParser extends WidgetParser {

        abstract parseWidget(xml: string): Widget ;
    }

}