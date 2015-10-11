define([
    'Level'
], function(Level) {

    function LevelSelect()
    {
        this.levels = [];

        var maxLevels = 50;

        for (var i = 1; i <= maxLevels; i++)
        {
            var level = game.cache.getTilemapData('level' + i);

            if (level)
            {
                this.levels.push(level);
            }
        }

        this.levelButtons = [];

        for (var l = 0; l < this.levels.length; l++)
        {
            // Stupid closures...
            var button = this.createButton(l + 1);

            button.x = game.camera.width / 2 - button.width / 2;
            button.y = 100 + ((button.height + 20) * l);

            var style = { font: "18px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: button.width, align: "center" };
            var text = game.add.text(button.x, button.y, 'LEVEL ' + (l + 1), style);
            text.x += button.width / 2 - text.width / 2;
            text.y += button.height / 2 - text.height / 2;
        }

        // Assign the current level to it so we can call update...
        this.currentLevel = null;
    }

    LevelSelect.prototype.show = function()
    {

    };

    LevelSelect.prototype.hide = function()
    {

    };

    LevelSelect.prototype.createButton = function(levelId)
    {
        return game.add.button(0, 0, 'buttonBig', function() {
            this.loadLevel(levelId);
        }, this);
    };

    LevelSelect.prototype.loadLevel = function(levelId)
    {
        this.currentLevel = new Level('level' + levelId);
        this.currentLevel.create();
    };

    LevelSelect.prototype.update = function()
    {
        if (this.currentLevel)
        {
            this.currentLevel.update();
        }
    };

    return LevelSelect;

});