describe('/state/:id', () => {
  it(`State page has the correct title & description`, () => {
    cy.visit('/us/ny');
    cy.title().should(
      'eq',
      'New York (NY) - COVID Data & Key Metrics - Covid Act Now',
    );
    cy.get('head meta[name="description"]')
      .should('have.attr', 'content')
      .and('match', /York/);
  });
});
