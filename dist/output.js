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
            this.calulatedSlotWidth = 0;
            this.calulatedSlotHeight = 0;
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
                this.calulatedSlotWidth = maxwidth;
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
                this.calulatedSlotHeight = maxheight;
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
                    var w = this.calulatedSlotWidth;
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
                    var h = this.calulatedSlotHeight;
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
    var FrameworkElement = (function () {
        function FrameworkElement(name) {
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
        Object.defineProperty(FrameworkElement.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameworkElement.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameworkElement.prototype, "horizonAlignment", {
            get: function () {
                return this._horizonAlignment;
            },
            set: function (value) {
                this._horizonAlignment = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameworkElement.prototype, "verticalAlignment", {
            get: function () {
                return this._verticalAlignment;
            },
            set: function (value) {
                this._verticalAlignment = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameworkElement.prototype, "margin", {
            get: function () {
                return this._margin;
            },
            set: function (value) {
                this._margin = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameworkElement.prototype, "pressed", {
            get: function () {
                return this._pressed;
            },
            set: function (value) {
                this._pressed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameworkElement.prototype, "mouseenter", {
            get: function () {
                return this._mouseenter;
            },
            set: function (value) {
                this._mouseenter = value;
            },
            enumerable: true,
            configurable: true
        });
        FrameworkElement.prototype.forceRefresh = function () {
            this.assembleDom();
            this.doLayout();
        };
        // Assemble html elements of this control.
        FrameworkElement.prototype.assembleDom = function () {
        };
        // Adjust styles html elements of this control.
        FrameworkElement.prototype.doLayout = function () {
        };
        FrameworkElement.prototype.getStateProperties = function () {
            return [];
        };
        FrameworkElement.prototype.getNotifyProperties = function () {
            return this.notifyProperties;
        };
        FrameworkElement.prototype.addPropertyChangedListener = function (propertName, callback) {
            this.propChangedCallbacks.add(new PropertyChangedCallbackItem(propertName, callback));
        };
        FrameworkElement.prototype.removePropertyChangedListener = function (callback) {
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
        FrameworkElement.prototype.addStateChangedListener = function (propertyName, callback) {
        };
        FrameworkElement.prototype.removeStateChangedListener = function (callback) {
        };
        FrameworkElement.prototype.notifyPropertyChanged = function (propertyName) {
            for (var _i = 0, _a = this.propChangedCallbacks; _i < _a.length; _i++) {
                var propcallbackitem = _a[_i];
                if (propcallbackitem.propertyName == propertyName) {
                    if (propcallbackitem.callback)
                        propcallbackitem.callback(propertyName);
                }
            }
        };
        FrameworkElement.prototype.addEventListener = function (eventName, callback) {
            this.eventCallbacks.add(new EventCallbackItem(eventName, callback));
        };
        FrameworkElement.prototype.removeEventListener = function (callback) {
            var events = this.eventCallbacks.filter(function (t) { return t.callback == callback; });
            if (events.length > 0) {
                this.eventCallbacks.remove(events[0]);
            }
        };
        FrameworkElement.prototype.raiseEvent = function (eventName, args) {
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
        return FrameworkElement;
    }());
    LayoutLzg.FrameworkElement = FrameworkElement;
    // Control class is the base class of all the visual components.
    var Control = (function (_super) {
        __extends(Control, _super);
        function Control(name) {
            _super.call(this, name);
            this._strokeThickness = new LayoutLzg.Thickness(0, 0, 0, 0);
            this.calculatedWidth = 0;
            this.calculatedHeight = 0;
        }
        Object.defineProperty(Control.prototype, "fill", {
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
        Object.defineProperty(Control.prototype, "stroke", {
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
        Object.defineProperty(Control.prototype, "strokeThickness", {
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
        Object.defineProperty(Control.prototype, "shadow", {
            get: function () {
                return this._shadow;
            },
            set: function (value) {
                this._shadow = value;
            },
            enumerable: true,
            configurable: true
        });
        return Control;
    }(FrameworkElement));
    LayoutLzg.Control = Control;
    // The purpose of the container is to put sub controls together,
    // and the system provides multiple layout containers due to actual requirements.
    var ContainerControl = (function (_super) {
        __extends(ContainerControl, _super);
        function ContainerControl(name) {
            _super.call(this, name);
            this.children = new LayoutLzg.List();
            this.slots = new LayoutLzg.List();
        }
        ContainerControl.prototype.addChild = function (control) {
            this.children.add(control);
            control.parent = this;
        };
        ContainerControl.prototype.removeChild = function (control) {
            this.children.remove(control);
            control.parent = null;
        };
        ContainerControl.prototype.clearChild = function () {
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.parent = null;
                if (child.parentSlot) {
                    child.parentSlot.removeChild(child);
                }
            }
            this.children.clear();
        };
        ContainerControl.prototype.doLayout = function () {
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                slot.layoutChildren();
            }
        };
        ContainerControl.prototype.dispose = function () {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.dispose();
            }
        };
        return ContainerControl;
    }(Control));
    LayoutLzg.ContainerControl = ContainerControl;
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
            $(elem).css("background-color", this.color);
        };
        SolidColorBrush.prototype.applyToBorder = function (elem, thickness) {
            $(elem).css("border-color", this.color);
            $(elem).css("border-left-width", thickness.left + "px");
            $(elem).css("border-right-width", thickness.right + "px");
            $(elem).css("border-top-width", thickness.top + "px");
            $(elem).css("border-bottom-width", thickness.bottom + "px");
            $(elem).css("border-left-style", "solid");
            $(elem).css("border-right-style", "solid");
            $(elem).css("border-top-style", "solid");
            $(elem).css("border-bottom-style", "solid");
        };
        SolidColorBrush.prototype.applyToBorderLeft = function (elem, thickness) {
        };
        SolidColorBrush.prototype.applyToBorderRight = function (elem, thickness) {
        };
        SolidColorBrush.prototype.applyToBorderTop = function (elem, thickness) {
        };
        SolidColorBrush.prototype.applyToBorderBottom = function (elem, thickness) {
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
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).css("box-sizing", "border-box");
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
    }(LayoutLzg.Control));
    LayoutLzg.ControlBase = ControlBase;
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
            if (this.rootElem == null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type', 'TextView');
                $(this.rootElem).attr('layout-name', this.name);
            }
            return this.rootElem;
        };
        TextView.prototype.assembleDom = function () {
            this.spanElem = $("<span></span>")[0];
            $(this.getRootElement()).empty();
            if (this.width.type == LayoutLzg.DistanceType.fixed)
                $(this.getRootElement()).css('width', this.width.value + 'px');
            if (this.height.type == LayoutLzg.DistanceType.fixed)
                $(this.getRootElement()).css('height', this.height.value + 'px');
            $(this.getRootElement()).append(this.spanElem);
            $(this.spanElem).text(this._text);
            if (this._wordWrap)
                $(this.spanElem).css('word-break', 'break-all');
            else
                $(this.spanElem).css('word-break', 'normal');
        };
        TextView.prototype.doLayout = function () {
            _super.prototype.doLayout.call(this);
            if (!this._selectable) {
                $(this.spanElem).css("user-select", "none");
            }
            else {
                $(this.spanElem).css("user-select", "");
            }
        };
        TextView.prototype.calculateWidthFromTop = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedWidth = this.width.value;
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                this.calculatedWidth = this.parentSlot.calulatedSlotWidth;
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
                this.calculatedHeight = this.parentSlot.calulatedSlotHeight;
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
    }(LayoutLzg.ControlBase));
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
            $(elem).attr('layout-type', 'Rect');
            $(elem).attr('layout-name', this.name);
            return elem;
        };
        Rect.prototype.assembleDom = function () {
            _super.prototype.assembleDom.call(this);
        };
        Rect.prototype.doLayout = function () {
            $(this.getRootElement()).css('position', 'absolute');
            $(this.getRootElement()).css('width', this.calculatedWidth + 'px');
            $(this.getRootElement()).css('height', this.calculatedHeight + 'px');
            // stroke and fill
            if (this.fill)
                this.fill.applyToBackground(this.rootElem);
            if (this.stroke)
                this.stroke.applyToBorder(this.rootElem, this.strokeThickness);
            // radius
            $(this.rootElem).css("border-bottom-left-radius", this.radius_bottom_left + "px");
            $(this.rootElem).css("border-bottom-right-radius", this.radius_bottom_right + "px");
            $(this.rootElem).css("border-top-left-radius", this.radius_top_left + "px");
            $(this.rootElem).css("border-top-right-radius", this.radius_top_right + "px");
            // opacity
            $(this.rootElem).css("opacity", this.opacity);
            // shadow
            if (this.shadow) {
                $(this.rootElem).css("box-shadow", this.shadow.toBoxShawdowString());
            }
        };
        Rect.prototype.calculateWidthFromTop = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedWidth = this.width.value;
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                this.calculatedWidth = this.parentSlot.calulatedSlotWidth;
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
                this.calculatedHeight = this.parentSlot.calulatedSlotHeight;
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
    }(LayoutLzg.ControlBase));
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
            $(this.getRootElement()).empty();
            if (this.imgElem == null) {
                this.imgElem = $("<img/>")[0];
                $(this.imgElem).attr('src', this.src);
            }
            $(this.getRootElement()).append(this.imgElem);
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                $(this.getRootElement()).css('width', this.width.value + 'px');
                $(this.imgElem).css('width', this.width.value + 'px');
            }
            else {
                $(this.imgElem).css('width', '100%');
            }
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                $(this.getRootElement()).css('height', this.height.value + 'px');
                $(this.imgElem).css('height', this.height.value + 'px');
            }
            else {
                $(this.imgElem).css('height', '100%');
            }
        };
        ImageView.prototype.doLayout = function () {
        };
        return ImageView;
    }(LayoutLzg.ControlBase));
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
                    return this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
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
                    return this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
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
                this.rootElem = $("<div></div>")[0];
            }
            return this.rootElem;
        };
        return ContainerBase;
    }(LayoutLzg.ContainerControl));
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
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type', 'Border');
                $(this.rootElem).attr('layout-name', this.name);
            }
            return this.rootElem;
        };
        Border.prototype.addChild = function (control) {
            _super.prototype.addChild.call(this, control);
            this.mainSlot.addChild(control);
        };
        Border.prototype.assembleDom = function () {
            $(this.getRootElement()).empty();
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.assembleDom();
                var wrapperDiv = $("<div></div>")[0];
                $(wrapperDiv).attr('layout-tag', 'wrapper');
                this.childWrappersMap.put(child, wrapperDiv);
                $(this.getRootElement()).append(wrapperDiv);
                $(wrapperDiv).append(child.getRootElement());
            }
        };
        Border.prototype.doLayout = function () {
            $(this.getRootElement()).css('position', 'absolute');
            $(this.getRootElement()).css('width', this.calculatedWidth + 'px');
            $(this.getRootElement()).css('height', this.calculatedHeight + 'px');
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                for (var _b = 0, _c = slot.children; _b < _c.length; _b++) {
                    var child = _c[_b];
                    var wrapperDiv = this.childWrappersMap.get(child);
                    $(wrapperDiv).css('position', 'absolute');
                    $(wrapperDiv).css('left', child.margin.left + 'px');
                    $(wrapperDiv).css('right', child.margin.right + 'px');
                    $(wrapperDiv).css('top', child.margin.top + 'px');
                    $(wrapperDiv).css('bottom', child.margin.bottom + 'px');
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
                    slot.calulatedSlotWidth = this.width.value;
                }
                this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                this.calculatedWidth = this.mainSlot.calulatedSlotWidth;
                for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                    var slot = _c[_b];
                    slot.isSlotWidthCalculatable = true;
                    slot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth;
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
                slot.calulatedSlotWidth = this.calculatedWidth;
            }
            this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
        };
        Border.prototype.calculateHeightFromTop = function () {
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                this.calculatedHeight = this.height.value;
                for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                    var slot = _a[_i];
                    slot.isSlotHeightCalculatable = true;
                    slot.calulatedSlotHeight = this.height.value;
                }
                this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                    var slot = _c[_b];
                    slot.isSlotHeightCalculatable = true;
                    slot.calulatedSlotHeight = this.parentSlot.calulatedSlotHeight;
                }
                this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
                this.calculatedHeight = this.mainSlot.calulatedSlotHeight;
                return;
            }
            // 终止向下计算，从下向上计算
            this.slots.forEach(function (t) { return t.isSlotHeightCalculatable = false; });
            this.calculateHeightFromBottom();
            for (var _d = 0, _e = this.slots; _d < _e.length; _d++) {
                var slot = _e[_d];
                slot.isSlotHeightCalculatable = true;
                slot.calulatedSlotHeight = this.calculatedHeight;
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
            this.calculatedWidth = this.mainSlot.calulatedSlotWidth;
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
            this.calculatedHeight = this.mainSlot.calulatedSlotHeight;
        };
        return Border;
    }(LayoutLzg.ContainerControl));
    LayoutLzg.Border = Border;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var SlotItem = (function () {
        function SlotItem(slotBorder, slotDefination) {
            this.slotBorder = slotBorder;
            this.slotDefination = slotDefination;
        }
        return SlotItem;
    }());
    var HorizonalLinearLayout = (function (_super) {
        __extends(HorizonalLinearLayout, _super);
        function HorizonalLinearLayout(name) {
            _super.call(this, name);
            this.slotMap = new LayoutLzg.Map();
        }
        HorizonalLinearLayout.prototype.addCell = function (distance) {
            var slot = new LayoutLzg.Slot();
            slot.container = this;
            this.slots.add(slot);
            if (!this.slotMap.containsKey(slot))
                this.slotMap.put(slot, new SlotItem(null, null));
            var item = this.slotMap.get(slot);
            item.slotDefination = distance;
        };
        HorizonalLinearLayout.prototype.addChild = function (control) {
            _super.prototype.addChild.call(this, control);
        };
        HorizonalLinearLayout.prototype.removeChild = function (control) {
            _super.prototype.removeChild.call(this, control);
        };
        HorizonalLinearLayout.prototype.clearChild = function () {
            _super.prototype.clearChild.call(this);
        };
        HorizonalLinearLayout.prototype.setCell = function (control, cellIndex) {
            var idx = this.children.indexOf(control);
            if (idx > -1) {
                var slot = this.slots[cellIndex];
                slot.addChild(control);
            }
        };
        HorizonalLinearLayout.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type', 'HorizonalLinearLayout');
                $(this.rootElem).attr('layout-name', this.name);
            }
            return this.rootElem;
        };
        HorizonalLinearLayout.prototype.initCalculableSlots = function () {
            var weightSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
            }
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                for (var i = 0; i < this.slots.length; i++) {
                    var slot = this.slots[i];
                    var item = this.slotMap.get(slot);
                    var cellDefination = item.slotDefination;
                    if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotWidthCalculatable = true;
                            child.parentSlot.calulatedSlotWidth = cellDefination.value;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                    else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotWidthCalculatable = true;
                            child.parentSlot.calulatedSlotWidth = this.width.value * cellDefination.value / weightSum;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                }
            }
            else {
                if (this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                    for (var i = 0; i < this.slots.length; i++) {
                        var slot = this.slots[i];
                        var item = this.slotMap.get(slot);
                        var cellDefination = item.slotDefination;
                        if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                            for (var j = 0; j < slot.children.length; j++) {
                                var child = slot.children[j];
                                child.parentSlot.isSlotWidthCalculatable = true;
                                child.parentSlot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                                if (child instanceof LayoutLzg.ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                        else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                            for (var j = 0; j < slot.children.length; j++) {
                                var child = slot.children[j];
                                child.parentSlot.isSlotWidthCalculatable = false;
                                if (child instanceof LayoutLzg.ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.slots.length; i++) {
                        var slot = this.slots[i];
                        var item = this.slotMap.get(slot);
                        var cellDefination = item.slotDefination;
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotWidthCalculatable = false;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                }
            }
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    child.parentSlot.isSlotHeightCalculatable = true;
                    child.parentSlot.calulatedSlotHeight = this.height.value;
                    if (child instanceof LayoutLzg.ContainerControl) {
                        var container = child;
                        container.initCalculableSlots();
                    }
                }
            }
            else {
                if (this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.parentSlot.isSlotHeightCalculatable = true;
                        child.parentSlot.calulatedSlotHeight = this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
                        if (child instanceof LayoutLzg.ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.parentSlot.isSlotHeightCalculatable = false;
                        if (child instanceof LayoutLzg.ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }
        };
        HorizonalLinearLayout.prototype.assembleDom = function () {
            // init variables and htmlelements
            $(this.getRootElement()).empty();
            if (this.borderElem == null)
                this.borderElem = $("<div></div>")[0];
            // add cell wrapper divs to rootElem
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var border = new LayoutLzg.Border('');
                border.initCalculableSlots();
                $(this.getRootElement()).append(border.getRootElement());
                item.slotBorder = border;
            }
            // add children rootElems to cell wrappers
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var border = item.slotBorder;
                for (var j = 0; j < slot.children.length; j++) {
                    var child = slot.children[j];
                    child.assembleDom();
                    border.addChild(child);
                    border.assembleDom();
                }
                item.slotBorder = border;
            }
        };
        HorizonalLinearLayout.prototype.doLayout = function () {
            // calculate weightSum and fixSum
            var weightSum = 0;
            var fixSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed)
                    fixSum += cellDefination.value;
            }
            // set rootElem styles
            $(this.getRootElement()).css('position', 'absolute');
            $(this.getRootElement()).css('width', this.estimateWidth() + 'px');
            $(this.getRootElement()).css('height', this.estimateHeight() + 'px');
            // set border and background styles
            $(this.borderElem).css('position', 'absolute');
            $(this.borderElem).css('left', '0px');
            $(this.borderElem).css('right', '0px');
            $(this.borderElem).css('top', '0px');
            $(this.borderElem).css('bottom', '0px');
            if (this.stroke) {
                this.stroke.applyToBorder(this.borderElem, this.strokeThickness);
            }
            if (this.fill) {
                this.fill.applyToBackground(this.borderElem);
            }
            var pos = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                var border = item.slotBorder;
                $(border.getRootElement()).css('position', 'absolute');
                $(border.getRootElement()).css('top', '0px');
                $(border.getRootElement()).css('bottom', '0px');
                var cellw = 0;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                    cellw = cellDefination.value;
                }
                else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                    cellw = (this.estimateWidth() - fixSum) * cellDefination.value / weightSum;
                }
                $(border.getRootElement()).css('left', pos + 'px');
                border.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, cellw);
                border.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
                border.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
                border.parentSlot = slot;
                border.parentSlot.isSlotHeightCalculatable = true;
                border.parentSlot.calulatedSlotHeight = this.estimateHeight();
                border.parentSlot.isSlotWidthCalculatable = true;
                border.parentSlot.calulatedSlotWidth = cellw;
                pos += cellw;
                border.doLayout();
            }
        };
        HorizonalLinearLayout.prototype.estimateWidth = function () {
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
                    return this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                }
            }
            else {
                if (this.width.type == LayoutLzg.DistanceType.fixed) {
                    return this.width.value;
                }
                else if (this.width.type == LayoutLzg.DistanceType.auto) {
                    return this.estimateWidth_auto();
                }
            }
        };
        HorizonalLinearLayout.prototype.estimateHeight = function () {
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
                    return this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
                }
            }
            else {
                if (this.height.type == LayoutLzg.DistanceType.fixed) {
                    return this.height.value;
                }
                else if (this.height.type == LayoutLzg.DistanceType.auto) {
                    return this.estimateHeight_auto();
                }
            }
        };
        HorizonalLinearLayout.prototype.estimateHeight_auto = function () {
            if (this.children.length > 0) {
                var heightlist = this.children.map(function (t) { return t.estimateHeight() + t.margin.top + t.margin.bottom; });
                heightlist.sort().reverse();
                return heightlist[0];
            }
            return 0;
        };
        HorizonalLinearLayout.prototype.estimateWidth_auto = function () {
            if (this.children.length > 0) {
                var widthlist = this.children.map(function (t) { return t.estimateWidth() + t.margin.left + t.margin.right; });
                widthlist.sort(function (a, b) { return b - a; });
                return widthlist[0];
            }
            return 0;
        };
        return HorizonalLinearLayout;
    }(LayoutLzg.ContainerBase));
    LayoutLzg.HorizonalLinearLayout = HorizonalLinearLayout;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var SlotItem = (function () {
        function SlotItem(slotBorder, slotDefination) {
            this.slotBorder = slotBorder;
            this.slotDefination = slotDefination;
        }
        return SlotItem;
    }());
    LayoutLzg.SlotItem = SlotItem;
    var Verticallinearlayout2 = (function (_super) {
        __extends(Verticallinearlayout2, _super);
        function Verticallinearlayout2(name) {
            _super.call(this, name);
            this.slotMap = new LayoutLzg.Map();
        }
        Verticallinearlayout2.prototype.addCell = function (distance) {
            var slot = new LayoutLzg.Slot();
            slot.container = this;
            this.slots.add(slot);
            if (!this.slotMap.containsKey(slot))
                this.slotMap.put(slot, new SlotItem(new LayoutLzg.Border("LinearCell"), null));
            var item = this.slotMap.get(slot);
            item.slotDefination = distance;
            _super.prototype.addChild.call(this, item.slotBorder);
        };
        Verticallinearlayout2.prototype.addChild = function (control) {
            this.children.add(control);
        };
        Verticallinearlayout2.prototype.removeChild = function (control) {
            this.children.remove(control);
        };
        Verticallinearlayout2.prototype.clearChild = function () {
            this.children.clear();
        };
        Verticallinearlayout2.prototype.setCell = function (control, cellIndex) {
            var idx = this.children.indexOf(control);
            if (idx > -1) {
                var slot = this.slots[cellIndex];
                slot.addChild(control);
                var item = this.slotMap.get(slot);
                item.slotBorder.addChild(control);
            }
        };
        Verticallinearlayout2.prototype.initCalculableSlots = function () {
            var weightSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
            }
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                for (var i = 0; i < this.slots.length; i++) {
                    var slot = this.slots[i];
                    var item = this.slotMap.get(slot);
                    var cellDefination = item.slotDefination;
                    if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotHeightCalculatable = true;
                            child.parentSlot.calulatedSlotHeight = cellDefination.value;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                    else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotHeightCalculatable = true;
                            child.parentSlot.calulatedSlotHeight = this.height.value * cellDefination.value / weightSum;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                }
            }
            else {
                if (this.parentSlot.isSlotHeightCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                    for (var i = 0; i < this.slots.length; i++) {
                        var slot = this.slots[i];
                        var item = this.slotMap.get(slot);
                        var cellDefination = item.slotDefination;
                        if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                            for (var j = 0; j < slot.children.length; j++) {
                                var child = slot.children[j];
                                child.parentSlot.isSlotHeightCalculatable = true;
                                child.parentSlot.calulatedSlotHeight = this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
                                if (child instanceof LayoutLzg.ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                        else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                            for (var j = 0; j < slot.children.length; j++) {
                                var child = slot.children[j];
                                child.parentSlot.isSlotHeightCalculatable = false;
                                if (child instanceof LayoutLzg.ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.slots.length; i++) {
                        var slot = this.slots[i];
                        var item = this.slotMap.get(slot);
                        var cellDefination = item.slotDefination;
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotHeightCalculatable = false;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                }
            }
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    child.parentSlot.isSlotWidthCalculatable = true;
                    child.parentSlot.calulatedSlotWidth = this.width.value;
                    if (child instanceof LayoutLzg.ContainerControl) {
                        var container = child;
                        container.initCalculableSlots();
                    }
                }
            }
            else {
                if (this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.parentSlot.isSlotWidthCalculatable = true;
                        child.parentSlot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                        if (child instanceof LayoutLzg.ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.parentSlot.isSlotWidthCalculatable = false;
                        if (child instanceof LayoutLzg.ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }
        };
        Verticallinearlayout2.prototype.doLayout = function () {
            // calculate weightSum and fixSum
            var weightSum = 0;
            var fixSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed)
                    fixSum += cellDefination.value;
            }
            var pos = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                var border = item.slotBorder;
                var cellh = 0;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                    cellh = cellDefination.value;
                }
                else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                    cellh = (this.estimateHeight() - fixSum) * cellDefination.value / weightSum;
                }
                border.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
                border.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, cellh);
                border.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
                border.verticalAlignment = LayoutLzg.VerticalAlignment.Top;
                pos += cellh;
                border.doLayout();
            }
        };
        Verticallinearlayout2.prototype.estimateWidth = function () {
            if (this.parentSlot.isSlotWidthCalculatable) {
                if (this.horizonAlignment == LayoutLzg.HorizonAlignment.Center
                    || this.horizonAlignment == LayoutLzg.HorizonAlignment.Left
                    || this.horizonAlignment == LayoutLzg.HorizonAlignment.Right) {
                    if (this.width.type == LayoutLzg.DistanceType.fixed) {
                        return this.width.value;
                    }
                    else if (this.width.type == LayoutLzg.DistanceType.auto) {
                        if (this.children.length > 0) {
                            var widthlist = this.children.map(function (t) { return t.estimateWidth() + t.margin.left + t.margin.right; });
                            widthlist.sort(function (a, b) { return b - a; });
                            return widthlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                    return this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                }
            }
            else {
                if (this.width.type == LayoutLzg.DistanceType.fixed) {
                    return this.width.value;
                }
                else if (this.width.type == LayoutLzg.DistanceType.auto) {
                    if (this.children.length > 0) {
                        var widthlist = this.children.map(function (t) { return t.estimateWidth() + t.margin.left + t.margin.right; });
                        widthlist.sort(function (a, b) { return b - a; });
                        return widthlist[0];
                    }
                    return 0;
                }
            }
        };
        Verticallinearlayout2.prototype.estimateHeight = function () {
            if (this.parentSlot.isSlotHeightCalculatable) {
                if (this.verticalAlignment == LayoutLzg.VerticalAlignment.Center
                    || this.verticalAlignment == LayoutLzg.VerticalAlignment.Top
                    || this.verticalAlignment == LayoutLzg.VerticalAlignment.Bottom) {
                    if (this.height.type == LayoutLzg.DistanceType.fixed) {
                        return this.height.value;
                    }
                    else if (this.height.type == LayoutLzg.DistanceType.auto) {
                        if (this.children.length > 0) {
                            var heightlist = this.children.map(function (t) { return t.estimateHeight() + t.margin.top + t.margin.bottom; });
                            heightlist.sort().reverse();
                            return heightlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                    return this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
                }
            }
            else {
                if (this.height.type == LayoutLzg.DistanceType.fixed) {
                    return this.height.value;
                }
                else if (this.height.type == LayoutLzg.DistanceType.auto) {
                    if (this.children.length > 0) {
                        var heightlist = this.children.map(function (t) { return t.estimateHeight() + t.margin.top + t.margin.bottom; });
                        heightlist.sort().reverse();
                        return heightlist[0];
                    }
                    return 0;
                }
            }
        };
        return Verticallinearlayout2;
    }(LayoutLzg.Border));
    LayoutLzg.Verticallinearlayout2 = Verticallinearlayout2;
    var VerticalLinearLayout = (function (_super) {
        __extends(VerticalLinearLayout, _super);
        function VerticalLinearLayout(name) {
            _super.call(this, name);
            this.slotMap = new LayoutLzg.Map();
        }
        VerticalLinearLayout.prototype.addCell = function (distance) {
            var slot = new LayoutLzg.Slot();
            slot.container = this;
            this.slots.add(slot);
            if (!this.slotMap.containsKey(slot))
                this.slotMap.put(slot, new SlotItem(null, null));
            var item = this.slotMap.get(slot);
            item.slotDefination = distance;
        };
        VerticalLinearLayout.prototype.addChild = function (control) {
            _super.prototype.addChild.call(this, control);
        };
        VerticalLinearLayout.prototype.removeChild = function (control) {
            _super.prototype.removeChild.call(this, control);
        };
        VerticalLinearLayout.prototype.clearChild = function () {
            _super.prototype.clearChild.call(this);
        };
        VerticalLinearLayout.prototype.setCell = function (control, cellIndex) {
            var idx = this.children.indexOf(control);
            if (idx > -1) {
                var slot = this.slots[cellIndex];
                slot.addChild(control);
            }
        };
        VerticalLinearLayout.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type', 'VerticalLinearLayout');
                $(this.rootElem).attr('layout-name', this.name);
            }
            return this.rootElem;
        };
        VerticalLinearLayout.prototype.initCalculableSlots = function () {
            var weightSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
            }
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                for (var i = 0; i < this.slots.length; i++) {
                    var slot = this.slots[i];
                    var item = this.slotMap.get(slot);
                    var cellDefination = item.slotDefination;
                    if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotHeightCalculatable = true;
                            child.parentSlot.calulatedSlotHeight = cellDefination.value;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                    else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotHeightCalculatable = true;
                            child.parentSlot.calulatedSlotHeight = this.height.value * cellDefination.value / weightSum;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                }
            }
            else {
                if (this.parentSlot.isSlotHeightCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                    for (var i = 0; i < this.slots.length; i++) {
                        var slot = this.slots[i];
                        var item = this.slotMap.get(slot);
                        var cellDefination = item.slotDefination;
                        if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                            for (var j = 0; j < slot.children.length; j++) {
                                var child = slot.children[j];
                                child.parentSlot.isSlotHeightCalculatable = true;
                                child.parentSlot.calulatedSlotHeight = this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
                                if (child instanceof LayoutLzg.ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                        else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                            for (var j = 0; j < slot.children.length; j++) {
                                var child = slot.children[j];
                                child.parentSlot.isSlotHeightCalculatable = false;
                                if (child instanceof LayoutLzg.ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.slots.length; i++) {
                        var slot = this.slots[i];
                        var item = this.slotMap.get(slot);
                        var cellDefination = item.slotDefination;
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotHeightCalculatable = false;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                }
            }
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    child.parentSlot.isSlotWidthCalculatable = true;
                    child.parentSlot.calulatedSlotWidth = this.width.value;
                    if (child instanceof LayoutLzg.ContainerControl) {
                        var container = child;
                        container.initCalculableSlots();
                    }
                }
            }
            else {
                if (this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.parentSlot.isSlotWidthCalculatable = true;
                        child.parentSlot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                        if (child instanceof LayoutLzg.ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.parentSlot.isSlotWidthCalculatable = false;
                        if (child instanceof LayoutLzg.ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }
        };
        VerticalLinearLayout.prototype.assembleDom = function () {
            // init variables and htmlelements
            $(this.getRootElement()).empty();
            if (this.borderElem == null)
                this.borderElem = $("<div></div>")[0];
            // add cell wrapper divs to rootElem
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var border = new LayoutLzg.Border('');
                border.initCalculableSlots();
                $(this.getRootElement()).append(border.getRootElement());
                item.slotBorder = border;
            }
            // add children rootElems to cell wrappers
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var border = item.slotBorder;
                for (var j = 0; j < slot.children.length; j++) {
                    var child = slot.children[j];
                    child.assembleDom();
                    border.addChild(child);
                    border.assembleDom();
                }
                item.slotBorder = border;
            }
        };
        VerticalLinearLayout.prototype.doLayout = function () {
            // calculate weightSum and fixSum
            var weightSum = 0;
            var fixSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed)
                    fixSum += cellDefination.value;
            }
            // set rootElem styles
            $(this.getRootElement()).css('position', 'absolute');
            $(this.getRootElement()).css('width', this.estimateWidth() + 'px');
            $(this.getRootElement()).css('height', this.estimateHeight() + 'px');
            // set border and background styles
            $(this.borderElem).css('position', 'absolute');
            $(this.borderElem).css('left', '0px');
            $(this.borderElem).css('right', '0px');
            $(this.borderElem).css('top', '0px');
            $(this.borderElem).css('bottom', '0px');
            if (this.stroke) {
                this.stroke.applyToBorder(this.borderElem, this.strokeThickness);
            }
            if (this.fill) {
                this.fill.applyToBackground(this.borderElem);
            }
            var pos = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                var border = item.slotBorder;
                $(border.getRootElement()).css('position', 'absolute');
                $(border.getRootElement()).css('left', '0px');
                $(border.getRootElement()).css('right', '0px');
                var cellh = 0;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                    cellh = cellDefination.value;
                }
                else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                    cellh = (this.estimateHeight() - fixSum) * cellDefination.value / weightSum;
                }
                $(border.getRootElement()).css('top', pos + 'px');
                border.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
                border.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, cellh);
                border.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
                border.parentSlot = slot;
                border.parentSlot.isSlotWidthCalculatable = true;
                border.parentSlot.calulatedSlotWidth = this.estimateWidth();
                border.parentSlot.isSlotHeightCalculatable = true;
                border.parentSlot.calulatedSlotHeight = cellh;
                pos += cellh;
                border.doLayout();
            }
        };
        VerticalLinearLayout.prototype.estimateWidth = function () {
            if (this.parentSlot.isSlotWidthCalculatable) {
                if (this.horizonAlignment == LayoutLzg.HorizonAlignment.Center
                    || this.horizonAlignment == LayoutLzg.HorizonAlignment.Left
                    || this.horizonAlignment == LayoutLzg.HorizonAlignment.Right) {
                    if (this.width.type == LayoutLzg.DistanceType.fixed) {
                        return this.width.value;
                    }
                    else if (this.width.type == LayoutLzg.DistanceType.auto) {
                        if (this.children.length > 0) {
                            var widthlist = this.children.map(function (t) { return t.estimateWidth() + t.margin.left + t.margin.right; });
                            widthlist.sort(function (a, b) { return b - a; });
                            return widthlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                    return this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                }
            }
            else {
                if (this.width.type == LayoutLzg.DistanceType.fixed) {
                    return this.width.value;
                }
                else if (this.width.type == LayoutLzg.DistanceType.auto) {
                    if (this.children.length > 0) {
                        var widthlist = this.children.map(function (t) { return t.estimateWidth() + t.margin.left + t.margin.right; });
                        widthlist.sort(function (a, b) { return b - a; });
                        return widthlist[0];
                    }
                    return 0;
                }
            }
        };
        VerticalLinearLayout.prototype.estimateHeight = function () {
            if (this.parentSlot.isSlotHeightCalculatable) {
                if (this.verticalAlignment == LayoutLzg.VerticalAlignment.Center
                    || this.verticalAlignment == LayoutLzg.VerticalAlignment.Top
                    || this.verticalAlignment == LayoutLzg.VerticalAlignment.Bottom) {
                    if (this.height.type == LayoutLzg.DistanceType.fixed) {
                        return this.height.value;
                    }
                    else if (this.height.type == LayoutLzg.DistanceType.auto) {
                        if (this.children.length > 0) {
                            var heightlist = this.children.map(function (t) { return t.estimateHeight() + t.margin.top + t.margin.bottom; });
                            heightlist.sort().reverse();
                            return heightlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                    return this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
                }
            }
            else {
                if (this.height.type == LayoutLzg.DistanceType.fixed) {
                    return this.height.value;
                }
                else if (this.height.type == LayoutLzg.DistanceType.auto) {
                    if (this.children.length > 0) {
                        var heightlist = this.children.map(function (t) { return t.estimateHeight() + t.margin.top + t.margin.bottom; });
                        heightlist.sort().reverse();
                        return heightlist[0];
                    }
                    return 0;
                }
            }
        };
        return VerticalLinearLayout;
    }(LayoutLzg.ContainerControl));
    LayoutLzg.VerticalLinearLayout = VerticalLinearLayout;
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
            $(this.getRootElement()).empty();
            for (var _i = 0, _a = this.slots; _i < _a.length; _i++) {
                var slot = _a[_i];
                var slotWrapperDiv = $("<div></div>")[0];
                for (var _b = 0, _c = slot.children; _b < _c.length; _b++) {
                    var child = _c[_b];
                    child.assembleDom();
                    var childWrapperDiv = $("<div></div>")[0];
                    $(childWrapperDiv).append(child.getRootElement());
                    $(slotWrapperDiv).append(childWrapperDiv);
                    this.childWrappersMap.put(child, childWrapperDiv);
                }
                this.slotWrappersMap.put(slot, slotWrapperDiv);
                $(this.getRootElement()).append(slotWrapperDiv);
            }
        };
        Vlinearlayout.prototype.doLayout = function () {
            $(this.getRootElement()).css('position', 'absolute');
            $(this.getRootElement()).css('width', this.calculatedWidth + 'px');
            $(this.getRootElement()).css('height', this.calculatedHeight + 'px');
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
                $(slotWrapperDiv).css('position', 'absolute');
                $(slotWrapperDiv).css('left', '0px');
                $(slotWrapperDiv).css('right', '0px');
                $(slotWrapperDiv).css('top', pos + 'px');
                $(slotWrapperDiv).css('height', cellh + 'px');
                for (var _i = 0, _a = slot.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    var childWrapperDiv = this.childWrappersMap.get(child);
                    $(childWrapperDiv).css('position', 'absolute');
                    $(childWrapperDiv).css('left', child.margin.left + 'px');
                    $(childWrapperDiv).css('right', child.margin.right + 'px');
                    $(childWrapperDiv).css('top', child.margin.top + 'px');
                    $(childWrapperDiv).css('bottom', child.margin.bottom + 'px');
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
                    slot.calulatedSlotWidth = this.width.value;
                }
                this.slots.forEach(function (t) { return t.calculateWidthFromTop(); });
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                this.calculatedWidth = this.parentSlot.calulatedSlotWidth;
                for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                    var slot = _c[_b];
                    slot.isSlotWidthCalculatable = true;
                    slot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth;
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
                slot.calulatedSlotWidth = this.calculatedWidth;
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
                    slot.calulatedSlotHeight = cellh;
                }
                this.calculatedHeight = this.height.value;
                this.slots.forEach(function (t) { return t.calculateHeightFromTop(); });
                return;
            }
            if (this.parentSlot && this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                this.calculatedHeight = this.parentSlot.calulatedSlotHeight;
                for (var _b = 0, _c = this.slots; _b < _c.length; _b++) {
                    var slot = _c[_b];
                    var cellDefination = this.slotMap.get(slot);
                    var cellh = 0;
                    if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                        cellh = cellDefination.value;
                    }
                    else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                        cellh = (this.parentSlot.calulatedSlotHeight - fixSum) * cellDefination.value / weightSum;
                    }
                    slot.isSlotHeightCalculatable = true;
                    slot.calulatedSlotHeight = cellh;
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
                slot.calulatedSlotHeight = this.calculatedHeight;
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
            var widthlist = this.slots.map(function (t) { return t.calulatedSlotWidth; });
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
                sum += slot.calulatedSlotHeight;
            }
            this.calculatedHeight = sum;
        };
        Vlinearlayout.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type', 'Vlinearlayout');
                $(this.rootElem).attr('layout-name', this.name);
            }
            return this.rootElem;
        };
        return Vlinearlayout;
    }(LayoutLzg.ContainerControl));
    LayoutLzg.Vlinearlayout = Vlinearlayout;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var Hlinearlayout = (function (_super) {
        __extends(Hlinearlayout, _super);
        function Hlinearlayout(name) {
            _super.call(this, name);
            this.vchildren = new LayoutLzg.List();
            this.slotMap = new LayoutLzg.Map();
        }
        Hlinearlayout.prototype.addChild = function (control) {
            this.vchildren.add(control);
            control.parent = this;
        };
        Hlinearlayout.prototype.addCell = function (distance) {
            var slot = new LayoutLzg.Slot();
            this.slots.add(slot);
            if (!this.slotMap.containsKey(slot))
                this.slotMap.put(slot, new LayoutLzg.SlotItem(new LayoutLzg.Border("LinearCell"), null));
            var item = this.slotMap.get(slot);
            item.slotDefination = distance;
            slot.container = item.slotBorder;
            _super.prototype.addChild.call(this, item.slotBorder);
            // this.children.add(item.slotBorder);
            // item.slotBorder.parent = this;
            // item.slotBorder.parentSlot = this.mainSlot;
            // item.slotBorder.actualContainer = this;
        };
        Hlinearlayout.prototype.setCell = function (control, cellIndex) {
            var idx = this.vchildren.indexOf(control);
            if (idx > -1) {
                var slot = this.slots[cellIndex];
                slot.addChild(control);
                var item = this.slotMap.get(slot);
                item.slotBorder.addChild(control);
                control.parent = this;
            }
        };
        Hlinearlayout.prototype.initCalculableSlots = function () {
            var weightSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
            }
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                for (var i = 0; i < this.slots.length; i++) {
                    var slot = this.slots[i];
                    var item = this.slotMap.get(slot);
                    var cellDefination = item.slotDefination;
                    if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotWidthCalculatable = true;
                            child.parentSlot.calulatedSlotWidth = cellDefination.value;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                    else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotWidthCalculatable = true;
                            child.parentSlot.calulatedSlotWidth = this.width.value * cellDefination.value / weightSum;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                }
            }
            else {
                if (this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                    for (var i = 0; i < this.slots.length; i++) {
                        var slot = this.slots[i];
                        var item = this.slotMap.get(slot);
                        var cellDefination = item.slotDefination;
                        if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                            for (var j = 0; j < slot.children.length; j++) {
                                var child = slot.children[j];
                                child.parentSlot.isSlotWidthCalculatable = true;
                                child.parentSlot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                                if (child instanceof LayoutLzg.ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                        else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                            for (var j = 0; j < slot.children.length; j++) {
                                var child = slot.children[j];
                                child.parentSlot.isSlotWidthCalculatable = false;
                                if (child instanceof LayoutLzg.ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.slots.length; i++) {
                        var slot = this.slots[i];
                        var item = this.slotMap.get(slot);
                        var cellDefination = item.slotDefination;
                        for (var j = 0; j < slot.children.length; j++) {
                            var child = slot.children[j];
                            child.parentSlot.isSlotWidthCalculatable = false;
                            if (child instanceof LayoutLzg.ContainerControl) {
                                var container = child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                }
            }
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    child.parentSlot.isSlotHeightCalculatable = true;
                    child.parentSlot.calulatedSlotHeight = this.height.value;
                    if (child instanceof LayoutLzg.ContainerControl) {
                        var container = child;
                        container.initCalculableSlots();
                    }
                }
            }
            else {
                if (this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.parentSlot.isSlotHeightCalculatable = true;
                        child.parentSlot.calulatedSlotHeight = this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
                        if (child instanceof LayoutLzg.ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.parentSlot.isSlotHeightCalculatable = false;
                        if (child instanceof LayoutLzg.ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }
            _super.prototype.initCalculableSlots.call(this);
        };
        Hlinearlayout.prototype.doLayout = function () {
            var weightSum = 0;
            var fixSum = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                if (cellDefination.type == LayoutLzg.DistanceType.weight)
                    weightSum += cellDefination.value;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed)
                    fixSum += cellDefination.value;
            }
            var pos = 0;
            for (var i = 0; i < this.slots.length; i++) {
                var slot = this.slots[i];
                var item = this.slotMap.get(slot);
                var cellDefination = item.slotDefination;
                var border = item.slotBorder;
                var cellw = 0;
                if (cellDefination.type == LayoutLzg.DistanceType.fixed) {
                    cellw = cellDefination.value;
                }
                else if (cellDefination.type == LayoutLzg.DistanceType.weight) {
                    cellw = (this.estimateHeight() - fixSum) * cellDefination.value / weightSum;
                }
                border.margin = new LayoutLzg.Thickness(pos, 0, 0, 0);
                border.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
                border.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, cellw);
                border.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
                border.verticalAlignment = LayoutLzg.VerticalAlignment.Top;
                pos += cellw;
                border.initCalculableSlots();
                border.assembleDom();
            }
            _super.prototype.doLayout.call(this);
        };
        return Hlinearlayout;
    }(LayoutLzg.Border));
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
                    else if (t instanceof ObservableArray) {
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
        function ObservableArray(items) {
            var _self = this, _array = [], _handlers = {
                itemadded: [],
                itemremoved: [],
                itemset: []
            };
            function defineIndexProperty(index) {
                if (!(index in _self)) {
                    Object.defineProperty(_self, index, {
                        configurable: true,
                        enumerable: true,
                        get: function () {
                            return _array[index];
                        },
                        set: function (v) {
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
                _handlers[event.type].forEach(function (h) {
                    h.call(_self, event);
                });
            }
            Object.defineProperty(_self, "addEventListener", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: function (eventName, handler) {
                    eventName = ("" + eventName).toLowerCase();
                    if (!(eventName in _handlers))
                        throw new Error("Invalid event name.");
                    if (typeof handler !== "function")
                        throw new Error("Invalid handler.");
                    _handlers[eventName].push(handler);
                }
            });
            Object.defineProperty(_self, "removeEventListener", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: function (eventName, handler) {
                    eventName = ("" + eventName).toLowerCase();
                    if (!(eventName in _handlers))
                        throw new Error("Invalid event name.");
                    if (typeof handler !== "function")
                        throw new Error("Invalid handler.");
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
                value: function () {
                    var index;
                    var i = 0, ln = arguments.length;
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
                value: function () {
                    if (_array.length > -1) {
                        var index = _array.length - 1, item = _array.pop();
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
                value: function () {
                    var ln;
                    var i = 0;
                    var ln = arguments.length;
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
                value: function () {
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
                value: function (index, howMany /*, element1, element2, ... */) {
                    var removed = [], item, pos;
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
                    var i = 2, ln = arguments.length;
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
                get: function () {
                    return _array.length;
                },
                set: function (value) {
                    var n = Number(value);
                    var length = _array.length;
                    if (n % 1 === 0 && n >= 0) {
                        if (n < length) {
                            _self.splice(n);
                        }
                        else if (n > length) {
                            _self.push.apply(_self, new Array(n - length));
                        }
                    }
                    else {
                        throw new RangeError("Invalid array length");
                    }
                    _array.length = n;
                    return value;
                }
            });
            Object.getOwnPropertyNames(Array.prototype).forEach(function (name) {
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
            $(this.dom).resize(this.callbackfun);
        };
        DomSizePropertyChangedListener.prototype.stopListen = function () {
            $(this.dom).off("resize", this.callbackfun);
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
                return $(dom).val();
            }
            return $(dom).text();
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
                $(dom).val(value);
                return;
            }
            $(dom).text(value);
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
            $(this.dom).change(this.callbackfun);
        };
        DomTextPropertyChangedListener.prototype.stopListen = function () {
            $(this.dom).off("resize", this.callbackfun);
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
                    return $(dom).val();
                }
            }
            return $(dom).text();
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
                    $(dom).val(value);
                    return;
                }
            }
            $(dom).text(value);
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
            $(this.dom).change(this.callbackfun);
        };
        DomValuePropertyChangedListener.prototype.stopListen = function () {
            $(this.dom).off("resize", this.callbackfun);
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
            return obj instanceof LayoutLzg.FrameworkElement;
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
            return obj instanceof LayoutLzg.FrameworkElement;
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
            if (obj instanceof LayoutLzg.FrameworkElement) {
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
            if (root instanceof LayoutLzg.ContainerControl) {
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
            if (root instanceof LayoutLzg.ContainerControl) {
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
            $(this.getRootElement()).click(function (e) {
                self.raiseEvent("click", [e]);
            });
            $(this.getRootElement()).mouseenter(function (e) {
                self.raiseEvent("mouseenter", [e]);
            });
            $(this.getRootElement()).mouseleave(function (e) {
                self.raiseEvent("mouseleave", [e]);
            });
            $(this.getRootElement()).mousedown(function (e) {
                self.raiseEvent("mousedown", [e]);
                self.pressed = true;
            });
            $(this.getRootElement()).mouseup(function (e) {
                self.raiseEvent("mouseup", [e]);
                self.pressed = false;
            });
            $(this.getRootElement()).mousemove(function (e) {
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
    }(LayoutLzg.ControlBase));
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
            $(rectHandle.getRootElement()).mousedown(function (e) {
                mousedownScreenX = e.screenX;
                mousedownScreenY = e.screenY;
                ismousedown = true;
                self.mousedownValue = self._value;
            });
            $(document.body).mousemove(function (e) {
                if (!ismousedown)
                    return;
                dx = e.screenX - mousedownScreenX;
                dy = e.screenY - mousedownScreenY;
                self.onHandleDrag(dx, dy);
            });
            $(document.body).mouseup(function (e) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2RhdGV1dGlscy50cyIsInV0aWxzL2V2ZW50dXRpbHMudHMiLCJ1dGlscy9odG1sdXRpbHMudHMiLCJldmVudGJ1cy9ldmVudGJ1cy50cyIsInRyaWdnZXIvdHJpZ2dlcmJhc2UudHMiLCJsYXlvdXRiYXNlLnRzIiwibGF5b3V0Y29yZS50cyIsImNvbGxlY3Rpb25zL2xpc3QudHMiLCJjb2xsZWN0aW9ucy9tYXAudHMiLCJicnVzaGVzL3NvbGlkY29sb3JicnVzaC50cyIsImJydXNoZXMvaW1hZ2Vjb2xvcmJydXNoLnRzIiwiYnJ1c2hlcy9ncmFkaWVudGNvbG9yYnJ1c2gudHMiLCJjb250cm9scy9jb250cm9sYmFzZS50cyIsImNvbnRyb2xzL3RleHR2aWV3LnRzIiwiY29udHJvbHMvcmVjdC50cyIsImNvbnRyb2xzL2ltYWdlLnRzIiwiY29udGFpbmVycy9jb250YWluZXJiYXNlLnRzIiwiY29udGFpbmVycy9ib3JkZXIudHMiLCJjb250YWluZXJzL2hvcml6b25hbGxpbmVhcmxheW91dC50cyIsImNvbnRhaW5lcnMvdmVydGljYWxsaW5lYXJsYXlvdXQudHMiLCJjb250YWluZXJzL3ZsaW5lYXJsYXlvdXQudHMiLCJjb250YWluZXJzL2hsaW5lYXJsYXlvdXQudHMiLCJvYnNlcnZlci9vYnNlcnZhYmxlb2JqZWN0aW5qZWN0b3IudHMiLCJvYnNlcnZlci9wcm9wZXJ0eWJhc2UudHMiLCJvYnNlcnZlci9kb21zaXplcHJvcGVydHkudHMiLCJvYnNlcnZlci9kb210ZXh0cHJvcGVydHkudHMiLCJvYnNlcnZlci9kb212YWx1ZXByb3BlcnR5LnRzIiwib2JzZXJ2ZXIvZGljdHByb3BlcnR5LnRzIiwib2JzZXJ2ZXIvY29udHJvbHByb3BlcnR5LnRzIiwiYmluZGluZ3MvYmluZGluZy50cyIsImJpbmRpbmdzL2Z1bmN0aW9uYmluZGluZy50cyIsImJpbmRpbmdzL3Byb3BlcnR5YmluZGluZy50cyIsImNvbnZlcnRlcnMvZGF0ZWZvcm1hdGNvbnZlcnRlci50cyIsImNvbnZlcnRlcnMvZmlyc3RjaGFydXBwZXJjYXNlY29udmVydGVyLnRzIiwiY29udmVydGVycy9sb3dlcmNhc2Vjb252ZXJ0ZXIudHMiLCJjb252ZXJ0ZXJzL3VwcGVyY2FzZWNvbnZlcnRlci50cyIsImNvbnZlcnRlcnMvdG9zdHJpbmdjb252ZXJ0ZXIudHMiLCJjb252ZXJ0ZXJzL3BpcGVsaW5lY29udmVydGVyLnRzIiwiY29udmVydGVycy9leHByZXNzaW9uY29udmVydGVyLnRzIiwidmlzdWFsdHJlZS92aXN1YWx0cmVlLnRzIiwidmlzdWFsdHJlZS90ZW1wbGF0ZWNvbnRyb2wudHMiLCJhY3Rpb24vYWN0aW9uYmFzZS50cyIsImFjdGlvbi9zZXRwcm9wZXJ0eWFjdGlvbi50cyIsImFjdGlvbi9tdWx0aWFjdGlvbi50cyIsImFjdGlvbi9nb3Rvc3RhdGVhY3Rpb24udHMiLCJ0cmlnZ2VyL3Byb3BlcnR5Y2hhbmdlZHRyaWdnZXIudHMiLCJ0cmlnZ2VyL3N0YXRlY2hhbmdlZHRyaWdnZXIudHMiLCJ0cmlnZ2VyL2V2ZW50dHJpZ2dlci50cyIsInN0eWxlL3N0eWxlYmFzZS50cyIsInN0eWxlL3N0YXRlbWFuYWdlci50cyIsInN0eWxlL3Zpc3VhbHRyZWVzdHlsZS50cyIsInRlbXBsYXRlY29udHJvbHMvYnV0dG9uLnRzIiwidGVtcGxhdGVjb250cm9scy9wcm9ncmVzc2Jhci50cyIsInRlbXBsYXRlY29udHJvbHMvc2xpZGVyYmFyLnRzIiwiZmFjYWRlcy9iaW5kaW5nLnRzIiwiYm9vdHN0cmFwL3Byb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxTQUFTLENBc0JsQjtBQXRCRCxXQUFVLFNBQVMsRUFBQyxDQUFDO0lBRWpCLG9CQUEyQixJQUFVLEVBQUUsTUFBNkI7UUFBN0Isc0JBQTZCLEdBQTdCLHFCQUE2QjtRQUNoRSxJQUFJLENBQUMsR0FBTztZQUNSLElBQUksRUFBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsQ0FBQztZQUN4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Q0FBNkIsRUFBRSxDQUFDLENBQUM7UUFDaEUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLHdDQUE4QixFQUFFLENBQUMsQ0FBQztRQUNqRSxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksb0NBQTBCLEVBQUUsQ0FBQyxDQUFDO1FBRTdELGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLGdEQUFzQyxFQUFFLENBQUMsQ0FBQztRQUMzRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxnREFBc0MsRUFBRSxDQUFDLENBQUM7UUFDM0UsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksZ0RBQXNDLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLGlEQUF1QyxFQUFFLENBQUMsQ0FBQztRQUM1RSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSw2Q0FBbUMsRUFBRSxDQUFDLENBQUM7UUFFeEUsTUFBTSxDQUFDLElBQUksbUNBQXlCLENBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUEzQmUsNkNBQW1DLHNDQTJCbEQsQ0FBQTtBQUVMLENBQUMsRUEvQlMsU0FBUyxLQUFULFNBQVMsUUErQmxCIiwiZmlsZSI6Im91dHB1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIFxuICAgIGV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGU6IERhdGUsIGZvcm1hdDogc3RyaW5nID0gXCJ5eXl5LU1NLWRkXCIpIHtcbiAgICAgICAgbGV0IG86YW55ID0ge1xuICAgICAgICAgICAgXCJNK1wiIDogZGF0ZS5nZXRNb250aCgpKzEsIC8vbW9udGhcbiAgICAgICAgICAgIFwiZCtcIiA6IGRhdGUuZ2V0RGF0ZSgpLCAgICAvL2RheVxuICAgICAgICAgICAgXCJoK1wiIDogZGF0ZS5nZXRIb3VycygpLCAgIC8vaG91clxuICAgICAgICAgICAgXCJtK1wiIDogZGF0ZS5nZXRNaW51dGVzKCksIC8vbWludXRlXG4gICAgICAgICAgICBcInMrXCIgOiBkYXRlLmdldFNlY29uZHMoKSwgLy9zZWNvbmRcbiAgICAgICAgICAgIFwicStcIiA6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSszKS8zKSwgIC8vcXVhcnRlclxuICAgICAgICAgICAgXCJTXCIgOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8vbWlsbGlzZWNvbmRcbiAgICAgICAgfTtcbiAgICAgICAgaWYoLyh5KykvLnRlc3QoZm9ybWF0KSkgZm9ybWF0PWZvcm1hdC5yZXBsYWNlKFJlZ0V4cC4kMSxcbiAgICAgICAgICAgIChkYXRlLmdldEZ1bGxZZWFyKCkrXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSk7XG4gICAgICAgIGZvcih2YXIgayBpbiBvKWlmKG5ldyBSZWdFeHAoXCIoXCIrIGsgK1wiKVwiKS50ZXN0KGZvcm1hdCkpXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShSZWdFeHAuJDEsXG4gICAgICAgICAgICAgICAgUmVnRXhwLiQxLmxlbmd0aD09MSA/IG9ba10gOlxuICAgICAgICAgICAgICAgICAgICAoXCIwMFwiKyBvW2tdKS5zdWJzdHIoKFwiXCIrIG9ba10pLmxlbmd0aCkpO1xuICAgICAgICByZXR1cm4gZm9ybWF0O1xuXG4gICAgfVxuICAgIFxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBmdW5jdGlvbiBldmVudFRyYW5zcGFyZW50RGl2KGRpdlNlbGVjdG9yOmFueSkge1xuICAgICAgICAkKGRpdlNlbGVjdG9yKS5jc3MoXCJmaWx0ZXJcIixcIkFscGhhKG9wYWNpdHk9MClcIik7XG4gICAgICAgICQoZGl2U2VsZWN0b3IpLmNzcyhcInBvaW50ZXItZXZlbnRzXCIsXCJub25lXCIpO1xuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBjc3MoZWxlbTogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgJChlbGVtKS5jc3MobmFtZSx2YWx1ZSk7XG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBjbGFzcyBFdmVudEl0ZW0ge1xuICAgICAgICBuYW1lIDogc3RyaW5nO1xuICAgICAgICBwcml2YXRlIGFyZ3M6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFja2xpc3Q6TGlzdDwoYXJnczphbnkpPT52b2lkPiA9IG5ldyBMaXN0PChhcmdzOmFueSk9PnZvaWQ+KCk7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBhcmdzOmFueSkge1xuICAgICAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRXZlbnRCdXMge1xuICAgICAgICBjYWxsYmFjayA6IExpc3Q8RXZlbnRJdGVtPiA9IG5ldyBMaXN0PEV2ZW50SXRlbT4oKTtcblxuICAgICAgICBwdWIobmFtZTpzdHJpbmcgLGFyZ3M6YW55KSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmFkZChuZXcgRXZlbnRJdGVtKG5hbWUsIGFyZ3MpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1YihuYW1lOnN0cmluZywgY2FsbGJhY2s6KGFyZ3M6YW55KT0+dm9pZCkge1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRyaWdnZXIgaW1wbGVtZW50cyBEaXNwb3NhYmxle1xyXG4gICAgICAgIGFjdGlvbjpBY3Rpb247XHJcbiAgICAgICAgYWJzdHJhY3QgaW5pdCgpOnZvaWQ7XHJcbiAgICAgICAgb25UcmlnZ2VyZWQoKTp2b2lkIHtcclxuICAgICAgICAgICAgaWYodGhpcy5hY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uLmV4ZWN1dGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhYnN0cmFjdCBkaXNwb3NlKCk6dm9pZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbnRyb2xUcmlnZ2VyIGV4dGVuZHMgVHJpZ2dlciB7XHJcbiAgICAgICAgY29udHJvbDpDb250cm9sO1xyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGVudW0gSG9yaXpvbkFsaWdubWVudCB7XG4gICAgICAgIFN0cmVjaCxcbiAgICAgICAgTGVmdCxcbiAgICAgICAgUmlnaHQsXG4gICAgICAgIENlbnRlclxuICAgIH1cblxuICAgIGV4cG9ydCBlbnVtIFZlcnRpY2FsQWxpZ25tZW50e1xuICAgICAgICBTdHJlY2gsXG4gICAgICAgIFRvcCxcbiAgICAgICAgQm90dG9tLFxuICAgICAgICBDZW50ZXJcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBEaXN0YW5jZVR5cGV7XG4gICAgICAgIGF1dG8sXG4gICAgICAgIGZpeGVkLFxuICAgICAgICB3ZWlnaHRcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBTdGFja1BhbmVsT3JpZW50YXRpb24ge1xuICAgICAgICBIb3Jpem9uYWwsXG4gICAgICAgIFZlcnRpY2FsXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFNoYWRvd1NldHRpbmdzIHtcbiAgICAgICAgdHlwZTpzdHJpbmc7XG4gICAgICAgIHhvZmZzZXQ6bnVtYmVyO1xuICAgICAgICB5b2Zmc2V0Om51bWJlcjtcbiAgICAgICAgYmx1cjpudW1iZXI7XG4gICAgICAgIHNwcmVhZDpudW1iZXI7XG4gICAgICAgIGNvbG9yOnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3Rvcih4b2Zmc2V0Om51bWJlcix5b2Zmc2V0Om51bWJlcixibHVyOm51bWJlcixzcHJlYWQ6bnVtYmVyLGNvbG9yOnN0cmluZyx0eXBlOnN0cmluZz1cIm91dHNldFwiKSB7XG4gICAgICAgICAgICB0aGlzLnhvZmZzZXQgPSB4b2Zmc2V0O1xuICAgICAgICAgICAgdGhpcy55b2Zmc2V0ID0geW9mZnNldDtcbiAgICAgICAgICAgIHRoaXMuYmx1ciA9IGJsdXI7XG4gICAgICAgICAgICB0aGlzLnNwcmVhZCA9IHNwcmVhZDtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICB0b0JveFNoYXdkb3dTdHJpbmcoKTpzdHJpbmcge1xuICAgICAgICAgICAgbGV0IHMgPSBcIlwiO1xuICAgICAgICAgICAgaWYodGhpcy50eXBlPT1cImluc2V0XCIpIHMrPVwiaW5zZXQgXCI7XG4gICAgICAgICAgICBzKz10aGlzLnhvZmZzZXQrXCJweCBcIjtcbiAgICAgICAgICAgIHMrPXRoaXMueW9mZnNldCtcInB4IFwiO1xuICAgICAgICAgICAgcys9dGhpcy5ibHVyK1wicHggXCI7XG4gICAgICAgICAgICBzKz10aGlzLnNwcmVhZCtcInB4IFwiO1xuICAgICAgICAgICAgcys9dGhpcy5jb2xvcitcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQnJ1c2h7XG4gICAgICAgIGFwcGx5VG9CYWNrZ3JvdW5kKGVsZW06SFRNTEVsZW1lbnQpOnZvaWQ7XG4gICAgICAgIGFwcGx5VG9Cb3JkZXIoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6VGhpY2tuZXNzKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyTGVmdChlbGVtOkhUTUxFbGVtZW50LHRoaWNrbmVzczpudW1iZXIpOnZvaWQ7XG4gICAgICAgIGFwcGx5VG9Cb3JkZXJSaWdodChlbGVtOkhUTUxFbGVtZW50LHRoaWNrbmVzczpudW1iZXIpOnZvaWQ7XG4gICAgICAgIGFwcGx5VG9Cb3JkZXJUb3AoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyQm90dG9tKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOm51bWJlcik6dm9pZDtcbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBUaGlja25lc3N7XG4gICAgICAgIGxlZnQ6bnVtYmVyO1xuICAgICAgICByaWdodDpudW1iZXI7XG4gICAgICAgIHRvcDpudW1iZXI7XG4gICAgICAgIGJvdHRvbTpudW1iZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IobGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgYm90dG9tOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gICAgICAgICAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICAgICAgICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERpc3RhbmNle1xuICAgICAgICB2YWx1ZTpudW1iZXI7XG4gICAgICAgIHR5cGU6RGlzdGFuY2VUeXBlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGU6IERpc3RhbmNlVHlwZSwgdmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG4iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGludGVyZmFjZSBNZXRhRGF0YUFwaXtcblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBTbG90IHtcbiAgICAgICAgY2hpbGRyZW46TGlzdDxDb250cm9sPiA9IG5ldyBMaXN0PENvbnRyb2w+KCk7XG4gICAgICAgIGlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlIDogYm9vbGVhbjtcbiAgICAgICAgaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlIDogYm9vbGVhbjtcbiAgICAgICAgY2FsdWxhdGVkU2xvdFdpZHRoIDogbnVtYmVyID0gMDtcbiAgICAgICAgY2FsdWxhdGVkU2xvdEhlaWdodCA6IG51bWJlciA9IDA7XG4gICAgICAgIGNvbnRhaW5lciA6IENvbnRhaW5lckNvbnRyb2w7XG5cbiAgICAgICAgYWRkQ2hpbGQoY2hpbGQgOiBDb250cm9sKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uYWRkKGNoaWxkKTtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGQoY2hpbGQgOiBDb250cm9sKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucmVtb3ZlKGNoaWxkKTtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZW1wdHkoKTp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNoaWxkLmNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIXRoaXMuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5jYWxjdWxhdGVkV2lkdGgrdC5tYXJnaW4ubGVmdCt0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgbGV0IG1heHdpZHRoID0gMDtcbiAgICAgICAgICAgICAgICBpZih3aWR0aGxpc3QubGVuZ3RoPjApIG1heHdpZHRoID0gd2lkdGhsaXN0WzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsdWxhdGVkU2xvdFdpZHRoID0gbWF4d2lkdGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk6dm9pZCB7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIXRoaXMuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmNhbGN1bGF0ZWRIZWlnaHQrdC5tYXJnaW4udG9wK3QubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgICAgIGxldCBtYXhoZWlnaHQgPSAwO1xuICAgICAgICAgICAgICAgIGlmKGhlaWdodGxpc3QubGVuZ3RoPjApIG1heGhlaWdodCA9IGhlaWdodGxpc3RbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gbWF4aGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBsYXlvdXRDaGlsZHJlbigpOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmKGNoaWxkLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdCkge1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSxcImxlZnRcIixcIjBweFwiKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZC5nZXRSb290RWxlbWVudCgpLFwicmlnaHRcIixcIjBweFwiKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdyA9IHRoaXMuY2FsdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgd3cgPSBjaGlsZC5jYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gKHctd3cpLzI7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZC5nZXRSb290RWxlbWVudCgpLCdsZWZ0Jyx4KydweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhjaGlsZC5nZXRSb290RWxlbWVudCgpLFwibGVmdFwiLFwiMHB4XCIpO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSxcInJpZ2h0XCIsXCIwcHhcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcCkge1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSxcInRvcFwiLFwiMHB4XCIpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkLmdldFJvb3RFbGVtZW50KCksXCJib3R0b21cIixcIjBweFwiKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBoID0gdGhpcy5jYWx1bGF0ZWRTbG90SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGggPSBjaGlsZC5jYWxjdWxhdGVkSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgeCA9IChoLWhoKS8yO1xuICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSwndG9wJyx4KydweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkLmdldFJvb3RFbGVtZW50KCksXCJ0b3BcIixcIjBweFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkLmdldFJvb3RFbGVtZW50KCksXCJib3R0b21cIixcIjBweFwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjaGlsZC5kb0xheW91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2tJdGVtIHtcbiAgICAgICAgY2FsbGJhY2s6RnVuY3Rpb247XG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJvcGVydHlOYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBFdmVudENhbGxiYWNrSXRlbSB7XG4gICAgICAgIGNhbGxiYWNrOkZ1bmN0aW9uO1xuICAgICAgICBldmVudE5hbWU6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZyYW1ld29ya0VsZW1lbnQge1xuICAgICAgICAvLyBOYW1lIG9mIHRoaXMgY29udHJvbC5cbiAgICAgICAgbmFtZTpzdHJpbmc7XG4gICAgICAgIC8vIFdpZHRoIG9mIHRoaXMgQ29udHJvbCwgaXQgY2FuIGJlIGEgZml4IHZhbHVlIG9yIGF1dG8uXG4gICAgICAgIHByaXZhdGUgX3dpZHRoOkRpc3RhbmNlO1xuICAgICAgICAvLyBIZWlnaHQgb2YgdGhpcyBDb250cm9sLCBpdCBjYW4gYmUgYSBmaXggdmFsdWUgb3IgYXV0by5cbiAgICAgICAgcHJpdmF0ZSBfaGVpZ2h0OkRpc3RhbmNlO1xuICAgICAgICAvLyBIb3Jpem9uYWwgYWxpZ25tZW50IG9mIHRoaXMgY29udHJvbCBpbiBpdCdzIHBhcmVudCBjb250YWluZXJcbiAgICAgICAgcHJpdmF0ZSBfaG9yaXpvbkFsaWdubWVudCA6IEhvcml6b25BbGlnbm1lbnQ7XG4gICAgICAgIC8vIFZlcnRpY2FsIGFsaWdubWVudCBvZiB0aGlzIGNvbnRyb2wgaW4gaXQncyBwYXJlbnQgY29udGFpbmVyXG4gICAgICAgIHByaXZhdGUgX3ZlcnRpY2FsQWxpZ25tZW50IDogVmVydGljYWxBbGlnbm1lbnQ7XG4gICAgICAgIC8vIE1hcmdpbiBvZiB0aGlzIGNvbnRyb2wgdG8gaXQncyBwYXJlbnQsIHRoZSB2YWx1ZSBpbiB0aGlja25lc3MgbXVzdCBiZSBhIGZpeCB2YWx1ZS5cbiAgICAgICAgcHJpdmF0ZSBfbWFyZ2luOlRoaWNrbmVzcztcbiAgICAgICAgcHJpdmF0ZSBfcHJlc3NlZDpib29sZWFuO1xuICAgICAgICBwcml2YXRlIF9tb3VzZWVudGVyOmJvb2xlYW47XG5cbiAgICAgICAgcHJvdGVjdGVkIG5vdGlmeVByb3BlcnRpZXM6QXJyYXk8c3RyaW5nPj1bXTtcblxuICAgICAgICBwcml2YXRlIHByb3BDaGFuZ2VkQ2FsbGJhY2tzOkxpc3Q8UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2tJdGVtPjtcbiAgICAgICAgcHJpdmF0ZSBldmVudENhbGxiYWNrczpMaXN0PEV2ZW50Q2FsbGJhY2tJdGVtPjtcblxuICAgICAgICBwYXJlbnRTbG90OlNsb3Q7XG4gICAgICAgIHBhcmVudDpDb250YWluZXJDb250cm9sO1xuICAgICAgICBhY3R1YWxDb250YWluZXI6Q29udGFpbmVyQ29udHJvbDtcbiAgICAgICAgLy8gcm9vdCBkaXYgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICByb290RWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICAvLyBJbml0IHZhaXJhYmxlcy5cbiAgICAgICAgICAgIHRoaXMuX2hvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdGhpcy5fbWFyZ2luID0gbmV3IFRoaWNrbmVzcygwLDAsMCwwKTtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCw1MCk7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLDUwKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcyA9IG5ldyBMaXN0PFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrSXRlbT4oKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRDYWxsYmFja3MgPSBuZXcgTGlzdDxFdmVudENhbGxiYWNrSXRlbT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB3aWR0aCgpOiBMYXlvdXRMemcuRGlzdGFuY2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHdpZHRoKHZhbHVlOiBMYXlvdXRMemcuRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaGVpZ2h0KCk6IExheW91dEx6Zy5EaXN0YW5jZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGhlaWdodCh2YWx1ZTogTGF5b3V0THpnLkRpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBob3Jpem9uQWxpZ25tZW50KCk6IExheW91dEx6Zy5Ib3Jpem9uQWxpZ25tZW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ob3Jpem9uQWxpZ25tZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGhvcml6b25BbGlnbm1lbnQodmFsdWU6IExheW91dEx6Zy5Ib3Jpem9uQWxpZ25tZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9ob3Jpem9uQWxpZ25tZW50ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdmVydGljYWxBbGlnbm1lbnQoKTogTGF5b3V0THpnLlZlcnRpY2FsQWxpZ25tZW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbEFsaWdubWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB2ZXJ0aWNhbEFsaWdubWVudCh2YWx1ZTogTGF5b3V0THpnLlZlcnRpY2FsQWxpZ25tZW50KSB7XG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNhbEFsaWdubWVudCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG1hcmdpbigpOiBMYXlvdXRMemcuVGhpY2tuZXNzIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXJnaW47XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgbWFyZ2luKHZhbHVlOiBMYXlvdXRMemcuVGhpY2tuZXNzKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJnaW4gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBwcmVzc2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ByZXNzZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcHJlc3NlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5fcHJlc3NlZCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG1vdXNlZW50ZXIoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW91c2VlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBtb3VzZWVudGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3VzZWVudGVyID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JjZVJlZnJlc2goKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgIHRoaXMuZG9MYXlvdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCB0aGUgcm9vdCBlbGVtZW50IG9mIHRoaXMgY29udHJvbC5cbiAgICAgICAgYWJzdHJhY3QgZ2V0Um9vdEVsZW1lbnQoKTpIVE1MRWxlbWVudDtcblxuICAgICAgICAvLyBBc3NlbWJsZSBodG1sIGVsZW1lbnRzIG9mIHRoaXMgY29udHJvbC5cbiAgICAgICAgYXNzZW1ibGVEb20oKTp2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkanVzdCBzdHlsZXMgaHRtbCBlbGVtZW50cyBvZiB0aGlzIGNvbnRyb2wuXG4gICAgICAgIGRvTGF5b3V0KCk6dm9pZHtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFN0YXRlUHJvcGVydGllcygpOkFycmF5PHN0cmluZz4ge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Tm90aWZ5UHJvcGVydGllcygpOkFycmF5PHN0cmluZz4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm90aWZ5UHJvcGVydGllcztcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKHByb3BlcnROYW1lOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcy5hZGQoXG4gICAgICAgICAgICAgICAgbmV3IFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrSXRlbShwcm9wZXJ0TmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIoY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgbGV0IGVsZW06UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2tJdGVtID0gbnVsbDtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3BjYWxsYmFja2l0ZW0gb2YgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIGlmKHByb3BjYWxsYmFja2l0ZW0uY2FsbGJhY2s9PWNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBwcm9wY2FsbGJhY2tpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGVsZW0hPW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tzLnJlbW92ZShlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFN0YXRlQ2hhbmdlZExpc3RlbmVyKHByb3BlcnR5TmFtZTpzdHJpbmcsIGNhbGxiYWNrOkZ1bmN0aW9uKTp2b2lkIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlU3RhdGVDaGFuZ2VkTGlzdGVuZXIoY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuXG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgbm90aWZ5UHJvcGVydHlDaGFuZ2VkKHByb3BlcnR5TmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3BjYWxsYmFja2l0ZW0gb2YgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIGlmKHByb3BjYWxsYmFja2l0ZW0ucHJvcGVydHlOYW1lPT1wcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvcGNhbGxiYWNraXRlbS5jYWxsYmFjaykgcHJvcGNhbGxiYWNraXRlbS5jYWxsYmFjayhwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5ldmVudENhbGxiYWNrcy5hZGQoXG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50Q2FsbGJhY2tJdGVtKGV2ZW50TmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihjYWxsYmFjazpGdW5jdGlvbik6dm9pZCB7XG4gICAgICAgICAgICBsZXQgZXZlbnRzID0gdGhpcy5ldmVudENhbGxiYWNrcy5maWx0ZXIodD0+dC5jYWxsYmFjaz09Y2FsbGJhY2spO1xuICAgICAgICAgICAgaWYoZXZlbnRzLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudENhbGxiYWNrcy5yZW1vdmUoZXZlbnRzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCByYWlzZUV2ZW50KGV2ZW50TmFtZTpzdHJpbmcsYXJnczpBcnJheTxhbnk+PVtdKXtcbiAgICAgICAgICAgIGZvciAobGV0IGV2ZW50Y2FsbGJhY2tpdGVtIG9mIHRoaXMuZXZlbnRDYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBpZihldmVudGNhbGxiYWNraXRlbS5ldmVudE5hbWU9PWV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihldmVudGNhbGxiYWNraXRlbS5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZ2FyciA9IFtldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYXJnIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdhcnIucHVzaChhcmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRjYWxsYmFja2l0ZW0uY2FsbGJhY2suYXBwbHkodGhpcyxhcmdhcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29udHJvbCBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBvZiBhbGwgdGhlIHZpc3VhbCBjb21wb25lbnRzLlxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250cm9sIGV4dGVuZHMgRnJhbWV3b3JrRWxlbWVudCBpbXBsZW1lbnRzIERpc3Bvc2FibGV7XG5cbiAgICAgICAgLy8gQmFja2dyb3VuZCBvZiB0aGlzIGNvbnRyb2wsIGl0IGNhbiBiZSBhIHNvbGlkIGNvbG9yLCBvciBhIGdyYWRpZW50IGNvbG9yICwgb3IgYSBwaWN0dXJlLlxuICAgICAgICBwcm90ZWN0ZWQgX2ZpbGw6QnJ1c2g7XG4gICAgICAgIC8vIEJvcmRlciBvZiB0aGlzIGNvbnRyb2wsIGl0IGNhbiBiZSBhIHNvbGlkIGNvbG9yLCBvciBhIGdyYWRpZW50IGNvbG9yICwgb3IgYSBwaWN0dXJlLlxuICAgICAgICBwcm90ZWN0ZWQgX3N0cm9rZTpCcnVzaDtcbiAgICAgICAgLy8gVGhpY2tuZXNzIG9mIHRoaXMgY29udHJvbCdzIGJvcmRlciwgdGhlIHZhbHVlIGluIHRoaWNrbmVzcyBtdXN0IGJlIGEgZml4IHZhbHVlLlxuICAgICAgICBwcm90ZWN0ZWQgX3N0cm9rZVRoaWNrbmVzczpUaGlja25lc3M7XG5cbiAgICAgICAgcHJvdGVjdGVkIF9zaGFkb3c6U2hhZG93U2V0dGluZ3M7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpe1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKDAsMCwwLDApO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSAwO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBmaWxsKCk6IExheW91dEx6Zy5CcnVzaCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmlsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBmaWxsKHZhbHVlOiBMYXlvdXRMemcuQnJ1c2gpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX2ZpbGwgIT0gdmFsdWUpIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2VkKFwiZmlsbFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGwgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBzdHJva2UoKTogTGF5b3V0THpnLkJydXNoIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJva2U7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgc3Ryb2tlKHZhbHVlOiBMYXlvdXRMemcuQnJ1c2gpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3N0cm9rZSAhPSB2YWx1ZSkgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQoXCJzdHJva2VcIik7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2UgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBzdHJva2VUaGlja25lc3MoKTogTGF5b3V0THpnLlRoaWNrbmVzcyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Ryb2tlVGhpY2tuZXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHN0cm9rZVRoaWNrbmVzcyh2YWx1ZTogTGF5b3V0THpnLlRoaWNrbmVzcykge1xuICAgICAgICAgICAgaWYodGhpcy5fc3Ryb2tlVGhpY2tuZXNzICE9IHZhbHVlKSB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChcInN0cm9rZVRoaWNrbmVzc1wiKTtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZVRoaWNrbmVzcyA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHNoYWRvdygpOiBMYXlvdXRMemcuU2hhZG93U2V0dGluZ3Mge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBzaGFkb3codmFsdWU6U2hhZG93U2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3NoYWRvdz12YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IGNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpOnZvaWQ7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOnZvaWQ7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FsY3VsYXRlV2lkdGhGcm9tQm90dG9tKCk6dm9pZDtcblxuICAgICAgICBhYnN0cmFjdCBjYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk6dm9pZDtcblxuICAgICAgICBhYnN0cmFjdCBkaXNwb3NlKCk6IHZvaWQ7XG5cbiAgICAgICAgY2FsY3VsYXRlZFdpZHRoOiBudW1iZXI7XG4gICAgICAgIGNhbGN1bGF0ZWRIZWlnaHQ6IG51bWJlcjtcbiAgICB9XG5cbiAgICAvLyBUaGUgcHVycG9zZSBvZiB0aGUgY29udGFpbmVyIGlzIHRvIHB1dCBzdWIgY29udHJvbHMgdG9nZXRoZXIsXG4gICAgLy8gYW5kIHRoZSBzeXN0ZW0gcHJvdmlkZXMgbXVsdGlwbGUgbGF5b3V0IGNvbnRhaW5lcnMgZHVlIHRvIGFjdHVhbCByZXF1aXJlbWVudHMuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbnRhaW5lckNvbnRyb2wgZXh0ZW5kcyBDb250cm9se1xuICAgICAgICBjaGlsZHJlbjpMaXN0PENvbnRyb2w+O1xuICAgICAgICBwcm90ZWN0ZWQgc2xvdHMgOiBMaXN0PFNsb3Q+O1xuXG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG5ldyBMaXN0PENvbnRyb2w+KCk7XG4gICAgICAgICAgICB0aGlzLnNsb3RzID0gbmV3IExpc3Q8U2xvdD4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENoaWxkKGNvbnRyb2w6Q29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5hZGQoY29udHJvbCk7XG4gICAgICAgICAgICBjb250cm9sLnBhcmVudCA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDaGlsZChjb250cm9sOkNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucmVtb3ZlKGNvbnRyb2wpO1xuICAgICAgICAgICAgY29udHJvbC5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJDaGlsZCgpOnZvaWR7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50U2xvdCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmNsZWFyKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc2xvdC5sYXlvdXRDaGlsZHJlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHRlc3RMaXN0KCk6dm9pZHtcblxuICAgICAgICBsZXQgbGl0ZXJhbDEgPSBuZXcgTGF5b3V0THpnLlRleHRWaWV3KCdhJywnMTExMTEnKTtcbiAgICAgICAgbGV0IGxpdGVyYWwyID0gbmV3IExheW91dEx6Zy5UZXh0VmlldygnYScsJzIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyJyk7XG4gICAgICAgIGxldCBsaXRlcmFsMyA9IG5ldyBMYXlvdXRMemcuVGV4dFZpZXcoJ2EnLCczMzMzMzMzMzMzJyk7XG5cblxuICAgICAgICBsZXQgbHN0ID0gbmV3IExpc3Q8VGV4dFZpZXc+KCk7XG4gICAgICAgIGxzdC5hZGQobGl0ZXJhbDEpO1xuICAgICAgICBsc3QuYWRkKGxpdGVyYWwyKTtcbiAgICAgICAgbHN0LmFkZChsaXRlcmFsMyk7XG4gICAgICAgIGxzdC5jbGVhcigpO1xuICAgIH1cblxuXG4gICAgZXhwb3J0IGNsYXNzIExpc3Q8VD4gZXh0ZW5kcyBBcnJheTxUPntcblxuICAgICAgICBhZGQoaXRlbTpUKSA6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEFsbChpdGVtczpBcnJheTxUPikgOiB2b2lkIHtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8aXRlbXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZShpdGVtOlQpOnZvaWQge1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VyaXRlbSA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgaWYoY3VyaXRlbT09aXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUFsbChpdGVtczpBcnJheTxUPikgOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8aXRlbXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhcigpIDp2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLnNwbGljZSgwLHRoaXMubGVuZ3RoKTtcbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHRlc3RtYXAoKTp2b2lke1xuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcDxzdHJpbmcsbnVtYmVyPigpO1xuICAgICAgICBtYXAucHV0KCdhJywzMyk7XG4gICAgICAgIG1hcC5wdXQoJ2InLDQzKTtcbiAgICAgICAgbGV0IGIgPSBtYXAuZ2V0KCdiJyk7XG4gICAgICAgIGxldCBhID0gbWFwLmdldCgnYScpO1xuICAgICAgICBtYXAuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBjbGFzcyBNYXBJdGVtPFRLZXksVFZhbHVlPiB7XG4gICAgICAgIGtleSA6IFRLZXk7XG4gICAgICAgIHZhbHVlIDogVFZhbHVlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGtleTogVEtleSwgdmFsdWU6IFRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgTWFwPFRLZXksVFZhbHVlPiBleHRlbmRzIEFycmF5PE1hcEl0ZW08VEtleSxUVmFsdWU+PntcblxuICAgICAgICBwdXQoa2V5OlRLZXksIHZhbHVlOlRWYWx1ZSkgOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChuZXcgTWFwSXRlbShrZXksdmFsdWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldChrZXk6VEtleSkgOiBUVmFsdWUgfCBhbnkge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0ua2V5PT1rZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyKCkgOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoMCx0aGlzLmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluc0tleShrZXk6VEtleSk6Ym9vbGVhbiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5rZXk9PWtleSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBTb2xpZENvbG9yQnJ1c2ggaW1wbGVtZW50cyBCcnVzaHtcbiAgICAgICAgY29sb3I6c3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb2xvcjpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JhY2tncm91bmQoZWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXIoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogTGF5b3V0THpnLlRoaWNrbmVzcyk6IHZvaWQge1xuICAgICAgICAgICAgJChlbGVtKS5jc3MoXCJib3JkZXItY29sb3JcIiwgdGhpcy5jb2xvcik7XG5cbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLWxlZnQtd2lkdGhcIiwgdGhpY2tuZXNzLmxlZnQrXCJweFwiKTtcbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLXJpZ2h0LXdpZHRoXCIsIHRoaWNrbmVzcy5yaWdodCtcInB4XCIpO1xuICAgICAgICAgICAgJChlbGVtKS5jc3MoXCJib3JkZXItdG9wLXdpZHRoXCIsIHRoaWNrbmVzcy50b3ArXCJweFwiKTtcbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLWJvdHRvbS13aWR0aFwiLCB0aGlja25lc3MuYm90dG9tK1wicHhcIik7XG5cbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLWxlZnQtc3R5bGVcIiwgXCJzb2xpZFwiKTtcbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLXJpZ2h0LXN0eWxlXCIsIFwic29saWRcIik7XG4gICAgICAgICAgICAkKGVsZW0pLmNzcyhcImJvcmRlci10b3Atc3R5bGVcIiwgXCJzb2xpZFwiKTtcbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLWJvdHRvbS1zdHlsZVwiLCBcInNvbGlkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgY2xhc3MgSW1hZ2VDb2xvckJydXNoIGltcGxlbWVudHMgQnJ1c2h7XG4gICAgICAgIGNvbG9yOnN0cmluZztcbiAgICAgICAgY29uc3RydWN0b3IoY29sb3I6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9CYWNrZ3JvdW5kKGVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXIoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogTGF5b3V0THpnLlRoaWNrbmVzcyk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgY2xhc3MgR3JhZGllbnRDb2xvckJydXNoIGltcGxlbWVudHMgQnJ1c2h7XG4gICAgICAgIGNvbG9yOnN0cmluZztcbiAgICAgICAgY29uc3RydWN0b3IoY29sb3I6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9CYWNrZ3JvdW5kKGVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IExheW91dEx6Zy5UaGlja25lc3MpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJMZWZ0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclJpZ2h0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclRvcChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJCb3R0b20oZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250cm9sQmFzZSBleHRlbmRzIENvbnRyb2wge1xuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290RWxlbSA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmNzcyhcImJveC1zaXppbmdcIixcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RFbGVtO1xuICAgICAgICB9XG5cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tQm90dG9tKCk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcbiAgICBleHBvcnQgY2xhc3MgVGV4dFZpZXcgZXh0ZW5kcyBDb250cm9sQmFzZSB7XG5cbiAgICAgICAgcHJpdmF0ZSBfdGV4dDpzdHJpbmc7XG4gICAgICAgIHByaXZhdGUgX3NlbGVjdGFibGU6Ym9vbGVhbjtcbiAgICAgICAgcHJpdmF0ZSBfd29yZFdyYXA6Ym9vbGVhbjtcbiAgICAgICAgcHJpdmF0ZSBzcGFuRWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsdGV4dDpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHRleHQ7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydGllcy5wdXNoKFwidGV4dFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB0ZXh0KCk6IHN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB0ZXh0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBzZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGFibGU7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgc2VsZWN0YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0YWJsZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHdvcmRXcmFwKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmRXcmFwO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHdvcmRXcmFwKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLl93b3JkV3JhcCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYodGhpcy5yb290RWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtdHlwZScsJ1RleHRWaWV3Jyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtbmFtZScsdGhpcy5uYW1lKTtcbiAgICAgICAgICAgICAgICAvLyBldmVudFRyYW5zcGFyZW50RGl2KHRoaXMucm9vdEVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuc3BhbkVsZW0gPSAkKFwiPHNwYW4+PC9zcGFuPlwiKVswXTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3dpZHRoJyx0aGlzLndpZHRoLnZhbHVlKydweCcpO1xuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdoZWlnaHQnLHRoaXMuaGVpZ2h0LnZhbHVlKydweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmFwcGVuZCh0aGlzLnNwYW5FbGVtKTtcbiAgICAgICAgICAgICQodGhpcy5zcGFuRWxlbSkudGV4dCh0aGlzLl90ZXh0KTtcbiAgICAgICAgICAgIGlmKHRoaXMuX3dvcmRXcmFwKVxuICAgICAgICAgICAgICAgICQodGhpcy5zcGFuRWxlbSkuY3NzKCd3b3JkLWJyZWFrJywnYnJlYWstYWxsJyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgJCh0aGlzLnNwYW5FbGVtKS5jc3MoJ3dvcmQtYnJlYWsnLCdub3JtYWwnKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5kb0xheW91dCgpO1xuICAgICAgICAgICAgaWYoIXRoaXMuX3NlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMuc3BhbkVsZW0pLmNzcyhcInVzZXItc2VsZWN0XCIsXCJub25lXCIpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcy5zcGFuRWxlbSkuY3NzKFwidXNlci1zZWxlY3RcIixcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdCYmdGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlJiZ0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy5zcGFuRWxlbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlJiZ0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLnNwYW5FbGVtLm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tQm90dG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLnNwYW5FbGVtLm9mZnNldFdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMuc3BhbkVsZW0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGNsYXNzIFJlY3QgZXh0ZW5kcyBDb250cm9sQmFzZSB7XG5cbiAgICAgICAgcHJpdmF0ZSBfcmFkaXVzX2JvdHRvbV9sZWZ0Om51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfcmFkaXVzX2JvdHRvbV9yaWdodDpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3JhZGl1c190b3BfbGVmdDpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3JhZGl1c190b3BfcmlnaHQ6bnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9vcGFjaXR5Om51bWJlcjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX2JvdHRvbV9sZWZ0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c19ib3R0b21fcmlnaHQgPSAwO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX3RvcF9sZWZ0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c190b3BfcmlnaHQgPSAwO1xuICAgICAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldCByYWRpdXNfYm90dG9tX2xlZnQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXNfYm90dG9tX2xlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcmFkaXVzX2JvdHRvbV9sZWZ0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c19ib3R0b21fbGVmdCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHJhZGl1c19ib3R0b21fcmlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXNfYm90dG9tX3JpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHJhZGl1c19ib3R0b21fcmlnaHQodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX2JvdHRvbV9yaWdodCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHJhZGl1c190b3BfbGVmdCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1c190b3BfbGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCByYWRpdXNfdG9wX2xlZnQodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX3RvcF9sZWZ0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgcmFkaXVzX3RvcF9yaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1c190b3BfcmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcmFkaXVzX3RvcF9yaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfdG9wX3JpZ2h0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcmFkaXVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c19ib3R0b21fbGVmdCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX2JvdHRvbV9yaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX3RvcF9sZWZ0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfdG9wX3JpZ2h0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgb3BhY2l0eSgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29wYWNpdHk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgb3BhY2l0eSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBsZXQgZWxlbSA9IHN1cGVyLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgICAgICAkKGVsZW0pLmF0dHIoJ2xheW91dC10eXBlJywnUmVjdCcpO1xuICAgICAgICAgICAgJChlbGVtKS5hdHRyKCdsYXlvdXQtbmFtZScsdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd3aWR0aCcsdGhpcy5jYWxjdWxhdGVkV2lkdGgrJ3B4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdoZWlnaHQnLHRoaXMuY2FsY3VsYXRlZEhlaWdodCsncHgnKTtcbiAgICAgICAgICAgIC8vIHN0cm9rZSBhbmQgZmlsbFxuICAgICAgICAgICAgaWYodGhpcy5maWxsKSB0aGlzLmZpbGwuYXBwbHlUb0JhY2tncm91bmQodGhpcy5yb290RWxlbSk7XG4gICAgICAgICAgICBpZih0aGlzLnN0cm9rZSkgdGhpcy5zdHJva2UuYXBwbHlUb0JvcmRlcih0aGlzLnJvb3RFbGVtLHRoaXMuc3Ryb2tlVGhpY2tuZXNzKTtcbiAgICAgICAgICAgIC8vIHJhZGl1c1xuICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5jc3MoXCJib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzXCIsdGhpcy5yYWRpdXNfYm90dG9tX2xlZnQrXCJweFwiKTtcbiAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuY3NzKFwiYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXNcIix0aGlzLnJhZGl1c19ib3R0b21fcmlnaHQrXCJweFwiKTtcbiAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuY3NzKFwiYm9yZGVyLXRvcC1sZWZ0LXJhZGl1c1wiLHRoaXMucmFkaXVzX3RvcF9sZWZ0K1wicHhcIik7XG4gICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmNzcyhcImJvcmRlci10b3AtcmlnaHQtcmFkaXVzXCIsdGhpcy5yYWRpdXNfdG9wX3JpZ2h0K1wicHhcIik7XG4gICAgICAgICAgICAvLyBvcGFjaXR5XG4gICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmNzcyhcIm9wYWNpdHlcIix0aGlzLm9wYWNpdHkpO1xuICAgICAgICAgICAgLy8gc2hhZG93XG4gICAgICAgICAgICBpZih0aGlzLnNoYWRvdykge1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuY3NzKFwiYm94LXNoYWRvd1wiLHRoaXMuc2hhZG93LnRvQm94U2hhd2Rvd1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90JiZ0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUmJnRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdCYmdGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSYmdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3VwZXIuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tQm90dG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGNsYXNzIEltYWdlVmlldyBleHRlbmRzIENvbnRyb2xCYXNlIHtcblxuICAgICAgICBpbWdFbGVtOkhUTUxFbGVtZW50O1xuICAgICAgICBzcmM6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHsgXG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuZW1wdHkoKTtcblxuICAgICAgICAgICAgaWYodGhpcy5pbWdFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWdFbGVtID0gJChcIjxpbWcvPlwiKVswXTtcbiAgICAgICAgICAgICAgICAkKHRoaXMuaW1nRWxlbSkuYXR0cignc3JjJyx0aGlzLnNyYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKHRoaXMuaW1nRWxlbSk7XG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3dpZHRoJyx0aGlzLndpZHRoLnZhbHVlKydweCcpO1xuICAgICAgICAgICAgICAgICQodGhpcy5pbWdFbGVtKS5jc3MoJ3dpZHRoJyx0aGlzLndpZHRoLnZhbHVlKydweCcpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmltZ0VsZW0pLmNzcygnd2lkdGgnLCcxMDAlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2hlaWdodCcsdGhpcy5oZWlnaHQudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmltZ0VsZW0pLmNzcygnaGVpZ2h0Jyx0aGlzLmhlaWdodC52YWx1ZSsncHgnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICQodGhpcy5pbWdFbGVtKS5jc3MoJ2hlaWdodCcsJzEwMCUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbnRhaW5lckJhc2UgZXh0ZW5kcyBDb250YWluZXJDb250cm9sIHtcblxuICAgICAgICByb290RWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVIZWlnaHRfYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlSGVpZ2h0X2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBlc3RpbWF0ZVdpZHRoX2F1dG8oKTpudW1iZXIgO1xuXG4gICAgICAgIGFic3RyYWN0IGVzdGltYXRlSGVpZ2h0X2F1dG8oKTpudW1iZXIgO1xuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBCb3JkZXIgZXh0ZW5kcyBDb250YWluZXJDb250cm9sIHtcblxuICAgICAgICBwcm90ZWN0ZWQgbWFpblNsb3QgOiBTbG90O1xuICAgICAgICBwcm90ZWN0ZWQgY2hpbGRXcmFwcGVyc01hcDogTWFwPENvbnRyb2wsSFRNTEVsZW1lbnQ+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMubWFpblNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgdGhpcy5tYWluU2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jaGlsZFdyYXBwZXJzTWFwID0gbmV3IE1hcDxDb250cm9sLCBIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdHMucHVzaCh0aGlzLm1haW5TbG90KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdCb3JkZXInKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuXG4gICAgICAgIGFkZENoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgICAgIHRoaXMubWFpblNsb3QuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmVtcHR5KCk7XG5cbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkLmFzc2VtYmxlRG9tKCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlckRpdiA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgICAgICAgICAkKHdyYXBwZXJEaXYpLmF0dHIoJ2xheW91dC10YWcnLCd3cmFwcGVyJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZFdyYXBwZXJzTWFwLnB1dChjaGlsZCx3cmFwcGVyRGl2KTtcbiAgICAgICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKHdyYXBwZXJEaXYpO1xuICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuYXBwZW5kKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd3aWR0aCcsdGhpcy5jYWxjdWxhdGVkV2lkdGgrJ3B4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdoZWlnaHQnLHRoaXMuY2FsY3VsYXRlZEhlaWdodCsncHgnKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygc2xvdC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd3JhcHBlckRpdiA9IHRoaXMuY2hpbGRXcmFwcGVyc01hcC5nZXQoY2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuY3NzKCdsZWZ0JyxjaGlsZC5tYXJnaW4ubGVmdCsncHgnKTtcbiAgICAgICAgICAgICAgICAgICAgJCh3cmFwcGVyRGl2KS5jc3MoJ3JpZ2h0JyxjaGlsZC5tYXJnaW4ucmlnaHQrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuY3NzKCd0b3AnLGNoaWxkLm1hcmdpbi50b3ArJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuY3NzKCdib3R0b20nLGNoaWxkLm1hcmdpbi5ib3R0b20rJ3B4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNsb3QubGF5b3V0Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdCYmdGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlJiZ0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLm1haW5TbG90LmNhbHVsYXRlZFNsb3RXaWR0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOe7iOatouWQkeS4i+iuoeeul++8jOS7juS4i+WQkeS4iuiuoeeul1xuICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuaXNTbG90V2lkdGhDYWxjdWxhdGFibGU9ZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5jYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdCYmdGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSYmdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5tYWluU2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOe7iOatouWQkeS4i+iuoeeul++8jOS7juS4i+WQkeS4iuiuoeeul1xuICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlPWZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuY2FsY3VsYXRlZEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpICB7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy5tYWluU2xvdC5jYWx1bGF0ZWRTbG90V2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSAge1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5tYWluU2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBjbGFzcyBTbG90SXRlbSB7XG4gICAgICAgIHNsb3RCb3JkZXI6Qm9yZGVyO1xuICAgICAgICBzbG90RGVmaW5hdGlvbjpEaXN0YW5jZTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihzbG90Qm9yZGVyOiBCb3JkZXIsIHNsb3REZWZpbmF0aW9uOiBEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5zbG90Qm9yZGVyID0gc2xvdEJvcmRlcjtcbiAgICAgICAgICAgIHRoaXMuc2xvdERlZmluYXRpb24gPSBzbG90RGVmaW5hdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBIb3Jpem9uYWxMaW5lYXJMYXlvdXQgZXh0ZW5kcyBDb250YWluZXJCYXNlIHtcblxuICAgICAgICBzbG90TWFwIDogTWFwPFNsb3QsU2xvdEl0ZW0+O1xuICAgICAgICBib3JkZXJFbGVtOkhUTUxFbGVtZW50O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdE1hcCA9IG5ldyBNYXA8U2xvdCwgU2xvdEl0ZW0+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDZWxsKGRpc3RhbmNlOkRpc3RhbmNlKSB7XG4gICAgICAgICAgICBsZXQgc2xvdCA9IG5ldyBTbG90KCk7XG4gICAgICAgICAgICBzbG90LmNvbnRhaW5lciA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnNsb3RzLmFkZChzbG90KTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnNsb3RNYXAuY29udGFpbnNLZXkoc2xvdCkpXG4gICAgICAgICAgICAgICAgdGhpcy5zbG90TWFwLnB1dChzbG90LG5ldyBTbG90SXRlbShudWxsLG51bGwpKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgIGl0ZW0uc2xvdERlZmluYXRpb24gPSBkaXN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5yZW1vdmVDaGlsZChjb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyQ2hpbGQoKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5jbGVhckNoaWxkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRDZWxsKGNvbnRyb2w6Q29udHJvbCwgY2VsbEluZGV4Om51bWJlcikge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbY2VsbEluZGV4XTtcbiAgICAgICAgICAgICAgICBzbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYodGhpcy5yb290RWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtdHlwZScsJ0hvcml6b25hbExpbmVhckxheW91dCcpO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LW5hbWUnLHRoaXMubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRDYWxjdWxhYmxlU2xvdHMoKTp2b2lkIHtcbiAgICAgICAgICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZSpjZWxsRGVmaW5hdGlvbi52YWx1ZS93ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgJiYgdGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSAmJiB0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcblxuICAgICAgICAgICAgLy8gaW5pdCB2YXJpYWJsZXMgYW5kIGh0bWxlbGVtZW50c1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmVtcHR5KCk7XG4gICAgICAgICAgICBpZih0aGlzLmJvcmRlckVsZW09PW51bGwpIHRoaXMuYm9yZGVyRWxlbSA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcblxuICAgICAgICAgICAgLy8gYWRkIGNlbGwgd3JhcHBlciBkaXZzIHRvIHJvb3RFbGVtXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IG5ldyBCb3JkZXIoJycpO1xuICAgICAgICAgICAgICAgIGJvcmRlci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmFwcGVuZChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSk7XG5cbiAgICAgICAgICAgICAgICBpdGVtLnNsb3RCb3JkZXIgPSBib3JkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCBjaGlsZHJlbiByb290RWxlbXMgdG8gY2VsbCB3cmFwcGVyc1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBpdGVtLnNsb3RCb3JkZXI7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci5hZGRDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGl0ZW0uc2xvdEJvcmRlciA9IGJvcmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgd2VpZ2h0U3VtIGFuZCBmaXhTdW1cbiAgICAgICAgICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuICAgICAgICAgICAgbGV0IGZpeFN1bSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIGZpeFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLyBzZXQgcm9vdEVsZW0gc3R5bGVzXG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd3aWR0aCcsdGhpcy5lc3RpbWF0ZVdpZHRoKCkrJ3B4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdoZWlnaHQnLHRoaXMuZXN0aW1hdGVIZWlnaHQoKSsncHgnKTtcblxuICAgICAgICAgICAgLy8gc2V0IGJvcmRlciBhbmQgYmFja2dyb3VuZCBzdHlsZXNcbiAgICAgICAgICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCd0b3AnLCcwcHgnKTtcbiAgICAgICAgICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ2JvdHRvbScsJzBweCcpO1xuICAgICAgICAgICAgaWYodGhpcy5zdHJva2Upe1xuICAgICAgICAgICAgICAgIHRoaXMuc3Ryb2tlLmFwcGx5VG9Cb3JkZXIodGhpcy5ib3JkZXJFbGVtLHRoaXMuc3Ryb2tlVGhpY2tuZXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuZmlsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxsLmFwcGx5VG9CYWNrZ3JvdW5kKHRoaXMuYm9yZGVyRWxlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IGl0ZW0uc2xvdEJvcmRlcjtcblxuICAgICAgICAgICAgICAgICQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgICQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpLmNzcygndG9wJywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdib3R0b20nLCcwcHgnKTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbHcgPSAwO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsdz1jZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgY2VsbHcgPSAodGhpcy5lc3RpbWF0ZVdpZHRoKCkgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdsZWZ0Jyxwb3MrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxjZWxsdyk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgICAgICBib3JkZXIudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QgPSBzbG90O1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuZXN0aW1hdGVIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gY2VsbHc7XG5cbiAgICAgICAgICAgICAgICBwb3MrPWNlbGx3O1xuICAgICAgICAgICAgICAgIGJvcmRlci5kb0xheW91dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlSGVpZ2h0X2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZUhlaWdodF9hdXRvKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHRfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlSGVpZ2h0KCkgKyB0Lm1hcmdpbi50b3AgKyB0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVXaWR0aF9hdXRvKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZVdpZHRoKCkgKyB0Lm1hcmdpbi5sZWZ0ICsgdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGNsYXNzIFNsb3RJdGVtIHtcbiAgICAgICAgc2xvdEJvcmRlcjpCb3JkZXI7XG4gICAgICAgIHNsb3REZWZpbmF0aW9uOkRpc3RhbmNlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHNsb3RCb3JkZXI6IEJvcmRlciwgc2xvdERlZmluYXRpb246IERpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLnNsb3RCb3JkZXIgPSBzbG90Qm9yZGVyO1xuICAgICAgICAgICAgdGhpcy5zbG90RGVmaW5hdGlvbiA9IHNsb3REZWZpbmF0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFZlcnRpY2FsbGluZWFybGF5b3V0MiBleHRlbmRzIEJvcmRlcntcbiAgICAgICAgc2xvdE1hcCA6IE1hcDxTbG90LFNsb3RJdGVtPjtcbiAgICAgICAgYm9yZGVyRWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAgPSBuZXcgTWFwPFNsb3QsIFNsb3RJdGVtPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2VsbChkaXN0YW5jZTpEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zbG90TWFwLmNvbnRhaW5zS2V5KHNsb3QpKVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdE1hcC5wdXQoc2xvdCxuZXcgU2xvdEl0ZW0obmV3IEJvcmRlcihcIkxpbmVhckNlbGxcIiksbnVsbCkpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgaXRlbS5zbG90RGVmaW5hdGlvbiA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgc3VwZXIuYWRkQ2hpbGQoaXRlbS5zbG90Qm9yZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmFkZChjb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnJlbW92ZShjb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyQ2hpbGQoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRDZWxsKGNvbnRyb2w6Q29udHJvbCwgY2VsbEluZGV4Om51bWJlcikge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbY2VsbEluZGV4XTtcbiAgICAgICAgICAgICAgICBzbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBpdGVtLnNsb3RCb3JkZXIuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbml0Q2FsY3VsYWJsZVNsb3RzKCk6dm9pZCB7XG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWUqY2VsbERlZmluYXRpb24udmFsdWUvd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSAmJiB0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHdlaWdodFN1bSBhbmQgZml4U3VtXG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IGl0ZW0uc2xvdEJvcmRlcjtcblxuICAgICAgICAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLmVzdGltYXRlSGVpZ2h0KCkgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYm9yZGVyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgICAgIGJvcmRlci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLGNlbGxoKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGJvcmRlci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlRvcDtcblxuICAgICAgICAgICAgICAgIHBvcys9Y2VsbGg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmRvTGF5b3V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5SaWdodClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5lc3RpbWF0ZVdpZHRoKCkrdC5tYXJnaW4ubGVmdCt0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRobGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVXaWR0aCgpICsgdC5tYXJnaW4ubGVmdCArIHQubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRobGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuZXN0aW1hdGVIZWlnaHQoKSt0Lm1hcmdpbi50b3ArdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZUhlaWdodCgpICsgdC5tYXJnaW4udG9wICsgdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFZlcnRpY2FsTGluZWFyTGF5b3V0IGV4dGVuZHMgQ29udGFpbmVyQ29udHJvbCB7XG5cbiAgICAgICAgc2xvdE1hcCA6IE1hcDxTbG90LFNsb3RJdGVtPjtcbiAgICAgICAgYm9yZGVyRWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAgPSBuZXcgTWFwPFNsb3QsIFNsb3RJdGVtPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2VsbChkaXN0YW5jZTpEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zbG90TWFwLmNvbnRhaW5zS2V5KHNsb3QpKVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdE1hcC5wdXQoc2xvdCxuZXcgU2xvdEl0ZW0obnVsbCxudWxsKSk7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICBpdGVtLnNsb3REZWZpbmF0aW9uID0gZGlzdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIucmVtb3ZlQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhckNoaWxkKCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuY2xlYXJDaGlsZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0Q2VsbChjb250cm9sOkNvbnRyb2wsIGNlbGxJbmRleDpudW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjb250cm9sKTtcbiAgICAgICAgICAgIGlmKGlkeD4tMSl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2NlbGxJbmRleF07XG4gICAgICAgICAgICAgICAgc2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdWZXJ0aWNhbExpbmVhckxheW91dCcpO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LW5hbWUnLHRoaXMubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRDYWxjdWxhYmxlU2xvdHMoKTp2b2lkIHtcbiAgICAgICAgICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZSpjZWxsRGVmaW5hdGlvbi52YWx1ZS93ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgJiYgdGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG5cbiAgICAgICAgICAgIC8vIGluaXQgdmFyaWFibGVzIGFuZCBodG1sZWxlbWVudHNcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuICAgICAgICAgICAgaWYodGhpcy5ib3JkZXJFbGVtPT1udWxsKSB0aGlzLmJvcmRlckVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG5cbiAgICAgICAgICAgIC8vIGFkZCBjZWxsIHdyYXBwZXIgZGl2cyB0byByb290RWxlbVxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBuZXcgQm9yZGVyKCcnKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5hcHBlbmQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpO1xuXG4gICAgICAgICAgICAgICAgaXRlbS5zbG90Qm9yZGVyID0gYm9yZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRyZW4gcm9vdEVsZW1zIHRvIGNlbGwgd3JhcHBlcnNcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gaXRlbS5zbG90Qm9yZGVyO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXIuYWRkQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpdGVtLnNsb3RCb3JkZXIgPSBib3JkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHdlaWdodFN1bSBhbmQgZml4U3VtXG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gc2V0IHJvb3RFbGVtIHN0eWxlc1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMuZXN0aW1hdGVXaWR0aCgpKydweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmVzdGltYXRlSGVpZ2h0KCkrJ3B4Jyk7XG5cbiAgICAgICAgICAgIC8vIHNldCBib3JkZXIgYW5kIGJhY2tncm91bmQgc3R5bGVzXG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygndG9wJywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdib3R0b20nLCcwcHgnKTtcbiAgICAgICAgICAgIGlmKHRoaXMuc3Ryb2tlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cm9rZS5hcHBseVRvQm9yZGVyKHRoaXMuYm9yZGVyRWxlbSx0aGlzLnN0cm9rZVRoaWNrbmVzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmZpbGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsbC5hcHBseVRvQmFja2dyb3VuZCh0aGlzLmJvcmRlckVsZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBpdGVtLnNsb3RCb3JkZXI7XG5cbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxoID0gMDtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoID0gKHRoaXMuZXN0aW1hdGVIZWlnaHQoKSAtIGZpeFN1bSkqIGNlbGxEZWZpbmF0aW9uLnZhbHVlIC8gd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcscG9zKydweCcpO1xuICAgICAgICAgICAgICAgIGJvcmRlci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxjZWxsaCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90ID0gc2xvdDtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5lc3RpbWF0ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gY2VsbGg7XG5cbiAgICAgICAgICAgICAgICBwb3MrPWNlbGxoO1xuICAgICAgICAgICAgICAgIGJvcmRlci5kb0xheW91dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuZXN0aW1hdGVXaWR0aCgpK3QubWFyZ2luLmxlZnQrdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlV2lkdGgoKSArIHQubWFyZ2luLmxlZnQgKyB0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3BcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlSGVpZ2h0KCkrdC5tYXJnaW4udG9wK3QubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVIZWlnaHQoKSArIHQubWFyZ2luLnRvcCArIHQubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIC8vIEJvcmRlcnMgdG8gY29udGFpbiBjaGlsZCBjb250cm9scywgY2VsbEJvcmRlckFycmF5Lmxlbmd0aCBpcyB0aGUgY2VsbHMgY291bnQuXG4gICAgICAgIC8vIGNlbGxCb3JkZXJBcnJheSA6IExpc3Q8Qm9yZGVyPjtcbiAgICAgICAgLy8gLy8gVGhlIGRpc3RhbmNlIGRlZmluYXRpb24gZm9yIGVhY2ggY2VsbHMuXG4gICAgICAgIC8vIGNlbGxEZWZpbmF0aW9uczpMaXN0PERpc3RhbmNlPjtcbiAgICAgICAgLy8gLy8gVGhlIGNlbGwgaW5kZXggb2YgZWFjaCBjaGlsZCBjb250cm9sIG9mIHRoaXMgY29udGFpbmVyLlxuICAgICAgICAvLyBjZWxsSW5kZXhBcnJheTpMaXN0PG51bWJlcj47XG4gICAgICAgIC8vIC8vIFRoZSBiYWNrZ3JvdWQgYW5kIGJvcmRlciBkaXYgZWxlbWVudC5cbiAgICAgICAgLy8gYm9yZGVyRWxlbTpIVE1MRWxlbWVudDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgLy8gICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAvLyAgICAgLy8gSW5pdCB2YXJpYWJsZXMuXG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxJbmRleEFycmF5PW5ldyBMaXN0PG51bWJlcj4oKTtcbiAgICAgICAgLy8gICAgIHRoaXMuY2VsbERlZmluYXRpb25zID0gbmV3IExpc3Q8RGlzdGFuY2U+KCk7XG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxCb3JkZXJBcnJheSA9IG5ldyBMaXN0PEJvcmRlcj4oKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvLyBBZGQgY2VsbCBkZWZpbmF0aW9uLiBUaGUgZGlzdGFuY2UgdHlwZSBjYW4gYmUgJ3dlaWdodCcgb3IgJ2ZpeCcuXG4gICAgICAgIC8vIGFkZENlbGwoZGlzdGFuY2U6RGlzdGFuY2UpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuY2VsbERlZmluYXRpb25zLnB1c2goZGlzdGFuY2UpO1xuICAgICAgICAvLyAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAvLyAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAvLyAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy8gQWRkIGNoaWxkIHRvIHRoaXMgY29udGFpbmVyLCBhbmQgdGhlIGNvbnRyb2wgaXMgYWRkZWQgdG8gdGhlIGZpcnN0IGNlbGwgYnkgZGVmYXVsdC5cbiAgICAgICAgLy8gYWRkQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgLy8gICAgIHN1cGVyLmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgdGhpcy5jZWxsSW5kZXhBcnJheS5wdXNoKDApO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIFJlbW92ZSBjaGlsZCBmcm9tIHRoaXMgY29udGFpbmVyLlxuICAgICAgICAvLyByZW1vdmVDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAvLyAgICAgc3VwZXIucmVtb3ZlQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIC8vICAgICBjb25zdCBpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY29udHJvbCk7XG4gICAgICAgIC8vICAgICBpZihpZHg+LTEpe1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2VsbEluZGV4QXJyYXkuc3BsaWNlKGlkeCwxKTtcbiAgICAgICAgLy8gICAgICAgICBpZihjb250cm9sLnBhcmVudFNsb3QpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29udHJvbC5wYXJlbnRTbG90LnJlbW92ZUNoaWxkKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvLyBSZW1vdmUgYWxsIGNoaWxkcmVuIGZyb20gdGhpcyBjb250YWluZXIuXG4gICAgICAgIC8vIGNsZWFyQ2hpbGQoKTogdm9pZCB7XG4gICAgICAgIC8vICAgICBzdXBlci5jbGVhckNoaWxkKCk7XG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxJbmRleEFycmF5LmNsZWFyKCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy8gU3BlY2lmeSAnY29udHJvbCcgdG8gdGhlICdjZWxsSW5kZXgnIGNlbGwuXG4gICAgICAgIC8vIHNldENlbGwoY29udHJvbDpDb250cm9sLCBjZWxsSW5kZXg6bnVtYmVyKSB7XG4gICAgICAgIC8vICAgICBjb25zdCBpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY29udHJvbCk7XG4gICAgICAgIC8vICAgICBpZihpZHg+LTEpe1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2VsbEluZGV4QXJyYXlbaWR4XSA9IGNlbGxJbmRleDtcbiAgICAgICAgLy8gICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbY2VsbEluZGV4XTtcbiAgICAgICAgLy8gICAgICAgICBzbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIEdldCB0aGUgcm9vdCBkaXYgb2YgdGhpcyBjb250YWluZXIuXG4gICAgICAgIC8vIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy8gICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAvLyAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdIb3Jpem9uYWxMaW5lYXJMYXlvdXQnKTtcbiAgICAgICAgLy8gICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gaW5pdENhbGN1bGFibGVTbG90cygpOnZvaWQge1xuICAgICAgICAvLyAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAvLyAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLmNlbGxEZWZpbmF0aW9uc1tpXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5bal07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5bal07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWUqY2VsbERlZmluYXRpb24udmFsdWUvd2VpZ2h0U3VtO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1lbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jZWxsRGVmaW5hdGlvbnMubGVuZ3RoO2krKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLmNlbGxEZWZpbmF0aW9uc1tpXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wO2o8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aisrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2pdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wO2o8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aisrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2pdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbEluZGV4QXJyYXlbal09PWkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgIC8vICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAvLyAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1lbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgJiYgdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gaW5pdCB2YXJpYWJsZXMgYW5kIGh0bWxlbGVtZW50c1xuICAgICAgICAvLyAgICAgdGhpcy5jZWxsQm9yZGVyQXJyYXkuY2xlYXIoKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuICAgICAgICAvLyAgICAgaWYodGhpcy5ib3JkZXJFbGVtPT1udWxsKSB0aGlzLmJvcmRlckVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgIC8vICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKHRoaXMuYm9yZGVyRWxlbSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBhZGQgY2VsbCB3cmFwcGVyIGRpdnMgdG8gcm9vdEVsZW1cbiAgICAgICAgLy8gICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgIGxldCBib3JkZXIgPSBuZXcgQm9yZGVyKCcnKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2VsbEJvcmRlckFycmF5LnB1c2goYm9yZGVyKTtcbiAgICAgICAgLy8gICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKGJvcmRlci5nZXRSb290RWxlbWVudCgpKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIGFkZCBjaGlsZHJlbiByb290RWxlbXMgdG8gY2VsbCB3cmFwcGVyc1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgaj0wO2o8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aisrKXtcbiAgICAgICAgLy8gICAgICAgICBsZXQgYm9yZGVyID0gdGhpcy5jZWxsQm9yZGVyQXJyYXlbdGhpcy5jZWxsSW5kZXhBcnJheVtqXV07XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgLy8gICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5hZGRDaGlsZChjaGlsZCk7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgIC8vICAgICAvLyBjYWxjdWxhdGUgd2VpZ2h0U3VtIGFuZCBmaXhTdW1cbiAgICAgICAgLy8gICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuICAgICAgICAvLyAgICAgbGV0IGZpeFN1bSA9IDA7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgZml4U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gc2V0IHJvb3RFbGVtIHN0eWxlc1xuICAgICAgICAvLyAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMuZXN0aW1hdGVXaWR0aCgpKydweCcpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmVzdGltYXRlSGVpZ2h0KCkrJ3B4Jyk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBzZXQgYm9yZGVyIGFuZCBiYWNrZ3JvdW5kIHN0eWxlc1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnbGVmdCcsJzBweCcpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncmlnaHQnLCcwcHgnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3RvcCcsJzBweCcpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnYm90dG9tJywnMHB4Jyk7XG4gICAgICAgIC8vICAgICBpZih0aGlzLnN0cm9rZSl7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zdHJva2UuYXBwbHlUb0JvcmRlcih0aGlzLmJvcmRlckVsZW0sdGhpcy5zdHJva2VUaGlja25lc3MpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgaWYodGhpcy5maWxsKXtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmZpbGwuYXBwbHlUb0JhY2tncm91bmQodGhpcy5ib3JkZXJFbGVtKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIHNldCBjZWxsIHdyYXBwZXIgc3R5bGVzXG4gICAgICAgIC8vICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtqKyspe1xuICAgICAgICAvLyAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuY2VsbERlZmluYXRpb25zW2pdO1xuICAgICAgICAvLyAgICAgICAgIGxldCBib3JkZXIgPSB0aGlzLmNlbGxCb3JkZXJBcnJheVtqXTtcbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNlbGxoID0gMDtcbiAgICAgICAgLy8gICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNlbGxoID0gKHRoaXMuZXN0aW1hdGVIZWlnaHQoKSAtIGZpeFN1bSkqIGNlbGxEZWZpbmF0aW9uLnZhbHVlIC8gd2VpZ2h0U3VtO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcscG9zKydweCcpO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLGNlbGxoKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIucGFyZW50U2xvdCA9IHRoaXMuc2xvdHNbal07XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMuZXN0aW1hdGVXaWR0aCgpO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IGNlbGxoO1xuICAgICAgICAvLyAgICAgICAgIHBvcys9Y2VsbGg7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLmRvTGF5b3V0KCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZXN0aW1hdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICAvLyAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlKXtcbiAgICAgICAgLy8gICAgICAgICBpZiAodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAvLyAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0XG4gICAgICAgIC8vICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KVxuICAgICAgICAvLyAgICAgICAgIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGg+MCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlV2lkdGgoKSt0Lm1hcmdpbi5sZWZ0K3QubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSBpZih0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZVdpZHRoKCkgKyB0Lm1hcmdpbi5sZWZ0ICsgdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyBlc3RpbWF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAvLyAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSl7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAvLyAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcFxuICAgICAgICAvLyAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSlcbiAgICAgICAgLy8gICAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuZXN0aW1hdGVIZWlnaHQoKSt0Lm1hcmdpbi50b3ArdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1lbHNlIGlmKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9ZWxzZXtcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAvLyAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZUhlaWdodCgpICsgdC5tYXJnaW4udG9wICsgdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgVmxpbmVhcmxheW91dCBleHRlbmRzIENvbnRhaW5lckNvbnRyb2x7XG4gICAgICAgIHByb3RlY3RlZCBzbG90TWFwIDogTWFwPFNsb3QsRGlzdGFuY2U+O1xuICAgICAgICBwcm90ZWN0ZWQgc2xvdFdyYXBwZXJzTWFwIDogTWFwPFNsb3QsSFRNTEVsZW1lbnQ+O1xuICAgICAgICBwcm90ZWN0ZWQgY2hpbGRXcmFwcGVyc01hcDogTWFwPENvbnRyb2wsSFRNTEVsZW1lbnQ+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAgPSBuZXcgTWFwPFNsb3QsIERpc3RhbmNlPigpO1xuICAgICAgICAgICAgdGhpcy5jaGlsZFdyYXBwZXJzTWFwID0gbmV3IE1hcDxDb250cm9sLCBIVE1MRWxlbWVudD4oKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdFdyYXBwZXJzTWFwID0gbmV3IE1hcDxTbG90LEhUTUxFbGVtZW50PigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2VsbChkaXN0YW5jZTpEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAucHV0KHNsb3QsZGlzdGFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0Q2VsbChjb250cm9sOkNvbnRyb2wsIGNlbGxJbmRleDpudW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjb250cm9sKTtcbiAgICAgICAgICAgIGlmKGlkeD4tMSl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2NlbGxJbmRleF07XG4gICAgICAgICAgICAgICAgc2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmVtcHR5KCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3RXcmFwcGVyRGl2ID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHNsb3QuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkV3JhcHBlckRpdiA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZFdyYXBwZXJEaXYpLmFwcGVuZChjaGlsZC5nZXRSb290RWxlbWVudCgpKTtcbiAgICAgICAgICAgICAgICAgICAgJChzbG90V3JhcHBlckRpdikuYXBwZW5kKGNoaWxkV3JhcHBlckRpdik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRXcmFwcGVyc01hcC5wdXQoY2hpbGQsY2hpbGRXcmFwcGVyRGl2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90V3JhcHBlcnNNYXAucHV0KHNsb3Qsc2xvdFdyYXBwZXJEaXYpO1xuICAgICAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5hcHBlbmQoc2xvdFdyYXBwZXJEaXYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd3aWR0aCcsdGhpcy5jYWxjdWxhdGVkV2lkdGgrJ3B4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdoZWlnaHQnLHRoaXMuY2FsY3VsYXRlZEhlaWdodCsncHgnKTtcblxuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG4gICAgICAgICAgICBsZXQgZml4U3VtID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHNsb3RXcmFwcGVyRGl2ID0gdGhpcy5zbG90V3JhcHBlcnNNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgY2VsbGggPSAwO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsaD1jZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgY2VsbGggPSAodGhpcy5jYWxjdWxhdGVkSGVpZ2h0IC0gZml4U3VtKSogY2VsbERlZmluYXRpb24udmFsdWUgLyB3ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJChzbG90V3JhcHBlckRpdikuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgJChzbG90V3JhcHBlckRpdikuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgJChzbG90V3JhcHBlckRpdikuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAgICAgICAgICQoc2xvdFdyYXBwZXJEaXYpLmNzcygndG9wJyxwb3MrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgJChzbG90V3JhcHBlckRpdikuY3NzKCdoZWlnaHQnLGNlbGxoKydweCcpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygc2xvdC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRXcmFwcGVyRGl2ID0gdGhpcy5jaGlsZFdyYXBwZXJzTWFwLmdldChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGRXcmFwcGVyRGl2KS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZFdyYXBwZXJEaXYpLmNzcygnbGVmdCcsY2hpbGQubWFyZ2luLmxlZnQrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGRXcmFwcGVyRGl2KS5jc3MoJ3JpZ2h0JyxjaGlsZC5tYXJnaW4ucmlnaHQrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGRXcmFwcGVyRGl2KS5jc3MoJ3RvcCcsY2hpbGQubWFyZ2luLnRvcCsncHgnKTtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZFdyYXBwZXJEaXYpLmNzcygnYm90dG9tJyxjaGlsZC5tYXJnaW4uYm90dG9tKydweCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzbG90LmxheW91dENoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgcG9zKz1jZWxsaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdCYmdGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlJiZ0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkV2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNsb3Qgb2YgdGhpcy5zbG90cykge1xuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g57uI5q2i5ZCR5LiL6K6h566X77yM5LuO5LiL5ZCR5LiK6K6h566XXG4gICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZT1mYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLmNhbGN1bGF0ZWRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZVdpZHRoRnJvbVRvcCgpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOiB2b2lkIHtcblxuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG4gICAgICAgICAgICBsZXQgZml4U3VtID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbGggPSAodGhpcy5oZWlnaHQudmFsdWUgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IGNlbGxoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdCYmdGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSYmdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkSGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQ7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbGggPSAodGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IGNlbGxoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RzLmZvckVhY2godD0+dC5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOe7iOatouWQkeS4i+iuoeeul++8jOS7juS4i+WQkeS4iuiuoeeul1xuICAgICAgICAgICAgdGhpcy5zbG90cy5mb3JFYWNoKHQ9PnQuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlPWZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuY2FsY3VsYXRlZEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2xvdHMuZm9yRWFjaCh0PT50LmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpICB7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuc2xvdHMubWFwKHQ9PnQuY2FsdWxhdGVkU2xvdFdpZHRoKTtcbiAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgbGV0IG1heHdpZHRoID0gMDtcbiAgICAgICAgICAgIGlmKHdpZHRobGlzdC5sZW5ndGg+MCkgbWF4d2lkdGggPSB3aWR0aGxpc3RbMF07XG5cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFdpZHRoID0gbWF4d2lkdGg7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUhlaWdodEZyb21Ub3AoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBzbG90IG9mIHRoaXMuc2xvdHMpICB7XG4gICAgICAgICAgICAgICAgc2xvdC5jYWxjdWxhdGVIZWlnaHRGcm9tQm90dG9tKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgc2xvdCBvZiB0aGlzLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgc3VtKz1zbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSBzdW07XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYodGhpcy5yb290RWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtdHlwZScsJ1ZsaW5lYXJsYXlvdXQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuXG5cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIEhsaW5lYXJsYXlvdXQgZXh0ZW5kcyBCb3JkZXJ7XG4gICAgICAgIHNsb3RNYXAgOiBNYXA8U2xvdCxTbG90SXRlbT47XG4gICAgICAgIHZjaGlsZHJlbjogTGlzdDxDb250cm9sPjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy52Y2hpbGRyZW4gPSBuZXcgTGlzdDxDb250cm9sPigpO1xuICAgICAgICAgICAgdGhpcy5zbG90TWFwID0gbmV3IE1hcDxTbG90LCBTbG90SXRlbT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnZjaGlsZHJlbi5hZGQoY29udHJvbCk7XG4gICAgICAgICAgICBjb250cm9sLnBhcmVudCA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDZWxsKGRpc3RhbmNlOkRpc3RhbmNlKSB7XG4gICAgICAgICAgICBsZXQgc2xvdCA9IG5ldyBTbG90KCk7XG4gICAgICAgICAgICB0aGlzLnNsb3RzLmFkZChzbG90KTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnNsb3RNYXAuY29udGFpbnNLZXkoc2xvdCkpXG4gICAgICAgICAgICAgICAgdGhpcy5zbG90TWFwLnB1dChzbG90LG5ldyBTbG90SXRlbShuZXcgQm9yZGVyKFwiTGluZWFyQ2VsbFwiKSxudWxsKSk7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICBpdGVtLnNsb3REZWZpbmF0aW9uID0gZGlzdGFuY2U7XG4gICAgICAgICAgICBzbG90LmNvbnRhaW5lciA9IGl0ZW0uc2xvdEJvcmRlcjtcbiAgICAgICAgICAgIHN1cGVyLmFkZENoaWxkKGl0ZW0uc2xvdEJvcmRlcik7XG4gICAgICAgICAgICAvLyB0aGlzLmNoaWxkcmVuLmFkZChpdGVtLnNsb3RCb3JkZXIpO1xuICAgICAgICAgICAgLy8gaXRlbS5zbG90Qm9yZGVyLnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICAvLyBpdGVtLnNsb3RCb3JkZXIucGFyZW50U2xvdCA9IHRoaXMubWFpblNsb3Q7XG4gICAgICAgICAgICAvLyBpdGVtLnNsb3RCb3JkZXIuYWN0dWFsQ29udGFpbmVyID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldENlbGwoY29udHJvbDpDb250cm9sLCBjZWxsSW5kZXg6bnVtYmVyKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLnZjaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbY2VsbEluZGV4XTtcbiAgICAgICAgICAgICAgICBzbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBpdGVtLnNsb3RCb3JkZXIuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgICAgICAgICAgY29udHJvbC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBpbml0Q2FsY3VsYWJsZVNsb3RzKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLndpZHRoLnZhbHVlKmNlbGxEZWZpbmF0aW9uLnZhbHVlL3dlaWdodFN1bTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSAmJiB0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlICYmIHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN1cGVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuICAgICAgICAgICAgbGV0IGZpeFN1bSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIGZpeFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gaXRlbS5zbG90Qm9yZGVyO1xuXG4gICAgICAgICAgICAgICAgbGV0IGNlbGx3ID0gMDtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbHc9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIGNlbGx3ID0gKHRoaXMuZXN0aW1hdGVIZWlnaHQoKSAtIGZpeFN1bSkqIGNlbGxEZWZpbmF0aW9uLnZhbHVlIC8gd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBib3JkZXIubWFyZ2luID0gbmV3IFRoaWNrbmVzcyhwb3MsMCwwLDApO1xuICAgICAgICAgICAgICAgIGJvcmRlci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxjZWxsdyk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgICAgICBib3JkZXIudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5Ub3A7XG5cbiAgICAgICAgICAgICAgICBwb3MrPWNlbGx3O1xuICAgICAgICAgICAgICAgIGJvcmRlci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN1cGVyLmRvTGF5b3V0KCk7XG4gICAgICAgIH1cblxuXG4gICAgfVxufSIsIlxubmFtZXNwYWNlIExheW91dEx6Zy5PYnNlcnZlck1vZGVsIHtcblxuICAgIGNvbnN0IGNvbmZpZ1Byb3BlcnR5TmFtZTpzdHJpbmcgPSBcIl9fb2JzZXJ2YWJsZV9fXCI7XG5cblxuICAgIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mge1xuICAgICAgICBvYmo6YW55O1xuICAgICAgICBwcm9wZXJ0eU5hbWUgOiBzdHJpbmc7XG4gICAgICAgIG9sZFZhbHVlIDogYW55O1xuICAgICAgICBuZXdWYWx1ZSA6IGFueTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6YW55LHByb3BlcnR5TmFtZTogc3RyaW5nLCBvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgICAgICB0aGlzLm9iaiA9IG9iajtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICAgICAgdGhpcy5vbGRWYWx1ZSA9IG9sZFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5uZXdWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIE9iamVjdENvbmZpZyB7XG4gICAgICAgIHBhcmVudDphbnk7XG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XG4gICAgICAgIHByb3BzOmFueT17fTtcbiAgICAgICAgcHJvcENoYW5nZWRDYWxsYmFja0xpc3Q6QXJyYXk8KGFyZ3M6UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKT0+dm9pZD47XG4gICAgICAgIGFycnZhbHVlczpBcnJheTxhbnk+ID0gW107XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IFwiXCI7XG4gICAgICAgICAgICB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0ID0gW107XG4gICAgICAgICAgICB0aGlzLmFycnZhbHVlcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbm90aWZ5UHJvcGVydHlDaGFuZ2VkKGFyZ3M6UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKTp2b2lkIHtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0W2ldO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGNmZyA9IGdldE9iamVjdENvbmZpZyhhcmdzLm9iaik7XG4gICAgICAgICAgICBpZihjZmcucGFyZW50KXtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50Q2ZnID0gZ2V0T2JqZWN0Q29uZmlnKGNmZy5wYXJlbnQpO1xuICAgICAgICAgICAgICAgIHBhcmVudENmZy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhcbiAgICAgICAgICAgICAgICAgICAgY2ZnLnBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgY2ZnLnByb3BlcnR5TmFtZStcIi5cIithcmdzLnByb3BlcnR5TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYXJncy5vbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXJncy5uZXdWYWx1ZVxuICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soY2FsbGJhY2s6KGFyZ3M6UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKT0+dm9pZCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0LnB1c2goY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soY2FsbGJhY2s6KGFyZ3M6UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKT0+dm9pZCk6dm9pZCB7XG4gICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdC5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGlmKGlkeD4tMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3Quc3BsaWNlKGlkeCwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0T2JqZWN0Q29uZmlnKG9iajphbnkpOiBPYmplY3RDb25maWcge1xuICAgICAgICBpZighKGNvbmZpZ1Byb3BlcnR5TmFtZSBpbiBvYmopKSB7XG4gICAgICAgICAgICBsZXQgY2ZnID0gbmV3IE9iamVjdENvbmZpZygpO1xuICAgICAgICAgICAgb2JqW2NvbmZpZ1Byb3BlcnR5TmFtZV0gPSBjZmc7XG4gICAgICAgICAgICAvLyBvYmpbY29uZmlnUHJvcGVydHlOYW1lXSA9IHtcbiAgICAgICAgICAgIC8vICAgICBwYXJlbnQ6bnVsbCxcbiAgICAgICAgICAgIC8vICAgICBwcm9wZXJ0eU5hbWU6bnVsbCxcbiAgICAgICAgICAgIC8vICAgICBwcm9wczp7fSxcbiAgICAgICAgICAgIC8vICAgICBwcm9wQ2hhbmdlZENhbGxiYWNrTGlzdCA6IFtdLFxuICAgICAgICAgICAgLy8gICAgIG5vdGlmeVByb3BlcnR5Q2hhbmdlZCA6IGZ1bmN0aW9uKGFyZ3M6UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3RbaV07XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjYWxsYmFjayhhcmdzKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICBsZXQgY2ZnID0gZ2V0T2JqZWN0Q29uZmlnKGFyZ3Mub2JqKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYoY2ZnLnBhcmVudCl7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBsZXQgcGFyZW50Q2ZnID0gZ2V0T2JqZWN0Q29uZmlnKGNmZy5wYXJlbnQpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgcGFyZW50Q2ZnLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNmZy5wYXJlbnQsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgY2ZnLnByb3BlcnR5TmFtZStcIi5cIithcmdzLnByb3BlcnR5TmFtZSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBhcmdzLm9sZFZhbHVlLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGFyZ3MubmV3VmFsdWVcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICBhZGRQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjayA6IGZ1bmN0aW9uIChjYWxsYmFjazooYXJnczpQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpPT52b2lkKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3QucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICByZW1vdmVQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjazogZnVuY3Rpb24gKGNhbGxiYWNrOihhcmdzOlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyk9PnZvaWQpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGlkeCA9IHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3QuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmKGlkeD4tMSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdC5zcGxpY2UoaWR4LDEpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqW2NvbmZpZ1Byb3BlcnR5TmFtZV07XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGluamVjdFByb3BlcnRpZXMob2JqOmFueSkge1xuICAgICAgICBpZiAob2JqPT1udWxsKSByZXR1cm47XG4gICAgICAgIGlmICh0b1N0cmluZy5jYWxsKG9iaikhPVwiW29iamVjdCBPYmplY3RdXCIpIHJldHVybjtcbiAgICAgICAgbGV0IGNmZyA9IGdldE9iamVjdENvbmZpZyhvYmopO1xuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eU5hbWUgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZihwcm9wZXJ0eU5hbWU9PWNvbmZpZ1Byb3BlcnR5TmFtZSkgY29udGludWU7XG4gICAgICAgICAgICBpZighb2JqLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgbGV0IHByb3BWYWx1ZSA9IG9ialtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgaWYodG9TdHJpbmcuY2FsbChwcm9wVmFsdWUpPT0nW29iamVjdCBGdW5jdGlvbl0nKXtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1lbHNlIGlmKHRvU3RyaW5nLmNhbGwocHJvcFZhbHVlKT09J1tvYmplY3QgT2JqZWN0XScpe1xuICAgICAgICAgICAgICAgIGluamVjdFByb3BlcnRpZXMocHJvcFZhbHVlKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKHRvU3RyaW5nLmNhbGwocHJvcFZhbHVlKT09J1tvYmplY3QgQXJyYXldJyl7XG4gICAgICAgICAgICAgICAgcHJvcFZhbHVlID0gbmV3IE9ic2VydmFibGVBcnJheShwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgIG9ialtwcm9wZXJ0eU5hbWVdID0gcHJvcFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaixwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgaWYoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKXtcbiAgICAgICAgICAgICAgICBsZXQgdCA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZih0b1N0cmluZy5jYWxsKHQpPT0nW29iamVjdCBGdW5jdGlvbl0nKXtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodCBpbnN0YW5jZW9mIE9ic2VydmFibGVBcnJheSl7XG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZS5hZGRFdmVudExpc3RlbmVyKFwiaXRlbWFkZGVkXCIsZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2ZnLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKG9iaiwgcHJvcGVydHlOYW1lK1wiLipcIixudWxsLG51bGwpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZS5hZGRFdmVudExpc3RlbmVyKFwiaXRlbXNldFwiLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNmZy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhvYmosIHByb3BlcnR5TmFtZStcIi4qXCIsbnVsbCxudWxsKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUuYWRkRXZlbnRMaXN0ZW5lcihcIml0ZW1yZW1vdmVkXCIsZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2ZnLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKG9iaiwgcHJvcGVydHlOYW1lK1wiLipcIixudWxsLG51bGwpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGR2YWx1ZSBvZiBwcm9wVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1N0cmluZy5jYWxsKGNoaWxkdmFsdWUpIT1cIltvYmplY3QgT2JqZWN0XVwiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluamVjdFByb3BlcnRpZXMoY2hpbGR2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRDZmcgPSBnZXRPYmplY3RDb25maWcoY2hpbGR2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZENmZy5wYXJlbnQgPSBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZENmZy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWUrXCIuKlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodG9TdHJpbmcuY2FsbChwcm9wVmFsdWUpPT0nW29iamVjdCBPYmplY3RdJyl7XG4gICAgICAgICAgICAgICAgICAgIGluamVjdFByb3BlcnRpZXMocHJvcFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkQ2ZnID0gZ2V0T2JqZWN0Q29uZmlnKHByb3BWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ2ZnLnBhcmVudCA9IG9iajtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDZmcucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2ZnLnByb3BzW3Byb3BlcnR5TmFtZV0gPSBvYmpbcHJvcGVydHlOYW1lXTtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixwcm9wZXJ0eU5hbWUse1xuICAgICAgICAgICAgICAgICAgICAnZ2V0JzpmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0T2JqZWN0Q29uZmlnKHRoaXMpLnByb3BzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdzZXQnOmZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5qZWN0UHJvcGVydGllcyh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRWYWx1ZSA9IGdldE9iamVjdENvbmZpZyh0aGlzKS5wcm9wc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0T2JqZWN0Q29uZmlnKHRoaXMpLnByb3BzW3Byb3BlcnR5TmFtZV09dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRPYmplY3RDb25maWcodGhpcykubm90aWZ5UHJvcGVydHlDaGFuZ2VkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkocHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIE9ic2VydmFibGVBcnJheShpdGVtcyk6YW55IHtcbiAgICAgICAgbGV0IF9zZWxmID0gdGhpcyxcbiAgICAgICAgICAgIF9hcnJheSA9IFtdLFxuICAgICAgICAgICAgX2hhbmRsZXJzID0ge1xuICAgICAgICAgICAgICAgIGl0ZW1hZGRlZDogW10sXG4gICAgICAgICAgICAgICAgaXRlbXJlbW92ZWQ6IFtdLFxuICAgICAgICAgICAgICAgIGl0ZW1zZXQ6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGRlZmluZUluZGV4UHJvcGVydHkoaW5kZXgpIDogYW55e1xuICAgICAgICAgICAgaWYgKCEoaW5kZXggaW4gX3NlbGYpKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9zZWxmLCBpbmRleCwge1xuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2FycmF5W2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYXJyYXlbaW5kZXhdID0gdjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhaXNlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaXRlbXNldFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiB2XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmFpc2VFdmVudChldmVudCkgOiBhbnl7XG4gICAgICAgICAgICBfaGFuZGxlcnNbZXZlbnQudHlwZV0uZm9yRWFjaChmdW5jdGlvbihoKSB7XG4gICAgICAgICAgICAgICAgaC5jYWxsKF9zZWxmLCBldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfc2VsZiwgXCJhZGRFdmVudExpc3RlbmVyXCIsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBldmVudE5hbWUgPSAoXCJcIiArIGV2ZW50TmFtZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoIShldmVudE5hbWUgaW4gX2hhbmRsZXJzKSkgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBldmVudCBuYW1lLlwiKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBoYW5kbGVyLlwiKTtcbiAgICAgICAgICAgICAgICBfaGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX3NlbGYsIFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZXZlbnROYW1lID0gKFwiXCIgKyBldmVudE5hbWUpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCEoZXZlbnROYW1lIGluIF9oYW5kbGVycykpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZXZlbnQgbmFtZS5cIik7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaGFuZGxlci5cIik7XG4gICAgICAgICAgICAgICAgbGV0IGggPSBfaGFuZGxlcnNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgICAgICBsZXQgbG4gPSBoLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoLS1sbiA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoW2xuXSA9PT0gaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaC5zcGxpY2UobG4sIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX3NlbGYsIFwicHVzaFwiLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4O1xuICAgICAgICAgICAgICAgIGxldCBpID0gMCwgbG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbG47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IF9hcnJheS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIF9hcnJheS5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmluZUluZGV4UHJvcGVydHkoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICByYWlzZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaXRlbWFkZGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiBhcmd1bWVudHNbaV1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBfYXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX3NlbGYsIFwicG9wXCIsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoX2FycmF5Lmxlbmd0aCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IF9hcnJheS5sZW5ndGggLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IF9hcnJheS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9zZWxmW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgcmFpc2VFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIml0ZW1yZW1vdmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfc2VsZiwgXCJ1bnNoaWZ0XCIsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgbG47XG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgICAgIGxldCBsbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIF9hcnJheS5zcGxpY2UoaSwgMCwgYXJndW1lbnRzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lSW5kZXhQcm9wZXJ0eShfYXJyYXkubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIHJhaXNlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpdGVtYWRkZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTogYXJndW1lbnRzW2ldXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IF9hcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByYWlzZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaXRlbXNldFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiBfYXJyYXlbaV1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBfYXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX3NlbGYsIFwic2hpZnRcIiwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChfYXJyYXkubGVuZ3RoID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBfYXJyYXkuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9zZWxmW19hcnJheS5sZW5ndGhdO1xuICAgICAgICAgICAgICAgICAgICByYWlzZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaXRlbXJlbW92ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX3NlbGYsIFwic3BsaWNlXCIsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbihpbmRleCwgaG93TWFueSAvKiwgZWxlbWVudDEsIGVsZW1lbnQyLCAuLi4gKi8gKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlbW92ZWQ6QXJyYXk8YW55PiA9IFtdLFxuICAgICAgICAgICAgICAgICAgICBpdGVtOmFueSxcbiAgICAgICAgICAgICAgICAgICAgcG9zOmFueTtcblxuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXggPT0gbnVsbCA/IDAgOiBpbmRleCA8IDAgPyBfYXJyYXkubGVuZ3RoICsgaW5kZXggOiBpbmRleDtcblxuICAgICAgICAgICAgICAgIGhvd01hbnkgPSBob3dNYW55ID09IG51bGwgPyBfYXJyYXkubGVuZ3RoIC0gaW5kZXggOiBob3dNYW55ID4gMCA/IGhvd01hbnkgOiAwO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKGhvd01hbnktLSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtID0gX2FycmF5LnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZWQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9zZWxmW19hcnJheS5sZW5ndGhdO1xuICAgICAgICAgICAgICAgICAgICByYWlzZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaXRlbXJlbW92ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCArIHJlbW92ZWQubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGkgPSAyLCBsbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIF9hcnJheS5zcGxpY2UoaW5kZXgsIDAsIGFyZ3VtZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmluZUluZGV4UHJvcGVydHkoX2FycmF5Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICByYWlzZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaXRlbWFkZGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiBhcmd1bWVudHNbaV1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfc2VsZiwgXCJsZW5ndGhcIiwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2FycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IG4gPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSBfYXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChuICUgMSA9PT0gMCAmJiBuID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gPCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLnNwbGljZShuKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuID4gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5wdXNoLmFwcGx5KF9zZWxmLCBuZXcgQXJyYXkobiAtIGxlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJJbnZhbGlkIGFycmF5IGxlbmd0aFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX2FycmF5Lmxlbmd0aCA9IG47XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhBcnJheS5wcm90b3R5cGUpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICAgICAgaWYgKCEobmFtZSBpbiBfc2VsZikpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX3NlbGYsIG5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IEFycmF5LnByb3RvdHlwZVtuYW1lXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXRlbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgX3NlbGYucHVzaC5hcHBseShfc2VsZiwgaXRlbXMpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgIG9iajphbnk7XG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9iaiA9IG9iajtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3QgZ2V0VmFsdWUoKTphbnkgO1xuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgIG9iajphbnk7XG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9iaiA9IG9iajtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3Qgc2V0VmFsdWUodmFsdWU6YW55KTp2b2lkO1xuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciBpbXBsZW1lbnRzIERpc3Bvc2FibGV7XG4gICAgICAgIG9iajphbnk7XG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XG4gICAgICAgIHByb3RlY3RlZCBjYWxsYmFjazogRnVuY3Rpb247XG5cblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjayhsaXN0ZW5lcjpGdW5jdGlvbik6dm9pZHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBsaXN0ZW5lcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZVByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3Qgc3RhcnRMaXN0ZW4oKTp2b2lkO1xuICAgICAgICBhYnN0cmFjdCBzdG9wTGlzdGVuKCk6dm9pZDtcblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciB7XG4gICAgICAgIGFic3RyYWN0IGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOlByb3BlcnR5Q2hhbmdlZExpc3RlbmVyO1xuXG4gICAgICAgIGFic3RyYWN0IGNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6Ym9vbGVhbjtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgVW5pdmVyc2FsUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXJ7XG5cbiAgICAgICAgcHJpdmF0ZSBwcm92aWRlcnM6TGlzdDxQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyPjtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVycyA9IG5ldyBMaXN0PFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm92aWRlcihwcm92aWRlcjpQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm92aWRlcnMocHJvdmlkZXJzOkFycmF5PFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI+KTp2b2lke1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgcHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMuYWRkKHByb3ZpZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZihwcm92aWRlci5jYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iaiwgcHJvcGVydHlOYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlci5nZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5R2V0dGVyUHJvdmlkZXIge1xuICAgICAgICBhYnN0cmFjdCBjYW5Qcm92aWRlR2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOmJvb2xlYW47XG4gICAgICAgIGFic3RyYWN0IGdldFByb3BlcnR5R2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOiBQcm9wZXJ0eUdldHRlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlTZXR0ZXJQcm92aWRlciB7XG4gICAgICAgIGFic3RyYWN0IGNhblByb3ZpZGVTZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6Ym9vbGVhbjtcbiAgICAgICAgYWJzdHJhY3QgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6IFByb3BlcnR5U2V0dGVyO1xuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eVByb3ZpZGVyIHtcblxuICAgICAgICBhYnN0cmFjdCBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW5cblxuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUdldHRlciA7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FuUHJvdmlkZVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIDtcblxuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciA7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FuUHJvdmlkZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4gO1xuXG4gICAgICAgIGFic3RyYWN0IGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIDtcblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBVbml2ZXJzYWxQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBwcml2YXRlIHByb3ZpZGVyczpMaXN0PFByb3BlcnR5R2V0dGVyUHJvdmlkZXI+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzID0gbmV3IExpc3Q8UHJvcGVydHlHZXR0ZXJQcm92aWRlcj4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3ZpZGVyKHByb3ZpZGVyOlByb3BlcnR5R2V0dGVyUHJvdmlkZXIpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMuYWRkKHByb3ZpZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3ZpZGVycyhwcm92aWRlcnM6QXJyYXk8UHJvcGVydHlHZXR0ZXJQcm92aWRlcj4pOnZvaWR7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiBwcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGVHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogTGF5b3V0THpnLlByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYocHJvdmlkZXIuY2FuUHJvdmlkZUdldHRlcihvYmosIHByb3BlcnR5TmFtZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXIuZ2V0UHJvcGVydHlHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgVW5pdmVyc2FsUHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXJ7XG4gICAgICAgIHByaXZhdGUgcHJvdmlkZXJzOkxpc3Q8UHJvcGVydHlTZXR0ZXJQcm92aWRlcj47XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMgPSBuZXcgTGlzdDxQcm9wZXJ0eVNldHRlclByb3ZpZGVyPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXIocHJvdmlkZXI6UHJvcGVydHlTZXR0ZXJQcm92aWRlcik6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXJzKHByb3ZpZGVyczpBcnJheTxQcm9wZXJ0eVNldHRlclByb3ZpZGVyPik6dm9pZHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYocHJvdmlkZXIuY2FuUHJvdmlkZVNldHRlcihvYmosIHByb3BlcnR5TmFtZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGVTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyLmdldFByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFVuaXZlcnNhbFByb3BlcnR5UHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVByb3ZpZGVye1xuICAgICAgICBwcml2YXRlIHByb3BlcnR5R2V0dGVyUHJvdmlkZXI6UHJvcGVydHlHZXR0ZXJQcm92aWRlcjtcbiAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0eVNldHRlclByb3ZpZGVyOlByb3BlcnR5U2V0dGVyUHJvdmlkZXI7XG4gICAgICAgIHByaXZhdGUgcHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcjpQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BlcnR5R2V0dGVyUHJvdmlkZXI6IFByb3BlcnR5R2V0dGVyUHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5U2V0dGVyUHJvdmlkZXI6IFByb3BlcnR5U2V0dGVyUHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5R2V0dGVyUHJvdmlkZXIgPSBwcm9wZXJ0eUdldHRlclByb3ZpZGVyO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eVNldHRlclByb3ZpZGVyID0gcHJvcGVydHlTZXR0ZXJQcm92aWRlcjtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciA9IHByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eUdldHRlclByb3ZpZGVyLmNhblByb3ZpZGVHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZykgOiBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eUdldHRlclByb3ZpZGVyLmdldFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZykgOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BlcnR5U2V0dGVyUHJvdmlkZXIuY2FuUHJvdmlkZVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKSA6IFByb3BlcnR5U2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BlcnR5U2V0dGVyUHJvdmlkZXIuZ2V0UHJvcGVydHlTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyLmNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZykgOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyLmdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwiXG5cbm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIERvbVdpZHRoUHJvcGVydHlHZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFZhbHVlKCk6IGFueSB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgcmV0dXJuIGRvbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVdpZHRoUHJvcGVydHlTZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBkb20gPSA8SFRNTEVsZW1lbnQ+dGhpcy5vYmo7XG4gICAgICAgICAgICBkb20uc3R5bGUud2lkdGggPSB2YWx1ZStcInB4XCI7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21XaWR0aFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwid2lkdGhcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21XaWR0aFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVdpZHRoUHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBwcm9wZXJ0eU5hbWUgPT0gXCJ3aWR0aFwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVdpZHRoUHJvcGVydHlTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBEb21IZWlnaHRQcm9wZXJ0eUdldHRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRWYWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIHJldHVybiBkb20ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbUhlaWdodFByb3BlcnR5U2V0dGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgZG9tLnN0eWxlLmhlaWdodCA9IHZhbHVlK1wicHhcIjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbUhlaWdodFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwiaGVpZ2h0XCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tSGVpZ2h0UHJvcGVydHlHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tSGVpZ2h0UHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBwcm9wZXJ0eU5hbWUgPT0gXCJoZWlnaHRcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21IZWlnaHRQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVNpemVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVye1xuICAgICAgICBwcml2YXRlIGRvbTogSFRNTEVsZW1lbnQ7XG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2tmdW46YW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy5kb20gPSA8SFRNTEVsZW1lbnQ+b2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrZnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsbGJhY2suYXBwbHkoc2VsZi5kb20sW3NlbGYuZG9tXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJCh0aGlzLmRvbSkucmVzaXplKHRoaXMuY2FsbGJhY2tmdW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcExpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgICAgICQodGhpcy5kb20pLm9mZihcInJlc2l6ZVwiLHRoaXMuY2FsbGJhY2tmdW4pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tU2l6ZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xuXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tU2l6ZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iaixwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmKHByb3BlcnR5TmFtZT09XCJ3aWR0aFwifHxwcm9wZXJ0eU5hbWU9PVwiaGVpZ2h0XCIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIERvbVRleHRQcm9wZXJ0eUdldHRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICAgICAgICAgIGxldCBkb20gPSA8SFRNTEVsZW1lbnQ+dGhpcy5vYmo7XG4gICAgICAgICAgICBpZihkb20udGFnTmFtZT09XCJJTlBVVFwifHxkb20udGFnTmFtZT09XCJpbnB1dFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoZG9tKS52YWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkKGRvbSkudGV4dCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVGV4dFByb3BlcnR5U2V0dGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgaWYoZG9tLnRhZ05hbWU9PVwiSU5QVVRcInx8ZG9tLnRhZ05hbWU9PVwiaW5wdXRcIikge1xuICAgICAgICAgICAgICAgICQoZG9tKS52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoZG9tKS50ZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVRleHRQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcInRleHRcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21UZXh0UHJvcGVydHlHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVGV4dFByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwidGV4dFwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVRleHRQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21UZXh0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcntcbiAgICAgICAgcHJpdmF0ZSBkb206IEhUTUxFbGVtZW50O1xuICAgICAgICBwcml2YXRlIGNhbGxiYWNrZnVuOmFueTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuZG9tID0gPEhUTUxFbGVtZW50Pm9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0TGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja2Z1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrLmFwcGx5KHNlbGYuZG9tLFtzZWxmLmRvbV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICQodGhpcy5kb20pLmNoYW5nZSh0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICAkKHRoaXMuZG9tKS5vZmYoXCJyZXNpemVcIix0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVRleHRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcntcblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVRleHRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmoscHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZihwcm9wZXJ0eU5hbWU9PVwidGV4dFwiKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBEb21WYWx1ZVByb3BlcnR5R2V0dGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRWYWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIGlmKGRvbS50YWdOYW1lPT1cIklOUFVUXCJ8fGRvbS50YWdOYW1lPT1cImlucHV0XCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb207XG4gICAgICAgICAgICAgICAgaWYoaW5wdXQudHlwZT09XCJkYXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlQXNEYXRlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGlucHV0LnR5cGU9PVwiY2hlY2tib3hcIil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC5jaGVja2VkO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChkb20pLnZhbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkKGRvbSkudGV4dCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVmFsdWVQcm9wZXJ0eVNldHRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIGlmKGRvbS50YWdOYW1lPT1cIklOUFVUXCJ8fGRvbS50YWdOYW1lPT1cImlucHV0XCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb207XG4gICAgICAgICAgICAgICAgaWYoaW5wdXQudHlwZT09XCJkYXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihpbnB1dC50eXBlPT1cImNoZWNrYm94XCIpe1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICQoZG9tKS52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChkb20pLnRleHQodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVmFsdWVQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcInZhbHVlXCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tVmFsdWVQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21WYWx1ZVByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwidmFsdWVcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21WYWx1ZVByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVZhbHVlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcntcbiAgICAgICAgcHJpdmF0ZSBkb206IEhUTUxFbGVtZW50O1xuICAgICAgICBwcml2YXRlIGNhbGxiYWNrZnVuOmFueTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuZG9tID0gPEhUTUxFbGVtZW50Pm9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0TGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja2Z1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrLmFwcGx5KHNlbGYuZG9tLFtzZWxmLmRvbV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICQodGhpcy5kb20pLmNoYW5nZSh0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICAkKHRoaXMuZG9tKS5vZmYoXCJyZXNpemVcIix0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVZhbHVlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXJ7XG5cbiAgICAgICAgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21WYWx1ZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iaixwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmKHByb3BlcnR5TmFtZT09XCJ2YWx1ZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGltcG9ydCBnZXRPYmplY3RDb25maWcgPSBMYXlvdXRMemcuT2JzZXJ2ZXJNb2RlbC5nZXRPYmplY3RDb25maWc7XG4gICAgaW1wb3J0IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyA9IExheW91dEx6Zy5PYnNlcnZlck1vZGVsLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncztcblxuICAgIGV4cG9ydCBjbGFzcyBEaWN0UHJvcGVydHlHZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFZhbHVlKCk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmpbdGhpcy5wcm9wZXJ0eU5hbWVdO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5U2V0dGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLm9ialt0aGlzLnByb3BlcnR5TmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERpY3RQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVye1xuXG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2tmdW5jOmFueTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0TGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja2Z1bmMgPSBmdW5jdGlvbiAoYXJnczogUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKSB7XG4gICAgICAgICAgICAgICAgaWYoYXJncy5wcm9wZXJ0eU5hbWU9PXNlbGYucHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsbGJhY2suYXBwbHkodGhpcyxbc2VsZi5vYmpdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgT2JzZXJ2ZXJNb2RlbC5pbmplY3RQcm9wZXJ0aWVzKHRoaXMub2JqKTtcbiAgICAgICAgICAgIE9ic2VydmVyTW9kZWwuZ2V0T2JqZWN0Q29uZmlnKHRoaXMub2JqKS5hZGRQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjayh0aGlzLmNhbGxiYWNrZnVuYyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdG9wTGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgT2JzZXJ2ZXJNb2RlbC5nZXRPYmplY3RDb25maWcodGhpcy5vYmopLnJlbW92ZVByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKHRoaXMuY2FsbGJhY2tmdW5jKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERpY3RQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlciB7XG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IExheW91dEx6Zy5Qcm9wZXJ0eUdldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERpY3RQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVyIHtcbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEaWN0UHJvcGVydHlTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERpY3RQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcntcbiAgICAgICAgY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEaWN0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ29udHJvbFByb3BlcnR5R2V0dGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJ7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRWYWx1ZSgpOiBhbnkge1xyXG4gICAgICAgICAgICBsZXQgY29udHJvbDphbnkgPSA8RnJhbWV3b3JrRWxlbWVudD50aGlzLm9iajtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9wZXJ0eU5hbWUgaW4gY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRyb2xbdGhpcy5wcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENvbnRyb2xQcm9wZXJ0eVNldHRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVye1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgY29udHJvbDphbnkgPSA8RnJhbWV3b3JrRWxlbWVudD50aGlzLm9iajtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9wZXJ0eU5hbWUgaW4gY29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbFt0aGlzLnByb3BlcnR5TmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBjb250cm9sMTpGcmFtZXdvcmtFbGVtZW50ID0gPEZyYW1ld29ya0VsZW1lbnQ+dGhpcy5vYmo7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sMS5hc3NlbWJsZURvbSgpO1xyXG4gICAgICAgICAgICAgICAgY29udHJvbDEuZG9MYXlvdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENvbnRyb2xQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlcntcclxuXHJcbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEZyYW1ld29ya0VsZW1lbnQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlHZXR0ZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbnRyb2xQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ29udHJvbFByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVye1xyXG5cclxuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRnJhbWV3b3JrRWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFByb3BlcnR5U2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5U2V0dGVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250cm9sUHJvcGVydHlTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENvbnRyb2xQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVye1xyXG4gICAgICAgIHByaXZhdGUgY29udHJvbDogRnJhbWV3b3JrRWxlbWVudDtcclxuICAgICAgICBwcml2YXRlIGNhbGxiYWNrZnVuOmFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sID0gPEZyYW1ld29ya0VsZW1lbnQ+b2JqO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnRMaXN0ZW4oKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja2Z1biA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmKHNlbGYuY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxsYmFjay5hcHBseShzZWxmLmNvbnRyb2wsW3NlbGYuY29udHJvbF0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wuYWRkUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIodGhpcy5wcm9wZXJ0eU5hbWUsdGhpcy5jYWxsYmFja2Z1bik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdG9wTGlzdGVuKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wucmVtb3ZlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIodGhpcy5jYWxsYmFja2Z1bik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ29udHJvbFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xyXG5cclxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29udHJvbFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iaixwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEZyYW1ld29ya0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb250cm9sID0gPEZyYW1ld29ya0VsZW1lbnQ+b2JqO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRyb2wuZ2V0Tm90aWZ5UHJvcGVydGllcygpLmluZGV4T2YocHJvcGVydHlOYW1lKT4tMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgVmFsdWVDb252ZXJ0ZXIge1xuXG4gICAgICAgIGFic3RyYWN0IGNvbnZlcnQodmFsdWU6YW55KTphbnk7XG5cbiAgICAgICAgYWJzdHJhY3QgY29udmVydEJhY2sodmFsdWU6YW55KTphbnk7XG5cbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBCaW5kaW5nTW9kZSB7XG4gICAgICAgIE9uZXdheSxcbiAgICAgICAgVHdvd2F5XG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJpbmRpbmcgaW1wbGVtZW50cyBEaXNwb3NhYmxle1xuICAgICAgICB0YXJnZXQ6YW55O1xuICAgICAgICB0YXJnZXRQcm9wZXJ0eU5hbWU6c3RyaW5nO1xuICAgICAgICBjb252ZXJ0ZXI6VmFsdWVDb252ZXJ0ZXI7XG4gICAgICAgIG1vZGU6QmluZGluZ01vZGU7XG4gICAgICAgIHByb3RlY3RlZCBwcm9wZXJ0eVByb3ZpZGVyOiBQcm9wZXJ0eVByb3ZpZGVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BlcnR5UHJvdmlkZXI6UHJvcGVydHlQcm92aWRlcikge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eVByb3ZpZGVyID0gcHJvcGVydHlQcm92aWRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IHVwZGF0ZUZyb21Tb3VyY2UoKTp2b2lkO1xuICAgICAgICBhYnN0cmFjdCB1cGRhdGVGcm9tVGFyZ2V0KCk6dm9pZDtcblxuICAgICAgICBzZXRDb252ZXJ0ZXIoY29udmVydGVyOiBWYWx1ZUNvbnZlcnRlcik6IEJpbmRpbmcge1xuICAgICAgICAgICAgdGhpcy5jb252ZXJ0ZXIgPSBjb252ZXJ0ZXI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldE1vZGUobW9kZTogQmluZGluZ01vZGUpOiBCaW5kaW5nIHtcbiAgICAgICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0QmluZGluZygpOkJpbmRpbmd7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BCaW5kaW5nKCk6QmluZGluZ3tcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEJpbmRpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBGdW5jdGlvbkJpbmRpbmcgZXh0ZW5kcyBCaW5kaW5ne1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BlcnR5UHJvdmlkZXI6IFByb3BlcnR5UHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKHByb3BlcnR5UHJvdmlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRCaW5kaW5nKCk6IEJpbmRpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBzdG9wQmluZGluZygpOiBCaW5kaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlRnJvbVNvdXJjZSgpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUZyb21UYXJnZXQoKTogdm9pZCB7XG4gICAgICAgIH1cblxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5QmluZGluZyBleHRlbmRzIEJpbmRpbmcge1xuXG4gICAgICAgIHNvdXJjZTogYW55O1xuICAgICAgICBzb3VyY2VQcm9wZXJ0eU5hbWU6IHN0cmluZztcblxuICAgICAgICBwcml2YXRlIHNvdXJjZVByb3BHZXR0ZXI6IFByb3BlcnR5R2V0dGVyO1xuICAgICAgICBwcml2YXRlIHNvdXJjZVByb3BTZXR0ZXI6IFByb3BlcnR5U2V0dGVyO1xuICAgICAgICBwcml2YXRlIHRhcmdldFByb3BHZXR0ZXI6IFByb3BlcnR5R2V0dGVyO1xuICAgICAgICBwcml2YXRlIHRhcmdldFByb3BTZXR0ZXI6IFByb3BlcnR5U2V0dGVyO1xuXG4gICAgICAgIHByaXZhdGUgc291cmNlUHJvcExpc3RlbmVyOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcjtcbiAgICAgICAgcHJpdmF0ZSB0YXJnZXRQcm9wTGlzdGVuZXI6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BlcnR5UHJvdmlkZXI6IFByb3BlcnR5UHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKHByb3BlcnR5UHJvdmlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRCaW5kaW5nKCk6IEJpbmRpbmcge1xuICAgICAgICAgICAgdGhpcy5zdG9wQmluZGluZygpO1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLnNvdXJjZVByb3BHZXR0ZXIgPSB0aGlzLnByb3BlcnR5UHJvdmlkZXIuZ2V0UHJvcGVydHlHZXR0ZXIodGhpcy5zb3VyY2UsIHRoaXMuc291cmNlUHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuc291cmNlUHJvcFNldHRlciA9IHRoaXMucHJvcGVydHlQcm92aWRlci5nZXRQcm9wZXJ0eVNldHRlcih0aGlzLnNvdXJjZSwgdGhpcy5zb3VyY2VQcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy50YXJnZXRQcm9wR2V0dGVyID0gdGhpcy5wcm9wZXJ0eVByb3ZpZGVyLmdldFByb3BlcnR5R2V0dGVyKHRoaXMudGFyZ2V0LCB0aGlzLnRhcmdldFByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldFByb3BTZXR0ZXIgPSB0aGlzLnByb3BlcnR5UHJvdmlkZXIuZ2V0UHJvcGVydHlTZXR0ZXIodGhpcy50YXJnZXQsIHRoaXMudGFyZ2V0UHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuc291cmNlUHJvcExpc3RlbmVyID0gdGhpcy5wcm9wZXJ0eVByb3ZpZGVyLmdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKHRoaXMuc291cmNlLCB0aGlzLnNvdXJjZVByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldFByb3BMaXN0ZW5lciA9IHRoaXMucHJvcGVydHlQcm92aWRlci5nZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcih0aGlzLnRhcmdldCwgdGhpcy50YXJnZXRQcm9wZXJ0eU5hbWUpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZyb21Tb3VyY2UoKTtcblxuICAgICAgICAgICAgdGhpcy5zb3VyY2VQcm9wTGlzdGVuZXIuc3RhcnRMaXN0ZW4oKTtcbiAgICAgICAgICAgIHRoaXMuc291cmNlUHJvcExpc3RlbmVyLnNldFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZUZyb21Tb3VyY2UuYXBwbHkoc2VsZixbXSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PSBCaW5kaW5nTW9kZS5Ud293YXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldFByb3BMaXN0ZW5lci5zdGFydExpc3RlbigpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvcExpc3RlbmVyLnNldFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVGcm9tVGFyZ2V0LmFwcGx5KHNlbGYsW10pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcEJpbmRpbmcoKTogQmluZGluZyB7XG4gICAgICAgICAgICBpZih0aGlzLnNvdXJjZVByb3BMaXN0ZW5lcikgdGhpcy5zb3VyY2VQcm9wTGlzdGVuZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zdG9wQmluZGluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlRnJvbVNvdXJjZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB2ID0gIHRoaXMuc291cmNlUHJvcEdldHRlci5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgbGV0IG9sZF92ID0gdGhpcy50YXJnZXRQcm9wR2V0dGVyLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAodj09b2xkX3YpIHJldHVybjtcbiAgICAgICAgICAgIGlmKHRoaXMuY29udmVydGVyKXtcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5jb252ZXJ0ZXIuY29udmVydCh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvcFNldHRlci5zZXRWYWx1ZSh2KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlRnJvbVRhcmdldCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB2ID0gIHRoaXMudGFyZ2V0UHJvcEdldHRlci5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgbGV0IG9sZF92ID0gdGhpcy5zb3VyY2VQcm9wR2V0dGVyLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAodj09b2xkX3YpIHJldHVybjtcbiAgICAgICAgICAgIGlmKHRoaXMuY29udmVydGVyKXtcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5jb252ZXJ0ZXIuY29udmVydEJhY2sodik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNvdXJjZVByb3BTZXR0ZXIuc2V0VmFsdWUodik7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIERhdGVGb3JtYXRDb252ZXJ0ZXIgZXh0ZW5kcyBWYWx1ZUNvbnZlcnRlcntcbiAgICAgICAgZm9ybWF0OnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRGb3JtYXQoZm9ybWF0OnN0cmluZyk6IERhdGVGb3JtYXRDb252ZXJ0ZXIge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnQodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgZHQgPSA8RGF0ZT52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0RGF0ZShkdCx0aGlzLmZvcm1hdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0QmFjayh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBGaXJzdENoYXJVcHBlcmNhc2VDb252ZXJ0ZXIgZXh0ZW5kcyBWYWx1ZUNvbnZlcnRlcntcbiAgICAgICAgY29udmVydCh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIGlmKHZhbHVlPT1udWxsKSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIGxldCB2ID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHJldHVybiAodlswXStcIlwiKS50b1VwcGVyQ2FzZSgpK3Yuc3Vic3RyKDEsdi5sZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydEJhY2sodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIExvd2VyY2FzZUNvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuICAgICAgICBjb252ZXJ0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgaWYodmFsdWU9PW51bGwpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnRCYWNrKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBVcHBlcmNhc2VDb252ZXJ0ZXIgZXh0ZW5kcyBWYWx1ZUNvbnZlcnRlcntcbiAgICAgICAgY29udmVydCh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIGlmKHZhbHVlPT1udWxsKSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0QmFjayh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgVG9TdHJpbmdDb252ZXJ0ZXIgZXh0ZW5kcyBWYWx1ZUNvbnZlcnRlcntcbiAgICAgICAgY29udmVydCh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIGlmKHZhbHVlPT1udWxsKSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydEJhY2sodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIFBpcGVsaW5lQ29udmVydGVyIGV4dGVuZHMgVmFsdWVDb252ZXJ0ZXJ7XG4gICAgICAgIGNvbnZlcnRlcnM6QXJyYXk8VmFsdWVDb252ZXJ0ZXI+PVtdO1xuXG4gICAgICAgIGFkZENvbnZlcnRlcihjb252ZXJ0ZXI6IFZhbHVlQ29udmVydGVyKTpQaXBlbGluZUNvbnZlcnRlciB7XG4gICAgICAgICAgICBpZiAoY29udmVydGVyPT1udWxsKSByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIHRoaXMuY29udmVydGVycy5wdXNoKGNvbnZlcnRlcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENvbnZlcnRlcnMoY29udmVydGVyczogQXJyYXk8VmFsdWVDb252ZXJ0ZXI+KTpQaXBlbGluZUNvbnZlcnRlciB7XG4gICAgICAgICAgICBpZiAoY29udmVydGVycz09bnVsbCkgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICBmb3IgKGxldCBjb252ZXJ0ZXIgb2YgY29udmVydGVycykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udmVydGVycy5wdXNoKGNvbnZlcnRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnQodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICBsZXQgY3VydmFsdWU6YW55ID0gdmFsdWU7XG4gICAgICAgICAgICBmb3IgKGxldCBjb252ZXJ0ZXIgb2YgdGhpcy5jb252ZXJ0ZXJzKSB7XG4gICAgICAgICAgICAgICAgY3VydmFsdWUgPSBjb252ZXJ0ZXIuY29udmVydChjdXJ2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VydmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0QmFjayh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIGxldCBjdXJ2YWx1ZTphbnkgPSB2YWx1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnZlcnRlciBvZiB0aGlzLmNvbnZlcnRlcnMucmV2ZXJzZSgpKSB7XG4gICAgICAgICAgICAgICAgY3VydmFsdWUgPSBjb252ZXJ0ZXIuY29udmVydCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VydmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25Db252ZXJ0ZXIgZXh0ZW5kcyBWYWx1ZUNvbnZlcnRlcntcblxuICAgICAgICBleHByZXNzaW9uU3RyOnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3RvcihleHByZXNzaW9uU3RyOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25TdHIgPSBleHByZXNzaW9uU3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydCh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIGlmKHRoaXMuZXhwcmVzc2lvblN0cj09bnVsbHx8dGhpcy5leHByZXNzaW9uU3RyPT1cIlwiKSByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICBsZXQgZnVuYz0gbmV3IEZ1bmN0aW9uKFwidmFsdWVcIixcInJldHVybiBcIiArIHRoaXMuZXhwcmVzc2lvblN0cik7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICAgICAgICAgICAgfWNhdGNoIChlKSB7fVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydEJhY2sodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBWaXN1YWxUcmVlIHtcbiAgICAgICAgcm9vdENvbnRhaW5lcjogQ29udGFpbmVyQ29udHJvbDtcbiAgICAgICAgcGFyZW50Q29udHJvbDpUZW1wbGF0ZUNvbnRyb2w7XG4gICAgICAgIHN0YXRlTWFuYWdlcjphbnk7XG5cbiAgICAgICAgc3RhdGljIGZpbmRDb250cm9sc0J5TmFtZShyb290OkNvbnRyb2wsIG5hbWU6c3RyaW5nKTpMaXN0PENvbnRyb2w+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTGlzdDxDb250cm9sPigpO1xuICAgICAgICAgICAgbGV0IHJvb3RDb250YWluZXI6YW55ID0gbnVsbDtcbiAgICAgICAgICAgIGlmKHJvb3QubmFtZT09bmFtZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQocm9vdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihyb290IGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIHJvb3RDb250YWluZXIgPSA8Q29udGFpbmVyQ29udHJvbD5yb290O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHJvb3RDb250YWluZXIuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgciA9ICBWaXN1YWxUcmVlLmZpbmRDb250cm9sc0J5TmFtZShjaGlsZCwgbmFtZSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkZEFsbChyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBmaW5kQ29udHJvbEJ5TmFtZShyb290OkNvbnRyb2wsIG5hbWU6c3RyaW5nKTogQ29udHJvbCB7XG4gICAgICAgICAgICBsZXQgcm9vdENvbnRhaW5lcjphbnkgPSBudWxsO1xuICAgICAgICAgICAgaWYocm9vdC5uYW1lPT1uYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihyb290IGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIHJvb3RDb250YWluZXIgPSA8Q29udGFpbmVyQ29udHJvbD5yb290O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiByb290Q29udGFpbmVyLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgbGV0IHIgPSAgVmlzdWFsVHJlZS5maW5kQ29udHJvbEJ5TmFtZShjaGlsZCwgbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYocikgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb3RDb250YWluZXIpe1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdENvbnRhaW5lci5nZXRSb290RWxlbWVudCgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb3RDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RDb250YWluZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb3RDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RDb250YWluZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cblxuICAgIH1cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgVGVtcGxhdGVDb250cm9sIGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuICAgICAgICBwcml2YXRlIHJvb3RCb3JkZXIgOiBCb3JkZXIgPSBuZXcgQm9yZGVyKFwicm9vdEJvcmRlclwiKTtcbiAgICAgICAgcHJpdmF0ZSBfdmlzdWFsVHJlZSA6IFZpc3VhbFRyZWU7XG4gICAgICAgIHByaXZhdGUgc3RhdGVHcm91cHMgOiBMaXN0PFN0YXRlR3JvdXA+O1xuICAgICAgICBwcm90ZWN0ZWQgc3RhdGVFdmVudFRyaWdnZXJzOiBMaXN0PENvbnRyb2xUcmlnZ2VyPjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUdyb3VwcyA9IG5ldyBMaXN0PFN0YXRlR3JvdXA+KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlRXZlbnRUcmlnZ2VycyA9IG5ldyBMaXN0PENvbnRyb2xUcmlnZ2VyPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHZpc3VhbFRyZWUoKTogVmlzdWFsVHJlZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlzdWFsVHJlZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB2aXN1YWxUcmVlKHZhbHVlOiBWaXN1YWxUcmVlKSB7XG4gICAgICAgICAgICBpZih2YWx1ZSE9bnVsbCkge1xuICAgICAgICAgICAgICAgIHZhbHVlLnBhcmVudENvbnRyb2wgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkU3RhdGVHcm91cChncm91cE5hbWU6c3RyaW5nKTogU3RhdGVHcm91cCB7XG4gICAgICAgICAgICBsZXQgc3RhZ2VHcm91cCA9IG5ldyBTdGF0ZUdyb3VwKCk7XG4gICAgICAgICAgICBzdGFnZUdyb3VwLnJvb3RDb250cm9sID0gdGhpcy52aXN1YWxUcmVlLnJvb3RDb250YWluZXI7XG4gICAgICAgICAgICBzdGFnZUdyb3VwLmdyb3VwTmFtZSA9IGdyb3VwTmFtZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVHcm91cHMuYWRkKHN0YWdlR3JvdXApO1xuICAgICAgICAgICAgcmV0dXJuIHN0YWdlR3JvdXA7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRTdGF0ZVN0eWxlKGdyb3VwTmFtZTpzdHJpbmcsIHN0YXRlbmFtZTpzdHJpbmcsIGNvbnRyb2xwcm9wZXJ0eVZhbHVlczphbnksIGV2ZW50TmFtZTpzdHJpbmc9bnVsbCkge1xuICAgICAgICAgICAgbGV0IGdyb3VwcyA9IHRoaXMuc3RhdGVHcm91cHMuZmlsdGVyKHQ9PnQuZ3JvdXBOYW1lPT1ncm91cE5hbWUpO1xuICAgICAgICAgICAgbGV0IGdyb3VwOlN0YXRlR3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgaWYoZ3JvdXBzLmxlbmd0aD09MCkge1xuICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5hZGRTdGF0ZUdyb3VwKGdyb3VwTmFtZSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBncm91cCA9IGdyb3Vwc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHN0YXRlcyA9IGdyb3VwLnN0YXRlcy5maWx0ZXIodD0+dC5uYW1lPT1zdGF0ZW5hbWUpO1xuICAgICAgICAgICAgbGV0IHN0YXRlOlN0YXRlID0gbnVsbDtcbiAgICAgICAgICAgIGlmKHN0YXRlcy5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgIHN0YXRlID0gbmV3IFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgc3RhdGUubmFtZSA9IHN0YXRlbmFtZTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5zdHlsZSA9IG5ldyBTdHlsZSgpO1xuICAgICAgICAgICAgICAgIGdyb3VwLmFkZFN0YXRlKHN0YXRlKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZXNbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGNvbnRyb2xOYW1lIGluIGNvbnRyb2xwcm9wZXJ0eVZhbHVlcykge1xuICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eVZhbHVlcyA9IGNvbnRyb2xwcm9wZXJ0eVZhbHVlc1tjb250cm9sTmFtZV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcGVydHlOYW1lIGluIHByb3BlcnR5VmFsdWVzKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvcGVydHlWYWx1ZXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuc3R5bGUuYWRkU3R5bGVJdGVtKGNvbnRyb2xOYW1lLHByb3BlcnR5TmFtZSx2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZXZlbnROYW1lKSB0aGlzLmFkZFN0YXRlVHJpZ2dlcihncm91cE5hbWUsc3RhdGVuYW1lLGV2ZW50TmFtZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFN0YXRlVHJpZ2dlcihncm91cE5hbWU6c3RyaW5nLCBzdGF0ZU5hbWU6c3RyaW5nLCBldmVudE5hbWU6c3RyaW5nKTp2b2lkIHtcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyID0gbmV3IEV2ZW50VHJpZ2dlcigpO1xuICAgICAgICAgICAgdHJpZ2dlci5jb250cm9sID0gdGhpcztcbiAgICAgICAgICAgIHRyaWdnZXIuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICAgICAgbGV0IGdvdG9zdGF0ZWFjdGlvbiA9IG5ldyBHb3RvU3RhdGVBY3Rpb24oKTtcbiAgICAgICAgICAgIGdvdG9zdGF0ZWFjdGlvbi50ZW1wbGF0ZUNvbnRyb2wgPSB0aGlzO1xuICAgICAgICAgICAgZ290b3N0YXRlYWN0aW9uLnN0YXRlTmFtZSA9IHN0YXRlTmFtZTtcbiAgICAgICAgICAgIGdvdG9zdGF0ZWFjdGlvbi5ncm91cE5hbWUgPSBncm91cE5hbWU7XG4gICAgICAgICAgICB0cmlnZ2VyLmFjdGlvbiA9IGdvdG9zdGF0ZWFjdGlvbjtcbiAgICAgICAgICAgIHRyaWdnZXIuaW5pdCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUV2ZW50VHJpZ2dlcnMuYWRkKHRyaWdnZXIpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBhY3RpdmVTdGF0ZShncm91cE5hbWU6c3RyaW5nLCBzdGF0ZU5hbWU6c3RyaW5nKTp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IHN0YXRlR3JvdXAgb2YgdGhpcy5zdGF0ZUdyb3Vwcykge1xuICAgICAgICAgICAgICAgIC8vIHN0YXRlR3JvdXAuaXNBY3RpdmUgPSBzdGF0ZUdyb3VwLmdyb3VwTmFtZSA9PSBncm91cE5hbWU7XG4gICAgICAgICAgICAgICAgaWYoc3RhdGVHcm91cC5ncm91cE5hbWU9PWdyb3VwTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlR3JvdXAuYXBwbHlTdGF0ZShzdGF0ZU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICB0aGlzLmRvTGF5b3V0KCk7XG4gICAgICAgICAgICB9Y2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290Qm9yZGVyLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuaG9yaXpvbkFsaWdubWVudCA9IHRoaXMuaG9yaXpvbkFsaWdubWVudDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci52ZXJ0aWNhbEFsaWdubWVudCA9IHRoaXMudmVydGljYWxBbGlnbm1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuYWRkQ2hpbGQodGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyKTtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5tYXJnaW4gPSB0aGlzLm1hcmdpbjtcbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuXG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIucGFyZW50U2xvdCA9IHRoaXMucGFyZW50U2xvdDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5wYXJlbnQgPSB0aGlzLnBhcmVudDtcblxuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLmFzc2VtYmxlRG9tKCk7XG5cbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcImNsaWNrXCIsW2VdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLm1vdXNlZW50ZXIoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJhaXNlRXZlbnQoXCJtb3VzZWVudGVyXCIsW2VdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLm1vdXNlbGVhdmUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJhaXNlRXZlbnQoXCJtb3VzZWxlYXZlXCIsW2VdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLm1vdXNlZG93bihmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcIm1vdXNlZG93blwiLFtlXSk7XG4gICAgICAgICAgICAgICAgc2VsZi5wcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLm1vdXNldXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJhaXNlRXZlbnQoXCJtb3VzZXVwXCIsW2VdKTtcbiAgICAgICAgICAgICAgICBzZWxmLnByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLm1vdXNlbW92ZShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcIm1vdXNlbW92ZVwiLFtlXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5ob3Jpem9uQWxpZ25tZW50ID0gdGhpcy5ob3Jpem9uQWxpZ25tZW50O1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLnZlcnRpY2FsQWxpZ25tZW50ID0gdGhpcy52ZXJ0aWNhbEFsaWdubWVudDtcbiAgICAgICAgICAgIC8vIHRoaXMucm9vdEJvcmRlci5hZGRDaGlsZCh0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIpO1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLm1hcmdpbiA9IHRoaXMubWFyZ2luO1xuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnJvb3RCb3JkZXIucGFyZW50U2xvdCA9IHRoaXMucGFyZW50U2xvdDtcbiAgICAgICAgICAgIC8vIHRoaXMucm9vdEJvcmRlci5wYXJlbnQgPSB0aGlzLnBhcmVudDtcblxuICAgICAgICAgICAgLy8gdGhpcy5yb290Qm9yZGVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5kb0xheW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0RnJvbVRvcCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5jYWxjdWxhdGVIZWlnaHRGcm9tVG9wKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRXaWR0aCA9IHRoaXMucm9vdEJvcmRlci5jYWxjdWxhdGVkV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGVXaWR0aEZyb21Ub3AoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlV2lkdGhGcm9tVG9wKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRIZWlnaHQgPSB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlZEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZVdpZHRoRnJvbUJvdHRvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5jYWxjdWxhdGVXaWR0aEZyb21Cb3R0b20oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGN1bGF0ZUhlaWdodEZyb21Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuY2FsY3VsYXRlSGVpZ2h0RnJvbUJvdHRvbSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgQ29udGVudFByZXNlbnRlciBleHRlbmRzIEJvcmRlcntcblxuICAgICAgICBjb250ZW50OkNvbnRyb2w7XG5cblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgICAgICAgICBzdXBlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBJdGVtc1ByZXNlbnRlciB7XG5cbiAgICB9XG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFjdGlvbiB7XHJcbiAgICAgICAgYWJzdHJhY3QgZXhlY3V0ZSgpOnZvaWQ7XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIExheW91dEx6ZyB7XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0UHJvcGVydHlBY3Rpb24gZXh0ZW5kcyBBY3Rpb257XHJcblxyXG4gICAgICAgIGNvbnRyb2w6Q29udHJvbDtcclxuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHZhbHVlOmFueTtcclxuXHJcbiAgICAgICAgZXhlY3V0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHNldHRlciA9IG5ldyBDb250cm9sUHJvcGVydHlTZXR0ZXIodGhpcy5jb250cm9sLCB0aGlzLnByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgIHNldHRlci5zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIE11bHRpQWN0aW9uIGV4dGVuZHMgQWN0aW9uIHtcblxuICAgICAgICBwcml2YXRlIGFjdGlvbnM6TGlzdDxBY3Rpb24+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IG5ldyBMaXN0PEFjdGlvbj4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEFjdGlvbihhY3Rpb246IEFjdGlvbik6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKGFjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVBY3Rpb24oYWN0aW9uOiBBY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnJlbW92ZShhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJBY3Rpb25zKCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV4ZWN1dGUoKTogdm9pZCB7XG4gICAgICAgICAgICBmb3IgKGxldCBhY3Rpb24gb2YgdGhpcy5hY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmV4ZWN1dGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBHb3RvU3RhdGVBY3Rpb24gZXh0ZW5kcyBBY3Rpb257XG5cbiAgICAgICAgdGVtcGxhdGVDb250cm9sOlRlbXBsYXRlQ29udHJvbDtcbiAgICAgICAgZ3JvdXBOYW1lOnN0cmluZztcbiAgICAgICAgc3RhdGVOYW1lOnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBleGVjdXRlKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy50ZW1wbGF0ZUNvbnRyb2wpIHRoaXMudGVtcGxhdGVDb250cm9sLmFjdGl2ZVN0YXRlKHRoaXMuZ3JvdXBOYW1lLCB0aGlzLnN0YXRlTmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5Q2hhbmdlZFRyaWdnZXIgZXh0ZW5kcyBDb250cm9sVHJpZ2dlciB7XHJcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgICAgICBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uVHJpZ2dlcmVkKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5hZGRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcih0aGlzLnByb3BlcnR5TmFtZSx0aGlzLmNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5yZW1vdmVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcih0aGlzLmNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XHJcbiAgICBleHBvcnQgY2xhc3MgU3RhdGVDaGFuZ2VkVHJpZ2dlciBleHRlbmRzIENvbnRyb2xUcmlnZ2VyIHtcclxuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgICAgIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25UcmlnZ2VyZWQoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLmFkZFN0YXRlQ2hhbmdlZExpc3RlbmVyKHRoaXMucHJvcGVydHlOYW1lLHRoaXMuY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLnJlbW92ZVN0YXRlQ2hhbmdlZExpc3RlbmVyKHRoaXMuY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50VHJpZ2dlciBleHRlbmRzIENvbnRyb2xUcmlnZ2Vye1xuICAgICAgICBldmVudE5hbWU6c3RyaW5nO1xuICAgICAgICBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbjtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpbml0KCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uVHJpZ2dlcmVkKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsdGhpcy5jYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5jYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTdHlsZUl0ZW0ge1xyXG4gICAgICAgIG5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XHJcbiAgICAgICAgdmFsdWU6YW55O1xyXG5cclxuICAgICAgICBhcHBseShyb290Q29udHJvbDpDb250cm9sKSB7XHJcbiAgICAgICAgICAgIGxldCBjb250cm9sID0gVmlzdWFsVHJlZS5maW5kQ29udHJvbEJ5TmFtZShyb290Q29udHJvbCwgdGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgaWYoY29udHJvbD09bnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgc2V0dGVyID0gbmV3IENvbnRyb2xQcm9wZXJ0eVNldHRlcihjb250cm9sLCB0aGlzLnByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgIHNldHRlci5zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN0eWxlIHtcclxuICAgICAgICBzdHlsZWl0ZW1zOkxpc3Q8U3R5bGVJdGVtPjtcclxuICAgICAgICB0cmlnZ2VyczpMaXN0PFRyaWdnZXI+O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZWl0ZW1zID0gbmV3IExpc3Q8U3R5bGVJdGVtPigpO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJzID0gbmV3IExpc3Q8VHJpZ2dlcj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZFN0eWxlSXRlbShjb250cm9sTmFtZTpzdHJpbmcsIHByb3BlcnR5TmFtZTpzdHJpbmcsIHZhbHVlOmFueSk6dm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IFN0eWxlSXRlbSgpO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWUgPSBjb250cm9sTmFtZTtcclxuICAgICAgICAgICAgaXRlbS5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XHJcbiAgICAgICAgICAgIGl0ZW0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZWl0ZW1zLmFkZChpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFwcGx5KHJvb3RDb250cm9sOkNvbnRyb2wpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYoIXJvb3RDb250cm9sKSByZXR1cm47XHJcbiAgICAgICAgICAgIGZvciAobGV0IHN0eWxlaXRlbSBvZiB0aGlzLnN0eWxlaXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlaXRlbS5hcHBseShyb290Q29udHJvbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHRyaWdnZXIgb2YgdGhpcy50cmlnZ2VycykgIHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXIuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBTdGF0ZSB7XG4gICAgICAgIG5hbWU6c3RyaW5nO1xuICAgICAgICBzdHlsZTpTdHlsZTtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgU3RhdGVHcm91cCB7XG4gICAgICAgIGdyb3VwTmFtZTpzdHJpbmc7XG4gICAgICAgIHN0YXRlczpMaXN0PFN0YXRlPjtcbiAgICAgICAgcm9vdENvbnRyb2w6Q29udHJvbDtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzID0gbmV3IExpc3Q8U3RhdGU+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZU5hbWVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVzLm1hcCh0PT50Lm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkU3RhdGUoc3RhdGU6U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFkZChzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVTdGF0ZUJ5TmFtZShzdGF0ZU5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBsZXQgc3RhdGVzY2FuZGlkYXRlID0gdGhpcy5zdGF0ZXMuZmlsdGVyKHQ9PnQubmFtZT09c3RhdGVOYW1lKTtcbiAgICAgICAgICAgIGZvciAobGV0IHN0YXRlIG9mIHN0YXRlc2NhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJlbW92ZShzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVTdGF0ZShzdGF0ZTpTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVtb3ZlKHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUFsbFN0YXRlcygpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmaW5kU3RhdGVCeU5hbWUoc3RhdGVOYW1lOnN0cmluZyk6U3RhdGUge1xuICAgICAgICAgICAgbGV0IHN0YXRlcyA9IHRoaXMuc3RhdGVzLmZpbHRlcih0PT50Lm5hbWU9PXN0YXRlTmFtZSk7XG4gICAgICAgICAgICBpZihzdGF0ZXMubGVuZ3RoPjApIHJldHVybiBzdGF0ZXNbMF07XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5U3RhdGUoc3RhdGVOYW1lOnN0cmluZykge1xuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5maW5kU3RhdGVCeU5hbWUoc3RhdGVOYW1lKTtcbiAgICAgICAgICAgIGlmKHN0YXRlPT1udWxsKSByZXR1cm47XG4gICAgICAgICAgICBpZihzdGF0ZS5zdHlsZT09bnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYodGhpcy5yb290Q29udHJvbD09bnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgc3RhdGUuc3R5bGUuYXBwbHkodGhpcy5yb290Q29udHJvbCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG4gICAgY2xhc3MgVmlzdWFsVHJlZVN0eWxlIHtcclxuXHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBUZW1wbGF0ZUNvbnRyb2x7XG5cbiAgICAgICAgcmFkaXVzOiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX2NvbnRlbnQ6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBjb250ZW50UHJlc2VudG9yOiBDb250ZW50UHJlc2VudGVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IDU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGluaXRWaXN1YWxUcmVlKCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUgPSBuZXcgVmlzdWFsVHJlZSgpO1xuICAgICAgICAgICAgbGV0IHJvb3RCb3JkZXIgPSBuZXcgQm9yZGVyKFwicm9vdFwiKTtcblxuICAgICAgICAgICAgdGhpcy5jb250ZW50UHJlc2VudG9yID0gbmV3IENvbnRlbnRQcmVzZW50ZXIoXCJfY29udGVudFwiKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFByZXNlbnRvci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFByZXNlbnRvci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRQcmVzZW50b3IuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuQ2VudGVyO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50UHJlc2VudG9yLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuQ2VudGVyO1xuXG4gICAgICAgICAgICBsZXQgY29udGVudGNvbnRyb2w6Q29udHJvbCA9IG51bGw7XG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5fY29udGVudCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdGhpcy5fY29udGVudCA9PT0gXCJudW1iZXJcIil7XG4gICAgICAgICAgICAgICAgbGV0IHR4dCA9IG5ldyBUZXh0VmlldyhcIlwiLHRoaXMuX2NvbnRlbnQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgdHh0Lm1hcmdpbiA9IG5ldyBUaGlja25lc3MoMTAsMTAsNSw1KTtcbiAgICAgICAgICAgICAgICB0eHQuc2VsZWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sID0gdHh0O1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgICAgICBjb250ZW50Y29udHJvbC52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgICAgICBjb250ZW50Y29udHJvbC53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgICAgICBjb250ZW50Y29udHJvbC5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb250ZW50Y29udHJvbCA9IDxDb250cm9sPnRoaXMuX2NvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRQcmVzZW50b3IuY29udGVudCA9IGNvbnRlbnRjb250cm9sO1xuXG5cbiAgICAgICAgICAgIGxldCB2bGluZWFyID0gbmV3IFZsaW5lYXJsYXlvdXQoXCJcIik7XG4gICAgICAgICAgICB2bGluZWFyLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHZsaW5lYXIudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB2bGluZWFyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdmxpbmVhci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB2bGluZWFyLmFkZENlbGwobmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS53ZWlnaHQsMSkpO1xuICAgICAgICAgICAgdmxpbmVhci5hZGRDZWxsKG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUud2VpZ2h0LDEpKTtcbiAgICAgICAgICAgIGxldCBiZ1JlY3QxID0gbmV3IFJlY3QoXCJyZWN0dXBcIik7XG4gICAgICAgICAgICBsZXQgYmdSZWN0MiA9IG5ldyBSZWN0KFwicmVjdGRvd25cIik7XG4gICAgICAgICAgICBiZ1JlY3QxLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgYmdSZWN0MS5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICBiZ1JlY3QxLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIGJnUmVjdDEudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICBiZ1JlY3QxLnJhZGl1c190b3BfbGVmdCA9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgYmdSZWN0MS5yYWRpdXNfdG9wX3JpZ2h0ID0gdGhpcy5yYWRpdXM7XG4gICAgICAgICAgICBiZ1JlY3QxLmZpbGwgPSBuZXcgU29saWRDb2xvckJydXNoKFwiI0YxRjFGMVwiKTtcbiAgICAgICAgICAgIGJnUmVjdDEuc3Ryb2tlID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiM0MzdERDRcIik7XG4gICAgICAgICAgICBiZ1JlY3QxLnN0cm9rZVRoaWNrbmVzcyA9IG5ldyBUaGlja25lc3MoMSwxLDEsMCk7XG4gICAgICAgICAgICBiZ1JlY3QyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgYmdSZWN0Mi5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICBiZ1JlY3QyLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIGJnUmVjdDIudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICBiZ1JlY3QyLnJhZGl1c19ib3R0b21fbGVmdCA9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgYmdSZWN0Mi5yYWRpdXNfYm90dG9tX3JpZ2h0ID0gdGhpcy5yYWRpdXM7XG4gICAgICAgICAgICBiZ1JlY3QyLmZpbGwgPSBuZXcgU29saWRDb2xvckJydXNoKFwiI0U1RTVFNVwiKTtcbiAgICAgICAgICAgIGJnUmVjdDIuc3Ryb2tlID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiM0MzdERDRcIik7XG4gICAgICAgICAgICBiZ1JlY3QyLnN0cm9rZVRoaWNrbmVzcyA9IG5ldyBUaGlja25lc3MoMSwxLDAsMSk7XG4gICAgICAgICAgICB2bGluZWFyLmFkZENoaWxkKGJnUmVjdDEpO1xuICAgICAgICAgICAgdmxpbmVhci5hZGRDaGlsZChiZ1JlY3QyKTtcbiAgICAgICAgICAgIHZsaW5lYXIuc2V0Q2VsbChiZ1JlY3QxLDApO1xuICAgICAgICAgICAgdmxpbmVhci5zZXRDZWxsKGJnUmVjdDIsMSk7XG4gICAgICAgICAgICByb290Qm9yZGVyLmFkZENoaWxkKHZsaW5lYXIpO1xuICAgICAgICAgICAgcm9vdEJvcmRlci5hZGRDaGlsZCh0aGlzLmNvbnRlbnRQcmVzZW50b3IpO1xuICAgICAgICAgICAgdGhpcy52aXN1YWxUcmVlLnJvb3RDb250YWluZXIgPSByb290Qm9yZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBpbml0U3RhdGVzKCk6dm9pZCB7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkU3RhdGVTdHlsZShcImhvdmVyR3JvdXBcIixcIm1vdXNlZW50ZXJcIix7XG4gICAgICAgICAgICAgICAgXCJyZWN0dXBcIjp7XG4gICAgICAgICAgICAgICAgICAgIFwic3Ryb2tlVGhpY2tuZXNzXCI6IG5ldyBUaGlja25lc3MoMiwyLDIsMClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwicmVjdGRvd25cIjp7XG4gICAgICAgICAgICAgICAgICAgIFwic3Ryb2tlVGhpY2tuZXNzXCI6IG5ldyBUaGlja25lc3MoMiwyLDAsMilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFwibW91c2VlbnRlclwiKTtcbiAgICAgICAgICAgIHRoaXMuYWRkU3RhdGVTdHlsZShcImhvdmVyR3JvdXBcIixcIm1vdXNlbGVhdmVcIix7XG4gICAgICAgICAgICAgICAgXCJyZWN0dXBcIjp7XG4gICAgICAgICAgICAgICAgICAgIFwic3Ryb2tlVGhpY2tuZXNzXCI6IG5ldyBUaGlja25lc3MoMSwxLDEsMClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwicmVjdGRvd25cIjp7XG4gICAgICAgICAgICAgICAgICAgIFwic3Ryb2tlVGhpY2tuZXNzXCI6IG5ldyBUaGlja25lc3MoMSwxLDAsMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFwibW91c2VsZWF2ZVwiKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRTdGF0ZVN0eWxlKFwicHJlc3NHcm91cFwiLFwicHJlc3NlZFwiLHtcbiAgICAgICAgICAgICAgICBcInJlY3R1cFwiOntcbiAgICAgICAgICAgICAgICAgICAgXCJmaWxsXCI6IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjRjFGMUYxXCIpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInJlY3Rkb3duXCI6e1xuICAgICAgICAgICAgICAgICAgICBcImZpbGxcIjogbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNGMUYxRjFcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFwibW91c2Vkb3duXCIpO1xuICAgICAgICAgICAgdGhpcy5hZGRTdGF0ZVN0eWxlKFwicHJlc3NHcm91cFwiLFwicmVsZWFzZWRcIix7XG4gICAgICAgICAgICAgICAgXCJyZWN0dXBcIjp7XG4gICAgICAgICAgICAgICAgICAgIFwiZmlsbFwiOiBuZXcgU29saWRDb2xvckJydXNoKFwiI0YxRjFGMVwiKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJyZWN0ZG93blwiOntcbiAgICAgICAgICAgICAgICAgICAgXCJmaWxsXCI6IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjRTVFNUU1XCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcIm1vdXNldXBcIik7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgY29udGVudCgpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgY29udGVudCh2YWx1ZTogYW55KSB7XG4gICAgICAgICAgICBpZih0aGlzLl9jb250ZW50PT12YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQoXCJjb250ZW50XCIpO1xuICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IHZhbHVlO1xuICAgICAgICB9XG5cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFZpc3VhbFRyZWUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFN0YXRlcygpO1xuICAgICAgICAgICAgc3VwZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgVGVtcGxhdGVDb250cm9se1xuICAgICAgICBtaW5WYWx1ZTpudW1iZXI7XG4gICAgICAgIG1heFZhbHVlOm51bWJlcjtcbiAgICAgICAgdmFsdWU6bnVtYmVyO1xuICAgICAgICByYWRpdXM6bnVtYmVyPTU7XG4gICAgICAgIHByaXZhdGUgcmVjdFByb2M6IFJlY3Q7XG4gICAgICAgIHByaXZhdGUgcmVjdFVwOiBSZWN0O1xuICAgICAgICBiYXJmaWxsOkJydXNoO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLm1pblZhbHVlID0gMDtcbiAgICAgICAgICAgIHRoaXMubWF4VmFsdWUgPSAxMDA7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gMzA7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgaW5pdFZpc3VhbFRyZWUoKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudmlzdWFsVHJlZSA9IG5ldyBWaXN1YWxUcmVlKCk7XG5cbiAgICAgICAgICAgIGxldCByb290Qm9yZGVyID0gbmV3IEJvcmRlcihcInJvb3RcIik7XG4gICAgICAgICAgICBsZXQgcmVjdFByb2MgPSBuZXcgUmVjdChcInJlY3RQcm9jXCIpO1xuICAgICAgICAgICAgbGV0IHJlY3RCZyA9IG5ldyBSZWN0KFwicmVjdEJnXCIpO1xuICAgICAgICAgICAgbGV0IHJlY3RVcCA9IG5ldyBSZWN0KFwicmVjdFVwXCIpO1xuXG4gICAgICAgICAgICByZWN0UHJvYy53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsMCk7XG4gICAgICAgICAgICByZWN0UHJvYy5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICByZWN0UHJvYy5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5MZWZ0O1xuICAgICAgICAgICAgcmVjdFByb2MudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICByZWN0UHJvYy5yYWRpdXNfdG9wX2xlZnQgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIHJlY3RQcm9jLnJhZGl1c19ib3R0b21fbGVmdCA9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgcmVjdFByb2MuZmlsbCA9IHRoaXMuYmFyZmlsbDtcbiAgICAgICAgICAgIHJlY3RQcm9jLnN0cm9rZSA9IHRoaXMuc3Ryb2tlO1xuICAgICAgICAgICAgcmVjdFByb2Muc3Ryb2tlVGhpY2tuZXNzID0gbmV3IFRoaWNrbmVzcyh0aGlzLnN0cm9rZVRoaWNrbmVzcy5sZWZ0LDAsdGhpcy5zdHJva2VUaGlja25lc3MudG9wLHRoaXMuc3Ryb2tlVGhpY2tuZXNzLmJvdHRvbSk7XG5cbiAgICAgICAgICAgIHJlY3RCZy53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHJlY3RCZy5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICByZWN0QmcuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgcmVjdEJnLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgcmVjdEJnLnJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgcmVjdEJnLmZpbGwgPSB0aGlzLmZpbGw7XG4gICAgICAgICAgICByZWN0Qmcuc3Ryb2tlID0gdGhpcy5zdHJva2U7XG4gICAgICAgICAgICByZWN0Qmcuc3Ryb2tlVGhpY2tuZXNzID0gdGhpcy5zdHJva2VUaGlja25lc3M7XG4gICAgICAgICAgICByZWN0Qmcuc2hhZG93ID0gdGhpcy5zaGFkb3c7XG5cbiAgICAgICAgICAgIGxldCB2bGluZWFyID0gbmV3IFZsaW5lYXJsYXlvdXQoXCJcIik7XG4gICAgICAgICAgICB2bGluZWFyLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHZsaW5lYXIudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB2bGluZWFyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdmxpbmVhci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG5cbiAgICAgICAgICAgIHZsaW5lYXIuYWRkQ2VsbChuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLndlaWdodCwxKSk7XG4gICAgICAgICAgICB2bGluZWFyLmFkZENlbGwobmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS53ZWlnaHQsMSkpO1xuICAgICAgICAgICAgdmxpbmVhci5hZGRDaGlsZChyZWN0VXApO1xuICAgICAgICAgICAgdmxpbmVhci5zZXRDZWxsKHJlY3RVcCwwKTtcblxuICAgICAgICAgICAgcmVjdFVwLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCwwKTtcbiAgICAgICAgICAgIHJlY3RVcC5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICByZWN0VXAuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgcmVjdFVwLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgcmVjdFVwLnJhZGl1c190b3BfbGVmdCA9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgcmVjdFVwLnN0cm9rZSA9IHRoaXMuc3Ryb2tlO1xuICAgICAgICAgICAgcmVjdFVwLm9wYWNpdHkgPSAwLjU7XG4gICAgICAgICAgICByZWN0VXAuZmlsbCA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCJ3aGl0ZVwiKTtcbiAgICAgICAgICAgIHJlY3RVcC5zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKHRoaXMuc3Ryb2tlVGhpY2tuZXNzLmxlZnQsMCx0aGlzLnN0cm9rZVRoaWNrbmVzcy50b3AsMCk7XG5cbiAgICAgICAgICAgIHJvb3RCb3JkZXIuYWRkQ2hpbGQocmVjdEJnKTtcbiAgICAgICAgICAgIHJvb3RCb3JkZXIuYWRkQ2hpbGQocmVjdFByb2MpO1xuICAgICAgICAgICAgcm9vdEJvcmRlci5hZGRDaGlsZCh2bGluZWFyKTtcblxuICAgICAgICAgICAgdGhpcy5yZWN0UHJvYyA9IHJlY3RQcm9jO1xuICAgICAgICAgICAgdGhpcy5yZWN0VXAgPSByZWN0VXA7XG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUucm9vdENvbnRhaW5lciA9IHJvb3RCb3JkZXI7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5pbml0VmlzdWFsVHJlZSgpO1xuICAgICAgICAgICAgc3VwZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHcgPSB0aGlzLmNhbGN1bGF0ZWRXaWR0aDtcbiAgICAgICAgICAgIGxldCByZWN0ZW5kID0gdy8odGhpcy5tYXhWYWx1ZS10aGlzLm1pblZhbHVlKSoodGhpcy52YWx1ZS10aGlzLm1pblZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMucmVjdFByb2Mud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLHJlY3RlbmQpO1xuICAgICAgICAgICAgdGhpcy5yZWN0VXAud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLHJlY3RlbmQpO1xuICAgICAgICAgICAgc3VwZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIFNsaWRlckJhciBleHRlbmRzIFRlbXBsYXRlQ29udHJvbHtcblxuICAgICAgICBtaW5WYWx1ZTpudW1iZXI7XG4gICAgICAgIG1heFZhbHVlOm51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfdmFsdWU6bnVtYmVyO1xuICAgICAgICByYWRpdXM6bnVtYmVyO1xuICAgICAgICBoYW5kbGVGaWxsOiBCcnVzaDtcbiAgICAgICAgaGFuZGxlU3Ryb2tlOiBCcnVzaDtcbiAgICAgICAgcHJpdmF0ZSByZWN0SGFuZGxlOiBSZWN0O1xuICAgICAgICBwcml2YXRlIG1vdXNlZG93blZhbHVlOm51bWJlcjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5taW5WYWx1ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLm1heFZhbHVlID0gMTAwO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSAzMDtcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gMTA7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUZpbGwgPSBuZXcgU29saWRDb2xvckJydXNoKFwiI2Y1ZjVmNVwiKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU3Ryb2tlID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNlNWU1ZTVcIik7XG4gICAgICAgICAgICB0aGlzLmZpbGwgPSBuZXcgU29saWRDb2xvckJydXNoKFwiI2U1ZTVlNVwiKTtcbiAgICAgICAgICAgIHRoaXMuc3Ryb2tlID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNlNWU1ZTVcIik7XG4gICAgICAgICAgICB0aGlzLm1vdXNlZG93blZhbHVlID0gMDtcblxuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0aWVzLnB1c2goXCJ2YWx1ZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3ZhbHVlID09IHZhbHVlKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChcInZhbHVlXCIpO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgaW5pdFZpc3VhbFRyZWUoKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudmlzdWFsVHJlZSA9IG5ldyBWaXN1YWxUcmVlKCk7XG4gICAgICAgICAgICBsZXQgcm9vdEJvcmRlciA9IG5ldyBCb3JkZXIoXCJyb290XCIpO1xuXG4gICAgICAgICAgICBsZXQgcmVjdFN0aWNrID0gbmV3IFJlY3QoXCJzbGlkZXJTdGlja1wiKTtcbiAgICAgICAgICAgIHJlY3RTdGljay5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICByZWN0U3RpY2sudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5DZW50ZXI7XG4gICAgICAgICAgICByZWN0U3RpY2sud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICByZWN0U3RpY2suaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCwyKTtcbiAgICAgICAgICAgIHJlY3RTdGljay5maWxsID0gdGhpcy5maWxsO1xuICAgICAgICAgICAgcmVjdFN0aWNrLnN0cm9rZSA9IHRoaXMuc3Ryb2tlO1xuICAgICAgICAgICAgcmVjdFN0aWNrLnN0cm9rZVRoaWNrbmVzcyA9IG5ldyBUaGlja25lc3MoMSwxLDEsMSk7XG4gICAgICAgICAgICByZWN0U3RpY2suc2hhZG93ID0gbmV3IFNoYWRvd1NldHRpbmdzKDAsMCw1LDAsXCIjY2ZjZmNmXCIpO1xuXG4gICAgICAgICAgICBsZXQgcmVjdEhhbmRsZSA9IG5ldyBSZWN0KFwic2xpZGVySGFuZGxlXCIpO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5MZWZ0O1xuICAgICAgICAgICAgcmVjdEhhbmRsZS52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LkNlbnRlcjtcbiAgICAgICAgICAgIHJlY3RIYW5kbGUucmFkaXVzID0gdGhpcy5yYWRpdXM7XG4gICAgICAgICAgICByZWN0SGFuZGxlLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCx0aGlzLnJhZGl1cyoyKTtcbiAgICAgICAgICAgIHJlY3RIYW5kbGUuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCx0aGlzLnJhZGl1cyoyKTtcbiAgICAgICAgICAgIHJlY3RIYW5kbGUuZmlsbCA9IHRoaXMuaGFuZGxlRmlsbDtcbiAgICAgICAgICAgIHJlY3RIYW5kbGUuc3Ryb2tlID0gdGhpcy5oYW5kbGVTdHJva2U7XG4gICAgICAgICAgICByZWN0SGFuZGxlLnN0cm9rZVRoaWNrbmVzcyA9IG5ldyBUaGlja25lc3MoMSwxLDEsMSk7XG4gICAgICAgICAgICByZWN0SGFuZGxlLnNoYWRvdyA9IG5ldyBTaGFkb3dTZXR0aW5ncygwLDAsMjAsMCxcIiNjZmNmY2ZcIik7XG5cbiAgICAgICAgICAgIHJvb3RCb3JkZXIuYWRkQ2hpbGQocmVjdFN0aWNrKTtcbiAgICAgICAgICAgIHJvb3RCb3JkZXIuYWRkQ2hpbGQocmVjdEhhbmRsZSk7XG5cbiAgICAgICAgICAgIGxldCBtb3VzZWRvd25TY3JlZW5YID0gMDtcbiAgICAgICAgICAgIGxldCBtb3VzZWRvd25TY3JlZW5ZID0gMDtcbiAgICAgICAgICAgIGxldCBpc21vdXNlZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IGR4ID0gMDtcbiAgICAgICAgICAgIGxldCBkeSA9IDA7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAkKHJlY3RIYW5kbGUuZ2V0Um9vdEVsZW1lbnQoKSkubW91c2Vkb3duKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgbW91c2Vkb3duU2NyZWVuWCA9IGUuc2NyZWVuWDtcbiAgICAgICAgICAgICAgICBtb3VzZWRvd25TY3JlZW5ZID0gZS5zY3JlZW5ZO1xuICAgICAgICAgICAgICAgIGlzbW91c2Vkb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZWxmLm1vdXNlZG93blZhbHVlID0gc2VsZi5fdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQuYm9keSkubW91c2Vtb3ZlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYoIWlzbW91c2Vkb3duKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZHggPSBlLnNjcmVlblggLSBtb3VzZWRvd25TY3JlZW5YO1xuICAgICAgICAgICAgICAgIGR5ID0gZS5zY3JlZW5ZIC0gbW91c2Vkb3duU2NyZWVuWTtcbiAgICAgICAgICAgICAgICBzZWxmLm9uSGFuZGxlRHJhZyhkeCxkeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQuYm9keSkubW91c2V1cChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIG1vdXNlZG93blNjcmVlblggPSBlLnNjcmVlblg7XG4gICAgICAgICAgICAgICAgbW91c2Vkb3duU2NyZWVuWSA9IGUuc2NyZWVuWTtcbiAgICAgICAgICAgICAgICBpc21vdXNlZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUucm9vdENvbnRhaW5lciA9IHJvb3RCb3JkZXI7XG4gICAgICAgICAgICB0aGlzLnJlY3RIYW5kbGUgPSByZWN0SGFuZGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgb25IYW5kbGVEcmFnKGR4OiBudW1iZXIsIGR5OiBudW1iZXIpOiBhbnkge1xuICAgICAgICAgICAgbGV0IHcgPSB0aGlzLmNhbGN1bGF0ZWRXaWR0aDtcbiAgICAgICAgICAgIGxldCB2ID0gdGhpcy5tb3VzZWRvd25WYWx1ZSArIGR4L3cqKHRoaXMubWF4VmFsdWUtdGhpcy5taW5WYWx1ZSk7XG4gICAgICAgICAgICBpZih2PnRoaXMubWF4VmFsdWUpIHYgPSB0aGlzLm1heFZhbHVlO1xuICAgICAgICAgICAgaWYodjx0aGlzLm1pblZhbHVlKSB2ID0gdGhpcy5taW5WYWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgICAgICAgdGhpcy5kb0xheW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmluaXRWaXN1YWxUcmVlKCk7XG4gICAgICAgICAgICBzdXBlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgdyA9IHRoaXMuY2FsY3VsYXRlZFdpZHRoO1xuICAgICAgICAgICAgbGV0IHJlY3RlbmQgPSB3Lyh0aGlzLm1heFZhbHVlLXRoaXMubWluVmFsdWUpKih0aGlzLl92YWx1ZS10aGlzLm1pblZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMucmVjdEhhbmRsZS5tYXJnaW4ubGVmdCA9IHJlY3RlbmQ7XG4gICAgICAgICAgICBzdXBlci5kb0xheW91dCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9wZXJ0eUJpbmRpbmcocHJvcGVydHlQcm92aWRlcjpQcm9wZXJ0eVByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OmFueSwgdGFyZ2V0UHJvcE5hbWU6c3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOmFueSwgc291cmNlUHJvcE5hbWU6c3RyaW5nLCBtb2RlOiBCaW5kaW5nTW9kZSA9IEJpbmRpbmdNb2RlLk9uZXdheSk6IFByb3BlcnR5QmluZGluZyB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb3BlcnR5QmluZGluZyhwcm9wZXJ0eVByb3ZpZGVyKTtcbiAgICAgICAgcC5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIHAuc291cmNlUHJvcGVydHlOYW1lID0gc291cmNlUHJvcE5hbWU7XG4gICAgICAgIHAudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBwLnRhcmdldFByb3BlcnR5TmFtZSA9IHRhcmdldFByb3BOYW1lO1xuICAgICAgICBwLm1vZGUgPSBtb2RlO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0VW5pdmVyc2FsUHJvcGVydHlQcm92aWRlcigpIDogVW5pdmVyc2FsUHJvcGVydHlQcm92aWRlciB7XG5cbiAgICAgICAgbGV0IGdldHRlclByb3ZpZGVyID0gbmV3IFVuaXZlcnNhbFByb3BlcnR5R2V0dGVyUHJvdmlkZXIoKTtcbiAgICAgICAgbGV0IHNldHRlclByb3ZpZGVyID0gbmV3IFVuaXZlcnNhbFByb3BlcnR5U2V0dGVyUHJvdmlkZXIoKTtcbiAgICAgICAgbGV0IGxpc3RlbmVyUHJvdmlkZXIgPSBuZXcgVW5pdmVyc2FsUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpO1xuXG4gICAgICAgIGdldHRlclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBDb250cm9sUHJvcGVydHlHZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVdpZHRoUHJvcGVydHlHZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbUhlaWdodFByb3BlcnR5R2V0dGVyUHJvdmlkZXIoKSk7XG4gICAgICAgIGdldHRlclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEb21UZXh0UHJvcGVydHlHZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVZhbHVlUHJvcGVydHlHZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERpY3RQcm9wZXJ0eUdldHRlclByb3ZpZGVyKCkpO1xuXG4gICAgICAgIHNldHRlclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBDb250cm9sUHJvcGVydHlTZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVdpZHRoUHJvcGVydHlTZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbUhlaWdodFByb3BlcnR5U2V0dGVyUHJvdmlkZXIoKSk7XG4gICAgICAgIHNldHRlclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEb21UZXh0UHJvcGVydHlTZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVZhbHVlUHJvcGVydHlTZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERpY3RQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuXG4gICAgICAgIGxpc3RlbmVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IENvbnRyb2xQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKCkpO1xuICAgICAgICBsaXN0ZW5lclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEb21TaXplUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpKTtcbiAgICAgICAgbGlzdGVuZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tVGV4dFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIoKSk7XG4gICAgICAgIGxpc3RlbmVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVZhbHVlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpKTtcbiAgICAgICAgbGlzdGVuZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRGljdFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIoKSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBVbml2ZXJzYWxQcm9wZXJ0eVByb3ZpZGVyKGdldHRlclByb3ZpZGVyLCBzZXR0ZXJQcm92aWRlciwgbGlzdGVuZXJQcm92aWRlcik7XG4gICAgfVxuXG59Il19
