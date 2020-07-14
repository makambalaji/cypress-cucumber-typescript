import { pipelineActions } from "../constants/pipelines";

export const pipelinesObj = {
  createPipeline: '#yaml-create',
  search: '[data-test-id="item-filter"]',
  pipelinesTable: {
    table: 'div[role="grid"]',
    pipelineName: 'tr td:nth-child(1)',
    pipelineRunName: 'tr td:nth-child(3)',
    kebabMenu: '[data-test-id="kebab-button"]',
    columnValues: '[aria-label="Pipelines"] tbody tr td',
    columnNames: 'div[aria-label="Pipelines"] thead tr th',
  },
  addTrigger: {
    add: '#confirm-action',
    cancel: '[data-test-id="modal-cancel-action"]',
  },
  editPipeline: {
    title: 'h1.odc-pipeline-builder-header__title'
  },
}

export const pipelinesPage = {
  createPipeline: () => cy.get(pipelinesObj.createPipeline).click(),

  selectKebabMenu:(pipelineName: string) => {
    cy.get(pipelinesObj.pipelinesTable.table).should('exist');
    cy.get(pipelinesObj.pipelinesTable.pipelineName).each(($el, index, $list) => {
      const text = $el.text()
      if(text.includes(pipelineName)) {
        cy.get(pipelinesObj.pipelinesTable.pipelineName).eq(index).next(pipelinesObj.pipelinesTable.kebabMenu).click();
      }
    });
  },

  verifyDefaultPipelineColumnValues: () => {
    cy.get(pipelinesObj.pipelinesTable.columnValues).each(($el, index, list) => {
      expect($el.eq(2).text()).equals('-');
      expect($el.eq(3).text()).equals('-');
      expect($el.eq(4).text()).equals('-');
      expect($el.eq(5).text()).equals('-');
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
        cy.alertTitleShouldBe('Add Trigger');
        break;
      }
      case pipelineActions.EditLabels: {
        cy.byTestActionID('Edit Labels').click();
        cy.get('form').should('be.visible');
        cy.alertTitleShouldBe('Labels');
        break;
      }
      case pipelineActions.EditAnnotations: {
        cy.byTestActionID('Edit Annotations').click();
        cy.get('form').should('be.visible');
        cy.alertTitleShouldBe('Edit Annotations');
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
        cy.alertTitleShouldBe('Delete Pipeline?');
        break;
      }
      default: {
        throw new Error('operator is not available');
      }
    }
  },

  search:(pipelineName: string) => {
    cy.get(pipelinesObj.search).type(pipelineName).should('have.value', pipelineName);
    cy.get(pipelinesObj.pipelinesTable.table).should('be.visible');
  },

  selectPipeline:(pipelineName: string) => cy.byLegacyTestID(pipelineName).click(),

  seelctPipelineRun:(pipelineName: string) => {
    cy.get(pipelinesObj.pipelinesTable.table).should('exist');
    cy.get(pipelinesObj.pipelinesTable.pipelineName).each(($el, index, $list) => {
      const text = $el.text()
      if(text.includes(pipelineName)) {
        cy.get(pipelinesObj.pipelinesTable.pipelineRunName).eq(index).click();
      }
    });
  },

  verifyPipelinesTableDisplay:() => cy.get(pipelinesObj.pipelinesTable.table).should('be.visible'),

  verifyPipelineTableColumns:() => {
    cy.get(pipelinesObj.pipelinesTable.columnNames).each(($el) => {
      expect(['Name', 'Namespace', 'Last Run', 'Task Status', 'Last Run Status', 'Last Run Time']).include($el.text())
    });
  },

  verifyCreateButtonIsEnabled:() => cy.get(pipelinesObj.createPipeline).should('be.enabled'),

  verifyKebabMenu:() => cy.get(pipelinesObj.pipelinesTable.kebabMenu).should('be.visible'),

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

  verifyOptionInKebabMenu:(option:string) => {
    cy.get('div.pf-c-dropdown button').contains('[data-test-id="actions-menu-button"]').click();
    cy.get('ul.pf-c-dropdown__menu li button').each(($el, index, list) => {
      expect(list).contains(option);
    })
  },

  addTrigger:(gitProviderType: string = 'github-pullreq') => {
    cy.alertTitleShouldBe('Add Trigger');
    cy.selectByDropDownText('Select Git Provider Type', gitProviderType);
    cy.get('#confirm-action').click();
  },

  editPipeline:() => {

  },
};
