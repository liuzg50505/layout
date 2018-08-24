namespace LayoutLzg {

    export class VerticalAlignmentStringSerializer extends StringSerializer{

        serialize(value: any): string {
            if(value==null) return "Stretch";
            let align = <VerticalAlignment>value;
            if(align==VerticalAlignment.Strech) {
                return "Stretch";
            }else if(align==VerticalAlignment.Center) {
                return "Center";
            }else if(align==VerticalAlignment.Top) {
                return "Top";
            }else if(align==VerticalAlignment.Bottom) {
                return "Bottom";
            }
            return "";
        }

        deserialize(str: string): any {
            if(str==null||str=="") return VerticalAlignment.Strech;
            if(str.toLowerCase()=="stretch") {
                return VerticalAlignment.Strech;
            }else if(str.toLowerCase()=="center") {
                return VerticalAlignment.Center;
            }else if(str.toLowerCase()=="top") {
                return VerticalAlignment.Top;
            }else if(str.toLowerCase()=="bottom") {
                return VerticalAlignment.Bottom;
            }
            return VerticalAlignment.Strech;
        }

    }


}