describe('Main App Should be Visible', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#root').should('be.visible');
  });

  it(`Can See Map`, () => {
    cy.get('.Map').should('be.visible');
  });
});
