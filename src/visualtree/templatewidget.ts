namespace LayoutLzg {

    export abstract class TemplateWidget extends WidgetBase {
        private rootBorder : Border = new Border("rootBorder");
        private _visualTree : VisualTree;
        protected stateGroups : List<StateGroup>;
        protected stateEventTriggers: List<WidgetTrigger>;

        constructor(name?: string) {
            super(name);
            this.stateGroups = new List<StateGroup>();
            this.stateEventTriggers = new List<WidgetTrigger>();
            // let mainSlot = new Slot();
            // mainSlot.addChild(this.rootBorder);
            // this.slots.add(mainSlot);

            let self = this;
            onEvent(this.getRootElement(),"click",function (e:any) {
                self.raiseEvent("click",[e]);
            });
            onEvent(this.getRootElement(),"mouseenter",function (e:any) {
                self.raiseEvent("mouseenter",[e]);
            });
            onEvent(this.getRootElement(),"mouseleave",function (e:any) {
                self.raiseEvent("mouseleave",[e]);
            });
            onEvent(this.getRootElement(),"mousedown",function (e:any) {
                self.raiseEvent("mousedown",[e]);
                self.pressed = true;
            });
            onEvent(this.getRootElement(),"mouseup",function (e:any) {
                self.raiseEvent("mouseup",[e]);
                self.pressed = false;
            });
            onEvent(this.getRootElement(),"mousemove",function (e:any) {
                self.raiseEvent("mousemove",[e]);
            });

        }

        get slots():List<LayoutLzg.Slot> {
            return this.rootBorder.slots;
        }

        get width(): LayoutLzg.Distance {
            return this._width;
        }

        set width(value: LayoutLzg.Distance) {
            this._width = value;
            this.rootBorder.width = value;
        }

        get height(): LayoutLzg.Distance {
            return this._height;
        }

        set height(value: LayoutLzg.Distance) {
            this._height = value;
            this.rootBorder.height = value;
        }

        get horizonAlignment(): LayoutLzg.HorizonAlignment {
            return this._horizonAlignment;
        }

        set horizonAlignment(value: LayoutLzg.HorizonAlignment) {
            this._horizonAlignment = value;
            this.rootBorder.horizonAlignment = value;
        }

        get verticalAlignment(): LayoutLzg.VerticalAlignment {
            return this._verticalAlignment;
        }

        set verticalAlignment(value: LayoutLzg.VerticalAlignment) {
            this._verticalAlignment = value;
            this.rootBorder.verticalAlignment = value;
        }

        get margin(): LayoutLzg.Thickness {
            return this._margin;
        }

        set margin(value: LayoutLzg.Thickness) {
            this._margin = value;
            this.rootBorder.margin = value;
        }

        get visualTree(): VisualTree {
            return this._visualTree;
        }

        set visualTree(value: VisualTree) {
            if(value!=null) {
                value.parentWidget = this;
            }
            this._visualTree = value;
        }

        addStateGroup(groupName:string): StateGroup {
            let stageGroup = new StateGroup();
            stageGroup.rootWidget = this.visualTree.rootContainer;
            stageGroup.groupName = groupName;
            this.stateGroups.add(stageGroup);
            return stageGroup;
        }

        addStateStyle(groupName:string, statename:string, widgetpropertyValues:any, eventName:string=null) {
            let groups = this.stateGroups.filter(t=>t.groupName==groupName);
            let group:StateGroup = null;
            if(groups.length==0) {
                group = this.addStateGroup(groupName);
            }else{
                group = groups[0];
            }

            let states = group.states.filter(t=>t.name==statename);
            let state:State = null;
            if(states.length==0){
                state = new State();
                state.name = statename;
                state.style = new Style();
                group.addState(state)
            }else{
                state = states[0];
            }

            for (let widgetName in widgetpropertyValues) {
                let propertyValues = widgetpropertyValues[widgetName];
                for (let propertyName in propertyValues){
                    let value = propertyValues[propertyName];
                    state.style.addStyleItem(widgetName,propertyName,value);
                }
            }
            if(eventName) this.addStateTrigger(groupName,statename,eventName);

        }

        addStateTrigger(groupName:string, stateName:string, eventName:string):void {
            let trigger = new DomEventTrigger();
            trigger.widget = this;
            trigger.eventName = eventName;
            let gotostateaction = new GotoStateAction();
            gotostateaction.templateWidget = this;
            gotostateaction.stateName = stateName;
            gotostateaction.groupName = groupName;
            trigger.action = gotostateaction;
            trigger.init();
            this.stateEventTriggers.add(trigger);

        }

        activeState(groupName:string, stateName:string):void {
            for (let stateGroup of this.stateGroups) {
                // stateGroup.isActive = stateGroup.groupName == groupName;
                if(stateGroup.groupName==groupName){
                    stateGroup.applyState(stateName);
                }
            }
            try{
                this.doLayout();
            }catch (e) {}
        }

        getRootElement(): HTMLElement {
            return this.rootBorder.getRootElement();
        }

        assembleDom(): void {
            this.rootBorder.clearChild();
            this.rootBorder.addChild(this._visualTree.rootContainer);
            this._visualTree.rootContainer.width = new Distance(DistanceType.auto,0);
            this._visualTree.rootContainer.height = new Distance(DistanceType.auto,0);
            this._visualTree.rootContainer.horizonAlignment = HorizonAlignment.Strech;
            this._visualTree.rootContainer.verticalAlignment = VerticalAlignment.Strech;

            this.rootBorder.parentSlot = this.parentSlot;
            this.rootBorder.parent = this.parent;

            this.rootBorder.assembleDom();

        }

        doLayout(): void {

            this.rootBorder.doLayout();
        }

        calculateSlotsWidth(isBoundary: boolean): void {
            this.rootBorder.calculateSlotsWidth(isBoundary);
            this.calculatedWidth = this.rootBorder.calculatedWidth;
        }

        calculateSlotsHeight(isBoundary: boolean): void {
            this.rootBorder.calculateSlotsHeight(isBoundary);
            this.calculatedHeight = this.rootBorder.calculatedHeight;
        }

    }

    export class ContentPresenter extends Border{

        private _content:any;
        private contentwidget: Widget;


        constructor(name: string) {
            super(name);
        }

        get content(): any {
            return this._content;
        }

        set content(value: any) {
            if(this._content==value) return;
            this._content = value;
            this.notifyPropertyChanged("content");

            let contentwidget:Widget = null;
            if(typeof this._content === "string" || typeof this._content === "number"){
                let txt = new TextView("",this._content.toString());
                txt.margin = new Thickness(10,10,5,5);
                txt.selectable = false;
                contentwidget = txt;
                contentwidget.horizonAlignment = HorizonAlignment.Strech;
                contentwidget.verticalAlignment = VerticalAlignment.Strech;
                contentwidget.width = new Distance(DistanceType.auto,0);
                contentwidget.height = new Distance(DistanceType.auto,0);
            }else{
                contentwidget = <Widget>this._content;
            }
            this.contentwidget = contentwidget;
            this.assembleDom();
        }

        assembleDom(): void {
            this.clearChild();
            if(this.contentwidget) {
                this.addChild(this.contentwidget);
                super.assembleDom();
            }
        }


    }

    export class ItemsPresenter extends Widget{

        panel:ContainerWidget;

        calculateSlotsWidth(isBoundary: boolean): void {
        }

        calculateSlotsHeight(isBoundary: boolean): void {
        }

        getRootElement(): HTMLElement {
            return this.panel.getRootElement();
        }

        dispose(): void {
        }


    }


}