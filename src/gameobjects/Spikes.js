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
        var myPos = GlobalFunctions.getSpriteAnchorPosition(this.sprite);
        var playerPos = GlobalFunctions.getSpriteAnchorPosition(player.sprite);

        var distance = Phaser.Point.distance(myPos, playerPos);

        if (distance < Spikes.DISTANCE)
        {
            player.kill();
        }
    };

    return Spikes;

});