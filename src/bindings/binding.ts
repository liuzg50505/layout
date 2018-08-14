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
        propertyChangedListenerProvider: PropertyChangedListenerProvider;

        abstract onSourceChanged():void;

        startBinding():void{

        }

        stopBinding():void{

        }

        dispose(): void {
            this.stopBinding();
        }
    }




}