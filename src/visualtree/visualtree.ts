namespace LayoutLzg{

    export class VisualTree {
        rootContainer: ContainerControl;
        parentControl:Control;
        stateManager:any;

        getRootElement(): HTMLElement {
            if (this.rootContainer){
                this.rootContainer.getRootElement();
            }else{
                return null;
            }
        }

        initCalculableSlots():void {
            if (this.rootContainer) {
                this.rootContainer.initCalculableSlots();
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