namespace LayoutLzg {

    export function createPropertyBinding(propertyProvider:PropertyProvider,
                                          target:any, targetPropName:string,
                                          source:any, sourcePropName:string, mode: BindingMode = BindingMode.Oneway): PropertyBinding {
        let p = new PropertyBinding(propertyProvider);
        p.source = source;
        p.sourcePropertyName = sourcePropName;
        p.target = target;
        p.targetPropertyName = targetPropName;
        p.mode = mode;
        return p;
    }

}