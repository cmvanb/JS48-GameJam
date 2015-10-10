define([
    'components/Component'
], function(Component) {

    function PlayerController(parent)
    {
        Component.call(this, parent);

        // Camera.
        game.camera.follow(this.parent);

        // Physics stuff.
        game.physics.p2.enable(this.parent);

        this.body = this.parent.body;

        this.body.setRectangleFromSprite(this.parent.sprite);

        this.body.fixedRotation = true;

        this.body.x = 200;
        this.body.y = 200;

        // Vars.
        this.cursors = game.input.keyboard.createCursorKeys();

        this.jumpTimer = 0;
    }

    PlayerController.prototype = Object.create(Component.prototype);

    PlayerController.JUMP_HEIGHT = 400;

    PlayerController.JUMP_DELAY_MS = 750;

    PlayerController.WALK_SPEED = 300;

    PlayerController.prototype.update = function()
    {
        Component.prototype.update.call(this);

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
            this.body.velocity.x = 0;
        }

        if (this.cursors.up.isDown
            && game.time.now > this.jumpTimer
            && this.canJump())
        {
            this.body.moveUp(PlayerController.JUMP_HEIGHT);

            this.jumpTimer = game.time.now + PlayerController.JUMP_DELAY_MS;
        }
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
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis

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

    return PlayerController;

});