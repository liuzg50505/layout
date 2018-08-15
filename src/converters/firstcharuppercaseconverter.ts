namespace LayoutLzg {
    export class FirstCharUppercaseConverter extends ValueConverter{
        convert(value: any): any {
            if(value==null) return "";
            let v = value.toString();
            return (v[0]+"").toUpperCase()+v.substr(1,v.length);
        }

        convertBack(value: any): any {
            return value;
        }
    }
}