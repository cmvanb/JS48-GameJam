define([
    'Constants',
    'GlobalFunctions'
], function(Constants, GlobalFunctions)
{
    function DropTube(sprite)
    {
        this.sprite = sprite;

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.x += this.sprite.width / 2;
        this.sprite.y += this.sprite.height / 2;

        game.physics.p2.enable(this.sprite, Constants.DEBUG);
        this.sprite.body.kinematic = true;

        this.open = false;
    }

    DropTube.prototype.update = function()
    {
    };

    DropTube.prototype.trigger = function()
    {
        if (!this.open)
        {
            this.open = true;

            this.sprite.loadTexture('drop-tube-open');
            this.sprite.body.destroy();
        }
    };

    DropTube.prototype.destroy = function()
    {
        this.sprite.destroy();
    };

    return DropTube;

});