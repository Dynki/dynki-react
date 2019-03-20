import Chance from 'chance';
const chance = new Chance();


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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (email, password) => {
    cy.get('#email')
        .type(email).should('have.value', email)

    cy.get('#password')
        .type(password).should('have.value', password)

    cy.get('#loginbtn').click();
})

Cypress.Commands.add('logout', () => {
    cy.get('#userprofile-icon').click();
    cy.wait(500)
    cy.get('#logout').click();
    cy.wait(500)
})

Cypress.Commands.add('signup', (email) => {
    email = email ? email : chance.email();

    cy.get('#register').click();

    cy.get('#userName')
    .type(email).should('have.value', email)

    cy.get('#password')
        .type('F@kelonger1').should('have.value', 'F@kelonger1')

    cy.get('#agree').click();

    cy.get('#btnRegister').click();
    cy.contains('Name your team')

    cy.get('#name').type('Team1').should('have.value', 'Team1')
    cy.get('#btnCreateTeam').click();
})