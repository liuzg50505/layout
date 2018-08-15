namespace LayoutLzg{

    export abstract class PropertyGetter {
        obj:any;
        propertyName:string;

        constructor(obj: any, propertyName: string) {
            this.obj = obj;
            this.propertyName = propertyName;
        }

        abstract getValue():any ;
    }

    export abstract class PropertySetter {
        obj:any;
        propertyName:string;

        constructor(obj: any, propertyName: string) {
            this.obj = obj;
            this.propertyName = propertyName;
        }

        abstract setValue(value:any):void;
    }

    export abstract class PropertyChangedListener implements Disposable{
        obj:any;
        propertyName:string;
        protected callback: Function;


        constructor(obj: any, propertyName: string) {
            this.obj = obj;
            this.propertyName = propertyName;
        }

        setPropertyChangedCallback(listener:Function):void{
            this.callback = listener;
        }

        removePropertyChangedCallback():void{
            this.callback = null;
        }

        abstract startListen():void;
        abstract stopListen():void;

        dispose(): void {
            this.removePropertyChangedCallback();
        }

    }

    export abstract class PropertyChangedListenerProvider {
        abstract getPropertyChangedListener(obj:any, propertyName:string):PropertyChangedListener;

        abstract canProvideChangedListener(obj:any, propertyName:string):boolean;
    }

    export class UniversalPropertyChangedListenerProvider extends PropertyChangedListenerProvider{

        private providers:List<PropertyChangedListenerProvider>;

        constructor() {
            super();
            this.providers = new List<PropertyChangedListenerProvider>();
        }

        addProvider(provider:PropertyChangedListenerProvider):void {
            this.providers.add(provider);
        }

        addProviders(providers:Array<PropertyChangedListenerProvider>):void{
            for (let provider of providers) {
                this.providers.add(provider);
            }
        }

        canProvideChangedListener(obj: any, propertyName: string): boolean {
            for (let provider of this.providers) {
                if(provider.canProvideChangedListener(obj, propertyName)){
                    return true;
                }
            }
            return false;
        }

        getPropertyChangedListener(obj: any, propertyName: string): PropertyChangedListener {
            for (let provider of this.providers) {
                if(provider.canProvideChangedListener(obj, propertyName)){
                    return provider.getPropertyChangedListener(obj, propertyName);
                }
            }
            return null;
        }


    }

    export abstract class PropertyGetterProvider {
        abstract canProvideGetter(obj:any, propertyName:string):boolean;
        abstract getPropertyGetter(obj:any, propertyName:string): PropertyGetter;
    }

    export abstract class PropertySetterProvider {
        abstract canProvideSetter(obj:any, propertyName:string):boolean;
        abstract getPropertySetter(obj:any, propertyName:string): PropertySetter;
    }

    export abstract class PropertyProvider {

        abstract canProvideGetter(obj: any, propertyName: string): boolean

        abstract getPropertyGetter(obj: any, propertyName: string): PropertyGetter ;

        abstract canProvideSetter(obj: any, propertyName: string): boolean ;

        abstract getPropertySetter(obj: any, propertyName: string): PropertySetter ;

        abstract canProvidePropertyChangedListener(obj: any, propertyName: string): boolean ;

        abstract getPropertyChangedListener(obj: any, propertyName: string): PropertyChangedListener ;

    }

    export class UniversalPropertyGetterProvider extends PropertyGetterProvider{

        private providers:List<PropertyGetterProvider>;

        constructor() {
            super();
            this.providers = new List<PropertyGetterProvider>();
        }

        addProvider(provider:PropertyGetterProvider):void {
            this.providers.add(provider);
        }

        addProviders(providers:Array<PropertyGetterProvider>):void{
            for (let provider of providers) {
                this.providers.add(provider);
            }
        }

        canProvideGetter(obj:any, propertyName:string): boolean {
            for (let provider of this.providers) {
                if(provider.canProvideGetter(obj, propertyName)){
                    return true;
                }
            }
            return false;
        }

        getPropertyGetter(obj: any, propertyName: string): LayoutLzg.PropertyGetter {
            for (let provider of this.providers) {
                if(provider.canProvideGetter(obj, propertyName)){
                    return provider.getPropertyGetter(obj, propertyName);
                }
            }
            return null;
        }

    }

    export class UniversalPropertySetterProvider extends PropertySetterProvider{
        private providers:List<PropertySetterProvider>;

        constructor() {
            super();
            this.providers = new List<PropertySetterProvider>();
        }

        addProvider(provider:PropertySetterProvider):void {
            this.providers.add(provider);
        }

        addProviders(providers:Array<PropertySetterProvider>):void{
            for (let provider of providers) {
                this.providers.add(provider);
            }
        }

        canProvideSetter(obj:any, propertyName:string): boolean {
            for (let provider of this.providers) {
                if(provider.canProvideSetter(obj, propertyName)){
                    return true;
                }
            }
            return false;
        }

        getPropertySetter(obj: any, propertyName: string): PropertySetter {
            for (let provider of this.providers) {
                if(provider.canProvideSetter(obj, propertyName)){
                    return provider.getPropertySetter(obj, propertyName);
                }
            }
            return null;
        }

    }

    export class UniversalPropertyProvider extends PropertyProvider{
        private propertyGetterProvider:PropertyGetterProvider;
        private propertySetterProvider:PropertySetterProvider;
        private propertyChangedListenerProvider:PropertyChangedListenerProvider;

        constructor(propertyGetterProvider: PropertyGetterProvider,
                    propertySetterProvider: PropertySetterProvider,
                    propertyChangedListenerProvider: PropertyChangedListenerProvider) {
            super();
            this.propertyGetterProvider = propertyGetterProvider;
            this.propertySetterProvider = propertySetterProvider;
            this.propertyChangedListenerProvider = propertyChangedListenerProvider;
        }

        canProvideGetter(obj:any, propertyName:string) : boolean {
            return this.propertyGetterProvider.canProvideGetter(obj, propertyName);
        }

        getPropertyGetter(obj:any, propertyName:string) : PropertyGetter {
            return this.propertyGetterProvider.getPropertyGetter(obj, propertyName);
        }

        canProvideSetter(obj:any, propertyName:string) : boolean {
            return this.propertySetterProvider.canProvideSetter(obj, propertyName);
        }

        getPropertySetter(obj:any, propertyName:string) : PropertySetter {
            return this.propertySetterProvider.getPropertySetter(obj, propertyName);
        }

        canProvidePropertyChangedListener(obj:any, propertyName:string) : boolean {
            return this.propertyChangedListenerProvider.canProvideChangedListener(obj, propertyName);
        }

        getPropertyChangedListener(obj:any, propertyName:string) : PropertyChangedListener {
            return this.propertyChangedListenerProvider.getPropertyChangedListener(obj, propertyName);
        }

    }

}