Cypress.config('defaultCommandTimeout', 10000);

describe('Sign-up and Login', () => {
   beforeEach(() => {
      cy.visit('http://localhost:5000/sign-up')
   });

   it('should sign up', () => {
      const name = "Ramesha P";
      const userName = "Ramesh@1";
      const password = "12345678";
      cy.get('input[name="name"]').should('be.visible').type(name);
      cy.get('input[name="userName"]').type(userName);
      cy.get('input[name="password"]').type(password);

      cy.get('button[type="submit"]').click();
      cy.get('input[name="userName"]').type(userName);
      cy.get('input[name="password"]').type(password);

      cy.get('button[type="submit"]').click();
   });
   // beforeEach(() => {
   //    cy.visit('http://localhost:5000/sign-up')
   // });

   // it('should sign up', () => {
   //    const name = "Ramesha P";
   //    const userName = "Ramesh@1";
   //    const password = "12345678";
   //    cy.get('input[name="name"]').should('be.visible').type(name);
   //    cy.get('input[name="userName"]').type(userName);
   //    cy.get('input[name="password"]').type(password);

   //    cy.get('button[type="submit"]').click();
   });
   // beforeEach(() => {
   //    cy.visit('http://localhost:5000/login')
   // });

   // it('should log in after signing up', () => {
   //    const userName = "Ramesh@1";
   //    const password = "12345678";

   //    cy.get('input[name="userName"]').type(userName);
   //    cy.get('input[name="password"]').type(password);

   //    cy.get('button[type="submit"]').click();
   // });
// });
