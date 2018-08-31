namespace LayoutLzg {
    import ExpressionParser = MathExpressionLzg.ExpressionParser;
    import DataContext = MathExpressionLzg.DataContext;
    import ExpressionNode = MathExpressionLzg.ExpressionNode;
    import PropertyExpressionNode = MathExpressionLzg.PropertyExpressionNode;
    import PropertyPathNodeMode = MathExpressionLzg.PropertyPathNodeMode;

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


        constructor(propertyProvider: PropertyProvider) {
            super(propertyProvider);
            this.sourcePropGetterMap = new Map<ObjectProperty, PropertyGetter>();
            this.sourcePropListenerMap = new Map<ObjectProperty,PropertyChangedListener>();
        }

        private findPropertyExpressionsR(rootNode:ExpressionNode, result:Array<PropertyExpressionNode>){
            if(rootNode instanceof PropertyExpressionNode){
                result.push(rootNode);
            }
            for (let childnode of rootNode.arguments) {
                this.findPropertyExpressionsR(childnode, result);
            }
        }

        private findPropertyExpressions(rootNode:ExpressionNode):Array<PropertyExpressionNode>{
            let result:Array<PropertyExpressionNode> = [];
            this.findPropertyExpressionsR(rootNode,result);
            return result;
        }

        private getPropertyExpressionObject(node:PropertyExpressionNode):any {
            if(node.propertyPathNodes.length>=1) {
                let expNode = new PropertyExpressionNode();
                for (let i = 0; i < node.propertyPathNodes.length - 1; i++) {
                    expNode.propertyPathNodes.push(node.propertyPathNodes[i]);
                }
                return expNode.evaluate(this.dataContext);
            }else{
                return this.dataContext;
            }
        }

        private getPropertyExpressionPropertyName(node:PropertyExpressionNode):string{
            if(node.propertyPathNodes.length>=1) {
                let n = node.propertyPathNodes[node.propertyPathNodes.length-1];
                if(n.mode == PropertyPathNodeMode.property) {
                    return n.propName;
                }
            }
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