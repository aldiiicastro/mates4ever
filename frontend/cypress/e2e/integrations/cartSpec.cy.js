import * as petsMocks from '../../support/mocks/cartMocks'

describe('Initial pets', () => {
    it('Empty list pets', () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'empty_data.json'}).as('gets')
        cy.visit('http://localhost:19006/')
        cy.wait('@gets')
        cy.get('[data-testid="no-pets"]').contains('No hay mascotas')
    })
    it('List of pets', () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.visit('http://localhost:19006/')
        cy.wait('@gets')
        //Testing transit pet
        cy.get('[data-testid="pet-state-1"]').contains('Transito')
        cy.get('[data-testid="pet-name-1"]').contains('Mía')
        cy.get('[data-testid="pet-age-1"]').contains('Edad: 5')
        //Testing lost pet
        cy.get('[data-testid="pet-state-2"]').contains('Perdido')
        cy.get('[data-testid="pet-name-2"]').contains('Gatito')
        cy.get('[data-testid="pet-age-2"]').contains('Edad: 8')
        //Testing adoption pet
        cy.get('[data-testid="pet-state-3"]').contains('Adopción')
        cy.get('[data-testid="pet-name-3"]').contains('Perrito')
        cy.get('[data-testid="pet-age-3"]').contains('Edad: 6')

    })
    it('Can click on states', () => {
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.visit('http://localhost:19006/')
        cy.wait('@gets')
        cy.get('[data-testid="button-Perdido"]').click()
        cy.get('[data-testid="button-Adopción"]').click()
        cy.get('[data-testid="button-Transito"]').click()
    })
    it('Appears correct transit pet', () => {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.visit('http://localhost:19006/')
        cy.wait('@gets')
        //Click on Transit Button
        cy.get('[data-testid="button-Transito"]').click()
        //Testing transit pet
        cy.get('[data-testid="pet-state-1"]').contains('Transito')
        cy.get('[data-testid="pet-name-1"]').contains('Mía')
        cy.get('[data-testid="pet-age-1"]').contains('Edad: 5')
    })
    it('Appears correct lost pet', () => {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.visit('http://localhost:19006/')
        cy.wait('@gets')
        //Click on Lost Button
        cy.get('[data-testid="button-Perdido"]').click()
        //Testing lost pet
        cy.get('[data-testid="pet-state-2"]').contains('Perdido')
        cy.get('[data-testid="pet-name-2"]').contains('Gatito')
        cy.get('[data-testid="pet-age-2"]').contains('Edad: 8')
    })
    it('Appears correct lost pet', () => {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.visit('http://localhost:19006/')
        cy.wait('@gets')
        //Click on Adoption Button
        cy.get('[data-testid="button-Adopción"]').click()
        //Testing adoption pet
        cy.get('[data-testid="pet-state-3"]').contains('Adopción')
        cy.get('[data-testid="pet-name-3"]').contains('Perrito')
        cy.get('[data-testid="pet-age-3"]').contains('Edad: 6')
    })
    it('Can see Mia details', ()=> {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.intercept('GET', '/api/pet/1', {fixture: 'pet_data.json'}).as('getPet')
        cy.visit('http://localhost:19006/')
        cy.wait('@gets')
        //Click on pet card
        cy.get('[data-testid="pet-details-1"]').click()
        cy.wait('@getPet')
        //Testing details of one pet
        cy.get('[data-testid="pet-details-name"]').contains('Mía')
        cy.get('[data-testid="pet-details-age"]').contains('Edad: 5')
        cy.get('[data-testid="pet-details-state"]').contains('Transito')
        cy.get('[data-testid="pet-details-description-field"]').contains('Descripción')
        cy.get('[data-testid="pet-details-description"]').contains('Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo')
    })
    it('Searching Per', ()=> {
        //Fixture create the seed data
        cy.intercept('GET', '/api/pet/search?query=', {fixture: 'pets_data.json'}).as('gets')
        cy.intercept('GET', '/api/pet/search?query=P', {fixture: 'searchPer_data.json'})
        cy.intercept('GET', '/api/pet/search?query=Pe', {fixture: 'searchPer_data.json'})
        cy.intercept('GET', '/api/pet/search?query=Per', {fixture: 'searchPer_data.json'}).as('getPer')
        cy.visit('http://localhost:19006/')
        cy.wait('@gets')
        cy.get('[data-testid="search"]').type('Per')
        cy.wait('@getPer')
        //Testing lost pet
        cy.get('[data-testid="pet-state-2"]').contains('Perdido')
        cy.get('[data-testid="pet-name-2"]').contains('Gatito')
        cy.get('[data-testid="pet-age-2"]').contains('Edad: 8')
        //Testing adoption pet
        cy.get('[data-testid="pet-state-3"]').contains('Adopción')
        cy.get('[data-testid="pet-name-3"]').contains('Perrito')
        cy.get('[data-testid="pet-age-3"]').contains('Edad: 6')
    })
})
