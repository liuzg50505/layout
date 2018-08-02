module LayoutLzg{
    export enum HorizonAlignment {
        Strech,
        Left,
        Right,
        Center
    }

    export enum VerticalAlignment{
        Strech,
        Top,
        Bottom,
        Center
    }

    export enum DistanceType{
        auto,
        fixed,
        weight
    }

    export enum StackPanelOrientation {
        Horizonal,
        Vertical
    }


    export class Brush{

    }

    export class Thickness{
        left:number;
        right:number;
        top:number;
        bottom:number;

        constructor(left: number, right: number, top: number, bottom: number) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        }
    }

    export class Distance{
        value:number;
        type:DistanceType;

        constructor(type: DistanceType, value: number) {
            this.value = value;
            this.type = type;
        }
    }

}

