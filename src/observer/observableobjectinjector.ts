
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
        if (toString.call(obj)!="[object Object]") return;
        let cfg = getObjectConfig(obj);
        for (let propertyName in obj) {
            if(propertyName==configPropertyName) continue;
            if(!obj.hasOwnProperty(propertyName)) continue;
            let propValue = obj[propertyName];
            if(toString.call(propValue)=='[object Function]'){
                continue;
            }else if(toString.call(propValue)=='[object Object]'){
                injectProperties(propValue);
            }else if(toString.call(propValue)=='[object Array]'){
                propValue = new ObservableArray(propValue);
                obj[propertyName] = propValue;
            }
            let descriptor = Object.getOwnPropertyDescriptor(obj,propertyName);
            if('value' in descriptor){
                let t = descriptor.value;

                if(toString.call(t)=='[object Function]'){
                    continue;
                }else if(t instanceof ObservableArray){
                    propValue.addEventListener("itemadded",function(e) {
                        cfg.notifyPropertyChanged(new PropertyChangedEventArgs(obj, propertyName+".*",null,null));
                    });
                    propValue.addEventListener("itemset",function(e) {
                        cfg.notifyPropertyChanged(new PropertyChangedEventArgs(obj, propertyName+".*",null,null));
                    });
                    propValue.addEventListener("itemremoved",function(e) {
                        cfg.notifyPropertyChanged(new PropertyChangedEventArgs(obj, propertyName+".*",null,null));
                    });

                    for (let childvalue of propValue) {
                        if (toString.call(childvalue)!="[object Object]") continue;
                        injectProperties(childvalue);
                        let childCfg = getObjectConfig(childvalue);
                        childCfg.parent = obj;
                        childCfg.propertyName = propertyName+".*";
                    }
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

    function ObservableArray(items):any {
        let _self = this,
            _array = [],
            _handlers = {
                itemadded: [],
                itemremoved: [],
                itemset: []
            };

        function defineIndexProperty(index) : any{
            if (!(index in _self)) {
                Object.defineProperty(_self, index, {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                        return _array[index];
                    },
                    set: function(v) {
                        _array[index] = v;
                        raiseEvent({
                            type: "itemset",
                            index: index,
                            item: v
                        });
                    }
                });
            }
        }

        function raiseEvent(event) : any{
            _handlers[event.type].forEach(function(h) {
                h.call(_self, event);
            });
        }

        Object.defineProperty(_self, "addEventListener", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function(eventName, handler) {
                eventName = ("" + eventName).toLowerCase();
                if (!(eventName in _handlers)) throw new Error("Invalid event name.");
                if (typeof handler !== "function") throw new Error("Invalid handler.");
                _handlers[eventName].push(handler);
            }
        });

        Object.defineProperty(_self, "removeEventListener", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function(eventName, handler) {
                eventName = ("" + eventName).toLowerCase();
                if (!(eventName in _handlers)) throw new Error("Invalid event name.");
                if (typeof handler !== "function") throw new Error("Invalid handler.");
                let h = _handlers[eventName];
                let ln = h.length;
                while (--ln >= 0) {
                    if (h[ln] === handler) {
                        h.splice(ln, 1);
                    }
                }
            }
        });

        Object.defineProperty(_self, "push", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function() {
                let index;
                let i = 0, ln = arguments.length;
                for (; i < ln; i++) {
                    index = _array.length;
                    _array.push(arguments[i]);
                    defineIndexProperty(index);
                    raiseEvent({
                        type: "itemadded",
                        index: index,
                        item: arguments[i]
                    });
                }
                return _array.length;
            }
        });

        Object.defineProperty(_self, "pop", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function() {
                if (_array.length > -1) {
                    let index = _array.length - 1,
                        item = _array.pop();
                    delete _self[index];
                    raiseEvent({
                        type: "itemremoved",
                        index: index,
                        item: item
                    });
                    return item;
                }
            }
        });

        Object.defineProperty(_self, "unshift", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function() {
                let ln;
                let i = 0;
                let ln = arguments.length;
                for (; i < ln; i++) {
                    _array.splice(i, 0, arguments[i]);
                    defineIndexProperty(_array.length - 1);
                    raiseEvent({
                        type: "itemadded",
                        index: i,
                        item: arguments[i]
                    });
                }
                for (; i < _array.length; i++) {
                    raiseEvent({
                        type: "itemset",
                        index: i,
                        item: _array[i]
                    });
                }
                return _array.length;
            }
        });

        Object.defineProperty(_self, "shift", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function() {
                if (_array.length > -1) {
                    let item = _array.shift();
                    delete _self[_array.length];
                    raiseEvent({
                        type: "itemremoved",
                        index: 0,
                        item: item
                    });
                    return item;
                }
            }
        });

        Object.defineProperty(_self, "splice", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function(index, howMany /*, element1, element2, ... */ ) {
                let removed:Array<any> = [],
                    item:any,
                    pos:any;

                index = index == null ? 0 : index < 0 ? _array.length + index : index;

                howMany = howMany == null ? _array.length - index : howMany > 0 ? howMany : 0;

                while (howMany--) {
                    item = _array.splice(index, 1)[0];
                    removed.push(item);
                    delete _self[_array.length];
                    raiseEvent({
                        type: "itemremoved",
                        index: index + removed.length - 1,
                        item: item
                    });
                }

                let i = 2, ln = arguments.length;
                for (; i < ln; i++) {
                    _array.splice(index, 0, arguments[i]);
                    defineIndexProperty(_array.length - 1);
                    raiseEvent({
                        type: "itemadded",
                        index: index,
                        item: arguments[i]
                    });
                    index++;
                }

                return removed;
            }
        });

        Object.defineProperty(_self, "length", {
            configurable: false,
            enumerable: false,
            get: function() {
                return _array.length;
            },
            set: function(value) {
                let n = Number(value);
                let length = _array.length;
                if (n % 1 === 0 && n >= 0) {
                    if (n < length) {
                        _self.splice(n);
                    } else if (n > length) {
                        _self.push.apply(_self, new Array(n - length));
                    }
                } else {
                    throw new RangeError("Invalid array length");
                }
                _array.length = n;
                return value;
            }
        });

        Object.getOwnPropertyNames(Array.prototype).forEach(function(name) {
            if (!(name in _self)) {
                Object.defineProperty(_self, name, {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: Array.prototype[name]
                });
            }
        });

        if (items instanceof Array) {
            _self.push.apply(_self, items);
        }
    }

}