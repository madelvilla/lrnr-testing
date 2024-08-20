describe('Navbar Navigation', () => {
    it('should navigate to the Account page', () => {
      cy.visit('/');
      cy.get('a').contains('Account').click();
      cy.url().should('include', '/Account');
    });
  });

  describe('HomePage Content', () => {
    it('should display the correct header and button text', () => {
      cy.visit('/');
      cy.contains('Your guided path to programming enlightenment');
      cy.contains('BEGIN JOURNEY');
    });
  });
  
  describe('HomePage Logo', () => {
    it('should display the logo', () => {
      cy.visit('/');
      cy.get('.logo').should('be.visible');
    });
  });
  
  describe('Navbar Navigation', () => {
    it('should navigate to the Quiz Generation page', () => {
      cy.visit('/');
      cy.get('a').contains('Quiz Generation').click();
      cy.url().should('include', '/quiz-generation');
    });
  });
  