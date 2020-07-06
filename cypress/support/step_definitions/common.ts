import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import {loginPage} from '../pages/login_page';
import { perspective, projectNameSpace as project } from '../pages/app';
import { operatorsPage } from '../pages/operators_page';
import {operators, switchPerspective} from '../constants/global';

Given('user logged into the openshift application', () => {
    loginPage.loginWithValidCredentials(Cypress.env('username'), Cypress.env('password'));
    loginPage.checkLoginSuccess();
});
  
Given('user is at admin perspecitve', () => {
    perspective.verifyPerspective('Administrator');
});

Given('openshift cluster is installed with pipeline operator', () => {
    perspective.switchTo(switchPerspective.Developer);
    perspective.verifyPerspective('Developer');
    cy.get('#page-sidebar').then(($navMenu) => {
      if ($navMenu.find('[data-test-id="pipeline-header"]').length) {
        cy.log('pipeline operator is installed');
      }
      // else {
      //   perspective.verifyPerspective('Administrator');
      //   operatorsPage.navigateToOperaotorHubPage();
      //   operatorsPage.titleShouldBe('OperatorHub');
      //   operatorsPage.searchOperator('OpenShift Pipelines Operator');
      //   operatorsPage.selectOperator(operators.pipelineOperator);
      //   operatorsPage.verifySiedPane();
      //   operatorsPage.clickInstallOnSidePane();
      //   operatorsPage.verifyPipelineOperatorSubscriptionPage();
      //   operatorsPage.installPipelineOperator();
      //   operatorsPage.titleShouldBe('Installed Operators');
      // }
    })
});

Given('user is at the project namespace {string} in dev perspecitve', (projectName: string) => {
  perspective.switchTo(switchPerspective.Developer);
  project.selectProject(projectName);
});
  
Given('openshift cluster is installed with knative operator', () => {
  perspective.switchTo(switchPerspective.Administrator);
  perspective.verifyPerspective('Administrator');
  operatorsPage.verifyServerlessOperator();
});