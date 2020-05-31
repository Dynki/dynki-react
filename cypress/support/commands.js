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
    cy.get('#email').clear();
    cy.get('#email').type(email).should('have.value', email);
    cy.get('#password').type(password).should('have.value', password)
    cy.get('#loginbtn').click();
})

Cypress.Commands.add('logout', () => {
    cy.get('#userprofile-icon').click();
    cy.wait(2000)
    cy.get('#logout').click();
    cy.wait(20000)
})

Cypress.Commands.add('deleteAccount', () => {
    cy.get('#btnBoards').click();
    cy.wait(5000);

    cy.get('#userprofile-icon').click();
    cy.wait(2000)
    cy.contains('Account Details').click();
    cy.wait(2000)
    cy.contains('Billing').click();
    cy.wait(20000)
    cy.get('#btnRemoveAccount').click();
    cy.wait(10000)
    cy.contains('Yes Remove My Account').click();
    cy.wait(10000)
})

Cypress.Commands.add('signup', (email = chance.email(), password = 'F@kelonger1') => {
    // email = email ? email : chance.email();
    cy.server();
    cy.route('/auth/domain').as('getDomain');

    cy.get('#pricing').click();
    cy.contains('Start free trial').click();
    cy.get('#userName').type(email).should('have.value', email);
    cy.get('#password').type(password).should('have.value', password);
    cy.contains('Select a country').click();
    cy.contains('United Kingdom').click();

    cy.get('#agree').click();
    cy.get('#btnRegister').click();
    cy.wait(20000)
})

Cypress.Commands.add('newTeam', (name = 'Team1') => {
    // cy.contains('Name your team')
    cy.wait(20000);
    cy.get('#name', { timeout: 20000 } ).type(name).should('have.value', name);
    cy.get('#btnCreateTeam').click();
    cy.wait(20000);
})
