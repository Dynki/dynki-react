/// <reference types="Cypress" />

context('Login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('Login Failure', () => {
        cy.get('#email')
            .type('fake@email.com').should('have.value', 'fake@email.com')
  
        cy.get('#password')
            .type('SomeFakePassword').should('have.value', 'SomeFakePassword')
  
        cy.get('#loginbtn').click();

        cy.contains('Login Failure');

    })

    it('Should login', () => {
      cy.login();
      cy.contains('Inbox');
      cy.logout();
    })

  })
  