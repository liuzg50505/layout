namespace LayoutLzg {

    export class TemplateControl extends ControlBase {
        private rootBorder : Border = new Border("rootBorder");
        private _visualTree : VisualTree;
        private stateGroups : List<StateGroup>;

        constructor(name: string) {
            super(name);
            this.stateGroups = new List<StateGroup>();
        }

        get visualTree(): VisualTree {
            return this._visualTree;
        }

        set visualTree(value: VisualTree) {
            if(value!=null) {
                value.parentControl = this;
            }
            this._visualTree = value;
        }

        addStateGroup(groupName:string): StateGroup {
            let stageGroup = new StateGroup();
            stageGroup.rootControl = this.visualTree.rootContainer;
            stageGroup.groupName = groupName;
            this.stateGroups.add(stageGroup);
            return stageGroup;
        }

        addStateStyle(groupName:string, statename:string, controlpropertyValues:any) {
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

            for (let controlName in controlpropertyValues) {
                let propertyValues = controlpropertyValues[controlName];
                for (let propertyName in propertyValues){
                    let value = propertyValues[propertyName];
                    state.style.addStyleItem(controlName,propertyName,value);
                }
            }
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
            this.rootBorder.addChild(this._visualTree.rootContainer);
            this._visualTree.rootContainer.width = new Distance(DistanceType.auto,0);
            this._visualTree.rootContainer.height = new Distance(DistanceType.auto,0);
            this._visualTree.rootContainer.horizonAlignment = HorizonAlignment.Strech;
            this._visualTree.rootContainer.verticalAlignment = VerticalAlignment.Strech;

            this.rootBorder.parentSlot = this.parentSlot;
            this.rootBorder.parent = this.parent;

            this.rootBorder.initCalculableSlots();
            this.rootBorder.assembleDom();

            let self = this;
            $(this.getRootElement()).click(function () {
                self.raiseEvent("click");
            });
            $(this.getRootElement()).mouseenter(function () {
                self.raiseEvent("mouseenter");
            });
            $(this.getRootElement()).mouseleave(function () {
                self.raiseEvent("mouseleave");
            });
            $(this.getRootElement()).mousedown(function () {
                self.raiseEvent("mousedown");
                self.pressed = true;
            });
            $(this.getRootElement()).mouseup(function () {
                self.raiseEvent("mouseup");
                self.pressed = false;
            });
            $(this.getRootElement()).mousemove(function () {
                self.raiseEvent("mousemove");
            });
        }

        doLayout(): void {
            this.rootBorder.doLayout();
        }

        estimateHeight_auto(): number {
            return this.rootBorder.estimateHeight();
        }

        estimateWidth_auto(): number {
            return this.rootBorder.estimateWidth();
        }
    }

    export class ContentPresenter extends Control{

        content:Control;

        getRootElement(): HTMLElement {
            if(this.content)
                return this.content.getRootElement();
            if(!this.rootElem) {
                this.rootElem = $("<div></div>")[0];
            }else{
                return this.rootElem;
            }
        }

        estimateWidth(): number {
            if(this.content)
                return this.content.estimateWidth();
            return 0;
        }

        estimateHeight(): number {
            if(this.content)
                return this.content.estimateHeight();
            return 0;
        }

        assembleDom(): void {
            if(this.content) {
                this.content.horizonAlignment = this.horizonAlignment;
                this.content.verticalAlignment = this.verticalAlignment;
                this.content.width = this.width;
                this.content.height = this.height;
                this.content.parent = this.parent;
                this.content.parentSlot = this.parentSlot;
                this.content.assembleDom();
            }
        }

        doLayout(): void {
            if(this.content) this.content.doLayout();
        }

        dispose(): void {
            if(this.content) this.content.dispose();
        }

    }

    export class ItemsPresenter {

    }


}