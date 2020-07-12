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
    cy.byLegacyTestID('modal-title').as('alert')
    switch (action) {
      case pipelineActions.Start: {
        cy.byTestActionID('Start').click();
        cy.get('[data-test-section-heading="Pipeline Run Details"]').should('be.visible');
        break;
      }
      case pipelineActions.AddTrigger: {
        cy.byTestActionID('Add Trigger').click();
        cy.get('form').should('be.visible');
        cy.get('@alert').should('contain.text','Add Trigger');
        break;
      }
      case pipelineActions.EditLabels: {
        cy.byTestActionID('Edit Labels').click();
        cy.get('form').should('be.visible');
        cy.get('@alert').should('contain.text','Labels');
        break;
      }
      case pipelineActions.EditAnnotations: {
        cy.byTestActionID('Edit Annotations').click();
        cy.get('form').should('be.visible');
        cy.get('@alert').should('contain.text','Edit Annotations');
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
        cy.get('@alert').should('contain.text','Delete Pipeline?');
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
  },

  addTrigger:(gitProviderType: string = 'github-pullreq') => {
    cy.byLegacyTestID('modal-title').should('contain.text','Add Trigger');
    cy.selectByDropDownText('#form-dropdown-triggerBinding-name-field', gitProviderType);
    cy.get('#confirm-action').click();
  },

  editPipeline:() => {

  },
};
