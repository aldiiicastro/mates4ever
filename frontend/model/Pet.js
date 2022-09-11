export default class Pet{
    name;
    image;
    age;
    date;
    type;
    breed;
    state;
    tutor;
    description;
    constructor(name, image, age, date, type, breed, state, tutor, description) {
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