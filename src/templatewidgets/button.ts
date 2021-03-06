namespace LayoutLzg {

    @registclass
    export class Button extends TemplateWidget{

        @registproperty("number")
        radius: number;
        private _content: any;
        private contentPresentor: ContentPresenter;

        constructor(name?: string) {
            super(name);
            this.radius = 5;
            this.initVisualTree();
            this.initStates();
        }

        private initVisualTree():void {
            this.visualTree = new VisualTree();
            let rootBorder = new Border("root");

            this.contentPresentor = new ContentPresenter("_content");
            this.contentPresentor.width = new Distance(DistanceType.auto,0);
            this.contentPresentor.height = new Distance(DistanceType.auto,0);
            this.contentPresentor.horizonAlignment = HorizonAlignment.Center;
            this.contentPresentor.verticalAlignment = VerticalAlignment.Center;


            let vlinear = new Vlinearlayout("");
            vlinear.horizonAlignment = HorizonAlignment.Strech;
            vlinear.verticalAlignment = VerticalAlignment.Strech;
            vlinear.width = new Distance(DistanceType.auto,0);
            vlinear.height = new Distance(DistanceType.auto,0);
            vlinear.addCell(new Distance(DistanceType.weight,1));
            vlinear.addCell(new Distance(DistanceType.weight,1));
            let bgRect1 = new Rect("rectup");
            let bgRect2 = new Rect("rectdown");
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
            bgRect2.fill = new SolidColorBrush("#E5E5E5");
            bgRect2.stroke = new SolidColorBrush("#437DD4");
            bgRect2.strokeThickness = new Thickness(1,1,0,1);
            vlinear.addChild(bgRect1);
            vlinear.addChild(bgRect2);
            vlinear.setCell(bgRect1,0);
            vlinear.setCell(bgRect2,1);
            rootBorder.addChild(vlinear);
            rootBorder.addChild(this.contentPresentor);
            this.visualTree.rootContainer = rootBorder;


            let binding = new PropertyBinding(new SimplePropertyProvider(
                new WidgetPropertyGetterProvider(),
                new WidgetPropertySetterProvider(),
                new WidgetPropertyChangedListenerProvider()
            ));
            binding.source = this;
            binding.sourcePropertyName = "content";
            binding.target = this.contentPresentor;
            binding.targetPropertyName = "content";
            binding.startBinding();
        }

        private initStates():void {
            this.stateGroups.clear();
            this.addStateStyle("hoverGroup","mouseenter",{
                "rectup":{
                    "strokeThickness": new Thickness(2,2,2,0)
                },
                "rectdown":{
                    "strokeThickness": new Thickness(2,2,0,2)
                }
            },"mouseenter");
            this.addStateStyle("hoverGroup","mouseleave",{
                "rectup":{
                    "strokeThickness": new Thickness(1,1,1,0)
                },
                "rectdown":{
                    "strokeThickness": new Thickness(1,1,0,1)
                }
            },"mouseleave");

            this.addStateStyle("pressGroup","pressed",{
                "rectup":{
                    "fill": new SolidColorBrush("#F1F1F1")
                },
                "rectdown":{
                    "fill": new SolidColorBrush("#F1F1F1")
                }
            },"mousedown");
            this.addStateStyle("pressGroup","released",{
                "rectup":{
                    "fill": new SolidColorBrush("#F1F1F1")
                },
                "rectdown":{
                    "fill": new SolidColorBrush("#E5E5E5")
                }
            },"mouseup");
        }

        @registproperty("any")
        get content(): any {
            return this._content;
        }

        set content(value: any) {
            if(this._content==value) return;
            this._content = value;
            this.notifyPropertyChanged("content");
        }

        assembleDom(): void {
            super.assembleDom();
        }

        // private lastcontent:any;

        // doLayout(): void {
        //     if(this.content!=this.lastcontent){
        //         this.lastcontent = this.content;
        //         this.contentPresentor.content = this.content;
        //         this.contentPresentor.assembleDom();
        //         refreshWidget(this);
        //     }
        //     super.doLayout();
        // }
    }

}