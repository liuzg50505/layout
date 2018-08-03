namespace LayoutLzg{
    export class Border extends ContainerControl {

        wrapperDoms : Array<HTMLElement>;
        private mainSlot : Slot;

        constructor(name:string) {
            super(name);
            this.mainSlot = new Slot();
            this.mainSlot.container = this;
        }

        getRootElement(): HTMLElement {
            if(this.rootElem==null) {
                this.rootElem = $("<div></div>")[0];
                $(this.rootElem).attr('layout-type','Border');
                $(this.rootElem).attr('layout-name',this.name);
            }
            return this.rootElem;
        }


        addChild(control: LayoutLzg.Control): void {
            super.addChild(control);
            this.mainSlot.addChild(control);
        }

        initCalculableSlots():void {

            if(this.width.type == DistanceType.fixed){
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    this.parentSlot.isSlotWidthCalculatable = true;
                    this.parentSlot.calulatedSlotWidth = this.width.value;
                    if(child instanceof ContainerControl) {
                        let container:ContainerControl = <ContainerControl>child;
                        container.initCalculableSlots();
                    }
                }
            }else {
                if(this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment==HorizonAlignment.Strech) {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.parentSlot.isSlotWidthCalculatable = true;
                        child.parentSlot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }else {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.parentSlot.isSlotWidthCalculatable = false;
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
                    child.parentSlot.isSlotHeightCalculatable = true;
                    child.parentSlot.calulatedSlotHeight = this.height.value;
                    if(child instanceof ContainerControl) {
                        let container:ContainerControl = <ContainerControl>child;
                        container.initCalculableSlots();
                    }
                }
            }else {
                if(this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment==VerticalAlignment.Strech) {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.parentSlot.isSlotHeightCalculatable = true;
                        child.parentSlot.calulatedSlotHeight = this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }else {
                    for(let i=0;i<this.children.length;i++){
                        let child = this.children[i];
                        child.parentSlot.isSlotHeightCalculatable = false;
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
            if(this.parentSlot.isSlotWidthCalculatable){
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
                    return this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
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
            if(this.parentSlot.isSlotHeightCalculatable){
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
                    return this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
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