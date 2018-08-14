namespace LayoutLzg {

    export function getDefaultUniversalPropertyProvider() : UniversalPropertyProvider {

        let getterProvider = new UniversalPropertyGetterProvider();
        let setterProvider = new UniversalPropertySetterProvider();
        let listenerProvider = new UniversalPropertyChangedListenerProvider();

        getterProvider.addProvider(new DictPropertyGetterProvider());

        setterProvider.addProvider(new DictPropertySetterProvider());


        let propertyProvider = new UniversalPropertyProvider(getterProvider, setterProvider, listenerProvider);
        return propertyProvider;
    }

}