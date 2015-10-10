define([], function() {

    function GameObject(name, componentsArray)
    {
        console.log('GameObject ctor');

        this.sprite = game.add.sprite(0, 0, name);

        this.components = [];

        if (componentsArray)
        {
            componentsArray.forEach(function(component)
            {
                this.addComponent(component);
            }.bind(this));
        }
    }

    GameObject.prototype.addComponent = function(component)
    {
        var name = component.constructor.name;

        this[name] = new component(this.sprite);

        this.components.push(this[name]);
    };

    GameObject.prototype.update = function()
    {
        this.components.forEach(function(component)
        {
            component.update();
        });
    };

    return GameObject;
});