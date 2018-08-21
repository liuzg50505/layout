(function($, h, c) {
    var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j
        + "-special-event", b = "delay", f = "throttleWindow";
    e[b] = 350;
    e[f] = true;
    $.event.special[j] = {
        setup : function() {
            if (!e[f] && this[k]) {
                return false
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w : l.width(),
                h : l.height()
            });
            if (a.length === 1) {
                g()
            }
        },
        teardown : function() {
            if (!e[f] && this[k]) {
                return false
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i)
            }
        },
        add : function(l) {
            if (!e[f] && this[k]) {
                return false
            }
            var n;
            function m(s, o, p) {
                var q = $(this), r = $.data(this, d);
                r.w = o !== c ? o : q.width();
                r.h = p !== c ? p : q.height();
                n.apply(this, arguments)
            }
            if ($.isFunction(l)) {
                n = l;
                return m
            } else {
                n = l.handler;
                l.handler = m
            }
        }
    };
    function g() {
        i = h[k](function() {
            a.each(function() {
                var n = $(this), m = n.width(), l = n.height(), o = $
                    .data(this, d);
                if (m !== o.w || l !== o.h) {
                    n.trigger(j, [ o.w = m, o.h = l ])
                }
            });
            g()
        }, e[b])
    }
})(jQuery, this);


function ObservableArray(items) {

    this.__observablearray_ = true;

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

function testjs() {
    console.log("testjs");
}
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LayoutLzg;
(function (LayoutLzg) {
    function formatDate(date, format) {
        if (format === void 0) { format = "yyyy-MM-dd"; }
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }
    LayoutLzg.formatDate = formatDate;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    function eventTransparentDiv(divSelector) {
        $(divSelector).css("filter", "Alpha(opacity=0)");
        $(divSelector).css("pointer-events", "none");
    }
    LayoutLzg.eventTransparentDiv = eventTransparentDiv;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    function css(elem, name, value) {
        $(elem).css(name, value);
    }
    LayoutLzg.css = css;
    function attr(elem, name) {
        return $(elem).attr(name);
    }
    LayoutLzg.attr = attr;
    function setattr(elem, name, value) {
        $(elem).attr(name, value);
    }
    LayoutLzg.setattr = setattr;
    function createElement(tag) {
        return document.createElement(tag);
    }
    LayoutLzg.createElement = createElement;
    function appendChild(parent, child) {
        $(parent).append(child);
    }
    LayoutLzg.appendChild = appendChild;
    function emptyChildren(elem) {
        $(elem).empty();
    }
    LayoutLzg.emptyChildren = emptyChildren;
    function getElemText(elem) {
        return $(elem).text();
    }
    LayoutLzg.getElemText = getElemText;
    function setElemText(elem, text) {
        $(elem).text(text);
    }
    LayoutLzg.setElemText = setElemText;
    function getElemValue(elem) {
        $(elem).val();
    }
    LayoutLzg.getElemValue = getElemValue;
    function setElemValue(elem, value) {
        $(elem).val(value);
    }
    LayoutLzg.setElemValue = setElemValue;
    function onEvent(elem, eventName, callback) {
        $(elem).on(eventName, function () {
            if (callback)
                callback.apply(this, arguments);
        });
    }
    LayoutLzg.onEvent = onEvent;
    function offEvent(elem, eventName, callback) {
        $(elem).off(eventName, callback);
    }
    LayoutLzg.offEvent = offEvent;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var EventItem = (function () {
        function EventItem(name, args) {
            this.callbacklist = new LayoutLzg.List();
            this.args = args;
            this.name = name;
        }
        return EventItem;
    }());
    var EventBus = (function () {
        function EventBus() {
            this.callback = new LayoutLzg.List();
        }
        EventBus.prototype.pub = function (name, args) {
            this.callback.add(new EventItem(name, args));
        };
        EventBus.prototype.sub = function (name, callback) {
        };
        return EventBus;
    }());
    LayoutLzg.EventBus = EventBus;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var Trigger = (function () {
        function Trigger() {
        }
        Trigger.prototype.onTriggered = function () {
            if (this.action) {
                this.action.execute();
            }
        };
        return Trigger;
    }());
    LayoutLzg.Trigger = Trigger;
    var ControlTrigger = (function (_super) {
        __extends(ControlTrigger, _super);
        function ControlTrigger() {
            _super.apply(this, arguments);
        }
        return ControlTrigger;
    }(Trigger));
    LayoutLzg.ControlTrigger = ControlTrigger;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    (function (HorizonAlignment) {
        HorizonAlignment[HorizonAlignment["Strech"] = 0] = "Strech";
        HorizonAlignment[HorizonAlignment["Left"] = 1] = "Left";
        HorizonAlignment[HorizonAlignment["Right"] = 2] = "Right";
        HorizonAlignment[HorizonAlignment["Center"] = 3] = "Center";
    })(LayoutLzg.HorizonAlignment || (LayoutLzg.HorizonAlignment = {}));
    var HorizonAlignment = LayoutLzg.HorizonAlignment;
    (function (VerticalAlignment) {
        VerticalAlignment[VerticalAlignment["Strech"] = 0] = "Strech";
        VerticalAlignment[VerticalAlignment["Top"] = 1] = "Top";
        VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
        VerticalAlignment[VerticalAlignment["Center"] = 3] = "Center";
    })(LayoutLzg.VerticalAlignment || (LayoutLzg.VerticalAlignment = {}));
    var VerticalAlignment = LayoutLzg.VerticalAlignment;
    (function (DistanceType) {
        DistanceType[DistanceType["auto"] = 0] = "auto";
        DistanceType[DistanceType["fixed"] = 1] = "fixed";
        DistanceType[DistanceType["weight"] = 2] = "weight";
    })(LayoutLzg.DistanceType || (LayoutLzg.DistanceType = {}));
    var DistanceType = LayoutLzg.DistanceType;
    (function (StackPanelOrientation) {
        StackPanelOrientation[StackPanelOrientation["Horizonal"] = 0] = "Horizonal";
        StackPanelOrientation[StackPanelOrientation["Vertical"] = 1] = "Vertical";
    })(LayoutLzg.StackPanelOrientation || (LayoutLzg.StackPanelOrientation = {}));
    var StackPanelOrientation = LayoutLzg.StackPanelOrientation;
    var ShadowSettings = (function () {
        function ShadowSettings(xoffset, yoffset, blur, spread, color, type) {
            if (type === void 0) { type = "outset"; }
            this.xoffset = xoffset;
            this.yoffset = yoffset;
            this.blur = blur;
            this.spread = spread;
            this.color = color;
            this.type = type;
        }
        ShadowSettings.prototype.toBoxShawdowString = function () {
            var s = "";
            if (this.type == "inset")
                s += "inset ";
            s += this.xoffset + "px ";
            s += this.yoffset + "px ";
            s += this.blur + "px ";
            s += this.spread + "px ";
            s += this.color + "";
            return s;
        };
        return ShadowSettings;
    }());
    LayoutLzg.ShadowSettings = ShadowSettings;
    var Thickness = (function () {
        function Thickness(left, right, top, bottom) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        }
        return Thickness;
    }());
    LayoutLzg.Thickness = Thickness;
    var Distance = (function () {
        function Distance(type, value) {
            this.value = value;
            this.type = type;
        }
        return Distance;
    }());
    LayoutLzg.Distance = Distance;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var Slot = (function () {
        function Slot() {
            this.children = new LayoutLzg.List();
            this.calculatedSlotWidth = 0;
            this.calculatedSlotHeight = 0;
        }
        Slot.prototype.addChild = function (child) {
            this.children.add(child);
            child.parentSlot = this;
        };
        Slot.prototype.removeChild = function (child) {
            this.children.remove(child);
            child.parentSlot = null;
        };
        Slot.prototype.empty = function () {
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.parentSlot = null;
                child.parent = null;
                this.container.removeChild(child);
            }
            this.children.clear();
        };
        Slot.prototype.calculateWidthFromTop = function () {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.calculateWidthFromTop();
            }
        };
        Slot.prototype.calculateWidthFromBottom = function () {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.calculateWidthFromBottom();
            }
            if (!this.isSlotWidthCalculatable) {
                var widthlist = this.children.map(function (t) { return t.calculatedWidth + t.margin.left + t.margin.right; });
                widthlist.sort(function (a, b) { return b - a; });
                var maxwidth = 0;
                if (widthlist.length > 0)
                    maxwidth = widthlist[0];
                this.calculatedSlotWidth = maxwidth;
            }
        };
        Slot.prototype.calculateHeightFromTop = function () {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.calculateHeightFromTop();
            }
        };
        Slot.prototype.calculateHeightFromBottom = function () {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.calculateHeightFromBottom();
            }
            if (!this.isSlotHeightCalculatable) {
                var heightlist = this.children.map(function (t) { return t.calculatedHeight + t.margin.top + t.margin.bottom; });
                heightlist.sort(function (a, b) { return b - a; });
                var maxheight = 0;
                if (heightlist.length > 0)
                    maxheight = heightlist[0];
                this.calculatedSlotHeight = maxheight;
            }
        };
        Slot.prototype.layoutChildren = function () {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.horizonAlignment == LayoutLzg.HorizonAlignment.Left) {
                    LayoutLzg.css(child.getRootElement(), "left", "0px");
                }
                else if (child.horizonAlignment == LayoutLzg.HorizonAlignment.Right) {
                    LayoutLzg.css(child.getRootElement(), "right", "0px");
                }
                else if (child.horizonAlignment == LayoutLzg.HorizonAlignment.Center) {
                    var w = this.calculatedSlotWidth;
                    var ww = child.calculatedWidth;
                    var x = (w - ww) / 2;
                    LayoutLzg.css(child.getRootElement(), 'left', x + 'px');
                }
                else if (child.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                    LayoutLzg.css(child.getRootElement(), "left", "0px");
                    LayoutLzg.css(child.getRootElement(), "right", "0px");
                }
                if (child.verticalAlignment == LayoutLzg.VerticalAlignment.Top) {
                    LayoutLzg.css(child.getRootElement(), "top", "0px");
                }
                else if (child.verticalAlignment == LayoutLzg.VerticalAlignment.Bottom) {
                    LayoutLzg.css(child.getRootElement(), "bottom", "0px");
                }
                else if (child.verticalAlignment == LayoutLzg.VerticalAlignment.Center) {
                    var h = this.calculatedSlotHeight;
                    var hh = child.calculatedHeight;
                    var x = (h - hh) / 2;
                    LayoutLzg.css(child.getRootElement(), 'top', x + 'px');
                }
                else if (child.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                    LayoutLzg.css(child.getRootElement(), "top", "0px");
                    LayoutLzg.css(child.getRootElement(), "bottom", "0px");
                }
                child.doLayout();
            }
        };
        return Slot;
    }());
    LayoutLzg.Slot = Slot;
    var PropertyChangedCallbackItem = (function () {
        function PropertyChangedCallbackItem(propertyName, callback) {
            this.callback = callback;
            this.propertyName = propertyName;
        }
        return PropertyChangedCallbackItem;
    }());
    var EventCallbackItem = (function () {
        function EventCallbackItem(eventName, callback) {
            this.callback = callback;
            this.eventName = eventName;
        }
        return EventCallbackItem;
    }());
    var VisualElement = (function () {
        function VisualElement(name) {
            this.notifyProperties = [];
            this.name = name;
            // Init vairables.
            this._horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            this._verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            this._margin = new LayoutLzg.Thickness(0, 0, 0, 0);
            this._width = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, 50);
            this._height = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, 50);
            this.propChangedCallbacks = new LayoutLzg.List();
            this.eventCallbacks = new LayoutLzg.List();
        }
        Object.defineProperty(VisualElement.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "horizonAlignment", {
            get: function () {
                return this._horizonAlignment;
            },
            set: function (value) {
                this._horizonAlignment = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "verticalAlignment", {
            get: function () {
                return this._verticalAlignment;
            },
            set: function (value) {
                this._verticalAlignment = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "margin", {
            get: function () {
                return this._margin;
            },
            set: function (value) {
                this._margin = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "pressed", {
            get: function () {
                return this._pressed;
            },
            set: function (value) {
                this._pressed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "mouseenter", {
            get: function () {
                return this._mouseenter;
            },
            set: function (value) {
                this._mouseenter = value;
            },
            enumerable: true,
            configurable: true
        });
        VisualElement.prototype.forceRefresh = function () {
            this.assembleDom();
            this.doLayout();
        };
        // Assemble html elements of this control.
        VisualElement.prototype.assembleDom = function () {
        };
        // Adjust styles html elements of this control.
        VisualElement.prototype.doLayout = function () {
        };
        VisualElement.prototype.getStateProperties = function () {
            return [];
        };
        VisualElement.prototype.getNotifyProperties = function () {
            return this.notifyProperties;
        };
        VisualElement.prototype.addPropertyChangedListener = function (propertName, callback) {
            this.propChangedCallbacks.add(new PropertyChangedCallbackItem(propertName, callback));
        };
        VisualElement.prototype.removePropertyChangedListener = function (callback) {
            var elem = null;
            for (var _i = 0, _a = this.propChangedCallbacks; _i < _a.length; _i++) {
                var propcallbackitem = _a[_i];
                if (propcallbackitem.callback == callback) {
                    elem = propcallbackitem;
                }
            }
            if (elem != null) {
                this.propChangedCallbacks.remove(elem);
            }
        };
        VisualElement.prototype.addStateChangedListener = function (propertyName, callback) {
        };
        VisualElement.prototype.removeStateChangedListener = function (callback) {
        };
        VisualElement.prototype.notifyPropertyChanged = function (propertyName) {
            for (var _i = 0, _a = this.propChangedCallbacks; _i < _a.length; _i++) {
                var propcallbackitem = _a[_i];
                if (propcallbackitem.propertyName == propertyName) {
                    if (propcallbackitem.callback)
                        propcallbackitem.callback(propertyName);
                }
            }
        };
        VisualElement.prototype.addEventListener = function (eventName, callback) {
            this.eventCallbacks.add(new EventCallbackItem(eventName, callback));
        };
        VisualElement.prototype.removeEventListener = function (callback) {
            var events = this.eventCallbacks.filter(function (t) { return t.callback == callback; });
            if (events.length > 0) {
                this.eventCallbacks.remove(events[0]);
            }
        };
        VisualElement.prototype.raiseEvent = function (eventName, args) {
            if (args === void 0) { args = []; }
            for (var _i = 0, _a = this.eventCallbacks; _i < _a.length; _i++) {
                var eventcallbackitem = _a[_i];
                if (eventcallbackitem.eventName == eventName) {
                    if (eventcallbackitem.callback) {
                        var argarr = [eventName];
                        for (var _b = 0, args_1 = args; _b < args_1.length; _b++) {
                            var arg = args_1[_b];
                            argarr.push(arg);
                        }
                        eventcallbackitem.callback.apply(this, argarr);
                    }
                }
            }
        };
        return VisualElement;
    }());
    LayoutLzg.VisualElement = VisualElement;
    // Widget class is the base class of all the visual components.
    var Widget = (function (_super) {
        __extends(Widget, _super);
        function Widget(name) {
            _super.call(this, name);
            this._strokeThickness = new LayoutLzg.Thickness(0, 0, 0, 0);
            this.calculatedWidth = 0;
            this.calculatedHeight = 0;
        }
        Object.defineProperty(Widget.prototype, "fill", {
            get: function () {
                return this._fill;
            },
            set: function (value) {
                if (this._fill != value)
                    this.notifyPropertyChanged("fill");
                this._fill = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "stroke", {
            get: function () {
                return this._stroke;
            },
            set: function (value) {
                if (this._stroke != value)
                    this.notifyPropertyChanged("stroke");
                this._stroke = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "strokeThickness", {
            get: function () {
                return this._strokeThickness;
            },
            set: function (value) {
                if (this._strokeThickness != value)
                    this.notifyPropertyChanged("strokeThickness");
                this._strokeThickness = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "shadow", {
            get: function () {
                return this._shadow;
            },
            set: function (value) {
                this._shadow = value;
            },
            enumerable: true,
            configurable: true
        });
        return Widget;
    }(VisualElement));
    LayoutLzg.Widget = Widget;
    // The purpose of the container is to put sub controls together,
    // and the system provides multiple layout containers due to actual requirements.
    var ContainerWidget = (function (_super) {
        __extends(ContainerWidget, _super);
        function ContainerWidget(name) {
            _super.call(this, name);
            this.children = new LayoutLzg.List();
            this.slots = new LayoutLzg.List();
        }
        ContainerWidget.prototype.addChild = function (control) {
            this.children.add(control);
            control.parent = this;
        };
        ContainerWidget.prototype.removeChild = function (control) {
            this.children.remove(control);
            control.parent = null;
        };
        ContainerWidget.prototype.clearChild = function () {
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.parent = null;
                if (child.parentSlot) {
                    child.parentSlot.removeChild(child);
                }
            }
            this.children.clear();
        };
        ContainerWidget.prototype.doLayout = function () {
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                slot.layoutChildren();
            }
        };
        ContainerWidget.prototype.dispose = function () {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.dispose();
            }
        };
        return ContainerWidget;
    }(Widget));
    LayoutLzg.ContainerWidget = ContainerWidget;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    function testList() {
        var literal1 = new LayoutLzg.TextView('a', '11111');
        var literal2 = new LayoutLzg.TextView('a', '22222222222222222222222222222');
        var literal3 = new LayoutLzg.TextView('a', '3333333333');
        var lst = new List();
        lst.add(literal1);
        lst.add(literal2);
        lst.add(literal3);
        lst.clear();
    }
    LayoutLzg.testList = testList;
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            _super.apply(this, arguments);
        }
        List.prototype.add = function (item) {
            _super.prototype.push.call(this, item);
        };
        List.prototype.addAll = function (items) {
            for (var i = 0; i < items.length; i++) {
                this.add(items[i]);
            }
        };
        List.prototype.remove = function (item) {
            for (var i = 0; i < this.length; i++) {
                var curitem = this[i];
                if (curitem == item) {
                    _super.prototype.splice.call(this, i, 1);
                    return;
                }
            }
        };
        List.prototype.removeAll = function (items) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                this.remove(item);
            }
        };
        List.prototype.clear = function () {
            _super.prototype.splice.call(this, 0, this.length);
        };
        return List;
    }(Array));
    LayoutLzg.List = List;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    function testmap() {
        var map = new Map();
        map.put('a', 33);
        map.put('b', 43);
        var b = map.get('b');
        var a = map.get('a');
        map.clear();
    }
    LayoutLzg.testmap = testmap;
    var MapItem = (function () {
        function MapItem(key, value) {
            this.key = key;
            this.value = value;
        }
        return MapItem;
    }());
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map() {
            _super.apply(this, arguments);
        }
        Map.prototype.put = function (key, value) {
            this.push(new MapItem(key, value));
        };
        Map.prototype.get = function (key) {
            for (var i = 0; i < this.length; i++) {
                var item = this[i];
                if (item.key == key) {
                    return item.value;
                }
            }
            return null;
        };
        Map.prototype.clear = function () {
            this.splice(0, this.length);
        };
        Map.prototype.containsKey = function (key) {
            for (var i = 0; i < this.length; i++) {
                var item = this[i];
                if (item.key == key) {
                    return true;
                }
            }
            return false;
        };
        return Map;
    }(Array));
    LayoutLzg.Map = Map;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var SolidColorBrush = (function () {
        function SolidColorBrush(color) {
            this.color = color;
        }
        SolidColorBrush.prototype.applyToBackground = function (elem) {
            LayoutLzg.css(elem, "background-color", this.color);
        };
        SolidColorBrush.prototype.applyToBorder = function (elem, thickness) {
            LayoutLzg.css(elem, "border-color", this.color);
            LayoutLzg.css(elem, "border-left-width", thickness.left + "px");
            LayoutLzg.css(elem, "border-right-width", thickness.right + "px");
            LayoutLzg.css(elem, "border-top-width", thickness.top + "px");
            LayoutLzg.css(elem, "border-bottom-width", thickness.bottom + "px");
            LayoutLzg.css(elem, "border-left-style", "solid");
            LayoutLzg.css(elem, "border-right-style", "solid");
            LayoutLzg.css(elem, "border-top-style", "solid");
            LayoutLzg.css(elem, "border-bottom-style", "solid");
        };
        SolidColorBrush.prototype.applyToBorderLeft = function (elem, thickness) {
            LayoutLzg.css(elem, "border-color", this.color);
            LayoutLzg.css(elem, "border-left-width", thickness + "px");
            LayoutLzg.css(elem, "border-left-style", "solid");
        };
        SolidColorBrush.prototype.applyToBorderRight = function (elem, thickness) {
            LayoutLzg.css(elem, "border-color", this.color);
            LayoutLzg.css(elem, "border-right-width", thickness + "px");
            LayoutLzg.css(elem, "border-right-style", "solid");
        };
        SolidColorBrush.prototype.applyToBorderTop = function (elem, thickness) {
            LayoutLzg.css(elem, "border-color", this.color);
            LayoutLzg.css(elem, "border-top-width", thickness + "px");
            LayoutLzg.css(elem, "border-top-style", "solid");
        };
        SolidColorBrush.prototype.applyToBorderBottom = function (elem, thickness) {
            LayoutLzg.css(elem, "border-color", this.color);
            LayoutLzg.css(elem, "border-bottom-width", thickness + "px");
            LayoutLzg.css(elem, "border-bottom-style", "solid");
        };
        return SolidColorBrush;
    }());
    LayoutLzg.SolidColorBrush = SolidColorBrush;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var ImageColorBrush = (function () {
        function ImageColorBrush(color) {
            this.color = color;
        }
        ImageColorBrush.prototype.applyToBackground = function (elem) {
        };
        ImageColorBrush.prototype.applyToBorder = function (elem, thickness) {
        };
        ImageColorBrush.prototype.applyToBorderLeft = function (elem, thickness) {
        };
        ImageColorBrush.prototype.applyToBorderRight = function (elem, thickness) {
        };
        ImageColorBrush.prototype.applyToBorderTop = function (elem, thickness) {
        };
        ImageColorBrush.prototype.applyToBorderBottom = function (elem, thickness) {
        };
        return ImageColorBrush;
    }());
    LayoutLzg.ImageColorBrush = ImageColorBrush;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var GradientColorBrush = (function () {
        function GradientColorBrush(color) {
            this.color = color;
        }
        GradientColorBrush.prototype.applyToBackground = function (elem) {
        };
        GradientColorBrush.prototype.applyToBorder = function (elem, thickness) {
        };
        GradientColorBrush.prototype.applyToBorderLeft = function (elem, thickness) {
        };
        GradientColorBrush.prototype.applyToBorderRight = function (elem, thickness) {
        };
        GradientColorBrush.prototype.applyToBorderTop = function (elem, thickness) {
        };
        GradientColorBrush.prototype.applyToBorderBottom = function (elem, thickness) {
        };
        return GradientColorBrush;
    }());
    LayoutLzg.GradientColorBrush = GradientColorBrush;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var ControlBase = (function (_super) {
        __extends(ControlBase, _super);
        function ControlBase(name) {
            _super.call(this, name);
        }
        ControlBase.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = LayoutLzg.createElement("DIV");
                LayoutLzg.css(this.rootElem, "box-sizing", "border-box");
                LayoutLzg.css(this.rootElem, "pointer-events", "all");
            }
            return this.rootElem;
        };
        ControlBase.prototype.calculateWidthFromTop = function () {
        };
        ControlBase.prototype.calculateHeightFromTop = function () {
        };
        ControlBase.prototype.calculateWidthFromBottom = function () {
        };
        ControlBase.prototype.calculateHeightFromBottom = function () {
        };
        ControlBase.prototype.dispose = function () {
        };
        return ControlBase;
    }(LayoutLzg.Widget));
    LayoutLzg.WidgetBase = ControlBase;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var TextView = (function (_super) {
        __extends(TextView, _super);
        function TextView(name, text) {
            _super.call(this, name);
            this._text = text;
            this._selectable = true;
            this.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this.notifyProperties.push("text");
        }
        Object.defineProperty(TextView.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextView.prototype, "selectable", {
            get: function () {
                return this._selectable;
            },
            set: function (value) {
                this._selectable = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextView.prototype, "wordWrap", {
            get: function () {
                return this._wordWrap;
            },
            set: function (value) {
                this._wordWrap = value;
            },
            enumerable: true,
            configurable: true
        });
        TextView.prototype.getRootElement = function () {
            _super.prototype.getRootElement.call(this);
            LayoutLzg.setattr(this.rootElem, 'layout-type', 'TextView');
            LayoutLzg.setattr(this.rootElem, 'layout-name', this.name);
            return this.rootElem;
        };
        TextView.prototype.assembleDom = function () {
            this.spanElem = LayoutLzg.createElement("SPAN");
            LayoutLzg.emptyChildren(this.getRootElement());
            if (this.width.type == LayoutLzg.DistanceType.fixed)
                LayoutLzg.css(this.getRootElement(), 'width', this.width.value + 'px');
            if (this.height.type == LayoutLzg.DistanceType.fixed)
                LayoutLzg.css(this.getRootElement(), 'height', this.height.value + 'px');
            LayoutLzg.appendChild(this.getRootElement(), this.spanElem);
            LayoutLzg.setElemText(this.spanElem, this._text);
            if (this._wordWrap)
                LayoutLzg.css(this.spanElem, 'word-break', 'break-all');
            else
                LayoutLzg.css(this.spanElem, 'word-break', 'normal');
        };
        TextView.prototype.doLayout = function () {
            LayoutLzg.css(this.getRootElement(), 'position', 'absolute');
            LayoutLzg.css(this.getRootElement(), 'width', this.calculatedWidth + 'px');
            LayoutLzg.css(this.getRootElement(), 'height', this.calculatedHeight + 'px');
            LayoutLzg.css(this.getRootElement(), "position", "absolute");
            if (!this._selectable) {
                LayoutLzg.css(this.spanElem, "user-select", "none");
            }
            else {
                LayoutLzg.css(this.spanElem, "user-select", "");
            }
        };
        TextView.prototype.calculateWidthFromTop = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedWidth = this.width.value;
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth;
                return;
            }
            this.calculatedWidth = this.spanElem.offsetWidth;
        };
        TextView.prototype.calculateHeightFromTop = function () {
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedHeight = this.height.value;
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight;
                return;
            }
            this.calculatedHeight = this.spanElem.offsetHeight;
        };
        TextView.prototype.calculateWidthFromBottom = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedWidth = this.width.value;
                return;
            }
            this.calculatedWidth = this.spanElem.offsetWidth;
        };
        TextView.prototype.calculateHeightFromBottom = function () {
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedHeight = this.height.value;
                return;
            }
            this.calculatedHeight = this.spanElem.offsetHeight;
        };
        return TextView;
    }(LayoutLzg.WidgetBase));
    LayoutLzg.TextView = TextView;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var Rect = (function (_super) {
        __extends(Rect, _super);
        function Rect(name) {
            _super.call(this, name);
            this._radius_bottom_left = 0;
            this._radius_bottom_right = 0;
            this._radius_top_left = 0;
            this._radius_top_right = 0;
            this._opacity = 1;
        }
        Object.defineProperty(Rect.prototype, "radius_bottom_left", {
            get: function () {
                return this._radius_bottom_left;
            },
            set: function (value) {
                this._radius_bottom_left = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "radius_bottom_right", {
            get: function () {
                return this._radius_bottom_right;
            },
            set: function (value) {
                this._radius_bottom_right = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "radius_top_left", {
            get: function () {
                return this._radius_top_left;
            },
            set: function (value) {
                this._radius_top_left = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "radius_top_right", {
            get: function () {
                return this._radius_top_right;
            },
            set: function (value) {
                this._radius_top_right = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "radius", {
            set: function (value) {
                this._radius_bottom_left = value;
                this._radius_bottom_right = value;
                this._radius_top_left = value;
                this._radius_top_right = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "opacity", {
            get: function () {
                return this._opacity;
            },
            set: function (value) {
                this._opacity = value;
            },
            enumerable: true,
            configurable: true
        });
        Rect.prototype.getRootElement = function () {
            var elem = _super.prototype.getRootElement.call(this);
            LayoutLzg.setattr(elem, 'layout-type', 'Rect');
            LayoutLzg.setattr(elem, 'layout-name', this.name);
            return elem;
        };
        Rect.prototype.assembleDom = function () {
            _super.prototype.assembleDom.call(this);
        };
        Rect.prototype.doLayout = function () {
            LayoutLzg.css(this.getRootElement(), 'position', 'absolute');
            LayoutLzg.css(this.getRootElement(), 'width', this.calculatedWidth + 'px');
            LayoutLzg.css(this.getRootElement(), 'height', this.calculatedHeight + 'px');
            // stroke and fill
            if (this.fill)
                this.fill.applyToBackground(this.rootElem);
            if (this.stroke)
                this.stroke.applyToBorder(this.rootElem, this.strokeThickness);
            // radius
            LayoutLzg.css(this.getRootElement(), "border-bottom-left-radius", this.radius_bottom_left + "px");
            LayoutLzg.css(this.getRootElement(), "border-bottom-right-radius", this.radius_bottom_right + "px");
            LayoutLzg.css(this.getRootElement(), "border-top-left-radius", this.radius_top_left + "px");
            LayoutLzg.css(this.getRootElement(), "border-top-right-radius", this.radius_top_right + "px");
            // opacity
            LayoutLzg.css(this.getRootElement(), "opacity", this.opacity);
            // shadow
            if (this.shadow) {
                LayoutLzg.css(this.getRootElement(), "box-shadow", this.shadow.toBoxShawdowString());
            }
        };
        Rect.prototype.calculateWidthFromTop = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedWidth = this.width.value;
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth;
                return;
            }
            this.calculatedWidth = 0;
        };
        Rect.prototype.calculateHeightFromTop = function () {
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedHeight = this.height.value;
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight;
                return;
            }
            _super.prototype.calculateHeightFromTop.call(this);
        };
        Rect.prototype.calculateWidthFromBottom = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedWidth = this.width.value;
                return;
            }
            this.calculatedWidth = 0;
        };
        Rect.prototype.calculateHeightFromBottom = function () {
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedHeight = this.height.value;
                return;
            }
            this.calculatedHeight = 0;
        };
        return Rect;
    }(LayoutLzg.WidgetBase));
    LayoutLzg.Rect = Rect;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var ImageView = (function (_super) {
        __extends(ImageView, _super);
        function ImageView(name) {
            _super.call(this, name);
        }
        ImageView.prototype.assembleDom = function () {
            LayoutLzg.emptyChildren(this.getRootElement());
            if (this.imgElem == null) {
                this.imgElem = LayoutLzg.createElement("IMAGE");
                LayoutLzg.setattr(this.imgElem, 'src', this.src);
            }
            LayoutLzg.appendChild(this.getRootElement(), this.imgElem);
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                LayoutLzg.css(this.getRootElement(), 'width', this.width.value + 'px');
                LayoutLzg.css(this.imgElem, 'width', this.width.value + 'px');
            }
            else {
                LayoutLzg.css(this.imgElem, 'width', '100%');
            }
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                LayoutLzg.css(this.getRootElement(), 'height', this.height.value + 'px');
                LayoutLzg.css(this.imgElem, 'height', this.height.value + 'px');
            }
            else {
                LayoutLzg.css(this.imgElem, 'height', '100%');
            }
        };
        ImageView.prototype.doLayout = function () {
        };
        return ImageView;
    }(LayoutLzg.WidgetBase));
    LayoutLzg.ImageView = ImageView;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var ContainerBase = (function (_super) {
        __extends(ContainerBase, _super);
        function ContainerBase(name) {
            _super.call(this, name);
        }
        ContainerBase.prototype.estimateWidth = function () {
            if (this.parentSlot.isSlotWidthCalculatable) {
                if (this.horizonAlignment == LayoutLzg.HorizonAlignment.Center
                    || this.horizonAlignment == LayoutLzg.HorizonAlignment.Left
                    || this.horizonAlignment == LayoutLzg.HorizonAlignment.Right) {
                    if (this.width.type == LayoutLzg.DistanceType.fixed) {
                        return this.width.value;
                    }
                    else if (this.width.type == LayoutLzg.DistanceType.auto) {
                        return this.estimateWidth_auto();
                    }
                }
                else if (this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                    return this.parentSlot.calculatedSlotWidth - this.margin.left - this.margin.right;
                }
            }
            else {
                if (this.width.type == LayoutLzg.DistanceType.fixed) {
                    return this.width.value;
                }
                else if (this.width.type == LayoutLzg.DistanceType.auto) {
                    return this.estimateWidth_auto();
                }
                return 0;
            }
        };
        ContainerBase.prototype.estimateHeight = function () {
            if (this.parentSlot.isSlotHeightCalculatable) {
                if (this.verticalAlignment == LayoutLzg.VerticalAlignment.Center
                    || this.verticalAlignment == LayoutLzg.VerticalAlignment.Top
                    || this.verticalAlignment == LayoutLzg.VerticalAlignment.Bottom) {
                    if (this.height.type == LayoutLzg.DistanceType.fixed) {
                        return this.height.value;
                    }
                    else if (this.height.type == LayoutLzg.DistanceType.auto) {
                        return this.estimateHeight_auto();
                    }
                }
                else if (this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                    return this.parentSlot.calculatedSlotHeight - this.margin.top - this.margin.bottom;
                }
            }
            else {
                if (this.height.type == LayoutLzg.DistanceType.fixed) {
                    return this.height.value;
                }
                else if (this.height.type == LayoutLzg.DistanceType.auto) {
                    return this.estimateHeight_auto();
                }
                return 0;
            }
        };
        ContainerBase.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = LayoutLzg.createElement("DIV");
            }
            return this.rootElem;
        };
        return ContainerBase;
    }(LayoutLzg.ContainerWidget));
    LayoutLzg.ContainerBase = ContainerBase;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var Border = (function (_super) {
        __extends(Border, _super);
        function Border(name) {
            _super.call(this, name);
            this.mainSlot = new LayoutLzg.Slot();
            this.mainSlot.container = this;
            this.childWrappersMap = new LayoutLzg.Map();
            this.slots.push(this.mainSlot);
        }
        Border.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = LayoutLzg.createElement("DIV");
                LayoutLzg.css(this.rootElem, 'pointer-events', 'all');
                LayoutLzg.setattr(this.rootElem, 'layout-type', 'Border');
                LayoutLzg.setattr(this.rootElem, 'layout-name', this.name);
            }
            return this.rootElem;
        };
        Border.prototype.addChild = function (control) {
            _super.prototype.addChild.call(this, control);
            this.mainSlot.addChild(control);
        };
        Border.prototype.assembleDom = function () {
            LayoutLzg.emptyChildren(this.getRootElement());
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.assembleDom();
                var wrapperDiv = LayoutLzg.createElement("DIV");
                LayoutLzg.css(wrapperDiv, 'pointer-events', 'none');
                LayoutLzg.setattr(wrapperDiv, 'layout-tag', 'wrapper');
                this.childWrappersMap.put(child, wrapperDiv);
                LayoutLzg.appendChild(this.getRootElement(), wrapperDiv);
                LayoutLzg.appendChild(wrapperDiv, child.getRootElement());
            }
        };
        Border.prototype.doLayout = function () {
            LayoutLzg.css(this.getRootElement(), 'position', 'absolute');
            LayoutLzg.css(this.getRootElement(), 'width', this.calculatedWidth + 'px');
            LayoutLzg.css(this.getRootElement(), 'height', this.calculatedHeight + 'px');
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                for (var _b = 0, _c = slot.children; _b < _c.length; _b++) {
                    var child = _c[_b];
                    var wrapperDiv = this.childWrappersMap.get(child);
                    LayoutLzg.css(wrapperDiv, 'position', 'absolute');
                    LayoutLzg.css(wrapperDiv, 'left', child.margin.left + 'px');
                    LayoutLzg.css(wrapperDiv, 'right', child.margin.right + 'px');
                    LayoutLzg.css(wrapperDiv, 'top', child.margin.top + 'px');
                    LayoutLzg.css(wrapperDiv, 'bottom', child.margin.bottom + 'px');
                }
                slot.layoutChildren();
            }
        };
        Border.prototype.calculateWidthFromTop = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedWidth = this.width.value;
                for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                    var slot = _a[_i];
                    slot.isSlotWidthCalculatable = true;
                    slot.calculatedSlotWidth = this.width.value;
                }
                this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                this.calculatedWidth = this.mainSlot.calculatedSlotWidth;
                for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                    var slot = _c[_b];
                    slot.isSlotWidthCalculatable = true;
                    slot.calculatedSlotWidth = this.parentSlot.calculatedSlotWidth;
                }
                this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
                return;
            }
            // 终止向下计算，从下向上计算
            this.slots.forEach(function (t) { return t.isSlotWidthCalculatable = false; });
            this.calculateWidthFromBottom();
            for (var _d = 0, _e = this.slots; _d < _e.length; _d++) {
                var slot = _e[_d];
                slot.isSlotWidthCalculatable = true;
                slot.calculatedSlotWidth = this.calculatedWidth;
            }
            this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
        };
        Border.prototype.calculateHeightFromTop = function () {
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedHeight = this.height.value;
                for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                    var slot = _a[_i];
                    slot.isSlotHeightCalculatable = true;
                    slot.calculatedSlotHeight = this.height.value;
                }
                this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                    var slot = _c[_b];
                    slot.isSlotHeightCalculatable = true;
                    slot.calculatedSlotHeight = this.parentSlot.calculatedSlotHeight;
                }
                this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
                this.calculatedHeight = this.mainSlot.calculatedSlotHeight;
                return;
            }
            // 终止向下计算，从下向上计算
            this.slots.forEach(function (t) { return t.isSlotHeightCalculatable = false; });
            this.calculateHeightFromBottom();
            for (var _d = 0, _e = this.slots; _d < _e.length; _d++) {
                var slot = _e[_d];
                slot.isSlotHeightCalculatable = true;
                slot.calculatedSlotHeight = this.calculatedHeight;
            }
            this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
        };
        Border.prototype.calculateWidthFromBottom = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                this.calculateWidthFromTop();
                return;
            }
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                slot.calculateWidthFromBottom();
            }
            this.calculatedWidth = this.mainSlot.calculatedSlotWidth;
        };
        Border.prototype.calculateHeightFromBottom = function () {
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                this.calculateHeightFromTop();
                return;
            }
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                slot.calculateHeightFromBottom();
            }
            this.calculatedHeight = this.mainSlot.calculatedSlotHeight;
        };
        return Border;
    }(LayoutLzg.ContainerWidget));
    LayoutLzg.Border = Border;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var Vlinearlayout = (function (_super) {
        __extends(Vlinearlayout, _super);
        function Vlinearlayout(name) {
            _super.call(this, name);
            this.slotMap = new LayoutLzg.Map();
            this.childWrappersMap = new LayoutLzg.Map();
            this.slotWrappersMap = new LayoutLzg.Map();
        }
        Vlinearlayout.prototype.addCell = function (distance) {
            var slot = new LayoutLzg.Slot();
            slot.container = this;
            this.slots.add(slot);
            this.slotMap.put(slot, distance);
        };
        Vlinearlayout.prototype.setCell = function (control, cellIndex) {
            var idx = this.children.indexOf(control);
            if (idx > -1) {
                var slot = this.slots[cellIndex];
                slot.addChild(control);
            }
        };
        Vlinearlayout.prototype.assembleDom = function () {
            LayoutLzg.emptyChildren(this.getRootElement());
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                var slotWrapperDiv = LayoutLzg.createElement("DIV");
                LayoutLzg.css(slotWrapperDiv, 'pointer-events', 'none');
                for (var _b = 0, _c = slot.children; _b < _c.length; _b++) {
                    var child = _c[_b];
                    child.assembleDom();
                    var childWrapperDiv = LayoutLzg.createElement("DIV");
                    LayoutLzg.css(childWrapperDiv, 'pointer-events', 'none');
                    LayoutLzg.appendChild(childWrapperDiv, child.getRootElement());
                    LayoutLzg.appendChild(slotWrapperDiv, childWrapperDiv);
                    this.childWrappersMap.put(child, childWrapperDiv);
                }
                this.slotWrappersMap.put(slot, slotWrapperDiv);
                LayoutLzg.appendChild(this.getRootElement(), slotWrapperDiv);
            }
        };
        Vlinearlayout.prototype.doLayout = function () {
            LayoutLzg.css(this.getRootElement(), 'position', 'absolute');
            LayoutLzg.css(this.getRootElement(), 'width', this.calculatedWidth + 'px');
            LayoutLzg.css(this.getRootElement(), 'height', this.calculatedHeight + 'px');
            var weightSum = 0;
            var fixSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var cellDefination = this.slotMap.get(slot);
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed)
                    fixSum += cellDefination.value;
            }
            var pos = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var slotWrapperDiv = this.slotWrappersMap.get(slot);
                var cellDefination = this.slotMap.get(slot);
                var cellh = 0;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                    cellh = cellDefination.value;
                }
                else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                    cellh = (this.calculatedHeight - fixSum) * cellDefination.value / weightSum;
                }
                LayoutLzg.css(slotWrapperDiv, 'position', 'absolute');
                LayoutLzg.css(slotWrapperDiv, 'left', '0px');
                LayoutLzg.css(slotWrapperDiv, 'right', '0px');
                LayoutLzg.css(slotWrapperDiv, 'top', pos + 'px');
                LayoutLzg.css(slotWrapperDiv, 'height', cellh + 'px');
                for (var _i = 0, _a = slot.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    var childWrapperDiv = this.childWrappersMap.get(child);
                    LayoutLzg.css(childWrapperDiv, 'position', 'absolute');
                    LayoutLzg.css(childWrapperDiv, 'left', child.margin.left + 'px');
                    LayoutLzg.css(childWrapperDiv, 'right', child.margin.right + 'px');
                    LayoutLzg.css(childWrapperDiv, 'top', child.margin.top + 'px');
                    LayoutLzg.css(childWrapperDiv, 'bottom', child.margin.bottom + 'px');
                }
                slot.layoutChildren();
                pos += cellh;
            }
        };
        Vlinearlayout.prototype.calculateWidthFromTop = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedWidth = this.width.value;
                for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                    var slot = _a[_i];
                    slot.isSlotWidthCalculatable = true;
                    slot.calculatedSlotWidth = this.width.value;
                }
                this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth;
                for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                    var slot = _c[_b];
                    slot.isSlotWidthCalculatable = true;
                    slot.calculatedSlotWidth = this.parentSlot.calculatedSlotWidth;
                }
                this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
                return;
            }
            // 终止向下计算，从下向上计算
            this.slots.forEach(function (t) { return t.isSlotWidthCalculatable = false; });
            this.calculateWidthFromBottom();
            for (var _d = 0, _e = this.slots; _d < _e.length; _d++) {
                var slot = _e[_d];
                slot.isSlotWidthCalculatable = true;
                slot.calculatedSlotWidth = this.calculatedWidth;
            }
            this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
        };
        Vlinearlayout.prototype.calculateHeightFromTop = function () {
            var weightSum = 0;
            var fixSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var cellDefination = this.slotMap.get(slot);
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed)
                    fixSum += cellDefination.value;
            }
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                    var slot = _a[_i];
                    var cellDefination = this.slotMap.get(slot);
                    var cellh = 0;
                    if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                        cellh = cellDefination.value;
                    }
                    else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                        cellh = (this.height.value - fixSum) * cellDefination.value / weightSum;
                    }
                    slot.isSlotHeightCalculatable = true;
                    slot.calculatedSlotHeight = cellh;
                }
                this.calculatedHeight = this.height.value;
                this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight;
                for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                    var slot = _c[_b];
                    var cellDefination = this.slotMap.get(slot);
                    var cellh = 0;
                    if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                        cellh = cellDefination.value;
                    }
                    else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                        cellh = (this.parentSlot.calculatedSlotHeight - fixSum) * cellDefination.value / weightSum;
                    }
                    slot.isSlotHeightCalculatable = true;
                    slot.calculatedSlotHeight = cellh;
                }
                this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
                return;
            }
            // 终止向下计算，从下向上计算
            this.slots.forEach(function (t) { return t.isSlotHeightCalculatable = false; });
            this.calculateHeightFromBottom();
            for (var _d = 0, _e = this.slots; _d < _e.length; _d++) {
                var slot = _e[_d];
                slot.isSlotHeightCalculatable = true;
                slot.calculatedSlotHeight = this.calculatedHeight;
            }
            this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
        };
        Vlinearlayout.prototype.calculateWidthFromBottom = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                this.calculateWidthFromTop();
                return;
            }
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                slot.calculateWidthFromBottom();
            }
            var widthlist = this.slots.map(function (t) { return t.calculatedSlotWidth; });
            widthlist.sort(function (a, b) { return b - a; });
            var maxwidth = 0;
            if (widthlist.length > 0)
                maxwidth = widthlist[0];
            this.calculatedWidth = maxwidth;
        };
        Vlinearlayout.prototype.calculateHeightFromBottom = function () {
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                this.calculateHeightFromTop();
                return;
            }
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                slot.calculateHeightFromBottom();
            }
            var sum = 0;
            for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                var slot = _c[_b];
                sum += slot.calculatedSlotHeight;
            }
            this.calculatedHeight = sum;
        };
        Vlinearlayout.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = LayoutLzg.createElement("DIV");
                LayoutLzg.css(this.rootElem, 'pointer-events', 'all');
                LayoutLzg.setattr(this.rootElem, 'layout-type', 'Vlinearlayout');
                LayoutLzg.setattr(this.rootElem, 'layout-name', this.name);
            }
            return this.rootElem;
        };
        return Vlinearlayout;
    }(LayoutLzg.ContainerWidget));
    LayoutLzg.Vlinearlayout = Vlinearlayout;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var Hlinearlayout = (function (_super) {
        __extends(Hlinearlayout, _super);
        function Hlinearlayout(name) {
            _super.call(this, name);
            this.slotMap = new LayoutLzg.Map();
            this.childWrappersMap = new LayoutLzg.Map();
            this.slotWrappersMap = new LayoutLzg.Map();
        }
        Hlinearlayout.prototype.addCell = function (distance) {
            var slot = new LayoutLzg.Slot();
            slot.container = this;
            this.slots.add(slot);
            this.slotMap.put(slot, distance);
        };
        Hlinearlayout.prototype.setCell = function (control, cellIndex) {
            var idx = this.children.indexOf(control);
            if (idx > -1) {
                var slot = this.slots[cellIndex];
                slot.addChild(control);
            }
        };
        Hlinearlayout.prototype.assembleDom = function () {
            LayoutLzg.emptyChildren(this.getRootElement());
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                var slotWrapperDiv = LayoutLzg.createElement("DIV");
                LayoutLzg.css(slotWrapperDiv, 'pointer-events', 'none');
                for (var _b = 0, _c = slot.children; _b < _c.length; _b++) {
                    var child = _c[_b];
                    child.assembleDom();
                    var childWrapperDiv = LayoutLzg.createElement("DIV");
                    LayoutLzg.css(childWrapperDiv, 'pointer-events', 'none');
                    LayoutLzg.appendChild(childWrapperDiv, child.getRootElement());
                    LayoutLzg.appendChild(slotWrapperDiv, childWrapperDiv);
                    this.childWrappersMap.put(child, childWrapperDiv);
                }
                this.slotWrappersMap.put(slot, slotWrapperDiv);
                LayoutLzg.appendChild(this.getRootElement(), slotWrapperDiv);
            }
        };
        Hlinearlayout.prototype.doLayout = function () {
            LayoutLzg.css(this.getRootElement(), 'position', 'absolute');
            LayoutLzg.css(this.getRootElement(), 'width', this.calculatedWidth + 'px');
            LayoutLzg.css(this.getRootElement(), 'height', this.calculatedHeight + 'px');
            var weightSum = 0;
            var fixSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var cellDefination = this.slotMap.get(slot);
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed)
                    fixSum += cellDefination.value;
            }
            var pos = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var slotWrapperDiv = this.slotWrappersMap.get(slot);
                var cellDefination = this.slotMap.get(slot);
                var cellh = 0;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                    cellh = cellDefination.value;
                }
                else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                    cellh = (this.calculatedHeight - fixSum) * cellDefination.value / weightSum;
                }
                LayoutLzg.css(slotWrapperDiv, 'position', 'absolute');
                LayoutLzg.css(slotWrapperDiv, 'left', '0px');
                LayoutLzg.css(slotWrapperDiv, 'right', '0px');
                LayoutLzg.css(slotWrapperDiv, 'top', pos + 'px');
                LayoutLzg.css(slotWrapperDiv, 'height', cellh + 'px');
                for (var _i = 0, _a = slot.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    var childWrapperDiv = this.childWrappersMap.get(child);
                    LayoutLzg.css(childWrapperDiv, 'position', 'absolute');
                    LayoutLzg.css(childWrapperDiv, 'left', child.margin.left + 'px');
                    LayoutLzg.css(childWrapperDiv, 'right', child.margin.right + 'px');
                    LayoutLzg.css(childWrapperDiv, 'top', child.margin.top + 'px');
                    LayoutLzg.css(childWrapperDiv, 'bottom', child.margin.bottom + 'px');
                }
                slot.layoutChildren();
                pos += cellh;
            }
        };
        Hlinearlayout.prototype.calculateHeightFromTop = function () {
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedHeight = this.height.value;
                for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                    var slot = _a[_i];
                    slot.isSlotHeightCalculatable = true;
                    slot.calculatedSlotHeight = this.height.value;
                }
                this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight;
                for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                    var slot = _c[_b];
                    slot.isSlotHeightCalculatable = true;
                    slot.calculatedSlotHeight = this.parentSlot.calculatedSlotHeight;
                }
                this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
                return;
            }
            // 终止向下计算，从下向上计算
            this.slots.forEach(function (t) { return t.isSlotHeightCalculatable = false; });
            this.calculateHeightFromBottom();
            for (var _d = 0, _e = this.slots; _d < _e.length; _d++) {
                var slot = _e[_d];
                slot.isSlotHeightCalculatable = true;
                slot.calculatedSlotHeight = this.calculatedHeight;
            }
            this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
        };
        Hlinearlayout.prototype.calculateWidthFromTop = function () {
            var weightSum = 0;
            var fixSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var cellDefination = this.slotMap.get(slot);
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed)
                    fixSum += cellDefination.value;
            }
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                    var slot = _a[_i];
                    var cellDefination = this.slotMap.get(slot);
                    var cellh = 0;
                    if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                        cellh = cellDefination.value;
                    }
                    else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                        cellh = (this.width.value - fixSum) * cellDefination.value / weightSum;
                    }
                    slot.isSlotWidthCalculatable = true;
                    slot.calculatedSlotWidth = cellh;
                }
                this.calculatedWidth = this.width.value;
                this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth;
                for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                    var slot = _c[_b];
                    var cellDefination = this.slotMap.get(slot);
                    var cellh = 0;
                    if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                        cellh = cellDefination.value;
                    }
                    else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                        cellh = (this.parentSlot.calculatedSlotWidth - fixSum) * cellDefination.value / weightSum;
                    }
                    slot.isSlotWidthCalculatable = true;
                    slot.calculatedSlotWidth = cellh;
                }
                this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
                return;
            }
            // 终止向下计算，从下向上计算
            this.slots.forEach(function (t) { return t.isSlotWidthCalculatable = false; });
            this.calculateWidthFromBottom();
            for (var _d = 0, _e = this.slots; _d < _e.length; _d++) {
                var slot = _e[_d];
                slot.isSlotWidthCalculatable = true;
                slot.calculatedSlotWidth = this.calculatedWidth;
            }
            this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
        };
        Hlinearlayout.prototype.calculateHeightFromBottom = function () {
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                this.calculateHeightFromTop();
                return;
            }
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                slot.calculateHeightFromBottom();
            }
            var heightlist = this.slots.map(function (t) { return t.calculatedSlotHeight; });
            heightlist.sort(function (a, b) { return b - a; });
            var maxheight = 0;
            if (heightlist.length > 0)
                maxheight = heightlist[0];
            this.calculatedHeight = maxheight;
        };
        Hlinearlayout.prototype.calculateWidthFromBottom = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                this.calculateWidthFromTop();
                return;
            }
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                slot.calculateWidthFromBottom();
            }
            var sum = 0;
            for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                var slot = _c[_b];
                sum += slot.calculatedSlotWidth;
            }
            this.calculatedWidth = sum;
        };
        Hlinearlayout.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = LayoutLzg.createElement("DIV");
                LayoutLzg.css(this.rootElem, 'pointer-events', 'all');
                LayoutLzg.setattr(this.rootElem, 'layout-type', 'Vlinearlayout');
                LayoutLzg.setattr(this.rootElem, 'layout-name', this.name);
            }
            return this.rootElem;
        };
        return Hlinearlayout;
    }(LayoutLzg.ContainerWidget));
    LayoutLzg.Hlinearlayout = Hlinearlayout;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var ObserverModel;
    (function (ObserverModel) {
        var configPropertyName = "__observable__";
        var PropertyChangedEventArgs = (function () {
            function PropertyChangedEventArgs(obj, propertyName, oldValue, newValue) {
                this.obj = obj;
                this.propertyName = propertyName;
                this.oldValue = oldValue;
                this.newValue = newValue;
            }
            return PropertyChangedEventArgs;
        }());
        ObserverModel.PropertyChangedEventArgs = PropertyChangedEventArgs;
        var ObjectConfig = (function () {
            function ObjectConfig() {
                this.props = {};
                this.arrvalues = [];
                this.parent = null;
                this.propertyName = "";
                this.propChangedCallbackList = [];
                this.arrvalues = [];
            }
            ObjectConfig.prototype.notifyPropertyChanged = function (args) {
                for (var i = 0; i < this.propChangedCallbackList.length; i++) {
                    var callback = this.propChangedCallbackList[i];
                    callback(args);
                }
                var cfg = getObjectConfig(args.obj);
                if (cfg.parent) {
                    var parentCfg = getObjectConfig(cfg.parent);
                    parentCfg.notifyPropertyChanged(new PropertyChangedEventArgs(cfg.parent, cfg.propertyName + "." + args.propertyName, args.oldValue, args.newValue));
                }
            };
            ObjectConfig.prototype.addPropertyChangedCallback = function (callback) {
                this.propChangedCallbackList.push(callback);
            };
            ObjectConfig.prototype.removePropertyChangedCallback = function (callback) {
                var idx = this.propChangedCallbackList.indexOf(callback);
                if (idx > -1) {
                    this.propChangedCallbackList.splice(idx, 1);
                }
            };
            return ObjectConfig;
        }());
        ObserverModel.ObjectConfig = ObjectConfig;
        function getObjectConfig(obj) {
            if (!(configPropertyName in obj)) {
                var cfg = new ObjectConfig();
                obj[configPropertyName] = cfg;
            }
            return obj[configPropertyName];
        }
        ObserverModel.getObjectConfig = getObjectConfig;
        function injectProperties(obj) {
            if (obj == null)
                return;
            if (toString.call(obj) != "[object Object]")
                return;
            var cfg = getObjectConfig(obj);
            var _loop_1 = function(propertyName) {
                if (propertyName == configPropertyName)
                    return "continue";
                if (!obj.hasOwnProperty(propertyName))
                    return "continue";
                var propValue = obj[propertyName];
                if (toString.call(propValue) == '[object Function]') {
                    return "continue";
                }
                else if (toString.call(propValue) == '[object Object]') {
                    injectProperties(propValue);
                }
                else if (toString.call(propValue) == '[object Array]') {
                    propValue = new ObservableArray(propValue);
                    obj[propertyName] = propValue;
                }
                var descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
                if ('value' in descriptor) {
                    var t = descriptor.value;
                    if (toString.call(t) == '[object Function]') {
                        return "continue";
                    }
                    else if ("__observablearray_" in t) {
                        propValue.addEventListener("itemadded", function (e) {
                            cfg.notifyPropertyChanged(new PropertyChangedEventArgs(obj, propertyName + ".*", null, null));
                        });
                        propValue.addEventListener("itemset", function (e) {
                            cfg.notifyPropertyChanged(new PropertyChangedEventArgs(obj, propertyName + ".*", null, null));
                        });
                        propValue.addEventListener("itemremoved", function (e) {
                            cfg.notifyPropertyChanged(new PropertyChangedEventArgs(obj, propertyName + ".*", null, null));
                        });
                        for (var _i = 0, propValue_1 = propValue; _i < propValue_1.length; _i++) {
                            var childvalue = propValue_1[_i];
                            if (toString.call(childvalue) != "[object Object]")
                                continue;
                            injectProperties(childvalue);
                            var childCfg = getObjectConfig(childvalue);
                            childCfg.parent = obj;
                            childCfg.propertyName = propertyName + ".*";
                        }
                    }
                    else if (toString.call(propValue) == '[object Object]') {
                        injectProperties(propValue);
                        var childCfg = getObjectConfig(propValue);
                        childCfg.parent = obj;
                        childCfg.propertyName = propertyName;
                    }
                }
                else {
                    return "continue";
                }
                cfg.props[propertyName] = obj[propertyName];
                (function (propertyName) {
                    Object.defineProperty(obj, propertyName, {
                        'get': function () {
                            return getObjectConfig(this).props[propertyName];
                        },
                        'set': function (value) {
                            injectProperties(this);
                            var oldValue = getObjectConfig(this).props[propertyName];
                            getObjectConfig(this).props[propertyName] = value;
                            getObjectConfig(this).notifyPropertyChanged(new PropertyChangedEventArgs(this, propertyName, oldValue, value));
                        }
                    });
                })(propertyName);
            };
            for (var propertyName in obj) {
                var state_1 = _loop_1(propertyName);
                if (state_1 === "continue") continue;
            }
        }
        ObserverModel.injectProperties = injectProperties;
    })(ObserverModel = LayoutLzg.ObserverModel || (LayoutLzg.ObserverModel = {}));
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var PropertyGetter = (function () {
        function PropertyGetter(obj, propertyName) {
            this.obj = obj;
            this.propertyName = propertyName;
        }
        return PropertyGetter;
    }());
    LayoutLzg.PropertyGetter = PropertyGetter;
    var PropertySetter = (function () {
        function PropertySetter(obj, propertyName) {
            this.obj = obj;
            this.propertyName = propertyName;
        }
        return PropertySetter;
    }());
    LayoutLzg.PropertySetter = PropertySetter;
    var PropertyChangedListener = (function () {
        function PropertyChangedListener(obj, propertyName) {
            this.obj = obj;
            this.propertyName = propertyName;
        }
        PropertyChangedListener.prototype.setPropertyChangedCallback = function (listener) {
            this.callback = listener;
        };
        PropertyChangedListener.prototype.removePropertyChangedCallback = function () {
            this.callback = null;
        };
        PropertyChangedListener.prototype.dispose = function () {
            this.removePropertyChangedCallback();
        };
        return PropertyChangedListener;
    }());
    LayoutLzg.PropertyChangedListener = PropertyChangedListener;
    var PropertyChangedListenerProvider = (function () {
        function PropertyChangedListenerProvider() {
        }
        return PropertyChangedListenerProvider;
    }());
    LayoutLzg.PropertyChangedListenerProvider = PropertyChangedListenerProvider;
    var UniversalPropertyChangedListenerProvider = (function (_super) {
        __extends(UniversalPropertyChangedListenerProvider, _super);
        function UniversalPropertyChangedListenerProvider() {
            _super.call(this);
            this.providers = new LayoutLzg.List();
        }
        UniversalPropertyChangedListenerProvider.prototype.addProvider = function (provider) {
            this.providers.add(provider);
        };
        UniversalPropertyChangedListenerProvider.prototype.addProviders = function (providers) {
            for (var _i = 0, providers_1 = providers; _i < providers_1.length; _i++) {
                var provider = providers_1[_i];
                this.providers.add(provider);
            }
        };
        UniversalPropertyChangedListenerProvider.prototype.canProvideChangedListener = function (obj, propertyName) {
            for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
                var provider = _a[_i];
                if (provider.canProvideChangedListener(obj, propertyName)) {
                    return true;
                }
            }
            return false;
        };
        UniversalPropertyChangedListenerProvider.prototype.getPropertyChangedListener = function (obj, propertyName) {
            for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
                var provider = _a[_i];
                if (provider.canProvideChangedListener(obj, propertyName)) {
                    return provider.getPropertyChangedListener(obj, propertyName);
                }
            }
            return null;
        };
        return UniversalPropertyChangedListenerProvider;
    }(PropertyChangedListenerProvider));
    LayoutLzg.UniversalPropertyChangedListenerProvider = UniversalPropertyChangedListenerProvider;
    var PropertyGetterProvider = (function () {
        function PropertyGetterProvider() {
        }
        return PropertyGetterProvider;
    }());
    LayoutLzg.PropertyGetterProvider = PropertyGetterProvider;
    var PropertySetterProvider = (function () {
        function PropertySetterProvider() {
        }
        return PropertySetterProvider;
    }());
    LayoutLzg.PropertySetterProvider = PropertySetterProvider;
    var PropertyProvider = (function () {
        function PropertyProvider() {
        }
        return PropertyProvider;
    }());
    LayoutLzg.PropertyProvider = PropertyProvider;
    var UniversalPropertyGetterProvider = (function (_super) {
        __extends(UniversalPropertyGetterProvider, _super);
        function UniversalPropertyGetterProvider() {
            _super.call(this);
            this.providers = new LayoutLzg.List();
        }
        UniversalPropertyGetterProvider.prototype.addProvider = function (provider) {
            this.providers.add(provider);
        };
        UniversalPropertyGetterProvider.prototype.addProviders = function (providers) {
            for (var _i = 0, providers_2 = providers; _i < providers_2.length; _i++) {
                var provider = providers_2[_i];
                this.providers.add(provider);
            }
        };
        UniversalPropertyGetterProvider.prototype.canProvideGetter = function (obj, propertyName) {
            for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
                var provider = _a[_i];
                if (provider.canProvideGetter(obj, propertyName)) {
                    return true;
                }
            }
            return false;
        };
        UniversalPropertyGetterProvider.prototype.getPropertyGetter = function (obj, propertyName) {
            for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
                var provider = _a[_i];
                if (provider.canProvideGetter(obj, propertyName)) {
                    return provider.getPropertyGetter(obj, propertyName);
                }
            }
            return null;
        };
        return UniversalPropertyGetterProvider;
    }(PropertyGetterProvider));
    LayoutLzg.UniversalPropertyGetterProvider = UniversalPropertyGetterProvider;
    var UniversalPropertySetterProvider = (function (_super) {
        __extends(UniversalPropertySetterProvider, _super);
        function UniversalPropertySetterProvider() {
            _super.call(this);
            this.providers = new LayoutLzg.List();
        }
        UniversalPropertySetterProvider.prototype.addProvider = function (provider) {
            this.providers.add(provider);
        };
        UniversalPropertySetterProvider.prototype.addProviders = function (providers) {
            for (var _i = 0, providers_3 = providers; _i < providers_3.length; _i++) {
                var provider = providers_3[_i];
                this.providers.add(provider);
            }
        };
        UniversalPropertySetterProvider.prototype.canProvideSetter = function (obj, propertyName) {
            for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
                var provider = _a[_i];
                if (provider.canProvideSetter(obj, propertyName)) {
                    return true;
                }
            }
            return false;
        };
        UniversalPropertySetterProvider.prototype.getPropertySetter = function (obj, propertyName) {
            for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
                var provider = _a[_i];
                if (provider.canProvideSetter(obj, propertyName)) {
                    return provider.getPropertySetter(obj, propertyName);
                }
            }
            return null;
        };
        return UniversalPropertySetterProvider;
    }(PropertySetterProvider));
    LayoutLzg.UniversalPropertySetterProvider = UniversalPropertySetterProvider;
    var UniversalPropertyProvider = (function (_super) {
        __extends(UniversalPropertyProvider, _super);
        function UniversalPropertyProvider(propertyGetterProvider, propertySetterProvider, propertyChangedListenerProvider) {
            _super.call(this);
            this.propertyGetterProvider = propertyGetterProvider;
            this.propertySetterProvider = propertySetterProvider;
            this.propertyChangedListenerProvider = propertyChangedListenerProvider;
        }
        UniversalPropertyProvider.prototype.canProvideGetter = function (obj, propertyName) {
            return this.propertyGetterProvider.canProvideGetter(obj, propertyName);
        };
        UniversalPropertyProvider.prototype.getPropertyGetter = function (obj, propertyName) {
            return this.propertyGetterProvider.getPropertyGetter(obj, propertyName);
        };
        UniversalPropertyProvider.prototype.canProvideSetter = function (obj, propertyName) {
            return this.propertySetterProvider.canProvideSetter(obj, propertyName);
        };
        UniversalPropertyProvider.prototype.getPropertySetter = function (obj, propertyName) {
            return this.propertySetterProvider.getPropertySetter(obj, propertyName);
        };
        UniversalPropertyProvider.prototype.canProvidePropertyChangedListener = function (obj, propertyName) {
            return this.propertyChangedListenerProvider.canProvideChangedListener(obj, propertyName);
        };
        UniversalPropertyProvider.prototype.getPropertyChangedListener = function (obj, propertyName) {
            return this.propertyChangedListenerProvider.getPropertyChangedListener(obj, propertyName);
        };
        return UniversalPropertyProvider;
    }(PropertyProvider));
    LayoutLzg.UniversalPropertyProvider = UniversalPropertyProvider;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var DomWidthPropertyGetter = (function (_super) {
        __extends(DomWidthPropertyGetter, _super);
        function DomWidthPropertyGetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        DomWidthPropertyGetter.prototype.getValue = function () {
            var dom = this.obj;
            return dom.offsetWidth;
        };
        return DomWidthPropertyGetter;
    }(LayoutLzg.PropertyGetter));
    LayoutLzg.DomWidthPropertyGetter = DomWidthPropertyGetter;
    var DomWidthPropertySetter = (function (_super) {
        __extends(DomWidthPropertySetter, _super);
        function DomWidthPropertySetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        DomWidthPropertySetter.prototype.setValue = function (value) {
            var dom = this.obj;
            dom.style.width = value + "px";
        };
        return DomWidthPropertySetter;
    }(LayoutLzg.PropertySetter));
    LayoutLzg.DomWidthPropertySetter = DomWidthPropertySetter;
    var DomWidthPropertyGetterProvider = (function (_super) {
        __extends(DomWidthPropertyGetterProvider, _super);
        function DomWidthPropertyGetterProvider() {
            _super.apply(this, arguments);
        }
        DomWidthPropertyGetterProvider.prototype.canProvideGetter = function (obj, propertyName) {
            return obj instanceof HTMLElement && propertyName == "width";
        };
        DomWidthPropertyGetterProvider.prototype.getPropertyGetter = function (obj, propertyName) {
            return new DomWidthPropertyGetter(obj, propertyName);
        };
        return DomWidthPropertyGetterProvider;
    }(LayoutLzg.PropertyGetterProvider));
    LayoutLzg.DomWidthPropertyGetterProvider = DomWidthPropertyGetterProvider;
    var DomWidthPropertySetterProvider = (function (_super) {
        __extends(DomWidthPropertySetterProvider, _super);
        function DomWidthPropertySetterProvider() {
            _super.apply(this, arguments);
        }
        DomWidthPropertySetterProvider.prototype.canProvideSetter = function (obj, propertyName) {
            return obj instanceof HTMLElement && propertyName == "width";
        };
        DomWidthPropertySetterProvider.prototype.getPropertySetter = function (obj, propertyName) {
            return new DomWidthPropertySetter(obj, propertyName);
        };
        return DomWidthPropertySetterProvider;
    }(LayoutLzg.PropertySetterProvider));
    LayoutLzg.DomWidthPropertySetterProvider = DomWidthPropertySetterProvider;
    var DomHeightPropertyGetter = (function (_super) {
        __extends(DomHeightPropertyGetter, _super);
        function DomHeightPropertyGetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        DomHeightPropertyGetter.prototype.getValue = function () {
            var dom = this.obj;
            return dom.offsetHeight;
        };
        return DomHeightPropertyGetter;
    }(LayoutLzg.PropertyGetter));
    LayoutLzg.DomHeightPropertyGetter = DomHeightPropertyGetter;
    var DomHeightPropertySetter = (function (_super) {
        __extends(DomHeightPropertySetter, _super);
        function DomHeightPropertySetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        DomHeightPropertySetter.prototype.setValue = function (value) {
            var dom = this.obj;
            dom.style.height = value + "px";
        };
        return DomHeightPropertySetter;
    }(LayoutLzg.PropertySetter));
    LayoutLzg.DomHeightPropertySetter = DomHeightPropertySetter;
    var DomHeightPropertyGetterProvider = (function (_super) {
        __extends(DomHeightPropertyGetterProvider, _super);
        function DomHeightPropertyGetterProvider() {
            _super.apply(this, arguments);
        }
        DomHeightPropertyGetterProvider.prototype.canProvideGetter = function (obj, propertyName) {
            return obj instanceof HTMLElement && propertyName == "height";
        };
        DomHeightPropertyGetterProvider.prototype.getPropertyGetter = function (obj, propertyName) {
            return new DomHeightPropertyGetter(obj, propertyName);
        };
        return DomHeightPropertyGetterProvider;
    }(LayoutLzg.PropertyGetterProvider));
    LayoutLzg.DomHeightPropertyGetterProvider = DomHeightPropertyGetterProvider;
    var DomHeightPropertySetterProvider = (function (_super) {
        __extends(DomHeightPropertySetterProvider, _super);
        function DomHeightPropertySetterProvider() {
            _super.apply(this, arguments);
        }
        DomHeightPropertySetterProvider.prototype.canProvideSetter = function (obj, propertyName) {
            return obj instanceof HTMLElement && propertyName == "height";
        };
        DomHeightPropertySetterProvider.prototype.getPropertySetter = function (obj, propertyName) {
            return new DomHeightPropertySetter(obj, propertyName);
        };
        return DomHeightPropertySetterProvider;
    }(LayoutLzg.PropertySetterProvider));
    LayoutLzg.DomHeightPropertySetterProvider = DomHeightPropertySetterProvider;
    var DomSizePropertyChangedListener = (function (_super) {
        __extends(DomSizePropertyChangedListener, _super);
        function DomSizePropertyChangedListener(obj, propertyName) {
            _super.call(this, obj, propertyName);
            this.dom = obj;
        }
        DomSizePropertyChangedListener.prototype.startListen = function () {
            var self = this;
            this.callbackfun = function () {
                if (self.callback)
                    self.callback.apply(self.dom, [self.dom]);
            };
            LayoutLzg.onEvent(this.dom, "resize", this.callbackfun);
        };
        DomSizePropertyChangedListener.prototype.stopListen = function () {
            LayoutLzg.offEvent(this.dom, "resize", this.callbackfun);
        };
        return DomSizePropertyChangedListener;
    }(LayoutLzg.PropertyChangedListener));
    LayoutLzg.DomSizePropertyChangedListener = DomSizePropertyChangedListener;
    var DomSizePropertyChangedListenerProvider = (function (_super) {
        __extends(DomSizePropertyChangedListenerProvider, _super);
        function DomSizePropertyChangedListenerProvider() {
            _super.apply(this, arguments);
        }
        DomSizePropertyChangedListenerProvider.prototype.getPropertyChangedListener = function (obj, propertyName) {
            return new DomSizePropertyChangedListener(obj, propertyName);
        };
        DomSizePropertyChangedListenerProvider.prototype.canProvideChangedListener = function (obj, propertyName) {
            if (obj instanceof HTMLElement) {
                if (propertyName == "width" || propertyName == "height") {
                    return true;
                }
            }
            return false;
        };
        return DomSizePropertyChangedListenerProvider;
    }(LayoutLzg.PropertyChangedListenerProvider));
    LayoutLzg.DomSizePropertyChangedListenerProvider = DomSizePropertyChangedListenerProvider;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var DomTextPropertyGetter = (function (_super) {
        __extends(DomTextPropertyGetter, _super);
        function DomTextPropertyGetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        DomTextPropertyGetter.prototype.getValue = function () {
            var dom = this.obj;
            if (dom.tagName == "INPUT" || dom.tagName == "input") {
                return LayoutLzg.getElemValue(dom);
            }
            return LayoutLzg.getElemText(dom);
        };
        return DomTextPropertyGetter;
    }(LayoutLzg.PropertyGetter));
    LayoutLzg.DomTextPropertyGetter = DomTextPropertyGetter;
    var DomTextPropertySetter = (function (_super) {
        __extends(DomTextPropertySetter, _super);
        function DomTextPropertySetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        DomTextPropertySetter.prototype.setValue = function (value) {
            var dom = this.obj;
            if (dom.tagName == "INPUT" || dom.tagName == "input") {
                LayoutLzg.setElemValue(dom, value);
                return;
            }
            LayoutLzg.setElemText(dom, value);
        };
        return DomTextPropertySetter;
    }(LayoutLzg.PropertySetter));
    LayoutLzg.DomTextPropertySetter = DomTextPropertySetter;
    var DomTextPropertyGetterProvider = (function (_super) {
        __extends(DomTextPropertyGetterProvider, _super);
        function DomTextPropertyGetterProvider() {
            _super.apply(this, arguments);
        }
        DomTextPropertyGetterProvider.prototype.canProvideGetter = function (obj, propertyName) {
            return obj instanceof HTMLElement && propertyName == "text";
        };
        DomTextPropertyGetterProvider.prototype.getPropertyGetter = function (obj, propertyName) {
            return new DomTextPropertyGetter(obj, propertyName);
        };
        return DomTextPropertyGetterProvider;
    }(LayoutLzg.PropertyGetterProvider));
    LayoutLzg.DomTextPropertyGetterProvider = DomTextPropertyGetterProvider;
    var DomTextPropertySetterProvider = (function (_super) {
        __extends(DomTextPropertySetterProvider, _super);
        function DomTextPropertySetterProvider() {
            _super.apply(this, arguments);
        }
        DomTextPropertySetterProvider.prototype.canProvideSetter = function (obj, propertyName) {
            return obj instanceof HTMLElement && propertyName == "text";
        };
        DomTextPropertySetterProvider.prototype.getPropertySetter = function (obj, propertyName) {
            return new DomTextPropertySetter(obj, propertyName);
        };
        return DomTextPropertySetterProvider;
    }(LayoutLzg.PropertySetterProvider));
    LayoutLzg.DomTextPropertySetterProvider = DomTextPropertySetterProvider;
    var DomTextPropertyChangedListener = (function (_super) {
        __extends(DomTextPropertyChangedListener, _super);
        function DomTextPropertyChangedListener(obj, propertyName) {
            _super.call(this, obj, propertyName);
            this.dom = obj;
        }
        DomTextPropertyChangedListener.prototype.startListen = function () {
            var self = this;
            this.callbackfun = function () {
                if (self.callback)
                    self.callback.apply(self.dom, [self.dom]);
            };
            LayoutLzg.onEvent(this.dom, "change", this.callbackfun);
        };
        DomTextPropertyChangedListener.prototype.stopListen = function () {
            LayoutLzg.offEvent(this.dom, "change", this.callbackfun);
        };
        return DomTextPropertyChangedListener;
    }(LayoutLzg.PropertyChangedListener));
    LayoutLzg.DomTextPropertyChangedListener = DomTextPropertyChangedListener;
    var DomTextPropertyChangedListenerProvider = (function (_super) {
        __extends(DomTextPropertyChangedListenerProvider, _super);
        function DomTextPropertyChangedListenerProvider() {
            _super.apply(this, arguments);
        }
        DomTextPropertyChangedListenerProvider.prototype.getPropertyChangedListener = function (obj, propertyName) {
            return new DomTextPropertyChangedListener(obj, propertyName);
        };
        DomTextPropertyChangedListenerProvider.prototype.canProvideChangedListener = function (obj, propertyName) {
            if (obj instanceof HTMLElement) {
                if (propertyName == "text") {
                    return true;
                }
            }
            return false;
        };
        return DomTextPropertyChangedListenerProvider;
    }(LayoutLzg.PropertyChangedListenerProvider));
    LayoutLzg.DomTextPropertyChangedListenerProvider = DomTextPropertyChangedListenerProvider;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var DomValuePropertyGetter = (function (_super) {
        __extends(DomValuePropertyGetter, _super);
        function DomValuePropertyGetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        DomValuePropertyGetter.prototype.getValue = function () {
            var dom = this.obj;
            if (dom.tagName == "INPUT" || dom.tagName == "input") {
                var input = dom;
                if (input.type == "date") {
                    return input.valueAsDate;
                }
                else if (input.type == "checkbox") {
                    return input.checked;
                }
                else {
                    return LayoutLzg.getElemValue(dom);
                }
            }
            return LayoutLzg.getElemText(dom);
        };
        return DomValuePropertyGetter;
    }(LayoutLzg.PropertyGetter));
    LayoutLzg.DomValuePropertyGetter = DomValuePropertyGetter;
    var DomValuePropertySetter = (function (_super) {
        __extends(DomValuePropertySetter, _super);
        function DomValuePropertySetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        DomValuePropertySetter.prototype.setValue = function (value) {
            var dom = this.obj;
            if (dom.tagName == "INPUT" || dom.tagName == "input") {
                var input = dom;
                if (input.type == "date") {
                    input.value = value;
                }
                else if (input.type == "checkbox") {
                    input.checked = value;
                }
                else {
                    LayoutLzg.setElemValue(dom, value);
                    return;
                }
            }
            LayoutLzg.setElemText(dom, value);
        };
        return DomValuePropertySetter;
    }(LayoutLzg.PropertySetter));
    LayoutLzg.DomValuePropertySetter = DomValuePropertySetter;
    var DomValuePropertyGetterProvider = (function (_super) {
        __extends(DomValuePropertyGetterProvider, _super);
        function DomValuePropertyGetterProvider() {
            _super.apply(this, arguments);
        }
        DomValuePropertyGetterProvider.prototype.canProvideGetter = function (obj, propertyName) {
            return obj instanceof HTMLElement && propertyName == "value";
        };
        DomValuePropertyGetterProvider.prototype.getPropertyGetter = function (obj, propertyName) {
            return new DomValuePropertyGetter(obj, propertyName);
        };
        return DomValuePropertyGetterProvider;
    }(LayoutLzg.PropertyGetterProvider));
    LayoutLzg.DomValuePropertyGetterProvider = DomValuePropertyGetterProvider;
    var DomValuePropertySetterProvider = (function (_super) {
        __extends(DomValuePropertySetterProvider, _super);
        function DomValuePropertySetterProvider() {
            _super.apply(this, arguments);
        }
        DomValuePropertySetterProvider.prototype.canProvideSetter = function (obj, propertyName) {
            return obj instanceof HTMLElement && propertyName == "value";
        };
        DomValuePropertySetterProvider.prototype.getPropertySetter = function (obj, propertyName) {
            return new DomValuePropertySetter(obj, propertyName);
        };
        return DomValuePropertySetterProvider;
    }(LayoutLzg.PropertySetterProvider));
    LayoutLzg.DomValuePropertySetterProvider = DomValuePropertySetterProvider;
    var DomValuePropertyChangedListener = (function (_super) {
        __extends(DomValuePropertyChangedListener, _super);
        function DomValuePropertyChangedListener(obj, propertyName) {
            _super.call(this, obj, propertyName);
            this.dom = obj;
        }
        DomValuePropertyChangedListener.prototype.startListen = function () {
            var self = this;
            this.callbackfun = function () {
                if (self.callback)
                    self.callback.apply(self.dom, [self.dom]);
            };
            LayoutLzg.onEvent(this.dom, "change", this.callbackfun);
        };
        DomValuePropertyChangedListener.prototype.stopListen = function () {
            LayoutLzg.offEvent(this.dom, "resize", this.callbackfun);
        };
        return DomValuePropertyChangedListener;
    }(LayoutLzg.PropertyChangedListener));
    LayoutLzg.DomValuePropertyChangedListener = DomValuePropertyChangedListener;
    var DomValuePropertyChangedListenerProvider = (function (_super) {
        __extends(DomValuePropertyChangedListenerProvider, _super);
        function DomValuePropertyChangedListenerProvider() {
            _super.apply(this, arguments);
        }
        DomValuePropertyChangedListenerProvider.prototype.getPropertyChangedListener = function (obj, propertyName) {
            return new DomValuePropertyChangedListener(obj, propertyName);
        };
        DomValuePropertyChangedListenerProvider.prototype.canProvideChangedListener = function (obj, propertyName) {
            if (obj instanceof HTMLElement) {
                if (propertyName == "value") {
                    return true;
                }
            }
            return false;
        };
        return DomValuePropertyChangedListenerProvider;
    }(LayoutLzg.PropertyChangedListenerProvider));
    LayoutLzg.DomValuePropertyChangedListenerProvider = DomValuePropertyChangedListenerProvider;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var DictPropertyGetter = (function (_super) {
        __extends(DictPropertyGetter, _super);
        function DictPropertyGetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        DictPropertyGetter.prototype.getValue = function () {
            return this.obj[this.propertyName];
        };
        return DictPropertyGetter;
    }(LayoutLzg.PropertyGetter));
    LayoutLzg.DictPropertyGetter = DictPropertyGetter;
    var DictPropertySetter = (function (_super) {
        __extends(DictPropertySetter, _super);
        function DictPropertySetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        DictPropertySetter.prototype.setValue = function (value) {
            this.obj[this.propertyName] = value;
        };
        return DictPropertySetter;
    }(LayoutLzg.PropertySetter));
    LayoutLzg.DictPropertySetter = DictPropertySetter;
    var DictPropertyChangedListener = (function (_super) {
        __extends(DictPropertyChangedListener, _super);
        function DictPropertyChangedListener(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        DictPropertyChangedListener.prototype.startListen = function () {
            var self = this;
            this.callbackfunc = function (args) {
                if (args.propertyName == self.propertyName) {
                    self.callback.apply(this, [self.obj]);
                }
            };
            LayoutLzg.ObserverModel.injectProperties(this.obj);
            LayoutLzg.ObserverModel.getObjectConfig(this.obj).addPropertyChangedCallback(this.callbackfunc);
        };
        DictPropertyChangedListener.prototype.stopListen = function () {
            LayoutLzg.ObserverModel.getObjectConfig(this.obj).removePropertyChangedCallback(this.callbackfunc);
        };
        return DictPropertyChangedListener;
    }(LayoutLzg.PropertyChangedListener));
    LayoutLzg.DictPropertyChangedListener = DictPropertyChangedListener;
    var DictPropertyGetterProvider = (function (_super) {
        __extends(DictPropertyGetterProvider, _super);
        function DictPropertyGetterProvider() {
            _super.apply(this, arguments);
        }
        DictPropertyGetterProvider.prototype.canProvideGetter = function (obj, propertyName) {
            return true;
        };
        DictPropertyGetterProvider.prototype.getPropertyGetter = function (obj, propertyName) {
            return new DictPropertyGetter(obj, propertyName);
        };
        return DictPropertyGetterProvider;
    }(LayoutLzg.PropertyGetterProvider));
    LayoutLzg.DictPropertyGetterProvider = DictPropertyGetterProvider;
    var DictPropertySetterProvider = (function (_super) {
        __extends(DictPropertySetterProvider, _super);
        function DictPropertySetterProvider() {
            _super.apply(this, arguments);
        }
        DictPropertySetterProvider.prototype.canProvideSetter = function (obj, propertyName) {
            return true;
        };
        DictPropertySetterProvider.prototype.getPropertySetter = function (obj, propertyName) {
            return new DictPropertySetter(obj, propertyName);
        };
        return DictPropertySetterProvider;
    }(LayoutLzg.PropertySetterProvider));
    LayoutLzg.DictPropertySetterProvider = DictPropertySetterProvider;
    var DictPropertyChangedListenerProvider = (function (_super) {
        __extends(DictPropertyChangedListenerProvider, _super);
        function DictPropertyChangedListenerProvider() {
            _super.apply(this, arguments);
        }
        DictPropertyChangedListenerProvider.prototype.canProvideChangedListener = function (obj, propertyName) {
            return true;
        };
        DictPropertyChangedListenerProvider.prototype.getPropertyChangedListener = function (obj, propertyName) {
            return new DictPropertyChangedListener(obj, propertyName);
        };
        return DictPropertyChangedListenerProvider;
    }(LayoutLzg.PropertyChangedListenerProvider));
    LayoutLzg.DictPropertyChangedListenerProvider = DictPropertyChangedListenerProvider;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var ControlPropertyGetter = (function (_super) {
        __extends(ControlPropertyGetter, _super);
        function ControlPropertyGetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        ControlPropertyGetter.prototype.getValue = function () {
            var control = this.obj;
            if (this.propertyName in control) {
                return control[this.propertyName];
            }
            return null;
        };
        return ControlPropertyGetter;
    }(LayoutLzg.PropertyGetter));
    LayoutLzg.ControlPropertyGetter = ControlPropertyGetter;
    var ControlPropertySetter = (function (_super) {
        __extends(ControlPropertySetter, _super);
        function ControlPropertySetter(obj, propertyName) {
            _super.call(this, obj, propertyName);
        }
        ControlPropertySetter.prototype.setValue = function (value) {
            var control = this.obj;
            if (this.propertyName in control) {
                control[this.propertyName] = value;
                var control1 = this.obj;
                control1.assembleDom();
                control1.calculateWidthFromTop();
                control1.calculateHeightFromTop();
                control1.doLayout();
            }
        };
        return ControlPropertySetter;
    }(LayoutLzg.PropertySetter));
    LayoutLzg.ControlPropertySetter = ControlPropertySetter;
    var ControlPropertyGetterProvider = (function (_super) {
        __extends(ControlPropertyGetterProvider, _super);
        function ControlPropertyGetterProvider() {
            _super.apply(this, arguments);
        }
        ControlPropertyGetterProvider.prototype.canProvideGetter = function (obj, propertyName) {
            return obj instanceof LayoutLzg.VisualElement;
        };
        ControlPropertyGetterProvider.prototype.getPropertyGetter = function (obj, propertyName) {
            return new ControlPropertyGetter(obj, propertyName);
        };
        return ControlPropertyGetterProvider;
    }(LayoutLzg.PropertyGetterProvider));
    LayoutLzg.ControlPropertyGetterProvider = ControlPropertyGetterProvider;
    var ControlPropertySetterProvider = (function (_super) {
        __extends(ControlPropertySetterProvider, _super);
        function ControlPropertySetterProvider() {
            _super.apply(this, arguments);
        }
        ControlPropertySetterProvider.prototype.canProvideSetter = function (obj, propertyName) {
            return obj instanceof LayoutLzg.VisualElement;
        };
        ControlPropertySetterProvider.prototype.getPropertySetter = function (obj, propertyName) {
            return new ControlPropertySetter(obj, propertyName);
        };
        return ControlPropertySetterProvider;
    }(LayoutLzg.PropertySetterProvider));
    LayoutLzg.ControlPropertySetterProvider = ControlPropertySetterProvider;
    var ControlPropertyChangedListener = (function (_super) {
        __extends(ControlPropertyChangedListener, _super);
        function ControlPropertyChangedListener(obj, propertyName) {
            _super.call(this, obj, propertyName);
            this.control = obj;
        }
        ControlPropertyChangedListener.prototype.startListen = function () {
            var self = this;
            this.callbackfun = function () {
                if (self.callback)
                    self.callback.apply(self.control, [self.control]);
            };
            this.control.addPropertyChangedListener(this.propertyName, this.callbackfun);
        };
        ControlPropertyChangedListener.prototype.stopListen = function () {
            this.control.removePropertyChangedListener(this.callbackfun);
        };
        return ControlPropertyChangedListener;
    }(LayoutLzg.PropertyChangedListener));
    LayoutLzg.ControlPropertyChangedListener = ControlPropertyChangedListener;
    var ControlPropertyChangedListenerProvider = (function (_super) {
        __extends(ControlPropertyChangedListenerProvider, _super);
        function ControlPropertyChangedListenerProvider() {
            _super.apply(this, arguments);
        }
        ControlPropertyChangedListenerProvider.prototype.getPropertyChangedListener = function (obj, propertyName) {
            return new ControlPropertyChangedListener(obj, propertyName);
        };
        ControlPropertyChangedListenerProvider.prototype.canProvideChangedListener = function (obj, propertyName) {
            if (obj instanceof LayoutLzg.VisualElement) {
                var control = obj;
                return control.getNotifyProperties().indexOf(propertyName) > -1;
            }
            return false;
        };
        return ControlPropertyChangedListenerProvider;
    }(LayoutLzg.PropertyChangedListenerProvider));
    LayoutLzg.ControlPropertyChangedListenerProvider = ControlPropertyChangedListenerProvider;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var ValueConverter = (function () {
        function ValueConverter() {
        }
        return ValueConverter;
    }());
    LayoutLzg.ValueConverter = ValueConverter;
    (function (BindingMode) {
        BindingMode[BindingMode["Oneway"] = 0] = "Oneway";
        BindingMode[BindingMode["Twoway"] = 1] = "Twoway";
    })(LayoutLzg.BindingMode || (LayoutLzg.BindingMode = {}));
    var BindingMode = LayoutLzg.BindingMode;
    var Binding = (function () {
        function Binding(propertyProvider) {
            this.propertyProvider = propertyProvider;
        }
        Binding.prototype.setConverter = function (converter) {
            this.converter = converter;
            return this;
        };
        Binding.prototype.setMode = function (mode) {
            this.mode = mode;
            return this;
        };
        Binding.prototype.startBinding = function () {
            return this;
        };
        Binding.prototype.stopBinding = function () {
            return this;
        };
        Binding.prototype.dispose = function () {
            this.stopBinding();
        };
        return Binding;
    }());
    LayoutLzg.Binding = Binding;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var FunctionBinding = (function (_super) {
        __extends(FunctionBinding, _super);
        function FunctionBinding(propertyProvider) {
            _super.call(this, propertyProvider);
        }
        FunctionBinding.prototype.startBinding = function () {
            return this;
        };
        FunctionBinding.prototype.stopBinding = function () {
            return this;
        };
        FunctionBinding.prototype.updateFromSource = function () {
        };
        FunctionBinding.prototype.updateFromTarget = function () {
        };
        return FunctionBinding;
    }(LayoutLzg.Binding));
    LayoutLzg.FunctionBinding = FunctionBinding;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var PropertyBinding = (function (_super) {
        __extends(PropertyBinding, _super);
        function PropertyBinding(propertyProvider) {
            _super.call(this, propertyProvider);
        }
        PropertyBinding.prototype.startBinding = function () {
            this.stopBinding();
            var self = this;
            this.sourcePropGetter = this.propertyProvider.getPropertyGetter(this.source, this.sourcePropertyName);
            this.sourcePropSetter = this.propertyProvider.getPropertySetter(this.source, this.sourcePropertyName);
            this.targetPropGetter = this.propertyProvider.getPropertyGetter(this.target, this.targetPropertyName);
            this.targetPropSetter = this.propertyProvider.getPropertySetter(this.target, this.targetPropertyName);
            this.sourcePropListener = this.propertyProvider.getPropertyChangedListener(this.source, this.sourcePropertyName);
            this.targetPropListener = this.propertyProvider.getPropertyChangedListener(this.target, this.targetPropertyName);
            this.updateFromSource();
            this.sourcePropListener.startListen();
            this.sourcePropListener.setPropertyChangedCallback(function () {
                self.updateFromSource.apply(self, []);
            });
            if (this.mode == LayoutLzg.BindingMode.Twoway) {
                this.targetPropListener.startListen();
                this.targetPropListener.setPropertyChangedCallback(function () {
                    self.updateFromTarget.apply(self, []);
                });
            }
            return this;
        };
        PropertyBinding.prototype.stopBinding = function () {
            if (this.sourcePropListener)
                this.sourcePropListener.dispose();
            return this;
        };
        PropertyBinding.prototype.dispose = function () {
            this.stopBinding();
        };
        PropertyBinding.prototype.updateFromSource = function () {
            var v = this.sourcePropGetter.getValue();
            var old_v = this.targetPropGetter.getValue();
            if (v == old_v)
                return;
            if (this.converter) {
                v = this.converter.convert(v);
            }
            this.targetPropSetter.setValue(v);
        };
        PropertyBinding.prototype.updateFromTarget = function () {
            var v = this.targetPropGetter.getValue();
            var old_v = this.sourcePropGetter.getValue();
            if (v == old_v)
                return;
            if (this.converter) {
                v = this.converter.convertBack(v);
            }
            this.sourcePropSetter.setValue(v);
        };
        return PropertyBinding;
    }(LayoutLzg.Binding));
    LayoutLzg.PropertyBinding = PropertyBinding;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var DateFormatConverter = (function (_super) {
        __extends(DateFormatConverter, _super);
        function DateFormatConverter() {
            _super.call(this);
        }
        DateFormatConverter.prototype.setFormat = function (format) {
            this.format = format;
            return this;
        };
        DateFormatConverter.prototype.convert = function (value) {
            if (value instanceof Date) {
                var dt = value;
                return LayoutLzg.formatDate(dt, this.format);
            }
            return value;
        };
        DateFormatConverter.prototype.convertBack = function (value) {
            return value;
        };
        return DateFormatConverter;
    }(LayoutLzg.ValueConverter));
    LayoutLzg.DateFormatConverter = DateFormatConverter;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var FirstCharUppercaseConverter = (function (_super) {
        __extends(FirstCharUppercaseConverter, _super);
        function FirstCharUppercaseConverter() {
            _super.apply(this, arguments);
        }
        FirstCharUppercaseConverter.prototype.convert = function (value) {
            if (value == null)
                return "";
            var v = value.toString();
            return (v[0] + "").toUpperCase() + v.substr(1, v.length);
        };
        FirstCharUppercaseConverter.prototype.convertBack = function (value) {
            return value;
        };
        return FirstCharUppercaseConverter;
    }(LayoutLzg.ValueConverter));
    LayoutLzg.FirstCharUppercaseConverter = FirstCharUppercaseConverter;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var LowercaseConverter = (function (_super) {
        __extends(LowercaseConverter, _super);
        function LowercaseConverter() {
            _super.apply(this, arguments);
        }
        LowercaseConverter.prototype.convert = function (value) {
            if (value == null)
                return "";
            return value.toString().toLowerCase();
        };
        LowercaseConverter.prototype.convertBack = function (value) {
            return value;
        };
        return LowercaseConverter;
    }(LayoutLzg.ValueConverter));
    LayoutLzg.LowercaseConverter = LowercaseConverter;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var UppercaseConverter = (function (_super) {
        __extends(UppercaseConverter, _super);
        function UppercaseConverter() {
            _super.apply(this, arguments);
        }
        UppercaseConverter.prototype.convert = function (value) {
            if (value == null)
                return "";
            return value.toString().toUpperCase();
        };
        UppercaseConverter.prototype.convertBack = function (value) {
            return value;
        };
        return UppercaseConverter;
    }(LayoutLzg.ValueConverter));
    LayoutLzg.UppercaseConverter = UppercaseConverter;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var ToStringConverter = (function (_super) {
        __extends(ToStringConverter, _super);
        function ToStringConverter() {
            _super.apply(this, arguments);
        }
        ToStringConverter.prototype.convert = function (value) {
            if (value == null)
                return "";
            return value.toString();
        };
        ToStringConverter.prototype.convertBack = function (value) {
            return value;
        };
        return ToStringConverter;
    }(LayoutLzg.ValueConverter));
    LayoutLzg.ToStringConverter = ToStringConverter;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var PipelineConverter = (function (_super) {
        __extends(PipelineConverter, _super);
        function PipelineConverter() {
            _super.apply(this, arguments);
            this.converters = [];
        }
        PipelineConverter.prototype.addConverter = function (converter) {
            if (converter == null)
                return this;
            this.converters.push(converter);
            return this;
        };
        PipelineConverter.prototype.addConverters = function (converters) {
            if (converters == null)
                return this;
            for (var _i = 0, converters_1 = converters; _i < converters_1.length; _i++) {
                var converter = converters_1[_i];
                this.converters.push(converter);
            }
            return this;
        };
        PipelineConverter.prototype.convert = function (value) {
            var curvalue = value;
            for (var _i = 0, _a = this.converters; _i < _a.length; _i++) {
                var converter = _a[_i];
                curvalue = converter.convert(curvalue);
            }
            return curvalue;
        };
        PipelineConverter.prototype.convertBack = function (value) {
            var curvalue = value;
            for (var _i = 0, _a = this.converters.reverse(); _i < _a.length; _i++) {
                var converter = _a[_i];
                curvalue = converter.convert(value);
            }
            return curvalue;
        };
        return PipelineConverter;
    }(LayoutLzg.ValueConverter));
    LayoutLzg.PipelineConverter = PipelineConverter;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var ExpressionConverter = (function (_super) {
        __extends(ExpressionConverter, _super);
        function ExpressionConverter(expressionStr) {
            _super.call(this);
            this.expressionStr = expressionStr;
        }
        ExpressionConverter.prototype.convert = function (value) {
            if (this.expressionStr == null || this.expressionStr == "")
                return value;
            var func = new Function("value", "return " + this.expressionStr);
            try {
                return func(value);
            }
            catch (e) { }
            return value;
        };
        ExpressionConverter.prototype.convertBack = function (value) {
            return value;
        };
        return ExpressionConverter;
    }(LayoutLzg.ValueConverter));
    LayoutLzg.ExpressionConverter = ExpressionConverter;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var VisualTree = (function () {
        function VisualTree() {
        }
        VisualTree.findControlsByName = function (root, name) {
            var result = new LayoutLzg.List();
            var rootContainer = null;
            if (root.name == name) {
                result.add(root);
            }
            if (root instanceof LayoutLzg.ContainerWidget) {
                rootContainer = root;
            }
            else {
                return result;
            }
            for (var _i = 0, _a = rootContainer.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var r = VisualTree.findControlsByName(child, name);
                result.addAll(r);
            }
            return result;
        };
        VisualTree.findControlByName = function (root, name) {
            var rootContainer = null;
            if (root.name == name) {
                return root;
            }
            if (root instanceof LayoutLzg.ContainerWidget) {
                rootContainer = root;
            }
            else {
                return null;
            }
            for (var _i = 0, _a = rootContainer.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var r = VisualTree.findControlByName(child, name);
                if (r)
                    return r;
            }
            return null;
        };
        VisualTree.prototype.getRootElement = function () {
            if (this.rootContainer) {
                this.rootContainer.getRootElement();
            }
            else {
                return null;
            }
        };
        VisualTree.prototype.assembleDom = function () {
            if (this.rootContainer) {
                this.rootContainer.assembleDom();
            }
        };
        VisualTree.prototype.doLayout = function () {
            if (this.rootContainer) {
                this.rootContainer.doLayout();
            }
        };
        return VisualTree;
    }());
    LayoutLzg.VisualTree = VisualTree;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var TemplateControl = (function (_super) {
        __extends(TemplateControl, _super);
        function TemplateControl(name) {
            _super.call(this, name);
            this.rootBorder = new LayoutLzg.Border("rootBorder");
            this.stateGroups = new LayoutLzg.List();
            this.stateEventTriggers = new LayoutLzg.List();
        }
        Object.defineProperty(TemplateControl.prototype, "visualTree", {
            get: function () {
                return this._visualTree;
            },
            set: function (value) {
                if (value != null) {
                    value.parentControl = this;
                }
                this._visualTree = value;
            },
            enumerable: true,
            configurable: true
        });
        TemplateControl.prototype.addStateGroup = function (groupName) {
            var stageGroup = new LayoutLzg.StateGroup();
            stageGroup.rootControl = this.visualTree.rootContainer;
            stageGroup.groupName = groupName;
            this.stateGroups.add(stageGroup);
            return stageGroup;
        };
        TemplateControl.prototype.addStateStyle = function (groupName, statename, controlpropertyValues, eventName) {
            if (eventName === void 0) { eventName = null; }
            var groups = this.stateGroups.filter(function (t) { return t.groupName == groupName; });
            var group = null;
            if (groups.length == 0) {
                group = this.addStateGroup(groupName);
            }
            else {
                group = groups[0];
            }
            var states = group.states.filter(function (t) { return t.name == statename; });
            var state = null;
            if (states.length == 0) {
                state = new LayoutLzg.State();
                state.name = statename;
                state.style = new LayoutLzg.Style();
                group.addState(state);
            }
            else {
                state = states[0];
            }
            for (var controlName in controlpropertyValues) {
                var propertyValues = controlpropertyValues[controlName];
                for (var propertyName in propertyValues) {
                    var value = propertyValues[propertyName];
                    state.style.addStyleItem(controlName, propertyName, value);
                }
            }
            if (eventName)
                this.addStateTrigger(groupName, statename, eventName);
        };
        TemplateControl.prototype.addStateTrigger = function (groupName, stateName, eventName) {
            var trigger = new LayoutLzg.EventTrigger();
            trigger.control = this;
            trigger.eventName = eventName;
            var gotostateaction = new LayoutLzg.GotoStateAction();
            gotostateaction.templateControl = this;
            gotostateaction.stateName = stateName;
            gotostateaction.groupName = groupName;
            trigger.action = gotostateaction;
            trigger.init();
            this.stateEventTriggers.add(trigger);
        };
        TemplateControl.prototype.activeState = function (groupName, stateName) {
            for (var _i = 0, _a = this.stateGroups; _i < _a.length; _i++) {
                var stateGroup = _a[_i];
                // stateGroup.isActive = stateGroup.groupName == groupName;
                if (stateGroup.groupName == groupName) {
                    stateGroup.applyState(stateName);
                }
            }
            try {
                this.doLayout();
            }
            catch (e) { }
        };
        TemplateControl.prototype.getRootElement = function () {
            return this.rootBorder.getRootElement();
        };
        TemplateControl.prototype.assembleDom = function () {
            this.rootBorder.width = this.width;
            this.rootBorder.height = this.height;
            this.rootBorder.horizonAlignment = this.horizonAlignment;
            this.rootBorder.verticalAlignment = this.verticalAlignment;
            this.rootBorder.addChild(this._visualTree.rootContainer);
            this.rootBorder.margin = this.margin;
            this._visualTree.rootContainer.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this._visualTree.rootContainer.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this._visualTree.rootContainer.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            this._visualTree.rootContainer.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            this.rootBorder.parentSlot = this.parentSlot;
            this.rootBorder.parent = this.parent;
            this.rootBorder.assembleDom();
            var self = this;
            LayoutLzg.onEvent(this.getRootElement(), "click", function (e) {
                self.raiseEvent("click", [e]);
            });
            LayoutLzg.onEvent(this.getRootElement(), "mouseenter", function (e) {
                self.raiseEvent("mouseenter", [e]);
            });
            LayoutLzg.onEvent(this.getRootElement(), "mouseleave", function (e) {
                self.raiseEvent("mouseleave", [e]);
            });
            LayoutLzg.onEvent(this.getRootElement(), "mousedown", function (e) {
                self.raiseEvent("mousedown", [e]);
                self.pressed = true;
            });
            LayoutLzg.onEvent(this.getRootElement(), "mouseup", function (e) {
                self.raiseEvent("mouseup", [e]);
                self.pressed = false;
            });
            LayoutLzg.onEvent(this.getRootElement(), "mousemove", function (e) {
                self.raiseEvent("mousemove", [e]);
            });
        };
        TemplateControl.prototype.doLayout = function () {
            this.rootBorder.width = this.width;
            this.rootBorder.height = this.height;
            this.rootBorder.horizonAlignment = this.horizonAlignment;
            this.rootBorder.verticalAlignment = this.verticalAlignment;
            // this.rootBorder.addChild(this._visualTree.rootContainer);
            this.rootBorder.margin = this.margin;
            this._visualTree.rootContainer.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this._visualTree.rootContainer.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this._visualTree.rootContainer.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            this._visualTree.rootContainer.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            this.rootBorder.calculateWidthFromTop();
            this.rootBorder.calculateHeightFromTop();
            // this.rootBorder.parentSlot = this.parentSlot;
            // this.rootBorder.parent = this.parent;
            // this.rootBorder.initCalculableSlots();
            this.rootBorder.doLayout();
        };
        TemplateControl.prototype.calculateHeightFromTop = function () {
            this.rootBorder.calculateHeightFromTop();
            this.calculatedWidth = this.rootBorder.calculatedWidth;
        };
        TemplateControl.prototype.calculateWidthFromTop = function () {
            this.rootBorder.calculateWidthFromTop();
            this.calculatedHeight = this.rootBorder.calculatedHeight;
        };
        TemplateControl.prototype.calculateWidthFromBottom = function () {
            this.rootBorder.calculateWidthFromBottom();
        };
        TemplateControl.prototype.calculateHeightFromBottom = function () {
            this.rootBorder.calculateHeightFromBottom();
        };
        return TemplateControl;
    }(LayoutLzg.WidgetBase));
    LayoutLzg.TemplateControl = TemplateControl;
    var ContentPresenter = (function (_super) {
        __extends(ContentPresenter, _super);
        function ContentPresenter(name) {
            _super.call(this, name);
        }
        ContentPresenter.prototype.assembleDom = function () {
            if (this.content) {
                this.addChild(this.content);
                _super.prototype.assembleDom.call(this);
            }
        };
        return ContentPresenter;
    }(LayoutLzg.Border));
    LayoutLzg.ContentPresenter = ContentPresenter;
    var ItemsPresenter = (function () {
        function ItemsPresenter() {
        }
        return ItemsPresenter;
    }());
    LayoutLzg.ItemsPresenter = ItemsPresenter;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var Action = (function () {
        function Action() {
        }
        return Action;
    }());
    LayoutLzg.Action = Action;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var SetPropertyAction = (function (_super) {
        __extends(SetPropertyAction, _super);
        function SetPropertyAction() {
            _super.apply(this, arguments);
        }
        SetPropertyAction.prototype.execute = function () {
            var setter = new LayoutLzg.ControlPropertySetter(this.control, this.propertyName);
            setter.setValue(this.value);
        };
        return SetPropertyAction;
    }(LayoutLzg.Action));
    LayoutLzg.SetPropertyAction = SetPropertyAction;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var MultiAction = (function (_super) {
        __extends(MultiAction, _super);
        function MultiAction() {
            _super.call(this);
            this.actions = new LayoutLzg.List();
        }
        MultiAction.prototype.addAction = function (action) {
            this.actions.add(action);
        };
        MultiAction.prototype.removeAction = function (action) {
            this.actions.remove(action);
        };
        MultiAction.prototype.clearActions = function () {
            this.actions.clear();
        };
        MultiAction.prototype.execute = function () {
            for (var _i = 0, _a = this.actions; _i < _a.length; _i++) {
                var action = _a[_i];
                action.execute();
            }
        };
        return MultiAction;
    }(LayoutLzg.Action));
    LayoutLzg.MultiAction = MultiAction;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var GotoStateAction = (function (_super) {
        __extends(GotoStateAction, _super);
        function GotoStateAction() {
            _super.call(this);
        }
        GotoStateAction.prototype.execute = function () {
            if (this.templateControl)
                this.templateControl.activeState(this.groupName, this.stateName);
        };
        return GotoStateAction;
    }(LayoutLzg.Action));
    LayoutLzg.GotoStateAction = GotoStateAction;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var PropertyChangedTrigger = (function (_super) {
        __extends(PropertyChangedTrigger, _super);
        function PropertyChangedTrigger() {
            _super.apply(this, arguments);
        }
        PropertyChangedTrigger.prototype.init = function () {
            var self = this;
            this.callback = function () {
                self.onTriggered();
            };
            this.control.addPropertyChangedListener(this.propertyName, this.callback);
        };
        PropertyChangedTrigger.prototype.dispose = function () {
            this.control.removePropertyChangedListener(this.callback);
        };
        return PropertyChangedTrigger;
    }(LayoutLzg.ControlTrigger));
    LayoutLzg.PropertyChangedTrigger = PropertyChangedTrigger;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var StateChangedTrigger = (function (_super) {
        __extends(StateChangedTrigger, _super);
        function StateChangedTrigger() {
            _super.apply(this, arguments);
        }
        StateChangedTrigger.prototype.init = function () {
            var self = this;
            this.callback = function () {
                self.onTriggered();
            };
            this.control.addStateChangedListener(this.propertyName, this.callback);
        };
        StateChangedTrigger.prototype.dispose = function () {
            this.control.removeStateChangedListener(this.callback);
        };
        return StateChangedTrigger;
    }(LayoutLzg.ControlTrigger));
    LayoutLzg.StateChangedTrigger = StateChangedTrigger;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var EventTrigger = (function (_super) {
        __extends(EventTrigger, _super);
        function EventTrigger() {
            _super.call(this);
        }
        EventTrigger.prototype.init = function () {
            var self = this;
            this.callback = function () {
                self.onTriggered();
            };
            this.control.addEventListener(this.eventName, this.callback);
        };
        EventTrigger.prototype.dispose = function () {
            this.control.removeEventListener(this.callback);
        };
        return EventTrigger;
    }(LayoutLzg.ControlTrigger));
    LayoutLzg.EventTrigger = EventTrigger;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var StyleItem = (function () {
        function StyleItem() {
        }
        StyleItem.prototype.apply = function (rootControl) {
            var control = LayoutLzg.VisualTree.findControlByName(rootControl, this.name);
            if (control == null)
                return;
            var setter = new LayoutLzg.ControlPropertySetter(control, this.propertyName);
            setter.setValue(this.value);
        };
        return StyleItem;
    }());
    LayoutLzg.StyleItem = StyleItem;
    var Style = (function () {
        function Style() {
            this.styleitems = new LayoutLzg.List();
            this.triggers = new LayoutLzg.List();
        }
        Style.prototype.addStyleItem = function (controlName, propertyName, value) {
            var item = new StyleItem();
            item.name = controlName;
            item.propertyName = propertyName;
            item.value = value;
            this.styleitems.add(item);
        };
        Style.prototype.apply = function (rootControl) {
            if (!rootControl)
                return;
            for (var _i = 0, _a = this.styleitems; _i < _a.length; _i++) {
                var styleitem = _a[_i];
                styleitem.apply(rootControl);
            }
            for (var _b = 0, _c = this.triggers; _b < _c.length; _b++) {
                var trigger = _c[_b];
                trigger.init();
            }
        };
        return Style;
    }());
    LayoutLzg.Style = Style;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var State = (function () {
        function State() {
        }
        return State;
    }());
    LayoutLzg.State = State;
    var StateGroup = (function () {
        function StateGroup() {
            this.states = new LayoutLzg.List();
        }
        StateGroup.prototype.stateNames = function () {
            return this.states.map(function (t) { return t.name; });
        };
        StateGroup.prototype.addState = function (state) {
            this.states.add(state);
        };
        StateGroup.prototype.removeStateByName = function (stateName) {
            var statescandidate = this.states.filter(function (t) { return t.name == stateName; });
            for (var _i = 0, statescandidate_1 = statescandidate; _i < statescandidate_1.length; _i++) {
                var state = statescandidate_1[_i];
                this.states.remove(state);
            }
        };
        StateGroup.prototype.removeState = function (state) {
            this.states.remove(state);
        };
        StateGroup.prototype.removeAllStates = function () {
            this.states.clear();
        };
        StateGroup.prototype.findStateByName = function (stateName) {
            var states = this.states.filter(function (t) { return t.name == stateName; });
            if (states.length > 0)
                return states[0];
            return null;
        };
        StateGroup.prototype.applyState = function (stateName) {
            var state = this.findStateByName(stateName);
            if (state == null)
                return;
            if (state.style == null)
                return;
            if (this.rootControl == null)
                return;
            state.style.apply(this.rootControl);
        };
        return StateGroup;
    }());
    LayoutLzg.StateGroup = StateGroup;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var VisualTreeStyle = (function () {
        function VisualTreeStyle() {
        }
        return VisualTreeStyle;
    }());
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(name) {
            _super.call(this, name);
            this.radius = 5;
        }
        Button.prototype.initVisualTree = function () {
            this.visualTree = new LayoutLzg.VisualTree();
            var rootBorder = new LayoutLzg.Border("root");
            this.contentPresentor = new LayoutLzg.ContentPresenter("_content");
            this.contentPresentor.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this.contentPresentor.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this.contentPresentor.horizonAlignment = LayoutLzg.HorizonAlignment.Center;
            this.contentPresentor.verticalAlignment = LayoutLzg.VerticalAlignment.Center;
            var contentcontrol = null;
            if (typeof this._content === "string" || typeof this._content === "number") {
                var txt = new LayoutLzg.TextView("", this._content.toString());
                txt.margin = new LayoutLzg.Thickness(10, 10, 5, 5);
                txt.selectable = false;
                contentcontrol = txt;
                contentcontrol.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
                contentcontrol.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
                contentcontrol.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
                contentcontrol.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            }
            else {
                contentcontrol = this._content;
            }
            this.contentPresentor.content = contentcontrol;
            var vlinear = new LayoutLzg.Vlinearlayout("");
            vlinear.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            vlinear.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            vlinear.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            vlinear.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            vlinear.addCell(new LayoutLzg.Distance(LayoutLzg.DistanceType.weight, 1));
            vlinear.addCell(new LayoutLzg.Distance(LayoutLzg.DistanceType.weight, 1));
            var bgRect1 = new LayoutLzg.Rect("rectup");
            var bgRect2 = new LayoutLzg.Rect("rectdown");
            bgRect1.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            bgRect1.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            bgRect1.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            bgRect1.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            bgRect1.radius_top_left = this.radius;
            bgRect1.radius_top_right = this.radius;
            bgRect1.fill = new LayoutLzg.SolidColorBrush("#F1F1F1");
            bgRect1.stroke = new LayoutLzg.SolidColorBrush("#437DD4");
            bgRect1.strokeThickness = new LayoutLzg.Thickness(1, 1, 1, 0);
            bgRect2.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            bgRect2.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            bgRect2.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            bgRect2.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            bgRect2.radius_bottom_left = this.radius;
            bgRect2.radius_bottom_right = this.radius;
            bgRect2.fill = new LayoutLzg.SolidColorBrush("#E5E5E5");
            bgRect2.stroke = new LayoutLzg.SolidColorBrush("#437DD4");
            bgRect2.strokeThickness = new LayoutLzg.Thickness(1, 1, 0, 1);
            vlinear.addChild(bgRect1);
            vlinear.addChild(bgRect2);
            vlinear.setCell(bgRect1, 0);
            vlinear.setCell(bgRect2, 1);
            rootBorder.addChild(vlinear);
            rootBorder.addChild(this.contentPresentor);
            this.visualTree.rootContainer = rootBorder;
        };
        Button.prototype.initStates = function () {
            this.addStateStyle("hoverGroup", "mouseenter", {
                "rectup": {
                    "strokeThickness": new LayoutLzg.Thickness(2, 2, 2, 0)
                },
                "rectdown": {
                    "strokeThickness": new LayoutLzg.Thickness(2, 2, 0, 2)
                }
            }, "mouseenter");
            this.addStateStyle("hoverGroup", "mouseleave", {
                "rectup": {
                    "strokeThickness": new LayoutLzg.Thickness(1, 1, 1, 0)
                },
                "rectdown": {
                    "strokeThickness": new LayoutLzg.Thickness(1, 1, 0, 1)
                }
            }, "mouseleave");
            this.addStateStyle("pressGroup", "pressed", {
                "rectup": {
                    "fill": new LayoutLzg.SolidColorBrush("#F1F1F1")
                },
                "rectdown": {
                    "fill": new LayoutLzg.SolidColorBrush("#F1F1F1")
                }
            }, "mousedown");
            this.addStateStyle("pressGroup", "released", {
                "rectup": {
                    "fill": new LayoutLzg.SolidColorBrush("#F1F1F1")
                },
                "rectdown": {
                    "fill": new LayoutLzg.SolidColorBrush("#E5E5E5")
                }
            }, "mouseup");
        };
        Object.defineProperty(Button.prototype, "content", {
            get: function () {
                return this._content;
            },
            set: function (value) {
                if (this._content == value)
                    return;
                this.notifyPropertyChanged("content");
                this._content = value;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.assembleDom = function () {
            this.initVisualTree();
            this.initStates();
            _super.prototype.assembleDom.call(this);
        };
        return Button;
    }(LayoutLzg.TemplateControl));
    LayoutLzg.Button = Button;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar(name) {
            _super.call(this, name);
            this.radius = 5;
            this.minValue = 0;
            this.maxValue = 100;
            this.value = 30;
        }
        ProgressBar.prototype.initVisualTree = function () {
            this.visualTree = new LayoutLzg.VisualTree();
            var rootBorder = new LayoutLzg.Border("root");
            var rectProc = new LayoutLzg.Rect("rectProc");
            var rectBg = new LayoutLzg.Rect("rectBg");
            var rectUp = new LayoutLzg.Rect("rectUp");
            rectProc.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, 0);
            rectProc.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            rectProc.horizonAlignment = LayoutLzg.HorizonAlignment.Left;
            rectProc.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            rectProc.radius_top_left = this.radius;
            rectProc.radius_bottom_left = this.radius;
            rectProc.fill = this.barfill;
            rectProc.stroke = this.stroke;
            rectProc.strokeThickness = new LayoutLzg.Thickness(this.strokeThickness.left, 0, this.strokeThickness.top, this.strokeThickness.bottom);
            rectBg.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            rectBg.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            rectBg.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            rectBg.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            rectBg.radius = this.radius;
            rectBg.fill = this.fill;
            rectBg.stroke = this.stroke;
            rectBg.strokeThickness = this.strokeThickness;
            rectBg.shadow = this.shadow;
            var vlinear = new LayoutLzg.Vlinearlayout("");
            vlinear.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            vlinear.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            vlinear.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            vlinear.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            vlinear.addCell(new LayoutLzg.Distance(LayoutLzg.DistanceType.weight, 1));
            vlinear.addCell(new LayoutLzg.Distance(LayoutLzg.DistanceType.weight, 1));
            vlinear.addChild(rectUp);
            vlinear.setCell(rectUp, 0);
            rectUp.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, 0);
            rectUp.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            rectUp.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            rectUp.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            rectUp.radius_top_left = this.radius;
            rectUp.stroke = this.stroke;
            rectUp.opacity = 0.5;
            rectUp.fill = new LayoutLzg.SolidColorBrush("white");
            rectUp.strokeThickness = new LayoutLzg.Thickness(this.strokeThickness.left, 0, this.strokeThickness.top, 0);
            rootBorder.addChild(rectBg);
            rootBorder.addChild(rectProc);
            rootBorder.addChild(vlinear);
            this.rectProc = rectProc;
            this.rectUp = rectUp;
            this.visualTree.rootContainer = rootBorder;
        };
        ProgressBar.prototype.assembleDom = function () {
            this.initVisualTree();
            _super.prototype.assembleDom.call(this);
        };
        ProgressBar.prototype.doLayout = function () {
            var w = this.calculatedWidth;
            var rectend = w / (this.maxValue - this.minValue) * (this.value - this.minValue);
            this.rectProc.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, rectend);
            this.rectUp.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, rectend);
            _super.prototype.doLayout.call(this);
        };
        return ProgressBar;
    }(LayoutLzg.TemplateControl));
    LayoutLzg.ProgressBar = ProgressBar;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var SliderBar = (function (_super) {
        __extends(SliderBar, _super);
        function SliderBar(name) {
            _super.call(this, name);
            this.minValue = 0;
            this.maxValue = 100;
            this._value = 30;
            this.radius = 10;
            this.handleFill = new LayoutLzg.SolidColorBrush("#f5f5f5");
            this.handleStroke = new LayoutLzg.SolidColorBrush("#e5e5e5");
            this.fill = new LayoutLzg.SolidColorBrush("#e5e5e5");
            this.stroke = new LayoutLzg.SolidColorBrush("#e5e5e5");
            this.mousedownValue = 0;
            this.notifyProperties.push("value");
        }
        Object.defineProperty(SliderBar.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (this._value == value)
                    return;
                this.notifyPropertyChanged("value");
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        SliderBar.prototype.initVisualTree = function () {
            this.visualTree = new LayoutLzg.VisualTree();
            var rootBorder = new LayoutLzg.Border("root");
            var rectStick = new LayoutLzg.Rect("sliderStick");
            rectStick.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            rectStick.verticalAlignment = LayoutLzg.VerticalAlignment.Center;
            rectStick.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            rectStick.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, 2);
            rectStick.fill = this.fill;
            rectStick.stroke = this.stroke;
            rectStick.strokeThickness = new LayoutLzg.Thickness(1, 1, 1, 1);
            rectStick.shadow = new LayoutLzg.ShadowSettings(0, 0, 5, 0, "#cfcfcf");
            var rectHandle = new LayoutLzg.Rect("sliderHandle");
            rectHandle.horizonAlignment = LayoutLzg.HorizonAlignment.Left;
            rectHandle.verticalAlignment = LayoutLzg.VerticalAlignment.Center;
            rectHandle.radius = this.radius;
            rectHandle.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, this.radius * 2);
            rectHandle.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, this.radius * 2);
            rectHandle.fill = this.handleFill;
            rectHandle.stroke = this.handleStroke;
            rectHandle.strokeThickness = new LayoutLzg.Thickness(1, 1, 1, 1);
            rectHandle.shadow = new LayoutLzg.ShadowSettings(0, 0, 20, 0, "#cfcfcf");
            rootBorder.addChild(rectStick);
            rootBorder.addChild(rectHandle);
            var mousedownScreenX = 0;
            var mousedownScreenY = 0;
            var ismousedown = false;
            var dx = 0;
            var dy = 0;
            var self = this;
            LayoutLzg.onEvent(rectHandle.getRootElement(), "mousedown", function (e) {
                mousedownScreenX = e.screenX;
                mousedownScreenY = e.screenY;
                ismousedown = true;
                self.mousedownValue = self._value;
            });
            LayoutLzg.onEvent(document.body, "mousemove", function (e) {
                if (!ismousedown)
                    return;
                dx = e.screenX - mousedownScreenX;
                dy = e.screenY - mousedownScreenY;
                self.onHandleDrag(dx, dy);
            });
            LayoutLzg.onEvent(document.body, "mouseup", function (e) {
                mousedownScreenX = e.screenX;
                mousedownScreenY = e.screenY;
                ismousedown = false;
            });
            this.visualTree.rootContainer = rootBorder;
            this.rectHandle = rectHandle;
        };
        SliderBar.prototype.onHandleDrag = function (dx, dy) {
            var w = this.calculatedWidth;
            var v = this.mousedownValue + dx / w * (this.maxValue - this.minValue);
            if (v > this.maxValue)
                v = this.maxValue;
            if (v < this.minValue)
                v = this.minValue;
            this.value = v;
            this.doLayout();
        };
        SliderBar.prototype.assembleDom = function () {
            this.initVisualTree();
            _super.prototype.assembleDom.call(this);
        };
        SliderBar.prototype.doLayout = function () {
            var w = this.calculatedWidth;
            var rectend = w / (this.maxValue - this.minValue) * (this._value - this.minValue);
            this.rectHandle.margin.left = rectend;
            _super.prototype.doLayout.call(this);
        };
        return SliderBar;
    }(LayoutLzg.TemplateControl));
    LayoutLzg.SliderBar = SliderBar;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    function createPropertyBinding(propertyProvider, target, targetPropName, source, sourcePropName, mode) {
        if (mode === void 0) { mode = LayoutLzg.BindingMode.Oneway; }
        var p = new LayoutLzg.PropertyBinding(propertyProvider);
        p.source = source;
        p.sourcePropertyName = sourcePropName;
        p.target = target;
        p.targetPropertyName = targetPropName;
        p.mode = mode;
        return p;
    }
    LayoutLzg.createPropertyBinding = createPropertyBinding;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    function getDefaultUniversalPropertyProvider() {
        var getterProvider = new LayoutLzg.UniversalPropertyGetterProvider();
        var setterProvider = new LayoutLzg.UniversalPropertySetterProvider();
        var listenerProvider = new LayoutLzg.UniversalPropertyChangedListenerProvider();
        getterProvider.addProvider(new LayoutLzg.ControlPropertyGetterProvider());
        getterProvider.addProvider(new LayoutLzg.DomWidthPropertyGetterProvider());
        getterProvider.addProvider(new LayoutLzg.DomHeightPropertyGetterProvider());
        getterProvider.addProvider(new LayoutLzg.DomTextPropertyGetterProvider());
        getterProvider.addProvider(new LayoutLzg.DomValuePropertyGetterProvider());
        getterProvider.addProvider(new LayoutLzg.DictPropertyGetterProvider());
        setterProvider.addProvider(new LayoutLzg.ControlPropertySetterProvider());
        setterProvider.addProvider(new LayoutLzg.DomWidthPropertySetterProvider());
        setterProvider.addProvider(new LayoutLzg.DomHeightPropertySetterProvider());
        setterProvider.addProvider(new LayoutLzg.DomTextPropertySetterProvider());
        setterProvider.addProvider(new LayoutLzg.DomValuePropertySetterProvider());
        setterProvider.addProvider(new LayoutLzg.DictPropertySetterProvider());
        listenerProvider.addProvider(new LayoutLzg.ControlPropertyChangedListenerProvider());
        listenerProvider.addProvider(new LayoutLzg.DomSizePropertyChangedListenerProvider());
        listenerProvider.addProvider(new LayoutLzg.DomTextPropertyChangedListenerProvider());
        listenerProvider.addProvider(new LayoutLzg.DomValuePropertyChangedListenerProvider());
        listenerProvider.addProvider(new LayoutLzg.DictPropertyChangedListenerProvider());
        return new LayoutLzg.UniversalPropertyProvider(getterProvider, setterProvider, listenerProvider);
    }
    LayoutLzg.getDefaultUniversalPropertyProvider = getDefaultUniversalPropertyProvider;
})(LayoutLzg || (LayoutLzg = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2RhdGV1dGlscy50cyIsInV0aWxzL2V2ZW50dXRpbHMudHMiLCJ1dGlscy9odG1sdXRpbHMudHMiLCJldmVudGJ1cy9ldmVudGJ1cy50cyIsInRyaWdnZXIvdHJpZ2dlcmJhc2UudHMiLCJsYXlvdXRiYXNlLnRzIiwibGF5b3V0Y29yZS50cyIsImNvbGxlY3Rpb25zL2xpc3QudHMiLCJjb2xsZWN0aW9ucy9tYXAudHMiLCJicnVzaGVzL3NvbGlkY29sb3JicnVzaC50cyIsImJydXNoZXMvaW1hZ2Vjb2xvcmJydXNoLnRzIiwiYnJ1c2hlcy9ncmFkaWVudGNvbG9yYnJ1c2gudHMiLCJjb250cm9scy9jb250cm9sYmFzZS50cyIsImNvbnRyb2xzL3RleHR2aWV3LnRzIiwiY29udHJvbHMvcmVjdC50cyIsImNvbnRyb2xzL2ltYWdlLnRzIiwiY29udGFpbmVycy9jb250YWluZXJiYXNlLnRzIiwiY29udGFpbmVycy9ib3JkZXIudHMiLCJjb250YWluZXJzL3ZsaW5lYXJsYXlvdXQudHMiLCJjb250YWluZXJzL2hsaW5lYXJsYXlvdXQudHMiLCJvYnNlcnZlci9vYnNlcnZhYmxlb2JqZWN0aW5qZWN0b3IudHMiLCJvYnNlcnZlci9wcm9wZXJ0eWJhc2UudHMiLCJvYnNlcnZlci9kb21zaXplcHJvcGVydHkudHMiLCJvYnNlcnZlci9kb210ZXh0cHJvcGVydHkudHMiLCJvYnNlcnZlci9kb212YWx1ZXByb3BlcnR5LnRzIiwib2JzZXJ2ZXIvZGljdHByb3BlcnR5LnRzIiwib2JzZXJ2ZXIvY29udHJvbHByb3BlcnR5LnRzIiwiYmluZGluZ3MvYmluZGluZy50cyIsImJpbmRpbmdzL2Z1bmN0aW9uYmluZGluZy50cyIsImJpbmRpbmdzL3Byb3BlcnR5YmluZGluZy50cyIsImNvbnZlcnRlcnMvZGF0ZWZvcm1hdGNvbnZlcnRlci50cyIsImNvbnZlcnRlcnMvZmlyc3RjaGFydXBwZXJjYXNlY29udmVydGVyLnRzIiwiY29udmVydGVycy9sb3dlcmNhc2Vjb252ZXJ0ZXIudHMiLCJjb252ZXJ0ZXJzL3VwcGVyY2FzZWNvbnZlcnRlci50cyIsImNvbnZlcnRlcnMvdG9zdHJpbmdjb252ZXJ0ZXIudHMiLCJjb252ZXJ0ZXJzL3BpcGVsaW5lY29udmVydGVyLnRzIiwiY29udmVydGVycy9leHByZXNzaW9uY29udmVydGVyLnRzIiwidmlzdWFsdHJlZS92aXN1YWx0cmVlLnRzIiwidmlzdWFsdHJlZS90ZW1wbGF0ZWNvbnRyb2wudHMiLCJhY3Rpb24vYWN0aW9uYmFzZS50cyIsImFjdGlvbi9zZXRwcm9wZXJ0eWFjdGlvbi50cyIsImFjdGlvbi9tdWx0aWFjdGlvbi50cyIsImFjdGlvbi9nb3Rvc3RhdGVhY3Rpb24udHMiLCJ0cmlnZ2VyL3Byb3BlcnR5Y2hhbmdlZHRyaWdnZXIudHMiLCJ0cmlnZ2VyL3N0YXRlY2hhbmdlZHRyaWdnZXIudHMiLCJ0cmlnZ2VyL2V2ZW50dHJpZ2dlci50cyIsInN0eWxlL3N0eWxlYmFzZS50cyIsInN0eWxlL3N0YXRlbWFuYWdlci50cyIsInN0eWxlL3Zpc3VhbHRyZWVzdHlsZS50cyIsInRlbXBsYXRlY29udHJvbHMvYnV0dG9uLnRzIiwidGVtcGxhdGVjb250cm9scy9wcm9ncmVzc2Jhci50cyIsInRlbXBsYXRlY29udHJvbHMvc2xpZGVyYmFyLnRzIiwiZmFjYWRlcy9iaW5kaW5nLnRzIiwiYm9vdHN0cmFwL3Byb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxTQUFTLENBc0JsQjtBQXRCRCxXQUFVLFNBQVMsRUFBQyxDQUFDO0lBRWpCLG9CQUEyQixJQUFVLEVBQUUsTUFBNkI7UUFBN0Isc0JBQTZCLEdBQTdCLHFCQUE2QjtRQUNoRSxJQUFJLENBQUMsR0FBTztZQUNSLElBQUksRUFBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsQ0FBQztZQUN4QixJQUFJLEVBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNyQixJQUFJLEVBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN0QixJ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LElBQUksd0NBQThCLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxvQ0FBMEIsRUFBRSxDQUFDLENBQUM7UUFFN0QsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLHVDQUE2QixFQUFFLENBQUMsQ0FBQztRQUNoRSxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksd0NBQThCLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSx5Q0FBK0IsRUFBRSxDQUFDLENBQUM7UUFDbEUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLHVDQUE2QixFQUFFLENBQUMsQ0FBQztRQUNoRSxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksd0NBQThCLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxvQ0FBMEIsRUFBRSxDQUFDLENBQUM7UUFFN0QsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksZ0RBQXNDLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLGdEQUFzQyxFQUFFLENBQUMsQ0FBQztRQUMzRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxnREFBc0MsRUFBRSxDQUFDLENBQUM7UUFDM0UsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksaURBQXVDLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLDZDQUFtQyxFQUFFLENBQUMsQ0FBQztRQUV4RSxNQUFNLENBQUMsSUFBSSxtQ0FBeUIsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDM0YsQ0FBQztJQTNCZSw2Q0FBbUMsc0NBMkJsRCxDQUFBO0FBRUwsQ0FBQyxFQS9CUyxTQUFTLEtBQVQsU0FBUyxRQStCbEIiLCJmaWxlIjoiZGlzdC90bXBvdXR0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIFxuICAgIGV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGU6IERhdGUsIGZvcm1hdDogc3RyaW5nID0gXCJ5eXl5LU1NLWRkXCIpIHtcbiAgICAgICAgbGV0IG86YW55ID0ge1xuICAgICAgICAgICAgXCJNK1wiIDogZGF0ZS5nZXRNb250aCgpKzEsIC8vbW9udGhcbiAgICAgICAgICAgIFwiZCtcIiA6IGRhdGUuZ2V0RGF0ZSgpLCAgICAvL2RheVxuICAgICAgICAgICAgXCJoK1wiIDogZGF0ZS5nZXRIb3VycygpLCAgIC8vaG91clxuICAgICAgICAgICAgXCJtK1wiIDogZGF0ZS5nZXRNaW51dGVzKCksIC8vbWludXRlXG4gICAgICAgICAgICBcInMrXCIgOiBkYXRlLmdldFNlY29uZHMoKSwgLy9zZWNvbmRcbiAgICAgICAgICAgIFwicStcIiA6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSszKS8zKSwgIC8vcXVhcnRlclxuICAgICAgICAgICAgXCJTXCIgOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8vbWlsbGlzZWNvbmRcbiAgICAgICAgfTtcbiAgICAgICAgaWYoLyh5KykvLnRlc3QoZm9ybWF0KSkgZm9ybWF0PWZvcm1hdC5yZXBsYWNlKFJlZ0V4cC4kMSxcbiAgICAgICAgICAgIChkYXRlLmdldEZ1bGxZZWFyKCkrXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSk7XG4gICAgICAgIGZvcih2YXIgayBpbiBvKWlmKG5ldyBSZWdFeHAoXCIoXCIrIGsgK1wiKVwiKS50ZXN0KGZvcm1hdCkpXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShSZWdFeHAuJDEsXG4gICAgICAgICAgICAgICAgUmVnRXhwLiQxLmxlbmd0aD09MSA/IG9ba10gOlxuICAgICAgICAgICAgICAgICAgICAoXCIwMFwiKyBvW2tdKS5zdWJzdHIoKFwiXCIrIG9ba10pLmxlbmd0aCkpO1xuICAgICAgICByZXR1cm4gZm9ybWF0O1xuXG4gICAgfVxuICAgIFxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBmdW5jdGlvbiBldmVudFRyYW5zcGFyZW50RGl2KGRpdlNlbGVjdG9yOmFueSkge1xuICAgICAgICAkKGRpdlNlbGVjdG9yKS5jc3MoXCJmaWx0ZXJcIixcIkFscGhhKG9wYWNpdHk9MClcIik7XG4gICAgICAgICQoZGl2U2VsZWN0b3IpLmNzcyhcInBvaW50ZXItZXZlbnRzXCIsXCJub25lXCIpO1xuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBjc3MoZWxlbTogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgJChlbGVtKS5jc3MobmFtZSx2YWx1ZSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGF0dHIoZWxlbTogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuICQoZWxlbSkuYXR0cihuYW1lKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0YXR0cihlbGVtOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICAkKGVsZW0pLmF0dHIobmFtZSx2YWx1ZSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIGNoaWxkOiBhbnkpIHtcbiAgICAgICAgJChwYXJlbnQpLmFwcGVuZChjaGlsZCk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGVtcHR5Q2hpbGRyZW4oZWxlbTphbnkpe1xuICAgICAgICAkKGVsZW0pLmVtcHR5KCk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1UZXh0KGVsZW06IGFueSkge1xuICAgICAgICByZXR1cm4gJChlbGVtKS50ZXh0KCk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldEVsZW1UZXh0KGVsZW06IGFueSwgdGV4dDpzdHJpbmcpIHtcbiAgICAgICAgJChlbGVtKS50ZXh0KHRleHQpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtVmFsdWUoZWxlbTogYW55KSB7XG4gICAgICAgICQoZWxlbSkudmFsKCk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldEVsZW1WYWx1ZShlbGVtOiBhbnksIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgJChlbGVtKS52YWwodmFsdWUpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBvbkV2ZW50KGVsZW06YW55LCBldmVudE5hbWU6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvbikge1xuICAgICAgICAkKGVsZW0pLm9uKGV2ZW50TmFtZSxmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZihjYWxsYmFjaykgY2FsbGJhY2suYXBwbHkodGhpcyxhcmd1bWVudHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gb2ZmRXZlbnQoZWxlbTogYW55LCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IGFueSkge1xuICAgICAgICAkKGVsZW0pLm9mZihldmVudE5hbWUsY2FsbGJhY2spO1xuICAgIH1cblxuXG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGNsYXNzIEV2ZW50SXRlbSB7XG4gICAgICAgIG5hbWUgOiBzdHJpbmc7XG4gICAgICAgIHByaXZhdGUgYXJnczogYW55O1xuICAgICAgICBwcml2YXRlIGNhbGxiYWNrbGlzdDpMaXN0PChhcmdzOmFueSk9PnZvaWQ+ID0gbmV3IExpc3Q8KGFyZ3M6YW55KT0+dm9pZD4oKTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGFyZ3M6YW55KSB7XG4gICAgICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBFdmVudEJ1cyB7XG4gICAgICAgIGNhbGxiYWNrIDogTGlzdDxFdmVudEl0ZW0+ID0gbmV3IExpc3Q8RXZlbnRJdGVtPigpO1xuXG4gICAgICAgIHB1YihuYW1lOnN0cmluZyAsYXJnczphbnkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suYWRkKG5ldyBFdmVudEl0ZW0obmFtZSwgYXJncykpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViKG5hbWU6c3RyaW5nLCBjYWxsYmFjazooYXJnczphbnkpPT52b2lkKSB7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgVHJpZ2dlciBpbXBsZW1lbnRzIERpc3Bvc2FibGV7XHJcbiAgICAgICAgYWN0aW9uOkFjdGlvbjtcclxuICAgICAgICBhYnN0cmFjdCBpbml0KCk6dm9pZDtcclxuICAgICAgICBvblRyaWdnZXJlZCgpOnZvaWQge1xyXG4gICAgICAgICAgICBpZih0aGlzLmFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb24uZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFic3RyYWN0IGRpc3Bvc2UoKTp2b2lkO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29udHJvbFRyaWdnZXIgZXh0ZW5kcyBUcmlnZ2VyIHtcclxuICAgICAgICBjb250cm9sOldpZGdldDtcclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBlbnVtIEhvcml6b25BbGlnbm1lbnQge1xuICAgICAgICBTdHJlY2gsXG4gICAgICAgIExlZnQsXG4gICAgICAgIFJpZ2h0LFxuICAgICAgICBDZW50ZXJcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBWZXJ0aWNhbEFsaWdubWVudHtcbiAgICAgICAgU3RyZWNoLFxuICAgICAgICBUb3AsXG4gICAgICAgIEJvdHRvbSxcbiAgICAgICAgQ2VudGVyXG4gICAgfVxuXG4gICAgZXhwb3J0IGVudW0gRGlzdGFuY2VUeXBle1xuICAgICAgICBhdXRvLFxuICAgICAgICBmaXhlZCxcbiAgICAgICAgd2VpZ2h0XG4gICAgfVxuXG4gICAgZXhwb3J0IGVudW0gU3RhY2tQYW5lbE9yaWVudGF0aW9uIHtcbiAgICAgICAgSG9yaXpvbmFsLFxuICAgICAgICBWZXJ0aWNhbFxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBTaGFkb3dTZXR0aW5ncyB7XG4gICAgICAgIHR5cGU6c3RyaW5nO1xuICAgICAgICB4b2Zmc2V0Om51bWJlcjtcbiAgICAgICAgeW9mZnNldDpudW1iZXI7XG4gICAgICAgIGJsdXI6bnVtYmVyO1xuICAgICAgICBzcHJlYWQ6bnVtYmVyO1xuICAgICAgICBjb2xvcjpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IoeG9mZnNldDpudW1iZXIseW9mZnNldDpudW1iZXIsYmx1cjpudW1iZXIsc3ByZWFkOm51bWJlcixjb2xvcjpzdHJpbmcsdHlwZTpzdHJpbmc9XCJvdXRzZXRcIikge1xuICAgICAgICAgICAgdGhpcy54b2Zmc2V0ID0geG9mZnNldDtcbiAgICAgICAgICAgIHRoaXMueW9mZnNldCA9IHlvZmZzZXQ7XG4gICAgICAgICAgICB0aGlzLmJsdXIgPSBibHVyO1xuICAgICAgICAgICAgdGhpcy5zcHJlYWQgPSBzcHJlYWQ7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9Cb3hTaGF3ZG93U3RyaW5nKCk6c3RyaW5nIHtcbiAgICAgICAgICAgIGxldCBzID0gXCJcIjtcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZT09XCJpbnNldFwiKSBzKz1cImluc2V0IFwiO1xuICAgICAgICAgICAgcys9dGhpcy54b2Zmc2V0K1wicHggXCI7XG4gICAgICAgICAgICBzKz10aGlzLnlvZmZzZXQrXCJweCBcIjtcbiAgICAgICAgICAgIHMrPXRoaXMuYmx1citcInB4IFwiO1xuICAgICAgICAgICAgcys9dGhpcy5zcHJlYWQrXCJweCBcIjtcbiAgICAgICAgICAgIHMrPXRoaXMuY29sb3IrXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEJydXNoe1xuICAgICAgICBhcHBseVRvQmFja2dyb3VuZChlbGVtOkhUTUxFbGVtZW50KTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOlRoaWNrbmVzcyk6dm9pZDtcbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOm51bWJlcik6dm9pZDtcbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOkhUTUxFbGVtZW50LHRoaWNrbmVzczpudW1iZXIpOnZvaWQ7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgVGhpY2tuZXNze1xuICAgICAgICBsZWZ0Om51bWJlcjtcbiAgICAgICAgcmlnaHQ6bnVtYmVyO1xuICAgICAgICB0b3A6bnVtYmVyO1xuICAgICAgICBib3R0b206bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIGJvdHRvbTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgICAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgICAgICAgICAgdGhpcy50b3AgPSB0b3A7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaXN0YW5jZXtcbiAgICAgICAgdmFsdWU6bnVtYmVyO1xuICAgICAgICB0eXBlOkRpc3RhbmNlVHlwZTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBEaXN0YW5jZVR5cGUsIHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuIiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgTWV0YURhdGFBcGl7XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgU2xvdCB7XG4gICAgICAgIGNoaWxkcmVuOkxpc3Q8V2lkZ2V0PiA9IG5ldyBMaXN0PFdpZGdldD4oKTtcbiAgICAgICAgaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgOiBib29sZWFuO1xuICAgICAgICBpc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgOiBib29sZWFuO1xuICAgICAgICBjYWxjdWxhdGVkU2xvdFdpZHRoIDogbnVtYmVyID0gMDtcbiAgICAgICAgY2FsY3VsYXRlZFNsb3RIZWlnaHQgOiBudW1iZXIgPSAwO1xuICAgICAgICBjb250YWluZXIgOiBDb250YWluZXJXaWRnZXQ7XG5cbiAgICAgICAgYWRkQ2hpbGQoY2hpbGQgOiBXaWRnZXQpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5hZGQoY2hpbGQpO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdCA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDaGlsZChjaGlsZCA6IFdpZGdldCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnJlbW92ZShjaGlsZCk7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGVtcHR5KCk6dm9pZCB7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk6dm9pZCB7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5jYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCF0aGlzLmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuY2FsY3VsYXRlZFdpZHRoK3QubWFyZ2luLmxlZnQrdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgICAgIGxldCBtYXh3aWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgaWYod2lkdGhsaXN0Lmxlbmd0aD4wKSBtYXh3aWR0aCA9IHdpZHRobGlzdFswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRTbG90V2lkdGggPSBtYXh3aWR0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNoaWxkLmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5jYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighdGhpcy5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuY2FsY3VsYXRlZEhlaWdodCt0Lm1hcmdpbi50b3ArdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgbGV0IG1heGhlaWdodCA9IDA7XG4gICAgICAgICAgICAgICAgaWYoaGVpZ2h0bGlzdC5sZW5ndGg+MCkgbWF4aGVpZ2h0ID0gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRTbG90SGVpZ2h0ID0gbWF4aGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBsYXlvdXRDaGlsZHJlbigpOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmKGNoaWxkLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdCkge1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSxcImxlZnRcIixcIjBweFwiKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZC5nZXRSb290RWxlbWVudCgpLFwicmlnaHRcIixcIjBweFwiKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdyA9IHRoaXMuY2FsY3VsYXRlZFNsb3RXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHd3ID0gY2hpbGQuY2FsY3VsYXRlZFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeCA9ICh3LXd3KS8yO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSwnbGVmdCcseCsncHgnKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSxcImxlZnRcIixcIjBweFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkLmdldFJvb3RFbGVtZW50KCksXCJyaWdodFwiLFwiMHB4XCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGNoaWxkLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3ApIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkLmdldFJvb3RFbGVtZW50KCksXCJ0b3BcIixcIjBweFwiKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZC5nZXRSb290RWxlbWVudCgpLFwiYm90dG9tXCIsXCIwcHhcIik7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2hpbGQudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaCA9IHRoaXMuY2FsY3VsYXRlZFNsb3RIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBoaCA9IGNoaWxkLmNhbGN1bGF0ZWRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gKGgtaGgpLzI7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZC5nZXRSb290RWxlbWVudCgpLCd0b3AnLHgrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2hpbGQudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSxcInRvcFwiLFwiMHB4XCIpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSxcImJvdHRvbVwiLFwiMHB4XCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNoaWxkLmRvTGF5b3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBQcm9wZXJ0eUNoYW5nZWRDYWxsYmFja0l0ZW0ge1xuICAgICAgICBjYWxsYmFjazpGdW5jdGlvbjtcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0eU5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEV2ZW50Q2FsbGJhY2tJdGVtIHtcbiAgICAgICAgY2FsbGJhY2s6RnVuY3Rpb247XG4gICAgICAgIGV2ZW50TmFtZTpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBldmVudE5hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgVmlzdWFsRWxlbWVudCB7XG4gICAgICAgIC8vIE5hbWUgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICBuYW1lOnN0cmluZztcbiAgICAgICAgLy8gV2lkdGggb2YgdGhpcyBXaWRnZXQsIGl0IGNhbiBiZSBhIGZpeCB2YWx1ZSBvciBhdXRvLlxuICAgICAgICBwcml2YXRlIF93aWR0aDpEaXN0YW5jZTtcbiAgICAgICAgLy8gSGVpZ2h0IG9mIHRoaXMgV2lkZ2V0LCBpdCBjYW4gYmUgYSBmaXggdmFsdWUgb3IgYXV0by5cbiAgICAgICAgcHJpdmF0ZSBfaGVpZ2h0OkRpc3RhbmNlO1xuICAgICAgICAvLyBIb3Jpem9uYWwgYWxpZ25tZW50IG9mIHRoaXMgY29udHJvbCBpbiBpdCdzIHBhcmVudCBjb250YWluZXJcbiAgICAgICAgcHJpdmF0ZSBfaG9yaXpvbkFsaWdubWVudCA6IEhvcml6b25BbGlnbm1lbnQ7XG4gICAgICAgIC8vIFZlcnRpY2FsIGFsaWdubWVudCBvZiB0aGlzIGNvbnRyb2wgaW4gaXQncyBwYXJlbnQgY29udGFpbmVyXG4gICAgICAgIHByaXZhdGUgX3ZlcnRpY2FsQWxpZ25tZW50IDogVmVydGljYWxBbGlnbm1lbnQ7XG4gICAgICAgIC8vIE1hcmdpbiBvZiB0aGlzIGNvbnRyb2wgdG8gaXQncyBwYXJlbnQsIHRoZSB2YWx1ZSBpbiB0aGlja25lc3MgbXVzdCBiZSBhIGZpeCB2YWx1ZS5cbiAgICAgICAgcHJpdmF0ZSBfbWFyZ2luOlRoaWNrbmVzcztcbiAgICAgICAgcHJpdmF0ZSBfcHJlc3NlZDpib29sZWFuO1xuICAgICAgICBwcml2YXRlIF9tb3VzZWVudGVyOmJvb2xlYW47XG5cbiAgICAgICAgcHJvdGVjdGVkIG5vdGlmeVByb3BlcnRpZXM6QXJyYXk8c3RyaW5nPj1bXTtcblxuICAgICAgICBwcml2YXRlIHByb3BDaGFuZ2VkQ2FsbGJhY2tzOkxpc3Q8UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2tJdGVtPjtcbiAgICAgICAgcHJpdmF0ZSBldmVudENhbGxiYWNrczpMaXN0PEV2ZW50Q2FsbGJhY2tJdGVtPjtcblxuICAgICAgICBwYXJlbnRTbG90OlNsb3Q7XG4gICAgICAgIHBhcmVudDpDb250YWluZXJXaWRnZXQ7XG4gICAgICAgIGFjdHVhbENvbnRhaW5lcjpDb250YWluZXJXaWRnZXQ7XG4gICAgICAgIC8vIHJvb3QgZGl2IG9mIHRoaXMgY29udHJvbC5cbiAgICAgICAgcm9vdEVsZW06SFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgLy8gSW5pdCB2YWlyYWJsZXMuXG4gICAgICAgICAgICB0aGlzLl9ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHRoaXMuX21hcmdpbiA9IG5ldyBUaGlja25lc3MoMCwwLDAsMCk7XG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsNTApO1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCw1MCk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvcENoYW5nZWRDYWxsYmFja3MgPSBuZXcgTGlzdDxQcm9wZXJ0eUNoYW5nZWRDYWxsYmFja0l0ZW0+KCk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50Q2FsbGJhY2tzID0gbmV3IExpc3Q8RXZlbnRDYWxsYmFja0l0ZW0+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgd2lkdGgoKTogTGF5b3V0THpnLkRpc3RhbmNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB3aWR0aCh2YWx1ZTogTGF5b3V0THpnLkRpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGhlaWdodCgpOiBMYXlvdXRMemcuRGlzdGFuY2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBoZWlnaHQodmFsdWU6IExheW91dEx6Zy5EaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaG9yaXpvbkFsaWdubWVudCgpOiBMYXlvdXRMemcuSG9yaXpvbkFsaWdubWVudCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faG9yaXpvbkFsaWdubWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBob3Jpem9uQWxpZ25tZW50KHZhbHVlOiBMYXlvdXRMemcuSG9yaXpvbkFsaWdubWVudCkge1xuICAgICAgICAgICAgdGhpcy5faG9yaXpvbkFsaWdubWVudCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHZlcnRpY2FsQWxpZ25tZW50KCk6IExheW91dEx6Zy5WZXJ0aWNhbEFsaWdubWVudCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmVydGljYWxBbGlnbm1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgdmVydGljYWxBbGlnbm1lbnQodmFsdWU6IExheW91dEx6Zy5WZXJ0aWNhbEFsaWdubWVudCkge1xuICAgICAgICAgICAgdGhpcy5fdmVydGljYWxBbGlnbm1lbnQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBtYXJnaW4oKTogTGF5b3V0THpnLlRoaWNrbmVzcyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFyZ2luO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IG1hcmdpbih2YWx1ZTogTGF5b3V0THpnLlRoaWNrbmVzcykge1xuICAgICAgICAgICAgdGhpcy5fbWFyZ2luID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgcHJlc3NlZCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcmVzc2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHByZXNzZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXNzZWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBtb3VzZWVudGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vdXNlZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgbW91c2VlbnRlcih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5fbW91c2VlbnRlciA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yY2VSZWZyZXNoKCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgICAgICB0aGlzLmRvTGF5b3V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGlzIGNvbnRyb2wuXG4gICAgICAgIGFic3RyYWN0IGdldFJvb3RFbGVtZW50KCk6SFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgLy8gQXNzZW1ibGUgaHRtbCBlbGVtZW50cyBvZiB0aGlzIGNvbnRyb2wuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGp1c3Qgc3R5bGVzIGh0bWwgZWxlbWVudHMgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICBkb0xheW91dCgpOnZvaWR7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRTdGF0ZVByb3BlcnRpZXMoKTpBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldE5vdGlmeVByb3BlcnRpZXMoKTpBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vdGlmeVByb3BlcnRpZXM7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihwcm9wZXJ0TmFtZTpzdHJpbmcsIGNhbGxiYWNrOkZ1bmN0aW9uKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvcENoYW5nZWRDYWxsYmFja3MuYWRkKFxuICAgICAgICAgICAgICAgIG5ldyBQcm9wZXJ0eUNoYW5nZWRDYWxsYmFja0l0ZW0ocHJvcGVydE5hbWUsIGNhbGxiYWNrKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKGNhbGxiYWNrOkZ1bmN0aW9uKTp2b2lkIHtcbiAgICAgICAgICAgIGxldCBlbGVtOlByb3BlcnR5Q2hhbmdlZENhbGxiYWNrSXRlbSA9IG51bGw7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wY2FsbGJhY2tpdGVtIG9mIHRoaXMucHJvcENoYW5nZWRDYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBpZihwcm9wY2FsbGJhY2tpdGVtLmNhbGxiYWNrPT1jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBlbGVtID0gcHJvcGNhbGxiYWNraXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihlbGVtIT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcy5yZW1vdmUoZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhZGRTdGF0ZUNoYW5nZWRMaXN0ZW5lcihwcm9wZXJ0eU5hbWU6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvbik6dm9pZCB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZVN0YXRlQ2hhbmdlZExpc3RlbmVyKGNhbGxiYWNrOkZ1bmN0aW9uKTp2b2lkIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIG5vdGlmeVByb3BlcnR5Q2hhbmdlZChwcm9wZXJ0eU5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wY2FsbGJhY2tpdGVtIG9mIHRoaXMucHJvcENoYW5nZWRDYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBpZihwcm9wY2FsbGJhY2tpdGVtLnByb3BlcnR5TmFtZT09cHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHByb3BjYWxsYmFja2l0ZW0uY2FsbGJhY2spIHByb3BjYWxsYmFja2l0ZW0uY2FsbGJhY2socHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZTpzdHJpbmcsIGNhbGxiYWNrOkZ1bmN0aW9uKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRDYWxsYmFja3MuYWRkKFxuICAgICAgICAgICAgICAgIG5ldyBFdmVudENhbGxiYWNrSXRlbShldmVudE5hbWUsIGNhbGxiYWNrKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgbGV0IGV2ZW50cyA9IHRoaXMuZXZlbnRDYWxsYmFja3MuZmlsdGVyKHQ9PnQuY2FsbGJhY2s9PWNhbGxiYWNrKTtcbiAgICAgICAgICAgIGlmKGV2ZW50cy5sZW5ndGg+MCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRDYWxsYmFja3MucmVtb3ZlKGV2ZW50c1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgcmFpc2VFdmVudChldmVudE5hbWU6c3RyaW5nLGFyZ3M6QXJyYXk8YW55Pj1bXSl7XG4gICAgICAgICAgICBmb3IgKGxldCBldmVudGNhbGxiYWNraXRlbSBvZiB0aGlzLmV2ZW50Q2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgaWYoZXZlbnRjYWxsYmFja2l0ZW0uZXZlbnROYW1lPT1ldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnRjYWxsYmFja2l0ZW0uY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcmdhcnIgPSBbZXZlbnROYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGFyZyBvZiBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnYXJyLnB1c2goYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50Y2FsbGJhY2tpdGVtLmNhbGxiYWNrLmFwcGx5KHRoaXMsYXJnYXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdpZGdldCBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBvZiBhbGwgdGhlIHZpc3VhbCBjb21wb25lbnRzLlxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXaWRnZXQgZXh0ZW5kcyBWaXN1YWxFbGVtZW50IGltcGxlbWVudHMgRGlzcG9zYWJsZXtcblxuICAgICAgICAvLyBCYWNrZ3JvdW5kIG9mIHRoaXMgY29udHJvbCwgaXQgY2FuIGJlIGEgc29saWQgY29sb3IsIG9yIGEgZ3JhZGllbnQgY29sb3IgLCBvciBhIHBpY3R1cmUuXG4gICAgICAgIHByb3RlY3RlZCBfZmlsbDpCcnVzaDtcbiAgICAgICAgLy8gQm9yZGVyIG9mIHRoaXMgY29udHJvbCwgaXQgY2FuIGJlIGEgc29saWQgY29sb3IsIG9yIGEgZ3JhZGllbnQgY29sb3IgLCBvciBhIHBpY3R1cmUuXG4gICAgICAgIHByb3RlY3RlZCBfc3Ryb2tlOkJydXNoO1xuICAgICAgICAvLyBUaGlja25lc3Mgb2YgdGhpcyBjb250cm9sJ3MgYm9yZGVyLCB0aGUgdmFsdWUgaW4gdGhpY2tuZXNzIG11c3QgYmUgYSBmaXggdmFsdWUuXG4gICAgICAgIHByb3RlY3RlZCBfc3Ryb2tlVGhpY2tuZXNzOlRoaWNrbmVzcztcblxuICAgICAgICBwcm90ZWN0ZWQgX3NoYWRvdzpTaGFkb3dTZXR0aW5ncztcblxuICAgICAgICBjYWxjdWxhdGVkV2lkdGg6IG51bWJlcjtcbiAgICAgICAgY2FsY3VsYXRlZEhlaWdodDogbnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKXtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlVGhpY2tuZXNzID0gbmV3IFRoaWNrbmVzcygwLDAsMCwwKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgZmlsbCgpOiBMYXlvdXRMemcuQnJ1c2gge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGw7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgZmlsbCh2YWx1ZTogTGF5b3V0THpnLkJydXNoKSB7XG4gICAgICAgICAgICBpZih0aGlzLl9maWxsICE9IHZhbHVlKSB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChcImZpbGxcIik7XG4gICAgICAgICAgICB0aGlzLl9maWxsID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc3Ryb2tlKCk6IExheW91dEx6Zy5CcnVzaCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Ryb2tlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHN0cm9rZSh2YWx1ZTogTGF5b3V0THpnLkJydXNoKSB7XG4gICAgICAgICAgICBpZih0aGlzLl9zdHJva2UgIT0gdmFsdWUpIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2VkKFwic3Ryb2tlXCIpO1xuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc3Ryb2tlVGhpY2tuZXNzKCk6IExheW91dEx6Zy5UaGlja25lc3Mge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cm9rZVRoaWNrbmVzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBzdHJva2VUaGlja25lc3ModmFsdWU6IExheW91dEx6Zy5UaGlja25lc3MpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3N0cm9rZVRoaWNrbmVzcyAhPSB2YWx1ZSkgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQoXCJzdHJva2VUaGlja25lc3NcIik7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2VUaGlja25lc3MgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBzaGFkb3coKTogTGF5b3V0THpnLlNoYWRvd1NldHRpbmdzIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaGFkb3c7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgc2hhZG93KHZhbHVlOlNoYWRvd1NldHRpbmdzKSB7XG4gICAgICAgICAgICB0aGlzLl9zaGFkb3c9dmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBjYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTp2b2lkO1xuXG4gICAgICAgIGFic3RyYWN0IGNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTp2b2lkO1xuXG4gICAgICAgIGFic3RyYWN0IGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOnZvaWQ7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpOnZvaWQ7XG5cbiAgICAgICAgYWJzdHJhY3QgZGlzcG9zZSgpOiB2b2lkO1xuXG4gICAgfVxuXG4gICAgLy8gVGhlIHB1cnBvc2Ugb2YgdGhlIGNvbnRhaW5lciBpcyB0byBwdXQgc3ViIGNvbnRyb2xzIHRvZ2V0aGVyLFxuICAgIC8vIGFuZCB0aGUgc3lzdGVtIHByb3ZpZGVzIG11bHRpcGxlIGxheW91dCBjb250YWluZXJzIGR1ZSB0byBhY3R1YWwgcmVxdWlyZW1lbnRzLlxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250YWluZXJXaWRnZXQgZXh0ZW5kcyBXaWRnZXR7XG4gICAgICAgIGNoaWxkcmVuOkxpc3Q8V2lkZ2V0PjtcbiAgICAgICAgcHJvdGVjdGVkIHNsb3RzIDogTGlzdDxTbG90PjtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBuZXcgTGlzdDxXaWRnZXQ+KCk7XG4gICAgICAgICAgICB0aGlzLnNsb3RzID0gbmV3IExpc3Q8U2xvdD4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENoaWxkKGNvbnRyb2w6V2lkZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmFkZChjb250cm9sKTtcbiAgICAgICAgICAgIGNvbnRyb2wucGFyZW50ID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNoaWxkKGNvbnRyb2w6V2lkZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnJlbW92ZShjb250cm9sKTtcbiAgICAgICAgICAgIGNvbnRyb2wucGFyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyQ2hpbGQoKTp2b2lke1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudFNsb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5jbGVhcigpO1xuICAgICAgICB9XG5cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgIHNsb3QubGF5b3V0Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuIiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBmdW5jdGlvbiB0ZXN0TGlzdCgpOnZvaWR7XG5cbiAgICAgICAgbGV0IGxpdGVyYWwxID0gbmV3IExheW91dEx6Zy5UZXh0VmlldygnYScsJzExMTExJyk7XG4gICAgICAgIGxldCBsaXRlcmFsMiA9IG5ldyBMYXlvdXRMemcuVGV4dFZpZXcoJ2EnLCcyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMicpO1xuICAgICAgICBsZXQgbGl0ZXJhbDMgPSBuZXcgTGF5b3V0THpnLlRleHRWaWV3KCdhJywnMzMzMzMzMzMzMycpO1xuXG5cbiAgICAgICAgbGV0IGxzdCA9IG5ldyBMaXN0PFRleHRWaWV3PigpO1xuICAgICAgICBsc3QuYWRkKGxpdGVyYWwxKTtcbiAgICAgICAgbHN0LmFkZChsaXRlcmFsMik7XG4gICAgICAgIGxzdC5hZGQobGl0ZXJhbDMpO1xuICAgICAgICBsc3QuY2xlYXIoKTtcbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBMaXN0PFQ+IGV4dGVuZHMgQXJyYXk8VD57XG5cbiAgICAgICAgYWRkKGl0ZW06VCkgOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLnB1c2goaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRBbGwoaXRlbXM6QXJyYXk8VD4pIDogdm9pZCB7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPGl0ZW1zLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChpdGVtc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmUoaXRlbTpUKTp2b2lkIHtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cml0ZW0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGN1cml0ZW09PWl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVBbGwoaXRlbXM6QXJyYXk8VD4pIDp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPGl0ZW1zLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXIoKSA6dm9pZCB7XG4gICAgICAgICAgICBzdXBlci5zcGxpY2UoMCx0aGlzLmxlbmd0aCk7XG4gICAgICAgIH1cblxuXG5cblxuXG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBmdW5jdGlvbiB0ZXN0bWFwKCk6dm9pZHtcbiAgICAgICAgbGV0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLG51bWJlcj4oKTtcbiAgICAgICAgbWFwLnB1dCgnYScsMzMpO1xuICAgICAgICBtYXAucHV0KCdiJyw0Myk7XG4gICAgICAgIGxldCBiID0gbWFwLmdldCgnYicpO1xuICAgICAgICBsZXQgYSA9IG1hcC5nZXQoJ2EnKTtcbiAgICAgICAgbWFwLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgY2xhc3MgTWFwSXRlbTxUS2V5LFRWYWx1ZT4ge1xuICAgICAgICBrZXkgOiBUS2V5O1xuICAgICAgICB2YWx1ZSA6IFRWYWx1ZTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihrZXk6IFRLZXksIHZhbHVlOiBUVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIE1hcDxUS2V5LFRWYWx1ZT4gZXh0ZW5kcyBBcnJheTxNYXBJdGVtPFRLZXksVFZhbHVlPj57XG5cbiAgICAgICAgcHV0KGtleTpUS2V5LCB2YWx1ZTpUVmFsdWUpIDogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnB1c2gobmV3IE1hcEl0ZW0oa2V5LHZhbHVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQoa2V5OlRLZXkpIDogVFZhbHVlIHwgYW55IHtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpc1tpXTtcbiAgICAgICAgICAgICAgICBpZihpdGVtLmtleT09a2V5KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhcigpIDp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlKDAsdGhpcy5sZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbnNLZXkoa2V5OlRLZXkpOmJvb2xlYW4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0ua2V5PT1rZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgY2xhc3MgU29saWRDb2xvckJydXNoIGltcGxlbWVudHMgQnJ1c2h7XG4gICAgICAgIGNvbG9yOnN0cmluZztcbiAgICAgICAgY29uc3RydWN0b3IoY29sb3I6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9CYWNrZ3JvdW5kKGVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJhY2tncm91bmQtY29sb3JcIiwgdGhpcy5jb2xvcik7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IExheW91dEx6Zy5UaGlja25lc3MpOiB2b2lkIHtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLWNvbG9yXCIsIHRoaXMuY29sb3IpO1xuXG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1sZWZ0LXdpZHRoXCIsIHRoaWNrbmVzcy5sZWZ0K1wicHhcIik7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1yaWdodC13aWR0aFwiLCB0aGlja25lc3MucmlnaHQrXCJweFwiKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLXRvcC13aWR0aFwiLCB0aGlja25lc3MudG9wK1wicHhcIik7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1ib3R0b20td2lkdGhcIiwgdGhpY2tuZXNzLmJvdHRvbStcInB4XCIpO1xuXG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1sZWZ0LXN0eWxlXCIsIFwic29saWRcIik7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1yaWdodC1zdHlsZVwiLCBcInNvbGlkXCIpO1xuICAgICAgICAgICAgY3NzKGVsZW0sXCJib3JkZXItdG9wLXN0eWxlXCIsIFwic29saWRcIik7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1ib3R0b20tc3R5bGVcIiwgXCJzb2xpZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJMZWZ0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgY3NzKGVsZW0sXCJib3JkZXItY29sb3JcIiwgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1sZWZ0LXdpZHRoXCIsIHRoaWNrbmVzcytcInB4XCIpO1xuICAgICAgICAgICAgY3NzKGVsZW0sXCJib3JkZXItbGVmdC1zdHlsZVwiLCBcInNvbGlkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclJpZ2h0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgY3NzKGVsZW0sXCJib3JkZXItY29sb3JcIiwgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1yaWdodC13aWR0aFwiLCB0aGlja25lc3MrXCJweFwiKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLXJpZ2h0LXN0eWxlXCIsIFwic29saWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgY3NzKGVsZW0sXCJib3JkZXItY29sb3JcIiwgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci10b3Atd2lkdGhcIiwgdGhpY2tuZXNzK1wicHhcIik7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci10b3Atc3R5bGVcIiwgXCJzb2xpZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJCb3R0b20oZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1jb2xvclwiLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLWJvdHRvbS13aWR0aFwiLCB0aGlja25lc3MrXCJweFwiKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLWJvdHRvbS1zdHlsZVwiLCBcInNvbGlkXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBJbWFnZUNvbG9yQnJ1c2ggaW1wbGVtZW50cyBCcnVzaHtcbiAgICAgICAgY29sb3I6c3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb2xvcjpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JhY2tncm91bmQoZWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlcihlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBMYXlvdXRMemcuVGhpY2tuZXNzKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyTGVmdChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJSaWdodChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJUb3AoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyQm90dG9tKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBHcmFkaWVudENvbG9yQnJ1c2ggaW1wbGVtZW50cyBCcnVzaHtcbiAgICAgICAgY29sb3I6c3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb2xvcjpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JhY2tncm91bmQoZWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXIoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogTGF5b3V0THpnLlRoaWNrbmVzcyk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbnRyb2xCYXNlIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYodGhpcy5yb290RWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsZW0gPSBjcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLnJvb3RFbGVtLFwiYm94LXNpemluZ1wiLFwiYm9yZGVyLWJveFwiKTtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy5yb290RWxlbSxcInBvaW50ZXItZXZlbnRzXCIsXCJhbGxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGNsYXNzIFRleHRWaWV3IGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuXG4gICAgICAgIHByaXZhdGUgX3RleHQ6c3RyaW5nO1xuICAgICAgICBwcml2YXRlIF9zZWxlY3RhYmxlOmJvb2xlYW47XG4gICAgICAgIHByaXZhdGUgX3dvcmRXcmFwOmJvb2xlYW47XG4gICAgICAgIHByaXZhdGUgc3BhbkVsZW06SFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLHRleHQ6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnRpZXMucHVzaChcInRleHRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdGV4dCgpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RhYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHNlbGVjdGFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGFibGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB3b3JkV3JhcCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93b3JkV3JhcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB3b3JkV3JhcCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5fd29yZFdyYXAgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIHN1cGVyLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgICAgICBzZXRhdHRyKHRoaXMucm9vdEVsZW0sJ2xheW91dC10eXBlJywnVGV4dFZpZXcnKTtcbiAgICAgICAgICAgIHNldGF0dHIodGhpcy5yb290RWxlbSwnbGF5b3V0LW5hbWUnLHRoaXMubmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zcGFuRWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJTUEFOXCIpO1xuICAgICAgICAgICAgZW1wdHlDaGlsZHJlbih0aGlzLmdldFJvb3RFbGVtZW50KCkpO1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ3dpZHRoJyx0aGlzLndpZHRoLnZhbHVlKydweCcpO1xuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCdoZWlnaHQnLHRoaXMuaGVpZ2h0LnZhbHVlKydweCcpO1xuICAgICAgICAgICAgYXBwZW5kQ2hpbGQodGhpcy5nZXRSb290RWxlbWVudCgpLHRoaXMuc3BhbkVsZW0pO1xuICAgICAgICAgICAgc2V0RWxlbVRleHQodGhpcy5zcGFuRWxlbSx0aGlzLl90ZXh0KTtcbiAgICAgICAgICAgIGlmKHRoaXMuX3dvcmRXcmFwKVxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLnNwYW5FbGVtLCd3b3JkLWJyZWFrJywnYnJlYWstYWxsJyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuc3BhbkVsZW0sJ3dvcmQtYnJlYWsnLCdub3JtYWwnKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCd3aWR0aCcsdGhpcy5jYWxjdWxhdGVkV2lkdGgrJ3B4Jyk7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCdoZWlnaHQnLHRoaXMuY2FsY3VsYXRlZEhlaWdodCsncHgnKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIik7XG4gICAgICAgICAgICBpZighdGhpcy5fc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLnNwYW5FbGVtLFwidXNlci1zZWxlY3RcIixcIm5vbmVcIik7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuc3BhbkVsZW0sXCJ1c2VyLXNlbGVjdFwiLFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUmJnRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy5zcGFuRWxlbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlJiZ0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5zcGFuRWxlbS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy5zcGFuRWxlbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLnNwYW5FbGVtLm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBSZWN0IGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuXG4gICAgICAgIHByaXZhdGUgX3JhZGl1c19ib3R0b21fbGVmdDpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3JhZGl1c19ib3R0b21fcmlnaHQ6bnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9yYWRpdXNfdG9wX2xlZnQ6bnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9yYWRpdXNfdG9wX3JpZ2h0Om51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfb3BhY2l0eTpudW1iZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c19ib3R0b21fbGVmdCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfYm90dG9tX3JpZ2h0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c190b3BfbGVmdCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfdG9wX3JpZ2h0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX29wYWNpdHkgPSAxO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXQgcmFkaXVzX2JvdHRvbV9sZWZ0KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmFkaXVzX2JvdHRvbV9sZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHJhZGl1c19ib3R0b21fbGVmdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfYm90dG9tX2xlZnQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCByYWRpdXNfYm90dG9tX3JpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmFkaXVzX2JvdHRvbV9yaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCByYWRpdXNfYm90dG9tX3JpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c19ib3R0b21fcmlnaHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCByYWRpdXNfdG9wX2xlZnQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXNfdG9wX2xlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcmFkaXVzX3RvcF9sZWZ0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c190b3BfbGVmdCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHJhZGl1c190b3BfcmlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXNfdG9wX3JpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHJhZGl1c190b3BfcmlnaHQodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX3RvcF9yaWdodCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHJhZGl1cyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfYm90dG9tX2xlZnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c19ib3R0b21fcmlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c190b3BfbGVmdCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX3RvcF9yaWdodCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG9wYWNpdHkoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IG9wYWNpdHkodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgbGV0IGVsZW0gPSBzdXBlci5nZXRSb290RWxlbWVudCgpO1xuICAgICAgICAgICAgc2V0YXR0cihlbGVtLCAnbGF5b3V0LXR5cGUnLCdSZWN0Jyk7XG4gICAgICAgICAgICBzZXRhdHRyKGVsZW0sICdsYXlvdXQtbmFtZScsdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCd3aWR0aCcsdGhpcy5jYWxjdWxhdGVkV2lkdGgrJ3B4Jyk7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCdoZWlnaHQnLHRoaXMuY2FsY3VsYXRlZEhlaWdodCsncHgnKTtcbiAgICAgICAgICAgIC8vIHN0cm9rZSBhbmQgZmlsbFxuICAgICAgICAgICAgaWYodGhpcy5maWxsKSB0aGlzLmZpbGwuYXBwbHlUb0JhY2tncm91bmQodGhpcy5yb290RWxlbSk7XG4gICAgICAgICAgICBpZih0aGlzLnN0cm9rZSkgdGhpcy5zdHJva2UuYXBwbHlUb0JvcmRlcih0aGlzLnJvb3RFbGVtLHRoaXMuc3Ryb2tlVGhpY2tuZXNzKTtcbiAgICAgICAgICAgIC8vIHJhZGl1c1xuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSxcImJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXNcIix0aGlzLnJhZGl1c19ib3R0b21fbGVmdCtcInB4XCIpO1xuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSxcImJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzXCIsdGhpcy5yYWRpdXNfYm90dG9tX3JpZ2h0K1wicHhcIik7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLFwiYm9yZGVyLXRvcC1sZWZ0LXJhZGl1c1wiLHRoaXMucmFkaXVzX3RvcF9sZWZ0K1wicHhcIik7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLFwiYm9yZGVyLXRvcC1yaWdodC1yYWRpdXNcIix0aGlzLnJhZGl1c190b3BfcmlnaHQrXCJweFwiKTtcbiAgICAgICAgICAgIC8vIG9wYWNpdHlcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksXCJvcGFjaXR5XCIsdGhpcy5vcGFjaXR5KTtcbiAgICAgICAgICAgIC8vIHNoYWRvd1xuICAgICAgICAgICAgaWYodGhpcy5zaGFkb3cpIHtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLFwiYm94LXNoYWRvd1wiLHRoaXMuc2hhZG93LnRvQm94U2hhd2Rvd1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUmJnRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QmJnRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUmJnRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdXBlci5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcbiAgICBleHBvcnQgY2xhc3MgSW1hZ2VWaWV3IGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuXG4gICAgICAgIGltZ0VsZW06SFRNTEVsZW1lbnQ7XG4gICAgICAgIHNyYzpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgZW1wdHlDaGlsZHJlbih0aGlzLmdldFJvb3RFbGVtZW50KCkpO1xuXG4gICAgICAgICAgICBpZih0aGlzLmltZ0VsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltZ0VsZW0gPSBjcmVhdGVFbGVtZW50KFwiSU1BR0VcIik7XG4gICAgICAgICAgICAgICAgc2V0YXR0cih0aGlzLmltZ0VsZW0sJ3NyYycsdGhpcy5zcmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBwZW5kQ2hpbGQodGhpcy5nZXRSb290RWxlbWVudCgpLHRoaXMuaW1nRWxlbSk7XG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ3dpZHRoJyx0aGlzLndpZHRoLnZhbHVlKydweCcpO1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLmltZ0VsZW0sJ3dpZHRoJyx0aGlzLndpZHRoLnZhbHVlKydweCcpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuaW1nRWxlbSwnd2lkdGgnLCcxMDAlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ2hlaWdodCcsdGhpcy5oZWlnaHQudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuaW1nRWxlbSwnaGVpZ2h0Jyx0aGlzLmhlaWdodC52YWx1ZSsncHgnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLmltZ0VsZW0sJ2hlaWdodCcsJzEwMCUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbnRhaW5lckJhc2UgZXh0ZW5kcyBDb250YWluZXJXaWRnZXQge1xuXG4gICAgICAgIHJvb3RFbGVtOkhUTUxFbGVtZW50O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5SaWdodClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlV2lkdGhfYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVIZWlnaHRfYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZUhlaWdodF9hdXRvKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3QgZXN0aW1hdGVXaWR0aF9hdXRvKCk6bnVtYmVyIDtcblxuICAgICAgICBhYnN0cmFjdCBlc3RpbWF0ZUhlaWdodF9hdXRvKCk6bnVtYmVyIDtcblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290RWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGNsYXNzIEJvcmRlciBleHRlbmRzIENvbnRhaW5lcldpZGdldCB7XG5cbiAgICAgICAgcHJvdGVjdGVkIG1haW5TbG90IDogU2xvdDtcbiAgICAgICAgcHJvdGVjdGVkIGNoaWxkV3JhcHBlcnNNYXA6IE1hcDxXaWRnZXQsSFRNTEVsZW1lbnQ+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMubWFpblNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgdGhpcy5tYWluU2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jaGlsZFdyYXBwZXJzTWFwID0gbmV3IE1hcDxXaWRnZXQsIEhUTUxFbGVtZW50PigpO1xuICAgICAgICAgICAgdGhpcy5zbG90cy5wdXNoKHRoaXMubWFpblNsb3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYodGhpcy5yb290RWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsZW0gPSBjcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLnJvb3RFbGVtLCdwb2ludGVyLWV2ZW50cycsJ2FsbCcpO1xuICAgICAgICAgICAgICAgIHNldGF0dHIodGhpcy5yb290RWxlbSwnbGF5b3V0LXR5cGUnLCdCb3JkZXInKTtcbiAgICAgICAgICAgICAgICBzZXRhdHRyKHRoaXMucm9vdEVsZW0sJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuXG4gICAgICAgIGFkZENoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5XaWRnZXQpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAgICAgdGhpcy5tYWluU2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICBlbXB0eUNoaWxkcmVuKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSk7XG5cbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkLmFzc2VtYmxlRG9tKCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlckRpdiA9IGNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgICAgICAgICAgY3NzKHdyYXBwZXJEaXYsJ3BvaW50ZXItZXZlbnRzJywnbm9uZScpO1xuICAgICAgICAgICAgICAgIHNldGF0dHIod3JhcHBlckRpdiwnbGF5b3V0LXRhZycsJ3dyYXBwZXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkV3JhcHBlcnNNYXAucHV0KGNoaWxkLHdyYXBwZXJEaXYpO1xuICAgICAgICAgICAgICAgIGFwcGVuZENoaWxkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSx3cmFwcGVyRGl2KTtcbiAgICAgICAgICAgICAgICBhcHBlbmRDaGlsZCh3cmFwcGVyRGl2LGNoaWxkLmdldFJvb3RFbGVtZW50KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCd3aWR0aCcsdGhpcy5jYWxjdWxhdGVkV2lkdGgrJ3B4Jyk7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCdoZWlnaHQnLHRoaXMuY2FsY3VsYXRlZEhlaWdodCsncHgnKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygc2xvdC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd3JhcHBlckRpdiA9IHRoaXMuY2hpbGRXcmFwcGVyc01hcC5nZXQoY2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNzcyh3cmFwcGVyRGl2LCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh3cmFwcGVyRGl2LCdsZWZ0JyxjaGlsZC5tYXJnaW4ubGVmdCsncHgnKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKHdyYXBwZXJEaXYsJ3JpZ2h0JyxjaGlsZC5tYXJnaW4ucmlnaHQrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh3cmFwcGVyRGl2LCd0b3AnLGNoaWxkLm1hcmdpbi50b3ArJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh3cmFwcGVyRGl2LCdib3R0b20nLGNoaWxkLm1hcmdpbi5ib3R0b20rJ3B4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNsb3QubGF5b3V0Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QmJnRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSYmdGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy5tYWluU2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5wYXJlbnRTbG90LmNhbGN1bGF0ZWRTbG90V2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDnu4jmraLlkJHkuIvorqHnrpfvvIzku47kuIvlkJHkuIrorqHnrpdcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlPWZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlV2lkdGhGcm9tQm90dG9tKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICBzbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90V2lkdGggPSB0aGlzLmNhbGN1bGF0ZWRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdCYmdGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSYmdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLm1haW5TbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOe7iOatouWQkeS4i+iuoeeul++8jOS7juS4i+WQkeS4iuiuoeeul1xuICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlPWZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCkpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSAge1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlV2lkdGhGcm9tQm90dG9tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMubWFpblNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpICB7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLm1haW5TbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBWbGluZWFybGF5b3V0IGV4dGVuZHMgQ29udGFpbmVyV2lkZ2V0e1xuICAgICAgICBwcm90ZWN0ZWQgc2xvdE1hcCA6IE1hcDxTbG90LERpc3RhbmNlPjtcbiAgICAgICAgcHJvdGVjdGVkIHNsb3RXcmFwcGVyc01hcCA6IE1hcDxTbG90LEhUTUxFbGVtZW50PjtcbiAgICAgICAgcHJvdGVjdGVkIGNoaWxkV3JhcHBlcnNNYXA6IE1hcDxXaWRnZXQsSFRNTEVsZW1lbnQ+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAgPSBuZXcgTWFwPFNsb3QsIERpc3RhbmNlPigpO1xuICAgICAgICAgICAgdGhpcy5jaGlsZFdyYXBwZXJzTWFwID0gbmV3IE1hcDxXaWRnZXQsIEhUTUxFbGVtZW50PigpO1xuICAgICAgICAgICAgdGhpcy5zbG90V3JhcHBlcnNNYXAgPSBuZXcgTWFwPFNsb3QsSFRNTEVsZW1lbnQ+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDZWxsKGRpc3RhbmNlOkRpc3RhbmNlKSB7XG4gICAgICAgICAgICBsZXQgc2xvdCA9IG5ldyBTbG90KCk7XG4gICAgICAgICAgICBzbG90LmNvbnRhaW5lciA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnNsb3RzLmFkZChzbG90KTtcbiAgICAgICAgICAgIHRoaXMuc2xvdE1hcC5wdXQoc2xvdCxkaXN0YW5jZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRDZWxsKGNvbnRyb2w6V2lkZ2V0LCBjZWxsSW5kZXg6bnVtYmVyKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY29udHJvbCk7XG4gICAgICAgICAgICBpZihpZHg+LTEpe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tjZWxsSW5kZXhdO1xuICAgICAgICAgICAgICAgIHNsb3QuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGVtcHR5Q2hpbGRyZW4odGhpcy5nZXRSb290RWxlbWVudCgpKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdFdyYXBwZXJEaXYgPSBjcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICAgICAgICAgIGNzcyhzbG90V3JhcHBlckRpdiwncG9pbnRlci1ldmVudHMnLCdub25lJyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygc2xvdC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRXcmFwcGVyRGl2ID0gY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkV3JhcHBlckRpdiwncG9pbnRlci1ldmVudHMnLCdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZENoaWxkKGNoaWxkV3JhcHBlckRpdixjaGlsZC5nZXRSb290RWxlbWVudCgpKTtcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kQ2hpbGQoc2xvdFdyYXBwZXJEaXYsY2hpbGRXcmFwcGVyRGl2KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZFdyYXBwZXJzTWFwLnB1dChjaGlsZCxjaGlsZFdyYXBwZXJEaXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RXcmFwcGVyc01hcC5wdXQoc2xvdCxzbG90V3JhcHBlckRpdik7XG4gICAgICAgICAgICAgICAgYXBwZW5kQ2hpbGQodGhpcy5nZXRSb290RWxlbWVudCgpLHNsb3RXcmFwcGVyRGl2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwnd2lkdGgnLHRoaXMuY2FsY3VsYXRlZFdpZHRoKydweCcpO1xuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwnaGVpZ2h0Jyx0aGlzLmNhbGN1bGF0ZWRIZWlnaHQrJ3B4Jyk7XG5cbiAgICAgICAgICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuICAgICAgICAgICAgbGV0IGZpeFN1bSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuXG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgZml4U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzbG90V3JhcHBlckRpdiA9IHRoaXMuc2xvdFdyYXBwZXJzTWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGNlbGxoID0gMDtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoID0gKHRoaXMuY2FsY3VsYXRlZEhlaWdodCAtIGZpeFN1bSkqIGNlbGxEZWZpbmF0aW9uLnZhbHVlIC8gd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNzcyhzbG90V3JhcHBlckRpdiwncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgIGNzcyhzbG90V3JhcHBlckRpdiwnbGVmdCcsJzBweCcpO1xuICAgICAgICAgICAgICAgIGNzcyhzbG90V3JhcHBlckRpdiwncmlnaHQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ3RvcCcscG9zKydweCcpO1xuICAgICAgICAgICAgICAgIGNzcyhzbG90V3JhcHBlckRpdiwnaGVpZ2h0JyxjZWxsaCsncHgnKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHNsb3QuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkV3JhcHBlckRpdiA9IHRoaXMuY2hpbGRXcmFwcGVyc01hcC5nZXQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGRXcmFwcGVyRGl2LCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZFdyYXBwZXJEaXYsJ2xlZnQnLGNoaWxkLm1hcmdpbi5sZWZ0KydweCcpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGRXcmFwcGVyRGl2LCdyaWdodCcsY2hpbGQubWFyZ2luLnJpZ2h0KydweCcpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGRXcmFwcGVyRGl2LCd0b3AnLGNoaWxkLm1hcmdpbi50b3ArJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZFdyYXBwZXJEaXYsJ2JvdHRvbScsY2hpbGQubWFyZ2luLmJvdHRvbSsncHgnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2xvdC5sYXlvdXRDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIHBvcys9Y2VsbGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90V2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUmJnRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5wYXJlbnRTbG90LmNhbGN1bGF0ZWRTbG90V2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDnu4jmraLlkJHkuIvorqHnrpfvvIzku47kuIvlkJHkuIrorqHnrpdcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlPWZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlV2lkdGhGcm9tQm90dG9tKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICBzbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90V2lkdGggPSB0aGlzLmNhbGN1bGF0ZWRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOiB2b2lkIHtcblxuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG4gICAgICAgICAgICBsZXQgZml4U3VtID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbGggPSAodGhpcy5oZWlnaHQudmFsdWUgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQgPSBjZWxsaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QmJnRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUmJnRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsaD1jZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLnBhcmVudFNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQgPSBjZWxsaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDnu4jmraLlkJHkuIvorqHnrpfvvIzku47kuIvlkJHkuIrorqHnrpdcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZT1mYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVkSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tQm90dG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykgIHtcbiAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5zbG90cy5tYXAodD0+dC5jYWxjdWxhdGVkU2xvdFdpZHRoKTtcbiAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgbGV0IG1heHdpZHRoID0gMDtcbiAgICAgICAgICAgIGlmKHdpZHRobGlzdC5sZW5ndGg+MCkgbWF4d2lkdGggPSB3aWR0aGxpc3RbMF07XG5cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gbWF4d2lkdGg7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpICB7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc3VtKz1zbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gc3VtO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy5yb290RWxlbSwncG9pbnRlci1ldmVudHMnLCdhbGwnKTtcbiAgICAgICAgICAgICAgICBzZXRhdHRyKHRoaXMucm9vdEVsZW0sJ2xheW91dC10eXBlJywnVmxpbmVhcmxheW91dCcpO1xuICAgICAgICAgICAgICAgIHNldGF0dHIodGhpcy5yb290RWxlbSwnbGF5b3V0LW5hbWUnLHRoaXMubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG5cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgSGxpbmVhcmxheW91dCBleHRlbmRzIENvbnRhaW5lcldpZGdldHtcbiAgICAgICAgcHJvdGVjdGVkIHNsb3RNYXAgOiBNYXA8U2xvdCxEaXN0YW5jZT47XG4gICAgICAgIHByb3RlY3RlZCBzbG90V3JhcHBlcnNNYXAgOiBNYXA8U2xvdCxIVE1MRWxlbWVudD47XG4gICAgICAgIHByb3RlY3RlZCBjaGlsZFdyYXBwZXJzTWFwOiBNYXA8V2lkZ2V0LEhUTUxFbGVtZW50PjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zbG90TWFwID0gbmV3IE1hcDxTbG90LCBEaXN0YW5jZT4oKTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRXcmFwcGVyc01hcCA9IG5ldyBNYXA8V2lkZ2V0LCBIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdFdyYXBwZXJzTWFwID0gbmV3IE1hcDxTbG90LEhUTUxFbGVtZW50PigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2VsbChkaXN0YW5jZTpEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAucHV0KHNsb3QsZGlzdGFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0Q2VsbChjb250cm9sOldpZGdldCwgY2VsbEluZGV4Om51bWJlcikge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbY2VsbEluZGV4XTtcbiAgICAgICAgICAgICAgICBzbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICBlbXB0eUNoaWxkcmVuKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3RXcmFwcGVyRGl2ID0gY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcblxuICAgICAgICAgICAgICAgIGNzcyhzbG90V3JhcHBlckRpdiwncG9pbnRlci1ldmVudHMnLCdub25lJyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygc2xvdC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRXcmFwcGVyRGl2ID0gY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkV3JhcHBlckRpdiwncG9pbnRlci1ldmVudHMnLCdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZENoaWxkKGNoaWxkV3JhcHBlckRpdixjaGlsZC5nZXRSb290RWxlbWVudCgpKTtcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kQ2hpbGQoc2xvdFdyYXBwZXJEaXYsY2hpbGRXcmFwcGVyRGl2KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZFdyYXBwZXJzTWFwLnB1dChjaGlsZCxjaGlsZFdyYXBwZXJEaXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RXcmFwcGVyc01hcC5wdXQoc2xvdCxzbG90V3JhcHBlckRpdik7XG4gICAgICAgICAgICAgICAgYXBwZW5kQ2hpbGQodGhpcy5nZXRSb290RWxlbWVudCgpLHNsb3RXcmFwcGVyRGl2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwnd2lkdGgnLHRoaXMuY2FsY3VsYXRlZFdpZHRoKydweCcpO1xuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwnaGVpZ2h0Jyx0aGlzLmNhbGN1bGF0ZWRIZWlnaHQrJ3B4Jyk7XG5cbiAgICAgICAgICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuICAgICAgICAgICAgbGV0IGZpeFN1bSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuXG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgZml4U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzbG90V3JhcHBlckRpdiA9IHRoaXMuc2xvdFdyYXBwZXJzTWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGNlbGxoID0gMDtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoID0gKHRoaXMuY2FsY3VsYXRlZEhlaWdodCAtIGZpeFN1bSkqIGNlbGxEZWZpbmF0aW9uLnZhbHVlIC8gd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNzcyhzbG90V3JhcHBlckRpdiwncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgIGNzcyhzbG90V3JhcHBlckRpdiwnbGVmdCcsJzBweCcpO1xuICAgICAgICAgICAgICAgIGNzcyhzbG90V3JhcHBlckRpdiwncmlnaHQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ3RvcCcscG9zKydweCcpO1xuICAgICAgICAgICAgICAgIGNzcyhzbG90V3JhcHBlckRpdiwnaGVpZ2h0JyxjZWxsaCsncHgnKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHNsb3QuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkV3JhcHBlckRpdiA9IHRoaXMuY2hpbGRXcmFwcGVyc01hcC5nZXQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGRXcmFwcGVyRGl2LCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZFdyYXBwZXJEaXYsJ2xlZnQnLGNoaWxkLm1hcmdpbi5sZWZ0KydweCcpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGRXcmFwcGVyRGl2LCdyaWdodCcsY2hpbGQubWFyZ2luLnJpZ2h0KydweCcpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGRXcmFwcGVyRGl2LCd0b3AnLGNoaWxkLm1hcmdpbi50b3ArJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZFdyYXBwZXJEaXYsJ2JvdHRvbScsY2hpbGQubWFyZ2luLmJvdHRvbSsncHgnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2xvdC5sYXlvdXRDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIHBvcys9Y2VsbGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QmJnRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUmJnRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOe7iOatouWQkeS4i+iuoeeul++8jOS7juS4i+WQkeS4iuiuoeeul1xuICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlPWZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk6IHZvaWQge1xuXG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcblxuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIGZpeFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbGggPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxoID0gKHRoaXMud2lkdGgudmFsdWUgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoID0gY2VsbGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUmJnRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbGggPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxoID0gKHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoIC0gZml4U3VtKSogY2VsbERlZmluYXRpb24udmFsdWUgLyB3ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aCA9IGNlbGxoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g57uI5q2i5ZCR5LiL6K6h566X77yM5LuO5LiL5ZCR5LiK6K6h566XXG4gICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZT1mYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5jYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSAge1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuc2xvdHMubWFwKHQ9PnQuY2FsY3VsYXRlZFNsb3RIZWlnaHQpO1xuICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgbGV0IG1heGhlaWdodCA9IDA7XG4gICAgICAgICAgICBpZihoZWlnaHRsaXN0Lmxlbmd0aD4wKSBtYXhoZWlnaHQgPSBoZWlnaHRsaXN0WzBdO1xuXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSBtYXhoZWlnaHQ7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpICB7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICBzdW0rPXNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gc3VtO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290RWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMucm9vdEVsZW0sJ3BvaW50ZXItZXZlbnRzJywnYWxsJyk7XG4gICAgICAgICAgICAgICAgc2V0YXR0cih0aGlzLnJvb3RFbGVtLCdsYXlvdXQtdHlwZScsJ1ZsaW5lYXJsYXlvdXQnKTtcbiAgICAgICAgICAgICAgICBzZXRhdHRyKHRoaXMucm9vdEVsZW0sJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuXG5cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Zy5PYnNlcnZlck1vZGVsIHtcblxuICAgIGNvbnN0IGNvbmZpZ1Byb3BlcnR5TmFtZTpzdHJpbmcgPSBcIl9fb2JzZXJ2YWJsZV9fXCI7XG5cbiAgICBleHBvcnQgY2xhc3MgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIHtcbiAgICAgICAgb2JqOmFueTtcbiAgICAgICAgcHJvcGVydHlOYW1lIDogc3RyaW5nO1xuICAgICAgICBvbGRWYWx1ZSA6IGFueTtcbiAgICAgICAgbmV3VmFsdWUgOiBhbnk7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOmFueSxwcm9wZXJ0eU5hbWU6IHN0cmluZywgb2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSkge1xuICAgICAgICAgICAgdGhpcy5vYmogPSBvYmo7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgIHRoaXMub2xkVmFsdWUgPSBvbGRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMubmV3VmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBPYmplY3RDb25maWcge1xuICAgICAgICBwYXJlbnQ6YW55O1xuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xuICAgICAgICBwcm9wczphbnk9e307XG4gICAgICAgIHByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0OkFycmF5PChhcmdzOlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyk9PnZvaWQ+O1xuICAgICAgICBhcnJ2YWx1ZXM6QXJyYXk8YW55PiA9IFtdO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5hcnJ2YWx1ZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vdGlmeVByb3BlcnR5Q2hhbmdlZChhcmdzOlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyk6dm9pZCB7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrID0gdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdFtpXTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjZmcgPSBnZXRPYmplY3RDb25maWcoYXJncy5vYmopO1xuICAgICAgICAgICAgaWYoY2ZnLnBhcmVudCl7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudENmZyA9IGdldE9iamVjdENvbmZpZyhjZmcucGFyZW50KTtcbiAgICAgICAgICAgICAgICBwYXJlbnRDZmcubm90aWZ5UHJvcGVydHlDaGFuZ2VkKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoXG4gICAgICAgICAgICAgICAgICAgIGNmZy5wYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgIGNmZy5wcm9wZXJ0eU5hbWUrXCIuXCIrYXJncy5wcm9wZXJ0eU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3Mub2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MubmV3VmFsdWVcbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKGNhbGxiYWNrOihhcmdzOlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyk9PnZvaWQpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdC5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZVByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKGNhbGxiYWNrOihhcmdzOlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyk9PnZvaWQpOnZvaWQge1xuICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3QuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICBpZihpZHg+LTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0LnNwbGljZShpZHgsMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldE9iamVjdENvbmZpZyhvYmo6YW55KTogT2JqZWN0Q29uZmlnIHtcbiAgICAgICAgaWYoIShjb25maWdQcm9wZXJ0eU5hbWUgaW4gb2JqKSkge1xuICAgICAgICAgICAgbGV0IGNmZyA9IG5ldyBPYmplY3RDb25maWcoKTtcbiAgICAgICAgICAgIG9ialtjb25maWdQcm9wZXJ0eU5hbWVdID0gY2ZnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmpbY29uZmlnUHJvcGVydHlOYW1lXTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gaW5qZWN0UHJvcGVydGllcyhvYmo6YW55KSB7XG4gICAgICAgIGlmIChvYmo9PW51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKHRvU3RyaW5nLmNhbGwob2JqKSE9XCJbb2JqZWN0IE9iamVjdF1cIikgcmV0dXJuO1xuICAgICAgICBsZXQgY2ZnID0gZ2V0T2JqZWN0Q29uZmlnKG9iaik7XG4gICAgICAgIGZvciAobGV0IHByb3BlcnR5TmFtZSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmKHByb3BlcnR5TmFtZT09Y29uZmlnUHJvcGVydHlOYW1lKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmKCFvYmouaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkgY29udGludWU7XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gb2JqW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICBpZih0b1N0cmluZy5jYWxsKHByb3BWYWx1ZSk9PSdbb2JqZWN0IEZ1bmN0aW9uXScpe1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfWVsc2UgaWYodG9TdHJpbmcuY2FsbChwcm9wVmFsdWUpPT0nW29iamVjdCBPYmplY3RdJyl7XG4gICAgICAgICAgICAgICAgaW5qZWN0UHJvcGVydGllcyhwcm9wVmFsdWUpO1xuICAgICAgICAgICAgfWVsc2UgaWYodG9TdHJpbmcuY2FsbChwcm9wVmFsdWUpPT0nW29iamVjdCBBcnJheV0nKXtcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHByb3BWYWx1ZSk7XG4gICAgICAgICAgICAgICAgb2JqW3Byb3BlcnR5TmFtZV0gPSBwcm9wVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICBpZigndmFsdWUnIGluIGRlc2NyaXB0b3Ipe1xuICAgICAgICAgICAgICAgIGxldCB0ID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmKHRvU3RyaW5nLmNhbGwodCk9PSdbb2JqZWN0IEZ1bmN0aW9uXScpe1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihcIl9fb2JzZXJ2YWJsZWFycmF5X1wiIGluIHQpe1xuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUuYWRkRXZlbnRMaXN0ZW5lcihcIml0ZW1hZGRlZFwiLGZ1bmN0aW9uKGU6YW55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZmcubm90aWZ5UHJvcGVydHlDaGFuZ2VkKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mob2JqLCBwcm9wZXJ0eU5hbWUrXCIuKlwiLG51bGwsbnVsbCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlLmFkZEV2ZW50TGlzdGVuZXIoXCJpdGVtc2V0XCIsZnVuY3Rpb24oZTphbnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNmZy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhvYmosIHByb3BlcnR5TmFtZStcIi4qXCIsbnVsbCxudWxsKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUuYWRkRXZlbnRMaXN0ZW5lcihcIml0ZW1yZW1vdmVkXCIsZnVuY3Rpb24oZTphbnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNmZy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhvYmosIHByb3BlcnR5TmFtZStcIi4qXCIsbnVsbCxudWxsKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkdmFsdWUgb2YgcHJvcFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9TdHJpbmcuY2FsbChjaGlsZHZhbHVlKSE9XCJbb2JqZWN0IE9iamVjdF1cIikgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RQcm9wZXJ0aWVzKGNoaWxkdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkQ2ZnID0gZ2V0T2JqZWN0Q29uZmlnKGNoaWxkdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRDZmcucGFyZW50ID0gb2JqO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRDZmcucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lK1wiLipcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRvU3RyaW5nLmNhbGwocHJvcFZhbHVlKT09J1tvYmplY3QgT2JqZWN0XScpe1xuICAgICAgICAgICAgICAgICAgICBpbmplY3RQcm9wZXJ0aWVzKHByb3BWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZENmZyA9IGdldE9iamVjdENvbmZpZyhwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZENmZy5wYXJlbnQgPSBvYmo7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ2ZnLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNmZy5wcm9wc1twcm9wZXJ0eU5hbWVdID0gb2JqW3Byb3BlcnR5TmFtZV07XG5cbiAgICAgICAgICAgIChmdW5jdGlvbiAocHJvcGVydHlOYW1lOnN0cmluZykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoscHJvcGVydHlOYW1lLHtcbiAgICAgICAgICAgICAgICAgICAgJ2dldCc6ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldE9iamVjdENvbmZpZyh0aGlzKS5wcm9wc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnc2V0JzpmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluamVjdFByb3BlcnRpZXModGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2xkVmFsdWUgPSBnZXRPYmplY3RDb25maWcodGhpcykucHJvcHNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE9iamVjdENvbmZpZyh0aGlzKS5wcm9wc1twcm9wZXJ0eU5hbWVdPXZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0T2JqZWN0Q29uZmlnKHRoaXMpLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgIG9iajphbnk7XG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9iaiA9IG9iajtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3QgZ2V0VmFsdWUoKTphbnkgO1xuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgIG9iajphbnk7XG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9iaiA9IG9iajtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3Qgc2V0VmFsdWUodmFsdWU6YW55KTp2b2lkO1xuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciBpbXBsZW1lbnRzIERpc3Bvc2FibGV7XG4gICAgICAgIG9iajphbnk7XG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XG4gICAgICAgIHByb3RlY3RlZCBjYWxsYmFjazogRnVuY3Rpb247XG5cblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjayhsaXN0ZW5lcjpGdW5jdGlvbik6dm9pZHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBsaXN0ZW5lcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZVByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3Qgc3RhcnRMaXN0ZW4oKTp2b2lkO1xuICAgICAgICBhYnN0cmFjdCBzdG9wTGlzdGVuKCk6dm9pZDtcblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciB7XG4gICAgICAgIGFic3RyYWN0IGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOlByb3BlcnR5Q2hhbmdlZExpc3RlbmVyO1xuXG4gICAgICAgIGFic3RyYWN0IGNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6Ym9vbGVhbjtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgVW5pdmVyc2FsUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXJ7XG5cbiAgICAgICAgcHJpdmF0ZSBwcm92aWRlcnM6TGlzdDxQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyPjtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVycyA9IG5ldyBMaXN0PFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm92aWRlcihwcm92aWRlcjpQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm92aWRlcnMocHJvdmlkZXJzOkFycmF5PFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI+KTp2b2lke1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgcHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMuYWRkKHByb3ZpZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZihwcm92aWRlci5jYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iaiwgcHJvcGVydHlOYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlci5nZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5R2V0dGVyUHJvdmlkZXIge1xuICAgICAgICBhYnN0cmFjdCBjYW5Qcm92aWRlR2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOmJvb2xlYW47XG4gICAgICAgIGFic3RyYWN0IGdldFByb3BlcnR5R2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOiBQcm9wZXJ0eUdldHRlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlTZXR0ZXJQcm92aWRlciB7XG4gICAgICAgIGFic3RyYWN0IGNhblByb3ZpZGVTZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6Ym9vbGVhbjtcbiAgICAgICAgYWJzdHJhY3QgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6IFByb3BlcnR5U2V0dGVyO1xuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eVByb3ZpZGVyIHtcblxuICAgICAgICBhYnN0cmFjdCBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW5cblxuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUdldHRlciA7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FuUHJvdmlkZVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIDtcblxuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciA7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FuUHJvdmlkZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4gO1xuXG4gICAgICAgIGFic3RyYWN0IGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIDtcblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBVbml2ZXJzYWxQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBwcml2YXRlIHByb3ZpZGVyczpMaXN0PFByb3BlcnR5R2V0dGVyUHJvdmlkZXI+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzID0gbmV3IExpc3Q8UHJvcGVydHlHZXR0ZXJQcm92aWRlcj4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3ZpZGVyKHByb3ZpZGVyOlByb3BlcnR5R2V0dGVyUHJvdmlkZXIpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMuYWRkKHByb3ZpZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3ZpZGVycyhwcm92aWRlcnM6QXJyYXk8UHJvcGVydHlHZXR0ZXJQcm92aWRlcj4pOnZvaWR7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiBwcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGVHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogTGF5b3V0THpnLlByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYocHJvdmlkZXIuY2FuUHJvdmlkZUdldHRlcihvYmosIHByb3BlcnR5TmFtZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXIuZ2V0UHJvcGVydHlHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgVW5pdmVyc2FsUHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXJ7XG4gICAgICAgIHByaXZhdGUgcHJvdmlkZXJzOkxpc3Q8UHJvcGVydHlTZXR0ZXJQcm92aWRlcj47XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMgPSBuZXcgTGlzdDxQcm9wZXJ0eVNldHRlclByb3ZpZGVyPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXIocHJvdmlkZXI6UHJvcGVydHlTZXR0ZXJQcm92aWRlcik6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXJzKHByb3ZpZGVyczpBcnJheTxQcm9wZXJ0eVNldHRlclByb3ZpZGVyPik6dm9pZHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYocHJvdmlkZXIuY2FuUHJvdmlkZVNldHRlcihvYmosIHByb3BlcnR5TmFtZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGVTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyLmdldFByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFVuaXZlcnNhbFByb3BlcnR5UHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVByb3ZpZGVye1xuICAgICAgICBwcml2YXRlIHByb3BlcnR5R2V0dGVyUHJvdmlkZXI6UHJvcGVydHlHZXR0ZXJQcm92aWRlcjtcbiAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0eVNldHRlclByb3ZpZGVyOlByb3BlcnR5U2V0dGVyUHJvdmlkZXI7XG4gICAgICAgIHByaXZhdGUgcHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcjpQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BlcnR5R2V0dGVyUHJvdmlkZXI6IFByb3BlcnR5R2V0dGVyUHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5U2V0dGVyUHJvdmlkZXI6IFByb3BlcnR5U2V0dGVyUHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5R2V0dGVyUHJvdmlkZXIgPSBwcm9wZXJ0eUdldHRlclByb3ZpZGVyO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eVNldHRlclByb3ZpZGVyID0gcHJvcGVydHlTZXR0ZXJQcm92aWRlcjtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciA9IHByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eUdldHRlclByb3ZpZGVyLmNhblByb3ZpZGVHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZykgOiBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eUdldHRlclByb3ZpZGVyLmdldFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZykgOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BlcnR5U2V0dGVyUHJvdmlkZXIuY2FuUHJvdmlkZVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKSA6IFByb3BlcnR5U2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BlcnR5U2V0dGVyUHJvdmlkZXIuZ2V0UHJvcGVydHlTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyLmNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZykgOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyLmdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwiXG5cbm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIERvbVdpZHRoUHJvcGVydHlHZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFZhbHVlKCk6IGFueSB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgcmV0dXJuIGRvbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVdpZHRoUHJvcGVydHlTZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBkb20gPSA8SFRNTEVsZW1lbnQ+dGhpcy5vYmo7XG4gICAgICAgICAgICBkb20uc3R5bGUud2lkdGggPSB2YWx1ZStcInB4XCI7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21XaWR0aFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwid2lkdGhcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21XaWR0aFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVdpZHRoUHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBwcm9wZXJ0eU5hbWUgPT0gXCJ3aWR0aFwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVdpZHRoUHJvcGVydHlTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBEb21IZWlnaHRQcm9wZXJ0eUdldHRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRWYWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIHJldHVybiBkb20ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbUhlaWdodFByb3BlcnR5U2V0dGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgZG9tLnN0eWxlLmhlaWdodCA9IHZhbHVlK1wicHhcIjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbUhlaWdodFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwiaGVpZ2h0XCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tSGVpZ2h0UHJvcGVydHlHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tSGVpZ2h0UHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBwcm9wZXJ0eU5hbWUgPT0gXCJoZWlnaHRcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21IZWlnaHRQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVNpemVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVye1xuICAgICAgICBwcml2YXRlIGRvbTogSFRNTEVsZW1lbnQ7XG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2tmdW46YW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy5kb20gPSA8SFRNTEVsZW1lbnQ+b2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrZnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsbGJhY2suYXBwbHkoc2VsZi5kb20sW3NlbGYuZG9tXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgb25FdmVudCh0aGlzLmRvbSxcInJlc2l6ZVwiLHRoaXMuY2FsbGJhY2tmdW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcExpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgICAgIG9mZkV2ZW50KHRoaXMuZG9tLFwicmVzaXplXCIsdGhpcy5jYWxsYmFja2Z1bik7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21TaXplUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXJ7XG5cbiAgICAgICAgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21TaXplUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqLHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYocHJvcGVydHlOYW1lPT1cIndpZHRoXCJ8fHByb3BlcnR5TmFtZT09XCJoZWlnaHRcIil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVGV4dFByb3BlcnR5R2V0dGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRWYWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIGlmKGRvbS50YWdOYW1lPT1cIklOUFVUXCJ8fGRvbS50YWdOYW1lPT1cImlucHV0XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RWxlbVZhbHVlKGRvbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ2V0RWxlbVRleHQoZG9tKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVRleHRQcm9wZXJ0eVNldHRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIGlmKGRvbS50YWdOYW1lPT1cIklOUFVUXCJ8fGRvbS50YWdOYW1lPT1cImlucHV0XCIpIHtcbiAgICAgICAgICAgICAgICBzZXRFbGVtVmFsdWUoZG9tLHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRFbGVtVGV4dChkb20sdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVGV4dFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwidGV4dFwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVRleHRQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21UZXh0UHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBwcm9wZXJ0eU5hbWUgPT0gXCJ0ZXh0XCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5U2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5U2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tVGV4dFByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVRleHRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVye1xuICAgICAgICBwcml2YXRlIGRvbTogSFRNTEVsZW1lbnQ7XG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2tmdW46YW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy5kb20gPSA8SFRNTEVsZW1lbnQ+b2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrZnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsbGJhY2suYXBwbHkoc2VsZi5kb20sW3NlbGYuZG9tXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgb25FdmVudCh0aGlzLmRvbSwgXCJjaGFuZ2VcIix0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBvZmZFdmVudCh0aGlzLmRvbSxcImNoYW5nZVwiLHRoaXMuY2FsbGJhY2tmdW4pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVGV4dFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xuXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tVGV4dFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iaixwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmKHByb3BlcnR5TmFtZT09XCJ0ZXh0XCIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIERvbVZhbHVlUHJvcGVydHlHZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFZhbHVlKCk6IGFueSB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgaWYoZG9tLnRhZ05hbWU9PVwiSU5QVVRcInx8ZG9tLnRhZ05hbWU9PVwiaW5wdXRcIikge1xuICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvbTtcbiAgICAgICAgICAgICAgICBpZihpbnB1dC50eXBlPT1cImRhdGVcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsdWVBc0RhdGU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoaW5wdXQudHlwZT09XCJjaGVja2JveFwiKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0LmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRFbGVtVmFsdWUoZG9tKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ2V0RWxlbVRleHQoZG9tKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVZhbHVlUHJvcGVydHlTZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBkb20gPSA8SFRNTEVsZW1lbnQ+dGhpcy5vYmo7XG4gICAgICAgICAgICBpZihkb20udGFnTmFtZT09XCJJTlBVVFwifHxkb20udGFnTmFtZT09XCJpbnB1dFwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9tO1xuICAgICAgICAgICAgICAgIGlmKGlucHV0LnR5cGU9PVwiZGF0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoaW5wdXQudHlwZT09XCJjaGVja2JveFwiKXtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBzZXRFbGVtVmFsdWUoZG9tLHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldEVsZW1UZXh0KGRvbSwgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVmFsdWVQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcInZhbHVlXCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tVmFsdWVQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21WYWx1ZVByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwidmFsdWVcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21WYWx1ZVByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVZhbHVlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcntcbiAgICAgICAgcHJpdmF0ZSBkb206IEhUTUxFbGVtZW50O1xuICAgICAgICBwcml2YXRlIGNhbGxiYWNrZnVuOmFueTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuZG9tID0gPEhUTUxFbGVtZW50Pm9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0TGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja2Z1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrLmFwcGx5KHNlbGYuZG9tLFtzZWxmLmRvbV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG9uRXZlbnQodGhpcy5kb20sIFwiY2hhbmdlXCIsIHRoaXMuY2FsbGJhY2tmdW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcExpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgICAgIG9mZkV2ZW50KHRoaXMuZG9tLFwicmVzaXplXCIsdGhpcy5jYWxsYmFja2Z1bik7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21WYWx1ZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xuXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tVmFsdWVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmoscHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZihwcm9wZXJ0eU5hbWU9PVwidmFsdWVcIil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBpbXBvcnQgZ2V0T2JqZWN0Q29uZmlnID0gTGF5b3V0THpnLk9ic2VydmVyTW9kZWwuZ2V0T2JqZWN0Q29uZmlnO1xuICAgIGltcG9ydCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgPSBMYXlvdXRMemcuT2JzZXJ2ZXJNb2RlbC5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3M7XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5R2V0dGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRWYWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqW3RoaXMucHJvcGVydHlOYW1lXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERpY3RQcm9wZXJ0eVNldHRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5vYmpbdGhpcy5wcm9wZXJ0eU5hbWVdID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaWN0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcntcblxuICAgICAgICBwcml2YXRlIGNhbGxiYWNrZnVuYzphbnk7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydExpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tmdW5jID0gZnVuY3Rpb24gKGFyZ3M6IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncykge1xuICAgICAgICAgICAgICAgIGlmKGFyZ3MucHJvcGVydHlOYW1lPT1zZWxmLnByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrLmFwcGx5KHRoaXMsW3NlbGYub2JqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE9ic2VydmVyTW9kZWwuaW5qZWN0UHJvcGVydGllcyh0aGlzLm9iaik7XG4gICAgICAgICAgICBPYnNlcnZlck1vZGVsLmdldE9iamVjdENvbmZpZyh0aGlzLm9iaikuYWRkUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2sodGhpcy5jYWxsYmFja2Z1bmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcExpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgICAgIE9ic2VydmVyTW9kZWwuZ2V0T2JqZWN0Q29uZmlnKHRoaXMub2JqKS5yZW1vdmVQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjayh0aGlzLmNhbGxiYWNrZnVuYyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaWN0UHJvcGVydHlHZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVyUHJvdmlkZXIge1xuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBMYXlvdXRMemcuUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEaWN0UHJvcGVydHlHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERpY3RQcm9wZXJ0eVNldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJQcm92aWRlciB7XG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5U2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5U2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGljdFByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaWN0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXJ7XG4gICAgICAgIGNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGljdFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENvbnRyb2xQcm9wZXJ0eUdldHRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVye1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0VmFsdWUoKTogYW55IHtcclxuICAgICAgICAgICAgbGV0IGNvbnRyb2w6YW55ID0gPFZpc3VhbEVsZW1lbnQ+dGhpcy5vYmo7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcGVydHlOYW1lIGluIGNvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250cm9sW3RoaXMucHJvcGVydHlOYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDb250cm9sUHJvcGVydHlTZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlcntcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRyb2w6YW55ID0gPFZpc3VhbEVsZW1lbnQ+dGhpcy5vYmo7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcGVydHlOYW1lIGluIGNvbnRyb2wpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xbdGhpcy5wcm9wZXJ0eU5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbDE6V2lkZ2V0ID0gPFdpZGdldD50aGlzLm9iajtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2wxLmFzc2VtYmxlRG9tKCk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sMS5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2wxLmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2wxLmRvTGF5b3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDb250cm9sUHJvcGVydHlHZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVyUHJvdmlkZXJ7XHJcblxyXG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBWaXN1YWxFbGVtZW50O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5R2V0dGVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250cm9sUHJvcGVydHlHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENvbnRyb2xQcm9wZXJ0eVNldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJQcm92aWRlcntcclxuXHJcbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIFZpc3VhbEVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29udHJvbFByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDb250cm9sUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcntcclxuICAgICAgICBwcml2YXRlIGNvbnRyb2w6IFZpc3VhbEVsZW1lbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFja2Z1bjphbnk7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbCA9IDxWaXN1YWxFbGVtZW50Pm9iajtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0TGlzdGVuKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tmdW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsbGJhY2suYXBwbHkoc2VsZi5jb250cm9sLFtzZWxmLmNvbnRyb2xdKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLmFkZFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKHRoaXMucHJvcGVydHlOYW1lLHRoaXMuY2FsbGJhY2tmdW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RvcExpc3RlbigpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLnJlbW92ZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKHRoaXMuY2FsbGJhY2tmdW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENvbnRyb2xQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcntcclxuXHJcbiAgICAgICAgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbnRyb2xQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmoscHJvcGVydHlOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBWaXN1YWxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbCA9IDxWaXN1YWxFbGVtZW50Pm9iajtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250cm9sLmdldE5vdGlmeVByb3BlcnRpZXMoKS5pbmRleE9mKHByb3BlcnR5TmFtZSk+LTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZhbHVlQ29udmVydGVyIHtcblxuICAgICAgICBhYnN0cmFjdCBjb252ZXJ0KHZhbHVlOmFueSk6YW55O1xuXG4gICAgICAgIGFic3RyYWN0IGNvbnZlcnRCYWNrKHZhbHVlOmFueSk6YW55O1xuXG4gICAgfVxuXG4gICAgZXhwb3J0IGVudW0gQmluZGluZ01vZGUge1xuICAgICAgICBPbmV3YXksXG4gICAgICAgIFR3b3dheVxuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCaW5kaW5nIGltcGxlbWVudHMgRGlzcG9zYWJsZXtcbiAgICAgICAgdGFyZ2V0OmFueTtcbiAgICAgICAgdGFyZ2V0UHJvcGVydHlOYW1lOnN0cmluZztcbiAgICAgICAgY29udmVydGVyOlZhbHVlQ29udmVydGVyO1xuICAgICAgICBtb2RlOkJpbmRpbmdNb2RlO1xuICAgICAgICBwcm90ZWN0ZWQgcHJvcGVydHlQcm92aWRlcjogUHJvcGVydHlQcm92aWRlcjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0eVByb3ZpZGVyOlByb3BlcnR5UHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlQcm92aWRlciA9IHByb3BlcnR5UHJvdmlkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCB1cGRhdGVGcm9tU291cmNlKCk6dm9pZDtcbiAgICAgICAgYWJzdHJhY3QgdXBkYXRlRnJvbVRhcmdldCgpOnZvaWQ7XG5cbiAgICAgICAgc2V0Q29udmVydGVyKGNvbnZlcnRlcjogVmFsdWVDb252ZXJ0ZXIpOiBCaW5kaW5nIHtcbiAgICAgICAgICAgIHRoaXMuY29udmVydGVyID0gY29udmVydGVyO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRNb2RlKG1vZGU6IEJpbmRpbmdNb2RlKTogQmluZGluZyB7XG4gICAgICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydEJpbmRpbmcoKTpCaW5kaW5ne1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBzdG9wQmluZGluZygpOkJpbmRpbmd7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnN0b3BCaW5kaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgRnVuY3Rpb25CaW5kaW5nIGV4dGVuZHMgQmluZGluZ3tcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0eVByb3ZpZGVyOiBQcm9wZXJ0eVByb3ZpZGVyKSB7XG4gICAgICAgICAgICBzdXBlcihwcm9wZXJ0eVByb3ZpZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0QmluZGluZygpOiBCaW5kaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcEJpbmRpbmcoKTogQmluZGluZyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUZyb21Tb3VyY2UoKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVGcm9tVGFyZ2V0KCk6IHZvaWQge1xuICAgICAgICB9XG5cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eUJpbmRpbmcgZXh0ZW5kcyBCaW5kaW5nIHtcblxuICAgICAgICBzb3VyY2U6IGFueTtcbiAgICAgICAgc291cmNlUHJvcGVydHlOYW1lOiBzdHJpbmc7XG5cbiAgICAgICAgcHJpdmF0ZSBzb3VyY2VQcm9wR2V0dGVyOiBQcm9wZXJ0eUdldHRlcjtcbiAgICAgICAgcHJpdmF0ZSBzb3VyY2VQcm9wU2V0dGVyOiBQcm9wZXJ0eVNldHRlcjtcbiAgICAgICAgcHJpdmF0ZSB0YXJnZXRQcm9wR2V0dGVyOiBQcm9wZXJ0eUdldHRlcjtcbiAgICAgICAgcHJpdmF0ZSB0YXJnZXRQcm9wU2V0dGVyOiBQcm9wZXJ0eVNldHRlcjtcblxuICAgICAgICBwcml2YXRlIHNvdXJjZVByb3BMaXN0ZW5lcjogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXI7XG4gICAgICAgIHByaXZhdGUgdGFyZ2V0UHJvcExpc3RlbmVyOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0eVByb3ZpZGVyOiBQcm9wZXJ0eVByb3ZpZGVyKSB7XG4gICAgICAgICAgICBzdXBlcihwcm9wZXJ0eVByb3ZpZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0QmluZGluZygpOiBCaW5kaW5nIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEJpbmRpbmcoKTtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5zb3VyY2VQcm9wR2V0dGVyID0gdGhpcy5wcm9wZXJ0eVByb3ZpZGVyLmdldFByb3BlcnR5R2V0dGVyKHRoaXMuc291cmNlLCB0aGlzLnNvdXJjZVByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZVByb3BTZXR0ZXIgPSB0aGlzLnByb3BlcnR5UHJvdmlkZXIuZ2V0UHJvcGVydHlTZXR0ZXIodGhpcy5zb3VyY2UsIHRoaXMuc291cmNlUHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvcEdldHRlciA9IHRoaXMucHJvcGVydHlQcm92aWRlci5nZXRQcm9wZXJ0eUdldHRlcih0aGlzLnRhcmdldCwgdGhpcy50YXJnZXRQcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy50YXJnZXRQcm9wU2V0dGVyID0gdGhpcy5wcm9wZXJ0eVByb3ZpZGVyLmdldFByb3BlcnR5U2V0dGVyKHRoaXMudGFyZ2V0LCB0aGlzLnRhcmdldFByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZVByb3BMaXN0ZW5lciA9IHRoaXMucHJvcGVydHlQcm92aWRlci5nZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcih0aGlzLnNvdXJjZSwgdGhpcy5zb3VyY2VQcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy50YXJnZXRQcm9wTGlzdGVuZXIgPSB0aGlzLnByb3BlcnR5UHJvdmlkZXIuZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIodGhpcy50YXJnZXQsIHRoaXMudGFyZ2V0UHJvcGVydHlOYW1lKTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVGcm9tU291cmNlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuc291cmNlUHJvcExpc3RlbmVyLnN0YXJ0TGlzdGVuKCk7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZVByb3BMaXN0ZW5lci5zZXRQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVGcm9tU291cmNlLmFwcGx5KHNlbGYsW10pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT0gQmluZGluZ01vZGUuVHdvd2F5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRQcm9wTGlzdGVuZXIuc3RhcnRMaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldFByb3BMaXN0ZW5lci5zZXRQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlRnJvbVRhcmdldC5hcHBseShzZWxmLFtdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BCaW5kaW5nKCk6IEJpbmRpbmcge1xuICAgICAgICAgICAgaWYodGhpcy5zb3VyY2VQcm9wTGlzdGVuZXIpIHRoaXMuc291cmNlUHJvcExpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEJpbmRpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUZyb21Tb3VyY2UoKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgdiA9ICB0aGlzLnNvdXJjZVByb3BHZXR0ZXIuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGxldCBvbGRfdiA9IHRoaXMudGFyZ2V0UHJvcEdldHRlci5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKHY9PW9sZF92KSByZXR1cm47XG4gICAgICAgICAgICBpZih0aGlzLmNvbnZlcnRlcil7XG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuY29udmVydGVyLmNvbnZlcnQodik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRhcmdldFByb3BTZXR0ZXIuc2V0VmFsdWUodik7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUZyb21UYXJnZXQoKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgdiA9ICB0aGlzLnRhcmdldFByb3BHZXR0ZXIuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGxldCBvbGRfdiA9IHRoaXMuc291cmNlUHJvcEdldHRlci5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKHY9PW9sZF92KSByZXR1cm47XG4gICAgICAgICAgICBpZih0aGlzLmNvbnZlcnRlcil7XG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuY29udmVydGVyLmNvbnZlcnRCYWNrKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zb3VyY2VQcm9wU2V0dGVyLnNldFZhbHVlKHYpO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBEYXRlRm9ybWF0Q29udmVydGVyIGV4dGVuZHMgVmFsdWVDb252ZXJ0ZXJ7XG4gICAgICAgIGZvcm1hdDpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0Rm9ybWF0KGZvcm1hdDpzdHJpbmcpOiBEYXRlRm9ybWF0Q29udmVydGVyIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGR0ID0gPERhdGU+dmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdERhdGUoZHQsdGhpcy5mb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydEJhY2sodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgRmlyc3RDaGFyVXBwZXJjYXNlQ29udmVydGVyIGV4dGVuZHMgVmFsdWVDb252ZXJ0ZXJ7XG4gICAgICAgIGNvbnZlcnQodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICBpZih2YWx1ZT09bnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICBsZXQgdiA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICByZXR1cm4gKHZbMF0rXCJcIikudG9VcHBlckNhc2UoKSt2LnN1YnN0cigxLHYubGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnRCYWNrKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBMb3dlcmNhc2VDb252ZXJ0ZXIgZXh0ZW5kcyBWYWx1ZUNvbnZlcnRlcntcbiAgICAgICAgY29udmVydCh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIGlmKHZhbHVlPT1udWxsKSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0QmFjayh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgVXBwZXJjYXNlQ29udmVydGVyIGV4dGVuZHMgVmFsdWVDb252ZXJ0ZXJ7XG4gICAgICAgIGNvbnZlcnQodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICBpZih2YWx1ZT09bnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydEJhY2sodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIFRvU3RyaW5nQ29udmVydGVyIGV4dGVuZHMgVmFsdWVDb252ZXJ0ZXJ7XG4gICAgICAgIGNvbnZlcnQodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICBpZih2YWx1ZT09bnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnRCYWNrKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBQaXBlbGluZUNvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuICAgICAgICBjb252ZXJ0ZXJzOkFycmF5PFZhbHVlQ29udmVydGVyPj1bXTtcblxuICAgICAgICBhZGRDb252ZXJ0ZXIoY29udmVydGVyOiBWYWx1ZUNvbnZlcnRlcik6UGlwZWxpbmVDb252ZXJ0ZXIge1xuICAgICAgICAgICAgaWYgKGNvbnZlcnRlcj09bnVsbCkgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnRlcnMucHVzaChjb252ZXJ0ZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDb252ZXJ0ZXJzKGNvbnZlcnRlcnM6IEFycmF5PFZhbHVlQ29udmVydGVyPik6UGlwZWxpbmVDb252ZXJ0ZXIge1xuICAgICAgICAgICAgaWYgKGNvbnZlcnRlcnM9PW51bGwpIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgZm9yIChsZXQgY29udmVydGVyIG9mIGNvbnZlcnRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRlcnMucHVzaChjb252ZXJ0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgbGV0IGN1cnZhbHVlOmFueSA9IHZhbHVlO1xuICAgICAgICAgICAgZm9yIChsZXQgY29udmVydGVyIG9mIHRoaXMuY29udmVydGVycykge1xuICAgICAgICAgICAgICAgIGN1cnZhbHVlID0gY29udmVydGVyLmNvbnZlcnQoY3VydmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGN1cnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydEJhY2sodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICBsZXQgY3VydmFsdWU6YW55ID0gdmFsdWU7XG4gICAgICAgICAgICBmb3IgKGxldCBjb252ZXJ0ZXIgb2YgdGhpcy5jb252ZXJ0ZXJzLnJldmVyc2UoKSkge1xuICAgICAgICAgICAgICAgIGN1cnZhbHVlID0gY29udmVydGVyLmNvbnZlcnQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGN1cnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBFeHByZXNzaW9uQ29udmVydGVyIGV4dGVuZHMgVmFsdWVDb252ZXJ0ZXJ7XG5cbiAgICAgICAgZXhwcmVzc2lvblN0cjpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZXhwcmVzc2lvblN0cjogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5leHByZXNzaW9uU3RyID0gZXhwcmVzc2lvblN0cjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnQodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICBpZih0aGlzLmV4cHJlc3Npb25TdHI9PW51bGx8fHRoaXMuZXhwcmVzc2lvblN0cj09XCJcIikgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgbGV0IGZ1bmM9IG5ldyBGdW5jdGlvbihcInZhbHVlXCIsXCJyZXR1cm4gXCIgKyB0aGlzLmV4cHJlc3Npb25TdHIpO1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgICAgICAgICAgIH1jYXRjaCAoZSkge31cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnRCYWNrKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgY2xhc3MgVmlzdWFsVHJlZSB7XG4gICAgICAgIHJvb3RDb250YWluZXI6IENvbnRhaW5lcldpZGdldDtcbiAgICAgICAgcGFyZW50Q29udHJvbDpUZW1wbGF0ZUNvbnRyb2w7XG4gICAgICAgIHN0YXRlTWFuYWdlcjphbnk7XG5cbiAgICAgICAgc3RhdGljIGZpbmRDb250cm9sc0J5TmFtZShyb290OldpZGdldCwgbmFtZTpzdHJpbmcpOkxpc3Q8V2lkZ2V0PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IExpc3Q8V2lkZ2V0PigpO1xuICAgICAgICAgICAgbGV0IHJvb3RDb250YWluZXI6YW55ID0gbnVsbDtcbiAgICAgICAgICAgIGlmKHJvb3QubmFtZT09bmFtZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQocm9vdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihyb290IGluc3RhbmNlb2YgQ29udGFpbmVyV2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcm9vdENvbnRhaW5lciA9IDxDb250YWluZXJXaWRnZXQ+cm9vdDtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiByb290Q29udGFpbmVyLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgbGV0IHIgPSAgVmlzdWFsVHJlZS5maW5kQ29udHJvbHNCeU5hbWUoY2hpbGQsIG5hbWUpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGRBbGwocik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgZmluZENvbnRyb2xCeU5hbWUocm9vdDpXaWRnZXQsIG5hbWU6c3RyaW5nKTogV2lkZ2V0IHtcbiAgICAgICAgICAgIGxldCByb290Q29udGFpbmVyOmFueSA9IG51bGw7XG4gICAgICAgICAgICBpZihyb290Lm5hbWU9PW5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHJvb3QgaW5zdGFuY2VvZiBDb250YWluZXJXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICByb290Q29udGFpbmVyID0gPENvbnRhaW5lcldpZGdldD5yb290O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiByb290Q29udGFpbmVyLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgbGV0IHIgPSAgVmlzdWFsVHJlZS5maW5kQ29udHJvbEJ5TmFtZShjaGlsZCwgbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYocikgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb3RDb250YWluZXIpe1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdENvbnRhaW5lci5nZXRSb290RWxlbWVudCgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb3RDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RDb250YWluZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb3RDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RDb250YWluZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cblxuICAgIH1cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgVGVtcGxhdGVDb250cm9sIGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuICAgICAgICBwcml2YXRlIHJvb3RCb3JkZXIgOiBCb3JkZXIgPSBuZXcgQm9yZGVyKFwicm9vdEJvcmRlclwiKTtcbiAgICAgICAgcHJpdmF0ZSBfdmlzdWFsVHJlZSA6IFZpc3VhbFRyZWU7XG4gICAgICAgIHByaXZhdGUgc3RhdGVHcm91cHMgOiBMaXN0PFN0YXRlR3JvdXA+O1xuICAgICAgICBwcm90ZWN0ZWQgc3RhdGVFdmVudFRyaWdnZXJzOiBMaXN0PENvbnRyb2xUcmlnZ2VyPjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUdyb3VwcyA9IG5ldyBMaXN0PFN0YXRlR3JvdXA+KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlRXZlbnRUcmlnZ2VycyA9IG5ldyBMaXN0PENvbnRyb2xUcmlnZ2VyPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHZpc3VhbFRyZWUoKTogVmlzdWFsVHJlZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlzdWFsVHJlZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB2aXN1YWxUcmVlKHZhbHVlOiBWaXN1YWxUcmVlKSB7XG4gICAgICAgICAgICBpZih2YWx1ZSE9bnVsbCkge1xuICAgICAgICAgICAgICAgIHZhbHVlLnBhcmVudENvbnRyb2wgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkU3RhdGVHcm91cChncm91cE5hbWU6c3RyaW5nKTogU3RhdGVHcm91cCB7XG4gICAgICAgICAgICBsZXQgc3RhZ2VHcm91cCA9IG5ldyBTdGF0ZUdyb3VwKCk7XG4gICAgICAgICAgICBzdGFnZUdyb3VwLnJvb3RDb250cm9sID0gdGhpcy52aXN1YWxUcmVlLnJvb3RDb250YWluZXI7XG4gICAgICAgICAgICBzdGFnZUdyb3VwLmdyb3VwTmFtZSA9IGdyb3VwTmFtZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVHcm91cHMuYWRkKHN0YWdlR3JvdXApO1xuICAgICAgICAgICAgcmV0dXJuIHN0YWdlR3JvdXA7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRTdGF0ZVN0eWxlKGdyb3VwTmFtZTpzdHJpbmcsIHN0YXRlbmFtZTpzdHJpbmcsIGNvbnRyb2xwcm9wZXJ0eVZhbHVlczphbnksIGV2ZW50TmFtZTpzdHJpbmc9bnVsbCkge1xuICAgICAgICAgICAgbGV0IGdyb3VwcyA9IHRoaXMuc3RhdGVHcm91cHMuZmlsdGVyKHQ9PnQuZ3JvdXBOYW1lPT1ncm91cE5hbWUpO1xuICAgICAgICAgICAgbGV0IGdyb3VwOlN0YXRlR3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgaWYoZ3JvdXBzLmxlbmd0aD09MCkge1xuICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5hZGRTdGF0ZUdyb3VwKGdyb3VwTmFtZSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBncm91cCA9IGdyb3Vwc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHN0YXRlcyA9IGdyb3VwLnN0YXRlcy5maWx0ZXIodD0+dC5uYW1lPT1zdGF0ZW5hbWUpO1xuICAgICAgICAgICAgbGV0IHN0YXRlOlN0YXRlID0gbnVsbDtcbiAgICAgICAgICAgIGlmKHN0YXRlcy5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgIHN0YXRlID0gbmV3IFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgc3RhdGUubmFtZSA9IHN0YXRlbmFtZTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5zdHlsZSA9IG5ldyBTdHlsZSgpO1xuICAgICAgICAgICAgICAgIGdyb3VwLmFkZFN0YXRlKHN0YXRlKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZXNbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGNvbnRyb2xOYW1lIGluIGNvbnRyb2xwcm9wZXJ0eVZhbHVlcykge1xuICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eVZhbHVlcyA9IGNvbnRyb2xwcm9wZXJ0eVZhbHVlc1tjb250cm9sTmFtZV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcGVydHlOYW1lIGluIHByb3BlcnR5VmFsdWVzKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvcGVydHlWYWx1ZXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuc3R5bGUuYWRkU3R5bGVJdGVtKGNvbnRyb2xOYW1lLHByb3BlcnR5TmFtZSx2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZXZlbnROYW1lKSB0aGlzLmFkZFN0YXRlVHJpZ2dlcihncm91cE5hbWUsc3RhdGVuYW1lLGV2ZW50TmFtZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFN0YXRlVHJpZ2dlcihncm91cE5hbWU6c3RyaW5nLCBzdGF0ZU5hbWU6c3RyaW5nLCBldmVudE5hbWU6c3RyaW5nKTp2b2lkIHtcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyID0gbmV3IEV2ZW50VHJpZ2dlcigpO1xuICAgICAgICAgICAgdHJpZ2dlci5jb250cm9sID0gdGhpcztcbiAgICAgICAgICAgIHRyaWdnZXIuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICAgICAgbGV0IGdvdG9zdGF0ZWFjdGlvbiA9IG5ldyBHb3RvU3RhdGVBY3Rpb24oKTtcbiAgICAgICAgICAgIGdvdG9zdGF0ZWFjdGlvbi50ZW1wbGF0ZUNvbnRyb2wgPSB0aGlzO1xuICAgICAgICAgICAgZ290b3N0YXRlYWN0aW9uLnN0YXRlTmFtZSA9IHN0YXRlTmFtZTtcbiAgICAgICAgICAgIGdvdG9zdGF0ZWFjdGlvbi5ncm91cE5hbWUgPSBncm91cE5hbWU7XG4gICAgICAgICAgICB0cmlnZ2VyLmFjdGlvbiA9IGdvdG9zdGF0ZWFjdGlvbjtcbiAgICAgICAgICAgIHRyaWdnZXIuaW5pdCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUV2ZW50VHJpZ2dlcnMuYWRkKHRyaWdnZXIpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBhY3RpdmVTdGF0ZShncm91cE5hbWU6c3RyaW5nLCBzdGF0ZU5hbWU6c3RyaW5nKTp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IHN0YXRlR3JvdXAgb2YgdGhpcy5zdGF0ZUdyb3Vwcykge1xuICAgICAgICAgICAgICAgIC8vIHN0YXRlR3JvdXAuaXNBY3RpdmUgPSBzdGF0ZUdyb3VwLmdyb3VwTmFtZSA9PSBncm91cE5hbWU7XG4gICAgICAgICAgICAgICAgaWYoc3RhdGVHcm91cC5ncm91cE5hbWU9PWdyb3VwTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlR3JvdXAuYXBwbHlTdGF0ZShzdGF0ZU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICB0aGlzLmRvTGF5b3V0KCk7XG4gICAgICAgICAgICB9Y2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290Qm9yZGVyLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuaG9yaXpvbkFsaWdubWVudCA9IHRoaXMuaG9yaXpvbkFsaWdubWVudDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci52ZXJ0aWNhbEFsaWdubWVudCA9IHRoaXMudmVydGljYWxBbGlnbm1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuYWRkQ2hpbGQodGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyKTtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5tYXJnaW4gPSB0aGlzLm1hcmdpbjtcbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuXG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIucGFyZW50U2xvdCA9IHRoaXMucGFyZW50U2xvdDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5wYXJlbnQgPSB0aGlzLnBhcmVudDtcblxuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLmFzc2VtYmxlRG9tKCk7XG5cbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIG9uRXZlbnQodGhpcy5nZXRSb290RWxlbWVudCgpLFwiY2xpY2tcIixmdW5jdGlvbiAoZTphbnkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJhaXNlRXZlbnQoXCJjbGlja1wiLFtlXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uRXZlbnQodGhpcy5nZXRSb290RWxlbWVudCgpLFwibW91c2VlbnRlclwiLGZ1bmN0aW9uIChlOmFueSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcIm1vdXNlZW50ZXJcIixbZV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvbkV2ZW50KHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSxcIm1vdXNlbGVhdmVcIixmdW5jdGlvbiAoZTphbnkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJhaXNlRXZlbnQoXCJtb3VzZWxlYXZlXCIsW2VdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb25FdmVudCh0aGlzLmdldFJvb3RFbGVtZW50KCksXCJtb3VzZWRvd25cIixmdW5jdGlvbiAoZTphbnkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJhaXNlRXZlbnQoXCJtb3VzZWRvd25cIixbZV0pO1xuICAgICAgICAgICAgICAgIHNlbGYucHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uRXZlbnQodGhpcy5nZXRSb290RWxlbWVudCgpLFwibW91c2V1cFwiLGZ1bmN0aW9uIChlOmFueSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcIm1vdXNldXBcIixbZV0pO1xuICAgICAgICAgICAgICAgIHNlbGYucHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvbkV2ZW50KHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSxcIm1vdXNlbW92ZVwiLGZ1bmN0aW9uIChlOmFueSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcIm1vdXNlbW92ZVwiLFtlXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5ob3Jpem9uQWxpZ25tZW50ID0gdGhpcy5ob3Jpem9uQWxpZ25tZW50O1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLnZlcnRpY2FsQWxpZ25tZW50ID0gdGhpcy52ZXJ0aWNhbEFsaWdubWVudDtcbiAgICAgICAgICAgIC8vIHRoaXMucm9vdEJvcmRlci5hZGRDaGlsZCh0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIpO1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLm1hcmdpbiA9IHRoaXMubWFyZ2luO1xuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnJvb3RCb3JkZXIucGFyZW50U2xvdCA9IHRoaXMucGFyZW50U2xvdDtcbiAgICAgICAgICAgIC8vIHRoaXMucm9vdEJvcmRlci5wYXJlbnQgPSB0aGlzLnBhcmVudDtcblxuICAgICAgICAgICAgLy8gdGhpcy5yb290Qm9yZGVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5kb0xheW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMucm9vdEJvcmRlci5jYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlZEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5jYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgQ29udGVudFByZXNlbnRlciBleHRlbmRzIEJvcmRlcntcblxuICAgICAgICBjb250ZW50OldpZGdldDtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHN1cGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEl0ZW1zUHJlc2VudGVyIHtcblxuICAgIH1cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQWN0aW9uIHtcclxuICAgICAgICBhYnN0cmFjdCBleGVjdXRlKCk6dm9pZDtcclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcclxuICAgIGV4cG9ydCBjbGFzcyBTZXRQcm9wZXJ0eUFjdGlvbiBleHRlbmRzIEFjdGlvbntcclxuXHJcbiAgICAgICAgY29udHJvbDpXaWRnZXQ7XHJcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcclxuICAgICAgICB2YWx1ZTphbnk7XHJcblxyXG4gICAgICAgIGV4ZWN1dGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBzZXR0ZXIgPSBuZXcgQ29udHJvbFByb3BlcnR5U2V0dGVyKHRoaXMuY29udHJvbCwgdGhpcy5wcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICBzZXR0ZXIuc2V0VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBNdWx0aUFjdGlvbiBleHRlbmRzIEFjdGlvbiB7XG5cbiAgICAgICAgcHJpdmF0ZSBhY3Rpb25zOkxpc3Q8QWN0aW9uPjtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBuZXcgTGlzdDxBY3Rpb24+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRBY3Rpb24oYWN0aW9uOiBBY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZChhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQWN0aW9uKGFjdGlvbjogQWN0aW9uKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5yZW1vdmUoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyQWN0aW9ucygpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBleGVjdXRlKCk6IHZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgYWN0aW9uIG9mIHRoaXMuYWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5leGVjdXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgR290b1N0YXRlQWN0aW9uIGV4dGVuZHMgQWN0aW9ue1xuXG4gICAgICAgIHRlbXBsYXRlQ29udHJvbDpUZW1wbGF0ZUNvbnRyb2w7XG4gICAgICAgIGdyb3VwTmFtZTpzdHJpbmc7XG4gICAgICAgIHN0YXRlTmFtZTpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXhlY3V0ZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMudGVtcGxhdGVDb250cm9sKSB0aGlzLnRlbXBsYXRlQ29udHJvbC5hY3RpdmVTdGF0ZSh0aGlzLmdyb3VwTmFtZSwgdGhpcy5zdGF0ZU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eUNoYW5nZWRUcmlnZ2VyIGV4dGVuZHMgQ29udHJvbFRyaWdnZXIge1xyXG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICAgICAgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5vblRyaWdnZXJlZCgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wuYWRkUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIodGhpcy5wcm9wZXJ0eU5hbWUsdGhpcy5jYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wucmVtb3ZlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIodGhpcy5jYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0YXRlQ2hhbmdlZFRyaWdnZXIgZXh0ZW5kcyBDb250cm9sVHJpZ2dlciB7XHJcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgICAgICBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uVHJpZ2dlcmVkKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5hZGRTdGF0ZUNoYW5nZWRMaXN0ZW5lcih0aGlzLnByb3BlcnR5TmFtZSx0aGlzLmNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5yZW1vdmVTdGF0ZUNoYW5nZWRMaXN0ZW5lcih0aGlzLmNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBFdmVudFRyaWdnZXIgZXh0ZW5kcyBDb250cm9sVHJpZ2dlcntcbiAgICAgICAgZXZlbnROYW1lOnN0cmluZztcbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb247XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vblRyaWdnZXJlZCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuZXZlbnROYW1lLHRoaXMuY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3R5bGVJdGVtIHtcclxuICAgICAgICBuYW1lOnN0cmluZztcclxuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHZhbHVlOmFueTtcclxuXHJcbiAgICAgICAgYXBwbHkocm9vdENvbnRyb2w6V2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIGxldCBjb250cm9sID0gVmlzdWFsVHJlZS5maW5kQ29udHJvbEJ5TmFtZShyb290Q29udHJvbCwgdGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgaWYoY29udHJvbD09bnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgc2V0dGVyID0gbmV3IENvbnRyb2xQcm9wZXJ0eVNldHRlcihjb250cm9sLCB0aGlzLnByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgIHNldHRlci5zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN0eWxlIHtcclxuICAgICAgICBzdHlsZWl0ZW1zOkxpc3Q8U3R5bGVJdGVtPjtcclxuICAgICAgICB0cmlnZ2VyczpMaXN0PFRyaWdnZXI+O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZWl0ZW1zID0gbmV3IExpc3Q8U3R5bGVJdGVtPigpO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJzID0gbmV3IExpc3Q8VHJpZ2dlcj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZFN0eWxlSXRlbShjb250cm9sTmFtZTpzdHJpbmcsIHByb3BlcnR5TmFtZTpzdHJpbmcsIHZhbHVlOmFueSk6dm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IFN0eWxlSXRlbSgpO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWUgPSBjb250cm9sTmFtZTtcclxuICAgICAgICAgICAgaXRlbS5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XHJcbiAgICAgICAgICAgIGl0ZW0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZWl0ZW1zLmFkZChpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFwcGx5KHJvb3RDb250cm9sOldpZGdldCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZighcm9vdENvbnRyb2wpIHJldHVybjtcclxuICAgICAgICAgICAgZm9yIChsZXQgc3R5bGVpdGVtIG9mIHRoaXMuc3R5bGVpdGVtcykge1xyXG4gICAgICAgICAgICAgICAgc3R5bGVpdGVtLmFwcGx5KHJvb3RDb250cm9sKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgdHJpZ2dlciBvZiB0aGlzLnRyaWdnZXJzKSAge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlci5pbml0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIFN0YXRlIHtcbiAgICAgICAgbmFtZTpzdHJpbmc7XG4gICAgICAgIHN0eWxlOlN0eWxlO1xuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBTdGF0ZUdyb3VwIHtcbiAgICAgICAgZ3JvdXBOYW1lOnN0cmluZztcbiAgICAgICAgc3RhdGVzOkxpc3Q8U3RhdGU+O1xuICAgICAgICByb290Q29udHJvbDpXaWRnZXQ7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcyA9IG5ldyBMaXN0PFN0YXRlPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGVOYW1lcygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlcy5tYXAodD0+dC5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFN0YXRlKHN0YXRlOlN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5hZGQoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlU3RhdGVCeU5hbWUoc3RhdGVOYW1lOnN0cmluZykge1xuICAgICAgICAgICAgbGV0IHN0YXRlc2NhbmRpZGF0ZSA9IHRoaXMuc3RhdGVzLmZpbHRlcih0PT50Lm5hbWU9PXN0YXRlTmFtZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBzdGF0ZSBvZiBzdGF0ZXNjYW5kaWRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcy5yZW1vdmUoc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlU3RhdGUoc3RhdGU6U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJlbW92ZShzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVBbGxTdGF0ZXMoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmluZFN0YXRlQnlOYW1lKHN0YXRlTmFtZTpzdHJpbmcpOlN0YXRlIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZXMgPSB0aGlzLnN0YXRlcy5maWx0ZXIodD0+dC5uYW1lPT1zdGF0ZU5hbWUpO1xuICAgICAgICAgICAgaWYoc3RhdGVzLmxlbmd0aD4wKSByZXR1cm4gc3RhdGVzWzBdO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVN0YXRlKHN0YXRlTmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZmluZFN0YXRlQnlOYW1lKHN0YXRlTmFtZSk7XG4gICAgICAgICAgICBpZihzdGF0ZT09bnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYoc3RhdGUuc3R5bGU9PW51bGwpIHJldHVybjtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdENvbnRyb2w9PW51bGwpIHJldHVybjtcbiAgICAgICAgICAgIHN0YXRlLnN0eWxlLmFwcGx5KHRoaXMucm9vdENvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcclxuICAgIGNsYXNzIFZpc3VhbFRyZWVTdHlsZSB7XHJcblxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgVGVtcGxhdGVDb250cm9se1xuXG4gICAgICAgIHJhZGl1czogbnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9jb250ZW50OiBhbnk7XG4gICAgICAgIHByaXZhdGUgY29udGVudFByZXNlbnRvcjogQ29udGVudFByZXNlbnRlcjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSA1O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBpbml0VmlzdWFsVHJlZSgpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy52aXN1YWxUcmVlID0gbmV3IFZpc3VhbFRyZWUoKTtcbiAgICAgICAgICAgIGxldCByb290Qm9yZGVyID0gbmV3IEJvcmRlcihcInJvb3RcIik7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGVudFByZXNlbnRvciA9IG5ldyBDb250ZW50UHJlc2VudGVyKFwiX2NvbnRlbnRcIik7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRQcmVzZW50b3Iud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRQcmVzZW50b3IuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50UHJlc2VudG9yLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LkNlbnRlcjtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFByZXNlbnRvci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LkNlbnRlcjtcblxuICAgICAgICAgICAgbGV0IGNvbnRlbnRjb250cm9sOldpZGdldCA9IG51bGw7XG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5fY29udGVudCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdGhpcy5fY29udGVudCA9PT0gXCJudW1iZXJcIil7XG4gICAgICAgICAgICAgICAgbGV0IHR4dCA9IG5ldyBUZXh0VmlldyhcIlwiLHRoaXMuX2NvbnRlbnQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgdHh0Lm1hcmdpbiA9IG5ldyBUaGlja25lc3MoMTAsMTAsNSw1KTtcbiAgICAgICAgICAgICAgICB0eHQuc2VsZWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sID0gdHh0O1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgICAgICBjb250ZW50Y29udHJvbC52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgICAgICBjb250ZW50Y29udHJvbC53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgICAgICBjb250ZW50Y29udHJvbC5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb250ZW50Y29udHJvbCA9IDxXaWRnZXQ+dGhpcy5fY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGVudFByZXNlbnRvci5jb250ZW50ID0gY29udGVudGNvbnRyb2w7XG5cblxuICAgICAgICAgICAgbGV0IHZsaW5lYXIgPSBuZXcgVmxpbmVhcmxheW91dChcIlwiKTtcbiAgICAgICAgICAgIHZsaW5lYXIuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdmxpbmVhci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHZsaW5lYXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB2bGluZWFyLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHZsaW5lYXIuYWRkQ2VsbChuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLndlaWdodCwxKSk7XG4gICAgICAgICAgICB2bGluZWFyLmFkZENlbGwobmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS53ZWlnaHQsMSkpO1xuICAgICAgICAgICAgbGV0IGJnUmVjdDEgPSBuZXcgUmVjdChcInJlY3R1cFwiKTtcbiAgICAgICAgICAgIGxldCBiZ1JlY3QyID0gbmV3IFJlY3QoXCJyZWN0ZG93blwiKTtcbiAgICAgICAgICAgIGJnUmVjdDEud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICBiZ1JlY3QxLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIGJnUmVjdDEuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgYmdSZWN0MS52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIGJnUmVjdDEucmFkaXVzX3RvcF9sZWZ0ID0gdGhpcy5yYWRpdXM7XG4gICAgICAgICAgICBiZ1JlY3QxLnJhZGl1c190b3BfcmlnaHQgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIGJnUmVjdDEuZmlsbCA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjRjFGMUYxXCIpO1xuICAgICAgICAgICAgYmdSZWN0MS5zdHJva2UgPSBuZXcgU29saWRDb2xvckJydXNoKFwiIzQzN0RENFwiKTtcbiAgICAgICAgICAgIGJnUmVjdDEuc3Ryb2tlVGhpY2tuZXNzID0gbmV3IFRoaWNrbmVzcygxLDEsMSwwKTtcbiAgICAgICAgICAgIGJnUmVjdDIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICBiZ1JlY3QyLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIGJnUmVjdDIuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgYmdSZWN0Mi52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIGJnUmVjdDIucmFkaXVzX2JvdHRvbV9sZWZ0ID0gdGhpcy5yYWRpdXM7XG4gICAgICAgICAgICBiZ1JlY3QyLnJhZGl1c19ib3R0b21fcmlnaHQgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIGJnUmVjdDIuZmlsbCA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjRTVFNUU1XCIpO1xuICAgICAgICAgICAgYmdSZWN0Mi5zdHJva2UgPSBuZXcgU29saWRDb2xvckJydXNoKFwiIzQzN0RENFwiKTtcbiAgICAgICAgICAgIGJnUmVjdDIuc3Ryb2tlVGhpY2tuZXNzID0gbmV3IFRoaWNrbmVzcygxLDEsMCwxKTtcbiAgICAgICAgICAgIHZsaW5lYXIuYWRkQ2hpbGQoYmdSZWN0MSk7XG4gICAgICAgICAgICB2bGluZWFyLmFkZENoaWxkKGJnUmVjdDIpO1xuICAgICAgICAgICAgdmxpbmVhci5zZXRDZWxsKGJnUmVjdDEsMCk7XG4gICAgICAgICAgICB2bGluZWFyLnNldENlbGwoYmdSZWN0MiwxKTtcbiAgICAgICAgICAgIHJvb3RCb3JkZXIuYWRkQ2hpbGQodmxpbmVhcik7XG4gICAgICAgICAgICByb290Qm9yZGVyLmFkZENoaWxkKHRoaXMuY29udGVudFByZXNlbnRvcik7XG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUucm9vdENvbnRhaW5lciA9IHJvb3RCb3JkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGluaXRTdGF0ZXMoKTp2b2lkIHtcblxuICAgICAgICAgICAgdGhpcy5hZGRTdGF0ZVN0eWxlKFwiaG92ZXJHcm91cFwiLFwibW91c2VlbnRlclwiLHtcbiAgICAgICAgICAgICAgICBcInJlY3R1cFwiOntcbiAgICAgICAgICAgICAgICAgICAgXCJzdHJva2VUaGlja25lc3NcIjogbmV3IFRoaWNrbmVzcygyLDIsMiwwKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJyZWN0ZG93blwiOntcbiAgICAgICAgICAgICAgICAgICAgXCJzdHJva2VUaGlja25lc3NcIjogbmV3IFRoaWNrbmVzcygyLDIsMCwyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXCJtb3VzZWVudGVyXCIpO1xuICAgICAgICAgICAgdGhpcy5hZGRTdGF0ZVN0eWxlKFwiaG92ZXJHcm91cFwiLFwibW91c2VsZWF2ZVwiLHtcbiAgICAgICAgICAgICAgICBcInJlY3R1cFwiOntcbiAgICAgICAgICAgICAgICAgICAgXCJzdHJva2VUaGlja25lc3NcIjogbmV3IFRoaWNrbmVzcygxLDEsMSwwKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJyZWN0ZG93blwiOntcbiAgICAgICAgICAgICAgICAgICAgXCJzdHJva2VUaGlja25lc3NcIjogbmV3IFRoaWNrbmVzcygxLDEsMCwxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXCJtb3VzZWxlYXZlXCIpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZFN0YXRlU3R5bGUoXCJwcmVzc0dyb3VwXCIsXCJwcmVzc2VkXCIse1xuICAgICAgICAgICAgICAgIFwicmVjdHVwXCI6e1xuICAgICAgICAgICAgICAgICAgICBcImZpbGxcIjogbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNGMUYxRjFcIilcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwicmVjdGRvd25cIjp7XG4gICAgICAgICAgICAgICAgICAgIFwiZmlsbFwiOiBuZXcgU29saWRDb2xvckJydXNoKFwiI0YxRjFGMVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXCJtb3VzZWRvd25cIik7XG4gICAgICAgICAgICB0aGlzLmFkZFN0YXRlU3R5bGUoXCJwcmVzc0dyb3VwXCIsXCJyZWxlYXNlZFwiLHtcbiAgICAgICAgICAgICAgICBcInJlY3R1cFwiOntcbiAgICAgICAgICAgICAgICAgICAgXCJmaWxsXCI6IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjRjFGMUYxXCIpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInJlY3Rkb3duXCI6e1xuICAgICAgICAgICAgICAgICAgICBcImZpbGxcIjogbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNFNUU1RTVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFwibW91c2V1cFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBjb250ZW50KCk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBjb250ZW50KHZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX2NvbnRlbnQ9PXZhbHVlKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChcImNvbnRlbnRcIik7XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gdmFsdWU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5pbml0VmlzdWFsVHJlZSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0U3RhdGVzKCk7XG4gICAgICAgICAgICBzdXBlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBUZW1wbGF0ZUNvbnRyb2x7XG4gICAgICAgIG1pblZhbHVlOm51bWJlcjtcbiAgICAgICAgbWF4VmFsdWU6bnVtYmVyO1xuICAgICAgICB2YWx1ZTpudW1iZXI7XG4gICAgICAgIHJhZGl1czpudW1iZXI9NTtcbiAgICAgICAgcHJpdmF0ZSByZWN0UHJvYzogUmVjdDtcbiAgICAgICAgcHJpdmF0ZSByZWN0VXA6IFJlY3Q7XG4gICAgICAgIGJhcmZpbGw6QnJ1c2g7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMubWluVmFsdWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5tYXhWYWx1ZSA9IDEwMDtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSAzMDtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBpbml0VmlzdWFsVHJlZSgpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy52aXN1YWxUcmVlID0gbmV3IFZpc3VhbFRyZWUoKTtcblxuICAgICAgICAgICAgbGV0IHJvb3RCb3JkZXIgPSBuZXcgQm9yZGVyKFwicm9vdFwiKTtcbiAgICAgICAgICAgIGxldCByZWN0UHJvYyA9IG5ldyBSZWN0KFwicmVjdFByb2NcIik7XG4gICAgICAgICAgICBsZXQgcmVjdEJnID0gbmV3IFJlY3QoXCJyZWN0QmdcIik7XG4gICAgICAgICAgICBsZXQgcmVjdFVwID0gbmV3IFJlY3QoXCJyZWN0VXBcIik7XG5cbiAgICAgICAgICAgIHJlY3RQcm9jLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCwwKTtcbiAgICAgICAgICAgIHJlY3RQcm9jLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHJlY3RQcm9jLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LkxlZnQ7XG4gICAgICAgICAgICByZWN0UHJvYy52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHJlY3RQcm9jLnJhZGl1c190b3BfbGVmdCA9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgcmVjdFByb2MucmFkaXVzX2JvdHRvbV9sZWZ0ID0gdGhpcy5yYWRpdXM7XG4gICAgICAgICAgICByZWN0UHJvYy5maWxsID0gdGhpcy5iYXJmaWxsO1xuICAgICAgICAgICAgcmVjdFByb2Muc3Ryb2tlID0gdGhpcy5zdHJva2U7XG4gICAgICAgICAgICByZWN0UHJvYy5zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKHRoaXMuc3Ryb2tlVGhpY2tuZXNzLmxlZnQsMCx0aGlzLnN0cm9rZVRoaWNrbmVzcy50b3AsdGhpcy5zdHJva2VUaGlja25lc3MuYm90dG9tKTtcblxuICAgICAgICAgICAgcmVjdEJnLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgcmVjdEJnLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHJlY3RCZy5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICByZWN0QmcudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICByZWN0QmcucmFkaXVzID0gdGhpcy5yYWRpdXM7XG4gICAgICAgICAgICByZWN0QmcuZmlsbCA9IHRoaXMuZmlsbDtcbiAgICAgICAgICAgIHJlY3RCZy5zdHJva2UgPSB0aGlzLnN0cm9rZTtcbiAgICAgICAgICAgIHJlY3RCZy5zdHJva2VUaGlja25lc3MgPSB0aGlzLnN0cm9rZVRoaWNrbmVzcztcbiAgICAgICAgICAgIHJlY3RCZy5zaGFkb3cgPSB0aGlzLnNoYWRvdztcblxuICAgICAgICAgICAgbGV0IHZsaW5lYXIgPSBuZXcgVmxpbmVhcmxheW91dChcIlwiKTtcbiAgICAgICAgICAgIHZsaW5lYXIuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdmxpbmVhci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHZsaW5lYXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB2bGluZWFyLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcblxuICAgICAgICAgICAgdmxpbmVhci5hZGRDZWxsKG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUud2VpZ2h0LDEpKTtcbiAgICAgICAgICAgIHZsaW5lYXIuYWRkQ2VsbChuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLndlaWdodCwxKSk7XG4gICAgICAgICAgICB2bGluZWFyLmFkZENoaWxkKHJlY3RVcCk7XG4gICAgICAgICAgICB2bGluZWFyLnNldENlbGwocmVjdFVwLDApO1xuXG4gICAgICAgICAgICByZWN0VXAud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLDApO1xuICAgICAgICAgICAgcmVjdFVwLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHJlY3RVcC5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICByZWN0VXAudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICByZWN0VXAucmFkaXVzX3RvcF9sZWZ0ID0gdGhpcy5yYWRpdXM7XG4gICAgICAgICAgICByZWN0VXAuc3Ryb2tlID0gdGhpcy5zdHJva2U7XG4gICAgICAgICAgICByZWN0VXAub3BhY2l0eSA9IDAuNTtcbiAgICAgICAgICAgIHJlY3RVcC5maWxsID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIndoaXRlXCIpO1xuICAgICAgICAgICAgcmVjdFVwLnN0cm9rZVRoaWNrbmVzcyA9IG5ldyBUaGlja25lc3ModGhpcy5zdHJva2VUaGlja25lc3MubGVmdCwwLHRoaXMuc3Ryb2tlVGhpY2tuZXNzLnRvcCwwKTtcblxuICAgICAgICAgICAgcm9vdEJvcmRlci5hZGRDaGlsZChyZWN0QmcpO1xuICAgICAgICAgICAgcm9vdEJvcmRlci5hZGRDaGlsZChyZWN0UHJvYyk7XG4gICAgICAgICAgICByb290Qm9yZGVyLmFkZENoaWxkKHZsaW5lYXIpO1xuXG4gICAgICAgICAgICB0aGlzLnJlY3RQcm9jID0gcmVjdFByb2M7XG4gICAgICAgICAgICB0aGlzLnJlY3RVcCA9IHJlY3RVcDtcbiAgICAgICAgICAgIHRoaXMudmlzdWFsVHJlZS5yb290Q29udGFpbmVyID0gcm9vdEJvcmRlcjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmluaXRWaXN1YWxUcmVlKCk7XG4gICAgICAgICAgICBzdXBlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgdyA9IHRoaXMuY2FsY3VsYXRlZFdpZHRoO1xuICAgICAgICAgICAgbGV0IHJlY3RlbmQgPSB3Lyh0aGlzLm1heFZhbHVlLXRoaXMubWluVmFsdWUpKih0aGlzLnZhbHVlLXRoaXMubWluVmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5yZWN0UHJvYy53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQscmVjdGVuZCk7XG4gICAgICAgICAgICB0aGlzLnJlY3RVcC53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQscmVjdGVuZCk7XG4gICAgICAgICAgICBzdXBlci5kb0xheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgU2xpZGVyQmFyIGV4dGVuZHMgVGVtcGxhdGVDb250cm9se1xuXG4gICAgICAgIG1pblZhbHVlOm51bWJlcjtcbiAgICAgICAgbWF4VmFsdWU6bnVtYmVyO1xuICAgICAgICBwcml2YXRlIF92YWx1ZTpudW1iZXI7XG4gICAgICAgIHJhZGl1czpudW1iZXI7XG4gICAgICAgIGhhbmRsZUZpbGw6IEJydXNoO1xuICAgICAgICBoYW5kbGVTdHJva2U6IEJydXNoO1xuICAgICAgICBwcml2YXRlIHJlY3RIYW5kbGU6IFJlY3Q7XG4gICAgICAgIHByaXZhdGUgbW91c2Vkb3duVmFsdWU6bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLm1pblZhbHVlID0gMDtcbiAgICAgICAgICAgIHRoaXMubWF4VmFsdWUgPSAxMDA7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IDMwO1xuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSAxMDtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRmlsbCA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjZjVmNWY1XCIpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVTdHJva2UgPSBuZXcgU29saWRDb2xvckJydXNoKFwiI2U1ZTVlNVwiKTtcbiAgICAgICAgICAgIHRoaXMuZmlsbCA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjZTVlNWU1XCIpO1xuICAgICAgICAgICAgdGhpcy5zdHJva2UgPSBuZXcgU29saWRDb2xvckJydXNoKFwiI2U1ZTVlNVwiKTtcbiAgICAgICAgICAgIHRoaXMubW91c2Vkb3duVmFsdWUgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnRpZXMucHVzaChcInZhbHVlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgdmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgaWYodGhpcy5fdmFsdWUgPT0gdmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2VkKFwidmFsdWVcIik7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBpbml0VmlzdWFsVHJlZSgpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy52aXN1YWxUcmVlID0gbmV3IFZpc3VhbFRyZWUoKTtcbiAgICAgICAgICAgIGxldCByb290Qm9yZGVyID0gbmV3IEJvcmRlcihcInJvb3RcIik7XG5cbiAgICAgICAgICAgIGxldCByZWN0U3RpY2sgPSBuZXcgUmVjdChcInNsaWRlclN0aWNrXCIpO1xuICAgICAgICAgICAgcmVjdFN0aWNrLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHJlY3RTdGljay52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LkNlbnRlcjtcbiAgICAgICAgICAgIHJlY3RTdGljay53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHJlY3RTdGljay5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLDIpO1xuICAgICAgICAgICAgcmVjdFN0aWNrLmZpbGwgPSB0aGlzLmZpbGw7XG4gICAgICAgICAgICByZWN0U3RpY2suc3Ryb2tlID0gdGhpcy5zdHJva2U7XG4gICAgICAgICAgICByZWN0U3RpY2suc3Ryb2tlVGhpY2tuZXNzID0gbmV3IFRoaWNrbmVzcygxLDEsMSwxKTtcbiAgICAgICAgICAgIHJlY3RTdGljay5zaGFkb3cgPSBuZXcgU2hhZG93U2V0dGluZ3MoMCwwLDUsMCxcIiNjZmNmY2ZcIik7XG5cbiAgICAgICAgICAgIGxldCByZWN0SGFuZGxlID0gbmV3IFJlY3QoXCJzbGlkZXJIYW5kbGVcIik7XG4gICAgICAgICAgICByZWN0SGFuZGxlLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LkxlZnQ7XG4gICAgICAgICAgICByZWN0SGFuZGxlLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuQ2VudGVyO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS5yYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIHJlY3RIYW5kbGUud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLHRoaXMucmFkaXVzKjIpO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLHRoaXMucmFkaXVzKjIpO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS5maWxsID0gdGhpcy5oYW5kbGVGaWxsO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS5zdHJva2UgPSB0aGlzLmhhbmRsZVN0cm9rZTtcbiAgICAgICAgICAgIHJlY3RIYW5kbGUuc3Ryb2tlVGhpY2tuZXNzID0gbmV3IFRoaWNrbmVzcygxLDEsMSwxKTtcbiAgICAgICAgICAgIHJlY3RIYW5kbGUuc2hhZG93ID0gbmV3IFNoYWRvd1NldHRpbmdzKDAsMCwyMCwwLFwiI2NmY2ZjZlwiKTtcblxuICAgICAgICAgICAgcm9vdEJvcmRlci5hZGRDaGlsZChyZWN0U3RpY2spO1xuICAgICAgICAgICAgcm9vdEJvcmRlci5hZGRDaGlsZChyZWN0SGFuZGxlKTtcblxuICAgICAgICAgICAgbGV0IG1vdXNlZG93blNjcmVlblggPSAwO1xuICAgICAgICAgICAgbGV0IG1vdXNlZG93blNjcmVlblkgPSAwO1xuICAgICAgICAgICAgbGV0IGlzbW91c2Vkb3duID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgZHggPSAwO1xuICAgICAgICAgICAgbGV0IGR5ID0gMDtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgb25FdmVudChyZWN0SGFuZGxlLmdldFJvb3RFbGVtZW50KCksXCJtb3VzZWRvd25cIixmdW5jdGlvbiAoZTphbnkpIHtcbiAgICAgICAgICAgICAgICBtb3VzZWRvd25TY3JlZW5YID0gZS5zY3JlZW5YO1xuICAgICAgICAgICAgICAgIG1vdXNlZG93blNjcmVlblkgPSBlLnNjcmVlblk7XG4gICAgICAgICAgICAgICAgaXNtb3VzZWRvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYubW91c2Vkb3duVmFsdWUgPSBzZWxmLl92YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb25FdmVudChkb2N1bWVudC5ib2R5LFwibW91c2Vtb3ZlXCIsZnVuY3Rpb24gKGU6YW55KSB7XG4gICAgICAgICAgICAgICAgaWYoIWlzbW91c2Vkb3duKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZHggPSBlLnNjcmVlblggLSBtb3VzZWRvd25TY3JlZW5YO1xuICAgICAgICAgICAgICAgIGR5ID0gZS5zY3JlZW5ZIC0gbW91c2Vkb3duU2NyZWVuWTtcbiAgICAgICAgICAgICAgICBzZWxmLm9uSGFuZGxlRHJhZyhkeCxkeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uRXZlbnQoZG9jdW1lbnQuYm9keSxcIm1vdXNldXBcIixmdW5jdGlvbiAoZTphbnkpIHtcbiAgICAgICAgICAgICAgICBtb3VzZWRvd25TY3JlZW5YID0gZS5zY3JlZW5YO1xuICAgICAgICAgICAgICAgIG1vdXNlZG93blNjcmVlblkgPSBlLnNjcmVlblk7XG4gICAgICAgICAgICAgICAgaXNtb3VzZWRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUucm9vdENvbnRhaW5lciA9IHJvb3RCb3JkZXI7XG4gICAgICAgICAgICB0aGlzLnJlY3RIYW5kbGUgPSByZWN0SGFuZGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgb25IYW5kbGVEcmFnKGR4OiBudW1iZXIsIGR5OiBudW1iZXIpOiBhbnkge1xuICAgICAgICAgICAgbGV0IHcgPSB0aGlzLmNhbGN1bGF0ZWRXaWR0aDtcbiAgICAgICAgICAgIGxldCB2ID0gdGhpcy5tb3VzZWRvd25WYWx1ZSArIGR4L3cqKHRoaXMubWF4VmFsdWUtdGhpcy5taW5WYWx1ZSk7XG4gICAgICAgICAgICBpZih2PnRoaXMubWF4VmFsdWUpIHYgPSB0aGlzLm1heFZhbHVlO1xuICAgICAgICAgICAgaWYodjx0aGlzLm1pblZhbHVlKSB2ID0gdGhpcy5taW5WYWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgICAgICAgdGhpcy5kb0xheW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmluaXRWaXN1YWxUcmVlKCk7XG4gICAgICAgICAgICBzdXBlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgdyA9IHRoaXMuY2FsY3VsYXRlZFdpZHRoO1xuICAgICAgICAgICAgbGV0IHJlY3RlbmQgPSB3Lyh0aGlzLm1heFZhbHVlLXRoaXMubWluVmFsdWUpKih0aGlzLl92YWx1ZS10aGlzLm1pblZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMucmVjdEhhbmRsZS5tYXJnaW4ubGVmdCA9IHJlY3RlbmQ7XG4gICAgICAgICAgICBzdXBlci5kb0xheW91dCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9wZXJ0eUJpbmRpbmcocHJvcGVydHlQcm92aWRlcjpQcm9wZXJ0eVByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OmFueSwgdGFyZ2V0UHJvcE5hbWU6c3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOmFueSwgc291cmNlUHJvcE5hbWU6c3RyaW5nLCBtb2RlOiBCaW5kaW5nTW9kZSA9IEJpbmRpbmdNb2RlLk9uZXdheSk6IFByb3BlcnR5QmluZGluZyB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb3BlcnR5QmluZGluZyhwcm9wZXJ0eVByb3ZpZGVyKTtcbiAgICAgICAgcC5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIHAuc291cmNlUHJvcGVydHlOYW1lID0gc291cmNlUHJvcE5hbWU7XG4gICAgICAgIHAudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBwLnRhcmdldFByb3BlcnR5TmFtZSA9IHRhcmdldFByb3BOYW1lO1xuICAgICAgICBwLm1vZGUgPSBtb2RlO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0VW5pdmVyc2FsUHJvcGVydHlQcm92aWRlcigpIDogVW5pdmVyc2FsUHJvcGVydHlQcm92aWRlciB7XG5cbiAgICAgICAgbGV0IGdldHRlclByb3ZpZGVyID0gbmV3IFVuaXZlcnNhbFByb3BlcnR5R2V0dGVyUHJvdmlkZXIoKTtcbiAgICAgICAgbGV0IHNldHRlclByb3ZpZGVyID0gbmV3IFVuaXZlcnNhbFByb3BlcnR5U2V0dGVyUHJvdmlkZXIoKTtcbiAgICAgICAgbGV0IGxpc3RlbmVyUHJvdmlkZXIgPSBuZXcgVW5pdmVyc2FsUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpO1xuXG4gICAgICAgIGdldHRlclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBDb250cm9sUHJvcGVydHlHZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVdpZHRoUHJvcGVydHlHZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbUhlaWdodFByb3BlcnR5R2V0dGVyUHJvdmlkZXIoKSk7XG4gICAgICAgIGdldHRlclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEb21UZXh0UHJvcGVydHlHZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVZhbHVlUHJvcGVydHlHZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERpY3RQcm9wZXJ0eUdldHRlclByb3ZpZGVyKCkpO1xuXG4gICAgICAgIHNldHRlclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBDb250cm9sUHJvcGVydHlTZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVdpZHRoUHJvcGVydHlTZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbUhlaWdodFByb3BlcnR5U2V0dGVyUHJvdmlkZXIoKSk7XG4gICAgICAgIHNldHRlclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEb21UZXh0UHJvcGVydHlTZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVZhbHVlUHJvcGVydHlTZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERpY3RQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuXG4gICAgICAgIGxpc3RlbmVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IENvbnRyb2xQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKCkpO1xuICAgICAgICBsaXN0ZW5lclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEb21TaXplUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpKTtcbiAgICAgICAgbGlzdGVuZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tVGV4dFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIoKSk7XG4gICAgICAgIGxpc3RlbmVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVZhbHVlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpKTtcbiAgICAgICAgbGlzdGVuZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRGljdFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIoKSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBVbml2ZXJzYWxQcm9wZXJ0eVByb3ZpZGVyKGdldHRlclByb3ZpZGVyLCBzZXR0ZXJQcm92aWRlciwgbGlzdGVuZXJQcm92aWRlcik7XG4gICAgfVxuXG59Il19
