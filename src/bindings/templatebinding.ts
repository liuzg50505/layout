namespace LayoutLzg {


    export class TemplatePropertyBinding extends PropertyBinding {
        sourceName:string;
        visualTree:VisualTree;

        startBinding(): Binding {
            this.target = this.visualTree.parentWidget;
            this.source = VisualTree.findWidgetByName(this.visualTree.rootContainer,this.sourceName);
            return super.startBinding();
        }

        stopBinding(): Binding {
            return super.stopBinding();
        }

    }
}