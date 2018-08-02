
namespace LayoutLzg{
    export class Control{
        name:string;
        width:Distance;
        height:Distance;
        horizonAlignment : HorizonAlignment;
        verticalAlignment : VerticalAlignment;
        margin:Thickness;

        isParentSlotWidthCalculatable : boolean;
        isParentSlotHeightCalculatable : boolean;
        parentSlotWidth:number;
        parentSlotHeight:number;

        rootElem:HTMLElement;

        constructor(name:string){
            this.name = name;
            this.horizonAlignment = HorizonAlignment.Strech;
            this.verticalAlignment = VerticalAlignment.Strech;
            this.margin = new Thickness(0,0,0,0);
            this.width = new Distance(DistanceType.fixed,50);
            this.height = new Distance(DistanceType.fixed,50);
        }

        estimateWidth():number {
            return 0;
        }

        estimateHeight():number{
            return 0;
        }

        getRootElement():HTMLElement {
            return null;
        }

        assembleDom():void {
        }

        doLayout():void{

        }

    }

    export class ContainerControl extends Control{
        children:Array<Control>;

        constructor(name:string) {
            super(name);
            this.children= [];
        }

        addChild(control:Control) {
            this.children.push(control);
        }

        removeChild(control:Control) {
            const idx = this.children.indexOf(control);
            if(idx>-1)
                this.children.splice(idx,1);
        }

        clearChild():void{
            this.children = [];
        }

        initCalculableSlots():void {
        }

    }
}


