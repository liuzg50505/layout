namespace LayoutLzg {
    export class ButtonXmlParse extends XmlWidgetTreeParser {


        parseWidget(): Widget {
            let button = new Button(xmlGetAttribute(this.xml,"name"));
            let contentchild = xmlGetChildByTag(this.xml,"content");
            if(!contentchild) {
                button.content = xmlGetAttribute(this.xml,"content");
            }else{
                if(this.parserProvider){
                    let childxml = xmlGetFirstChild(contentchild);
                    this.parserProvider.xml = childxml;
                    let parser = this.parserProvider.getWidgetParser();
                    if(parser) {
                        let contentWidget = parser.parseWidget();
                        if(contentWidget){
                            button.content = contentWidget;
                        }
                    }

                }
            }
            return button;
        }

    }
}