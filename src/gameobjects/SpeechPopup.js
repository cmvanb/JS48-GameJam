define([], function()
{
    function SpeechPopup()
    {
        this.sprite = game.add.sprite(0, 0, 'scientist');

        this.texts = {
            tut: {
                0: ["Hellllooooo! Here's your boss speaking...",
                    "Let me get a few things straight. I don't care about you. I don't mind your death.",
                    "Well maybe I might chuckle a bit...",
                    "Especially if there's a lot of blood, brains and other intestines involved...",
                    "But back to the point! You're here to do some tests for me! I'm not telling you what kind of physics based platformer puzzles.",
                    "Damnit!",
                    "Oh who cares... Just die -erm GO!"]
            },
            death: {
                0: 'Interesting behaviour, do you do this more often?'
            },
            win: {
                0: "That's not supposed to happen!"
            }
        };

        var style = { font: "18px Arial", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: 500, align: "left" };

        this.text = game.add.text(0, 0, 'temp text', style);
        this.text.visible = false;

        /*var continueStyle = { font: "18px Arial", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: this.sprite.width, align: "center" };

        this.continueText = game.add.text(0, 0, '[Spacebar] to continue...', continueStyle);
        this.continueText.visible = false;*/

        this.states = {
            idle: 0,
            showing: 1,
            talking: 2,
            hiding: 3
        };

        this.state = this.states.idle;

        this.showSpeed = 40;

        var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(function(key)
        {
            if (this.state === this.states.talking)
            {
                this.nextSentence();
            }

        }, this);

        this.speechArray = null;
        this.speechIndex = 0;

        this.idle();

        this.controlsDisabled = false;
    }

    SpeechPopup.prototype.idle = function()
    {
        this.state = this.states.idle;
    };

    SpeechPopup.prototype.show = function(type, number, disableControls)
    {
        this.state = this.states.showing;

        this.speechArray = this.texts[type][number];
        this.speechIndex = 0;

        this.controlsDisabled = disableControls;
    };

    SpeechPopup.prototype.hide = function()
    {
        this.state = this.states.hiding;

        this.text.visible = false;
        //this.continueText.visible = false;

        this.controlsDisabled = false;
    };

    SpeechPopup.prototype.talk = function()
    {
        this.state = this.states.talking;

        this.text.visible = true;
        //this.continueText.visible = true;

        this.nextSentence();
    };

    SpeechPopup.prototype.nextSentence = function()
    {
        if (this.speechArray[this.speechIndex])
        {
            this.text.text = this.speechArray[this.speechIndex];
            this.speechIndex++;
        }
        else
        {
            this.hide();
        }
    };

    SpeechPopup.prototype.update = function()
    {
        this.sprite.x = game.camera.x + game.camera.width - this.sprite.width;

        switch (this.state)
        {
            case this.states.idle:

                this.sprite.y = game.camera.y + game.camera.height + this.sprite.height;

                break;

            case this.states.showing:

                this.sprite.y -= this.showSpeed;

                if (this.sprite.y < game.camera.y + game.camera.height - this.sprite.height)
                {
                    this.talk();
                }

                break;

            case this.states.talking:

                this.sprite.y = game.camera.y + game.camera.height - this.sprite.height;

                break;

            case this.states.hiding:

                this.sprite.y += this.showSpeed;

                if (this.sprite.y > game.camera.y + game.camera.height + this.sprite.height)
                {
                    this.state = this.states.idle;
                }

                break;
        }

        //this.text.x = this.sprite.x - this.sprite.width / 2;
        //this.text.y = this.sprite.y - this.sprite.width / 2;

        this.text.x = this.sprite.x + 65;
        this.text.y = this.sprite.y + 450;

        /*this.continueText.x = this.text.x;
        this.continueText.y = this.text.y + 50;*/

    };

    return SpeechPopup;

});