namespace LayoutLzg {

    export function calculateBoundaryWidthTree(rootWidget:Widget) {
        if(rootWidget.width.type==DistanceType.fixed){
            rootWidget.calculateSlotsWidth(true);
        }else{
            if(rootWidget.parent&&rootWidget.horizonAlignment==HorizonAlignment.Strech) {
                rootWidget.calculateSlotsWidth(true);
            }
        }
        for (let slot of rootWidget.slots) {
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
        }else{
            if(rootWidget.parent&&rootWidget.verticalAlignment==VerticalAlignment.Strech) {
                rootWidget.calculateSlotsHeight(true);
            }
        }
        for (let slot of rootWidget.slots) {
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