import { pipelineActions } from "../constants/pipelines";

export const pipelinesPage = {
  createPipeline: () => {
    cy.get('#yaml-create').click();
  },

  selectKebabMenu:(pipelineName: string) => {
    cy.get('div[role="grid"]').should('exist');
    cy.get(`tr td:nth-child(1)`).each(($el, index, $list) => {
      const text = $el.text()
      if(text.includes(pipelineName)) {
        cy.get(`tr td:nth-child(1)`).eq(index).next('[data-test-id="kebab-button"]').click();
      }
    });
  },

  selectAction:(action: pipelineActions)=> {
    switch (action) {
      case pipelineActions.Start: {
        cy.byTestActionID('Start').click();
        cy.get('[data-test-section-heading="Pipeline Run Details"]').should('be.visible');
        break;
      }
      case pipelineActions.AddTrigger: {
        cy.byTestActionID('Add Trigger').click();
        cy.get('form').should('be.visible');
        cy.byLegacyTestID('[data-test-id="modal-title"]').should('contain.text','Add Trigger');
        break;
      }
      case pipelineActions.EditLabels: {
        cy.byTestActionID('Edit Labels').click();
        cy.get('form').should('be.visible');
        cy.byLegacyTestID('[data-test-id="modal-title"]').should('contain.text','Labels');
        break;
      }
      case pipelineActions.EditAnnotations: {
        cy.byTestActionID('Edit Annotations').click();
        cy.get('form').should('be.visible');
        cy.byLegacyTestID('[data-test-id="modal-title"]').should('contain.text','Edit Annotations');
        break;
      }
      case pipelineActions.EditPipeline: {
        cy.byTestActionID('Edit Pipeline').click();
        cy.get('h1.odc-pipeline-builder-header__title').should('contain.text','Pipeline Builder');
        break;
      }
      case pipelineActions.DeletePipeline: {
        cy.byTestActionID('Delete Pipeline').click();
        cy.get('form').should('be.visible');
        cy.byLegacyTestID('[data-test-id="modal-title"]').should('contain.text','Delete Pipeline?');
        break;
      }
      default: {
        throw new Error('operator is not available');
      }
    }
  },

  search:(pipelineName: string) => {
    cy.byLegacyTestID('item-filter').type(pipelineName).should('have.value', pipelineName);
    cy.get('[role="grid"]').should('be.visible');
  },

  selectPipeline:(pipelineName: string) => {
    cy.byLegacyTestID(pipelineName).click();
  },

  seelctPipelineRun:(pipelineName: string) => {
    cy.get('div[role="grid"]').should('exist');
    cy.get(`tr td:nth-child(1)`).each(($el, index, $list) => {
      const text = $el.text()
      if(text.includes(pipelineName)) {
        cy.get(`tr td:nth-child(3)`).eq(index).click();
      }
    });
  },

  verifyPipelinesTableDisplay:() => {
    cy.get('[role="grid"]').should('be.visible');
  },

  verifyPipelineTableColumns:() => {
    cy.get('div[aria-label="Pipelines"] thead tr th').each(($el) => {
      expect(['Name', 'Namespace', 'Last Run', 'Task Status', 'Last Run Status', 'Last Run Time']).include($el.text())
    });
  },

  verifyNameInPipelinesTable:(pipelineName: string) => {
    cy.get('[title="Pipeline"]').next().then(($el) => {
      expect($el.text()).contains(pipelineName);
    });
  },

  verifyNameSpaceInPipelinesTable:(namespace: string) => {
    cy.get('[title="Namespace"]').next().then(($el) => {
      expect($el.text()).contains(namespace);
    });
  }
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
    // cy.get('.odc-pipeline-vis-task__content').invoke('show')
    // cy.contains('+').click()
    cy.mouseHoverAndClick('.odc-pipeline-vis-task__content', '.odc-plus-node-decorator:nth-child(3) > circle');
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
  },
}

export const pipelineDetailsPage = {
  verifyTitle:(pipelineName: string) => {
    cy.byLegacyTestID('resource-title').should('have.text', pipelineName);
  },

  clickActionMenu: () => {
    cy.byLegacyTestID('actions-menu-button').click();
  },
  
  selectActionFromActionsDropdown:(action: string) => {
    cy.byTestActionID(action).click();
  }
}

export const pipelineRunDetailsPage = {
  verifyTitle:() => {
    cy.get('span[title="PipelineRun"]').should('be.visible');
  },

  selectActionFromActionsDropdown:(action: string) => {
    switch (action) {
      case 'Rerun': {
        cy.byTestActionID('Rerun').click();
        cy.get('[data-test-section-heading="Pipeline Run Details"]').should('be.visible');
        break;
      }
      case 'Delete Pipeline Run': {
        cy.byTestActionID('Delete Pipeline Run').click();
        cy.get('form').should('be.visible');
        cy.byLegacyTestID('[data-test-id="modal-title"]').should('contain.text','Delete Pipeline?');
        break;
      }
      default: {
        throw new Error('operator is not available');
      }
    }
  },
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
