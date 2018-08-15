namespace LayoutLzg {

    export function getDefaultUniversalPropertyProvider() : UniversalPropertyProvider {

        let getterProvider = new UniversalPropertyGetterProvider();
        let setterProvider = new UniversalPropertySetterProvider();
        let listenerProvider = new UniversalPropertyChangedListenerProvider();

        getterProvider.addProvider(new DomWidthPropertyGetterProvider());
        getterProvider.addProvider(new DomHeightPropertyGetterProvider());
        getterProvider.addProvider(new DictPropertyGetterProvider());

        setterProvider.addProvider(new DomWidthPropertySetterProvider());
        setterProvider.addProvider(new DomHeightPropertySetterProvider());
        setterProvider.addProvider(new DictPropertySetterProvider());

        listenerProvider.addProvider(new DomSizePropertyChangedListenerProvider());
        listenerProvider.addProvider(new DictPropertyChangedListenerProvider());

        let propertyProvider = new UniversalPropertyProvider(getterProvider, setterProvider, listenerProvider);
        return propertyProvider;
    }

}