import Chance from 'chance';
const chance = new Chance();

/// <reference types="Cypress" />

context('Login', () => {
    before(() => {
      cy.visit('http://localhost:3000');
    })

    beforeEach (() => {
      cy.wait(3000)
    })

    it('Login Failure', () => {
        cy.contains('Log In').click();
        cy.login('fake@email.com', 'SomeFakePassword');
        cy.contains('Login Failure');
    })

    it('Check if valid email', () => {
      cy.get('#email').clear();
      cy.get('#password').clear();

      cy.get('#email').type('fake').should('have.value', 'fake');
      cy.get('#password').click();
      cy.contains('Not a valid email address!');
    })

    it('Check for required values', () => {
      cy.get('#email').clear();
      cy.get('#password').clear();

      cy.get('#loginbtn').click();
      cy.contains('Please input an email!')
      cy.contains('Please input your Password!')
    })

    it('Should login', () => {
      const email = chance.email();
      cy.signup(email);
      cy.newTeam();
      cy.wait(500);
      cy.logout();
      cy.contains('Log In').click();
      cy.login(email, 'F@kelonger1');
      cy.wait(500);
      cy.contains('Channels');
      cy.deleteAccount();
    })

  })
  