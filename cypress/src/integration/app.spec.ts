export const app =
  'Step: ' +
  Cypress.config()
    .integrationFolder.split('\\')
    .find(pathSegment => /[0-9]/.test(pathSegment));

describe(app, () => {
  before(() => {
    cy.visit('/');
  });
  describe('sales report', () => {
    // Caution: these tests boarder on testing Angular functionality
    // instead of application features

    it('should display report date in acceptable format', () => {
      cy.contains('.card-title', 'Sales Report: Dec 25, 2058').should(
        'exist'
      );
    });

    it('should present sales numbers in appropriate format', () => {
      cy.get('td:nth-child(2)')
        .should('have.length', 8)
        .each(child => {
          // RegExp testing 1.1111 format
          return expect(child.html()).to.match(/\d\.\d\d\d\d/);
        });
    });
  });
});
