import {displayOptions} from '../constants/topology';

export const topologyPage = {
    
    verifyTopologyPage: () => {
        cy.get('div.odc-topology').should('exist');
    },
    verifyWorkloadInTopologyPage: (appName: string) => {
        cy.get('[data-test-id="namespace-bar-dropdown"] a').as('switcher');
        cy.get('@switcher').click();
        cy.byLegacyTestID('item-filter').type(appName);
        cy.get('h2.project-overview__group-heading').should('contain.text', appName);
        cy.get('@switcher').click();
    },
    selectDisplayOption: (opt: displayOptions) => {
    switch (opt) {
        case displayOptions.PodCount:
            cy.get('#show-pod-count').click();
            break;
        case displayOptions.Labels:
            cy.get('#show-labels').click();
            break;
        case displayOptions.ApplicationGroupings:
            cy.get('#expand-app-groups').click();
            break;
        default:
            throw new Error('Option is not available');
            break;
        }
    },
    search: (name: string)=> {
        cy.byLegacyTestID('item-filter').type(name);
        cy.get('g.is-filtered').should('exist');
    },
    getContextMenuForNode: (nodeName: string) => {
       
    },
    verifySidePane: () => {
        cy.get('[role="dialog"]').should('exist');
    },

}