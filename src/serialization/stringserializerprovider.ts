namespace LayoutLzg {
    export abstract class StringSerializerProvider {

        abstract getStringSerializerByType(type:string):StringSerializer;

    }
}