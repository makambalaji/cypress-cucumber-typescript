Feature: Navigations on Helm Chart
    As a user, I want to navigate to different pages related to Helm Charts

    Background:
        Given user is at developer perspective
        And user has selected namespace "aut-helm-navigation"


    @regression, @smoke
    Scenario: Open the Helm tab on the navigation bar when helm charts are absent: HR-11-TC02
        Given user is at developer perspective
        When user clicks on the Helm tab
        Then user will be redirected to Helm releases page
        And user is able to see the message as no helm charts present
        And user will get the link to install helm charts from developer catalog


    @regression, @smoke
    Scenario: Install Helm Chart page: HR-02-TC04
        Given user is at Add page
        When user clicks on the Helm Chart card on the Add page
        And user searches for the "Nodejs Ex K v0.2.1" helm chart
        And user clicks on the "Nodejs Ex K v0.2.1" helm chart card
        And user clicks on the Install Helm Chart button on side bar
        Then Install Helm Chart page is displayed
        And release name displays as "nodejs-ex-k"


    @regression, @smoke
    Scenario: Yaml view editor for Install Helm Chart page: HR-02-TC05
        Given user is at Install Helm Chart page
        When user selects YAML view
        Then user is able to see YAML editor


    @regression, @smoke
    Scenario: Install Helm Chart: HR-02-TC01, HR-02-TC03, HR-02-TC06
        Given user is at Add page
        When user clicks on the Helm Chart card on the Add page
        And user searches for the "Nodejs Ex K v0.2.1" helm chart
        And user clicks on the "Nodejs Ex K v0.2.1" helm chart card
        And user clicks on the Install Helm Chart button on side bar
        And user enters Release Name as "nodejs-example"
        And user clicks on the Install button
        Then user will be redirected to Topology page
        And Topology page have the helm chart workload "nodejs-example"


    @regression, @smoke
    Scenario: Open the Helm tab on the navigation bar when helm charts are present: HR-11-TC01
        Given helm chart "Nodejs Ex K v0.2.1" is installed
        When user clicks on the Helm tab
        Then user will be redirected to Helm releases page
        And user will see the helm charts listed


    @regression
    Scenario: Filter out deployed Helm Charts: HR-11-TC02
        Given helm chart "Nodejs Ex K v0.2.1" is installed
        And user is at the Helm page
        When user filters "Deployed" helm charts
        Then helm charts with status "Deployed" are listed


    @regression
    Scenario: Filter out failed Helm Charts: HR-11-TC03
        Given helm chart "Nodejs Ex K v0.2.1" is installed
        And user is at the Helm page
        When user filters "Failed" helm charts
        Then helm charts with status "Failed" are listed


    @regression
    Scenario: Filter out other Helm charts : HR-11-TC04
        Given helm chart "Nodejs Ex K v0.2.1" is installed
        And user is at the Helm page
        When user filters "Other" helm charts
        Then helm charts with status "Other" are listed


    @regression
    Scenario: Select all filters: HR-11-TC05
        Given helm chart "Nodejs Ex K v0.2.1" is installed
        And user is at the Helm page
        When user filters "Deployed" helm charts
        And user filters "Failed" helm charts
        And user filters "Other" helm charts
        Then helm charts with status "Deployed" are listed
        And helm charts with status "Failed" are listed
        And helm charts with status "Other" are listed


    @regression
    Scenario: Clear all filters: HR-11-TC06
        Given helm chart "Nodejs Ex K v0.2.1" is installed
        And user has selected all filters
        When user clicks on the clear all filters button
        Then all filters selected will get removed


    @regression
    Scenario: Search for the Helm Chart: HR-11-TC07
        Given helm chart "Nodejs Ex K v0.2.1" is installed
        And user is at the Helm page
        When user searches for a helm chart "nodejs-ex-k"
        Then the helm chart "nodejs-ex-k" will be shown


    Scenario: Search for the not available Helm Chart
        Given user is at the Helm page
        When user searches for a helm chart "Nodejs Ex K v0.10.0"
    # Then user is able to see message on the Helm page as "message" - update message


    @regression, @smoke
    Scenario: Helm release details page : HR-11-TC08
        Given helm chart "Nodejs Ex K v0.2.1" is installed
        And user is at the Helm page
        When user clicks on the helm release name "nodejs-ex-k"
        Then user will see the Details page opened
        And user will see the Resources tab
        And user will see the Revision History tab
        And user will see the Release Notes tab
        And user will see the Actions drop down menu


    Scenario: Actions menu of Helm Details page : HR-03-TC10
        Given user is at the Helm page
        When user clicks Actions menu in Helm Details page
        Then Actions menu display with options Upgrade, Rollback, and Uninstall Helm Release
