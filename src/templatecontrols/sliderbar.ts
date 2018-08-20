namespace LayoutLzg {

    export class SliderBar extends TemplateControl{

        minValue:number;
        maxValue:number;
        private _value:number;
        radius:number;
        handleFill: Brush;
        handleStroke: Brush;
        private rectHandle: Rect;
        private mousedownValue:number;

        constructor(name: string) {
            super(name);
            this.minValue = 0;
            this.maxValue = 100;
            this._value = 30;
            this.radius = 10;
            this.handleFill = new SolidColorBrush("#f5f5f5");
            this.handleStroke = new SolidColorBrush("#e5e5e5");
            this.fill = new SolidColorBrush("#e5e5e5");
            this.stroke = new SolidColorBrush("#e5e5e5");
            this.mousedownValue = 0;

            this.notifyProperties.push("value");
        }

        get value(): number {
            return this._value;
        }

        set value(value: number) {
            if(this._value == value) return;
            this.notifyPropertyChanged("value");
            this._value = value;
        }

        private initVisualTree():void {
            this.visualTree = new VisualTree();
            let rootBorder = new Border("root");

            let rectStick = new Rect("sliderStick");
            rectStick.horizonAlignment = HorizonAlignment.Strech;
            rectStick.verticalAlignment = VerticalAlignment.Center;
            rectStick.width = new Distance(DistanceType.auto,0);
            rectStick.height = new Distance(DistanceType.fixed,2);
            rectStick.fill = this.fill;
            rectStick.stroke = this.stroke;
            rectStick.strokeThickness = new Thickness(1,1,1,1);
            rectStick.shadow = new ShadowSettings(0,0,10,0,"#cfcfcf");

            let rectHandle = new Rect("sliderHandle");
            rectHandle.horizonAlignment = HorizonAlignment.Left;
            rectHandle.verticalAlignment = VerticalAlignment.Center;
            rectHandle.radius = this.radius;
            rectHandle.width = new Distance(DistanceType.fixed,this.radius*2);
            rectHandle.height = new Distance(DistanceType.fixed,this.radius*2);
            rectHandle.fill = this.handleFill;
            rectHandle.stroke = this.handleStroke;
            rectHandle.strokeThickness = new Thickness(1,1,1,1);
            rectHandle.shadow = new ShadowSettings(0,0,10,0,"#cfcfcf");

            rootBorder.addChild(rectStick);
            rootBorder.addChild(rectHandle);

            let mousedownScreenX = 0;
            let mousedownScreenY = 0;
            let ismousedown = false;
            let dx = 0;
            let dy = 0;
            let self = this;
            $(rectHandle.getRootElement()).mousedown(function (e) {
                mousedownScreenX = e.screenX;
                mousedownScreenY = e.screenY;
                ismousedown = true;
                self.mousedownValue = self._value;
            });
            $(document.body).mousemove(function (e) {
                if(!ismousedown) return;
                dx = e.screenX - mousedownScreenX;
                dy = e.screenY - mousedownScreenY;
                self.onHandleDrag(dx,dy);
            });
            $(document.body).mouseup(function (e) {
                mousedownScreenX = e.screenX;
                mousedownScreenY = e.screenY;
                ismousedown = false;
            });



            this.visualTree.rootContainer = rootBorder;
            this.rectHandle = rectHandle;
        }

        onHandleDrag(dx: number, dy: number): any {
            let w = this.estimateWidth();
            let v = this.mousedownValue + dx/w*(this.maxValue-this.minValue);
            if(v>this.maxValue) v = this.maxValue;
            if(v<this.minValue) v = this.minValue;
            this.value = v;
            this.doLayout();
        }

        assembleDom(): void {
            this.initVisualTree();
            super.assembleDom();
        }

        doLayout(): void {
            let w = this.estimateWidth();
            let rectend = w/(this.maxValue-this.minValue)*(this._value-this.minValue);
            this.rectHandle.margin.left = rectend;
            super.doLayout();
        }

    }

}