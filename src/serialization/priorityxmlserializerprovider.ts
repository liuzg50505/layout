namespace LayoutLzg {
    export class PriorityXmlSerializerProvider extends XmlSerializerProvider{

        private typeSerializerMap:Map<string, StringSerializer>;

        constructor() {
            super();
            this.typeSerializerMap = new Map<string, StringSerializer>();
        }

        registTypeSerialzier(type:string, serializer: StringSerializer):void {
            this.typeSerializerMap.put(type, serializer);
        }


        getXmlSerializerByType(type: string): LayoutLzg.XmlSerializer {
            return this.typeSerializerMap.get(type);
        }


    }
}