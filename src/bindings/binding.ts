namespace LayoutLzg {

    export abstract class ValueConverter {

    }

    export enum BindingMode {
        Oneway,
        Twoway
    }

    export abstract class Binding implements Disposable{
        target:any;
        targetPropertyName:string;
        converter:ValueConverter;
        mode:BindingMode;
        protected propertyProvider: PropertyProvider;

        constructor(propertyProvider:PropertyProvider) {
            this.propertyProvider = propertyProvider;
        }

        abstract updateFromSource():void;
        abstract updateFromTarget():void;

        startBinding():void{

        }

        stopBinding():void{

        }

        dispose(): void {
            this.stopBinding();
        }
    }




}