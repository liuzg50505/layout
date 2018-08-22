namespace LayoutLzg {
    export abstract class XmlSerializer {
        abstract serialize(value:any):string;
        abstract deserialize(str:string):any;
    }
}