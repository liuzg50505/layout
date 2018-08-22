namespace LayoutLzg {
    export class WidgetEventTrigger extends WidgetTrigger{

        constructor() {
            super();
        }

        onEventTriggered():void{
            if (this.action) this.action.execute();
        }

        init(): void {
            let self = this;
        }

        dispose(): void {
        }

    }
}

