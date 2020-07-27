export const helmPageObj = {
    noHelmReleasesMessage: 'p.odc-helm-release__empty-list__title',
    search: '[data-test-id="item-filter"]',
    table: '[role="grid"]',
    resourcesTab: '[data-test-id="horizontal-link-Resources"]',
    revisionHistoryTab: '[data-test-id="horizontal-link-Revision History"]',
    releaseNotesTab: '[data-test-id="horizontal-link-Release Notes"]',
    details: {
        title: '[data-test-section-heading="Helm Release Details"]',
    }
}

export const helmPage = {
    verifyMessage: () => cy.get(helmPageObj.noHelmReleasesMessage).should('contain.text', 'No Helm Releases found'),
    verifyInstallHelmLink:() => cy.get('a').contains('Install a Helm Chart from the developer catalog').should('be.visible'),
    search:(name: string) => {
    cy.get(helmPageObj.search).type(name);
    cy.get(helmPageObj.table).should('be.visible');
    },
    verifyHelmReleasesDisplayed:() => cy.get(helmPageObj.table).should('be.visible'),
    clickHelmReleaseName:(name:string) => cy.get(`a[title="${name}"]`).click(),
}

export const helmDetailsPage= {
    verifyTitle:() => cy.get(helmPageObj.details.title).should('contain.text', 'Helm Release Details'),
    verifyResourcesTab:() => cy.get(helmPageObj.resourcesTab).should('be.visible'),
    verifyReleaseNotesTab:() => cy.byLegacyTestID('horizontal-link-Release Notes').should('be.visible'),
    verifyActionsDropdown:() => cy.byLegacyTestID('actions-menu-button').should('be.visible'),
    verifyRevisionHistoryTab:() => cy.get(helmPageObj.revisionHistoryTab).should('be.visible'),
    clickActionMenu:() => cy.byLegacyTestID('actions-menu-button').click(),
    verifyActionsInActionMenu:() => {
        cy.get('[data-test-id="action-items"] li').each(($el, index, list) => {
            expect($el.text()).eq('Upgrade');
            expect($el.text()).eq('Rollback');
            expect($el.text()).eq('Uninstall Helm Release');
        });
    },
}