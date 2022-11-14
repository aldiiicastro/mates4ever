
describe('Profile screen', () => {
    beforeEach( () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
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
