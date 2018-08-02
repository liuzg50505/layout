namespace LayoutLzg{
    export class VerticalLinearLayout extends ContainerControl {
        cellBorderArray : Array<Border>;
        cellDefinations:Array<Distance>;
        cellIndexArray:Array<number>;

        borderElem:HTMLElement;

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
            if(this.borderElem==null) this.borderElem = $("<div></div>")[0];
            $(this.getRootElement()).append(this.borderElem);
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

            $(this.borderElem).css('position','absolute');
            $(this.borderElem).css('left','0px');
            $(this.borderElem).css('right','0px');
            $(this.borderElem).css('top','0px');
            $(this.borderElem).css('bottom','0px');

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