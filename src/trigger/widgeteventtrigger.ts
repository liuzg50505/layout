namespace LayoutLzg {
    export class WidgetEventTrigger extends WidgetTrigger{

        eventName:string;

        constructor() {
            super();
        }

        onEventTriggered():void{
            if (this.action) this.action.execute();
        }

        init(): void {
            let self = this;
            this.widget.addEventListener(this.eventName, function () {
                self.onEventTriggered.apply(self,arguments);
            });
        }

        dispose(): void {
        }

    }
}

