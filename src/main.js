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

        game.stage.backgroundColor = '#000000';

        var map = game.add.tilemap('test1');

        for (var i = 0; i < Loader.TILE_FILE_NAMES.length; ++i)
        {
            map.addTilesetImage(Loader.TILE_FILE_NAMES[i]);
        }

        var layer = map.createLayer('Walls');

        layer.resizeWorld();
    }

    function update()
    {
    }

    function render()
    {
    }
});
