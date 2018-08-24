namespace LayoutLzg {

    export abstract class XmlWidgetTreeParser extends WidgetParser {
        private _xml:string;
        parserProvider: XmlWidgetParserProvider;

        get xml(): string {
            return this._xml;
        }

        set xml(value: string) {
            this._xml = value;
        }

        abstract parseWidget():Widget;
    }

}