import { addPage } from "./add-page";
import { addOptions } from "../../constants/add";
import { app } from "../app";

export const eventSourceObj = {
  search: '[placeholder="Filter by type..."]',
  apiServerSource: {
    apiVersion: 'input[placeholder="apiversion"]',
    kind: 'input[placeholder="kind"]',
    serviceAccountName:
      "#form-ns-dropdown-data-apiserversource-serviceAccountName-field",
    sinkResource: "#form-ns-dropdown-sink-key-field",
    name: '[data-test-id="application-form-app-name"]',
    mode: "#form-dropdown-data-apiserversource-mode-field",
  },
  sinkBinding: {
    apiVersion: '[data-test-id="sinkbinding-apiversion-field"]',
    kind: '[data-test-id="sinkbinding-kind-field"]',
    sinkResource: "[id*=sink-key-field]",
    name: '[data-test-id="application-form-app-name"]',
    resource: "#form-radiobutton-sinkType-resource-field",
    uri: "#form-radiobutton-sinkType-uri-field",
    notifierHeader: 'div[aria-label="Default Alert"] h4',
    notifierMessage:
      'div[aria-label="Default Alert"] div.pf-c-alert__description',
  },
  pingSource: {
    data: "#form-input-data-pingsource-jsonData-field",
    schedule: "#form-input-data-pingsource-schedule-field",
    name: '[data-test-id="application-form-app-name"]',
  },
  containerImage: {
    image: '[data-test-id="container-image-field"]',
  },
};

export const eventSourcesPage = {
  verifyTitle: (title: string = "Event Sources") =>
    cy.pageTitleShouldContain(title),
  search: (type: string) => cy.get(eventSourceObj.search).type(type),
  verifyEventSourceType: (eventSourceName: string) => {
    cy.get(`button[aria-label="${eventSourceName}"]`).should("be.visible");
  },
  clickEventSourceType: (eventSourceName: string) => {
    app.waitForLoad();
    cy.get(`button[aria-label="${eventSourceName}"]`).click();
  },
  clickCreate: () => cy.byLegacyTestID("submit-button").click(),
  clickCancel: () => cy.byLegacyTestID("reset-button").click(),
  selectServiceType: (serviceAccountName: string = "default") => {
    cy.get(eventSourceObj.apiServerSource.serviceAccountName).click();
    cy.get("li").contains(serviceAccountName).click();
  },
  selectknativeService: (knativeService: string) => {
    cy.get(eventSourceObj.apiServerSource.sinkResource).click();
    cy.get(`[id*=${knativeService}-link]`).click();
  },
  selectMode: (mode: string) => {
    cy.get(eventSourceObj.apiServerSource.mode).click();
    cy.get(`[data-test-dropdown-menu="${mode}"]`).click();
  },
  enterEventSourceName: (eventSourceName: string) =>
    cy.get(eventSourceObj.sinkBinding.name).clear().type(eventSourceName),
  createSinkBinding: (
    eventSourceName: string,
    apiVersion: string = "batch/v1",
    kind: string = "Job"
  ) => {
    addPage.selectCardFromOptions(addOptions.EventSource);
    eventSourcesPage.clickEventSourceType("Sink Binding");
    cy.get(eventSourceObj.sinkBinding.apiVersion).type(apiVersion);
    cy.get(eventSourceObj.sinkBinding.kind).type(kind);
    cy.get(eventSourceObj.sinkBinding.resource).click();
    eventSourcesPage.selectknativeService("nodejs-ex-git");
    cy.get(eventSourceObj.sinkBinding.name).clear().type(eventSourceName);
    eventSourcesPage.clickCreate();
  },
  createEventSource: (
    eventSourceName: string,
    apiVersion: string = "batch/v1",
    kind: string = "Job"
  ) => {
    addPage.selectCardFromOptions(addOptions.EventSource);
    eventSourcesPage.clickEventSourceType(eventSourceName);
    cy.get(eventSourceObj.sinkBinding.apiVersion).type(apiVersion);
    cy.get(eventSourceObj.sinkBinding.kind).type(kind);
    eventSourcesPage.clickCreate();
  },
};
