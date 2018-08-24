namespace LayoutLzg {
    export function testMetaWidgetParser():any {
        let xml = `<Button name="sdf" width="auto" horizonAlignment="Right" height="33" verticalAlignment="Center">

  
    
</Button>`;
        let parser = new MetaWidgetParser(getDefaultStringSerializerProvider(),getDefaultXmlSerializerProvider());
        let w = parser.parseWidget(xml);
        console.log(w);
        let serializer = new MetaWidgetSerializer(getDefaultStringSerializerProvider(),getDefaultXmlSerializerProvider());
        let xmlout = serializer.serializeWidget(w);
        console.log(xmlout);
    }

}