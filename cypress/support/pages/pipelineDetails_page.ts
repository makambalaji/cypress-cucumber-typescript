export const pipelineDetailsObj = {
  
}

export const pipelineDetailsPage = {
  verifyTitle:(pipelineName: string) => {
    cy.titleShouldBe(pipelineName);
  },

  clickActionMenu: () => {
    cy.byLegacyTestID('actions-menu-button').click();
  },
  
  selectActionFromActionsDropdown:(action: string) => {
    cy.byTestActionID(action).click();
  }
}