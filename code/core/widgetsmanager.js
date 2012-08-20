SERVICES['constructor']['widget-manager'] = function(){
	var my = this;
	var renderers = {};
	var handlers = {};
	var containerRenderer = null;
	var widgetsCollection = [];
	
	my.init = function(){
		return my;
	};

    my.render = function(){
        var container = my._getContainerRenderer().render();
        widgetsCollection.forEach(function(w){
            container.inner.appendChild(initWidget(w).node);
        });
        return container.main;
    };

    var initWidget = function(widget){
        if(!widget.renderer)
            new ErrorHandler('WidgetManager: Can not find renderer for "' + type  + '" widget type');
        if(!widget.handler)
            new ErrorHandler('WidgetManager: Can not find handler for "' + type  + '" widget type');
        return widget.renderer.init(
            widget.handler.init(
                widget
            )
        );
    };

	var createNewWidget = function(model){
        var type = model.get('type');
		return {
            'eventManager' : model._getEventManager(),
            'node' : null,
            'shortLinks' : {},
            'renderer' : renderers[type]||null,
            'handler' : handlers[type]||null
        };
	};
	
	/*<injections>*/
		/*<setters>*/
    my.addModel = function(model){
        if(widgetsCollection.some(function(w){return w.eventManager.getContext() === model}))
            new ErrorHandler('WidgetManager: added model is already in collection');
        widgetsCollection.push(createNewWidget(model));
        return my;
    };
	my.setContainerRenderer = function(obj){
		containerRenderer = obj;
		return my;
	};
	my.setRenderers = function(obj){
		renders = obj;
		return my;
	};
	my.setHandlers = function(obj){
		handlers = obj;
		return my;
	};
	my.addRenderer = function(obj){
        var tmp = {};
        tmp[obj.getType()] = obj;
		cm.merge(renderers, tmp);
		return my;
	};
	my.addHandler = function(obj){
        var tmp = {};
        tmp[obj.getType()] = obj;
		cm.merge(handlers, tmp);
		return my;
	};
		/*</setters>*/
		/*<getters>*/
	my.getHandlers = function(){
		return handlers;
	};
	my.getRenders = function(){
		return renders;
	};
    my.getContainerRenderer = function(){
        return containerRenderer;
    }
		/*</getters>*/
	/*</injections>*/
};