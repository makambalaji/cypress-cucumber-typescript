export const pipelineRunDetailsObj = {
  actions: '[data-test-id="actions-menu-button"]',
  logsTab: '[data-test-id="horizontal-link-Logs"]',
  yamlTab: '[data-test-id="horizontal-link-YAML"]',
  detailsTab: '[data-test-id="horizontal-link-Details"]',
  pipelineRunStatus: 'h1 [data-test="status-text"]',
  details: {
    pipelineLink: '[data-test-id="git-pipeline-events"]',
    sectionTitle: '[data-test-section-heading="Pipeline Run Details"]',
    pipelineRunDetails: 'div dl',
  },
  yaml: {
    yamlPage: '[data-mode-id="yaml"]',
    reloadBtn: '[data-test="reload-object"]',
    cancelBtn: '[data-test="cancel"]',
  },
  logs: {
    logPage: '[data-test-id="logs-task-container"]',
  }
}

export const pipelineRunsObj = {
  pipelineRunsTable: {
    table: 'div[role="grid"]',
    pipelineRunName: 'tr td:nth-child(1)',
    status: '[data-test="status-text"]',
  }
}

export const pipelineRunDetailsPage = {
    verifyTitle:() => cy.get(pipelineRunDetailsObj.details.sectionTitle).should('have.text', 'Pipeline Run Details'),
    verifyPipelineRunStatus:(status: string) => cy.get(pipelineRunDetailsObj.pipelineRunStatus).should('have.text', status),
    fieldDetails:(fieldName: string, expectedFieldValue: string) => cy.get(pipelineRunDetailsObj.details.pipelineRunDetails).contains(fieldName).next('dd').should('have.text', expectedFieldValue),
    selectFromActionsDropdown:(action: string) => {
      cy.get(pipelineRunDetailsObj.actions).click();
      switch (action) {
        case 'Rerun': {
          cy.byTestActionID('Rerun').click();
          cy.get('[data-test-section-heading="Pipeline Run Details"]').should('be.visible');
          break;
        }
        case 'Delete Pipeline Run': {
          cy.byTestActionID('Delete Pipeline Run').click();
          cy.get('form').should('be.visible');
          cy.byLegacyTestID('modal-title').should('contain.text','Delete Pipeline?');
          break;
        }
        default: {
          throw new Error('operator is not available');
        }
      }
    },
    verifyTabs:() => {
      cy.get(pipelineRunDetailsObj.detailsTab).should('have.text', 'Details');
      cy.get(pipelineRunDetailsObj.yamlTab).should('have.text', 'YAML');
      cy.get(pipelineRunDetailsObj.logsTab).should('have.text', 'Logs');
    },
    verifyFields:() => {
      cy.get('div dl dt').as('fieldNames');
      cy.get('@fieldNames').eq(0).should('have.text', 'Name');
      cy.get('@fieldNames').eq(1).should('have.text', 'Namespace');
      cy.get('@fieldNames').eq(2).should('have.text', 'Labels');
      cy.get('@fieldNames').eq(3).should('have.text', 'Annotations');
      cy.get('@fieldNames').eq(4).should('have.text', 'Created At');
      cy.get('@fieldNames').eq(5).should('have.text', 'Owner');
      cy.get('@dynamicLinks').eq(0).should('have.text', 'Status');
      cy.get('@dynamicLinks').eq(1).should('have.text', 'Pipeline');
      cy.get('@dynamicLinks').eq(2).should('have.text', 'Triggered by:');
    },
    verifyActionsDropdown:() => cy.get(pipelineRunDetailsObj.actions).should('be.visible'),
    selectPipeline:() => cy.get(pipelineRunDetailsObj.details.pipelineLink).click(),
    clickOnDownloadLink:() => cy.byButtonText('Download').click(),
    clickOnExpandLink:() => cy.byButtonText('Expand').click(),
    selectTab:(tabName: string) => {
      switch (tabName) {
        case 'Details': {
          cy.get(pipelineRunDetailsObj.detailsTab).click();
          pipelineRunDetailsPage.verifyTitle();
          break;
        }
        case 'YAML': {
          cy.get(pipelineRunDetailsObj.yamlTab).click();
          cy.get(pipelineRunDetailsObj.yaml.yamlPage).should('be.visible');
          break;
        }
        case 'Logs': {
          cy.get(pipelineRunDetailsObj.logsTab).click();
          cy.get(pipelineRunDetailsObj.logs.logPage).should('be.visible');
          break;
        }
        default: {
          throw new Error('operator is not available');
        }
      }
    },
}

export const pipelienRunsPage = {
  verifyTitle:() => cy.pageTitleShouldContain('Pipeline Runs'),
  search:(pipelineRunName: string) => cy.byLegacyTestID('item-filter').type(pipelineRunName),
  selectKebabMenu:(pipelineRunName: string) => {
    cy.get(pipelineRunsObj.pipelineRunsTable.table).should('exist');
    cy.get(pipelineRunsObj.pipelineRunsTable.pipelineRunName).each(($el, index) => {
      const text = $el.text()
      if(text.includes(pipelineRunName)) {
        cy.get('tbody tr').eq(index).find('td:nth-child(6) button').click();
      }
    });
  },
  verifyPipelineRunsTableDisplay:() => cy.get(pipelineRunsObj.pipelineRunsTable.table).should('be.visible'),
  filterByStatus:(status: string = 'Succeeded') => {
    cy.byLegacyTestID('filter-dropdown-toggle').click();
    switch (status) {
      case 'Succeeded': {
        cy.get('#Succeeded').click();
        break;
      }
      case 'Running': {
        cy.get('#Running').click();
        break;
      }
      case 'Failed': {
        cy.get('#Failed').click();
        break;
      }
      case 'Cancelled': {
        cy.get('#Cancelled').click();
        break;
      }
      default: {
        throw new Error('operator is not available');
      }
    }
    cy.byButtonText('Clear all filters').should('be.visible');      
  },
  verifyStatusInPipelineRunsTable:(status: string) => {
    cy.get(pipelineRunsObj.pipelineRunsTable.status).should('have.text', status);
  },
}