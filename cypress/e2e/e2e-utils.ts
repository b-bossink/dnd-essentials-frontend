export class e2eUtils {
    static inputOfType(type: string): Cypress.Chainable {
        return cy.get('input').get(`[type="${type}"]`);
    }

    static inputWithName(fieldCollection: Cypress.Chainable, name: string): Cypress.Chainable {
        return fieldCollection.get(`[name="${name}"]`)
    }
}