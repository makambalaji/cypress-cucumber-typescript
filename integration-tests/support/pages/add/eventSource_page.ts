import { addPage } from "../add/add_page";
import { addOptions } from "../../constants/add";

export const eventSourceObj = {
    search: '[placeholder="Filter by type..."]',
    apiServerSource: {
      apiVersion: 'input[placeholder="apiversion"]',
      kind: 'input[placeholder="kind"]',
      serviceAccountName: '#form-ns-dropdown-data-apiserversource-serviceAccountName-field',
      sinkResource: '#form-ns-dropdown-sink-name-field',
      name: '[data-test-id="application-form-app-name"]',
      mode: '#form-dropdown-data-apiserversource-mode-field',
    },
    sinkBinding: {
      apiVersion: '[data-test-id="sinkbinding-apiversion-field"]',
      kind: '[data-test-id="sinkbinding-kind-field"]',
      sinkResource: '#form-ns-dropdown-sink-name-field',
      name: '[data-test-id="application-form-app-name"]',
    },
  }


export const eventSourcesPage = {
    verifyTitle: (title: string = 'Event Sources') => cy.titleShouldBe(title),
    search: (type: string) => cy.get(eventSourceObj.search).type(type),
    verifyEventSourceType: (eventSourceName: string) => {
      cy.get(`button[aria-label="${eventSourceName}"]`).should('be.visible');
    },
    selectEventSourceType: (eventSourceName: string) => {
      cy.get('.co-m-loader').should('not.be.visible');
      cy.get(`button[aria-label="${eventSourceName}"]`).click();
    },
    clickCreate:() => cy.byLegacyTestID('submit-button').click(),
    clickCancel:() => cy.byLegacyTestID('reset-button').click(),
    selectServiceType:(serviceAccountName: string = 'default') => {
      cy.get(eventSourceObj.apiServerSource.serviceAccountName).click();
      cy.get('li').contains(serviceAccountName).click();
    },
    selectKnativeService:(knativeService: string) => {
      cy.get(eventSourceObj.apiServerSource.sinkResource).click();
      cy.get(`[id^=${knativeService}-link]`).click();
    },
    selectMode:(mode: string) => {
      cy.get(eventSourceObj.apiServerSource.mode).click();
      cy.get(`[data-test-dropdown-menu="${mode}"]`).click();
    },
    enterEventSourceName:(eventSourceName: string) => cy.get(eventSourceObj.sinkBinding.name).clear().type(eventSourceName),
    createSinkBinding:(apiVersion: string, kind: string) => {
      addPage.selectCardFromOptions(addOptions.EventSource);
      eventSourcesPage.selectEventSourceType("Sink Binding");
      cy.get(eventSourceObj.sinkBinding.apiVersion).type(apiVersion);
      cy.get(eventSourceObj.sinkBinding.kind).type(kind);
    },
    createEventSource:(eventSourceName: string, apiVersion:string = 'batch/v1', kind:string = 'Job') => {
      addPage.selectCardFromOptions(addOptions.EventSource);
      eventSourcesPage.selectEventSourceType(eventSourceName);
      cy.get(eventSourceObj.sinkBinding.apiVersion).type(apiVersion);
      cy.get(eventSourceObj.sinkBinding.kind).type(kind);
      eventSourcesPage.clickCreate();
    }
  }