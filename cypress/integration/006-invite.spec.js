context('Team Invite', () => {
    beforeEach (() => {
        cy.wait(3000)
    })
  
    it('should open the invite drawer', () => {
        cy.get('[data-testid=inviteButton]').click();
        cy.contains('Invite team members');
    });

    it('should allow an email address to be inputted', () => {
        cy.get('[data-testid=inviteSelect]').type('fake1@fake.com').should('have.value', ['fake1@fake.com']);
    });

    it('should allow multiple email address to be inputted', () => {
        cy.get('[data-testid=inviteSelect]').type('fake2@fake.com').should('have.value', ['fake1@fake.com' ,'fake2@fake.com']);
    });

    it('should send be notified of sending invites', () => {
        cy.get('[data-testid=sendInvitesButton]').click();
        cy.contains('Successfully invited team member');
    });

});
