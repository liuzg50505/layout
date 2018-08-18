namespace LayoutLzg {
    export class MultiAction extends Action {

        private actions:List<Action>;

        constructor() {
            super();
            this.actions = new List<Action>();
        }

        addAction(action: Action):void {
            this.actions.add(action);
        }

        removeAction(action: Action):void {
            this.actions.remove(action);
        }

        clearActions():void {
            this.actions.clear();
        }

        execute(): void {
            for (let action of this.actions) {
                action.execute();
            }
        }

    }
}