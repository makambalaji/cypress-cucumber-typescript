import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { pipelinesPage, startPipelineInPipelinsPage, pipelinesObj } from '../../pages/pipelines/pipelines-page';
import { pipelineBuilderPage } from '../../pages/pipelines/pipelineBuilder-page';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu } from '../../constants/global';

const store: Record<string, string> = {};

Given('user has created pipeline {string} with git resources', (pipelineName: string) => {
  pipelinesPage.clickOncreatePipeline();
  pipelineBuilderPage.createPipelineWithGitresources(pipelineName);
  store.pipelineName = pipelineName;
});

When('user clicks on Show Credentials link present in Start Pipeline modal', () => {
  cy.alertTitleShouldContain('Start Pipeline');
  startPipelineInPipelinsPage.clickShowCredentialOptions();
});

When('user clicks on {string} link', (buttonName: string) => {
  cy.byButtonText(buttonName).click();
});

Then('user is able to see Create Source Secret section', () => {
  startPipelineInPipelinsPage.verifyCreateSourceSecretSection();
});

Then('user is able to see Secret Name, Access to, Server UrL fields and authernication type fields', () => {
  startPipelineInPipelinsPage.verifyFields();
  cy.get(pipelinesObj.startPipeline.cancel).click();
});

Given('user is at Start Pipeline modal', () => {
  naviagteTo(devNavigationMenu.Pipelines);
  pipelinesPage.selectKebabMenu(store.pipelineName);
  cy.byTestActionID('Start').click();
  cy.alertTitleShouldContain('Start Pipeline');
});

When('user enters URL, Revision as {string} and {string}', (gitUrl: string, revision: string) => {
  startPipelineInPipelinsPage.addGitResource(gitUrl,revision);
});

When('user enters Secret Name as {string}', (secretName: string) => {
  startPipelineInPipelinsPage.clickShowCredentialOptions();
  cy.byButtonText('Add Secret').click();
  cy.get(pipelinesObj.startPipeline.advancedOptions.secretName).type(secretName);
});

When('user selects the {string} option from accessTo drop down', (option: string) => {
  cy.selectByDropDownText(pipelinesObj.startPipeline.advancedOptions.accessTo, option);
});

When('user enters the server url as {string}', (serverUrl: string) => {
  cy.get(pipelinesObj.startPipeline.advancedOptions.serverUrl).type(serverUrl);
});

When('user selects the Authentication type as {string}', (authenticationType: string) => {
  cy.selectByDropDownText(pipelinesObj.startPipeline.advancedOptions.authenticationType, authenticationType);
});

When('user enters the Username, Password as {string}, {string}', (userName: string, password: string) => {
  cy.get(pipelinesObj.startPipeline.advancedOptions.userName).type(userName);
  cy.get(pipelinesObj.startPipeline.advancedOptions.password).type(password);
});

When('user clicks on tick mark', () => {
  cy.get(pipelinesObj.startPipeline.advancedOptions.tickIcon).click();
});

Then('{string} is added under secrets section', (secretName: string) => {
  cy.byLegacyTestID(secretName).should('be.visible');
  startPipelineInPipelinsPage.clicKCancel();
});

When('user enters the SSH KEY as {string}', (sshkey: string) => {
  cy.get(pipelinesObj.startPipeline.advancedOptions.sshPrivateKey).type(sshkey);
});

When('user enters the Username, Password, email as {string}, {string}, {string}', (userName: string, password: string, email: string) => {
  cy.get(pipelinesObj.startPipeline.advancedOptions.userName).type(userName);
  cy.get(pipelinesObj.startPipeline.advancedOptions.password).type(password);
  cy.get(pipelinesObj.startPipeline.advancedOptions.email).type(email);
});
