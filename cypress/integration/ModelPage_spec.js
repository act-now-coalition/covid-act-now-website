describe('/state/:id', () => {
  it(`Stay At Home has the correct title & description`, () => {
    cy.visit('/state/NY');
    cy.title().should('eq', 'New York Forecast - Covid Act Now');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'New York: Keep staying at home to protect against the COVID-19 outbreak.',
    );
  });

  // NOTE: These tests will need to be updated as states change their status
  // (and may ultimately need to be removed).
  it(`Limited Action has the correct title & description`, () => {
    cy.visit('/state/SD');
    cy.title().should('eq', 'South Dakota Forecast - Covid Act Now');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'South Dakota: Urge your public officials to act now against the COVID-19 outbreak!',
    );
  });
  it(`Social Distancing has the correct title & description`, () => {
    cy.visit('/state/ND');
    cy.title().should('eq', 'North Dakota Forecast - Covid Act Now');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'North Dakota: Urge your public officials to act now against the COVID-19 outbreak!',
    );
  });
});
