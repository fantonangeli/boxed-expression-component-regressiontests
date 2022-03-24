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

describe("Context Expression Tests", () => {
  before(() => {
    cy.visit(`http://localhost:3015/`);

    // Entry point for each new expression
    cy.ouiaId("expression-container").click();

    // Define new expression as Context
    cy.ouiaId("expression-popover-menu").contains("Context").click({ force: true });

    // Invoke Logic type selector for first context entry
    cy.ouiaId("expression-row-0").within(($row) => {
      cy.ouiaId("expression-column-2").click();
    });

    // Set first context entry as Relation
    cy.ouiaId("expression-popover-menu").contains("Relation").click({ force: true });

    // insert one column right
    cy.ouiaType("expression-column-header-cell-info").contains("column-1").rightclick();
    cy.contains("Insert right").click({ force: true });

    // insert one column left
    cy.ouiaType("expression-column-header-cell-info").contains("column-1").rightclick();
    cy.contains("Insert left").click({ force: true });

    // write some text in the innerTable
    cy.get("table table")
      .ouiaId("expression-row-0")
      .find(".data-cell")
      .each((el, index) => {
        cy.wrap(el).type("nested " + (index + 1));
      });
    //click outside to finish editing
    cy.get("body").click();

    cy.get(".boxed-expression").scrollTo("top");

  });

  it('header cell focus', () => {
    cy.get("th.data-header-cell:eq(0)").focus().wait(0);

    // check the snapshot for regression
    cy.matchImageSnapshot();
  });

  it('data cell focus', () => {
    cy.contains("td", "ContextEntry-1").focus().wait(0);

    // check the snapshot for regression
    cy.matchImageSnapshot();
  });

});

