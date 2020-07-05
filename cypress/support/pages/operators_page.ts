import { operators } from "../constants/global";

export const operatorsPage = {
  navigateToOperaotorHubPage: () => {
    cy.clickNavLink(['Operators', 'OperatorHub']);
  },

  searchOperator: (operatorName: string) => {
    cy.get('input[placeholder="Filter by keyword..."]').should('be.visible');
    cy.get('input[placeholder="Filter by keyword..."]').type(operatorName);
    cy.get('div.co-catalog-page__num-items').should('be.visible');
  },

  installPipelineOperator: () => {
    cy.get('.co-m-nav-title')
      .find('h1')
      .should('have.text', 'Install Operator');
    cy.byButtonText('Install').click();
    cy.byLegacyTestID('resource-title').contains('Installed Operators');
  },

  verifyPipelineOperatorSubscriptionPage: () => {
    cy.get('h1.co-clusterserviceversion-logo__name__clusterserviceversion').should(
      'have.text',
      'OpenShift Pipelines Operator',
    );
  },

  verifyInstalledOperator: (operatorName: string) => {
    cy.get('h1.co-clusterserviceversion-logo__name__clusterserviceversion').should(
      'have.text',
      operatorName,
    );
  },

  titleShouldBe: (title: string) => cy.get('[data-test-id="resource-title"]').contains(title),
  headingDisplayed: (heading: string) => cy.get('h1').contains(heading),

  // installPipelineOperator: () => {
  //   cy.byTestID('openshift-pipelines-operator-rh-redhat-operators-openshift-marketplace').click();
  //   cy.get('[role="dialog"]')
  //     .byLegacyTestID('operator-modal-header')
  //     .should('be.exist');
  //   cy.byLegacyTestID('operator-install-btn').click();
  //   cy.get('.co-m-nav-title')
  //     .find('h1')
  //     .should('have.text', 'Install Operator');
  //   cy.byButtonText('Install').click();
  //   cy.byLegacyTestID('resource-title').should('have.text', 'Installed Operators');
  // },

  selectOperator: (opt: operators) => {
    switch (opt) {
      case operators.pipelineOperator: {
        cy.byTestID('openshift-pipelines-operator-rh-redhat-operators-openshift-marketplace').click();
        break;
      }
      default: {
        throw new Error('operator is not available');
      }
    }
  },

  verifySiedPane:() => {
    cy.get('[role="dialog"]').should('be.exist');
  },

  clickInstallOnSidePane: () => {
    cy.byLegacyTestID('operator-install-btn').click();
  }
  
};
