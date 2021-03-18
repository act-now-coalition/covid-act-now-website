describe('/us/:stateUrlParam', () => {
  it(`State page has the correct title & description`, () => {
    cy.visit('/us/new_york-ny/');
    cy.title().should(
      'eq',
      'New York (NY) - COVID Vaccine & Risk Tracker - Covid Act Now',
    );
    cy.get('head meta[name="description"]')
      .should('have.attr', 'content')
      .and('match', /York/);
  });
});
