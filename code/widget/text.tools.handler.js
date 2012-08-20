var TextToolsHandler = function(){
	var my = this;
	my.init = function(o){
		o.eventManager.addListener('widget.tools.input', inputHandler);
		o.eventManager.addListener('widget.editor.overflow', limitReached);
        o.eventManager.addListener('widget.tools.text-style', textStyle);
        o.eventManager.addListener('widget.tools.align-y', alignY);
        o.eventManager.addListener('widget.tools.align-x', alignX);
        o.eventManager.addListener('widget.tools.input.focus', iFocus);
		return o;
	};

    var iFocus = function(e){
        document.body.addEventListener('touchstart', (function(target){
            var tmp = function(){
                target.blur();
                document.body.removeEventListener('touchstart', tmp);
            };
            return tmp;
        })(e.params.target));
    }
	var limitReached = function(o){
        var currentValue = o.context.get('value');
		if(o.context.state.lastTextValue && currentValue != o.context.state.lastTextValue){
			return o.context.set('value', o.context.state.lastTextValue);

        }else if(!currentValue){
            return false;
        }
        return o.context.set('value', o.context.state.lastTextValue = (currentValue && currentValue.length? currentValue.split('').slice(0, -1).join('') : ''));
	};
    my.getType = function(){return 'text';};
	var inputHandler = function(o){
		if(o.context.state.limit && o.context.get('value').length < o.params.target.value.length)
			return o.context.triggerObserver();
		o.context.state.lastTextValue = o.context.get('value');
		o.context.set('value', o.params.target.value);
	};

    var textStyle = function(o){
        var name = o.params.target.getAttribute('name');
        if(name && (['bold', 'underline', 'italic']).indexOf(name) !== null)
            o.context.set(name, !o.context.get(name));

    };

    var alignY = function(o){
        var name = o.params.target.getAttribute('name');
        if(name && (['b', 'm', 't']).indexOf(name) !== null)
            o.context.set('align-y', name);
    };

    var alignX = function(o){
        var name = o.params.target.getAttribute('name');
        if(name && (['l', 'c', 'r']).indexOf(name) !== null)
            o.context.set('align-x', name);
    };
};