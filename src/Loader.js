'use strict';

define([], function ()
{
    // Create a game object.
    var Loader = function()
    {
        console.log('Loader ctor');
    };

    Loader.prototype.loadAll = function()
    {
        game.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('gradiented', 'assets/tiles/gradiented-sheet.png');

        game.load.image('player', 'assets/characters/player.png');
    };

    return Loader;
});
