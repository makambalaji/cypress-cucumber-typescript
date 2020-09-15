Feature: Workspaces
    As a user, I want to add or remove secrets details to pipeline

Background:
    Given user has installed OpenShift Pipelines operator
    And user has selected namespace "aut-pipeline-workspaces"


@regression, @smoke, @manual
Scenario: Create the pipeline with workspace : P-12-TC01


@regression
Scenario: Workspaces section in start modal : P-12-TC02


@regression
Scenario: Add volume type to the workspaces : P-12-TC03


@regression
Scenario: Start the pipeline with workspace : P-12-TC04