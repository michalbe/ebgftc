/*global requirejs*/

requirejs.config({

    paths: {
        
        'requirelib': '../../app/bower_components/requirejs/require',
        'jquery': '../../app/bower_components/jquery/jquery'

    },

    shim: {

        
        
    },

    modules: [
        {
            namespace: 'resources',
            name: 'resources',
            create: true,
            include: [
                'requirelib',
                'jquery'
            ]
        }
    ]

});