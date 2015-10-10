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

    Loader.TILE_FILE_NAMES = [
        'background1',
        'tile-metal',
        'tile-metal-bottom',
        'tile-metal-bottom-left',
        'tile-metal-bottom-left-inside',
        'tile-metal-bottom-right',
        'tile-metal-bottom-right-inside',
        'tile-metal-left',
        'tile-metal-right',
        'tile-metal-top',
        'tile-metal-top-left',
        'tile-metal-top-left-inside',
        'tile-metal-top-right',
        'tile-metal-top-right-inside'
    ];

    Loader.prototype.loadAll = function()
    {
        game.load.tilemap('test1', 'assets/levels/test1.json', null, Phaser.Tilemap.TILED_JSON);

        for (var i = 0; i < Loader.TILE_FILE_NAMES.length; ++i)
        {
            game.load.image(Loader.TILE_FILE_NAMES[i], 'assets/tiles/' + Loader.TILE_FILE_NAMES[i] + '.png');
        }
    };

    return Loader;
});
