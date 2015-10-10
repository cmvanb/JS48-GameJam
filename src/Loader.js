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
        game.load.image('objects', 'assets/tiles/objects-sheet.png');
        game.load.image('box', 'assets/objects/box.png');
        game.load.image('player', 'assets/characters/player-small.png');
        game.load.image('scientist', 'assets/characters/dr-monocle-dialog.png');
        game.load.image('cloning-machine', 'assets/objects/cloning-machine.png');
        game.load.image('cloning-machine-active', 'assets/objects/cloning-machine-active.png');
    };

    return Loader;
});
