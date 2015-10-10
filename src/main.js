'use strict';

define([], function ()
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

    function preload()
    {
        console.log('preload');
    }

    function create()
    {
        console.log('create');
    }

    function update()
    {
    }

    function render()
    {
    }
});
