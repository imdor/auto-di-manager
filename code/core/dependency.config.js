SERVICES['dependency'] = {
    'template-manager' : {
        'addWidgetModel' : [
            {
                'service' : 'widget-model',
                'dependency' : { 'domainObject' : {'object' : 'WidgetDO(incomingWidget)'}} /*TODO: remove this hack*/
            },
            {
                'service' : 'widget-model',
                'dependency' : { 'domainObject' : {'object' : 'WidgetDO(incomingWidget2)'} } /*TODO: remove this hack*/
            }
        ],
        'toolsManager' : {
            'service' : 'widget-manager',
            'dependency' :{
                'addRenderer' : {'instance' : 'TextToolsRenderer'},
                'addHandler' : {'instance' : 'TextToolsHandler'},
                'containerRenderer' : {'instance' : 'ToolsContainerRenderer'}
            }
        },
        'editorManager' : {
            'service' : 'widget-manager',
            'dependency' :{
                'addRenderer' : {'instance' : 'TextEditorRenderer'},
                'addHandler' : {'instance' : 'TextEditorHandler'},
                'containerRenderer' : {'instance' : 'EditorContainerRenderer'}
            }
        },
        'applicationRenderer' : {'instance' : 'ApplicationContainerRenderer'}
    },
    'widget-manager' : {},
    'widget-model' : {
        'eventManager' : {
            'service' : 'event-manager',
            'dependency' : {
                'context' : {'poll' : 'widget-model'},
                'registerEvents' : {'value' : [
                    'widget.tools.input',
                    'widget.editor.overflow',
                    'widget.tools.text-style',
                    'widget.tools.align-y',
                    'widget.tools.align-x',
                    'widget.tools.input.blur',
                    'widget.model.set',
                    'widget.editor.start-editing',
                    'widget.editor.input',
                    'widget.editor.blur',
                    'widget.tools.input.focus'
                ]}
            }
        }
    },
    'global-event-manager' : {
        'context' : {'object' : 'window'},
        'registerEvent' : {'value' : 'application.start'}
    }
};
SERVICES['config'] = {
    'global-event-manager' : {
        'singleton' : true
    }
};