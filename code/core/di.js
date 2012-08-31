var SERVICES = {
    'constructor' : {},
    'dependency' : {},
    'config' : {}
};
var DI = new function(){
    var my = this;
    var poll = {};
    var globalScope = window;
    var constructorMethod = '__init__';

    my.get = function(serviceName, dependency){
        if(SERVICES.config[serviceName] && SERVICES.config[serviceName].singleton === true && poll[serviceName]){
            if(dependency)
                makeInjections(poll[serviceName], overwriteParams(SERVICES.dependency[serviceName]||{}, dependency));
            return poll[serviceName];
        }
        createServiceInstance(serviceName);
        makeInjections(poll[serviceName], overwriteParams(SERVICES.dependency[serviceName]||{}, dependency||{}));
        if(poll[serviceName][constructorMethod])
            poll[serviceName][constructorMethod]();
        return poll[serviceName];
    };

    var createServiceInstance = function(serviceName){
        if(!SERVICES['constructor'][serviceName])
            throw new Error('Service ' + serviceName + ' does not exists');
        return poll[serviceName] = new SERVICES['constructor'][serviceName];
    };
	
	var extract = function(str){
		var target = globalScope;
		str.split('.').forEach(function(scope){
			target = target[scope];
		});    
		return target;
	};
	
    var overwriteParams = function(origin, custom){
        var result = {};
        for(var param in origin){
            if(!origin.hasOwnProperty(param))
                continue;
            result[param] = origin[param]
        }
        for(var param in custom){
            if(!custom.hasOwnProperty(param))
                continue;
            result[param] = custom[param]
        }
        return result;
    };
	var makeInjections = function(service, dependency){
		
        for(var property in dependency){
            if(!dependency.hasOwnProperty(property))
                continue;
			if(dependency[property] instanceof Array){
				dependency[property].forEach(function(o){
					inject(service, property, prepareInjection(o));
				});
			}else{
				inject(service, property, prepareInjection(dependency[property]));
			}
        }
        return my;
    };
	
	var prepareInjection = function(params){
		for(var type in params){
			if(!params.hasOwnProperty(type))
				continue;
			var value = params[type];
			switch (type){
				case 'value':
					return value;
				case 'object':
					return typeof(value) === 'string'? (extract(value)) : value;
				case 'instance':
					return typeof(value) === 'string'? new (extract(value)) : new value;
				case 'service':
					return my.get(value, params['dependency']);
				case 'poll':
					return poll[value]? poll[value] : null; //not "||" because of Samsung 2011 issues
				default:
					continue;
			}
		}
		return null;
	};
	
	var inject = function(service, method, injection){
		if(service.hasOwnProperty(method) && typeof(service[method]) === 'function'){
            service[method](injection);
        }else{
			service['_get' + method.slice(0, 1).toUpperCase() + method.slice(1)] = function(){return injection;};
		}
	};
};