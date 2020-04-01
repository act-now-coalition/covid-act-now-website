describe('/state/:id', () => {
  it(`Stay At Home has the correct title & description`, () => {
    cy.visit('/state/NY');
    cy.title().should('eq', 'Maintain staying at home in New York.');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Avoiding hospital overload depends heavily on your cooperation.',
    );
  });

  // NOTE: These tests will need to be updated as states change their status
  // (and may ultimately need to be removed).
  it(`Limited Action has the correct title & description`, () => {
    cy.visit('/state/SD');
    cy.title().should('eq', 'You must act now in South Dakota!');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'To prevent hospital overload, our projections indicate a Stay at Home order must be implemented soon.',
    );
  });
  it(`Social Distancing has the correct title & description`, () => {
    cy.visit('/state/ND');
    cy.title().should('eq', 'You must act now in North Dakota!');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'To prevent hospital overload, our projections indicate a Stay at Home order must be implemented soon.',
    );
  });
});
