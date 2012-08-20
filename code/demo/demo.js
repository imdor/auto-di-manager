DI.get('global-event-manager').addListener('application.start', function(){
	document.body.appendChild(
		/*new TemplateAggregate()
			.addWidgetModel(
                new WidgetModel()
                    .setDomainObject(new WidgetDO(incomingWidget))
                    .setEventManager(new EventManager())
					.init()
			)
            .addWidgetModel(
                new WidgetModel()
                    .setDomainObject(new WidgetDO(incomingWidget2))
                    .setEventManager(new EventManager())
                    .init()
            )
			.setToolsManager(
								new WidgetManager()
									.addRenderer({'text' : new TextToolsRenderer()})
									.addHandler({'text' : new TextToolsHandler()})
									.setContainerRenderer(new ToolsContainerRenderer())
			)
			.setEditorManager(
								new WidgetManager()
									.addRenderer({'text' : new TextEditorRenderer()})
									.addHandler({'text' : new TextEditorHandler()})
									.setContainerRenderer(new EditorContainerRenderer())
							)
			.setApplicationRenderer(new ApplicationContainerRenderer())
            .initWidgetManagers()
			.init()
			.render()*/
         DI.get('template-manager').initWidgetManagers().init().render()
	);
});