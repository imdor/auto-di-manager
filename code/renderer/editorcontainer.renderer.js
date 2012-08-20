var EditorContainerRenderer = function(){
	var my = this;
	
	my.render = function(){
		var o = {};
		o.main = cm.N('div', {'class' : 'r'},
			cm.N('div', {'class' : 'inner'},
				cm.N('div', {'class' : 'title'}, 'Editor:'),
				o.inner = cm.N('div', {'class' : 'descr'})
			)
		);
		return o;
	};
};