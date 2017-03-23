function Dish(id, name, components){
    this.id = id;
    this.name = name;
    this.components = components;
    this.addComponent = function(component){
        this.components.push(component);
    }
}
function Component(id, name, calories, weight){
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.weight = weight;
}

function DishHtml(){
    this.dish = document.createElement('div');
}