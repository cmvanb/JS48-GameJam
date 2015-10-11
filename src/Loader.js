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
        game.load.tilemap('temp', 'assets/levels/temp.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2', 'assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level3', 'assets/levels/level3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level4', 'assets/levels/level4.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level5', 'assets/levels/level5.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('buttonBig', 'assets/ui/button_big.png');
        game.load.image('gradiented', 'assets/tiles/gradiented-sheet.png');
        game.load.image('objects', 'assets/tiles/objects-sheet.png');
        game.load.image('box', 'assets/objects/box.png');
        game.load.image('player', 'assets/characters/player-small.png');
        game.load.image('scientist', 'assets/characters/dr-monocle-dialog.png');
        game.load.image('cloning-machine', 'assets/objects/cloning-machine.png');
        game.load.image('cloning-machine-active', 'assets/objects/cloning-machine-active.png');
        game.load.image('spikes', 'assets/objects/spikes.png');
        game.load.image('weight', 'assets/objects/weight.png');
        game.load.image('exitdoor', 'assets/objects/exitdoor.png');
        game.load.image('splash', 'assets/ui/splash.png');
        game.load.image('switchUp', 'assets/objects/switch-up.png');
        game.load.image('switchDown', 'assets/objects/switch-down.png');
        game.load.image('drop-tube', 'assets/objects/drop-tube.png');
        game.load.image('drop-tube-open', 'assets/objects/drop-tube-open.png');
        game.load.image('platformLeft', 'assets/objects/platform-left.png');
        game.load.image('platformMiddle', 'assets/objects/platform-middle.png');
        game.load.image('platformRight', 'assets/objects/platform-right.png');

        game.load.audio('jump', 'assets/audio/jump.wav');
        game.load.audio('footstep', 'assets/audio/footstep.wav');
        game.load.audio('respawn', 'assets/audio/respawn.wav');
        game.load.audio('squash', 'assets/audio/squash.wav');
        game.load.audio('machine', 'assets/audio/machine.wav');
        game.load.audio('wilhelm', 'assets/audio/wilhelm.wav');
    };

    return Loader;
});
