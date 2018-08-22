namespace LayoutLzg {
    export class StateChangedTrigger extends WidgetTrigger {
        propertyName:string;
        private callback: Function;
        init(): void {
            let self = this;
            this.callback = function () {
                self.onTriggered();
            };
            this.widget.addStateChangedListener(this.propertyName,this.callback);
        }

        dispose(): void {
            this.widget.removeStateChangedListener(this.callback);
        }
    }
}