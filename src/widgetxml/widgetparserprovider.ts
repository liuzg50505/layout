namespace LayoutLzg {

    export abstract class WidgetParserProvider {
        abstract canProvide(value:string):boolean;
        abstract getWidgetParser(value:string): WidgetParser;
    }

}