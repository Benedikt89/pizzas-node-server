export interface IPizzaItem {
    filter: Array<IFilterItem>,
    id: string,
    name: string,
    photo: string,
    photo_thumbnail: string,
    price: number,
    size: number,
    text_long: string,
    text_short: string,
}
export interface IPizzaToCreate {
    filter: number,
    name: string,
    photo: string,
    photo_thumbnail: string,
    price: number,
    size: number,
    text_long: string,
    text_short: string,
}
export interface IFilterItem {
    name: string
}

export interface IPostOrderItem {
    pizza_id: number,
    quantity: number,
}


