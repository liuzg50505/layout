namespace LayoutLzg {
    export class ExpressionConverter extends ValueConverter{

        expressionStr:string;

        constructor(expressionStr: string) {
            super();
            this.expressionStr = expressionStr;
        }

        convert(value: any): any {
            if(this.expressionStr==null||this.expressionStr=="") return value;
            let func= new Function("value","return " + this.expressionStr);
            try{
                return func(value);
            }catch (e) {}
            return value;
        }

        convertBack(value: any): any {
            return value;
        }
    }
}