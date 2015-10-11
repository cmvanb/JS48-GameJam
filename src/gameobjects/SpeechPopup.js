define([], function()
{
    function SpeechPopup()
    {
        this.group = game.add.group();

        this.sprite = game.add.sprite(0, 0, 'scientist');
        this.group.add(this.sprite);

        this.texts = {
            levelIntros: {
                1: ["MUAHAHAHAHAHAHAHA!!!",
                    "Ahahahahehehe... AHHH!? WHO THE FUCK ARE YOU?",
                    "Oh. Yes. Yes, I remember you now. Clone #7746.",
                    "Thanks for showing up to work today. Good clone! I will feed you later.",
                    "Today we are running very special tests. Please proceed to the exit door."
                ]
            },
            firstDeath: {
                0: ["Hahaha. Did that hurt? I hope it did.",
                    "Let me get a few things straight. I don't care about you. I don't mind your death.",
                    "I would tell you more about how little I care for your safety, but...",
                    "...we are running late. Hurry to the exit door!"
                ]
            },
            death: {
                0: "Interesting behaviour, do you do this more often?",
                1: "I don't expect you to talk. I expect you to die. Often."
            }
        };

        var style = { font: "18px Arial", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: 500, align: "left" };

        this.text = game.add.text(0, 0, 'temp text', style);
        this.text.visible = false;
        this.group.add(this.text);

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

    SpeechPopup.prototype.show = function(type, number, disableControls, finishedSpeakingCallback, finishedSpeakingContext)
    {
        game.world.bringToTop(this.group);

        this.state = this.states.showing;

        this.speechArray = this.texts[type][number];
        this.speechIndex = 0;

        this.controlsDisabled = disableControls;

        this.finishedSpeakingCallback = finishedSpeakingCallback;
        this.finishedSpeakingContext = finishedSpeakingContext;
    };

    SpeechPopup.prototype.hide = function()
    {
        if (this.finishedSpeakingCallback)
        {
            this.finishedSpeakingCallback.call(this.finishedSpeakingContext);
        }

        this.finishedSpeakingCallback = null;
        this.finishedSpeakingContext = null;

        this.state = this.states.hiding;

        this.text.visible = false;

        this.controlsDisabled = false;

    };

    SpeechPopup.prototype.talk = function()
    {
        this.state = this.states.talking;

        this.text.visible = true;

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

        this.text.x = this.sprite.x + 65;
        this.text.y = this.sprite.y + 450;
    };

    return SpeechPopup;

});