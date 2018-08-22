namespace LayoutLzg {
    export class PropertyChangedTrigger extends WidgetTrigger {
        propertyName:string;
        private callback: Function;
        init(): void {
            let self = this;
            this.callback = function () {
                self.onTriggered();
            };
            this.widget.addPropertyChangedListener(this.propertyName,this.callback);
        }

        dispose(): void {
            this.widget.removePropertyChangedListener(this.callback);
        }
    }

}