

enum HorizonAlignment {
    Strech,
    Left,
    Right,
    Center
}

enum VerticalAlignment{
    Strech,
    Top,
    Bottom,
    Center
}

enum DistanceType{
    auto,
    fixed,
    weight
}

enum StackPanelOrientation {
    Horizonal,
    Vertical
}
enum DockStyle{
    Left,Right,Top,Bottom,Fill
}

class Brush{

}

class Thickness{
    left:number;
    right:number;
    top:number;
    bottom:number;

    constructor(left: number, right: number, top: number, bottom: number) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }
}

class Distance{
    value:number;
    type:DistanceType;

    constructor(type: DistanceType, value: number) {
        this.value = value;
        this.type = type;
    }
}

class Control {
    name:string;
    fill:Brush;
    stroke:Brush;
    strokeThickness:Thickness;
    width:Distance;
    height:Distance;
    horizonAlignment : HorizonAlignment;
    verticalAlignment : VerticalAlignment;
    margin:Thickness;

    isSlotWidthCalculatable : false;
    isSlotHeightCalculatable : false;
    slotWidth:number;
    slotHeight:number;

    constructor(name:string){
        this.name = name;
        this.horizonAlignment = HorizonAlignment.Strech;
        this.verticalAlignment = VerticalAlignment.Strech;
        this.margin = new Thickness(0,0,0,0);
        this.width = new Distance(DistanceType.fixed,50);
        this.height = new Distance(DistanceType.fixed,50);
    }

    estimateWidth():number {
        return 0;
    }

    estimateHeight():number{
        return 0;
    }

    doLayout():void {
    }

    getRootElement():HTMLElement {
        return null;
    }

}

class ContainerControl extends Control{
    children:Array<Control>;

    isWidthCalculatable:boolean;
    isHeightCalculatable:boolean;
    calculatedWidth:number;
    calculatedHeight:number;

    constructor(name:string) {
        super(name);
        this.children= [];
    }

    addChild(control:Control) {
        this.children.push(control);
    }

    removeChild(control:Control) {
        const idx = this.children.indexOf(control);
        if(idx>-1)
            this.children.splice(idx,1);
    }

    clearChild():void{
        this.children = [];
    }

}

class HtmlLiteral extends Control{
    html:string;
    constructor(name:string,html:string){
        super(name);
        this.html = html;
    }

    rootElem: HTMLElement;
    contentElem: HTMLElement;


    estimateWidth(): number {
        return this.rootElem.clientWidth;
    }

    estimateHeight(): number {
        return this.rootElem.clientHeight;
    }

    getRootElement():HTMLElement {
        if(this.rootElem==null){
            this.rootElem = document.createElement("div");
        }
        if(this.contentElem==null) {
            this.contentElem = $(this.html)[0];
        }
        $(this.rootElem).empty();
        $(this.rootElem).append(this.contentElem);
        return this.rootElem;
    }

    doLayout(): void {
        $(this.rootElem).css('position','absolute');

        if(this.horizonAlignment==HorizonAlignment.Left){
            $(this.rootElem).css('left','0px');
        }else if(this.horizonAlignment==HorizonAlignment.Right){
            $(this.rootElem).css('right','0px');
        }else if(this.horizonAlignment==HorizonAlignment.Center){
            let left = ($(this.rootElem).parent()[0].clientWidth - this.estimateWidth())/2;
            $(this.rootElem).css('left',left+'px');
        }else if(this.horizonAlignment==HorizonAlignment.Strech){
            $(this.rootElem).css('left','0px');
        }

        if(this.verticalAlignment==VerticalAlignment.Top){
            $(this.rootElem).css('top','0px');
        }else if(this.verticalAlignment==VerticalAlignment.Bottom){
            $(this.rootElem).css('bottom','0px');
        }else if(this.verticalAlignment==VerticalAlignment.Center){
            let top = ($(this.rootElem).parent()[0].clientHeight - this.estimateHeight())/2;
            $(this.rootElem).css('top',top+'px');
        }else if(this.verticalAlignment==VerticalAlignment.Strech){
            $(this.rootElem).css('top','0px');
        }
    }
}

class TextLiteral extends Control {
    text:string;
    wordWrap:boolean;
    constructor(name:string,text:string){
        super(name);
        this.text = text;
    }

    rootElem: HTMLElement;
    contentElem: HTMLElement;


    estimateWidth(): number {
        return this.rootElem.clientWidth;
    }

    estimateHeight(): number {
        return this.rootElem.clientHeight;
    }

    getRootElement():HTMLElement {
        if(this.rootElem==null){
            this.rootElem = document.createElement("div");
        }
        if(this.contentElem==null) {
            let span = $('<span></span>');
            span.text(this.text);
            this.contentElem = span[0];
        }
        $(this.rootElem).empty();
        $(this.rootElem).append(this.contentElem);
        return this.rootElem;
    }

    doLayout(): void {
        $(this.rootElem).css('position','absolute');
        if(this.wordWrap)
            $(this.contentElem).css('word-break','break-all');

        if(this.horizonAlignment==HorizonAlignment.Left){
            $(this.rootElem).css('left','0px');
        }else if(this.horizonAlignment==HorizonAlignment.Right){
            $(this.rootElem).css('right','0px');
        }else if(this.horizonAlignment==HorizonAlignment.Center){
            let left = ($(this.rootElem).parent()[0].clientWidth - this.estimateWidth())/2;
            $(this.rootElem).css('left',left+'px');
        }else if(this.horizonAlignment==HorizonAlignment.Strech){
            $(this.rootElem).css('left','0px');
        }

        if(this.verticalAlignment==VerticalAlignment.Top){
            $(this.rootElem).css('top','0px');
        }else if(this.verticalAlignment==VerticalAlignment.Bottom){
            $(this.rootElem).css('bottom','0px');
        }else if(this.verticalAlignment==VerticalAlignment.Center){
            let top = ($(this.rootElem).parent()[0].clientHeight - this.estimateHeight())/2;
            $(this.rootElem).css('top',top+'px');
        }else if(this.verticalAlignment==VerticalAlignment.Strech){
            $(this.rootElem).css('top','0px');
        }
    }
}

class Layout extends ContainerControl{

    childX:Array<number>;
    childY:Array<number>;
    childWidth:Array<number>;
    childHeight:Array<number>;
    padding:Thickness;

    constructor(name:string) {
        super(name);
        this.childX = [];
        this.childY = [];
        this.childWidth = [];
        this.childHeight = [];
        this.padding = new Thickness(0,0,0,0);
    }


    addChild(control: Control): void {
        super.addChild(control);
    }

    calculateChildContainerX():void{
        for(let i=0;i<this.children.length;i++){
            let child = this.children[i];
            this.childX[i] = child.margin.left + this.padding.left;
        }
    }

    calculateChildContainerY():void{
        for(let i=0;i<this.children.length;i++){
            let child = this.children[i];
            this.childY[i] = child.margin.top + this.padding.top;
        }
    }

    calculateChildContainerWidth():void{
        if(this.width.type==DistanceType.fixed){
            for(let i=0;i<this.children.length;i++){
                let child = this.children[i];
                this.childWidth[i] = this.width.value - this.padding.left - this.padding.right - child.margin.left-child.margin.right;
            }
        }else{
            if(this.children.length>0){
                let childwidthlist = this.children.map(t=>t.estimateWidth()+t.margin.left+t.margin.right);
                let maxwidth = childwidthlist.sort().reverse()[0];
                for(let i=0;i<this.children.length;i++){
                    this.childWidth[i] = maxwidth;
                }
            }else{
                for(let i=0;i<this.children.length;i++){
                    this.childWidth[i] = 0;
                }
            }
        }
    }

    calculateChildContainerHeight():void{
        if(this.height.type==DistanceType.fixed){
            for(let i=0;i<this.children.length;i++){
                let child = this.children[i];
                this.childHeight[i] = this.height.value - this.padding.top - this.padding.bottom - child.margin.top-child.margin.bottom;
            }
        }else{
            if(this.children.length>0){
                let childheightlist = this.children.map(t=>t.estimateHeight()+t.margin.top+t.margin.bottom);
                let maxheight = childheightlist.sort().reverse()[0];
                for(let i=0;i<this.children.length;i++){
                    this.childHeight[i] = maxheight;
                }
            }else{
                for(let i=0;i<this.children.length;i++){
                    this.childHeight[i] = 0;
                }
            }
        }

    }

    estimateWidth(): number {
        if (this.isSlotWidthCalculatable){
            if(this.width.type==DistanceType.fixed){
                return this.width.value;
            }else if(this.width.type==DistanceType.auto){
                if(this.horizonAlignment==HorizonAlignment.Left
                    ||this.horizonAlignment==HorizonAlignment.Right
                    ||this.horizonAlignment==HorizonAlignment.Center)
                {
                    if(this.children.length>0){
                        let childwidthlist = this.children.map(t=>t.estimateWidth()+t.margin.left+t.margin.right);
                        let maxwidth = childwidthlist.sort().reverse()[0];
                        return maxwidth + this.padding.left+this.padding.right;
                    }else{
                        return this.padding.left+this.padding.right;
                    }
                }else if(this.horizonAlignment==HorizonAlignment.Strech){
                    return this.slotWidth;
                }
            }
        }else{
            if(this.width.type==DistanceType.fixed){
                return this.width.value;
            }else{
                if(this.children.length>0){
                    let childwidthlist = this.children.map(t=>t.estimateWidth()+t.margin.left+t.margin.right);
                    let maxwidth = childwidthlist.sort().reverse()[0];
                    return maxwidth + this.padding.left+this.padding.right;
                }else{
                    return this.padding.left+this.padding.right;
                }
            }
        }
        return 0;
    }

    estimateHeight(): number {
        if (this.isSlotHeightCalculatable){
            if(this.height.type==DistanceType.fixed){
                return this.height.value;
            }else if(this.height.type==DistanceType.auto){
                if(this.verticalAlignment==VerticalAlignment.Top
                    ||this.verticalAlignment==VerticalAlignment.Bottom
                    ||this.verticalAlignment==VerticalAlignment.Center)
                {
                    if(this.children.length>0){
                        let childheightlist = this.children.map(t=>t.estimateHeight()+t.margin.top+t.margin.bottom);
                        let maxheight = childheightlist.sort().reverse()[0];
                        return maxheight + this.padding.top+this.padding.bottom;
                    }else{
                        return this.padding.top+this.padding.bottom;
                    }
                }else if(this.verticalAlignment==VerticalAlignment.Strech){
                    return this.slotHeight;
                }
            }
        }else{
            if(this.height.type==DistanceType.fixed){
                return this.height.value;
            }else{
                if(this.children.length>0){
                    let childheightlist = this.children.map(t=>t.estimateHeight()+t.margin.top+t.margin.bottom);
                    let maxheight = childheightlist.sort().reverse()[0];
                    return maxheight + this.padding.top+this.padding.bottom;
                }else{
                    return this.padding.top+this.padding.bottom;
                }
            }
        }
        return 0;
    }

    rootElem:HTMLElement;

    doLayout(): void {

        this.calculateChildContainerX();
        this.calculateChildContainerY();
        this.calculateChildContainerWidth();
        this.calculateChildContainerHeight();

        $(this.rootElem).css('position','absolute');
        $(this.rootElem).css('width',this.estimateWidth()+'px');
        $(this.rootElem).css('height',this.estimateHeight()+'px');
        $(this.rootElem).empty();
        for(let i=0;i<this.children.length;i++){
            let container = $("<div></div>");
            let x = this.childX[i];
            let y = this.childY[i];
            let w = this.childWidth[i];
            let h = this.childHeight[i];
            container.css('left',x+'px');
            container.css('top',y+'px');
            container.css('width',w+'px');
            container.css('height',h+'px');
            container.css('position','absolute');
            $(this.rootElem).append(container);

            let child = this.children[i];
            container.append(child.getRootElement());
            child.doLayout();
        }
    }

    getRootElement(): HTMLElement {
        if(this.rootElem==null){
            this.rootElem = $("<div></div>")[0];
        }
        $(this.rootElem).attr('layout-type','Layout');
        return this.rootElem;
    }
}

class StackPanel extends ContainerControl {

    orientation : StackPanelOrientation;
    padding : Thickness;

    constructor(name:string) {
        super(name);
        this.orientation = StackPanelOrientation.Vertical;
        this.padding = new Thickness(0,0,0,0);
    }

    rootElem:HTMLElement;

    doLayout(): void {
        if(this.width.type==DistanceType.fixed){
            $(this.rootElem).css('width',this.width.value+"px");
        }else{
            $(this.rootElem).css('width',"auto");
        }

        if(this.height.type==DistanceType.fixed){
            $(this.rootElem).css('height',this.height.value+"px");
        }

        if(this.orientation==StackPanelOrientation.Horizonal){
            $(this.rootElem).css('white-space',"nowrap");
        }


        $(this.rootElem).empty();
        for(let i=0;i<this.children.length;i++){
            let child = this.children[i];
            let childelem = child.getRootElement();
            let marginWrapper = $('<div></div>');
            let layoutWrapper = $('<div></div>');
            let outerWrapper = $('<div style="overflow: hidden"></div>');
            outerWrapper.append(layoutWrapper);
            layoutWrapper.append(marginWrapper);
            $(this.rootElem).append(outerWrapper);

            marginWrapper.css('margin-left',child.margin.left+'px');
            marginWrapper.css('margin-right',child.margin.right+'px');
            marginWrapper.css('margin-top',child.margin.top+'px');
            marginWrapper.css('margin-bottom',child.margin.bottom+'px');
            marginWrapper.append(childelem);

            if(this.orientation==StackPanelOrientation.Horizonal){
                outerWrapper.css('display','inline-block');
                outerWrapper.css('height','100%');
                outerWrapper.css('overflow','hidden');
                layoutWrapper.css('display','flex');
                layoutWrapper.css('height','100%');

                if(child.verticalAlignment==VerticalAlignment.Top){
                    layoutWrapper.css('justify-content','flex-start');
                    layoutWrapper.css('align-items','flex-start');
                }else if(child.verticalAlignment==VerticalAlignment.Bottom){
                    layoutWrapper.css('justify-content','flex-end');
                    layoutWrapper.css('align-items','flex-end');
                }else if(child.verticalAlignment==VerticalAlignment.Center){
                    layoutWrapper.css('justify-content','center');
                    layoutWrapper.css('align-items','center');
                }else if(child.verticalAlignment==VerticalAlignment.Strech){
                    layoutWrapper.css('width','100%');
                    layoutWrapper.css('height','100%');
                }

            }else if(this.orientation==StackPanelOrientation.Vertical){
                layoutWrapper.css('display','flex');
                if(child.horizonAlignment==HorizonAlignment.Left){
                    layoutWrapper.css('justify-content','flex-start');
                    layoutWrapper.css('align-items','flex-start');
                }else if(child.horizonAlignment==HorizonAlignment.Right){
                    layoutWrapper.css('justify-content','flex-end');
                    layoutWrapper.css('align-items','flex-end');
                }else if(child.horizonAlignment==HorizonAlignment.Center){
                    layoutWrapper.css('justify-content','center');
                    layoutWrapper.css('align-items','center');
                }else if(child.horizonAlignment==HorizonAlignment.Strech){
                    layoutWrapper.css('width','100%');
                    layoutWrapper.css('height','100%');
                }
            }
        }
    }

    getRootElement(): HTMLElement {
        if(this.rootElem==null){
            this.rootElem = $("<div></div>")[0];
            $(this.rootElem).attr('layout-type','StackPanel');
        }
        return this.rootElem;
    }

    estimateWidth(): number {
        if(this.width.type==DistanceType.fixed){
            return this.width.value;
        }else{
            if(this.children.length>0){
                if(this.orientation==StackPanelOrientation.Horizonal){
                    let sum = 0;
                    for (let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        sum += child.estimateWidth()+child.margin.left+this.margin.right;
                    }
                    return sum;
                }else if(this.orientation==StackPanelOrientation.Vertical){
                    let childwidthlist = this.children.map(t=>t.estimateWidth()+t.margin.left+t.margin.right);
                    let maxwidth = childwidthlist.sort().reverse()[0];
                    return maxwidth + this.padding.left+this.padding.right;
                }
                return 0;
            }else{
                return this.padding.left+this.padding.right;
            }
        }
    }

    estimateHeight(): number {
        if(this.height.type==DistanceType.fixed){
            return this.height.value;
        }else{
            if(this.children.length>0){
                if(this.orientation==StackPanelOrientation.Horizonal){
                    let childwidthlist = this.children.map(t=>t.estimateWidth()+t.margin.left+t.margin.right);
                    let maxwidth = childwidthlist.sort().reverse()[0];
                    return maxwidth + this.padding.left+this.padding.right;
                }else if(this.orientation==StackPanelOrientation.Vertical){
                    let sum = 0;
                    for (let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        sum += child.estimateHeight()+child.margin.top+this.margin.bottom;
                    }
                    return sum;
                }
                return 0;
            }else{
                return this.padding.top+this.padding.bottom;
            }
        }
    }

}

class HorizonalLinearLayout extends ContainerControl {

    cellDefinations:Array<Distance>;
    distArray:Array<number>;
    widthArray:Array<number>;
    cellIndexArray:Array<number>;

    constructor(name:string) {
        super(name);
        this.cellDefinations = [];
        this.distArray = [];
        this.widthArray = [];
        this.cellIndexArray = [];

    }

    addCell(distance:Distance) {
        this.cellDefinations.push(distance);
    }

    rootElem:HTMLElement;


    addChild(control: Control): void {
        super.addChild(control);
        this.cellIndexArray.push(0);
    }

    removeChild(control: Control): void {
        super.removeChild(control);
        const idx = this.children.indexOf(control);
        if(idx>-1)
            this.cellIndexArray.splice(idx,1);
    }

    clearChild(): void {
        super.clearChild();
        this.cellIndexArray = [];
    }

    setCell(control:Control, cellIndex:number) {
        const idx = this.children.indexOf(control);
        if(idx>-1){
            this.cellIndexArray[idx] = cellIndex;
        }

    }

    doLayout(): void {
        $(this.rootElem).css('position','relative');
        $(this.rootElem).empty();
        let weightsum = 0;
        for (let i=0;i<this.cellDefinations.length;i++){
            let cellDef = this.cellDefinations[i];
            if(cellDef.type == DistanceType.weight){
                weightsum+=cellDef.value;
            }
        }
        let total = $(this.rootElem).parent()[0].clientWidth;
        let acc = 0;

        for (let i=0;i<this.cellDefinations.length;i++){
            let cellDef = this.cellDefinations[i];
            if(cellDef.type == DistanceType.weight){
                this.distArray[i] = acc;
                this.widthArray[i]= total * cellDef.value/weightsum;
                acc += total * cellDef.value/weightsum;;
            }else{
                this.distArray[i] = acc;
                this.widthArray[i]= cellDef.value;
                acc += cellDef.value;
            }
        }

        let wrapperDivArray = [];
        for (let i=0;i<this.cellDefinations.length;i++){
            let dist = this.distArray[i];
            let w = this.widthArray[i];
            let wrapperDiv = $("<div></div>");
            wrapperDiv.css('position','absolute');
            wrapperDiv.css('left',dist+'px');
            wrapperDiv.css('top','0px');
            wrapperDiv.css('width',w+'px');
            wrapperDiv.css('bottom','0px');
            wrapperDivArray.push(wrapperDiv);
            $(this.rootElem).append(wrapperDiv);
        }

        for (let i=0;i<this.children.length;i++){
            let child = this.children[i];
            let cellIndex = this.cellIndexArray[i];
            let wrapperDiv = wrapperDivArray[cellIndex];
            let layout = new Layout('');
            layout.width = new Distance(DistanceType.auto,0);
            layout.height = new Distance(DistanceType.auto,0);
            let layoutdiv = layout.getRootElement();
            $(layoutdiv).css('width','100%');
            $(layoutdiv).css('height','100%');
            wrapperDiv.append(layout.getRootElement());
            layout.addChild(child);
            layout.doLayout();
        }

    }

    getRootElement(): HTMLElement {
        if(this.rootElem==null) {
            this.rootElem = $("<div></div>")[0];
            $(this.rootElem).attr('layout-type','HorizonalLinearLayout');
        }
        return this.rootElem;
    }

    estimateWidth(): number {
        if(this.width.type==DistanceType.fixed){
            return this.width.value;
        }else{
        }
    }

    estimateHeight(): number {
        if(this.height.type==DistanceType.fixed){
            return this.height.value;
        }else{
        }
    }


}