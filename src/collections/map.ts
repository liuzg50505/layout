namespace LayoutLzg{

    export function testmap():void{
        let map = new Map<string,number>();
        map.put('a',33);
        map.put('b',43);
        let b = map.get('b');
        let a = map.get('a');
        map.clear();
    }

    class MapItem<TKey,TValue> {
        key : TKey;
        value : TValue;

        constructor(key: TKey, value: TValue) {
            this.key = key;
            this.value = value;
        }
    }

    export class Map<TKey,TValue> extends Array<MapItem<TKey,TValue>>{

        put(key:TKey, value:TValue) : void {
            this.push(new MapItem(key,value));
        }

        get(key:TKey) : TValue | any {
            for (let i=0;i<this.length;i++) {
                let item = this[i];
                if(item.key==key){
                    return item.value;
                }
            }
            return null;
        }

        clear() :void {
            this.splice(0,this.length);
        }

        containsKey(key:TKey):boolean {
            for (let i=0;i<this.length;i++) {
                let item = this[i];
                if(item.key==key){
                    return true;
                }
            }
            return false;
        }

    }

}