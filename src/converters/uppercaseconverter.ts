namespace LayoutLzg {
    export class UppercaseConverter extends ValueConverter{
        convert(value: any): any {
            if(value==null) return "";
            return value.toString().toUpperCase();
        }

        convertBack(value: any): any {
            return value;
        }
    }
}