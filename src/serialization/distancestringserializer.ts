namespace LayoutLzg {
    export class DistanceStringSerializer extends StringSerializer{

        serialize(value: any): string {
            if(value==null) return "";
            let distance = <Distance>value;
            if(distance.type==DistanceType.auto) return "auto";
            else if(distance.type==DistanceType.fixed) {
                return distance.value.toString();
            }else if(distance.type==DistanceType.weight) {
                return distance.value.toString()+"*";
            }
        }

        deserialize(str: string): any {
            if(str.toLowerCase()=="auto"){
                return new Distance(DistanceType.auto,0);
            }else if(str.indexOf("*")>=0) {
                let n = Number(str.replace("*",""));
                return new Distance(DistanceType.weight,n);
            }else {
                return new Distance(DistanceType.fixed, Number(str));
            }
        }


    }
}