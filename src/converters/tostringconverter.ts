namespace LayoutLzg {
    export class ToStringConverter extends ValueConverter{
        convert(value: any): any {
            if(value==null) return "";
            return value.toString();
        }

        convertBack(value: any): any {
            return value;
        }
    }
}