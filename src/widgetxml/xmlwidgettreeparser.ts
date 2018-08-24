namespace LayoutLzg {

    export abstract class XmlWidgetTreeParser extends WidgetParser {
        parserProvider: XmlWidgetParserProvider;
        abstract parseWidget(xml:string):Widget;
    }

}