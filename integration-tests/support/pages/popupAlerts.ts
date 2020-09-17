import { eventSourcesPage } from "./add-flow/eventSource-page";

export const editLabels = {
    enterLabel:(labelName: string) => cy.byTestID('tags-input').type(labelName).type('{enter'),
    clicKSave: () => {
        cy.byTestID('confirm-action').click();
        cy.get('form').should('not.be.visible');
    },
    clickCancel: () => {
        cy.byLegacyTestID('modal-cancel-action').click();
        cy.get('form').should('not.be.visible');
    },
    numberOfLabels:() => {
        return cy.get('tags-input span.tag-item__content')
    },
    removeLabel:(labelName: string) => {
        cy.get('span.tag-item__content').contains(labelName).next('a.remove-button').click();
    },
}

export const editAnnotations = {
    add:() => cy.byLegacyTestID('pairs-list__add-btn').click(),
    enterKey:(key: string) => cy.get('input[placeholder="key"]').should('have.value', '').type(key),
    enterValue:(value: string) => cy.get('input[placeholder="value"]').should('have.value', '').type(value),
    clicKSave: () => 
    {
        cy.byTestID('confirm-action').click();
        cy.get('form').should('not.be.visible');
    },
    clickCancel: () => 
    {
        cy.byLegacyTestID('modal-cancel-action').click();
        cy.get('form').should('not.be.visible');
    },
    removeAnnotation: (annotationKey: string) => {
        cy.get(`input[value="${annotationKey}"]`).parent().next('div.pairs-list__action').find('[data-test-id="pairs-list__delete-btn"]').click();
    }
}

export const setTrafficDistribution = {
    add:() => cy.get('form [type="button"]').contains('Add').click(),
    enterSplit:(split:string) => cy.get('#form-input-trafficSplitting-0-percent-field').type(split),
    selectRevision:(revisionName: string) => {
        cy.get('#form-dropdown-trafficSplitting-0-revisionName-field').click();
        cy.get(`[data-test-dropdown-menu^="${revisionName}"]`).click();
    },
    clicKSave: () => 
    {
        cy.byTestID('confirm-action').click();
        cy.get('form').should('not.be.visible');
    },
    clickCancel: () => 
    {
        cy.byLegacyTestID('modal-cancel-action').click();
        cy.get('form').should('not.be.visible');
    },
}

export const deleteservice = {
    clicKDelete: () => 
    {
        cy.byTestID('confirm-action').click();
        cy.get('form').should('not.be.visible');
    },
    clickCancel: () => 
    {
        cy.byLegacyTestID('modal-cancel-action').click();
        cy.get('form').should('not.be.visible');
    },
    
}

export const editApplicationrouping = {
    selectApplication:(appName: string) => {
        cy.get('#form-dropdown-application-name-field').click();
        cy.get(`[id="${appName}-link"]`).click();
    },
    createApplication:(appName: string) => {
        cy.get('#form-dropdown-application-name-field').click();
        cy.byLegacyTestID('application-form-app-input').type(appName);
    },
    clicKDelete: () => 
    {
        cy.byTestID('confirm-action').click();
        cy.get('form').should('not.be.visible');
    },
    clickCancel: () => 
    {
        cy.byLegacyTestID('modal-cancel-action').click();
        cy.get('form').should('not.be.visible');
    },
}

export const deleteApplication = {
    enterApplication: (appName: string) => cy.get('#form-input-resourceName-field').type(appName),
    clicKDelete: () => {
        cy.byTestID('confirm-action').should('be.enabled').click();
        cy.get('form').should('not.be.visible');
    },
    clickCancel: () => {
        cy.byLegacyTestID('modal-cancel-action').click();
        cy.get('form').should('not.be.visible');
    },
    deleteApp:() => {
        cy.get('p strong').then((ele) => {
            deleteApplication.enterApplication(ele.text());
            deleteApplication.clicKDelete();
        }); 
    },
}

export const deleteRevision = {
    verifyMessage:(message: string) => cy.get('form p').should('contain.text', message),
    clickOK:() => cy.byLegacyTestID('modal-cancel-action').click(),
}

export const moveSink = {
    selectResource:(resourceName: string) => {
        cy.get('#form-radiobutton-sinkType-resource-field').should('be.checked');
        cy.get('#form-ns-dropdown-sink-name-field').click();
        cy.get(`[id="${resourceName}-link"]`).click();
    },
    enterURI:(uri: string) => {
        cy.get('#form-radiobutton-sinkType-uri-field').should('be.checked');
        cy.byLegacyTestID('sink-section-uri').type(uri);
    },
    clickCancel: () => {
        cy.byLegacyTestID('modal-cancel-action').click();
        cy.get('form').should('not.be.visible');
    },
    clicKSave: () => {
        cy.byTestID('confirm-action').click();
        cy.get('form').should('not.be.visible');
    },
    verifyResourceDropDown: () => cy.get('#form-ns-dropdown-sink-name-field').should('be.visible'),
}

export const deleteAPIService = {
    clicKDelete: () => {
        cy.byTestID('confirm-action').click();
        cy.get('form').should('not.be.visible');
    },
    clickCancel: () => {
        cy.byLegacyTestID('modal-cancel-action').click();
        cy.get('form').should('not.be.visible');
    },
}

export const deleteSinkBinding = {
    clicKDelete: () => {
        cy.byTestID('confirm-action').click();
        cy.get('form').should('not.be.visible');
    },
    clickCancel: () => {
        cy.byLegacyTestID('modal-cancel-action').click();
        cy.get('form').should('not.be.visible');
    },
}