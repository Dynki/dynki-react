import Chance from 'chance';
const chance = new Chance();

/// <reference types="Cypress" />

context('Create Team', () => {
    before(() => {
      cy.visit('http://localhost:3000');
      const email = chance.email();
      cy.signup(email);

    })

    it('Validate too long team name', () => {
        cy.get('#name')
            .type('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
            .should('have.value', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  
        cy.contains('Toooo loooonnnnggg!!');
        cy.get('#name').clear();
    })

    it('Validate too short team name', () => {
        cy.get('#name')
            .type('1234')
            .should('have.value', '1234');
  
        cy.contains('Not long enough, try a longer name!');
        cy.get('#name').clear()
    })

    it('Validate team name is mandatory', () => {
        cy.get('#btnCreateTeam').click();
        cy.contains("We're gonna need a team name");
    })

    it('Should create a new team', () => {
        cy.newTeam();
        cy.contains('Team1');

        // Clean up
        cy.deleteAccount();
    })
})
