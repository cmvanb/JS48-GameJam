define([
    '../Constants',
    'gameobjects/CloningMachine'
], function(Constants, CloningMachine)
{
    function PlayerController()
    {
        this.sprite = game.add.sprite(0, 0, 'player');

        // Camera.
        game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

        // Physics stuff.
        game.physics.p2.enable(this.sprite, Constants.DEBUG);

        this.body = this.sprite.body;

        this.material = game.physics.p2.createMaterial('playerMaterial', this.body);

        this.body.clearShapes();
        this.body.addCapsule(length, 25, 0, 0, Math.PI / 2);

        this.body.fixedRotation = true;
        this.body.damping = 0.5;

        // Start position.
        this.body.x = CloningMachine.respawnPosition.x;
        this.body.y = CloningMachine.respawnPosition.y;

        // Vars.
        this.cursors = game.input.keyboard.createCursorKeys();

        this.jumpTimer = 0;

        this.jumped = false;

        this.alive = true;

        this.firstDeath = false;

        // Input.
        var killKey = game.input.keyboard.addKey(Phaser.Keyboard.K);

        killKey.onDown.add(this.kill, this);
    }

    PlayerController.JUMP_HEIGHT = 840;

    PlayerController.JUMP_DELAY_MS = 150;

    PlayerController.WALK_SPEED = 350;

    PlayerController.RESPAWN_TIME = 1000;

    PlayerController.prototype.update = function()
    {
        if (this.alive)
        {
            this.handleInput();
        }
        else
        {
            // Freeze the physics body in place after death to avoid weird ghost things from happening.
            this.body.x = -999;
            this.body.y = -999;

            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
    };

    PlayerController.prototype.handleInput = function()
    {
        if (game.scientist.controlsDisabled)
        {
            return;
        }

        if (this.cursors.left.isDown)
        {
            this.body.moveLeft(PlayerController.WALK_SPEED);
        }
        else if (this.cursors.right.isDown)
        {
            this.body.moveRight(PlayerController.WALK_SPEED);
        }
        else
        {
            if (Math.abs(this.body.velocity.x) > 0)
            {
                this.body.velocity.x = this.body.velocity.x * 0.75;

                if (Math.abs(this.body.velocity.x) < 0.1)
                {
                    this.body.velocity.x = 0;
                }
            }
        }

        if (this.cursors.up.isDown
            && game.time.now > this.jumpTimer
            && !this.jumped
            && this.canJump())
        {
            this.body.moveUp(PlayerController.JUMP_HEIGHT);

            this.jumpTimer = game.time.now + PlayerController.JUMP_DELAY_MS;
        }

        this.jumped = this.cursors.up.isDown;
    };

    PlayerController.prototype.canJump = function()
    {
        if (!this.alive)
        {
            return false;
        }

        var yAxis = p2.vec2.fromValues(0, 1);

        var result = false;

        for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
        {
            var c = game.physics.p2.world.narrowphase.contactEquations[i];

            if (c.bodyA === this.body.data
                || c.bodyB === this.body.data)
            {
                // Normal dot Y-axis.
                var d = p2.vec2.dot(c.normalA, yAxis);

                if (c.bodyA === this.body.data)
                {
                    d *= -1;
                }

                if (d > 0.5)
                {
                    return true;
                }
            }
        }

        return result;
    };

    PlayerController.prototype.kill = function()
    {
        console.log('you died');

        this.alive = false;

        this.sprite.visible = false;

        this.body.x = -999;
        this.body.y = -999;

        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        game.camera.unfollow();

        if (!this.firstDeath
            && game.levelSelect.levelId === 1)
        {
            this.firstDeath = true;

            game.scientist.show('firstDeath', 0, true, function()
            {
                this.reset();
            }, this);
        }
        else
        {
            var self = this;

            setTimeout(function()
            {
                self.reset();
            }, PlayerController.RESPAWN_TIME);
        }
    };

    PlayerController.prototype.reset = function()
    {
        this.alive = true;

        this.sprite.visible = true;

        game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

        this.body.x = CloningMachine.respawnPosition.x;
        this.body.y = CloningMachine.respawnPosition.y;

        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    };

    PlayerController.prototype.destroy = function()
    {
        game.camera.unfollow(this.sprite);
        this.sprite.destroy();
    };

    return PlayerController;

});