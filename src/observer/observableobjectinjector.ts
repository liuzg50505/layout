
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

        constructor() {
            this.parent = null;
            this.propertyName = "";
            this.propChangedCallbackList = [];
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


}