import Chance from 'chance';
const chance = new Chance();

/// <reference types="Cypress" />

context('Boards', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    after(() => {
        // Clean up
        cy.deleteAccount();
    })

    it('Add board to menu', () => {
        const email = chance.email();
        // cy.signup(email);
        const password = 'F@kelonger1'
        cy.get('#register').click();
        cy.get('#userName').type(email).should('have.value', email)
        cy.get('#password').type(password).should('have.value', password)
        cy.get('#agree').click();
        cy.get('#btnRegister').click();
    

        cy.wait(1000);
        cy.newTeam();
        cy.get('#btnBoards').click();
        cy.wait(1000);
        cy.get('.ant-tree-switcher').click();
        cy.contains('Scratch');
    })

    it('Change board title', () => {
        cy.get('#title').clear();
        cy.get('#title').type('Test Title');
        cy.get('#description').click();
        cy.wait(1000);
        cy.get('#title').should('have.value', 'Test Title');
    })

    it('Change board description', () => {
        cy.wait(1000);
        cy.get('#description').clear();
        cy.get('#description').type('Test Desc');
        cy.get('#title').click();
        cy.wait(1000);
        cy.get('#description').should('have.value','Test Desc');
    })
})
  