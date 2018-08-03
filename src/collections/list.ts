namespace LayoutLzg{

    export function testList():void{
        let lst = new List<string>();
        lst.add('sdf');
        lst.add('sdf2');
        lst.add('sdf3');
        lst.clear();
        lst.addAll(['23','24']);
        lst.clear();
    }


    export class List<T> extends Array<T>{

        add(item:T) : void {
            this.push(item);
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
                    this.splice(i,1);
                    return;
                }
            }
        }

        clear() :void {
            this.splice(0,this.length);
        }



    }

}