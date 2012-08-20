var ToolsContainerRenderer = function(){
	var my = this;
	
	my.render = function(){
		var o = {};
		o.main = cm.N('div', {'class' : 'l'},
			cm.N('div', {'class' : 'inner'},
				cm.N('div', {'class' : 'title'}, 'Tools kit:'),
				o.inner = cm.N('div', {'class' : 'descr'})
			)
		);
		return o;
	};
};