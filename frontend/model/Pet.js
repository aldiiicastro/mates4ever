export default class Pet{
    id;
    name;
    image;
    age;
    date;
    type;
    breed;
    state;
    tutor;
    description;
    constructor(id,name, image, age, date, type, breed, state, tutor, description) {
            this.id = id,
            this.name = name,
            this.image = image,
            this.age = age,
            this.date = date,
            this.type = type,
            this.breed = breed,
            this.state = state,
            this.tutor = tutor,
            this.description = description;
    }
    isThisState(stateToAsk) {return stateToAsk === this.state}
    isLost() {return this.state === 'Perdido'}
}