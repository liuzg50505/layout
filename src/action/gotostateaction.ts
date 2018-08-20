namespace LayoutLzg {
    export class GotoStateAction extends Action{

        templateControl:TemplateControl;
        groupName:string;
        stateName:string;

        constructor() {
            super();
        }

        execute(): void {
            if(this.templateControl) this.templateControl.activeState(this.groupName, this.stateName);
        }

    }

}