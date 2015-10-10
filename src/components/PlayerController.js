define([
    'Constants'
], function(Constants)
{
    function PlayerController()
    {
        this.sprite = game.add.sprite(0, 0, 'player');

        // Camera.
        game.camera.follow(this.sprite);

        // Physics stuff.
        game.physics.p2.enable(this.sprite, Constants.DEBUG);

        this.body = this.sprite.body;

        this.material = game.physics.p2.createMaterial('playerMaterial', this.body);

        this.body.clearShapes();
        this.body.addCapsule(length, 25, 0, 0, Math.PI / 2);

        this.body.fixedRotation = true;
        this.body.damping = 0.5;

        // Start position.
        this.body.x = 200;
        this.body.y = 200;

        // Vars.
        this.cursors = game.input.keyboard.createCursorKeys();

        this.jumpTimer = 0;

        this.jumped = false;

        var killKey = game.input.keyboard.addKey(Phaser.Keyboard.K);

        killKey.onDown.add(this.kill, this);
    }

    PlayerController.JUMP_HEIGHT = 880;

    PlayerController.JUMP_DELAY_MS = 150;

    PlayerController.WALK_SPEED = 300;

    PlayerController.prototype.update = function()
    {
        if (scientist.controlsDisabled)
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
    };

    return PlayerController;

});