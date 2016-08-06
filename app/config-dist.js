/*global requirejs*/

requirejs.config({

    paths: {
        
        // resources
        'requirelib': '../../app/bower_components/requirejs/require',
        'jquery': '../../app/bower_components/jquery/jquery',

        // scripts
        'main': 'main'

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
        },
        {
            name: 'main',
            exclude: []
        }
    ]

});