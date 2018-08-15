var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            child.parent = null;
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
    var FrameworkElement = (function () {
        function FrameworkElement(name) {
            this.name = name;
            // Init vairables.
            this.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            this.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            this.margin = new LayoutLzg.Thickness(0, 0, 0, 0);
            this.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, 50);
            this.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, 50);
        }
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
        return FrameworkElement;
    }());
    LayoutLzg.FrameworkElement = FrameworkElement;
    // Control class is the base class of all the visual components.
    var Control = (function (_super) {
        __extends(Control, _super);
        // // Internal vairable. Indicate the container's width of this control is calculatable.
        // isParentSlotWidthCalculatable : boolean;
        // // Internal vairable. Indicate the container's height of this control is calculatable.
        // isParentSlotHeightCalculatable : boolean;
        // // Internal vairable. Parent slot width.
        // // Slot means the space where the control is placed,
        // // it may be the whole of it's container or a part of it's container.
        // parentSlotWidth:number;
        // // Internal vairable. Parent slot height.
        // parentSlotHeight:number;
        function Control(name) {
            _super.call(this, name);
            this.strokeThickness = new LayoutLzg.Thickness(0, 0, 0, 0);
        }
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
    var ContentPresenter = (function () {
        function ContentPresenter() {
        }
        return ContentPresenter;
    }());
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
        };
        SolidColorBrush.prototype.applyToBorder = function (elem, thickness) {
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
            this.text = text;
            this.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
        }
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
            $(this.spanElem).text(this.text);
            if (this.wordWrap)
                $(this.spanElem).css('word-break', 'break-all');
            else
                $(this.spanElem).css('word-break', 'normal');
        };
        TextView.prototype.doLayout = function () {
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
            this.rx = 0;
            this.ry = 0;
        }
        Rect.prototype.assembleDom = function () {
            _super.prototype.assembleDom.call(this);
        };
        Rect.prototype.doLayout = function () {
            _super.prototype.doLayout.call(this);
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
                    this.parentSlot.isSlotWidthCalculatable = true;
                    this.parentSlot.calulatedSlotWidth = this.width.value;
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
                child.doLayout();
                $(wrapperDiv).css('position', 'absolute');
                $(wrapperDiv).css('left', child.margin.left + 'px');
                $(wrapperDiv).css('right', child.margin.right + 'px');
                $(wrapperDiv).css('top', child.margin.top + 'px');
                $(wrapperDiv).css('bottom', child.margin.bottom + 'px');
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
                $(this.rootElem).attr('layout-type', 'HorizonalLinearLayout');
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
                if (this.parentSlot.isSlotWidthCalculatable && this.verticalAlignment == LayoutLzg.VerticalAlignment.Strech) {
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
    var VisualTree = (function () {
        function VisualTree() {
        }
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
        }
        TemplateControl.prototype.getRootElement = function () {
            return this.rootBorder.getRootElement();
        };
        TemplateControl.prototype.assembleDom = function () {
            this.rootBorder.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this.rootBorder.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.auto, 0);
            this.rootBorder.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            this.rootBorder.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            this.rootBorder.addChild(this.visualTree.rootContainer);
            this.visualTree.rootContainer.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            this.visualTree.rootContainer.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            this.rootBorder.parentSlot = this.parentSlot;
            this.rootBorder.parent = this.parent;
            this.rootBorder.initCalculableSlots();
            this.rootBorder.assembleDom();
        };
        TemplateControl.prototype.doLayout = function () {
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
        function getObjectConfig(obj) {
            if (!(configPropertyName in obj)) {
                obj[configPropertyName] = {
                    parent: null,
                    propertyName: null,
                    props: {},
                    propChangedCallbackList: [],
                    notifyPropertyChanged: function (args) {
                        for (var i = 0; i < this.propChangedCallbackList.length; i++) {
                            var callback = this.propChangedCallbackList[i];
                            callback(args);
                        }
                        var cfg = getObjectConfig(args.obj);
                        if (cfg.parent) {
                            var parentCfg = getObjectConfig(cfg.parent);
                            parentCfg.notifyPropertyChanged(new PropertyChangedEventArgs(cfg.parent, cfg.propertyName + "." + args.propertyName, args.oldValue, args.newValue));
                        }
                    },
                    addPropertyChangedCallback: function (callback) {
                        this.propChangedCallbackList.push(callback);
                    },
                    removePropertyChangedCallback: function (callback) {
                        var idx = this.propChangedCallbackList.indexOf(callback);
                        if (idx > -1) {
                            this.propChangedCallbackList.splice(idx, 1);
                        }
                    }
                };
            }
            return obj[configPropertyName];
        }
        ObserverModel.getObjectConfig = getObjectConfig;
        function injectProperties(obj) {
            if (obj == null)
                return;
            var cfg = getObjectConfig(obj);
            for (var propertyName in obj) {
                if (propertyName == configPropertyName)
                    continue;
                if (!obj.hasOwnProperty(propertyName))
                    continue;
                var propValue = obj[propertyName];
                if (toString.call(propValue) == '[object Function]') {
                    continue;
                }
                else if (toString.call(propValue) == '[object Object]') {
                    injectProperties(propValue);
                }
                var descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
                if ('value' in descriptor) {
                    var t = descriptor.value;
                    if (toString.call(t) == '[object Function]') {
                        continue;
                    }
                    else if (toString.call(propValue) == '[object Object]') {
                        injectProperties(propValue);
                        var childCfg = getObjectConfig(propValue);
                        childCfg.parent = obj;
                        childCfg.propertyName = propertyName;
                    }
                }
                else {
                    continue;
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
                self.callback.apply(this, [self.obj]);
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
        Binding.prototype.startBinding = function () {
        };
        Binding.prototype.stopBinding = function () {
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
        function FunctionBinding() {
            _super.apply(this, arguments);
        }
        FunctionBinding.prototype.update = function () {
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
        };
        PropertyBinding.prototype.stopBinding = function () {
            if (this.sourcePropListener)
                this.sourcePropListener.dispose();
        };
        PropertyBinding.prototype.dispose = function () {
            this.stopBinding();
        };
        PropertyBinding.prototype.updateFromSource = function () {
            var v = this.sourcePropGetter.getValue();
            var old_v = this.targetPropGetter.getValue();
            if (v == old_v)
                return;
            this.targetPropSetter.setValue(v);
        };
        PropertyBinding.prototype.updateFromTarget = function () {
            var v = this.targetPropGetter.getValue();
            var old_v = this.sourcePropGetter.getValue();
            if (v == old_v)
                return;
            this.sourcePropSetter.setValue(v);
        };
        return PropertyBinding;
    }(LayoutLzg.Binding));
    LayoutLzg.PropertyBinding = PropertyBinding;
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
        p.startBinding();
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
        getterProvider.addProvider(new LayoutLzg.DomWidthPropertyGetterProvider());
        getterProvider.addProvider(new LayoutLzg.DomHeightPropertyGetterProvider());
        getterProvider.addProvider(new LayoutLzg.DomTextPropertyGetterProvider());
        getterProvider.addProvider(new LayoutLzg.DictPropertyGetterProvider());
        setterProvider.addProvider(new LayoutLzg.DomWidthPropertySetterProvider());
        setterProvider.addProvider(new LayoutLzg.DomHeightPropertySetterProvider());
        setterProvider.addProvider(new LayoutLzg.DomTextPropertySetterProvider());
        setterProvider.addProvider(new LayoutLzg.DictPropertySetterProvider());
        listenerProvider.addProvider(new LayoutLzg.DomSizePropertyChangedListenerProvider());
        listenerProvider.addProvider(new LayoutLzg.DomTextPropertyChangedListenerProvider());
        listenerProvider.addProvider(new LayoutLzg.DictPropertyChangedListenerProvider());
        return new LayoutLzg.UniversalPropertyProvider(getterProvider, setterProvider, listenerProvider);
    }
    LayoutLzg.getDefaultUniversalPropertyProvider = getDefaultUniversalPropertyProvider;
})(LayoutLzg || (LayoutLzg = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50YnVzL2V2ZW50YnVzLnRzIiwibGF5b3V0YmFzZS50cyIsImxheW91dGNvcmUudHMiLCJjb2xsZWN0aW9ucy9saXN0LnRzIiwiY29sbGVjdGlvbnMvbWFwLnRzIiwiYnJ1c2hlcy9zb2xpZGNvbG9yYnJ1c2gudHMiLCJicnVzaGVzL2ltYWdlY29sb3JicnVzaC50cyIsImJydXNoZXMvZ3JhZGllbnRjb2xvcmJydXNoLnRzIiwiY29udHJvbHMvY29udHJvbGJhc2UudHMiLCJjb250cm9scy90ZXh0dmlldy50cyIsImNvbnRyb2xzL3JlY3QudHMiLCJjb250cm9scy9pbWFnZS50cyIsImNvbnRhaW5lcnMvY29udGFpbmVyYmFzZS50cyIsImNvbnRhaW5lcnMvYm9yZGVyLnRzIiwiY29udGFpbmVycy9ob3Jpem9uYWxsaW5lYXJsYXlvdXQudHMiLCJjb250YWluZXJzL3ZlcnRpY2FsbGluZWFybGF5b3V0LnRzIiwidmlzdWFsdHJlZS92aXN1YWx0cmVlLnRzIiwidmlzdWFsdHJlZS90ZW1wbGF0ZWNvbnRyb2wudHMiLCJvYnNlcnZlci9vYnNlcnZhYmxlb2JqZWN0aW5qZWN0b3IudHMiLCJvYnNlcnZlci9wcm9wZXJ0eWJhc2UudHMiLCJvYnNlcnZlci9kb21zaXplcHJvcGVydHkudHMiLCJvYnNlcnZlci9kb210ZXh0cHJvcGVydHkudHMiLCJvYnNlcnZlci9kaWN0cHJvcGVydHkudHMiLCJiaW5kaW5ncy9iaW5kaW5nLnRzIiwiYmluZGluZ3MvZnVuY3Rpb25iaW5kaW5nLnRzIiwiYmluZGluZ3MvcHJvcGVydHliaW5kaW5nLnRzIiwiZmFjYWRlcy9iaW5kaW5nLnRzIiwiYm9vdHN0cmFwL3Byb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxTQUFTLENBMEJsQjtBQTFCRCxXQUFVLFNBQVMsRUFBQyxDQUFDO0lBRWpCO1FBS0ksbUJBQVksSUFBWSxFQUFFLElBQVE7WUFGMUIsaUJBQVksR0FBMEIsSUFBSSxj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LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBjbGFzcyBFdmVudEl0ZW0ge1xuICAgICAgICBuYW1lIDogc3RyaW5nO1xuICAgICAgICBwcml2YXRlIGFyZ3M6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFja2xpc3Q6TGlzdDwoYXJnczphbnkpPT52b2lkPiA9IG5ldyBMaXN0PChhcmdzOmFueSk9PnZvaWQ+KCk7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBhcmdzOmFueSkge1xuICAgICAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRXZlbnRCdXMge1xuICAgICAgICBjYWxsYmFjayA6IExpc3Q8RXZlbnRJdGVtPiA9IG5ldyBMaXN0PEV2ZW50SXRlbT4oKTtcblxuICAgICAgICBwdWIobmFtZTpzdHJpbmcgLGFyZ3M6YW55KSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmFkZChuZXcgRXZlbnRJdGVtKG5hbWUsIGFyZ3MpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1YihuYW1lOnN0cmluZywgY2FsbGJhY2s6KGFyZ3M6YW55KT0+dm9pZCkge1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGVudW0gSG9yaXpvbkFsaWdubWVudCB7XG4gICAgICAgIFN0cmVjaCxcbiAgICAgICAgTGVmdCxcbiAgICAgICAgUmlnaHQsXG4gICAgICAgIENlbnRlclxuICAgIH1cblxuICAgIGV4cG9ydCBlbnVtIFZlcnRpY2FsQWxpZ25tZW50e1xuICAgICAgICBTdHJlY2gsXG4gICAgICAgIFRvcCxcbiAgICAgICAgQm90dG9tLFxuICAgICAgICBDZW50ZXJcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBEaXN0YW5jZVR5cGV7XG4gICAgICAgIGF1dG8sXG4gICAgICAgIGZpeGVkLFxuICAgICAgICB3ZWlnaHRcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBTdGFja1BhbmVsT3JpZW50YXRpb24ge1xuICAgICAgICBIb3Jpem9uYWwsXG4gICAgICAgIFZlcnRpY2FsXG4gICAgfVxuXG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEJydXNoe1xuICAgICAgICBhcHBseVRvQmFja2dyb3VuZChlbGVtOkhUTUxFbGVtZW50KTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOlRoaWNrbmVzcyk6dm9pZDtcbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOm51bWJlcik6dm9pZDtcbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOkhUTUxFbGVtZW50LHRoaWNrbmVzczpudW1iZXIpOnZvaWQ7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgVGhpY2tuZXNze1xuICAgICAgICBsZWZ0Om51bWJlcjtcbiAgICAgICAgcmlnaHQ6bnVtYmVyO1xuICAgICAgICB0b3A6bnVtYmVyO1xuICAgICAgICBib3R0b206bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIGJvdHRvbTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgICAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgICAgICAgICAgdGhpcy50b3AgPSB0b3A7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaXN0YW5jZXtcbiAgICAgICAgdmFsdWU6bnVtYmVyO1xuICAgICAgICB0eXBlOkRpc3RhbmNlVHlwZTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBEaXN0YW5jZVR5cGUsIHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuIiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBTbG90IHtcbiAgICAgICAgY2hpbGRyZW46TGlzdDxDb250cm9sPiA9IG5ldyBMaXN0PENvbnRyb2w+KCk7XG4gICAgICAgIGlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlIDogYm9vbGVhbjtcbiAgICAgICAgaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlIDogYm9vbGVhbjtcbiAgICAgICAgY2FsdWxhdGVkU2xvdFdpZHRoIDogbnVtYmVyO1xuICAgICAgICBjYWx1bGF0ZWRTbG90SGVpZ2h0IDogbnVtYmVyO1xuICAgICAgICBjb250YWluZXIgOiBDb250YWluZXJDb250cm9sO1xuXG4gICAgICAgIGFkZENoaWxkKGNoaWxkIDogQ29udHJvbCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmFkZChjaGlsZCk7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90ID0gdGhpcztcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDaGlsZChjaGlsZCA6IENvbnRyb2wpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5yZW1vdmUoY2hpbGQpO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBlbXB0eSgpOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGcmFtZXdvcmtFbGVtZW50IHtcbiAgICAgICAgLy8gTmFtZSBvZiB0aGlzIGNvbnRyb2wuXG4gICAgICAgIG5hbWU6c3RyaW5nO1xuICAgICAgICAvLyBXaWR0aCBvZiB0aGlzIENvbnRyb2wsIGl0IGNhbiBiZSBhIGZpeCB2YWx1ZSBvciBhdXRvLlxuICAgICAgICB3aWR0aDpEaXN0YW5jZTtcbiAgICAgICAgLy8gSGVpZ2h0IG9mIHRoaXMgQ29udHJvbCwgaXQgY2FuIGJlIGEgZml4IHZhbHVlIG9yIGF1dG8uXG4gICAgICAgIGhlaWdodDpEaXN0YW5jZTtcbiAgICAgICAgLy8gSG9yaXpvbmFsIGFsaWdubWVudCBvZiB0aGlzIGNvbnRyb2wgaW4gaXQncyBwYXJlbnQgY29udGFpbmVyXG4gICAgICAgIGhvcml6b25BbGlnbm1lbnQgOiBIb3Jpem9uQWxpZ25tZW50O1xuICAgICAgICAvLyBWZXJ0aWNhbCBhbGlnbm1lbnQgb2YgdGhpcyBjb250cm9sIGluIGl0J3MgcGFyZW50IGNvbnRhaW5lclxuICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudCA6IFZlcnRpY2FsQWxpZ25tZW50O1xuICAgICAgICAvLyBNYXJnaW4gb2YgdGhpcyBjb250cm9sIHRvIGl0J3MgcGFyZW50LCB0aGUgdmFsdWUgaW4gdGhpY2tuZXNzIG11c3QgYmUgYSBmaXggdmFsdWUuXG4gICAgICAgIG1hcmdpbjpUaGlja25lc3M7XG5cbiAgICAgICAgcGFyZW50U2xvdDpTbG90O1xuICAgICAgICBwYXJlbnQ6Q29udGFpbmVyQ29udHJvbDtcbiAgICAgICAgLy8gcm9vdCBkaXYgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICByb290RWxlbTpIVE1MRWxlbWVudDtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIC8vIEluaXQgdmFpcmFibGVzLlxuICAgICAgICAgICAgdGhpcy5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdGhpcy5tYXJnaW4gPSBuZXcgVGhpY2tuZXNzKDAsMCwwLDApO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsNTApO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLDUwKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IHRoZSByb290IGVsZW1lbnQgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICBhYnN0cmFjdCBnZXRSb290RWxlbWVudCgpOkhUTUxFbGVtZW50O1xuXG4gICAgICAgIC8vIEVzdGltYXRlIHRoZSB3aWR0aCBvZiB0aGlzIGNvbnRyb2wsXG4gICAgICAgIC8vIHRoZSBzaXplIG9mIHRoaXMgY29udHJvbCBpcyBkZXRlcm1pbmVkIGJ5IG1hbnkgZmFjdG9ycyxcbiAgICAgICAgLy8gZm9yIGV4YW1wbGUgOiBhdXRvL2ZpeCB2YWx1ZSBvZiB3aWR0aC9oZWlnaHQsIHBhcmVudCBjb250YWluZXIsIGhvcml6b25hbC92ZXJ0aWNhbCBhbGlnbm1lbnRzLCBtYXJnaW5z44CCXG4gICAgICAgIC8vIEZvciBkaWZmZXJlbnQgdHlwZXMgb2YgcGFyZW50IGNvbnRhaW5lcnMsIHRoZSBtZXRob2Qgb2Ygc2l6ZSBlc3RpbWF0aW9uIGFyZSB0b3RhbGx5IGRpZmZlcmVudC5cbiAgICAgICAgZXN0aW1hdGVXaWR0aCgpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVzdGltYXRlIHRoZSB3aWR0aCBvZiB0aGlzIGNvbnRyb2wsXG4gICAgICAgIC8vIHRoZSBzaXplIG9mIHRoaXMgY29udHJvbCBpcyBkZXRlcm1pbmVkIGJ5IG1hbnkgZmFjdG9ycyxcbiAgICAgICAgLy8gZm9yIGV4YW1wbGUgOiBhdXRvL2ZpeCB2YWx1ZSBvZiB3aWR0aC9oZWlnaHQsIHBhcmVudCBjb250YWluZXIsIGhvcml6b25hbC92ZXJ0aWNhbCBhbGlnbm1lbnRzLCBtYXJnaW5z44CCXG4gICAgICAgIC8vIEZvciBkaWZmZXJlbnQgdHlwZXMgb2YgcGFyZW50IGNvbnRhaW5lcnMsIHRoZSBtZXRob2Qgb2Ygc2l6ZSBlc3RpbWF0aW9uIGFyZSB0b3RhbGx5IGRpZmZlcmVudC5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTpudW1iZXJ7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFzc2VtYmxlIGh0bWwgZWxlbWVudHMgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICBhc3NlbWJsZURvbSgpOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRqdXN0IHN0eWxlcyBodG1sIGVsZW1lbnRzIG9mIHRoaXMgY29udHJvbC5cbiAgICAgICAgZG9MYXlvdXQoKTp2b2lke1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgLy8gQ29udHJvbCBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBvZiBhbGwgdGhlIHZpc3VhbCBjb21wb25lbnRzLlxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250cm9sIGV4dGVuZHMgRnJhbWV3b3JrRWxlbWVudCBpbXBsZW1lbnRzIERpc3Bvc2FibGV7XG5cbiAgICAgICAgLy8gQmFja2dyb3VuZCBvZiB0aGlzIGNvbnRyb2wsIGl0IGNhbiBiZSBhIHNvbGlkIGNvbG9yLCBvciBhIGdyYWRpZW50IGNvbG9yICwgb3IgYSBwaWN0dXJlLlxuICAgICAgICBmaWxsOkJydXNoO1xuICAgICAgICAvLyBCb3JkZXIgb2YgdGhpcyBjb250cm9sLCBpdCBjYW4gYmUgYSBzb2xpZCBjb2xvciwgb3IgYSBncmFkaWVudCBjb2xvciAsIG9yIGEgcGljdHVyZS5cbiAgICAgICAgc3Ryb2tlOkJydXNoO1xuICAgICAgICAvLyBUaGlja25lc3Mgb2YgdGhpcyBjb250cm9sJ3MgYm9yZGVyLCB0aGUgdmFsdWUgaW4gdGhpY2tuZXNzIG11c3QgYmUgYSBmaXggdmFsdWUuXG4gICAgICAgIHN0cm9rZVRoaWNrbmVzczpUaGlja25lc3M7XG5cbiAgICAgICAgLy8gLy8gSW50ZXJuYWwgdmFpcmFibGUuIEluZGljYXRlIHRoZSBjb250YWluZXIncyB3aWR0aCBvZiB0aGlzIGNvbnRyb2wgaXMgY2FsY3VsYXRhYmxlLlxuICAgICAgICAvLyBpc1BhcmVudFNsb3RXaWR0aENhbGN1bGF0YWJsZSA6IGJvb2xlYW47XG4gICAgICAgIC8vIC8vIEludGVybmFsIHZhaXJhYmxlLiBJbmRpY2F0ZSB0aGUgY29udGFpbmVyJ3MgaGVpZ2h0IG9mIHRoaXMgY29udHJvbCBpcyBjYWxjdWxhdGFibGUuXG4gICAgICAgIC8vIGlzUGFyZW50U2xvdEhlaWdodENhbGN1bGF0YWJsZSA6IGJvb2xlYW47XG4gICAgICAgIC8vIC8vIEludGVybmFsIHZhaXJhYmxlLiBQYXJlbnQgc2xvdCB3aWR0aC5cbiAgICAgICAgLy8gLy8gU2xvdCBtZWFucyB0aGUgc3BhY2Ugd2hlcmUgdGhlIGNvbnRyb2wgaXMgcGxhY2VkLFxuICAgICAgICAvLyAvLyBpdCBtYXkgYmUgdGhlIHdob2xlIG9mIGl0J3MgY29udGFpbmVyIG9yIGEgcGFydCBvZiBpdCdzIGNvbnRhaW5lci5cbiAgICAgICAgLy8gcGFyZW50U2xvdFdpZHRoOm51bWJlcjtcbiAgICAgICAgLy8gLy8gSW50ZXJuYWwgdmFpcmFibGUuIFBhcmVudCBzbG90IGhlaWdodC5cbiAgICAgICAgLy8gcGFyZW50U2xvdEhlaWdodDpudW1iZXI7XG5cblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyl7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuc3Ryb2tlVGhpY2tuZXNzID0gbmV3IFRoaWNrbmVzcygwLDAsMCwwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IGRpc3Bvc2UoKTogdm9pZDtcbiAgICB9XG5cbiAgICAvLyBUaGUgcHVycG9zZSBvZiB0aGUgY29udGFpbmVyIGlzIHRvIHB1dCBzdWIgY29udHJvbHMgdG9nZXRoZXIsXG4gICAgLy8gYW5kIHRoZSBzeXN0ZW0gcHJvdmlkZXMgbXVsdGlwbGUgbGF5b3V0IGNvbnRhaW5lcnMgZHVlIHRvIGFjdHVhbCByZXF1aXJlbWVudHMuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbnRhaW5lckNvbnRyb2wgZXh0ZW5kcyBDb250cm9se1xuICAgICAgICBwcm90ZWN0ZWQgY2hpbGRyZW46TGlzdDxDb250cm9sPjtcbiAgICAgICAgcHJvdGVjdGVkIHNsb3RzIDogTGlzdDxTbG90PjtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBuZXcgTGlzdDxDb250cm9sPigpO1xuICAgICAgICAgICAgdGhpcy5zbG90cyA9IG5ldyBMaXN0PFNsb3Q+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDaGlsZChjb250cm9sOkNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uYWRkKGNvbnRyb2wpO1xuICAgICAgICAgICAgY29udHJvbC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGQoY29udHJvbDpDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnJlbW92ZShjb250cm9sKTtcbiAgICAgICAgICAgIGNvbnRyb2wucGFyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyQ2hpbGQoKTp2b2lke1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudFNsb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdENhbGN1bGFibGVTbG90cygpOnZvaWQge1xuICAgICAgICB9XG5cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNoaWxkLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBDb250ZW50UHJlc2VudGVyIHtcblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBJdGVtc1ByZXNlbnRlciB7XG5cbiAgICB9XG59XG5cblxuIiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBmdW5jdGlvbiB0ZXN0TGlzdCgpOnZvaWR7XG5cbiAgICAgICAgbGV0IGxpdGVyYWwxID0gbmV3IExheW91dEx6Zy5UZXh0VmlldygnYScsJzExMTExJyk7XG4gICAgICAgIGxldCBsaXRlcmFsMiA9IG5ldyBMYXlvdXRMemcuVGV4dFZpZXcoJ2EnLCcyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMicpO1xuICAgICAgICBsZXQgbGl0ZXJhbDMgPSBuZXcgTGF5b3V0THpnLlRleHRWaWV3KCdhJywnMzMzMzMzMzMzMycpO1xuXG5cbiAgICAgICAgbGV0IGxzdCA9IG5ldyBMaXN0PFRleHRWaWV3PigpO1xuICAgICAgICBsc3QuYWRkKGxpdGVyYWwxKTtcbiAgICAgICAgbHN0LmFkZChsaXRlcmFsMik7XG4gICAgICAgIGxzdC5hZGQobGl0ZXJhbDMpO1xuICAgICAgICBsc3QuY2xlYXIoKTtcbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBMaXN0PFQ+IGV4dGVuZHMgQXJyYXk8VD57XG5cbiAgICAgICAgYWRkKGl0ZW06VCkgOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLnB1c2goaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRBbGwoaXRlbXM6QXJyYXk8VD4pIDogdm9pZCB7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPGl0ZW1zLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChpdGVtc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmUoaXRlbTpUKTp2b2lkIHtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cml0ZW0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGN1cml0ZW09PWl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVBbGwoaXRlbXM6QXJyYXk8VD4pIDp2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPGl0ZW1zLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXIoKSA6dm9pZCB7XG4gICAgICAgICAgICBzdXBlci5zcGxpY2UoMCx0aGlzLmxlbmd0aCk7XG4gICAgICAgIH1cblxuXG5cblxuXG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBmdW5jdGlvbiB0ZXN0bWFwKCk6dm9pZHtcbiAgICAgICAgbGV0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLG51bWJlcj4oKTtcbiAgICAgICAgbWFwLnB1dCgnYScsMzMpO1xuICAgICAgICBtYXAucHV0KCdiJyw0Myk7XG4gICAgICAgIGxldCBiID0gbWFwLmdldCgnYicpO1xuICAgICAgICBsZXQgYSA9IG1hcC5nZXQoJ2EnKTtcbiAgICAgICAgbWFwLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgY2xhc3MgTWFwSXRlbTxUS2V5LFRWYWx1ZT4ge1xuICAgICAgICBrZXkgOiBUS2V5O1xuICAgICAgICB2YWx1ZSA6IFRWYWx1ZTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihrZXk6IFRLZXksIHZhbHVlOiBUVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIE1hcDxUS2V5LFRWYWx1ZT4gZXh0ZW5kcyBBcnJheTxNYXBJdGVtPFRLZXksVFZhbHVlPj57XG5cbiAgICAgICAgcHV0KGtleTpUS2V5LCB2YWx1ZTpUVmFsdWUpIDogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnB1c2gobmV3IE1hcEl0ZW0oa2V5LHZhbHVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQoa2V5OlRLZXkpIDogVFZhbHVlIHwgYW55IHtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpc1tpXTtcbiAgICAgICAgICAgICAgICBpZihpdGVtLmtleT09a2V5KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhcigpIDp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlKDAsdGhpcy5sZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbnNLZXkoa2V5OlRLZXkpOmJvb2xlYW4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0ua2V5PT1rZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgY2xhc3MgU29saWRDb2xvckJydXNoIGltcGxlbWVudHMgQnJ1c2h7XG4gICAgICAgIGNvbG9yOnN0cmluZztcbiAgICAgICAgY29uc3RydWN0b3IoY29sb3I6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9CYWNrZ3JvdW5kKGVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IExheW91dEx6Zy5UaGlja25lc3MpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJMZWZ0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclJpZ2h0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclRvcChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJCb3R0b20oZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGNsYXNzIEltYWdlQ29sb3JCcnVzaCBpbXBsZW1lbnRzIEJydXNoe1xuICAgICAgICBjb2xvcjpzdHJpbmc7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbG9yOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQmFja2dyb3VuZChlbGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuXG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IExheW91dEx6Zy5UaGlja25lc3MpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJMZWZ0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclJpZ2h0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclRvcChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJCb3R0b20oZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGNsYXNzIEdyYWRpZW50Q29sb3JCcnVzaCBpbXBsZW1lbnRzIEJydXNoe1xuICAgICAgICBjb2xvcjpzdHJpbmc7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbG9yOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQmFja2dyb3VuZChlbGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlcihlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBMYXlvdXRMemcuVGhpY2tuZXNzKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyTGVmdChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJSaWdodChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJUb3AoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyQm90dG9tKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29udHJvbEJhc2UgZXh0ZW5kcyBDb250cm9sIHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0XG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVXaWR0aF9hdXRvKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVXaWR0aF9hdXRvKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlSGVpZ2h0X2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZUhlaWdodF9hdXRvKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290RWxlbSA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RFbGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3QgZXN0aW1hdGVXaWR0aF9hdXRvKCk6IG51bWJlcjtcblxuICAgICAgICBhYnN0cmFjdCBlc3RpbWF0ZUhlaWdodF9hdXRvKCk6IG51bWJlcjtcblxuXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7IFxuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGNsYXNzIFRleHRWaWV3IGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuXG4gICAgICAgIHRleHQ6c3RyaW5nO1xuICAgICAgICB3b3JkV3JhcDpib29sZWFuO1xuICAgICAgICBzcGFuRWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsdGV4dDpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdUZXh0VmlldycpO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LW5hbWUnLHRoaXMubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zcGFuRWxlbSA9ICQoXCI8c3Bhbj48L3NwYW4+XCIpWzBdO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmVtcHR5KCk7XG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMud2lkdGgudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2hlaWdodCcsdGhpcy5oZWlnaHQudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKHRoaXMuc3BhbkVsZW0pO1xuICAgICAgICAgICAgJCh0aGlzLnNwYW5FbGVtKS50ZXh0KHRoaXMudGV4dCk7XG4gICAgICAgICAgICBpZih0aGlzLndvcmRXcmFwKVxuICAgICAgICAgICAgICAgICQodGhpcy5zcGFuRWxlbSkuY3NzKCd3b3JkLWJyZWFrJywnYnJlYWstYWxsJyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgJCh0aGlzLnNwYW5FbGVtKS5jc3MoJ3dvcmQtYnJlYWsnLCdub3JtYWwnKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodF9hdXRvKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmZpbmQoJ3NwYW4nKS5oZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGhfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5maW5kKCdzcGFuJykud2lkdGgoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBSZWN0IGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuXG4gICAgICAgIHJ4Om51bWJlcjtcbiAgICAgICAgcnk6bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnJ4ID0gMDtcbiAgICAgICAgICAgIHRoaXMucnkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5kb0xheW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHRfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoX2F1dG8oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBJbWFnZVZpZXcgZXh0ZW5kcyBDb250cm9sQmFzZSB7XG5cbiAgICAgICAgaW1nRWxlbTpIVE1MRWxlbWVudDtcbiAgICAgICAgc3JjOnN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7IFxuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmVtcHR5KCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaW1nRWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1nRWxlbSA9ICQoXCI8aW1nLz5cIilbMF07XG4gICAgICAgICAgICAgICAgJCh0aGlzLmltZ0VsZW0pLmF0dHIoJ3NyYycsdGhpcy5zcmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmFwcGVuZCh0aGlzLmltZ0VsZW0pO1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd3aWR0aCcsdGhpcy53aWR0aC52YWx1ZSsncHgnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMuaW1nRWxlbSkuY3NzKCd3aWR0aCcsdGhpcy53aWR0aC52YWx1ZSsncHgnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICQodGhpcy5pbWdFbGVtKS5jc3MoJ3dpZHRoJywnMTAwJScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdoZWlnaHQnLHRoaXMuaGVpZ2h0LnZhbHVlKydweCcpO1xuICAgICAgICAgICAgICAgICQodGhpcy5pbWdFbGVtKS5jc3MoJ2hlaWdodCcsdGhpcy5oZWlnaHQudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkKHRoaXMuaW1nRWxlbSkuY3NzKCdoZWlnaHQnLCcxMDAlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodF9hdXRvKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGhfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29udGFpbmVyQmFzZSBleHRlbmRzIENvbnRhaW5lckNvbnRyb2wge1xuXG4gICAgICAgIHJvb3RFbGVtOkhUTUxFbGVtZW50O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5SaWdodClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlV2lkdGhfYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlV2lkdGhfYXV0bygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3BcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZUhlaWdodF9hdXRvKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVIZWlnaHRfYXV0bygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IGVzdGltYXRlV2lkdGhfYXV0bygpOm51bWJlciA7XG5cbiAgICAgICAgYWJzdHJhY3QgZXN0aW1hdGVIZWlnaHRfYXV0bygpOm51bWJlciA7XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYodGhpcy5yb290RWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGNsYXNzIEJvcmRlciBleHRlbmRzIENvbnRhaW5lckNvbnRyb2wge1xuXG4gICAgICAgIHdyYXBwZXJEb21zIDogQXJyYXk8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBwcml2YXRlIG1haW5TbG90IDogU2xvdDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLm1haW5TbG90ID0gbmV3IFNsb3QoKTtcbiAgICAgICAgICAgIHRoaXMubWFpblNsb3QuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdCb3JkZXInKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuXG4gICAgICAgIGFkZENoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgICAgIHRoaXMubWFpblNsb3QuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpbml0Q2FsY3VsYWJsZVNsb3RzKCk6dm9pZCB7XG5cbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSAmJiB0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlICYmIHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVyRG9tcyA9IFtdO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmVtcHR5KCk7XG5cbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkLmFzc2VtYmxlRG9tKCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlckRpdiA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgICAgICAgICAkKHdyYXBwZXJEaXYpLmF0dHIoJ2xheW91dC10YWcnLCd3cmFwcGVyJyk7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyRG9tcy5wdXNoKHdyYXBwZXJEaXYpO1xuICAgICAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5hcHBlbmQod3JhcHBlckRpdik7XG4gICAgICAgICAgICAgICAgJCh3cmFwcGVyRGl2KS5hcHBlbmQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3dpZHRoJyx0aGlzLmVzdGltYXRlV2lkdGgoKSsncHgnKTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2hlaWdodCcsdGhpcy5lc3RpbWF0ZUhlaWdodCgpKydweCcpO1xuXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlckRpdiA9IHRoaXMud3JhcHBlckRvbXNbaV07XG4gICAgICAgICAgICAgICAgY2hpbGQuZG9MYXlvdXQoKTtcblxuICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgJCh3cmFwcGVyRGl2KS5jc3MoJ2xlZnQnLGNoaWxkLm1hcmdpbi5sZWZ0KydweCcpO1xuICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuY3NzKCdyaWdodCcsY2hpbGQubWFyZ2luLnJpZ2h0KydweCcpO1xuICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuY3NzKCd0b3AnLGNoaWxkLm1hcmdpbi50b3ArJ3B4Jyk7XG4gICAgICAgICAgICAgICAgJCh3cmFwcGVyRGl2KS5jc3MoJ2JvdHRvbScsY2hpbGQubWFyZ2luLmJvdHRvbSsncHgnKTtcblxuICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgaWYoY2hpbGQuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2hpbGQuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5SaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygncmlnaHQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHcgPSBjaGlsZC5lc3RpbWF0ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3dyA9IHRoaXMuZXN0aW1hdGVXaWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeCA9ICh3dy13KS8yO1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygnbGVmdCcseCsncHgnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihjaGlsZC52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd0b3AnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdib3R0b20nLCcwcHgnKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcsJzBweCcpO1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygnYm90dG9tJywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2hpbGQudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlcil7XG4gICAgICAgICAgICAgICAgICAgIGxldCBoID0gY2hpbGQuZXN0aW1hdGVIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhoID0gdGhpcy5lc3RpbWF0ZUhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IChoaC1oKS8yO1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygndG9wJyx5KydweCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuZXN0aW1hdGVXaWR0aCgpK3QubWFyZ2luLmxlZnQrdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlV2lkdGgoKSArIHQubWFyZ2luLmxlZnQgKyB0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3BcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlSGVpZ2h0KCkrdC5tYXJnaW4udG9wK3QubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVIZWlnaHQoKSArIHQubWFyZ2luLnRvcCArIHQubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGNsYXNzIFNsb3RJdGVtIHtcbiAgICAgICAgc2xvdEJvcmRlcjpCb3JkZXI7XG4gICAgICAgIHNsb3REZWZpbmF0aW9uOkRpc3RhbmNlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHNsb3RCb3JkZXI6IEJvcmRlciwgc2xvdERlZmluYXRpb246IERpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLnNsb3RCb3JkZXIgPSBzbG90Qm9yZGVyO1xuICAgICAgICAgICAgdGhpcy5zbG90RGVmaW5hdGlvbiA9IHNsb3REZWZpbmF0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEhvcml6b25hbExpbmVhckxheW91dCBleHRlbmRzIENvbnRhaW5lckJhc2Uge1xuXG4gICAgICAgIHNsb3RNYXAgOiBNYXA8U2xvdCxTbG90SXRlbT47XG4gICAgICAgIGJvcmRlckVsZW06SFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zbG90TWFwID0gbmV3IE1hcDxTbG90LCBTbG90SXRlbT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENlbGwoZGlzdGFuY2U6RGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBzbG90ID0gbmV3IFNsb3QoKTtcbiAgICAgICAgICAgIHNsb3QuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuYWRkKHNsb3QpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2xvdE1hcC5jb250YWluc0tleShzbG90KSlcbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RNYXAucHV0KHNsb3QsbmV3IFNsb3RJdGVtKG51bGwsbnVsbCkpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgaXRlbS5zbG90RGVmaW5hdGlvbiA9IGRpc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLnJlbW92ZUNoaWxkKGNvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJDaGlsZCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmNsZWFyQ2hpbGQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldENlbGwoY29udHJvbDpDb250cm9sLCBjZWxsSW5kZXg6bnVtYmVyKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY29udHJvbCk7XG4gICAgICAgICAgICBpZihpZHg+LTEpe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tjZWxsSW5kZXhdO1xuICAgICAgICAgICAgICAgIHNsb3QuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290RWxlbSA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC10eXBlJywnSG9yaXpvbmFsTGluZWFyTGF5b3V0Jyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtbmFtZScsdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RFbGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdENhbGN1bGFibGVTbG90cygpOnZvaWQge1xuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLndpZHRoLnZhbHVlKmNlbGxEZWZpbmF0aW9uLnZhbHVlL3dlaWdodFN1bTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSAmJiB0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlICYmIHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuXG4gICAgICAgICAgICAvLyBpbml0IHZhcmlhYmxlcyBhbmQgaHRtbGVsZW1lbnRzXG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuZW1wdHkoKTtcbiAgICAgICAgICAgIGlmKHRoaXMuYm9yZGVyRWxlbT09bnVsbCkgdGhpcy5ib3JkZXJFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuXG4gICAgICAgICAgICAvLyBhZGQgY2VsbCB3cmFwcGVyIGRpdnMgdG8gcm9vdEVsZW1cbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gbmV3IEJvcmRlcignJyk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKGJvcmRlci5nZXRSb290RWxlbWVudCgpKTtcblxuICAgICAgICAgICAgICAgIGl0ZW0uc2xvdEJvcmRlciA9IGJvcmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIGNoaWxkcmVuIHJvb3RFbGVtcyB0byBjZWxsIHdyYXBwZXJzXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IGl0ZW0uc2xvdEJvcmRlcjtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLmFkZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbS5zbG90Qm9yZGVyID0gYm9yZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB3ZWlnaHRTdW0gYW5kIGZpeFN1bVxuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG4gICAgICAgICAgICBsZXQgZml4U3VtID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgZml4U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vIHNldCByb290RWxlbSBzdHlsZXNcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3dpZHRoJyx0aGlzLmVzdGltYXRlV2lkdGgoKSsncHgnKTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2hlaWdodCcsdGhpcy5lc3RpbWF0ZUhlaWdodCgpKydweCcpO1xuXG4gICAgICAgICAgICAvLyBzZXQgYm9yZGVyIGFuZCBiYWNrZ3JvdW5kIHN0eWxlc1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnbGVmdCcsJzBweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncmlnaHQnLCcwcHgnKTtcbiAgICAgICAgICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3RvcCcsJzBweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnYm90dG9tJywnMHB4Jyk7XG4gICAgICAgICAgICBpZih0aGlzLnN0cm9rZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJva2UuYXBwbHlUb0JvcmRlcih0aGlzLmJvcmRlckVsZW0sdGhpcy5zdHJva2VUaGlja25lc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5maWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGwuYXBwbHlUb0JhY2tncm91bmQodGhpcy5ib3JkZXJFbGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gaXRlbS5zbG90Qm9yZGVyO1xuXG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd0b3AnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2JvdHRvbScsJzBweCcpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsdyA9IDA7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGx3PWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjZWxsdyA9ICh0aGlzLmVzdGltYXRlV2lkdGgoKSAtIGZpeFN1bSkqIGNlbGxEZWZpbmF0aW9uLnZhbHVlIC8gd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLHBvcysncHgnKTtcbiAgICAgICAgICAgICAgICBib3JkZXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLGNlbGx3KTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgICAgIGJvcmRlci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdCA9IHNsb3Q7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5lc3RpbWF0ZUhlaWdodCgpO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSBjZWxsdztcblxuICAgICAgICAgICAgICAgIHBvcys9Y2VsbHc7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmRvTGF5b3V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5SaWdodClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlV2lkdGhfYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlV2lkdGhfYXV0bygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVIZWlnaHRfYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlSGVpZ2h0X2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodF9hdXRvKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVIZWlnaHQoKSArIHQubWFyZ2luLnRvcCArIHQubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoX2F1dG8oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlV2lkdGgoKSArIHQubWFyZ2luLmxlZnQgKyB0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRobGlzdFswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBjbGFzcyBTbG90SXRlbSB7XG4gICAgICAgIHNsb3RCb3JkZXI6Qm9yZGVyO1xuICAgICAgICBzbG90RGVmaW5hdGlvbjpEaXN0YW5jZTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihzbG90Qm9yZGVyOiBCb3JkZXIsIHNsb3REZWZpbmF0aW9uOiBEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5zbG90Qm9yZGVyID0gc2xvdEJvcmRlcjtcbiAgICAgICAgICAgIHRoaXMuc2xvdERlZmluYXRpb24gPSBzbG90RGVmaW5hdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBWZXJ0aWNhbExpbmVhckxheW91dCBleHRlbmRzIENvbnRhaW5lckNvbnRyb2wge1xuXG4gICAgICAgIHNsb3RNYXAgOiBNYXA8U2xvdCxTbG90SXRlbT47XG4gICAgICAgIGJvcmRlckVsZW06SFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zbG90TWFwID0gbmV3IE1hcDxTbG90LCBTbG90SXRlbT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENlbGwoZGlzdGFuY2U6RGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBzbG90ID0gbmV3IFNsb3QoKTtcbiAgICAgICAgICAgIHNsb3QuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuYWRkKHNsb3QpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2xvdE1hcC5jb250YWluc0tleShzbG90KSlcbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RNYXAucHV0KHNsb3QsbmV3IFNsb3RJdGVtKG51bGwsbnVsbCkpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgaXRlbS5zbG90RGVmaW5hdGlvbiA9IGRpc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLnJlbW92ZUNoaWxkKGNvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJDaGlsZCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmNsZWFyQ2hpbGQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldENlbGwoY29udHJvbDpDb250cm9sLCBjZWxsSW5kZXg6bnVtYmVyKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY29udHJvbCk7XG4gICAgICAgICAgICBpZihpZHg+LTEpe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tjZWxsSW5kZXhdO1xuICAgICAgICAgICAgICAgIHNsb3QuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290RWxlbSA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC10eXBlJywnSG9yaXpvbmFsTGluZWFyTGF5b3V0Jyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtbmFtZScsdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RFbGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdENhbGN1bGFibGVTbG90cygpOnZvaWQge1xuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlKmNlbGxEZWZpbmF0aW9uLnZhbHVlL3dlaWdodFN1bTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgJiYgdGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSAmJiB0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuXG4gICAgICAgICAgICAvLyBpbml0IHZhcmlhYmxlcyBhbmQgaHRtbGVsZW1lbnRzXG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuZW1wdHkoKTtcbiAgICAgICAgICAgIGlmKHRoaXMuYm9yZGVyRWxlbT09bnVsbCkgdGhpcy5ib3JkZXJFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuXG4gICAgICAgICAgICAvLyBhZGQgY2VsbCB3cmFwcGVyIGRpdnMgdG8gcm9vdEVsZW1cbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gbmV3IEJvcmRlcignJyk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKGJvcmRlci5nZXRSb290RWxlbWVudCgpKTtcblxuICAgICAgICAgICAgICAgIGl0ZW0uc2xvdEJvcmRlciA9IGJvcmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIGNoaWxkcmVuIHJvb3RFbGVtcyB0byBjZWxsIHdyYXBwZXJzXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IGl0ZW0uc2xvdEJvcmRlcjtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLmFkZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbS5zbG90Qm9yZGVyID0gYm9yZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB3ZWlnaHRTdW0gYW5kIGZpeFN1bVxuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG4gICAgICAgICAgICBsZXQgZml4U3VtID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgZml4U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vIHNldCByb290RWxlbSBzdHlsZXNcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3dpZHRoJyx0aGlzLmVzdGltYXRlV2lkdGgoKSsncHgnKTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2hlaWdodCcsdGhpcy5lc3RpbWF0ZUhlaWdodCgpKydweCcpO1xuXG4gICAgICAgICAgICAvLyBzZXQgYm9yZGVyIGFuZCBiYWNrZ3JvdW5kIHN0eWxlc1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnbGVmdCcsJzBweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncmlnaHQnLCcwcHgnKTtcbiAgICAgICAgICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3RvcCcsJzBweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnYm90dG9tJywnMHB4Jyk7XG4gICAgICAgICAgICBpZih0aGlzLnN0cm9rZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJva2UuYXBwbHlUb0JvcmRlcih0aGlzLmJvcmRlckVsZW0sdGhpcy5zdHJva2VUaGlja25lc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5maWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGwuYXBwbHlUb0JhY2tncm91bmQodGhpcy5ib3JkZXJFbGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gaXRlbS5zbG90Qm9yZGVyO1xuXG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLmVzdGltYXRlSGVpZ2h0KCkgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd0b3AnLHBvcysncHgnKTtcbiAgICAgICAgICAgICAgICBib3JkZXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsY2VsbGgpO1xuICAgICAgICAgICAgICAgIGJvcmRlci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdCA9IHNsb3Q7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMuZXN0aW1hdGVXaWR0aCgpO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IGNlbGxoO1xuXG4gICAgICAgICAgICAgICAgcG9zKz1jZWxsaDtcbiAgICAgICAgICAgICAgICBib3JkZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0XG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGg+MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlV2lkdGgoKSt0Lm1hcmdpbi5sZWZ0K3QubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZVdpZHRoKCkgKyB0Lm1hcmdpbi5sZWZ0ICsgdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGg+MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5lc3RpbWF0ZUhlaWdodCgpK3QubWFyZ2luLnRvcCt0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlSGVpZ2h0KCkgKyB0Lm1hcmdpbi50b3AgKyB0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvLyAvLyBCb3JkZXJzIHRvIGNvbnRhaW4gY2hpbGQgY29udHJvbHMsIGNlbGxCb3JkZXJBcnJheS5sZW5ndGggaXMgdGhlIGNlbGxzIGNvdW50LlxuICAgICAgICAvLyBjZWxsQm9yZGVyQXJyYXkgOiBMaXN0PEJvcmRlcj47XG4gICAgICAgIC8vIC8vIFRoZSBkaXN0YW5jZSBkZWZpbmF0aW9uIGZvciBlYWNoIGNlbGxzLlxuICAgICAgICAvLyBjZWxsRGVmaW5hdGlvbnM6TGlzdDxEaXN0YW5jZT47XG4gICAgICAgIC8vIC8vIFRoZSBjZWxsIGluZGV4IG9mIGVhY2ggY2hpbGQgY29udHJvbCBvZiB0aGlzIGNvbnRhaW5lci5cbiAgICAgICAgLy8gY2VsbEluZGV4QXJyYXk6TGlzdDxudW1iZXI+O1xuICAgICAgICAvLyAvLyBUaGUgYmFja2dyb3VkIGFuZCBib3JkZXIgZGl2IGVsZW1lbnQuXG4gICAgICAgIC8vIGJvcmRlckVsZW06SFRNTEVsZW1lbnQ7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgIC8vICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgLy8gICAgIC8vIEluaXQgdmFyaWFibGVzLlxuICAgICAgICAvLyAgICAgdGhpcy5jZWxsSW5kZXhBcnJheT1uZXcgTGlzdDxudW1iZXI+KCk7XG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxEZWZpbmF0aW9ucyA9IG5ldyBMaXN0PERpc3RhbmNlPigpO1xuICAgICAgICAvLyAgICAgdGhpcy5jZWxsQm9yZGVyQXJyYXkgPSBuZXcgTGlzdDxCb3JkZXI+KCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy8gQWRkIGNlbGwgZGVmaW5hdGlvbi4gVGhlIGRpc3RhbmNlIHR5cGUgY2FuIGJlICd3ZWlnaHQnIG9yICdmaXgnLlxuICAgICAgICAvLyBhZGRDZWxsKGRpc3RhbmNlOkRpc3RhbmNlKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxEZWZpbmF0aW9ucy5wdXNoKGRpc3RhbmNlKTtcbiAgICAgICAgLy8gICAgIGxldCBzbG90ID0gbmV3IFNsb3QoKTtcbiAgICAgICAgLy8gICAgIHNsb3QuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgLy8gICAgIHRoaXMuc2xvdHMuYWRkKHNsb3QpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIEFkZCBjaGlsZCB0byB0aGlzIGNvbnRhaW5lciwgYW5kIHRoZSBjb250cm9sIGlzIGFkZGVkIHRvIHRoZSBmaXJzdCBjZWxsIGJ5IGRlZmF1bHQuXG4gICAgICAgIC8vIGFkZENoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgIC8vICAgICBzdXBlci5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgLy8gICAgIHRoaXMuY2VsbEluZGV4QXJyYXkucHVzaCgwKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvLyBSZW1vdmUgY2hpbGQgZnJvbSB0aGlzIGNvbnRhaW5lci5cbiAgICAgICAgLy8gcmVtb3ZlQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgLy8gICAgIHN1cGVyLnJlbW92ZUNoaWxkKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgY29uc3QgaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNlbGxJbmRleEFycmF5LnNwbGljZShpZHgsMSk7XG4gICAgICAgIC8vICAgICAgICAgaWYoY29udHJvbC5wYXJlbnRTbG90KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnRyb2wucGFyZW50U2xvdC5yZW1vdmVDaGlsZChjb250cm9sKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy8gUmVtb3ZlIGFsbCBjaGlsZHJlbiBmcm9tIHRoaXMgY29udGFpbmVyLlxuICAgICAgICAvLyBjbGVhckNoaWxkKCk6IHZvaWQge1xuICAgICAgICAvLyAgICAgc3VwZXIuY2xlYXJDaGlsZCgpO1xuICAgICAgICAvLyAgICAgdGhpcy5jZWxsSW5kZXhBcnJheS5jbGVhcigpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIFNwZWNpZnkgJ2NvbnRyb2wnIHRvIHRoZSAnY2VsbEluZGV4JyBjZWxsLlxuICAgICAgICAvLyBzZXRDZWxsKGNvbnRyb2w6Q29udHJvbCwgY2VsbEluZGV4Om51bWJlcikge1xuICAgICAgICAvLyAgICAgY29uc3QgaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNlbGxJbmRleEFycmF5W2lkeF0gPSBjZWxsSW5kZXg7XG4gICAgICAgIC8vICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2NlbGxJbmRleF07XG4gICAgICAgIC8vICAgICAgICAgc2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvLyBHZXQgdGhlIHJvb3QgZGl2IG9mIHRoaXMgY29udGFpbmVyLlxuICAgICAgICAvLyBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5yb290RWxlbSA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgLy8gICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC10eXBlJywnSG9yaXpvbmFsTGluZWFyTGF5b3V0Jyk7XG4gICAgICAgIC8vICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtbmFtZScsdGhpcy5uYW1lKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLnJvb3RFbGVtO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGluaXRDYWxjdWxhYmxlU2xvdHMoKTp2b2lkIHtcbiAgICAgICAgLy8gICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jZWxsRGVmaW5hdGlvbnMubGVuZ3RoO2krKykge1xuICAgICAgICAvLyAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuY2VsbERlZmluYXRpb25zW2ldO1xuICAgICAgICAvLyAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgLy8gICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7ajx0aGlzLmNoaWxkcmVuLmxlbmd0aDtqKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbEluZGV4QXJyYXlbal09PWkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2pdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7ajx0aGlzLmNoaWxkcmVuLmxlbmd0aDtqKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbEluZGV4QXJyYXlbal09PWkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2pdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlKmNlbGxEZWZpbmF0aW9uLnZhbHVlL3dlaWdodFN1bTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9ZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSAmJiB0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbEluZGV4QXJyYXlbal09PWkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbEluZGV4QXJyYXlbal09PWkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfWVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuY2VsbERlZmluYXRpb25zW2ldO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7ajx0aGlzLmNoaWxkcmVuLmxlbmd0aDtqKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNlbGxJbmRleEFycmF5W2pdPT1pKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5bal07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAvLyAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9ZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlICYmIHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAvLyAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfWVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIGluaXQgdmFyaWFibGVzIGFuZCBodG1sZWxlbWVudHNcbiAgICAgICAgLy8gICAgIHRoaXMuY2VsbEJvcmRlckFycmF5LmNsZWFyKCk7XG4gICAgICAgIC8vICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuZW1wdHkoKTtcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuYm9yZGVyRWxlbT09bnVsbCkgdGhpcy5ib3JkZXJFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmFwcGVuZCh0aGlzLmJvcmRlckVsZW0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gYWRkIGNlbGwgd3JhcHBlciBkaXZzIHRvIHJvb3RFbGVtXG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICBsZXQgYm9yZGVyID0gbmV3IEJvcmRlcignJyk7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNlbGxCb3JkZXJBcnJheS5wdXNoKGJvcmRlcik7XG4gICAgICAgIC8vICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmFwcGVuZChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBhZGQgY2hpbGRyZW4gcm9vdEVsZW1zIHRvIGNlbGwgd3JhcHBlcnNcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGJvcmRlciA9IHRoaXMuY2VsbEJvcmRlckFycmF5W3RoaXMuY2VsbEluZGV4QXJyYXlbal1dO1xuICAgICAgICAvLyAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5bal07XG4gICAgICAgIC8vICAgICAgICAgY2hpbGQuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIuYWRkQ2hpbGQoY2hpbGQpO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAvLyAgICAgLy8gY2FsY3VsYXRlIHdlaWdodFN1bSBhbmQgZml4U3VtXG4gICAgICAgIC8vICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgLy8gICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jZWxsRGVmaW5hdGlvbnMubGVuZ3RoO2krKykge1xuICAgICAgICAvLyAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuY2VsbERlZmluYXRpb25zW2ldO1xuICAgICAgICAvLyAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgLy8gICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIGZpeFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIHNldCByb290RWxlbSBzdHlsZXNcbiAgICAgICAgLy8gICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3dpZHRoJyx0aGlzLmVzdGltYXRlV2lkdGgoKSsncHgnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2hlaWdodCcsdGhpcy5lc3RpbWF0ZUhlaWdodCgpKydweCcpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gc2V0IGJvcmRlciBhbmQgYmFja2dyb3VuZCBzdHlsZXNcbiAgICAgICAgLy8gICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgIC8vICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCd0b3AnLCcwcHgnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ2JvdHRvbScsJzBweCcpO1xuICAgICAgICAvLyAgICAgaWYodGhpcy5zdHJva2Upe1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuc3Ryb2tlLmFwcGx5VG9Cb3JkZXIodGhpcy5ib3JkZXJFbGVtLHRoaXMuc3Ryb2tlVGhpY2tuZXNzKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGlmKHRoaXMuZmlsbCl7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5maWxsLmFwcGx5VG9CYWNrZ3JvdW5kKHRoaXMuYm9yZGVyRWxlbSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBzZXQgY2VsbCB3cmFwcGVyIHN0eWxlc1xuICAgICAgICAvLyAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBqPTA7ajx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aisrKXtcbiAgICAgICAgLy8gICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLmNlbGxEZWZpbmF0aW9uc1tqXTtcbiAgICAgICAgLy8gICAgICAgICBsZXQgYm9yZGVyID0gdGhpcy5jZWxsQm9yZGVyQXJyYXlbal07XG4gICAgICAgIC8vICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgIC8vICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgIC8vICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAvLyAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgIC8vICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAvLyAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLmVzdGltYXRlSGVpZ2h0KCkgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd0b3AnLHBvcysncHgnKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxjZWxsaCk7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QgPSB0aGlzLnNsb3RzW2pdO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLmVzdGltYXRlV2lkdGgoKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSBjZWxsaDtcbiAgICAgICAgLy8gICAgICAgICBwb3MrPWNlbGxoO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5kb0xheW91dCgpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGVzdGltYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgLy8gICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSl7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgLy8gICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdFxuICAgICAgICAvLyAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5SaWdodClcbiAgICAgICAgLy8gICAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5lc3RpbWF0ZVdpZHRoKCkrdC5tYXJnaW4ubGVmdCt0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRobGlzdFswXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfWVsc2UgaWYodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1lbHNle1xuICAgICAgICAvLyAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVXaWR0aCgpICsgdC5tYXJnaW4ubGVmdCArIHQubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRobGlzdFswXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgLy8gICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUpe1xuICAgICAgICAvLyAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgLy8gICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3BcbiAgICAgICAgLy8gICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pXG4gICAgICAgIC8vICAgICAgICAge1xuICAgICAgICAvLyAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD4wKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlSGVpZ2h0KCkrdC5tYXJnaW4udG9wK3QubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSBpZih0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVIZWlnaHQoKSArIHQubWFyZ2luLnRvcCArIHQubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBWaXN1YWxUcmVlIHtcbiAgICAgICAgcm9vdENvbnRhaW5lcjogQ29udGFpbmVyQ29udHJvbDtcblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb290Q29udGFpbmVyKXtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RDb250YWluZXIuZ2V0Um9vdEVsZW1lbnQoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdENhbGN1bGFibGVTbG90cygpOnZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMucm9vdENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdENvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb3RDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RDb250YWluZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb3RDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RDb250YWluZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cblxuICAgIH1cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgY2xhc3MgVGVtcGxhdGVDb250cm9sIGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICByb290Qm9yZGVyIDogQm9yZGVyID0gbmV3IEJvcmRlcihcInJvb3RCb3JkZXJcIik7XG4gICAgICAgIHZpc3VhbFRyZWUgOiBWaXN1YWxUcmVlO1xuXG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEJvcmRlci5nZXRSb290RWxlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5hZGRDaGlsZCh0aGlzLnZpc3VhbFRyZWUucm9vdENvbnRhaW5lcik7XG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUucm9vdENvbnRhaW5lci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLnZpc3VhbFRyZWUucm9vdENvbnRhaW5lci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcblxuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLnBhcmVudFNsb3QgPSB0aGlzLnBhcmVudFNsb3Q7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIucGFyZW50ID0gdGhpcy5wYXJlbnQ7XG5cbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuYXNzZW1ibGVEb20oKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0X2F1dG8oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RCb3JkZXIuZXN0aW1hdGVIZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGhfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEJvcmRlci5lc3RpbWF0ZVdpZHRoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59IiwiXG5uYW1lc3BhY2UgTGF5b3V0THpnLk9ic2VydmVyTW9kZWwge1xuXG4gICAgY29uc3QgY29uZmlnUHJvcGVydHlOYW1lOnN0cmluZyA9IFwiX19vYnNlcnZhYmxlX19cIjtcblxuXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyB7XG4gICAgICAgIG9iajphbnk7XG4gICAgICAgIHByb3BlcnR5TmFtZSA6IHN0cmluZztcbiAgICAgICAgb2xkVmFsdWUgOiBhbnk7XG4gICAgICAgIG5ld1ZhbHVlIDogYW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajphbnkscHJvcGVydHlOYW1lOiBzdHJpbmcsIG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICB0aGlzLm9sZFZhbHVlID0gb2xkVmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5ld1ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0T2JqZWN0Q29uZmlnKG9iajphbnkpIHtcbiAgICAgICAgaWYoIShjb25maWdQcm9wZXJ0eU5hbWUgaW4gb2JqKSkge1xuICAgICAgICAgICAgb2JqW2NvbmZpZ1Byb3BlcnR5TmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Om51bGwsXG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOm51bGwsXG4gICAgICAgICAgICAgICAgcHJvcHM6e30sXG4gICAgICAgICAgICAgICAgcHJvcENoYW5nZWRDYWxsYmFja0xpc3QgOiBbXSxcbiAgICAgICAgICAgICAgICBub3RpZnlQcm9wZXJ0eUNoYW5nZWQgOiBmdW5jdGlvbihhcmdzOlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncykge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNmZyA9IGdldE9iamVjdENvbmZpZyhhcmdzLm9iaik7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNmZy5wYXJlbnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmVudENmZyA9IGdldE9iamVjdENvbmZpZyhjZmcucGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudENmZy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZmcucGFyZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNmZy5wcm9wZXJ0eU5hbWUrXCIuXCIrYXJncy5wcm9wZXJ0eU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5vbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLm5ld1ZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYWRkUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2sgOiBmdW5jdGlvbiAoY2FsbGJhY2s6KGFyZ3M6UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKT0+dm9pZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0LnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVtb3ZlUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2s6IGZ1bmN0aW9uIChjYWxsYmFjazooYXJnczpQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MpPT52b2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0LmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICBpZihpZHg+LTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3Quc3BsaWNlKGlkeCwxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ialtjb25maWdQcm9wZXJ0eU5hbWVdO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBpbmplY3RQcm9wZXJ0aWVzKG9iajphbnkpIHtcbiAgICAgICAgaWYgKG9iaj09bnVsbCkgcmV0dXJuO1xuICAgICAgICBsZXQgY2ZnID0gZ2V0T2JqZWN0Q29uZmlnKG9iaik7XG4gICAgICAgIGZvciAobGV0IHByb3BlcnR5TmFtZSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmKHByb3BlcnR5TmFtZT09Y29uZmlnUHJvcGVydHlOYW1lKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmKCFvYmouaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkgY29udGludWU7XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gb2JqW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICBpZih0b1N0cmluZy5jYWxsKHByb3BWYWx1ZSk9PSdbb2JqZWN0IEZ1bmN0aW9uXScpe1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfWVsc2UgaWYodG9TdHJpbmcuY2FsbChwcm9wVmFsdWUpPT0nW29iamVjdCBPYmplY3RdJyl7XG4gICAgICAgICAgICAgICAgaW5qZWN0UHJvcGVydGllcyhwcm9wVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaixwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgaWYoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKXtcbiAgICAgICAgICAgICAgICBsZXQgdCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYodG9TdHJpbmcuY2FsbCh0KT09J1tvYmplY3QgRnVuY3Rpb25dJyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRvU3RyaW5nLmNhbGwocHJvcFZhbHVlKT09J1tvYmplY3QgT2JqZWN0XScpe1xuICAgICAgICAgICAgICAgICAgICBpbmplY3RQcm9wZXJ0aWVzKHByb3BWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZENmZyA9IGdldE9iamVjdENvbmZpZyhwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZENmZy5wYXJlbnQgPSBvYmo7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ2ZnLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNmZy5wcm9wc1twcm9wZXJ0eU5hbWVdID0gb2JqW3Byb3BlcnR5TmFtZV07XG5cbiAgICAgICAgICAgIChmdW5jdGlvbiAocHJvcGVydHlOYW1lOnN0cmluZykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoscHJvcGVydHlOYW1lLHtcbiAgICAgICAgICAgICAgICAgICAgJ2dldCc6ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldE9iamVjdENvbmZpZyh0aGlzKS5wcm9wc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnc2V0JzpmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluamVjdFByb3BlcnRpZXModGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2xkVmFsdWUgPSBnZXRPYmplY3RDb25maWcodGhpcykucHJvcHNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE9iamVjdENvbmZpZyh0aGlzKS5wcm9wc1twcm9wZXJ0eU5hbWVdPXZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0T2JqZWN0Q29uZmlnKHRoaXMpLm5vdGlmeVByb3BlcnR5Q2hhbmdlZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICBvYmo6YW55O1xuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5vYmogPSBvYmo7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IGdldFZhbHVlKCk6YW55IDtcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICBvYmo6YW55O1xuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5vYmogPSBvYmo7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IHNldFZhbHVlKHZhbHVlOmFueSk6dm9pZDtcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgaW1wbGVtZW50cyBEaXNwb3NhYmxle1xuICAgICAgICBvYmo6YW55O1xuICAgICAgICBwcm9wZXJ0eU5hbWU6c3RyaW5nO1xuICAgICAgICBwcm90ZWN0ZWQgY2FsbGJhY2s6IEZ1bmN0aW9uO1xuXG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9iaiA9IG9iajtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2sobGlzdGVuZXI6RnVuY3Rpb24pOnZvaWR7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbGlzdGVuZXI7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVQcm9wZXJ0eUNoYW5nZWRDYWxsYmFjaygpOnZvaWR7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IHN0YXJ0TGlzdGVuKCk6dm9pZDtcbiAgICAgICAgYWJzdHJhY3Qgc3RvcExpc3RlbigpOnZvaWQ7XG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIge1xuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTpQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcjtcblxuICAgICAgICBhYnN0cmFjdCBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOmJvb2xlYW47XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFVuaXZlcnNhbFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xuXG4gICAgICAgIHByaXZhdGUgcHJvdmlkZXJzOkxpc3Q8UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcj47XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMgPSBuZXcgTGlzdDxQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXIocHJvdmlkZXI6UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcik6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXJzKHByb3ZpZGVyczpBcnJheTxQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyPik6dm9pZHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZihwcm92aWRlci5jYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iaiwgcHJvcGVydHlOYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYocHJvdmlkZXIuY2FuUHJvdmlkZUNoYW5nZWRMaXN0ZW5lcihvYmosIHByb3BlcnR5TmFtZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXIuZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVyIHtcbiAgICAgICAgYWJzdHJhY3QgY2FuUHJvdmlkZUdldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTpib29sZWFuO1xuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eUdldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTogUHJvcGVydHlHZXR0ZXI7XG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXIge1xuICAgICAgICBhYnN0cmFjdCBjYW5Qcm92aWRlU2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOmJvb2xlYW47XG4gICAgICAgIGFic3RyYWN0IGdldFByb3BlcnR5U2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOiBQcm9wZXJ0eVNldHRlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydHlQcm92aWRlciB7XG5cbiAgICAgICAgYWJzdHJhY3QgY2FuUHJvdmlkZUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuXG5cbiAgICAgICAgYWJzdHJhY3QgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlHZXR0ZXIgO1xuXG4gICAgICAgIGFic3RyYWN0IGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiA7XG5cbiAgICAgICAgYWJzdHJhY3QgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIgO1xuXG4gICAgICAgIGFic3RyYWN0IGNhblByb3ZpZGVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIDtcblxuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciA7XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgVW5pdmVyc2FsUHJvcGVydHlHZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgcHJpdmF0ZSBwcm92aWRlcnM6TGlzdDxQcm9wZXJ0eUdldHRlclByb3ZpZGVyPjtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVycyA9IG5ldyBMaXN0PFByb3BlcnR5R2V0dGVyUHJvdmlkZXI+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm92aWRlcihwcm92aWRlcjpQcm9wZXJ0eUdldHRlclByb3ZpZGVyKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRQcm92aWRlcnMocHJvdmlkZXJzOkFycmF5PFByb3BlcnR5R2V0dGVyUHJvdmlkZXI+KTp2b2lke1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgcHJvdmlkZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMuYWRkKHByb3ZpZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVHZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZihwcm92aWRlci5jYW5Qcm92aWRlR2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IExheW91dEx6Zy5Qcm9wZXJ0eUdldHRlciB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGVHZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyLmdldFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFVuaXZlcnNhbFByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVye1xuICAgICAgICBwcml2YXRlIHByb3ZpZGVyczpMaXN0PFByb3BlcnR5U2V0dGVyUHJvdmlkZXI+O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzID0gbmV3IExpc3Q8UHJvcGVydHlTZXR0ZXJQcm92aWRlcj4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3ZpZGVyKHByb3ZpZGVyOlByb3BlcnR5U2V0dGVyUHJvdmlkZXIpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMuYWRkKHByb3ZpZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFByb3ZpZGVycyhwcm92aWRlcnM6QXJyYXk8UHJvcGVydHlTZXR0ZXJQcm92aWRlcj4pOnZvaWR7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiBwcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZVNldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGVTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvdmlkZXIgb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZihwcm92aWRlci5jYW5Qcm92aWRlU2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlci5nZXRQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBVbml2ZXJzYWxQcm9wZXJ0eVByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlQcm92aWRlcntcbiAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0eUdldHRlclByb3ZpZGVyOlByb3BlcnR5R2V0dGVyUHJvdmlkZXI7XG4gICAgICAgIHByaXZhdGUgcHJvcGVydHlTZXR0ZXJQcm92aWRlcjpQcm9wZXJ0eVNldHRlclByb3ZpZGVyO1xuICAgICAgICBwcml2YXRlIHByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXI6UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0eUdldHRlclByb3ZpZGVyOiBQcm9wZXJ0eUdldHRlclByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVNldHRlclByb3ZpZGVyOiBQcm9wZXJ0eVNldHRlclByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eUdldHRlclByb3ZpZGVyID0gcHJvcGVydHlHZXR0ZXJQcm92aWRlcjtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlTZXR0ZXJQcm92aWRlciA9IHByb3BlcnR5U2V0dGVyUHJvdmlkZXI7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgPSBwcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKSA6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlHZXR0ZXJQcm92aWRlci5jYW5Qcm92aWRlR2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpIDogUHJvcGVydHlHZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlHZXR0ZXJQcm92aWRlci5nZXRQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eVNldHRlclByb3ZpZGVyLmNhblByb3ZpZGVTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOmFueSwgcHJvcGVydHlOYW1lOnN0cmluZykgOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eVNldHRlclByb3ZpZGVyLmdldFByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKSA6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlci5jYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpIDogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlci5nZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsIlxuXG5uYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBEb21XaWR0aFByb3BlcnR5R2V0dGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRWYWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIHJldHVybiBkb20ub2Zmc2V0V2lkdGg7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21XaWR0aFByb3BlcnR5U2V0dGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgZG9tLnN0eWxlLndpZHRoID0gdmFsdWUrXCJweFwiO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tV2lkdGhQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcIndpZHRoXCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tV2lkdGhQcm9wZXJ0eUdldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21XaWR0aFByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwid2lkdGhcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21XaWR0aFByb3BlcnR5U2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgRG9tSGVpZ2h0UHJvcGVydHlHZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICAgICAgICAgIGxldCBkb20gPSA8SFRNTEVsZW1lbnQ+dGhpcy5vYmo7XG4gICAgICAgICAgICByZXR1cm4gZG9tLm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21IZWlnaHRQcm9wZXJ0eVNldHRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIGRvbS5zdHlsZS5oZWlnaHQgPSB2YWx1ZStcInB4XCI7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21IZWlnaHRQcm9wZXJ0eUdldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlR2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcImhlaWdodFwiO1xuXG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUdldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbUhlaWdodFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbUhlaWdodFByb3BlcnR5U2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eVNldHRlclByb3ZpZGVye1xuXG4gICAgICAgIGNhblByb3ZpZGVTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcHJvcGVydHlOYW1lID09IFwiaGVpZ2h0XCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5U2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5U2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tSGVpZ2h0UHJvcGVydHlTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBEb21TaXplUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcntcbiAgICAgICAgcHJpdmF0ZSBkb206IEhUTUxFbGVtZW50O1xuICAgICAgICBwcml2YXRlIGNhbGxiYWNrZnVuOmFueTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuZG9tID0gPEhUTUxFbGVtZW50Pm9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0TGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja2Z1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrLmFwcGx5KHNlbGYuZG9tLFtzZWxmLmRvbV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICQodGhpcy5kb20pLnJlc2l6ZSh0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICAkKHRoaXMuZG9tKS5vZmYoXCJyZXNpemVcIix0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVNpemVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcntcblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVNpemVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmoscHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGVDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZihwcm9wZXJ0eU5hbWU9PVwid2lkdGhcInx8cHJvcGVydHlOYW1lPT1cImhlaWdodFwiKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBEb21UZXh0UHJvcGVydHlHZXR0ZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlcntcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFZhbHVlKCk6IGFueSB7XG4gICAgICAgICAgICBsZXQgZG9tID0gPEhUTUxFbGVtZW50PnRoaXMub2JqO1xuICAgICAgICAgICAgaWYoZG9tLnRhZ05hbWU9PVwiSU5QVVRcInx8ZG9tLnRhZ05hbWU9PVwiaW5wdXRcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkKGRvbSkudmFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJChkb20pLnRleHQoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVRleHRQcm9wZXJ0eVNldHRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IGRvbSA9IDxIVE1MRWxlbWVudD50aGlzLm9iajtcbiAgICAgICAgICAgIGlmKGRvbS50YWdOYW1lPT1cIklOUFVUXCJ8fGRvbS50YWdOYW1lPT1cImlucHV0XCIpIHtcbiAgICAgICAgICAgICAgICAkKGRvbSkudmFsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKGRvbSkudGV4dCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21UZXh0UHJvcGVydHlHZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5R2V0dGVyUHJvdmlkZXJ7XG5cbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBwcm9wZXJ0eU5hbWUgPT0gXCJ0ZXh0XCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFByb3BlcnR5R2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tVGV4dFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVRleHRQcm9wZXJ0eVNldHRlclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlTZXR0ZXJQcm92aWRlcntcblxuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHByb3BlcnR5TmFtZSA9PSBcInRleHRcIjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlTZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlTZXR0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21UZXh0UHJvcGVydHlTZXR0ZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRG9tVGV4dFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJ7XG4gICAgICAgIHByaXZhdGUgZG9tOiBIVE1MRWxlbWVudDtcbiAgICAgICAgcHJpdmF0ZSBjYWxsYmFja2Z1bjphbnk7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB0aGlzLmRvbSA9IDxIVE1MRWxlbWVudD5vYmo7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydExpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tmdW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5jYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxsYmFjay5hcHBseShzZWxmLmRvbSxbc2VsZi5kb21dKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkKHRoaXMuZG9tKS5jaGFuZ2UodGhpcy5jYWxsYmFja2Z1bik7XG4gICAgICAgIH1cblxuICAgICAgICBzdG9wTGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgJCh0aGlzLmRvbSkub2ZmKFwicmVzaXplXCIsdGhpcy5jYWxsYmFja2Z1bik7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEb21UZXh0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXJ7XG5cbiAgICAgICAgZ2V0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21UZXh0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIob2JqLHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYocHJvcGVydHlOYW1lPT1cInRleHRcIil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBpbXBvcnQgZ2V0T2JqZWN0Q29uZmlnID0gTGF5b3V0THpnLk9ic2VydmVyTW9kZWwuZ2V0T2JqZWN0Q29uZmlnO1xuICAgIGltcG9ydCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgPSBMYXlvdXRMemcuT2JzZXJ2ZXJNb2RlbC5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3M7XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5R2V0dGVyIGV4dGVuZHMgUHJvcGVydHlHZXR0ZXJ7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRWYWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqW3RoaXMucHJvcGVydHlOYW1lXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERpY3RQcm9wZXJ0eVNldHRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVye1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIob2JqLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5vYmpbdGhpcy5wcm9wZXJ0eU5hbWVdID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaWN0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcntcblxuICAgICAgICBwcml2YXRlIGNhbGxiYWNrZnVuYzphbnk7XG5cbiAgICAgICAgY29uc3RydWN0b3Iob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydExpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tmdW5jID0gZnVuY3Rpb24gKGFyZ3M6IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncykge1xuICAgICAgICAgICAgICAgIHNlbGYuY2FsbGJhY2suYXBwbHkodGhpcyxbc2VsZi5vYmpdKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYnNlcnZlck1vZGVsLmluamVjdFByb3BlcnRpZXModGhpcy5vYmopO1xuICAgICAgICAgICAgT2JzZXJ2ZXJNb2RlbC5nZXRPYmplY3RDb25maWcodGhpcy5vYmopLmFkZFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKHRoaXMuY2FsbGJhY2tmdW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICBPYnNlcnZlck1vZGVsLmdldE9iamVjdENvbmZpZyh0aGlzLm9iaikucmVtb3ZlUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2sodGhpcy5jYWxsYmFja2Z1bmMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5R2V0dGVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUdldHRlclByb3ZpZGVyIHtcbiAgICAgICAgY2FuUHJvdmlkZUdldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0UHJvcGVydHlHZXR0ZXIob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogTGF5b3V0THpnLlByb3BlcnR5R2V0dGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGljdFByb3BlcnR5R2V0dGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaWN0UHJvcGVydHlTZXR0ZXJQcm92aWRlciBleHRlbmRzIFByb3BlcnR5U2V0dGVyUHJvdmlkZXIge1xuICAgICAgICBjYW5Qcm92aWRlU2V0dGVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eVNldHRlcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eVNldHRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERpY3RQcm9wZXJ0eVNldHRlcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRGljdFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xuICAgICAgICBjYW5Qcm92aWRlQ2hhbmdlZExpc3RlbmVyKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERpY3RQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmosIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZhbHVlQ29udmVydGVyIHtcblxuICAgIH1cblxuICAgIGV4cG9ydCBlbnVtIEJpbmRpbmdNb2RlIHtcbiAgICAgICAgT25ld2F5LFxuICAgICAgICBUd293YXlcbiAgICB9XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmluZGluZyBpbXBsZW1lbnRzIERpc3Bvc2FibGV7XG4gICAgICAgIHRhcmdldDphbnk7XG4gICAgICAgIHRhcmdldFByb3BlcnR5TmFtZTpzdHJpbmc7XG4gICAgICAgIGNvbnZlcnRlcjpWYWx1ZUNvbnZlcnRlcjtcbiAgICAgICAgbW9kZTpCaW5kaW5nTW9kZTtcbiAgICAgICAgcHJvdGVjdGVkIHByb3BlcnR5UHJvdmlkZXI6IFByb3BlcnR5UHJvdmlkZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IocHJvcGVydHlQcm92aWRlcjpQcm9wZXJ0eVByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5UHJvdmlkZXIgPSBwcm9wZXJ0eVByb3ZpZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3QgdXBkYXRlRnJvbVNvdXJjZSgpOnZvaWQ7XG4gICAgICAgIGFic3RyYWN0IHVwZGF0ZUZyb21UYXJnZXQoKTp2b2lkO1xuXG4gICAgICAgIHN0YXJ0QmluZGluZygpOnZvaWR7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BCaW5kaW5nKCk6dm9pZHtcblxuICAgICAgICB9XG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEJpbmRpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuICAgIGV4cG9ydCBjbGFzcyBGdW5jdGlvbkJpbmRpbmcgZXh0ZW5kcyBCaW5kaW5ne1xuXG4gICAgICAgIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5QmluZGluZyBleHRlbmRzIEJpbmRpbmcge1xuXG4gICAgICAgIHNvdXJjZTogYW55O1xuICAgICAgICBzb3VyY2VQcm9wZXJ0eU5hbWU6IHN0cmluZztcblxuICAgICAgICBwcml2YXRlIHNvdXJjZVByb3BHZXR0ZXI6IFByb3BlcnR5R2V0dGVyO1xuICAgICAgICBwcml2YXRlIHNvdXJjZVByb3BTZXR0ZXI6IFByb3BlcnR5U2V0dGVyO1xuICAgICAgICBwcml2YXRlIHRhcmdldFByb3BHZXR0ZXI6IFByb3BlcnR5R2V0dGVyO1xuICAgICAgICBwcml2YXRlIHRhcmdldFByb3BTZXR0ZXI6IFByb3BlcnR5U2V0dGVyO1xuXG4gICAgICAgIHByaXZhdGUgc291cmNlUHJvcExpc3RlbmVyOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcjtcbiAgICAgICAgcHJpdmF0ZSB0YXJnZXRQcm9wTGlzdGVuZXI6IFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BlcnR5UHJvdmlkZXI6IFByb3BlcnR5UHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKHByb3BlcnR5UHJvdmlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRCaW5kaW5nKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zdG9wQmluZGluZygpO1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLnNvdXJjZVByb3BHZXR0ZXIgPSB0aGlzLnByb3BlcnR5UHJvdmlkZXIuZ2V0UHJvcGVydHlHZXR0ZXIodGhpcy5zb3VyY2UsIHRoaXMuc291cmNlUHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuc291cmNlUHJvcFNldHRlciA9IHRoaXMucHJvcGVydHlQcm92aWRlci5nZXRQcm9wZXJ0eVNldHRlcih0aGlzLnNvdXJjZSwgdGhpcy5zb3VyY2VQcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgdGhpcy50YXJnZXRQcm9wR2V0dGVyID0gdGhpcy5wcm9wZXJ0eVByb3ZpZGVyLmdldFByb3BlcnR5R2V0dGVyKHRoaXMudGFyZ2V0LCB0aGlzLnRhcmdldFByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldFByb3BTZXR0ZXIgPSB0aGlzLnByb3BlcnR5UHJvdmlkZXIuZ2V0UHJvcGVydHlTZXR0ZXIodGhpcy50YXJnZXQsIHRoaXMudGFyZ2V0UHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuc291cmNlUHJvcExpc3RlbmVyID0gdGhpcy5wcm9wZXJ0eVByb3ZpZGVyLmdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKHRoaXMuc291cmNlLCB0aGlzLnNvdXJjZVByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldFByb3BMaXN0ZW5lciA9IHRoaXMucHJvcGVydHlQcm92aWRlci5nZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcih0aGlzLnRhcmdldCwgdGhpcy50YXJnZXRQcm9wZXJ0eU5hbWUpO1xuXG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRnJvbVNvdXJjZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNvdXJjZVByb3BMaXN0ZW5lci5zdGFydExpc3RlbigpO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VQcm9wTGlzdGVuZXIuc2V0UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlRnJvbVNvdXJjZS5hcHBseShzZWxmLFtdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlID09IEJpbmRpbmdNb2RlLlR3b3dheSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvcExpc3RlbmVyLnN0YXJ0TGlzdGVuKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRQcm9wTGlzdGVuZXIuc2V0UHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZUZyb21UYXJnZXQuYXBwbHkoc2VsZixbXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICBzdG9wQmluZGluZygpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc291cmNlUHJvcExpc3RlbmVyKSB0aGlzLnNvdXJjZVByb3BMaXN0ZW5lci5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zdG9wQmluZGluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlRnJvbVNvdXJjZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB2ID0gIHRoaXMuc291cmNlUHJvcEdldHRlci5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgbGV0IG9sZF92ID0gdGhpcy50YXJnZXRQcm9wR2V0dGVyLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAodj09b2xkX3YpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0UHJvcFNldHRlci5zZXRWYWx1ZSh2KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlRnJvbVRhcmdldCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB2ID0gIHRoaXMudGFyZ2V0UHJvcEdldHRlci5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgbGV0IG9sZF92ID0gdGhpcy5zb3VyY2VQcm9wR2V0dGVyLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAodj09b2xkX3YpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuc291cmNlUHJvcFNldHRlci5zZXRWYWx1ZSh2KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9wZXJ0eUJpbmRpbmcocHJvcGVydHlQcm92aWRlcjpQcm9wZXJ0eVByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OmFueSwgdGFyZ2V0UHJvcE5hbWU6c3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOmFueSwgc291cmNlUHJvcE5hbWU6c3RyaW5nLCBtb2RlOiBCaW5kaW5nTW9kZSA9IEJpbmRpbmdNb2RlLk9uZXdheSk6IFByb3BlcnR5QmluZGluZyB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb3BlcnR5QmluZGluZyhwcm9wZXJ0eVByb3ZpZGVyKTtcbiAgICAgICAgcC5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIHAuc291cmNlUHJvcGVydHlOYW1lID0gc291cmNlUHJvcE5hbWU7XG4gICAgICAgIHAudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBwLnRhcmdldFByb3BlcnR5TmFtZSA9IHRhcmdldFByb3BOYW1lO1xuICAgICAgICBwLm1vZGUgPSBtb2RlO1xuICAgICAgICBwLnN0YXJ0QmluZGluZygpO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0VW5pdmVyc2FsUHJvcGVydHlQcm92aWRlcigpIDogVW5pdmVyc2FsUHJvcGVydHlQcm92aWRlciB7XG5cbiAgICAgICAgbGV0IGdldHRlclByb3ZpZGVyID0gbmV3IFVuaXZlcnNhbFByb3BlcnR5R2V0dGVyUHJvdmlkZXIoKTtcbiAgICAgICAgbGV0IHNldHRlclByb3ZpZGVyID0gbmV3IFVuaXZlcnNhbFByb3BlcnR5U2V0dGVyUHJvdmlkZXIoKTtcbiAgICAgICAgbGV0IGxpc3RlbmVyUHJvdmlkZXIgPSBuZXcgVW5pdmVyc2FsUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpO1xuXG4gICAgICAgIGdldHRlclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEb21XaWR0aFByb3BlcnR5R2V0dGVyUHJvdmlkZXIoKSk7XG4gICAgICAgIGdldHRlclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEb21IZWlnaHRQcm9wZXJ0eUdldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBnZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tVGV4dFByb3BlcnR5R2V0dGVyUHJvdmlkZXIoKSk7XG4gICAgICAgIGdldHRlclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEaWN0UHJvcGVydHlHZXR0ZXJQcm92aWRlcigpKTtcblxuICAgICAgICBzZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tV2lkdGhQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBzZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tSGVpZ2h0UHJvcGVydHlTZXR0ZXJQcm92aWRlcigpKTtcbiAgICAgICAgc2V0dGVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVRleHRQcm9wZXJ0eVNldHRlclByb3ZpZGVyKCkpO1xuICAgICAgICBzZXR0ZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRGljdFByb3BlcnR5U2V0dGVyUHJvdmlkZXIoKSk7XG5cbiAgICAgICAgbGlzdGVuZXJQcm92aWRlci5hZGRQcm92aWRlcihuZXcgRG9tU2l6ZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIoKSk7XG4gICAgICAgIGxpc3RlbmVyUHJvdmlkZXIuYWRkUHJvdmlkZXIobmV3IERvbVRleHRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyKCkpO1xuICAgICAgICBsaXN0ZW5lclByb3ZpZGVyLmFkZFByb3ZpZGVyKG5ldyBEaWN0UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcigpKTtcblxuICAgICAgICByZXR1cm4gbmV3IFVuaXZlcnNhbFByb3BlcnR5UHJvdmlkZXIoZ2V0dGVyUHJvdmlkZXIsIHNldHRlclByb3ZpZGVyLCBsaXN0ZW5lclByb3ZpZGVyKTtcbiAgICB9XG5cbn0iXX0=
