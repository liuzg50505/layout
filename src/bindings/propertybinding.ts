namespace LayoutLzg {

    export class PropertyBinding extends Binding {

        source: any;
        sourcePropertyName: string;
        target: any;
        targetPropertyName: string;
        private sourcePropListener: PropertyChangedListener;

        onSourceChanged(): void {

        }

        startBinding(): void {
            let self = this;
            this.sourcePropListener = this.propertyChangedListenerProvider.getPropertyChangedListener(this.source,this.sourcePropertyName);
            this.sourcePropListener.setPropertyChangedCallback(function () {
                let v = self.source[self.sourcePropertyName];
                self.target[self.targetPropertyName] = v;
            });
        }

        stopBinding(): void {
            if(this.sourcePropListener) this.sourcePropListener.stopListen();
        }

        dispose(): void {
            this.stopBinding();
        }
    }
}