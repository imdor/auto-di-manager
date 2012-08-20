SERVICES['constructor']['widget-model'] = function(){
	var my = this,
		eventManager = null,
		domainObj = null;

    /*<inheriting>*/
    AbstractModel.apply(my);
    /*</inheriting>*/

	my.__init__ = function(){
		return my;
	};

	/********** injections **********/

	/**setters**/
	my.setDomainObject = function(obj){
		domainObj = obj;
		return my;
	};
	my.setEventManager = function(obj){
		eventManager = obj.setContext(my)
									.init();
		return my;
	};
	/**getters**/
	my.getDomainObject = function(){
		return domainObj;
	};
	my.getEventManager = function(){
		return eventManager;
	};
};