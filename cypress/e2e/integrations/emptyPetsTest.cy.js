describe('Home', () => {
    beforeEach( () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'empty_data.json'}).as('getEmpty')
        cy.loginBeforeEach()
        cy.get('[data-testid="hideModal"]').click()
    })
    it('Empty list pets', () => {
        cy.wait('@getEmpty')
        cy.get('[data-testid="no-pets"]').contains('No hay mascotas')
    })
})
