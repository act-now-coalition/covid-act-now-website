describe('/state/:id', () => {
    it(`Shelter In Place has the correct title & description`, () => {
      cy.visit('/state/NY');
      cy.title().should('eq', 'Maintain shelter in place in New York.')
      cy.get('head meta[name="description"]')
        .should('have.attr', 'content', 'Avoiding hospital overload depends heavily on your cooperation.');
    });
    it(`Limited Action has the correct title & description`, () => {
        cy.visit('/state/SD');
        cy.title().should('eq', 'You must act now in South Dakota!')
        cy.get('head meta[name="description"]')
          .should('have.attr', 'content', 'To prevent hospital overload, our projections indicate shelter in place must be implemented soon.');
    });
    it(`Social Distancing has the correct title & description`, () => {
        cy.visit('/state/FL');
        cy.title().should('eq', 'You must act now in Florida!')
        cy.get('head meta[name="description"]')
          .should('have.attr', 'content', 'To prevent hospital overload, our projections indicate shelter in place must be implemented soon.');
    });
});
  