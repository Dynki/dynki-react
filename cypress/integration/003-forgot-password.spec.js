import Chance from 'chance';
const chance = new Chance();

/// <reference types="Cypress" />

context('Forgot Password', () => {
    before(() => {
        cy.visit('http://localhost:3000')
    })

    beforeEach (() => {
        cy.wait(3000)
    })

    it('Check if valid email', () => {
        cy.contains('Log In').click()
        cy.contains('Forgot password').click()
        cy.get('#email').type('fake').should('have.value', 'fake')
        cy.contains('Not a valid email address!');
    })

    it('Fails to send email to unknown account', () => {
        cy.get('#email').clear();
  
        cy.get('#email').type('fake@fake.com').should('have.value', 'fake@fake.com')
        cy.contains('Send Email').click()
        cy.contains('There is no user record corresponding to this identifier. The user may have been deleted')
        cy.get('#backToHome').click()
    })

    it('Should send email to known account', () => {
        const email = chance.email();
        cy.signup(email);
        cy.newTeam();
        cy.logout();
        cy.contains('Log In').click();
        cy.contains('Forgot password').click();
        cy.get('#email').type(email).should('have.value', email);
        cy.contains('Send Email').click();
        cy.contains('Reset email sent, please check your email!');
        cy.contains('Log In').click();
        cy.login(email, 'F@kelonger1');
        cy.deleteAccount();
    })

})
