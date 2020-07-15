import {displayOptions} from '../constants/topology';

export const topologyObj = {
    search: '[data-test-id="item-filter"]',
    graph: {
        reset: '#reset-view',
        zoomIn: '#zoom-in',
        zoomOut: '#zoom-out',
        fitToScreen: '#fit-to-screen',
        switchView: '[data-test-id="namespace-bar-dropdown"] a',
    }, 
    list: {
        appName: 'h2.project-overview__group-heading',
        nodeName: 'h3.project-overview__item-heading',
    },
    sidePane: {
        dialog: '[role="dialog"]',
        title: 'h1.co-m-pane__heading a'
    }
}

export const topologyPage = {
    verifyTopologyPage: () => cy.get(topologyObj.graph.reset).should('exist'),
    verifyWorkloadInTopologyPage: (appName: string) => {
        cy.get(topologyObj.graph.switchView).as('switcher');
        cy.get('@switcher').click();
        cy.get(topologyObj.search).type(appName);
        cy.get(topologyObj.list.nodeName).should('contain.text', appName);
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
    search: (name: string)=> cy.get(topologyObj.search).type(name),

    // cy.get('g.is-filtered').should('exist');
    getContextMenuForNode: (nodeName: string) => {
       
    },
    verifySidePane: () => cy.get(topologyObj.sidePane.dialog).should('exist'),

    verifyNodeInsSidePane:(nodeName: string) => cy.get(topologyObj.sidePane.title).should(nodeName)
}
