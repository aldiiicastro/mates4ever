
describe('Create pet', () => {
    beforeEach( () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.loginBeforeEach()
    })
    it('Create a new pet without photo', () => {
        cy.intercept('POST', '/api/pet/create', {fixture: 'pet_create.json'}).as('post')
        cy.get('[data-testid="hideModal"]').click()
        cy.wait('@gets')
        cy.get('[data-testid="create-pet"]').click()
        cy.get('[data-testid="input"]').should('have.length', 6)
        cy.get('[data-testid="input"]').eq(2).click().type('Animal')
        cy.get('[data-testid="input"]').eq(3).type("Beagel")
        cy.get('[data-testid="input"]').eq(4).type('Tiene 5 años necesita un transito')
        cy.get('div').contains('Publicar').click()
        cy.wait('@post')
    })
})
