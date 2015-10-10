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

    GlobalFunctions.getSpritePosition = function(sprite)
    {
        var position = new Phaser.Point();

        position.x = sprite.x;
        position.y = sprite.y;

        return position;
    };

    return GlobalFunctions;
});
