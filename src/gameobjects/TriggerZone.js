define([
    'GlobalFunctions'
], function(GlobalFunctions)
{
    function TriggerZone(rectangle, triggerName, level, delay)
    {
        this.rectangle = rectangle;

        this.triggerName = triggerName;

        this.level = level;

        this.delay = delay;
    }

    TriggerZone.prototype.update = function()
    {
        if (Phaser.Rectangle.contains(this.rectangle, player.sprite.x, player.sprite.y))
        {
            var self = this;

            setTimeout(function()
            {
                self.level.performTrigger(self.triggerName);
            }, this.delay);
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