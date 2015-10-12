define([
    '../GlobalFunctions'
], function(GlobalFunctions) {

    function ExitDoor(sprite)
    {
        this.sprite = sprite;
    }

    ExitDoor.ACTIVE_DISTANCE = 40;

    ExitDoor.respawnPosition = new Phaser.Point();

    ExitDoor.prototype.update = function()
    {
        if (GlobalFunctions.distanceToPlayer(this.sprite) < ExitDoor.ACTIVE_DISTANCE)
        {
            console.log('exit door reached!');

            game.levelSelect.unlockNextLevel();
            game.levelSelect.currentLevel.destroy();
        }
    };

    ExitDoor.prototype.destroy = function()
    {
        this.sprite.destroy();
    };

    return ExitDoor;

});