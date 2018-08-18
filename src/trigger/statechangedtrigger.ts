namespace LayoutLzg {
    export class StateChangedTrigger extends ControlTrigger {
        propertyName:string;
        private callback: Function;
        init(): void {
            let self = this;
            this.callback = function () {
                self.onTriggered();
            };
            this.control.addStateChangedListener(this.propertyName,this.callback);
        }

        dispose(): void {
            this.control.removeStateChangedListener(this.callback);
        }
    }
}