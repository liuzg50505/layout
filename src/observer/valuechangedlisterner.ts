namespace LayoutLzg{

    export abstract class PropertyChangedListener implements Disposable{
        obj:any;
        propertyName:string;
        protected listener: Function;


        constructor(obj: any, propertyName: string) {
            this.obj = obj;
            this.propertyName = propertyName;
        }

        setPropertyChangedListener(listener:Function):void{
            this.listener = listener;
        }

        removePropertyChangedListener():void{
            this.listener = null;
        }

        abstract startListen():void;
        abstract stopListen():void;

        dispose(): void {
            this.removePropertyChangedListener();
        }

    }

    export abstract class PropertyChangedListenerProvider {
        abstract getPropertyChangedListener(obj:any,propertyName:string):PropertyChangedListener;
    }


}