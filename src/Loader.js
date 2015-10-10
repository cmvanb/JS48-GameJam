'use strict';

define([], function ()
{
    // Greet the world.
    console.log('Hello world.');

    // Create a game object.
    var Loader = function()
    {
        console.log('Loader ctor');
    };

    Loader.prototype.loadAll = function()
    {
        game.load.tilemap('map', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('gradiented', 'assets/tiles/gradiented-sheet.png');
    };

    return Loader;
});
