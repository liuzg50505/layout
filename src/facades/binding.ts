namespace LayoutLzg {

    export function createPropertyBinding(propertyProvider:PropertyProvider,
                                          target:any, targetPropName:string,
                                          source:any, sourcePropName:string): PropertyBinding {
        let p = new PropertyBinding(propertyProvider);
        p.source = source;
        p.sourcePropertyName = sourcePropName;
        p.target = target;
        p.targetPropertyName = targetPropName;
        p.startBinding();
        return p;
    }

}