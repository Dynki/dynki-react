import Chance from 'chance';
const chance = new Chance();

/// <reference types="Cypress" />

context('Sign Up', () => {
    before(() => {
      cy.visit('http://localhost:3000');
    })

    it('Check if valid email', () => {
        cy.get('#register').click();
        cy.get('#userName').type('fake').should('have.value', 'fake');
        cy.get('#password').click();
  
        cy.contains('Not a valid email address!');
        cy.get('#userName').clear();
        cy.get('#password').clear();
    })

    it('Password < 8 chars', () => {
        cy.get('#password').type('fake').should('have.value', 'fake');
  
        cy.contains('Must be longer than 8 characters');
        cy.get('#password').clear();
    })

    it('Password > 8 chars but no number', () => {
        cy.get('#password').type('fakelonger').should('have.value', 'fakelonger');
  
        cy.contains('Must contain a number');
        cy.get('#password').clear();
    })

    it('Password > 8 & number but no mixed case', () => {
        cy.get('#password').type('fakelonger1').should('have.value', 'fakelonger1')
  
        cy.contains('Must contain upper and lower case letters');
        cy.get('#password').clear();
    })

    it('Password > 8 & number & mixed case but no special char', () => {
        cy.get('#password').type('Fakelonger1').should('have.value', 'Fakelonger1')
  
        cy.contains('Must contain at least one special character');
        cy.get('#password').clear();
    })

    it('Must agree terms before sign up', () => {
        const email = chance.email();
        cy.get('#userName').type(email).should('have.value', email);
        cy.get('#password').type('F@kelonger1').should('have.value', 'F@kelonger1');
        cy.get('#btnRegister').click();
        cy.contains('Please agree to terms of service and privacy policy');
        cy.get('#userName').clear();
        cy.get('#password').clear();
    })

    it('Duplicate sign up should fail', () => {
        const email = chance.email();
        cy.signup(email);
        cy.newTeam();
        cy.wait(1000);
        cy.logout();
        cy.signup(email);
        cy.contains('The email address is already in use by another account');

        // Clean up
        cy.wait(1000);
        cy.contains('back to login').click();
        cy.login(email, 'F@kelonger1');
        cy.deleteAccount();
    })

    it('Sign Up', () => {
        const email = chance.email();
        cy.signup(email);
        cy.newTeam();

        // Clean up
        cy.deleteAccount();
    })
})
  