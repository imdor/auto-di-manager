SERVICES['constructor']['template-manager'] = function(){
	var my = this,
	widgetModelsCollection = [],
	templateModel = null,
	toolsManager = null,
	editorManager = null,
	mainContainerRenderer = null;
	
	my.init = function(){
		return my;
	};

    my.initWidgetManagers = function(){
        my.getWidgetCollections().forEach(function(m){
            /**tools**/
            my._getToolsManager().addModel(m);
            /**editor**/
            my._getEditorManager().addModel(m);
            return true;
        });
        return my;
    };

	my.render = function(){
		var container = my._getApplicationRenderer().render();
		container.inner.appendChild(my._getToolsManager().render());
		container.inner.appendChild(my._getEditorManager().render());
		return container.main;
	};
	/********** injections **********/
	
	/**setters**/
	my.addWidgetModel = function(obj){
        widgetModelsCollection.push(obj);
		return my;
	};
	my.setTemplateModel = function(obj){
		templateModel = obj;
		return my;
	};
	my.setToolsManager = function(obj){
		toolsManager = obj;
		return my;
	};
	my.setEditorManager = function(obj){
		editorManager = obj;
		return my;
	};
	my.setApplicationRenderer = function(obj){
        mainContainerRenderer = obj;
		return my;
	};
	/**getters**/
    my.getApplicationRenderer = function(obj){
        return mainContainerRenderer;
    };
	my.getWidgetCollections = function(){
		return widgetModelsCollection;
	};
	my.getToolsManager = function(){
		return toolsManager;
	};
	my.getEditorManager = function(){
		return editorManager;
	};
};