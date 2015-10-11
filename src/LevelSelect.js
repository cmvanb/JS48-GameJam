define([
    'Level'
], function(Level) {

    function LevelSelect()
    {
        // Assign the current level to it so we can call update...
        this.currentLevel = null;

        // Keep track of the total level progress
        this.levelProgress = parseInt(localStorage.getItem('monocleLevel')) || 1;

        // Used to store the current level id for later use
        this.levelId = null;
    }

    LevelSelect.prototype.show = function()
    {
        console.log('showing level select screen');

        this.currentLevel = null;

        game.camera.x = 0;
        game.camera.y = 0;

        this.levels = [];

        for (var i = 1; i <= this.levelProgress; i++)
        {
            var level = game.cache.getTilemapData('level' + i);

            if (level)
            {
                this.levels.push(level);
            }
        }

        // Two loops... Maybe i'll fix, maybe not - Nils
        this.levelButtons = [];

        for (var l = 0; l < this.levels.length; l++)
        {
            var levelId = l + 1;

            // Stupid closures...
            var button = this.createButton(levelId);

            button.x = game.camera.width / 6 - button.width / 2;
            button.y = 100 + ((button.height + 0) * l);

            var style = { font: "16px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: button.width, align: "center" };
            var text = game.add.text(button.x, button.y + 3, 'LEVEL ' + levelId, style);
            text.x += button.width / 2 - text.width / 2;
            text.y += button.height / 2 - text.height / 2;

            button.text = text;

            this.levelButtons.push(button);
        }

        this.sprite = game.add.sprite(0, 0, 'splash');
    };

    LevelSelect.prototype.hide = function()
    {
        console.log('hiding level select screen');

        this.levelButtons.forEach(function(button)
        {
            button.text.destroy();
            button.destroy();
        }, this);

        this.sprite.destroy();
    };

    LevelSelect.prototype.createButton = function(levelId)
    {
        return game.add.button(0, 0, 'buttonBig', function() {

            // Only load levels if the current level isn't assigned
            if (!this.currentLevel)
            {
                this.loadLevel(levelId);
            }
        }, this);
    };

    LevelSelect.prototype.loadLevel = function(levelId)
    {
        this.hide();

        this.levelId = levelId;

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

    LevelSelect.prototype.unlockNextLevel = function()
    {
        if (this.levelId === this.levelProgress)
        {
            this.levelProgress++;
            localStorage.setItem('monocleLevel', this.levelProgress);
        }
    };

    return LevelSelect;

});