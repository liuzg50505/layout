namespace LayoutLzg {

    export class PriorityXmlWidgetParserProvider extends XmlWidgetParserProvider{

        private providers:List<XmlWidgetParserProvider>;

        constructor() {
            super();
            this.providers = new List<XmlWidgetParserProvider>();
        }

        canProvide(xml:string): boolean {
            for (let provider of this.providers)  {
                if(provider.canProvide(xml)) return true;
            }
            return false;
        }

        getWidgetParser(xml:string): LayoutLzg.WidgetParser {
            for (let provider of this.providers)  {
                if(provider.canProvide(xml)) {
                    return provider.getWidgetParser(xml);
                }
            }
            return null;
        }

    }

}