namespace LayoutLzg {

    export function registclass(constructor: Function) {
        let t:any = constructor;
        Reflector.instance().registClass(new ClassDefination(t.name,constructor));
    }

    export function registproperty(propertyType: string) {
        return function (target: any, propertyKey: string) {
            Reflector.instance().registProperty(new PropertyDefination(target.constructor,propertyKey,propertyType));
        };
    }

}