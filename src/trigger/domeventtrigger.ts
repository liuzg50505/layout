namespace LayoutLzg {

    export class DomEventTrigger extends WidgetTrigger{
        eventName:string;
        private callback: Function;

        constructor() {
            super();
        }

        init(): void {
            let self = this;
            this.callback = function () {
                self.onTriggered();
            };
            this.widget.addEventListener(this.eventName,this.callback);
        }

        dispose(): void {
            this.widget.removeEventListener(this.callback);
        }

    }

}