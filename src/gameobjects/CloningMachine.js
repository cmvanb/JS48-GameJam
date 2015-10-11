define([
    '../GlobalFunctions'
], function(GlobalFunctions)
{
    function CloningMachine(sprite)
    {
        this.sprite = sprite;

        this.activated = false;

        if (sprite.name === 'Start')
        {
            this.setActive(true);
        }
    }

    CloningMachine.ACTIVE_DISTANCE = 80;

    CloningMachine.respawnPosition = new Phaser.Point();

    CloningMachine.prototype.update = function()
    {
        if (GlobalFunctions.distanceToPlayer(this.sprite) < CloningMachine.ACTIVE_DISTANCE)
        {
            this.setActive();
        }
    };

    CloningMachine.prototype.setActive = function()
    {
        if (!this.activated)
        {
            CloningMachine.respawnPosition = GlobalFunctions.getSpriteAnchorPosition(this.sprite);

            this.sprite.loadTexture('cloning-machine-active');

            this.activated = true;
        }
    };

    CloningMachine.prototype.destroy = function()
    {
        this.sprite.destroy();
    };

    return CloningMachine;

});