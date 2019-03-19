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

    it('Check if valid email', () => {
      cy.get('#email')
          .type('fake').should('have.value', 'fake')

      cy.get('#password').click();

      cy.contains('Not a valid email address!');
    })

    it('Check for required values', () => {
      cy.get('#loginbtn').click();

      cy.contains('Please input an email!')
      cy.contains('Please input your Password!')
    })

    it('Should login', () => {
      cy.login();
      cy.contains('Inbox');
      cy.logout();
    })

  })
  