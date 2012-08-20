var ApplicationContainerRenderer = function(){
	var my = this;
	my.render = function(){
		var o = {};
		o.main = cm.N('div', {'class' :  'container'},
			o.inner = cm.N('div', {'class' : 'inner'})
		);
		return o;
	};
};