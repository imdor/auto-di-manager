var AbstractModel = function(){
	var my = this,
        observation = true;
    my.state = {};

	my.init = function(){
		return my;
	};

	my.set = function(property, value){
		var domain = my._getDomainObject();
		if(!('object' == typeof(domain))) throw 'Invalid domain type';
		domain[property] = value;
		if(my.isObservable()) my._getEventManager().triggerEvent('widget.model.set', {});
		return my;
	};

	my.get = function(property){
		var domain = my._getDomainObject();
		if(!('object' == typeof(domain))) throw 'Invalid domain type';
		return domain[property] || null;
	};

    my.addSubscriber = function(obj){
        my._getEventManager().addListener('widget.model.set', obj);
        return my;
    };

    my.stopObservation = function(){
        observation = false;
        return my;
    };

    my.startObservation = function(){
        observation = true;
        return my;
    };

    my.triggerObserver = function(){
        my.getEventManager().triggerEvent('widget.model.set');
        my.startObservation();
        return my;
    };

    my.isObservable = function(){
        return observation;
    };
	
	/********** injections **********/
	/**setters**/
	/**getters**/
};