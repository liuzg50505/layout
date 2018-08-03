
namespace LayoutLzg.ObserverModel {

    const configPropertyName:string = "__observable__";


    export class PropertyChangedEventArgs {
        propertyName : string;
        oldValue : any;
        newValue : any;

        constructor(propertyName: string, oldValue: any, newValue: any) {
            this.propertyName = propertyName;
            this.oldValue = oldValue;
            this.newValue = newValue;
        }
    }

    export function getObjectConfig(obj:any) {
        if(!(configPropertyName in obj)) {
            obj[configPropertyName] = {
                props:{},
                propChangedCallbackList : [],
                notifyPropertyChanged : function(args:PropertyChangedEventArgs) {
                    for(let i=0;i<this.propChangedCallbackList.length;i++){
                        let callback = this.propChangedCallbackList[i];
                        callback(args);
                    }
                },
                addPropertyChangedCallback : function (callback:(args:PropertyChangedEventArgs)=>void) {
                    this.propChangedCallbackList.push(callback);
                }
            };
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
            let descriptor = Object.getOwnPropertyDescriptor(propertyName,'age');
            if('value' in descriptor){
                let t = descriptor.value;
                if(toString.call(t)=='[object Function]'){
                    continue;
                }else if(toString.call(propValue)=='[object Object]'){
                    injectProperties(propValue);
                }
            }else {
                continue;
            }

            cfg.props[propertyName] = obj[propertyName];

            (function (propertyName) {
                Object.defineProperty(obj,propertyName,{
                    'get':function () {
                        return getObjectConfig(this).props[propertyName];
                    },
                    'set':function (value) {
                        let oldValue = getObjectConfig(this).props[propertyName];
                        getObjectConfig(this).props[this.propertyName]=value;
                        getObjectConfig(this).notifyPropertyChanged(
                            new PropertyChangedEventArgs(
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