

describe('Contact Card - Edit and Save', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should edit and save a contact', () => {
    cy.get('#edit-contact-button').click();
    cy.get('#contact-firstname').clear().type('John');
    cy.get('#contact-lastname').clear().type('Doe');
    cy.get('#save-contact-button').click();
    cy.get('#contact-name').contains('DOE, John');
  });
});


describe('Contact Card - Delete a Contact', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should delete a contact', () => {
    cy.get('#delete-contact-button').click();
    cy.get('#contact-card').should('not.exist');
  });
});
