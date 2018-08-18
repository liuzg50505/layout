namespace LayoutLzg {
    export class StateChangedTrigger extends ControlTrigger {
        propertyName:string;
        private callback: Function;
        init(): void {
            super.init();
            let self = this;
            this.callback = function () {
                self.onTriggered();
            };
            this.control.addStateChangedListener(this.propertyName,this.callback);
        }

        dispose(): void {
            super.dispose();
            this.control.removeStateChangedListener(this.callback);
        }
    }
}