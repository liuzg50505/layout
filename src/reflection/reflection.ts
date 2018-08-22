namespace LayoutLzg {

    export function getParentClassConstructor(constructorFunc: any) {
        return Object.getPrototypeOf(constructorFunc.prototype).constructor;
    }

    export class PropertyDefination {
        constructorFunc:Function;
        propertyName:string;
        propertyType:string;

        constructor(constructorFunc:Function, propertyName?: string, propertyType?: string) {
            this.constructorFunc = constructorFunc;
            this.propertyName = propertyName;
            this.propertyType = propertyType;
        }
    }

    export class ClassDefination {
        className:string ;
        constructorFunc:Function;

        constructor(className?: string, constructorFunc?: Function) {
            this.className = className;
            this.constructorFunc = constructorFunc;
        }
    }

    export class Reflector {
        private static _instance: Reflector;
        private classes:List<ClassDefination>;
        private properties:List<PropertyDefination>;

        constructor() {
            this.classes = new List<ClassDefination>();
            this.properties = new List<PropertyDefination>();
        }

        static instance():Reflector {
            if(!Reflector._instance) {
                Reflector._instance = new Reflector();
            }
            return Reflector._instance;
        }

        registClass(classdef:ClassDefination):void {
            this.classes.add(classdef);
        }

        registProperty(propertydef:PropertyDefination):void {
            this.properties.add(propertydef);
        }

        newInstance(className:string):any {
            let s = this.classes.filter(t=>t.className==className);
            if(s.length>0){
                let t:any = s[0].constructorFunc;
                return new t();
            }
        }


        getClass(className:string):ClassDefination {
            let t = this.classes.filter(t=>t.className==className);
            if(t.length==0) return null;
            return t[0];
        }

        getClassProperties(className:string):List<PropertyDefination> {
            let result = new List<PropertyDefination>();
            let classdef = this.getClass(className);
            if(!classdef) return result;

            let c:any = classdef.constructorFunc;
            while (c.name.toLowerCase()!="object") {
                for (let propertyDef of this.properties)  {
                    if(propertyDef.constructorFunc==c) {
                        result.add(propertyDef);
                    }
                }
                c = getParentClassConstructor(c);
            }

            return result;
        }



    }

}