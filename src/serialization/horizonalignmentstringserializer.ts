namespace LayoutLzg {

    export class HorizonAlignmentStringSerializer extends StringSerializer{

        serialize(value: any): string {
            if(value==null) return "Stretch";
            let align = <HorizonAlignment>value;
            if(align==HorizonAlignment.Strech) {
                return "Stretch";
            }else if(align==HorizonAlignment.Center) {
                return "Center";
            }else if(align==HorizonAlignment.Left) {
                return "Left";
            }else if(align==HorizonAlignment.Right) {
                return "Right";
            }
            return "";
        }

        deserialize(str: string): any {
            if(str==null||str=="") return HorizonAlignment.Strech;
            if(str.toLowerCase()=="stretch") {
                return HorizonAlignment.Strech;
            }else if(str.toLowerCase()=="center") {
                return HorizonAlignment.Center;
            }else if(str.toLowerCase()=="left") {
                return HorizonAlignment.Left;
            }else if(str.toLowerCase()=="right") {
                return HorizonAlignment.Right;
            }
            return HorizonAlignment.Strech;
        }

    }

}