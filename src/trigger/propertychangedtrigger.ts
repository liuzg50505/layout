namespace LayoutLzg {
    export class PropertyChangedTrigger extends ControlTrigger {
        propertyName:string;
        private callback: Function;
        init(): void {
            super.init();
            let self = this;
            this.callback = function () {
                self.onTriggered();
            };
            this.control.addPropertyChangedListener(this.propertyName,this.callback);
        }

        dispose(): void {
            super.dispose();
            this.control.removePropertyChangedListener(this.callback);
        }
    }

}