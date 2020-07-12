
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
          cy.byLegacyTestID('modal-title').should('contain.text','Delete Pipeline?');
          break;
        }
        default: {
          throw new Error('operator is not available');
        }
      }
    },
  }