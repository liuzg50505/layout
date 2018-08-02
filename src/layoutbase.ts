namespace LayoutLzg{
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


    export interface Brush{
        applyToBackground(elem:HTMLElement):void;
        applyToBorder(elem:HTMLElement,thickness:Thickness):void;
        applyToBorderLeft(elem:HTMLElement,thickness:number):void;
        applyToBorderRight(elem:HTMLElement,thickness:number):void;
        applyToBorderTop(elem:HTMLElement,thickness:number):void;
        applyToBorderBottom(elem:HTMLElement,thickness:number):void;
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

