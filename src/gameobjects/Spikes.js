define([
    'GlobalFunctions'
], function(GlobalFunctions)
{
    function Spikes(sprite)
    {
        this.sprite = sprite;
    }

    Spikes.DISTANCE = 50;

    Spikes.prototype.update = function()
    {
        if (GlobalFunctions.distanceToPlayer(this.sprite) < Spikes.DISTANCE)
        {
            player.kill();
        }
    };

    Spikes.prototype.destroy = function()
    {
        this.sprite.destroy();
    };

    return Spikes;

});