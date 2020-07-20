import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { seelctCardFromOptions, gitPage } from '../pages/add_page';
import { addOptions } from '../constants/add';
import { topologyPage } from '../pages/topology_page';

Given('user is on Import from Docker file page', () => {
  seelctCardFromOptions(addOptions.DockerFile);
});

When('user type docker git url as {string}', (gitUrl: string) => {
  gitPage.enterGitUrl(gitUrl);
});

When('select {string} radio button in Resoruce type section', (resourceType: string) => {
  gitPage.selectResource(resourceType)
});

When('click Create button on Add page', (a: string) => {
  gitPage.createWorkload();
});

Then('created workload {string} is present in topology page', (workloadName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(workloadName);
});
