Feature: Create workload from Operator Backed file
    As a user I want to create the application, component or service from Developer Catlog Operator backed file

Background:
    Given cluster is installed with serverless Operator
    And user is at dev perspecitve
    And open project namespace "knative-serving"
    And user is at Add page


@regression, @smoke
Scenario: Create the workload from Operator Backed : A-08-TC01
    Given user is at Developer Catlog page
    And "Opeator Backed" is selected on Developer Catalog page
    When user selects knative Serving card
    And click on Create button in side pane
    And type name as "knative-serving-1" in Create Knative Serving page
    And user clicks create button in Create Knative Serving page
    Then page redirects to topology page
    And created workload "<name>" is present in topology page


@regression, @smoke
Scenario: Perform cancel operation : A-08-TC02
    Given user is at Developer Catlog page
    And "Opeator Backed" is selected on Developer Catalog page
    When user selects knative Serving card
    And click on Create button in side pane
    And user clicks cancel button in Create Knative Serving page
    Then page redirects to Add page
