namespace LayoutLzg {
    export class GotoStateAction extends Action{

        templateWidget:TemplateWidget;
        groupName:string;
        stateName:string;

        constructor() {
            super();
        }

        execute(): void {
            if(this.templateWidget) this.templateWidget.activeState(this.groupName, this.stateName);
        }

    }

}