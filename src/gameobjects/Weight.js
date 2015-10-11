define([
    'Constants',
    '../GlobalFunctions'
], function(Constants, GlobalFunctions)
{
    function Weight(sprite)
    {
        this.sprite = sprite;

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.x += this.sprite.width / 2;
        this.sprite.y += this.sprite.height / 2;

        this.dropped = false;
    }

    Weight.DISTANCE = 40;

    Weight.prototype.update = function()
    {
        if (!this.dropped
            && GlobalFunctions.distanceToPlayer(this.sprite) < Weight.DISTANCE)
        {
            this.trigger();

            this.dropped = true;
        }
    };

    Weight.prototype.trigger = function()
    {
        game.physics.p2.enable(this.sprite, Constants.DEBUG);

        this.body = this.sprite.body;

        this.body.fixedRotation = true;
        this.body.mass = 30;

        this.body.onBeginContact.add(this.onCollision, this);
    };

    Weight.prototype.onCollision = function(body, bodyB, shapeA, shapeB, equation)
    {
        if (body
            && body.sprite
            && body.sprite.key === 'player'
            && this.body.velocity.y > 100)
        {
            player.kill();
        }
    };

    Weight.prototype.destroy = function()
    {
        this.sprite.destroy();
    };

    return Weight;

});