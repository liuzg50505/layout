namespace LayoutLzg {

    export class Button extends TemplateControl{

        radius: number;

        constructor(name: string) {
            super(name);
            this.radius = 5;
            this.initVisualTree();
        }

        private initVisualTree():void {
            this.visualTree = new VisualTree();
            let rootBorder = new Border("root");
            let vlinear = new VerticalLinearLayout("");
            vlinear.horizonAlignment = HorizonAlignment.Strech;
            vlinear.verticalAlignment = VerticalAlignment.Strech;
            vlinear.width = new Distance(DistanceType.auto,0);
            vlinear.height = new Distance(DistanceType.auto,0);
            vlinear.addCell(new Distance(DistanceType.weight,1));
            vlinear.addCell(new Distance(DistanceType.weight,1));
            let bgRect1 = new Rect("");
            let bgRect2 = new Rect("");
            bgRect1.width = new Distance(DistanceType.auto,0);
            bgRect1.height = new Distance(DistanceType.auto,0);
            bgRect1.horizonAlignment = HorizonAlignment.Strech;
            bgRect1.verticalAlignment = VerticalAlignment.Strech;
            bgRect1.radius_top_left = this.radius;
            bgRect1.radius_top_right = this.radius;
            bgRect1.fill = new SolidColorBrush("#F1F1F1");
            bgRect1.stroke = new SolidColorBrush("#437DD4");
            bgRect1.strokeThickness = new Thickness(1,1,1,0);
            bgRect2.width = new Distance(DistanceType.auto,0);
            bgRect2.height = new Distance(DistanceType.auto,0);
            bgRect2.horizonAlignment = HorizonAlignment.Strech;
            bgRect2.verticalAlignment = VerticalAlignment.Strech;
            bgRect2.radius_bottom_left = this.radius;
            bgRect2.radius_bottom_right = this.radius;
            bgRect2.fill = new SolidColorBrush("#ECECEC");
            bgRect2.stroke = new SolidColorBrush("#437DD4");
            bgRect2.strokeThickness = new Thickness(1,1,0,1);
            vlinear.addChild(bgRect1);
            vlinear.addChild(bgRect2);
            vlinear.setCell(bgRect1,0);
            vlinear.setCell(bgRect2,1);
            rootBorder.addChild(vlinear);
            this.visualTree.rootContainer = rootBorder;
        }
    }

}