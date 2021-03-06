namespace LayoutLzg {

    @registclass
    export class ProgressBar extends TemplateWidget{
        private rectProc: Rect;
        private rectUp: Rect;

        @registproperty("number")
        minValue:number;
        @registproperty("number")
        maxValue:number;
        @registproperty("number")
        value:number;
        @registproperty("number")
        radius:number=5;
        @registproperty("number")
        barfill:Brush;

        constructor(name: string) {
            super(name);

            this.minValue = 0;
            this.maxValue = 100;
            this.value = 30;

            this.fill = new LayoutLzg.SolidColorBrush("#adadad");
            this.barfill = new LayoutLzg.SolidColorBrush("#2df25b");
            this.stroke = new LayoutLzg.SolidColorBrush("#0092ff");
            this.strokeThickness = new LayoutLzg.Thickness(1,1,1,1);
            this.shadow = new LayoutLzg.ShadowSettings(0,0,10,1,"#0092ff");
        }

        private initVisualTree():void {
            this.visualTree = new VisualTree();

            let rootBorder = new Border("root");
            let rectProc = new Rect("rectProc");
            let rectBg = new Rect("rectBg");
            let rectUp = new Rect("rectUp");

            rectProc.width = new Distance(DistanceType.fixed,0);
            rectProc.height = new Distance(DistanceType.auto,0);
            rectProc.horizonAlignment = HorizonAlignment.Left;
            rectProc.verticalAlignment = VerticalAlignment.Strech;
            rectProc.radius_top_left = this.radius;
            rectProc.radius_bottom_left = this.radius;
            rectProc.radius_top_right = this.radius;
            rectProc.radius_bottom_right = this.radius;

            rectProc.fill = this.barfill;
            rectProc.stroke = this.stroke;
            rectProc.strokeThickness = new Thickness(this.strokeThickness.left,0,this.strokeThickness.top,this.strokeThickness.bottom);

            rectBg.width = new Distance(DistanceType.auto,0);
            rectBg.height = new Distance(DistanceType.auto,0);
            rectBg.horizonAlignment = HorizonAlignment.Strech;
            rectBg.verticalAlignment = VerticalAlignment.Strech;
            rectBg.radius = this.radius;
            rectBg.fill = this.fill;
            rectBg.stroke = this.stroke;
            rectBg.strokeThickness = this.strokeThickness;
            rectBg.shadow = this.shadow;

            let vlinear = new Vlinearlayout("");
            vlinear.horizonAlignment = HorizonAlignment.Strech;
            vlinear.verticalAlignment = VerticalAlignment.Strech;
            vlinear.width = new Distance(DistanceType.auto,0);
            vlinear.height = new Distance(DistanceType.auto,0);

            vlinear.addCell(new Distance(DistanceType.weight,1));
            vlinear.addCell(new Distance(DistanceType.weight,1));
            vlinear.addChild(rectUp);
            vlinear.setCell(rectUp,0);

            rectUp.width = new Distance(DistanceType.fixed,0);
            rectUp.height = new Distance(DistanceType.auto,0);
            rectUp.horizonAlignment = HorizonAlignment.Strech;
            rectUp.verticalAlignment = VerticalAlignment.Strech;
            rectUp.radius_top_left = this.radius;
            rectUp.radius_top_right = this.radius;

            rectUp.stroke = this.stroke;
            rectUp.opacity = 0.5;
            rectUp.fill = new SolidColorBrush("white");
            rectUp.strokeThickness = new Thickness(this.strokeThickness.left,0,this.strokeThickness.top,0);

            rootBorder.addChild(rectBg);
            rootBorder.addChild(rectProc);
            rootBorder.addChild(vlinear);

            this.rectProc = rectProc;
            this.rectUp = rectUp;
            this.visualTree.rootContainer = rootBorder;
        }


        assembleDom(): void {
            this.initVisualTree();
            super.assembleDom();
        }

        doLayout(): void {
            let w = this.calculatedWidth;
            let rectend = w/(this.maxValue-this.minValue)*(this.value-this.minValue);
            if(rectend>w-this.radius) {
                this.rectProc.radius_top_right = this.radius-w+rectend;
                this.rectProc.radius_bottom_right = this.radius-w+rectend;
                this.rectUp.radius_top_right = this.radius-w+rectend;
            }else{
                this.rectProc.radius_top_right = 0;
                this.rectProc.radius_bottom_right = 0;
                this.rectUp.radius_top_right = 0;
            }
            this.rectProc.width = new Distance(DistanceType.fixed,rectend);
            this.rectUp.width = new Distance(DistanceType.fixed,rectend);
            calculateBoundaryWidthTree(this);
            calculateBoundaryHeightTree(this);
            super.doLayout();
        }
    }




}