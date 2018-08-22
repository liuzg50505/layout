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

        getWidgetParser(): WidgetParser {
            let tag = xmlTag(this.xml);
            return this.tagParserMap.get(tag);
        }

        canProvide(): boolean {
            let tag = xmlTag(this.xml);
            return this.tagParserMap.containsKey(tag);
        }
    }
}