
namespace LayoutLzg.ObserverModel {

    const configPropertyName:string = "__observable__";


    export class PropertyChangedEventArgs {
        obj:any;
        propertyName : string;
        oldValue : any;
        newValue : any;

        constructor(obj:any,propertyName: string, oldValue: any, newValue: any) {
            this.obj = obj;
            this.propertyName = propertyName;
            this.oldValue = oldValue;
            this.newValue = newValue;
        }
    }

    export class ObjectConfig {
        parent:any;
        propertyName:string;
        props:any={};
        propChangedCallbackList:Array<(args:PropertyChangedEventArgs)=>void>;
        arrvalues:Array<any> = [];

        constructor() {
            this.parent = null;
            this.propertyName = "";
            this.propChangedCallbackList = [];
            this.arrvalues = [];
        }

        notifyPropertyChanged(args:PropertyChangedEventArgs):void {
            for(let i=0;i<this.propChangedCallbackList.length;i++){
                let callback = this.propChangedCallbackList[i];
                callback(args);
            }
            let cfg = getObjectConfig(args.obj);
            if(cfg.parent){
                let parentCfg = getObjectConfig(cfg.parent);
                parentCfg.notifyPropertyChanged(new PropertyChangedEventArgs(
                    cfg.parent,
                    cfg.propertyName+"."+args.propertyName,
                    args.oldValue,
                    args.newValue
                ));
            }
        }

        addPropertyChangedCallback(callback:(args:PropertyChangedEventArgs)=>void):void {
            this.propChangedCallbackList.push(callback);
        }

        removePropertyChangedCallback(callback:(args:PropertyChangedEventArgs)=>void):void {
            let idx = this.propChangedCallbackList.indexOf(callback);
            if(idx>-1) {
                this.propChangedCallbackList.splice(idx,1);
            }
        }


    }

    export function getObjectConfig(obj:any): ObjectConfig {
        if(!(configPropertyName in obj)) {
            let cfg = new ObjectConfig();
            obj[configPropertyName] = cfg;
            // obj[configPropertyName] = {
            //     parent:null,
            //     propertyName:null,
            //     props:{},
            //     propChangedCallbackList : [],
            //     notifyPropertyChanged : function(args:PropertyChangedEventArgs) {
            //         for(let i=0;i<this.propChangedCallbackList.length;i++){
            //             let callback = this.propChangedCallbackList[i];
            //             callback(args);
            //         }
            //         let cfg = getObjectConfig(args.obj);
            //         if(cfg.parent){
            //             let parentCfg = getObjectConfig(cfg.parent);
            //             parentCfg.notifyPropertyChanged(new PropertyChangedEventArgs(
            //                 cfg.parent,
            //                 cfg.propertyName+"."+args.propertyName,
            //                 args.oldValue,
            //                 args.newValue
            //             ));
            //         }
            //     },
            //     addPropertyChangedCallback : function (callback:(args:PropertyChangedEventArgs)=>void) {
            //         this.propChangedCallbackList.push(callback);
            //     },
            //     removePropertyChangedCallback: function (callback:(args:PropertyChangedEventArgs)=>void) {
            //         let idx = this.propChangedCallbackList.indexOf(callback);
            //         if(idx>-1) {
            //             this.propChangedCallbackList.splice(idx,1);
            //         }
            //     }
            // };
        }
        return obj[configPropertyName];
    }

    export function injectProperties(obj:any) {
        if (obj==null) return;
        if (Object.prototype.toString.call(obj)=='[object Object]') {
            injectObjectProperties(obj);
        }else if(Object.prototype.toString.call(obj)=='[object Array]'){

        }
    }

    export function injectObjectProperties(obj: any) {
        if (obj==null) return;
        let cfg = getObjectConfig(obj);
        for (let propertyName in obj) {
            if(propertyName==configPropertyName) continue;
            if(!obj.hasOwnProperty(propertyName)) continue;
            let propValue = obj[propertyName];
            if(toString.call(propValue)=='[object Function]'){
                continue;
            }else if(toString.call(propValue)=='[object Object]'){
                injectProperties(propValue);
            }
            let descriptor = Object.getOwnPropertyDescriptor(obj,propertyName);
            if('value' in descriptor){
                let t = descriptor.value;
                if(toString.call(t)=='[object Function]'){
                    continue;
                }else if(toString.call(propValue)=='[object Object]'){
                    injectProperties(propValue);
                    let childCfg = getObjectConfig(propValue);
                    childCfg.parent = obj;
                    childCfg.propertyName = propertyName;
                }
            }else {
                continue;
            }

            cfg.props[propertyName] = obj[propertyName];

            (function (propertyName:string) {
                Object.defineProperty(obj,propertyName,{
                    'get':function () {
                        return getObjectConfig(this).props[propertyName];
                    },
                    'set':function (value) {
                        injectProperties(this);
                        let oldValue = getObjectConfig(this).props[propertyName];
                        getObjectConfig(this).props[propertyName]=value;
                        getObjectConfig(this).notifyPropertyChanged(
                            new PropertyChangedEventArgs(
                                this,
                                propertyName,
                                oldValue,
                                value
                            )
                        );
                    }
                });
            })(propertyName);
        }
    }

    export function injectArrayProperties(obj: any) {
        if(obj==null) return;
        let cfg = getObjectConfig(obj);
        Object.defineProperty(obj, "push", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function() {
                for (let i=0;i<arguments.length;i++){
                    let argv = arguments[i];
                    cfg.arrvalues.push(argv);
                }
                return cfg.arrvalues.length;
            }
        });

        Object.defineProperty(obj, "pop", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function() {
                if (cfg.arrvalues.length > -1) {
                    var index = cfg.arrvalues.length - 1,
                        item = cfg.arrvalues.pop();
                    delete obj[index];
                    return item;
                }
            }
        });

        Object.defineProperty(obj, "unshift", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function() {
                for (var i = 0, ln = arguments.length; i < ln; i++) {
                    cfg.arrvalues.splice(i, 0, arguments[i]);
                    //defineIndexProperty(_array.length - 1);
                    // raiseEvent({
                    //     type: "itemadded",
                    //     index: i,
                    //     item: arguments[i]
                    // });
                }
                for (; i < cfg.arrvalues.length; i++) {
                    // raiseEvent({
                    //     type: "itemset",
                    //     index: i,
                    //     item: _array[i]
                    // });
                }
                return cfg.arrvalues.length;
            }
        });

        Object.defineProperty(obj, "shift", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function() {
                if (cfg.arrvalues.length > -1) {
                    var item = cfg.arrvalues.shift();
                    delete obj[cfg.arrvalues.length];
                    // raiseEvent({
                    //     type: "itemremoved",
                    //     index: 0,
                    //     item: item
                    // });
                    return item;
                }
            }
        });


    }


}