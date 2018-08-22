namespace LayoutLzg {

    export abstract class WidgetParserProvider {
        abstract canProvide():boolean;
        abstract getWidgetParser(): WidgetParser;
    }

}