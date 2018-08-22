namespace LayoutLzg {

    export abstract class XmlWidgetParser extends WidgetParser {
        private _xml:string;

        get xml(): string {
            return this._xml;
        }

        set xml(value: string) {
            this._xml = value;
        }

        abstract parseWidget():Widget;
    }

}