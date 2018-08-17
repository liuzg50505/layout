namespace LayoutLzg{

    export interface MetaDataApi{

    }

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

    class PropertyChangedCallbackItem {
        callback:Function;
        propertyName:string;

        constructor(propertyName: string, callback: Function) {
            this.callback = callback;
            this.propertyName = propertyName;
        }
    }

    export abstract class FrameworkElement {
        // Name of this control.
        name:string;
        // Width of this Control, it can be a fix value or auto.
        private _width:Distance;
        // Height of this Control, it can be a fix value or auto.
        private _height:Distance;
        // Horizonal alignment of this control in it's parent container
        private _horizonAlignment : HorizonAlignment;
        // Vertical alignment of this control in it's parent container
        private _verticalAlignment : VerticalAlignment;
        // Margin of this control to it's parent, the value in thickness must be a fix value.
        private _margin:Thickness;

        private propChangedCallbacks:List<PropertyChangedCallbackItem>;

        parentSlot:Slot;
        parent:ContainerControl;
        // root div of this control.
        rootElem:HTMLElement;

        constructor(name: string) {
            this.name = name;
            // Init vairables.
            this._horizonAlignment = HorizonAlignment.Strech;
            this._verticalAlignment = VerticalAlignment.Strech;
            this._margin = new Thickness(0,0,0,0);
            this._width = new Distance(DistanceType.fixed,50);
            this._height = new Distance(DistanceType.fixed,50);

            this.propChangedCallbacks = new List<PropertyChangedCallbackItem>();
        }

        get width(): LayoutLzg.Distance {
            return this._width;
        }

        set width(value: LayoutLzg.Distance) {
            this._width = value;
        }

        get height(): LayoutLzg.Distance {
            return this._height;
        }

        set height(value: LayoutLzg.Distance) {
            this._height = value;
        }

        get horizonAlignment(): LayoutLzg.HorizonAlignment {
            return this._horizonAlignment;
        }

        set horizonAlignment(value: LayoutLzg.HorizonAlignment) {
            this._horizonAlignment = value;
        }

        get verticalAlignment(): LayoutLzg.VerticalAlignment {
            return this._verticalAlignment;
        }

        set verticalAlignment(value: LayoutLzg.VerticalAlignment) {
            this._verticalAlignment = value;
        }

        get margin(): LayoutLzg.Thickness {
            return this._margin;
        }

        set margin(value: LayoutLzg.Thickness) {
            this._margin = value;
        }

        // Get the root element of this control.
        abstract getRootElement():HTMLElement;

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

        // Assemble html elements of this control.
        assembleDom():void {
        }

        // Adjust styles html elements of this control.
        doLayout():void{
        }

        getStateProperties():Array<string> {
            return [];
        }

        getNotifyProperties():Array<string> {
            return [];
        }

        addPropertyChangedListener(propertName:string, callback:Function):void {
            this.propChangedCallbacks.add(
                new PropertyChangedCallbackItem(propertName, callback)
            );
        }

        removePropertyChangedListener(propertyName:string, callback:Function):void {
            let elem:PropertyChangedCallbackItem = null;
            for (let propcallbackitem:PropertyChangedCallbackItem of this.propChangedCallbacks) {
                if(propcallbackitem.propertyName==propertyName&&
                    propcallbackitem.callback==callback) {
                    elem = propcallbackitem;
                }
            }
            if(elem!=null) {
                this.propChangedCallbacks.remove(elem);
            }
        }

        addStateChangedListener(propertyName:string):void {

        }

        removeStateChangedListener(propertyName:string, callback:Function):void {

        }

        protected notifyPropertyChanged(propertyName:string) {
            for (let propcallbackitem:PropertyChangedCallbackItem of this.propChangedCallbacks) {
                if(propcallbackitem.propertyName==propertyName) {
                    if(propcallbackitem.callback) propcallbackitem.callback(propertyName);
                }
            }
        }
    }

    // Control class is the base class of all the visual components.
    export abstract class Control extends FrameworkElement implements Disposable{

        // Background of this control, it can be a solid color, or a gradient color , or a picture.
        private _fill:Brush;
        // Border of this control, it can be a solid color, or a gradient color , or a picture.
        private _stroke:Brush;
        // Thickness of this control's border, the value in thickness must be a fix value.
        private _strokeThickness:Thickness;

        constructor(name:string){
            super(name);
            this._strokeThickness = new Thickness(0,0,0,0);
        }

        get fill(): LayoutLzg.Brush {
            return this._fill;
        }

        set fill(value: LayoutLzg.Brush) {
            this._fill = value;
        }

        get stroke(): LayoutLzg.Brush {
            return this._stroke;
        }

        set stroke(value: LayoutLzg.Brush) {
            this._stroke = value;
        }

        get strokeThickness(): LayoutLzg.Thickness {
            return this._strokeThickness;
        }

        set strokeThickness(value: LayoutLzg.Thickness) {
            this._strokeThickness = value;
        }

        abstract dispose(): void;
    }

    // The purpose of the container is to put sub controls together,
    // and the system provides multiple layout containers due to actual requirements.
    export abstract class ContainerControl extends Control{
        protected children:List<Control>;
        protected slots : List<Slot>;


        constructor(name:string) {
            super(name);
            this.children = new List<Control>();
            this.slots = new List<Slot>();
        }

        addChild(control:Control) {
            this.children.add(control);
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


        dispose(): void {
            for (let child of this.children) {
                child.dispose();
            }
        }
    }

    export class ContentPresenter {

    }

    export class ItemsPresenter {

    }
}


