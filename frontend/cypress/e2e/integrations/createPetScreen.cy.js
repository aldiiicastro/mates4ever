
describe('Create pet', () => {
    beforeEach( () => {
        cy.loginBeforeEach()
    })
    it('List of pets', () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.intercept('POST', '/api/pet/create', {fixture: 'pet_create.json'}).as('post')
        cy.wait('@gets')
        cy.get('[data-testid="create-pet"]').click()
        cy.get('[data-testid="input"]').should('have.length', 6)
        cy.get('[data-testid="input"]').eq(2).type('Animal')
        cy.get('[data-testid="input"]').eq(3).type("Beagel")
        cy.get('[data-testid="input"]').eq(4).type('Tiene 5 años necesita un transito')
        cy.get('div').contains('Publicar').click()
        cy.wait('@post')
    })
})
