Feature: Perform Actions on Helm Releases
    As a user, I want to perform the actions on the helm releases in topology page

    Background:
        Given user is at developer perspective
        And user has selected namespace "aut-actions-helm"
        And helm release "nodejs-ex-k" is present in topology page


    @regression, @smoke
    Scenario: Context menu options of helm release: HR-07-TC01
        Given user is at the Topology page
        When user right clicks on the Helm Release "nodejs-ex-k" to open the context menu
        Then user is able to see the context menu with actions Upgrade, Rollback and Uninstall Helm Release


    @regression, @smoke
    Scenario: Actions drop down on the side bar: HR-10-TC08
        Given user is on the topology sidebar of the helm release "nodejs-ex-k"
        When user clicks on the Actions drop down menu
        Then user is able to see the actions dropdown menu with actions Upgrade, Rollback and Uninstall Helm Release


    @regression
    Scenario: Actions menu on Helm page
        Given user is on the Helm page with helm release "nodejs-ex-k"
        When user clicks on the Kebab menu
        Then user is able to see kebab menu with actions Upgrade, Rollback and Uninstall Helm Release


    @regression, @smoke
    Scenario: Perform Upgrade action on Helm Release through Context Menu: HR-08-TC02
        Given user is at the Topology page
        When user right clicks on the Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Upgrade" action
        And user upgrades the chart Version
        And user clicks on the upgrade button
        Then user will be redirected to Topology page


    @regression, @smoke
    Scenario: Perform Rollback action on Helm Release through Context Menu: HR-08-TC03
        Given user is at the Topology page
        When user right clicks on the Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Rollback" action
        And user selects the version to Rollback
        And user clicks on the rollback button
        Then user will be redirected to Topology page


    @regression, @smoke
    Scenario: Uninstall Helm Release through Context Menu: HR-08-TC04
        Given user is at the Topology page
        When user right clicks on the Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Uninstall Helm Release" action
        And user enters the release name
        And user clicks on the Uninstall button
        Then user will be redirected to Topology page with no workloads


    @regression, @smoke
    Scenario: Context menu options of the helm release workload: HR-05-TC01
        Given user is at the Topology page
        When user right clicks on the workload of Helm Release "nodejs-ex-k" to open the context menu
        Then user is able to see the context menu with actions Start Rollout, Pause Rollouts, Edit Pod Count, Add Storage, Edit Health Checks, Edit Labels, Edit Annotations, Edit Deployment Config and Delete Deployment Config


    @regression
    Scenario: Start Rollout for the helm relase workload: HR-05-TC02
        Given user is at the Topology page
        When user right clicks on the workload of Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Start Rollout" action
        Then pod status updated as "Scaling to 0"
        And pod status updated as "Scaling to 1"
        And pod will be displayed in helm release


    @regression
    Scenario: Pause Rollout for the helm relase workload: HR-05-TC03
        Given user is at the Topology page
        When user right clicks on the workload of Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Pause Rollouts" action
        And user right clicks on the workload of Helm Release "nodejs-ex-k" to open the context menu
        Then Resume Rollout is displayed


    @regression
    Scenario: Edit Pod Count for the helm relase workload: HR-05-TC04
        Given user is at the Topology page
        When user right clicks on the workload of Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Edit Pod Count" action
        And user updates the pod count as "2" in Edit Pod count modal
        And user clicks on Save in Edit Pod Count modal
        Then Pod count displays as "2" for helm release workload "nodejs-ex-k"


    @regression
    Scenario: Add Storage to the helm relase workload: HR-05-TC05
        Given user is at the Topology page
        When user right clicks on the workload of Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Add Storage" action
        And user creates the new claim "my-storage-claim" with default storage class
        And user enters the storage capacity as "2" GiB
        And user enters the Mount Path as "path"
        And user clicks Save button on Add Storage page
        Then user redirects to deployment config detils page


    @regression
    Scenario: Edit Health Checks for the helm relase workload: HR-05-TC06
        Given user is at the Topology page
        When user right clicks on the workload of Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Edit Health Checks" action
        Then user redirects to Edit Health Checks page


    @regression
    Scenario: Edit Labels of the helm relase workload: HR-05-TC07
        Given user is at the Topology page
        When user right clicks on the workload of Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Edit Labels" action
        And user adds the label "app=label" to exisitng labels list in Edit Labels modal
        And user clicks Save button on the Edit Labels modal
        Then user verifies the label in side pane of the Helm Release workload "nodejs-ex-k"


    @regression
    Scenario: Edit Annotations of the helm relase workload: HR-05-TC08
        Given user is at the Topology page
        When user right clicks on the workload of Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Edit Annotations" action
        And user adds the annotations
        And user clicks Save button on the Edit Annotations modal
        Then number of annotatoins increases in side pane of the Helm Release workload "nodejs-ex-k"


    @regression, @manual
    Scenario: Edit Deployment config of the helm relase workload: HR-05-TC09
        Given user is at the Topology page
        When user right clicks on the workload of Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Edit Deployment Config" action
        And user updates the yaml file
        And user clicks Save button on the Deployment Config details page
        Then number of annotatoins increases in side pane of the Helm Release workload "nodejs-ex-k"


    @regression, @manual
    Scenario: Delete Deployment config of the helm relase workload: HR-05-TC10
        Given user is at the Topology page
        When user right clicks on the workload of Helm Release "nodejs-ex-k" to open the context menu
        And user clicks on the "Delete Deployment Config" action
        And user clicks Delete button on Delete Deployment Config modal
        Then topology page displays with message "No resources found"
