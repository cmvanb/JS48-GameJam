'use strict';

define([
    'gameobjects/GameObject',
    'components/PlayerController',
    'Constants'
], function (GameObject, PlayerController, Constants)
{
    // Create a game object.
    var Level = function(fileName)
    {
        console.log('Level ctor');

        this.fileName = fileName;

        this.map = null;

        this.walls = null;

        this.backgroundLayer = null;

        this.wallsLayer = null;
    };

    Level.GRAVITY = 2000;

    Level.prototype.create = function()
    {
        // Create tilemap and add images.
        this.map = game.add.tilemap(this.fileName);

        this.map.addTilesetImage('gradiented');
        this.map.addTilesetImage('objects');

        // Create tile layers.
        this.backgroundLayer = this.map.createLayer('Background');

        this.backgroundLayer.resizeWorld();

        this.wallsLayer = this.map.createLayer('Walls');

        this.wallsLayer.resizeWorld();

        // Physics setup.
        //game.physics.p2.friction = 0;
        game.physics.p2.restitution = 0;
        game.physics.p2.gravity.y = Level.GRAVITY;
        game.physics.p2.world.setGlobalStiffness(1e5);

        // Wall objects.
        this.createWalls();

        // Physics objects.
        this.createPhysicsObjects();

        // Create player.
        this.createPlayer();
    };

    Level.prototype.createWalls = function()
    {
        /*var worldMaterial = game.physics.p2.createMaterial('worldMaterial');

        //  4 trues = the 4 faces of the world in left, right, top, bottom order
        game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);*/

        //  Set the tiles for collision.
        //  Do this BEFORE generating the p2 bodies.
        this.map.setCollision(1, true, this.wallsLayer);
        this.map.setCollisionBetween(3, 14, true, this.wallsLayer);

        //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
        //  This call returns an array of body objects which you can perform addition actions on if
        //  required. There is also a parameter to control optimising the map build.
        this.walls = game.physics.p2.convertTilemap(this.map, this.wallsLayer, true, true);

        for (var w = 0; w < this.walls.length; ++w)
        {
            this.walls[w].debug = Constants.DEBUG;
        }
    };

    Level.prototype.createPhysicsObjects = function()
    {
        var physicsObjects = game.add.group();

        this.map.createFromObjects('Objects', 50, 'box', 0, true, false, physicsObjects);

        for (var i = 0; i < physicsObjects.children.length; ++i)
        {
            var physicsObject = physicsObjects.children[i];

            game.physics.p2.enable(physicsObject, Constants.DEBUG);

            physicsObject.body.mass = 6;
            physicsObject.body.damping = 0.5;
        }
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
