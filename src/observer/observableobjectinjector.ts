
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
        // if (obj==null) return;
        // if (Object.prototype.toString.call(obj)=='[object Object]') {
        //     injectObjectProperties(obj);
        // }else if(Object.prototype.toString.call(obj)=='[object Array]'){
        //
        // }
    }

    export function injectObjectProperties(obj: any) {

    }

    function ObservableArray(items) {
        var _self = this,
            _array = [],
            _handlers = {
                itemadded: [],
                itemremoved: [],
                itemset: []
            };

        function defineIndexProperty(index) {
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

        function raiseEvent(event) {
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
                var h = _handlers[eventName];
                var ln = h.length;
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
                var index;
                for (var i = 0, ln = arguments.length; i < ln; i++) {
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
                    var index = _array.length - 1,
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
                for (var i = 0, ln = arguments.length; i < ln; i++) {
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
                    var item = _array.shift();
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
                var removed = [],
                    item,
                    pos;

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

                for (var i = 2, ln = arguments.length; i < ln; i++) {
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
                var n = Number(value);
                var length = _array.length;
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
                    obj.push(argv);
                }
                cfg.notifyPropertyChanged(new PropertyChangedEventArgs(obj,"*",null,null));
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