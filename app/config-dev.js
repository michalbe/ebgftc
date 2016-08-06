/*global requirejs*/

requirejs.config({
    urlArgs: 'bust=' + (new Date()).getTime(),

    paths: {

        'requirelib': '../../app/bower_components/requirejs/require',
        'text': '../../app/bower_components/text/text'
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
        }
    ]

});
