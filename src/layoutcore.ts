
namespace LayoutLzg{

    export class Slot {
        children:List<Control> = new List<Control>();
        isSlotWidthCalculatable : boolean;
        isSlotHeightCalculatable : boolean;
        calulatedSlotWidth : number;
        calulatedSlotHeight : number;
        container : ContainerControl;

        addChild(child : Control):void {
            this.children.add(child);
            child.parentSlot = this;
            child.parent = null;
        }

        removeChild(child : Control):void {
            this.children.remove(child);
            child.parentSlot = null;
        }

        empty():void {
            for (let i=0;i<this.children.length;i++) {
                let child = this.children[i];
                child.parentSlot = null;
                child.parent = null;
                this.container.removeChild(child);
            }
            this.children.clear();
        }
    }


    // Control class is the base class of all the visual components.
    export class Control{
        // Name of this control.
        name:string;
        // Width of this Control, it can be a fix value or auto.
        width:Distance;
        // Height of this Control, it can be a fix value or auto.
        height:Distance;
        // Horizonal alignment of this control in it's parent container
        horizonAlignment : HorizonAlignment;
        // Vertical alignment of this control in it's parent container
        verticalAlignment : VerticalAlignment;
        // Margin of this control to it's parent, the value in thickness must be a fix value.
        margin:Thickness;

        // Background of this control, it can be a solid color, or a gradient color , or a picture.
        fill:Brush;
        // Border of this control, it can be a solid color, or a gradient color , or a picture.
        stroke:Brush;
        // Thickness of this control's border, the value in thickness must be a fix value.
        strokeThickness:Thickness;

        // // Internal vairable. Indicate the container's width of this control is calculatable.
        // isParentSlotWidthCalculatable : boolean;
        // // Internal vairable. Indicate the container's height of this control is calculatable.
        // isParentSlotHeightCalculatable : boolean;
        // // Internal vairable. Parent slot width.
        // // Slot means the space where the control is placed,
        // // it may be the whole of it's container or a part of it's container.
        // parentSlotWidth:number;
        // // Internal vairable. Parent slot height.
        // parentSlotHeight:number;


        parentSlot:Slot;
        parent:ContainerControl;
        // root div of this control.
        rootElem:HTMLElement;

        constructor(name:string){
            this.name = name;
            // Init vairables.
            this.horizonAlignment = HorizonAlignment.Strech;
            this.verticalAlignment = VerticalAlignment.Strech;
            this.margin = new Thickness(0,0,0,0);
            this.width = new Distance(DistanceType.fixed,50);
            this.height = new Distance(DistanceType.fixed,50);
            this.strokeThickness = new Thickness(0,0,0,0);
        }

        // Estimate the width of this control,
        // the size of this control is determined by many factors,
        // for example : auto/fix value of width/height, parent container, horizonal/vertical alignments, margins。
        // For different types of parent containers, the method of size estimation are totally different.
        estimateWidth():number {
            return 0;
        }

        // Estimate the width of this control,
        // the size of this control is determined by many factors,
        // for example : auto/fix value of width/height, parent container, horizonal/vertical alignments, margins。
        // For different types of parent containers, the method of size estimation are totally different.
        estimateHeight():number{
            return 0;
        }

        // Get the root element of this control.
        getRootElement():HTMLElement {
            return null;
        }

        // Assemble html elements of this control.
        assembleDom():void {
        }

        // Adjust styles html elements of this control.
        doLayout():void{

        }

    }

    // The purpose of the container is to put sub controls together,
    // and the system provides multiple layout containers due to actual requirements.
    export class ContainerControl extends Control{
        protected children:List<Control>;
        protected children2:Array<Control>;
        protected slots : List<Slot>;


        constructor(name:string) {
            super(name);
            this.children = new List<Control>();
            this.children2 = new Array<Control>();
            this.slots = new List<Slot>();
        }

        addChild(control:Control) {
            this.children.add(control);
            this.children2.push(control);
            control.parent = this;
        }

        removeChild(control:Control) {
            this.children.remove(control);
            control.parent = null;
        }

        clearChild():void{
            for (let i=0;i<this.children.length;i++){
                let child = this.children[i];
                child.parent = null;
                if (child.parentSlot) {
                    child.parentSlot.removeChild(child);
                }
            }
            this.children.clear();
        }

        initCalculableSlots():void {
        }

    }

    export class VisualTree {
        rootContainer : ContainerControl;
    }

    export class ContentPresenter {

    }

    export class ItemsPresenter {

    }
}


