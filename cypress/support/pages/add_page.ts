import { addOptions, resourceTypes, gitAdvancedOptions } from '../constants/add';

export const seelctCardFromOptions = (card: addOptions) => {
  switch (card) {
    case addOptions.Git:
      cy.byLegacyTestID('import-from-git').click();
      cy.byLegacyTestID('resource-title').should('have.text', 'Import from git');
      break;
    case addOptions.ContainerImage:
      cy.byLegacyTestID('deploy-image').click();
      cy.byLegacyTestID('resource-title').should('have.text', 'Deploy Image');
      break;
    case addOptions.DockerFile:
      cy.byLegacyTestID('import-from-dockerfile').click();
      cy.byLegacyTestID('resource-title').should('have.text', 'Import from Dockerfile');
      break;
    case addOptions.Catalog:
      cy.byLegacyTestID('dev-catalog').click();
      cy.byLegacyTestID('resource-title').should('have.text', 'Developer Catalog');
      break;
    case addOptions.Database:
      cy.byLegacyTestID('dev-catalog-databases').click();
      cy.byLegacyTestID('resource-title').should('have.text', 'Developer Catalog');
      cy.get('div..co-catalog-page__heading.text-capitalize').should('contain.text', 'Databases');
      break;
    case addOptions.EventSource:
      cy.byLegacyTestID('knative-event-source').click();
      cy.byLegacyTestID('resource-title').should('have.text', 'Event Sources');
      break;
    case addOptions.HelmChart:
      cy.byLegacyTestID('helm').click();
      cy.byLegacyTestID('resource-title').should('have.text', 'Developer Catalog');
      cy.byTestID('kind-helm-chart').should('be.checked');
      break;
    case addOptions.OperatorBacked:
      cy.byLegacyTestID('operator-backed').click();
      cy.byLegacyTestID('resource-title').should('have.text', 'Developer Catalog');
      cy.byTestID('kind-cluster-service-version').should('be.checked');
      break;
    case addOptions.Pipeline:
      cy.byLegacyTestID('pipeline').click();
      cy.get('h1.odc-pipeline-builder-header__title').should('have.text', 'Pipeline Builder');
      break;
    case addOptions.YAML:
      cy.byLegacyTestID('import-yaml').click();
      cy.byLegacyTestID('resource-title').should('have.text', 'Import YAML');
      break;
    default:
      throw new Error('Option is not available');
      break;
  }
};

export const gitPage = {
  verifyTitle: (title: string) => {
    cy.byLegacyTestID('resource-title').should('have.text', title);
  },

  verifyPipelinesSection: (message: string) => {
    cy.get('.odc-form-section__heading')
      .eq(5)
      .should('have.text', 'Pipelines');
    cy.get('div.pf-c-form.co-m-pane__form div[aria-label="Info Alert"]').should(
      'have.text',
      message,
    );
  },

  enterGitUrl: (gitUrl: string) => {
    cy.byLegacyTestID("git-form-input-url").type(gitUrl);
  },

  verifyPipelineCheckBox: () => {
    cy.get('#form-checkbox-pipeline-enabled-field').should('be.visible');
  },

  enterAppName: (name: string) => {
    // cy.get('[id$=application-name-field]').then(($el) => {
    //   if($el.prop("tagName").includes('button')) {
    //     cy.get('[id$=application-name-field]').click();
    //     cy.get('ul.pf-c-dropdown__menu li button').each(($el, index, list) => {
    //       if($el.text().includes(name)) {
    //         $el.click();
    //       }
    //     })
    //   } else {
        cy.byLegacyTestID('application-form-app-name').as('appName');
        cy.get('@appName').clear();
        cy.get('@appName').type(name).should('have.value', name);
    //   }
    // })
  },

  selectResource: (resource: string) => {
    switch (resource) {
      case resourceTypes.Deployment:
        cy.get('#form-radiobutton-resources-kubernetes-field').check();
        break;
      case resourceTypes.DeploymentConfig:
        cy.get('#form-radiobutton-resources-openshift-field').check();
        break;
      case resourceTypes.KnativeService:
        cy.get('#form-radiobutton-resources-knative-field').check();
        break;
      default:
        throw new Error('Option is not available');
        break;
    }
  },

  selectAdvancedOptions: (opt: gitAdvancedOptions) => {
    switch (opt) {
      case gitAdvancedOptions.Routing:
        cy.byButtonText('Routing').click();
        break;
      case gitAdvancedOptions.BuildConfig:
        cy.byButtonText('Build Configuration').click();
        break;
      case gitAdvancedOptions.Deployment:
        cy.byButtonText('Deployment').click();
        break;
      case gitAdvancedOptions.Scaling:
        cy.byButtonText('Scaling').click();
        break;
      case gitAdvancedOptions.ResourceLimits:
        cy.byButtonText('Resource Limits').click();
        break;
      case gitAdvancedOptions.Labels:
        cy.byButtonText('Labels').click();
        break;
      case gitAdvancedOptions.HealthChecks:
        cy.byButtonText('Health Checks').click();
        break;
      default:
        throw new Error('Option is not available');
        break;
    }
  },

  selectAddPipeline: () => {
    cy.get('#form-checkbox-pipeline-enabled-field').check();
  },

  createWorkload: () => {
    cy.byLegacyTestID('submit-button').click();
  }
};

