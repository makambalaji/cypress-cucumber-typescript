import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { topologySidePane, topologyPage } from '../../pages/topology_page';
import { addPage } from '../../pages/add/add_page';
import { resourceTypes } from '../../constants/add';
import { eventSourcesPage } from '../../pages/add/eventSource_page';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu } from '../../constants/global';

When('user clicks on event source {string}', (eventSourceName: string) => {
  topologyPage.search(eventSourceName);
  cy.get('[data-type="event-source"]').eq(0).click();
});

Given('knative service {string} is available in topology page', (serviceName: string) => {
  cy.get('.co-m-loader').should('not.be.visible');
  cy.get('body').then(($el) => {
    cy.wait(3000);
    if($el.find('.pf-c-card__title').length !== 0) {
      addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',serviceName, resourceTypes.KnativeService);
    }
    else if($el.find('[data-test-id="item-filter"]').length !== 0) {
      topologyPage.search(serviceName).then(() => {
        cy.get('body').then(($el) => {
          if($el.find('.is-filtered').length === 0) {
            addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',serviceName, resourceTypes.KnativeService);
          }
        });
      }) ;
    }
  });
});

Given('event source {string} is available on topology page', (eventSourceName: string) => {
  cy.get('.co-m-loader').should('not.be.visible');
  // cy.get('body').then(($el) => {
  //   if($el.find('[data-test-id="item-filter"]').length !== 0) {
      topologyPage.search(eventSourceName).then(() => {
        cy.get('body').then(($el) => {
          if($el.find('.is-filtered').length === 0) {
            naviagteTo(devNavigationMenu.Add);
            eventSourcesPage.createEventSource(eventSourceName);
          }
        });
    //   });
    // }
  });
});

When('select the {string} from Action menu present in right side bar', (action: string) => {
  topologySidePane.selectNodeAction(action);
});

Then('side bar dsiplays with header name as {string}', (headerName: string) => {
  topologySidePane.verifyTitle(headerName);
});
