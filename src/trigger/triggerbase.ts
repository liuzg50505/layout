namespace LayoutLzg {
    export abstract class Trigger implements Disposable{
        action:Action;
        abstract init():void;
        onTriggered():void {
            if(this.action) {
                this.action.execute();
            }
        }
        abstract dispose():void;
    }


    export abstract class WidgetTrigger extends Trigger {
        widget:Widget;
    }
}
