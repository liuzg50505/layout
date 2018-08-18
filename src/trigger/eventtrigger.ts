namespace LayoutLzg {

    export class EventTrigger extends ControlTrigger{
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
            this.control.addEventListener(this.eventName,this.callback);
        }

        dispose(): void {
            this.control.removeEventListener(this.callback);
        }

    }

}