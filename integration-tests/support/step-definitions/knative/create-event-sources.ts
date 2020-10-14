import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { addPage } from "../../pages/add-flow/add-page";
import {
  eventSourcesPage,
  eventSourceObj,
} from "../../pages/add-flow/eventSource-page";
import { naviagteTo, app } from "../../pages/app";
import { devNavigationMenu } from "../../constants/global";
import { addOptions } from "../../constants/add";
import { topologySidePane, topologyPage } from "../../pages/topology-page";

Given("user is at Event Sources page", () => {
  naviagteTo(devNavigationMenu.Add);
  addPage.selectCardFromOptions(addOptions.EventSource);
  eventSourcesPage.verifyTitle();
});

When("user clicks on {string} card", (cardName: string) => {
  addPage.selectCardFromOptions(cardName);
});

When("user selects event source type {string}", (eventSourceType: string) => {
  eventSourcesPage.clickEventSourceType(eventSourceType);
});

Given("knative service is not available for selected namespace", () => {});

When("user enters Resoruce APIVERSION as {string}", (apiVersion: string) => {
  cy.get(eventSourceObj.apiServerSource.apiVersion)
    .should("be.visible")
    .type(apiVersion);
});

When("user enters Resource KIND as {string}", (version: string) => {
  cy.get(eventSourceObj.apiServerSource.kind)
    .should("be.visible")
    .type(version);
});

When(
  "user selects {string} option from Service Account Name field",
  (serviceAccountName: string) => {
    eventSourcesPage.selectServiceType(serviceAccountName);
  }
);

When("user selects {string} option from Mode field", (mode: string) => {
  eventSourcesPage.selectMode(mode);
});

When(
  "user selects an {string} option from knative service field",
  (knativeService: string) => {
    eventSourcesPage.selectknativeService(knativeService);
  }
);

When("user clicks on Create button", () => {
  eventSourcesPage.clickCreate();
});

When("user enters event source name as {string}", (eventSourceName: string) => {
  eventSourcesPage.enterEventSourceName(eventSourceName);
});

When(
  "user enters Container Image as {string}",
  (containerImageName: string) => {
    cy.get(eventSourceObj.containerImage.image).type(containerImageName);
  }
);

When("user enters schedule as {string}", (schedule: string) => {
  cy.get(eventSourceObj.pingSource.schedule).type(schedule);
});

When(
  "user enters Subject apiVersion as {string}",
  (subjectApiVersion: string) => {
    cy.get(eventSourceObj.sinkBinding.apiVersion).type(subjectApiVersion);
  }
);

When("user enters Subject Kind as {string}", (subjectKind: string) => {
  cy.get(eventSourceObj.sinkBinding.kind).type(subjectKind);
});

Then(
  "user will be redirected to page with header name {string}",
  (pageTitle: string) => {
    eventSourcesPage.verifyTitle(pageTitle);
  }
);

Then(
  "able to see event source enters like ApiServerSource, ContainerSource, CronJobSource, PingSource, SinkBinding",
  () => {
    app.waitForLoad();
    eventSourcesPage.verifyEventSourceType("Api Server Source");
    eventSourcesPage.verifyEventSourceType("Container Source");
    eventSourcesPage.verifyEventSourceType("Ping Source");
    eventSourcesPage.verifyEventSourceType("Sink Binding");
  }
);

Then(
  "user is able to see {string} event source type",
  (eventSoruceType: string) => {
    eventSourcesPage.verifyEventSourceType(eventSoruceType);
  }
);

Then("user is able to see knative Eventing card", () => {
  addPage.verifyCard("knative Eventing");
});

Then("user is able to see notifier header {string}", (message: string) => {
  cy.get(eventSourceObj.sinkBinding.notifierHeader).should(
    "contain.text",
    message
  );
});

When("user selects Resource option in Sink section", () => {
  cy.get(eventSourceObj.sinkBinding.resource).check();
});

Then("user can see message as {string}", (message: string) => {
  addPage.verifyNoWorkLoadsText(message);
});

Then("user can see message in sink section as {string}", (message: string) => {
  cy.get(eventSourceObj.sinkBinding.notifierMessage);
});

Then(
  "page contains Resource, Mode, Service Account Name, Sink, General sections",
  () => {
    // TODO: implement step
  }
);

Then("Resoruce contains App Version, Kind fields", () => {
  // TODO: implement step
});

Then(
  "sink has knative service dropdown with default text {string}",
  (text: string) => {
    cy.log(text);
  }
);

Then(
  "Application Name, Name fields have default text as {string}, {string}",
  (appName: string, name: string) => {
    cy.log(appName, name);
  }
);

Then("Create button is disabled", () => {
  // TODO: implement step
});

Then(
  "page contains Container, Environmental variables, Sink, General sections",
  () => {
    // TODO: implement step
  }
);

Then(
  "container has Image, Name, Arguments text fields and Add args link",
  () => {
    // TODO: implement step
  }
);

Then("environment variables has Name, Value fields and Add More link", () => {
  // TODO: implement step
});

Then(
  "Application Name, Name fields will have default text as {string}, {string}",
  (appName: string, name: string) => {
    cy.log(appName, name);
  }
);

Then("page contains CronJobSource, Sink, General sections", () => {
  // TODO: implement step
});

Then("CronJobSource has Data, Scedule fields", () => {
  // TODO: implement step
});

Then("page contains PingSource, Sink, General sections", () => {
  // TODO: implement step
});

Then("PingSource has Data, Scedule fields", () => {
  // TODO: implement step
});

Then("page contains Subject, Sink, General sections", () => {
  // TODO: implement step
});

Then(
  "Subject has apiVersion, Kind, Match Labels with Name, Value fields and Add Values link",
  () => {
    // TODO: implement step
  }
);

Then("page contains CamelSource section", () => {
  // TODO: implement step
});

Then("Create button is enabled", () => {
  // TODO: implement step
});

Then(
  "ApiServerSource event source {string} is created and linked to selected knative service {string}",
  (eventSource: string, resourceName: string) => {
    topologyPage.getEventSource(eventSource).click({ force: true });
    topologySidePane.verifyResource(resourceName);
  }
);

Then(
  "ContainerSource event source {string} is created and linked to selected knative service {string}",
  (eventSource: string, resourceName: string) => {
    topologyPage.getEventSource(eventSource).click({ force: true });
    topologySidePane.verifyResource(resourceName);
  }
);

Then(
  "CronJobSource event source {string} is created and linked to selected knative service {string}",
  (eventSource: string, resourceName: string) => {
    topologyPage.getEventSource(eventSource).click({ force: true });
    topologySidePane.verifyResource(resourceName);
  }
);

Then(
  "PingSource event source {string} is created and linked to selected knative service {string}",
  (eventSource: string, resourceName: string) => {
    topologyPage.getEventSource(eventSource).click({ force: true });
    topologySidePane.verifyResource(resourceName);
  }
);

Then(
  "SinkBinding event source {string} is created and linked to selected knative service {string}",
  (eventSource: string, resourceName: string) => {
    topologyPage.getEventSource(eventSource).click({ force: true });
    topologySidePane.verifyResource(resourceName);
  }
);

Then(
  "CamelSource event source {string} is created and linked to selected knative service {string}",
  (eventSource: string, resourceName: string) => {
    topologyPage.getEventSource(eventSource).click({ force: true });
    topologySidePane.verifyResource(resourceName);
  }
);
