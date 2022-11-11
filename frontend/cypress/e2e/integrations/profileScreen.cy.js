
describe('Profile screen', () => {
    beforeEach( () => {
        cy.loginBeforeEach()
    })
    it('Profile from contact', ()=> {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.intercept('GET', '/api/pet/1', {fixture: 'pet_data_transit.json'}).as('getPet')
        cy.intercept('GET', 'api/user/allData/aldana@gmail.com', {fixture: 'user_data.json'}).as('getUser')
        cy.wait('@gets')
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
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.intercept('GET', 'api/user/allData/aldana@gmail.com', {fixture: 'user_data.json'}).as('getUser')
        cy.wait('@gets')
        //
        cy.get('[data-testid="profileButton"]').click()
        //Testing button
        cy.wait('@getUser')
        cy.get('[data-testid="user-name"').contains('Aldana Castro')
        cy.get('[data-testid="email"').contains('aldana@gmail.com')
        cy.get('[data-testid="local-phone"').contains('1139538873')
        cy.getTransitPet()
    })
    it('Profile go back', ()=> {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.intercept('GET', 'api/user/allData/aldana@gmail.com', {fixture: 'user_data.json'}).as('getUser')
        cy.wait('@gets')
        //
        cy.get('[data-testid="profileButton"]').click()
        //Testing button
        cy.wait('@getUser')
        cy.get('[data-testid="goBack"').click()
        cy.getTransitPet()
    })

    it('Profile log out', ()=> {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.intercept('GET', 'api/user/allData/aldana@gmail.com', {fixture: 'user_data.json'}).as('getUser')
        cy.wait('@gets')
        //
        cy.get('[data-testid="profileButton"]').click()
        //Testing button
        cy.wait('@getUser')
        cy.get('[data-testid="logOut"').click()
        cy.get('div').contains('Iniciar sesión')
    })
})
