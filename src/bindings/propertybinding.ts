namespace LayoutLzg {

    export class PropertyBinding extends Binding {

        source: any;
        sourcePropertyName: string;

        private sourcePropGetter: PropertyGetter;
        private sourcePropSetter: PropertySetter;
        private targetPropGetter: PropertyGetter;
        private targetPropSetter: PropertySetter;

        private sourcePropListener: PropertyChangedListener;
        private targetPropListener: PropertyChangedListener;

        constructor(propertyProvider: PropertyProvider) {
            super(propertyProvider);
        }

        startBinding(): Binding {
            this.stopBinding();
            let self = this;

            this.sourcePropGetter = this.propertyProvider.getPropertyGetter(this.source, this.sourcePropertyName);
            this.sourcePropSetter = this.propertyProvider.getPropertySetter(this.source, this.sourcePropertyName);
            this.targetPropGetter = this.propertyProvider.getPropertyGetter(this.target, this.targetPropertyName);
            this.targetPropSetter = this.propertyProvider.getPropertySetter(this.target, this.targetPropertyName);
            this.sourcePropListener = this.propertyProvider.getPropertyChangedListener(this.source, this.sourcePropertyName);
            this.targetPropListener = this.propertyProvider.getPropertyChangedListener(this.target, this.targetPropertyName);

            this.updateFromSource();

            this.sourcePropListener.startListen();
            this.sourcePropListener.setPropertyChangedCallback(function () {
                self.updateFromSource.apply(self,[]);
            });

            if (this.mode == BindingMode.Twoway) {
                this.targetPropListener.startListen();
                this.targetPropListener.setPropertyChangedCallback(function () {
                    self.updateFromTarget.apply(self,[]);
                })
            }

            return this;
        }

        stopBinding(): Binding {
            if(this.sourcePropListener) this.sourcePropListener.dispose();
            return this;
        }

        dispose(): void {
            this.stopBinding();
        }

        updateFromSource(): void {
            let v =  this.sourcePropGetter.getValue();
            let old_v = this.targetPropGetter.getValue();
            if (v==old_v) return;
            if(this.converter){
                v = this.converter.convert(v);
            }
            this.targetPropSetter.setValue(v);

        }

        updateFromTarget(): void {
            let v =  this.targetPropGetter.getValue();
            let old_v = this.sourcePropGetter.getValue();
            if (v==old_v) return;
            if(this.converter){
                v = this.converter.convertBack(v);
            }
            this.sourcePropSetter.setValue(v);
        }
    }
}