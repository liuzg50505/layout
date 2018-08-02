module LayoutLzg{
    export class Control{
        name:string;
        width:Distance;
        height:Distance;
        horizonAlignment : HorizonAlignment;
        verticalAlignment : VerticalAlignment;
        margin:Thickness;

        isParentSlotWidthCalculatable : boolean;
        isParentSlotHeightCalculatable : boolean;
        parentSlotWidth:number;
        parentSlotHeight:number;

        rootElem:HTMLElement;

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

        getRootElement():HTMLElement {
            return null;
        }

        assembleDom():void {
        }

        doLayout():void{

        }

    }

    export class ContainerControl extends Control{
        children:Array<Control>;

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

        initCalculableSlots():void {
        }

    }

    export class Rect extends Control {

        rx:number;
        ry:number;


        constructor(name: string) {
            super(name);
            this.rx = 0;
            this.ry = 0;
        }

        estimateWidth(): number {
            if(this.isParentSlotWidthCalculatable){
                if (this.horizonAlignment==HorizonAlignment.Center
                    ||this.horizonAlignment==HorizonAlignment.Left
                    ||this.horizonAlignment==HorizonAlignment.Right)
                {
                    if(this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }else if(this.width.type == DistanceType.auto) {
                        return 0;
                    }
                }else if(this.horizonAlignment==HorizonAlignment.Strech){
                    return this.parentSlotWidth - this.margin.left - this.margin.right;
                }
            }else{
                if(this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }else if(this.width.type == DistanceType.auto) {
                        return 0;
                }
                return 0;
            }

        }

        estimateHeight(): number {
            return super.estimateHeight();
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
            }
            return this.rootElem;
        }

        assembleDom(): void {
            super.assembleDom();
        }

        doLayout(): void {
            super.doLayout();
        }
    }

    export class Border extends ContainerControl {

        wrapperDoms : Array<HTMLElement>;

        constructor(name:string) {
            super(name);
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type','Border');
                $(this.rootElem).attr('layout-name',this.name);
            }
            return this.rootElem;
        }

        initCalculableSlots():void {

            if(this.width.type == DistanceType.fixed){
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    child.isParentSlotWidthCalculatable = true;
                    child.parentSlotWidth = this.width.value;
                    if(child instanceof ContainerControl) {
                        let container:ContainerControl = <ContainerControl>child;
                        container.initCalculableSlots();
                    }
                }
            }else {
                if(this.isParentSlotWidthCalculatable && this.horizonAlignment==HorizonAlignment.Strech) {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.isParentSlotWidthCalculatable = true;
                        child.parentSlotWidth = this.parentSlotWidth - this.margin.left - this.margin.right;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }else {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.isParentSlotWidthCalculatable = false;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }

            if(this.height.type == DistanceType.fixed){
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    child.isParentSlotHeightCalculatable = true;
                    child.parentSlotHeight = this.height.value;
                    if(child instanceof ContainerControl) {
                        let container:ContainerControl = <ContainerControl>child;
                        container.initCalculableSlots();
                    }
                }
            }else {
                if(this.isParentSlotHeightCalculatable && this.verticalAlignment==VerticalAlignment.Strech) {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.isParentSlotHeightCalculatable = true;
                        child.parentSlotHeight = this.parentSlotHeight - this.margin.top - this.margin.bottom;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }else {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.isParentSlotHeightCalculatable = false;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }

        }

        assembleDom(): void {
            this.wrapperDoms = [];
            $(this.getRootElement()).empty();

            for(let i=0;i<this.children.length;i++){
                let child = this.children[i];
                child.assembleDom();

                let wrapperDiv = $("<div></div>")[0];
                $(wrapperDiv).attr('layout-tag','wrapper');
                this.wrapperDoms.push(wrapperDiv);
                $(this.getRootElement()).append(wrapperDiv);
                $(wrapperDiv).append(child.getRootElement());
            }
        }

        doLayout(): void {
            $(this.getRootElement()).css('position','absolute');
            $(this.getRootElement()).css('width',this.estimateWidth()+'px');
            $(this.getRootElement()).css('height',this.estimateHeight()+'px');

            for(let i=0;i<this.children.length;i++){
                let child = this.children[i];
                let wrapperDiv = this.wrapperDoms[i];
                child.doLayout();

                $(wrapperDiv).css('position','absolute');
                $(wrapperDiv).css('left',child.margin.left+'px');
                $(wrapperDiv).css('right',child.margin.right+'px');
                $(wrapperDiv).css('top',child.margin.top+'px');
                $(wrapperDiv).css('bottom',child.margin.bottom+'px');

                $(child.getRootElement()).css('position','absolute');
                if(child.horizonAlignment==HorizonAlignment.Left) {
                    $(child.getRootElement()).css('left','0px');
                }else if(child.horizonAlignment==HorizonAlignment.Right) {
                    $(child.getRootElement()).css('right','0px');
                }else if(child.horizonAlignment==HorizonAlignment.Strech){
                    $(child.getRootElement()).css('left','0px');
                    $(child.getRootElement()).css('right','0px');
                }else if(child.horizonAlignment==HorizonAlignment.Center){
                    let w = child.estimateWidth();
                    let ww = this.estimateWidth();
                    let x = (ww-w)/2;
                    $(child.getRootElement()).css('left',x+'px');
                }

                if(child.verticalAlignment==VerticalAlignment.Top) {
                    $(child.getRootElement()).css('top','0px');
                }else if(child.verticalAlignment==VerticalAlignment.Bottom) {
                    $(child.getRootElement()).css('bottom','0px');
                }else if(child.verticalAlignment==VerticalAlignment.Strech){
                    $(child.getRootElement()).css('top','0px');
                    $(child.getRootElement()).css('bottom','0px');
                }else if(child.verticalAlignment==VerticalAlignment.Center){
                    let h = child.estimateHeight();
                    let hh = this.estimateHeight();
                    let y = (hh-h)/2;
                    $(child.getRootElement()).css('top',y+'px');
                }

            }

        }

        estimateWidth(): number {
            if(this.isParentSlotWidthCalculatable){
                if (this.horizonAlignment==HorizonAlignment.Center
                    ||this.horizonAlignment==HorizonAlignment.Left
                    ||this.horizonAlignment==HorizonAlignment.Right)
                {
                    if(this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }else if(this.width.type == DistanceType.auto) {
                        if(this.children.length>0) {
                            let widthlist = this.children.map(t=>t.estimateWidth()+t.margin.left+t.margin.right);
                            widthlist.sort((a,b)=>b-a);
                            return widthlist[0];
                        }
                        return 0;
                    }
                }else if(this.horizonAlignment==HorizonAlignment.Strech){
                    return this.parentSlotWidth - this.margin.left - this.margin.right;
                }
            }else{
                if(this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }else if(this.width.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        let widthlist = this.children.map(t => t.estimateWidth() + t.margin.left + t.margin.right);
                        widthlist.sort((a,b)=>b-a);
                        return widthlist[0];
                    }
                    return 0;
                }
            }
        }

        estimateHeight(): number {
            if(this.isParentSlotHeightCalculatable){
                if (this.verticalAlignment==VerticalAlignment.Center
                    ||this.verticalAlignment==VerticalAlignment.Top
                    ||this.verticalAlignment==VerticalAlignment.Bottom)
                {
                    if(this.height.type == DistanceType.fixed) {
                        return this.height.value;
                    }else if(this.height.type == DistanceType.auto) {
                        if(this.children.length>0) {
                            let heightlist = this.children.map(t=>t.estimateHeight()+t.margin.top+t.margin.bottom);
                            heightlist.sort().reverse();
                            return heightlist[0];
                        }
                        return 0;
                    }
                }else if(this.verticalAlignment==VerticalAlignment.Strech){
                    return this.parentSlotHeight - this.margin.top - this.margin.bottom;
                }
            }else{
                if(this.height.type == DistanceType.fixed) {
                    return this.height.value;
                }else if(this.height.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        let heightlist = this.children.map(t => t.estimateHeight() + t.margin.top + t.margin.bottom);
                        heightlist.sort().reverse();
                        return heightlist[0];
                    }
                    return 0;
                }
            }
        }
    }

    export class TextView extends Control {

        text:string;
        wordWrap:boolean;
        spanElem:HTMLElement;

        constructor(name: string,text:string) {
            super(name);
            this.text = text;
            this.width = new Distance(DistanceType.auto,0);
            this.height = new Distance(DistanceType.auto,0);
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type','TextView');
                $(this.rootElem).attr('layout-name',this.name);
            }
            return this.rootElem;
        }

        estimateWidth(): number {
            if(this.width.type==DistanceType.fixed) {
                return this.width.value;
            }
            let t = $(this.getRootElement()).find('span').width();
            return t;
        }

        estimateHeight(): number {
            if(this.height.type==DistanceType.fixed) {
                return this.height.value;
            }

            return $(this.getRootElement()).find('span').height();
        }

        assembleDom(): void {
            this.spanElem = $("<span></span>")[0];
            $(this.getRootElement()).empty();
            if(this.width.type==DistanceType.fixed) $(this.getRootElement()).css('width',this.width.value+'px');
            if(this.height.type==DistanceType.fixed) $(this.getRootElement()).css('height',this.height.value+'px');
            $(this.getRootElement()).append(this.spanElem);
            $(this.spanElem).text(this.text);
            if(this.wordWrap)
                $(this.spanElem).css('word-break','break-all');
            else
                $(this.spanElem).css('word-break','normal');

        }

        doLayout(): void {
        }
    }

    export class HorizonalLinearLayout extends ContainerControl {
        wrapperDoms : Array<HTMLElement>;
        cellWrapperDoms : Array<HTMLElement>;
        cellDefinations:Array<Distance>;
        cellIndexArray:Array<number>;
        distArray:Array<number>;
        widthArray:Array<number>;


        constructor(name:string) {
            super(name);
            this.cellIndexArray=[];
            this.cellDefinations = [];
            this.wrapperDoms = [];
            this.cellWrapperDoms = [];
        }

        addCell(distance:Distance) {
            this.cellDefinations.push(distance);
        }

        addChild(control: LayoutLzg.Control): void {
            super.addChild(control);
            this.cellIndexArray.push(0);
        }

        removeChild(control: LayoutLzg.Control): void {
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

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type','HorizonalLinearLayout');
                $(this.rootElem).attr('layout-name',this.name);
            }
            return this.rootElem;
        }

        initCalculableSlots():void {
            let weightSum = 0;
            for (let i=0;i<this.cellDefinations.length;i++) {
                let cellDefination = this.cellDefinations[i];
                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
            }

            if(this.width.type == DistanceType.fixed){
                for (let i=0;i<this.cellDefinations.length;i++){
                    let cellDefination = this.cellDefinations[i];
                    if(cellDefination.type==DistanceType.fixed){
                        for (let j=0;j<this.children.length;j++){
                            if(this.cellIndexArray[j]==i){
                                let child = this.children[j];
                                child.isParentSlotWidthCalculatable = true;
                                child.parentSlotWidth = cellDefination.value;
                                if(child instanceof ContainerControl) {
                                    let container:ContainerControl = <ContainerControl>child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }else if(cellDefination.type==DistanceType.weight){
                        for (let j=0;j<this.children.length;j++){
                            if(this.cellIndexArray[j]==i){
                                let child = this.children[j];
                                child.isParentSlotWidthCalculatable = true;
                                child.parentSlotWidth = this.width.value*cellDefination.value/weightSum;
                                if(child instanceof ContainerControl) {
                                    let container:ContainerControl = <ContainerControl>child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                }
            }else {
                if(this.isParentSlotWidthCalculatable && this.horizonAlignment==HorizonAlignment.Strech) {
                    for (let i=0;i<this.cellDefinations.length;i++){
                        let cellDefination = this.cellDefinations[i];
                        if(cellDefination.type==DistanceType.fixed){
                            for (let j=0;j<this.children.length;j++){
                                if(this.cellIndexArray[j]==i){
                                    let child = this.children[j];
                                    child.isParentSlotWidthCalculatable = true;
                                    child.parentSlotWidth = this.parentSlotWidth - this.margin.left - this.margin.right;
                                    if(child instanceof ContainerControl) {
                                        let container:ContainerControl = <ContainerControl>child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }else{
                            for (let j=0;j<this.children.length;j++){
                                if(this.cellIndexArray[j]==i){
                                    let child = this.children[j];
                                    child.isParentSlotWidthCalculatable = false;
                                    if(child instanceof ContainerControl) {
                                        let container:ContainerControl = <ContainerControl>child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }else {
                    for (let i=0;i<this.cellDefinations.length;i++){
                        let cellDefination = this.cellDefinations[i];
                        if(cellDefination.type==DistanceType.fixed){
                            for (let j=0;j<this.children.length;j++){
                                if(this.cellIndexArray[j]==i){
                                    let child = this.children[j];
                                    child.isParentSlotWidthCalculatable = false;
                                    if(child instanceof ContainerControl) {
                                        let container:ContainerControl = <ContainerControl>child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if(this.height.type == DistanceType.fixed){
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    child.isParentSlotHeightCalculatable = true;
                    child.parentSlotHeight = this.height.value;
                    if(child instanceof ContainerControl) {
                        let container:ContainerControl = <ContainerControl>child;
                        container.initCalculableSlots();
                    }
                }
            }else {
                if(this.isParentSlotHeightCalculatable && this.verticalAlignment==VerticalAlignment.Strech) {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.isParentSlotHeightCalculatable = true;
                        child.parentSlotHeight = this.parentSlotHeight - this.margin.top - this.margin.bottom;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }else {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.isParentSlotHeightCalculatable = false;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }

        }

        assembleDom(): void {
            this.wrapperDoms = [];
            this.cellWrapperDoms = [];
            $(this.getRootElement()).empty();
            for (let i=0;i<this.cellDefinations.length;i++){
                let cellWrapperDiv = $("<div></div>")[0];
                $(cellWrapperDiv).attr('layout-tag','cellWrapper');
                this.cellWrapperDoms.push(cellWrapperDiv);
                $(this.getRootElement()).append(cellWrapperDiv);
            }

            for (let j=0;j<this.children.length;j++){
                let cellWrapperDiv = this.cellWrapperDoms[this.cellIndexArray[j]];
                let child = this.children[j];
                child.assembleDom();

                let wrapperDiv = $("<div></div>")[0];
                $(wrapperDiv).attr('layout-tag','wrapper');
                this.wrapperDoms.push(wrapperDiv);
                $(cellWrapperDiv).append(wrapperDiv);
                $(wrapperDiv).append(child.getRootElement());
            }
        }

        doLayout(): void {

            let weightSum = 0;
            let fixSum = 0;
            for (let i=0;i<this.cellDefinations.length;i++) {
                let cellDefination = this.cellDefinations[i];
                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
                if(cellDefination.type==DistanceType.fixed) fixSum += cellDefination.value;
            }

            $(this.getRootElement()).css('position','absolute');
            $(this.getRootElement()).css('width',this.estimateWidth()+'px');
            $(this.getRootElement()).css('height',this.estimateHeight()+'px');

            let pos = 0;
            for (let j=0;j<this.cellDefinations.length;j++){
                let cellDefination = this.cellDefinations[j];
                let cellWrapperDiv = this.cellWrapperDoms[j];
                $(cellWrapperDiv).css('position','absolute');
                $(cellWrapperDiv).css('top','0px');
                $(cellWrapperDiv).css('bottom','0px');
                let cellw = 0;
                if(cellDefination.type==DistanceType.fixed) {
                    cellw=cellDefination.value;
                }else if(cellDefination.type==DistanceType.weight){
                    cellw = (this.estimateWidth() - fixSum)* cellDefination.value / weightSum;
                }
                $(cellWrapperDiv).css('left',pos+'px');
                $(cellWrapperDiv).css('width',cellw+'px');
                pos+=cellw;

                for(let i=0;i<this.children.length;i++){
                    if(j==this.cellIndexArray[i]){
                        let child = this.children[i];
                        let wrapperDiv = this.wrapperDoms[i];
                        child.doLayout();

                        $(wrapperDiv).css('position','absolute');
                        $(wrapperDiv).css('left',child.margin.left+'px');
                        $(wrapperDiv).css('right',child.margin.right+'px');
                        $(wrapperDiv).css('top',child.margin.top+'px');
                        $(wrapperDiv).css('bottom',child.margin.bottom+'px');

                        $(child.getRootElement()).css('position','absolute');
                        if(child.horizonAlignment==HorizonAlignment.Left) {
                            $(child.getRootElement()).css('left','0px');
                        }else if(child.horizonAlignment==HorizonAlignment.Right) {
                            $(child.getRootElement()).css('right','0px');
                        }else if(child.horizonAlignment==HorizonAlignment.Strech){
                            $(child.getRootElement()).css('left','0px');
                            $(child.getRootElement()).css('right','0px');
                        }else if(child.horizonAlignment==HorizonAlignment.Center){
                            let w = child.estimateWidth();
                            let x = (cellw-w)/2;
                            $(child.getRootElement()).css('left',x+'px');
                        }

                        if(child.verticalAlignment==VerticalAlignment.Top) {
                            $(child.getRootElement()).css('top','0px');
                        }else if(child.verticalAlignment==VerticalAlignment.Bottom) {
                            $(child.getRootElement()).css('bottom','0px');
                        }else if(child.verticalAlignment==VerticalAlignment.Strech){
                            $(child.getRootElement()).css('top','0px');
                            $(child.getRootElement()).css('bottom','0px');
                        }else if(child.verticalAlignment==VerticalAlignment.Center){
                            let h = child.estimateHeight();
                            let hh = this.estimateHeight();
                            let y = (hh-h)/2;
                            $(child.getRootElement()).css('top',y+'px');
                        }
                    }
                }
            }
        }

        estimateWidth(): number {
            if(this.isParentSlotWidthCalculatable){
                if (this.horizonAlignment==HorizonAlignment.Center
                    ||this.horizonAlignment==HorizonAlignment.Left
                    ||this.horizonAlignment==HorizonAlignment.Right)
                {
                    if(this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }else if(this.width.type == DistanceType.auto) {
                        if(this.children.length>0) {
                            let widthlist = this.children.map(t=>t.estimateWidth()+t.margin.left+t.margin.right);
                            widthlist.sort((a,b)=>b-a);
                            return widthlist[0];
                        }
                        return 0;
                    }
                }else if(this.horizonAlignment==HorizonAlignment.Strech){
                    return this.parentSlotWidth - this.margin.left - this.margin.right;
                }
            }else{
                if(this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }else if(this.width.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        let widthlist = this.children.map(t => t.estimateWidth() + t.margin.left + t.margin.right);
                        widthlist.sort((a,b)=>b-a);
                        return widthlist[0];
                    }
                    return 0;
                }
            }
        }

        estimateHeight(): number {
            if(this.isParentSlotHeightCalculatable){
                if (this.verticalAlignment==VerticalAlignment.Center
                    ||this.verticalAlignment==VerticalAlignment.Top
                    ||this.verticalAlignment==VerticalAlignment.Bottom)
                {
                    if(this.height.type == DistanceType.fixed) {
                        return this.height.value;
                    }else if(this.height.type == DistanceType.auto) {
                        if(this.children.length>0) {
                            let heightlist = this.children.map(t=>t.estimateHeight()+t.margin.top+t.margin.bottom);
                            heightlist.sort().reverse();
                            return heightlist[0];
                        }
                        return 0;
                    }
                }else if(this.verticalAlignment==VerticalAlignment.Strech){
                    return this.parentSlotHeight - this.margin.top - this.margin.bottom;
                }
            }else{
                if(this.height.type == DistanceType.fixed) {
                    return this.height.value;
                }else if(this.height.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        let heightlist = this.children.map(t => t.estimateHeight() + t.margin.top + t.margin.bottom);
                        heightlist.sort().reverse();
                        return heightlist[0];
                    }
                    return 0;
                }
            }
        }
    }

    export class HorizonalLinearLayout2 extends ContainerControl {
        cellBorderArray : Array<Border>;
        cellDefinations:Array<Distance>;
        cellIndexArray:Array<number>;


        constructor(name:string) {
            super(name);
            this.cellIndexArray=[];
            this.cellDefinations = [];
            this.cellBorderArray = [];
        }

        addCell(distance:Distance) {
            this.cellDefinations.push(distance);
        }

        addChild(control: LayoutLzg.Control): void {
            super.addChild(control);
            this.cellIndexArray.push(0);
        }

        removeChild(control: LayoutLzg.Control): void {
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

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type','HorizonalLinearLayout');
                $(this.rootElem).attr('layout-name',this.name);
            }
            return this.rootElem;
        }

        initCalculableSlots():void {
            let weightSum = 0;
            for (let i=0;i<this.cellDefinations.length;i++) {
                let cellDefination = this.cellDefinations[i];
                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
            }

            if(this.width.type == DistanceType.fixed){
                for (let i=0;i<this.cellDefinations.length;i++){
                    let cellDefination = this.cellDefinations[i];
                    if(cellDefination.type==DistanceType.fixed){
                        for (let j=0;j<this.children.length;j++){
                            if(this.cellIndexArray[j]==i){
                                let child = this.children[j];
                                child.isParentSlotWidthCalculatable = true;
                                child.parentSlotWidth = cellDefination.value;
                                if(child instanceof ContainerControl) {
                                    let container:ContainerControl = <ContainerControl>child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }else if(cellDefination.type==DistanceType.weight){
                        for (let j=0;j<this.children.length;j++){
                            if(this.cellIndexArray[j]==i){
                                let child = this.children[j];
                                child.isParentSlotWidthCalculatable = true;
                                child.parentSlotWidth = this.width.value*cellDefination.value/weightSum;
                                if(child instanceof ContainerControl) {
                                    let container:ContainerControl = <ContainerControl>child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                }
            }else {
                if(this.isParentSlotWidthCalculatable && this.horizonAlignment==HorizonAlignment.Strech) {
                    for (let i=0;i<this.cellDefinations.length;i++){
                        let cellDefination = this.cellDefinations[i];
                        if(cellDefination.type==DistanceType.fixed){
                            for (let j=0;j<this.children.length;j++){
                                if(this.cellIndexArray[j]==i){
                                    let child = this.children[j];
                                    child.isParentSlotWidthCalculatable = true;
                                    child.parentSlotWidth = this.parentSlotWidth - this.margin.left - this.margin.right;
                                    if(child instanceof ContainerControl) {
                                        let container:ContainerControl = <ContainerControl>child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }else{
                            for (let j=0;j<this.children.length;j++){
                                if(this.cellIndexArray[j]==i){
                                    let child = this.children[j];
                                    child.isParentSlotWidthCalculatable = false;
                                    if(child instanceof ContainerControl) {
                                        let container:ContainerControl = <ContainerControl>child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }else {
                    for (let i=0;i<this.cellDefinations.length;i++){
                        let cellDefination = this.cellDefinations[i];
                        if(cellDefination.type==DistanceType.fixed){
                            for (let j=0;j<this.children.length;j++){
                                if(this.cellIndexArray[j]==i){
                                    let child = this.children[j];
                                    child.isParentSlotWidthCalculatable = false;
                                    if(child instanceof ContainerControl) {
                                        let container:ContainerControl = <ContainerControl>child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if(this.height.type == DistanceType.fixed){
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    child.isParentSlotHeightCalculatable = true;
                    child.parentSlotHeight = this.height.value;
                    if(child instanceof ContainerControl) {
                        let container:ContainerControl = <ContainerControl>child;
                        container.initCalculableSlots();
                    }
                }
            }else {
                if(this.isParentSlotHeightCalculatable && this.verticalAlignment==VerticalAlignment.Strech) {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.isParentSlotHeightCalculatable = true;
                        child.parentSlotHeight = this.parentSlotHeight - this.margin.top - this.margin.bottom;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }else {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.isParentSlotHeightCalculatable = false;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }

        }

        assembleDom(): void {
            this.cellBorderArray = [];
            $(this.getRootElement()).empty();
            for (let i=0;i<this.cellDefinations.length;i++){
                let border = new Border('');
                border.initCalculableSlots();
                this.cellBorderArray.push(border);
                $(this.getRootElement()).append(border.getRootElement());
            }

            for (let j=0;j<this.children.length;j++){
                let border = this.cellBorderArray[this.cellIndexArray[j]];
                let child = this.children[j];
                child.assembleDom();
                border.addChild(child);
                border.assembleDom();
            }
        }

        doLayout(): void {

            let weightSum = 0;
            let fixSum = 0;
            for (let i=0;i<this.cellDefinations.length;i++) {
                let cellDefination = this.cellDefinations[i];
                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
                if(cellDefination.type==DistanceType.fixed) fixSum += cellDefination.value;
            }

            $(this.getRootElement()).css('position','absolute');
            $(this.getRootElement()).css('width',this.estimateWidth()+'px');
            $(this.getRootElement()).css('height',this.estimateHeight()+'px');

            let pos = 0;
            for (let j=0;j<this.cellDefinations.length;j++){
                let cellDefination = this.cellDefinations[j];
                let border = this.cellBorderArray[j];
                $(border.getRootElement()).css('position','absolute');
                $(border.getRootElement()).css('top','0px');
                $(border.getRootElement()).css('bottom','0px');
                let cellw = 0;
                if(cellDefination.type==DistanceType.fixed) {
                    cellw=cellDefination.value;
                }else if(cellDefination.type==DistanceType.weight){
                    cellw = (this.estimateWidth() - fixSum)* cellDefination.value / weightSum;
                }
                $(border.getRootElement()).css('left',pos+'px');
                border.width = new Distance(DistanceType.fixed,cellw);
                border.height = new Distance(DistanceType.auto,0);
                border.verticalAlignment = VerticalAlignment.Strech;
                border.isParentSlotHeightCalculatable = true;
                border.parentSlotHeight = this.estimateHeight();
                pos+=cellw;
                border.doLayout();

            }
        }

        estimateWidth(): number {
            if(this.isParentSlotWidthCalculatable){
                if (this.horizonAlignment==HorizonAlignment.Center
                    ||this.horizonAlignment==HorizonAlignment.Left
                    ||this.horizonAlignment==HorizonAlignment.Right)
                {
                    if(this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }else if(this.width.type == DistanceType.auto) {
                        if(this.children.length>0) {
                            let widthlist = this.children.map(t=>t.estimateWidth()+t.margin.left+t.margin.right);
                            widthlist.sort((a,b)=>b-a);
                            return widthlist[0];
                        }
                        return 0;
                    }
                }else if(this.horizonAlignment==HorizonAlignment.Strech){
                    return this.parentSlotWidth - this.margin.left - this.margin.right;
                }
            }else{
                if(this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }else if(this.width.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        let widthlist = this.children.map(t => t.estimateWidth() + t.margin.left + t.margin.right);
                        widthlist.sort((a,b)=>b-a);
                        return widthlist[0];
                    }
                    return 0;
                }
            }
        }

        estimateHeight(): number {
            if(this.isParentSlotHeightCalculatable){
                if (this.verticalAlignment==VerticalAlignment.Center
                    ||this.verticalAlignment==VerticalAlignment.Top
                    ||this.verticalAlignment==VerticalAlignment.Bottom)
                {
                    if(this.height.type == DistanceType.fixed) {
                        return this.height.value;
                    }else if(this.height.type == DistanceType.auto) {
                        if(this.children.length>0) {
                            let heightlist = this.children.map(t=>t.estimateHeight()+t.margin.top+t.margin.bottom);
                            heightlist.sort().reverse();
                            return heightlist[0];
                        }
                        return 0;
                    }
                }else if(this.verticalAlignment==VerticalAlignment.Strech){
                    return this.parentSlotHeight - this.margin.top - this.margin.bottom;
                }
            }else{
                if(this.height.type == DistanceType.fixed) {
                    return this.height.value;
                }else if(this.height.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        let heightlist = this.children.map(t => t.estimateHeight() + t.margin.top + t.margin.bottom);
                        heightlist.sort().reverse();
                        return heightlist[0];
                    }
                    return 0;
                }
            }
        }
    }

    export class VerticalLinearLayout2 extends ContainerControl {
        cellBorderArray : Array<Border>;
        cellDefinations:Array<Distance>;
        cellIndexArray:Array<number>;


        constructor(name:string) {
            super(name);
            this.cellIndexArray=[];
            this.cellDefinations = [];
            this.cellBorderArray = [];
        }

        addCell(distance:Distance) {
            this.cellDefinations.push(distance);
        }

        addChild(control: LayoutLzg.Control): void {
            super.addChild(control);
            this.cellIndexArray.push(0);
        }

        removeChild(control: LayoutLzg.Control): void {
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

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type','HorizonalLinearLayout');
                $(this.rootElem).attr('layout-name',this.name);
            }
            return this.rootElem;
        }

        initCalculableSlots():void {
            let weightSum = 0;
            for (let i=0;i<this.cellDefinations.length;i++) {
                let cellDefination = this.cellDefinations[i];
                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
            }

            if(this.height.type == DistanceType.fixed){
                for (let i=0;i<this.cellDefinations.length;i++){
                    let cellDefination = this.cellDefinations[i];
                    if(cellDefination.type==DistanceType.fixed){
                        for (let j=0;j<this.children.length;j++){
                            if(this.cellIndexArray[j]==i){
                                let child = this.children[j];
                                child.isParentSlotHeightCalculatable = true;
                                child.parentSlotHeight = cellDefination.value;
                                if(child instanceof ContainerControl) {
                                    let container:ContainerControl = <ContainerControl>child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }else if(cellDefination.type==DistanceType.weight){
                        for (let j=0;j<this.children.length;j++){
                            if(this.cellIndexArray[j]==i){
                                let child = this.children[j];
                                child.isParentSlotHeightCalculatable = true;
                                child.parentSlotHeight = this.height.value*cellDefination.value/weightSum;
                                if(child instanceof ContainerControl) {
                                    let container:ContainerControl = <ContainerControl>child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                }
            }else {
                if(this.isParentSlotHeightCalculatable && this.horizonAlignment==HorizonAlignment.Strech) {
                    for (let i=0;i<this.cellDefinations.length;i++){
                        let cellDefination = this.cellDefinations[i];
                        if(cellDefination.type==DistanceType.fixed){
                            for (let j=0;j<this.children.length;j++){
                                if(this.cellIndexArray[j]==i){
                                    let child = this.children[j];
                                    child.isParentSlotHeightCalculatable = true;
                                    child.parentSlotHeight = this.parentSlotHeight - this.margin.top - this.margin.bottom;
                                    if(child instanceof ContainerControl) {
                                        let container:ContainerControl = <ContainerControl>child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }else{
                            for (let j=0;j<this.children.length;j++){
                                if(this.cellIndexArray[j]==i){
                                    let child = this.children[j];
                                    child.isParentSlotHeightCalculatable = false;
                                    if(child instanceof ContainerControl) {
                                        let container:ContainerControl = <ContainerControl>child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }else {
                    for (let i=0;i<this.cellDefinations.length;i++){
                        let cellDefination = this.cellDefinations[i];
                        if(cellDefination.type==DistanceType.fixed){
                            for (let j=0;j<this.children.length;j++){
                                if(this.cellIndexArray[j]==i){
                                    let child = this.children[j];
                                    child.isParentSlotHeightCalculatable = false;
                                    if(child instanceof ContainerControl) {
                                        let container:ContainerControl = <ContainerControl>child;
                                        container.initCalculableSlots();
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if(this.width.type == DistanceType.fixed){
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    child.isParentSlotWidthCalculatable = true;
                    child.parentSlotWidth = this.width.value;
                    if(child instanceof ContainerControl) {
                        let container:ContainerControl = <ContainerControl>child;
                        container.initCalculableSlots();
                    }
                }
            }else {
                if(this.isParentSlotWidthCalculatable && this.verticalAlignment==VerticalAlignment.Strech) {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.isParentSlotWidthCalculatable = true;
                        child.parentSlotWidth = this.parentSlotWidth - this.margin.left - this.margin.right;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }else {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.isParentSlotWidthCalculatable = false;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }

        }

        assembleDom(): void {
            this.cellBorderArray = [];
            $(this.getRootElement()).empty();
            for (let i=0;i<this.cellDefinations.length;i++){
                let border = new Border('');
                border.initCalculableSlots();
                this.cellBorderArray.push(border);
                $(this.getRootElement()).append(border.getRootElement());
            }

            for (let j=0;j<this.children.length;j++){
                let border = this.cellBorderArray[this.cellIndexArray[j]];
                let child = this.children[j];
                child.assembleDom();
                border.addChild(child);
                border.assembleDom();
            }
        }

        doLayout(): void {

            let weightSum = 0;
            let fixSum = 0;
            for (let i=0;i<this.cellDefinations.length;i++) {
                let cellDefination = this.cellDefinations[i];
                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
                if(cellDefination.type==DistanceType.fixed) fixSum += cellDefination.value;
            }

            $(this.getRootElement()).css('position','absolute');
            $(this.getRootElement()).css('width',this.estimateWidth()+'px');
            $(this.getRootElement()).css('height',this.estimateHeight()+'px');

            let pos = 0;
            for (let j=0;j<this.cellDefinations.length;j++){
                let cellDefination = this.cellDefinations[j];
                let border = this.cellBorderArray[j];
                $(border.getRootElement()).css('position','absolute');
                $(border.getRootElement()).css('left','0px');
                $(border.getRootElement()).css('right','0px');
                let cellh = 0;
                if(cellDefination.type==DistanceType.fixed) {
                    cellh=cellDefination.value;
                }else if(cellDefination.type==DistanceType.weight){
                    cellh = (this.estimateHeight() - fixSum)* cellDefination.value / weightSum;
                }
                $(border.getRootElement()).css('top',pos+'px');
                border.height = new Distance(DistanceType.fixed,cellh);
                border.width = new Distance(DistanceType.auto,0);
                border.horizonAlignment = HorizonAlignment.Strech;
                border.isParentSlotWidthCalculatable = true;
                border.parentSlotWidth = this.estimateWidth();
                pos+=cellh;
                border.doLayout();

            }
        }

        estimateWidth(): number {
            if(this.isParentSlotWidthCalculatable){
                if (this.horizonAlignment==HorizonAlignment.Center
                    ||this.horizonAlignment==HorizonAlignment.Left
                    ||this.horizonAlignment==HorizonAlignment.Right)
                {
                    if(this.width.type == DistanceType.fixed) {
                        return this.width.value;
                    }else if(this.width.type == DistanceType.auto) {
                        if(this.children.length>0) {
                            let widthlist = this.children.map(t=>t.estimateWidth()+t.margin.left+t.margin.right);
                            widthlist.sort((a,b)=>b-a);
                            return widthlist[0];
                        }
                        return 0;
                    }
                }else if(this.horizonAlignment==HorizonAlignment.Strech){
                    return this.parentSlotWidth - this.margin.left - this.margin.right;
                }
            }else{
                if(this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }else if(this.width.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        let widthlist = this.children.map(t => t.estimateWidth() + t.margin.left + t.margin.right);
                        widthlist.sort((a,b)=>b-a);
                        return widthlist[0];
                    }
                    return 0;
                }
            }
        }

        estimateHeight(): number {
            if(this.isParentSlotHeightCalculatable){
                if (this.verticalAlignment==VerticalAlignment.Center
                    ||this.verticalAlignment==VerticalAlignment.Top
                    ||this.verticalAlignment==VerticalAlignment.Bottom)
                {
                    if(this.height.type == DistanceType.fixed) {
                        return this.height.value;
                    }else if(this.height.type == DistanceType.auto) {
                        if(this.children.length>0) {
                            let heightlist = this.children.map(t=>t.estimateHeight()+t.margin.top+t.margin.bottom);
                            heightlist.sort().reverse();
                            return heightlist[0];
                        }
                        return 0;
                    }
                }else if(this.verticalAlignment==VerticalAlignment.Strech){
                    return this.parentSlotHeight - this.margin.top - this.margin.bottom;
                }
            }else{
                if(this.height.type == DistanceType.fixed) {
                    return this.height.value;
                }else if(this.height.type == DistanceType.auto) {
                    if (this.children.length > 0) {
                        let heightlist = this.children.map(t => t.estimateHeight() + t.margin.top + t.margin.bottom);
                        heightlist.sort().reverse();
                        return heightlist[0];
                    }
                    return 0;
                }
            }
        }
    }
}


