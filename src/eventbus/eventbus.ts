namespace LayoutLzg {

    class EventItem {
        name : string;
        private args: any;
        private callbacklist:List<(args:any)=>void> = new List<(args:any)=>void>();

        constructor(name: string, args:any) {
            this.args = args;
            this.name = name;
        }
    }

    export class EventBus {
        callback : List<EventItem> = new List<EventItem>();

        pub(name:string ,args:any) {
            this.callback.add(new EventItem(name, args));
        }

        sub(name:string, callback:(args:any)=>void) {

        }

    }

}