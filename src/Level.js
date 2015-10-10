'use strict';

define([
    'Constants',
    'gameobjects/PlayerController',
    'gameobjects/CloningMachine',
    'gameobjects/Spikes',
    'gameobjects/Weight'
], function (Constants, PlayerController, CloningMachine, Spikes, Weight)
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

        this.updatables = [];
    };

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
        game.physics.p2.gravity.y = Constants.GRAVITY;
        game.physics.p2.world.setGlobalStiffness(1e5);

        // Wall objects.
        this.createWalls();

        // Special objects.
        this.createSpecialObjects();

        // Physics objects.
        this.createPhysicsObjects();

        // Create player.
        this.createPlayer();
    };

    Level.prototype.createWalls = function()
    {
        this.wallMaterial = game.physics.p2.createMaterial('wallMaterial');

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
            var wall = this.walls[w];

            wall.setMaterial(this.wallMaterial);

            wall.debug = Constants.DEBUG;
        }
    };

    Level.prototype.createSpecialObjects = function()
    {
        this.createUpdatableObjects(51, 'cloning-machine', CloningMachine);
        this.createUpdatableObjects(52, 'spikes', Spikes);
        this.createUpdatableObjects(53, 'weight', Weight);
    };

    Level.prototype.createUpdatableObjects = function(tiledId, name, ctor)
    {
        var group = game.add.group();

        this.map.createFromObjects('Objects', tiledId, name, 0, true, false, group);

        for (var i = 0; i < group.children.length; ++i)
        {
            var updatableObject = new ctor(group.children[i]);

            this.updatables.push(updatableObject);
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
        window.player = this.player = new PlayerController();

        //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
        //  those 2 materials collide it uses the following settings.
        //  A single material can be used by as many different sprites as you like.
        var playerWallContact = game.physics.p2.createContactMaterial(
            this.player.material, this.wallMaterial);

        playerWallContact.friction = 0;
        playerWallContact.restitution = 0;
        playerWallContact.stiffness = 1e10;
        playerWallContact.relaxation = 1e10;
        playerWallContact.frictionStiffness = 1e10;
        playerWallContact.frictionRelaxation = 1e10;
        playerWallContact.surfaceVelocity = 0;
    };

    Level.prototype.update = function()
    {
        this.player.update();

        for (var i = 0; i < this.updatables.length; ++i)
        {
            this.updatables[i].update();
        }
    };

    return Level;
});
