namespace LayoutLzg {
    export class PipelineConverter extends ValueConverter{
        converters:Array<ValueConverter>=[];

        addConverter(converter: ValueConverter):PipelineConverter {
            if (converter==null) return this;
            this.converters.push(converter);
            return this;
        }

        addConverters(converters: Array<ValueConverter>):PipelineConverter {
            if (converters==null) return this;
            for (let converter of converters) {
                this.converters.push(converter);
            }
            return this;
        }

        convert(value: any): any {
            let curvalue:any = value;
            for (let converter of this.converters) {
                curvalue = converter.convert(curvalue);
            }
            return curvalue;
        }

        convertBack(value: any): any {
            let curvalue:any = value;
            for (let converter of this.converters.reverse()) {
                curvalue = converter.convert(value);
            }
            return curvalue;
        }
    }
}