namespace LayoutLzg{

    export function testList():void{

        let literal1 = new LayoutLzg.TextView('a','11111');
        let literal2 = new LayoutLzg.TextView('a','22222222222222222222222222222');
        let literal3 = new LayoutLzg.TextView('a','3333333333');


        let lst = new List<TextView>();
        lst.add(literal1);
        lst.add(literal2);
        lst.add(literal3);
        lst.clear();
    }


    export class List<T> extends Array<T>{

        add(item:T) : void {
            super.push(item);
        }

        addAll(items:Array<T>) : void {
            for(let i=0;i<items.length;i++) {
                this.add(items[i]);
            }
        }

        remove(item:T):void {
            for(let i=0;i<this.length;i++) {
                let curitem = this[i];
                if(curitem==item) {
                    super.splice(i,1);
                    return;
                }
            }
        }

        removeAll(items:Array<T>) :void {
            for (let i=0;i<items.length;i++) {
                let item = items[i];
                this.remove(item);
            }
        }

        clear() :void {
            super.splice(0,this.length);
        }





    }

}