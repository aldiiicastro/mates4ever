
describe('Pet searching', () => {
    beforeEach( () => {
        cy.loginBeforeEach()
    })
    it('Searching Pet', ()=> {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.intercept('GET', '/api/pet/search?query=P', {fixture: 'searchPer_data.json'})
        cy.intercept('GET', '/api/pet/search?query=Pe', {fixture: 'searchPer_data.json'})
        cy.intercept('GET', '/api/pet/search?query=Per', {fixture: 'searchPer_data.json'}).as('getPer')
        cy.wait('@gets')
        cy.get('[data-testid="search"]').type('Per')
        cy.wait('@getPer')
        //Testing lost pet
        cy.getLostPet()
        //Testing adoption pet
        cy.getAdoptionPet()
    })
})
