namespace LayoutLzg{

    class SlotItem {
        slotBorder:Border;
        slotDefination:Distance;

        constructor(slotBorder: Border, slotDefination: Distance) {
            this.slotBorder = slotBorder;
            this.slotDefination = slotDefination;
        }
    }

    export class VerticalLinearLayout extends ContainerControl {

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
                $(this.rootElem).attr('layout-type','VerticalLinearLayout');
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

            if(this.height.type == DistanceType.fixed){
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
            }else {
                if(this.parentSlot.isSlotHeightCalculatable && this.horizonAlignment==HorizonAlignment.Strech) {
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
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    child.parentSlot.isSlotWidthCalculatable = true;
                    child.parentSlot.calulatedSlotWidth = this.width.value;
                    if(child instanceof ContainerControl) {
                        let container:ContainerControl = <ContainerControl>child;
                        container.initCalculableSlots();
                    }
                }
            }else {
                if(this.parentSlot.isSlotWidthCalculatable && this.verticalAlignment==VerticalAlignment.Strech) {
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
                $(border.getRootElement()).css('left','0px');
                $(border.getRootElement()).css('right','0px');
                let cellh = 0;
                if(cellDefination.type==DistanceType.fixed) {
                    cellh=cellDefination.value;
                }else if(cellDefination.type==DistanceType.weight){
                    cellh = (this.estimateHeight() - fixSum)* cellDefination.value / weightSum;
                }
                $(border.getRootElement()).css('top',pos+'px');
                border.width = new Distance(DistanceType.auto,0);
                border.height = new Distance(DistanceType.fixed,cellh);
                border.verticalAlignment = VerticalAlignment.Strech;
                border.parentSlot = slot;
                border.parentSlot.isSlotWidthCalculatable = true;
                border.parentSlot.calulatedSlotWidth = this.estimateWidth();
                border.parentSlot.isSlotHeightCalculatable = true;
                border.parentSlot.calulatedSlotHeight = cellh;

                pos+=cellh;
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


        // // Borders to contain child controls, cellBorderArray.length is the cells count.
        // cellBorderArray : List<Border>;
        // // The distance defination for each cells.
        // cellDefinations:List<Distance>;
        // // The cell index of each child control of this container.
        // cellIndexArray:List<number>;
        // // The backgroud and border div element.
        // borderElem:HTMLElement;
        //
        // constructor(name:string) {
        //     super(name);
        //     // Init variables.
        //     this.cellIndexArray=new List<number>();
        //     this.cellDefinations = new List<Distance>();
        //     this.cellBorderArray = new List<Border>();
        // }
        //
        // // Add cell defination. The distance type can be 'weight' or 'fix'.
        // addCell(distance:Distance) {
        //     this.cellDefinations.push(distance);
        //     let slot = new Slot();
        //     slot.container = this;
        //     this.slots.add(slot);
        // }
        //
        // // Add child to this container, and the control is added to the first cell by default.
        // addChild(control: LayoutLzg.Control): void {
        //     super.addChild(control);
        //     this.cellIndexArray.push(0);
        // }
        //
        // // Remove child from this container.
        // removeChild(control: LayoutLzg.Control): void {
        //     super.removeChild(control);
        //     const idx = this.children.indexOf(control);
        //     if(idx>-1){
        //         this.cellIndexArray.splice(idx,1);
        //         if(control.parentSlot) {
        //             control.parentSlot.removeChild(control);
        //         }
        //     }
        // }
        //
        // // Remove all children from this container.
        // clearChild(): void {
        //     super.clearChild();
        //     this.cellIndexArray.clear();
        // }
        //
        // // Specify 'control' to the 'cellIndex' cell.
        // setCell(control:Control, cellIndex:number) {
        //     const idx = this.children.indexOf(control);
        //     if(idx>-1){
        //         this.cellIndexArray[idx] = cellIndex;
        //         let slot = this.slots[cellIndex];
        //         slot.addChild(control);
        //     }
        // }
        //
        // // Get the root div of this container.
        // getRootElement(): HTMLElement {
        //     if(this.rootElem==null) {
        //         this.rootElem = $("<div></div>")[0];
        //         $(this.rootElem).attr('layout-type','HorizonalLinearLayout');
        //         $(this.rootElem).attr('layout-name',this.name);
        //     }
        //     return this.rootElem;
        // }
        //
        // initCalculableSlots():void {
        //     let weightSum = 0;
        //     for (let i=0;i<this.cellDefinations.length;i++) {
        //         let cellDefination = this.cellDefinations[i];
        //         if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
        //     }
        //
        //     if(this.height.type == DistanceType.fixed){
        //         for (let i=0;i<this.cellDefinations.length;i++){
        //             let cellDefination = this.cellDefinations[i];
        //             if(cellDefination.type==DistanceType.fixed){
        //                 for (let j=0;j<this.children.length;j++){
        //                     if(this.cellIndexArray[j]==i){
        //                         let child = this.children[j];
        //                         child.parentSlot.isSlotHeightCalculatable = true;
        //                         child.parentSlot.calulatedSlotHeight = cellDefination.value;
        //                         if(child instanceof ContainerControl) {
        //                             let container:ContainerControl = <ContainerControl>child;
        //                             container.initCalculableSlots();
        //                         }
        //                     }
        //                 }
        //             }else if(cellDefination.type==DistanceType.weight){
        //                 for (let j=0;j<this.children.length;j++){
        //                     if(this.cellIndexArray[j]==i){
        //                         let child = this.children[j];
        //                         child.parentSlot.isSlotHeightCalculatable = true;
        //                         child.parentSlot.calulatedSlotHeight = this.height.value*cellDefination.value/weightSum;
        //                         if(child instanceof ContainerControl) {
        //                             let container:ContainerControl = <ContainerControl>child;
        //                             container.initCalculableSlots();
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }else {
        //         if(this.parentSlot.isSlotHeightCalculatable && this.horizonAlignment==HorizonAlignment.Strech) {
        //             for (let i=0;i<this.cellDefinations.length;i++){
        //                 let cellDefination = this.cellDefinations[i];
        //                 if(cellDefination.type==DistanceType.fixed){
        //                     for (let j=0;j<this.children.length;j++){
        //                         if(this.cellIndexArray[j]==i){
        //                             let child = this.children[j];
        //                             child.parentSlot.isSlotHeightCalculatable = true;
        //                             child.parentSlot.calulatedSlotHeight = this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
        //                             if(child instanceof ContainerControl) {
        //                                 let container:ContainerControl = <ContainerControl>child;
        //                                 container.initCalculableSlots();
        //                             }
        //                         }
        //                     }
        //                 }else{
        //                     for (let j=0;j<this.children.length;j++){
        //                         if(this.cellIndexArray[j]==i){
        //                             let child = this.children[j];
        //                             child.parentSlot.isSlotHeightCalculatable = false;
        //                             if(child instanceof ContainerControl) {
        //                                 let container:ContainerControl = <ContainerControl>child;
        //                                 container.initCalculableSlots();
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }else {
        //             for (let i=0;i<this.cellDefinations.length;i++){
        //                 let cellDefination = this.cellDefinations[i];
        //                 if(cellDefination.type==DistanceType.fixed){
        //                     for (let j=0;j<this.children.length;j++){
        //                         if(this.cellIndexArray[j]==i){
        //                             let child = this.children[j];
        //                             child.parentSlot.isSlotHeightCalculatable = false;
        //                             if(child instanceof ContainerControl) {
        //                                 let container:ContainerControl = <ContainerControl>child;
        //                                 container.initCalculableSlots();
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //
        //     if(this.width.type == DistanceType.fixed){
        //         for(let i=0;i<this.children.length;i++){
        //             let child = this.children[i];
        //             child.parentSlot.isSlotWidthCalculatable = true;
        //             child.parentSlot.calulatedSlotWidth = this.width.value;
        //             if(child instanceof ContainerControl) {
        //                 let container:ContainerControl = <ContainerControl>child;
        //                 container.initCalculableSlots();
        //             }
        //         }
        //     }else {
        //         if(this.parentSlot.isSlotWidthCalculatable && this.verticalAlignment==VerticalAlignment.Strech) {
        //             for(let i=0;i<this.children.length;i++){
        //                 let child = this.children[i];
        //                 child.parentSlot.isSlotWidthCalculatable = true;
        //                 child.parentSlot.calulatedSlotWidth = this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
        //                 if(child instanceof ContainerControl) {
        //                     let container:ContainerControl = <ContainerControl>child;
        //                     container.initCalculableSlots();
        //                 }
        //             }
        //         }else {
        //             for(let i=0;i<this.children.length;i++){
        //                 let child = this.children[i];
        //                 child.parentSlot.isSlotWidthCalculatable = false;
        //                 if(child instanceof ContainerControl) {
        //                     let container:ContainerControl = <ContainerControl>child;
        //                     container.initCalculableSlots();
        //                 }
        //             }
        //         }
        //     }
        //
        // }
        //
        // assembleDom(): void {
        //
        //     // init variables and htmlelements
        //     this.cellBorderArray.clear();
        //     $(this.getRootElement()).empty();
        //     if(this.borderElem==null) this.borderElem = $("<div></div>")[0];
        //     $(this.getRootElement()).append(this.borderElem);
        //
        //     // add cell wrapper divs to rootElem
        //     for (let i=0;i<this.cellDefinations.length;i++){
        //         let border = new Border('');
        //         border.initCalculableSlots();
        //         this.cellBorderArray.push(border);
        //         $(this.getRootElement()).append(border.getRootElement());
        //     }
        //
        //     // add children rootElems to cell wrappers
        //     for (let j=0;j<this.children.length;j++){
        //         let border = this.cellBorderArray[this.cellIndexArray[j]];
        //         let child = this.children[j];
        //         child.assembleDom();
        //         border.addChild(child);
        //         border.assembleDom();
        //     }
        // }
        //
        // doLayout(): void {
        //     // calculate weightSum and fixSum
        //     let weightSum = 0;
        //     let fixSum = 0;
        //     for (let i=0;i<this.cellDefinations.length;i++) {
        //         let cellDefination = this.cellDefinations[i];
        //         if(cellDefination.type==DistanceType.weight) weightSum += cellDefination.value;
        //         if(cellDefination.type==DistanceType.fixed) fixSum += cellDefination.value;
        //     }
        //
        //     // set rootElem styles
        //     $(this.getRootElement()).css('position','absolute');
        //     $(this.getRootElement()).css('width',this.estimateWidth()+'px');
        //     $(this.getRootElement()).css('height',this.estimateHeight()+'px');
        //
        //     // set border and background styles
        //     $(this.borderElem).css('position','absolute');
        //     $(this.borderElem).css('left','0px');
        //     $(this.borderElem).css('right','0px');
        //     $(this.borderElem).css('top','0px');
        //     $(this.borderElem).css('bottom','0px');
        //     if(this.stroke){
        //         this.stroke.applyToBorder(this.borderElem,this.strokeThickness);
        //     }
        //     if(this.fill){
        //         this.fill.applyToBackground(this.borderElem);
        //     }
        //
        //     // set cell wrapper styles
        //     let pos = 0;
        //     for (let j=0;j<this.cellDefinations.length;j++){
        //         let cellDefination = this.cellDefinations[j];
        //         let border = this.cellBorderArray[j];
        //         $(border.getRootElement()).css('position','absolute');
        //         $(border.getRootElement()).css('left','0px');
        //         $(border.getRootElement()).css('right','0px');
        //         let cellh = 0;
        //         if(cellDefination.type==DistanceType.fixed) {
        //             cellh=cellDefination.value;
        //         }else if(cellDefination.type==DistanceType.weight){
        //             cellh = (this.estimateHeight() - fixSum)* cellDefination.value / weightSum;
        //         }
        //         $(border.getRootElement()).css('top',pos+'px');
        //         border.height = new Distance(DistanceType.fixed,cellh);
        //         border.width = new Distance(DistanceType.auto,0);
        //         border.horizonAlignment = HorizonAlignment.Strech;
        //         border.parentSlot = this.slots[j];
        //         border.parentSlot.isSlotWidthCalculatable = true;
        //         border.parentSlot.calulatedSlotWidth = this.estimateWidth();
        //         border.parentSlot.isSlotHeightCalculatable = true;
        //         border.parentSlot.calulatedSlotHeight = cellh;
        //         pos+=cellh;
        //         border.doLayout();
        //
        //     }
        // }
        //
        // estimateWidth(): number {
        //     if(this.parentSlot.isSlotWidthCalculatable){
        //         if (this.horizonAlignment==HorizonAlignment.Center
        //             ||this.horizonAlignment==HorizonAlignment.Left
        //             ||this.horizonAlignment==HorizonAlignment.Right)
        //         {
        //             if(this.width.type == DistanceType.fixed) {
        //                 return this.width.value;
        //             }else if(this.width.type == DistanceType.auto) {
        //                 if(this.children.length>0) {
        //                     let widthlist = this.children.map(t=>t.estimateWidth()+t.margin.left+t.margin.right);
        //                     widthlist.sort((a,b)=>b-a);
        //                     return widthlist[0];
        //                 }
        //                 return 0;
        //             }
        //         }else if(this.horizonAlignment==HorizonAlignment.Strech){
        //             return this.parentSlot.calulatedSlotWidth - this.margin.left - this.margin.right;
        //         }
        //     }else{
        //         if(this.width.type == DistanceType.fixed) {
        //             return this.width.value;
        //         }else if(this.width.type == DistanceType.auto) {
        //             if (this.children.length > 0) {
        //                 let widthlist = this.children.map(t => t.estimateWidth() + t.margin.left + t.margin.right);
        //                 widthlist.sort((a,b)=>b-a);
        //                 return widthlist[0];
        //             }
        //             return 0;
        //         }
        //     }
        // }
        //
        // estimateHeight(): number {
        //     if(this.parentSlot.isSlotHeightCalculatable){
        //         if (this.verticalAlignment==VerticalAlignment.Center
        //             ||this.verticalAlignment==VerticalAlignment.Top
        //             ||this.verticalAlignment==VerticalAlignment.Bottom)
        //         {
        //             if(this.height.type == DistanceType.fixed) {
        //                 return this.height.value;
        //             }else if(this.height.type == DistanceType.auto) {
        //                 if(this.children.length>0) {
        //                     let heightlist = this.children.map(t=>t.estimateHeight()+t.margin.top+t.margin.bottom);
        //                     heightlist.sort().reverse();
        //                     return heightlist[0];
        //                 }
        //                 return 0;
        //             }
        //         }else if(this.verticalAlignment==VerticalAlignment.Strech){
        //             return this.parentSlot.calulatedSlotHeight - this.margin.top - this.margin.bottom;
        //         }
        //     }else{
        //         if(this.height.type == DistanceType.fixed) {
        //             return this.height.value;
        //         }else if(this.height.type == DistanceType.auto) {
        //             if (this.children.length > 0) {
        //                 let heightlist = this.children.map(t => t.estimateHeight() + t.margin.top + t.margin.bottom);
        //                 heightlist.sort().reverse();
        //                 return heightlist[0];
        //             }
        //             return 0;
        //         }
        //     }
        // }
    }
}