/// <reference types="Cypress" />

context('Create Team', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('Validate too long team name', () => {
        cy.signup();
        cy.get('#name')
            .type('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
            .should('have.value', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
  
        cy.contains('Toooo loooonnnnggg!!');
        cy.get('#name').clear()
        cy.newTeam()

        // Clean up
        cy.deleteAccount();
    })

    it('Validate too short team name', () => {
        cy.signup();
        cy.get('#name')
            .type('1234')
            .should('have.value', '1234')
  
        cy.contains('Not long enough, try a longer name!');
        cy.get('#name').clear()
        cy.newTeam()

        // Clean up
        cy.deleteAccount();
    })

    it('Validate team name is mandatory', () => {
        cy.signup();
        cy.get('#btnCreateTeam').click()
        cy.contains("We're gonna need a team name");
        cy.newTeam()

        // Clean up
        cy.deleteAccount();
    })

    it('Should create a new team', () => {
        cy.signup()
        cy.newTeam()
        cy.contains('Team1');

        // Clean up
        cy.deleteAccount();
    })
})
  