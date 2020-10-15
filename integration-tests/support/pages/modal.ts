import { eventSourceObj } from "./add-flow/eventSource-page";

export const modal = {
  clickCancel: () => {
    cy.byLegacyTestID("modal-cancel-action").click();
    cy.get("form").should("not.be.visible");
  },
  clicKSave: () => {
    cy.byTestID("confirm-action").click();
    cy.get("form").should("not.be.visible");
  },
  clicKDelete: () => {
    cy.byTestID("confirm-action").click();
    cy.get("form").should("not.be.visible");
  },
  verifySaveButtonIsDisplayed: () => {
    cy.byTestID("confirm-action").should("be.visible");
  },
  verifySaveButtonIsDisabled: () => {
    cy.byTestID("confirm-action").should("be.disabled");
  },
  verifyCancelButtonIsDisplayed: () => {
    cy.byLegacyTestID("modal-cancel-action").should("be.visible");
  },
  isDisplayed: () => {
    cy.get("form").should("be.visible");
  },
};

export const editLabels = {
  enterLabel: (labelName: string) =>
    cy.byTestID("tags-input").type(labelName).type("{enter}"),
  numberOfLabels: () => {
    return cy.get("tags-input span.tag-item__content");
  },
  removeLabel: (labelName: string) => {
    cy.get("span.tag-item__content")
      .contains(labelName)
      .next("a.remove-button")
      .click();
  },
};

export const editAnnotations = {
  add: () => cy.byLegacyTestID("pairs-list__add-btn").click(),
  enterKey: (key: string) => {
    cy.get('input[placeholder="key"]').last().type(key);
  },
  enterValue: (value: string) =>
    cy.get('input[placeholder="value"]').last().type(value),
  removeAnnotation: (annotationKey: string) => {
    cy.get(`input[value="${annotationKey}"]`)
      .parent()
      .next("div.pairs-list__action")
      .find('[data-test-id="pairs-list__delete-btn"]')
      .click();
  },
};

export const setTrafficDistribution = {
  add: () => cy.get('form [type="button"]').contains("Add").click(),
  enterSplit: (split: string) =>
    cy.get("#form-input-trafficSplitting-0-percent-field").type(split),
  selectRevision: (revisionName: string) => {
    cy.get("#form-dropdown-trafficSplitting-0-revisionName-field").click();
    cy.get(`[data-test-dropdown-menu^="${revisionName}"]`).click();
  },
};

export const editApplicationrouping = {
  selectApplication: (appName: string) => {
    cy.get("#form-dropdown-application-name-field").click();
    cy.get(`[id="${appName}-link"]`).click();
  },
  createApplication: (appName: string) => {
    cy.get("#form-dropdown-application-name-field").click();
    cy.byLegacyTestID("application-form-app-input").clear().type(appName);
  },
};

export const deleteApplication = {
  enterApplication: (appName: string) =>
    cy.get("#form-input-resourceName-field").clear().type(appName),
  clicKDelete: () => {
    cy.byTestID("confirm-action").should("be.enabled").click();
    cy.get("form").should("not.be.visible");
  },
  deleteApp: () => {
    cy.get("p strong").then((ele) => {
      deleteApplication.enterApplication(ele.text());
      modal.clicKDelete();
    });
  },
};

export const deleteRevision = {
  verifyMessage: (message: string) =>
    cy.get("form p").should("contain.text", message),
  clickOK: () => cy.byLegacyTestID("modal-cancel-action").click(),
};

export const moveSink = {
  selectResource: (resourceName: string) => {
    cy.get(eventSourceObj.sinkBinding.resource).should("be.checked");
    cy.get(eventSourceObj.sinkBinding.sinkResource).click();
    cy.get(`[id*="${resourceName}-link"]`).click();
  },
  enterURI: (uri: string) => {
    cy.get(eventSourceObj.sinkBinding.uri).should("be.checked");
    cy.byLegacyTestID("sink-section-uri").clear().type(uri);
  },
  verifyResourceDropDown: () =>
    cy.get(eventSourceObj.sinkBinding.sinkResource).should("be.visible"),
};
