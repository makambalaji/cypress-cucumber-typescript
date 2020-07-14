import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { perspective, projectNameSpace as project, naviagteTo } from '../pages/app';
import { operatorsPage } from '../pages/operators_page';
import {switchPerspective, devNavigationMenu} from '../constants/global';
import { pipelineBuilderPage} from '../pages/pipelineBuilder_page';
import  {pipelineRunDetailsPage} from '../pages/pipelineRunDetails_page';

// Given('user logged into the openshift application', () => {
//     loginPage.loginWithValidCredentials(Cypress.env('username'), Cypress.env('password'));
//     loginPage.checkLoginSuccess();
// });

// { tags:"@smoke" },
// Before({ tags:"@smoke" },() => {
//   loginPage.loginWithValidCredentials(Cypress.env('username'), Cypress.env('password'));
//     loginPage.checkLoginSuccess();
// });
  
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

Given('user is at pipelines page', () => {
  naviagteTo(devNavigationMenu.Pipelines);
});

Then('user is at the Pipeline Builder page', () => {
  pipelineBuilderPage.verifyTitle();
});

Given('user is at pipeline Runs page', () => {
  pipelineRunDetailsPage.verifyTitle();
});

When('user selects {string} option from kebab menu', (option: string) => {
  cy.byTestActionID(option).click();
});
