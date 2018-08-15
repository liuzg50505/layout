namespace LayoutLzg {
    export class DateFormatConverter extends ValueConverter{
        format:string;

        constructor() {
            super();
        }

        setFormat(format:string): DateFormatConverter {
            this.format = format;
            return this;
        }

        convert(value: any): any {
            if(value instanceof Date) {
                let dt = <Date>value;
                return formatDate(dt,this.format);
            }
            return value;
        }

        convertBack(value: any): any {
            return value;
        }

    }
}