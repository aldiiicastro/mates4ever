import cy from "express/lib/router";

export const getPets = (response, userInfo, type) => {
    let endpoint = '/api/pet/search'
    cy.route({
        method:'GET',
        url: `${endpoint}?query=`,
        response,
    })
}

export const getUserLogin = (response, userInfo, type) => {
    let endpoint = '/api/user/email'
    cy.route({
        method:'GET',
        url: `${endpoint}/aldana@gmail.com`,
        response,
    })
}
