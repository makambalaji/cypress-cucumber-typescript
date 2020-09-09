import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { addOptions } from '../../constants/add';
import { topologyPage } from '../../pages/topology_page';

Given('user is on Import from Docker file page', () => {
  addPage.selectCardFromOptions(addOptions.DockerFile);
});

When('user enters docker git url as {string}', (gitUrl: string) => {
  addPage.enterGitUrl(gitUrl);
});

When('user selects {string} radio button in Resoruce type section', (resourceType: string) => {
  addPage.selectResource(resourceType)
});

When('user clicks Cancel button on Add page', () => {
  addPage.clickCancel();
});
