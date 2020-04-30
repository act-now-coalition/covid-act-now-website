describe('/state/:id', () => {
  it(`Stay At Home has the correct title & description`, () => {
    cy.visit('/us/ny');
    cy.title().should(
      'eq',
      'Real-time models and metrics to understand where we stand against COVID. - Covid Act Now',
    );
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Real-time models and metrics to understand where we stand against COVID. 50 states. 2,100+ counties. Click the map to dive in.',
    );
  });
});
