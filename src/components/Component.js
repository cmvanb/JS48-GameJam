define([], function() {

    function Component(parent)
    {
        this.parent = parent;
    }

    Component.prototype.update = function()
    {
        console.log('component update');
    };

    return Component;

});