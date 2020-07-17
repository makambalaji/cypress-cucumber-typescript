Feature: Create Application from Docker file
    As a user I want to create the application, component or service from Add Flow Docker file

Background:
    Given user is at dev perspecitve
    And open project namespace "aut-addflow-docker-demo"
    And user is at Add page


@regression
Scenario: Dockerfile details after entering git repo url: A-06-TC01
    Given user is on Import from Docker file page


@regression, @smoke
Scenario Outline: Create a workload from Docker file card on Add page : A-06-TC03
   Given user is on Import from Docker file page
   When user type docker git url as "<docker_git_url>"
   And select "<resource_type>" radio button in Resoruce type section
   And click Create button on Add page   
   Then user redirects to topology page
   And created workload "<name>" is present in topology page

Examples:
| docker_git_url                          | resource_type     | name          |
| https://github.com/sclorg/nodejs-ex.git | deployment        | nodejs-ex-git |
| https://github.com/sclorg/nginx-ex.git  | deployment config | nginx-ex-git  |


@regression
Scenario: Perform cancel operation on Dockerfile form should redirects the user to Add page : A-05-TC02
    Given user is on Import from Docker file page

