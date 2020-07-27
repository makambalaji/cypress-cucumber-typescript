export {}; // needed in files which don't have an import to trigger ES6 module usage
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace,no-redeclare
  namespace Cypress {
    interface Chainable<Subject> {
      clickNavLink(path: [string, string]): Chainable<Element>;
      selectByDropDownText(selector: string, dropdownText: string): Chainable<Element>;
      selectRowByColumnName(columnNumber: number, referenceRowValue: string, selector: string): Chainable<Element>;
      mouseHover(selector: string): Chainable<Element>;
      rightclick(selector: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('clickNavLink', (path: [string, string]) => {
    cy.get(`[data-component="pf-nav-expandable"]`) // this assumes all top level menu items are expandable
      .contains(path[0])
      .click(); // open top, expandable menu
    cy.get('#page-sidebar')
      .contains(path[1])
      .click();
});

Cypress.Commands.add('selectByDropDownText', (selector: string, dropdownText: string) => {
    cy.get(selector).click();
    cy.get('ul.pf-c-dropdown__menu li button').each(($el, index, list) => {
      if($el.text().includes(dropdownText)) {
        $el.click();
      }
    })
});

Cypress.Commands.add('selectRowByColumnName', (columnNumber: number, referenceRowValue: string, selector: string) => {
    cy.get('div[role="grid"]').should('exist');
    cy.get(`tr td:nth-child(${columnNumber})`).each(($el, index, $list) => {
      const text = $el.text()
      if(text.includes(referenceRowValue)) {
        cy.get(`tr td:nth-child(${columnNumber})`).eq(index).next(selector);
      }
    });
});

Cypress.Commands.add('mouseHover', (selector: string) => {
    cy.get(selector).invoke('show').should('be.visible').trigger('mouseover');
});

Cypress.Commands.add('rightclick', (selector: string) => {
  cy.get(selector).trigger('contextmenu');
});
