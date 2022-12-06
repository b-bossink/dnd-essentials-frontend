export { };
import "cypress-localstorage-commands";
declare global {
    namespace Cypress {
        interface Chainable {
            login: typeof login;
        }
    }
}

const login = (email: string, password: string) => {
    cy.clearLocalStorageSnapshot();
    cy.visit('http://localhost:4200/login')
    cy.get('[name=name]').type(email)
    cy.get('[name=password]').type(`${password}`)
    cy.get(('[type=submit]')).click();
    cy.saveLocalStorage();
};

Cypress.Commands.addAll({ login })