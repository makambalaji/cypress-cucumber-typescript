import { addPage } from "../add/add_page";
import { addOptions } from "../../constants/add";
import { topologyPage } from "../topology_page";

export const catalogPageObj = {
    search: 'input[placeholder="Filter by keyword..."]',
    create: 'button[type="submit"]',
    card: 'a.pf-c-card',
    sidePane: {
      dialog: '[role="dialog"]',
      instantiateTemplate: 'a[title="Instantiate Template"]',
      create: 'a[title="Create"]',
      installHelmChart:'a[title="Install Helm Chart"]',
      createHelmChart: 'a[title="Install Helm Chart"]',
    },
    mariaDBTemplate: {
      namespace: '#namespace',
      title: 'h1.co-m-pane__heading',
      memoryLimit: '#MEMORY_LIMIT',
      imageSrreamNameSpace: '#NAMESPACE',
      databaseServiceName: '#DATABASE_SERVICE_NAME',
      mariaDBConnectionUserName: '#MYSQL_USER',
      cancel: '#cancel',
    },
    createKnativeServing: {
      logo: 'h1.co-clusterserviceversion-logo__name__clusterserviceversion',
      name: '#root_metadata_name',
      labels: 'input[placeholder="app=frontend"]',
    },
    installHelmChart: {
      logo: 'h1.co-clusterserviceversion-logo__name__clusterserviceversion',
      install: '[data-test-id="submit-button"]',
      releaseName: '#form-input-releaseName-field',
      yamlView: '#form-radiobutton-editorType-yaml-field',
      formView: '#form-radiobutton-editorType-form-field',
      cancel: '[data-test-id="reset-button"]',
    }
  }


  export const catalogPage = {
    verifyTitle:() => cy.titleShouldBe('Developer Catalog'),
    isCheckBoxSelected: (type: string) => cy.get(`input[title="${type}"]`).should('be.checked'),
    isCardsDisplayed:() => cy.get(catalogPageObj.card).should('be.visible'),
    search: (keyword: string) => cy.get(catalogPageObj.search).type(keyword),
    verifyDialog:() => cy.get(catalogPageObj.sidePane.dialog, {timeout: 5000}).should('be.visible'),
    verifyInstallHelmChartPage:() => cy.get('form h1').eq(0).should('have.text', 'Install Helm Chart'),
    clickInstantiateButtonOnSidePane:() => {
      catalogPage.verifyDialog();
      cy.get(catalogPageObj.sidePane.instantiateTemplate).click();
    },
    clickCreateButtonOnSidePane:() => {
      catalogPage.verifyDialog();
      cy.get(catalogPageObj.sidePane.create).click();
    },
    clickInstallHelmChartOnSidePane:() => {
      catalogPage.verifyDialog();
      cy.get(catalogPageObj.sidePane.installHelmChart).click();
    },
    clickOnCreateButton:() => cy.get(catalogPageObj.create).click(),
    clickOnCancelButton:() => cy.get(catalogPageObj.mariaDBTemplate.cancel).click(),
    selectOperatorBackedCheckBox:() => cy.byTestID('kind-cluster-service-version').check(),
    selectKnativeServingCard:() => cy.get('div.catalog-tile-pf-title').contains('Knative Serving').click(),
    selectHelmChartCard:(cardName: string) => cy.get('a div.catalog-tile-pf-title').contains(cardName).click(),
    clickOnInstallButton:() => {
      cy.get(catalogPageObj.installHelmChart.install).click().then(() => {
        cy.get('div.co-m-loader', {timeout:20000}).should('not.be.visible')
      });
    },
    createHelmChartFromAddPage:(workloadName: string = 'nodejs-example', helmChartName: string = 'Nodejs Ex K v0.2.0') => {
      addPage.verifyCard('Helm Chart');
      addPage.selectCardFromOptions(addOptions.HelmChart);
      catalogPage.verifyTitle();
      catalogPage.isCardsDisplayed();
      catalogPage.search(helmChartName);
      catalogPage.selectHelmChartCard(helmChartName);
      catalogPage.verifyDialog();
      cy.get(catalogPageObj.sidePane.createHelmChart).click();
      catalogPage.verifyInstallHelmChartPage();
      catalogPage.clickOnInstallButton();
      topologyPage.verifyWorkloadInTopologyPage(workloadName);
    }
  }