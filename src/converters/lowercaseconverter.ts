namespace LayoutLzg {
    export class LowercaseConverter extends ValueConverter{
        convert(value: any): any {
            if(value==null) return "";
            return value.toString().toLowerCase();
        }

        convertBack(value: any): any {
            return value;
        }
    }
}