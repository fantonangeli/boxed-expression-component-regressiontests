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


describe("Literal Expression Tests", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3015/`);

    // Entry point for each new expression
    cy.ouiaId("expression-container").click();

    // Define new expression as Literal Expression
    cy.ouiaId("expression-popover-menu").contains("Literal expression").click({ force: true });
    
    cy.get(".literal-expression-header").should("be.visible");

    cy.document().then((doc) => {
      doc.querySelector('.updated-json').remove();
    });
  });

  it("Literal Expression", () => {
    // check the snapshot for regression
    cy.matchImageSnapshot();
  });

  it("datacell focused", () => {
    cy.get('.editable-cell').click();

    // check the snapshot for regression
    cy.matchImageSnapshot();
  });
});
