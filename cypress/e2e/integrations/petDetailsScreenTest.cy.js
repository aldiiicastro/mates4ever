
describe('Initial pets', () => {
    beforeEach( () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
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
