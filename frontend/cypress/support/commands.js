// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginBeforeEach', ()=> {
        cy.intercept('POST', '/api/user/userData', {fixture: 'user_login_data.json'}).as('post')
        cy.visit('http://localhost:19006/')
        cy.wait(5001)
        cy.get('[data-testid="input"]').should('have.length', 2)
        cy.get('[data-testid="input"]').first().type('aldana@gmail.com')
        cy.get('[data-testid="input"]').last().type('2534Aldi')
        cy.get('div').contains('Iniciar sesión').click()
    }
)

Cypress.Commands.add("getTransitPet", ()=> {
    cy.get('[data-testid="pet-state-1"]').contains('Transito')
    cy.get('[data-testid="pet-name-1"]').contains('Mía')
    cy.get('[data-testid="pet-age-1"]').contains('Edad: 5')
})

Cypress.Commands.add("getLostPet", ()=> {
    cy.get('[data-testid="pet-state-2"]').contains('Perdido')
    cy.get('[data-testid="pet-name-2"]').contains('Gatito')
    cy.get('[data-testid="pet-age-2"]').contains('Edad: 8')
})

Cypress.Commands.add("getAdoptionPet", ()=> {
    cy.get('[data-testid="pet-state-3"]').contains('Adopción')
    cy.get('[data-testid="pet-name-3"]').contains('Perrito')
    cy.get('[data-testid="pet-age-3"]').contains('Edad: 6')
})
