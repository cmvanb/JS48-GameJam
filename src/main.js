'use strict';

define([
    'Loader'
], function (Loader)
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

        createLevel();
    }

    function createLevel()
    {
        var map = game.add.tilemap('map');

        map.addTilesetImage('gradiented');

        var backgroundLayer = map.createLayer('Background');

        backgroundLayer.resizeWorld();

        var wallsLayer = map.createLayer('Walls');

        wallsLayer.resizeWorld();
    }

    function update()
    {
    }

    function render()
    {
    }
});
