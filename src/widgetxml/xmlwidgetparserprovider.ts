namespace LayoutLzg {

    export abstract class XmlWidgetParserProvider extends WidgetParserProvider{
        private _xml:string;

        get xml(): string {
            return this._xml;
        }

        set xml(value: string) {
            this._xml = value;
        }

    }

}