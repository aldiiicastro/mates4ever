
describe('Home', () => {
    beforeEach( () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('getPets')
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
