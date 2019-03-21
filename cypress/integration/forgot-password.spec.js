import Chance from 'chance';
const chance = new Chance();

/// <reference types="Cypress" />

context('Forgot Password', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Check if valid email', () => {
        cy.get('.login-form-forgot').click()
        cy.get('#email').type('fake').should('have.value', 'fake')
        cy.contains('Not a valid email address!');
        cy.get('#backToLogin').click()
    })

    it('Fails to send email to unknown account', () => {
        cy.get('.login-form-forgot').click()
        cy.get('#email').type('fake@fake.com').should('have.value', 'fake@fake.com')
        cy.get('#submitbtn').click()
        cy.contains('There is no user record corresponding to this identifier. The user may have been deleted')
    })

    it('Should sent email to known account', () => {
        const email = chance.email();
        cy.signup(email)
        cy.newTeam()
        cy.logout()
        cy.get('.login-form-forgot').click()
        cy.get('#email').type(email).should('have.value', email)
        cy.get('#submitbtn').click()
        cy.contains('Reset email sent, please check your email!')
    })

})
