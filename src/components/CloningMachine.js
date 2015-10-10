define([
    'Constants'
], function(Constants)
{
    function CloningMachine(sprite)
    {
        this.sprite = sprite;
    }

    CloningMachine.ACTIVE_DISTANCE = 10;

    CloningMachine.prototype.update = function()
    {
        var distX = Math.abs(window.player.sprite.x - (this.sprite.x + (this.sprite.width / 2)));
        var distY = Math.abs(window.player.sprite.y - (this.sprite.y + (this.sprite.height)));

        if (distX < CloningMachine.ACTIVE_DISTANCE
            && distY < CloningMachine.ACTIVE_DISTANCE)
        {
            console.log("WHALE SOUDN " + game.time.now);
        }
        else
        {
            console.log(distX + ' ' + distY);
        }
    };

    return CloningMachine;

});