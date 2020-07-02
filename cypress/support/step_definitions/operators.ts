import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { operatorsPage } from '../pages/operators_page';
import {loginPage} from '../pages/login_page';
import { perspective } from '../pages/app';
import  { switchPerspective, operators } from '../constants/global'

Given('user logged into the openshift application', () => {
  loginPage.loginWithValidCredentials('kubeadmin', 'gTpFF-5xtpQ-DVnFR-KtDZz');
  loginPage.checkLoginSuccess();
});

Given('user is at admin perspecitve', () => {
  perspective.verifyPerspective(switchPerspective.Administrator);
});

Given('user is at Operator Hub page with the header name {string}', (headerName) => {
  operatorsPage.navigateToOperaotorHubPage();
  operatorsPage.titleShouldBe(headerName);
});

When('user searches for {string}', (operatorName) => {
  operatorsPage.searchOperator(operatorName);
});

When('clicks OpenShift Pipelines Operator card on Operator Hub page', () => {
  operatorsPage.selectOperator(operators.pipelineOperator);
});

When('click install button present on the right side pane', () => {
  operatorsPage.verifySiedPane();
  operatorsPage.clickInstallOnSidePane();
});

Then('OpenShift Pipeline operator subscription page will be displayed', () => {
  operatorsPage.verifyPipelineOperatorSubscriptionPage();
});

Given('user is at OpenShift Pipeline Operator subscription page', () => {
  operatorsPage.navigateToOperaotorHubPage();
  operatorsPage.titleShouldBe('OperatorHub');
  operatorsPage.searchOperator('OpenShift Pipelines Operator');
  operatorsPage.selectOperator(operators.pipelineOperator);
  operatorsPage.verifySiedPane();
  operatorsPage.clickInstallOnSidePane();
  operatorsPage.verifyPipelineOperatorSubscriptionPage();
});

When('user installs the pipeline operator with default values', () => {
  operatorsPage.installPipelineOperator();
});

Then('page redirects to Installed operators', () => {
  operatorsPage.titleShouldBe('Installed Operators');
});

Then('Installed operators page will contain {string}', (operatorName) => {
  operatorsPage.verifyInstalledOperator(operatorName);
});
