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
    var WidgetBase = (function (_super) {
        __extends(WidgetBase, _super);
        function WidgetBase(name) {
            _super.call(this, name);
        }
        WidgetBase.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = LayoutLzg.createElement("DIV");
                LayoutLzg.css(this.rootElem, "box-sizing", "border-box");
                LayoutLzg.css(this.rootElem, "pointer-events", "all");
            }
            return this.rootElem;
        };
        WidgetBase.prototype.calculateWidthFromTop = function () {
        };
        WidgetBase.prototype.calculateHeightFromTop = function () {
        };
        WidgetBase.prototype.calculateWidthFromBottom = function () {
        };
        WidgetBase.prototype.calculateHeightFromBottom = function () {
        };
        WidgetBase.prototype.dispose = function () {
        };
        return WidgetBase;
    }(LayoutLzg.Widget));
    LayoutLzg.WidgetBase = WidgetBase;
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
            var trigger = new LayoutLzg.DomEventTrigger();
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
    var DomEventTrigger = (function (_super) {
        __extends(DomEventTrigger, _super);
        function DomEventTrigger() {
            _super.call(this);
        }
        DomEventTrigger.prototype.init = function () {
            var self = this;
            this.callback = function () {
                self.onTriggered();
            };
            this.control.addEventListener(this.eventName, this.callback);
        };
        DomEventTrigger.prototype.dispose = function () {
            this.control.removeEventListener(this.callback);
        };
        return DomEventTrigger;
    }(LayoutLzg.ControlTrigger));
    LayoutLzg.DomEventTrigger = DomEventTrigger;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var WidgetEventTrigger = (function (_super) {
        __extends(WidgetEventTrigger, _super);
        function WidgetEventTrigger() {
            _super.call(this);
        }
        WidgetEventTrigger.prototype.onEventTriggered = function () {
            if (this.action)
                this.action.execute();
        };
        WidgetEventTrigger.prototype.init = function () {
            var self = this;
        };
        WidgetEventTrigger.prototype.dispose = function () {
        };
        return WidgetEventTrigger;
    }(LayoutLzg.ControlTrigger));
    LayoutLzg.WidgetEventTrigger = WidgetEventTrigger;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2RhdGV1dGlscy50cyIsInV0aWxzL2V2ZW50dXRpbHMudHMiLCJ1dGlscy9odG1sdXRpbHMudHMiLCJldmVudGJ1cy9ldmVudGJ1cy50cyIsInRyaWdnZXIvdHJpZ2dlcmJhc2UudHMiLCJsYXlvdXRiYXNlLnRzIiwibGF5b3V0Y29yZS50cyIsImNvbGxlY3Rpb25zL2xpc3QudHMiLCJjb2xsZWN0aW9ucy9tYXAudHMiLCJicnVzaGVzL3NvbGlkY29sb3JicnVzaC50cyIsImJydXNoZXMvaW1hZ2Vjb2xvcmJydXNoLnRzIiwiYnJ1c2hlcy9ncmFkaWVudGNvbG9yYnJ1c2gudHMiLCJjb250cm9scy9jb250cm9sYmFzZS50cyIsImNvbnRyb2xzL3RleHR2aWV3LnRzIiwiY29udHJvbHMvcmVjdC50cyIsImNvbnRyb2xzL2ltYWdlLnRzIiwiY29udGFpbmVycy9jb250YWluZXJiYXNlLnRzIiwiY29udGFpbmVycy9ib3JkZXIudHMiLCJjb250YWluZXJzL3ZsaW5lYXJsYXlvdXQudHMiLCJjb250YWluZXJzL2hsaW5lYXJsYXlvdXQudHMiLCJvYnNlcnZlci9vYnNlcnZhYmxlb2JqZWN0aW5qZWN0b3IudHMiLCJvYnNlcnZlci9wcm9wZXJ0eWJhc2UudHMiLCJvYnNlcnZlci9kb21zaXplcHJvcGVydHkudHMiLCJvYnNlcnZlci9kb210ZXh0cHJvcGVydHkudHMiLCJvYnNlcnZlci9kb212YWx1ZXByb3BlcnR5LnRzIiwib2JzZXJ2ZXIvZGljdHByb3BlcnR5LnRzIiwib2JzZXJ2ZXIvY29udHJvbHByb3BlcnR5LnRzIiwiYmluZGluZ3MvYmluZGluZy50cyIsImJpbmRpbmdzL2Z1bmN0aW9uYmluZGluZy50cyIsImJpbmRpbmdzL3Byb3BlcnR5YmluZGluZy50cyIsImNvbnZlcnRlcnMvZGF0ZWZvcm1hdGNvbnZlcnRlci50cyIsImNvbnZlcnRlcnMvZmlyc3RjaGFydXBwZXJjYXNlY29udmVydGVyLnRzIiwiY29udmVydGVycy9sb3dlcmNhc2Vjb252ZXJ0ZXIudHMiLCJjb252ZXJ0ZXJzL3VwcGVyY2FzZWNvbnZlcnRlci50cyIsImNvbnZlcnRlcnMvdG9zdHJpbmdjb252ZXJ0ZXIudHMiLCJjb252ZXJ0ZXJzL3BpcGVsaW5lY29udmVydGVyLnRzIiwiY29udmVydGVycy9leHByZXNzaW9uY29udmVydGVyLnRzIiwidmlzdWFsdHJlZS92aXN1YWx0cmVlLnRzIiwidmlzdWFsdHJlZS90ZW1wbGF0ZWNvbnRyb2wudHMiLCJhY3Rpb24vYWN0aW9uYmFzZS50cyIsImFjdGlvbi9zZXRwcm9wZXJ0eWFjdGlvbi50cyIsImFjdGlvbi9tdWx0aWFjdGlvbi50cyIsImFjdGlvbi9nb3Rvc3RhdGVhY3Rpb24udHMiLCJ0cmlnZ2VyL3Byb3BlcnR5Y2hhbmdlZHRyaWdnZXIudHMiLCJ0cmlnZ2VyL3N0YXRlY2hhbmdlZHRyaWdnZXIudHMiLCJ0cmlnZ2VyL2RvbWV2ZW50dHJpZ2dlci50cyIsInRyaWdnZXIvd2lkZ2V0ZXZlbnR0cmlnZ2VyLnRzIiwic3R5bGUvc3R5bGViYXNlLnRzIiwic3R5bGUvc3RhdGVtYW5hZ2VyLnRzIiwic3R5bGUvdmlzdWFsdHJlZXN0eWxlLnRzIiwidGVtcGxhdGVjb250cm9scy9idXR0b24udHMiLCJ0ZW1wbGF0ZWNvbnRyb2xzL3Byb2dyZXNzYmFyLnRzIiwidGVtcGxhdGVjb250cm9scy9zbGlkZXJiYXIudHMiLCJmYWNhZGVzL2JpbmRpbmcudHMiLCJib290c3RyYXAvcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFVLFNBQVMsQ0FzQmxCO0FBdEJELFdBQVUsU0FBUyxFQUFDLENBQUM7SUFFakIsb0JBQTJCLElBQVUsRUFBRSxNQUE2QjtRQUE3QixzQkFBNkIsR0FBN0IscUJBQTZCO1FBQ2hFLElBQUksQ0FBQyxHQUFPO1lBQ1IsSUFBSSxFQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBQyxDQUFDO1lBQ3hCLElBQUksRUFBRyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3JCLElB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Z0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksZ0RBQXNDLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLGdEQUFzQyxFQUFFLENBQUMsQ0FBQztRQUMzRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxpREFBdUMsRUFBRSxDQUFDLENBQUM7UUFDNUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksNkNBQW1DLEVBQUUsQ0FBQyxDQUFDO1FBRXhFLE1BQU0sQ0FBQyxJQUFJLG1DQUF5QixDQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBM0JlLDZDQUFtQyxzQ0EyQmxELENBQUE7QUFFTCxDQUFDLEVBL0JTLFNBQVMsS0FBVCxTQUFTLFFBK0JsQiIsImZpbGUiOiJkaXN0L3RtcG91dHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZTogRGF0ZSwgZm9ybWF0OiBzdHJpbmcgPSBcInl5eXktTU0tZGRcIikge1xuICAgICAgICBsZXQgbzphbnkgPSB7XG4gICAgICAgICAgICBcIk0rXCIgOiBkYXRlLmdldE1vbnRoKCkrMSwgLy9tb250aFxuICAgICAgICAgICAgXCJkK1wiIDogZGF0ZS5nZXREYXRlKCksICAgIC8vZGF5XG4gICAgICAgICAgICBcImgrXCIgOiBkYXRlLmdldEhvdXJzKCksICAgLy9ob3VyXG4gICAgICAgICAgICBcIm0rXCIgOiBkYXRlLmdldE1pbnV0ZXMoKSwgLy9taW51dGVcbiAgICAgICAgICAgIFwicytcIiA6IGRhdGUuZ2V0U2Vjb25kcygpLCAvL3NlY29uZFxuICAgICAgICAgICAgXCJxK1wiIDogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpKzMpLzMpLCAgLy9xdWFydGVyXG4gICAgICAgICAgICBcIlNcIiA6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLy9taWxsaXNlY29uZFxuICAgICAgICB9O1xuICAgICAgICBpZigvKHkrKS8udGVzdChmb3JtYXQpKSBmb3JtYXQ9Zm9ybWF0LnJlcGxhY2UoUmVnRXhwLiQxLFxuICAgICAgICAgICAgKGRhdGUuZ2V0RnVsbFllYXIoKStcIlwiKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKTtcbiAgICAgICAgZm9yKHZhciBrIGluIG8paWYobmV3IFJlZ0V4cChcIihcIisgayArXCIpXCIpLnRlc3QoZm9ybWF0KSlcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFJlZ0V4cC4kMSxcbiAgICAgICAgICAgICAgICBSZWdFeHAuJDEubGVuZ3RoPT0xID8gb1trXSA6XG4gICAgICAgICAgICAgICAgICAgIChcIjAwXCIrIG9ba10pLnN1YnN0cigoXCJcIisgb1trXSkubGVuZ3RoKSk7XG4gICAgICAgIHJldHVybiBmb3JtYXQ7XG5cbiAgICB9XG4gICAgXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGV2ZW50VHJhbnNwYXJlbnREaXYoZGl2U2VsZWN0b3I6YW55KSB7XG4gICAgICAgICQoZGl2U2VsZWN0b3IpLmNzcyhcImZpbHRlclwiLFwiQWxwaGEob3BhY2l0eT0wKVwiKTtcbiAgICAgICAgJChkaXZTZWxlY3RvcikuY3NzKFwicG9pbnRlci1ldmVudHNcIixcIm5vbmVcIik7XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNzcyhlbGVtOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICAkKGVsZW0pLmNzcyhuYW1lLHZhbHVlKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gYXR0cihlbGVtOiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gJChlbGVtKS5hdHRyKG5hbWUpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXRhdHRyKGVsZW06IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgICQoZWxlbSkuYXR0cihuYW1lLHZhbHVlKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgY2hpbGQ6IGFueSkge1xuICAgICAgICAkKHBhcmVudCkuYXBwZW5kKGNoaWxkKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZW1wdHlDaGlsZHJlbihlbGVtOmFueSl7XG4gICAgICAgICQoZWxlbSkuZW1wdHkoKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0RWxlbVRleHQoZWxlbTogYW55KSB7XG4gICAgICAgIHJldHVybiAkKGVsZW0pLnRleHQoKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0RWxlbVRleHQoZWxlbTogYW55LCB0ZXh0OnN0cmluZykge1xuICAgICAgICAkKGVsZW0pLnRleHQodGV4dCk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1WYWx1ZShlbGVtOiBhbnkpIHtcbiAgICAgICAgJChlbGVtKS52YWwoKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0RWxlbVZhbHVlKGVsZW06IGFueSwgdmFsdWU6IGFueSkge1xuICAgICAgICAkKGVsZW0pLnZhbCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG9uRXZlbnQoZWxlbTphbnksIGV2ZW50TmFtZTpzdHJpbmcsIGNhbGxiYWNrOkZ1bmN0aW9uKSB7XG4gICAgICAgICQoZWxlbSkub24oZXZlbnROYW1lLGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjay5hcHBseSh0aGlzLGFyZ3VtZW50cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBvZmZFdmVudChlbGVtOiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogYW55KSB7XG4gICAgICAgICQoZWxlbSkub2ZmKGV2ZW50TmFtZSxjYWxsYmFjayk7XG4gICAgfVxuXG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgY2xhc3MgRXZlbnRJdGVtIHtcbiAgICAgICAgbmFtZSA6IHN0cmluZztcbiAgICAgICAgcHJpdmF0ZSBhcmdzOiBhbnk7XG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2tsaXN0Okxpc3Q8KGFyZ3M6YW55KT0+dm9pZD4gPSBuZXcgTGlzdDwoYXJnczphbnkpPT52b2lkPigpO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgYXJnczphbnkpIHtcbiAgICAgICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50QnVzIHtcbiAgICAgICAgY2FsbGJhY2sgOiBMaXN0PEV2ZW50SXRlbT4gPSBuZXcgTGlzdDxFdmVudEl0ZW0+KCk7XG5cbiAgICAgICAgcHViKG5hbWU6c3RyaW5nICxhcmdzOmFueSkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5hZGQobmV3IEV2ZW50SXRlbShuYW1lLCBhcmdzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdWIobmFtZTpzdHJpbmcsIGNhbGxiYWNrOihhcmdzOmFueSk9PnZvaWQpIHtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcmlnZ2VyIGltcGxlbWVudHMgRGlzcG9zYWJsZXtcclxuICAgICAgICBhY3Rpb246QWN0aW9uO1xyXG4gICAgICAgIGFic3RyYWN0IGluaXQoKTp2b2lkO1xyXG4gICAgICAgIG9uVHJpZ2dlcmVkKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbi5leGVjdXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYWJzdHJhY3QgZGlzcG9zZSgpOnZvaWQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250cm9sVHJpZ2dlciBleHRlbmRzIFRyaWdnZXIge1xyXG4gICAgICAgIGNvbnRyb2w6V2lkZ2V0O1xyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGVudW0gSG9yaXpvbkFsaWdubWVudCB7XG4gICAgICAgIFN0cmVjaCxcbiAgICAgICAgTGVmdCxcbiAgICAgICAgUmlnaHQsXG4gICAgICAgIENlbnRlclxuICAgIH1cblxuICAgIGV4cG9ydCBlbnVtIFZlcnRpY2FsQWxpZ25tZW50e1xuICAgICAgICBTdHJlY2gsXG4gICAgICAgIFRvcCxcbiAgICAgICAgQm90dG9tLFxuICAgICAgICBDZW50ZXJcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBEaXN0YW5jZVR5cGV7XG4gICAgICAgIGF1dG8sXG4gICAgICAgIGZpeGVkLFxuICAgICAgICB3ZWlnaHRcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBTdGFja1BhbmVsT3JpZW50YXRpb24ge1xuICAgICAgICBIb3Jpem9uYWwsXG4gICAgICAgIFZlcnRpY2FsXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFNoYWRvd1NldHRpbmdzIHtcbiAgICAgICAgdHlwZTpzdHJpbmc7XG4gICAgICAgIHhvZmZzZXQ6bnVtYmVyO1xuICAgICAgICB5b2Zmc2V0Om51bWJlcjtcbiAgICAgICAgYmx1cjpudW1iZXI7XG4gICAgICAgIHNwcmVhZDpudW1iZXI7XG4gICAgICAgIGNvbG9yOnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3Rvcih4b2Zmc2V0Om51bWJlcix5b2Zmc2V0Om51bWJlcixibHVyOm51bWJlcixzcHJlYWQ6bnVtYmVyLGNvbG9yOnN0cmluZyx0eXBlOnN0cmluZz1cIm91dHNldFwiKSB7XG4gICAgICAgICAgICB0aGlzLnhvZmZzZXQgPSB4b2Zmc2V0O1xuICAgICAgICAgICAgdGhpcy55b2Zmc2V0ID0geW9mZnNldDtcbiAgICAgICAgICAgIHRoaXMuYmx1ciA9IGJsdXI7XG4gICAgICAgICAgICB0aGlzLnNwcmVhZCA9IHNwcmVhZDtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICB0b0JveFNoYXdkb3dTdHJpbmcoKTpzdHJpbmcge1xuICAgICAgICAgICAgbGV0IHMgPSBcIlwiO1xuICAgICAgICAgICAgaWYodGhpcy50eXBlPT1cImluc2V0XCIpIHMrPVwiaW5zZXQgXCI7XG4gICAgICAgICAgICBzKz10aGlzLnhvZmZzZXQrXCJweCBcIjtcbiAgICAgICAgICAgIHMrPXRoaXMueW9mZnNldCtcInB4IFwiO1xuICAgICAgICAgICAgcys9dGhpcy5ibHVyK1wicHggXCI7XG4gICAgICAgICAgICBzKz10aGlzLnNwcmVhZCtcInB4IFwiO1xuICAgICAgICAgICAgcys9dGhpcy5jb2xvcitcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQnJ1c2h7XG4gICAgICAgIGFwcGx5VG9CYWNrZ3JvdW5kKGVsZW06SFRNTEVsZW1lbnQpOnZvaWQ7XG4gICAgICAgIGFwcGx5VG9Cb3JkZXIoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6VGhpY2tuZXNzKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyTGVmdChlbGVtOkhUTUxFbGVtZW50LHRoaWNrbmVzczpudW1iZXIpOnZvaWQ7XG4gICAgICAgIGFwcGx5VG9Cb3JkZXJSaWdodChlbGVtOkhUTUxFbGVtZW50LHRoaWNrbmVzczpudW1iZXIpOnZvaWQ7XG4gICAgICAgIGFwcGx5VG9Cb3JkZXJUb3AoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyQm90dG9tKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOm51bWJlcik6dm9pZDtcbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBUaGlja25lc3N7XG4gICAgICAgIGxlZnQ6bnVtYmVyO1xuICAgICAgICByaWdodDpudW1iZXI7XG4gICAgICAgIHRvcDpudW1iZXI7XG4gICAgICAgIGJvdHRvbTpudW1iZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IobGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgYm90dG9tOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gICAgICAgICAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICAgICAgICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERpc3RhbmNle1xuICAgICAgICB2YWx1ZTpudW1iZXI7XG4gICAgICAgIHR5cGU6RGlzdGFuY2VUeXBlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGU6IERpc3RhbmNlVHlwZSwgdmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG4iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGludGVyZmFjZSBNZXRhRGF0YUFwaXtcblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBTbG90IHtcbiAgICAgICAgY2hpbGRyZW46TGlzdDxXaWRnZXQ+ID0gbmV3IExpc3Q8V2lkZ2V0PigpO1xuICAgICAgICBpc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA6IGJvb2xlYW47XG4gICAgICAgIGlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA6IGJvb2xlYW47XG4gICAgICAgIGNhbGN1bGF0ZWRTbG90V2lkdGggOiBudW1iZXIgPSAwO1xuICAgICAgICBjYWxjdWxhdGVkU2xvdEhlaWdodCA6IG51bWJlciA9IDA7XG4gICAgICAgIGNvbnRhaW5lciA6IENvbnRhaW5lcldpZGdldDtcblxuICAgICAgICBhZGRDaGlsZChjaGlsZCA6IFdpZGdldCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmFkZChjaGlsZCk7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90ID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNoaWxkKGNoaWxkIDogV2lkZ2V0KTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucmVtb3ZlKGNoaWxkKTtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZW1wdHkoKTp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNoaWxkLmNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIXRoaXMuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5jYWxjdWxhdGVkV2lkdGgrdC5tYXJnaW4ubGVmdCt0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgbGV0IG1heHdpZHRoID0gMDtcbiAgICAgICAgICAgICAgICBpZih3aWR0aGxpc3QubGVuZ3RoPjApIG1heHdpZHRoID0gd2lkdGhsaXN0WzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFNsb3RXaWR0aCA9IG1heHdpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk6dm9pZCB7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNoaWxkLmNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCF0aGlzLmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSkge1xuICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5jYWxjdWxhdGVkSGVpZ2h0K3QubWFyZ2luLnRvcCt0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgICAgICBsZXQgbWF4aGVpZ2h0ID0gMDtcbiAgICAgICAgICAgICAgICBpZihoZWlnaHRsaXN0Lmxlbmd0aD4wKSBtYXhoZWlnaHQgPSBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFNsb3RIZWlnaHQgPSBtYXhoZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxheW91dENoaWxkcmVuKCk6dm9pZCB7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYoY2hpbGQuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZC5nZXRSb290RWxlbWVudCgpLFwibGVmdFwiLFwiMHB4XCIpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkLmdldFJvb3RFbGVtZW50KCksXCJyaWdodFwiLFwiMHB4XCIpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3ID0gdGhpcy5jYWxjdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgd3cgPSBjaGlsZC5jYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gKHctd3cpLzI7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZC5nZXRSb290RWxlbWVudCgpLCdsZWZ0Jyx4KydweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZC5nZXRSb290RWxlbWVudCgpLFwibGVmdFwiLFwiMHB4XCIpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSxcInJpZ2h0XCIsXCIwcHhcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcCkge1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSxcInRvcFwiLFwiMHB4XCIpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkLmdldFJvb3RFbGVtZW50KCksXCJib3R0b21cIixcIjBweFwiKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBoID0gdGhpcy5jYWxjdWxhdGVkU2xvdEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhoID0gY2hpbGQuY2FsY3VsYXRlZEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSAoaC1oaCkvMjtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkLmdldFJvb3RFbGVtZW50KCksJ3RvcCcseCsncHgnKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZC5nZXRSb290RWxlbWVudCgpLFwidG9wXCIsXCIwcHhcIik7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZC5nZXRSb290RWxlbWVudCgpLFwiYm90dG9tXCIsXCIwcHhcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2hpbGQuZG9MYXlvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrSXRlbSB7XG4gICAgICAgIGNhbGxiYWNrOkZ1bmN0aW9uO1xuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BlcnR5TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgRXZlbnRDYWxsYmFja0l0ZW0ge1xuICAgICAgICBjYWxsYmFjazpGdW5jdGlvbjtcbiAgICAgICAgZXZlbnROYW1lOnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3RvcihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWaXN1YWxFbGVtZW50IHtcbiAgICAgICAgLy8gTmFtZSBvZiB0aGlzIGNvbnRyb2wuXG4gICAgICAgIG5hbWU6c3RyaW5nO1xuICAgICAgICAvLyBXaWR0aCBvZiB0aGlzIFdpZGdldCwgaXQgY2FuIGJlIGEgZml4IHZhbHVlIG9yIGF1dG8uXG4gICAgICAgIHByaXZhdGUgX3dpZHRoOkRpc3RhbmNlO1xuICAgICAgICAvLyBIZWlnaHQgb2YgdGhpcyBXaWRnZXQsIGl0IGNhbiBiZSBhIGZpeCB2YWx1ZSBvciBhdXRvLlxuICAgICAgICBwcml2YXRlIF9oZWlnaHQ6RGlzdGFuY2U7XG4gICAgICAgIC8vIEhvcml6b25hbCBhbGlnbm1lbnQgb2YgdGhpcyBjb250cm9sIGluIGl0J3MgcGFyZW50IGNvbnRhaW5lclxuICAgICAgICBwcml2YXRlIF9ob3Jpem9uQWxpZ25tZW50IDogSG9yaXpvbkFsaWdubWVudDtcbiAgICAgICAgLy8gVmVydGljYWwgYWxpZ25tZW50IG9mIHRoaXMgY29udHJvbCBpbiBpdCdzIHBhcmVudCBjb250YWluZXJcbiAgICAgICAgcHJpdmF0ZSBfdmVydGljYWxBbGlnbm1lbnQgOiBWZXJ0aWNhbEFsaWdubWVudDtcbiAgICAgICAgLy8gTWFyZ2luIG9mIHRoaXMgY29udHJvbCB0byBpdCdzIHBhcmVudCwgdGhlIHZhbHVlIGluIHRoaWNrbmVzcyBtdXN0IGJlIGEgZml4IHZhbHVlLlxuICAgICAgICBwcml2YXRlIF9tYXJnaW46VGhpY2tuZXNzO1xuICAgICAgICBwcml2YXRlIF9wcmVzc2VkOmJvb2xlYW47XG4gICAgICAgIHByaXZhdGUgX21vdXNlZW50ZXI6Ym9vbGVhbjtcblxuICAgICAgICBwcm90ZWN0ZWQgbm90aWZ5UHJvcGVydGllczpBcnJheTxzdHJpbmc+PVtdO1xuXG4gICAgICAgIHByaXZhdGUgcHJvcENoYW5nZWRDYWxsYmFja3M6TGlzdDxQcm9wZXJ0eUNoYW5nZWRDYWxsYmFja0l0ZW0+O1xuICAgICAgICBwcml2YXRlIGV2ZW50Q2FsbGJhY2tzOkxpc3Q8RXZlbnRDYWxsYmFja0l0ZW0+O1xuXG4gICAgICAgIHBhcmVudFNsb3Q6U2xvdDtcbiAgICAgICAgcGFyZW50OkNvbnRhaW5lcldpZGdldDtcbiAgICAgICAgYWN0dWFsQ29udGFpbmVyOkNvbnRhaW5lcldpZGdldDtcbiAgICAgICAgLy8gcm9vdCBkaXYgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICByb290RWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICAvLyBJbml0IHZhaXJhYmxlcy5cbiAgICAgICAgICAgIHRoaXMuX2hvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdGhpcy5fbWFyZ2luID0gbmV3IFRoaWNrbmVzcygwLDAsMCwwKTtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCw1MCk7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLDUwKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcyA9IG5ldyBMaXN0PFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrSXRlbT4oKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRDYWxsYmFja3MgPSBuZXcgTGlzdDxFdmVudENhbGxiYWNrSXRlbT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB3aWR0aCgpOiBMYXlvdXRMemcuRGlzdGFuY2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHdpZHRoKHZhbHVlOiBMYXlvdXRMemcuRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaGVpZ2h0KCk6IExheW91dEx6Zy5EaXN0YW5jZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGhlaWdodCh2YWx1ZTogTGF5b3V0THpnLkRpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBob3Jpem9uQWxpZ25tZW50KCk6IExheW91dEx6Zy5Ib3Jpem9uQWxpZ25tZW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ob3Jpem9uQWxpZ25tZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGhvcml6b25BbGlnbm1lbnQodmFsdWU6IExheW91dEx6Zy5Ib3Jpem9uQWxpZ25tZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9ob3Jpem9uQWxpZ25tZW50ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdmVydGljYWxBbGlnbm1lbnQoKTogTGF5b3V0THpnLlZlcnRpY2FsQWxpZ25tZW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbEFsaWdubWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB2ZXJ0aWNhbEFsaWdubWVudCh2YWx1ZTogTGF5b3V0THpnLlZlcnRpY2FsQWxpZ25tZW50KSB7XG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbEFsaWdubWVudCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG1hcmdpbigpOiBMYXlvdXRMemcuVGhpY2tuZXNzIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXJnaW47XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgbWFyZ2luKHZhbHVlOiBMYXlvdXRMemcuVGhpY2tuZXNzKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJnaW4gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBwcmVzc2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ByZXNzZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcHJlc3NlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5fcHJlc3NlZCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG1vdXNlZW50ZXIoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW91c2VlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBtb3VzZWVudGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3VzZWVudGVyID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JjZVJlZnJlc2goKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgIHRoaXMuZG9MYXlvdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCB0aGUgcm9vdCBlbGVtZW50IG9mIHRoaXMgY29udHJvbC5cbiAgICAgICAgYWJzdHJhY3QgZ2V0Um9vdEVsZW1lbnQoKTpIVE1MRWxlbWVudDtcblxuICAgICAgICAvLyBBc3NlbWJsZSBodG1sIGVsZW1lbnRzIG9mIHRoaXMgY29udHJvbC5cbiAgICAgICAgYXNzZW1ibGVEb20oKTp2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkanVzdCBzdHlsZXMgaHRtbCBlbGVtZW50cyBvZiB0aGlzIGNvbnRyb2wuXG4gICAgICAgIGRvTGF5b3V0KCk6dm9pZHtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFN0YXRlUHJvcGVydGllcygpOkFycmF5PHN0cmluZz4ge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Tm90aWZ5UHJvcGVydGllcygpOkFycmF5PHN0cmluZz4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm90aWZ5UHJvcGVydGllcztcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKHByb3BlcnROYW1lOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcy5hZGQoXG4gICAgICAgICAgICAgICAgbmV3IFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrSXRlbShwcm9wZXJ0TmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIoY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgbGV0IGVsZW06UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2tJdGVtID0gbnVsbDtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3BjYWxsYmFja2l0ZW0gb2YgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIGlmKHByb3BjYWxsYmFja2l0ZW0uY2FsbGJhY2s9PWNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBwcm9wY2FsbGJhY2tpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGVsZW0hPW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tzLnJlbW92ZShlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFN0YXRlQ2hhbmdlZExpc3RlbmVyKHByb3BlcnR5TmFtZTpzdHJpbmcsIGNhbGxiYWNrOkZ1bmN0aW9uKTp2b2lkIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlU3RhdGVDaGFuZ2VkTGlzdGVuZXIoY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuXG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgbm90aWZ5UHJvcGVydHlDaGFuZ2VkKHByb3BlcnR5TmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3BjYWxsYmFja2l0ZW0gb2YgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIGlmKHByb3BjYWxsYmFja2l0ZW0ucHJvcGVydHlOYW1lPT1wcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvcGNhbGxiYWNraXRlbS5jYWxsYmFjaykgcHJvcGNhbGxiYWNraXRlbS5jYWxsYmFjayhwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5ldmVudENhbGxiYWNrcy5hZGQoXG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50Q2FsbGJhY2tJdGVtKGV2ZW50TmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihjYWxsYmFjazpGdW5jdGlvbik6dm9pZCB7XG4gICAgICAgICAgICBsZXQgZXZlbnRzID0gdGhpcy5ldmVudENhbGxiYWNrcy5maWx0ZXIodD0+dC5jYWxsYmFjaz09Y2FsbGJhY2spO1xuICAgICAgICAgICAgaWYoZXZlbnRzLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudENhbGxiYWNrcy5yZW1vdmUoZXZlbnRzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCByYWlzZUV2ZW50KGV2ZW50TmFtZTpzdHJpbmcsYXJnczpBcnJheTxhbnk+PVtdKXtcbiAgICAgICAgICAgIGZvciAobGV0IGV2ZW50Y2FsbGJhY2tpdGVtIG9mIHRoaXMuZXZlbnRDYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBpZihldmVudGNhbGxiYWNraXRlbS5ldmVudE5hbWU9PWV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihldmVudGNhbGxiYWNraXRlbS5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZ2FyciA9IFtldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYXJnIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdhcnIucHVzaChhcmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRjYWxsYmFja2l0ZW0uY2FsbGJhY2suYXBwbHkodGhpcyxhcmdhcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gV2lkZ2V0IGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIG9mIGFsbCB0aGUgdmlzdWFsIGNvbXBvbmVudHMuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdpZGdldCBleHRlbmRzIFZpc3VhbEVsZW1lbnQgaW1wbGVtZW50cyBEaXNwb3NhYmxle1xuXG4gICAgICAgIC8vIEJhY2tncm91bmQgb2YgdGhpcyBjb250cm9sLCBpdCBjYW4gYmUgYSBzb2xpZCBjb2xvciwgb3IgYSBncmFkaWVudCBjb2xvciAsIG9yIGEgcGljdHVyZS5cbiAgICAgICAgcHJvdGVjdGVkIF9maWxsOkJydXNoO1xuICAgICAgICAvLyBCb3JkZXIgb2YgdGhpcyBjb250cm9sLCBpdCBjYW4gYmUgYSBzb2xpZCBjb2xvciwgb3IgYSBncmFkaWVudCBjb2xvciAsIG9yIGEgcGljdHVyZS5cbiAgICAgICAgcHJvdGVjdGVkIF9zdHJva2U6QnJ1c2g7XG4gICAgICAgIC8vIFRoaWNrbmVzcyBvZiB0aGlzIGNvbnRyb2wncyBib3JkZXIsIHRoZSB2YWx1ZSBpbiB0aGlja25lc3MgbXVzdCBiZSBhIGZpeCB2YWx1ZS5cbiAgICAgICAgcHJvdGVjdGVkIF9zdHJva2VUaGlja25lc3M6VGhpY2tuZXNzO1xuXG4gICAgICAgIHByb3RlY3RlZCBfc2hhZG93OlNoYWRvd1NldHRpbmdzO1xuXG4gICAgICAgIGNhbGN1bGF0ZWRXaWR0aDogbnVtYmVyO1xuICAgICAgICBjYWxjdWxhdGVkSGVpZ2h0OiBudW1iZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpe1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKDAsMCwwLDApO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSAwO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBmaWxsKCk6IExheW91dEx6Zy5CcnVzaCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmlsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBmaWxsKHZhbHVlOiBMYXlvdXRMemcuQnJ1c2gpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX2ZpbGwgIT0gdmFsdWUpIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2VkKFwiZmlsbFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGwgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBzdHJva2UoKTogTGF5b3V0THpnLkJydXNoIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJva2U7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgc3Ryb2tlKHZhbHVlOiBMYXlvdXRMemcuQnJ1c2gpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3N0cm9rZSAhPSB2YWx1ZSkgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQoXCJzdHJva2VcIik7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2UgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBzdHJva2VUaGlja25lc3MoKTogTGF5b3V0THpnLlRoaWNrbmVzcyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Ryb2tlVGhpY2tuZXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHN0cm9rZVRoaWNrbmVzcyh2YWx1ZTogTGF5b3V0THpnLlRoaWNrbmVzcykge1xuICAgICAgICAgICAgaWYodGhpcy5fc3Ryb2tlVGhpY2tuZXNzICE9IHZhbHVlKSB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChcInN0cm9rZVRoaWNrbmVzc1wiKTtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZVRoaWNrbmVzcyA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHNoYWRvdygpOiBMYXlvdXRMemcuU2hhZG93U2V0dGluZ3Mge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBzaGFkb3codmFsdWU6U2hhZG93U2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3NoYWRvdz12YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IGNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpOnZvaWQ7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOnZvaWQ7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FsY3VsYXRlV2lkdGhGcm9tQm90dG9tKCk6dm9pZDtcblxuICAgICAgICBhYnN0cmFjdCBjYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk6dm9pZDtcblxuICAgICAgICBhYnN0cmFjdCBkaXNwb3NlKCk6IHZvaWQ7XG5cbiAgICB9XG5cbiAgICAvLyBUaGUgcHVycG9zZSBvZiB0aGUgY29udGFpbmVyIGlzIHRvIHB1dCBzdWIgY29udHJvbHMgdG9nZXRoZXIsXG4gICAgLy8gYW5kIHRoZSBzeXN0ZW0gcHJvdmlkZXMgbXVsdGlwbGUgbGF5b3V0IGNvbnRhaW5lcnMgZHVlIHRvIGFjdHVhbCByZXF1aXJlbWVudHMuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbnRhaW5lcldpZGdldCBleHRlbmRzIFdpZGdldHtcbiAgICAgICAgY2hpbGRyZW46TGlzdDxXaWRnZXQ+O1xuICAgICAgICBwcm90ZWN0ZWQgc2xvdHMgOiBMaXN0PFNsb3Q+O1xuXG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG5ldyBMaXN0PFdpZGdldD4oKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdHMgPSBuZXcgTGlzdDxTbG90PigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2hpbGQoY29udHJvbDpXaWRnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uYWRkKGNvbnRyb2wpO1xuICAgICAgICAgICAgY29udHJvbC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGQoY29udHJvbDpXaWRnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucmVtb3ZlKGNvbnRyb2wpO1xuICAgICAgICAgICAgY29udHJvbC5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJDaGlsZCgpOnZvaWR7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50U2xvdCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmNsZWFyKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc2xvdC5sYXlvdXRDaGlsZHJlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHRlc3RMaXN0KCk6dm9pZHtcblxuICAgICAgICBsZXQgbGl0ZXJhbDEgPSBuZXcgTGF5b3V0THpnLlRleHRWaWV3KCdhJywnMTExMTEnKTtcbiAgICAgICAgbGV0IGxpdGVyYWwyID0gbmV3IExheW91dEx6Zy5UZXh0VmlldygnYScsJzIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyJyk7XG4gICAgICAgIGxldCBsaXRlcmFsMyA9IG5ldyBMYXlvdXRMemcuVGV4dFZpZXcoJ2EnLCczMzMzMzMzMzMzJyk7XG5cblxuICAgICAgICBsZXQgbHN0ID0gbmV3IExpc3Q8VGV4dFZpZXc+KCk7XG4gICAgICAgIGxzdC5hZGQobGl0ZXJhbDEpO1xuICAgICAgICBsc3QuYWRkKGxpdGVyYWwyKTtcbiAgICAgICAgbHN0LmFkZChsaXRlcmFsMyk7XG4gICAgICAgIGxzdC5jbGVhcigpO1xuICAgIH1cblxuXG4gICAgZXhwb3J0IGNsYXNzIExpc3Q8VD4gZXh0ZW5kcyBBcnJheTxUPntcblxuICAgICAgICBhZGQoaXRlbTpUKSA6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEFsbChpdGVtczpBcnJheTxUPikgOiB2b2lkIHtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8aXRlbXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZShpdGVtOlQpOnZvaWQge1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VyaXRlbSA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgaWYoY3VyaXRlbT09aXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUFsbChpdGVtczpBcnJheTxUPikgOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8aXRlbXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhcigpIDp2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLnNwbGljZSgwLHRoaXMubGVuZ3RoKTtcbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHRlc3RtYXAoKTp2b2lke1xuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcDxzdHJpbmcsbnVtYmVyPigpO1xuICAgICAgICBtYXAucHV0KCdhJywzMyk7XG4gICAgICAgIG1hcC5wdXQoJ2InLDQzKTtcbiAgICAgICAgbGV0IGIgPSBtYXAuZ2V0KCdiJyk7XG4gICAgICAgIGxldCBhID0gbWFwLmdldCgnYScpO1xuICAgICAgICBtYXAuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBjbGFzcyBNYXBJdGVtPFRLZXksVFZhbHVlPiB7XG4gICAgICAgIGtleSA6IFRLZXk7XG4gICAgICAgIHZhbHVlIDogVFZhbHVlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGtleTogVEtleSwgdmFsdWU6IFRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgTWFwPFRLZXksVFZhbHVlPiBleHRlbmRzIEFycmF5PE1hcEl0ZW08VEtleSxUVmFsdWU+PntcblxuICAgICAgICBwdXQoa2V5OlRLZXksIHZhbHVlOlRWYWx1ZSkgOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChuZXcgTWFwSXRlbShrZXksdmFsdWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldChrZXk6VEtleSkgOiBUVmFsdWUgfCBhbnkge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0ua2V5PT1rZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyKCkgOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoMCx0aGlzLmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluc0tleShrZXk6VEtleSk6Ym9vbGVhbiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5rZXk9PWtleSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBTb2xpZENvbG9yQnJ1c2ggaW1wbGVtZW50cyBCcnVzaHtcbiAgICAgICAgY29sb3I6c3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb2xvcjpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JhY2tncm91bmQoZWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYmFja2dyb3VuZC1jb2xvclwiLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXIoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogTGF5b3V0THpnLlRoaWNrbmVzcyk6IHZvaWQge1xuICAgICAgICAgICAgY3NzKGVsZW0sXCJib3JkZXItY29sb3JcIiwgdGhpcy5jb2xvcik7XG5cbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLWxlZnQtd2lkdGhcIiwgdGhpY2tuZXNzLmxlZnQrXCJweFwiKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLXJpZ2h0LXdpZHRoXCIsIHRoaWNrbmVzcy5yaWdodCtcInB4XCIpO1xuICAgICAgICAgICAgY3NzKGVsZW0sXCJib3JkZXItdG9wLXdpZHRoXCIsIHRoaWNrbmVzcy50b3ArXCJweFwiKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLWJvdHRvbS13aWR0aFwiLCB0aGlja25lc3MuYm90dG9tK1wicHhcIik7XG5cbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLWxlZnQtc3R5bGVcIiwgXCJzb2xpZFwiKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLXJpZ2h0LXN0eWxlXCIsIFwic29saWRcIik7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci10b3Atc3R5bGVcIiwgXCJzb2xpZFwiKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLWJvdHRvbS1zdHlsZVwiLCBcInNvbGlkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1jb2xvclwiLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLWxlZnQtd2lkdGhcIiwgdGhpY2tuZXNzK1wicHhcIik7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1sZWZ0LXN0eWxlXCIsIFwic29saWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1jb2xvclwiLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLXJpZ2h0LXdpZHRoXCIsIHRoaWNrbmVzcytcInB4XCIpO1xuICAgICAgICAgICAgY3NzKGVsZW0sXCJib3JkZXItcmlnaHQtc3R5bGVcIiwgXCJzb2xpZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJUb3AoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICBjc3MoZWxlbSxcImJvcmRlci1jb2xvclwiLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLXRvcC13aWR0aFwiLCB0aGlja25lc3MrXCJweFwiKTtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLXRvcC1zdHlsZVwiLCBcInNvbGlkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIGNzcyhlbGVtLFwiYm9yZGVyLWNvbG9yXCIsIHRoaXMuY29sb3IpO1xuICAgICAgICAgICAgY3NzKGVsZW0sXCJib3JkZXItYm90dG9tLXdpZHRoXCIsIHRoaWNrbmVzcytcInB4XCIpO1xuICAgICAgICAgICAgY3NzKGVsZW0sXCJib3JkZXItYm90dG9tLXN0eWxlXCIsIFwic29saWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGNsYXNzIEltYWdlQ29sb3JCcnVzaCBpbXBsZW1lbnRzIEJydXNoe1xuICAgICAgICBjb2xvcjpzdHJpbmc7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbG9yOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQmFja2dyb3VuZChlbGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuXG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IExheW91dEx6Zy5UaGlja25lc3MpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJMZWZ0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclJpZ2h0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclRvcChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJCb3R0b20oZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGNsYXNzIEdyYWRpZW50Q29sb3JCcnVzaCBpbXBsZW1lbnRzIEJydXNoe1xuICAgICAgICBjb2xvcjpzdHJpbmc7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbG9yOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQmFja2dyb3VuZChlbGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlcihlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBMYXlvdXRMemcuVGhpY2tuZXNzKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyTGVmdChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJSaWdodChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJUb3AoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyQm90dG9tKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgV2lkZ2V0QmFzZSBleHRlbmRzIFdpZGdldCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy5yb290RWxlbSxcImJveC1zaXppbmdcIixcImJvcmRlci1ib3hcIik7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMucm9vdEVsZW0sXCJwb2ludGVyLWV2ZW50c1wiLFwiYWxsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBUZXh0VmlldyBleHRlbmRzIFdpZGdldEJhc2Uge1xuXG4gICAgICAgIHByaXZhdGUgX3RleHQ6c3RyaW5nO1xuICAgICAgICBwcml2YXRlIF9zZWxlY3RhYmxlOmJvb2xlYW47XG4gICAgICAgIHByaXZhdGUgX3dvcmRXcmFwOmJvb2xlYW47XG4gICAgICAgIHByaXZhdGUgc3BhbkVsZW06SFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLHRleHQ6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnRpZXMucHVzaChcInRleHRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdGV4dCgpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RhYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHNlbGVjdGFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGFibGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB3b3JkV3JhcCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93b3JkV3JhcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB3b3JkV3JhcCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5fd29yZFdyYXAgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIHN1cGVyLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgICAgICBzZXRhdHRyKHRoaXMucm9vdEVsZW0sJ2xheW91dC10eXBlJywnVGV4dFZpZXcnKTtcbiAgICAgICAgICAgIHNldGF0dHIodGhpcy5yb290RWxlbSwnbGF5b3V0LW5hbWUnLHRoaXMubmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zcGFuRWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJTUEFOXCIpO1xuICAgICAgICAgICAgZW1wdHlDaGlsZHJlbih0aGlzLmdldFJvb3RFbGVtZW50KCkpO1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ3dpZHRoJyx0aGlzLndpZHRoLnZhbHVlKydweCcpO1xuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCdoZWlnaHQnLHRoaXMuaGVpZ2h0LnZhbHVlKydweCcpO1xuICAgICAgICAgICAgYXBwZW5kQ2hpbGQodGhpcy5nZXRSb290RWxlbWVudCgpLHRoaXMuc3BhbkVsZW0pO1xuICAgICAgICAgICAgc2V0RWxlbVRleHQodGhpcy5zcGFuRWxlbSx0aGlzLl90ZXh0KTtcbiAgICAgICAgICAgIGlmKHRoaXMuX3dvcmRXcmFwKVxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLnNwYW5FbGVtLCd3b3JkLWJyZWFrJywnYnJlYWstYWxsJyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuc3BhbkVsZW0sJ3dvcmQtYnJlYWsnLCdub3JtYWwnKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCd3aWR0aCcsdGhpcy5jYWxjdWxhdGVkV2lkdGgrJ3B4Jyk7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCdoZWlnaHQnLHRoaXMuY2FsY3VsYXRlZEhlaWdodCsncHgnKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIik7XG4gICAgICAgICAgICBpZighdGhpcy5fc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLnNwYW5FbGVtLFwidXNlci1zZWxlY3RcIixcIm5vbmVcIik7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuc3BhbkVsZW0sXCJ1c2VyLXNlbGVjdFwiLFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUmJnRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy5zcGFuRWxlbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlJiZ0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5zcGFuRWxlbS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy5zcGFuRWxlbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLnNwYW5FbGVtLm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBSZWN0IGV4dGVuZHMgV2lkZ2V0QmFzZSB7XG5cbiAgICAgICAgcHJpdmF0ZSBfcmFkaXVzX2JvdHRvbV9sZWZ0Om51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfcmFkaXVzX2JvdHRvbV9yaWdodDpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3JhZGl1c190b3BfbGVmdDpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3JhZGl1c190b3BfcmlnaHQ6bnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9vcGFjaXR5Om51bWJlcjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX2JvdHRvbV9sZWZ0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c19ib3R0b21fcmlnaHQgPSAwO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX3RvcF9sZWZ0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c190b3BfcmlnaHQgPSAwO1xuICAgICAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldCByYWRpdXNfYm90dG9tX2xlZnQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXNfYm90dG9tX2xlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcmFkaXVzX2JvdHRvbV9sZWZ0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c19ib3R0b21fbGVmdCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHJhZGl1c19ib3R0b21fcmlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXNfYm90dG9tX3JpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHJhZGl1c19ib3R0b21fcmlnaHQodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX2JvdHRvbV9yaWdodCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHJhZGl1c190b3BfbGVmdCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1c190b3BfbGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCByYWRpdXNfdG9wX2xlZnQodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX3RvcF9sZWZ0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgcmFkaXVzX3RvcF9yaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1c190b3BfcmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcmFkaXVzX3RvcF9yaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfdG9wX3JpZ2h0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcmFkaXVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c19ib3R0b21fbGVmdCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX2JvdHRvbV9yaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX3RvcF9sZWZ0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfdG9wX3JpZ2h0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgb3BhY2l0eSgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29wYWNpdHk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgb3BhY2l0eSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBsZXQgZWxlbSA9IHN1cGVyLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgICAgICBzZXRhdHRyKGVsZW0sICdsYXlvdXQtdHlwZScsJ1JlY3QnKTtcbiAgICAgICAgICAgIHNldGF0dHIoZWxlbSwgJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ3dpZHRoJyx0aGlzLmNhbGN1bGF0ZWRXaWR0aCsncHgnKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ2hlaWdodCcsdGhpcy5jYWxjdWxhdGVkSGVpZ2h0KydweCcpO1xuICAgICAgICAgICAgLy8gc3Ryb2tlIGFuZCBmaWxsXG4gICAgICAgICAgICBpZih0aGlzLmZpbGwpIHRoaXMuZmlsbC5hcHBseVRvQmFja2dyb3VuZCh0aGlzLnJvb3RFbGVtKTtcbiAgICAgICAgICAgIGlmKHRoaXMuc3Ryb2tlKSB0aGlzLnN0cm9rZS5hcHBseVRvQm9yZGVyKHRoaXMucm9vdEVsZW0sdGhpcy5zdHJva2VUaGlja25lc3MpO1xuICAgICAgICAgICAgLy8gcmFkaXVzXG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLFwiYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1c1wiLHRoaXMucmFkaXVzX2JvdHRvbV9sZWZ0K1wicHhcIik7XG4gICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLFwiYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXNcIix0aGlzLnJhZGl1c19ib3R0b21fcmlnaHQrXCJweFwiKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksXCJib3JkZXItdG9wLWxlZnQtcmFkaXVzXCIsdGhpcy5yYWRpdXNfdG9wX2xlZnQrXCJweFwiKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksXCJib3JkZXItdG9wLXJpZ2h0LXJhZGl1c1wiLHRoaXMucmFkaXVzX3RvcF9yaWdodCtcInB4XCIpO1xuICAgICAgICAgICAgLy8gb3BhY2l0eVxuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSxcIm9wYWNpdHlcIix0aGlzLm9wYWNpdHkpO1xuICAgICAgICAgICAgLy8gc2hhZG93XG4gICAgICAgICAgICBpZih0aGlzLnNoYWRvdykge1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksXCJib3gtc2hhZG93XCIsdGhpcy5zaGFkb3cudG9Cb3hTaGF3ZG93U3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QmJnRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSYmdGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy5wYXJlbnRTbG90LmNhbGN1bGF0ZWRTbG90V2lkdGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdCYmdGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSYmdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1cGVyLmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBJbWFnZVZpZXcgZXh0ZW5kcyBXaWRnZXRCYXNlIHtcblxuICAgICAgICBpbWdFbGVtOkhUTUxFbGVtZW50O1xuICAgICAgICBzcmM6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGVtcHR5Q2hpbGRyZW4odGhpcy5nZXRSb290RWxlbWVudCgpKTtcblxuICAgICAgICAgICAgaWYodGhpcy5pbWdFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWdFbGVtID0gY3JlYXRlRWxlbWVudChcIklNQUdFXCIpO1xuICAgICAgICAgICAgICAgIHNldGF0dHIodGhpcy5pbWdFbGVtLCdzcmMnLHRoaXMuc3JjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFwcGVuZENoaWxkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSx0aGlzLmltZ0VsZW0pO1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCd3aWR0aCcsdGhpcy53aWR0aC52YWx1ZSsncHgnKTtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy5pbWdFbGVtLCd3aWR0aCcsdGhpcy53aWR0aC52YWx1ZSsncHgnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLmltZ0VsZW0sJ3dpZHRoJywnMTAwJScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy5nZXRSb290RWxlbWVudCgpLCdoZWlnaHQnLHRoaXMuaGVpZ2h0LnZhbHVlKydweCcpO1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLmltZ0VsZW0sJ2hlaWdodCcsdGhpcy5oZWlnaHQudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy5pbWdFbGVtLCdoZWlnaHQnLCcxMDAlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250YWluZXJCYXNlIGV4dGVuZHMgQ29udGFpbmVyV2lkZ2V0IHtcblxuICAgICAgICByb290RWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbGN1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVXaWR0aF9hdXRvKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlSGVpZ2h0X2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVIZWlnaHRfYXV0bygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IGVzdGltYXRlV2lkdGhfYXV0bygpOm51bWJlciA7XG5cbiAgICAgICAgYWJzdHJhY3QgZXN0aW1hdGVIZWlnaHRfYXV0bygpOm51bWJlciA7XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYodGhpcy5yb290RWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsZW0gPSBjcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBCb3JkZXIgZXh0ZW5kcyBDb250YWluZXJXaWRnZXQge1xuXG4gICAgICAgIHByb3RlY3RlZCBtYWluU2xvdCA6IFNsb3Q7XG4gICAgICAgIHByb3RlY3RlZCBjaGlsZFdyYXBwZXJzTWFwOiBNYXA8V2lkZ2V0LEhUTUxFbGVtZW50PjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLm1haW5TbG90ID0gbmV3IFNsb3QoKTtcbiAgICAgICAgICAgIHRoaXMubWFpblNsb3QuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuY2hpbGRXcmFwcGVyc01hcCA9IG5ldyBNYXA8V2lkZ2V0LCBIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdHMucHVzaCh0aGlzLm1haW5TbG90KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy5yb290RWxlbSwncG9pbnRlci1ldmVudHMnLCdhbGwnKTtcbiAgICAgICAgICAgICAgICBzZXRhdHRyKHRoaXMucm9vdEVsZW0sJ2xheW91dC10eXBlJywnQm9yZGVyJyk7XG4gICAgICAgICAgICAgICAgc2V0YXR0cih0aGlzLnJvb3RFbGVtLCdsYXlvdXQtbmFtZScsdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RFbGVtO1xuICAgICAgICB9XG5cblxuICAgICAgICBhZGRDaGlsZChjb250cm9sOiBMYXlvdXRMemcuV2lkZ2V0KTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgICAgIHRoaXMubWFpblNsb3QuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgZW1wdHlDaGlsZHJlbih0aGlzLmdldFJvb3RFbGVtZW50KCkpO1xuXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXJEaXYgPSBjcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICAgICAgICAgIGNzcyh3cmFwcGVyRGl2LCdwb2ludGVyLWV2ZW50cycsJ25vbmUnKTtcbiAgICAgICAgICAgICAgICBzZXRhdHRyKHdyYXBwZXJEaXYsJ2xheW91dC10YWcnLCd3cmFwcGVyJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZFdyYXBwZXJzTWFwLnB1dChjaGlsZCx3cmFwcGVyRGl2KTtcbiAgICAgICAgICAgICAgICBhcHBlbmRDaGlsZCh0aGlzLmdldFJvb3RFbGVtZW50KCksd3JhcHBlckRpdik7XG4gICAgICAgICAgICAgICAgYXBwZW5kQ2hpbGQod3JhcHBlckRpdixjaGlsZC5nZXRSb290RWxlbWVudCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwnd2lkdGgnLHRoaXMuY2FsY3VsYXRlZFdpZHRoKydweCcpO1xuICAgICAgICAgICAgY3NzKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwnaGVpZ2h0Jyx0aGlzLmNhbGN1bGF0ZWRIZWlnaHQrJ3B4Jyk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHNsb3QuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdyYXBwZXJEaXYgPSB0aGlzLmNoaWxkV3JhcHBlcnNNYXAuZ2V0KGNoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICBjc3Mod3JhcHBlckRpdiwncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgICAgICBjc3Mod3JhcHBlckRpdiwnbGVmdCcsY2hpbGQubWFyZ2luLmxlZnQrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh3cmFwcGVyRGl2LCdyaWdodCcsY2hpbGQubWFyZ2luLnJpZ2h0KydweCcpO1xuICAgICAgICAgICAgICAgICAgICBjc3Mod3JhcHBlckRpdiwndG9wJyxjaGlsZC5tYXJnaW4udG9wKydweCcpO1xuICAgICAgICAgICAgICAgICAgICBjc3Mod3JhcHBlckRpdiwnYm90dG9tJyxjaGlsZC5tYXJnaW4uYm90dG9tKydweCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzbG90LmxheW91dENoaWxkcmVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90V2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUmJnRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMubWFpblNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g57uI5q2i5ZCR5LiL6K6h566X77yM5LuO5LiL5ZCR5LiK6K6h566XXG4gICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZT1mYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5jYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QmJnRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUmJnRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5tYWluU2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDnu4jmraLlkJHkuIvorqHnrpfvvIzku47kuIvlkJHkuIrorqHnrpdcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZT1mYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVkSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tQm90dG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykgIHtcbiAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLm1haW5TbG90LmNhbGN1bGF0ZWRTbG90V2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSAge1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5tYWluU2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgVmxpbmVhcmxheW91dCBleHRlbmRzIENvbnRhaW5lcldpZGdldHtcbiAgICAgICAgcHJvdGVjdGVkIHNsb3RNYXAgOiBNYXA8U2xvdCxEaXN0YW5jZT47XG4gICAgICAgIHByb3RlY3RlZCBzbG90V3JhcHBlcnNNYXAgOiBNYXA8U2xvdCxIVE1MRWxlbWVudD47XG4gICAgICAgIHByb3RlY3RlZCBjaGlsZFdyYXBwZXJzTWFwOiBNYXA8V2lkZ2V0LEhUTUxFbGVtZW50PjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zbG90TWFwID0gbmV3IE1hcDxTbG90LCBEaXN0YW5jZT4oKTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRXcmFwcGVyc01hcCA9IG5ldyBNYXA8V2lkZ2V0LCBIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdFdyYXBwZXJzTWFwID0gbmV3IE1hcDxTbG90LEhUTUxFbGVtZW50PigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2VsbChkaXN0YW5jZTpEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAucHV0KHNsb3QsZGlzdGFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0Q2VsbChjb250cm9sOldpZGdldCwgY2VsbEluZGV4Om51bWJlcikge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbY2VsbEluZGV4XTtcbiAgICAgICAgICAgICAgICBzbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICBlbXB0eUNoaWxkcmVuKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3RXcmFwcGVyRGl2ID0gY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ3BvaW50ZXItZXZlbnRzJywnbm9uZScpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHNsb3QuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkV3JhcHBlckRpdiA9IGNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZFdyYXBwZXJEaXYsJ3BvaW50ZXItZXZlbnRzJywnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICBhcHBlbmRDaGlsZChjaGlsZFdyYXBwZXJEaXYsY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSk7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZENoaWxkKHNsb3RXcmFwcGVyRGl2LGNoaWxkV3JhcHBlckRpdik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRXcmFwcGVyc01hcC5wdXQoY2hpbGQsY2hpbGRXcmFwcGVyRGl2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90V3JhcHBlcnNNYXAucHV0KHNsb3Qsc2xvdFdyYXBwZXJEaXYpO1xuICAgICAgICAgICAgICAgIGFwcGVuZENoaWxkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSxzbG90V3JhcHBlckRpdik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ3dpZHRoJyx0aGlzLmNhbGN1bGF0ZWRXaWR0aCsncHgnKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ2hlaWdodCcsdGhpcy5jYWxjdWxhdGVkSGVpZ2h0KydweCcpO1xuXG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcblxuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIGZpeFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdFdyYXBwZXJEaXYgPSB0aGlzLnNsb3RXcmFwcGVyc01hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcblxuICAgICAgICAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgY3NzKHNsb3RXcmFwcGVyRGl2LCd0b3AnLHBvcysncHgnKTtcbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ2hlaWdodCcsY2VsbGgrJ3B4Jyk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBzbG90LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZFdyYXBwZXJEaXYgPSB0aGlzLmNoaWxkV3JhcHBlcnNNYXAuZ2V0KGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkV3JhcHBlckRpdiwncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGRXcmFwcGVyRGl2LCdsZWZ0JyxjaGlsZC5tYXJnaW4ubGVmdCsncHgnKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkV3JhcHBlckRpdiwncmlnaHQnLGNoaWxkLm1hcmdpbi5yaWdodCsncHgnKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkV3JhcHBlckRpdiwndG9wJyxjaGlsZC5tYXJnaW4udG9wKydweCcpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGRXcmFwcGVyRGl2LCdib3R0b20nLGNoaWxkLm1hcmdpbi5ib3R0b20rJ3B4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNsb3QubGF5b3V0Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICBwb3MrPWNlbGxoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdCYmdGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlJiZ0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g57uI5q2i5ZCR5LiL6K6h566X77yM5LuO5LiL5ZCR5LiK6K6h566XXG4gICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZT1mYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5jYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTogdm9pZCB7XG5cbiAgICAgICAgICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuICAgICAgICAgICAgbGV0IGZpeFN1bSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuXG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgZml4U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbGggPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxoID0gKHRoaXMuaGVpZ2h0LnZhbHVlIC0gZml4U3VtKSogY2VsbERlZmluYXRpb24udmFsdWUgLyB3ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0ID0gY2VsbGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlJiZ0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQ7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbGggPSAodGhpcy5wYXJlbnRTbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0IC0gZml4U3VtKSogY2VsbERlZmluYXRpb24udmFsdWUgLyB3ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0ID0gY2VsbGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g57uI5q2i5ZCR5LiL6K6h566X77yM5LuO5LiL5ZCR5LiK6K6h566XXG4gICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGU9ZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICBzbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuY2FsY3VsYXRlZEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpICB7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuc2xvdHMubWFwKHQ9PnQuY2FsY3VsYXRlZFNsb3RXaWR0aCk7XG4gICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgIGxldCBtYXh3aWR0aCA9IDA7XG4gICAgICAgICAgICBpZih3aWR0aGxpc3QubGVuZ3RoPjApIG1heHdpZHRoID0gd2lkdGhsaXN0WzBdO1xuXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IG1heHdpZHRoO1xuXG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSAge1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc3VtID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgIHN1bSs9c2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHN1bTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290RWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMucm9vdEVsZW0sJ3BvaW50ZXItZXZlbnRzJywnYWxsJyk7XG4gICAgICAgICAgICAgICAgc2V0YXR0cih0aGlzLnJvb3RFbGVtLCdsYXlvdXQtdHlwZScsJ1ZsaW5lYXJsYXlvdXQnKTtcbiAgICAgICAgICAgICAgICBzZXRhdHRyKHRoaXMucm9vdEVsZW0sJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuXG5cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIEhsaW5lYXJsYXlvdXQgZXh0ZW5kcyBDb250YWluZXJXaWRnZXR7XG4gICAgICAgIHByb3RlY3RlZCBzbG90TWFwIDogTWFwPFNsb3QsRGlzdGFuY2U+O1xuICAgICAgICBwcm90ZWN0ZWQgc2xvdFdyYXBwZXJzTWFwIDogTWFwPFNsb3QsSFRNTEVsZW1lbnQ+O1xuICAgICAgICBwcm90ZWN0ZWQgY2hpbGRXcmFwcGVyc01hcDogTWFwPFdpZGdldCxIVE1MRWxlbWVudD47XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdE1hcCA9IG5ldyBNYXA8U2xvdCwgRGlzdGFuY2U+KCk7XG4gICAgICAgICAgICB0aGlzLmNoaWxkV3JhcHBlcnNNYXAgPSBuZXcgTWFwPFdpZGdldCwgSFRNTEVsZW1lbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLnNsb3RXcmFwcGVyc01hcCA9IG5ldyBNYXA8U2xvdCxIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENlbGwoZGlzdGFuY2U6RGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBzbG90ID0gbmV3IFNsb3QoKTtcbiAgICAgICAgICAgIHNsb3QuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuYWRkKHNsb3QpO1xuICAgICAgICAgICAgdGhpcy5zbG90TWFwLnB1dChzbG90LGRpc3RhbmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldENlbGwoY29udHJvbDpXaWRnZXQsIGNlbGxJbmRleDpudW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjb250cm9sKTtcbiAgICAgICAgICAgIGlmKGlkeD4tMSl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2NlbGxJbmRleF07XG4gICAgICAgICAgICAgICAgc2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgZW1wdHlDaGlsZHJlbih0aGlzLmdldFJvb3RFbGVtZW50KCkpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpe1xuICAgICAgICAgICAgICAgIGxldCBzbG90V3JhcHBlckRpdiA9IGNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG5cbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ3BvaW50ZXItZXZlbnRzJywnbm9uZScpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHNsb3QuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkV3JhcHBlckRpdiA9IGNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZFdyYXBwZXJEaXYsJ3BvaW50ZXItZXZlbnRzJywnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICBhcHBlbmRDaGlsZChjaGlsZFdyYXBwZXJEaXYsY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSk7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZENoaWxkKHNsb3RXcmFwcGVyRGl2LGNoaWxkV3JhcHBlckRpdik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRXcmFwcGVyc01hcC5wdXQoY2hpbGQsY2hpbGRXcmFwcGVyRGl2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90V3JhcHBlcnNNYXAucHV0KHNsb3Qsc2xvdFdyYXBwZXJEaXYpO1xuICAgICAgICAgICAgICAgIGFwcGVuZENoaWxkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSxzbG90V3JhcHBlckRpdik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ3dpZHRoJyx0aGlzLmNhbGN1bGF0ZWRXaWR0aCsncHgnKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLmdldFJvb3RFbGVtZW50KCksJ2hlaWdodCcsdGhpcy5jYWxjdWxhdGVkSGVpZ2h0KydweCcpO1xuXG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcblxuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIGZpeFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdFdyYXBwZXJEaXYgPSB0aGlzLnNsb3RXcmFwcGVyc01hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcblxuICAgICAgICAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgY3NzKHNsb3RXcmFwcGVyRGl2LCd0b3AnLHBvcysncHgnKTtcbiAgICAgICAgICAgICAgICBjc3Moc2xvdFdyYXBwZXJEaXYsJ2hlaWdodCcsY2VsbGgrJ3B4Jyk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBzbG90LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZFdyYXBwZXJEaXYgPSB0aGlzLmNoaWxkV3JhcHBlcnNNYXAuZ2V0KGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkV3JhcHBlckRpdiwncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGRXcmFwcGVyRGl2LCdsZWZ0JyxjaGlsZC5tYXJnaW4ubGVmdCsncHgnKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkV3JhcHBlckRpdiwncmlnaHQnLGNoaWxkLm1hcmdpbi5yaWdodCsncHgnKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkV3JhcHBlckRpdiwndG9wJyxjaGlsZC5tYXJnaW4udG9wKydweCcpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGRXcmFwcGVyRGl2LCdib3R0b20nLGNoaWxkLm1hcmdpbi5ib3R0b20rJ3B4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNsb3QubGF5b3V0Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICBwb3MrPWNlbGxoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlJiZ0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsY3VsYXRlZFNsb3RIZWlnaHQ7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWxjdWxhdGVkU2xvdEhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDnu4jmraLlkJHkuIvorqHnrpfvvIzku47kuIvlkJHkuIrorqHnrpdcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZT1mYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVkSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpOiB2b2lkIHtcblxuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG4gICAgICAgICAgICBsZXQgZml4U3VtID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsaD1jZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLndpZHRoLnZhbHVlIC0gZml4U3VtKSogY2VsbERlZmluYXRpb24udmFsdWUgLyB3ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aCA9IGNlbGxoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdCYmdGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlJiZ0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsaD1jZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLnBhcmVudFNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aCAtIGZpeFN1bSkqIGNlbGxEZWZpbmF0aW9uLnZhbHVlIC8gd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZWRTbG90V2lkdGggPSBjZWxsaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOe7iOatouWQkeS4i+iuoeeul++8jOS7juS4i+WQkeS4iuiuoeeul1xuICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuaXNTbG90V2lkdGhDYWxjdWxhdGFibGU9ZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlZFNsb3RXaWR0aCA9IHRoaXMuY2FsY3VsYXRlZFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykgIHtcbiAgICAgICAgICAgICAgICBzbG90LmNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLnNsb3RzLm1hcCh0PT50LmNhbGN1bGF0ZWRTbG90SGVpZ2h0KTtcbiAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgIGxldCBtYXhoZWlnaHQgPSAwO1xuICAgICAgICAgICAgaWYoaGVpZ2h0bGlzdC5sZW5ndGg+MCkgbWF4aGVpZ2h0ID0gaGVpZ2h0bGlzdFswXTtcblxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gbWF4aGVpZ2h0O1xuXG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSAge1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlV2lkdGhGcm9tQm90dG9tKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc3VtKz1zbG90LmNhbGN1bGF0ZWRTbG90V2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHN1bTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYodGhpcy5yb290RWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsZW0gPSBjcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLnJvb3RFbGVtLCdwb2ludGVyLWV2ZW50cycsJ2FsbCcpO1xuICAgICAgICAgICAgICAgIHNldGF0dHIodGhpcy5yb290RWxlbSwnbGF5b3V0LXR5cGUnLCdWbGluZWFybGF5b3V0Jyk7XG4gICAgICAgICAgICAgICAgc2V0YXR0cih0aGlzLnJvb3RFbGVtLCdsYXlvdXQtbmFtZScsdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RFbGVtO1xuICAgICAgICB9XG5cblxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcuT2JzZXJ2ZXJNb2RlbCB7XG5cbiAgICBjb25zdCBjb25maWdQcm9wZXJ0eU5hbWU6c3RyaW5nID0gXCJfX29ic2VydmFibGVfX1wiO1xuXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyB7XG4gICAgICAgIG9iajphbnk7XG4gICAgICAgIHByb3BlcnR5TmFtZSA6IHN0cmluZztcbiAgICAgICAgb2xkVmFsdWUgOiBhbnk7XG4gICAgICAgIG5ld1ZhbHVlIDogYW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajphbnkscHJvcGVydHlOYW1lOiBzdHJpbmcsIG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICB0aGlzLm9sZFZhbHVlID0gb2xkVmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5ld1ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgT2JqZWN0Q29uZmlnIHtcbiAgICAgICAgcGFyZW50OmFueTtcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcbiAgICAgICAgcHJvcHM6YW55PXt9O1xuICAgICAgICBwcm9wQ2hhbmdlZENhbGxiYWNrTGlzdDpBcnJheTwoYXJnczpQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpPT52b2lkPjtcbiAgICAgICAgYXJydmFsdWVzOkFycmF5PGFueT4gPSBbXTtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3QgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuYXJydmFsdWVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBub3RpZnlQcm9wZXJ0eUNoYW5nZWQoYXJnczpQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpOnZvaWQge1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3RbaV07XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgY2ZnID0gZ2V0T2JqZWN0Q29uZmlnKGFyZ3Mub2JqKTtcbiAgICAgICAgICAgIGlmKGNmZy5wYXJlbnQpe1xuICAgICAgICAgICAgICAgIGxldCBwYXJlbnRDZmcgPSBnZXRPYmplY3RDb25maWcoY2ZnLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgcGFyZW50Q2ZnLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKFxuICAgICAgICAgICAgICAgICAgICBjZmcucGFyZW50LFxuICAgICAgICAgICAgICAgICAgICBjZmcucHJvcGVydHlOYW1lK1wiLlwiK2FyZ3MucHJvcGVydHlOYW1lLFxuICAgICAgICAgICAgICAgICAgICBhcmdzLm9sZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBhcmdzLm5ld1ZhbHVlXG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjayhjYWxsYmFjazooYXJnczpQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpPT52b2lkKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3QucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjayhjYWxsYmFjazooYXJnczpQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpPT52b2lkKTp2b2lkIHtcbiAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0LmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgaWYoaWR4Pi0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdC5zcGxpY2UoaWR4LDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRPYmplY3RDb25maWcob2JqOmFueSk6IE9iamVjdENvbmZpZyB7XG4gICAgICAgIGlmKCEoY29uZmlnUHJvcGVydHlOYW1lIGluIG9iaikpIHtcbiAgICAgICAgICAgIGxldCBjZmcgPSBuZXcgT2JqZWN0Q29uZmlnKCk7XG4gICAgICAgICAgICBvYmpbY29uZmlnUHJvcGVydHlOYW1lXSA9IGNmZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqW2NvbmZpZ1Byb3BlcnR5TmFtZV07XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGluamVjdFByb3BlcnRpZXMob2JqOmFueSkge1xuICAgICAgICBpZiAob2JqPT1udWxsKSByZXR1cm47XG4gICAgICAgIGlmICh0b1N0cmluZy5jYWxsKG9iaikhPVwiW29iamVjdCBPYmplY3RdXCIpIHJldHVybjtcbiAgICAgICAgbGV0IGNmZyA9IGdldE9iamVjdENvbmZpZyhvYmopO1xuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eU5hbWUgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZihwcm9wZXJ0eU5hbWU9PWNvbmZpZ1Byb3BlcnR5TmFtZSkgY29udGludWU7XG4gICAgICAgICAgICBpZighb2JqLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgbGV0IHByb3BWYWx1ZSA9IG9ialtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgaWYodG9TdHJpbmcuY2FsbChwcm9wVmFsdWUpPT0nW29iamVjdCBGdW5jdGlvbl0nKXtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1lbHNlIGlmKHRvU3RyaW5nLmNhbGwocHJvcFZhbHVlKT09J1tvYmplY3QgT2JqZWN0XScpe1xuICAgICAgICAgICAgICAgIGluamVjdFByb3BlcnRpZXMocHJvcFZhbHVlKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKHRvU3RyaW5nLmNhbGwocHJvcFZhbHVlKT09J1tvYmplY3QgQXJyYXldJyl7XG4gICAgICAgICAgICAgICAgcHJvcFZhbHVlID0gbmV3IE9ic2VydmFibGVBcnJheShwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgIG9ialtwcm9wZXJ0eU5hbWVdID0gcHJvcFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaixwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgaWYoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKXtcbiAgICAgICAgICAgICAgICBsZXQgdCA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZih0b1N0cmluZy5jYWxsKHQpPT0nW29iamVjdCBGdW5jdGlvbl0nKXtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoXCJfX29ic2VydmFibGVhcnJheV9cIiBpbiB0KXtcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlLmFkZEV2ZW50TGlzdGVuZXIoXCJpdGVtYWRkZWRcIixmdW5jdGlvbihlOmFueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2ZnLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKG9iaiwgcHJvcGVydHlOYW1lK1wiLipcIixudWxsLG51bGwpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZS5hZGRFdmVudExpc3RlbmVyKFwiaXRlbXNldFwiLGZ1bmN0aW9uKGU6YW55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZmcubm90aWZ5UHJvcGVydHlDaGFuZ2VkKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mob2JqLCBwcm9wZXJ0eU5hbWUrXCIuKlwiLG51bGwsbnVsbCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlLmFkZEV2ZW50TGlzdGVuZXIoXCJpdGVtcmVtb3ZlZFwiLGZ1bmN0aW9uKGU6YW55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZmcubm90aWZ5UHJvcGVydHlDaGFuZ2VkKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mob2JqLCBwcm9wZXJ0eU5hbWUrXCIuKlwiLG51bGwsbnVsbCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZHZhbHVlIG9mIHByb3BWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvU3RyaW5nLmNhbGwoY2hpbGR2YWx1ZSkhPVwiW29iamVjdCBPYmplY3RdXCIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5qZWN0UHJvcGVydGllcyhjaGlsZHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZENmZyA9IGdldE9iamVjdENvbmZpZyhjaGlsZHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ2ZnLnBhcmVudCA9IG9iajtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ2ZnLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZStcIi4qXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0b1N0cmluZy5jYWxsKHByb3BWYWx1ZSk9PSdbb2JqZWN0IE9iamVjdF0nKXtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0UHJvcGVydGllcyhwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRDZmcgPSBnZXRPYmplY3RDb25maWcocHJvcFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDZmcucGFyZW50ID0gb2JqO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZENmZy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjZmcucHJvcHNbcHJvcGVydHlOYW1lXSA9IG9ialtwcm9wZXJ0eU5hbWVdO1xuXG4gICAgICAgICAgICAoZnVuY3Rpb24gKHByb3BlcnR5TmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLHByb3BlcnR5TmFtZSx7XG4gICAgICAgICAgICAgICAgICAgICdnZXQnOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRPYmplY3RDb25maWcodGhpcykucHJvcHNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ3NldCc6ZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RQcm9wZXJ0aWVzKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gZ2V0T2JqZWN0Q29uZmlnKHRoaXMpLnByb3BzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRPYmplY3RDb25maWcodGhpcykucHJvcHNbcHJvcGVydHlOYW1lXT12YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE9iamVjdENvbmZpZyh0aGlzKS5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KShwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICBvYmo6YW55O1xuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5vYmogPSBvYmo7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IGdldFZhbHVlKCk6YW55IDtcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICBvYmo6YW55O1xuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5vYmogPSBvYmo7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IHNldFZhbHVlKHZhbHVlOmFueSk6dm9pZDtcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgaW1wbGVtZW50cyBEaXNwb3NhYmxle1xuICAgICAgICBvYmo6YW55O1xuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xuICAgICAgICBwcm90ZWN0ZWQgY2FsbGJhY2s6IEZ1bmN0aW9uO1xuXG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9iaiA9IG9iajtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2sobGlzdGVuZXI6RnVuY3Rpb24pOnZvaWR7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbGlzdGVuZXI7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjaygpOnZvaWR7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IHN0YXJ0TGlzdGVuKCk6dm9pZDtcbiAgICAgICAgYWJzdHJhY3Qgc3RvcExpc3RlbigpOnZvaWQ7XG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIge1xuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTpQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcjtcblxuICAgICAgICBhYnN0cmFjdCBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOmJvb2xlYW47XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFVuaXZlcnNhbFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xuXG4gICAgICAgIHByaXZhdGUgcHJvdmlkZXJzOkxpc3Q8UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcj47XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMgPSBuZXcgTGlzdDxQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXIocHJvdmlkZXI6UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcik6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXJzKHByb3ZpZGVyczpBcnJheTxQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyPik6dm9pZHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZihwcm92aWRlci5jYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iaiwgcHJvcGVydHlOYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYocHJvdmlkZXIuY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmosIHByb3BlcnR5TmFtZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXIuZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVyIHtcbiAgICAgICAgYWJzdHJhY3QgY2FuUHJvdmlkZUdldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTpib29sZWFuO1xuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eUdldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTogUHJvcGVydHlHZXR0ZXI7XG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXIge1xuICAgICAgICBhYnN0cmFjdCBjYW5Qcm92aWRlU2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOmJvb2xlYW47XG4gICAgICAgIGFic3RyYWN0IGdldFByb3BlcnR5U2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOiBQcm9wZXJ0eVNldHRlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlQcm92aWRlciB7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FuUHJvdmlkZUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuXG5cbiAgICAgICAgYWJzdHJhY3QgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlHZXR0ZXIgO1xuXG4gICAgICAgIGFic3RyYWN0IGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiA7XG5cbiAgICAgICAgYWJzdHJhY3QgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIgO1xuXG4gICAgICAgIGFic3RyYWN0IGNhblByb3ZpZGVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIDtcblxuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciA7XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgVW5pdmVyc2FsUHJvcGVydHlHZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgcHJpdmF0ZSBwcm92aWRlcnM6TGlzdDxQcm9wZXJ0eUdldHRlclByb3ZpZGVyPjtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVycyA9IG5ldyBMaXN0PFByb3BlcnR5R2V0dGVyUHJvdmlkZXI+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm92aWRlcihwcm92aWRlcjpQcm9wZXJ0eUdldHRlclByb3ZpZGVyKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm92aWRlcnMocHJvdmlkZXJzOkFycmF5PFByb3BlcnR5R2V0dGVyUHJvdmlkZXI+KTp2b2lke1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgcHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMuYWRkKHByb3ZpZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZihwcm92aWRlci5jYW5Qcm92aWRlR2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IExheW91dEx6Zy5Qcm9wZXJ0eUdldHRlciB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGVHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyLmdldFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFVuaXZlcnNhbFByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVye1xuICAgICAgICBwcml2YXRlIHByb3ZpZGVyczpMaXN0PFByb3BlcnR5U2V0dGVyUHJvdmlkZXI+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzID0gbmV3IExpc3Q8UHJvcGVydHlTZXR0ZXJQcm92aWRlcj4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3ZpZGVyKHByb3ZpZGVyOlByb3BlcnR5U2V0dGVyUHJvdmlkZXIpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMuYWRkKHByb3ZpZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3ZpZGVycyhwcm92aWRlcnM6QXJyYXk8UHJvcGVydHlTZXR0ZXJQcm92aWRlcj4pOnZvaWR7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiBwcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGVTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZihwcm92aWRlci5jYW5Qcm92aWRlU2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlci5nZXRQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBVbml2ZXJzYWxQcm9wZXJ0eVByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlQcm92aWRlcntcbiAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0eUdldHRlclByb3ZpZGVyOlByb3BlcnR5R2V0dGVyUHJvdmlkZXI7XG4gICAgICAgIHByaXZhdGUgcHJvcGVydHlTZXR0ZXJQcm92aWRlcjpQcm9wZXJ0eVNldHRlclByb3ZpZGVyO1xuICAgICAgICBwcml2YXRlIHByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI6UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0eUdldHRlclByb3ZpZGVyOiBQcm9wZXJ0eUdldHRlclByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVNldHRlclByb3ZpZGVyOiBQcm9wZXJ0eVNldHRlclByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eUdldHRlclByb3ZpZGVyID0gcHJvcGVydHlHZXR0ZXJQcm92aWRlcjtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlTZXR0ZXJQcm92aWRlciA9IHByb3BlcnR5U2V0dGVyUHJvdmlkZXI7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgPSBwcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKSA6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlHZXR0ZXJQcm92aWRlci5jYW5Qcm92aWRlR2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpIDogUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlHZXR0ZXJQcm92aWRlci5nZXRQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eVNldHRlclByb3ZpZGVyLmNhblByb3ZpZGVTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZykgOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eVNldHRlclByb3ZpZGVyLmdldFByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKSA6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlci5jYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpIDogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlci5nZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIlxuXG5uYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBEb21XaWR0aFByb3BlcnR5R2V0dGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRWYWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIHJldHVybiBkb20ub2Zmc2V0V2lkdGg7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21XaWR0aFByb3BlcnR5U2V0dGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgZG9tLnN0eWxlLndpZHRoID0gdmFsdWUrXCJweFwiO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tV2lkdGhQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcIndpZHRoXCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tV2lkdGhQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21XaWR0aFByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwid2lkdGhcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21XaWR0aFByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgRG9tSGVpZ2h0UHJvcGVydHlHZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICAgICAgICAgIGxldCBkb20gPSA8SFRNTEVsZW1lbnQ+dGhpcy5vYmo7XG4gICAgICAgICAgICByZXR1cm4gZG9tLm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21IZWlnaHRQcm9wZXJ0eVNldHRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIGRvbS5zdHlsZS5oZWlnaHQgPSB2YWx1ZStcInB4XCI7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21IZWlnaHRQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcImhlaWdodFwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbUhlaWdodFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbUhlaWdodFByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwiaGVpZ2h0XCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5U2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5U2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tSGVpZ2h0UHJvcGVydHlTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBEb21TaXplUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcntcbiAgICAgICAgcHJpdmF0ZSBkb206IEhUTUxFbGVtZW50O1xuICAgICAgICBwcml2YXRlIGNhbGxiYWNrZnVuOmFueTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuZG9tID0gPEhUTUxFbGVtZW50Pm9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0TGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja2Z1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrLmFwcGx5KHNlbGYuZG9tLFtzZWxmLmRvbV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG9uRXZlbnQodGhpcy5kb20sXCJyZXNpemVcIix0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBvZmZFdmVudCh0aGlzLmRvbSxcInJlc2l6ZVwiLHRoaXMuY2FsbGJhY2tmdW4pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tU2l6ZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xuXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tU2l6ZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iaixwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmKHByb3BlcnR5TmFtZT09XCJ3aWR0aFwifHxwcm9wZXJ0eU5hbWU9PVwiaGVpZ2h0XCIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIERvbVRleHRQcm9wZXJ0eUdldHRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICAgICAgICAgIGxldCBkb20gPSA8SFRNTEVsZW1lbnQ+dGhpcy5vYmo7XG4gICAgICAgICAgICBpZihkb20udGFnTmFtZT09XCJJTlBVVFwifHxkb20udGFnTmFtZT09XCJpbnB1dFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEVsZW1WYWx1ZShkb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdldEVsZW1UZXh0KGRvbSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21UZXh0UHJvcGVydHlTZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBkb20gPSA8SFRNTEVsZW1lbnQ+dGhpcy5vYmo7XG4gICAgICAgICAgICBpZihkb20udGFnTmFtZT09XCJJTlBVVFwifHxkb20udGFnTmFtZT09XCJpbnB1dFwiKSB7XG4gICAgICAgICAgICAgICAgc2V0RWxlbVZhbHVlKGRvbSx2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0RWxlbVRleHQoZG9tLHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVRleHRQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcInRleHRcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21UZXh0UHJvcGVydHlHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVGV4dFByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwidGV4dFwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVRleHRQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21UZXh0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcntcbiAgICAgICAgcHJpdmF0ZSBkb206IEhUTUxFbGVtZW50O1xuICAgICAgICBwcml2YXRlIGNhbGxiYWNrZnVuOmFueTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuZG9tID0gPEhUTUxFbGVtZW50Pm9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0TGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja2Z1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrLmFwcGx5KHNlbGYuZG9tLFtzZWxmLmRvbV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG9uRXZlbnQodGhpcy5kb20sIFwiY2hhbmdlXCIsdGhpcy5jYWxsYmFja2Z1bik7XG4gICAgICAgIH1cblxuICAgICAgICBzdG9wTGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgb2ZmRXZlbnQodGhpcy5kb20sXCJjaGFuZ2VcIix0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVRleHRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcntcblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVRleHRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmoscHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZihwcm9wZXJ0eU5hbWU9PVwidGV4dFwiKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBEb21WYWx1ZVByb3BlcnR5R2V0dGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRWYWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIGlmKGRvbS50YWdOYW1lPT1cIklOUFVUXCJ8fGRvbS50YWdOYW1lPT1cImlucHV0XCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb207XG4gICAgICAgICAgICAgICAgaWYoaW5wdXQudHlwZT09XCJkYXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlQXNEYXRlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGlucHV0LnR5cGU9PVwiY2hlY2tib3hcIil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC5jaGVja2VkO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RWxlbVZhbHVlKGRvbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdldEVsZW1UZXh0KGRvbSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21WYWx1ZVByb3BlcnR5U2V0dGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgaWYoZG9tLnRhZ05hbWU9PVwiSU5QVVRcInx8ZG9tLnRhZ05hbWU9PVwiaW5wdXRcIikge1xuICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvbTtcbiAgICAgICAgICAgICAgICBpZihpbnB1dC50eXBlPT1cImRhdGVcIikge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGlucHV0LnR5cGU9PVwiY2hlY2tib3hcIil7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2V0RWxlbVZhbHVlKGRvbSx2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRFbGVtVGV4dChkb20sIHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVZhbHVlUHJvcGVydHlHZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBwcm9wZXJ0eU5hbWUgPT0gXCJ2YWx1ZVwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVZhbHVlUHJvcGVydHlHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVmFsdWVQcm9wZXJ0eVNldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcInZhbHVlXCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5U2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5U2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tVmFsdWVQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21WYWx1ZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJ7XG4gICAgICAgIHByaXZhdGUgZG9tOiBIVE1MRWxlbWVudDtcbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFja2Z1bjphbnk7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB0aGlzLmRvbSA9IDxIVE1MRWxlbWVudD5vYmo7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydExpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tmdW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5jYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxsYmFjay5hcHBseShzZWxmLmRvbSxbc2VsZi5kb21dKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvbkV2ZW50KHRoaXMuZG9tLCBcImNoYW5nZVwiLCB0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBvZmZFdmVudCh0aGlzLmRvbSxcInJlc2l6ZVwiLHRoaXMuY2FsbGJhY2tmdW4pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVmFsdWVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcntcblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVZhbHVlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqLHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYocHJvcGVydHlOYW1lPT1cInZhbHVlXCIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgaW1wb3J0IGdldE9iamVjdENvbmZpZyA9IExheW91dEx6Zy5PYnNlcnZlck1vZGVsLmdldE9iamVjdENvbmZpZztcbiAgICBpbXBvcnQgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzID0gTGF5b3V0THpnLk9ic2VydmVyTW9kZWwuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzO1xuXG4gICAgZXhwb3J0IGNsYXNzIERpY3RQcm9wZXJ0eUdldHRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ialt0aGlzLnByb3BlcnR5TmFtZV07XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaWN0UHJvcGVydHlTZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMub2JqW3RoaXMucHJvcGVydHlOYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJ7XG5cbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFja2Z1bmM6YW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrZnVuYyA9IGZ1bmN0aW9uIChhcmdzOiBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZihhcmdzLnByb3BlcnR5TmFtZT09c2VsZi5wcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxsYmFjay5hcHBseSh0aGlzLFtzZWxmLm9ial0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYnNlcnZlck1vZGVsLmluamVjdFByb3BlcnRpZXModGhpcy5vYmopO1xuICAgICAgICAgICAgT2JzZXJ2ZXJNb2RlbC5nZXRPYmplY3RDb25maWcodGhpcy5vYmopLmFkZFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKHRoaXMuY2FsbGJhY2tmdW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBPYnNlcnZlck1vZGVsLmdldE9iamVjdENvbmZpZyh0aGlzLm9iaikucmVtb3ZlUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2sodGhpcy5jYWxsYmFja2Z1bmMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVyIHtcbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogTGF5b3V0THpnLlByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGljdFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaWN0UHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXIge1xuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERpY3RQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERpY3RQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDb250cm9sUHJvcGVydHlHZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlcntcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgICAgIGxldCBjb250cm9sOmFueSA9IDxWaXN1YWxFbGVtZW50PnRoaXMub2JqO1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb3BlcnR5TmFtZSBpbiBjb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbFt0aGlzLnByb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ29udHJvbFByb3BlcnR5U2V0dGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJ7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBjb250cm9sOmFueSA9IDxWaXN1YWxFbGVtZW50PnRoaXMub2JqO1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb3BlcnR5TmFtZSBpbiBjb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sW3RoaXMucHJvcGVydHlOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRyb2wxOldpZGdldCA9IDxXaWRnZXQ+dGhpcy5vYmo7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sMS5hc3NlbWJsZURvbSgpO1xyXG4gICAgICAgICAgICAgICAgY29udHJvbDEuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sMS5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sMS5kb0xheW91dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ29udHJvbFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVye1xyXG5cclxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgVmlzdWFsRWxlbWVudDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUdldHRlciB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29udHJvbFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDb250cm9sUHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXJ7XHJcblxyXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBWaXN1YWxFbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbnRyb2xQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ29udHJvbFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJ7XHJcbiAgICAgICAgcHJpdmF0ZSBjb250cm9sOiBWaXN1YWxFbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2tmdW46YW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wgPSA8VmlzdWFsRWxlbWVudD5vYmo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGFydExpc3RlbigpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrZnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5jYWxsYmFjaylcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrLmFwcGx5KHNlbGYuY29udHJvbCxbc2VsZi5jb250cm9sXSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5hZGRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcih0aGlzLnByb3BlcnR5TmFtZSx0aGlzLmNhbGxiYWNrZnVuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5yZW1vdmVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcih0aGlzLmNhbGxiYWNrZnVuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDb250cm9sUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXJ7XHJcblxyXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250cm9sUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqLHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgVmlzdWFsRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRyb2wgPSA8VmlzdWFsRWxlbWVudD5vYmo7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbC5nZXROb3RpZnlQcm9wZXJ0aWVzKCkuaW5kZXhPZihwcm9wZXJ0eU5hbWUpPi0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWYWx1ZUNvbnZlcnRlciB7XG5cbiAgICAgICAgYWJzdHJhY3QgY29udmVydCh2YWx1ZTphbnkpOmFueTtcblxuICAgICAgICBhYnN0cmFjdCBjb252ZXJ0QmFjayh2YWx1ZTphbnkpOmFueTtcblxuICAgIH1cblxuICAgIGV4cG9ydCBlbnVtIEJpbmRpbmdNb2RlIHtcbiAgICAgICAgT25ld2F5LFxuICAgICAgICBUd293YXlcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmluZGluZyBpbXBsZW1lbnRzIERpc3Bvc2FibGV7XG4gICAgICAgIHRhcmdldDphbnk7XG4gICAgICAgIHRhcmdldFByb3BlcnR5TmFtZTpzdHJpbmc7XG4gICAgICAgIGNvbnZlcnRlcjpWYWx1ZUNvbnZlcnRlcjtcbiAgICAgICAgbW9kZTpCaW5kaW5nTW9kZTtcbiAgICAgICAgcHJvdGVjdGVkIHByb3BlcnR5UHJvdmlkZXI6IFByb3BlcnR5UHJvdmlkZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJvcGVydHlQcm92aWRlcjpQcm9wZXJ0eVByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5UHJvdmlkZXIgPSBwcm9wZXJ0eVByb3ZpZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3QgdXBkYXRlRnJvbVNvdXJjZSgpOnZvaWQ7XG4gICAgICAgIGFic3RyYWN0IHVwZGF0ZUZyb21UYXJnZXQoKTp2b2lkO1xuXG4gICAgICAgIHNldENvbnZlcnRlcihjb252ZXJ0ZXI6IFZhbHVlQ29udmVydGVyKTogQmluZGluZyB7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnRlciA9IGNvbnZlcnRlcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0TW9kZShtb2RlOiBCaW5kaW5nTW9kZSk6IEJpbmRpbmcge1xuICAgICAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRCaW5kaW5nKCk6QmluZGluZ3tcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcEJpbmRpbmcoKTpCaW5kaW5ne1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zdG9wQmluZGluZygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIEZ1bmN0aW9uQmluZGluZyBleHRlbmRzIEJpbmRpbmd7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJvcGVydHlQcm92aWRlcjogUHJvcGVydHlQcm92aWRlcikge1xuICAgICAgICAgICAgc3VwZXIocHJvcGVydHlQcm92aWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydEJpbmRpbmcoKTogQmluZGluZyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BCaW5kaW5nKCk6IEJpbmRpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVGcm9tU291cmNlKCk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlRnJvbVRhcmdldCgpOiB2b2lkIHtcbiAgICAgICAgfVxuXG5cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgUHJvcGVydHlCaW5kaW5nIGV4dGVuZHMgQmluZGluZyB7XG5cbiAgICAgICAgc291cmNlOiBhbnk7XG4gICAgICAgIHNvdXJjZVByb3BlcnR5TmFtZTogc3RyaW5nO1xuXG4gICAgICAgIHByaXZhdGUgc291cmNlUHJvcEdldHRlcjogUHJvcGVydHlHZXR0ZXI7XG4gICAgICAgIHByaXZhdGUgc291cmNlUHJvcFNldHRlcjogUHJvcGVydHlTZXR0ZXI7XG4gICAgICAgIHByaXZhdGUgdGFyZ2V0UHJvcEdldHRlcjogUHJvcGVydHlHZXR0ZXI7XG4gICAgICAgIHByaXZhdGUgdGFyZ2V0UHJvcFNldHRlcjogUHJvcGVydHlTZXR0ZXI7XG5cbiAgICAgICAgcHJpdmF0ZSBzb3VyY2VQcm9wTGlzdGVuZXI6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyO1xuICAgICAgICBwcml2YXRlIHRhcmdldFByb3BMaXN0ZW5lcjogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJvcGVydHlQcm92aWRlcjogUHJvcGVydHlQcm92aWRlcikge1xuICAgICAgICAgICAgc3VwZXIocHJvcGVydHlQcm92aWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydEJpbmRpbmcoKTogQmluZGluZyB7XG4gICAgICAgICAgICB0aGlzLnN0b3BCaW5kaW5nKCk7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMuc291cmNlUHJvcEdldHRlciA9IHRoaXMucHJvcGVydHlQcm92aWRlci5nZXRQcm9wZXJ0eUdldHRlcih0aGlzLnNvdXJjZSwgdGhpcy5zb3VyY2VQcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VQcm9wU2V0dGVyID0gdGhpcy5wcm9wZXJ0eVByb3ZpZGVyLmdldFByb3BlcnR5U2V0dGVyKHRoaXMuc291cmNlLCB0aGlzLnNvdXJjZVByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldFByb3BHZXR0ZXIgPSB0aGlzLnByb3BlcnR5UHJvdmlkZXIuZ2V0UHJvcGVydHlHZXR0ZXIodGhpcy50YXJnZXQsIHRoaXMudGFyZ2V0UHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvcFNldHRlciA9IHRoaXMucHJvcGVydHlQcm92aWRlci5nZXRQcm9wZXJ0eVNldHRlcih0aGlzLnRhcmdldCwgdGhpcy50YXJnZXRQcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VQcm9wTGlzdGVuZXIgPSB0aGlzLnByb3BlcnR5UHJvdmlkZXIuZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIodGhpcy5zb3VyY2UsIHRoaXMuc291cmNlUHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvcExpc3RlbmVyID0gdGhpcy5wcm9wZXJ0eVByb3ZpZGVyLmdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKHRoaXMudGFyZ2V0LCB0aGlzLnRhcmdldFByb3BlcnR5TmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRnJvbVNvdXJjZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNvdXJjZVByb3BMaXN0ZW5lci5zdGFydExpc3RlbigpO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VQcm9wTGlzdGVuZXIuc2V0UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlRnJvbVNvdXJjZS5hcHBseShzZWxmLFtdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlID09IEJpbmRpbmdNb2RlLlR3b3dheSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvcExpc3RlbmVyLnN0YXJ0TGlzdGVuKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRQcm9wTGlzdGVuZXIuc2V0UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZUZyb21UYXJnZXQuYXBwbHkoc2VsZixbXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBzdG9wQmluZGluZygpOiBCaW5kaW5nIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc291cmNlUHJvcExpc3RlbmVyKSB0aGlzLnNvdXJjZVByb3BMaXN0ZW5lci5kaXNwb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnN0b3BCaW5kaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVGcm9tU291cmNlKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHYgPSAgdGhpcy5zb3VyY2VQcm9wR2V0dGVyLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBsZXQgb2xkX3YgPSB0aGlzLnRhcmdldFByb3BHZXR0ZXIuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICh2PT1vbGRfdikgcmV0dXJuO1xuICAgICAgICAgICAgaWYodGhpcy5jb252ZXJ0ZXIpe1xuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmNvbnZlcnRlci5jb252ZXJ0KHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50YXJnZXRQcm9wU2V0dGVyLnNldFZhbHVlKHYpO1xuXG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVGcm9tVGFyZ2V0KCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHYgPSAgdGhpcy50YXJnZXRQcm9wR2V0dGVyLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBsZXQgb2xkX3YgPSB0aGlzLnNvdXJjZVByb3BHZXR0ZXIuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICh2PT1vbGRfdikgcmV0dXJuO1xuICAgICAgICAgICAgaWYodGhpcy5jb252ZXJ0ZXIpe1xuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmNvbnZlcnRlci5jb252ZXJ0QmFjayh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc291cmNlUHJvcFNldHRlci5zZXRWYWx1ZSh2KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgRGF0ZUZvcm1hdENvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuICAgICAgICBmb3JtYXQ6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZvcm1hdChmb3JtYXQ6c3RyaW5nKTogRGF0ZUZvcm1hdENvbnZlcnRlciB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydCh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIGxldCBkdCA9IDxEYXRlPnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXREYXRlKGR0LHRoaXMuZm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnRCYWNrKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIEZpcnN0Q2hhclVwcGVyY2FzZUNvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuICAgICAgICBjb252ZXJ0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgaWYodmFsdWU9PW51bGwpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgbGV0IHYgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgcmV0dXJuICh2WzBdK1wiXCIpLnRvVXBwZXJDYXNlKCkrdi5zdWJzdHIoMSx2Lmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0QmFjayh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgTG93ZXJjYXNlQ29udmVydGVyIGV4dGVuZHMgVmFsdWVDb252ZXJ0ZXJ7XG4gICAgICAgIGNvbnZlcnQodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICBpZih2YWx1ZT09bnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydEJhY2sodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIFVwcGVyY2FzZUNvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuICAgICAgICBjb252ZXJ0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgaWYodmFsdWU9PW51bGwpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnRCYWNrKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBUb1N0cmluZ0NvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuICAgICAgICBjb252ZXJ0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgaWYodmFsdWU9PW51bGwpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0QmFjayh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgUGlwZWxpbmVDb252ZXJ0ZXIgZXh0ZW5kcyBWYWx1ZUNvbnZlcnRlcntcbiAgICAgICAgY29udmVydGVyczpBcnJheTxWYWx1ZUNvbnZlcnRlcj49W107XG5cbiAgICAgICAgYWRkQ29udmVydGVyKGNvbnZlcnRlcjogVmFsdWVDb252ZXJ0ZXIpOlBpcGVsaW5lQ29udmVydGVyIHtcbiAgICAgICAgICAgIGlmIChjb252ZXJ0ZXI9PW51bGwpIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jb252ZXJ0ZXJzLnB1c2goY29udmVydGVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ29udmVydGVycyhjb252ZXJ0ZXJzOiBBcnJheTxWYWx1ZUNvbnZlcnRlcj4pOlBpcGVsaW5lQ29udmVydGVyIHtcbiAgICAgICAgICAgIGlmIChjb252ZXJ0ZXJzPT1udWxsKSByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnZlcnRlciBvZiBjb252ZXJ0ZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0ZXJzLnB1c2goY29udmVydGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydCh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIGxldCBjdXJ2YWx1ZTphbnkgPSB2YWx1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnZlcnRlciBvZiB0aGlzLmNvbnZlcnRlcnMpIHtcbiAgICAgICAgICAgICAgICBjdXJ2YWx1ZSA9IGNvbnZlcnRlci5jb252ZXJ0KGN1cnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjdXJ2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnRCYWNrKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgbGV0IGN1cnZhbHVlOmFueSA9IHZhbHVlO1xuICAgICAgICAgICAgZm9yIChsZXQgY29udmVydGVyIG9mIHRoaXMuY29udmVydGVycy5yZXZlcnNlKCkpIHtcbiAgICAgICAgICAgICAgICBjdXJ2YWx1ZSA9IGNvbnZlcnRlci5jb252ZXJ0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjdXJ2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgRXhwcmVzc2lvbkNvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuXG4gICAgICAgIGV4cHJlc3Npb25TdHI6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGV4cHJlc3Npb25TdHI6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvblN0ciA9IGV4cHJlc3Npb25TdHI7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgaWYodGhpcy5leHByZXNzaW9uU3RyPT1udWxsfHx0aGlzLmV4cHJlc3Npb25TdHI9PVwiXCIpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBmdW5jPSBuZXcgRnVuY3Rpb24oXCJ2YWx1ZVwiLFwicmV0dXJuIFwiICsgdGhpcy5leHByZXNzaW9uU3RyKTtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gICAgICAgICAgICB9Y2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0QmFjayh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGNsYXNzIFZpc3VhbFRyZWUge1xuICAgICAgICByb290Q29udGFpbmVyOiBDb250YWluZXJXaWRnZXQ7XG4gICAgICAgIHBhcmVudENvbnRyb2w6VGVtcGxhdGVDb250cm9sO1xuICAgICAgICBzdGF0ZU1hbmFnZXI6YW55O1xuXG4gICAgICAgIHN0YXRpYyBmaW5kQ29udHJvbHNCeU5hbWUocm9vdDpXaWRnZXQsIG5hbWU6c3RyaW5nKTpMaXN0PFdpZGdldD4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBMaXN0PFdpZGdldD4oKTtcbiAgICAgICAgICAgIGxldCByb290Q29udGFpbmVyOmFueSA9IG51bGw7XG4gICAgICAgICAgICBpZihyb290Lm5hbWU9PW5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKHJvb3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocm9vdCBpbnN0YW5jZW9mIENvbnRhaW5lcldpZGdldCkge1xuICAgICAgICAgICAgICAgIHJvb3RDb250YWluZXIgPSA8Q29udGFpbmVyV2lkZ2V0PnJvb3Q7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygcm9vdENvbnRhaW5lci5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGxldCByID0gIFZpc3VhbFRyZWUuZmluZENvbnRyb2xzQnlOYW1lKGNoaWxkLCBuYW1lKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkQWxsKHIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGZpbmRDb250cm9sQnlOYW1lKHJvb3Q6V2lkZ2V0LCBuYW1lOnN0cmluZyk6IFdpZGdldCB7XG4gICAgICAgICAgICBsZXQgcm9vdENvbnRhaW5lcjphbnkgPSBudWxsO1xuICAgICAgICAgICAgaWYocm9vdC5uYW1lPT1uYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihyb290IGluc3RhbmNlb2YgQ29udGFpbmVyV2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcm9vdENvbnRhaW5lciA9IDxDb250YWluZXJXaWRnZXQ+cm9vdDtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygcm9vdENvbnRhaW5lci5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGxldCByID0gIFZpc3VhbFRyZWUuZmluZENvbnRyb2xCeU5hbWUoY2hpbGQsIG5hbWUpO1xuICAgICAgICAgICAgICAgIGlmKHIpIHJldHVybiByO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb290Q29udGFpbmVyKXtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RDb250YWluZXIuZ2V0Um9vdEVsZW1lbnQoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb290Q29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290Q29udGFpbmVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb290Q29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290Q29udGFpbmVyLmRvTGF5b3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG5cbiAgICB9XG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIFRlbXBsYXRlQ29udHJvbCBleHRlbmRzIFdpZGdldEJhc2Uge1xuICAgICAgICBwcml2YXRlIHJvb3RCb3JkZXIgOiBCb3JkZXIgPSBuZXcgQm9yZGVyKFwicm9vdEJvcmRlclwiKTtcbiAgICAgICAgcHJpdmF0ZSBfdmlzdWFsVHJlZSA6IFZpc3VhbFRyZWU7XG4gICAgICAgIHByaXZhdGUgc3RhdGVHcm91cHMgOiBMaXN0PFN0YXRlR3JvdXA+O1xuICAgICAgICBwcm90ZWN0ZWQgc3RhdGVFdmVudFRyaWdnZXJzOiBMaXN0PENvbnRyb2xUcmlnZ2VyPjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUdyb3VwcyA9IG5ldyBMaXN0PFN0YXRlR3JvdXA+KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlRXZlbnRUcmlnZ2VycyA9IG5ldyBMaXN0PENvbnRyb2xUcmlnZ2VyPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHZpc3VhbFRyZWUoKTogVmlzdWFsVHJlZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlzdWFsVHJlZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB2aXN1YWxUcmVlKHZhbHVlOiBWaXN1YWxUcmVlKSB7XG4gICAgICAgICAgICBpZih2YWx1ZSE9bnVsbCkge1xuICAgICAgICAgICAgICAgIHZhbHVlLnBhcmVudENvbnRyb2wgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkU3RhdGVHcm91cChncm91cE5hbWU6c3RyaW5nKTogU3RhdGVHcm91cCB7XG4gICAgICAgICAgICBsZXQgc3RhZ2VHcm91cCA9IG5ldyBTdGF0ZUdyb3VwKCk7XG4gICAgICAgICAgICBzdGFnZUdyb3VwLnJvb3RDb250cm9sID0gdGhpcy52aXN1YWxUcmVlLnJvb3RDb250YWluZXI7XG4gICAgICAgICAgICBzdGFnZUdyb3VwLmdyb3VwTmFtZSA9IGdyb3VwTmFtZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVHcm91cHMuYWRkKHN0YWdlR3JvdXApO1xuICAgICAgICAgICAgcmV0dXJuIHN0YWdlR3JvdXA7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRTdGF0ZVN0eWxlKGdyb3VwTmFtZTpzdHJpbmcsIHN0YXRlbmFtZTpzdHJpbmcsIGNvbnRyb2xwcm9wZXJ0eVZhbHVlczphbnksIGV2ZW50TmFtZTpzdHJpbmc9bnVsbCkge1xuICAgICAgICAgICAgbGV0IGdyb3VwcyA9IHRoaXMuc3RhdGVHcm91cHMuZmlsdGVyKHQ9PnQuZ3JvdXBOYW1lPT1ncm91cE5hbWUpO1xuICAgICAgICAgICAgbGV0IGdyb3VwOlN0YXRlR3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgaWYoZ3JvdXBzLmxlbmd0aD09MCkge1xuICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5hZGRTdGF0ZUdyb3VwKGdyb3VwTmFtZSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBncm91cCA9IGdyb3Vwc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHN0YXRlcyA9IGdyb3VwLnN0YXRlcy5maWx0ZXIodD0+dC5uYW1lPT1zdGF0ZW5hbWUpO1xuICAgICAgICAgICAgbGV0IHN0YXRlOlN0YXRlID0gbnVsbDtcbiAgICAgICAgICAgIGlmKHN0YXRlcy5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgIHN0YXRlID0gbmV3IFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgc3RhdGUubmFtZSA9IHN0YXRlbmFtZTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5zdHlsZSA9IG5ldyBTdHlsZSgpO1xuICAgICAgICAgICAgICAgIGdyb3VwLmFkZFN0YXRlKHN0YXRlKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZXNbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGNvbnRyb2xOYW1lIGluIGNvbnRyb2xwcm9wZXJ0eVZhbHVlcykge1xuICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eVZhbHVlcyA9IGNvbnRyb2xwcm9wZXJ0eVZhbHVlc1tjb250cm9sTmFtZV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcGVydHlOYW1lIGluIHByb3BlcnR5VmFsdWVzKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvcGVydHlWYWx1ZXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuc3R5bGUuYWRkU3R5bGVJdGVtKGNvbnRyb2xOYW1lLHByb3BlcnR5TmFtZSx2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZXZlbnROYW1lKSB0aGlzLmFkZFN0YXRlVHJpZ2dlcihncm91cE5hbWUsc3RhdGVuYW1lLGV2ZW50TmFtZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFN0YXRlVHJpZ2dlcihncm91cE5hbWU6c3RyaW5nLCBzdGF0ZU5hbWU6c3RyaW5nLCBldmVudE5hbWU6c3RyaW5nKTp2b2lkIHtcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyID0gbmV3IERvbUV2ZW50VHJpZ2dlcigpO1xuICAgICAgICAgICAgdHJpZ2dlci5jb250cm9sID0gdGhpcztcbiAgICAgICAgICAgIHRyaWdnZXIuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICAgICAgbGV0IGdvdG9zdGF0ZWFjdGlvbiA9IG5ldyBHb3RvU3RhdGVBY3Rpb24oKTtcbiAgICAgICAgICAgIGdvdG9zdGF0ZWFjdGlvbi50ZW1wbGF0ZUNvbnRyb2wgPSB0aGlzO1xuICAgICAgICAgICAgZ290b3N0YXRlYWN0aW9uLnN0YXRlTmFtZSA9IHN0YXRlTmFtZTtcbiAgICAgICAgICAgIGdvdG9zdGF0ZWFjdGlvbi5ncm91cE5hbWUgPSBncm91cE5hbWU7XG4gICAgICAgICAgICB0cmlnZ2VyLmFjdGlvbiA9IGdvdG9zdGF0ZWFjdGlvbjtcbiAgICAgICAgICAgIHRyaWdnZXIuaW5pdCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUV2ZW50VHJpZ2dlcnMuYWRkKHRyaWdnZXIpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBhY3RpdmVTdGF0ZShncm91cE5hbWU6c3RyaW5nLCBzdGF0ZU5hbWU6c3RyaW5nKTp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IHN0YXRlR3JvdXAgb2YgdGhpcy5zdGF0ZUdyb3Vwcykge1xuICAgICAgICAgICAgICAgIC8vIHN0YXRlR3JvdXAuaXNBY3RpdmUgPSBzdGF0ZUdyb3VwLmdyb3VwTmFtZSA9PSBncm91cE5hbWU7XG4gICAgICAgICAgICAgICAgaWYoc3RhdGVHcm91cC5ncm91cE5hbWU9PWdyb3VwTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlR3JvdXAuYXBwbHlTdGF0ZShzdGF0ZU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICB0aGlzLmRvTGF5b3V0KCk7XG4gICAgICAgICAgICB9Y2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290Qm9yZGVyLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuaG9yaXpvbkFsaWdubWVudCA9IHRoaXMuaG9yaXpvbkFsaWdubWVudDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci52ZXJ0aWNhbEFsaWdubWVudCA9IHRoaXMudmVydGljYWxBbGlnbm1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuYWRkQ2hpbGQodGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyKTtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5tYXJnaW4gPSB0aGlzLm1hcmdpbjtcbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuXG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIucGFyZW50U2xvdCA9IHRoaXMucGFyZW50U2xvdDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5wYXJlbnQgPSB0aGlzLnBhcmVudDtcblxuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLmFzc2VtYmxlRG9tKCk7XG5cbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIG9uRXZlbnQodGhpcy5nZXRSb290RWxlbWVudCgpLFwiY2xpY2tcIixmdW5jdGlvbiAoZTphbnkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJhaXNlRXZlbnQoXCJjbGlja1wiLFtlXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uRXZlbnQodGhpcy5nZXRSb290RWxlbWVudCgpLFwibW91c2VlbnRlclwiLGZ1bmN0aW9uIChlOmFueSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcIm1vdXNlZW50ZXJcIixbZV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvbkV2ZW50KHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSxcIm1vdXNlbGVhdmVcIixmdW5jdGlvbiAoZTphbnkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJhaXNlRXZlbnQoXCJtb3VzZWxlYXZlXCIsW2VdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb25FdmVudCh0aGlzLmdldFJvb3RFbGVtZW50KCksXCJtb3VzZWRvd25cIixmdW5jdGlvbiAoZTphbnkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJhaXNlRXZlbnQoXCJtb3VzZWRvd25cIixbZV0pO1xuICAgICAgICAgICAgICAgIHNlbGYucHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uRXZlbnQodGhpcy5nZXRSb290RWxlbWVudCgpLFwibW91c2V1cFwiLGZ1bmN0aW9uIChlOmFueSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcIm1vdXNldXBcIixbZV0pO1xuICAgICAgICAgICAgICAgIHNlbGYucHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvbkV2ZW50KHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSxcIm1vdXNlbW92ZVwiLGZ1bmN0aW9uIChlOmFueSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcIm1vdXNlbW92ZVwiLFtlXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5ob3Jpem9uQWxpZ25tZW50ID0gdGhpcy5ob3Jpem9uQWxpZ25tZW50O1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLnZlcnRpY2FsQWxpZ25tZW50ID0gdGhpcy52ZXJ0aWNhbEFsaWdubWVudDtcbiAgICAgICAgICAgIC8vIHRoaXMucm9vdEJvcmRlci5hZGRDaGlsZCh0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIpO1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLm1hcmdpbiA9IHRoaXMubWFyZ2luO1xuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnJvb3RCb3JkZXIucGFyZW50U2xvdCA9IHRoaXMucGFyZW50U2xvdDtcbiAgICAgICAgICAgIC8vIHRoaXMucm9vdEJvcmRlci5wYXJlbnQgPSB0aGlzLnBhcmVudDtcblxuICAgICAgICAgICAgLy8gdGhpcy5yb290Qm9yZGVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5kb0xheW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMucm9vdEJvcmRlci5jYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlZEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5jYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgQ29udGVudFByZXNlbnRlciBleHRlbmRzIEJvcmRlcntcblxuICAgICAgICBjb250ZW50OldpZGdldDtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHN1cGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEl0ZW1zUHJlc2VudGVyIHtcblxuICAgIH1cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQWN0aW9uIHtcclxuICAgICAgICBhYnN0cmFjdCBleGVjdXRlKCk6dm9pZDtcclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcclxuICAgIGV4cG9ydCBjbGFzcyBTZXRQcm9wZXJ0eUFjdGlvbiBleHRlbmRzIEFjdGlvbntcclxuXHJcbiAgICAgICAgY29udHJvbDpXaWRnZXQ7XHJcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcclxuICAgICAgICB2YWx1ZTphbnk7XHJcblxyXG4gICAgICAgIGV4ZWN1dGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBzZXR0ZXIgPSBuZXcgQ29udHJvbFByb3BlcnR5U2V0dGVyKHRoaXMuY29udHJvbCwgdGhpcy5wcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICBzZXR0ZXIuc2V0VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBNdWx0aUFjdGlvbiBleHRlbmRzIEFjdGlvbiB7XG5cbiAgICAgICAgcHJpdmF0ZSBhY3Rpb25zOkxpc3Q8QWN0aW9uPjtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBuZXcgTGlzdDxBY3Rpb24+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRBY3Rpb24oYWN0aW9uOiBBY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZChhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQWN0aW9uKGFjdGlvbjogQWN0aW9uKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5yZW1vdmUoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyQWN0aW9ucygpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBleGVjdXRlKCk6IHZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgYWN0aW9uIG9mIHRoaXMuYWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5leGVjdXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgR290b1N0YXRlQWN0aW9uIGV4dGVuZHMgQWN0aW9ue1xuXG4gICAgICAgIHRlbXBsYXRlQ29udHJvbDpUZW1wbGF0ZUNvbnRyb2w7XG4gICAgICAgIGdyb3VwTmFtZTpzdHJpbmc7XG4gICAgICAgIHN0YXRlTmFtZTpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXhlY3V0ZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMudGVtcGxhdGVDb250cm9sKSB0aGlzLnRlbXBsYXRlQ29udHJvbC5hY3RpdmVTdGF0ZSh0aGlzLmdyb3VwTmFtZSwgdGhpcy5zdGF0ZU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eUNoYW5nZWRUcmlnZ2VyIGV4dGVuZHMgQ29udHJvbFRyaWdnZXIge1xyXG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICAgICAgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5vblRyaWdnZXJlZCgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wuYWRkUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIodGhpcy5wcm9wZXJ0eU5hbWUsdGhpcy5jYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wucmVtb3ZlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIodGhpcy5jYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG4gICAgZXhwb3J0IGNsYXNzIFN0YXRlQ2hhbmdlZFRyaWdnZXIgZXh0ZW5kcyBDb250cm9sVHJpZ2dlciB7XHJcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgICAgICBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uVHJpZ2dlcmVkKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5hZGRTdGF0ZUNoYW5nZWRMaXN0ZW5lcih0aGlzLnByb3BlcnR5TmFtZSx0aGlzLmNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5yZW1vdmVTdGF0ZUNoYW5nZWRMaXN0ZW5lcih0aGlzLmNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBEb21FdmVudFRyaWdnZXIgZXh0ZW5kcyBDb250cm9sVHJpZ2dlcntcbiAgICAgICAgZXZlbnROYW1lOnN0cmluZztcbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb247XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vblRyaWdnZXJlZCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuZXZlbnROYW1lLHRoaXMuY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgV2lkZ2V0RXZlbnRUcmlnZ2VyIGV4dGVuZHMgQ29udHJvbFRyaWdnZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgb25FdmVudFRyaWdnZXJlZCgpOnZvaWR7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3Rpb24pIHRoaXMuYWN0aW9uLmV4ZWN1dGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXQoKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbiIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTdHlsZUl0ZW0ge1xyXG4gICAgICAgIG5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XHJcbiAgICAgICAgdmFsdWU6YW55O1xyXG5cclxuICAgICAgICBhcHBseShyb290Q29udHJvbDpXaWRnZXQpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRyb2wgPSBWaXN1YWxUcmVlLmZpbmRDb250cm9sQnlOYW1lKHJvb3RDb250cm9sLCB0aGlzLm5hbWUpO1xyXG4gICAgICAgICAgICBpZihjb250cm9sPT1udWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBzZXR0ZXIgPSBuZXcgQ29udHJvbFByb3BlcnR5U2V0dGVyKGNvbnRyb2wsIHRoaXMucHJvcGVydHlOYW1lKTtcclxuICAgICAgICAgICAgc2V0dGVyLnNldFZhbHVlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3R5bGUge1xyXG4gICAgICAgIHN0eWxlaXRlbXM6TGlzdDxTdHlsZUl0ZW0+O1xyXG4gICAgICAgIHRyaWdnZXJzOkxpc3Q8VHJpZ2dlcj47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlaXRlbXMgPSBuZXcgTGlzdDxTdHlsZUl0ZW0+KCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcnMgPSBuZXcgTGlzdDxUcmlnZ2VyPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkU3R5bGVJdGVtKGNvbnRyb2xOYW1lOnN0cmluZywgcHJvcGVydHlOYW1lOnN0cmluZywgdmFsdWU6YW55KTp2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBuZXcgU3R5bGVJdGVtKCk7XHJcbiAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGNvbnRyb2xOYW1lO1xyXG4gICAgICAgICAgICBpdGVtLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcclxuICAgICAgICAgICAgaXRlbS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlaXRlbXMuYWRkKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXBwbHkocm9vdENvbnRyb2w6V2lkZ2V0KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmKCFyb290Q29udHJvbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBzdHlsZWl0ZW0gb2YgdGhpcy5zdHlsZWl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZWl0ZW0uYXBwbHkocm9vdENvbnRyb2wpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCB0cmlnZ2VyIG9mIHRoaXMudHJpZ2dlcnMpICB7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgU3RhdGUge1xuICAgICAgICBuYW1lOnN0cmluZztcbiAgICAgICAgc3R5bGU6U3R5bGU7XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFN0YXRlR3JvdXAge1xuICAgICAgICBncm91cE5hbWU6c3RyaW5nO1xuICAgICAgICBzdGF0ZXM6TGlzdDxTdGF0ZT47XG4gICAgICAgIHJvb3RDb250cm9sOldpZGdldDtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzID0gbmV3IExpc3Q8U3RhdGU+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZU5hbWVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVzLm1hcCh0PT50Lm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkU3RhdGUoc3RhdGU6U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFkZChzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVTdGF0ZUJ5TmFtZShzdGF0ZU5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBsZXQgc3RhdGVzY2FuZGlkYXRlID0gdGhpcy5zdGF0ZXMuZmlsdGVyKHQ9PnQubmFtZT09c3RhdGVOYW1lKTtcbiAgICAgICAgICAgIGZvciAobGV0IHN0YXRlIG9mIHN0YXRlc2NhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJlbW92ZShzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVTdGF0ZShzdGF0ZTpTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVtb3ZlKHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUFsbFN0YXRlcygpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmaW5kU3RhdGVCeU5hbWUoc3RhdGVOYW1lOnN0cmluZyk6U3RhdGUge1xuICAgICAgICAgICAgbGV0IHN0YXRlcyA9IHRoaXMuc3RhdGVzLmZpbHRlcih0PT50Lm5hbWU9PXN0YXRlTmFtZSk7XG4gICAgICAgICAgICBpZihzdGF0ZXMubGVuZ3RoPjApIHJldHVybiBzdGF0ZXNbMF07XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5U3RhdGUoc3RhdGVOYW1lOnN0cmluZykge1xuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5maW5kU3RhdGVCeU5hbWUoc3RhdGVOYW1lKTtcbiAgICAgICAgICAgIGlmKHN0YXRlPT1udWxsKSByZXR1cm47XG4gICAgICAgICAgICBpZihzdGF0ZS5zdHlsZT09bnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYodGhpcy5yb290Q29udHJvbD09bnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgc3RhdGUuc3R5bGUuYXBwbHkodGhpcy5yb290Q29udHJvbCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG4gICAgY2xhc3MgVmlzdWFsVHJlZVN0eWxlIHtcclxuXHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBUZW1wbGF0ZUNvbnRyb2x7XG5cbiAgICAgICAgcmFkaXVzOiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX2NvbnRlbnQ6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBjb250ZW50UHJlc2VudG9yOiBDb250ZW50UHJlc2VudGVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IDU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGluaXRWaXN1YWxUcmVlKCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUgPSBuZXcgVmlzdWFsVHJlZSgpO1xuICAgICAgICAgICAgbGV0IHJvb3RCb3JkZXIgPSBuZXcgQm9yZGVyKFwicm9vdFwiKTtcblxuICAgICAgICAgICAgdGhpcy5jb250ZW50UHJlc2VudG9yID0gbmV3IENvbnRlbnRQcmVzZW50ZXIoXCJfY29udGVudFwiKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFByZXNlbnRvci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFByZXNlbnRvci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRQcmVzZW50b3IuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuQ2VudGVyO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50UHJlc2VudG9yLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuQ2VudGVyO1xuXG4gICAgICAgICAgICBsZXQgY29udGVudGNvbnRyb2w6V2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLl9jb250ZW50ID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB0aGlzLl9jb250ZW50ID09PSBcIm51bWJlclwiKXtcbiAgICAgICAgICAgICAgICBsZXQgdHh0ID0gbmV3IFRleHRWaWV3KFwiXCIsdGhpcy5fY29udGVudC50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB0eHQubWFyZ2luID0gbmV3IFRoaWNrbmVzcygxMCwxMCw1LDUpO1xuICAgICAgICAgICAgICAgIHR4dC5zZWxlY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29udGVudGNvbnRyb2wgPSB0eHQ7XG4gICAgICAgICAgICAgICAgY29udGVudGNvbnRyb2wuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sID0gPFdpZGdldD50aGlzLl9jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250ZW50UHJlc2VudG9yLmNvbnRlbnQgPSBjb250ZW50Y29udHJvbDtcblxuXG4gICAgICAgICAgICBsZXQgdmxpbmVhciA9IG5ldyBWbGluZWFybGF5b3V0KFwiXCIpO1xuICAgICAgICAgICAgdmxpbmVhci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB2bGluZWFyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdmxpbmVhci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHZsaW5lYXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdmxpbmVhci5hZGRDZWxsKG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUud2VpZ2h0LDEpKTtcbiAgICAgICAgICAgIHZsaW5lYXIuYWRkQ2VsbChuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLndlaWdodCwxKSk7XG4gICAgICAgICAgICBsZXQgYmdSZWN0MSA9IG5ldyBSZWN0KFwicmVjdHVwXCIpO1xuICAgICAgICAgICAgbGV0IGJnUmVjdDIgPSBuZXcgUmVjdChcInJlY3Rkb3duXCIpO1xuICAgICAgICAgICAgYmdSZWN0MS53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIGJnUmVjdDEuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgYmdSZWN0MS5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICBiZ1JlY3QxLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgYmdSZWN0MS5yYWRpdXNfdG9wX2xlZnQgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIGJnUmVjdDEucmFkaXVzX3RvcF9yaWdodCA9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgYmdSZWN0MS5maWxsID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNGMUYxRjFcIik7XG4gICAgICAgICAgICBiZ1JlY3QxLnN0cm9rZSA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjNDM3REQ0XCIpO1xuICAgICAgICAgICAgYmdSZWN0MS5zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKDEsMSwxLDApO1xuICAgICAgICAgICAgYmdSZWN0Mi53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIGJnUmVjdDIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgYmdSZWN0Mi5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICBiZ1JlY3QyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgYmdSZWN0Mi5yYWRpdXNfYm90dG9tX2xlZnQgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIGJnUmVjdDIucmFkaXVzX2JvdHRvbV9yaWdodCA9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgYmdSZWN0Mi5maWxsID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNFNUU1RTVcIik7XG4gICAgICAgICAgICBiZ1JlY3QyLnN0cm9rZSA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjNDM3REQ0XCIpO1xuICAgICAgICAgICAgYmdSZWN0Mi5zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKDEsMSwwLDEpO1xuICAgICAgICAgICAgdmxpbmVhci5hZGRDaGlsZChiZ1JlY3QxKTtcbiAgICAgICAgICAgIHZsaW5lYXIuYWRkQ2hpbGQoYmdSZWN0Mik7XG4gICAgICAgICAgICB2bGluZWFyLnNldENlbGwoYmdSZWN0MSwwKTtcbiAgICAgICAgICAgIHZsaW5lYXIuc2V0Q2VsbChiZ1JlY3QyLDEpO1xuICAgICAgICAgICAgcm9vdEJvcmRlci5hZGRDaGlsZCh2bGluZWFyKTtcbiAgICAgICAgICAgIHJvb3RCb3JkZXIuYWRkQ2hpbGQodGhpcy5jb250ZW50UHJlc2VudG9yKTtcbiAgICAgICAgICAgIHRoaXMudmlzdWFsVHJlZS5yb290Q29udGFpbmVyID0gcm9vdEJvcmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgaW5pdFN0YXRlcygpOnZvaWQge1xuXG4gICAgICAgICAgICB0aGlzLmFkZFN0YXRlU3R5bGUoXCJob3Zlckdyb3VwXCIsXCJtb3VzZWVudGVyXCIse1xuICAgICAgICAgICAgICAgIFwicmVjdHVwXCI6e1xuICAgICAgICAgICAgICAgICAgICBcInN0cm9rZVRoaWNrbmVzc1wiOiBuZXcgVGhpY2tuZXNzKDIsMiwyLDApXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInJlY3Rkb3duXCI6e1xuICAgICAgICAgICAgICAgICAgICBcInN0cm9rZVRoaWNrbmVzc1wiOiBuZXcgVGhpY2tuZXNzKDIsMiwwLDIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcIm1vdXNlZW50ZXJcIik7XG4gICAgICAgICAgICB0aGlzLmFkZFN0YXRlU3R5bGUoXCJob3Zlckdyb3VwXCIsXCJtb3VzZWxlYXZlXCIse1xuICAgICAgICAgICAgICAgIFwicmVjdHVwXCI6e1xuICAgICAgICAgICAgICAgICAgICBcInN0cm9rZVRoaWNrbmVzc1wiOiBuZXcgVGhpY2tuZXNzKDEsMSwxLDApXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInJlY3Rkb3duXCI6e1xuICAgICAgICAgICAgICAgICAgICBcInN0cm9rZVRoaWNrbmVzc1wiOiBuZXcgVGhpY2tuZXNzKDEsMSwwLDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcIm1vdXNlbGVhdmVcIik7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkU3RhdGVTdHlsZShcInByZXNzR3JvdXBcIixcInByZXNzZWRcIix7XG4gICAgICAgICAgICAgICAgXCJyZWN0dXBcIjp7XG4gICAgICAgICAgICAgICAgICAgIFwiZmlsbFwiOiBuZXcgU29saWRDb2xvckJydXNoKFwiI0YxRjFGMVwiKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJyZWN0ZG93blwiOntcbiAgICAgICAgICAgICAgICAgICAgXCJmaWxsXCI6IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjRjFGMUYxXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcIm1vdXNlZG93blwiKTtcbiAgICAgICAgICAgIHRoaXMuYWRkU3RhdGVTdHlsZShcInByZXNzR3JvdXBcIixcInJlbGVhc2VkXCIse1xuICAgICAgICAgICAgICAgIFwicmVjdHVwXCI6e1xuICAgICAgICAgICAgICAgICAgICBcImZpbGxcIjogbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNGMUYxRjFcIilcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwicmVjdGRvd25cIjp7XG4gICAgICAgICAgICAgICAgICAgIFwiZmlsbFwiOiBuZXcgU29saWRDb2xvckJydXNoKFwiI0U1RTVFNVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXCJtb3VzZXVwXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGNvbnRlbnQoKTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGNvbnRlbnQodmFsdWU6IGFueSkge1xuICAgICAgICAgICAgaWYodGhpcy5fY29udGVudD09dmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2VkKFwiY29udGVudFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmluaXRWaXN1YWxUcmVlKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRTdGF0ZXMoKTtcbiAgICAgICAgICAgIHN1cGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIFRlbXBsYXRlQ29udHJvbHtcbiAgICAgICAgbWluVmFsdWU6bnVtYmVyO1xuICAgICAgICBtYXhWYWx1ZTpudW1iZXI7XG4gICAgICAgIHZhbHVlOm51bWJlcjtcbiAgICAgICAgcmFkaXVzOm51bWJlcj01O1xuICAgICAgICBwcml2YXRlIHJlY3RQcm9jOiBSZWN0O1xuICAgICAgICBwcml2YXRlIHJlY3RVcDogUmVjdDtcbiAgICAgICAgYmFyZmlsbDpCcnVzaDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5taW5WYWx1ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLm1heFZhbHVlID0gMTAwO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IDMwO1xuXG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGluaXRWaXN1YWxUcmVlKCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUgPSBuZXcgVmlzdWFsVHJlZSgpO1xuXG4gICAgICAgICAgICBsZXQgcm9vdEJvcmRlciA9IG5ldyBCb3JkZXIoXCJyb290XCIpO1xuICAgICAgICAgICAgbGV0IHJlY3RQcm9jID0gbmV3IFJlY3QoXCJyZWN0UHJvY1wiKTtcbiAgICAgICAgICAgIGxldCByZWN0QmcgPSBuZXcgUmVjdChcInJlY3RCZ1wiKTtcbiAgICAgICAgICAgIGxldCByZWN0VXAgPSBuZXcgUmVjdChcInJlY3RVcFwiKTtcblxuICAgICAgICAgICAgcmVjdFByb2Mud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLDApO1xuICAgICAgICAgICAgcmVjdFByb2MuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgcmVjdFByb2MuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuTGVmdDtcbiAgICAgICAgICAgIHJlY3RQcm9jLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgcmVjdFByb2MucmFkaXVzX3RvcF9sZWZ0ID0gdGhpcy5yYWRpdXM7XG4gICAgICAgICAgICByZWN0UHJvYy5yYWRpdXNfYm90dG9tX2xlZnQgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIHJlY3RQcm9jLmZpbGwgPSB0aGlzLmJhcmZpbGw7XG4gICAgICAgICAgICByZWN0UHJvYy5zdHJva2UgPSB0aGlzLnN0cm9rZTtcbiAgICAgICAgICAgIHJlY3RQcm9jLnN0cm9rZVRoaWNrbmVzcyA9IG5ldyBUaGlja25lc3ModGhpcy5zdHJva2VUaGlja25lc3MubGVmdCwwLHRoaXMuc3Ryb2tlVGhpY2tuZXNzLnRvcCx0aGlzLnN0cm9rZVRoaWNrbmVzcy5ib3R0b20pO1xuXG4gICAgICAgICAgICByZWN0Qmcud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICByZWN0QmcuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgcmVjdEJnLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHJlY3RCZy52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHJlY3RCZy5yYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIHJlY3RCZy5maWxsID0gdGhpcy5maWxsO1xuICAgICAgICAgICAgcmVjdEJnLnN0cm9rZSA9IHRoaXMuc3Ryb2tlO1xuICAgICAgICAgICAgcmVjdEJnLnN0cm9rZVRoaWNrbmVzcyA9IHRoaXMuc3Ryb2tlVGhpY2tuZXNzO1xuICAgICAgICAgICAgcmVjdEJnLnNoYWRvdyA9IHRoaXMuc2hhZG93O1xuXG4gICAgICAgICAgICBsZXQgdmxpbmVhciA9IG5ldyBWbGluZWFybGF5b3V0KFwiXCIpO1xuICAgICAgICAgICAgdmxpbmVhci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB2bGluZWFyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdmxpbmVhci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHZsaW5lYXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuXG4gICAgICAgICAgICB2bGluZWFyLmFkZENlbGwobmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS53ZWlnaHQsMSkpO1xuICAgICAgICAgICAgdmxpbmVhci5hZGRDZWxsKG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUud2VpZ2h0LDEpKTtcbiAgICAgICAgICAgIHZsaW5lYXIuYWRkQ2hpbGQocmVjdFVwKTtcbiAgICAgICAgICAgIHZsaW5lYXIuc2V0Q2VsbChyZWN0VXAsMCk7XG5cbiAgICAgICAgICAgIHJlY3RVcC53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsMCk7XG4gICAgICAgICAgICByZWN0VXAuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgcmVjdFVwLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHJlY3RVcC52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHJlY3RVcC5yYWRpdXNfdG9wX2xlZnQgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIHJlY3RVcC5zdHJva2UgPSB0aGlzLnN0cm9rZTtcbiAgICAgICAgICAgIHJlY3RVcC5vcGFjaXR5ID0gMC41O1xuICAgICAgICAgICAgcmVjdFVwLmZpbGwgPSBuZXcgU29saWRDb2xvckJydXNoKFwid2hpdGVcIik7XG4gICAgICAgICAgICByZWN0VXAuc3Ryb2tlVGhpY2tuZXNzID0gbmV3IFRoaWNrbmVzcyh0aGlzLnN0cm9rZVRoaWNrbmVzcy5sZWZ0LDAsdGhpcy5zdHJva2VUaGlja25lc3MudG9wLDApO1xuXG4gICAgICAgICAgICByb290Qm9yZGVyLmFkZENoaWxkKHJlY3RCZyk7XG4gICAgICAgICAgICByb290Qm9yZGVyLmFkZENoaWxkKHJlY3RQcm9jKTtcbiAgICAgICAgICAgIHJvb3RCb3JkZXIuYWRkQ2hpbGQodmxpbmVhcik7XG5cbiAgICAgICAgICAgIHRoaXMucmVjdFByb2MgPSByZWN0UHJvYztcbiAgICAgICAgICAgIHRoaXMucmVjdFVwID0gcmVjdFVwO1xuICAgICAgICAgICAgdGhpcy52aXN1YWxUcmVlLnJvb3RDb250YWluZXIgPSByb290Qm9yZGVyO1xuICAgICAgICB9XG5cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFZpc3VhbFRyZWUoKTtcbiAgICAgICAgICAgIHN1cGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB3ID0gdGhpcy5jYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgICAgICBsZXQgcmVjdGVuZCA9IHcvKHRoaXMubWF4VmFsdWUtdGhpcy5taW5WYWx1ZSkqKHRoaXMudmFsdWUtdGhpcy5taW5WYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnJlY3RQcm9jLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxyZWN0ZW5kKTtcbiAgICAgICAgICAgIHRoaXMucmVjdFVwLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxyZWN0ZW5kKTtcbiAgICAgICAgICAgIHN1cGVyLmRvTGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBTbGlkZXJCYXIgZXh0ZW5kcyBUZW1wbGF0ZUNvbnRyb2x7XG5cbiAgICAgICAgbWluVmFsdWU6bnVtYmVyO1xuICAgICAgICBtYXhWYWx1ZTpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3ZhbHVlOm51bWJlcjtcbiAgICAgICAgcmFkaXVzOm51bWJlcjtcbiAgICAgICAgaGFuZGxlRmlsbDogQnJ1c2g7XG4gICAgICAgIGhhbmRsZVN0cm9rZTogQnJ1c2g7XG4gICAgICAgIHByaXZhdGUgcmVjdEhhbmRsZTogUmVjdDtcbiAgICAgICAgcHJpdmF0ZSBtb3VzZWRvd25WYWx1ZTpudW1iZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMubWluVmFsdWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5tYXhWYWx1ZSA9IDEwMDtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gMzA7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IDEwO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVGaWxsID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNmNWY1ZjVcIik7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVN0cm9rZSA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjZTVlNWU1XCIpO1xuICAgICAgICAgICAgdGhpcy5maWxsID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNlNWU1ZTVcIik7XG4gICAgICAgICAgICB0aGlzLnN0cm9rZSA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjZTVlNWU1XCIpO1xuICAgICAgICAgICAgdGhpcy5tb3VzZWRvd25WYWx1ZSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydGllcy5wdXNoKFwidmFsdWVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICBpZih0aGlzLl92YWx1ZSA9PSB2YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQoXCJ2YWx1ZVwiKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGluaXRWaXN1YWxUcmVlKCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUgPSBuZXcgVmlzdWFsVHJlZSgpO1xuICAgICAgICAgICAgbGV0IHJvb3RCb3JkZXIgPSBuZXcgQm9yZGVyKFwicm9vdFwiKTtcblxuICAgICAgICAgICAgbGV0IHJlY3RTdGljayA9IG5ldyBSZWN0KFwic2xpZGVyU3RpY2tcIik7XG4gICAgICAgICAgICByZWN0U3RpY2suaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgcmVjdFN0aWNrLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuQ2VudGVyO1xuICAgICAgICAgICAgcmVjdFN0aWNrLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgcmVjdFN0aWNrLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsMik7XG4gICAgICAgICAgICByZWN0U3RpY2suZmlsbCA9IHRoaXMuZmlsbDtcbiAgICAgICAgICAgIHJlY3RTdGljay5zdHJva2UgPSB0aGlzLnN0cm9rZTtcbiAgICAgICAgICAgIHJlY3RTdGljay5zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKDEsMSwxLDEpO1xuICAgICAgICAgICAgcmVjdFN0aWNrLnNoYWRvdyA9IG5ldyBTaGFkb3dTZXR0aW5ncygwLDAsNSwwLFwiI2NmY2ZjZlwiKTtcblxuICAgICAgICAgICAgbGV0IHJlY3RIYW5kbGUgPSBuZXcgUmVjdChcInNsaWRlckhhbmRsZVwiKTtcbiAgICAgICAgICAgIHJlY3RIYW5kbGUuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuTGVmdDtcbiAgICAgICAgICAgIHJlY3RIYW5kbGUudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5DZW50ZXI7XG4gICAgICAgICAgICByZWN0SGFuZGxlLnJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsdGhpcy5yYWRpdXMqMik7XG4gICAgICAgICAgICByZWN0SGFuZGxlLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsdGhpcy5yYWRpdXMqMik7XG4gICAgICAgICAgICByZWN0SGFuZGxlLmZpbGwgPSB0aGlzLmhhbmRsZUZpbGw7XG4gICAgICAgICAgICByZWN0SGFuZGxlLnN0cm9rZSA9IHRoaXMuaGFuZGxlU3Ryb2tlO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS5zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKDEsMSwxLDEpO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS5zaGFkb3cgPSBuZXcgU2hhZG93U2V0dGluZ3MoMCwwLDIwLDAsXCIjY2ZjZmNmXCIpO1xuXG4gICAgICAgICAgICByb290Qm9yZGVyLmFkZENoaWxkKHJlY3RTdGljayk7XG4gICAgICAgICAgICByb290Qm9yZGVyLmFkZENoaWxkKHJlY3RIYW5kbGUpO1xuXG4gICAgICAgICAgICBsZXQgbW91c2Vkb3duU2NyZWVuWCA9IDA7XG4gICAgICAgICAgICBsZXQgbW91c2Vkb3duU2NyZWVuWSA9IDA7XG4gICAgICAgICAgICBsZXQgaXNtb3VzZWRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBkeCA9IDA7XG4gICAgICAgICAgICBsZXQgZHkgPSAwO1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBvbkV2ZW50KHJlY3RIYW5kbGUuZ2V0Um9vdEVsZW1lbnQoKSxcIm1vdXNlZG93blwiLGZ1bmN0aW9uIChlOmFueSkge1xuICAgICAgICAgICAgICAgIG1vdXNlZG93blNjcmVlblggPSBlLnNjcmVlblg7XG4gICAgICAgICAgICAgICAgbW91c2Vkb3duU2NyZWVuWSA9IGUuc2NyZWVuWTtcbiAgICAgICAgICAgICAgICBpc21vdXNlZG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5tb3VzZWRvd25WYWx1ZSA9IHNlbGYuX3ZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvbkV2ZW50KGRvY3VtZW50LmJvZHksXCJtb3VzZW1vdmVcIixmdW5jdGlvbiAoZTphbnkpIHtcbiAgICAgICAgICAgICAgICBpZighaXNtb3VzZWRvd24pIHJldHVybjtcbiAgICAgICAgICAgICAgICBkeCA9IGUuc2NyZWVuWCAtIG1vdXNlZG93blNjcmVlblg7XG4gICAgICAgICAgICAgICAgZHkgPSBlLnNjcmVlblkgLSBtb3VzZWRvd25TY3JlZW5ZO1xuICAgICAgICAgICAgICAgIHNlbGYub25IYW5kbGVEcmFnKGR4LGR5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb25FdmVudChkb2N1bWVudC5ib2R5LFwibW91c2V1cFwiLGZ1bmN0aW9uIChlOmFueSkge1xuICAgICAgICAgICAgICAgIG1vdXNlZG93blNjcmVlblggPSBlLnNjcmVlblg7XG4gICAgICAgICAgICAgICAgbW91c2Vkb3duU2NyZWVuWSA9IGUuc2NyZWVuWTtcbiAgICAgICAgICAgICAgICBpc21vdXNlZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudmlzdWFsVHJlZS5yb290Q29udGFpbmVyID0gcm9vdEJvcmRlcjtcbiAgICAgICAgICAgIHRoaXMucmVjdEhhbmRsZSA9IHJlY3RIYW5kbGU7XG4gICAgICAgIH1cblxuICAgICAgICBvbkhhbmRsZURyYWcoZHg6IG51bWJlciwgZHk6IG51bWJlcik6IGFueSB7XG4gICAgICAgICAgICBsZXQgdyA9IHRoaXMuY2FsY3VsYXRlZFdpZHRoO1xuICAgICAgICAgICAgbGV0IHYgPSB0aGlzLm1vdXNlZG93blZhbHVlICsgZHgvdyoodGhpcy5tYXhWYWx1ZS10aGlzLm1pblZhbHVlKTtcbiAgICAgICAgICAgIGlmKHY+dGhpcy5tYXhWYWx1ZSkgdiA9IHRoaXMubWF4VmFsdWU7XG4gICAgICAgICAgICBpZih2PHRoaXMubWluVmFsdWUpIHYgPSB0aGlzLm1pblZhbHVlO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHY7XG4gICAgICAgICAgICB0aGlzLmRvTGF5b3V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFZpc3VhbFRyZWUoKTtcbiAgICAgICAgICAgIHN1cGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB3ID0gdGhpcy5jYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgICAgICBsZXQgcmVjdGVuZCA9IHcvKHRoaXMubWF4VmFsdWUtdGhpcy5taW5WYWx1ZSkqKHRoaXMuX3ZhbHVlLXRoaXMubWluVmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5yZWN0SGFuZGxlLm1hcmdpbi5sZWZ0ID0gcmVjdGVuZDtcbiAgICAgICAgICAgIHN1cGVyLmRvTGF5b3V0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3BlcnR5QmluZGluZyhwcm9wZXJ0eVByb3ZpZGVyOlByb3BlcnR5UHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6YW55LCB0YXJnZXRQcm9wTmFtZTpzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6YW55LCBzb3VyY2VQcm9wTmFtZTpzdHJpbmcsIG1vZGU6IEJpbmRpbmdNb2RlID0gQmluZGluZ01vZGUuT25ld2F5KTogUHJvcGVydHlCaW5kaW5nIHtcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvcGVydHlCaW5kaW5nKHByb3BlcnR5UHJvdmlkZXIpO1xuICAgICAgICBwLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgcC5zb3VyY2VQcm9wZXJ0eU5hbWUgPSBzb3VyY2VQcm9wTmFtZTtcbiAgICAgICAgcC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHAudGFyZ2V0UHJvcGVydHlOYW1lID0gdGFyZ2V0UHJvcE5hbWU7XG4gICAgICAgIHAubW9kZSA9IG1vZGU7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRVbml2ZXJzYWxQcm9wZXJ0eVByb3ZpZGVyKCkgOiBVbml2ZXJzYWxQcm9wZXJ0eVByb3ZpZGVyIHtcblxuICAgICAgICBsZXQgZ2V0dGVyUHJvdmlkZXIgPSBuZXcgVW5pdmVyc2FsUHJvcGVydHlHZXR0ZXJQcm92aWRlcigpO1xuICAgICAgICBsZXQgc2V0dGVyUHJvdmlkZXIgPSBuZXcgVW5pdmVyc2FsUHJvcGVydHlTZXR0ZXJQcm92aWRlcigpO1xuICAgICAgICBsZXQgbGlzdGVuZXJQcm92aWRlciA9IG5ldyBVbml2ZXJzYWxQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKCk7XG5cbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IENvbnRyb2xQcm9wZXJ0eUdldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBnZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tV2lkdGhQcm9wZXJ0eUdldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBnZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tSGVpZ2h0UHJvcGVydHlHZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVRleHRQcm9wZXJ0eUdldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBnZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tVmFsdWVQcm9wZXJ0eUdldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBnZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRGljdFByb3BlcnR5R2V0dGVyUHJvdmlkZXIoKSk7XG5cbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IENvbnRyb2xQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBzZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tV2lkdGhQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBzZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tSGVpZ2h0UHJvcGVydHlTZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVRleHRQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBzZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tVmFsdWVQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBzZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRGljdFByb3BlcnR5U2V0dGVyUHJvdmlkZXIoKSk7XG5cbiAgICAgICAgbGlzdGVuZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgQ29udHJvbFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIoKSk7XG4gICAgICAgIGxpc3RlbmVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVNpemVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKCkpO1xuICAgICAgICBsaXN0ZW5lclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEb21UZXh0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpKTtcbiAgICAgICAgbGlzdGVuZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tVmFsdWVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKCkpO1xuICAgICAgICBsaXN0ZW5lclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEaWN0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpKTtcblxuICAgICAgICByZXR1cm4gbmV3IFVuaXZlcnNhbFByb3BlcnR5UHJvdmlkZXIoZ2V0dGVyUHJvdmlkZXIsIHNldHRlclByb3ZpZGVyLCBsaXN0ZW5lclByb3ZpZGVyKTtcbiAgICB9XG5cbn0iXX0=
