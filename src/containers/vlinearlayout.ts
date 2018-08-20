namespace LayoutLzg {
    export class Vlinearlayout extends Border{
        slotMap : Map<Slot,SlotItem>;
        vchildren: List<Control>;

        constructor(name: string) {
            super(name);
            this.vchildren = new List<Control>();
            this.slotMap = new Map<Slot, SlotItem>();
        }

        addChild(control: LayoutLzg.Control): void {
            this.vchildren.add(control);
            control.parent = this;
        }

        addCell(distance:Distance) {
            let slot = new Slot();
            slot.container = this;
            this.slots.add(slot);

            if (!this.slotMap.containsKey(slot))
                this.slotMap.put(slot,new SlotItem(new Border("LinearCell"),null));
            let item = this.slotMap.get(slot);
            item.slotDefination = distance;
            super.addChild(item.slotBorder);
            // this.children.add(item.slotBorder);
            // item.slotBorder.parent = this;
            // item.slotBorder.parentSlot = this.mainSlot;
            // item.slotBorder.actualContainer = this;
        }

        setCell(control:Control, cellIndex:number) {
            const idx = this.vchildren.indexOf(control);
            if(idx>-1){
                let slot = this.slots[cellIndex];
                slot.addChild(control);
                let item = this.slotMap.get(slot);
                item.slotBorder.addChild(control);
                control.parent = this;
            }
        }


        initCalculableSlots(): void {
            let weightSum = 0;

            for (let i = 0; i < this.slots.length; i++) {
                let slot = this.slots[i];
                let item = this.slotMap.get(slot);
                let cellDefination = item.slotDefination;
                if (cellDefination.type == DistanceType.weight) weightSum += cellDefination.value;
            }

            if (this.height.type == DistanceType.fixed) {
                for (let i=0;i<this.slots.length;i++) {
                    let slot = this.slots[i];
                    let item = this.slotMap.get(slot);
                    let cellDefination = item.slotDefination;

                    if(cellDefination.type==DistanceType.fixed){
                        for(let j=0;j<slot.children.length;j++) {
                            let child = slot.children[j];
                            child.parentSlot.isSlotHeightCalculatable = true;
                            child.parentSlot.calulatedSlotHeight = cellDefination.value;
                            if(child instanceof ContainerControl) {
                                let container:ContainerControl = <ContainerControl>child;
                                container.initCalculableSlots();
                            }
                        }
                    }else if(cellDefination.type==DistanceType.weight){
                        for(let j=0;j<slot.children.length;j++) {
                            let child = slot.children[j];
                            child.parentSlot.isSlotHeightCalculatable = true;
                            child.parentSlot.calulatedSlotHeight = this.height.value*cellDefination.value/weightSum;
                            if(child instanceof ContainerControl) {
                                let container:ContainerControl = <ContainerControl>child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                }
            }else{
                if(this.parentSlot.isSlotHeightCalculatable && this.verticalAlignment==VerticalAlignment.Strech) {
                    for (let i=0;i<this.slots.length;i++) {
                        let slot = this.slots[i];
                        let item = this.slotMap.get(slot);
                        let cellDefination = item.slotDefination;

                        if(cellDefination.type==DistanceType.fixed){
                            for(let j=0;j<slot.children.length;j++) {
                                let child = slot.children[j];
                                child.parentSlot.isSlotHeightCalculatable = true;
                                child.parentSlot.calulatedSlotHeight = this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
                                if(child instanceof ContainerControl) {
                                    let container:ContainerControl = <ContainerControl>child;
                                    container.initCalculableSlots();
                                }
                            }
                        }else if(cellDefination.type==DistanceType.weight){
                            for(let j=0;j<slot.children.length;j++) {
                                let child = slot.children[j];
                                child.parentSlot.isSlotHeightCalculatable = false;
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
                            child.parentSlot.isSlotHeightCalculatable = false;
                            if(child instanceof ContainerControl) {
                                let container:ContainerControl = <ContainerControl>child;
                                container.initCalculableSlots();
                            }
                        }
                    }
                }
            }

            if(this.width.type == DistanceType.fixed){
                for(let i=0;i<this.vchildren.length;i++){
                    let child = this.vchildren[i];
                    child.parentSlot.isSlotWidthCalculatable = true;
                    child.parentSlot.calulatedSlotWidth = this.width.value;
                    if(child instanceof ContainerControl) {
                        let container:ContainerControl = <ContainerControl>child;
                        container.initCalculableSlots();
                    }
                }
            }else {
                if(this.parentSlot.isSlotWidthCalculatable && this.horizonAlignment==HorizonAlignment.Strech) {
                    for(let i=0;i<this.vchildren.length;i++){
                        let child = this.vchildren[i];
                        child.parentSlot.isSlotWidthCalculatable = true;
                        child.parentSlot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }else {
                    for(let i=0;i<this.vchildren.length;i++){
                        let child = this.vchildren[i];
                        child.parentSlot.isSlotWidthCalculatable = false;
                        if(child instanceof ContainerControl) {
                            let container:ContainerControl = <ContainerControl>child;
                            container.initCalculableSlots();
                        }
                    }
                }
            }

            super.initCalculableSlots();

        }


        doLayout(): void {
            let weightSum = 0;
            let fixSum = 0;
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let item = this.slotMap.get(slot);
                let cellDefination = item.slotDefination;

                if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
                if(cellDefination.type==DistanceType.fixed) fixSum += cellDefination.value;
            }

            let pos = 0;
            for (let i=0;i<this.slots.length;i++){
                let slot = this.slots[i];
                let item = this.slotMap.get(slot);
                let cellDefination = item.slotDefination;
                let border = item.slotBorder;

                let cellh = 0;
                if(cellDefination.type==DistanceType.fixed) {
                    cellh=cellDefination.value;
                }else if(cellDefination.type==DistanceType.weight){
                    cellh = (this.estimateHeight() - fixSum)* cellDefination.value / weightSum;
                }
                border.margin = new Thickness(0,0,pos,0);
                border.width = new Distance(DistanceType.auto,0);
                border.height = new Distance(DistanceType.fixed,cellh);
                border.horizonAlignment = HorizonAlignment.Strech;
                border.verticalAlignment = VerticalAlignment.Top;

                pos+=cellh;
                border.initCalculableSlots();
                border.assembleDom();
            }

            super.doLayout();
        }


    }
}