
// describe('Create pet', () => {
//     beforeEach( () => {
//         cy.intercept('GET', '/api/pet/search?search=&closeness=&state=&type=', {fixture: 'pets_data.json'}).as('gets')
//         cy.loginBeforeEach()
//     })
//     it('Create a new pet without photo', () => {
//         cy.intercept('POST', '/api/pet/create', {fixture: 'pet_create.json'}).as('post')
//         cy.get('[data-testid="hideModal"]').click()
//         cy.wait('@gets')
//         cy.get('[data-testid="create-pet"]').click()
//         cy.get('[data-testid="input"]').should('have.length', 4)
//         cy.get('[data-testid="input"]').eq(0).click().type('Animal')
//         cy.get('[data-testid="input"]').eq(1).type("Beagel")
//         cy.get('[data-testid="input"]').eq(2).type('Tiene 5 años necesita un transito')
//         cy.get('div').contains('Publicar').click()
//         cy.wait('@post')
//     })
// })

describe('Home', () => {
    beforeEach( () => {
        cy.intercept('GET', '/api/pet/search?search=&closeness=&state=&type=', {fixture: 'empty_data.json'}).as('getEmpty')
        cy.loginBeforeEach()
        cy.get('[data-testid="hideModal"]').click()
    })
    it('Empty list pets', () => {
        cy.wait('@getEmpty')
        cy.get('[data-testid="no-pets"]').contains('No hay mascotas')
    })
})


describe('Home', () => {
    beforeEach( () => {
        cy.intercept('GET', '/api/pet/search?search=&closeness=&state=&type=', {fixture: 'pets_data.json'}).as('getPets')
        cy.loginBeforeEach()
        cy.get('[data-testid="hideModal"]').click()
        cy.wait('@getPets')
    })
    it('List of pets', () => {
        //Testing transit pet
        cy.getTransitPet()
        //Testing lost pet
        cy.getLostPet()
        //Testing adoption pet
        cy.getAdoptionPet()
    })
    it('Can click on states', () => {
        cy.get('[data-testid="button-Perdido"]').click()
        cy.get('[data-testid="button-Adopción"]').click()
        cy.get('[data-testid="button-Transito"]').click()
    })
    it('Appears correct transit pet', () => {
        //Click on Transit Button
        cy.get('[data-testid="button-Transito"]').click()
        //Testing transit pet
        cy.getTransitPet()
    })

    it('Appears correct lost pet', () => {
        //Click on Lost Button
        cy.get('[data-testid="button-Perdido"]').click()
        //Testing lost pet
        cy.getLostPet()
    })
    it('Appears correct adoption pet', () => {
        //Click on Adoption Button
        cy.get('[data-testid="button-Adopción"]').click()
        //Testing adoption pet
        cy.getAdoptionPet()
    })
})


describe('Initial pets', () => {
    beforeEach( () => {
        cy.intercept('GET', '/api/pet/search?search=&closeness=&state=&type=', {fixture: 'pets_data.json'}).as('gets')
        cy.loginBeforeEach()
        cy.wait('@gets')
        cy.get('[data-testid="hideModal"]').click()
    })
    it('Can see pet in transit', ()=> {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/1', {fixture: 'pet_data_transit.json'}).as('getPet')
        //Click on pet card
        cy.get('[data-testid="pet-details-1"]').click()
        cy.wait('@getPet')
        //Testing details of one pet
        cy.get('[data-testid="pet-details-name"]').contains('Mía')
        cy.get('[data-testid="pet-details-age"]').contains('Edad: 5')
        cy.get('[data-testid="pet-details-type"]').contains('Tipo: Gato')
        cy.get('[data-testid="pet-details-breed"]').contains('Raza: Sin Raza')
        cy.get('[data-testid="pet-details-state"]').contains('Transito')
        cy.get('[data-testid="pet-details-description-field"]').contains('Descripción')
        cy.get('[data-testid="pet-details-description"]').contains('Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo')
        cy.get('[data-testid="pet-details-castrated"]').contains('No esta castrado')
        cy.get('[data-testid="pet-details-vaccinate"]').contains('No esta vacunado')
    })
    it('Can see pet lost', ()=> {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/2', {fixture: 'pet_data_lost.json'}).as('getPet')
        //Click on pet card
        cy.get('[data-testid="pet-details-2"]').click()
        cy.wait('@getPet')
        //Testing details of one pet
        cy.get('[data-testid="pet-details-name"]').contains('Gatito')
        cy.get('[data-testid="pet-details-age"]').contains('Edad: 8')
        cy.get('[data-testid="pet-details-type"]').contains('Tipo: Gato')
        cy.get('[data-testid="pet-details-breed"]').contains('Raza: Sin Raza')
        cy.get('[data-testid="pet-details-state"]').contains('Perdido')
        cy.get('[data-testid="pet-details-description-field"]').contains('Descripción')
        cy.get('[data-testid="pet-details-description"]').contains('Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo')
        cy.get('[data-testid="pet-details-castrated"]').contains('No esta castrado')
        cy.get('[data-testid="pet-details-vaccinate"]').contains('Esta vacunado')
    })
})


describe('Pet searching', () => {
    beforeEach( () => {
        cy.intercept('GET', '/api/pet/search?search=&closeness=&state=&type=', {fixture: 'pets_data.json'}).as('gets')
        cy.loginBeforeEach()
    })
    it('Searching Pet', ()=> {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?search=P&closeness=&state=&type=', {fixture: 'searchPer_data.json'})
        cy.intercept('GET', '/api/pet/search?search=Pe&closeness=&state=&type=', {fixture: 'searchPer_data.json'})
        cy.intercept('GET', '/api/pet/search?search=Per&closeness=&state=&type=', {fixture: 'searchPer_data.json'}).as('getPer')
        cy.wait('@gets')
        cy.get('[data-testid="hideModal"]').click()
        cy.wait(500)
        cy.get('[data-testid="search"]').type('Per')
        cy.wait('@getPer')
        //Testing lost pet
        cy.getLostPet()
        //Testing adoption pet
        cy.getAdoptionPet()
    })
})


describe('Profile screen', () => {
    beforeEach( () => {
        cy.intercept('GET', '/api/pet/search?search=&closeness=&state=&type=', {fixture: 'pets_data.json'}).as('gets')
        cy.loginBeforeEach()
        cy.wait('@gets')
        cy.get('[data-testid="hideModal"]').click()
    })
    it('Profile from contact', ()=> {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/1', {fixture: 'pet_data_transit.json'}).as('getPet')
        cy.intercept('GET', 'api/user/allData/aldana@gmail.com', {fixture: 'user_data.json'}).as('getUser')

        //Click on pet card
        cy.get('[data-testid="pet-details-1"]').click()
        cy.wait('@getPet')
        //Testing button
        cy.get('[data-testid="contactar"').click()
        cy.wait('@getUser')
        cy.get('[data-testid="user-name"').contains('Aldana Castro')
        cy.get('[data-testid="email"').contains('aldana@gmail.com')
        cy.get('[data-testid="local-phone"').contains('1139538873')
        cy.getTransitPet()
    })
    it('Profile from icon', ()=> {
        cy.intercept('GET', 'api/user/allData/aldana@gmail.com', {fixture: 'user_data.json'}).as('getUser')
        cy.get('[data-testid="profileButton"]').click()
        //Testing button
        cy.wait('@getUser')
        cy.get('[data-testid="user-name"').contains('Aldana Castro')
        cy.get('[data-testid="email"').contains('aldana@gmail.com')
        cy.get('[data-testid="local-phone"').contains('1139538873')
        cy.getTransitPet()
    })
    it('Profile go back', ()=> {
        cy.intercept('GET', 'api/user/allData/aldana@gmail.com', {fixture: 'user_data.json'}).as('getUser')
        cy.get('[data-testid="profileButton"]').click()
        //Testing button
        cy.wait('@getUser')
        cy.get('[data-testid="goBack"').click()
        cy.getTransitPet()
    })

    it('Profile log out', ()=> {
        cy.intercept('GET', 'api/user/allData/aldana@gmail.com', {fixture: 'user_data.json'}).as('getUser')
        cy.get('[data-testid="profileButton"]').click()
        //Testing button
        cy.wait('@getUser')
        cy.get('[data-testid="logOut"').click({force: true})
        cy.get('div').contains('Iniciar sesión')
    })
})
