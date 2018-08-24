namespace LayoutLzg{

    export class VisualTree {
        rootContainer: ContainerWidget;
        parentWidget:TemplateWidget;
        stateManager:any;

        static findWidgetsByName(root:Widget, name:string):List<Widget> {
            let result = new List<Widget>();
            let rootContainer:any = null;
            if(root.name==name) {
                result.add(root);
            }
            if(root instanceof ContainerWidget) {
                rootContainer = <ContainerWidget>root;
            }else{
                return result;
            }
            for (let child of rootContainer.children) {
                let r =  VisualTree.findWidgetsByName(child, name);
                result.addAll(r);
            }

            return result;
        }

        static findWidgetByName(root:Widget, name:string): Widget {
            let rootContainer:any = null;
            if(root.name==name) {
                return root;
            }
            if(root instanceof ContainerWidget) {
                rootContainer = <ContainerWidget>root;
            }else{
                return null;
            }
            for (let child of rootContainer.children) {
                let r =  VisualTree.findWidgetByName(child, name);
                if(r) return r;
            }
            return null;
        }

        getRootElement(): HTMLElement {
            if (this.rootContainer){
                this.rootContainer.getRootElement();
            }else{
                return null;
            }
        }

        assembleDom(): void {
            if (this.rootContainer) {
                this.rootContainer.assembleDom();
            }
        }
        doLayout(): void {
            if (this.rootContainer) {
                this.rootContainer.doLayout();
            }
        }



    }


}