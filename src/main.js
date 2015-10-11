'use strict';

require([
    'Loader',
    'gameobjects/SpeechPopup',
    'LevelSelect'
], function (Loader, SpeechPopup, LevelSelect)
{
    // Greet the world.
    console.log('Hello world.');

    // Create a game object.
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game',
        {
            preload: preload,
            create: create,
            update: update,
            render: render
        });

    // Assign global, because game jam.
    window.game = game;

    var levelSelect;
    var scientist;

    function preload()
    {
        console.log('preload');

        var loader = new Loader();

        loader.loadAll();
    }

    function create()
    {
        console.log('create');

        game.physics.startSystem(Phaser.Physics.P2JS);

        game.stage.backgroundColor = '#000000';

        levelSelect = new LevelSelect();
        levelSelect.show();

        game.levelSelect = levelSelect; // #care...

        scientist = new SpeechPopup();

        game.scientist = scientist; // Math.pow(#care, 2);
    }

    function update()
    {
        levelSelect.update();
        scientist.update();
    }

    function render()
    {
    }
});
