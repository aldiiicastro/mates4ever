
describe('Home', () => {
    beforeEach( () => {
        cy.loginBeforeEach()
    })
    it('Empty list pets', () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'empty_data.json'}).as('gets')
        cy.get('[data-testid="no-pets"]').contains('No hay mascotas')
    })
    it('List of pets', () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.wait('@gets')
        //Testing transit pet
        cy.getTransitPet()
        //Testing lost pet
        cy.getLostPet()
        //Testing adoption pet
        cy.getAdoptionPet()
    })
    it('Can click on states', () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.wait('@gets')
        cy.get('[data-testid="button-Perdido"]').click()
        cy.get('[data-testid="button-Adopción"]').click()
        cy.get('[data-testid="button-Transito"]').click()
    })
    it('Appears correct transit pet', () => {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.wait('@gets')
        //Click on Transit Button
        cy.get('[data-testid="button-Transito"]').click()
        //Testing transit pet
        cy.getTransitPet()
    })

    it('Appears correct lost pet', () => {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.wait('@gets')
        //Click on Lost Button
        cy.get('[data-testid="button-Perdido"]').click()
        //Testing lost pet
        cy.getLostPet()
    })
    it('Appears correct adoption pet', () => {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.wait('@gets')
        //Click on Adoption Button
        cy.get('[data-testid="button-Adopción"]').click()
        //Testing adoption pet
        cy.getAdoptionPet()
    })
})
