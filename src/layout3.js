var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LayoutLzg;
(function (LayoutLzg) {
    var HorizonAlignment;
    (function (HorizonAlignment) {
        HorizonAlignment[HorizonAlignment["Strech"] = 0] = "Strech";
        HorizonAlignment[HorizonAlignment["Left"] = 1] = "Left";
        HorizonAlignment[HorizonAlignment["Right"] = 2] = "Right";
        HorizonAlignment[HorizonAlignment["Center"] = 3] = "Center";
    })(HorizonAlignment = LayoutLzg.HorizonAlignment || (LayoutLzg.HorizonAlignment = {}));
    var VerticalAlignment;
    (function (VerticalAlignment) {
        VerticalAlignment[VerticalAlignment["Strech"] = 0] = "Strech";
        VerticalAlignment[VerticalAlignment["Top"] = 1] = "Top";
        VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
        VerticalAlignment[VerticalAlignment["Center"] = 3] = "Center";
    })(VerticalAlignment = LayoutLzg.VerticalAlignment || (LayoutLzg.VerticalAlignment = {}));
    var DistanceType;
    (function (DistanceType) {
        DistanceType[DistanceType["auto"] = 0] = "auto";
        DistanceType[DistanceType["fixed"] = 1] = "fixed";
        DistanceType[DistanceType["weight"] = 2] = "weight";
    })(DistanceType = LayoutLzg.DistanceType || (LayoutLzg.DistanceType = {}));
    var StackPanelOrientation;
    (function (StackPanelOrientation) {
        StackPanelOrientation[StackPanelOrientation["Horizonal"] = 0] = "Horizonal";
        StackPanelOrientation[StackPanelOrientation["Vertical"] = 1] = "Vertical";
    })(StackPanelOrientation = LayoutLzg.StackPanelOrientation || (LayoutLzg.StackPanelOrientation = {}));
    var Brush = /** @class */ (function () {
        function Brush() {
        }
        return Brush;
    }());
    LayoutLzg.Brush = Brush;
    var Thickness = /** @class */ (function () {
        function Thickness(left, right, top, bottom) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        }
        return Thickness;
    }());
    LayoutLzg.Thickness = Thickness;
    var Distance = /** @class */ (function () {
        function Distance(type, value) {
            this.value = value;
            this.type = type;
        }
        return Distance;
    }());
    LayoutLzg.Distance = Distance;
    var Control = /** @class */ (function () {
        function Control(name) {
            this.name = name;
            this.horizonAlignment = HorizonAlignment.Strech;
            this.verticalAlignment = VerticalAlignment.Strech;
            this.margin = new Thickness(0, 0, 0, 0);
            this.width = new Distance(DistanceType.fixed, 50);
            this.height = new Distance(DistanceType.fixed, 50);
        }
        Control.prototype.estimateWidth = function () {
            return 0;
        };
        Control.prototype.estimateHeight = function () {
            return 0;
        };
        Control.prototype.getRootElement = function () {
            return null;
        };
        Control.prototype.assembleDom = function () {
        };
        Control.prototype.doLayout = function () {
        };
        return Control;
    }());
    LayoutLzg.Control = Control;
    var ContainerControl = /** @class */ (function (_super) {
        __extends(ContainerControl, _super);
        function ContainerControl(name) {
            var _this = _super.call(this, name) || this;
            _this.children = [];
            return _this;
        }
        ContainerControl.prototype.addChild = function (control) {
            this.children.push(control);
        };
        ContainerControl.prototype.removeChild = function (control) {
            var idx = this.children.indexOf(control);
            if (idx > -1)
                this.children.splice(idx, 1);
        };
        ContainerControl.prototype.clearChild = function () {
            this.children = [];
        };
        ContainerControl.prototype.initCalculableSlots = function () {
        };
        return ContainerControl;
    }(Control));
    LayoutLzg.ContainerControl = ContainerControl;
    var Rect = /** @class */ (function (_super) {
        __extends(Rect, _super);
        function Rect(name) {
            var _this = _super.call(this, name) || this;
            _this.rx = 0;
            _this.ry = 0;
            return _this;
        }
        Rect.prototype.estimateWidth = function () {
            if (this.isParentSlotWidthCalculatable) {
                if (this.horizonAlignment == HorizonAlignment.Center
                    || this.horizonAlignment == HorizonAlignment.Left
                    || this.horizonAlignment == HorizonAlignment.Right) {
                    if (this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }
                    else if (this.width.type == DistanceType.auto) {
                        return 0;
                    }
                }
                else if (this.horizonAlignment == HorizonAlignment.Strech) {
                    return this.parentSlotWidth - this.margin.left - this.margin.right;
                }
            }
            else {
                if (this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }
                else if (this.width.type == DistanceType.auto) {
                    return 0;
                }
                return 0;
            }
        };
        Rect.prototype.estimateHeight = function () {
            return _super.prototype.estimateHeight.call(this);
        };
        Rect.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = $("<div></div>")[0];
            }
            return this.rootElem;
        };
        Rect.prototype.assembleDom = function () {
            _super.prototype.assembleDom.call(this);
        };
        Rect.prototype.doLayout = function () {
            _super.prototype.doLayout.call(this);
        };
        return Rect;
    }(Control));
    LayoutLzg.Rect = Rect;
    var Border = /** @class */ (function (_super) {
        __extends(Border, _super);
        function Border(name) {
            return _super.call(this, name) || this;
        }
        Border.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type', 'Border');
                $(this.rootElem).attr('layout-name', this.name);
            }
            return this.rootElem;
        };
        Border.prototype.initCalculableSlots = function () {
            if (this.width.type == DistanceType.fixed) {
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    child.isParentSlotWidthCalculatable = true;
                    child.parentSlotWidth = this.width.value;
                    if (child instanceof ContainerControl) {
                        var container = child;
                        container.initCalculableSlots();
                    }
                }
            }
            else {
                if (this.isParentSlotWidthCalculatable && this.horizonAlignment == HorizonAlignment.Strech) {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.isParentSlotWidthCalculatable = true;
                        child.parentSlotWidth = this.parentSlotWidth - this.margin.left - this.margin.right;
                        if (child instanceof ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.isParentSlotWidthCalculatable = false;
                        if (child instanceof ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }
            if (this.height.type == DistanceType.fixed) {
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    child.isParentSlotHeightCalculatable = true;
                    child.parentSlotHeight = this.height.value;
                    if (child instanceof ContainerControl) {
                        var container = child;
                        container.initCalculableSlots();
                    }
                }
            }
            else {
                if (this.isParentSlotHeightCalculatable && this.verticalAlignment == VerticalAlignment.Strech) {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.isParentSlotHeightCalculatable = true;
                        child.parentSlotHeight = this.parentSlotHeight - this.margin.top - this.margin.bottom;
                        if (child instanceof ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.isParentSlotHeightCalculatable = false;
                        if (child instanceof ContainerControl) {
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
                if (child.horizonAlignment == HorizonAlignment.Left) {
                    $(child.getRootElement()).css('left', '0px');
                }
                else if (child.horizonAlignment == HorizonAlignment.Right) {
                    $(child.getRootElement()).css('right', '0px');
                }
                else if (child.horizonAlignment == HorizonAlignment.Strech) {
                    $(child.getRootElement()).css('left', '0px');
                    $(child.getRootElement()).css('right', '0px');
                }
                else if (child.horizonAlignment == HorizonAlignment.Center) {
                    var w = child.estimateWidth();
                    var ww = this.estimateWidth();
                    var x = (ww - w) / 2;
                    $(child.getRootElement()).css('left', x + 'px');
                }
                if (child.verticalAlignment == VerticalAlignment.Top) {
                    $(child.getRootElement()).css('top', '0px');
                }
                else if (child.verticalAlignment == VerticalAlignment.Bottom) {
                    $(child.getRootElement()).css('bottom', '0px');
                }
                else if (child.verticalAlignment == VerticalAlignment.Strech) {
                    $(child.getRootElement()).css('top', '0px');
                    $(child.getRootElement()).css('bottom', '0px');
                }
                else if (child.verticalAlignment == VerticalAlignment.Center) {
                    var h = child.estimateHeight();
                    var hh = this.estimateHeight();
                    var y = (hh - h) / 2;
                    $(child.getRootElement()).css('top', y + 'px');
                }
            }
        };
        Border.prototype.estimateWidth = function () {
            if (this.isParentSlotWidthCalculatable) {
                if (this.horizonAlignment == HorizonAlignment.Center
                    || this.horizonAlignment == HorizonAlignment.Left
                    || this.horizonAlignment == HorizonAlignment.Right) {
                    if (this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }
                    else if (this.width.type == DistanceType.auto) {
                        if (this.children.length > 0) {
                            var widthlist = this.children.map(function (t) { return t.estimateWidth() + t.margin.left + t.margin.right; });
                            widthlist.sort(function (a, b) { return b - a; });
                            return widthlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.horizonAlignment == HorizonAlignment.Strech) {
                    return this.parentSlotWidth - this.margin.left - this.margin.right;
                }
            }
            else {
                if (this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }
                else if (this.width.type == DistanceType.auto) {
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
            if (this.isParentSlotHeightCalculatable) {
                if (this.verticalAlignment == VerticalAlignment.Center
                    || this.verticalAlignment == VerticalAlignment.Top
                    || this.verticalAlignment == VerticalAlignment.Bottom) {
                    if (this.height.type == DistanceType.fixed) {
                        return this.height.value;
                    }
                    else if (this.height.type == DistanceType.auto) {
                        if (this.children.length > 0) {
                            var heightlist = this.children.map(function (t) { return t.estimateHeight() + t.margin.top + t.margin.bottom; });
                            heightlist.sort().reverse();
                            return heightlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.verticalAlignment == VerticalAlignment.Strech) {
                    return this.parentSlotHeight - this.margin.top - this.margin.bottom;
                }
            }
            else {
                if (this.height.type == DistanceType.fixed) {
                    return this.height.value;
                }
                else if (this.height.type == DistanceType.auto) {
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
    }(ContainerControl));
    LayoutLzg.Border = Border;
    var TextView = /** @class */ (function (_super) {
        __extends(TextView, _super);
        function TextView(name, text) {
            var _this = _super.call(this, name) || this;
            _this.text = text;
            _this.width = new Distance(DistanceType.auto, 0);
            _this.height = new Distance(DistanceType.auto, 0);
            return _this;
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
            if (this.width.type == DistanceType.fixed) {
                return this.width.value;
            }
            var t = $(this.getRootElement()).find('span').width();
            return t;
        };
        TextView.prototype.estimateHeight = function () {
            if (this.height.type == DistanceType.fixed) {
                return this.height.value;
            }
            return $(this.getRootElement()).find('span').height();
        };
        TextView.prototype.assembleDom = function () {
            this.spanElem = $("<span></span>")[0];
            $(this.getRootElement()).empty();
            if (this.width.type == DistanceType.fixed)
                $(this.getRootElement()).css('width', this.width.value + 'px');
            if (this.height.type == DistanceType.fixed)
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
    }(Control));
    LayoutLzg.TextView = TextView;
    var HorizonalLinearLayout = /** @class */ (function (_super) {
        __extends(HorizonalLinearLayout, _super);
        function HorizonalLinearLayout(name) {
            var _this = _super.call(this, name) || this;
            _this.cellIndexArray = [];
            _this.cellDefinations = [];
            _this.wrapperDoms = [];
            _this.cellWrapperDoms = [];
            return _this;
        }
        HorizonalLinearLayout.prototype.addCell = function (distance) {
            this.cellDefinations.push(distance);
        };
        HorizonalLinearLayout.prototype.addChild = function (control) {
            _super.prototype.addChild.call(this, control);
            this.cellIndexArray.push(0);
        };
        HorizonalLinearLayout.prototype.removeChild = function (control) {
            _super.prototype.removeChild.call(this, control);
            var idx = this.children.indexOf(control);
            if (idx > -1)
                this.cellIndexArray.splice(idx, 1);
        };
        HorizonalLinearLayout.prototype.clearChild = function () {
            _super.prototype.clearChild.call(this);
            this.cellIndexArray = [];
        };
        HorizonalLinearLayout.prototype.setCell = function (control, cellIndex) {
            var idx = this.children.indexOf(control);
            if (idx > -1) {
                this.cellIndexArray[idx] = cellIndex;
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
            for (var i = 0; i < this.cellDefinations.length; i++) {
                var cellDefination = this.cellDefinations[i];
                if (cellDefination.type == DistanceType.weight)
                    weightSum += cellDefination.value;
            }
            if (this.width.type == DistanceType.fixed) {
                for (var i = 0; i < this.cellDefinations.length; i++) {
                    var cellDefination = this.cellDefinations[i];
                    if (cellDefination.type == DistanceType.fixed) {
                        for (var j = 0; j < this.children.length; j++) {
                            if (this.cellIndexArray[j] == i) {
                                var child = this.children[j];
                                child.isParentSlotWidthCalculatable = true;
                                child.parentSlotWidth = cellDefination.value;
                                if (child instanceof ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                    else if (cellDefination.type == DistanceType.weight) {
                        for (var j = 0; j < this.children.length; j++) {
                            if (this.cellIndexArray[j] == i) {
                                var child = this.children[j];
                                child.isParentSlotWidthCalculatable = true;
                                child.parentSlotWidth = this.width.value * cellDefination.value / weightSum;
                                if (child instanceof ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (this.isParentSlotWidthCalculatable && this.horizonAlignment == HorizonAlignment.Strech) {
                    for (var i = 0; i < this.cellDefinations.length; i++) {
                        var cellDefination = this.cellDefinations[i];
                        if (cellDefination.type == DistanceType.fixed) {
                            for (var j = 0; j < this.children.length; j++) {
                                if (this.cellIndexArray[j] == i) {
                                    var child = this.children[j];
                                    child.isParentSlotWidthCalculatable = true;
                                    child.parentSlotWidth = this.parentSlotWidth - this.margin.left - this.margin.right;
                                    if (child instanceof ContainerControl) {
                                        var container = child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                        else {
                            for (var j = 0; j < this.children.length; j++) {
                                if (this.cellIndexArray[j] == i) {
                                    var child = this.children[j];
                                    child.isParentSlotWidthCalculatable = false;
                                    if (child instanceof ContainerControl) {
                                        var container = child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.cellDefinations.length; i++) {
                        var cellDefination = this.cellDefinations[i];
                        if (cellDefination.type == DistanceType.fixed) {
                            for (var j = 0; j < this.children.length; j++) {
                                if (this.cellIndexArray[j] == i) {
                                    var child = this.children[j];
                                    child.isParentSlotWidthCalculatable = false;
                                    if (child instanceof ContainerControl) {
                                        var container = child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (this.height.type == DistanceType.fixed) {
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    child.isParentSlotHeightCalculatable = true;
                    child.parentSlotHeight = this.height.value;
                    if (child instanceof ContainerControl) {
                        var container = child;
                        container.initCalculableSlots();
                    }
                }
            }
            else {
                if (this.isParentSlotHeightCalculatable && this.verticalAlignment == VerticalAlignment.Strech) {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.isParentSlotHeightCalculatable = true;
                        child.parentSlotHeight = this.parentSlotHeight - this.margin.top - this.margin.bottom;
                        if (child instanceof ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.isParentSlotHeightCalculatable = false;
                        if (child instanceof ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }
        };
        HorizonalLinearLayout.prototype.assembleDom = function () {
            this.wrapperDoms = [];
            this.cellWrapperDoms = [];
            $(this.getRootElement()).empty();
            for (var i = 0; i < this.cellDefinations.length; i++) {
                var cellWrapperDiv = $("<div></div>")[0];
                $(cellWrapperDiv).attr('layout-tag', 'cellWrapper');
                this.cellWrapperDoms.push(cellWrapperDiv);
                $(this.getRootElement()).append(cellWrapperDiv);
            }
            for (var j = 0; j < this.children.length; j++) {
                var cellWrapperDiv = this.cellWrapperDoms[this.cellIndexArray[j]];
                var child = this.children[j];
                child.assembleDom();
                var wrapperDiv = $("<div></div>")[0];
                $(wrapperDiv).attr('layout-tag', 'wrapper');
                this.wrapperDoms.push(wrapperDiv);
                $(cellWrapperDiv).append(wrapperDiv);
                $(wrapperDiv).append(child.getRootElement());
            }
        };
        HorizonalLinearLayout.prototype.doLayout = function () {
            var weightSum = 0;
            var fixSum = 0;
            for (var i = 0; i < this.cellDefinations.length; i++) {
                var cellDefination = this.cellDefinations[i];
                if (cellDefination.type == DistanceType.weight)
                    weightSum += cellDefination.value;
                if (cellDefination.type == DistanceType.fixed)
                    fixSum += cellDefination.value;
            }
            $(this.getRootElement()).css('position', 'absolute');
            $(this.getRootElement()).css('width', this.estimateWidth() + 'px');
            $(this.getRootElement()).css('height', this.estimateHeight() + 'px');
            var pos = 0;
            for (var j = 0; j < this.cellDefinations.length; j++) {
                var cellDefination = this.cellDefinations[j];
                var cellWrapperDiv = this.cellWrapperDoms[j];
                $(cellWrapperDiv).css('position', 'absolute');
                $(cellWrapperDiv).css('top', '0px');
                $(cellWrapperDiv).css('bottom', '0px');
                var cellw = 0;
                if (cellDefination.type == DistanceType.fixed) {
                    cellw = cellDefination.value;
                }
                else if (cellDefination.type == DistanceType.weight) {
                    cellw = (this.estimateWidth() - fixSum) * cellDefination.value / weightSum;
                }
                $(cellWrapperDiv).css('left', pos + 'px');
                $(cellWrapperDiv).css('width', cellw + 'px');
                pos += cellw;
                for (var i = 0; i < this.children.length; i++) {
                    if (j == this.cellIndexArray[i]) {
                        var child = this.children[i];
                        var wrapperDiv = this.wrapperDoms[i];
                        child.doLayout();
                        $(wrapperDiv).css('position', 'absolute');
                        $(wrapperDiv).css('left', child.margin.left + 'px');
                        $(wrapperDiv).css('right', child.margin.right + 'px');
                        $(wrapperDiv).css('top', child.margin.top + 'px');
                        $(wrapperDiv).css('bottom', child.margin.bottom + 'px');
                        $(child.getRootElement()).css('position', 'absolute');
                        if (child.horizonAlignment == HorizonAlignment.Left) {
                            $(child.getRootElement()).css('left', '0px');
                        }
                        else if (child.horizonAlignment == HorizonAlignment.Right) {
                            $(child.getRootElement()).css('right', '0px');
                        }
                        else if (child.horizonAlignment == HorizonAlignment.Strech) {
                            $(child.getRootElement()).css('left', '0px');
                            $(child.getRootElement()).css('right', '0px');
                        }
                        else if (child.horizonAlignment == HorizonAlignment.Center) {
                            var w = child.estimateWidth();
                            var x = (cellw - w) / 2;
                            $(child.getRootElement()).css('left', x + 'px');
                        }
                        if (child.verticalAlignment == VerticalAlignment.Top) {
                            $(child.getRootElement()).css('top', '0px');
                        }
                        else if (child.verticalAlignment == VerticalAlignment.Bottom) {
                            $(child.getRootElement()).css('bottom', '0px');
                        }
                        else if (child.verticalAlignment == VerticalAlignment.Strech) {
                            $(child.getRootElement()).css('top', '0px');
                            $(child.getRootElement()).css('bottom', '0px');
                        }
                        else if (child.verticalAlignment == VerticalAlignment.Center) {
                            var h = child.estimateHeight();
                            var hh = this.estimateHeight();
                            var y = (hh - h) / 2;
                            $(child.getRootElement()).css('top', y + 'px');
                        }
                    }
                }
            }
        };
        HorizonalLinearLayout.prototype.estimateWidth = function () {
            if (this.isParentSlotWidthCalculatable) {
                if (this.horizonAlignment == HorizonAlignment.Center
                    || this.horizonAlignment == HorizonAlignment.Left
                    || this.horizonAlignment == HorizonAlignment.Right) {
                    if (this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }
                    else if (this.width.type == DistanceType.auto) {
                        if (this.children.length > 0) {
                            var widthlist = this.children.map(function (t) { return t.estimateWidth() + t.margin.left + t.margin.right; });
                            widthlist.sort(function (a, b) { return b - a; });
                            return widthlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.horizonAlignment == HorizonAlignment.Strech) {
                    return this.parentSlotWidth - this.margin.left - this.margin.right;
                }
            }
            else {
                if (this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }
                else if (this.width.type == DistanceType.auto) {
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
            if (this.isParentSlotHeightCalculatable) {
                if (this.verticalAlignment == VerticalAlignment.Center
                    || this.verticalAlignment == VerticalAlignment.Top
                    || this.verticalAlignment == VerticalAlignment.Bottom) {
                    if (this.height.type == DistanceType.fixed) {
                        return this.height.value;
                    }
                    else if (this.height.type == DistanceType.auto) {
                        if (this.children.length > 0) {
                            var heightlist = this.children.map(function (t) { return t.estimateHeight() + t.margin.top + t.margin.bottom; });
                            heightlist.sort().reverse();
                            return heightlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.verticalAlignment == VerticalAlignment.Strech) {
                    return this.parentSlotHeight - this.margin.top - this.margin.bottom;
                }
            }
            else {
                if (this.height.type == DistanceType.fixed) {
                    return this.height.value;
                }
                else if (this.height.type == DistanceType.auto) {
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
    }(ContainerControl));
    LayoutLzg.HorizonalLinearLayout = HorizonalLinearLayout;
    var HorizonalLinearLayout2 = /** @class */ (function (_super) {
        __extends(HorizonalLinearLayout2, _super);
        function HorizonalLinearLayout2(name) {
            var _this = _super.call(this, name) || this;
            _this.cellIndexArray = [];
            _this.cellDefinations = [];
            _this.cellBorderArray = [];
            return _this;
        }
        HorizonalLinearLayout2.prototype.addCell = function (distance) {
            this.cellDefinations.push(distance);
        };
        HorizonalLinearLayout2.prototype.addChild = function (control) {
            _super.prototype.addChild.call(this, control);
            this.cellIndexArray.push(0);
        };
        HorizonalLinearLayout2.prototype.removeChild = function (control) {
            _super.prototype.removeChild.call(this, control);
            var idx = this.children.indexOf(control);
            if (idx > -1)
                this.cellIndexArray.splice(idx, 1);
        };
        HorizonalLinearLayout2.prototype.clearChild = function () {
            _super.prototype.clearChild.call(this);
            this.cellIndexArray = [];
        };
        HorizonalLinearLayout2.prototype.setCell = function (control, cellIndex) {
            var idx = this.children.indexOf(control);
            if (idx > -1) {
                this.cellIndexArray[idx] = cellIndex;
            }
        };
        HorizonalLinearLayout2.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type', 'HorizonalLinearLayout');
                $(this.rootElem).attr('layout-name', this.name);
            }
            return this.rootElem;
        };
        HorizonalLinearLayout2.prototype.initCalculableSlots = function () {
            var weightSum = 0;
            for (var i = 0; i < this.cellDefinations.length; i++) {
                var cellDefination = this.cellDefinations[i];
                if (cellDefination.type == DistanceType.weight)
                    weightSum += cellDefination.value;
            }
            if (this.width.type == DistanceType.fixed) {
                for (var i = 0; i < this.cellDefinations.length; i++) {
                    var cellDefination = this.cellDefinations[i];
                    if (cellDefination.type == DistanceType.fixed) {
                        for (var j = 0; j < this.children.length; j++) {
                            if (this.cellIndexArray[j] == i) {
                                var child = this.children[j];
                                child.isParentSlotWidthCalculatable = true;
                                child.parentSlotWidth = cellDefination.value;
                                if (child instanceof ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                    else if (cellDefination.type == DistanceType.weight) {
                        for (var j = 0; j < this.children.length; j++) {
                            if (this.cellIndexArray[j] == i) {
                                var child = this.children[j];
                                child.isParentSlotWidthCalculatable = true;
                                child.parentSlotWidth = this.width.value * cellDefination.value / weightSum;
                                if (child instanceof ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (this.isParentSlotWidthCalculatable && this.horizonAlignment == HorizonAlignment.Strech) {
                    for (var i = 0; i < this.cellDefinations.length; i++) {
                        var cellDefination = this.cellDefinations[i];
                        if (cellDefination.type == DistanceType.fixed) {
                            for (var j = 0; j < this.children.length; j++) {
                                if (this.cellIndexArray[j] == i) {
                                    var child = this.children[j];
                                    child.isParentSlotWidthCalculatable = true;
                                    child.parentSlotWidth = this.parentSlotWidth - this.margin.left - this.margin.right;
                                    if (child instanceof ContainerControl) {
                                        var container = child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                        else {
                            for (var j = 0; j < this.children.length; j++) {
                                if (this.cellIndexArray[j] == i) {
                                    var child = this.children[j];
                                    child.isParentSlotWidthCalculatable = false;
                                    if (child instanceof ContainerControl) {
                                        var container = child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.cellDefinations.length; i++) {
                        var cellDefination = this.cellDefinations[i];
                        if (cellDefination.type == DistanceType.fixed) {
                            for (var j = 0; j < this.children.length; j++) {
                                if (this.cellIndexArray[j] == i) {
                                    var child = this.children[j];
                                    child.isParentSlotWidthCalculatable = false;
                                    if (child instanceof ContainerControl) {
                                        var container = child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (this.height.type == DistanceType.fixed) {
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    child.isParentSlotHeightCalculatable = true;
                    child.parentSlotHeight = this.height.value;
                    if (child instanceof ContainerControl) {
                        var container = child;
                        container.initCalculableSlots();
                    }
                }
            }
            else {
                if (this.isParentSlotHeightCalculatable && this.verticalAlignment == VerticalAlignment.Strech) {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.isParentSlotHeightCalculatable = true;
                        child.parentSlotHeight = this.parentSlotHeight - this.margin.top - this.margin.bottom;
                        if (child instanceof ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.isParentSlotHeightCalculatable = false;
                        if (child instanceof ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }
        };
        HorizonalLinearLayout2.prototype.assembleDom = function () {
            this.cellBorderArray = [];
            $(this.getRootElement()).empty();
            for (var i = 0; i < this.cellDefinations.length; i++) {
                var border = new Border('');
                border.initCalculableSlots();
                this.cellBorderArray.push(border);
                $(this.getRootElement()).append(border.getRootElement());
            }
            for (var j = 0; j < this.children.length; j++) {
                var border = this.cellBorderArray[this.cellIndexArray[j]];
                var child = this.children[j];
                child.assembleDom();
                border.addChild(child);
                border.assembleDom();
            }
        };
        HorizonalLinearLayout2.prototype.doLayout = function () {
            var weightSum = 0;
            var fixSum = 0;
            for (var i = 0; i < this.cellDefinations.length; i++) {
                var cellDefination = this.cellDefinations[i];
                if (cellDefination.type == DistanceType.weight)
                    weightSum += cellDefination.value;
                if (cellDefination.type == DistanceType.fixed)
                    fixSum += cellDefination.value;
            }
            $(this.getRootElement()).css('position', 'absolute');
            $(this.getRootElement()).css('width', this.estimateWidth() + 'px');
            $(this.getRootElement()).css('height', this.estimateHeight() + 'px');
            var pos = 0;
            for (var j = 0; j < this.cellDefinations.length; j++) {
                var cellDefination = this.cellDefinations[j];
                var border = this.cellBorderArray[j];
                $(border.getRootElement()).css('position', 'absolute');
                $(border.getRootElement()).css('top', '0px');
                $(border.getRootElement()).css('bottom', '0px');
                var cellw = 0;
                if (cellDefination.type == DistanceType.fixed) {
                    cellw = cellDefination.value;
                }
                else if (cellDefination.type == DistanceType.weight) {
                    cellw = (this.estimateWidth() - fixSum) * cellDefination.value / weightSum;
                }
                $(border.getRootElement()).css('left', pos + 'px');
                border.width = new Distance(DistanceType.fixed, cellw);
                border.height = new Distance(DistanceType.auto, 0);
                border.verticalAlignment = VerticalAlignment.Strech;
                border.isParentSlotHeightCalculatable = true;
                border.parentSlotHeight = this.estimateHeight();
                pos += cellw;
                border.doLayout();
            }
        };
        HorizonalLinearLayout2.prototype.estimateWidth = function () {
            if (this.isParentSlotWidthCalculatable) {
                if (this.horizonAlignment == HorizonAlignment.Center
                    || this.horizonAlignment == HorizonAlignment.Left
                    || this.horizonAlignment == HorizonAlignment.Right) {
                    if (this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }
                    else if (this.width.type == DistanceType.auto) {
                        if (this.children.length > 0) {
                            var widthlist = this.children.map(function (t) { return t.estimateWidth() + t.margin.left + t.margin.right; });
                            widthlist.sort(function (a, b) { return b - a; });
                            return widthlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.horizonAlignment == HorizonAlignment.Strech) {
                    return this.parentSlotWidth - this.margin.left - this.margin.right;
                }
            }
            else {
                if (this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }
                else if (this.width.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        var widthlist = this.children.map(function (t) { return t.estimateWidth() + t.margin.left + t.margin.right; });
                        widthlist.sort(function (a, b) { return b - a; });
                        return widthlist[0];
                    }
                    return 0;
                }
            }
        };
        HorizonalLinearLayout2.prototype.estimateHeight = function () {
            if (this.isParentSlotHeightCalculatable) {
                if (this.verticalAlignment == VerticalAlignment.Center
                    || this.verticalAlignment == VerticalAlignment.Top
                    || this.verticalAlignment == VerticalAlignment.Bottom) {
                    if (this.height.type == DistanceType.fixed) {
                        return this.height.value;
                    }
                    else if (this.height.type == DistanceType.auto) {
                        if (this.children.length > 0) {
                            var heightlist = this.children.map(function (t) { return t.estimateHeight() + t.margin.top + t.margin.bottom; });
                            heightlist.sort().reverse();
                            return heightlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.verticalAlignment == VerticalAlignment.Strech) {
                    return this.parentSlotHeight - this.margin.top - this.margin.bottom;
                }
            }
            else {
                if (this.height.type == DistanceType.fixed) {
                    return this.height.value;
                }
                else if (this.height.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        var heightlist = this.children.map(function (t) { return t.estimateHeight() + t.margin.top + t.margin.bottom; });
                        heightlist.sort().reverse();
                        return heightlist[0];
                    }
                    return 0;
                }
            }
        };
        return HorizonalLinearLayout2;
    }(ContainerControl));
    LayoutLzg.HorizonalLinearLayout2 = HorizonalLinearLayout2;
    var VerticalLinearLayout2 = /** @class */ (function (_super) {
        __extends(VerticalLinearLayout2, _super);
        function VerticalLinearLayout2(name) {
            var _this = _super.call(this, name) || this;
            _this.cellIndexArray = [];
            _this.cellDefinations = [];
            _this.cellBorderArray = [];
            return _this;
        }
        VerticalLinearLayout2.prototype.addCell = function (distance) {
            this.cellDefinations.push(distance);
        };
        VerticalLinearLayout2.prototype.addChild = function (control) {
            _super.prototype.addChild.call(this, control);
            this.cellIndexArray.push(0);
        };
        VerticalLinearLayout2.prototype.removeChild = function (control) {
            _super.prototype.removeChild.call(this, control);
            var idx = this.children.indexOf(control);
            if (idx > -1)
                this.cellIndexArray.splice(idx, 1);
        };
        VerticalLinearLayout2.prototype.clearChild = function () {
            _super.prototype.clearChild.call(this);
            this.cellIndexArray = [];
        };
        VerticalLinearLayout2.prototype.setCell = function (control, cellIndex) {
            var idx = this.children.indexOf(control);
            if (idx > -1) {
                this.cellIndexArray[idx] = cellIndex;
            }
        };
        VerticalLinearLayout2.prototype.getRootElement = function () {
            if (this.rootElem == null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type', 'HorizonalLinearLayout');
                $(this.rootElem).attr('layout-name', this.name);
            }
            return this.rootElem;
        };
        VerticalLinearLayout2.prototype.initCalculableSlots = function () {
            var weightSum = 0;
            for (var i = 0; i < this.cellDefinations.length; i++) {
                var cellDefination = this.cellDefinations[i];
                if (cellDefination.type == DistanceType.weight)
                    weightSum += cellDefination.value;
            }
            if (this.height.type == DistanceType.fixed) {
                for (var i = 0; i < this.cellDefinations.length; i++) {
                    var cellDefination = this.cellDefinations[i];
                    if (cellDefination.type == DistanceType.fixed) {
                        for (var j = 0; j < this.children.length; j++) {
                            if (this.cellIndexArray[j] == i) {
                                var child = this.children[j];
                                child.isParentSlotHeightCalculatable = true;
                                child.parentSlotHeight = cellDefination.value;
                                if (child instanceof ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                    else if (cellDefination.type == DistanceType.weight) {
                        for (var j = 0; j < this.children.length; j++) {
                            if (this.cellIndexArray[j] == i) {
                                var child = this.children[j];
                                child.isParentSlotHeightCalculatable = true;
                                child.parentSlotHeight = this.height.value * cellDefination.value / weightSum;
                                if (child instanceof ContainerControl) {
                                    var container = child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (this.isParentSlotHeightCalculatable && this.horizonAlignment == HorizonAlignment.Strech) {
                    for (var i = 0; i < this.cellDefinations.length; i++) {
                        var cellDefination = this.cellDefinations[i];
                        if (cellDefination.type == DistanceType.fixed) {
                            for (var j = 0; j < this.children.length; j++) {
                                if (this.cellIndexArray[j] == i) {
                                    var child = this.children[j];
                                    child.isParentSlotHeightCalculatable = true;
                                    child.parentSlotHeight = this.parentSlotHeight - this.margin.top - this.margin.bottom;
                                    if (child instanceof ContainerControl) {
                                        var container = child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                        else {
                            for (var j = 0; j < this.children.length; j++) {
                                if (this.cellIndexArray[j] == i) {
                                    var child = this.children[j];
                                    child.isParentSlotHeightCalculatable = false;
                                    if (child instanceof ContainerControl) {
                                        var container = child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.cellDefinations.length; i++) {
                        var cellDefination = this.cellDefinations[i];
                        if (cellDefination.type == DistanceType.fixed) {
                            for (var j = 0; j < this.children.length; j++) {
                                if (this.cellIndexArray[j] == i) {
                                    var child = this.children[j];
                                    child.isParentSlotHeightCalculatable = false;
                                    if (child instanceof ContainerControl) {
                                        var container = child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (this.width.type == DistanceType.fixed) {
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    child.isParentSlotWidthCalculatable = true;
                    child.parentSlotWidth = this.width.value;
                    if (child instanceof ContainerControl) {
                        var container = child;
                        container.initCalculableSlots();
                    }
                }
            }
            else {
                if (this.isParentSlotWidthCalculatable && this.verticalAlignment == VerticalAlignment.Strech) {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.isParentSlotWidthCalculatable = true;
                        child.parentSlotWidth = this.parentSlotWidth - this.margin.left - this.margin.right;
                        if (child instanceof ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        child.isParentSlotWidthCalculatable = false;
                        if (child instanceof ContainerControl) {
                            var container = child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }
        };
        VerticalLinearLayout2.prototype.assembleDom = function () {
            this.cellBorderArray = [];
            $(this.getRootElement()).empty();
            for (var i = 0; i < this.cellDefinations.length; i++) {
                var border = new Border('');
                border.initCalculableSlots();
                this.cellBorderArray.push(border);
                $(this.getRootElement()).append(border.getRootElement());
            }
            for (var j = 0; j < this.children.length; j++) {
                var border = this.cellBorderArray[this.cellIndexArray[j]];
                var child = this.children[j];
                child.assembleDom();
                border.addChild(child);
                border.assembleDom();
            }
        };
        VerticalLinearLayout2.prototype.doLayout = function () {
            var weightSum = 0;
            var fixSum = 0;
            for (var i = 0; i < this.cellDefinations.length; i++) {
                var cellDefination = this.cellDefinations[i];
                if (cellDefination.type == DistanceType.weight)
                    weightSum += cellDefination.value;
                if (cellDefination.type == DistanceType.fixed)
                    fixSum += cellDefination.value;
            }
            $(this.getRootElement()).css('position', 'absolute');
            $(this.getRootElement()).css('width', this.estimateWidth() + 'px');
            $(this.getRootElement()).css('height', this.estimateHeight() + 'px');
            var pos = 0;
            for (var j = 0; j < this.cellDefinations.length; j++) {
                var cellDefination = this.cellDefinations[j];
                var border = this.cellBorderArray[j];
                $(border.getRootElement()).css('position', 'absolute');
                $(border.getRootElement()).css('left', '0px');
                $(border.getRootElement()).css('right', '0px');
                var cellh = 0;
                if (cellDefination.type == DistanceType.fixed) {
                    cellh = cellDefination.value;
                }
                else if (cellDefination.type == DistanceType.weight) {
                    cellh = (this.estimateHeight() - fixSum) * cellDefination.value / weightSum;
                }
                $(border.getRootElement()).css('top', pos + 'px');
                border.height = new Distance(DistanceType.fixed, cellh);
                border.width = new Distance(DistanceType.auto, 0);
                border.horizonAlignment = HorizonAlignment.Strech;
                border.isParentSlotWidthCalculatable = true;
                border.parentSlotWidth = this.estimateWidth();
                pos += cellh;
                border.doLayout();
            }
        };
        VerticalLinearLayout2.prototype.estimateWidth = function () {
            if (this.isParentSlotWidthCalculatable) {
                if (this.horizonAlignment == HorizonAlignment.Center
                    || this.horizonAlignment == HorizonAlignment.Left
                    || this.horizonAlignment == HorizonAlignment.Right) {
                    if (this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }
                    else if (this.width.type == DistanceType.auto) {
                        if (this.children.length > 0) {
                            var widthlist = this.children.map(function (t) { return t.estimateWidth() + t.margin.left + t.margin.right; });
                            widthlist.sort(function (a, b) { return b - a; });
                            return widthlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.horizonAlignment == HorizonAlignment.Strech) {
                    return this.parentSlotWidth - this.margin.left - this.margin.right;
                }
            }
            else {
                if (this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }
                else if (this.width.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        var widthlist = this.children.map(function (t) { return t.estimateWidth() + t.margin.left + t.margin.right; });
                        widthlist.sort(function (a, b) { return b - a; });
                        return widthlist[0];
                    }
                    return 0;
                }
            }
        };
        VerticalLinearLayout2.prototype.estimateHeight = function () {
            if (this.isParentSlotHeightCalculatable) {
                if (this.verticalAlignment == VerticalAlignment.Center
                    || this.verticalAlignment == VerticalAlignment.Top
                    || this.verticalAlignment == VerticalAlignment.Bottom) {
                    if (this.height.type == DistanceType.fixed) {
                        return this.height.value;
                    }
                    else if (this.height.type == DistanceType.auto) {
                        if (this.children.length > 0) {
                            var heightlist = this.children.map(function (t) { return t.estimateHeight() + t.margin.top + t.margin.bottom; });
                            heightlist.sort().reverse();
                            return heightlist[0];
                        }
                        return 0;
                    }
                }
                else if (this.verticalAlignment == VerticalAlignment.Strech) {
                    return this.parentSlotHeight - this.margin.top - this.margin.bottom;
                }
            }
            else {
                if (this.height.type == DistanceType.fixed) {
                    return this.height.value;
                }
                else if (this.height.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        var heightlist = this.children.map(function (t) { return t.estimateHeight() + t.margin.top + t.margin.bottom; });
                        heightlist.sort().reverse();
                        return heightlist[0];
                    }
                    return 0;
                }
            }
        };
        return VerticalLinearLayout2;
    }(ContainerControl));
    LayoutLzg.VerticalLinearLayout2 = VerticalLinearLayout2;
})(LayoutLzg || (LayoutLzg = {}));
//# sourceMappingURL=layout3.js.map