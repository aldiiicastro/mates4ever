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
    castrated;
    vaccine;

    constructor(pet) {
            this.id = pet.id,
            this.name = pet.name,
            this.image = pet.image,
            this.age = pet.age,
            this.date = pet.date,
            this.type = pet.type,
            this.breed = pet.breed,
            this.state = pet.state,
            this.tutor = pet.user,
            this.castrated = pet.castrated,
            this.vaccine = pet.vaccine,
            this.description = pet.description;
            
    }

    isThisState(stateToAsk) {return stateToAsk === this.state}
    isLost() {return this.state === 'Perdido'}
}