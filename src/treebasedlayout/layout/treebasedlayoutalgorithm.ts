namespace LayoutLzg {

    export function calculateBoundaryWidthTree(rootWidget:Widget) {
        if(rootWidget.width.type==DistanceType.fixed){
            rootWidget.calculateSlotsWidth(true);
        }else if(rootWidget.parent&&rootWidget.horizonAlignment==HorizonAlignment.Strech) {
            rootWidget.calculateSlotsWidth(true);
        }else{
            rootWidget.calculateSlotsWidth(false);
        }

        for (let slot of rootWidget.slots) {
            if(slot.isBoundaryWidth) {
                for (let child of slot.children) {
                    if(child.width.type==DistanceType.fixed){
                        calculateBoundaryWidthTree(child);
                    }else if(child.horizonAlignment==HorizonAlignment.Left||
                        child.horizonAlignment==HorizonAlignment.Right||
                        child.horizonAlignment==HorizonAlignment.Center){
                        calculateIncrementalWidthTree(child);
                    }else{
                        calculateBoundaryWidthTree(child);
                    }
                }
                rootWidget.calculateSlotsWidth(true);
            }else{
                for (let child of slot.children) {
                    if(child.width.type==DistanceType.fixed){
                        calculateBoundaryWidthTree(child);
                    }else {
                        calculateIncrementalWidthTree(child);
                    }
                }
                rootWidget.calculateSlotsWidth(false);
            }
        }
    }

    export function calculateIncrementalWidthTree(rootWidget: Widget) {
        for (let slot of rootWidget.slots) {
            for (let child of slot.children) {
                if (child.width.type == DistanceType.fixed) {
                    calculateBoundaryWidthTree(child);
                } else if (child instanceof MesureableWidget) {
                    let m = <MesureableWidget>child;
                    m.calculatedWidth = m.measureWidth();
                } else {
                    calculateIncrementalWidthTree(child);
                }
            }
        }
        rootWidget.calculateSlotsWidth(false);
        calculateSlotWidthRecursive(rootWidget);
    }

    function calculateSlotWidthRecursive(rootWidget: Widget) {
        for (let slot of rootWidget.slots) {
            for (let child of slot.children) {
                if (child.width.type == DistanceType.fixed) {
                }else {
                    child.calculateSlotsWidth(true);
                    calculateSlotWidthRecursive(child);
                }
            }
        }

    }

    export function calculateBoundaryHeightTree(rootWidget:Widget) {
        if(rootWidget.height.type==DistanceType.fixed){
            rootWidget.calculateSlotsHeight(true);
        }else if(rootWidget.parent&&rootWidget.verticalAlignment==VerticalAlignment.Strech) {
            rootWidget.calculateSlotsHeight(true);
        }else {
            rootWidget.calculateSlotsHeight(false);
        }
        for (let slot of rootWidget.slots) {
            if(slot.isBoundaryHeight) {
                for (let child of slot.children) {
                    if(child.height.type==DistanceType.fixed){
                        calculateBoundaryHeightTree(child);
                    }else if(child.verticalAlignment==VerticalAlignment.Top||
                        child.verticalAlignment==VerticalAlignment.Bottom||
                        child.verticalAlignment==VerticalAlignment.Center){
                        calculateIncrementalHeightTree(child);
                    }else{
                        calculateBoundaryHeightTree(child);
                    }
                }
                rootWidget.calculateSlotsHeight(true);
            }else{
                for (let child of slot.children) {
                    if(child.height.type==DistanceType.fixed){
                        calculateBoundaryHeightTree(child);
                    }else {
                        calculateIncrementalHeightTree(child);
                    }
                }
                rootWidget.calculateSlotsHeight(false);
            }
        }
    }

    export function calculateIncrementalHeightTree(rootWidget: Widget) {
        for (let slot of rootWidget.slots) {
            for (let child of slot.children) {
                if(child.height.type==DistanceType.fixed){
                    calculateBoundaryHeightTree(child);
                }else if(child instanceof MesureableWidget) {
                    let m = <MesureableWidget>child;
                    m.calculatedHeight = m.measureHeight();
                }else{
                    calculateIncrementalHeightTree(child);
                }
            }
        }
        rootWidget.calculateSlotsHeight(false);
        calculateSlotHeightRecursive(rootWidget);
    }

    function calculateSlotHeightRecursive(rootWidget: Widget) {
        for (let slot of rootWidget.slots) {
            for (let child of slot.children) {
                if (child.width.type == DistanceType.fixed) {
                }else {
                    child.calculateSlotsHeight(true);
                    calculateSlotHeightRecursive(child);
                }
            }
        }
    }

    function clearCalculated(rootWidget: Widget) {
        for (let slot of rootWidget.slots) {
            slot.calculatedSlotWidth = 0;
            slot.calculatedSlotHeight = 0;
            for (let child of slot.children) {
                child.calculatedWidth = 0;
                child.calculatedHeight = 0;
                clearCalculated(child);
            }
        }
    }

    export function refreshWidget(widget: Widget) {
        let p = widget;
        while (p.parent != null) {
            p = p.parent;
        }
        clearCalculated(p);
        calculateBoundaryWidthTree(p);
        calculateBoundaryHeightTree(p);
        p.doLayout();
    }


    export class TreebasedLayoutAlgorithm extends LayoutAlgorithm{

        constructor(layoutRoot: Widget) {
            super(layoutRoot);
        }

        calculateWidthTree(): void {

        }

        calculateHeightTree(): void {
        }




    }

}