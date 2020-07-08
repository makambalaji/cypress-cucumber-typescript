export const pipelinesPage = {
  createPipeline: () => {
    cy.get('#yaml-create').click();
  },
};


export const pipelineBuilderPage = {
  verifyTitle:() => {
    cy.get('.odc-pipeline-builder-header h1').should('have.text', 'Pipeline Builder');
  },

  verifyDefaultPipelineName: () => {
    cy.get('#form-input-name-field').should('have.value', 'new-pipeline');
  },

  enterPipelineName: (pipelineName: string) => {
    cy.get('#form-input-name-field').clear();
    cy.get('#form-input-name-field').type(pipelineName);
  },

  selectTask: (taskName: string = 'kn') => {
    cy.get('foreignObject button').click();
    cy.byTestActionID(taskName).click();
  },

  seelctParallelTask:(taskName: string) => {
    cy.get('.odc-pipeline-vis-task__content').invoke('show')
    cy.contains('+').click()
    cy.byTestActionID(taskName).click();
  },

  addParameters: (
    paramName: string,
    description: string = 'description',
    defaultValue: string = 'value1',
  ) => {
    cy.byButtonText('Add Parameters').click();
    cy.get('#form-input-params-0-name-field').type(paramName);
    cy.get('#form-input-params-0-description-field').type(description);
    cy.get('#form-input-params-0-default-field').type(defaultValue);
  },

  addResource: (resourceName: string) => {
    cy.byButtonText('Add Resources').click();
    cy.get('#form-input-resources-0-name-field').type(resourceName);
    cy.byLegacyTestID('dropdown-button').click();
    cy.get('[data-test-dropdown-menu="git"]').click();
  },

  verifySection: () => {
    cy.get('.odc-pipeline-builder-page h2').as('sectionTitle');
    cy.get('@sectionTitle').eq(0).should('have.text', 'Tasks');
    cy.get('@sectionTitle').eq(1).should('have.text', 'Parameters');
    cy.get('@sectionTitle').eq(2).should('have.text', 'Resources');
  },

  create:() => {
    cy.byLegacyTestID('submit-button').click();
  }
}

export const pipelineDetailspage = {
  verifyTitle:(pipelineName: string) => {
    cy.byLegacyTestID('resource-title').should('have.text', pipelineName);
  }
}

export const createPipelineFromBuilderPage = (pipelineName: string, taskName: string) => {
  cy.byButtonText('Create Pipeline').click();
  pipelineBuilderPage.enterPipelineName(pipelineName);
  pipelineBuilderPage.selectTask(taskName);
  cy.byLegacyTestID('submit-button').click();
};

export const createPipelineFromYamlPage = () => {
  cy.byButtonText('Create Pipeline').click();
  cy.byButtonText('Edit YAML').click();
  cy.get('form[name="form"]').should('be.visible');
  cy.get('form[name="form"] h2').should('contain.text', 'Switch to YAML Editor?');
  cy.get('#confirm-action').click();
  cy.get('p.help-block').should('contain.text', 'YAML or JSON');
  cy.get('#save-changes').click();
};
