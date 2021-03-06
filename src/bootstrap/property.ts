namespace LayoutLzg {

    export function getDefaultUniversalPropertyProvider() : UniversalPropertyProvider {

        let getterProvider = new UniversalPropertyGetterProvider();
        let setterProvider = new UniversalPropertySetterProvider();
        let listenerProvider = new UniversalPropertyChangedListenerProvider();

        getterProvider.addProvider(new WidgetPropertyGetterProvider());
        getterProvider.addProvider(new DomWidthPropertyGetterProvider());
        getterProvider.addProvider(new DomHeightPropertyGetterProvider());
        getterProvider.addProvider(new DomTextPropertyGetterProvider());
        getterProvider.addProvider(new DomValuePropertyGetterProvider());
        getterProvider.addProvider(new DictPropertyGetterProvider());

        setterProvider.addProvider(new WidgetPropertySetterProvider());
        setterProvider.addProvider(new DomWidthPropertySetterProvider());
        setterProvider.addProvider(new DomHeightPropertySetterProvider());
        setterProvider.addProvider(new DomTextPropertySetterProvider());
        setterProvider.addProvider(new DomValuePropertySetterProvider());
        setterProvider.addProvider(new DictPropertySetterProvider());

        listenerProvider.addProvider(new WidgetPropertyChangedListenerProvider());
        listenerProvider.addProvider(new DomSizePropertyChangedListenerProvider());
        listenerProvider.addProvider(new DomTextPropertyChangedListenerProvider());
        listenerProvider.addProvider(new DomValuePropertyChangedListenerProvider());
        listenerProvider.addProvider(new DictPropertyChangedListenerProvider());

        return new UniversalPropertyProvider(getterProvider, setterProvider, listenerProvider);
    }

}