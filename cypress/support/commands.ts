export { };
import "cypress-localstorage-commands";
declare global {
    namespace Cypress {
        interface Chainable {
            login: typeof login;
        }
    }
}

const login = (initialPage: string, email: string, password: string) => {
    cy.visit('http://localhost:4200');
    cy.contains('Log in').click();
    cy.get('[name=name]').type(email)
    cy.get('[name=password]').type(`${password}`)
    cy.get(('[type=submit]')).click();
    cy.wait(1000);
};

Cypress.Commands.addAll({ login })