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
        map.addTilesetImage('objects');

        var backgroundLayer = map.createLayer('Background');

        backgroundLayer.resizeWorld();

        var wallsLayer = map.createLayer('Walls');

        wallsLayer.resizeWorld();

        var objectsLayer = map.createLayer('Objects');

        objectsLayer.resizeWorld();

        //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
        //  This call returns an array of body objects which you can perform addition actions on if
        //  required. There is also a parameter to control optimising the map build.
        game.physics.p2.convertTilemap(map, wallsLayer);

        game.physics.p2.restitution = 0.5;
        game.physics.p2.gravity.y = 300;
    };

    return Level;
});
