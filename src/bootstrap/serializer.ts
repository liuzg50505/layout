namespace LayoutLzg {

    export function getDefaultStringSerializerProvider(): StringSerializerProvider {
        let provider = new PriorityStringSerializerProvider();

        provider.registTypeSerialzier("number",new NumberStringSerializer());
        provider.registTypeSerialzier("string",new StringStringSerializer());
        provider.registTypeSerialzier("Distance",new DistanceStringSerializer());
        provider.registTypeSerialzier("SolidColorBrush",new SolidColorBrushStringSerializer());
        provider.registTypeSerialzier("HorizonAlignment",new HorizonAlignmentStringSerializer());
        provider.registTypeSerialzier("VerticalAlignment",new VerticalAlignmentStringSerializer());

        return provider;
    }

    export function getDefaultXmlSerializerProvider() : XmlSerializerProvider{
        let provider = new PriorityXmlSerializerProvider();

        provider.registTypeSerialzier("GradiantColorBrush", new GradiantColorBrushXmlSerializer());
        provider.registTypeSerialzier("ImageColorBrush", new ImageColorBrushXmlSerializer());

        return provider;

    }


}