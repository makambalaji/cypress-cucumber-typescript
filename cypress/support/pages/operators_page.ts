import { operators } from "../constants/global";

export const operatorsObj = {
  nav: {
    operatorHub: 'a[href="/operatorhub"]',
    link: '[data-component="pf-nav-expandable"]',
    menu: '#page-sidebar',
  },
  operatorHub: {
    search: 'input[placeholder="Filter by keyword..."]',
    pipelineoperatorCard: '[data-test="openshift-pipelines-operator-rh-redhat-operators-openshift-marketplace"]',
    numOfItems: 'div.co-catalog-page__num-items',
  },
  pipelineOperatorSubscription: {
    logo: 'h1.co-clusterserviceversion-logo__name__clusterserviceversion',
  },
  installOperators: {
    title: 'h1.co-m-pane__heading',
    operatorsNameRow: 'div[aria-label="Installed Operators"] td:nth-child(1)',
  },
  sidePane: {
    install: '[data-test-id="operator-install-btn"]',
  },
  alertDialog: '[role="dialog"]',
}

export const operatorsPage = {
  navigateToOperaotorHubPage: () => {
    cy.get(operatorsObj.nav.link).contains('Operators').click();
    cy.get(operatorsObj.nav.operatorHub,).click();
  },

  searchOperator: (operatorName: string) => {
    cy.get(operatorsObj.operatorHub.search, { timeout: 40000 }).should('be.visible').type(operatorName);
    cy.get(operatorsObj.operatorHub.numOfItems).should('be.visible');
  },

  installPipelineOperator: () => {
    cy.get(operatorsObj.installOperators.title).should('have.text', 'Install Operator');
    cy.byButtonText('Install').click();
    cy.byLegacyTestID('resource-title').contains('Installed Operators');
  },

  verifyPipelineOperatorSubscriptionPage: () => 
    cy.get(operatorsObj.pipelineOperatorSubscription.logo).should('have.text', 'OpenShift Pipelines Operator'),

  verifyInstalledOperator: (operatorName: string) => 
    cy.get(operatorsObj.installOperators.operatorsNameRow).should('contain.text', operatorName),
  
  headingDisplayed: (heading: string) => cy.get('h1').contains(heading),

  selectOperator: (opt: operators) => {
    switch (opt) {
      case operators.pipelineOperator: {
        cy.get(operatorsObj.operatorHub.pipelineoperatorCard).click();
        break;
      }
      default: {
        throw new Error('operator is not available');
      }
    }
  },

  verifySiedPane:() => cy.get(operatorsObj.alertDialog).should('be.exist'),

  clickInstallOnSidePane: () => {
    cy.get(operatorsObj.alertDialog).then(($sidePane) => {
      if ($sidePane.find(operatorsObj.sidePane.install).length) {
        cy.get(operatorsObj.sidePane.install).click();
      }
      else {
        cy.log('Pipeline operator is already installed');
      }
    })   
  },

  verifyServerlessOperator: () => {
    cy.get(operatorsObj.nav.menu).should('contain.text', 'Serverless');
  }
};
