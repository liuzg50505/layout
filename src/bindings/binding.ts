namespace LayoutLzg {

    export abstract class ValueConverter {

        abstract convert(value:any):any;

        abstract convertBack(value:any):any;

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

        setConverter(converter: ValueConverter): Binding {
            this.converter = converter;
            return this;
        }

        setMode(mode: BindingMode): Binding {
            this.mode = mode;
            return this;
        }

        startBinding():Binding{
            return this;
        }

        stopBinding():Binding{
            return this;
        }

        dispose(): void {
            this.stopBinding();
        }
    }




}