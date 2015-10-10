'use strict';

define([
    'Loader',
    'Level',
    'gameobjects/SpeechPopup'
], function (Loader, Level, SpeechPopup)
{
    // Greet the world.
    console.log('Hello world.');

    // Create a game object.
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game',
        {
            preload: preload,
            create: create,
            update: update,
            render: render
        });

    // Assign global, because game jam.
    window.game = game;

    var level;
    var scientist;

    function preload()
    {
        console.log('preload');

        var loader = new Loader();

        loader.loadAll();
    }

    function create()
    {
        console.log('create');

        game.physics.startSystem(Phaser.Physics.P2JS);

        game.stage.backgroundColor = '#000000';

        level = new Level('level1');

        level.create();

        scientist = new SpeechPopup();

        // #care...
        window.scientist = scientist;

        /*setTimeout(function()
        {
            scientist.show('tut', 0, true);
        }, 600);*/
    }

    function update()
    {
        level.update();
        scientist.update();
    }

    function render()
    {
    }
});
