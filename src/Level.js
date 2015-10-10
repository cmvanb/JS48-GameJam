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
        map.addTilesetImage('objects');

        // Add tile layers.
        var backgroundLayer = map.createLayer('Background');

        backgroundLayer.resizeWorld();

        var wallsLayer = map.createLayer('Walls');

        wallsLayer.resizeWorld();

        //  Set the tiles for collision.
        //  Do this BEFORE generating the p2 bodies below.
        //map.setCollision(1);
        map.setCollisionBetween(1, 14, true, wallsLayer);

        //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
        //  This call returns an array of body objects which you can perform addition actions on if
        //  required. There is also a parameter to control optimising the map build.
        game.physics.p2.convertTilemap(map, wallsLayer);

        game.physics.p2.restitution = 0.0;
        game.physics.p2.gravity.y = 600;

        // Physics objects.
        var physicsObjects = game.add.group();

        map.createFromObjects('Objects', 50, 'box', 0, true, false, physicsObjects);

        for (var i = 0; i < physicsObjects.children.length; ++i)
        {
            var physicsObject = physicsObjects.children[i];

            game.physics.p2.enable(physicsObject);
        }

        // Create player.
        this.createPlayer();
    };

    Level.prototype.createPlayer = function()
    {
        this.player = new GameObject('player', [PlayerController]);
    };

    Level.prototype.update = function()
    {
        this.player.update();
    };

    return Level;
});
