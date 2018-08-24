namespace LayoutLzg {
    export class ButtonXmlParse extends XmlWidgetTreeParser {


        parseWidget(xml:string): Widget {
            let xmlWrapper = new XmlWrapper(xml);
            let button = new Button(xmlWrapper.tagName);
            return button;
        }

    }
}