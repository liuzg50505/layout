var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        function Binding() {
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
        FunctionBinding.prototype.onSourceChanged = function () {
        };
        return FunctionBinding;
    }(LayoutLzg.Binding));
    LayoutLzg.FunctionBinding = FunctionBinding;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var PropertyBinding = (function (_super) {
        __extends(PropertyBinding, _super);
        function PropertyBinding() {
            _super.apply(this, arguments);
        }
        PropertyBinding.prototype.onSourceChanged = function () {
        };
        return PropertyBinding;
    }(LayoutLzg.Binding));
    LayoutLzg.PropertyBinding = PropertyBinding;
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
                            injectProperties(this);
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
    var SimplePropertyChangedListenerProvider = (function (_super) {
        __extends(SimplePropertyChangedListenerProvider, _super);
        function SimplePropertyChangedListenerProvider() {
            _super.call(this);
            this.providers = new LayoutLzg.List();
        }
        SimplePropertyChangedListenerProvider.prototype.addProvider = function (provider) {
            this.providers.add(provider);
        };
        SimplePropertyChangedListenerProvider.prototype.addProviders = function (providers) {
            for (var _i = 0, providers_1 = providers; _i < providers_1.length; _i++) {
                var provider = providers_1[_i];
                this.providers.add(provider);
            }
        };
        SimplePropertyChangedListenerProvider.prototype.getPropertyChangedListener = function (obj, propertyName) {
            for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
                var provider = _a[_i];
                if (provider.canProvideChangedListener(obj, propertyName)) {
                    return provider.getPropertyChangedListener(obj, propertyName);
                }
            }
            return null;
        };
        SimplePropertyChangedListenerProvider.prototype.canProvide = function (obj, propertyName) {
            for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
                var provider = _a[_i];
                if (provider.canProvideChangedListener(obj, propertyName)) {
                    return true;
                }
            }
            return false;
        };
        return SimplePropertyChangedListenerProvider;
    }(PropertyChangedListenerProvider));
    LayoutLzg.UniversalPropertyChangedListenerProvider = SimplePropertyChangedListenerProvider;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
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
                    self.callback.apply(self.dom, [self.dom.offsetWidth]);
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
        DomSizePropertyChangedListenerProvider.prototype.canProvide = function (obj, propertyName) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dGJhc2UudHMiLCJsYXlvdXRjb3JlLnRzIiwiYmluZGluZ3MvYmluZGluZy50cyIsImJpbmRpbmdzL2Z1bmN0aW9uYmluZGluZy50cyIsImJpbmRpbmdzL3Byb3BlcnR5YmluZGluZy50cyIsImJydXNoZXMvZ3JhZGllbnRjb2xvcmJydXNoLnRzIiwiYnJ1c2hlcy9pbWFnZWNvbG9yYnJ1c2gudHMiLCJicnVzaGVzL3NvbGlkY29sb3JicnVzaC50cyIsImNvbGxlY3Rpb25zL2xpc3QudHMiLCJjb2xsZWN0aW9ucy9tYXAudHMiLCJjb250YWluZXJzL2JvcmRlci50cyIsImNvbnRhaW5lcnMvY29udGFpbmVyYmFzZS50cyIsImNvbnRhaW5lcnMvaG9yaXpvbmFsbGluZWFybGF5b3V0LnRzIiwiY29udGFpbmVycy92ZXJ0aWNhbGxpbmVhcmxheW91dC50cyIsImNvbnRyb2xzL2NvbnRyb2xiYXNlLnRzIiwiY29udHJvbHMvaW1hZ2UudHMiLCJjb250cm9scy9yZWN0LnRzIiwiY29udHJvbHMvdGV4dHZpZXcudHMiLCJldmVudGJ1cy9ldmVudGJ1cy50cyIsIm9ic2VydmVyL29ic2VydmFibGVvYmplY3RpbmplY3Rvci50cyIsIm9ic2VydmVyL3ZhbHVlY2hhbmdlZGxpc3Rlcm5lci50cyIsIm9ic2VydmVyL3podG1scHJvcGNoYW5nZWRsaXN0ZXJuZXIudHMiLCJ2aXN1YWx0cmVlL3RlbXBsYXRlY29udHJvbC50cyIsInZpc3VhbHRyZWUvdmlzdWFsdHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQVUsU0FBUyxDQTZEbEI7QUE3REQsV0FBVSxTQUFTLEVBQUEsQ0FBQztJQUNoQixXQUFZLGdCQUFnQjtRQUN4QiwyREFBTSxDQUFBO1FBQ04sdURBQUksQ0FBQTtRQUNKLHlEQUFLLENBQUE7UUFDTCwyREFBTSxDQUFBO0lBQ1YsQ0FBQyxFQUxXLDBCQUFnQixLQUFoQiwwQkFBZ0IsUUFLM0I7SUFMRCxJQUFZLGdCQUFn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QUEsQ0FBQztnQkFDRixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7UUFDTCxDQUFDO1FBRUQsd0NBQW1CLEdBQW5CO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUM3QyxDQUFDO1FBQ0wsQ0FBQztRQUVELGdDQUFXLEdBQVg7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxDQUFDO1FBQ0wsQ0FBQztRQUNELDZCQUFRLEdBQVI7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxDQUFDO1FBQ0wsQ0FBQztRQUlMLGlCQUFDO0lBQUQsQ0E5QkEsQUE4QkMsSUFBQTtJQTlCWSxvQkFBVSxhQThCdEIsQ0FBQTtBQUdMLENBQUMsRUFuQ1MsU0FBUyxLQUFULFNBQVMsUUFtQ2xCIiwiZmlsZSI6Im91dHB1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGVudW0gSG9yaXpvbkFsaWdubWVudCB7XG4gICAgICAgIFN0cmVjaCxcbiAgICAgICAgTGVmdCxcbiAgICAgICAgUmlnaHQsXG4gICAgICAgIENlbnRlclxuICAgIH1cblxuICAgIGV4cG9ydCBlbnVtIFZlcnRpY2FsQWxpZ25tZW50e1xuICAgICAgICBTdHJlY2gsXG4gICAgICAgIFRvcCxcbiAgICAgICAgQm90dG9tLFxuICAgICAgICBDZW50ZXJcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBEaXN0YW5jZVR5cGV7XG4gICAgICAgIGF1dG8sXG4gICAgICAgIGZpeGVkLFxuICAgICAgICB3ZWlnaHRcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBTdGFja1BhbmVsT3JpZW50YXRpb24ge1xuICAgICAgICBIb3Jpem9uYWwsXG4gICAgICAgIFZlcnRpY2FsXG4gICAgfVxuXG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEJydXNoe1xuICAgICAgICBhcHBseVRvQmFja2dyb3VuZChlbGVtOkhUTUxFbGVtZW50KTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOlRoaWNrbmVzcyk6dm9pZDtcbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOm51bWJlcik6dm9pZDtcbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOkhUTUxFbGVtZW50LHRoaWNrbmVzczpudW1iZXIpOnZvaWQ7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgVGhpY2tuZXNze1xuICAgICAgICBsZWZ0Om51bWJlcjtcbiAgICAgICAgcmlnaHQ6bnVtYmVyO1xuICAgICAgICB0b3A6bnVtYmVyO1xuICAgICAgICBib3R0b206bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIGJvdHRvbTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgICAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgICAgICAgICAgdGhpcy50b3AgPSB0b3A7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaXN0YW5jZXtcbiAgICAgICAgdmFsdWU6bnVtYmVyO1xuICAgICAgICB0eXBlOkRpc3RhbmNlVHlwZTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBEaXN0YW5jZVR5cGUsIHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuIiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBTbG90IHtcbiAgICAgICAgY2hpbGRyZW46TGlzdDxDb250cm9sPiA9IG5ldyBMaXN0PENvbnRyb2w+KCk7XG4gICAgICAgIGlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlIDogYm9vbGVhbjtcbiAgICAgICAgaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlIDogYm9vbGVhbjtcbiAgICAgICAgY2FsdWxhdGVkU2xvdFdpZHRoIDogbnVtYmVyO1xuICAgICAgICBjYWx1bGF0ZWRTbG90SGVpZ2h0IDogbnVtYmVyO1xuICAgICAgICBjb250YWluZXIgOiBDb250YWluZXJDb250cm9sO1xuXG4gICAgICAgIGFkZENoaWxkKGNoaWxkIDogQ29udHJvbCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmFkZChjaGlsZCk7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90ID0gdGhpcztcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDaGlsZChjaGlsZCA6IENvbnRyb2wpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5yZW1vdmUoY2hpbGQpO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBlbXB0eSgpOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGcmFtZXdvcmtFbGVtZW50IHtcbiAgICAgICAgLy8gTmFtZSBvZiB0aGlzIGNvbnRyb2wuXG4gICAgICAgIG5hbWU6c3RyaW5nO1xuICAgICAgICAvLyBXaWR0aCBvZiB0aGlzIENvbnRyb2wsIGl0IGNhbiBiZSBhIGZpeCB2YWx1ZSBvciBhdXRvLlxuICAgICAgICB3aWR0aDpEaXN0YW5jZTtcbiAgICAgICAgLy8gSGVpZ2h0IG9mIHRoaXMgQ29udHJvbCwgaXQgY2FuIGJlIGEgZml4IHZhbHVlIG9yIGF1dG8uXG4gICAgICAgIGhlaWdodDpEaXN0YW5jZTtcbiAgICAgICAgLy8gSG9yaXpvbmFsIGFsaWdubWVudCBvZiB0aGlzIGNvbnRyb2wgaW4gaXQncyBwYXJlbnQgY29udGFpbmVyXG4gICAgICAgIGhvcml6b25BbGlnbm1lbnQgOiBIb3Jpem9uQWxpZ25tZW50O1xuICAgICAgICAvLyBWZXJ0aWNhbCBhbGlnbm1lbnQgb2YgdGhpcyBjb250cm9sIGluIGl0J3MgcGFyZW50IGNvbnRhaW5lclxuICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudCA6IFZlcnRpY2FsQWxpZ25tZW50O1xuICAgICAgICAvLyBNYXJnaW4gb2YgdGhpcyBjb250cm9sIHRvIGl0J3MgcGFyZW50LCB0aGUgdmFsdWUgaW4gdGhpY2tuZXNzIG11c3QgYmUgYSBmaXggdmFsdWUuXG4gICAgICAgIG1hcmdpbjpUaGlja25lc3M7XG5cbiAgICAgICAgcGFyZW50U2xvdDpTbG90O1xuICAgICAgICBwYXJlbnQ6Q29udGFpbmVyQ29udHJvbDtcbiAgICAgICAgLy8gcm9vdCBkaXYgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICByb290RWxlbTpIVE1MRWxlbWVudDtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIC8vIEluaXQgdmFpcmFibGVzLlxuICAgICAgICAgICAgdGhpcy5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdGhpcy5tYXJnaW4gPSBuZXcgVGhpY2tuZXNzKDAsMCwwLDApO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsNTApO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLDUwKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IHRoZSByb290IGVsZW1lbnQgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICBhYnN0cmFjdCBnZXRSb290RWxlbWVudCgpOkhUTUxFbGVtZW50O1xuXG4gICAgICAgIC8vIEVzdGltYXRlIHRoZSB3aWR0aCBvZiB0aGlzIGNvbnRyb2wsXG4gICAgICAgIC8vIHRoZSBzaXplIG9mIHRoaXMgY29udHJvbCBpcyBkZXRlcm1pbmVkIGJ5IG1hbnkgZmFjdG9ycyxcbiAgICAgICAgLy8gZm9yIGV4YW1wbGUgOiBhdXRvL2ZpeCB2YWx1ZSBvZiB3aWR0aC9oZWlnaHQsIHBhcmVudCBjb250YWluZXIsIGhvcml6b25hbC92ZXJ0aWNhbCBhbGlnbm1lbnRzLCBtYXJnaW5z44CCXG4gICAgICAgIC8vIEZvciBkaWZmZXJlbnQgdHlwZXMgb2YgcGFyZW50IGNvbnRhaW5lcnMsIHRoZSBtZXRob2Qgb2Ygc2l6ZSBlc3RpbWF0aW9uIGFyZSB0b3RhbGx5IGRpZmZlcmVudC5cbiAgICAgICAgZXN0aW1hdGVXaWR0aCgpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVzdGltYXRlIHRoZSB3aWR0aCBvZiB0aGlzIGNvbnRyb2wsXG4gICAgICAgIC8vIHRoZSBzaXplIG9mIHRoaXMgY29udHJvbCBpcyBkZXRlcm1pbmVkIGJ5IG1hbnkgZmFjdG9ycyxcbiAgICAgICAgLy8gZm9yIGV4YW1wbGUgOiBhdXRvL2ZpeCB2YWx1ZSBvZiB3aWR0aC9oZWlnaHQsIHBhcmVudCBjb250YWluZXIsIGhvcml6b25hbC92ZXJ0aWNhbCBhbGlnbm1lbnRzLCBtYXJnaW5z44CCXG4gICAgICAgIC8vIEZvciBkaWZmZXJlbnQgdHlwZXMgb2YgcGFyZW50IGNvbnRhaW5lcnMsIHRoZSBtZXRob2Qgb2Ygc2l6ZSBlc3RpbWF0aW9uIGFyZSB0b3RhbGx5IGRpZmZlcmVudC5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTpudW1iZXJ7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFzc2VtYmxlIGh0bWwgZWxlbWVudHMgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICBhc3NlbWJsZURvbSgpOnZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRqdXN0IHN0eWxlcyBodG1sIGVsZW1lbnRzIG9mIHRoaXMgY29udHJvbC5cbiAgICAgICAgZG9MYXlvdXQoKTp2b2lke1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgLy8gQ29udHJvbCBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBvZiBhbGwgdGhlIHZpc3VhbCBjb21wb25lbnRzLlxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250cm9sIGV4dGVuZHMgRnJhbWV3b3JrRWxlbWVudCBpbXBsZW1lbnRzIERpc3Bvc2FibGV7XG5cbiAgICAgICAgLy8gQmFja2dyb3VuZCBvZiB0aGlzIGNvbnRyb2wsIGl0IGNhbiBiZSBhIHNvbGlkIGNvbG9yLCBvciBhIGdyYWRpZW50IGNvbG9yICwgb3IgYSBwaWN0dXJlLlxuICAgICAgICBmaWxsOkJydXNoO1xuICAgICAgICAvLyBCb3JkZXIgb2YgdGhpcyBjb250cm9sLCBpdCBjYW4gYmUgYSBzb2xpZCBjb2xvciwgb3IgYSBncmFkaWVudCBjb2xvciAsIG9yIGEgcGljdHVyZS5cbiAgICAgICAgc3Ryb2tlOkJydXNoO1xuICAgICAgICAvLyBUaGlja25lc3Mgb2YgdGhpcyBjb250cm9sJ3MgYm9yZGVyLCB0aGUgdmFsdWUgaW4gdGhpY2tuZXNzIG11c3QgYmUgYSBmaXggdmFsdWUuXG4gICAgICAgIHN0cm9rZVRoaWNrbmVzczpUaGlja25lc3M7XG5cbiAgICAgICAgLy8gLy8gSW50ZXJuYWwgdmFpcmFibGUuIEluZGljYXRlIHRoZSBjb250YWluZXIncyB3aWR0aCBvZiB0aGlzIGNvbnRyb2wgaXMgY2FsY3VsYXRhYmxlLlxuICAgICAgICAvLyBpc1BhcmVudFNsb3RXaWR0aENhbGN1bGF0YWJsZSA6IGJvb2xlYW47XG4gICAgICAgIC8vIC8vIEludGVybmFsIHZhaXJhYmxlLiBJbmRpY2F0ZSB0aGUgY29udGFpbmVyJ3MgaGVpZ2h0IG9mIHRoaXMgY29udHJvbCBpcyBjYWxjdWxhdGFibGUuXG4gICAgICAgIC8vIGlzUGFyZW50U2xvdEhlaWdodENhbGN1bGF0YWJsZSA6IGJvb2xlYW47XG4gICAgICAgIC8vIC8vIEludGVybmFsIHZhaXJhYmxlLiBQYXJlbnQgc2xvdCB3aWR0aC5cbiAgICAgICAgLy8gLy8gU2xvdCBtZWFucyB0aGUgc3BhY2Ugd2hlcmUgdGhlIGNvbnRyb2wgaXMgcGxhY2VkLFxuICAgICAgICAvLyAvLyBpdCBtYXkgYmUgdGhlIHdob2xlIG9mIGl0J3MgY29udGFpbmVyIG9yIGEgcGFydCBvZiBpdCdzIGNvbnRhaW5lci5cbiAgICAgICAgLy8gcGFyZW50U2xvdFdpZHRoOm51bWJlcjtcbiAgICAgICAgLy8gLy8gSW50ZXJuYWwgdmFpcmFibGUuIFBhcmVudCBzbG90IGhlaWdodC5cbiAgICAgICAgLy8gcGFyZW50U2xvdEhlaWdodDpudW1iZXI7XG5cblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyl7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuc3Ryb2tlVGhpY2tuZXNzID0gbmV3IFRoaWNrbmVzcygwLDAsMCwwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IGRpc3Bvc2UoKTogdm9pZDtcbiAgICB9XG5cbiAgICAvLyBUaGUgcHVycG9zZSBvZiB0aGUgY29udGFpbmVyIGlzIHRvIHB1dCBzdWIgY29udHJvbHMgdG9nZXRoZXIsXG4gICAgLy8gYW5kIHRoZSBzeXN0ZW0gcHJvdmlkZXMgbXVsdGlwbGUgbGF5b3V0IGNvbnRhaW5lcnMgZHVlIHRvIGFjdHVhbCByZXF1aXJlbWVudHMuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbnRhaW5lckNvbnRyb2wgZXh0ZW5kcyBDb250cm9se1xuICAgICAgICBwcm90ZWN0ZWQgY2hpbGRyZW46TGlzdDxDb250cm9sPjtcbiAgICAgICAgcHJvdGVjdGVkIHNsb3RzIDogTGlzdDxTbG90PjtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBuZXcgTGlzdDxDb250cm9sPigpO1xuICAgICAgICAgICAgdGhpcy5zbG90cyA9IG5ldyBMaXN0PFNsb3Q+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDaGlsZChjb250cm9sOkNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uYWRkKGNvbnRyb2wpO1xuICAgICAgICAgICAgY29udHJvbC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGQoY29udHJvbDpDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnJlbW92ZShjb250cm9sKTtcbiAgICAgICAgICAgIGNvbnRyb2wucGFyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyQ2hpbGQoKTp2b2lke1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudFNsb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdENhbGN1bGFibGVTbG90cygpOnZvaWQge1xuICAgICAgICB9XG5cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNoaWxkLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBDb250ZW50UHJlc2VudGVyIHtcblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBJdGVtc1ByZXNlbnRlciB7XG5cbiAgICB9XG59XG5cblxuIiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgVmFsdWVDb252ZXJ0ZXIge1xuXG4gICAgfVxuXG4gICAgZXhwb3J0IGVudW0gQmluZGluZ01vZGUge1xuICAgICAgICBPbmV3YXksXG4gICAgICAgIFR3b3dheVxuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCaW5kaW5nIGltcGxlbWVudHMgRGlzcG9zYWJsZXtcbiAgICAgICAgdGFyZ2V0OmFueTtcbiAgICAgICAgdGFyZ2V0UHJvcGVydHlOYW1lOnN0cmluZztcbiAgICAgICAgY29udmVydGVyOlZhbHVlQ29udmVydGVyO1xuICAgICAgICBtb2RlOkJpbmRpbmdNb2RlO1xuXG4gICAgICAgIGFic3RyYWN0IG9uU291cmNlQ2hhbmdlZCgpOnZvaWQ7XG5cbiAgICAgICAgc3RhcnRCaW5kaW5nKCk6dm9pZHtcblxuICAgICAgICB9XG5cbiAgICAgICAgc3RvcEJpbmRpbmcoKTp2b2lke1xuXG4gICAgICAgIH1cblxuICAgICAgICBkaXNwb3NlKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zdG9wQmluZGluZygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6ZyB7XG4gICAgZXhwb3J0IGNsYXNzIEZ1bmN0aW9uQmluZGluZyBleHRlbmRzIEJpbmRpbmd7XG4gICAgICAgIG9uU291cmNlQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemcge1xuXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5QmluZGluZyBleHRlbmRzIEJpbmRpbmcge1xuXG4gICAgICAgIHNvdXJjZTogYW55O1xuICAgICAgICBzb3VyY2VQcm9wZXJ0eU5hbWU6IHN0cmluZztcblxuICAgICAgICBvblNvdXJjZUNoYW5nZWQoKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGNsYXNzIEdyYWRpZW50Q29sb3JCcnVzaCBpbXBsZW1lbnRzIEJydXNoe1xuICAgICAgICBjb2xvcjpzdHJpbmc7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbG9yOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQmFja2dyb3VuZChlbGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlcihlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBMYXlvdXRMemcuVGhpY2tuZXNzKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyTGVmdChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJSaWdodChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJUb3AoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyQm90dG9tKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBJbWFnZUNvbG9yQnJ1c2ggaW1wbGVtZW50cyBCcnVzaHtcbiAgICAgICAgY29sb3I6c3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb2xvcjpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JhY2tncm91bmQoZWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlcihlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBMYXlvdXRMemcuVGhpY2tuZXNzKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyTGVmdChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJSaWdodChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJUb3AoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyQm90dG9tKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBTb2xpZENvbG9yQnJ1c2ggaW1wbGVtZW50cyBCcnVzaHtcbiAgICAgICAgY29sb3I6c3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb2xvcjpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JhY2tncm91bmQoZWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXIoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogTGF5b3V0THpnLlRoaWNrbmVzcyk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gdGVzdExpc3QoKTp2b2lke1xuXG4gICAgICAgIGxldCBsaXRlcmFsMSA9IG5ldyBMYXlvdXRMemcuVGV4dFZpZXcoJ2EnLCcxMTExMScpO1xuICAgICAgICBsZXQgbGl0ZXJhbDIgPSBuZXcgTGF5b3V0THpnLlRleHRWaWV3KCdhJywnMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjInKTtcbiAgICAgICAgbGV0IGxpdGVyYWwzID0gbmV3IExheW91dEx6Zy5UZXh0VmlldygnYScsJzMzMzMzMzMzMzMnKTtcblxuXG4gICAgICAgIGxldCBsc3QgPSBuZXcgTGlzdDxUZXh0Vmlldz4oKTtcbiAgICAgICAgbHN0LmFkZChsaXRlcmFsMSk7XG4gICAgICAgIGxzdC5hZGQobGl0ZXJhbDIpO1xuICAgICAgICBsc3QuYWRkKGxpdGVyYWwzKTtcbiAgICAgICAgbHN0LmNsZWFyKCk7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgTGlzdDxUPiBleHRlbmRzIEFycmF5PFQ+e1xuXG4gICAgICAgIGFkZChpdGVtOlQpIDogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQWxsKGl0ZW1zOkFycmF5PFQ+KSA6IHZvaWQge1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxpdGVtcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoaXRlbXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlKGl0ZW06VCk6dm9pZCB7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBjdXJpdGVtID0gdGhpc1tpXTtcbiAgICAgICAgICAgICAgICBpZihjdXJpdGVtPT1pdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQWxsKGl0ZW1zOkFycmF5PFQ+KSA6dm9pZCB7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTxpdGVtcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyKCkgOnZvaWQge1xuICAgICAgICAgICAgc3VwZXIuc3BsaWNlKDAsdGhpcy5sZW5ndGgpO1xuICAgICAgICB9XG5cblxuXG5cblxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gdGVzdG1hcCgpOnZvaWR7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgTWFwPHN0cmluZyxudW1iZXI+KCk7XG4gICAgICAgIG1hcC5wdXQoJ2EnLDMzKTtcbiAgICAgICAgbWFwLnB1dCgnYicsNDMpO1xuICAgICAgICBsZXQgYiA9IG1hcC5nZXQoJ2InKTtcbiAgICAgICAgbGV0IGEgPSBtYXAuZ2V0KCdhJyk7XG4gICAgICAgIG1hcC5jbGVhcigpO1xuICAgIH1cblxuICAgIGNsYXNzIE1hcEl0ZW08VEtleSxUVmFsdWU+IHtcbiAgICAgICAga2V5IDogVEtleTtcbiAgICAgICAgdmFsdWUgOiBUVmFsdWU7XG5cbiAgICAgICAgY29uc3RydWN0b3Ioa2V5OiBUS2V5LCB2YWx1ZTogVFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBNYXA8VEtleSxUVmFsdWU+IGV4dGVuZHMgQXJyYXk8TWFwSXRlbTxUS2V5LFRWYWx1ZT4+e1xuXG4gICAgICAgIHB1dChrZXk6VEtleSwgdmFsdWU6VFZhbHVlKSA6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5wdXNoKG5ldyBNYXBJdGVtKGtleSx2YWx1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KGtleTpUS2V5KSA6IFRWYWx1ZSB8IGFueSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5rZXk9PWtleSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXIoKSA6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnNwbGljZSgwLHRoaXMubGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5zS2V5KGtleTpUS2V5KTpib29sZWFuIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpc1tpXTtcbiAgICAgICAgICAgICAgICBpZihpdGVtLmtleT09a2V5KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBCb3JkZXIgZXh0ZW5kcyBDb250YWluZXJDb250cm9sIHtcblxuICAgICAgICB3cmFwcGVyRG9tcyA6IEFycmF5PEhUTUxFbGVtZW50PjtcbiAgICAgICAgcHJpdmF0ZSBtYWluU2xvdCA6IFNsb3Q7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5tYWluU2xvdCA9IG5ldyBTbG90KCk7XG4gICAgICAgICAgICB0aGlzLm1haW5TbG90LmNvbnRhaW5lciA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290RWxlbSA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC10eXBlJywnQm9yZGVyJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtbmFtZScsdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RFbGVtO1xuICAgICAgICB9XG5cblxuICAgICAgICBhZGRDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgICAgICB0aGlzLm1haW5TbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdENhbGN1bGFibGVTbG90cygpOnZvaWQge1xuXG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgJiYgdGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSAmJiB0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlckRvbXMgPSBbXTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXJEaXYgPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgICAgICAgICAgJCh3cmFwcGVyRGl2KS5hdHRyKCdsYXlvdXQtdGFnJywnd3JhcHBlcicpO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlckRvbXMucHVzaCh3cmFwcGVyRGl2KTtcbiAgICAgICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKHdyYXBwZXJEaXYpO1xuICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuYXBwZW5kKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd3aWR0aCcsdGhpcy5lc3RpbWF0ZVdpZHRoKCkrJ3B4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdoZWlnaHQnLHRoaXMuZXN0aW1hdGVIZWlnaHQoKSsncHgnKTtcblxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXJEaXYgPSB0aGlzLndyYXBwZXJEb21zW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkLmRvTGF5b3V0KCk7XG5cbiAgICAgICAgICAgICAgICAkKHdyYXBwZXJEaXYpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuY3NzKCdsZWZ0JyxjaGlsZC5tYXJnaW4ubGVmdCsncHgnKTtcbiAgICAgICAgICAgICAgICAkKHdyYXBwZXJEaXYpLmNzcygncmlnaHQnLGNoaWxkLm1hcmdpbi5yaWdodCsncHgnKTtcbiAgICAgICAgICAgICAgICAkKHdyYXBwZXJEaXYpLmNzcygndG9wJyxjaGlsZC5tYXJnaW4udG9wKydweCcpO1xuICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuY3NzKCdib3R0b20nLGNoaWxkLm1hcmdpbi5ib3R0b20rJ3B4Jyk7XG5cbiAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgIGlmKGNoaWxkLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygnbGVmdCcsJzBweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2hpbGQuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygnbGVmdCcsJzBweCcpO1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygncmlnaHQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlcil7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3ID0gY2hpbGQuZXN0aW1hdGVXaWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgd3cgPSB0aGlzLmVzdGltYXRlV2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSAod3ctdykvMjtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLHgrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcCkge1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygndG9wJywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2hpbGQudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygnYm90dG9tJywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2hpbGQudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd0b3AnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2JvdHRvbScsJzBweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXIpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgaCA9IGNoaWxkLmVzdGltYXRlSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBoaCA9IHRoaXMuZXN0aW1hdGVIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSAoaGgtaCkvMjtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcseSsncHgnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0XG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGg+MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlV2lkdGgoKSt0Lm1hcmdpbi5sZWZ0K3QubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZVdpZHRoKCkgKyB0Lm1hcmdpbi5sZWZ0ICsgdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGg+MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5lc3RpbWF0ZUhlaWdodCgpK3QubWFyZ2luLnRvcCt0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlSGVpZ2h0KCkgKyB0Lm1hcmdpbi50b3AgKyB0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbnRhaW5lckJhc2UgZXh0ZW5kcyBDb250YWluZXJDb250cm9sIHtcblxuICAgICAgICByb290RWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVIZWlnaHRfYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlSGVpZ2h0X2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBlc3RpbWF0ZVdpZHRoX2F1dG8oKTpudW1iZXIgO1xuXG4gICAgICAgIGFic3RyYWN0IGVzdGltYXRlSGVpZ2h0X2F1dG8oKTpudW1iZXIgO1xuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgY2xhc3MgU2xvdEl0ZW0ge1xuICAgICAgICBzbG90Qm9yZGVyOkJvcmRlcjtcbiAgICAgICAgc2xvdERlZmluYXRpb246RGlzdGFuY2U7XG5cbiAgICAgICAgY29uc3RydWN0b3Ioc2xvdEJvcmRlcjogQm9yZGVyLCBzbG90RGVmaW5hdGlvbjogRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2xvdEJvcmRlciA9IHNsb3RCb3JkZXI7XG4gICAgICAgICAgICB0aGlzLnNsb3REZWZpbmF0aW9uID0gc2xvdERlZmluYXRpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgSG9yaXpvbmFsTGluZWFyTGF5b3V0IGV4dGVuZHMgQ29udGFpbmVyQmFzZSB7XG5cbiAgICAgICAgc2xvdE1hcCA6IE1hcDxTbG90LFNsb3RJdGVtPjtcbiAgICAgICAgYm9yZGVyRWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAgPSBuZXcgTWFwPFNsb3QsIFNsb3RJdGVtPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2VsbChkaXN0YW5jZTpEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zbG90TWFwLmNvbnRhaW5zS2V5KHNsb3QpKVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdE1hcC5wdXQoc2xvdCxuZXcgU2xvdEl0ZW0obnVsbCxudWxsKSk7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICBpdGVtLnNsb3REZWZpbmF0aW9uID0gZGlzdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIucmVtb3ZlQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhckNoaWxkKCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuY2xlYXJDaGlsZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0Q2VsbChjb250cm9sOkNvbnRyb2wsIGNlbGxJbmRleDpudW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjb250cm9sKTtcbiAgICAgICAgICAgIGlmKGlkeD4tMSl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2NlbGxJbmRleF07XG4gICAgICAgICAgICAgICAgc2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdIb3Jpem9uYWxMaW5lYXJMYXlvdXQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuICAgICAgICBpbml0Q2FsY3VsYWJsZVNsb3RzKCk6dm9pZCB7XG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMud2lkdGgudmFsdWUqY2VsbERlZmluYXRpb24udmFsdWUvd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgJiYgdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG5cbiAgICAgICAgICAgIC8vIGluaXQgdmFyaWFibGVzIGFuZCBodG1sZWxlbWVudHNcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuICAgICAgICAgICAgaWYodGhpcy5ib3JkZXJFbGVtPT1udWxsKSB0aGlzLmJvcmRlckVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG5cbiAgICAgICAgICAgIC8vIGFkZCBjZWxsIHdyYXBwZXIgZGl2cyB0byByb290RWxlbVxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBuZXcgQm9yZGVyKCcnKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5hcHBlbmQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpO1xuXG4gICAgICAgICAgICAgICAgaXRlbS5zbG90Qm9yZGVyID0gYm9yZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRyZW4gcm9vdEVsZW1zIHRvIGNlbGwgd3JhcHBlcnNcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gaXRlbS5zbG90Qm9yZGVyO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXIuYWRkQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpdGVtLnNsb3RCb3JkZXIgPSBib3JkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHdlaWdodFN1bSBhbmQgZml4U3VtXG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gc2V0IHJvb3RFbGVtIHN0eWxlc1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMuZXN0aW1hdGVXaWR0aCgpKydweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmVzdGltYXRlSGVpZ2h0KCkrJ3B4Jyk7XG5cbiAgICAgICAgICAgIC8vIHNldCBib3JkZXIgYW5kIGJhY2tncm91bmQgc3R5bGVzXG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygndG9wJywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdib3R0b20nLCcwcHgnKTtcbiAgICAgICAgICAgIGlmKHRoaXMuc3Ryb2tlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cm9rZS5hcHBseVRvQm9yZGVyKHRoaXMuYm9yZGVyRWxlbSx0aGlzLnN0cm9rZVRoaWNrbmVzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmZpbGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsbC5hcHBseVRvQmFja2dyb3VuZCh0aGlzLmJvcmRlckVsZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBpdGVtLnNsb3RCb3JkZXI7XG5cbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcsJzBweCcpO1xuICAgICAgICAgICAgICAgICQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpLmNzcygnYm90dG9tJywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGx3ID0gMDtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbHc9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIGNlbGx3ID0gKHRoaXMuZXN0aW1hdGVXaWR0aCgpIC0gZml4U3VtKSogY2VsbERlZmluYXRpb24udmFsdWUgLyB3ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpLmNzcygnbGVmdCcscG9zKydweCcpO1xuICAgICAgICAgICAgICAgIGJvcmRlci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsY2VsbHcpO1xuICAgICAgICAgICAgICAgIGJvcmRlci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90ID0gc2xvdDtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmVzdGltYXRlSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IGNlbGx3O1xuXG4gICAgICAgICAgICAgICAgcG9zKz1jZWxsdztcbiAgICAgICAgICAgICAgICBib3JkZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0XG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVXaWR0aF9hdXRvKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVXaWR0aF9hdXRvKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3BcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZUhlaWdodF9hdXRvKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVIZWlnaHRfYXV0bygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0X2F1dG8oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZUhlaWdodCgpICsgdC5tYXJnaW4udG9wICsgdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGhfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVXaWR0aCgpICsgdC5tYXJnaW4ubGVmdCArIHQubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGNsYXNzIFNsb3RJdGVtIHtcbiAgICAgICAgc2xvdEJvcmRlcjpCb3JkZXI7XG4gICAgICAgIHNsb3REZWZpbmF0aW9uOkRpc3RhbmNlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHNsb3RCb3JkZXI6IEJvcmRlciwgc2xvdERlZmluYXRpb246IERpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLnNsb3RCb3JkZXIgPSBzbG90Qm9yZGVyO1xuICAgICAgICAgICAgdGhpcy5zbG90RGVmaW5hdGlvbiA9IHNsb3REZWZpbmF0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFZlcnRpY2FsTGluZWFyTGF5b3V0IGV4dGVuZHMgQ29udGFpbmVyQ29udHJvbCB7XG5cbiAgICAgICAgc2xvdE1hcCA6IE1hcDxTbG90LFNsb3RJdGVtPjtcbiAgICAgICAgYm9yZGVyRWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAgPSBuZXcgTWFwPFNsb3QsIFNsb3RJdGVtPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2VsbChkaXN0YW5jZTpEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zbG90TWFwLmNvbnRhaW5zS2V5KHNsb3QpKVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdE1hcC5wdXQoc2xvdCxuZXcgU2xvdEl0ZW0obnVsbCxudWxsKSk7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICBpdGVtLnNsb3REZWZpbmF0aW9uID0gZGlzdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIucmVtb3ZlQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhckNoaWxkKCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuY2xlYXJDaGlsZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0Q2VsbChjb250cm9sOkNvbnRyb2wsIGNlbGxJbmRleDpudW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjb250cm9sKTtcbiAgICAgICAgICAgIGlmKGlkeD4tMSl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2NlbGxJbmRleF07XG4gICAgICAgICAgICAgICAgc2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdIb3Jpem9uYWxMaW5lYXJMYXlvdXQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuICAgICAgICBpbml0Q2FsY3VsYWJsZVNsb3RzKCk6dm9pZCB7XG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWUqY2VsbERlZmluYXRpb24udmFsdWUvd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSAmJiB0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlICYmIHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG5cbiAgICAgICAgICAgIC8vIGluaXQgdmFyaWFibGVzIGFuZCBodG1sZWxlbWVudHNcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuICAgICAgICAgICAgaWYodGhpcy5ib3JkZXJFbGVtPT1udWxsKSB0aGlzLmJvcmRlckVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG5cbiAgICAgICAgICAgIC8vIGFkZCBjZWxsIHdyYXBwZXIgZGl2cyB0byByb290RWxlbVxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBuZXcgQm9yZGVyKCcnKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5hcHBlbmQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpO1xuXG4gICAgICAgICAgICAgICAgaXRlbS5zbG90Qm9yZGVyID0gYm9yZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRyZW4gcm9vdEVsZW1zIHRvIGNlbGwgd3JhcHBlcnNcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gaXRlbS5zbG90Qm9yZGVyO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXIuYWRkQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpdGVtLnNsb3RCb3JkZXIgPSBib3JkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHdlaWdodFN1bSBhbmQgZml4U3VtXG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gc2V0IHJvb3RFbGVtIHN0eWxlc1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMuZXN0aW1hdGVXaWR0aCgpKydweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmVzdGltYXRlSGVpZ2h0KCkrJ3B4Jyk7XG5cbiAgICAgICAgICAgIC8vIHNldCBib3JkZXIgYW5kIGJhY2tncm91bmQgc3R5bGVzXG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygndG9wJywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdib3R0b20nLCcwcHgnKTtcbiAgICAgICAgICAgIGlmKHRoaXMuc3Ryb2tlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cm9rZS5hcHBseVRvQm9yZGVyKHRoaXMuYm9yZGVyRWxlbSx0aGlzLnN0cm9rZVRoaWNrbmVzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmZpbGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsbC5hcHBseVRvQmFja2dyb3VuZCh0aGlzLmJvcmRlckVsZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBpdGVtLnNsb3RCb3JkZXI7XG5cbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxoID0gMDtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoID0gKHRoaXMuZXN0aW1hdGVIZWlnaHQoKSAtIGZpeFN1bSkqIGNlbGxEZWZpbmF0aW9uLnZhbHVlIC8gd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcscG9zKydweCcpO1xuICAgICAgICAgICAgICAgIGJvcmRlci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxjZWxsaCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90ID0gc2xvdDtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5lc3RpbWF0ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gY2VsbGg7XG5cbiAgICAgICAgICAgICAgICBwb3MrPWNlbGxoO1xuICAgICAgICAgICAgICAgIGJvcmRlci5kb0xheW91dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuZXN0aW1hdGVXaWR0aCgpK3QubWFyZ2luLmxlZnQrdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlV2lkdGgoKSArIHQubWFyZ2luLmxlZnQgKyB0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aWR0aGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3BcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlSGVpZ2h0KCkrdC5tYXJnaW4udG9wK3QubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVIZWlnaHQoKSArIHQubWFyZ2luLnRvcCArIHQubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIC8vIEJvcmRlcnMgdG8gY29udGFpbiBjaGlsZCBjb250cm9scywgY2VsbEJvcmRlckFycmF5Lmxlbmd0aCBpcyB0aGUgY2VsbHMgY291bnQuXG4gICAgICAgIC8vIGNlbGxCb3JkZXJBcnJheSA6IExpc3Q8Qm9yZGVyPjtcbiAgICAgICAgLy8gLy8gVGhlIGRpc3RhbmNlIGRlZmluYXRpb24gZm9yIGVhY2ggY2VsbHMuXG4gICAgICAgIC8vIGNlbGxEZWZpbmF0aW9uczpMaXN0PERpc3RhbmNlPjtcbiAgICAgICAgLy8gLy8gVGhlIGNlbGwgaW5kZXggb2YgZWFjaCBjaGlsZCBjb250cm9sIG9mIHRoaXMgY29udGFpbmVyLlxuICAgICAgICAvLyBjZWxsSW5kZXhBcnJheTpMaXN0PG51bWJlcj47XG4gICAgICAgIC8vIC8vIFRoZSBiYWNrZ3JvdWQgYW5kIGJvcmRlciBkaXYgZWxlbWVudC5cbiAgICAgICAgLy8gYm9yZGVyRWxlbTpIVE1MRWxlbWVudDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgLy8gICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAvLyAgICAgLy8gSW5pdCB2YXJpYWJsZXMuXG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxJbmRleEFycmF5PW5ldyBMaXN0PG51bWJlcj4oKTtcbiAgICAgICAgLy8gICAgIHRoaXMuY2VsbERlZmluYXRpb25zID0gbmV3IExpc3Q8RGlzdGFuY2U+KCk7XG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxCb3JkZXJBcnJheSA9IG5ldyBMaXN0PEJvcmRlcj4oKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvLyBBZGQgY2VsbCBkZWZpbmF0aW9uLiBUaGUgZGlzdGFuY2UgdHlwZSBjYW4gYmUgJ3dlaWdodCcgb3IgJ2ZpeCcuXG4gICAgICAgIC8vIGFkZENlbGwoZGlzdGFuY2U6RGlzdGFuY2UpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuY2VsbERlZmluYXRpb25zLnB1c2goZGlzdGFuY2UpO1xuICAgICAgICAvLyAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAvLyAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAvLyAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy8gQWRkIGNoaWxkIHRvIHRoaXMgY29udGFpbmVyLCBhbmQgdGhlIGNvbnRyb2wgaXMgYWRkZWQgdG8gdGhlIGZpcnN0IGNlbGwgYnkgZGVmYXVsdC5cbiAgICAgICAgLy8gYWRkQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgLy8gICAgIHN1cGVyLmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgdGhpcy5jZWxsSW5kZXhBcnJheS5wdXNoKDApO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIFJlbW92ZSBjaGlsZCBmcm9tIHRoaXMgY29udGFpbmVyLlxuICAgICAgICAvLyByZW1vdmVDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAvLyAgICAgc3VwZXIucmVtb3ZlQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIC8vICAgICBjb25zdCBpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY29udHJvbCk7XG4gICAgICAgIC8vICAgICBpZihpZHg+LTEpe1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2VsbEluZGV4QXJyYXkuc3BsaWNlKGlkeCwxKTtcbiAgICAgICAgLy8gICAgICAgICBpZihjb250cm9sLnBhcmVudFNsb3QpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29udHJvbC5wYXJlbnRTbG90LnJlbW92ZUNoaWxkKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvLyBSZW1vdmUgYWxsIGNoaWxkcmVuIGZyb20gdGhpcyBjb250YWluZXIuXG4gICAgICAgIC8vIGNsZWFyQ2hpbGQoKTogdm9pZCB7XG4gICAgICAgIC8vICAgICBzdXBlci5jbGVhckNoaWxkKCk7XG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxJbmRleEFycmF5LmNsZWFyKCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy8gU3BlY2lmeSAnY29udHJvbCcgdG8gdGhlICdjZWxsSW5kZXgnIGNlbGwuXG4gICAgICAgIC8vIHNldENlbGwoY29udHJvbDpDb250cm9sLCBjZWxsSW5kZXg6bnVtYmVyKSB7XG4gICAgICAgIC8vICAgICBjb25zdCBpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY29udHJvbCk7XG4gICAgICAgIC8vICAgICBpZihpZHg+LTEpe1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2VsbEluZGV4QXJyYXlbaWR4XSA9IGNlbGxJbmRleDtcbiAgICAgICAgLy8gICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbY2VsbEluZGV4XTtcbiAgICAgICAgLy8gICAgICAgICBzbG90LmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIEdldCB0aGUgcm9vdCBkaXYgb2YgdGhpcyBjb250YWluZXIuXG4gICAgICAgIC8vIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy8gICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAvLyAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdIb3Jpem9uYWxMaW5lYXJMYXlvdXQnKTtcbiAgICAgICAgLy8gICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gaW5pdENhbGN1bGFibGVTbG90cygpOnZvaWQge1xuICAgICAgICAvLyAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAvLyAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLmNlbGxEZWZpbmF0aW9uc1tpXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5bal07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5bal07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWUqY2VsbERlZmluYXRpb24udmFsdWUvd2VpZ2h0U3VtO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1lbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jZWxsRGVmaW5hdGlvbnMubGVuZ3RoO2krKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLmNlbGxEZWZpbmF0aW9uc1tpXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wO2o8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aisrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2pdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaj0wO2o8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aisrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jZWxsSW5kZXhBcnJheVtqXT09aSl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2pdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbEluZGV4QXJyYXlbal09PWkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgIC8vICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAvLyAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1lbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgJiYgdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gaW5pdCB2YXJpYWJsZXMgYW5kIGh0bWxlbGVtZW50c1xuICAgICAgICAvLyAgICAgdGhpcy5jZWxsQm9yZGVyQXJyYXkuY2xlYXIoKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuICAgICAgICAvLyAgICAgaWYodGhpcy5ib3JkZXJFbGVtPT1udWxsKSB0aGlzLmJvcmRlckVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgIC8vICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKHRoaXMuYm9yZGVyRWxlbSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBhZGQgY2VsbCB3cmFwcGVyIGRpdnMgdG8gcm9vdEVsZW1cbiAgICAgICAgLy8gICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgIGxldCBib3JkZXIgPSBuZXcgQm9yZGVyKCcnKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2VsbEJvcmRlckFycmF5LnB1c2goYm9yZGVyKTtcbiAgICAgICAgLy8gICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKGJvcmRlci5nZXRSb290RWxlbWVudCgpKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIGFkZCBjaGlsZHJlbiByb290RWxlbXMgdG8gY2VsbCB3cmFwcGVyc1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgaj0wO2o8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aisrKXtcbiAgICAgICAgLy8gICAgICAgICBsZXQgYm9yZGVyID0gdGhpcy5jZWxsQm9yZGVyQXJyYXlbdGhpcy5jZWxsSW5kZXhBcnJheVtqXV07XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgLy8gICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5hZGRDaGlsZChjaGlsZCk7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgIC8vICAgICAvLyBjYWxjdWxhdGUgd2VpZ2h0U3VtIGFuZCBmaXhTdW1cbiAgICAgICAgLy8gICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuICAgICAgICAvLyAgICAgbGV0IGZpeFN1bSA9IDA7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgZml4U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gc2V0IHJvb3RFbGVtIHN0eWxlc1xuICAgICAgICAvLyAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMuZXN0aW1hdGVXaWR0aCgpKydweCcpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmVzdGltYXRlSGVpZ2h0KCkrJ3B4Jyk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBzZXQgYm9yZGVyIGFuZCBiYWNrZ3JvdW5kIHN0eWxlc1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnbGVmdCcsJzBweCcpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncmlnaHQnLCcwcHgnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3RvcCcsJzBweCcpO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnYm90dG9tJywnMHB4Jyk7XG4gICAgICAgIC8vICAgICBpZih0aGlzLnN0cm9rZSl7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zdHJva2UuYXBwbHlUb0JvcmRlcih0aGlzLmJvcmRlckVsZW0sdGhpcy5zdHJva2VUaGlja25lc3MpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgaWYodGhpcy5maWxsKXtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmZpbGwuYXBwbHlUb0JhY2tncm91bmQodGhpcy5ib3JkZXJFbGVtKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIHNldCBjZWxsIHdyYXBwZXIgc3R5bGVzXG4gICAgICAgIC8vICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtqKyspe1xuICAgICAgICAvLyAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuY2VsbERlZmluYXRpb25zW2pdO1xuICAgICAgICAvLyAgICAgICAgIGxldCBib3JkZXIgPSB0aGlzLmNlbGxCb3JkZXJBcnJheVtqXTtcbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGNlbGxoID0gMDtcbiAgICAgICAgLy8gICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2VsbGg9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNlbGxoID0gKHRoaXMuZXN0aW1hdGVIZWlnaHQoKSAtIGZpeFN1bSkqIGNlbGxEZWZpbmF0aW9uLnZhbHVlIC8gd2VpZ2h0U3VtO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcscG9zKydweCcpO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmZpeGVkLGNlbGxoKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIucGFyZW50U2xvdCA9IHRoaXMuc2xvdHNbal07XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMuZXN0aW1hdGVXaWR0aCgpO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IGNlbGxoO1xuICAgICAgICAvLyAgICAgICAgIHBvcys9Y2VsbGg7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLmRvTGF5b3V0KCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZXN0aW1hdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICAvLyAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlKXtcbiAgICAgICAgLy8gICAgICAgICBpZiAodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAvLyAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0XG4gICAgICAgIC8vICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KVxuICAgICAgICAvLyAgICAgICAgIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGg+MCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlV2lkdGgoKSt0Lm1hcmdpbi5sZWZ0K3QubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSBpZih0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZVdpZHRoKCkgKyB0Lm1hcmdpbi5sZWZ0ICsgdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyBlc3RpbWF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAvLyAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSl7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAvLyAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcFxuICAgICAgICAvLyAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSlcbiAgICAgICAgLy8gICAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuZXN0aW1hdGVIZWlnaHQoKSt0Lm1hcmdpbi50b3ArdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1lbHNlIGlmKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9ZWxzZXtcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAvLyAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZUhlaWdodCgpICsgdC5tYXJnaW4udG9wICsgdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250cm9sQmFzZSBleHRlbmRzIENvbnRyb2wge1xuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnRcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuUmlnaHQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZVdpZHRoX2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXN0aW1hdGVIZWlnaHRfYXV0bygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVzdGltYXRlSGVpZ2h0X2F1dG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBlc3RpbWF0ZVdpZHRoX2F1dG8oKTogbnVtYmVyO1xuXG4gICAgICAgIGFic3RyYWN0IGVzdGltYXRlSGVpZ2h0X2F1dG8oKTogbnVtYmVyO1xuXG5cbiAgICAgICAgZGlzcG9zZSgpOiB2b2lkIHsgXG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcbiAgICBleHBvcnQgY2xhc3MgSW1hZ2VWaWV3IGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuXG4gICAgICAgIGltZ0VsZW06SFRNTEVsZW1lbnQ7XG4gICAgICAgIHNyYzpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQgeyBcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuXG4gICAgICAgICAgICBpZih0aGlzLmltZ0VsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltZ0VsZW0gPSAkKFwiPGltZy8+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5pbWdFbGVtKS5hdHRyKCdzcmMnLHRoaXMuc3JjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5hcHBlbmQodGhpcy5pbWdFbGVtKTtcbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMud2lkdGgudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmltZ0VsZW0pLmNzcygnd2lkdGgnLHRoaXMud2lkdGgudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkKHRoaXMuaW1nRWxlbSkuY3NzKCd3aWR0aCcsJzEwMCUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmhlaWdodC52YWx1ZSsncHgnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMuaW1nRWxlbSkuY3NzKCdoZWlnaHQnLHRoaXMuaGVpZ2h0LnZhbHVlKydweCcpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmltZ0VsZW0pLmNzcygnaGVpZ2h0JywnMTAwJScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHRfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoX2F1dG8oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGNsYXNzIFJlY3QgZXh0ZW5kcyBDb250cm9sQmFzZSB7XG5cbiAgICAgICAgcng6bnVtYmVyO1xuICAgICAgICByeTpudW1iZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMucnggPSAwO1xuICAgICAgICAgICAgdGhpcy5yeSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmRvTGF5b3V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodF9hdXRvKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGhfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGNsYXNzIFRleHRWaWV3IGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuXG4gICAgICAgIHRleHQ6c3RyaW5nO1xuICAgICAgICB3b3JkV3JhcDpib29sZWFuO1xuICAgICAgICBzcGFuRWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsdGV4dDpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdUZXh0VmlldycpO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LW5hbWUnLHRoaXMubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zcGFuRWxlbSA9ICQoXCI8c3Bhbj48L3NwYW4+XCIpWzBdO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmVtcHR5KCk7XG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMud2lkdGgudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2hlaWdodCcsdGhpcy5oZWlnaHQudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKHRoaXMuc3BhbkVsZW0pO1xuICAgICAgICAgICAgJCh0aGlzLnNwYW5FbGVtKS50ZXh0KHRoaXMudGV4dCk7XG4gICAgICAgICAgICBpZih0aGlzLndvcmRXcmFwKVxuICAgICAgICAgICAgICAgICQodGhpcy5zcGFuRWxlbSkuY3NzKCd3b3JkLWJyZWFrJywnYnJlYWstYWxsJyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgJCh0aGlzLnNwYW5FbGVtKS5jc3MoJ3dvcmQtYnJlYWsnLCdub3JtYWwnKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZG9MYXlvdXQoKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodF9hdXRvKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmZpbmQoJ3NwYW4nKS5oZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGhfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5maW5kKCdzcGFuJykud2lkdGgoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGNsYXNzIEV2ZW50SXRlbSB7XG4gICAgICAgIG5hbWUgOiBzdHJpbmc7XG4gICAgICAgIHByaXZhdGUgYXJnczogYW55O1xuICAgICAgICBwcml2YXRlIGNhbGxiYWNrbGlzdDpMaXN0PChhcmdzOmFueSk9PnZvaWQ+ID0gbmV3IExpc3Q8KGFyZ3M6YW55KT0+dm9pZD4oKTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGFyZ3M6YW55KSB7XG4gICAgICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBFdmVudEJ1cyB7XG4gICAgICAgIGNhbGxiYWNrIDogTGlzdDxFdmVudEl0ZW0+ID0gbmV3IExpc3Q8RXZlbnRJdGVtPigpO1xuXG4gICAgICAgIHB1YihuYW1lOnN0cmluZyAsYXJnczphbnkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suYWRkKG5ldyBFdmVudEl0ZW0obmFtZSwgYXJncykpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViKG5hbWU6c3RyaW5nLCBjYWxsYmFjazooYXJnczphbnkpPT52b2lkKSB7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwiXG5uYW1lc3BhY2UgTGF5b3V0THpnLk9ic2VydmVyTW9kZWwge1xuXG4gICAgY29uc3QgY29uZmlnUHJvcGVydHlOYW1lOnN0cmluZyA9IFwiX19vYnNlcnZhYmxlX19cIjtcblxuXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyB7XG4gICAgICAgIG9iajphbnk7XG4gICAgICAgIHByb3BlcnR5TmFtZSA6IHN0cmluZztcbiAgICAgICAgb2xkVmFsdWUgOiBhbnk7XG4gICAgICAgIG5ld1ZhbHVlIDogYW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajphbnkscHJvcGVydHlOYW1lOiBzdHJpbmcsIG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICB0aGlzLm9sZFZhbHVlID0gb2xkVmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5ld1ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0T2JqZWN0Q29uZmlnKG9iajphbnkpIHtcbiAgICAgICAgaWYoIShjb25maWdQcm9wZXJ0eU5hbWUgaW4gb2JqKSkge1xuICAgICAgICAgICAgb2JqW2NvbmZpZ1Byb3BlcnR5TmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Om51bGwsXG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOm51bGwsXG4gICAgICAgICAgICAgICAgcHJvcHM6e30sXG4gICAgICAgICAgICAgICAgcHJvcENoYW5nZWRDYWxsYmFja0xpc3QgOiBbXSxcbiAgICAgICAgICAgICAgICBub3RpZnlQcm9wZXJ0eUNoYW5nZWQgOiBmdW5jdGlvbihhcmdzOlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncykge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNmZyA9IGdldE9iamVjdENvbmZpZyhhcmdzLm9iaik7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNmZy5wYXJlbnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmVudENmZyA9IGdldE9iamVjdENvbmZpZyhjZmcucGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudENmZy5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZmcucGFyZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNmZy5wcm9wZXJ0eU5hbWUrXCIuXCIrYXJncy5wcm9wZXJ0eU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5vbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLm5ld1ZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYWRkUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2sgOiBmdW5jdGlvbiAoY2FsbGJhY2s6KGFyZ3M6UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKT0+dm9pZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0LnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ialtjb25maWdQcm9wZXJ0eU5hbWVdO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBpbmplY3RQcm9wZXJ0aWVzKG9iajphbnkpIHtcbiAgICAgICAgaWYgKG9iaj09bnVsbCkgcmV0dXJuO1xuICAgICAgICBsZXQgY2ZnID0gZ2V0T2JqZWN0Q29uZmlnKG9iaik7XG4gICAgICAgIGZvciAobGV0IHByb3BlcnR5TmFtZSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmKHByb3BlcnR5TmFtZT09Y29uZmlnUHJvcGVydHlOYW1lKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmKCFvYmouaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkgY29udGludWU7XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gb2JqW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICBpZih0b1N0cmluZy5jYWxsKHByb3BWYWx1ZSk9PSdbb2JqZWN0IEZ1bmN0aW9uXScpe1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfWVsc2UgaWYodG9TdHJpbmcuY2FsbChwcm9wVmFsdWUpPT0nW29iamVjdCBPYmplY3RdJyl7XG4gICAgICAgICAgICAgICAgaW5qZWN0UHJvcGVydGllcyhwcm9wVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaixwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgaWYoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKXtcbiAgICAgICAgICAgICAgICBsZXQgdCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYodG9TdHJpbmcuY2FsbCh0KT09J1tvYmplY3QgRnVuY3Rpb25dJyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRvU3RyaW5nLmNhbGwocHJvcFZhbHVlKT09J1tvYmplY3QgT2JqZWN0XScpe1xuICAgICAgICAgICAgICAgICAgICBpbmplY3RQcm9wZXJ0aWVzKHByb3BWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZENmZyA9IGdldE9iamVjdENvbmZpZyhwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZENmZy5wYXJlbnQgPSBvYmo7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkQ2ZnLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNmZy5wcm9wc1twcm9wZXJ0eU5hbWVdID0gb2JqW3Byb3BlcnR5TmFtZV07XG5cbiAgICAgICAgICAgIChmdW5jdGlvbiAocHJvcGVydHlOYW1lOnN0cmluZykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoscHJvcGVydHlOYW1lLHtcbiAgICAgICAgICAgICAgICAgICAgJ2dldCc6ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5qZWN0UHJvcGVydGllcyh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRPYmplY3RDb25maWcodGhpcykucHJvcHNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ3NldCc6ZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RQcm9wZXJ0aWVzKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gZ2V0T2JqZWN0Q29uZmlnKHRoaXMpLnByb3BzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRPYmplY3RDb25maWcodGhpcykucHJvcHNbcHJvcGVydHlOYW1lXT12YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE9iamVjdENvbmZpZyh0aGlzKS5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KShwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyIGltcGxlbWVudHMgRGlzcG9zYWJsZXtcbiAgICAgICAgb2JqOmFueTtcbiAgICAgICAgcHJvcGVydHlOYW1lOnN0cmluZztcbiAgICAgICAgcHJvdGVjdGVkIGNhbGxiYWNrOiBGdW5jdGlvbjtcblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9iajogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5vYmogPSBvYmo7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKGxpc3RlbmVyOkZ1bmN0aW9uKTp2b2lke1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGxpc3RlbmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBzdGFydExpc3RlbigpOnZvaWQ7XG4gICAgICAgIGFic3RyYWN0IHN0b3BMaXN0ZW4oKTp2b2lkO1xuXG4gICAgICAgIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIge1xuICAgICAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6YW55LCBwcm9wZXJ0eU5hbWU6c3RyaW5nKTpQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcjtcblxuICAgICAgICBhYnN0cmFjdCBjYW5Qcm92aWRlKG9iajphbnksIHByb3BlcnR5TmFtZTpzdHJpbmcpOmJvb2xlYW47XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFNpbXBsZVByb3BlcnR5Q2hhbmdlZExpc3RlbmVyUHJvdmlkZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVye1xuXG4gICAgICAgIHByaXZhdGUgcHJvdmlkZXJzOkxpc3Q8UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcj47XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMgPSBuZXcgTGlzdDxQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXIocHJvdmlkZXI6UHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcik6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5hZGQocHJvdmlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkUHJvdmlkZXJzKHByb3ZpZGVyczpBcnJheTxQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyPik6dm9pZHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3ZpZGVyIG9mIHByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmFkZChwcm92aWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGUob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyLmdldFByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGUob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm92aWRlciBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLmNhblByb3ZpZGUob2JqLCBwcm9wZXJ0eU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxufSIsIlxuXG5uYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBEb21TaXplUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXIgZXh0ZW5kcyBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcntcbiAgICAgICAgcHJpdmF0ZSBkb206IEhUTUxFbGVtZW50O1xuICAgICAgICBwcml2YXRlIGNhbGxiYWNrZnVuOmFueTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG9iaiwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuZG9tID0gPEhUTUxFbGVtZW50Pm9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0TGlzdGVuKCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja2Z1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrLmFwcGx5KHNlbGYuZG9tLFtzZWxmLmRvbS5vZmZzZXRXaWR0aF0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICQodGhpcy5kb20pLnJlc2l6ZSh0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3BMaXN0ZW4oKTogdm9pZCB7XG4gICAgICAgICAgICAkKHRoaXMuZG9tKS5vZmYoXCJyZXNpemVcIix0aGlzLmNhbGxiYWNrZnVuKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIERvbVNpemVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXJQcm92aWRlcntcblxuICAgICAgICBnZXRQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmo6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbVNpemVQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcihvYmoscHJvcGVydHlOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhblByb3ZpZGUob2JqOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZihwcm9wZXJ0eU5hbWU9PVwid2lkdGhcInx8cHJvcGVydHlOYW1lPT1cImhlaWdodFwiKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBUZW1wbGF0ZUNvbnRyb2wgZXh0ZW5kcyBDb250cm9sQmFzZSB7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJvb3RCb3JkZXIgOiBCb3JkZXIgPSBuZXcgQm9yZGVyKFwicm9vdEJvcmRlclwiKTtcbiAgICAgICAgdmlzdWFsVHJlZSA6IFZpc3VhbFRyZWU7XG5cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290Qm9yZGVyLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIuaG9yaXpvbkFsaWdubWVudCA9IEhvcml6b25BbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLmFkZENoaWxkKHRoaXMudmlzdWFsVHJlZS5yb290Q29udGFpbmVyKTtcbiAgICAgICAgICAgIHRoaXMudmlzdWFsVHJlZS5yb290Q29udGFpbmVyLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHRoaXMudmlzdWFsVHJlZS5yb290Q29udGFpbmVyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuXG4gICAgICAgICAgICB0aGlzLnJvb3RCb3JkZXIucGFyZW50U2xvdCA9IHRoaXMucGFyZW50U2xvdDtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5wYXJlbnQgPSB0aGlzLnBhcmVudDtcblxuICAgICAgICAgICAgdGhpcy5yb290Qm9yZGVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5hc3NlbWJsZURvbSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEJvcmRlci5kb0xheW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHRfYXV0bygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEJvcmRlci5lc3RpbWF0ZUhlaWdodCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVXaWR0aF9hdXRvKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290Qm9yZGVyLmVzdGltYXRlV2lkdGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGNsYXNzIFZpc3VhbFRyZWUge1xuICAgICAgICByb290Q29udGFpbmVyOiBDb250YWluZXJDb250cm9sO1xuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb3RDb250YWluZXIpe1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdENvbnRhaW5lci5nZXRSb290RWxlbWVudCgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbml0Q2FsY3VsYWJsZVNsb3RzKCk6dm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb290Q29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290Q29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMucm9vdENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdENvbnRhaW5lci5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMucm9vdENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdENvbnRhaW5lci5kb0xheW91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuXG4gICAgfVxuXG5cbn0iXX0=
