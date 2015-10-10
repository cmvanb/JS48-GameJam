'use strict';

define([], function ()
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
    };

    return Level;
});
