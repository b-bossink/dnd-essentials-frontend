import { waitForAsync } from "@angular/core/testing";
import { result } from "cypress/types/lodash";
import { e2eUtils } from "./e2e-utils";

describe('empty spec', () => {
  before(() => cy.login('http://localhost:4200/character', 'boris', 'wachtwoord123'));
  
  it('generate character stats', () => {
    cy.intercept('POST', 'https://localhost:5001/api/generate').as('generateRequest');
    cy.visit('http://localhost:4200/character/create');
    cy.get('button').click();
    cy.get('mat-dialog-container').should('exist');
    let inp = e2eUtils.inputOfType('number');
    e2eUtils.inputWithName(inp, 'd20').type('1');
    e2eUtils.inputWithName(inp, 'd12').type('2');
    e2eUtils.inputWithName(inp, 'd10').type('3');
    e2eUtils.inputWithName(inp, 'd8').type('4');
    e2eUtils.inputWithName(inp, 'd6').type('5');
    e2eUtils.inputWithName(inp, 'd4').type('6');
    cy.get('button').get("[id='gen']").click();

    cy.wait('@generateRequest').should(r => {
      expect(r.response).to.have.property('statusCode', 200);
    });

    let results: string[] = [];
    cy.get('data').each(((el) => {
      cy.wrap(el).invoke('text').then(t => results.push(t));
    })).then(() => {
      e2eUtils.inputOfType('submit').get("[value='Use these stats']").click();
      cy.get('mat-dialog-container').should('not.exist');
      const nums = e2eUtils.inputOfType('number');
      e2eUtils.inputWithName(nums, 'strength').should('have.value', results[0]);
      e2eUtils.inputWithName(nums, 'dexterity').should('have.value', results[1]);
      e2eUtils.inputWithName(nums, 'constitution').should('have.value', results[2]);
      e2eUtils.inputWithName(nums, 'intelligence').should('have.value', results[3]);
      e2eUtils.inputWithName(nums, 'wisdom').should('have.value', results[4]);
      e2eUtils.inputWithName(nums, 'charisma').should('have.value', results[5]);
    });
    
  })
})