namespace LayoutLzg {
    export class PriorityStringSerializerProvider extends StringSerializerProvider{

        private typeSerializerMap:Map<string, StringSerializer>;

        constructor() {
            super();
            this.typeSerializerMap = new Map<string, StringSerializer>();
        }

        registTypeSerialzier(type:string, serializer: StringSerializer):void {
            this.typeSerializerMap.put(type, serializer);
        }

        getStringSerializerByType(type: string): StringSerializer {
            return this.typeSerializerMap.get(type);
        }

    }
}