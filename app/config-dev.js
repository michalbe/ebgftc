/*global requirejs*/

requirejs.config({
    urlArgs: 'bust=' + (new Date()).getTime(),

    paths: {

        'requirelib': '../../app/bower_components/requirejs/require',
        'jquery': '../../app/bower_components/jquery/dist/jquery',
        '_': '../../app/bower_components/underscore/underscore',

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
