'use strict';

define([
    'components/PlayerController',
    'Constants',
    'components/CloningMachine'
], function (PlayerController, Constants, CloningMachine)
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

        this.cloningMachines = [];
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
        var cloningMachinesGroup = game.add.group();

        this.map.createFromObjects('Objects', 51, 'cloning-machine', 0, true, false, cloningMachinesGroup);

        for (var i = 0; i < cloningMachinesGroup.children.length; ++i)
        {
            var cloningMachine = new CloningMachine(cloningMachinesGroup.children[i]);

            this.cloningMachines.push(cloningMachine);
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

        // Friction to use in the contact of these two materials.
        playerWallContact.friction = 0;

        // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
        playerWallContact.restitution = 0;

        // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
        playerWallContact.stiffness = 1e10;

        // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
        playerWallContact.relaxation = 1e10;

        // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
        playerWallContact.frictionStiffness = 1e10;

        // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
        playerWallContact.frictionRelaxation = 1e10;

        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the
        // surface velocity is positive, bodyA will slide to the right.
        playerWallContact.surfaceVelocity = 0;
    };

    Level.prototype.update = function()
    {
        this.player.update();

        for (var i = 0; i < this.cloningMachines.length; ++i)
        {
            this.cloningMachines[i].update();
        }
    };

    return Level;
});
