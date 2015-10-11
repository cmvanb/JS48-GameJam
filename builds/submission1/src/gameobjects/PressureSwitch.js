define([
    'Constants'
], function(Constants)
{
    function PressureSwitch(sprite, triggerName)
    {
        this.sprite = sprite;

        this.triggerName = triggerName;

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.x += this.sprite.width / 2;
        this.sprite.y += this.sprite.height / 2;

        this.initialX = this.sprite.x;

        game.physics.p2.enable(this.sprite, Constants.DEBUG);

        this.sprite.body.mass = 6;
        this.sprite.body.onBeginContact.add(this.onCollision, this);
    }

    PressureSwitch.prototype.update = function()
    {
        if (this.sprite && this.sprite.body)
        {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.x = this.initialX;
        }
    };

    PressureSwitch.prototype.destroy = function()
    {
        this.sprite.body.destroy();
        this.sprite.destroy();
    };

    PressureSwitch.prototype.onCollision = function(body, bodyB, shapeA, shapeB, equation)
    {
        if (body && body.sprite && body.sprite.key === 'player' &&
            body.y + body.sprite.height < this.sprite.body.y + this.sprite.height * 0.5)
        {
            this.press();
        }
    };

    PressureSwitch.prototype.press = function()
    {
        console.log('switch pressed');

        game.levelSelect.currentLevel.performTrigger(this.triggerName);

        var oldHeight = this.sprite.height;

        this.sprite.loadTexture('switchDown');
        this.sprite.body.destroy();

        this.sprite.y += (oldHeight - this.sprite.height) / 2;

        game.physics.p2.enable(this.sprite, Constants.DEBUG);
        this.sprite.body.mass = 6;
    };

    return PressureSwitch;
});