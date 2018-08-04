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
    // Control class is the base class of all the visual components.
    var Control = (function () {
        function Control(name) {
            this.name = name;
            // Init vairables.
            this.horizonAlignment = LayoutLzg.HorizonAlignment.Strech;
            this.verticalAlignment = LayoutLzg.VerticalAlignment.Strech;
            this.margin = new LayoutLzg.Thickness(0, 0, 0, 0);
            this.width = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, 50);
            this.height = new LayoutLzg.Distance(LayoutLzg.DistanceType.fixed, 50);
            this.strokeThickness = new LayoutLzg.Thickness(0, 0, 0, 0);
        }
        // Estimate the width of this control,
        // the size of this control is determined by many factors,
        // for example : auto/fix value of width/height, parent container, horizonal/vertical alignments, margins。
        // For different types of parent containers, the method of size estimation are totally different.
        Control.prototype.estimateWidth = function () {
            return 0;
        };
        // Estimate the width of this control,
        // the size of this control is determined by many factors,
        // for example : auto/fix value of width/height, parent container, horizonal/vertical alignments, margins。
        // For different types of parent containers, the method of size estimation are totally different.
        Control.prototype.estimateHeight = function () {
            return 0;
        };
        // Get the root element of this control.
        Control.prototype.getRootElement = function () {
            return null;
        };
        // Assemble html elements of this control.
        Control.prototype.assembleDom = function () {
        };
        // Adjust styles html elements of this control.
        Control.prototype.doLayout = function () {
        };
        return Control;
    }());
    LayoutLzg.Control = Control;
    // The purpose of the container is to put sub controls together,
    // and the system provides multiple layout containers due to actual requirements.
    var ContainerControl = (function (_super) {
        __extends(ContainerControl, _super);
        function ContainerControl(name) {
            _super.call(this, name);
            this.children = new LayoutLzg.List();
            this.children2 = new Array();
            this.slots = new LayoutLzg.List();
        }
        ContainerControl.prototype.addChild = function (control) {
            this.children.add(control);
            this.children2.push(control);
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
        HorizonalLinearLayout.prototype.estimateHeight = function () {
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
        return HorizonalLinearLayout;
    }(LayoutLzg.ContainerControl));
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
                    return 0;
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
                    return 0;
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
        TextView.prototype.estimateWidth = function () {
            if (this.width.type == LayoutLzg.DistanceType.fixed) {
                return this.width.value;
            }
            var t = $(this.getRootElement()).find('span').width();
            return t;
        };
        TextView.prototype.estimateHeight = function () {
            if (this.height.type == LayoutLzg.DistanceType.fixed) {
                return this.height.value;
            }
            return $(this.getRootElement()).find('span').height();
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
        return TextView;
    }(LayoutLzg.Control));
    LayoutLzg.TextView = TextView;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var ObserverModel;
    (function (ObserverModel) {
        var configPropertyName = "__observable__";
        var PropertyChangedEventArgs = (function () {
            function PropertyChangedEventArgs(propertyName, oldValue, newValue) {
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
                    props: {},
                    propChangedCallbackList: [],
                    notifyPropertyChanged: function (args) {
                        for (var i = 0; i < this.propChangedCallbackList.length; i++) {
                            var callback = this.propChangedCallbackList[i];
                            callback(args);
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
                var descriptor = Object.getOwnPropertyDescriptor(propertyName, 'age');
                if ('value' in descriptor) {
                    var t = descriptor.value;
                    if (toString.call(t) == '[object Function]') {
                        continue;
                    }
                    else if (toString.call(propValue) == '[object Object]') {
                        injectProperties(propValue);
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
                            var oldValue = getObjectConfig(this).props[propertyName];
                            getObjectConfig(this).props[this.propertyName] = value;
                            getObjectConfig(this).notifyPropertyChanged(new PropertyChangedEventArgs(propertyName, oldValue, value));
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
    var TemplateControl = (function (_super) {
        __extends(TemplateControl, _super);
        function TemplateControl(name) {
            _super.call(this, name);
        }
        TemplateControl.prototype.estimateWidth = function () {
            return _super.prototype.estimateWidth.call(this);
        };
        TemplateControl.prototype.estimateHeight = function () {
            return _super.prototype.estimateHeight.call(this);
        };
        TemplateControl.prototype.getRootElement = function () {
            return _super.prototype.getRootElement.call(this);
        };
        TemplateControl.prototype.assembleDom = function () {
            _super.prototype.assembleDom.call(this);
        };
        TemplateControl.prototype.doLayout = function () {
            _super.prototype.doLayout.call(this);
        };
        return TemplateControl;
    }(LayoutLzg.Control));
    LayoutLzg.TemplateControl = TemplateControl;
})(LayoutLzg || (LayoutLzg = {}));
var LayoutLzg;
(function (LayoutLzg) {
    var VisualTree = (function () {
        function VisualTree() {
        }
        return VisualTree;
    }());
    LayoutLzg.VisualTree = VisualTree;
})(LayoutLzg || (LayoutLzg = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dGJhc2UudHMiLCJsYXlvdXRjb3JlLnRzIiwiYnJ1c2hlcy9ncmFkaWVudGNvbG9yYnJ1c2gudHMiLCJicnVzaGVzL2ltYWdlY29sb3JicnVzaC50cyIsImJydXNoZXMvc29saWRjb2xvcmJydXNoLnRzIiwiY29sbGVjdGlvbnMvbGlzdC50cyIsImNvbGxlY3Rpb25zL21hcC50cyIsImNvbnRhaW5lcnMvYm9yZGVyLnRzIiwiY29udGFpbmVycy9ob3Jpem9uYWxsaW5lYXJsYXlvdXQudHMiLCJjb250YWluZXJzL3ZlcnRpY2FsbGluZWFybGF5b3V0LnRzIiwiY29udHJvbHMvY29udHJvbGJhc2UudHMiLCJjb250cm9scy9pbWFnZS50cyIsImNvbnRyb2xzL3JlY3QudHMiLCJjb250cm9scy90ZXh0dmlldy50cyIsIm9ic2VydmVyL29ic2VydmFibGVvYmplY3RpbmplY3Rvci50cyIsInZpc3VhbHRyZWUvdGVtcGxhdGVjb250cm9sLnRzIiwidmlzdWFsdHJlZS92aXN1YWx0cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxTQUFTLENBNkRsQjtBQTdERCxXQUFVLFNBQVMsRUFBQSxDQUFDO0lBQ2hCLFdBQVksZ0JBQWdCO1FBQ3hCLDJEQUFNLENBQUE7UUFDTix1REFBSSxDQUFBO1FBQ0oseURBQUssQ0FBQTtRQUNMLDJEQUFNLENBQUE7SUFDVixDQUFDLEVBTFcsMEJBQWdCLEtBQWhCLDBCQUFnQixRQUszQjtJQUxELElBQVksZ0JBQWdCLEdBQWhCLDBCQUtYLENBQUE7SUFFRCxXQUFZLGlCQUFpQjtRQUN6Qiw2REFBTSxDQUFBO1FBQ04sdURBQUcsQ0FBQTtRQUNILDZEQUFNLENBQUE7UUFDTiw2REFBTSxDQUFBO0lBQ1YsQ0FBQyxFQUxXLDJCQUFpQixLQUFqQiwyQkFBaUIsUUFLNUI7SUFMRCxJQUFZLGlCQUFpQixHQUFqQiwyQkFLWCxDQUFBO0lBRUQsV0FBWSxZQUFZO1FBQ3BCLCtDQUFJLENBQUE7UUFD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RCxJQUFVLFNBQVMsQ0FrQ2xCO0FBbENELFdBQVUsU0FBUyxFQUFDLENBQUM7SUFFakI7UUFBcUMsbUNBQU87UUFFeEMseUJBQVksSUFBWTtZQUNwQixrQkFBTSxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDO1FBS0QsdUNBQWEsR0FBYjtZQUNJLE1BQU0sQ0FBQyxnQkFBSyxDQUFDLGFBQWEsV0FBRSxDQUFDO1FBQ2pDLENBQUM7UUFFRCx3Q0FBYyxHQUFkO1lBQ0ksTUFBTSxDQUFDLGdCQUFLLENBQUMsY0FBYyxXQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVELHdDQUFjLEdBQWQ7WUFDSSxNQUFNLENBQUMsZ0JBQUssQ0FBQyxjQUFjLFdBQUUsQ0FBQztRQUNsQyxDQUFDO1FBRUQscUNBQVcsR0FBWDtZQUNJLGdCQUFLLENBQUMsV0FBVyxXQUFFLENBQUM7UUFDeEIsQ0FBQztRQUVELGtDQUFRLEdBQVI7WUFDSSxnQkFBSyxDQUFDLFFBQVEsV0FBRSxDQUFDO1FBQ3JCLENBQUM7UUFDTCxzQkFBQztJQUFELENBNUJBLEFBNEJDLENBNUJvQyxpQkFBTyxHQTRCM0M7SUE1QlkseUJBQWUsa0JBNEIzQixDQUFBO0FBSUwsQ0FBQyxFQWxDUyxTQUFTLEtBQVQsU0FBUyxRQWtDbEI7QUNsQ0QsSUFBVSxTQUFTLENBT2xCO0FBUEQsV0FBVSxTQUFTLEVBQUEsQ0FBQztJQUVoQjtRQUFBO1FBRUEsQ0FBQztRQUFELGlCQUFDO0lBQUQsQ0FGQSxBQUVDLElBQUE7SUFGWSxvQkFBVSxhQUV0QixDQUFBO0FBR0wsQ0FBQyxFQVBTLFNBQVMsS0FBVCxTQUFTLFFBT2xCIiwiZmlsZSI6Im91dHB1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGVudW0gSG9yaXpvbkFsaWdubWVudCB7XG4gICAgICAgIFN0cmVjaCxcbiAgICAgICAgTGVmdCxcbiAgICAgICAgUmlnaHQsXG4gICAgICAgIENlbnRlclxuICAgIH1cblxuICAgIGV4cG9ydCBlbnVtIFZlcnRpY2FsQWxpZ25tZW50e1xuICAgICAgICBTdHJlY2gsXG4gICAgICAgIFRvcCxcbiAgICAgICAgQm90dG9tLFxuICAgICAgICBDZW50ZXJcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBEaXN0YW5jZVR5cGV7XG4gICAgICAgIGF1dG8sXG4gICAgICAgIGZpeGVkLFxuICAgICAgICB3ZWlnaHRcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBTdGFja1BhbmVsT3JpZW50YXRpb24ge1xuICAgICAgICBIb3Jpem9uYWwsXG4gICAgICAgIFZlcnRpY2FsXG4gICAgfVxuXG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEJydXNoe1xuICAgICAgICBhcHBseVRvQmFja2dyb3VuZChlbGVtOkhUTUxFbGVtZW50KTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOlRoaWNrbmVzcyk6dm9pZDtcbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTpIVE1MRWxlbWVudCx0aGlja25lc3M6bnVtYmVyKTp2b2lkO1xuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06SFRNTEVsZW1lbnQsdGhpY2tuZXNzOm51bWJlcik6dm9pZDtcbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOkhUTUxFbGVtZW50LHRoaWNrbmVzczpudW1iZXIpOnZvaWQ7XG4gICAgfVxuXG5cbiAgICBleHBvcnQgY2xhc3MgVGhpY2tuZXNze1xuICAgICAgICBsZWZ0Om51bWJlcjtcbiAgICAgICAgcmlnaHQ6bnVtYmVyO1xuICAgICAgICB0b3A6bnVtYmVyO1xuICAgICAgICBib3R0b206bnVtYmVyO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIGJvdHRvbTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgICAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgICAgICAgICAgdGhpcy50b3AgPSB0b3A7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEaXN0YW5jZXtcbiAgICAgICAgdmFsdWU6bnVtYmVyO1xuICAgICAgICB0eXBlOkRpc3RhbmNlVHlwZTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBEaXN0YW5jZVR5cGUsIHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuIiwiXG5uYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGNsYXNzIFNsb3Qge1xuICAgICAgICBjaGlsZHJlbjpMaXN0PENvbnRyb2w+ID0gbmV3IExpc3Q8Q29udHJvbD4oKTtcbiAgICAgICAgaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgOiBib29sZWFuO1xuICAgICAgICBpc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgOiBib29sZWFuO1xuICAgICAgICBjYWx1bGF0ZWRTbG90V2lkdGggOiBudW1iZXI7XG4gICAgICAgIGNhbHVsYXRlZFNsb3RIZWlnaHQgOiBudW1iZXI7XG4gICAgICAgIGNvbnRhaW5lciA6IENvbnRhaW5lckNvbnRyb2w7XG5cbiAgICAgICAgYWRkQ2hpbGQoY2hpbGQgOiBDb250cm9sKTp2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uYWRkKGNoaWxkKTtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QgPSB0aGlzO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNoaWxkKGNoaWxkIDogQ29udHJvbCk6dm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnJlbW92ZShjaGlsZCk7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGVtcHR5KCk6dm9pZCB7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBDb250cm9sIGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIG9mIGFsbCB0aGUgdmlzdWFsIGNvbXBvbmVudHMuXG4gICAgZXhwb3J0IGNsYXNzIENvbnRyb2x7XG4gICAgICAgIC8vIE5hbWUgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICBuYW1lOnN0cmluZztcbiAgICAgICAgLy8gV2lkdGggb2YgdGhpcyBDb250cm9sLCBpdCBjYW4gYmUgYSBmaXggdmFsdWUgb3IgYXV0by5cbiAgICAgICAgd2lkdGg6RGlzdGFuY2U7XG4gICAgICAgIC8vIEhlaWdodCBvZiB0aGlzIENvbnRyb2wsIGl0IGNhbiBiZSBhIGZpeCB2YWx1ZSBvciBhdXRvLlxuICAgICAgICBoZWlnaHQ6RGlzdGFuY2U7XG4gICAgICAgIC8vIEhvcml6b25hbCBhbGlnbm1lbnQgb2YgdGhpcyBjb250cm9sIGluIGl0J3MgcGFyZW50IGNvbnRhaW5lclxuICAgICAgICBob3Jpem9uQWxpZ25tZW50IDogSG9yaXpvbkFsaWdubWVudDtcbiAgICAgICAgLy8gVmVydGljYWwgYWxpZ25tZW50IG9mIHRoaXMgY29udHJvbCBpbiBpdCdzIHBhcmVudCBjb250YWluZXJcbiAgICAgICAgdmVydGljYWxBbGlnbm1lbnQgOiBWZXJ0aWNhbEFsaWdubWVudDtcbiAgICAgICAgLy8gTWFyZ2luIG9mIHRoaXMgY29udHJvbCB0byBpdCdzIHBhcmVudCwgdGhlIHZhbHVlIGluIHRoaWNrbmVzcyBtdXN0IGJlIGEgZml4IHZhbHVlLlxuICAgICAgICBtYXJnaW46VGhpY2tuZXNzO1xuXG4gICAgICAgIC8vIEJhY2tncm91bmQgb2YgdGhpcyBjb250cm9sLCBpdCBjYW4gYmUgYSBzb2xpZCBjb2xvciwgb3IgYSBncmFkaWVudCBjb2xvciAsIG9yIGEgcGljdHVyZS5cbiAgICAgICAgZmlsbDpCcnVzaDtcbiAgICAgICAgLy8gQm9yZGVyIG9mIHRoaXMgY29udHJvbCwgaXQgY2FuIGJlIGEgc29saWQgY29sb3IsIG9yIGEgZ3JhZGllbnQgY29sb3IgLCBvciBhIHBpY3R1cmUuXG4gICAgICAgIHN0cm9rZTpCcnVzaDtcbiAgICAgICAgLy8gVGhpY2tuZXNzIG9mIHRoaXMgY29udHJvbCdzIGJvcmRlciwgdGhlIHZhbHVlIGluIHRoaWNrbmVzcyBtdXN0IGJlIGEgZml4IHZhbHVlLlxuICAgICAgICBzdHJva2VUaGlja25lc3M6VGhpY2tuZXNzO1xuXG4gICAgICAgIC8vIC8vIEludGVybmFsIHZhaXJhYmxlLiBJbmRpY2F0ZSB0aGUgY29udGFpbmVyJ3Mgd2lkdGggb2YgdGhpcyBjb250cm9sIGlzIGNhbGN1bGF0YWJsZS5cbiAgICAgICAgLy8gaXNQYXJlbnRTbG90V2lkdGhDYWxjdWxhdGFibGUgOiBib29sZWFuO1xuICAgICAgICAvLyAvLyBJbnRlcm5hbCB2YWlyYWJsZS4gSW5kaWNhdGUgdGhlIGNvbnRhaW5lcidzIGhlaWdodCBvZiB0aGlzIGNvbnRyb2wgaXMgY2FsY3VsYXRhYmxlLlxuICAgICAgICAvLyBpc1BhcmVudFNsb3RIZWlnaHRDYWxjdWxhdGFibGUgOiBib29sZWFuO1xuICAgICAgICAvLyAvLyBJbnRlcm5hbCB2YWlyYWJsZS4gUGFyZW50IHNsb3Qgd2lkdGguXG4gICAgICAgIC8vIC8vIFNsb3QgbWVhbnMgdGhlIHNwYWNlIHdoZXJlIHRoZSBjb250cm9sIGlzIHBsYWNlZCxcbiAgICAgICAgLy8gLy8gaXQgbWF5IGJlIHRoZSB3aG9sZSBvZiBpdCdzIGNvbnRhaW5lciBvciBhIHBhcnQgb2YgaXQncyBjb250YWluZXIuXG4gICAgICAgIC8vIHBhcmVudFNsb3RXaWR0aDpudW1iZXI7XG4gICAgICAgIC8vIC8vIEludGVybmFsIHZhaXJhYmxlLiBQYXJlbnQgc2xvdCBoZWlnaHQuXG4gICAgICAgIC8vIHBhcmVudFNsb3RIZWlnaHQ6bnVtYmVyO1xuXG5cbiAgICAgICAgcGFyZW50U2xvdDpTbG90O1xuICAgICAgICBwYXJlbnQ6Q29udGFpbmVyQ29udHJvbDtcbiAgICAgICAgLy8gcm9vdCBkaXYgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICByb290RWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgLy8gSW5pdCB2YWlyYWJsZXMuXG4gICAgICAgICAgICB0aGlzLmhvcml6b25BbGlnbm1lbnQgPSBIb3Jpem9uQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgIHRoaXMudmVydGljYWxBbGlnbm1lbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgICAgICB0aGlzLm1hcmdpbiA9IG5ldyBUaGlja25lc3MoMCwwLDAsMCk7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCw1MCk7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsNTApO1xuICAgICAgICAgICAgdGhpcy5zdHJva2VUaGlja25lc3MgPSBuZXcgVGhpY2tuZXNzKDAsMCwwLDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXN0aW1hdGUgdGhlIHdpZHRoIG9mIHRoaXMgY29udHJvbCxcbiAgICAgICAgLy8gdGhlIHNpemUgb2YgdGhpcyBjb250cm9sIGlzIGRldGVybWluZWQgYnkgbWFueSBmYWN0b3JzLFxuICAgICAgICAvLyBmb3IgZXhhbXBsZSA6IGF1dG8vZml4IHZhbHVlIG9mIHdpZHRoL2hlaWdodCwgcGFyZW50IGNvbnRhaW5lciwgaG9yaXpvbmFsL3ZlcnRpY2FsIGFsaWdubWVudHMsIG1hcmdpbnPjgIJcbiAgICAgICAgLy8gRm9yIGRpZmZlcmVudCB0eXBlcyBvZiBwYXJlbnQgY29udGFpbmVycywgdGhlIG1ldGhvZCBvZiBzaXplIGVzdGltYXRpb24gYXJlIHRvdGFsbHkgZGlmZmVyZW50LlxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6bnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXN0aW1hdGUgdGhlIHdpZHRoIG9mIHRoaXMgY29udHJvbCxcbiAgICAgICAgLy8gdGhlIHNpemUgb2YgdGhpcyBjb250cm9sIGlzIGRldGVybWluZWQgYnkgbWFueSBmYWN0b3JzLFxuICAgICAgICAvLyBmb3IgZXhhbXBsZSA6IGF1dG8vZml4IHZhbHVlIG9mIHdpZHRoL2hlaWdodCwgcGFyZW50IGNvbnRhaW5lciwgaG9yaXpvbmFsL3ZlcnRpY2FsIGFsaWdubWVudHMsIG1hcmdpbnPjgIJcbiAgICAgICAgLy8gRm9yIGRpZmZlcmVudCB0eXBlcyBvZiBwYXJlbnQgY29udGFpbmVycywgdGhlIG1ldGhvZCBvZiBzaXplIGVzdGltYXRpb24gYXJlIHRvdGFsbHkgZGlmZmVyZW50LlxuICAgICAgICBlc3RpbWF0ZUhlaWdodCgpOm51bWJlcntcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IHRoZSByb290IGVsZW1lbnQgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICBnZXRSb290RWxlbWVudCgpOkhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXNzZW1ibGUgaHRtbCBlbGVtZW50cyBvZiB0aGlzIGNvbnRyb2wuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6dm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGp1c3Qgc3R5bGVzIGh0bWwgZWxlbWVudHMgb2YgdGhpcyBjb250cm9sLlxuICAgICAgICBkb0xheW91dCgpOnZvaWR7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gVGhlIHB1cnBvc2Ugb2YgdGhlIGNvbnRhaW5lciBpcyB0byBwdXQgc3ViIGNvbnRyb2xzIHRvZ2V0aGVyLFxuICAgIC8vIGFuZCB0aGUgc3lzdGVtIHByb3ZpZGVzIG11bHRpcGxlIGxheW91dCBjb250YWluZXJzIGR1ZSB0byBhY3R1YWwgcmVxdWlyZW1lbnRzLlxuICAgIGV4cG9ydCBjbGFzcyBDb250YWluZXJDb250cm9sIGV4dGVuZHMgQ29udHJvbHtcbiAgICAgICAgcHJvdGVjdGVkIGNoaWxkcmVuOkxpc3Q8Q29udHJvbD47XG4gICAgICAgIHByb3RlY3RlZCBjaGlsZHJlbjI6QXJyYXk8Q29udHJvbD47XG4gICAgICAgIHByb3RlY3RlZCBzbG90cyA6IExpc3Q8U2xvdD47XG5cblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gbmV3IExpc3Q8Q29udHJvbD4oKTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4yID0gbmV3IEFycmF5PENvbnRyb2w+KCk7XG4gICAgICAgICAgICB0aGlzLnNsb3RzID0gbmV3IExpc3Q8U2xvdD4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENoaWxkKGNvbnRyb2w6Q29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5hZGQoY29udHJvbCk7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuMi5wdXNoKGNvbnRyb2wpO1xuICAgICAgICAgICAgY29udHJvbC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGQoY29udHJvbDpDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnJlbW92ZShjb250cm9sKTtcbiAgICAgICAgICAgIGNvbnRyb2wucGFyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyQ2hpbGQoKTp2b2lke1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudFNsb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdENhbGN1bGFibGVTbG90cygpOnZvaWQge1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGV4cG9ydCBjbGFzcyBDb250ZW50UHJlc2VudGVyIHtcblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBJdGVtc1ByZXNlbnRlciB7XG5cbiAgICB9XG59XG5cblxuIiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBHcmFkaWVudENvbG9yQnJ1c2ggaW1wbGVtZW50cyBCcnVzaHtcbiAgICAgICAgY29sb3I6c3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb2xvcjpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JhY2tncm91bmQoZWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXIoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogTGF5b3V0THpnLlRoaWNrbmVzcyk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgY2xhc3MgSW1hZ2VDb2xvckJydXNoIGltcGxlbWVudHMgQnJ1c2h7XG4gICAgICAgIGNvbG9yOnN0cmluZztcbiAgICAgICAgY29uc3RydWN0b3IoY29sb3I6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9CYWNrZ3JvdW5kKGVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXIoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogTGF5b3V0THpnLlRoaWNrbmVzcyk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckxlZnQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyUmlnaHQoZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyVG9wKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlckJvdHRvbShlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBleHBvcnQgY2xhc3MgU29saWRDb2xvckJydXNoIGltcGxlbWVudHMgQnJ1c2h7XG4gICAgICAgIGNvbG9yOnN0cmluZztcbiAgICAgICAgY29uc3RydWN0b3IoY29sb3I6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9CYWNrZ3JvdW5kKGVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvQm9yZGVyKGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IExheW91dEx6Zy5UaGlja25lc3MpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJMZWZ0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclJpZ2h0KGVsZW06IEhUTUxFbGVtZW50LCB0aGlja25lc3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb0JvcmRlclRvcChlbGVtOiBIVE1MRWxlbWVudCwgdGhpY2tuZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG9Cb3JkZXJCb3R0b20oZWxlbTogSFRNTEVsZW1lbnQsIHRoaWNrbmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHRlc3RMaXN0KCk6dm9pZHtcblxuICAgICAgICBsZXQgbGl0ZXJhbDEgPSBuZXcgTGF5b3V0THpnLlRleHRWaWV3KCdhJywnMTExMTEnKTtcbiAgICAgICAgbGV0IGxpdGVyYWwyID0gbmV3IExheW91dEx6Zy5UZXh0VmlldygnYScsJzIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyJyk7XG4gICAgICAgIGxldCBsaXRlcmFsMyA9IG5ldyBMYXlvdXRMemcuVGV4dFZpZXcoJ2EnLCczMzMzMzMzMzMzJyk7XG5cblxuICAgICAgICBsZXQgbHN0ID0gbmV3IExpc3Q8VGV4dFZpZXc+KCk7XG4gICAgICAgIGxzdC5hZGQobGl0ZXJhbDEpO1xuICAgICAgICBsc3QuYWRkKGxpdGVyYWwyKTtcbiAgICAgICAgbHN0LmFkZChsaXRlcmFsMyk7XG4gICAgICAgIGxzdC5jbGVhcigpO1xuICAgIH1cblxuXG4gICAgZXhwb3J0IGNsYXNzIExpc3Q8VD4gZXh0ZW5kcyBBcnJheTxUPntcblxuICAgICAgICBhZGQoaXRlbTpUKSA6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEFsbChpdGVtczpBcnJheTxUPikgOiB2b2lkIHtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8aXRlbXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZShpdGVtOlQpOnZvaWQge1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VyaXRlbSA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgaWYoY3VyaXRlbT09aXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUFsbChpdGVtczpBcnJheTxUPikgOnZvaWQge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8aXRlbXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhcigpIDp2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLnNwbGljZSgwLHRoaXMubGVuZ3RoKTtcbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHRlc3RtYXAoKTp2b2lke1xuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcDxzdHJpbmcsbnVtYmVyPigpO1xuICAgICAgICBtYXAucHV0KCdhJywzMyk7XG4gICAgICAgIG1hcC5wdXQoJ2InLDQzKTtcbiAgICAgICAgbGV0IGIgPSBtYXAuZ2V0KCdiJyk7XG4gICAgICAgIGxldCBhID0gbWFwLmdldCgnYScpO1xuICAgICAgICBtYXAuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBjbGFzcyBNYXBJdGVtPFRLZXksVFZhbHVlPiB7XG4gICAgICAgIGtleSA6IFRLZXk7XG4gICAgICAgIHZhbHVlIDogVFZhbHVlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGtleTogVEtleSwgdmFsdWU6IFRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgTWFwPFRLZXksVFZhbHVlPiBleHRlbmRzIEFycmF5PE1hcEl0ZW08VEtleSxUVmFsdWU+PntcblxuICAgICAgICBwdXQoa2V5OlRLZXksIHZhbHVlOlRWYWx1ZSkgOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChuZXcgTWFwSXRlbShrZXksdmFsdWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldChrZXk6VEtleSkgOiBUVmFsdWUgfCBhbnkge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0ua2V5PT1rZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyKCkgOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoMCx0aGlzLmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluc0tleShrZXk6VEtleSk6Ym9vbGVhbiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5rZXk9PWtleSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcbiAgICBleHBvcnQgY2xhc3MgQm9yZGVyIGV4dGVuZHMgQ29udGFpbmVyQ29udHJvbCB7XG5cbiAgICAgICAgd3JhcHBlckRvbXMgOiBBcnJheTxIVE1MRWxlbWVudD47XG4gICAgICAgIHByaXZhdGUgbWFpblNsb3QgOiBTbG90O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMubWFpblNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgdGhpcy5tYWluU2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgaWYodGhpcy5yb290RWxlbT09bnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdEVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG4gICAgICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtdHlwZScsJ0JvcmRlcicpO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LW5hbWUnLHRoaXMubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgYWRkQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICAgICAgdGhpcy5tYWluU2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRDYWxjdWxhYmxlU2xvdHMoKTp2b2lkIHtcblxuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgJiYgdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJEb21zID0gW107XG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuZW1wdHkoKTtcblxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgY2hpbGQuYXNzZW1ibGVEb20oKTtcblxuICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyRGl2ID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQod3JhcHBlckRpdikuYXR0cignbGF5b3V0LXRhZycsJ3dyYXBwZXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZXJEb21zLnB1c2god3JhcHBlckRpdik7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmFwcGVuZCh3cmFwcGVyRGl2KTtcbiAgICAgICAgICAgICAgICAkKHdyYXBwZXJEaXYpLmFwcGVuZChjaGlsZC5nZXRSb290RWxlbWVudCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMuZXN0aW1hdGVXaWR0aCgpKydweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmVzdGltYXRlSGVpZ2h0KCkrJ3B4Jyk7XG5cbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyRGl2ID0gdGhpcy53cmFwcGVyRG9tc1tpXTtcbiAgICAgICAgICAgICAgICBjaGlsZC5kb0xheW91dCgpO1xuXG4gICAgICAgICAgICAgICAgJCh3cmFwcGVyRGl2KS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICAkKHdyYXBwZXJEaXYpLmNzcygnbGVmdCcsY2hpbGQubWFyZ2luLmxlZnQrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgJCh3cmFwcGVyRGl2KS5jc3MoJ3JpZ2h0JyxjaGlsZC5tYXJnaW4ucmlnaHQrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgJCh3cmFwcGVyRGl2KS5jc3MoJ3RvcCcsY2hpbGQubWFyZ2luLnRvcCsncHgnKTtcbiAgICAgICAgICAgICAgICAkKHdyYXBwZXJEaXYpLmNzcygnYm90dG9tJyxjaGlsZC5tYXJnaW4uYm90dG9tKydweCcpO1xuXG4gICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICBpZihjaGlsZC5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2hpbGQuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5DZW50ZXIpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdyA9IGNoaWxkLmVzdGltYXRlV2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHd3ID0gdGhpcy5lc3RpbWF0ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gKHd3LXcpLzI7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdsZWZ0Jyx4KydweCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGNoaWxkLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3ApIHtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcsJzBweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZC5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2JvdHRvbScsJzBweCcpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkLmdldFJvb3RFbGVtZW50KCkpLmNzcygndG9wJywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdib3R0b20nLCcwcHgnKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaGlsZC52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGggPSBjaGlsZC5lc3RpbWF0ZUhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGggPSB0aGlzLmVzdGltYXRlSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gKGhoLWgpLzI7XG4gICAgICAgICAgICAgICAgICAgICQoY2hpbGQuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd0b3AnLHkrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5SaWdodClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5lc3RpbWF0ZVdpZHRoKCkrdC5tYXJnaW4ubGVmdCt0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRobGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVXaWR0aCgpICsgdC5tYXJnaW4ubGVmdCArIHQubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRobGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlc3RpbWF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlRvcFxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQ9PnQuZXN0aW1hdGVIZWlnaHQoKSt0Lm1hcmdpbi50b3ArdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0bGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZUhlaWdodCgpICsgdC5tYXJnaW4udG9wICsgdC5tYXJnaW4uYm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuXG4gICAgY2xhc3MgU2xvdEl0ZW0ge1xuICAgICAgICBzbG90Qm9yZGVyOkJvcmRlcjtcbiAgICAgICAgc2xvdERlZmluYXRpb246RGlzdGFuY2U7XG5cbiAgICAgICAgY29uc3RydWN0b3Ioc2xvdEJvcmRlcjogQm9yZGVyLCBzbG90RGVmaW5hdGlvbjogRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2xvdEJvcmRlciA9IHNsb3RCb3JkZXI7XG4gICAgICAgICAgICB0aGlzLnNsb3REZWZpbmF0aW9uID0gc2xvdERlZmluYXRpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgSG9yaXpvbmFsTGluZWFyTGF5b3V0IGV4dGVuZHMgQ29udGFpbmVyQ29udHJvbCB7XG5cbiAgICAgICAgc2xvdE1hcCA6IE1hcDxTbG90LFNsb3RJdGVtPjtcbiAgICAgICAgYm9yZGVyRWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RNYXAgPSBuZXcgTWFwPFNsb3QsIFNsb3RJdGVtPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2VsbChkaXN0YW5jZTpEaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IHNsb3QgPSBuZXcgU2xvdCgpO1xuICAgICAgICAgICAgc2xvdC5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zbG90cy5hZGQoc2xvdCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zbG90TWFwLmNvbnRhaW5zS2V5KHNsb3QpKVxuICAgICAgICAgICAgICAgIHRoaXMuc2xvdE1hcC5wdXQoc2xvdCxuZXcgU2xvdEl0ZW0obnVsbCxudWxsKSk7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICBpdGVtLnNsb3REZWZpbmF0aW9uID0gZGlzdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDaGlsZChjb250cm9sOiBMYXlvdXRMemcuQ29udHJvbCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIucmVtb3ZlQ2hpbGQoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhckNoaWxkKCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuY2xlYXJDaGlsZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0Q2VsbChjb250cm9sOkNvbnRyb2wsIGNlbGxJbmRleDpudW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjb250cm9sKTtcbiAgICAgICAgICAgIGlmKGlkeD4tMSl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2NlbGxJbmRleF07XG4gICAgICAgICAgICAgICAgc2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdIb3Jpem9uYWxMaW5lYXJMYXlvdXQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC1uYW1lJyx0aGlzLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cblxuICAgICAgICBpbml0Q2FsY3VsYWJsZVNsb3RzKCk6dm9pZCB7XG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMud2lkdGgudmFsdWUqY2VsbERlZmluYXRpb24udmFsdWUvd2VpZ2h0U3VtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlICYmIHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgJiYgdGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZW1ibGVEb20oKTogdm9pZCB7XG5cbiAgICAgICAgICAgIC8vIGluaXQgdmFyaWFibGVzIGFuZCBodG1sZWxlbWVudHNcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuICAgICAgICAgICAgaWYodGhpcy5ib3JkZXJFbGVtPT1udWxsKSB0aGlzLmJvcmRlckVsZW0gPSAkKFwiPGRpdj48L2Rpdj5cIilbMF07XG5cbiAgICAgICAgICAgIC8vIGFkZCBjZWxsIHdyYXBwZXIgZGl2cyB0byByb290RWxlbVxuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBuZXcgQm9yZGVyKCcnKTtcbiAgICAgICAgICAgICAgICBib3JkZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5hcHBlbmQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpO1xuXG4gICAgICAgICAgICAgICAgaXRlbS5zbG90Qm9yZGVyID0gYm9yZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgY2hpbGRyZW4gcm9vdEVsZW1zIHRvIGNlbGwgd3JhcHBlcnNcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gaXRlbS5zbG90Qm9yZGVyO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hc3NlbWJsZURvbSgpO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXIuYWRkQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpdGVtLnNsb3RCb3JkZXIgPSBib3JkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHdlaWdodFN1bSBhbmQgZml4U3VtXG4gICAgICAgICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSBmaXhTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gc2V0IHJvb3RFbGVtIHN0eWxlc1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMuZXN0aW1hdGVXaWR0aCgpKydweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmVzdGltYXRlSGVpZ2h0KCkrJ3B4Jyk7XG5cbiAgICAgICAgICAgIC8vIHNldCBib3JkZXIgYW5kIGJhY2tncm91bmQgc3R5bGVzXG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygndG9wJywnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCdib3R0b20nLCcwcHgnKTtcbiAgICAgICAgICAgIGlmKHRoaXMuc3Ryb2tlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cm9rZS5hcHBseVRvQm9yZGVyKHRoaXMuYm9yZGVyRWxlbSx0aGlzLnN0cm9rZVRoaWNrbmVzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmZpbGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsbC5hcHBseVRvQmFja2dyb3VuZCh0aGlzLmJvcmRlckVsZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSBpdGVtLnNsb3RCb3JkZXI7XG5cbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICAkKGJvcmRlci5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3RvcCcsJzBweCcpO1xuICAgICAgICAgICAgICAgICQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpLmNzcygnYm90dG9tJywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGx3ID0gMDtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbHc9Y2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIGNlbGx3ID0gKHRoaXMuZXN0aW1hdGVXaWR0aCgpIC0gZml4U3VtKSogY2VsbERlZmluYXRpb24udmFsdWUgLyB3ZWlnaHRTdW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoYm9yZGVyLmdldFJvb3RFbGVtZW50KCkpLmNzcygnbGVmdCcscG9zKydweCcpO1xuICAgICAgICAgICAgICAgIGJvcmRlci53aWR0aCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsY2VsbHcpO1xuICAgICAgICAgICAgICAgIGJvcmRlci5oZWlnaHQgPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnZlcnRpY2FsQWxpZ25tZW50ID0gVmVydGljYWxBbGlnbm1lbnQuU3RyZWNoO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90ID0gc2xvdDtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLmVzdGltYXRlSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IGNlbGx3O1xuXG4gICAgICAgICAgICAgICAgcG9zKz1jZWxsdztcbiAgICAgICAgICAgICAgICBib3JkZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0XG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGg+MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlV2lkdGgoKSt0Lm1hcmdpbi5sZWZ0K3QubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZVdpZHRoKCkgKyB0Lm1hcmdpbi5sZWZ0ICsgdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGg+MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5lc3RpbWF0ZUhlaWdodCgpK3QubWFyZ2luLnRvcCt0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlSGVpZ2h0KCkgKyB0Lm1hcmdpbi50b3AgKyB0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG5cbiAgICBjbGFzcyBTbG90SXRlbSB7XG4gICAgICAgIHNsb3RCb3JkZXI6Qm9yZGVyO1xuICAgICAgICBzbG90RGVmaW5hdGlvbjpEaXN0YW5jZTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihzbG90Qm9yZGVyOiBCb3JkZXIsIHNsb3REZWZpbmF0aW9uOiBEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5zbG90Qm9yZGVyID0gc2xvdEJvcmRlcjtcbiAgICAgICAgICAgIHRoaXMuc2xvdERlZmluYXRpb24gPSBzbG90RGVmaW5hdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBWZXJ0aWNhbExpbmVhckxheW91dCBleHRlbmRzIENvbnRhaW5lckNvbnRyb2wge1xuXG4gICAgICAgIHNsb3RNYXAgOiBNYXA8U2xvdCxTbG90SXRlbT47XG4gICAgICAgIGJvcmRlckVsZW06SFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zbG90TWFwID0gbmV3IE1hcDxTbG90LCBTbG90SXRlbT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENlbGwoZGlzdGFuY2U6RGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBzbG90ID0gbmV3IFNsb3QoKTtcbiAgICAgICAgICAgIHNsb3QuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc2xvdHMuYWRkKHNsb3QpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2xvdE1hcC5jb250YWluc0tleShzbG90KSlcbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RNYXAucHV0KHNsb3QsbmV3IFNsb3RJdGVtKG51bGwsbnVsbCkpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNsb3RNYXAuZ2V0KHNsb3QpO1xuICAgICAgICAgICAgaXRlbS5zbG90RGVmaW5hdGlvbiA9IGRpc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmFkZENoaWxkKGNvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLnJlbW92ZUNoaWxkKGNvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJDaGlsZCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmNsZWFyQ2hpbGQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldENlbGwoY29udHJvbDpDb250cm9sLCBjZWxsSW5kZXg6bnVtYmVyKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY29udHJvbCk7XG4gICAgICAgICAgICBpZihpZHg+LTEpe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tjZWxsSW5kZXhdO1xuICAgICAgICAgICAgICAgIHNsb3QuYWRkQ2hpbGQoY29udHJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290RWxlbSA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC10eXBlJywnSG9yaXpvbmFsTGluZWFyTGF5b3V0Jyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtbmFtZScsdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RFbGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdENhbGN1bGFibGVTbG90cygpOnZvaWQge1xuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcbiAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KSB3ZWlnaHRTdW0gKz0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8c2xvdC5jaGlsZHJlbi5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0ID0gY2VsbERlZmluYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlKmNlbGxEZWZpbmF0aW9uLnZhbHVlL3dlaWdodFN1bTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgJiYgdGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IGl0ZW0uc2xvdERlZmluYXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUud2VpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBzbG90LmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zbG90cy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IHRoaXMuc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDtqPHNsb3QuY2hpbGRyZW4ubGVuZ3RoO2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHNsb3QuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSAmJiB0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgQ29udGFpbmVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuXG4gICAgICAgICAgICAvLyBpbml0IHZhcmlhYmxlcyBhbmQgaHRtbGVsZW1lbnRzXG4gICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuZW1wdHkoKTtcbiAgICAgICAgICAgIGlmKHRoaXMuYm9yZGVyRWxlbT09bnVsbCkgdGhpcy5ib3JkZXJFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuXG4gICAgICAgICAgICAvLyBhZGQgY2VsbCB3cmFwcGVyIGRpdnMgdG8gcm9vdEVsZW1cbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gbmV3IEJvcmRlcignJyk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuYXBwZW5kKGJvcmRlci5nZXRSb290RWxlbWVudCgpKTtcblxuICAgICAgICAgICAgICAgIGl0ZW0uc2xvdEJvcmRlciA9IGJvcmRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIGNoaWxkcmVuIHJvb3RFbGVtcyB0byBjZWxsIHdyYXBwZXJzXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IGl0ZW0uc2xvdEJvcmRlcjtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7ajxzbG90LmNoaWxkcmVuLmxlbmd0aDtqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gc2xvdC5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLmFkZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbS5zbG90Qm9yZGVyID0gYm9yZGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB3ZWlnaHRTdW0gYW5kIGZpeFN1bVxuICAgICAgICAgICAgbGV0IHdlaWdodFN1bSA9IDA7XG4gICAgICAgICAgICBsZXQgZml4U3VtID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuc2xvdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zbG90TWFwLmdldChzbG90KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSBpdGVtLnNsb3REZWZpbmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCkgd2VpZ2h0U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkgZml4U3VtICs9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vIHNldCByb290RWxlbSBzdHlsZXNcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3dpZHRoJyx0aGlzLmVzdGltYXRlV2lkdGgoKSsncHgnKTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2hlaWdodCcsdGhpcy5lc3RpbWF0ZUhlaWdodCgpKydweCcpO1xuXG4gICAgICAgICAgICAvLyBzZXQgYm9yZGVyIGFuZCBiYWNrZ3JvdW5kIHN0eWxlc1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnbGVmdCcsJzBweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygncmlnaHQnLCcwcHgnKTtcbiAgICAgICAgICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3RvcCcsJzBweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmJvcmRlckVsZW0pLmNzcygnYm90dG9tJywnMHB4Jyk7XG4gICAgICAgICAgICBpZih0aGlzLnN0cm9rZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJva2UuYXBwbHlUb0JvcmRlcih0aGlzLmJvcmRlckVsZW0sdGhpcy5zdHJva2VUaGlja25lc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5maWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGwuYXBwbHlUb0JhY2tncm91bmQodGhpcy5ib3JkZXJFbGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNsb3RzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGxldCBzbG90ID0gdGhpcy5zbG90c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2xvdE1hcC5nZXQoc2xvdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gaXRlbS5zbG90RGVmaW5hdGlvbjtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gaXRlbS5zbG90Qm9yZGVyO1xuXG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLmVzdGltYXRlSGVpZ2h0KCkgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd0b3AnLHBvcysncHgnKTtcbiAgICAgICAgICAgICAgICBib3JkZXIud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuZml4ZWQsY2VsbGgpO1xuICAgICAgICAgICAgICAgIGJvcmRlci52ZXJ0aWNhbEFsaWdubWVudCA9IFZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaDtcbiAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50U2xvdCA9IHNsb3Q7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuaXNTbG90V2lkdGhDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMuZXN0aW1hdGVXaWR0aCgpO1xuICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IGNlbGxoO1xuXG4gICAgICAgICAgICAgICAgcG9zKz1jZWxsaDtcbiAgICAgICAgICAgICAgICBib3JkZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0XG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGg+MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlV2lkdGgoKSt0Lm1hcmdpbi5sZWZ0K3QubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aGxpc3Quc29ydCgoYSxiKT0+Yi1hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRobGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKHQgPT4gdC5lc3RpbWF0ZVdpZHRoKCkgKyB0Lm1hcmdpbi5sZWZ0ICsgdC5tYXJnaW4ucmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGhsaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZih0aGlzLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQ2VudGVyXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuVG9wXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuQm90dG9tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGg+MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5lc3RpbWF0ZUhlaWdodCgpK3QubWFyZ2luLnRvcCt0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodGxpc3Quc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy52ZXJ0aWNhbEFsaWdubWVudD09VmVydGljYWxBbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHRsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodCA9PiB0LmVzdGltYXRlSGVpZ2h0KCkgKyB0Lm1hcmdpbi50b3AgKyB0Lm1hcmdpbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodGxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvLyAvLyBCb3JkZXJzIHRvIGNvbnRhaW4gY2hpbGQgY29udHJvbHMsIGNlbGxCb3JkZXJBcnJheS5sZW5ndGggaXMgdGhlIGNlbGxzIGNvdW50LlxuICAgICAgICAvLyBjZWxsQm9yZGVyQXJyYXkgOiBMaXN0PEJvcmRlcj47XG4gICAgICAgIC8vIC8vIFRoZSBkaXN0YW5jZSBkZWZpbmF0aW9uIGZvciBlYWNoIGNlbGxzLlxuICAgICAgICAvLyBjZWxsRGVmaW5hdGlvbnM6TGlzdDxEaXN0YW5jZT47XG4gICAgICAgIC8vIC8vIFRoZSBjZWxsIGluZGV4IG9mIGVhY2ggY2hpbGQgY29udHJvbCBvZiB0aGlzIGNvbnRhaW5lci5cbiAgICAgICAgLy8gY2VsbEluZGV4QXJyYXk6TGlzdDxudW1iZXI+O1xuICAgICAgICAvLyAvLyBUaGUgYmFja2dyb3VkIGFuZCBib3JkZXIgZGl2IGVsZW1lbnQuXG4gICAgICAgIC8vIGJvcmRlckVsZW06SFRNTEVsZW1lbnQ7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKSB7XG4gICAgICAgIC8vICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgLy8gICAgIC8vIEluaXQgdmFyaWFibGVzLlxuICAgICAgICAvLyAgICAgdGhpcy5jZWxsSW5kZXhBcnJheT1uZXcgTGlzdDxudW1iZXI+KCk7XG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxEZWZpbmF0aW9ucyA9IG5ldyBMaXN0PERpc3RhbmNlPigpO1xuICAgICAgICAvLyAgICAgdGhpcy5jZWxsQm9yZGVyQXJyYXkgPSBuZXcgTGlzdDxCb3JkZXI+KCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy8gQWRkIGNlbGwgZGVmaW5hdGlvbi4gVGhlIGRpc3RhbmNlIHR5cGUgY2FuIGJlICd3ZWlnaHQnIG9yICdmaXgnLlxuICAgICAgICAvLyBhZGRDZWxsKGRpc3RhbmNlOkRpc3RhbmNlKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmNlbGxEZWZpbmF0aW9ucy5wdXNoKGRpc3RhbmNlKTtcbiAgICAgICAgLy8gICAgIGxldCBzbG90ID0gbmV3IFNsb3QoKTtcbiAgICAgICAgLy8gICAgIHNsb3QuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgLy8gICAgIHRoaXMuc2xvdHMuYWRkKHNsb3QpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIEFkZCBjaGlsZCB0byB0aGlzIGNvbnRhaW5lciwgYW5kIHRoZSBjb250cm9sIGlzIGFkZGVkIHRvIHRoZSBmaXJzdCBjZWxsIGJ5IGRlZmF1bHQuXG4gICAgICAgIC8vIGFkZENoaWxkKGNvbnRyb2w6IExheW91dEx6Zy5Db250cm9sKTogdm9pZCB7XG4gICAgICAgIC8vICAgICBzdXBlci5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgLy8gICAgIHRoaXMuY2VsbEluZGV4QXJyYXkucHVzaCgwKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvLyBSZW1vdmUgY2hpbGQgZnJvbSB0aGlzIGNvbnRhaW5lci5cbiAgICAgICAgLy8gcmVtb3ZlQ2hpbGQoY29udHJvbDogTGF5b3V0THpnLkNvbnRyb2wpOiB2b2lkIHtcbiAgICAgICAgLy8gICAgIHN1cGVyLnJlbW92ZUNoaWxkKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgY29uc3QgaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNlbGxJbmRleEFycmF5LnNwbGljZShpZHgsMSk7XG4gICAgICAgIC8vICAgICAgICAgaWYoY29udHJvbC5wYXJlbnRTbG90KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnRyb2wucGFyZW50U2xvdC5yZW1vdmVDaGlsZChjb250cm9sKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy8gUmVtb3ZlIGFsbCBjaGlsZHJlbiBmcm9tIHRoaXMgY29udGFpbmVyLlxuICAgICAgICAvLyBjbGVhckNoaWxkKCk6IHZvaWQge1xuICAgICAgICAvLyAgICAgc3VwZXIuY2xlYXJDaGlsZCgpO1xuICAgICAgICAvLyAgICAgdGhpcy5jZWxsSW5kZXhBcnJheS5jbGVhcigpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIFNwZWNpZnkgJ2NvbnRyb2wnIHRvIHRoZSAnY2VsbEluZGV4JyBjZWxsLlxuICAgICAgICAvLyBzZXRDZWxsKGNvbnRyb2w6Q29udHJvbCwgY2VsbEluZGV4Om51bWJlcikge1xuICAgICAgICAvLyAgICAgY29uc3QgaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNvbnRyb2wpO1xuICAgICAgICAvLyAgICAgaWYoaWR4Pi0xKXtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNlbGxJbmRleEFycmF5W2lkeF0gPSBjZWxsSW5kZXg7XG4gICAgICAgIC8vICAgICAgICAgbGV0IHNsb3QgPSB0aGlzLnNsb3RzW2NlbGxJbmRleF07XG4gICAgICAgIC8vICAgICAgICAgc2xvdC5hZGRDaGlsZChjb250cm9sKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvLyBHZXQgdGhlIHJvb3QgZGl2IG9mIHRoaXMgY29udGFpbmVyLlxuICAgICAgICAvLyBnZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vICAgICBpZih0aGlzLnJvb3RFbGVtPT1udWxsKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5yb290RWxlbSA9ICQoXCI8ZGl2PjwvZGl2PlwiKVswXTtcbiAgICAgICAgLy8gICAgICAgICAkKHRoaXMucm9vdEVsZW0pLmF0dHIoJ2xheW91dC10eXBlJywnSG9yaXpvbmFsTGluZWFyTGF5b3V0Jyk7XG4gICAgICAgIC8vICAgICAgICAgJCh0aGlzLnJvb3RFbGVtKS5hdHRyKCdsYXlvdXQtbmFtZScsdGhpcy5uYW1lKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLnJvb3RFbGVtO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGluaXRDYWxjdWxhYmxlU2xvdHMoKTp2b2lkIHtcbiAgICAgICAgLy8gICAgIGxldCB3ZWlnaHRTdW0gPSAwO1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jZWxsRGVmaW5hdGlvbnMubGVuZ3RoO2krKykge1xuICAgICAgICAvLyAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuY2VsbERlZmluYXRpb25zW2ldO1xuICAgICAgICAvLyAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgLy8gICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7ajx0aGlzLmNoaWxkcmVuLmxlbmd0aDtqKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbEluZGV4QXJyYXlbal09PWkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2pdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IGNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI6Q29udGFpbmVyQ29udHJvbCA9IDxDb250YWluZXJDb250cm9sPmNoaWxkO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfWVsc2UgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLndlaWdodCl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7ajx0aGlzLmNoaWxkcmVuLmxlbmd0aDtqKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbEluZGV4QXJyYXlbal09PWkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2pdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0LnZhbHVlKmNlbGxEZWZpbmF0aW9uLnZhbHVlL3dlaWdodFN1bTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9ZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSAmJiB0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHRoaXMuY2VsbERlZmluYXRpb25zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGNlbGxEZWZpbmF0aW9uID0gdGhpcy5jZWxsRGVmaW5hdGlvbnNbaV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbEluZGV4QXJyYXlbal09PWkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2VsbEluZGV4QXJyYXlbal09PWkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuaXNTbG90SGVpZ2h0Q2FsY3VsYXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfWVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuY2VsbERlZmluYXRpb25zW2ldO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7ajx0aGlzLmNoaWxkcmVuLmxlbmd0aDtqKyspe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNlbGxJbmRleEFycmF5W2pdPT1pKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5bal07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmlzU2xvdEhlaWdodENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpe1xuICAgICAgICAvLyAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jaGlsZHJlbi5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNoaWxkLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoID0gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbml0Q2FsY3VsYWJsZVNsb3RzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9ZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlICYmIHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCkge1xuICAgICAgICAvLyAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RXaWR0aCA9IHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIENvbnRhaW5lckNvbnRyb2wpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyOkNvbnRhaW5lckNvbnRyb2wgPSA8Q29udGFpbmVyQ29udHJvbD5jaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5pdENhbGN1bGFibGVTbG90cygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfWVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXJDb250cm9sKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjpDb250YWluZXJDb250cm9sID0gPENvbnRhaW5lckNvbnRyb2w+Y2hpbGQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIGluaXQgdmFyaWFibGVzIGFuZCBodG1sZWxlbWVudHNcbiAgICAgICAgLy8gICAgIHRoaXMuY2VsbEJvcmRlckFycmF5LmNsZWFyKCk7XG4gICAgICAgIC8vICAgICAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuZW1wdHkoKTtcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuYm9yZGVyRWxlbT09bnVsbCkgdGhpcy5ib3JkZXJFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAvLyAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmFwcGVuZCh0aGlzLmJvcmRlckVsZW0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gYWRkIGNlbGwgd3JhcHBlciBkaXZzIHRvIHJvb3RFbGVtXG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgICAgICBsZXQgYm9yZGVyID0gbmV3IEJvcmRlcignJyk7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLmluaXRDYWxjdWxhYmxlU2xvdHMoKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNlbGxCb3JkZXJBcnJheS5wdXNoKGJvcmRlcik7XG4gICAgICAgIC8vICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmFwcGVuZChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBhZGQgY2hpbGRyZW4gcm9vdEVsZW1zIHRvIGNlbGwgd3JhcHBlcnNcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGo9MDtqPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2orKyl7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGJvcmRlciA9IHRoaXMuY2VsbEJvcmRlckFycmF5W3RoaXMuY2VsbEluZGV4QXJyYXlbal1dO1xuICAgICAgICAvLyAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5bal07XG4gICAgICAgIC8vICAgICAgICAgY2hpbGQuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIuYWRkQ2hpbGQoY2hpbGQpO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5hc3NlbWJsZURvbSgpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAvLyAgICAgLy8gY2FsY3VsYXRlIHdlaWdodFN1bSBhbmQgZml4U3VtXG4gICAgICAgIC8vICAgICBsZXQgd2VpZ2h0U3VtID0gMDtcbiAgICAgICAgLy8gICAgIGxldCBmaXhTdW0gPSAwO1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5jZWxsRGVmaW5hdGlvbnMubGVuZ3RoO2krKykge1xuICAgICAgICAvLyAgICAgICAgIGxldCBjZWxsRGVmaW5hdGlvbiA9IHRoaXMuY2VsbERlZmluYXRpb25zW2ldO1xuICAgICAgICAvLyAgICAgICAgIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpIHdlaWdodFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgLy8gICAgICAgICBpZihjZWxsRGVmaW5hdGlvbi50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpIGZpeFN1bSArPSBjZWxsRGVmaW5hdGlvbi52YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIHNldCByb290RWxlbSBzdHlsZXNcbiAgICAgICAgLy8gICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3dpZHRoJyx0aGlzLmVzdGltYXRlV2lkdGgoKSsncHgnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ2hlaWdodCcsdGhpcy5lc3RpbWF0ZUhlaWdodCgpKydweCcpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gc2V0IGJvcmRlciBhbmQgYmFja2dyb3VuZCBzdHlsZXNcbiAgICAgICAgLy8gICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ2xlZnQnLCcwcHgnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ3JpZ2h0JywnMHB4Jyk7XG4gICAgICAgIC8vICAgICAkKHRoaXMuYm9yZGVyRWxlbSkuY3NzKCd0b3AnLCcwcHgnKTtcbiAgICAgICAgLy8gICAgICQodGhpcy5ib3JkZXJFbGVtKS5jc3MoJ2JvdHRvbScsJzBweCcpO1xuICAgICAgICAvLyAgICAgaWYodGhpcy5zdHJva2Upe1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuc3Ryb2tlLmFwcGx5VG9Cb3JkZXIodGhpcy5ib3JkZXJFbGVtLHRoaXMuc3Ryb2tlVGhpY2tuZXNzKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGlmKHRoaXMuZmlsbCl7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5maWxsLmFwcGx5VG9CYWNrZ3JvdW5kKHRoaXMuYm9yZGVyRWxlbSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBzZXQgY2VsbCB3cmFwcGVyIHN0eWxlc1xuICAgICAgICAvLyAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBqPTA7ajx0aGlzLmNlbGxEZWZpbmF0aW9ucy5sZW5ndGg7aisrKXtcbiAgICAgICAgLy8gICAgICAgICBsZXQgY2VsbERlZmluYXRpb24gPSB0aGlzLmNlbGxEZWZpbmF0aW9uc1tqXTtcbiAgICAgICAgLy8gICAgICAgICBsZXQgYm9yZGVyID0gdGhpcy5jZWxsQm9yZGVyQXJyYXlbal07XG4gICAgICAgIC8vICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdwb3NpdGlvbicsJ2Fic29sdXRlJyk7XG4gICAgICAgIC8vICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdsZWZ0JywnMHB4Jyk7XG4gICAgICAgIC8vICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdyaWdodCcsJzBweCcpO1xuICAgICAgICAvLyAgICAgICAgIGxldCBjZWxsaCA9IDA7XG4gICAgICAgIC8vICAgICAgICAgaWYoY2VsbERlZmluYXRpb24udHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNlbGxoPWNlbGxEZWZpbmF0aW9uLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgIH1lbHNlIGlmKGNlbGxEZWZpbmF0aW9uLnR5cGU9PURpc3RhbmNlVHlwZS53ZWlnaHQpe1xuICAgICAgICAvLyAgICAgICAgICAgICBjZWxsaCA9ICh0aGlzLmVzdGltYXRlSGVpZ2h0KCkgLSBmaXhTdW0pKiBjZWxsRGVmaW5hdGlvbi52YWx1ZSAvIHdlaWdodFN1bTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgJChib3JkZXIuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCd0b3AnLHBvcysncHgnKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIuaGVpZ2h0ID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5maXhlZCxjZWxsaCk7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLndpZHRoID0gbmV3IERpc3RhbmNlKERpc3RhbmNlVHlwZS5hdXRvLDApO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5ob3Jpem9uQWxpZ25tZW50ID0gSG9yaXpvbkFsaWdubWVudC5TdHJlY2g7XG4gICAgICAgIC8vICAgICAgICAgYm9yZGVyLnBhcmVudFNsb3QgPSB0aGlzLnNsb3RzW2pdO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggPSB0aGlzLmVzdGltYXRlV2lkdGgoKTtcbiAgICAgICAgLy8gICAgICAgICBib3JkZXIucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgPSBjZWxsaDtcbiAgICAgICAgLy8gICAgICAgICBwb3MrPWNlbGxoO1xuICAgICAgICAvLyAgICAgICAgIGJvcmRlci5kb0xheW91dCgpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGVzdGltYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgLy8gICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RXaWR0aENhbGN1bGF0YWJsZSl7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgLy8gICAgICAgICAgICAgfHx0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuTGVmdFxuICAgICAgICAvLyAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5SaWdodClcbiAgICAgICAgLy8gICAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoLnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGhsaXN0ID0gdGhpcy5jaGlsZHJlbi5tYXAodD0+dC5lc3RpbWF0ZVdpZHRoKCkrdC5tYXJnaW4ubGVmdCt0Lm1hcmdpbi5yaWdodCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgd2lkdGhsaXN0LnNvcnQoKGEsYik9PmItYSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRobGlzdFswXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfWVsc2UgaWYodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1lbHNle1xuICAgICAgICAvLyAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgfWVsc2UgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCB3aWR0aGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVXaWR0aCgpICsgdC5tYXJnaW4ubGVmdCArIHQubWFyZ2luLnJpZ2h0KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHdpZHRobGlzdC5zb3J0KChhLGIpPT5iLWEpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRobGlzdFswXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgLy8gICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUpe1xuICAgICAgICAvLyAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgLy8gICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3BcbiAgICAgICAgLy8gICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pXG4gICAgICAgIC8vICAgICAgICAge1xuICAgICAgICAvLyAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD4wKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0PT50LmVzdGltYXRlSGVpZ2h0KCkrdC5tYXJnaW4udG9wK3QubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0bGlzdC5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHRsaXN0WzBdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9ZWxzZSBpZih0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5TdHJlY2gpe1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTbG90LmNhbHVsYXRlZFNsb3RIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuZml4ZWQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAvLyAgICAgICAgIH1lbHNlIGlmKHRoaXMuaGVpZ2h0LnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGhlaWdodGxpc3QgPSB0aGlzLmNoaWxkcmVuLm1hcCh0ID0+IHQuZXN0aW1hdGVIZWlnaHQoKSArIHQubWFyZ2luLnRvcCArIHQubWFyZ2luLmJvdHRvbSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBoZWlnaHRsaXN0LnNvcnQoKS5yZXZlcnNlKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0bGlzdFswXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcbiAgICBleHBvcnQgY2xhc3MgQ29udHJvbEJhc2UgZXh0ZW5kcyBDb250cm9sIHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnRTbG90LmlzU2xvdFdpZHRoQ2FsY3VsYXRhYmxlKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LkNlbnRlclxuICAgICAgICAgICAgICAgICAgICB8fHRoaXMuaG9yaXpvbkFsaWdubWVudD09SG9yaXpvbkFsaWdubWVudC5MZWZ0XG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5ob3Jpem9uQWxpZ25tZW50PT1Ib3Jpem9uQWxpZ25tZW50LlJpZ2h0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMud2lkdGgudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhvcml6b25BbGlnbm1lbnQ9PUhvcml6b25BbGlnbm1lbnQuU3RyZWNoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2xvdC5jYWx1bGF0ZWRTbG90V2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLndpZHRoLnR5cGUgPT0gRGlzdGFuY2VUeXBlLmF1dG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50U2xvdC5pc1Nsb3RIZWlnaHRDYWxjdWxhdGFibGUpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Ub3BcbiAgICAgICAgICAgICAgICAgICAgfHx0aGlzLnZlcnRpY2FsQWxpZ25tZW50PT1WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5hdXRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMudmVydGljYWxBbGlnbm1lbnQ9PVZlcnRpY2FsQWxpZ25tZW50LlN0cmVjaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNsb3QuY2FsdWxhdGVkU2xvdEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlaWdodC50eXBlID09IERpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5oZWlnaHQudHlwZSA9PSBEaXN0YW5jZVR5cGUuYXV0bykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW07XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcbiAgICBleHBvcnQgY2xhc3MgSW1hZ2VWaWV3IGV4dGVuZHMgQ29udHJvbEJhc2Uge1xuXG4gICAgICAgIGltZ0VsZW06SFRNTEVsZW1lbnQ7XG4gICAgICAgIHNyYzpzdHJpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQgeyBcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuXG4gICAgICAgICAgICBpZih0aGlzLmltZ0VsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltZ0VsZW0gPSAkKFwiPGltZy8+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5pbWdFbGVtKS5hdHRyKCdzcmMnLHRoaXMuc3JjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5hcHBlbmQodGhpcy5pbWdFbGVtKTtcbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnd2lkdGgnLHRoaXMud2lkdGgudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmltZ0VsZW0pLmNzcygnd2lkdGgnLHRoaXMud2lkdGgudmFsdWUrJ3B4Jyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkKHRoaXMuaW1nRWxlbSkuY3NzKCd3aWR0aCcsJzEwMCUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmNzcygnaGVpZ2h0Jyx0aGlzLmhlaWdodC52YWx1ZSsncHgnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMuaW1nRWxlbSkuY3NzKCdoZWlnaHQnLHRoaXMuaGVpZ2h0LnZhbHVlKydweCcpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmltZ0VsZW0pLmNzcygnaGVpZ2h0JywnMTAwJScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBMYXlvdXRMemd7XG4gICAgZXhwb3J0IGNsYXNzIFJlY3QgZXh0ZW5kcyBDb250cm9sQmFzZSB7XG5cbiAgICAgICAgcng6bnVtYmVyO1xuICAgICAgICByeTpudW1iZXI7XG5cblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5yeCA9IDA7XG4gICAgICAgICAgICB0aGlzLnJ5ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VtYmxlRG9tKCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuYXNzZW1ibGVEb20oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuZG9MYXlvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpne1xuICAgIGV4cG9ydCBjbGFzcyBUZXh0VmlldyBleHRlbmRzIENvbnRyb2wge1xuXG4gICAgICAgIHRleHQ6c3RyaW5nO1xuICAgICAgICB3b3JkV3JhcDpib29sZWFuO1xuICAgICAgICBzcGFuRWxlbTpIVE1MRWxlbWVudDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsdGV4dDpzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBuZXcgRGlzdGFuY2UoRGlzdGFuY2VUeXBlLmF1dG8sMCk7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IG5ldyBEaXN0YW5jZShEaXN0YW5jZVR5cGUuYXV0bywwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdEVsZW09PW51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RFbGVtID0gJChcIjxkaXY+PC9kaXY+XCIpWzBdO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LXR5cGUnLCdUZXh0VmlldycpO1xuICAgICAgICAgICAgICAgICQodGhpcy5yb290RWxlbSkuYXR0cignbGF5b3V0LW5hbWUnLHRoaXMubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzdGltYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGgudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdCA9ICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5maW5kKCdzcGFuJykud2lkdGgoKTtcbiAgICAgICAgICAgIHJldHVybiB0O1xuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGlmKHRoaXMuaGVpZ2h0LnR5cGU9PURpc3RhbmNlVHlwZS5maXhlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5maW5kKCdzcGFuJykuaGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuc3BhbkVsZW0gPSAkKFwiPHNwYW4+PC9zcGFuPlwiKVswXTtcbiAgICAgICAgICAgICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5lbXB0eSgpO1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aC50eXBlPT1EaXN0YW5jZVR5cGUuZml4ZWQpICQodGhpcy5nZXRSb290RWxlbWVudCgpKS5jc3MoJ3dpZHRoJyx0aGlzLndpZHRoLnZhbHVlKydweCcpO1xuICAgICAgICAgICAgaWYodGhpcy5oZWlnaHQudHlwZT09RGlzdGFuY2VUeXBlLmZpeGVkKSAkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSkuY3NzKCdoZWlnaHQnLHRoaXMuaGVpZ2h0LnZhbHVlKydweCcpO1xuICAgICAgICAgICAgJCh0aGlzLmdldFJvb3RFbGVtZW50KCkpLmFwcGVuZCh0aGlzLnNwYW5FbGVtKTtcbiAgICAgICAgICAgICQodGhpcy5zcGFuRWxlbSkudGV4dCh0aGlzLnRleHQpO1xuICAgICAgICAgICAgaWYodGhpcy53b3JkV3JhcClcbiAgICAgICAgICAgICAgICAkKHRoaXMuc3BhbkVsZW0pLmNzcygnd29yZC1icmVhaycsJ2JyZWFrLWFsbCcpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICQodGhpcy5zcGFuRWxlbSkuY3NzKCd3b3JkLWJyZWFrJywnbm9ybWFsJyk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRvTGF5b3V0KCk6IHZvaWQge1xuICAgICAgICB9XG4gICAgfVxufSIsIlxubmFtZXNwYWNlIExheW91dEx6Zy5PYnNlcnZlck1vZGVsIHtcblxuICAgIGNvbnN0IGNvbmZpZ1Byb3BlcnR5TmFtZTpzdHJpbmcgPSBcIl9fb2JzZXJ2YWJsZV9fXCI7XG5cblxuICAgIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mge1xuICAgICAgICBwcm9wZXJ0eU5hbWUgOiBzdHJpbmc7XG4gICAgICAgIG9sZFZhbHVlIDogYW55O1xuICAgICAgICBuZXdWYWx1ZSA6IGFueTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0eU5hbWU6IHN0cmluZywgb2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICB0aGlzLm9sZFZhbHVlID0gb2xkVmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5ld1ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0T2JqZWN0Q29uZmlnKG9iajphbnkpIHtcbiAgICAgICAgaWYoIShjb25maWdQcm9wZXJ0eU5hbWUgaW4gb2JqKSkge1xuICAgICAgICAgICAgb2JqW2NvbmZpZ1Byb3BlcnR5TmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgcHJvcHM6e30sXG4gICAgICAgICAgICAgICAgcHJvcENoYW5nZWRDYWxsYmFja0xpc3QgOiBbXSxcbiAgICAgICAgICAgICAgICBub3RpZnlQcm9wZXJ0eUNoYW5nZWQgOiBmdW5jdGlvbihhcmdzOlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncykge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMucHJvcENoYW5nZWRDYWxsYmFja0xpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSB0aGlzLnByb3BDaGFuZ2VkQ2FsbGJhY2tMaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFkZFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrIDogZnVuY3Rpb24gKGNhbGxiYWNrOihhcmdzOlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyk9PnZvaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wQ2hhbmdlZENhbGxiYWNrTGlzdC5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmpbY29uZmlnUHJvcGVydHlOYW1lXTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gaW5qZWN0UHJvcGVydGllcyhvYmo6YW55KSB7XG4gICAgICAgIGlmIChvYmo9PW51bGwpIHJldHVybjtcbiAgICAgICAgbGV0IGNmZyA9IGdldE9iamVjdENvbmZpZyhvYmopO1xuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eU5hbWUgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZihwcm9wZXJ0eU5hbWU9PWNvbmZpZ1Byb3BlcnR5TmFtZSkgY29udGludWU7XG4gICAgICAgICAgICBpZighb2JqLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgbGV0IHByb3BWYWx1ZSA9IG9ialtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgaWYodG9TdHJpbmcuY2FsbChwcm9wVmFsdWUpPT0nW29iamVjdCBGdW5jdGlvbl0nKXtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1lbHNlIGlmKHRvU3RyaW5nLmNhbGwocHJvcFZhbHVlKT09J1tvYmplY3QgT2JqZWN0XScpe1xuICAgICAgICAgICAgICAgIGluamVjdFByb3BlcnRpZXMocHJvcFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm9wZXJ0eU5hbWUsJ2FnZScpO1xuICAgICAgICAgICAgaWYoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKXtcbiAgICAgICAgICAgICAgICBsZXQgdCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYodG9TdHJpbmcuY2FsbCh0KT09J1tvYmplY3QgRnVuY3Rpb25dJyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRvU3RyaW5nLmNhbGwocHJvcFZhbHVlKT09J1tvYmplY3QgT2JqZWN0XScpe1xuICAgICAgICAgICAgICAgICAgICBpbmplY3RQcm9wZXJ0aWVzKHByb3BWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjZmcucHJvcHNbcHJvcGVydHlOYW1lXSA9IG9ialtwcm9wZXJ0eU5hbWVdO1xuXG4gICAgICAgICAgICAoZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoscHJvcGVydHlOYW1lLHtcbiAgICAgICAgICAgICAgICAgICAgJ2dldCc6ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldE9iamVjdENvbmZpZyh0aGlzKS5wcm9wc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnc2V0JzpmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRWYWx1ZSA9IGdldE9iamVjdENvbmZpZyh0aGlzKS5wcm9wc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0T2JqZWN0Q29uZmlnKHRoaXMpLnByb3BzW3RoaXMucHJvcGVydHlOYW1lXT12YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE9iamVjdENvbmZpZyh0aGlzKS5ub3RpZnlQcm9wZXJ0eUNoYW5nZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KShwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0iLCJuYW1lc3BhY2UgTGF5b3V0THpnIHtcblxuICAgIGV4cG9ydCBjbGFzcyBUZW1wbGF0ZUNvbnRyb2wgZXh0ZW5kcyBDb250cm9sIHtcblxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlzdWFsVHJlZSA6IFZpc3VhbFRyZWU7XG5cblxuICAgICAgICBlc3RpbWF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuZXN0aW1hdGVXaWR0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXN0aW1hdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5lc3RpbWF0ZUhlaWdodCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmdldFJvb3RFbGVtZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlbWJsZURvbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmFzc2VtYmxlRG9tKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb0xheW91dCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmRvTGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59IiwibmFtZXNwYWNlIExheW91dEx6Z3tcblxuICAgIGV4cG9ydCBjbGFzcyBWaXN1YWxUcmVlIHtcbiAgICAgICAgcm9vdENvbnRhaW5lciA6IENvbnRhaW5lckNvbnRyb2w7XG4gICAgfVxuXG5cbn0iXX0=
