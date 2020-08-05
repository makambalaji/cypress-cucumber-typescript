import {displayOptions} from '../constants/topology';
import { helmPage } from './helm_page';
import { verify } from 'cypress/types/sinon';

export const topologyObj = {
    graph: {
        reset: '#reset-view',
        zoomIn: '#zoom-in',
        zoomOut: '#zoom-out',
        fitToScreen: '#fit-to-screen',
    }, 
    list: {
        appName: '#HelmRelease ul li div',
        nodeName: '#HelmRelease ul li div',
    },
    sidePane: {
        dialog: '[role="dialog"]',
        title: '[role="dialog"] h1',
        tabs: 'li.co-m-horizontal-nav__menu-item',
        sectionTitle:'div.overview__sidebar-pane-bod h2',
        fieldName: '[data-test-id="resource-summary"] dt',
    }
}

export const topologyPage = {
    verifyTopologyPage: () => cy.get(topologyObj.graph.reset, {timeout:9000}).should('be.visible'),
    search: (name: string)=> cy.byLegacyTestID('item-filter').type(name),
    verifyWorkloadInTopologyPage: (appName: string) => {
        cy.get('[data-test-id="namespace-bar-dropdown"] a').as('switcher');
        cy.get('@switcher').click();
        topologyPage.search(appName);
        // cy.get(topologyObj.list.nodeName).should('contain.text', appName);
        cy.get('div.is-filtered').should('be.visible');
        cy.get('@switcher').click();
    },
    selectDisplayOption: (opt: displayOptions) => {
        cy.get('[id^=pf-select-toggle-id]').eq(0).click();
    switch (opt) {
        case displayOptions.PodCount:
            cy.get('#pf-random-id-1-show-pod-count').check();
            break;
        case displayOptions.Labels:
            cy.get('#pf-random-id-1-show-labels').check();
            break;
        case displayOptions.ApplicationGroupings:
            cy.get('#pf-random-id-1-expand-app-groups').check();
            break;
        default:
            throw new Error('Option is not available');
            break;
        }
    },
    verifySidePane: () => cy.get(topologyObj.sidePane.dialog).should('be.visible'),
    verifyNodeInsSidePane:(nodeName: string) => cy.get(topologyObj.sidePane.title).should(nodeName),
    verifyPipelineRunStatus:(status:string) => cy.get('li.list-group-item.pipeline-overview').next('li').find('span.co-icon-and-text span').should('have.text', status),
    selectTabInSidePane:(tabName: string) => cy.get(topologyObj.sidePane.tabs).contains(tabName).click(),
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
    },
    appNode:() => {
        return cy.get('[data-id="group:dancer-ex-git-app"] g.odc-resource-icon text').contains('A')
    },
    verifyWorkloadInSidePane:() => cy.get('[role="dialog"] ul li a').should('be.visible'),
    verifyActionsInSidePane:(...actions: string[]) => {
        cy.get('[data-test-id="action-items"] li').each(($el) => {
            expect($el.text()).to.contains(actions);
        });
    },
    verifyContextMenuOptions:(...options: string[]) => {
        cy.get('#popper-container li[role="menuitem"]').each(($el) => {
            expect($el.text()).to.contains(options);
        });
    },
}
