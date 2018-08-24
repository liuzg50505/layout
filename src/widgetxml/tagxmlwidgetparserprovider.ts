namespace LayoutLzg {
    export class TagXmlWidgetParserProvider extends XmlWidgetParserProvider{

        private tagParserMap:Map<string,XmlWidgetParser>;

        constructor() {
            super();
            this.tagParserMap = new Map<string, XmlWidgetParser>();
        }

        registTagProvider(tag:string, parser:XmlWidgetParser):void {
            this.tagParserMap.put(tag, parser);
        }

        getWidgetParser(xml:string): WidgetParser {
            let xmlWrapper = new XmlWrapper(xml);
            let tag = xmlWrapper.tagName;
            return this.tagParserMap.get(tag);
        }

        canProvide(xml:string): boolean {
            let xmlWrapper = new XmlWrapper(xml);
            let tag = xmlWrapper.tagName;
            return this.tagParserMap.containsKey(tag);
        }
    }
}