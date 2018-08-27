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
            let mainSlot = new Slot();
            mainSlot.addChild(this.rootBorder);
            this.slots.add(mainSlot);

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
            this.rootBorder.width = this.width;
            this.rootBorder.height = this.height;
            this.rootBorder.horizonAlignment = this.horizonAlignment;
            this.rootBorder.verticalAlignment = this.verticalAlignment;
            this.rootBorder.clearChild();
            this.rootBorder.addChild(this._visualTree.rootContainer);
            this.rootBorder.margin = this.margin;
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
            this.rootBorder.width = this.width;
            this.rootBorder.height = this.height;
            this.rootBorder.horizonAlignment = this.horizonAlignment;
            this.rootBorder.verticalAlignment = this.verticalAlignment;

            if(this.width.type==DistanceType.fixed){
                this.calculatedWidth = this.width.value;
                this.slots[0].calculatedSlotWidth = this.width.value;
            }else if(this.parent&&this.horizonAlignment==HorizonAlignment.Strech&&isBoundary) {
                this.calculatedWidth = this.parentSlot.calculatedSlotWidth - this.margin.left - this.margin.right;
                this.slots[0].calculatedSlotWidth = this.calculatedWidth;
            }
            this.rootBorder.calculateSlotsWidth(isBoundary);
        }

        calculateSlotsHeight(isBoundary: boolean): void {
            this.rootBorder.width = this.width;
            this.rootBorder.height = this.height;
            this.rootBorder.horizonAlignment = this.horizonAlignment;
            this.rootBorder.verticalAlignment = this.verticalAlignment;
            if(this.height.type==DistanceType.fixed){
                this.calculatedHeight = this.height.value;
                this.slots[0].calculatedSlotHeight = this.height.value;
            }else if(this.parent&&this.verticalAlignment==VerticalAlignment.Strech&&isBoundary) {
                this.calculatedHeight = this.parentSlot.calculatedSlotHeight - this.margin.top - this.margin.bottom;
                this.slots[0].calculatedSlotHeight = this.calculatedHeight;
            }
            this.rootBorder.calculateSlotsHeight(isBoundary);
        }

    }

    export class ContentPresenter extends Border{

        content:Widget;


        constructor(name: string) {
            super(name);
        }


        assembleDom(): void {
            this.clearChild();
            if(this.content) {
                this.addChild(this.content);
                super.assembleDom();
            }
        }


    }

    export class ItemsPresenter {

    }


}