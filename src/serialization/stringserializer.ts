namespace LayoutLzg {

    export abstract class StringSerializer {
        abstract serialize(value:any):string;
        abstract deserialize(str:string):any;
    }

}