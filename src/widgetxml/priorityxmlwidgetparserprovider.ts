namespace LayoutLzg {

    export class PriorityXmlWidgetParserProvider extends XmlWidgetParserProvider{

        private providers:List<XmlWidgetParserProvider>;

        constructor() {
            super();
            this.providers = new List<XmlWidgetParserProvider>();
        }

        canProvide(): boolean {
            for (let provider of this.providers)  {
                provider.xml = this.xml;
                if(provider.canProvide()) return true;
            }
            return false;
        }

        getWidgetParser(): LayoutLzg.WidgetParser {
            for (let provider of this.providers)  {
                provider.xml = this.xml;
                if(provider.canProvide()) {
                    return provider.getWidgetParser();
                }
            }
            return null;
        }

    }

}