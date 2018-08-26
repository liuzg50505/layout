namespace LayoutLzg{

    export interface clonable {

    }

    export class Slot {
        children:List<Widget> = new List<Widget>();
        isSlotWidthCalculatable : boolean;
        isSlotHeightCalculatable : boolean;
        calculatedSlotWidth : number = 0;
        calculatedSlotHeight : number = 0;
        container : ContainerWidget;

        addChild(child : Widget):void {
            this.children.add(child);
            child.parentSlot = this;
        }

        removeChild(child : Widget):void {
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

        layoutChildren():void {
            for (let child of this.children) {
                if(child.horizonAlignment==HorizonAlignment.Left) {
                    css(child.getRootElement(),"left","0px");
                }else if(child.horizonAlignment==HorizonAlignment.Right) {
                    css(child.getRootElement(),"right","0px");
                }else if(child.horizonAlignment==HorizonAlignment.Center) {
                    let w = this.calculatedSlotWidth;
                    let ww = child.calculatedWidth+child.margin.left+child.margin.right;
                    let x = (w-ww)/2;
                    css(child.getRootElement(),'left',x+'px');
                }else if(child.horizonAlignment==HorizonAlignment.Strech) {
                    css(child.getRootElement(),"left","0px");
                    css(child.getRootElement(),"right","0px");
                }

                if(child.verticalAlignment==VerticalAlignment.Top) {
                    css(child.getRootElement(),"top","0px");
                }else if(child.verticalAlignment==VerticalAlignment.Bottom) {
                    css(child.getRootElement(),"bottom","0px");
                }else if(child.verticalAlignment==VerticalAlignment.Center) {
                    let h = this.calculatedSlotHeight;
                    let hh = child.calculatedHeight+child.margin.top+child.margin.bottom;
                    let x = (h-hh)/2;
                    css(child.getRootElement(),'top',x+'px');
                }else if(child.verticalAlignment==VerticalAlignment.Strech) {
                    css(child.getRootElement(),"top","0px");
                    css(child.getRootElement(),"bottom","0px");
                }

                child.doLayout();
            }
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

    class EventCallbackItem {
        callback:Function;
        eventName:string;

        constructor(eventName: string, callback: Function) {
            this.callback = callback;
            this.eventName = eventName;
        }
    }

    @registclass
    export abstract class VisualElement {
        // Name of this widget.
        @registproperty("string")
        name:string;
        // Width of this Widget, it can be a fix value or auto.
        private _width:Distance;
        // Height of this Widget, it can be a fix value or auto.
        private _height:Distance;
        // Horizonal alignment of this widget in it's parent container
        private _horizonAlignment : HorizonAlignment;
        // Vertical alignment of this widget in it's parent container
        private _verticalAlignment : VerticalAlignment;
        // Margin of this widget to it's parent, the value in thickness must be a fix value.
        private _margin:Thickness;
        private _pressed:boolean;
        private _mouseenter:boolean;

        protected notifyProperties:Array<string>=[];

        private propChangedCallbacks:List<PropertyChangedCallbackItem>;
        private eventCallbacks:List<EventCallbackItem>;

        parentSlot:Slot;
        parent:ContainerWidget;
        actualContainer:ContainerWidget;
        // root div of this widget.
        rootElem:HTMLElement;

        constructor(name?: string) {
            this.name = name;
            // Init vairables.
            this._horizonAlignment = HorizonAlignment.Strech;
            this._verticalAlignment = VerticalAlignment.Strech;
            this._margin = new Thickness(0,0,0,0);
            this._width = new Distance(DistanceType.fixed,50);
            this._height = new Distance(DistanceType.fixed,50);

            this.propChangedCallbacks = new List<PropertyChangedCallbackItem>();
            this.eventCallbacks = new List<EventCallbackItem>();
        }

        @registproperty("Distance")
        get width(): LayoutLzg.Distance {
            return this._width;
        }

        set width(value: LayoutLzg.Distance) {
            this._width = value;
        }

        @registproperty("Distance")
        get height(): LayoutLzg.Distance {
            return this._height;
        }

        set height(value: LayoutLzg.Distance) {
            this._height = value;
        }

        @registproperty("HorizonAlignment")
        get horizonAlignment(): LayoutLzg.HorizonAlignment {
            return this._horizonAlignment;
        }

        set horizonAlignment(value: LayoutLzg.HorizonAlignment) {
            this._horizonAlignment = value;
        }

        @registproperty("VerticalAlignment")
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

        get pressed(): boolean {
            return this._pressed;
        }

        set pressed(value: boolean) {
            this._pressed = value;
        }

        get mouseenter(): boolean {
            return this._mouseenter;
        }

        set mouseenter(value: boolean) {
            this._mouseenter = value;
        }

        forceRefresh():void {
            this.assembleDom();
            this.doLayout();
        }

        // Get the root element of this widget.
        abstract getRootElement():HTMLElement;

        // Assemble html elements of this widget.
        assembleDom():void {
        }

        // Adjust styles html elements of this widget.
        doLayout():void{
        }

        getStateProperties():Array<string> {
            return [];
        }

        getNotifyProperties():Array<string> {
            return this.notifyProperties;
        }

        addPropertyChangedListener(propertName:string, callback:Function):void {
            this.propChangedCallbacks.add(
                new PropertyChangedCallbackItem(propertName, callback)
            );
        }

        removePropertyChangedListener(callback:Function):void {
            let elem:PropertyChangedCallbackItem = null;
            for (let propcallbackitem of this.propChangedCallbacks) {
                if(propcallbackitem.callback==callback) {
                    elem = propcallbackitem;
                }
            }
            if(elem!=null) {
                this.propChangedCallbacks.remove(elem);
            }
        }

        addStateChangedListener(propertyName:string, callback:Function):void {

        }

        removeStateChangedListener(callback:Function):void {

        }

        protected notifyPropertyChanged(propertyName:string) {
            for (let propcallbackitem of this.propChangedCallbacks) {
                if(propcallbackitem.propertyName==propertyName) {
                    if(propcallbackitem.callback) propcallbackitem.callback(propertyName);
                }
            }
        }

        addEventListener(eventName:string, callback:Function):void {
            this.eventCallbacks.add(
                new EventCallbackItem(eventName, callback)
            );
        }

        removeEventListener(callback:Function):void {
            let events = this.eventCallbacks.filter(t=>t.callback==callback);
            if(events.length>0) {
                this.eventCallbacks.remove(events[0]);
            }
        }

        protected raiseEvent(eventName:string,args:Array<any>=[]){
            for (let eventcallbackitem of this.eventCallbacks) {
                if(eventcallbackitem.eventName==eventName) {
                    if(eventcallbackitem.callback) {
                        let argarr = [eventName];
                        for (let arg of args) {
                            argarr.push(arg);
                        }
                        eventcallbackitem.callback.apply(this,argarr);
                    }
                }
            }
        }
    }

    // Widget class is the base class of all the visual components.
    export abstract class Widget extends VisualElement implements Disposable{

        private _slots : List<Slot>;
        // Background of this widget, it can be a solid color, or a gradient color , or a picture.
        protected _fill:Brush;
        // Border of this widget, it can be a solid color, or a gradient color , or a picture.
        protected _stroke:Brush;
        // Thickness of this widget's border, the value in thickness must be a fix value.
        protected _strokeThickness:Thickness;

        protected _shadow:ShadowSettings;
        calculatedWidth: number;
        calculatedHeight: number;

        constructor(name?:string){
            super(name);
            this._strokeThickness = new Thickness(0,0,0,0);
            this.calculatedWidth = 0;
            this.calculatedHeight = 0;
            this._slots = new List<Slot>();
        }

        get slots(): List<LayoutLzg.Slot> {
            return this._slots;
        }

        set slots(value: List<LayoutLzg.Slot>) {
            this._slots = value;
        }

        @registproperty("Brush")
        get fill(): LayoutLzg.Brush {
            return this._fill;
        }

        set fill(value: LayoutLzg.Brush) {
            if(this._fill != value) this.notifyPropertyChanged("fill");
            this._fill = value;
        }

        @registproperty("Brush")
        get stroke(): LayoutLzg.Brush {
            return this._stroke;
        }

        set stroke(value: LayoutLzg.Brush) {
            if(this._stroke != value) this.notifyPropertyChanged("stroke");
            this._stroke = value;
        }

        @registproperty("Thickness")
        get strokeThickness(): LayoutLzg.Thickness {
            return this._strokeThickness;
        }

        set strokeThickness(value: LayoutLzg.Thickness) {
            if(this._strokeThickness != value) this.notifyPropertyChanged("strokeThickness");
            this._strokeThickness = value;
        }

        @registproperty("ShadowSettings")
        get shadow(): LayoutLzg.ShadowSettings {
            return this._shadow;
        }

        set shadow(value:ShadowSettings) {
            this._shadow=value;
        }

        abstract calculateSlotsWidth(isBoundary:boolean):void;
        abstract calculateSlotsHeight(isBoundary:boolean):void;

        abstract dispose(): void;

    }

    export abstract class MesureableWidget extends Widget {

        abstract measureWidth():number;

        abstract measureHeight():number;

    }

    // The purpose of the container is to put sub widgets together,
    // and the system provides multiple layout containers due to actual requirements.
    export abstract class ContainerWidget extends Widget{
        children:List<Widget>;


        constructor(name:string) {
            super(name);
            this.children = new List<Widget>();
        }

        addChild(widget:Widget) {
            this.children.add(widget);
            widget.parent = this;
        }

        removeChild(widget:Widget) {
            this.children.remove(widget);
            widget.parent = null;
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


        doLayout(): void {
            for (let slot of this.slots) {
                slot.layoutChildren();
            }
        }

        dispose(): void {
            for (let child of this.children) {
                child.dispose();
            }
        }
    }

}


