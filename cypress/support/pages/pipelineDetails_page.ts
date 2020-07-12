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