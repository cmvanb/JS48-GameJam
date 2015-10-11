define([
    'Constants'
], function(Constants) {

    function MovingPlatform(platformLeft)
    {
        this.name = platformLeft.name;

        var nameSplit = this.name.split('_');

        var length = parseInt(nameSplit[1]);

        var id = nameSplit[0].split('-');

        var objectsArray = game.levelSelect.currentLevel.map.objects.Objects;

        for (var x = 0; x < objectsArray.length; ++x)
        {
            var obj = objectsArray[x];

            var splits = obj.name.split('_');

            if (splits.length > 1
                && splits[0] === 'MoverArea')
            {
                if (splits[1] === id[1])
                {
                    this.moveRect = new Phaser.Rectangle(obj.x, obj.y, obj.width, obj.height);
                }
            }
        }

        if (!this.moveRect)
        {
            return;
        }

        platformLeft.x = this.moveRect.x;
        platformLeft.y = this.moveRect.y - platformLeft.height / 2 + this.moveRect.height / 2;

        this.platforms = [];

        this.platforms.push(platformLeft);

        for (var i = 1; i <= length; i++)
        {
            var platformMiddle = game.add.sprite(0, 0, 'platformMiddle');
            platformMiddle.x = platformLeft.x + platformLeft.width * i;
            platformMiddle.y = platformLeft.y;

            this.platforms.push(platformMiddle);
        }

        var secondToLastPlatform = platformLeft;

        if (this.platforms.length > 1)
        {
            secondToLastPlatform = this.platforms[this.platforms.length - 1];
        }

        var platformRight = game.add.sprite(0, 0, 'platformRight');
        platformRight.x = secondToLastPlatform.x + secondToLastPlatform.width;
        platformRight.y = secondToLastPlatform.y;

        this.platforms.push(platformRight);

        this.platforms.forEach(function(platform)
        {
            platform.x += platform.width / 2;
            platform.y += platform.height / 2;

            game.physics.p2.enable(platform, Constants.DEBUG);
            platform.body.kinematic = true;

        }, this);

        this.moveStates = {
            right: 0,
            left: 1
        };

        this.moveState = this.moveStates.left;

        this.moveSpeed = 2;
    }

    MovingPlatform.prototype.update = function()
    {
        if (!this.moveRect)
        {
            return;
        }

        var leftPlatform = this.platforms[0];

        switch (this.moveState)
        {
            case this.moveStates.right:

                leftPlatform.body.x += this.moveSpeed;

                if (leftPlatform.body.x > this.moveRect.x + this.moveRect.width - (leftPlatform.width * this.platforms.length))
                {
                    leftPlatform.body.x = this.moveRect.x + this.moveRect.width - (leftPlatform.width * this.platforms.length);

                    this.moveState = this.moveStates.left;
                }

                break;

            case this.moveStates.left:

                leftPlatform.body.x -= this.moveSpeed;

                if (leftPlatform.body.x < this.moveRect.x)
                {
                    leftPlatform.body.x = this.moveRect.x;

                    this.moveState = this.moveStates.right;
                }

                break;
        }

        for (var i = 1; i < this.platforms.length; i++)
        {
            var platform = this.platforms[i];

            platform.body.x = leftPlatform.body.x + leftPlatform.width * i;
            platform.body.y = leftPlatform.body.y;
        }
    };

    MovingPlatform.prototype.destroy = function()
    {
        this.platforms.forEach(function(platform)
        {
            platform.body.destroy();
            platform.destroy();
        }, this);
    };

    return MovingPlatform;
});