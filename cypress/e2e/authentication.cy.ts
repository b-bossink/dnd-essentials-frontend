import { e2eUtils } from "./e2e-utils";



describe('visit login page', () => {
  it('passes', () => {
    cy.visit('localhost:4200');
    cy.contains('Log in').click();
    cy.wait(2000);
  })
})

describe('enter credentials & login', () => {
  it('passes', () => {
    e2eUtils.inputOfType('text').type('boris');
    e2eUtils.inputOfType('password').type('wachtwoord123');
    e2eUtils.inputOfType('submit').click();
    cy.wait(2000);
    cy.url().should('eq', 'http://localhost:4200/');
  })
})

describe('logout', () => {
  it('passes', () => {
    cy.contains('Log out').click();
    cy.wait(2000);
    cy.url().should('eq', 'http://localhost:4200/');
  })
})
