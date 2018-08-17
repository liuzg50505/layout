namespace LayoutLzg{
    export class GlobalMeta {
        static proptypes:Array<any>=[]
    }

    export function PropertyType(type:string):any{
        console.log("TTT");
        return function (target:any, propertyKey: string, descriptor: PropertyDescriptor):any {
            console.log("PropertyType(type:string): called");
            GlobalMeta.proptypes.push({
                target:target,
                propertyKey:propertyKey
            })
        };
        // return null;
    }
    @PropertyType("Class")
    export class Test{
        className:string='Layout.Test';
        private _age:number;

        @PropertyType("Event")
        get age(): number {
            return this._age;
        }

        set age(value: number) {
            this._age = value;
        }

        @PropertyType("Event")
        method():void{

        }
    }

    export function test_dec(){
        // let t = new Test();
        // t.method();
    }
}