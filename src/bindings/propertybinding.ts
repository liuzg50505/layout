namespace LayoutLzg {

    export class PropertyBinding extends Binding {

        source: any;
        sourcePropertyName: string;
        private sourcePropListener: PropertyChangedListener;
        private sourcePropGetter: PropertyGetter;
        private targetPropSetter: PropertySetter;

        constructor(propertyProvider: PropertyProvider) {
            super(propertyProvider);
        }

        startBinding(): void {
            this.stopBinding();
            let self = this;

            this.sourcePropGetter = this.propertyProvider.getPropertyGetter(this.source, this.sourcePropertyName);
            this.targetPropSetter = this.propertyProvider.getPropertySetter(this.target, this.targetPropertyName);
            this.sourcePropListener = this.propertyProvider.getPropertyChangedListener(this.source, this.sourcePropertyName);
            this.sourcePropListener.startListen();
            this.sourcePropListener.setPropertyChangedCallback(function () {
                let v =  self.sourcePropGetter.getValue();
                self.targetPropSetter.setValue(v);
            });

        }

        stopBinding(): void {
            if(this.sourcePropListener) this.sourcePropListener.dispose();
        }

        dispose(): void {
            this.stopBinding();
        }
    }
}