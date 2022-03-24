/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


describe("Decision Table Keyboard Navigation Tests", () => {
  before(() => {
    cy.visit(`http://localhost:3015/`);

    // Entry point for each new expression
    cy.ouiaId("expression-container").click();

    // Define new expression as Relation
    cy.ouiaId("expression-popover-menu").contains("Decision Table").click({ force: true });

    // open contextMenu from first input cell
    cy.ouiaId("expression-column-1").as("firstInputCell").rightclick();

    // create a row below
    cy.ouiaId("expression-table-handler-menu").contains("Insert below").click({ force: true });

    // open contextMenu from first input cell
    cy.get("@firstInputCell").rightclick();

    // create a row below
    cy.ouiaId("expression-table-handler-menu").contains("Insert below").click({ force: true });

    // open contextMenu from first input cell
    cy.get("@firstInputCell").rightclick();

    // create a column right
    cy.contains("Insert right").click({ force: true });

    // write some text in the table
    cy.get(".data-cell").each((cell, cellIndex) => {
      cy.wrap(cell).type(`{enter}cell ${cellIndex + 1}`);
    });
    //click outside to finish editing
    cy.get("body").click();
  });
  
  describe('regression tests', () => {

    beforeEach(() => {
      cy.get(".boxed-expression").scrollTo("top");
    });

    it('input header cell focus', () => {
      cy.get("tr:last-child th.data-header-cell:eq(0)").focus();

      // check the snapshot for regression
      cy.matchImageSnapshot();
    });

    it('output header cell focus', () => {
      cy.contains("th", "output-1").focus();

      // check the snapshot for regression
      cy.matchImageSnapshot();
    });

    it('data cell focus', () => {
      cy.contains("td", "cell 1").focus();

      // check the snapshot for regression
      cy.matchImageSnapshot();
    });

  });
});
