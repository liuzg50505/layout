namespace LayoutLzg {
    export class FunctionBinding extends Binding{

        constructor(propertyProvider: PropertyProvider) {
            super(propertyProvider);
        }

        startBinding(): Binding {
            return this;
        }

        stopBinding(): Binding {
            return this;
        }

        updateFromSource(): void {
        }

        updateFromTarget(): void {
        }


    }
}