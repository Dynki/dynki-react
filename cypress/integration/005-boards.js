
/// <reference types="Cypress" />

context('Boards', () => {
    it('Add board to menu', () => {
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
  