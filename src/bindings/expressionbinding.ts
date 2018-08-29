namespace LayoutLzg {
    import ExpressionParser = MathExpressionLzg.ExpressionParser;
    import DataContext = MathExpressionLzg.DataContext;
    import ExpressionNode = MathExpressionLzg.ExpressionNode;
    import PropertyExpressionNode = MathExpressionLzg.PropertyExpressionNode;

    class ObjectProperty {
        obj:any;
        propName:string;

        constructor(obj?: any, propName?: string) {
            this.obj = obj;
            this.propName = propName;
        }
    }

    export class ExpressionBinding extends Binding{

        dataContext: DataContext;
        expressionParser:ExpressionParser;
        expression:string;
        private expRootNode: ExpressionNode;

        private targetPropGetter: PropertyGetter;
        private targetPropSetter: PropertySetter;

        private sourcePropGetterMap : Map<ObjectProperty,PropertyGetter>;
        private sourcePropListenerMap : Map<ObjectProperty,PropertyChangedListener>;


        private findPropertyExpressions(rootNode:ExpressionNode):Array<PropertyExpressionNode>{
            return null;
        }

        private getPropertyExpressionObject(node:PropertyExpressionNode):any {
            return null;
        }

        private getPropertyExpressionPropertyName(node:PropertyExpressionNode):string{
            return null;
        }

        startBinding(): Binding {
            this.stopBinding();
            let self = this;

            this.targetPropGetter = this.propertyProvider.getPropertyGetter(this.target, this.targetPropertyName);
            this.targetPropSetter = this.propertyProvider.getPropertySetter(this.target, this.targetPropertyName);

            this.expRootNode = this.expressionParser.parseExpression(this.expression);
            let propnodes = this.findPropertyExpressions(this.expRootNode);

            this.updateFromSource();

            for (let propnode of propnodes) {
                let obj = this.getPropertyExpressionObject(propnode);
                let propname = this.getPropertyExpressionPropertyName(propnode);

                let getter = this.propertyProvider.getPropertyGetter(obj,propname);
                let listener = this.propertyProvider.getPropertyChangedListener(obj,propname);
                this.sourcePropGetterMap.put(new ObjectProperty(obj,propname),getter);
                this.sourcePropListenerMap.put(new ObjectProperty(obj,propname),listener);

                listener.startListen();
                listener.setPropertyChangedCallback(function () {
                    self.updateFromSource.apply(self,[]);
                });

            }

            return this;
        }

        stopBinding(): Binding {
            for (let item of this.sourcePropListenerMap){
                let objprop = item.key;
                let listener = item.value;
                if(listener) listener.dispose();
            }
            return this;
        }

        updateFromSource(): void {
            let v = this.expRootNode.evaluate(this.dataContext);;
            let old_v = this.targetPropGetter.getValue();
            if (v==old_v) return;
            if(this.converter){
                v = this.converter.convert(v);
            }
            this.targetPropSetter.setValue(v);
        }

        updateFromTarget(): void {
        }


    }
}