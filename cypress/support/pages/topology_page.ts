import {displayOptions} from '../constants/topology';
import { helmPage } from './helm_page';

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
        title: 'h1.co-m-pane__heading a',
        tabs: 'li.co-m-horizontal-nav__menu-item',
        sectionTitle:'div.overview__sidebar-pane-bod h2',
        fieldName: '[data-test-id="resource-summary"] dt',
    }
}

export const topologyPage = {
    verifyTopologyPage: () => cy.get(topologyObj.graph.reset, {timeout:9000}).should('exist'),
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
    getContextMenuForNode: (nodeName: string) => {
    },
    verifySidePane: () => cy.get(topologyObj.sidePane.dialog).should('be.visible'),
    verifyNodeInsSidePane:(nodeName: string) => cy.get(topologyObj.sidePane.title).should(nodeName),
    verifyPipelineRunStatus:(status:string) => cy.get('li.list-group-item.pipeline-overview').next('li').find('span.co-icon-and-text span').should('have.text', status),
    selectTabInSidePane:(tabName: string) => cy.get(topologyObj.sidePane.tabs).contains(tabName),
    verifySectionInSidePane:(sectionTitle: string) => cy.get(topologyObj.sidePane.sectionTitle).contains(sectionTitle).should('be.visible'),
    searchHelmRelease:(name: string) => {
        topologyPage.search(name);
        cy.get('[data-kind="node"]', {timeout: 8000}).then(($el) => {
            if($el.find('g.is-filtered').length === 0) {
                helmPage.createHelmRelease(name);
                cy.get('[data-kind="node"] g.is-filtered', {timeout: 8000}).should('be.visible');
            }
            else {
                cy.log('Helm Release is already available');
                cy.get('[data-kind="node"] g.is-filtered', {timeout: 8000}).should('be.visible');
            }
        });
    },
    verifyHelmReleaseSidePaneTabs:() => {
        cy.get(topologyObj.sidePane.tabs).eq(0).should('contain.text', 'Details');
        cy.get(topologyObj.sidePane.tabs).eq(1).should('contain.text', 'Resources');
        cy.get(topologyObj.sidePane.tabs).eq(2).should('contain.text', 'Release Notes');
    }
}
