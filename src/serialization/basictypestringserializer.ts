namespace LayoutLzg {

    export class StringStringSerializer extends StringSerializer{

        serialize(value: any): string {
            if(value==null) return "";
            return value;
        }

        deserialize(str: string): any {
            return str;
        }


    }

    export class NumberStringSerializer extends StringSerializer{

        serialize(value: any): string {
            if(value==null) return "0";
            return value.toString();
        }

        deserialize(str: string): any {
            return Number(str);
        }

    }

}