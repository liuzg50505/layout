namespace LayoutLzg{

    class SlotItem {
        slotBorder:Border;
        slotDefination:Distance;

        constructor(slotBorder: Border, slotDefination: Distance) {
            this.slotBorder = slotBorder;
            this.slotDefination = slotDefination;
        }
    }

    export class HorizonalLinearLayout extends ContainerBase {

        slotMap : Map<Slot,SlotItem>;
        borderElem:HTMLElement;

        constructor(name:string) {
            super(name);
            this.slotMap = new Map<Slot, SlotItem>();
        }

        addCell(distance:Distance) {
            let slot = new Slot();
            slot.container = this;
            this.slots.add(slot);

            if (!this.slotMap.containsKey(slot))
                this.slotMap.put(slot,new SlotItem(null,null));
            let item = this.slotMap.get(slot);
            item.slotDefination = distance;
        }

        addChild(control: LayoutLzg.Control): void {
            super.addChild(control);
        }

        removeChild(control: LayoutLzg.Control): void {
            super.removeChild(control);
        }

        clearChild(): void {
            super.clearChild();
        }

        setCell(control:Control, cellIndex:number) {
            const idx = this.children.indexOf(control);
            if(idx>-1){
                let slot = this.slots[cellIndex];
                slot.addChild(control);
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

            for (let i=0;i<this.slots.length;i++) {
                let slot = this.slots[i];
                let item = this.slotMap.get(slot);
                let cellDefination = item.slotDefination;
                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
            }

            if(this.width.type == DistanceType.fixed){
                for (let i=0;i<this.slots.length;i++) {
                    let slot = this.slots[i];
                    let item = this.slotMap.get(slot);
                    let cellDefination = item.slotDefination;

                    if(cellDefination.type==DistanceType.fixed){
                        for(let j=0;j<slot.children.length;j++) {
                            let child = slot.children[j];
                            child.parentSlot.isSlotWidthCalculatable = true;
                            child.parentSlot.calulatedSlotWidth = cellDefination.value;
                            if(child instanceof ContainerControl) {
                                let container:ContainerControl = <ContainerControl>child;
                                container.initCalculableSlots();
                            }
                        }
                    }else if(cellDefination.type==DistanceType.weight){
                        for(let j=0;j<slot.children.length;j++) {
                            let child = slot.children[j];
                            child.parentSlot.isSlotWidthCalculatable = true;
                            child.parentSlot.calulatedSlotWidth = this.width.value*cellDefination.value/weightSum;
                            if(child instanceof ContainerControl) {
                                let container:ContainerControl = <ContainerControl>child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                }
            }else {
                if(this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment==HorizonAlignment.Strech) {
                    for (let i=0;i<this.slots.length;i++) {
                        let slot = this.slots[i];
                        let item = this.slotMap.get(slot);
                        let cellDefination = item.slotDefination;

                        if(cellDefination.type==DistanceType.fixed){
                            for(let j=0;j<slot.children.length;j++) {
                                let child = slot.children[j];
                                child.parentSlot.isSlotWidthCalculatable = true;
                                child.parentSlot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                                if(child instanceof ContainerControl) {
                                    let container:ContainerControl = <ContainerControl>child;
                                    container.initCalculableSlots();
                                }
                            }
                        }else if(cellDefination.type==DistanceType.weight){
                            for(let j=0;j<slot.children.length;j++) {
                                let child = slot.children[j];
                                child.parentSlot.isSlotWidthCalculatable = false;
                                if(child instanceof ContainerControl) {
                                    let container:ContainerControl = <ContainerControl>child;
                                    container.initCalculableSlots();
                                }
                            }
                        }
                    }
                }else {
                    for (let i=0;i<this.slots.length;i++) {
                        let slot = this.slots[i];
                        let item = this.slotMap.get(slot);
                        let cellDefination = item.slotDefination;

                        for(let j=0;j<slot.children.length;j++) {
                            let child = slot.children[j];
                            child.parentSlot.isSlotWidthCalculatable = false;
                            if(child instanceof ContainerControl) {
                                let container:ContainerControl = <ContainerControl>child;
                                container.initCalculableSlots();
                            }
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

            // init variables and htmlelements
            $(this.getRootElement()).empty();
            if(this.borderElem==null) this.borderElem = $("<div></div>")[0];

            // add cell wrapper divs to rootElem
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let item = this.slotMap.get(slot);
                let border = new Border('');
                border.initCalculableSlots();
                $(this.getRootElement()).append(border.getRootElement());

                item.slotBorder = border;
            }

            // add children rootElems to cell wrappers
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let item = this.slotMap.get(slot);
                let border = item.slotBorder;
                for (let j=0;j<slot.children.length;j++) {
                    let child = slot.children[j];
                    child.assembleDom();
                    border.addChild(child);
                    border.assembleDom();
                }

                item.slotBorder = border;
            }

        }

        doLayout(): void {
            // calculate weightSum and fixSum
            let weightSum = 0;
            let fixSum = 0;
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let item = this.slotMap.get(slot);
                let cellDefination = item.slotDefination;

                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
                if(cellDefination.type==DistanceType.fixed) fixSum += cellDefination.value;
            }


            // set rootElem styles
            $(this.getRootElement()).css('position','absolute');
            $(this.getRootElement()).css('width',this.estimateWidth()+'px');
            $(this.getRootElement()).css('height',this.estimateHeight()+'px');

            // set border and background styles
            $(this.borderElem).css('position','absolute');
            $(this.borderElem).css('left','0px');
            $(this.borderElem).css('right','0px');
            $(this.borderElem).css('top','0px');
            $(this.borderElem).css('bottom','0px');
            if(this.stroke){
                this.stroke.applyToBorder(this.borderElem,this.strokeThickness);
            }
            if(this.fill){
                this.fill.applyToBackground(this.borderElem);
            }

            let pos = 0;
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let item = this.slotMap.get(slot);
                let cellDefination = item.slotDefination;
                let border = item.slotBorder;

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
                border.parentSlot = slot;
                border.parentSlot.isSlotHeightCalculatable = true;
                border.parentSlot.calulatedSlotHeight = this.estimateHeight();
                border.parentSlot.isSlotWidthCalculatable = true;
                border.parentSlot.calulatedSlotWidth = cellw;

                pos+=cellw;
                border.doLayout();
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
                        return this.estimateWidth_auto();
                    }
                }else if(this.horizonAlignment==HorizonAlignment.Strech){
                    return this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                }
            }else{
                if(this.width.type == DistanceType.fixed) {
                    return this.width.value;
                }else if(this.width.type == DistanceType.auto) {
                    return this.estimateWidth_auto();
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
                        return this.estimateHeight_auto();
                    }
                }else if(this.verticalAlignment==VerticalAlignment.Strech){
                    return this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
                }
            }else{
                if(this.height.type == DistanceType.fixed) {
                    return this.height.value;
                }else if(this.height.type == DistanceType.auto) {
                    return this.estimateHeight_auto();
                }
            }
        }

        estimateHeight_auto(): number {
            if (this.children.length > 0) {
                let heightlist = this.children.map(t => t.estimateHeight() + t.margin.top + t.margin.bottom);
                heightlist.sort().reverse();
                return heightlist[0];
            }
            return 0;
        }

        estimateWidth_auto(): number {
            if (this.children.length > 0) {
                let widthlist = this.children.map(t => t.estimateWidth() + t.margin.left + t.margin.right);
                widthlist.sort((a,b)=>b-a);
                return widthlist[0];
            }
            return 0;
        }
    }
}