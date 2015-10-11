define([
    'GlobalFunctions'
], function(GlobalFunctions)
{
    function TriggerZone(rectangle, triggerName, level)
    {
        this.rectangle = rectangle;

        this.triggerName = triggerName;

        this.level = level;
    }

    TriggerZone.prototype.update = function()
    {
        if (Phaser.Rectangle.contains(this.rectangle, player.sprite.x, player.sprite.y))
        {
            this.level.performTrigger(this.triggerName);
        }
    };

    TriggerZone.prototype.destroy = function()
    {
        //this.rectangle = null;
        //this.triggerName = null;
        //this.level = null;
    };

    return TriggerZone;
});