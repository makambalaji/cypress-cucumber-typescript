import { detailsPage } from "./details-page";
import { monitoringTabs } from "../constants/monitoring";

export const monitoringPageObj = {
  dashboardTab: {
    workloads: "#odc-monitoring-dashboard-workload-filter",
  },
  metricsTab: {
    selectQuery: "",
    queryExpression: "",
    cpuGraph: "div.pf-c-chart.query-browser__graph-container",
    podsList: 'table[aria-label="query results table"]',
  },
  eventsTab: {
    resources: "",
    types: "",
  },
};

export const monitoringPage = {
  dashboard: {
    verifySelectedTab: () =>
      detailsPage.isTabSelected("horizontal-link-Dashboard"),
    selectWorkload: (workloadName: string = "All Workloads") => {
      cy.selectValueFromAutoCompleteDropDown(
        monitoringPageObj.dashboardTab.workloads,
        workloadName
      );
    },
  },
  metrics: {
    verifySelectedTab: () =>
      detailsPage.isTabSelected("horizontal-link-Metrics"),
    enterQuery: (query: string) => {
      cy.get(monitoringPageObj.metricsTab.queryExpression).type(query);
    },
    selectQuery: (queryValue: string) => {
      cy.selectValueFromAutoCompleteDropDown(
        monitoringPageObj.metricsTab.selectQuery,
        queryValue
      );
    },
    verifyGraph: () => {
      cy.get(monitoringPageObj.metricsTab.cpuGraph).should("be.visible");
    },
    verifyResetZoom: () => cy.byButtonText("Reset Zoom").should("be.visible"),
    clickResetZoom: () => cy.byButtonText("Reset Zoom").click(),
  },
  alerts: {
    verifySelectedTab: () => {
      detailsPage.isTabSelected("horizontal-link-Alerts");
    },
    search: (name: string) => {
      cy.byLegacyTestID("item-filter").type(name);
    },
    filter: (
      alertState: string[] = new Array("firing"),
      severity: string[] = new Array("Critical")
    ) => {
      cy.byLegacyTestID("filter-dropdown-toggle").click();
      cy.get(`[data-test-row-filter="${alertState}"]`).click();
      //  To Do
      cy.byLegacyTestID(`[data-test-row-filter="${severity}"]`).click();
    },
  },
  events: {
    verifySelectedTab: () => {
      detailsPage.isTabSelected("horizontal-link-Events");
    },
    selectResources: (resourceName: string) => {
      cy.selectValueFromAutoCompleteDropDown(
        monitoringPageObj.eventsTab.resources,
        resourceName
      );
    },
    selectType: () => {
      cy.byLegacyTestID("dropdown-button").click();
      cy.get("#all-link").click();
      // To Do
    },
  },
  clickTab: (tabName: monitoringTabs) => {
    switch (tabName) {
      case monitoringTabs.Dashboard:
        detailsPage.selectTab("horizontal-link-Dashboard");
        monitoringPage.dashboard.verifySelectedTab();
        break;
      case monitoringTabs.Metrics:
        detailsPage.selectTab("horizontal-link-Metrics");
        monitoringPage.metrics.verifySelectedTab();
        break;
      case monitoringTabs.Events:
        detailsPage.selectTab("horizontal-link-Events");
        monitoringPage.events.verifySelectedTab();
        break;
      case monitoringTabs.Alerts:
        detailsPage.selectTab("horizontal-link-Alerts");
        monitoringPage.alerts.verifySelectedTab();
        break;
      default:
        cy.log(`${tabName} is unable to click on monitoring page`);
        break;
    }
  },
};
