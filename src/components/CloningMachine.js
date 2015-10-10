define([
    'GlobalFunctions'
], function(GlobalFunctions)
{
    function CloningMachine(sprite)
    {
        this.sprite = sprite;

        this.graphics = game.add.graphics(0, 0);

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
        var myPos = GlobalFunctions.getSpriteAnchorPosition(this.sprite);
        var playerPos = GlobalFunctions.getSpriteAnchorPosition(player.sprite);

        var distance = Phaser.Point.distance(myPos, playerPos);

        if (distance < CloningMachine.ACTIVE_DISTANCE)
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

    return CloningMachine;

});