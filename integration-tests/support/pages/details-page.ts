
export const detailsPage = {
    isTabSelected:(tabSelector: string) => cy.byLegacyTestID(tabSelector).parent("li").should("have.class", "active"),
    selectTab:(tabSelector: string) => cy.byLegacyTestID(tabSelector).click(),
}
