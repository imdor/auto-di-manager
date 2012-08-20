var TextToolsRenderer = function(){
	var my = this;
	my.init = function(o){
		if(o.node === null){
			o.node = cm.N('fieldset', {'class' : 'text-widget-panel'},
                o.shortLinks.title = cm.N('legend',{'class':'legend'}),
				cm.N('div', {'class' : 'line'},
					cm.N('div', {'class' : 'l'}, 'Text style:'),
					cm.N('div', {'class' : 'r'},
						o.shortLinks.bold = cm.N('input', {'type' : 'button', 'name' : 'bold', 'value' : 'b', 'class' : 'button button-bold'}),
						o.shortLinks.italic = cm.N('input', {'type' : 'button', 'name' : 'italic', 'value' : 'i', 'class' : 'button button-italic'}),
						o.shortLinks.underline = cm.N('input', {'type' : 'button', 'name' : 'underline', 'value' : 'u', 'class' : 'button button-underline'})
					)
				),
                cm.N('div', {'class' : 'line'},
                    cm.N('div', {'class' : 'l'}, 'Vertical alignment:'),
                    cm.N('div', {'class' : 'r'},
                        o.shortLinks.top = cm.N('input', {'type' : 'button', 'name' : 't', 'value' : 'Top', 'class' : 'button'}),
                        o.shortLinks.middle = cm.N('input', {'type' : 'button', 'name' : 'm', 'value' : 'Middle', 'class' : 'button'}),
                        o.shortLinks.bottom = cm.N('input', {'type' : 'button', 'name' : 'b', 'value' : 'Bottom', 'class' : 'button'})
                    )
                ),
                cm.N('div', {'class' : 'line'},
                    cm.N('div', {'class' : 'l'}, 'Horizontal alignment:'),
                    cm.N('div', {'class' : 'r'},
                        o.shortLinks.left = cm.N('input', {'type' : 'button', 'name' : 'l', 'value' : 'Left', 'class' : 'button'}),
                        o.shortLinks.center = cm.N('input', {'type' : 'button', 'name' : 'c', 'value' : 'Center', 'class' : 'button'}),
                        o.shortLinks.right = cm.N('input', {'type' : 'button', 'name' : 'r', 'value' : 'Right', 'class' : 'button'})
                    )
                ),
				cm.N('div', {'class' : 'line'},
					cm.N('div', {'class' : 'l'}, 'Your text:'),
					cm.N('div', {'class' : 'r'},
						o.shortLinks.textInput = cm.N('input', {'type' : 'text', 'class':'text-input'})
					)
				)
			);
			o.eventManager._getContext().addSubscriber(function(){
				applyValues(o.shortLinks, o.eventManager._getContext());
			});
		}
		applyValues(o.shortLinks, o.eventManager._getContext());
		markTriggers(o.shortLinks, o.eventManager);
		return o;
	};
    my.getType = function(){return 'text';};
	var applyValues = function(shortLinks, model){

        shortLinks.title.textContent = model.get('title')||'Text widget';

		cm[!!model.get('bold')? 'addClass' : 'removeClass'](shortLinks.bold, 'button-pressed');
		cm[!!model.get('italic')? 'addClass' : 'removeClass'](shortLinks.italic, 'button-pressed');
		cm[!!model.get('underline')? 'addClass' : 'removeClass'](shortLinks.underline, 'button-pressed');

        cm[!!model.get('bold')? 'addClass' : 'removeClass'](shortLinks.textInput, 'bold');
        cm[!!model.get('italic')? 'addClass' : 'removeClass'](shortLinks.textInput, 'italic');
        cm[!!model.get('underline')? 'addClass' : 'removeClass'](shortLinks.textInput, 'underline');

        cm[model.get('align-y') == 't'? 'addClass' : 'removeClass'](shortLinks.top, 'button-pressed');
        cm[model.get('align-y') == 'm'? 'addClass' : 'removeClass'](shortLinks.middle, 'button-pressed');
        cm[model.get('align-y') == 'b'? 'addClass' : 'removeClass'](shortLinks.bottom, 'button-pressed');

        cm[model.get('align-x') == 'l'? 'addClass' : 'removeClass'](shortLinks.left, 'button-pressed');
        cm[model.get('align-x') == 'c'? 'addClass' : 'removeClass'](shortLinks.center, 'button-pressed');
        cm[model.get('align-x') == 'r'? 'addClass' : 'removeClass'](shortLinks.right, 'button-pressed');

		if(!!model.get('value') && shortLinks.textInput.value != model.get('value'))
			shortLinks.textInput.value = model.get('value');
		return my;
	};
	var markTriggers = function(shortLinks, eventManager){
        shortLinks.textInput.addEventListener('input', function(e){return eventManager.triggerEvent('widget.tools.input', e);});

        shortLinks.textInput.addEventListener('focus', function(e){return eventManager.triggerEvent('widget.tools.input.focus', e);});
        shortLinks.textInput.addEventListener('blur', function(e){return eventManager.triggerEvent('widget.tools.input.blur', e);});

		shortLinks.italic.addEventListener('click', function(e){return eventManager.triggerEvent('widget.tools.text-style', e);});
		shortLinks.underline.addEventListener('click', function(e){return eventManager.triggerEvent('widget.tools.text-style', e);});
        shortLinks.bold.addEventListener('click', function(e){return eventManager.triggerEvent('widget.tools.text-style', e);});

        shortLinks.top.addEventListener('click', function(e){return eventManager.triggerEvent('widget.tools.align-y', e);});
        shortLinks.middle.addEventListener('click', function(e){return eventManager.triggerEvent('widget.tools.align-y', e);});
        shortLinks.bottom.addEventListener('click', function(e){return eventManager.triggerEvent('widget.tools.align-y', e);});

        shortLinks.left.addEventListener('click', function(e){return eventManager.triggerEvent('widget.tools.align-x', e);});
        shortLinks.center.addEventListener('click', function(e){return eventManager.triggerEvent('widget.tools.align-x', e);});
        shortLinks.right.addEventListener('click', function(e){return eventManager.triggerEvent('widget.tools.align-x', e);});

		return my;
	};
};