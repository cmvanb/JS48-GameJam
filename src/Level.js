'use strict';

define([
    'gameobjects/GameObject',
    'components/PlayerController'
], function (GameObject, PlayerController)
{
    // Create a game object.
    var Level = function(fileName)
    {
        console.log('Level ctor');

        this.fileName = fileName;
    };

    Level.prototype.create = function()
    {
        var map = game.add.tilemap(this.fileName);

        map.addTilesetImage('gradiented');

        var backgroundLayer = map.createLayer('Background');

        backgroundLayer.resizeWorld();

        var wallsLayer = map.createLayer('Walls');

        wallsLayer.resizeWorld();

        this.createPlayer();
    };

    Level.prototype.createPlayer = function()
    {
        this.player = new GameObject('player', [PlayerController]);
        this.player.sprite.x = 144;
        this.player.sprite.y = 184;
    };

    Level.prototype.update = function()
    {
        this.player.update();
    };

    return Level;
});
