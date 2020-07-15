import { addOptions, resourceTypes, gitAdvancedOptions } from '../constants/add';

export const gitPageObj = {
  sectionTitle: '.odc-form-section__heading',
  gitRepoUrl: '#form-input-git-url-field',
  nodeName: '#form-input-name-field',
  appName: '#form-input-application-name-field',
  create: '[data-test-id="submit-button"]',
  cancel: '[data-test-id="reset-button"]',
  pipeline: {
    infoMessage: '[aria-label="Info Alert"]',
    addPipeline: '#form-checkbox-pipeline-enabled-field',
  },
  resources: {
    deployment: '#form-radiobutton-resources-kubernetes-field',
    deploymentConfig: '#form-radiobutton-resources-openshift-field',
    knative: '#form-radiobutton-resources-knative-field'
  },
  advancedOptions: {
    createRoute: '#form-checkbox-route-create-field',
    routing: {
      hostname: '#form-input-route-hostname-field',
      path: '#form-input-route-path-field',
      targetPort: 'button#form-dropdown-route-targetPort-field',
      secureRoute: 'input#form-checkbox-route-secure-field',
      tlsTermination: 'button#form-dropdown-route-tls-termination-field',
      insecureTraffic: 'button#form-dropdown-route-tls-insecureEdgeTerminationPolicy-field',
    },
    buildConfig: {
      webHookBuildTrigger: 'input#form-checkbox-build-triggers-webhook-field',
      buildTriggerImage: 'input#form-checkbox-build-triggers-image-field',
      buildTriggerConfigField: 'input#form-checkbox-build-triggers-config-field',
      // Add Environment Value
      envName: 'input[placeholder="name"]',
      envValue: 'input[placeholder="value"]',
      // Count for Rows in Environment Variables section
      envRows: 'div.row.pairs-list__row',
      deleteRowButton: 'button[data-test-id="pairs-list__delete-btn"]',
    },
    deployment: {
      deploymentTriggerImage: 'input#form-checkbox-deployment-triggers-image-field',
      deploymentImageConfig: 'input#form-checkbox-deployment-triggers-config-field',
      envName: 'input[placeholder="name"]',
      envValue: 'input[placeholder="value"]',
      // Count for Rows in Environment Variables section
      envRows: 'div.row.pairs-list__row',
      deleteRowButton: 'button[data-test-id="pairs-list__delete-btn"]',
    },
    scaling: {
      decrement: 'button[aria-label="Decrement"]',
      increment: 'button[aria-label="Increment"]',
      replicaCount: 'input#form-number-spinner-deployment-replicas-field',
    },
    resourceLimit:{
      cpuRequest: 'input[name="limits.cpu.requestValue"]',
      cpuLimit: 'input[name="limits.cpu.limitValue"]',
      memoryRequest: 'input[name="limits.memory.requestValue"]',
      memoryLimit: 'input[name="limits.memory.limitValue"]',
      cpuRequestHelperText: 'div#form-resource-limit-limits-cpu-request-field-helper',
      cpuLimiHelperText: 'div#form-resource-limit-limits-cpu-limit-field-helper',
      memoryRequestHelperText: 'div#form-resource-limit-limits-memory-request-field-helper',
      memoryLimitHelperText: 'div#form-resource-limit-limits-memory-limit-field-helper',
    },
    labels: 'input#tags-input',
  },
}

export const seelctCardFromOptions = (card: addOptions) => {
  switch (card) {
    case addOptions.Git:
      cy.byLegacyTestID('import-from-git').click();
      cy.titleShouldBe('Import from git');
      break;
    case addOptions.ContainerImage:
      cy.byLegacyTestID('deploy-image').click();
      cy.titleShouldBe('Deploy Image');
      break;
    case addOptions.DockerFile:
      cy.byLegacyTestID('import-from-dockerfile').click();
      cy.titleShouldBe('Import from Dockerfile');
      break;
    case addOptions.Catalog:
      cy.byLegacyTestID('dev-catalog').click();
      cy.titleShouldBe('Developer Catalog');
      break;
    case addOptions.Database:
      cy.byLegacyTestID('dev-catalog-databases').click();
      cy.titleShouldBe('Developer Catalog');
      cy.get('div..co-catalog-page__heading.text-capitalize').should('contain.text', 'Databases');
      break;
    case addOptions.EventSource:
      cy.byLegacyTestID('knative-event-source').click();
      cy.titleShouldBe('Event Sources');
      break;
    case addOptions.HelmChart:
      cy.byLegacyTestID('helm').click();
      cy.titleShouldBe('Developer Catalog');
      cy.byTestID('kind-helm-chart').should('be.checked');
      break;
    case addOptions.OperatorBacked:
      cy.byLegacyTestID('operator-backed').click();
      cy.titleShouldBe('Developer Catalog');
      cy.byTestID('kind-cluster-service-version').should('be.checked');
      break;
    case addOptions.Pipeline:
      cy.byLegacyTestID('pipeline').click();
      cy.get('h1.odc-pipeline-builder-header__title').should('have.text', 'Pipeline Builder');
      break;
    case addOptions.YAML:
      cy.byLegacyTestID('import-yaml').click();
      cy.titleShouldBe('Import YAML');
      break;
    default:
      throw new Error('Option is not available');
      break;
  }
};

export const gitPage = {
  verifyTitle: (title: string) => cy.titleShouldBe(title),

  verifyPipelinesSection: (message: string) => {
    cy.get(gitPageObj.sectionTitle).eq(5).should('have.text', 'Pipelines');
    cy.get(gitPageObj.pipeline.infoMessage).should('have.text', message);
  },

  enterGitUrl: (gitUrl: string) => cy.get(gitPageObj.gitRepoUrl).type(gitUrl),

  verifyPipelineCheckBox: () => cy.get(gitPageObj.pipeline.addPipeline).should('be.visible'),

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
        cy.get(gitPageObj.nodeName).as('nodeName');
        // cy.pause();
        cy.wait(2000);
        cy.get('@nodeName').clear();
        cy.get('@nodeName').type(name);
        cy.get('@nodeName').should('have.value', name);
    //   }
    // })
  },

  selectResource: (resource: string) => {
    switch (resource) {
      case resourceTypes.Deployment:
        cy.get(gitPageObj.resources.deployment).check();
        break;
      case resourceTypes.DeploymentConfig:
        cy.get(gitPageObj.resources.deploymentConfig).check();
        break;
      case resourceTypes.KnativeService:
        cy.get(gitPageObj.resources.knative).check();
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

  selectAddPipeline: () => cy.get(gitPageObj.pipeline.addPipeline).check(),

  createWorkload: () => cy.get(gitPageObj.create).click()
};

