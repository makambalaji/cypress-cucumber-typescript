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
      selectRowByColumnName(columnNumber: number, referenceRowValue: string, selector: string): Chainable<Element>;
      mouseHoverAndClick(selector: string, element: string): Chainable<Element>;
      titleShouldBe(title:string): Chainable<Element>;
      alertTitleShouldBe(title:string): Chainable<Element>;
      selectLinkInBreadCrumb(linkName: string): Chainable<Element>;
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
  cy.get(selector).click();
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
  cy.get('g[data-type="workload"] g.odc-resource-icon').next().contains(nodeName);
});

Cypress.Commands.add('selectRowByColumnName', (columnNumber: number, referenceRowValue: string, selector: string) => {
  cy.get('div[role="grid"]').should('exist');
  cy.get(`tr td:nth-child(${columnNumber})`).each(($el, index, $list) => {
    const text = $el.text()
    if(text.includes(referenceRowValue)) {
      cy.get(`tr td:nth-child(${columnNumber})`).eq(index).next(selector);
    }
  });
})

Cypress.Commands.add('mouseHoverAndClick', (selector: string, element: string) => {
  cy.get(selector).invoke('show').should('be.visible').trigger('mouseover');
  cy.get(element).click();
});

Cypress.Commands.add('titleShouldBe', (title: string) => {
  cy.get('[data-test-id ="resource-title"]', {timeout: 3000}).should('contain.text', title);
});

Cypress.Commands.add('alertTitleShouldBe', (alertTitle: string) => {
  cy.byLegacyTestID('modal-title').should('contain.text', alertTitle);
});

Cypress.Commands.add('selectKebabMenuOption', (kebabMenuOption: string) => {
  cy.byTestActionID(kebabMenuOption).click();
});

Cypress.Commands.add('selectLinkInBreadCrumb', (linkName: string) => {
  cy.get('nav[aria-label="Breadcrumb"] ol li').each(($el, index, list) => {
    if($el.text().includes(linkName)) {
      $el.find('a').click();
    }
  });
})

before(() => {
  cy.visit('/');
  // cy.get('body').then(($body) => {
  //   if ($body.find('a[title="Log in with kube:admin"]').length) {
  //     cy.get('a[title="Log in with kube:admin"]').click().then(() => {
  //       cy.url().should('include', 'login');
  //     })
  //   }
  // })
  // cy.get('#inputUsername').type(Cypress.env('username'));
  // cy.get('#inputPassword').type(Cypress.env('password'));
  // cy.get('[type="submit"]').click();
  // cy.get('[aria-label="Help menu"]').should('be.visible');
});
