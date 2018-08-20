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
        }
        Slot.prototype.addChild = function (child) {
            this.children.add(child);
            child.parentSlot = this;
            // child.parent = null;
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
        // Estimate the width of this control,
        // the size of this control is determined by many factors,
        // for example : auto/fix value of width/height, parent container, horizonal/vertical alignments, margins。
        // For different types of parent containers, the method of size estimation are totally different.
        FrameworkElement.prototype.estimateWidth = function () {
            return 0;
        };
        // Estimate the width of this control,
        // the size of this control is determined by many factors,
        // for example : auto/fix value of width/height, parent container, horizonal/vertical alignments, margins。
        // For different types of parent containers, the method of size estimation are totally different.
        FrameworkElement.prototype.estimateHeight = function () {
            return 0;
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
        ContainerControl.prototype.initCalculableSlots = function () {
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
        ControlBase.prototype.estimateWidth = function () {
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
                    if (this.width.type == LayoutLzg.DistanceType.fixed) {
                        return this.width.value;
                    }
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
        ControlBase.prototype.estimateHeight = function () {
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
                    if (this.height.type == LayoutLzg.DistanceType.fixed) {
                        return this.height.value;
                    }
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
        ControlBase.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).css("box-sizing", "border-box");
            }
            return this.rootElem;
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
        TextView.prototype.estimateHeight_auto = function () {
            return $(this.getRootElement()).find('span').height();
        };
        TextView.prototype.estimateWidth_auto = function () {
            return $(this.getRootElement()).find('span').width();
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
            _super.prototype.doLayout.call(this);
            $(this.getRootElement()).css('width', this.estimateWidth() + 'px');
            $(this.getRootElement()).css('height', this.estimateHeight() + 'px');
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
        Rect.prototype.estimateHeight_auto = function () {
            return 0;
        };
        Rect.prototype.estimateWidth_auto = function () {
            return 0;
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
        ImageView.prototype.estimateHeight_auto = function () {
            return 0;
        };
        ImageView.prototype.estimateWidth_auto = function () {
            return 0;
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
        Border.prototype.initCalculableSlots = function () {
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
        Border.prototype.assembleDom = function () {
            this.wrapperDoms = [];
            $(this.getRootElement()).empty();
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.assembleDom();
                var wrapperDiv = $("<div></div>")[0];
                $(wrapperDiv).attr('layout-tag', 'wrapper');
                // eventTransparentDiv(wrapperDiv);
                this.wrapperDoms.push(wrapperDiv);
                $(this.getRootElement()).append(wrapperDiv);
                $(wrapperDiv).append(child.getRootElement());
            }
        };
        Border.prototype.doLayout = function () {
            $(this.getRootElement()).css('position', 'absolute');
            $(this.getRootElement()).css('width', this.estimateWidth() + 'px');
            $(this.getRootElement()).css('height', this.estimateHeight() + 'px');
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                var wrapperDiv = this.wrapperDoms[i];
                $(wrapperDiv).css('position', 'absolute');
                $(wrapperDiv).css('left', child.margin.left + 'px');
                $(wrapperDiv).css('right', child.margin.right + 'px');
                $(wrapperDiv).css('top', child.margin.top + 'px');
                $(wrapperDiv).css('bottom', child.margin.bottom + 'px');
                child.doLayout();
                $(child.getRootElement()).css('position', 'absolute');
                if (child.horizonAlignment == LayoutLzg.HorizonAlignment.Left) {
                    $(child.getRootElement()).css('left', '0px');
                }
                else if (child.horizonAlignment == LayoutLzg.HorizonAlignment.Right) {
                    $(child.getRootElement()).css('right', '0px');
                }
                else if (child.horizonAlignment == LayoutLzg.HorizonAlignment.Strech) {
                    $(child.getRootElement()).css('left', '0px');
                    $(child.getRootElement()).css('right', '0px');
                }
                else if (child.horizonAlignment == LayoutLzg.HorizonAlignment.Center) {
                    var w = child.estimateWidth();
                    var ww = this.estimateWidth();
                    var x = (ww - w) / 2;
                    $(child.getRootElement()).css('left', x + 'px');
                }
                if (child.verticalAlignment == LayoutLzg.VerticalAlignment.Top) {
                    $(child.getRootElement()).css('top', '0px');
                }
                else if (child.verticalAlignment == LayoutLzg.VerticalAlignment.Bottom) {
                    $(child.getRootElement()).css('bottom', '0px');
                }
                else if (child.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
                    $(child.getRootElement()).css('top', '0px');
                    $(child.getRootElement()).css('bottom', '0px');
                }
                else if (child.verticalAlignment == LayoutLzg.VerticalAlignment.Center) {
                    var h = child.estimateHeight();
                    var hh = this.estimateHeight();
                    var y = (hh - h) / 2;
                    $(child.getRootElement()).css('top', y + 'px');
                }
            }
        };
        Border.prototype.estimateWidth = function () {
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
                            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                                var child = _a[_i];
                                child.parentSlot.isSlotWidthCalculatable = true;
                                child.parentSlot.calulatedSlotWidth = widthlist[0];
                            }
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
                        for (var _b = 0, _c = this.children; _b < _c.length; _b++) {
                            var child = _c[_b];
                            child.parentSlot.isSlotWidthCalculatable = true;
                            child.parentSlot.calulatedSlotWidth = widthlist[0];
                        }
                        return widthlist[0];
                    }
                    return 0;
                }
            }
        };
        Border.prototype.estimateHeight = function () {
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
                            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                                var child = _a[_i];
                                child.parentSlot.isSlotHeightCalculatable = true;
                                child.parentSlot.calulatedSlotHeight = heightlist[0];
                            }
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
                        for (var _b = 0, _c = this.children; _b < _c.length; _b++) {
                            var child = _c[_b];
                            child.parentSlot.isSlotHeightCalculatable = true;
                            child.parentSlot.calulatedSlotHeight = heightlist[0];
                        }
                        return heightlist[0];
                    }
                    return 0;
                }
            }
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
            this.vchildren = new LayoutLzg.List();
            this.slotMap = new LayoutLzg.Map();
        }
        Vlinearlayout.prototype.addChild = function (control) {
            this.vchildren.add(control);
            control.parent = this;
        };
        Vlinearlayout.prototype.addCell = function (distance) {
            var slot = new LayoutLzg.Slot();
            slot.container = this;
            this.slots.add(slot);
            if (!this.slotMap.containsKey(slot))
                this.slotMap.put(slot, new LayoutLzg.SlotItem(new LayoutLzg.Border("LinearCell"), null));
            var item = this.slotMap.get(slot);
            item.slotDefination = distance;
            _super.prototype.addChild.call(this, item.slotBorder);
            // this.children.add(item.slotBorder);
            // item.slotBorder.parent = this;
            // item.slotBorder.parentSlot = this.mainSlot;
            // item.slotBorder.actualContainer = this;
        };
        Vlinearlayout.prototype.setCell = function (control, cellIndex) {
            var idx = this.vchildren.indexOf(control);
            if (idx > -1) {
                var slot = this.slots[cellIndex];
                slot.addChild(control);
                var item = this.slotMap.get(slot);
                item.slotBorder.addChild(control);
                control.parent = this;
            }
        };
        Vlinearlayout.prototype.initCalculableSlots = function () {
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
                if (this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
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
                for (var i = 0; i < this.vchildren.length; i++) {
                    var child = this.vchildren[i];
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
                    for (var i = 0; i < this.vchildren.length; i++) {
                        var child = this.vchildren[i];
                        child.parentSlot.isSlotWidthCalculatable = true;
                        child.parentSlot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                        if (child instanceof LayoutLzg.ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.vchildren.length; i++) {
                        var child = this.vchildren[i];
                        child.parentSlot.isSlotWidthCalculatable = false;
                        if (child instanceof LayoutLzg.ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }
            _super.prototype.initCalculableSlots.call(this);
        };
        Vlinearlayout.prototype.doLayout = function () {
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
                border.margin = new LayoutLzg.Thickness(0, 0, pos, 0);
                border.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
                border.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, cellh);
                border.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
                border.verticalAlignment = LayoutLzg.VerticalAlignment.Top;
                pos += cellh;
                border.initCalculableSlots();
                border.assembleDom();
            }
            _super.prototype.doLayout.call(this);
        };
        return Vlinearlayout;
    }(LayoutLzg.Border));
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
        VisualTree.prototype.initCalculableSlots = function () {
            if (this.rootContainer) {
                this.rootContainer.initCalculableSlots();
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
            this.rootBorder.initCalculableSlots();
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
            // this.rootBorder.parentSlot = this.parentSlot;
            // this.rootBorder.parent = this.parent;
            // this.rootBorder.initCalculableSlots();
            this.rootBorder.doLayout();
        };
        TemplateControl.prototype.estimateHeight_auto = function () {
            return this.rootBorder.estimateHeight();
        };
        TemplateControl.prototype.estimateWidth_auto = function () {
            return this.rootBorder.estimateWidth();
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
            this.initVisualTree();
            this.initStates();
        }
        Button.prototype.initVisualTree = function () {
            this.visualTree = new LayoutLzg.VisualTree();
            var rootBorder = new LayoutLzg.Border("root");
            this.contentPresentor = new LayoutLzg.ContentPresenter("_content");
            this.contentPresentor.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this.contentPresentor.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this.contentPresentor.horizonAlignment = LayoutLzg.HorizonAlignment.Center;
            this.contentPresentor.verticalAlignment = LayoutLzg.VerticalAlignment.Center;
            var vlinear = new LayoutLzg.VerticalLinearLayout("");
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
                var contentcontrol = null;
                if (typeof value === "string" || typeof value === "number") {
                    var txt = new LayoutLzg.TextView("", value.toString());
                    txt.margin = new LayoutLzg.Thickness(10, 10, 5, 5);
                    txt.selectable = false;
                    contentcontrol = txt;
                    contentcontrol.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
                    contentcontrol.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
                    contentcontrol.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
                    contentcontrol.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
                }
                else {
                    contentcontrol = value;
                }
                this.contentPresentor.content = contentcontrol;
            },
            enumerable: true,
            configurable: true
        });
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
            var w = this.estimateWidth();
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
            rectStick.shadow = new LayoutLzg.ShadowSettings(0, 0, 10, 0, "#cfcfcf");
            var rectHandle = new LayoutLzg.Rect("sliderHandle");
            rectHandle.horizonAlignment = LayoutLzg.HorizonAlignment.Left;
            rectHandle.verticalAlignment = LayoutLzg.VerticalAlignment.Center;
            rectHandle.radius = this.radius;
            rectHandle.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, this.radius * 2);
            rectHandle.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, this.radius * 2);
            rectHandle.fill = this.handleFill;
            rectHandle.stroke = this.handleStroke;
            rectHandle.strokeThickness = new LayoutLzg.Thickness(1, 1, 1, 1);
            rectHandle.shadow = new LayoutLzg.ShadowSettings(0, 0, 10, 0, "#cfcfcf");
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
            var w = this.estimateWidth();
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
            var w = this.estimateWidth();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2RhdGV1dGlscy50cyIsInV0aWxzL2V2ZW50dXRpbHMudHMiLCJldmVudGJ1cy9ldmVudGJ1cy50cyIsInRyaWdnZXIvdHJpZ2dlcmJhc2UudHMiLCJsYXlvdXRiYXNlLnRzIiwibGF5b3V0Y29yZS50cyIsImNvbGxlY3Rpb25zL2xpc3QudHMiLCJjb2xsZWN0aW9ucy9tYXAudHMiLCJicnVzaGVzL3NvbGlkY29sb3JicnVzaC50cyIsImJydXNoZXMvaW1hZ2Vjb2xvcmJydXNoLnRzIiwiYnJ1c2hlcy9ncmFkaWVudGNvbG9yYnJ1c2gudHMiLCJjb250cm9scy9jb250cm9sYmFzZS50cyIsImNvbnRyb2xzL3RleHR2aWV3LnRzIiwiY29udHJvbHMvcmVjdC50cyIsImNvbnRyb2xzL2ltYWdlLnRzIiwiY29udGFpbmVycy9jb250YWluZXJiYXNlLnRzIiwiY29udGFpbmVycy9ib3JkZXIudHMiLCJjb250YWluZXJzL2hvcml6b25hbGxpbmVhcmxheW91dC50cyIsImNvbnRhaW5lcnMvdmVydGljYWxsaW5lYXJsYXlvdXQudHMiLCJjb250YWluZXJzL3ZsaW5lYXJsYXlvdXQudHMiLCJjb250YWluZXJzL2hsaW5lYXJsYXlvdXQudHMiLCJvYnNlcnZlci9vYnNlcnZhYmxlb2JqZWN0aW5qZWN0b3IudHMiLCJvYnNlcnZlci9wcm9wZXJ0eWJhc2UudHMiLCJvYnNlcnZlci9kb21zaXplcHJvcGVydHkudHMiLCJvYnNlcnZlci9kb210ZXh0cHJvcGVydHkudHMiLCJvYnNlcnZlci9kb212YWx1ZXByb3BlcnR5LnRzIiwib2JzZXJ2ZXIvZGljdHByb3BlcnR5LnRzIiwib2JzZXJ2ZXIvY29udHJvbHByb3BlcnR5LnRzIiwiYmluZGluZ3MvYmluZGluZy50cyIsImJpbmRpbmdzL2Z1bmN0aW9uYmluZGluZy50cyIsImJpbmRpbmdzL3Byb3BlcnR5YmluZGluZy50cyIsImNvbnZlcnRlcnMvZGF0ZWZvcm1hdGNvbnZlcnRlci50cyIsImNvbnZlcnRlcnMvZmlyc3RjaGFydXBwZXJjYXNlY29udmVydGVyLnRzIiwiY29udmVydGVycy9sb3dlcmNhc2Vjb252ZXJ0ZXIudHMiLCJjb252ZXJ0ZXJzL3VwcGVyY2FzZWNvbnZlcnRlci50cyIsImNvbnZlcnRlcnMvdG9zdHJpbmdjb252ZXJ0ZXIudHMiLCJjb252ZXJ0ZXJzL3BpcGVsaW5lY29udmVydGVyLnRzIiwiY29udmVydGVycy9leHByZXNzaW9uY29udmVydGVyLnRzIiwidmlzdWFsdHJlZS92aXN1YWx0cmVlLnRzIiwidmlzdWFsdHJlZS90ZW1wbGF0ZWNvbnRyb2wudHMiLCJhY3Rpb24vYWN0aW9uYmFzZS50cyIsImFjdGlvbi9zZXRwcm9wZXJ0eWFjdGlvbi50cyIsImFjdGlvbi9tdWx0aWFjdGlvbi50cyIsImFjdGlvbi9nb3Rvc3RhdGVhY3Rpb24udHMiLCJ0cmlnZ2VyL3Byb3BlcnR5Y2hhbmdlZHRyaWdnZXIudHMiLCJ0cmlnZ2VyL3N0YXRlY2hhbmdlZHRyaWdnZXIudHMiLCJ0cmlnZ2VyL2V2ZW50dHJpZ2dlci50cyIsInN0eWxlL3N0eWxlYmFzZS50cyIsInN0eWxlL3N0YXRlbWFuYWdlci50cyIsInN0eWxlL3Zpc3VhbHRyZWVzdHlsZS50cyIsInRlbXBsYXRlY29udHJvbHMvYnV0dG9uLnRzIiwidGVtcGxhdGVjb250cm9scy9wcm9ncmVzc2Jhci50cyIsInRlbXBsYXRlY29udHJvbHMvc2xpZGVyYmFyLnRzIiwiZmFjYWRlcy9iaW5kaW5nLnRzIiwiYm9vdHN0cmFwL3Byb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxTQUFTLENBc0JsQjtBQXRCRCxXQUFVLFNBQVMsRUFBQyxDQUFDO0lBRWpCLG9CQUEyQixJQUFVLEVBQUUsTUFBNkI7UUFBN0Isc0JBQTZCLEdBQTdCLHFCQUE2QjtRQUNoRSxJQUFJLENBQUMsR0FBTztZQUNSLElBQUksRUFBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsQ0FBQztZQUN4QixJQUFJLEVBQUcsSUFBSSxDQUFD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QUFJLDZDQUFtQyxFQUFFLENBQUMsQ0FBQztRQUV4RSxNQUFNLENBQUMsSUFBSSxtQ0FBeUIsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDM0YsQ0FBQztJQTNCZSw2Q0FBbUMsc0NBMkJsRCxDQUFBO0FBRUwsQ0FBQyxFQS9CUyxTQUFTLEtBQVQsU0FBUyxRQStCbEIiLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZTogRGF0ZSwgZm9ybWF0OiBzdHJpbmcgPSBcInl5eXktTU0tZGRcIikge1xuICAgICAgICBsZXQgbzphbnkgPSB7XG4gICAgICAgICAgICBcIk0rXCIgOiBkYXRlLmdldE1vbnRoKCkrMSwgLy9tb250aFxuICAgICAgICAgICAgXCJkK1wiIDogZGF0ZS5nZXREYXRlKCksICAgIC8vZGF5XG4gICAgICAgICAgICBcImgrXCIgOiBkYXRlLmdldEhvdXJzKCksICAgLy9ob3VyXG4gICAgICAgICAgICBcIm0rXCIgOiBkYXRlLmdldE1pbnV0ZXMoKSwgLy9taW51dGVcbiAgICAgICAgICAgIFwicytcIiA6IGRhdGUuZ2V0U2Vjb25kcygpLCAvL3NlY29uZFxuICAgICAgICAgICAgXCJxK1wiIDogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpKzMpLzMpLCAgLy9xdWFydGVyXG4gICAgICAgICAgICBcIlNcIiA6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLy9taWxsaXNlY29uZFxuICAgICAgICB9O1xuICAgICAgICBpZigvKHkrKS8udGVzdChmb3JtYXQpKSBmb3JtYXQ9Zm9ybWF0LnJlcGxhY2UoUmVnRXhwLiQxLFxuICAgICAgICAgICAgKGRhdGUuZ2V0RnVsbFllYXIoKStcIlwiKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKTtcbiAgICAgICAgZm9yKHZhciBrIGluIG8paWYobmV3IFJlZ0V4cChcIihcIisgayArXCIpXCIpLnRlc3QoZm9ybWF0KSlcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFJlZ0V4cC4kMSxcbiAgICAgICAgICAgICAgICBSZWdFeHAuJDEubGVuZ3RoPT0xID8gb1trXSA6XG4gICAgICAgICAgICAgICAgICAgIChcIjAwXCIrIG9ba10pLnN1YnN0cigoXCJcIisgb1trXSkubGVuZ3RoKSk7XG4gICAgICAgIHJldHVybiBmb3JtYXQ7XG5cbiAgICB9XG4gICAgXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGV2ZW50VHJhbnNwYXJlbnREaXYoZGl2U2VsZWN0b3I6YW55KSB7XG4gICAgICAgICQoZGl2U2VsZWN0b3IpLmNzcyhcImZpbHRlclwiLFwiQWxwaGEob3BhY2l0eT0wKVwiKTtcbiAgICAgICAgJChkaXZTZWxlY3RvcikuY3NzKFwicG9pbnRlci1ldmVudHNcIixcIm5vbmVcIik7XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgY2xhc3MgRXZlbnRJdGVtIHtcbiAgICAgICAgbmFtZSA6IHN0cmluZztcbiAgICAgICAgcHJpdmF0ZSBhcmdzOiBhbnk7XG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2tsaXN0Okxpc3Q8KGFyZ3M6YW55KT0+dm9pZD4gPSBuZXcgTGlzdDwoYXJnczphbnkpPT52b2lkPigpO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgYXJnczphbnkpIHtcbiAgICAgICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50QnVzIHtcbiAgICAgICAgY2FsbGJhY2sgOiBMaXN0PEV2ZW50SXRlbT4gPSBuZXcgTGlzdDxFdmVudEl0ZW0+KCk7XG5cbiAgICAgICAgcHViKG5hbWU6c3RyaW5nICxhcmdzOmFueSkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5hZGQobmV3IEV2ZW50SXRlbShuYW1lLCBhcmdzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdWIobmFtZTpzdHJpbmcsIGNhbGxiYWNrOihhcmdzOmFueSk9PnZvaWQpIHtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcmlnZ2VyIGltcGxlbWVudHMgRGlzcG9zYWJsZXtcclxuICAgICAgICBhY3Rpb246QWN0aW9uO1xyXG4gICAgICAgIGFic3RyYWN0IGluaXQoKTp2b2lkO1xyXG4gICAgICAgIG9uVHJpZ2dlcmVkKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbi5leGVjdXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYWJzdHJhY3QgZGlzcG9zZSgpOnZvaWQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250cm9sVHJpZ2dlciBleHRlbmRzIFRyaWdnZXIge1xyXG4gICAgICAgIGNvbnRyb2w6Q29udHJvbDtcclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBlbnVtIEhvcml6b25BbGlnbm1lbnQge1xuICAgICAgICBTdHJlY2gsXG4gICAgICAgIExlZnQsXG4gICAgICAgIFJpZ2h0LFxuICAgICAgICBDZW50ZXJcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBWZXJ0aWNhbEFsaWdubWVudHtcbiAgICAgICAgU3RyZWNoLFxuICAgICAgICBUb3AsXG4gICAgICAgIEJvdHRvbSxcbiAgICAgICAgQ2VudGVyXG4gICAgfVxuXG4gICAgZXhwb3J0IGVudW0gRGlzdGFuY2VUeXBle1xuICAgICAgICBhdXRvLFxuICAgICAgICBmaXhlZCxcbiAgICAgICAgd2VpZ2h0XG4gICAgfVxuXG4gICAgZXhwb3J0IGVudW0gU3RhY2tQYW5lbE9yaWVudGF0aW9uIHtcbiAgICAgICAgSG9yaXpvbmFsLFxuICAgICAgICBWZXJ0aWNhbFxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBTaGFkb3dTZXR0aW5ncyB7XG4gICAgICAgIHR5cGU6c3RyaW5nO1xuICAgICAgICB4b2Zmc2V0Om51bWJlcjtcbiAgICAgICAgeW9mZnNldDpudW1iZXI7XG4gICAgICAgIGJsdXI6bnVtYmVyO1xuICAgICAgICBzcHJlYWQ6bnVtYmVyO1xuICAgICAgICBjb2xvcjpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IoeG9mZnNldDpudW1iZXIseW9mZnNldDpudW1iZXIsYmx1cjpudW1iZXIsc3ByZWFkOm51bWJlcixjb2xvcjpzdHJpbmcsdHlwZTpzdHJpbmc9XCJvdXRzZXRcIikge1xuICAgICAgICAgICAgdGhpcy54b2Zmc2V0ID0geG9mZnNldDtcbiAgICAgICAgICAgIHRoaXMueW9mZnNldCA9IHlvZmZzZXQ7XG4gICAgICAgICAgICB0aGlzLmJsdXIgPSBibHVyO1xuICAgICAgICAgICAgdGhpcy5zcHJlYWQgPSBzcHJlYWQ7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9Cb3hTaGF3ZG93U3RyaW5nKCk6c3RyaW5nIHtcbiAgICAgICAgICAgIGxldCBzID0gXCJcIjtcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZT09XCJpbnNldFwiKSBzKz1cImluc2V0IFwiO1xuICAgICAgICAgICAgcys9dGhpcy54b2Zmc2V0K1wicHggXCI7XG4gICAgICAgICAgICBzKz10aGlzLnlvZmZzZXQrXCJweCBcIjtcbiAgICAgICAgICAgIHMrPXRoaXMuYmx1citcInB4IFwiO1xuICAgICAgICAgICAgcys9dGhpcy5zcHJlYWQrXCJweCBcIjtcbiAgICAgICAgICAgIHMrPXRoaXMuY29sb3IrXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEJydXNoe1xuICAgICAgICBhcHBseVRvQmFja2dyb3VuZChlbGVtOkhUTUxFbGVtZW50KTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOlRoaWNrbmVzcyk6dm9pZDtcbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOm51bWJlcik6dm9pZDtcbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOkhUTUxFbGVtZW50LHRoaWNrbmVzczpudW1iZXIpOnZvaWQ7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgVGhpY2tuZXNze1xuICAgICAgICBsZWZ0Om51bWJlcjtcbiAgICAgICAgcmlnaHQ6bnVtYmVyO1xuICAgICAgICB0b3A6bnVtYmVyO1xuICAgICAgICBib3R0b206bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIGJvdHRvbTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgICAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgICAgICAgICAgdGhpcy50b3AgPSB0b3A7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaXN0YW5jZXtcbiAgICAgICAgdmFsdWU6bnVtYmVyO1xuICAgICAgICB0eXBlOkRpc3RhbmNlVHlwZTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBEaXN0YW5jZVR5cGUsIHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuIiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgTWV0YURhdGFBcGl7XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgU2xvdCB7XG4gICAgICAgIGNoaWxkcmVuOkxpc3Q8Q29udHJvbD4gPSBuZXcgTGlzdDxDb250cm9sPigpO1xuICAgICAgICBpc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA6IGJvb2xlYW47XG4gICAgICAgIGlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA6IGJvb2xlYW47XG4gICAgICAgIGNhbHVsYXRlZFNsb3RXaWR0aCA6IG51bWJlcjtcbiAgICAgICAgY2FsdWxhdGVkU2xvdEhlaWdodCA6IG51bWJlcjtcbiAgICAgICAgY29udGFpbmVyIDogQ29udGFpbmVyQ29udHJvbDtcblxuICAgICAgICBhZGRDaGlsZChjaGlsZCA6IENvbnRyb2wpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5hZGQoY2hpbGQpO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdCA9IHRoaXM7XG4gICAgICAgICAgICAvLyBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGQoY2hpbGQgOiBDb250cm9sKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucmVtb3ZlKGNoaWxkKTtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZW1wdHkoKTp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBQcm9wZXJ0eUNoYW5nZWRDYWxsYmFja0l0ZW0ge1xuICAgICAgICBjYWxsYmFjazpGdW5jdGlvbjtcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0eU5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEV2ZW50Q2FsbGJhY2tJdGVtIHtcbiAgICAgICAgY2FsbGJhY2s6RnVuY3Rpb247XG4gICAgICAgIGV2ZW50TmFtZTpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBldmVudE5hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgRnJhbWV3b3JrRWxlbWVudCB7XG4gICAgICAgIC8vIE5hbWUgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICBuYW1lOnN0cmluZztcbiAgICAgICAgLy8gV2lkdGggb2YgdGhpcyBDb250cm9sLCBpdCBjYW4gYmUgYSBmaXggdmFsdWUgb3IgYXV0by5cbiAgICAgICAgcHJpdmF0ZSBfd2lkdGg6RGlzdGFuY2U7XG4gICAgICAgIC8vIEhlaWdodCBvZiB0aGlzIENvbnRyb2wsIGl0IGNhbiBiZSBhIGZpeCB2YWx1ZSBvciBhdXRvLlxuICAgICAgICBwcml2YXRlIF9oZWlnaHQ6RGlzdGFuY2U7XG4gICAgICAgIC8vIEhvcml6b25hbCBhbGlnbm1lbnQgb2YgdGhpcyBjb250cm9sIGluIGl0J3MgcGFyZW50IGNvbnRhaW5lclxuICAgICAgICBwcml2YXRlIF9ob3Jpem9uQWxpZ25tZW50IDogSG9yaXpvbkFsaWdubWVudDtcbiAgICAgICAgLy8gVmVydGljYWwgYWxpZ25tZW50IG9mIHRoaXMgY29udHJvbCBpbiBpdCdzIHBhcmVudCBjb250YWluZXJcbiAgICAgICAgcHJpdmF0ZSBfdmVydGljYWxBbGlnbm1lbnQgOiBWZXJ0aWNhbEFsaWdubWVudDtcbiAgICAgICAgLy8gTWFyZ2luIG9mIHRoaXMgY29udHJvbCB0byBpdCdzIHBhcmVudCwgdGhlIHZhbHVlIGluIHRoaWNrbmVzcyBtdXN0IGJlIGEgZml4IHZhbHVlLlxuICAgICAgICBwcml2YXRlIF9tYXJnaW46VGhpY2tuZXNzO1xuICAgICAgICBwcml2YXRlIF9wcmVzc2VkOmJvb2xlYW47XG4gICAgICAgIHByaXZhdGUgX21vdXNlZW50ZXI6Ym9vbGVhbjtcblxuICAgICAgICBwcm90ZWN0ZWQgbm90aWZ5UHJvcGVydGllczpBcnJheTxzdHJpbmc+PVtdO1xuXG4gICAgICAgIHByaXZhdGUgcHJvcENoYW5nZWRDYWxsYmFja3M6TGlzdDxQcm9wZXJ0eUNoYW5nZWRDYWxsYmFja0l0ZW0+O1xuICAgICAgICBwcml2YXRlIGV2ZW50Q2FsbGJhY2tzOkxpc3Q8RXZlbnRDYWxsYmFja0l0ZW0+O1xuXG4gICAgICAgIHBhcmVudFNsb3Q6U2xvdDtcbiAgICAgICAgcGFyZW50OkNvbnRhaW5lckNvbnRyb2w7XG4gICAgICAgIGFjdHVhbENvbnRhaW5lcjpDb250YWluZXJDb250cm9sO1xuICAgICAgICAvLyByb290IGRpdiBvZiB0aGlzIGNvbnRyb2wuXG4gICAgICAgIHJvb3RFbGVtOkhUTUxFbGVtZW50O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIC8vIEluaXQgdmFpcmFibGVzLlxuICAgICAgICAgICAgdGhpcy5faG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdGhpcy5fdmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLl9tYXJnaW4gPSBuZXcgVGhpY2tuZXNzKDAsMCwwLDApO1xuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLDUwKTtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsNTApO1xuXG4gICAgICAgICAgICB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tzID0gbmV3IExpc3Q8UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2tJdGVtPigpO1xuICAgICAgICAgICAgdGhpcy5ldmVudENhbGxiYWNrcyA9IG5ldyBMaXN0PEV2ZW50Q2FsbGJhY2tJdGVtPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHdpZHRoKCk6IExheW91dEx6Zy5EaXN0YW5jZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgd2lkdGgodmFsdWU6IExheW91dEx6Zy5EaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBoZWlnaHQoKTogTGF5b3V0THpnLkRpc3RhbmNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgaGVpZ2h0KHZhbHVlOiBMYXlvdXRMemcuRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGhvcml6b25BbGlnbm1lbnQoKTogTGF5b3V0THpnLkhvcml6b25BbGlnbm1lbnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hvcml6b25BbGlnbm1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgaG9yaXpvbkFsaWdubWVudCh2YWx1ZTogTGF5b3V0THpnLkhvcml6b25BbGlnbm1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hvcml6b25BbGlnbm1lbnQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB2ZXJ0aWNhbEFsaWdubWVudCgpOiBMYXlvdXRMemcuVmVydGljYWxBbGlnbm1lbnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2FsQWxpZ25tZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHZlcnRpY2FsQWxpZ25tZW50KHZhbHVlOiBMYXlvdXRMemcuVmVydGljYWxBbGlnbm1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2FsQWxpZ25tZW50ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgbWFyZ2luKCk6IExheW91dEx6Zy5UaGlja25lc3Mge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcmdpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBtYXJnaW4odmFsdWU6IExheW91dEx6Zy5UaGlja25lc3MpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmdpbiA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHByZXNzZWQoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJlc3NlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBwcmVzc2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmVzc2VkID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgbW91c2VlbnRlcigpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb3VzZWVudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IG1vdXNlZW50ZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX21vdXNlZW50ZXIgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVzdGltYXRlIHRoZSB3aWR0aCBvZiB0aGlzIGNvbnRyb2wsXG4gICAgICAgIC8vIHRoZSBzaXplIG9mIHRoaXMgY29udHJvbCBpcyBkZXRlcm1pbmVkIGJ5IG1hbnkgZmFjdG9ycyxcbiAgICAgICAgLy8gZm9yIGV4YW1wbGUgOiBhdXRvL2ZpeCB2YWx1ZSBvZiB3aWR0aC9oZWlnaHQsIHBhcmVudCBjb250YWluZXIsIGhvcml6b25hbC92ZXJ0aWNhbCBhbGlnbm1lbnRzLCBtYXJnaW5z44CCXG4gICAgICAgIC8vIEZvciBkaWZmZXJlbnQgdHlwZXMgb2YgcGFyZW50IGNvbnRhaW5lcnMsIHRoZSBtZXRob2Qgb2Ygc2l6ZSBlc3RpbWF0aW9uIGFyZSB0b3RhbGx5IGRpZmZlcmVudC5cbiAgICAgICAgZXN0aW1hdGVXaWR0aCgpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVzdGltYXRlIHRoZSB3aWR0aCBvZiB0aGlzIGNvbnRyb2wsXG4gICAgICAgIC8vIHRoZSBzaXplIG9mIHRoaXMgY29udHJvbCBpcyBkZXRlcm1pbmVkIGJ5IG1hbnkgZmFjdG9ycyxcbiAgICAgICAgLy8gZm9yIGV4YW1wbGUgOiBhdXRvL2ZpeCB2YWx1ZSBvZiB3aWR0aC9oZWlnaHQsIHBhcmVudCBjb250YWluZXIsIGhvcml6b25hbC92ZXJ0aWNhbCBhbGlnbm1lbnRzLCBtYXJnaW5z44CCXG4gICAgICAgIC8vIEZvciBkaWZmZXJlbnQgdHlwZXMgb2YgcGFyZW50IGNvbnRhaW5lcnMsIHRoZSBtZXRob2Qgb2Ygc2l6ZSBlc3RpbWF0aW9uIGFyZSB0b3RhbGx5IGRpZmZlcmVudC5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTpudW1iZXJ7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCB0aGUgcm9vdCBlbGVtZW50IG9mIHRoaXMgY29udHJvbC5cbiAgICAgICAgYWJzdHJhY3QgZ2V0Um9vdEVsZW1lbnQoKTpIVE1MRWxlbWVudDtcblxuICAgICAgICAvLyBBc3NlbWJsZSBodG1sIGVsZW1lbnRzIG9mIHRoaXMgY29udHJvbC5cbiAgICAgICAgYXNzZW1ibGVEb20oKTp2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkanVzdCBzdHlsZXMgaHRtbCBlbGVtZW50cyBvZiB0aGlzIGNvbnRyb2wuXG4gICAgICAgIGRvTGF5b3V0KCk6dm9pZHtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFN0YXRlUHJvcGVydGllcygpOkFycmF5PHN0cmluZz4ge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Tm90aWZ5UHJvcGVydGllcygpOkFycmF5PHN0cmluZz4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm90aWZ5UHJvcGVydGllcztcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKHByb3BlcnROYW1lOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcy5hZGQoXG4gICAgICAgICAgICAgICAgbmV3IFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrSXRlbShwcm9wZXJ0TmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIoY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgbGV0IGVsZW06UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2tJdGVtID0gbnVsbDtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3BjYWxsYmFja2l0ZW0gb2YgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIGlmKHByb3BjYWxsYmFja2l0ZW0uY2FsbGJhY2s9PWNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBwcm9wY2FsbGJhY2tpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGVsZW0hPW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tzLnJlbW92ZShlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFN0YXRlQ2hhbmdlZExpc3RlbmVyKHByb3BlcnR5TmFtZTpzdHJpbmcsIGNhbGxiYWNrOkZ1bmN0aW9uKTp2b2lkIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlU3RhdGVDaGFuZ2VkTGlzdGVuZXIoY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuXG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgbm90aWZ5UHJvcGVydHlDaGFuZ2VkKHByb3BlcnR5TmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3BjYWxsYmFja2l0ZW0gb2YgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIGlmKHByb3BjYWxsYmFja2l0ZW0ucHJvcGVydHlOYW1lPT1wcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvcGNhbGxiYWNraXRlbS5jYWxsYmFjaykgcHJvcGNhbGxiYWNraXRlbS5jYWxsYmFjayhwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5ldmVudENhbGxiYWNrcy5hZGQoXG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50Q2FsbGJhY2tJdGVtKGV2ZW50TmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihjYWxsYmFjazpGdW5jdGlvbik6dm9pZCB7XG4gICAgICAgICAgICBsZXQgZXZlbnRzID0gdGhpcy5ldmVudENhbGxiYWNrcy5maWx0ZXIodD0+dC5jYWxsYmFjaz09Y2FsbGJhY2spO1xuICAgICAgICAgICAgaWYoZXZlbnRzLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudENhbGxiYWNrcy5yZW1vdmUoZXZlbnRzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCByYWlzZUV2ZW50KGV2ZW50TmFtZTpzdHJpbmcsYXJnczpBcnJheTxhbnk+PVtdKXtcbiAgICAgICAgICAgIGZvciAobGV0IGV2ZW50Y2FsbGJhY2tpdGVtIG9mIHRoaXMuZXZlbnRDYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBpZihldmVudGNhbGxiYWNraXRlbS5ldmVudE5hbWU9PWV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihldmVudGNhbGxiYWNraXRlbS5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZ2FyciA9IFtldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYXJnIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdhcnIucHVzaChhcmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRjYWxsYmFja2l0ZW0uY2FsbGJhY2suYXBwbHkodGhpcyxhcmdhcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29udHJvbCBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBvZiBhbGwgdGhlIHZpc3VhbCBjb21wb25lbnRzLlxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250cm9sIGV4dGVuZHMgRnJhbWV3b3JrRWxlbWVudCBpbXBsZW1lbnRzIERpc3Bvc2FibGV7XG5cbiAgICAgICAgLy8gQmFja2dyb3VuZCBvZiB0aGlzIGNvbnRyb2wsIGl0IGNhbiBiZSBhIHNvbGlkIGNvbG9yLCBvciBhIGdyYWRpZW50IGNvbG9yICwgb3IgYSBwaWN0dXJlLlxuICAgICAgICBwcm90ZWN0ZWQgX2ZpbGw6QnJ1c2g7XG4gICAgICAgIC8vIEJvcmRlciBvZiB0aGlzIGNvbnRyb2wsIGl0IGNhbiBiZSBhIHNvbGlkIGNvbG9yLCBvciBhIGdyYWRpZW50IGNvbG9yICwgb3IgYSBwaWN0dXJlLlxuICAgICAgICBwcm90ZWN0ZWQgX3N0cm9rZTpCcnVzaDtcbiAgICAgICAgLy8gVGhpY2tuZXNzIG9mIHRoaXMgY29udHJvbCdzIGJvcmRlciwgdGhlIHZhbHVlIGluIHRoaWNrbmVzcyBtdXN0IGJlIGEgZml4IHZhbHVlLlxuICAgICAgICBwcm90ZWN0ZWQgX3N0cm9rZVRoaWNrbmVzczpUaGlja25lc3M7XG5cbiAgICAgICAgcHJvdGVjdGVkIF9zaGFkb3c6U2hhZG93U2V0dGluZ3M7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpe1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKDAsMCwwLDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGZpbGwoKTogTGF5b3V0THpnLkJydXNoIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGZpbGwodmFsdWU6IExheW91dEx6Zy5CcnVzaCkge1xuICAgICAgICAgICAgaWYodGhpcy5fZmlsbCAhPSB2YWx1ZSkgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQoXCJmaWxsXCIpO1xuICAgICAgICAgICAgdGhpcy5fZmlsbCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHN0cm9rZSgpOiBMYXlvdXRMemcuQnJ1c2gge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cm9rZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBzdHJva2UodmFsdWU6IExheW91dEx6Zy5CcnVzaCkge1xuICAgICAgICAgICAgaWYodGhpcy5fc3Ryb2tlICE9IHZhbHVlKSB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChcInN0cm9rZVwiKTtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHN0cm9rZVRoaWNrbmVzcygpOiBMYXlvdXRMemcuVGhpY2tuZXNzIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJva2VUaGlja25lc3M7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgc3Ryb2tlVGhpY2tuZXNzKHZhbHVlOiBMYXlvdXRMemcuVGhpY2tuZXNzKSB7XG4gICAgICAgICAgICBpZih0aGlzLl9zdHJva2VUaGlja25lc3MgIT0gdmFsdWUpIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2VkKFwic3Ryb2tlVGhpY2tuZXNzXCIpO1xuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlVGhpY2tuZXNzID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc2hhZG93KCk6IExheW91dEx6Zy5TaGFkb3dTZXR0aW5ncyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHNoYWRvdyh2YWx1ZTpTaGFkb3dTZXR0aW5ncykge1xuICAgICAgICAgICAgdGhpcy5fc2hhZG93PXZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3QgZGlzcG9zZSgpOiB2b2lkO1xuICAgIH1cblxuICAgIC8vIFRoZSBwdXJwb3NlIG9mIHRoZSBjb250YWluZXIgaXMgdG8gcHV0IHN1YiBjb250cm9scyB0b2dldGhlcixcbiAgICAvLyBhbmQgdGhlIHN5c3RlbSBwcm92aWRlcyBtdWx0aXBsZSBsYXlvdXQgY29udGFpbmVycyBkdWUgdG8gYWN0dWFsIHJlcXVpcmVtZW50cy5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29udGFpbmVyQ29udHJvbCBleHRlbmRzIENvbnRyb2x7XG4gICAgICAgIGNoaWxkcmVuOkxpc3Q8Q29udHJvbD47XG4gICAgICAgIHByb3RlY3RlZCBzbG90cyA6IExpc3Q8U2xvdD47XG5cblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gbmV3IExpc3Q8Q29udHJvbD4oKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdHMgPSBuZXcgTGlzdDxTbG90PigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2hpbGQoY29udHJvbDpDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmFkZChjb250cm9sKTtcbiAgICAgICAgICAgIGNvbnRyb2wucGFyZW50ID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNoaWxkKGNvbnRyb2w6Q29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5yZW1vdmUoY29udHJvbCk7XG4gICAgICAgICAgICBjb250cm9sLnBhcmVudCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhckNoaWxkKCk6dm9pZHtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5wYXJlbnRTbG90KSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRDYWxjdWxhYmxlU2xvdHMoKTp2b2lkIHtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHRlc3RMaXN0KCk6dm9pZHtcblxuICAgICAgICBsZXQgbGl0ZXJhbDEgPSBuZXcgTGF5b3V0THpnLlRleHRWaWV3KCdhJywnMTExMTEnKTtcbiAgICAgICAgbGV0IGxpdGVyYWwyID0gbmV3IExheW91dEx6Zy5UZXh0VmlldygnYScsJzIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyJyk7XG4gICAgICAgIGxldCBsaXRlcmFsMyA9IG5ldyBMYXlvdXRMemcuVGV4dFZpZXcoJ2EnLCczMzMzMzMzMzMzJyk7XG5cblxuICAgICAgICBsZXQgbHN0ID0gbmV3IExpc3Q8VGV4dFZpZXc+KCk7XG4gICAgICAgIGxzdC5hZGQobGl0ZXJhbDEpO1xuICAgICAgICBsc3QuYWRkKGxpdGVyYWwyKTtcbiAgICAgICAgbHN0LmFkZChsaXRlcmFsMyk7XG4gICAgICAgIGxzdC5jbGVhcigpO1xuICAgIH1cblxuXG4gICAgZXhwb3J0IGNsYXNzIExpc3Q8VD4gZXh0ZW5kcyBBcnJheTxUPntcblxuICAgICAgICBhZGQoaXRlbTpUKSA6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEFsbChpdGVtczpBcnJheTxUPikgOiB2b2lkIHtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8aXRlbXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZShpdGVtOlQpOnZvaWQge1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VyaXRlbSA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgaWYoY3VyaXRlbT09aXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUFsbChpdGVtczpBcnJheTxUPikgOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8aXRlbXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhcigpIDp2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLnNwbGljZSgwLHRoaXMubGVuZ3RoKTtcbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHRlc3RtYXAoKTp2b2lke1xuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcDxzdHJpbmcsbnVtYmVyPigpO1xuICAgICAgICBtYXAucHV0KCdhJywzMyk7XG4gICAgICAgIG1hcC5wdXQoJ2InLDQzKTtcbiAgICAgICAgbGV0IGIgPSBtYXAuZ2V0KCdiJyk7XG4gICAgICAgIGxldCBhID0gbWFwLmdldCgnYScpO1xuICAgICAgICBtYXAuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBjbGFzcyBNYXBJdGVtPFRLZXksVFZhbHVlPiB7XG4gICAgICAgIGtleSA6IFRLZXk7XG4gICAgICAgIHZhbHVlIDogVFZhbHVlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGtleTogVEtleSwgdmFsdWU6IFRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgTWFwPFRLZXksVFZhbHVlPiBleHRlbmRzIEFycmF5PE1hcEl0ZW08VEtleSxUVmFsdWU+PntcblxuICAgICAgICBwdXQoa2V5OlRLZXksIHZhbHVlOlRWYWx1ZSkgOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChuZXcgTWFwSXRlbShrZXksdmFsdWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldChrZXk6VEtleSkgOiBUVmFsdWUgfCBhbnkge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0ua2V5PT1rZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyKCkgOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoMCx0aGlzLmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluc0tleShrZXk6VEtleSk6Ym9vbGVhbiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5rZXk9PWtleSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBTb2xpZENvbG9yQnJ1c2ggaW1wbGVtZW50cyBCcnVzaHtcbiAgICAgICAgY29sb3I6c3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb2xvcjpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JhY2tncm91bmQoZWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXIoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogTGF5b3V0THpnLlRoaWNrbmVzcyk6IHZvaWQge1xuICAgICAgICAgICAgJChlbGVtKS5jc3MoXCJib3JkZXItY29sb3JcIiwgdGhpcy5jb2xvcik7XG5cbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLWxlZnQtd2lkdGhcIiwgdGhpY2tuZXNzLmxlZnQrXCJweFwiKTtcbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLXJpZ2h0LXdpZHRoXCIsIHRoaWNrbmVzcy5yaWdodCtcInB4XCIpO1xuICAgICAgICAgICAgJChlbGVtKS5jc3MoXCJib3JkZXItdG9wLXdpZHRoXCIsIHRoaWNrbmVzcy50b3ArXCJweFwiKTtcbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLWJvdHRvbS13aWR0aFwiLCB0aGlja25lc3MuYm90dG9tK1wicHhcIik7XG5cbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLWxlZnQtc3R5bGVcIiwgXCJzb2xpZFwiKTtcbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLXJpZ2h0LXN0eWxlXCIsIFwic29saWRcIik7XG4gICAgICAgICAgICAkKGVsZW0pLmNzcyhcImJvcmRlci10b3Atc3R5bGVcIiwgXCJzb2xpZFwiKTtcbiAgICAgICAgICAgICQoZWxlbSkuY3NzKFwiYm9yZGVyLWJvdHRvbS1zdHlsZVwiLCBcInNvbGlkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgY2xhc3MgSW1hZ2VDb2xvckJydXNoIGltcGxlbWVudHMgQnJ1c2h7XG4gICAgICAgIGNvbG9yOnN0cmluZztcbiAgICAgICAgY29uc3RydWN0b3IoY29sb3I6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9CYWNrZ3JvdW5kKGVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXIoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogTGF5b3V0THpnLlRoaWNrbmVzcyk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgY2xhc3MgR3JhZGllbnRDb2xvckJydXNoIGltcGxlbWVudHMgQnJ1c2h7XG4gICAgICAgIGNvbG9yOnN0cmluZztcbiAgICAgICAgY29uc3RydWN0b3IoY29sb3I6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9CYWNrZ3JvdW5kKGVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IExheW91dEx6Zy5UaGlja25lc3MpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJMZWZ0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclJpZ2h0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclRvcChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJCb3R0b20oZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250cm9sQmFzZSBleHRlbmRzIENvbnRyb2wge1xuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVIZWlnaHRfYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVIZWlnaHRfYXV0bygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYodGhpcy5yb290RWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5jc3MoXCJib3gtc2l6aW5nXCIsXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IGVzdGltYXRlV2lkdGhfYXV0bygpOiBudW1iZXI7XG5cbiAgICAgICAgYWJzdHJhY3QgZXN0aW1hdGVIZWlnaHRfYXV0bygpOiBudW1iZXI7XG5cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQgeyBcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBUZXh0VmlldyBleHRlbmRzIENvbnRyb2xCYXNlIHtcblxuICAgICAgICBwcml2YXRlIF90ZXh0OnN0cmluZztcbiAgICAgICAgcHJpdmF0ZSBfc2VsZWN0YWJsZTpib29sZWFuO1xuICAgICAgICBwcml2YXRlIF93b3JkV3JhcDpib29sZWFuO1xuICAgICAgICBwcml2YXRlIHNwYW5FbGVtOkhUTUxFbGVtZW50O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZyx0ZXh0OnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdGV4dDtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0aWVzLnB1c2goXCJ0ZXh0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHRleHQodmFsdWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHNlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0YWJsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBzZWxlY3RhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RhYmxlID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgd29yZFdyYXAoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd29yZFdyYXA7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgd29yZFdyYXAodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3dvcmRXcmFwID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290RWxlbSA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC10eXBlJywnVGV4dFZpZXcnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgICAgIC8vIGV2ZW50VHJhbnNwYXJlbnREaXYodGhpcy5yb290RWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zcGFuRWxlbSA9ICQoXCI8c3Bhbj48L3NwYW4+XCIpWzBdO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmVtcHR5KCk7XG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMud2lkdGgudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2hlaWdodCcsdGhpcy5oZWlnaHQudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKHRoaXMuc3BhbkVsZW0pO1xuICAgICAgICAgICAgJCh0aGlzLnNwYW5FbGVtKS50ZXh0KHRoaXMuX3RleHQpO1xuICAgICAgICAgICAgaWYodGhpcy5fd29yZFdyYXApXG4gICAgICAgICAgICAgICAgJCh0aGlzLnNwYW5FbGVtKS5jc3MoJ3dvcmQtYnJlYWsnLCdicmVhay1hbGwnKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAkKHRoaXMuc3BhbkVsZW0pLmNzcygnd29yZC1icmVhaycsJ25vcm1hbCcpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmRvTGF5b3V0KCk7XG4gICAgICAgICAgICBpZighdGhpcy5fc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgICQodGhpcy5zcGFuRWxlbSkuY3NzKFwidXNlci1zZWxlY3RcIixcIm5vbmVcIik7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLnNwYW5FbGVtKS5jc3MoXCJ1c2VyLXNlbGVjdFwiLFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHRfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5maW5kKCdzcGFuJykuaGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoX2F1dG8oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuZmluZCgnc3BhbicpLndpZHRoKCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcbiAgICBleHBvcnQgY2xhc3MgUmVjdCBleHRlbmRzIENvbnRyb2xCYXNlIHtcblxuICAgICAgICBwcml2YXRlIF9yYWRpdXNfYm90dG9tX2xlZnQ6bnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9yYWRpdXNfYm90dG9tX3JpZ2h0Om51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfcmFkaXVzX3RvcF9sZWZ0Om51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfcmFkaXVzX3RvcF9yaWdodDpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX29wYWNpdHk6bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfYm90dG9tX2xlZnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX2JvdHRvbV9yaWdodCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfdG9wX2xlZnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX3RvcF9yaWdodCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0IHJhZGl1c19ib3R0b21fbGVmdCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1c19ib3R0b21fbGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCByYWRpdXNfYm90dG9tX2xlZnQodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX2JvdHRvbV9sZWZ0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgcmFkaXVzX2JvdHRvbV9yaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1c19ib3R0b21fcmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcmFkaXVzX2JvdHRvbV9yaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfYm90dG9tX3JpZ2h0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgcmFkaXVzX3RvcF9sZWZ0KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmFkaXVzX3RvcF9sZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHJhZGl1c190b3BfbGVmdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfdG9wX2xlZnQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCByYWRpdXNfdG9wX3JpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmFkaXVzX3RvcF9yaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCByYWRpdXNfdG9wX3JpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c190b3BfcmlnaHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCByYWRpdXModmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzX2JvdHRvbV9sZWZ0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfYm90dG9tX3JpZ2h0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXNfdG9wX2xlZnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1c190b3BfcmlnaHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBvcGFjaXR5KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBvcGFjaXR5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX29wYWNpdHkgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGxldCBlbGVtID0gc3VwZXIuZ2V0Um9vdEVsZW1lbnQoKTtcbiAgICAgICAgICAgICQoZWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdSZWN0Jyk7XG4gICAgICAgICAgICAkKGVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmRvTGF5b3V0KCk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd3aWR0aCcsdGhpcy5lc3RpbWF0ZVdpZHRoKCkrJ3B4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdoZWlnaHQnLHRoaXMuZXN0aW1hdGVIZWlnaHQoKSsncHgnKTtcbiAgICAgICAgICAgIC8vIHN0cm9rZSBhbmQgZmlsbFxuICAgICAgICAgICAgaWYodGhpcy5maWxsKSB0aGlzLmZpbGwuYXBwbHlUb0JhY2tncm91bmQodGhpcy5yb290RWxlbSk7XG4gICAgICAgICAgICBpZih0aGlzLnN0cm9rZSkgdGhpcy5zdHJva2UuYXBwbHlUb0JvcmRlcih0aGlzLnJvb3RFbGVtLHRoaXMuc3Ryb2tlVGhpY2tuZXNzKTtcbiAgICAgICAgICAgIC8vIHJhZGl1c1xuICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5jc3MoXCJib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzXCIsdGhpcy5yYWRpdXNfYm90dG9tX2xlZnQrXCJweFwiKTtcbiAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuY3NzKFwiYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXNcIix0aGlzLnJhZGl1c19ib3R0b21fcmlnaHQrXCJweFwiKTtcbiAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuY3NzKFwiYm9yZGVyLXRvcC1sZWZ0LXJhZGl1c1wiLHRoaXMucmFkaXVzX3RvcF9sZWZ0K1wicHhcIik7XG4gICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmNzcyhcImJvcmRlci10b3AtcmlnaHQtcmFkaXVzXCIsdGhpcy5yYWRpdXNfdG9wX3JpZ2h0K1wicHhcIik7XG4gICAgICAgICAgICAvLyBvcGFjaXR5XG4gICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmNzcyhcIm9wYWNpdHlcIix0aGlzLm9wYWNpdHkpO1xuICAgICAgICAgICAgLy8gc2hhZG93XG4gICAgICAgICAgICBpZih0aGlzLnNoYWRvdykge1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuY3NzKFwiYm94LXNoYWRvd1wiLHRoaXMuc2hhZG93LnRvQm94U2hhd2Rvd1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHRfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoX2F1dG8oKTogbnVtYmVyIHtcbiAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcbiAgICBleHBvcnQgY2xhc3MgSW1hZ2VWaWV3IGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuXG4gICAgICAgIGltZ0VsZW06SFRNTEVsZW1lbnQ7XG4gICAgICAgIHNyYzpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQgeyBcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuXG4gICAgICAgICAgICBpZih0aGlzLmltZ0VsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltZ0VsZW0gPSAkKFwiPGltZy8+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5pbWdFbGVtKS5hdHRyKCdzcmMnLHRoaXMuc3JjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5hcHBlbmQodGhpcy5pbWdFbGVtKTtcbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMud2lkdGgudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmltZ0VsZW0pLmNzcygnd2lkdGgnLHRoaXMud2lkdGgudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkKHRoaXMuaW1nRWxlbSkuY3NzKCd3aWR0aCcsJzEwMCUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmhlaWdodC52YWx1ZSsncHgnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMuaW1nRWxlbSkuY3NzKCdoZWlnaHQnLHRoaXMuaGVpZ2h0LnZhbHVlKydweCcpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmltZ0VsZW0pLmNzcygnaGVpZ2h0JywnMTAwJScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHRfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoX2F1dG8oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbnRhaW5lckJhc2UgZXh0ZW5kcyBDb250YWluZXJDb250cm9sIHtcblxuICAgICAgICByb290RWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVIZWlnaHRfYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlSGVpZ2h0X2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBlc3RpbWF0ZVdpZHRoX2F1dG8oKTpudW1iZXIgO1xuXG4gICAgICAgIGFic3RyYWN0IGVzdGltYXRlSGVpZ2h0X2F1dG8oKTpudW1iZXIgO1xuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBCb3JkZXIgZXh0ZW5kcyBDb250YWluZXJDb250cm9sIHtcblxuICAgICAgICB3cmFwcGVyRG9tcyA6IEFycmF5PEhUTUxFbGVtZW50PjtcbiAgICAgICAgcHJvdGVjdGVkIG1haW5TbG90IDogU2xvdDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLm1haW5TbG90ID0gbmV3IFNsb3QoKTtcbiAgICAgICAgICAgIHRoaXMubWFpblNsb3QuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdCb3JkZXInKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgICAgIC8vIGV2ZW50VHJhbnNwYXJlbnREaXYodGhpcy5yb290RWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgYWRkQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAgICAgdGhpcy5tYWluU2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRDYWxjdWxhYmxlU2xvdHMoKTp2b2lkIHtcblxuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgJiYgdGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSAmJiB0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlckRvbXMgPSBbXTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXJEaXYgPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgICAgICAgICAgJCh3cmFwcGVyRGl2KS5hdHRyKCdsYXlvdXQtdGFnJywnd3JhcHBlcicpO1xuICAgICAgICAgICAgICAgIC8vIGV2ZW50VHJhbnNwYXJlbnREaXYod3JhcHBlckRpdik7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyRG9tcy5wdXNoKHdyYXBwZXJEaXYpO1xuICAgICAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5hcHBlbmQod3JhcHBlckRpdik7XG4gICAgICAgICAgICAgICAgJCh3cmFwcGVyRGl2KS5hcHBlbmQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3dpZHRoJyx0aGlzLmVzdGltYXRlV2lkdGgoKSsncHgnKTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2hlaWdodCcsdGhpcy5lc3RpbWF0ZUhlaWdodCgpKydweCcpO1xuXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlckRpdiA9IHRoaXMud3JhcHBlckRvbXNbaV07XG5cbiAgICAgICAgICAgICAgICAkKHdyYXBwZXJEaXYpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuY3NzKCdsZWZ0JyxjaGlsZC5tYXJnaW4ubGVmdCsncHgnKTtcbiAgICAgICAgICAgICAgICAkKHdyYXBwZXJEaXYpLmNzcygncmlnaHQnLGNoaWxkLm1hcmdpbi5yaWdodCsncHgnKTtcbiAgICAgICAgICAgICAgICAkKHdyYXBwZXJEaXYpLmNzcygndG9wJyxjaGlsZC5tYXJnaW4udG9wKydweCcpO1xuICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuY3NzKCdib3R0b20nLGNoaWxkLm1hcmdpbi5ib3R0b20rJ3B4Jyk7XG5cbiAgICAgICAgICAgICAgICBjaGlsZC5kb0xheW91dCgpO1xuXG4gICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICBpZihjaGlsZC5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2hpbGQuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5DZW50ZXIpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdyA9IGNoaWxkLmVzdGltYXRlV2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHd3ID0gdGhpcy5lc3RpbWF0ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gKHd3LXcpLzI7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdsZWZ0Jyx4KydweCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGNoaWxkLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3ApIHtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcsJzBweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2JvdHRvbScsJzBweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygndG9wJywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdib3R0b20nLCcwcHgnKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGggPSBjaGlsZC5lc3RpbWF0ZUhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGggPSB0aGlzLmVzdGltYXRlSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gKGhoLWgpLzI7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd0b3AnLHkrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5SaWdodClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5lc3RpbWF0ZVdpZHRoKCkrdC5tYXJnaW4ubGVmdCt0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlV2lkdGgoKSArIHQubWFyZ2luLmxlZnQgKyB0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHdpZHRobGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3BcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlSGVpZ2h0KCkrdC5tYXJnaW4udG9wK3QubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlSGVpZ2h0KCkgKyB0Lm1hcmdpbi50b3AgKyB0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBjbGFzcyBTbG90SXRlbSB7XG4gICAgICAgIHNsb3RCb3JkZXI6Qm9yZGVyO1xuICAgICAgICBzbG90RGVmaW5hdGlvbjpEaXN0YW5jZTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihzbG90Qm9yZGVyOiBCb3JkZXIsIHNsb3REZWZpbmF0aW9uOiBEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5zbG90Qm9yZGVyID0gc2xvdEJvcmRlcjtcbiAgICAgICAgICAgIHRoaXMuc2xvdERlZmluYXRpb24gPSBzbG90RGVmaW5hdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBIb3Jpem9uYWxMaW5lYXJMYXlvdXQgZXh0ZW5kcyBDb250YWluZXJCYXNlIHtcblxuICAgICAgICBzbG90TWFwIDogTWFwPFNsb3QsU2xvdEl0ZW0+O1xuICAgICAgICBib3JkZXJFbGVtOkhUTUxFbGVtZW50O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdE1hcCA9IG5ldyBNYXA8U2xvdCwgU2xvdEl0ZW0+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDZWxsKGRpc3RhbmNlOkRpc3RhbmNlKSB7XG4gICAgICAgICAgICBsZXQgc2xvdCA9IG5ldyBTbG90KCk7XG4gICAgICAgICAgICBzbG90LmNvbnRhaW5lciA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnNsb3RzLmFkZChzbG90KTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnNsb3RNYXAuY29udGFpbnNLZXkoc2xvdCkpXG4gICAgICAgICAgICAgICAgdGhpcy5zbG90TWFwLnB1dChzbG90LG5ldyBTbG90SXRlbShudWxsLG51bGwpKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgIGl0ZW0uc2xvdERlZmluYXRpb24gPSBkaXN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5yZW1vdmVDaGlsZChjb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyQ2hpbGQoKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5jbGVhckNoaWxkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRDZWxsKGNvbnRyb2w6Q29udHJvbCwgY2VsbEluZGV4Om51bWJlcikge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbY2VsbEluZGV4XTtcbiAgICAgICAgICAgICAgICBzbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYodGhpcy5yb290RWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtdHlwZScsJ0hvcml6b25hbExpbmVhckxheW91dCcpO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LW5hbWUnLHRoaXMubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRDYWxjdWxhYmxlU2xvdHMoKTp2b2lkIHtcbiAgICAgICAgICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZSpjZWxsRGVmaW5hdGlvbi52YWx1ZS93ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgJiYgdGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSAmJiB0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcblxuICAgICAgICAgICAgLy8gaW5pdCB2YXJpYWJsZXMgYW5kIGh0bWxlbGVtZW50c1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmVtcHR5KCk7XG4gICAgICAgICAgICBpZih0aGlzLmJvcmRlckVsZW09PW51bGwpIHRoaXMuYm9yZGVyRWxlbSA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcblxuICAgICAgICAgICAgLy8gYWRkIGNlbGwgd3JhcHBlciBkaXZzIHRvIHJvb3RFbGVtXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IG5ldyBCb3JkZXIoJycpO1xuICAgICAgICAgICAgICAgIGJvcmRlci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmFwcGVuZChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSk7XG5cbiAgICAgICAgICAgICAgICBpdGVtLnNsb3RCb3JkZXIgPSBib3JkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCBjaGlsZHJlbiByb290RWxlbXMgdG8gY2VsbCB3cmFwcGVyc1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBpdGVtLnNsb3RCb3JkZXI7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci5hZGRDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGl0ZW0uc2xvdEJvcmRlciA9IGJvcmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgd2VpZ2h0U3VtIGFuZCBmaXhTdW1cbiAgICAgICAgICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuICAgICAgICAgICAgbGV0IGZpeFN1bSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIGZpeFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvLyBzZXQgcm9vdEVsZW0gc3R5bGVzXG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd3aWR0aCcsdGhpcy5lc3RpbWF0ZVdpZHRoKCkrJ3B4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdoZWlnaHQnLHRoaXMuZXN0aW1hdGVIZWlnaHQoKSsncHgnKTtcblxuICAgICAgICAgICAgLy8gc2V0IGJvcmRlciBhbmQgYmFja2dyb3VuZCBzdHlsZXNcbiAgICAgICAgICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCd0b3AnLCcwcHgnKTtcbiAgICAgICAgICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ2JvdHRvbScsJzBweCcpO1xuICAgICAgICAgICAgaWYodGhpcy5zdHJva2Upe1xuICAgICAgICAgICAgICAgIHRoaXMuc3Ryb2tlLmFwcGx5VG9Cb3JkZXIodGhpcy5ib3JkZXJFbGVtLHRoaXMuc3Ryb2tlVGhpY2tuZXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuZmlsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxsLmFwcGx5VG9CYWNrZ3JvdW5kKHRoaXMuYm9yZGVyRWxlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IGl0ZW0uc2xvdEJvcmRlcjtcblxuICAgICAgICAgICAgICAgICQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgICQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpLmNzcygndG9wJywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdib3R0b20nLCcwcHgnKTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbHcgPSAwO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsdz1jZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgY2VsbHcgPSAodGhpcy5lc3RpbWF0ZVdpZHRoKCkgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdsZWZ0Jyxwb3MrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxjZWxsdyk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgICAgICBib3JkZXIudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QgPSBzbG90O1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuZXN0aW1hdGVIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gY2VsbHc7XG5cbiAgICAgICAgICAgICAgICBwb3MrPWNlbGx3O1xuICAgICAgICAgICAgICAgIGJvcmRlci5kb0xheW91dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlSGVpZ2h0X2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZUhlaWdodF9hdXRvKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHRfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlSGVpZ2h0KCkgKyB0Lm1hcmdpbi50b3AgKyB0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVXaWR0aF9hdXRvKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZVdpZHRoKCkgKyB0Lm1hcmdpbi5sZWZ0ICsgdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGNsYXNzIFNsb3RJdGVtIHtcbiAgICAgICAgc2xvdEJvcmRlcjpCb3JkZXI7XG4gICAgICAgIHNsb3REZWZpbmF0aW9uOkRpc3RhbmNlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHNsb3RCb3JkZXI6IEJvcmRlciwgc2xvdERlZmluYXRpb246IERpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLnNsb3RCb3JkZXIgPSBzbG90Qm9yZGVyO1xuICAgICAgICAgICAgdGhpcy5zbG90RGVmaW5hdGlvbiA9IHNsb3REZWZpbmF0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFZlcnRpY2FsbGluZWFybGF5b3V0MiBleHRlbmRzIEJvcmRlcntcbiAgICAgICAgc2xvdE1hcCA6IE1hcDxTbG90LFNsb3RJdGVtPjtcbiAgICAgICAgYm9yZGVyRWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAgPSBuZXcgTWFwPFNsb3QsIFNsb3RJdGVtPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2VsbChkaXN0YW5jZTpEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zbG90TWFwLmNvbnRhaW5zS2V5KHNsb3QpKVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdE1hcC5wdXQoc2xvdCxuZXcgU2xvdEl0ZW0obmV3IEJvcmRlcihcIkxpbmVhckNlbGxcIiksbnVsbCkpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgaXRlbS5zbG90RGVmaW5hdGlvbiA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgc3VwZXIuYWRkQ2hpbGQoaXRlbS5zbG90Qm9yZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmFkZChjb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnJlbW92ZShjb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyQ2hpbGQoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRDZWxsKGNvbnRyb2w6Q29udHJvbCwgY2VsbEluZGV4Om51bWJlcikge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbY2VsbEluZGV4XTtcbiAgICAgICAgICAgICAgICBzbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBpdGVtLnNsb3RCb3JkZXIuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbml0Q2FsY3VsYWJsZVNsb3RzKCk6dm9pZCB7XG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWUqY2VsbERlZmluYXRpb24udmFsdWUvd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSAmJiB0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHdlaWdodFN1bSBhbmQgZml4U3VtXG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IGl0ZW0uc2xvdEJvcmRlcjtcblxuICAgICAgICAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLmVzdGltYXRlSGVpZ2h0KCkgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYm9yZGVyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgICAgIGJvcmRlci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLGNlbGxoKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGJvcmRlci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlRvcDtcblxuICAgICAgICAgICAgICAgIHBvcys9Y2VsbGg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmRvTGF5b3V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5SaWdodClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5lc3RpbWF0ZVdpZHRoKCkrdC5tYXJnaW4ubGVmdCt0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRobGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVXaWR0aCgpICsgdC5tYXJnaW4ubGVmdCArIHQubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRobGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuZXN0aW1hdGVIZWlnaHQoKSt0Lm1hcmdpbi50b3ArdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZUhlaWdodCgpICsgdC5tYXJnaW4udG9wICsgdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFZlcnRpY2FsTGluZWFyTGF5b3V0IGV4dGVuZHMgQ29udGFpbmVyQ29udHJvbCB7XG5cbiAgICAgICAgc2xvdE1hcCA6IE1hcDxTbG90LFNsb3RJdGVtPjtcbiAgICAgICAgYm9yZGVyRWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAgPSBuZXcgTWFwPFNsb3QsIFNsb3RJdGVtPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2VsbChkaXN0YW5jZTpEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zbG90TWFwLmNvbnRhaW5zS2V5KHNsb3QpKVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdE1hcC5wdXQoc2xvdCxuZXcgU2xvdEl0ZW0obnVsbCxudWxsKSk7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICBpdGVtLnNsb3REZWZpbmF0aW9uID0gZGlzdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIucmVtb3ZlQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhckNoaWxkKCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuY2xlYXJDaGlsZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0Q2VsbChjb250cm9sOkNvbnRyb2wsIGNlbGxJbmRleDpudW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjb250cm9sKTtcbiAgICAgICAgICAgIGlmKGlkeD4tMSl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2NlbGxJbmRleF07XG4gICAgICAgICAgICAgICAgc2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdWZXJ0aWNhbExpbmVhckxheW91dCcpO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LW5hbWUnLHRoaXMubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRDYWxjdWxhYmxlU2xvdHMoKTp2b2lkIHtcbiAgICAgICAgICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZSpjZWxsRGVmaW5hdGlvbi52YWx1ZS93ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgJiYgdGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG5cbiAgICAgICAgICAgIC8vIGluaXQgdmFyaWFibGVzIGFuZCBodG1sZWxlbWVudHNcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuICAgICAgICAgICAgaWYodGhpcy5ib3JkZXJFbGVtPT1udWxsKSB0aGlzLmJvcmRlckVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG5cbiAgICAgICAgICAgIC8vIGFkZCBjZWxsIHdyYXBwZXIgZGl2cyB0byByb290RWxlbVxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBuZXcgQm9yZGVyKCcnKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5hcHBlbmQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpO1xuXG4gICAgICAgICAgICAgICAgaXRlbS5zbG90Qm9yZGVyID0gYm9yZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRyZW4gcm9vdEVsZW1zIHRvIGNlbGwgd3JhcHBlcnNcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gaXRlbS5zbG90Qm9yZGVyO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXIuYWRkQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpdGVtLnNsb3RCb3JkZXIgPSBib3JkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHdlaWdodFN1bSBhbmQgZml4U3VtXG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gc2V0IHJvb3RFbGVtIHN0eWxlc1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMuZXN0aW1hdGVXaWR0aCgpKydweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmVzdGltYXRlSGVpZ2h0KCkrJ3B4Jyk7XG5cbiAgICAgICAgICAgIC8vIHNldCBib3JkZXIgYW5kIGJhY2tncm91bmQgc3R5bGVzXG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygndG9wJywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdib3R0b20nLCcwcHgnKTtcbiAgICAgICAgICAgIGlmKHRoaXMuc3Ryb2tlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cm9rZS5hcHBseVRvQm9yZGVyKHRoaXMuYm9yZGVyRWxlbSx0aGlzLnN0cm9rZVRoaWNrbmVzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmZpbGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsbC5hcHBseVRvQmFja2dyb3VuZCh0aGlzLmJvcmRlckVsZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBpdGVtLnNsb3RCb3JkZXI7XG5cbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxoID0gMDtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoID0gKHRoaXMuZXN0aW1hdGVIZWlnaHQoKSAtIGZpeFN1bSkqIGNlbGxEZWZpbmF0aW9uLnZhbHVlIC8gd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcscG9zKydweCcpO1xuICAgICAgICAgICAgICAgIGJvcmRlci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxjZWxsaCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90ID0gc2xvdDtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5lc3RpbWF0ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gY2VsbGg7XG5cbiAgICAgICAgICAgICAgICBwb3MrPWNlbGxoO1xuICAgICAgICAgICAgICAgIGJvcmRlci5kb0xheW91dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuZXN0aW1hdGVXaWR0aCgpK3QubWFyZ2luLmxlZnQrdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlV2lkdGgoKSArIHQubWFyZ2luLmxlZnQgKyB0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3BcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlSGVpZ2h0KCkrdC5tYXJnaW4udG9wK3QubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVIZWlnaHQoKSArIHQubWFyZ2luLnRvcCArIHQubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIC8vIEJvcmRlcnMgdG8gY29udGFpbiBjaGlsZCBjb250cm9scywgY2VsbEJvcmRlckFycmF5Lmxlbmd0aCBpcyB0aGUgY2VsbHMgY291bnQuXG4gICAgICAgIC8vIGNlbGxCb3JkZXJBcnJheSA6IExpc3Q8Qm9yZGVyPjtcbiAgICAgICAgLy8gLy8gVGhlIGRpc3RhbmNlIGRlZmluYXRpb24gZm9yIGVhY2ggY2VsbHMuXG4gICAgICAgIC8vIGNlbGxEZWZpbmF0aW9uczpMaXN0PERpc3RhbmNlPjtcbiAgICAgICAgLy8gLy8gVGhlIGNlbGwgaW5kZXggb2YgZWFjaCBjaGlsZCBjb250cm9sIG9mIHRoaXMgY29udGFpbmVyLlxuICAgICAgICAvLyBjZWxsSW5kZXhBcnJheTpMaXN0PG51bWJlcj47XG4gICAgICAgIC8vIC8vIFRoZSBiYWNrZ3JvdWQgYW5kIGJvcmRlciBkaXYgZWxlbWVudC5cbiAgICAgICAgLy8gYm9yZGVyRWxlbTpIVE1MRWxlbWVudDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgLy8gICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAvLyAgICAgLy8gSW5pdCB2YXJpYWJsZXMuXG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxJbmRleEFycmF5PW5ldyBMaXN0PG51bWJlcj4oKTtcbiAgICAgICAgLy8gICAgIHRoaXMuY2VsbERlZmluYXRpb25zID0gbmV3IExpc3Q8RGlzdGFuY2U+KCk7XG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxCb3JkZXJBcnJheSA9IG5ldyBMaXN0PEJvcmRlcj4oKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvLyBBZGQgY2VsbCBkZWZpbmF0aW9uLiBUaGUgZGlzdGFuY2UgdHlwZSBjYW4gYmUgJ3dlaWdodCcgb3IgJ2ZpeCcuXG4gICAgICAgIC8vIGFkZENlbGwoZGlzdGFuY2U6RGlzdGFuY2UpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuY2VsbERlZmluYXRpb25zLnB1c2goZGlzdGFuY2UpO1xuICAgICAgICAvLyAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAvLyAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAvLyAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy8gQWRkIGNoaWxkIHRvIHRoaXMgY29udGFpbmVyLCBhbmQgdGhlIGNvbnRyb2wgaXMgYWRkZWQgdG8gdGhlIGZpcnN0IGNlbGwgYnkgZGVmYXVsdC5cbiAgICAgICAgLy8gYWRkQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgLy8gICAgIHN1cGVyLmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgdGhpcy5jZWxsSW5kZXhBcnJheS5wdXNoKDApO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIFJlbW92ZSBjaGlsZCBmcm9tIHRoaXMgY29udGFpbmVyLlxuICAgICAgICAvLyByZW1vdmVDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAvLyAgICAgc3VwZXIucmVtb3ZlQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIC8vICAgICBjb25zdCBpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY29udHJvbCk7XG4gICAgICAgIC8vICAgICBpZihpZHg+LTEpe1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2VsbEluZGV4QXJyYXkuc3BsaWNlKGlkeCwxKTtcbiAgICAgICAgLy8gICAgICAgICBpZihjb250cm9sLnBhcmVudFNsb3QpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29udHJvbC5wYXJlbnRTbG90LnJlbW92ZUNoaWxkKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvLyBSZW1vdmUgYWxsIGNoaWxkcmVuIGZyb20gdGhpcyBjb250YWluZXIuXG4gICAgICAgIC8vIGNsZWFyQ2hpbGQoKTogdm9pZCB7XG4gICAgICAgIC8vICAgICBzdXBlci5jbGVhckNoaWxkKCk7XG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxJbmRleEFycmF5LmNsZWFyKCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy8gU3BlY2lmeSAnY29udHJvbCcgdG8gdGhlICdjZWxsSW5kZXgnIGNlbGwuXG4gICAgICAgIC8vIHNldENlbGwoY29udHJvbDpDb250cm9sLCBjZWxsSW5kZXg6bnVtYmVyKSB7XG4gICAgICAgIC8vICAgICBjb25zdCBpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY29udHJvbCk7XG4gICAgICAgIC8vICAgICBpZihpZHg+LTEpe1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2VsbEluZGV4QXJyYXlbaWR4XSA9IGNlbGxJbmRleDtcbiAgICAgICAgLy8gICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbY2VsbEluZGV4XTtcbiAgICAgICAgLy8gICAgICAgICBzbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIEdldCB0aGUgcm9vdCBkaXYgb2YgdGhpcyBjb250YWluZXIuXG4gICAgICAgIC8vIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy8gICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAvLyAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdIb3Jpem9uYWxMaW5lYXJMYXlvdXQnKTtcbiAgICAgICAgLy8gICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gaW5pdENhbGN1bGFibGVTbG90cygpOnZvaWQge1xuICAgICAgICAvLyAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAvLyAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLmNlbGxEZWZpbmF0aW9uc1tpXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5bal07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5bal07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWUqY2VsbERlZmluYXRpb24udmFsdWUvd2VpZ2h0U3VtO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1lbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jZWxsRGVmaW5hdGlvbnMubGVuZ3RoO2krKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLmNlbGxEZWZpbmF0aW9uc1tpXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wO2o8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aisrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2pdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wO2o8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aisrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2pdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbEluZGV4QXJyYXlbal09PWkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgIC8vICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAvLyAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1lbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgJiYgdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gaW5pdCB2YXJpYWJsZXMgYW5kIGh0bWxlbGVtZW50c1xuICAgICAgICAvLyAgICAgdGhpcy5jZWxsQm9yZGVyQXJyYXkuY2xlYXIoKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuICAgICAgICAvLyAgICAgaWYodGhpcy5ib3JkZXJFbGVtPT1udWxsKSB0aGlzLmJvcmRlckVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgIC8vICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKHRoaXMuYm9yZGVyRWxlbSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBhZGQgY2VsbCB3cmFwcGVyIGRpdnMgdG8gcm9vdEVsZW1cbiAgICAgICAgLy8gICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgIGxldCBib3JkZXIgPSBuZXcgQm9yZGVyKCcnKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2VsbEJvcmRlckFycmF5LnB1c2goYm9yZGVyKTtcbiAgICAgICAgLy8gICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKGJvcmRlci5nZXRSb290RWxlbWVudCgpKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIGFkZCBjaGlsZHJlbiByb290RWxlbXMgdG8gY2VsbCB3cmFwcGVyc1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgaj0wO2o8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aisrKXtcbiAgICAgICAgLy8gICAgICAgICBsZXQgYm9yZGVyID0gdGhpcy5jZWxsQm9yZGVyQXJyYXlbdGhpcy5jZWxsSW5kZXhBcnJheVtqXV07XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgLy8gICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5hZGRDaGlsZChjaGlsZCk7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgIC8vICAgICAvLyBjYWxjdWxhdGUgd2VpZ2h0U3VtIGFuZCBmaXhTdW1cbiAgICAgICAgLy8gICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuICAgICAgICAvLyAgICAgbGV0IGZpeFN1bSA9IDA7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgZml4U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gc2V0IHJvb3RFbGVtIHN0eWxlc1xuICAgICAgICAvLyAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMuZXN0aW1hdGVXaWR0aCgpKydweCcpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmVzdGltYXRlSGVpZ2h0KCkrJ3B4Jyk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBzZXQgYm9yZGVyIGFuZCBiYWNrZ3JvdW5kIHN0eWxlc1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnbGVmdCcsJzBweCcpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncmlnaHQnLCcwcHgnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3RvcCcsJzBweCcpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnYm90dG9tJywnMHB4Jyk7XG4gICAgICAgIC8vICAgICBpZih0aGlzLnN0cm9rZSl7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zdHJva2UuYXBwbHlUb0JvcmRlcih0aGlzLmJvcmRlckVsZW0sdGhpcy5zdHJva2VUaGlja25lc3MpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgaWYodGhpcy5maWxsKXtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmZpbGwuYXBwbHlUb0JhY2tncm91bmQodGhpcy5ib3JkZXJFbGVtKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIHNldCBjZWxsIHdyYXBwZXIgc3R5bGVzXG4gICAgICAgIC8vICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtqKyspe1xuICAgICAgICAvLyAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuY2VsbERlZmluYXRpb25zW2pdO1xuICAgICAgICAvLyAgICAgICAgIGxldCBib3JkZXIgPSB0aGlzLmNlbGxCb3JkZXJBcnJheVtqXTtcbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNlbGxoID0gMDtcbiAgICAgICAgLy8gICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNlbGxoID0gKHRoaXMuZXN0aW1hdGVIZWlnaHQoKSAtIGZpeFN1bSkqIGNlbGxEZWZpbmF0aW9uLnZhbHVlIC8gd2VpZ2h0U3VtO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcscG9zKydweCcpO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLGNlbGxoKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIucGFyZW50U2xvdCA9IHRoaXMuc2xvdHNbal07XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMuZXN0aW1hdGVXaWR0aCgpO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IGNlbGxoO1xuICAgICAgICAvLyAgICAgICAgIHBvcys9Y2VsbGg7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLmRvTGF5b3V0KCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZXN0aW1hdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICAvLyAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlKXtcbiAgICAgICAgLy8gICAgICAgICBpZiAodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAvLyAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0XG4gICAgICAgIC8vICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KVxuICAgICAgICAvLyAgICAgICAgIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGg+MCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlV2lkdGgoKSt0Lm1hcmdpbi5sZWZ0K3QubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSBpZih0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZVdpZHRoKCkgKyB0Lm1hcmdpbi5sZWZ0ICsgdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyBlc3RpbWF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAvLyAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSl7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAvLyAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcFxuICAgICAgICAvLyAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSlcbiAgICAgICAgLy8gICAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuZXN0aW1hdGVIZWlnaHQoKSt0Lm1hcmdpbi50b3ArdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1lbHNlIGlmKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9ZWxzZXtcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAvLyAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZUhlaWdodCgpICsgdC5tYXJnaW4udG9wICsgdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgVmxpbmVhcmxheW91dCBleHRlbmRzIEJvcmRlcntcbiAgICAgICAgc2xvdE1hcCA6IE1hcDxTbG90LFNsb3RJdGVtPjtcbiAgICAgICAgdmNoaWxkcmVuOiBMaXN0PENvbnRyb2w+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnZjaGlsZHJlbiA9IG5ldyBMaXN0PENvbnRyb2w+KCk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAgPSBuZXcgTWFwPFNsb3QsIFNsb3RJdGVtPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudmNoaWxkcmVuLmFkZChjb250cm9sKTtcbiAgICAgICAgICAgIGNvbnRyb2wucGFyZW50ID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENlbGwoZGlzdGFuY2U6RGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBzbG90ID0gbmV3IFNsb3QoKTtcbiAgICAgICAgICAgIHNsb3QuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuYWRkKHNsb3QpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2xvdE1hcC5jb250YWluc0tleShzbG90KSlcbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RNYXAucHV0KHNsb3QsbmV3IFNsb3RJdGVtKG5ldyBCb3JkZXIoXCJMaW5lYXJDZWxsXCIpLG51bGwpKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgIGl0ZW0uc2xvdERlZmluYXRpb24gPSBkaXN0YW5jZTtcbiAgICAgICAgICAgIHN1cGVyLmFkZENoaWxkKGl0ZW0uc2xvdEJvcmRlcik7XG4gICAgICAgICAgICAvLyB0aGlzLmNoaWxkcmVuLmFkZChpdGVtLnNsb3RCb3JkZXIpO1xuICAgICAgICAgICAgLy8gaXRlbS5zbG90Qm9yZGVyLnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICAvLyBpdGVtLnNsb3RCb3JkZXIucGFyZW50U2xvdCA9IHRoaXMubWFpblNsb3Q7XG4gICAgICAgICAgICAvLyBpdGVtLnNsb3RCb3JkZXIuYWN0dWFsQ29udGFpbmVyID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldENlbGwoY29udHJvbDpDb250cm9sLCBjZWxsSW5kZXg6bnVtYmVyKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLnZjaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbY2VsbEluZGV4XTtcbiAgICAgICAgICAgICAgICBzbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBpdGVtLnNsb3RCb3JkZXIuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgICAgICAgICAgY29udHJvbC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBpbml0Q2FsY3VsYWJsZVNsb3RzKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbERlZmluYXRpb24udHlwZSA9PSBEaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWUqY2VsbERlZmluYXRpb24udmFsdWUvd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlICYmIHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMudmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLnZjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLnZjaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMudmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMudmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy52Y2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdXBlci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IGl0ZW0uc2xvdEJvcmRlcjtcblxuICAgICAgICAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLmVzdGltYXRlSGVpZ2h0KCkgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYm9yZGVyLm1hcmdpbiA9IG5ldyBUaGlja25lc3MoMCwwLHBvcywwKTtcbiAgICAgICAgICAgICAgICBib3JkZXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsY2VsbGgpO1xuICAgICAgICAgICAgICAgIGJvcmRlci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuVG9wO1xuXG4gICAgICAgICAgICAgICAgcG9zKz1jZWxsaDtcbiAgICAgICAgICAgICAgICBib3JkZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgIGJvcmRlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdXBlci5kb0xheW91dCgpO1xuICAgICAgICB9XG5cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgSGxpbmVhcmxheW91dCBleHRlbmRzIEJvcmRlcntcbiAgICAgICAgc2xvdE1hcCA6IE1hcDxTbG90LFNsb3RJdGVtPjtcbiAgICAgICAgdmNoaWxkcmVuOiBMaXN0PENvbnRyb2w+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnZjaGlsZHJlbiA9IG5ldyBMaXN0PENvbnRyb2w+KCk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAgPSBuZXcgTWFwPFNsb3QsIFNsb3RJdGVtPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudmNoaWxkcmVuLmFkZChjb250cm9sKTtcbiAgICAgICAgICAgIGNvbnRyb2wucGFyZW50ID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENlbGwoZGlzdGFuY2U6RGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBzbG90ID0gbmV3IFNsb3QoKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuYWRkKHNsb3QpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2xvdE1hcC5jb250YWluc0tleShzbG90KSlcbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RNYXAucHV0KHNsb3QsbmV3IFNsb3RJdGVtKG5ldyBCb3JkZXIoXCJMaW5lYXJDZWxsXCIpLG51bGwpKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgIGl0ZW0uc2xvdERlZmluYXRpb24gPSBkaXN0YW5jZTtcbiAgICAgICAgICAgIHNsb3QuY29udGFpbmVyID0gaXRlbS5zbG90Qm9yZGVyO1xuICAgICAgICAgICAgc3VwZXIuYWRkQ2hpbGQoaXRlbS5zbG90Qm9yZGVyKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY2hpbGRyZW4uYWRkKGl0ZW0uc2xvdEJvcmRlcik7XG4gICAgICAgICAgICAvLyBpdGVtLnNsb3RCb3JkZXIucGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgIC8vIGl0ZW0uc2xvdEJvcmRlci5wYXJlbnRTbG90ID0gdGhpcy5tYWluU2xvdDtcbiAgICAgICAgICAgIC8vIGl0ZW0uc2xvdEJvcmRlci5hY3R1YWxDb250YWluZXIgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0Q2VsbChjb250cm9sOkNvbnRyb2wsIGNlbGxJbmRleDpudW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMudmNoaWxkcmVuLmluZGV4T2YoY29udHJvbCk7XG4gICAgICAgICAgICBpZihpZHg+LTEpe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tjZWxsSW5kZXhdO1xuICAgICAgICAgICAgICAgIHNsb3QuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGl0ZW0uc2xvdEJvcmRlci5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgICAgICAgICBjb250cm9sLnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGluaXRDYWxjdWxhYmxlU2xvdHMoKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMud2lkdGgudmFsdWUqY2VsbERlZmluYXRpb24udmFsdWUvd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgJiYgdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3VwZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG4gICAgICAgICAgICBsZXQgZml4U3VtID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgZml4U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBpdGVtLnNsb3RCb3JkZXI7XG5cbiAgICAgICAgICAgICAgICBsZXQgY2VsbHcgPSAwO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsdz1jZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgY2VsbHcgPSAodGhpcy5lc3RpbWF0ZUhlaWdodCgpIC0gZml4U3VtKSogY2VsbERlZmluYXRpb24udmFsdWUgLyB3ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJvcmRlci5tYXJnaW4gPSBuZXcgVGhpY2tuZXNzKHBvcywwLDAsMCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgICAgIGJvcmRlci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLGNlbGx3KTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGJvcmRlci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlRvcDtcblxuICAgICAgICAgICAgICAgIHBvcys9Y2VsbHc7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3VwZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG59IiwiXG5uYW1lc3BhY2UgTGF5b3V0THpnLk9ic2VydmVyTW9kZWwge1xuXG4gICAgY29uc3QgY29uZmlnUHJvcGVydHlOYW1lOnN0cmluZyA9IFwiX19vYnNlcnZhYmxlX19cIjtcblxuXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyB7XG4gICAgICAgIG9iajphbnk7XG4gICAgICAgIHByb3BlcnR5TmFtZSA6IHN0cmluZztcbiAgICAgICAgb2xkVmFsdWUgOiBhbnk7XG4gICAgICAgIG5ld1ZhbHVlIDogYW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajphbnkscHJvcGVydHlOYW1lOiBzdHJpbmcsIG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICB0aGlzLm9sZFZhbHVlID0gb2xkVmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5ld1ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgT2JqZWN0Q29uZmlnIHtcbiAgICAgICAgcGFyZW50OmFueTtcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcbiAgICAgICAgcHJvcHM6YW55PXt9O1xuICAgICAgICBwcm9wQ2hhbmdlZENhbGxiYWNrTGlzdDpBcnJheTwoYXJnczpQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpPT52b2lkPjtcbiAgICAgICAgYXJydmFsdWVzOkFycmF5PGFueT4gPSBbXTtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3QgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuYXJydmFsdWVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBub3RpZnlQcm9wZXJ0eUNoYW5nZWQoYXJnczpQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpOnZvaWQge1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3RbaV07XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgY2ZnID0gZ2V0T2JqZWN0Q29uZmlnKGFyZ3Mub2JqKTtcbiAgICAgICAgICAgIGlmKGNmZy5wYXJlbnQpe1xuICAgICAgICAgICAgICAgIGxldCBwYXJlbnRDZmcgPSBnZXRPYmplY3RDb25maWcoY2ZnLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgcGFyZW50Q2ZnLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKFxuICAgICAgICAgICAgICAgICAgICBjZmcucGFyZW50LFxuICAgICAgICAgICAgICAgICAgICBjZmcucHJvcGVydHlOYW1lK1wiLlwiK2FyZ3MucHJvcGVydHlOYW1lLFxuICAgICAgICAgICAgICAgICAgICBhcmdzLm9sZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBhcmdzLm5ld1ZhbHVlXG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjayhjYWxsYmFjazooYXJnczpQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpPT52b2lkKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3QucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjayhjYWxsYmFjazooYXJnczpQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpPT52b2lkKTp2b2lkIHtcbiAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0LmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgaWYoaWR4Pi0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdC5zcGxpY2UoaWR4LDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRPYmplY3RDb25maWcob2JqOmFueSk6IE9iamVjdENvbmZpZyB7XG4gICAgICAgIGlmKCEoY29uZmlnUHJvcGVydHlOYW1lIGluIG9iaikpIHtcbiAgICAgICAgICAgIGxldCBjZmcgPSBuZXcgT2JqZWN0Q29uZmlnKCk7XG4gICAgICAgICAgICBvYmpbY29uZmlnUHJvcGVydHlOYW1lXSA9IGNmZztcbiAgICAgICAgICAgIC8vIG9ialtjb25maWdQcm9wZXJ0eU5hbWVdID0ge1xuICAgICAgICAgICAgLy8gICAgIHBhcmVudDpudWxsLFxuICAgICAgICAgICAgLy8gICAgIHByb3BlcnR5TmFtZTpudWxsLFxuICAgICAgICAgICAgLy8gICAgIHByb3BzOnt9LFxuICAgICAgICAgICAgLy8gICAgIHByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0IDogW10sXG4gICAgICAgICAgICAvLyAgICAgbm90aWZ5UHJvcGVydHlDaGFuZ2VkIDogZnVuY3Rpb24oYXJnczpQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGNhbGxiYWNrID0gdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdFtpXTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3MpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgIGxldCBjZmcgPSBnZXRPYmplY3RDb25maWcoYXJncy5vYmopO1xuICAgICAgICAgICAgLy8gICAgICAgICBpZihjZmcucGFyZW50KXtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxldCBwYXJlbnRDZmcgPSBnZXRPYmplY3RDb25maWcoY2ZnLnBhcmVudCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBwYXJlbnRDZmcubm90aWZ5UHJvcGVydHlDaGFuZ2VkKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgY2ZnLnBhcmVudCxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBjZmcucHJvcGVydHlOYW1lK1wiLlwiK2FyZ3MucHJvcGVydHlOYW1lLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGFyZ3Mub2xkVmFsdWUsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgYXJncy5uZXdWYWx1ZVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgIGFkZFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrIDogZnVuY3Rpb24gKGNhbGxiYWNrOihhcmdzOlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyk9PnZvaWQpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdC5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgIHJlbW92ZVByb3BlcnR5Q2hhbmdlZENhbGxiYWNrOiBmdW5jdGlvbiAoY2FsbGJhY2s6KGFyZ3M6UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKT0+dm9pZCkge1xuICAgICAgICAgICAgLy8gICAgICAgICBsZXQgaWR4ID0gdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdC5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYoaWR4Pi0xKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0LnNwbGljZShpZHgsMSk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmpbY29uZmlnUHJvcGVydHlOYW1lXTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gaW5qZWN0UHJvcGVydGllcyhvYmo6YW55KSB7XG4gICAgICAgIGlmIChvYmo9PW51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKHRvU3RyaW5nLmNhbGwob2JqKSE9XCJbb2JqZWN0IE9iamVjdF1cIikgcmV0dXJuO1xuICAgICAgICBsZXQgY2ZnID0gZ2V0T2JqZWN0Q29uZmlnKG9iaik7XG4gICAgICAgIGZvciAobGV0IHByb3BlcnR5TmFtZSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmKHByb3BlcnR5TmFtZT09Y29uZmlnUHJvcGVydHlOYW1lKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmKCFvYmouaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkgY29udGludWU7XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gb2JqW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICBpZih0b1N0cmluZy5jYWxsKHByb3BWYWx1ZSk9PSdbb2JqZWN0IEZ1bmN0aW9uXScpe1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfWVsc2UgaWYodG9TdHJpbmcuY2FsbChwcm9wVmFsdWUpPT0nW29iamVjdCBPYmplY3RdJyl7XG4gICAgICAgICAgICAgICAgaW5qZWN0UHJvcGVydGllcyhwcm9wVmFsdWUpO1xuICAgICAgICAgICAgfWVsc2UgaWYodG9TdHJpbmcuY2FsbChwcm9wVmFsdWUpPT0nW29iamVjdCBBcnJheV0nKXtcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHByb3BWYWx1ZSk7XG4gICAgICAgICAgICAgICAgb2JqW3Byb3BlcnR5TmFtZV0gPSBwcm9wVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICBpZigndmFsdWUnIGluIGRlc2NyaXB0b3Ipe1xuICAgICAgICAgICAgICAgIGxldCB0ID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmKHRvU3RyaW5nLmNhbGwodCk9PSdbb2JqZWN0IEZ1bmN0aW9uXScpe1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0IGluc3RhbmNlb2YgT2JzZXJ2YWJsZUFycmF5KXtcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlLmFkZEV2ZW50TGlzdGVuZXIoXCJpdGVtYWRkZWRcIixmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZmcubm90aWZ5UHJvcGVydHlDaGFuZ2VkKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mob2JqLCBwcm9wZXJ0eU5hbWUrXCIuKlwiLG51bGwsbnVsbCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlLmFkZEV2ZW50TGlzdGVuZXIoXCJpdGVtc2V0XCIsZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2ZnLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKG9iaiwgcHJvcGVydHlOYW1lK1wiLipcIixudWxsLG51bGwpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZS5hZGRFdmVudExpc3RlbmVyKFwiaXRlbXJlbW92ZWRcIixmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZmcubm90aWZ5UHJvcGVydHlDaGFuZ2VkKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mob2JqLCBwcm9wZXJ0eU5hbWUrXCIuKlwiLG51bGwsbnVsbCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZHZhbHVlIG9mIHByb3BWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvU3RyaW5nLmNhbGwoY2hpbGR2YWx1ZSkhPVwiW29iamVjdCBPYmplY3RdXCIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5qZWN0UHJvcGVydGllcyhjaGlsZHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZENmZyA9IGdldE9iamVjdENvbmZpZyhjaGlsZHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ2ZnLnBhcmVudCA9IG9iajtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ2ZnLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZStcIi4qXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0b1N0cmluZy5jYWxsKHByb3BWYWx1ZSk9PSdbb2JqZWN0IE9iamVjdF0nKXtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0UHJvcGVydGllcyhwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRDZmcgPSBnZXRPYmplY3RDb25maWcocHJvcFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDZmcucGFyZW50ID0gb2JqO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZENmZy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjZmcucHJvcHNbcHJvcGVydHlOYW1lXSA9IG9ialtwcm9wZXJ0eU5hbWVdO1xuXG4gICAgICAgICAgICAoZnVuY3Rpb24gKHByb3BlcnR5TmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLHByb3BlcnR5TmFtZSx7XG4gICAgICAgICAgICAgICAgICAgICdnZXQnOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRPYmplY3RDb25maWcodGhpcykucHJvcHNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ3NldCc6ZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RQcm9wZXJ0aWVzKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gZ2V0T2JqZWN0Q29uZmlnKHRoaXMpLnByb3BzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRPYmplY3RDb25maWcodGhpcykucHJvcHNbcHJvcGVydHlOYW1lXT12YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE9iamVjdENvbmZpZyh0aGlzKS5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KShwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZUFycmF5KGl0ZW1zKTphbnkge1xuICAgICAgICBsZXQgX3NlbGYgPSB0aGlzLFxuICAgICAgICAgICAgX2FycmF5ID0gW10sXG4gICAgICAgICAgICBfaGFuZGxlcnMgPSB7XG4gICAgICAgICAgICAgICAgaXRlbWFkZGVkOiBbXSxcbiAgICAgICAgICAgICAgICBpdGVtcmVtb3ZlZDogW10sXG4gICAgICAgICAgICAgICAgaXRlbXNldDogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZGVmaW5lSW5kZXhQcm9wZXJ0eShpbmRleCkgOiBhbnl7XG4gICAgICAgICAgICBpZiAoIShpbmRleCBpbiBfc2VsZikpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX3NlbGYsIGluZGV4LCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYXJyYXlbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hcnJheVtpbmRleF0gPSB2O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFpc2VFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpdGVtc2V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHZcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByYWlzZUV2ZW50KGV2ZW50KSA6IGFueXtcbiAgICAgICAgICAgIF9oYW5kbGVyc1tldmVudC50eXBlXS5mb3JFYWNoKGZ1bmN0aW9uKGgpIHtcbiAgICAgICAgICAgICAgICBoLmNhbGwoX3NlbGYsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9zZWxmLCBcImFkZEV2ZW50TGlzdGVuZXJcIiwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IChcIlwiICsgZXZlbnROYW1lKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmICghKGV2ZW50TmFtZSBpbiBfaGFuZGxlcnMpKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGV2ZW50IG5hbWUuXCIpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGhhbmRsZXIuXCIpO1xuICAgICAgICAgICAgICAgIF9oYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfc2VsZiwgXCJyZW1vdmVFdmVudExpc3RlbmVyXCIsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBldmVudE5hbWUgPSAoXCJcIiArIGV2ZW50TmFtZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoIShldmVudE5hbWUgaW4gX2hhbmRsZXJzKSkgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBldmVudCBuYW1lLlwiKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBoYW5kbGVyLlwiKTtcbiAgICAgICAgICAgICAgICBsZXQgaCA9IF9oYW5kbGVyc1tldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgIGxldCBsbiA9IGgubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlICgtLWxuID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhbbG5dID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoLnNwbGljZShsbiwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfc2VsZiwgXCJwdXNoXCIsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg7XG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwLCBsbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gX2FycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgX2FycmF5LnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lSW5kZXhQcm9wZXJ0eShpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHJhaXNlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpdGVtYWRkZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IGFyZ3VtZW50c1tpXVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9hcnJheS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfc2VsZiwgXCJwb3BcIiwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChfYXJyYXkubGVuZ3RoID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gX2FycmF5Lmxlbmd0aCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gX2FycmF5LnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX3NlbGZbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICByYWlzZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaXRlbXJlbW92ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9zZWxmLCBcInVuc2hpZnRcIiwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBsbjtcbiAgICAgICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IGxuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IGxuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgX2FycmF5LnNwbGljZShpLCAwLCBhcmd1bWVudHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICBkZWZpbmVJbmRleFByb3BlcnR5KF9hcnJheS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmFpc2VFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIml0ZW1hZGRlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiBhcmd1bWVudHNbaV1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgX2FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhaXNlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpdGVtc2V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IF9hcnJheVtpXVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9hcnJheS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfc2VsZiwgXCJzaGlmdFwiLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9hcnJheS5sZW5ndGggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IF9hcnJheS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX3NlbGZbX2FycmF5Lmxlbmd0aF07XG4gICAgICAgICAgICAgICAgICAgIHJhaXNlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpdGVtcmVtb3ZlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfc2VsZiwgXCJzcGxpY2VcIiwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGluZGV4LCBob3dNYW55IC8qLCBlbGVtZW50MSwgZWxlbWVudDIsIC4uLiAqLyApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVtb3ZlZDpBcnJheTxhbnk+ID0gW10sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW06YW55LFxuICAgICAgICAgICAgICAgICAgICBwb3M6YW55O1xuXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleCA9PSBudWxsID8gMCA6IGluZGV4IDwgMCA/IF9hcnJheS5sZW5ndGggKyBpbmRleCA6IGluZGV4O1xuXG4gICAgICAgICAgICAgICAgaG93TWFueSA9IGhvd01hbnkgPT0gbnVsbCA/IF9hcnJheS5sZW5ndGggLSBpbmRleCA6IGhvd01hbnkgPiAwID8gaG93TWFueSA6IDA7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoaG93TWFueS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBfYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX3NlbGZbX2FycmF5Lmxlbmd0aF07XG4gICAgICAgICAgICAgICAgICAgIHJhaXNlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpdGVtcmVtb3ZlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4ICsgcmVtb3ZlZC5sZW5ndGggLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgaSA9IDIsIGxuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IGxuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgX2FycmF5LnNwbGljZShpbmRleCwgMCwgYXJndW1lbnRzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lSW5kZXhQcm9wZXJ0eShfYXJyYXkubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIHJhaXNlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpdGVtYWRkZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IGFyZ3VtZW50c1tpXVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9zZWxmLCBcImxlbmd0aFwiLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfYXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbiA9IE51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IGxlbmd0aCA9IF9hcnJheS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKG4gJSAxID09PSAwICYmIG4gPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobiA8IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYuc3BsaWNlKG4pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4gPiBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLnB1c2guYXBwbHkoX3NlbGYsIG5ldyBBcnJheShuIC0gbGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkludmFsaWQgYXJyYXkgbGVuZ3RoXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfYXJyYXkubGVuZ3RoID0gbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKEFycmF5LnByb3RvdHlwZSkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIF9zZWxmKSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfc2VsZiwgbmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogQXJyYXkucHJvdG90eXBlW25hbWVdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpdGVtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBfc2VsZi5wdXNoLmFwcGx5KF9zZWxmLCBpdGVtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgb2JqOmFueTtcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBnZXRWYWx1ZSgpOmFueSA7XG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5U2V0dGVyIHtcbiAgICAgICAgb2JqOmFueTtcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBzZXRWYWx1ZSh2YWx1ZTphbnkpOnZvaWQ7XG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIGltcGxlbWVudHMgRGlzcG9zYWJsZXtcbiAgICAgICAgb2JqOmFueTtcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcbiAgICAgICAgcHJvdGVjdGVkIGNhbGxiYWNrOiBGdW5jdGlvbjtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5vYmogPSBvYmo7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKGxpc3RlbmVyOkZ1bmN0aW9uKTp2b2lke1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGxpc3RlbmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBzdGFydExpc3RlbigpOnZvaWQ7XG4gICAgICAgIGFic3RyYWN0IHN0b3BMaXN0ZW4oKTp2b2lkO1xuXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyIHtcbiAgICAgICAgYWJzdHJhY3QgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXI7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTpib29sZWFuO1xuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBVbml2ZXJzYWxQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcntcblxuICAgICAgICBwcml2YXRlIHByb3ZpZGVyczpMaXN0PFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzID0gbmV3IExpc3Q8UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcj4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3ZpZGVyKHByb3ZpZGVyOlByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMuYWRkKHByb3ZpZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3ZpZGVycyhwcm92aWRlcnM6QXJyYXk8UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcj4pOnZvaWR7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiBwcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYocHJvdmlkZXIuY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmosIHByb3BlcnR5TmFtZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyLmdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlHZXR0ZXJQcm92aWRlciB7XG4gICAgICAgIGFic3RyYWN0IGNhblByb3ZpZGVHZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6Ym9vbGVhbjtcbiAgICAgICAgYWJzdHJhY3QgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6IFByb3BlcnR5R2V0dGVyO1xuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVyIHtcbiAgICAgICAgYWJzdHJhY3QgY2FuUHJvdmlkZVNldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTpib29sZWFuO1xuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eVNldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTogUHJvcGVydHlTZXR0ZXI7XG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5UHJvdmlkZXIge1xuXG4gICAgICAgIGFic3RyYWN0IGNhblByb3ZpZGVHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhblxuXG4gICAgICAgIGFic3RyYWN0IGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5R2V0dGVyIDtcblxuICAgICAgICBhYnN0cmFjdCBjYW5Qcm92aWRlU2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4gO1xuXG4gICAgICAgIGFic3RyYWN0IGdldFByb3BlcnR5U2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5U2V0dGVyIDtcblxuICAgICAgICBhYnN0cmFjdCBjYW5Qcm92aWRlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiA7XG5cbiAgICAgICAgYWJzdHJhY3QgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgO1xuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFVuaXZlcnNhbFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVye1xuXG4gICAgICAgIHByaXZhdGUgcHJvdmlkZXJzOkxpc3Q8UHJvcGVydHlHZXR0ZXJQcm92aWRlcj47XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMgPSBuZXcgTGlzdDxQcm9wZXJ0eUdldHRlclByb3ZpZGVyPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXIocHJvdmlkZXI6UHJvcGVydHlHZXR0ZXJQcm92aWRlcik6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXJzKHByb3ZpZGVyczpBcnJheTxQcm9wZXJ0eUdldHRlclByb3ZpZGVyPik6dm9pZHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYocHJvdmlkZXIuY2FuUHJvdmlkZUdldHRlcihvYmosIHByb3BlcnR5TmFtZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBMYXlvdXRMemcuUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZihwcm92aWRlci5jYW5Qcm92aWRlR2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlci5nZXRQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBVbml2ZXJzYWxQcm9wZXJ0eVNldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJQcm92aWRlcntcbiAgICAgICAgcHJpdmF0ZSBwcm92aWRlcnM6TGlzdDxQcm9wZXJ0eVNldHRlclByb3ZpZGVyPjtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVycyA9IG5ldyBMaXN0PFByb3BlcnR5U2V0dGVyUHJvdmlkZXI+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm92aWRlcihwcm92aWRlcjpQcm9wZXJ0eVNldHRlclByb3ZpZGVyKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm92aWRlcnMocHJvdmlkZXJzOkFycmF5PFByb3BlcnR5U2V0dGVyUHJvdmlkZXI+KTp2b2lke1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgcHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMuYWRkKHByb3ZpZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZihwcm92aWRlci5jYW5Qcm92aWRlU2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5U2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5U2V0dGVyIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYocHJvdmlkZXIuY2FuUHJvdmlkZVNldHRlcihvYmosIHByb3BlcnR5TmFtZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXIuZ2V0UHJvcGVydHlTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgVW5pdmVyc2FsUHJvcGVydHlQcm92aWRlciBleHRlbmRzIFByb3BlcnR5UHJvdmlkZXJ7XG4gICAgICAgIHByaXZhdGUgcHJvcGVydHlHZXR0ZXJQcm92aWRlcjpQcm9wZXJ0eUdldHRlclByb3ZpZGVyO1xuICAgICAgICBwcml2YXRlIHByb3BlcnR5U2V0dGVyUHJvdmlkZXI6UHJvcGVydHlTZXR0ZXJQcm92aWRlcjtcbiAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyOlByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJvcGVydHlHZXR0ZXJQcm92aWRlcjogUHJvcGVydHlHZXR0ZXJQcm92aWRlcixcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlTZXR0ZXJQcm92aWRlcjogUHJvcGVydHlTZXR0ZXJQcm92aWRlcixcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcjogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcikge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlHZXR0ZXJQcm92aWRlciA9IHByb3BlcnR5R2V0dGVyUHJvdmlkZXI7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5U2V0dGVyUHJvdmlkZXIgPSBwcm9wZXJ0eVNldHRlclByb3ZpZGVyO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyID0gcHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZykgOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BlcnR5R2V0dGVyUHJvdmlkZXIuY2FuUHJvdmlkZUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUdldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKSA6IFByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BlcnR5R2V0dGVyUHJvdmlkZXIuZ2V0UHJvcGVydHlHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKSA6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlTZXR0ZXJQcm92aWRlci5jYW5Qcm92aWRlU2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5U2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpIDogUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlTZXR0ZXJQcm92aWRlci5nZXRQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZykgOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIuY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKSA6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIuZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJcblxubmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tV2lkdGhQcm9wZXJ0eUdldHRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICAgICAgICAgIGxldCBkb20gPSA8SFRNTEVsZW1lbnQ+dGhpcy5vYmo7XG4gICAgICAgICAgICByZXR1cm4gZG9tLm9mZnNldFdpZHRoO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tV2lkdGhQcm9wZXJ0eVNldHRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIGRvbS5zdHlsZS53aWR0aCA9IHZhbHVlK1wicHhcIjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVdpZHRoUHJvcGVydHlHZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBwcm9wZXJ0eU5hbWUgPT0gXCJ3aWR0aFwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVdpZHRoUHJvcGVydHlHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tV2lkdGhQcm9wZXJ0eVNldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcIndpZHRoXCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5U2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5U2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tV2lkdGhQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgZXhwb3J0IGNsYXNzIERvbUhlaWdodFByb3BlcnR5R2V0dGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFZhbHVlKCk6IGFueSB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgcmV0dXJuIGRvbS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tSGVpZ2h0UHJvcGVydHlTZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBkb20gPSA8SFRNTEVsZW1lbnQ+dGhpcy5vYmo7XG4gICAgICAgICAgICBkb20uc3R5bGUuaGVpZ2h0ID0gdmFsdWUrXCJweFwiO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tSGVpZ2h0UHJvcGVydHlHZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBwcm9wZXJ0eU5hbWUgPT0gXCJoZWlnaHRcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21IZWlnaHRQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21IZWlnaHRQcm9wZXJ0eVNldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcImhlaWdodFwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbUhlaWdodFByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgRG9tU2l6ZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJ7XG4gICAgICAgIHByaXZhdGUgZG9tOiBIVE1MRWxlbWVudDtcbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFja2Z1bjphbnk7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB0aGlzLmRvbSA9IDxIVE1MRWxlbWVudD5vYmo7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydExpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tmdW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5jYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxsYmFjay5hcHBseShzZWxmLmRvbSxbc2VsZi5kb21dKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkKHRoaXMuZG9tKS5yZXNpemUodGhpcy5jYWxsYmFja2Z1bik7XG4gICAgICAgIH1cblxuICAgICAgICBzdG9wTGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgJCh0aGlzLmRvbSkub2ZmKFwicmVzaXplXCIsdGhpcy5jYWxsYmFja2Z1bik7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21TaXplUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXJ7XG5cbiAgICAgICAgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21TaXplUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqLHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYocHJvcGVydHlOYW1lPT1cIndpZHRoXCJ8fHByb3BlcnR5TmFtZT09XCJoZWlnaHRcIil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVGV4dFByb3BlcnR5R2V0dGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRWYWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIGlmKGRvbS50YWdOYW1lPT1cIklOUFVUXCJ8fGRvbS50YWdOYW1lPT1cImlucHV0XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJChkb20pLnZhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICQoZG9tKS50ZXh0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21UZXh0UHJvcGVydHlTZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBkb20gPSA8SFRNTEVsZW1lbnQ+dGhpcy5vYmo7XG4gICAgICAgICAgICBpZihkb20udGFnTmFtZT09XCJJTlBVVFwifHxkb20udGFnTmFtZT09XCJpbnB1dFwiKSB7XG4gICAgICAgICAgICAgICAgJChkb20pLnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChkb20pLnRleHQodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVGV4dFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwidGV4dFwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVRleHRQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21UZXh0UHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBwcm9wZXJ0eU5hbWUgPT0gXCJ0ZXh0XCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5U2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5U2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tVGV4dFByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVRleHRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVye1xuICAgICAgICBwcml2YXRlIGRvbTogSFRNTEVsZW1lbnQ7XG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2tmdW46YW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy5kb20gPSA8SFRNTEVsZW1lbnQ+b2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrZnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsbGJhY2suYXBwbHkoc2VsZi5kb20sW3NlbGYuZG9tXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJCh0aGlzLmRvbSkuY2hhbmdlKHRoaXMuY2FsbGJhY2tmdW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcExpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgICAgICQodGhpcy5kb20pLm9mZihcInJlc2l6ZVwiLHRoaXMuY2FsbGJhY2tmdW4pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVGV4dFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xuXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tVGV4dFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iaixwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmKHByb3BlcnR5TmFtZT09XCJ0ZXh0XCIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIERvbVZhbHVlUHJvcGVydHlHZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFZhbHVlKCk6IGFueSB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgaWYoZG9tLnRhZ05hbWU9PVwiSU5QVVRcInx8ZG9tLnRhZ05hbWU9PVwiaW5wdXRcIikge1xuICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvbTtcbiAgICAgICAgICAgICAgICBpZihpbnB1dC50eXBlPT1cImRhdGVcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsdWVBc0RhdGU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoaW5wdXQudHlwZT09XCJjaGVja2JveFwiKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0LmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKGRvbSkudmFsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICQoZG9tKS50ZXh0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21WYWx1ZVByb3BlcnR5U2V0dGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgaWYoZG9tLnRhZ05hbWU9PVwiSU5QVVRcInx8ZG9tLnRhZ05hbWU9PVwiaW5wdXRcIikge1xuICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvbTtcbiAgICAgICAgICAgICAgICBpZihpbnB1dC50eXBlPT1cImRhdGVcIikge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGlucHV0LnR5cGU9PVwiY2hlY2tib3hcIil7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJChkb20pLnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKGRvbSkudGV4dCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21WYWx1ZVByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwidmFsdWVcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21WYWx1ZVByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVZhbHVlUHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBwcm9wZXJ0eU5hbWUgPT0gXCJ2YWx1ZVwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVZhbHVlUHJvcGVydHlTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVmFsdWVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVye1xuICAgICAgICBwcml2YXRlIGRvbTogSFRNTEVsZW1lbnQ7XG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2tmdW46YW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy5kb20gPSA8SFRNTEVsZW1lbnQ+b2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrZnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsbGJhY2suYXBwbHkoc2VsZi5kb20sW3NlbGYuZG9tXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJCh0aGlzLmRvbSkuY2hhbmdlKHRoaXMuY2FsbGJhY2tmdW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcExpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgICAgICQodGhpcy5kb20pLm9mZihcInJlc2l6ZVwiLHRoaXMuY2FsbGJhY2tmdW4pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVmFsdWVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcntcblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVZhbHVlUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqLHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYocHJvcGVydHlOYW1lPT1cInZhbHVlXCIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgaW1wb3J0IGdldE9iamVjdENvbmZpZyA9IExheW91dEx6Zy5PYnNlcnZlck1vZGVsLmdldE9iamVjdENvbmZpZztcbiAgICBpbXBvcnQgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzID0gTGF5b3V0THpnLk9ic2VydmVyTW9kZWwuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzO1xuXG4gICAgZXhwb3J0IGNsYXNzIERpY3RQcm9wZXJ0eUdldHRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ialt0aGlzLnByb3BlcnR5TmFtZV07XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaWN0UHJvcGVydHlTZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMub2JqW3RoaXMucHJvcGVydHlOYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJ7XG5cbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFja2Z1bmM6YW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrZnVuYyA9IGZ1bmN0aW9uIChhcmdzOiBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZihhcmdzLnByb3BlcnR5TmFtZT09c2VsZi5wcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxsYmFjay5hcHBseSh0aGlzLFtzZWxmLm9ial0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYnNlcnZlck1vZGVsLmluamVjdFByb3BlcnRpZXModGhpcy5vYmopO1xuICAgICAgICAgICAgT2JzZXJ2ZXJNb2RlbC5nZXRPYmplY3RDb25maWcodGhpcy5vYmopLmFkZFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKHRoaXMuY2FsbGJhY2tmdW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBPYnNlcnZlck1vZGVsLmdldE9iamVjdENvbmZpZyh0aGlzLm9iaikucmVtb3ZlUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2sodGhpcy5jYWxsYmFja2Z1bmMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVyIHtcbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogTGF5b3V0THpnLlByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGljdFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaWN0UHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXIge1xuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERpY3RQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERpY3RQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDb250cm9sUHJvcGVydHlHZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlcntcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgICAgIGxldCBjb250cm9sOmFueSA9IDxGcmFtZXdvcmtFbGVtZW50PnRoaXMub2JqO1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb3BlcnR5TmFtZSBpbiBjb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbFt0aGlzLnByb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ29udHJvbFByb3BlcnR5U2V0dGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJ7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBjb250cm9sOmFueSA9IDxGcmFtZXdvcmtFbGVtZW50PnRoaXMub2JqO1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb3BlcnR5TmFtZSBpbiBjb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sW3RoaXMucHJvcGVydHlOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRyb2wxOkZyYW1ld29ya0VsZW1lbnQgPSA8RnJhbWV3b3JrRWxlbWVudD50aGlzLm9iajtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2wxLmFzc2VtYmxlRG9tKCk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sMS5kb0xheW91dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ29udHJvbFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVye1xyXG5cclxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRnJhbWV3b3JrRWxlbWVudDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUdldHRlciB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29udHJvbFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDb250cm9sUHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXJ7XHJcblxyXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBGcmFtZXdvcmtFbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbnRyb2xQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ29udHJvbFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJ7XHJcbiAgICAgICAgcHJpdmF0ZSBjb250cm9sOiBGcmFtZXdvcmtFbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2tmdW46YW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wgPSA8RnJhbWV3b3JrRWxlbWVudD5vYmo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGFydExpc3RlbigpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrZnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5jYWxsYmFjaylcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrLmFwcGx5KHNlbGYuY29udHJvbCxbc2VsZi5jb250cm9sXSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5hZGRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcih0aGlzLnByb3BlcnR5TmFtZSx0aGlzLmNhbGxiYWNrZnVuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5yZW1vdmVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcih0aGlzLmNhbGxiYWNrZnVuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDb250cm9sUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXJ7XHJcblxyXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250cm9sUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqLHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgRnJhbWV3b3JrRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRyb2wgPSA8RnJhbWV3b3JrRWxlbWVudD5vYmo7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbC5nZXROb3RpZnlQcm9wZXJ0aWVzKCkuaW5kZXhPZihwcm9wZXJ0eU5hbWUpPi0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWYWx1ZUNvbnZlcnRlciB7XG5cbiAgICAgICAgYWJzdHJhY3QgY29udmVydCh2YWx1ZTphbnkpOmFueTtcblxuICAgICAgICBhYnN0cmFjdCBjb252ZXJ0QmFjayh2YWx1ZTphbnkpOmFueTtcblxuICAgIH1cblxuICAgIGV4cG9ydCBlbnVtIEJpbmRpbmdNb2RlIHtcbiAgICAgICAgT25ld2F5LFxuICAgICAgICBUd293YXlcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmluZGluZyBpbXBsZW1lbnRzIERpc3Bvc2FibGV7XG4gICAgICAgIHRhcmdldDphbnk7XG4gICAgICAgIHRhcmdldFByb3BlcnR5TmFtZTpzdHJpbmc7XG4gICAgICAgIGNvbnZlcnRlcjpWYWx1ZUNvbnZlcnRlcjtcbiAgICAgICAgbW9kZTpCaW5kaW5nTW9kZTtcbiAgICAgICAgcHJvdGVjdGVkIHByb3BlcnR5UHJvdmlkZXI6IFByb3BlcnR5UHJvdmlkZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJvcGVydHlQcm92aWRlcjpQcm9wZXJ0eVByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5UHJvdmlkZXIgPSBwcm9wZXJ0eVByb3ZpZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3QgdXBkYXRlRnJvbVNvdXJjZSgpOnZvaWQ7XG4gICAgICAgIGFic3RyYWN0IHVwZGF0ZUZyb21UYXJnZXQoKTp2b2lkO1xuXG4gICAgICAgIHNldENvbnZlcnRlcihjb252ZXJ0ZXI6IFZhbHVlQ29udmVydGVyKTogQmluZGluZyB7XG4gICAgICAgICAgICB0aGlzLmNvbnZlcnRlciA9IGNvbnZlcnRlcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0TW9kZShtb2RlOiBCaW5kaW5nTW9kZSk6IEJpbmRpbmcge1xuICAgICAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRCaW5kaW5nKCk6QmluZGluZ3tcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcEJpbmRpbmcoKTpCaW5kaW5ne1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zdG9wQmluZGluZygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIEZ1bmN0aW9uQmluZGluZyBleHRlbmRzIEJpbmRpbmd7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJvcGVydHlQcm92aWRlcjogUHJvcGVydHlQcm92aWRlcikge1xuICAgICAgICAgICAgc3VwZXIocHJvcGVydHlQcm92aWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydEJpbmRpbmcoKTogQmluZGluZyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BCaW5kaW5nKCk6IEJpbmRpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVGcm9tU291cmNlKCk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlRnJvbVRhcmdldCgpOiB2b2lkIHtcbiAgICAgICAgfVxuXG5cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgUHJvcGVydHlCaW5kaW5nIGV4dGVuZHMgQmluZGluZyB7XG5cbiAgICAgICAgc291cmNlOiBhbnk7XG4gICAgICAgIHNvdXJjZVByb3BlcnR5TmFtZTogc3RyaW5nO1xuXG4gICAgICAgIHByaXZhdGUgc291cmNlUHJvcEdldHRlcjogUHJvcGVydHlHZXR0ZXI7XG4gICAgICAgIHByaXZhdGUgc291cmNlUHJvcFNldHRlcjogUHJvcGVydHlTZXR0ZXI7XG4gICAgICAgIHByaXZhdGUgdGFyZ2V0UHJvcEdldHRlcjogUHJvcGVydHlHZXR0ZXI7XG4gICAgICAgIHByaXZhdGUgdGFyZ2V0UHJvcFNldHRlcjogUHJvcGVydHlTZXR0ZXI7XG5cbiAgICAgICAgcHJpdmF0ZSBzb3VyY2VQcm9wTGlzdGVuZXI6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyO1xuICAgICAgICBwcml2YXRlIHRhcmdldFByb3BMaXN0ZW5lcjogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJvcGVydHlQcm92aWRlcjogUHJvcGVydHlQcm92aWRlcikge1xuICAgICAgICAgICAgc3VwZXIocHJvcGVydHlQcm92aWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydEJpbmRpbmcoKTogQmluZGluZyB7XG4gICAgICAgICAgICB0aGlzLnN0b3BCaW5kaW5nKCk7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMuc291cmNlUHJvcEdldHRlciA9IHRoaXMucHJvcGVydHlQcm92aWRlci5nZXRQcm9wZXJ0eUdldHRlcih0aGlzLnNvdXJjZSwgdGhpcy5zb3VyY2VQcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VQcm9wU2V0dGVyID0gdGhpcy5wcm9wZXJ0eVByb3ZpZGVyLmdldFByb3BlcnR5U2V0dGVyKHRoaXMuc291cmNlLCB0aGlzLnNvdXJjZVByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldFByb3BHZXR0ZXIgPSB0aGlzLnByb3BlcnR5UHJvdmlkZXIuZ2V0UHJvcGVydHlHZXR0ZXIodGhpcy50YXJnZXQsIHRoaXMudGFyZ2V0UHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvcFNldHRlciA9IHRoaXMucHJvcGVydHlQcm92aWRlci5nZXRQcm9wZXJ0eVNldHRlcih0aGlzLnRhcmdldCwgdGhpcy50YXJnZXRQcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VQcm9wTGlzdGVuZXIgPSB0aGlzLnByb3BlcnR5UHJvdmlkZXIuZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIodGhpcy5zb3VyY2UsIHRoaXMuc291cmNlUHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvcExpc3RlbmVyID0gdGhpcy5wcm9wZXJ0eVByb3ZpZGVyLmdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKHRoaXMudGFyZ2V0LCB0aGlzLnRhcmdldFByb3BlcnR5TmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRnJvbVNvdXJjZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNvdXJjZVByb3BMaXN0ZW5lci5zdGFydExpc3RlbigpO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VQcm9wTGlzdGVuZXIuc2V0UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlRnJvbVNvdXJjZS5hcHBseShzZWxmLFtdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlID09IEJpbmRpbmdNb2RlLlR3b3dheSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvcExpc3RlbmVyLnN0YXJ0TGlzdGVuKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRQcm9wTGlzdGVuZXIuc2V0UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZUZyb21UYXJnZXQuYXBwbHkoc2VsZixbXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBzdG9wQmluZGluZygpOiBCaW5kaW5nIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc291cmNlUHJvcExpc3RlbmVyKSB0aGlzLnNvdXJjZVByb3BMaXN0ZW5lci5kaXNwb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnN0b3BCaW5kaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVGcm9tU291cmNlKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHYgPSAgdGhpcy5zb3VyY2VQcm9wR2V0dGVyLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBsZXQgb2xkX3YgPSB0aGlzLnRhcmdldFByb3BHZXR0ZXIuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICh2PT1vbGRfdikgcmV0dXJuO1xuICAgICAgICAgICAgaWYodGhpcy5jb252ZXJ0ZXIpe1xuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmNvbnZlcnRlci5jb252ZXJ0KHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50YXJnZXRQcm9wU2V0dGVyLnNldFZhbHVlKHYpO1xuXG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVGcm9tVGFyZ2V0KCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHYgPSAgdGhpcy50YXJnZXRQcm9wR2V0dGVyLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBsZXQgb2xkX3YgPSB0aGlzLnNvdXJjZVByb3BHZXR0ZXIuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICh2PT1vbGRfdikgcmV0dXJuO1xuICAgICAgICAgICAgaWYodGhpcy5jb252ZXJ0ZXIpe1xuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmNvbnZlcnRlci5jb252ZXJ0QmFjayh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc291cmNlUHJvcFNldHRlci5zZXRWYWx1ZSh2KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgRGF0ZUZvcm1hdENvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuICAgICAgICBmb3JtYXQ6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEZvcm1hdChmb3JtYXQ6c3RyaW5nKTogRGF0ZUZvcm1hdENvbnZlcnRlciB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydCh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIGxldCBkdCA9IDxEYXRlPnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXREYXRlKGR0LHRoaXMuZm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnRCYWNrKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIEZpcnN0Q2hhclVwcGVyY2FzZUNvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuICAgICAgICBjb252ZXJ0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgaWYodmFsdWU9PW51bGwpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgbGV0IHYgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgcmV0dXJuICh2WzBdK1wiXCIpLnRvVXBwZXJDYXNlKCkrdi5zdWJzdHIoMSx2Lmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0QmFjayh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgTG93ZXJjYXNlQ29udmVydGVyIGV4dGVuZHMgVmFsdWVDb252ZXJ0ZXJ7XG4gICAgICAgIGNvbnZlcnQodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICBpZih2YWx1ZT09bnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydEJhY2sodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIFVwcGVyY2FzZUNvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuICAgICAgICBjb252ZXJ0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgaWYodmFsdWU9PW51bGwpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnRCYWNrKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBUb1N0cmluZ0NvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuICAgICAgICBjb252ZXJ0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgaWYodmFsdWU9PW51bGwpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0QmFjayh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgUGlwZWxpbmVDb252ZXJ0ZXIgZXh0ZW5kcyBWYWx1ZUNvbnZlcnRlcntcbiAgICAgICAgY29udmVydGVyczpBcnJheTxWYWx1ZUNvbnZlcnRlcj49W107XG5cbiAgICAgICAgYWRkQ29udmVydGVyKGNvbnZlcnRlcjogVmFsdWVDb252ZXJ0ZXIpOlBpcGVsaW5lQ29udmVydGVyIHtcbiAgICAgICAgICAgIGlmIChjb252ZXJ0ZXI9PW51bGwpIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jb252ZXJ0ZXJzLnB1c2goY29udmVydGVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ29udmVydGVycyhjb252ZXJ0ZXJzOiBBcnJheTxWYWx1ZUNvbnZlcnRlcj4pOlBpcGVsaW5lQ29udmVydGVyIHtcbiAgICAgICAgICAgIGlmIChjb252ZXJ0ZXJzPT1udWxsKSByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnZlcnRlciBvZiBjb252ZXJ0ZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0ZXJzLnB1c2goY29udmVydGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVydCh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIGxldCBjdXJ2YWx1ZTphbnkgPSB2YWx1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnZlcnRlciBvZiB0aGlzLmNvbnZlcnRlcnMpIHtcbiAgICAgICAgICAgICAgICBjdXJ2YWx1ZSA9IGNvbnZlcnRlci5jb252ZXJ0KGN1cnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjdXJ2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnZlcnRCYWNrKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgbGV0IGN1cnZhbHVlOmFueSA9IHZhbHVlO1xuICAgICAgICAgICAgZm9yIChsZXQgY29udmVydGVyIG9mIHRoaXMuY29udmVydGVycy5yZXZlcnNlKCkpIHtcbiAgICAgICAgICAgICAgICBjdXJ2YWx1ZSA9IGNvbnZlcnRlci5jb252ZXJ0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjdXJ2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcbiAgICBleHBvcnQgY2xhc3MgRXhwcmVzc2lvbkNvbnZlcnRlciBleHRlbmRzIFZhbHVlQ29udmVydGVye1xuXG4gICAgICAgIGV4cHJlc3Npb25TdHI6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGV4cHJlc3Npb25TdHI6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvblN0ciA9IGV4cHJlc3Npb25TdHI7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgaWYodGhpcy5leHByZXNzaW9uU3RyPT1udWxsfHx0aGlzLmV4cHJlc3Npb25TdHI9PVwiXCIpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBmdW5jPSBuZXcgRnVuY3Rpb24oXCJ2YWx1ZVwiLFwicmV0dXJuIFwiICsgdGhpcy5leHByZXNzaW9uU3RyKTtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gICAgICAgICAgICB9Y2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb252ZXJ0QmFjayh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGNsYXNzIFZpc3VhbFRyZWUge1xuICAgICAgICByb290Q29udGFpbmVyOiBDb250YWluZXJDb250cm9sO1xuICAgICAgICBwYXJlbnRDb250cm9sOlRlbXBsYXRlQ29udHJvbDtcbiAgICAgICAgc3RhdGVNYW5hZ2VyOmFueTtcblxuICAgICAgICBzdGF0aWMgZmluZENvbnRyb2xzQnlOYW1lKHJvb3Q6Q29udHJvbCwgbmFtZTpzdHJpbmcpOkxpc3Q8Q29udHJvbD4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBMaXN0PENvbnRyb2w+KCk7XG4gICAgICAgICAgICBsZXQgcm9vdENvbnRhaW5lcjphbnkgPSBudWxsO1xuICAgICAgICAgICAgaWYocm9vdC5uYW1lPT1uYW1lKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkZChyb290KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHJvb3QgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgcm9vdENvbnRhaW5lciA9IDxDb250YWluZXJDb250cm9sPnJvb3Q7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygcm9vdENvbnRhaW5lci5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGxldCByID0gIFZpc3VhbFRyZWUuZmluZENvbnRyb2xzQnlOYW1lKGNoaWxkLCBuYW1lKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkQWxsKHIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGZpbmRDb250cm9sQnlOYW1lKHJvb3Q6Q29udHJvbCwgbmFtZTpzdHJpbmcpOiBDb250cm9sIHtcbiAgICAgICAgICAgIGxldCByb290Q29udGFpbmVyOmFueSA9IG51bGw7XG4gICAgICAgICAgICBpZihyb290Lm5hbWU9PW5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHJvb3QgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgcm9vdENvbnRhaW5lciA9IDxDb250YWluZXJDb250cm9sPnJvb3Q7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHJvb3RDb250YWluZXIuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgciA9ICBWaXN1YWxUcmVlLmZpbmRDb250cm9sQnlOYW1lKGNoaWxkLCBuYW1lKTtcbiAgICAgICAgICAgICAgICBpZihyKSByZXR1cm4gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYgKHRoaXMucm9vdENvbnRhaW5lcil7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290Q29udGFpbmVyLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRDYWxjdWxhYmxlU2xvdHMoKTp2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb3RDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RDb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb290Q29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290Q29udGFpbmVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb290Q29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290Q29udGFpbmVyLmRvTGF5b3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG5cbiAgICB9XG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIFRlbXBsYXRlQ29udHJvbCBleHRlbmRzIENvbnRyb2xCYXNlIHtcbiAgICAgICAgcHJpdmF0ZSByb290Qm9yZGVyIDogQm9yZGVyID0gbmV3IEJvcmRlcihcInJvb3RCb3JkZXJcIik7XG4gICAgICAgIHByaXZhdGUgX3Zpc3VhbFRyZWUgOiBWaXN1YWxUcmVlO1xuICAgICAgICBwcml2YXRlIHN0YXRlR3JvdXBzIDogTGlzdDxTdGF0ZUdyb3VwPjtcbiAgICAgICAgcHJvdGVjdGVkIHN0YXRlRXZlbnRUcmlnZ2VyczogTGlzdDxDb250cm9sVHJpZ2dlcj47XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVHcm91cHMgPSBuZXcgTGlzdDxTdGF0ZUdyb3VwPigpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUV2ZW50VHJpZ2dlcnMgPSBuZXcgTGlzdDxDb250cm9sVHJpZ2dlcj4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB2aXN1YWxUcmVlKCk6IFZpc3VhbFRyZWUge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc3VhbFRyZWU7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgdmlzdWFsVHJlZSh2YWx1ZTogVmlzdWFsVHJlZSkge1xuICAgICAgICAgICAgaWYodmFsdWUhPW51bGwpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5wYXJlbnRDb250cm9sID0gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFN0YXRlR3JvdXAoZ3JvdXBOYW1lOnN0cmluZyk6IFN0YXRlR3JvdXAge1xuICAgICAgICAgICAgbGV0IHN0YWdlR3JvdXAgPSBuZXcgU3RhdGVHcm91cCgpO1xuICAgICAgICAgICAgc3RhZ2VHcm91cC5yb290Q29udHJvbCA9IHRoaXMudmlzdWFsVHJlZS5yb290Q29udGFpbmVyO1xuICAgICAgICAgICAgc3RhZ2VHcm91cC5ncm91cE5hbWUgPSBncm91cE5hbWU7XG4gICAgICAgICAgICB0aGlzLnN0YXRlR3JvdXBzLmFkZChzdGFnZUdyb3VwKTtcbiAgICAgICAgICAgIHJldHVybiBzdGFnZUdyb3VwO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkU3RhdGVTdHlsZShncm91cE5hbWU6c3RyaW5nLCBzdGF0ZW5hbWU6c3RyaW5nLCBjb250cm9scHJvcGVydHlWYWx1ZXM6YW55LCBldmVudE5hbWU6c3RyaW5nPW51bGwpIHtcbiAgICAgICAgICAgIGxldCBncm91cHMgPSB0aGlzLnN0YXRlR3JvdXBzLmZpbHRlcih0PT50Lmdyb3VwTmFtZT09Z3JvdXBOYW1lKTtcbiAgICAgICAgICAgIGxldCBncm91cDpTdGF0ZUdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgIGlmKGdyb3Vwcy5sZW5ndGg9PTApIHtcbiAgICAgICAgICAgICAgICBncm91cCA9IHRoaXMuYWRkU3RhdGVHcm91cChncm91cE5hbWUpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZ3JvdXAgPSBncm91cHNbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdGF0ZXMgPSBncm91cC5zdGF0ZXMuZmlsdGVyKHQ9PnQubmFtZT09c3RhdGVuYW1lKTtcbiAgICAgICAgICAgIGxldCBzdGF0ZTpTdGF0ZSA9IG51bGw7XG4gICAgICAgICAgICBpZihzdGF0ZXMubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IG5ldyBTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIHN0YXRlLm5hbWUgPSBzdGF0ZW5hbWU7XG4gICAgICAgICAgICAgICAgc3RhdGUuc3R5bGUgPSBuZXcgU3R5bGUoKTtcbiAgICAgICAgICAgICAgICBncm91cC5hZGRTdGF0ZShzdGF0ZSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHN0YXRlID0gc3RhdGVzWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBjb250cm9sTmFtZSBpbiBjb250cm9scHJvcGVydHlWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHlWYWx1ZXMgPSBjb250cm9scHJvcGVydHlWYWx1ZXNbY29udHJvbE5hbWVdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0eVZhbHVlcyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHByb3BlcnR5VmFsdWVzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnN0eWxlLmFkZFN0eWxlSXRlbShjb250cm9sTmFtZSxwcm9wZXJ0eU5hbWUsdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGV2ZW50TmFtZSkgdGhpcy5hZGRTdGF0ZVRyaWdnZXIoZ3JvdXBOYW1lLHN0YXRlbmFtZSxldmVudE5hbWUpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBhZGRTdGF0ZVRyaWdnZXIoZ3JvdXBOYW1lOnN0cmluZywgc3RhdGVOYW1lOnN0cmluZywgZXZlbnROYW1lOnN0cmluZyk6dm9pZCB7XG4gICAgICAgICAgICBsZXQgdHJpZ2dlciA9IG5ldyBFdmVudFRyaWdnZXIoKTtcbiAgICAgICAgICAgIHRyaWdnZXIuY29udHJvbCA9IHRoaXM7XG4gICAgICAgICAgICB0cmlnZ2VyLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgICAgIGxldCBnb3Rvc3RhdGVhY3Rpb24gPSBuZXcgR290b1N0YXRlQWN0aW9uKCk7XG4gICAgICAgICAgICBnb3Rvc3RhdGVhY3Rpb24udGVtcGxhdGVDb250cm9sID0gdGhpcztcbiAgICAgICAgICAgIGdvdG9zdGF0ZWFjdGlvbi5zdGF0ZU5hbWUgPSBzdGF0ZU5hbWU7XG4gICAgICAgICAgICBnb3Rvc3RhdGVhY3Rpb24uZ3JvdXBOYW1lID0gZ3JvdXBOYW1lO1xuICAgICAgICAgICAgdHJpZ2dlci5hY3Rpb24gPSBnb3Rvc3RhdGVhY3Rpb247XG4gICAgICAgICAgICB0cmlnZ2VyLmluaXQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVFdmVudFRyaWdnZXJzLmFkZCh0cmlnZ2VyKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgYWN0aXZlU3RhdGUoZ3JvdXBOYW1lOnN0cmluZywgc3RhdGVOYW1lOnN0cmluZyk6dm9pZCB7XG4gICAgICAgICAgICBmb3IgKGxldCBzdGF0ZUdyb3VwIG9mIHRoaXMuc3RhdGVHcm91cHMpIHtcbiAgICAgICAgICAgICAgICAvLyBzdGF0ZUdyb3VwLmlzQWN0aXZlID0gc3RhdGVHcm91cC5ncm91cE5hbWUgPT0gZ3JvdXBOYW1lO1xuICAgICAgICAgICAgICAgIGlmKHN0YXRlR3JvdXAuZ3JvdXBOYW1lPT1ncm91cE5hbWUpe1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZUdyb3VwLmFwcGx5U3RhdGUoc3RhdGVOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0xheW91dCgpO1xuICAgICAgICAgICAgfWNhdGNoIChlKSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEJvcmRlci5nZXRSb290RWxlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLmhvcml6b25BbGlnbm1lbnQgPSB0aGlzLmhvcml6b25BbGlnbm1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIudmVydGljYWxBbGlnbm1lbnQgPSB0aGlzLnZlcnRpY2FsQWxpZ25tZW50O1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLmFkZENoaWxkKHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lcik7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIubWFyZ2luID0gdGhpcy5tYXJnaW47XG4gICAgICAgICAgICB0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcblxuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLnBhcmVudFNsb3QgPSB0aGlzLnBhcmVudFNsb3Q7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIucGFyZW50ID0gdGhpcy5wYXJlbnQ7XG5cbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuYXNzZW1ibGVEb20oKTtcblxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yYWlzZUV2ZW50KFwiY2xpY2tcIixbZV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkubW91c2VlbnRlcihmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcIm1vdXNlZW50ZXJcIixbZV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkubW91c2VsZWF2ZShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcIm1vdXNlbGVhdmVcIixbZV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkubW91c2Vkb3duKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yYWlzZUV2ZW50KFwibW91c2Vkb3duXCIsW2VdKTtcbiAgICAgICAgICAgICAgICBzZWxmLnByZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkubW91c2V1cChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmFpc2VFdmVudChcIm1vdXNldXBcIixbZV0pO1xuICAgICAgICAgICAgICAgIHNlbGYucHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkubW91c2Vtb3ZlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yYWlzZUV2ZW50KFwibW91c2Vtb3ZlXCIsW2VdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLmhvcml6b25BbGlnbm1lbnQgPSB0aGlzLmhvcml6b25BbGlnbm1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIudmVydGljYWxBbGlnbm1lbnQgPSB0aGlzLnZlcnRpY2FsQWxpZ25tZW50O1xuICAgICAgICAgICAgLy8gdGhpcy5yb290Qm9yZGVyLmFkZENoaWxkKHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lcik7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIubWFyZ2luID0gdGhpcy5tYXJnaW47XG4gICAgICAgICAgICB0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLl92aXN1YWxUcmVlLnJvb3RDb250YWluZXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdGhpcy5fdmlzdWFsVHJlZS5yb290Q29udGFpbmVyLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHRoaXMuX3Zpc3VhbFRyZWUucm9vdENvbnRhaW5lci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcblxuICAgICAgICAgICAgLy8gdGhpcy5yb290Qm9yZGVyLnBhcmVudFNsb3QgPSB0aGlzLnBhcmVudFNsb3Q7XG4gICAgICAgICAgICAvLyB0aGlzLnJvb3RCb3JkZXIucGFyZW50ID0gdGhpcy5wYXJlbnQ7XG5cbiAgICAgICAgICAgIC8vIHRoaXMucm9vdEJvcmRlci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0X2F1dG8oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RCb3JkZXIuZXN0aW1hdGVIZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGhfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEJvcmRlci5lc3RpbWF0ZVdpZHRoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgQ29udGVudFByZXNlbnRlciBleHRlbmRzIEJvcmRlcntcblxuICAgICAgICBjb250ZW50OkNvbnRyb2w7XG5cblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgICAgICAgICBzdXBlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBJdGVtc1ByZXNlbnRlciB7XG5cbiAgICB9XG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFjdGlvbiB7XHJcbiAgICAgICAgYWJzdHJhY3QgZXhlY3V0ZSgpOnZvaWQ7XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIExheW91dEx6ZyB7XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0UHJvcGVydHlBY3Rpb24gZXh0ZW5kcyBBY3Rpb257XHJcblxyXG4gICAgICAgIGNvbnRyb2w6Q29udHJvbDtcclxuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHZhbHVlOmFueTtcclxuXHJcbiAgICAgICAgZXhlY3V0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHNldHRlciA9IG5ldyBDb250cm9sUHJvcGVydHlTZXR0ZXIodGhpcy5jb250cm9sLCB0aGlzLnByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgIHNldHRlci5zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIE11bHRpQWN0aW9uIGV4dGVuZHMgQWN0aW9uIHtcblxuICAgICAgICBwcml2YXRlIGFjdGlvbnM6TGlzdDxBY3Rpb24+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IG5ldyBMaXN0PEFjdGlvbj4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEFjdGlvbihhY3Rpb246IEFjdGlvbik6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKGFjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVBY3Rpb24oYWN0aW9uOiBBY3Rpb24pOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnJlbW92ZShhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJBY3Rpb25zKCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV4ZWN1dGUoKTogdm9pZCB7XG4gICAgICAgICAgICBmb3IgKGxldCBhY3Rpb24gb2YgdGhpcy5hY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmV4ZWN1dGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBHb3RvU3RhdGVBY3Rpb24gZXh0ZW5kcyBBY3Rpb257XG5cbiAgICAgICAgdGVtcGxhdGVDb250cm9sOlRlbXBsYXRlQ29udHJvbDtcbiAgICAgICAgZ3JvdXBOYW1lOnN0cmluZztcbiAgICAgICAgc3RhdGVOYW1lOnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBleGVjdXRlKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYodGhpcy50ZW1wbGF0ZUNvbnRyb2wpIHRoaXMudGVtcGxhdGVDb250cm9sLmFjdGl2ZVN0YXRlKHRoaXMuZ3JvdXBOYW1lLCB0aGlzLnN0YXRlTmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5Q2hhbmdlZFRyaWdnZXIgZXh0ZW5kcyBDb250cm9sVHJpZ2dlciB7XHJcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgICAgICBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uVHJpZ2dlcmVkKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5hZGRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcih0aGlzLnByb3BlcnR5TmFtZSx0aGlzLmNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5yZW1vdmVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcih0aGlzLmNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XHJcbiAgICBleHBvcnQgY2xhc3MgU3RhdGVDaGFuZ2VkVHJpZ2dlciBleHRlbmRzIENvbnRyb2xUcmlnZ2VyIHtcclxuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgY2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgICAgIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25UcmlnZ2VyZWQoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLmFkZFN0YXRlQ2hhbmdlZExpc3RlbmVyKHRoaXMucHJvcGVydHlOYW1lLHRoaXMuY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLnJlbW92ZVN0YXRlQ2hhbmdlZExpc3RlbmVyKHRoaXMuY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50VHJpZ2dlciBleHRlbmRzIENvbnRyb2xUcmlnZ2Vye1xuICAgICAgICBldmVudE5hbWU6c3RyaW5nO1xuICAgICAgICBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbjtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpbml0KCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uVHJpZ2dlcmVkKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsdGhpcy5jYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5jYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTdHlsZUl0ZW0ge1xyXG4gICAgICAgIG5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHByb3BlcnR5TmFtZTpzdHJpbmc7XHJcbiAgICAgICAgdmFsdWU6YW55O1xyXG5cclxuICAgICAgICBhcHBseShyb290Q29udHJvbDpDb250cm9sKSB7XHJcbiAgICAgICAgICAgIGxldCBjb250cm9sID0gVmlzdWFsVHJlZS5maW5kQ29udHJvbEJ5TmFtZShyb290Q29udHJvbCwgdGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgaWYoY29udHJvbD09bnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgc2V0dGVyID0gbmV3IENvbnRyb2xQcm9wZXJ0eVNldHRlcihjb250cm9sLCB0aGlzLnByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgIHNldHRlci5zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN0eWxlIHtcclxuICAgICAgICBzdHlsZWl0ZW1zOkxpc3Q8U3R5bGVJdGVtPjtcclxuICAgICAgICB0cmlnZ2VyczpMaXN0PFRyaWdnZXI+O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZWl0ZW1zID0gbmV3IExpc3Q8U3R5bGVJdGVtPigpO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJzID0gbmV3IExpc3Q8VHJpZ2dlcj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZFN0eWxlSXRlbShjb250cm9sTmFtZTpzdHJpbmcsIHByb3BlcnR5TmFtZTpzdHJpbmcsIHZhbHVlOmFueSk6dm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IFN0eWxlSXRlbSgpO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWUgPSBjb250cm9sTmFtZTtcclxuICAgICAgICAgICAgaXRlbS5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XHJcbiAgICAgICAgICAgIGl0ZW0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZWl0ZW1zLmFkZChpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFwcGx5KHJvb3RDb250cm9sOkNvbnRyb2wpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYoIXJvb3RDb250cm9sKSByZXR1cm47XHJcbiAgICAgICAgICAgIGZvciAobGV0IHN0eWxlaXRlbSBvZiB0aGlzLnN0eWxlaXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlaXRlbS5hcHBseShyb290Q29udHJvbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHRyaWdnZXIgb2YgdGhpcy50cmlnZ2VycykgIHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXIuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBTdGF0ZSB7XG4gICAgICAgIG5hbWU6c3RyaW5nO1xuICAgICAgICBzdHlsZTpTdHlsZTtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgU3RhdGVHcm91cCB7XG4gICAgICAgIGdyb3VwTmFtZTpzdHJpbmc7XG4gICAgICAgIHN0YXRlczpMaXN0PFN0YXRlPjtcbiAgICAgICAgcm9vdENvbnRyb2w6Q29udHJvbDtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzID0gbmV3IExpc3Q8U3RhdGU+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZU5hbWVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVzLm1hcCh0PT50Lm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkU3RhdGUoc3RhdGU6U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmFkZChzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVTdGF0ZUJ5TmFtZShzdGF0ZU5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBsZXQgc3RhdGVzY2FuZGlkYXRlID0gdGhpcy5zdGF0ZXMuZmlsdGVyKHQ9PnQubmFtZT09c3RhdGVOYW1lKTtcbiAgICAgICAgICAgIGZvciAobGV0IHN0YXRlIG9mIHN0YXRlc2NhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnJlbW92ZShzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVTdGF0ZShzdGF0ZTpTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMucmVtb3ZlKHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUFsbFN0YXRlcygpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmaW5kU3RhdGVCeU5hbWUoc3RhdGVOYW1lOnN0cmluZyk6U3RhdGUge1xuICAgICAgICAgICAgbGV0IHN0YXRlcyA9IHRoaXMuc3RhdGVzLmZpbHRlcih0PT50Lm5hbWU9PXN0YXRlTmFtZSk7XG4gICAgICAgICAgICBpZihzdGF0ZXMubGVuZ3RoPjApIHJldHVybiBzdGF0ZXNbMF07XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5U3RhdGUoc3RhdGVOYW1lOnN0cmluZykge1xuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5maW5kU3RhdGVCeU5hbWUoc3RhdGVOYW1lKTtcbiAgICAgICAgICAgIGlmKHN0YXRlPT1udWxsKSByZXR1cm47XG4gICAgICAgICAgICBpZihzdGF0ZS5zdHlsZT09bnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYodGhpcy5yb290Q29udHJvbD09bnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgc3RhdGUuc3R5bGUuYXBwbHkodGhpcy5yb290Q29udHJvbCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xyXG4gICAgY2xhc3MgVmlzdWFsVHJlZVN0eWxlIHtcclxuXHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBUZW1wbGF0ZUNvbnRyb2x7XG5cbiAgICAgICAgcmFkaXVzOiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX2NvbnRlbnQ6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBjb250ZW50UHJlc2VudG9yOiBDb250ZW50UHJlc2VudGVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IDU7XG4gICAgICAgICAgICB0aGlzLmluaXRWaXN1YWxUcmVlKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRTdGF0ZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgaW5pdFZpc3VhbFRyZWUoKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudmlzdWFsVHJlZSA9IG5ldyBWaXN1YWxUcmVlKCk7XG4gICAgICAgICAgICBsZXQgcm9vdEJvcmRlciA9IG5ldyBCb3JkZXIoXCJyb290XCIpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRQcmVzZW50b3IgPSBuZXcgQ29udGVudFByZXNlbnRlcihcIl9jb250ZW50XCIpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50UHJlc2VudG9yLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50UHJlc2VudG9yLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFByZXNlbnRvci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5DZW50ZXI7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRQcmVzZW50b3IudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5DZW50ZXI7XG5cbiAgICAgICAgICAgIGxldCB2bGluZWFyID0gbmV3IFZlcnRpY2FsTGluZWFyTGF5b3V0KFwiXCIpO1xuICAgICAgICAgICAgdmxpbmVhci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB2bGluZWFyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdmxpbmVhci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHZsaW5lYXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdmxpbmVhci5hZGRDZWxsKG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUud2VpZ2h0LDEpKTtcbiAgICAgICAgICAgIHZsaW5lYXIuYWRkQ2VsbChuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLndlaWdodCwxKSk7XG4gICAgICAgICAgICBsZXQgYmdSZWN0MSA9IG5ldyBSZWN0KFwicmVjdHVwXCIpO1xuICAgICAgICAgICAgbGV0IGJnUmVjdDIgPSBuZXcgUmVjdChcInJlY3Rkb3duXCIpO1xuICAgICAgICAgICAgYmdSZWN0MS53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIGJnUmVjdDEuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgYmdSZWN0MS5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICBiZ1JlY3QxLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgYmdSZWN0MS5yYWRpdXNfdG9wX2xlZnQgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIGJnUmVjdDEucmFkaXVzX3RvcF9yaWdodCA9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgYmdSZWN0MS5maWxsID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNGMUYxRjFcIik7XG4gICAgICAgICAgICBiZ1JlY3QxLnN0cm9rZSA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjNDM3REQ0XCIpO1xuICAgICAgICAgICAgYmdSZWN0MS5zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKDEsMSwxLDApO1xuICAgICAgICAgICAgYmdSZWN0Mi53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIGJnUmVjdDIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgYmdSZWN0Mi5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICBiZ1JlY3QyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgYmdSZWN0Mi5yYWRpdXNfYm90dG9tX2xlZnQgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIGJnUmVjdDIucmFkaXVzX2JvdHRvbV9yaWdodCA9IHRoaXMucmFkaXVzO1xuICAgICAgICAgICAgYmdSZWN0Mi5maWxsID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNFNUU1RTVcIik7XG4gICAgICAgICAgICBiZ1JlY3QyLnN0cm9rZSA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjNDM3REQ0XCIpO1xuICAgICAgICAgICAgYmdSZWN0Mi5zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKDEsMSwwLDEpO1xuICAgICAgICAgICAgdmxpbmVhci5hZGRDaGlsZChiZ1JlY3QxKTtcbiAgICAgICAgICAgIHZsaW5lYXIuYWRkQ2hpbGQoYmdSZWN0Mik7XG4gICAgICAgICAgICB2bGluZWFyLnNldENlbGwoYmdSZWN0MSwwKTtcbiAgICAgICAgICAgIHZsaW5lYXIuc2V0Q2VsbChiZ1JlY3QyLDEpO1xuICAgICAgICAgICAgcm9vdEJvcmRlci5hZGRDaGlsZCh2bGluZWFyKTtcbiAgICAgICAgICAgIHJvb3RCb3JkZXIuYWRkQ2hpbGQodGhpcy5jb250ZW50UHJlc2VudG9yKTtcbiAgICAgICAgICAgIHRoaXMudmlzdWFsVHJlZS5yb290Q29udGFpbmVyID0gcm9vdEJvcmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgaW5pdFN0YXRlcygpOnZvaWQge1xuXG4gICAgICAgICAgICB0aGlzLmFkZFN0YXRlU3R5bGUoXCJob3Zlckdyb3VwXCIsXCJtb3VzZWVudGVyXCIse1xuICAgICAgICAgICAgICAgIFwicmVjdHVwXCI6e1xuICAgICAgICAgICAgICAgICAgICBcInN0cm9rZVRoaWNrbmVzc1wiOiBuZXcgVGhpY2tuZXNzKDIsMiwyLDApXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInJlY3Rkb3duXCI6e1xuICAgICAgICAgICAgICAgICAgICBcInN0cm9rZVRoaWNrbmVzc1wiOiBuZXcgVGhpY2tuZXNzKDIsMiwwLDIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcIm1vdXNlZW50ZXJcIik7XG4gICAgICAgICAgICB0aGlzLmFkZFN0YXRlU3R5bGUoXCJob3Zlckdyb3VwXCIsXCJtb3VzZWxlYXZlXCIse1xuICAgICAgICAgICAgICAgIFwicmVjdHVwXCI6e1xuICAgICAgICAgICAgICAgICAgICBcInN0cm9rZVRoaWNrbmVzc1wiOiBuZXcgVGhpY2tuZXNzKDEsMSwxLDApXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInJlY3Rkb3duXCI6e1xuICAgICAgICAgICAgICAgICAgICBcInN0cm9rZVRoaWNrbmVzc1wiOiBuZXcgVGhpY2tuZXNzKDEsMSwwLDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcIm1vdXNlbGVhdmVcIik7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkU3RhdGVTdHlsZShcInByZXNzR3JvdXBcIixcInByZXNzZWRcIix7XG4gICAgICAgICAgICAgICAgXCJyZWN0dXBcIjp7XG4gICAgICAgICAgICAgICAgICAgIFwiZmlsbFwiOiBuZXcgU29saWRDb2xvckJydXNoKFwiI0YxRjFGMVwiKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJyZWN0ZG93blwiOntcbiAgICAgICAgICAgICAgICAgICAgXCJmaWxsXCI6IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjRjFGMUYxXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcIm1vdXNlZG93blwiKTtcbiAgICAgICAgICAgIHRoaXMuYWRkU3RhdGVTdHlsZShcInByZXNzR3JvdXBcIixcInJlbGVhc2VkXCIse1xuICAgICAgICAgICAgICAgIFwicmVjdHVwXCI6e1xuICAgICAgICAgICAgICAgICAgICBcImZpbGxcIjogbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNGMUYxRjFcIilcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwicmVjdGRvd25cIjp7XG4gICAgICAgICAgICAgICAgICAgIFwiZmlsbFwiOiBuZXcgU29saWRDb2xvckJydXNoKFwiI0U1RTVFNVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXCJtb3VzZXVwXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGNvbnRlbnQoKTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGNvbnRlbnQodmFsdWU6IGFueSkge1xuICAgICAgICAgICAgaWYodGhpcy5fY29udGVudD09dmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2VkKFwiY29udGVudFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBjb250ZW50Y29udHJvbDpDb250cm9sID0gbnVsbDtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpe1xuICAgICAgICAgICAgICAgIGxldCB0eHQgPSBuZXcgVGV4dFZpZXcoXCJcIix2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB0eHQubWFyZ2luID0gbmV3IFRoaWNrbmVzcygxMCwxMCw1LDUpO1xuICAgICAgICAgICAgICAgIHR4dC5zZWxlY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29udGVudGNvbnRyb2wgPSB0eHQ7XG4gICAgICAgICAgICAgICAgY29udGVudGNvbnRyb2wuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnRlbnRjb250cm9sID0gPENvbnRyb2w+dmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRQcmVzZW50b3IuY29udGVudCA9IGNvbnRlbnRjb250cm9sO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIFRlbXBsYXRlQ29udHJvbHtcbiAgICAgICAgbWluVmFsdWU6bnVtYmVyO1xuICAgICAgICBtYXhWYWx1ZTpudW1iZXI7XG4gICAgICAgIHZhbHVlOm51bWJlcjtcbiAgICAgICAgcmFkaXVzOm51bWJlcj01O1xuICAgICAgICBwcml2YXRlIHJlY3RQcm9jOiBSZWN0O1xuICAgICAgICBwcml2YXRlIHJlY3RVcDogUmVjdDtcbiAgICAgICAgYmFyZmlsbDpCcnVzaDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5taW5WYWx1ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLm1heFZhbHVlID0gMTAwO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IDMwO1xuXG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGluaXRWaXN1YWxUcmVlKCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUgPSBuZXcgVmlzdWFsVHJlZSgpO1xuXG4gICAgICAgICAgICBsZXQgcm9vdEJvcmRlciA9IG5ldyBCb3JkZXIoXCJyb290XCIpO1xuICAgICAgICAgICAgbGV0IHJlY3RQcm9jID0gbmV3IFJlY3QoXCJyZWN0UHJvY1wiKTtcbiAgICAgICAgICAgIGxldCByZWN0QmcgPSBuZXcgUmVjdChcInJlY3RCZ1wiKTtcbiAgICAgICAgICAgIGxldCByZWN0VXAgPSBuZXcgUmVjdChcInJlY3RVcFwiKTtcblxuICAgICAgICAgICAgcmVjdFByb2Mud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLDApO1xuICAgICAgICAgICAgcmVjdFByb2MuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgcmVjdFByb2MuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuTGVmdDtcbiAgICAgICAgICAgIHJlY3RQcm9jLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgcmVjdFByb2MucmFkaXVzX3RvcF9sZWZ0ID0gdGhpcy5yYWRpdXM7XG4gICAgICAgICAgICByZWN0UHJvYy5yYWRpdXNfYm90dG9tX2xlZnQgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIHJlY3RQcm9jLmZpbGwgPSB0aGlzLmJhcmZpbGw7XG4gICAgICAgICAgICByZWN0UHJvYy5zdHJva2UgPSB0aGlzLnN0cm9rZTtcbiAgICAgICAgICAgIHJlY3RQcm9jLnN0cm9rZVRoaWNrbmVzcyA9IG5ldyBUaGlja25lc3ModGhpcy5zdHJva2VUaGlja25lc3MubGVmdCwwLHRoaXMuc3Ryb2tlVGhpY2tuZXNzLnRvcCx0aGlzLnN0cm9rZVRoaWNrbmVzcy5ib3R0b20pO1xuXG4gICAgICAgICAgICByZWN0Qmcud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICByZWN0QmcuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgcmVjdEJnLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHJlY3RCZy52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHJlY3RCZy5yYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIHJlY3RCZy5maWxsID0gdGhpcy5maWxsO1xuICAgICAgICAgICAgcmVjdEJnLnN0cm9rZSA9IHRoaXMuc3Ryb2tlO1xuICAgICAgICAgICAgcmVjdEJnLnN0cm9rZVRoaWNrbmVzcyA9IHRoaXMuc3Ryb2tlVGhpY2tuZXNzO1xuICAgICAgICAgICAgcmVjdEJnLnNoYWRvdyA9IHRoaXMuc2hhZG93O1xuXG4gICAgICAgICAgICBsZXQgdmxpbmVhciA9IG5ldyBWbGluZWFybGF5b3V0KFwiXCIpO1xuICAgICAgICAgICAgdmxpbmVhci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB2bGluZWFyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdmxpbmVhci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHZsaW5lYXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuXG4gICAgICAgICAgICB2bGluZWFyLmFkZENlbGwobmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS53ZWlnaHQsMSkpO1xuICAgICAgICAgICAgdmxpbmVhci5hZGRDZWxsKG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUud2VpZ2h0LDEpKTtcbiAgICAgICAgICAgIHZsaW5lYXIuYWRkQ2hpbGQocmVjdFVwKTtcbiAgICAgICAgICAgIHZsaW5lYXIuc2V0Q2VsbChyZWN0VXAsMCk7XG5cbiAgICAgICAgICAgIHJlY3RVcC53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsMCk7XG4gICAgICAgICAgICByZWN0VXAuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgcmVjdFVwLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHJlY3RVcC52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHJlY3RVcC5yYWRpdXNfdG9wX2xlZnQgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIHJlY3RVcC5zdHJva2UgPSB0aGlzLnN0cm9rZTtcbiAgICAgICAgICAgIHJlY3RVcC5vcGFjaXR5ID0gMC41O1xuICAgICAgICAgICAgcmVjdFVwLmZpbGwgPSBuZXcgU29saWRDb2xvckJydXNoKFwid2hpdGVcIik7XG4gICAgICAgICAgICByZWN0VXAuc3Ryb2tlVGhpY2tuZXNzID0gbmV3IFRoaWNrbmVzcyh0aGlzLnN0cm9rZVRoaWNrbmVzcy5sZWZ0LDAsdGhpcy5zdHJva2VUaGlja25lc3MudG9wLDApO1xuXG4gICAgICAgICAgICByb290Qm9yZGVyLmFkZENoaWxkKHJlY3RCZyk7XG4gICAgICAgICAgICByb290Qm9yZGVyLmFkZENoaWxkKHJlY3RQcm9jKTtcbiAgICAgICAgICAgIHJvb3RCb3JkZXIuYWRkQ2hpbGQodmxpbmVhcik7XG5cbiAgICAgICAgICAgIHRoaXMucmVjdFByb2MgPSByZWN0UHJvYztcbiAgICAgICAgICAgIHRoaXMucmVjdFVwID0gcmVjdFVwO1xuICAgICAgICAgICAgdGhpcy52aXN1YWxUcmVlLnJvb3RDb250YWluZXIgPSByb290Qm9yZGVyO1xuICAgICAgICB9XG5cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFZpc3VhbFRyZWUoKTtcbiAgICAgICAgICAgIHN1cGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB3ID0gdGhpcy5lc3RpbWF0ZVdpZHRoKCk7XG4gICAgICAgICAgICBsZXQgcmVjdGVuZCA9IHcvKHRoaXMubWF4VmFsdWUtdGhpcy5taW5WYWx1ZSkqKHRoaXMudmFsdWUtdGhpcy5taW5WYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnJlY3RQcm9jLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxyZWN0ZW5kKTtcbiAgICAgICAgICAgIHRoaXMucmVjdFVwLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxyZWN0ZW5kKTtcbiAgICAgICAgICAgIHN1cGVyLmRvTGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBTbGlkZXJCYXIgZXh0ZW5kcyBUZW1wbGF0ZUNvbnRyb2x7XG5cbiAgICAgICAgbWluVmFsdWU6bnVtYmVyO1xuICAgICAgICBtYXhWYWx1ZTpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3ZhbHVlOm51bWJlcjtcbiAgICAgICAgcmFkaXVzOm51bWJlcjtcbiAgICAgICAgaGFuZGxlRmlsbDogQnJ1c2g7XG4gICAgICAgIGhhbmRsZVN0cm9rZTogQnJ1c2g7XG4gICAgICAgIHByaXZhdGUgcmVjdEhhbmRsZTogUmVjdDtcbiAgICAgICAgcHJpdmF0ZSBtb3VzZWRvd25WYWx1ZTpudW1iZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMubWluVmFsdWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5tYXhWYWx1ZSA9IDEwMDtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gMzA7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IDEwO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVGaWxsID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNmNWY1ZjVcIik7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVN0cm9rZSA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjZTVlNWU1XCIpO1xuICAgICAgICAgICAgdGhpcy5maWxsID0gbmV3IFNvbGlkQ29sb3JCcnVzaChcIiNlNWU1ZTVcIik7XG4gICAgICAgICAgICB0aGlzLnN0cm9rZSA9IG5ldyBTb2xpZENvbG9yQnJ1c2goXCIjZTVlNWU1XCIpO1xuICAgICAgICAgICAgdGhpcy5tb3VzZWRvd25WYWx1ZSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydGllcy5wdXNoKFwidmFsdWVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICBpZih0aGlzLl92YWx1ZSA9PSB2YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQoXCJ2YWx1ZVwiKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGluaXRWaXN1YWxUcmVlKCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUgPSBuZXcgVmlzdWFsVHJlZSgpO1xuICAgICAgICAgICAgbGV0IHJvb3RCb3JkZXIgPSBuZXcgQm9yZGVyKFwicm9vdFwiKTtcblxuICAgICAgICAgICAgbGV0IHJlY3RTdGljayA9IG5ldyBSZWN0KFwic2xpZGVyU3RpY2tcIik7XG4gICAgICAgICAgICByZWN0U3RpY2suaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgcmVjdFN0aWNrLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuQ2VudGVyO1xuICAgICAgICAgICAgcmVjdFN0aWNrLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgcmVjdFN0aWNrLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsMik7XG4gICAgICAgICAgICByZWN0U3RpY2suZmlsbCA9IHRoaXMuZmlsbDtcbiAgICAgICAgICAgIHJlY3RTdGljay5zdHJva2UgPSB0aGlzLnN0cm9rZTtcbiAgICAgICAgICAgIHJlY3RTdGljay5zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKDEsMSwxLDEpO1xuICAgICAgICAgICAgcmVjdFN0aWNrLnNoYWRvdyA9IG5ldyBTaGFkb3dTZXR0aW5ncygwLDAsMTAsMCxcIiNjZmNmY2ZcIik7XG5cbiAgICAgICAgICAgIGxldCByZWN0SGFuZGxlID0gbmV3IFJlY3QoXCJzbGlkZXJIYW5kbGVcIik7XG4gICAgICAgICAgICByZWN0SGFuZGxlLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LkxlZnQ7XG4gICAgICAgICAgICByZWN0SGFuZGxlLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuQ2VudGVyO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS5yYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgICAgIHJlY3RIYW5kbGUud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLHRoaXMucmFkaXVzKjIpO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLHRoaXMucmFkaXVzKjIpO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS5maWxsID0gdGhpcy5oYW5kbGVGaWxsO1xuICAgICAgICAgICAgcmVjdEhhbmRsZS5zdHJva2UgPSB0aGlzLmhhbmRsZVN0cm9rZTtcbiAgICAgICAgICAgIHJlY3RIYW5kbGUuc3Ryb2tlVGhpY2tuZXNzID0gbmV3IFRoaWNrbmVzcygxLDEsMSwxKTtcbiAgICAgICAgICAgIHJlY3RIYW5kbGUuc2hhZG93ID0gbmV3IFNoYWRvd1NldHRpbmdzKDAsMCwxMCwwLFwiI2NmY2ZjZlwiKTtcblxuICAgICAgICAgICAgcm9vdEJvcmRlci5hZGRDaGlsZChyZWN0U3RpY2spO1xuICAgICAgICAgICAgcm9vdEJvcmRlci5hZGRDaGlsZChyZWN0SGFuZGxlKTtcblxuICAgICAgICAgICAgbGV0IG1vdXNlZG93blNjcmVlblggPSAwO1xuICAgICAgICAgICAgbGV0IG1vdXNlZG93blNjcmVlblkgPSAwO1xuICAgICAgICAgICAgbGV0IGlzbW91c2Vkb3duID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgZHggPSAwO1xuICAgICAgICAgICAgbGV0IGR5ID0gMDtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICQocmVjdEhhbmRsZS5nZXRSb290RWxlbWVudCgpKS5tb3VzZWRvd24oZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBtb3VzZWRvd25TY3JlZW5YID0gZS5zY3JlZW5YO1xuICAgICAgICAgICAgICAgIG1vdXNlZG93blNjcmVlblkgPSBlLnNjcmVlblk7XG4gICAgICAgICAgICAgICAgaXNtb3VzZWRvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYubW91c2Vkb3duVmFsdWUgPSBzZWxmLl92YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChkb2N1bWVudC5ib2R5KS5tb3VzZW1vdmUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZighaXNtb3VzZWRvd24pIHJldHVybjtcbiAgICAgICAgICAgICAgICBkeCA9IGUuc2NyZWVuWCAtIG1vdXNlZG93blNjcmVlblg7XG4gICAgICAgICAgICAgICAgZHkgPSBlLnNjcmVlblkgLSBtb3VzZWRvd25TY3JlZW5ZO1xuICAgICAgICAgICAgICAgIHNlbGYub25IYW5kbGVEcmFnKGR4LGR5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChkb2N1bWVudC5ib2R5KS5tb3VzZXVwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgbW91c2Vkb3duU2NyZWVuWCA9IGUuc2NyZWVuWDtcbiAgICAgICAgICAgICAgICBtb3VzZWRvd25TY3JlZW5ZID0gZS5zY3JlZW5ZO1xuICAgICAgICAgICAgICAgIGlzbW91c2Vkb3duID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgIHRoaXMudmlzdWFsVHJlZS5yb290Q29udGFpbmVyID0gcm9vdEJvcmRlcjtcbiAgICAgICAgICAgIHRoaXMucmVjdEhhbmRsZSA9IHJlY3RIYW5kbGU7XG4gICAgICAgIH1cblxuICAgICAgICBvbkhhbmRsZURyYWcoZHg6IG51bWJlciwgZHk6IG51bWJlcik6IGFueSB7XG4gICAgICAgICAgICBsZXQgdyA9IHRoaXMuZXN0aW1hdGVXaWR0aCgpO1xuICAgICAgICAgICAgbGV0IHYgPSB0aGlzLm1vdXNlZG93blZhbHVlICsgZHgvdyoodGhpcy5tYXhWYWx1ZS10aGlzLm1pblZhbHVlKTtcbiAgICAgICAgICAgIGlmKHY+dGhpcy5tYXhWYWx1ZSkgdiA9IHRoaXMubWF4VmFsdWU7XG4gICAgICAgICAgICBpZih2PHRoaXMubWluVmFsdWUpIHYgPSB0aGlzLm1pblZhbHVlO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHY7XG4gICAgICAgICAgICB0aGlzLmRvTGF5b3V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFZpc3VhbFRyZWUoKTtcbiAgICAgICAgICAgIHN1cGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB3ID0gdGhpcy5lc3RpbWF0ZVdpZHRoKCk7XG4gICAgICAgICAgICBsZXQgcmVjdGVuZCA9IHcvKHRoaXMubWF4VmFsdWUtdGhpcy5taW5WYWx1ZSkqKHRoaXMuX3ZhbHVlLXRoaXMubWluVmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5yZWN0SGFuZGxlLm1hcmdpbi5sZWZ0ID0gcmVjdGVuZDtcbiAgICAgICAgICAgIHN1cGVyLmRvTGF5b3V0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3BlcnR5QmluZGluZyhwcm9wZXJ0eVByb3ZpZGVyOlByb3BlcnR5UHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6YW55LCB0YXJnZXRQcm9wTmFtZTpzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6YW55LCBzb3VyY2VQcm9wTmFtZTpzdHJpbmcsIG1vZGU6IEJpbmRpbmdNb2RlID0gQmluZGluZ01vZGUuT25ld2F5KTogUHJvcGVydHlCaW5kaW5nIHtcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvcGVydHlCaW5kaW5nKHByb3BlcnR5UHJvdmlkZXIpO1xuICAgICAgICBwLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgcC5zb3VyY2VQcm9wZXJ0eU5hbWUgPSBzb3VyY2VQcm9wTmFtZTtcbiAgICAgICAgcC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHAudGFyZ2V0UHJvcGVydHlOYW1lID0gdGFyZ2V0UHJvcE5hbWU7XG4gICAgICAgIHAubW9kZSA9IG1vZGU7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRVbml2ZXJzYWxQcm9wZXJ0eVByb3ZpZGVyKCkgOiBVbml2ZXJzYWxQcm9wZXJ0eVByb3ZpZGVyIHtcblxuICAgICAgICBsZXQgZ2V0dGVyUHJvdmlkZXIgPSBuZXcgVW5pdmVyc2FsUHJvcGVydHlHZXR0ZXJQcm92aWRlcigpO1xuICAgICAgICBsZXQgc2V0dGVyUHJvdmlkZXIgPSBuZXcgVW5pdmVyc2FsUHJvcGVydHlTZXR0ZXJQcm92aWRlcigpO1xuICAgICAgICBsZXQgbGlzdGVuZXJQcm92aWRlciA9IG5ldyBVbml2ZXJzYWxQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKCk7XG5cbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IENvbnRyb2xQcm9wZXJ0eUdldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBnZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tV2lkdGhQcm9wZXJ0eUdldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBnZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tSGVpZ2h0UHJvcGVydHlHZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgZ2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVRleHRQcm9wZXJ0eUdldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBnZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tVmFsdWVQcm9wZXJ0eUdldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBnZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRGljdFByb3BlcnR5R2V0dGVyUHJvdmlkZXIoKSk7XG5cbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IENvbnRyb2xQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBzZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tV2lkdGhQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBzZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tSGVpZ2h0UHJvcGVydHlTZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVRleHRQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBzZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tVmFsdWVQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBzZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRGljdFByb3BlcnR5U2V0dGVyUHJvdmlkZXIoKSk7XG5cbiAgICAgICAgbGlzdGVuZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgQ29udHJvbFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIoKSk7XG4gICAgICAgIGxpc3RlbmVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVNpemVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKCkpO1xuICAgICAgICBsaXN0ZW5lclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEb21UZXh0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpKTtcbiAgICAgICAgbGlzdGVuZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tVmFsdWVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKCkpO1xuICAgICAgICBsaXN0ZW5lclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEaWN0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpKTtcblxuICAgICAgICByZXR1cm4gbmV3IFVuaXZlcnNhbFByb3BlcnR5UHJvdmlkZXIoZ2V0dGVyUHJvdmlkZXIsIHNldHRlclByb3ZpZGVyLCBsaXN0ZW5lclByb3ZpZGVyKTtcbiAgICB9XG5cbn0iXX0=
