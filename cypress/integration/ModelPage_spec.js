describe('/state/:id', () => {
  it(`Stay At Home has the correct title & description`, () => {
    cy.visit('/us/ny');
    cy.title().should(
      'eq',
      'Real-time modeling and metrics to understand where we stand against COVID. - Covid Act Now',
    );
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Real-time modeling and metrics to understand where we stand against COVID. 50 states. 3,000+ counties. Click the map to dive in.',
    );
  });
});
