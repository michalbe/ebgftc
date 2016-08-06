/*global requirejs*/

requirejs.config({
    urlArgs: 'bust=' + (new Date()).getTime(),

    paths: {

        // resources
        'requirelib': '../../app/bower_components/requirejs/require',
        'text': '../../app/bower_components/text/text',

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
                'requirelib'
            ]
        },
        {
            name: 'main',
            exclude: []
        }
    ]

});
