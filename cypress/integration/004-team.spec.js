import Chance from 'chance';
const chance = new Chance();

/// <reference types="Cypress" />

context('Create Team', () => {
    before(() => {
      cy.visit('http://localhost:3000');
      const email = chance.email();
      cy.signup(email);
    })

    beforeEach (() => {
        cy.wait(3000)
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
    })

    it('Should display team details', () => {
        cy.get('[data-testid=displayTeam]').click();
        cy.contains('Invite a team member');
    })

    it('Should add a new group to the team', () => {
        cy.get('[data-testid=addGroup]').click();
        cy.contains('New group');
    })

    it('Should be able to change the new group name', () => {
        cy.get('[data-testid=group-New-group]').click();
        cy.get('#groupNameInput').clear().type('Test name');
        cy.get('[data-testid=group-Administrators]').click();
        cy.contains('Test name');
    })
    
    it('Should be able to delete a group', () => {
        // all searches are automatically rooted to the found tr element
        cy.get('[data-testid=delete-group-Test-name]').click();
        cy.contains('Delete really?');
        cy.contains('Yes delete group').click();
        cy.contains('Test name').should('not.exist');
    })
})
