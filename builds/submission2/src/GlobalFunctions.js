'use strict';

define([], function ()
{
    var GlobalFunctions = {};

    GlobalFunctions.getSpriteAnchorPosition = function(sprite)
    {
        var position = new Phaser.Point();

        position.x = sprite.x - (sprite.width * sprite.anchor.x) + (sprite.width / 2);
        position.y = sprite.y - (sprite.height * sprite.anchor.y) + (sprite.height / 2);

        return position;
    };

    GlobalFunctions.distanceToPlayer = function(from)
    {
        var fromPos = GlobalFunctions.getSpriteAnchorPosition(from);
        var playerPos = GlobalFunctions.getSpriteAnchorPosition(player.sprite);

        return Phaser.Point.distance(fromPos, playerPos);
    };

    return GlobalFunctions;
});
