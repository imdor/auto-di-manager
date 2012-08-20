SERVICES['constructor']['event-manager'] = function(){
	var my = this,
		context = null,
		eventCollections = {};

    my.registerEvent = function(eventName){
        if(eventCollections[eventName])
            new ErrorHandler('EventManager: Registered event duplicated "' + eventName + '"');

        eventCollections[eventName] = [];
        return my;
    };

    my.registerEvents = function(listOfEventNames){
        listOfEventNames.forEach(my.registerEvent);
        return my;
    };

	my.addListener = function(eventName, listener){
		if(!eventCollections[eventName])
            new ErrorHandler('EventManager: Added listener to unregistered event "' + eventName + '"');

        eventCollections[eventName].push(listener);
		return my;
	};

	my.triggerEvent = function(eventName, params){
		if(!eventCollections[eventName])
            new ErrorHandler('EventManager: Triggered unregistered event "' + eventName + '"');
        eventCollections[eventName].forEach(function(listener){
			return listener({
					'event' : eventName,
					'context' : my._getContext(),
					'params' : params || null
				});
		});
		return my;
	};

	my.init = function(){

		return my;
	};

	/*<injections>*/
		/*<setters>*/
	my.setContext = function(obj){
		context = obj;
		return my;
	};
		/*</setters>*/
		/*<getters>*/
	my.getContext = function(obj){
		return context;
	};
		/*</getters>*/
	/*</injections>*/
};