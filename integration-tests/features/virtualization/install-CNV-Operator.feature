Feature: Virtual Machine
    User should be able to create the Virtual machine


Background: 
    Given user is at administrator perspective


@regression, @smoke
Scenario: Import Virtual Machine Card on +Add page: VM-01-TC03
    Given openshift cluster is installed with Virtualization operator and deployed with cnv operator
    And user has selected namespace "aut-virtualization"
    When user switches to developer perspective
    And user navigates to Add page
    Then user will see Import Virtual Machine Card on Add page
