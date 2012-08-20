var TextEditorRenderer = function(){
	var my = this;
	
	my.init = function(o){
		if(o.node === null){
			o.node = o.shortLinks.container = cm.Node('div', {'class' : 'widget-text'},
				o.shortLinks.valueHolder = cm.Node('span'));

			o.eventManager._getContext().addSubscriber(function(){
				applyValues(o.shortLinks, o.eventManager._getContext(), o.eventManager);
			});
		}
		o.node.addEventListener('DOMNodeInsertedIntoDocument', function(e){applyValues(o.shortLinks, o.eventManager._getContext(), o.eventManager);});
		markTriggers(o.shortLinks, o.eventManager);
		return o;
	};
    my.getType = function(){return 'text';};
	var applyValues = function(shortLinks, model, eventManager){
		if(model.get('value') != shortLinks.valueHolder.textContent)
			shortLinks.valueHolder.textContent = model.get('value');
		var delayed = [];
		/*** Domain Object Params ***/
		var DO = model._getDomainObject();
		for(var param in DO){
			switch(param){
				case 'text-x-compression-default':
					shortLinks.valueHolder.style.WebkitTransform = 'scale(' + model.get('text-x-compression-default') + ',1)';
				break;
				case 'bold':
                    cm[!!model.get('bold')? 'addClass' : 'removeClass'](shortLinks.valueHolder, 'bold');
				break;
				case 'underline':
                    cm[!!model.get('underline')? 'addClass' : 'removeClass'](shortLinks.valueHolder, 'underline');
				break;
				case 'italic':
                    cm[!!model.get('italic')? 'addClass' : 'removeClass'](shortLinks.valueHolder, 'italic');
				break;
				case 'align-x':
                    shortLinks.container.style.textAlign = ({'c' : 'center', 'r' : 'right', 'l' : 'left'})[model.get('align-x')]||'center';
				break;
                case 'align-y':
                    shortLinks.valueHolder.style.verticalAlign = ({'m' : 'middle', 'b' : 'bottom', 't' : 'top'})[model.get('align-y')]||'middle';
                break;
				case 'text-height':
					shortLinks.valueHolder.style.fontSize = model.get('text-height') + (model.get('text-height-dimension')||'px');
				break;
				case 'block-height':
					shortLinks.container.style.height = model.get('block-height') + (model.get('block-height-dimension')||'px');
				break;
				case 'block-width':
					shortLinks.container.style.width = model.get('block-width') + (model.get('block-width-dimension')||'px');
				break;
                case 'block-x-position':
                    shortLinks.container.style.left = model.get('block-x-position') + (model.get('block-position-dimension')||'px');
                break;
                case 'block-y-position':
                    shortLinks.container.style.top = model.get('block-y-position') + (model.get('block-position-dimension')||'px');
                break;
			}
		}
		/*** State params ***/
		for(var param in model.state){
			switch(param){
				case 'editable':
					shortLinks.container.style.border = model.state.editable? '1px dotted grey' : 'none';
					shortLinks.valueHolder.contentEditable = true;
					shortLinks.valueHolder.focus();
				break;
			}
		}
		/*** Behavior params ***/
		if(model.get('text-height-calculate-mode')){
			shortLinks.valueHolder.style.fontSize = model.get('text-height-min') + (model.get('text-height-dimension')||'px');
			applyHeight(shortLinks.valueHolder, shortLinks.container, model);
		}
		/*if(model.get('text-x-compression-mode')){*/
			var tmp = calculateXCompression(shortLinks.valueHolder, model);
			shortLinks.valueHolder.style.WebkitTransform = 'scale(' + tmp + ', 1)';
			shortLinks.valueHolder.style.marginLeft = ((tmp - 1)*shortLinks.valueHolder.offsetWidth)/2 + 'px';
			shortLinks.valueHolder.style.marginRight = ((tmp - 1)*shortLinks.valueHolder.offsetWidth)/2 + 'px';
		//}
			
		/*** Delayed params ***/
		delayed.forEach(function(o){return o();});
		
		/*** Other stuff ***/
		if(model.state.overflow){
			eventManager.triggerEvent('widget.editor.overflow', {});
		}
		return my;
	};

	var applyHeight = function(textHolder, container, model){
		if(textHolder.offsetWidth && container.offsetWidth > textHolder.offsetWidth){
			var step = model.get('text-height-step');
			var max = model.get('text-height-max');
			var currentValue = parseInt(textHolder.style.fontSize)||model.get('text-height');
            var currentHeight = container.offsetHeight;
			while(true){
				textHolder.style.fontSize = (currentValue + step) + (model.get('text-height-dimension')||'px');
				if(max <= (currentValue + step) || container.offsetWidth <= textHolder.offsetWidth || container.offsetHeight <= textHolder.offsetHeight){
					textHolder.style.fontSize = currentHeight;
					break;
				}
                currentValue += step;
			}
		}
		return currentHeight;
	};
	var calculateXCompression = function(textHolder, model){
		var min = 0, step = 0;
		var currentCompression = getCurrentXCompression(textHolder);
		var currentWidth = /*realTextWidth(model.get('value'), textHolder.style.fontSize, model.get('bold'), model.get('bold'));*/parseFloat(textHolder.offsetWidth);
        //console.log(currentWidth);
		var maxWidth = parseFloat(model.get('block-width'));

		model.state.limit = false;
        if(!model.get('text-x-compression-mode')){
            model.state.overflow = !(currentWidth*currentCompression <= maxWidth);
            model.state.limit = (currentWidth*currentCompression >= maxWidth);
            return currentCompression;
        }
		if(currentWidth > maxWidth){

			if(!((min = parseFloat(model.get('text-x-compression-min'))) && (step = parseFloat(model.get('text-x-compression-step')))))
				throw 'TextEditorRenderer->calculateXCompression: wrong params';
			while(true){
				if(currentWidth*currentCompression <= maxWidth){
					model.state.overflow = false;
					break;
				}else if(currentCompression - step  <= min){
					model.state.overflow = !(currentWidth*currentCompression <= maxWidth);
					model.state.limit = true;
					break;
				}
				currentCompression -= step;
				if(currentCompression < min)
					currentCompression = min;
			}
		}
		return currentCompression;
	};
    var ctx= cm.N('canvas').getContext("2d");
    var realTextWidth = function(text, size, bold, italic){
        ctx.font = (italic? 'italic ' : '') + (bold? 'bold ' : '') + size + ' serif';
        console.log(ctx.font);
        return ctx.measureText(text).width;
    };
	
	var getCurrentXCompression = function(el){
		var res = el.style.WebkitTransform.match(/scale\(([ 0-9\.]+),[ 0-9\.]+\)/i);
		return parseFloat(res? res[1]||1 : 1);
	};

    var calcCircle = function(o){
        var o = cm.merge({
            'x0' : 0, //X coordinates of center (pixels)
            'y0' : 0, //Y coordinates of center(pixels)
            'h' : 0, //height of blocks (pixels)
            'r' : 0, //radius (pixels)
            'lim0' : 0, //start and end intervals for circle calculation.
            'lim1' : 2, //e.g. 0 == (0*Pi)rad == 0deg, 0.5 == (1/2*Pi)rad == 90deg, 1 == (1*Pi)rad == 180deg
            'interval' : {
                'type' : 'pixels',
                'items' : 1
            }
        }, o);
        switch(o.interval.type){
            case 'total':
                var delta = (2/o.interval.value);
                break;
            case 'interval':
                var delta = o.interval.value/(2*o.r);
                break;
        }
        for(; o.lim0 < o.lim1; o.lim0 += delta){
            o.callBack({
                'x0' : o.x0 + Math.round(o.r * Math.cos(o.lim0 * Math.PI)),
                'y0' : o.y0 + Math.round(o.r * Math.sin(o.lim0 * Math.PI)),
                'x1' : o.x0 + Math.round((o.r + o.h) * Math.cos(o.lim0 * Math.PI)),
                'y1' : o.y0 + Math.round((o.r + o.h) * Math.sin(o.lim0 * Math.PI)),
                'rad' : o.lim0 * Math.PI + 0.5 * Math.PI
            });
        }
        return true;
    };

	var markTriggers = function(shortLinks, eventManager){
        //shortLinks.container.addEventListener('click', function(e){return eventManager.triggerEvent('editor.start-editing', {'e' : e, 'valueHolder' : shortLinks.valueHolder});});
		//shortLinks.valueHolder.addEventListener('keyup', function(e){return eventManager.triggerEvent('editor.input', e);});
		//shortLinks.valueHolder.addEventListener('blur', function(e){return eventManager.triggerEvent('editor.blur',  {'e' : e, 'valueHolder' : shortLinks.valueHolder});});
		//shortLinks.valueHolder.addEventListener('focus', function(e){return eventManager.triggerEvent('editor.focus', e);});
	};
};