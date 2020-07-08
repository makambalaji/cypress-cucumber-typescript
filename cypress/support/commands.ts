export {}; // needed in files which don't have an import to trigger ES6 module usage
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace,no-redeclare
  namespace Cypress {
    interface Chainable<Subject> {
      clickNavLink(path: [string, string]): Chainable<Element>;
      byTestID(selector: string): Chainable<Element>;
      byTestActionID(selector: string): Chainable<Element>;
      byLegacyTestID(selector: string): Chainable<Element>;
      byButtonText(selector: string): Chainable<Element>;
      selectByDropDownText(selector: string, dropdownText: string): Chainable<Element>;
      byAppGroupName(appName: string): Chainable<Element>;
      byNodeName(nodeName: string): Chainable<Element>;
    }
  }
}

// any command added below, must be added to global Cypress interface above

Cypress.Commands.add('clickNavLink', (path: [string, string]) => {
  cy.get(`[data-component="pf-nav-expandable"]`) // this assumes all top level menu items are expandable
    .contains(path[0])
    .click(); // open top, expandable menu
  cy.get('#page-sidebar')
    .contains(path[1])
    .click();
});

Cypress.Commands.add('byTestID', (selector: string) => cy.get(`[data-test="${selector}"]`));
Cypress.Commands.add('byTestActionID', (selector: string) =>
  cy.get(`[data-test-action="${selector}"]:not(.pf-m-disabled)`),
);
Cypress.Commands.add('byLegacyTestID', (selector: string) =>
  cy.get(`[data-test-id="${selector}"]`),
);
Cypress.Commands.add('byButtonText', (selector: string) =>
  cy.get('button[type="button"]').contains(`${selector}`),
);
Cypress.Commands.add('byDataID', (selector: string) => cy.get(`[data-id="${selector}"]`));

Cypress.Commands.add('selectByDropDownText', (selector: string, dropdownText: string) => {
  cy.get('div.pf-c-dropdown button').contains(`${selector}`).click();
  cy.get('ul.pf-c-dropdown__menu li button').each(($el, index, list) => {
    if($el.text().includes(dropdownText)) {
      $el.click();
    }
  })
});

Cypress.Commands.add('byAppGroupName', (appName: string) => {
    cy.get(`[data-id="group:${appName}"] g.odc-application-group__label text`)
});

Cypress.Commands.add('byNodeName', (nodeName: string) => {
  cy.get('g[data-type="workload"] rect').contains(nodeName);
});