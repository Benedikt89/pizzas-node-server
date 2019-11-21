import {IPizzaItem, IPizzaToCreate} from "../../Core/pizzas-types";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    filter: Number,
    name: String,
    photo: String,
    photo_thumbnail: String,
    price: Number,
    size: Number,
    text_long: String,
    text_short: String,
});
const Pizza = mongoose.model('pizzas', userSchema);


export const pizzasRepository = {

    getPizzas(): Promise<Array<IPizzaItem>> {
        return Pizza.find();
    },
    updatePizza(pizzaId: string, newPizza: IPizzaItem): Promise<any> {
        return Pizza.update({_id: pizzaId}, newPizza)
    },
    deletePizza(pizzaId: string): Promise<any> {
        return Pizza.deleteOne({_id: pizzaId});
    },
    addPizza(pizza: IPizzaToCreate): Promise<any> {
        debugger
        const newPizza = new Pizza({
            filter: pizza.filter,
            name: pizza.name,
            photo: pizza.photo,
            photo_thumbnail: pizza.photo_thumbnail,
            price: pizza.price,
            size: pizza.size,
            text_long: pizza.text_long,
            text_short: pizza.text_short
        });
        return newPizza.save()
    }
};
