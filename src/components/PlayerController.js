define([
    'components/Component'
], function(Component) {

    function PlayerController(parent)
    {
        Component.call(this, parent);

        this.cursors = game.input.keyboard.createCursorKeys();
    }

    PlayerController.prototype = Object.create(Component.prototype);

    PlayerController.prototype.update = function()
    {
        Component.prototype.update.call(this);

        if (this.cursors.up.isDown)
        {
            this.parent.y -= 4;
        }
        else if (this.cursors.down.isDown)
        {
            this.parent.y += 4;
        }

        if (this.cursors.left.isDown)
        {
            this.parent.x -= 4;
        }
        else if (this.cursors.right.isDown)
        {
            this.parent.x += 4;
        }
    };

    return PlayerController;

});