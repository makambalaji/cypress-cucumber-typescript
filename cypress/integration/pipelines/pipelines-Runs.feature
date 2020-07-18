Feature: Pipeline Runs
    As a user I want to start pipeline, rerun, delete pipeline run

Background:
    Given openshift cluster is installed with pipeline operator
    And user is at the project namespace "aut-mb-pipelines-runs-demo-4" in dev perspecitve
    And user is at pipelines page


@regression
Scenario Outline: Start pipeline popup details for pipeline with one resource : P-04-TC02    
    Given pipeline "<pipeline_name>" consists of task "<task_name>" with one git resource
    When user selects "Start" option from kebab menu for pipeline "<pipeline_name>"
    Then Start Pipeline popup displays with Git Resources, Advanced Options sections
    And start button is disabled 

Examples:
| pipeline_name           | task_name        |
| pipe-task-with-resoruce | openshift-client |


@regression, @smoke
Scenario Outline: Start the pipeline with one resource : P-04-TC03, P-05- TC01, P-05- TC02
    Given pipeline "<pipeline_name>" consists of task "<task_name>" with one git resource
    When user selects "Start" option from kebab menu for pipeline "<pipeline_name>"
    And fills the details in Start Pipeline popup
    Then page redirects to Pipeline Run Details page
    And Pipeline run status displays as "Running"
    And pipeline run details for "<pipeline_name>" display in Pipelines page

Examples:
| pipeline_name             | task_name        |
| pipe-task-with-resoruce-1 | openshift-client |


@regression, @smoke
Scenario Outline: Pipeline Run Details page for pipeline without resource : P-06-TC03
    Given pipeline run is displayed for "<pipeline_name>"
    When user clicks Last Run value of "<pipeline_name>"
    Then user redirects to Pipeline Run Details page
    And user is able to see Details, YAML and Logs tabs
    And Details tab is displayed with field names Name, Namespace, Labels, Annotations, Created At, Owner, Status, Pipeline and Triggered by
    And Actions dropdown display on the top right corner of the page

Examples:
| pipeline_name             |
| pipe-task-with-resoruce-2 |


@regression
Scenario: Actions on Pipeline Run Details page : P-06-TC06
    Given user is at the Pipeline Run Details page
    When user clicks Actions menu on the top right corner of the page
    Then Actions menu display with the options "Rerun", "Delete Pipeline Run"


@regression
Scenario: Rerun the Pipeline Run from pipeline run details page: P-06-TC01
    Given user is at the Pipeline Run Details page
    When user selects "Rerun" option from the Actions menu 
    Then status displays as "Running" in pipeline run details page


@regression, @smoke
Scenario: Rerun the Pipeline Run from pipeline runs page : P-06-TC02
    Given user is at the Pipeline Runs page
    When user selects "Rerun" option from kebab menu 
    Then page redirects to pipeline run details page


@regression, @smoke
Scenario Outline: Pipeline Run Details page for a pipeline with resource : P-06-TC04
    Given pipeline run is displayed for "<pipeline_name>"
    When user clicks Last Run value of the pipeline "<pipeline_name>"
    Then user redirects to Pipeline Run Details page
    And Pipeline Resources field will be displayed

Examples:
| pipeline_name             |
| pipe-task-with-resoruce-2 |


@regression, @smoke
Scenario: Filter the pipeline runs based on status : P-06-TC07
    Given user is at the Pipeline Runs page


@regression, @smoke
Scenario: Start the pipeline from Pipeline Details page : P-04-TC04
    Given user is at the Pipeline Runs page


@regression, @manual
Scenario Outline: Download the logs from Pipeline Details page : P-04-TC05
    Given user is at the Pipeline Details page


@regression
Scenario: kebab menu options in pipelines page : P-04-TC07
    Given user is at Pipelines page


@regression
Scenario: Start LastRun from topolgy page : P-05- TC04
    Given user is at the topolgy page
    And one pipeline run is completed with the workload


@regression
Scenario: Start LastRun from topolgy page : P-05- TC04
    Given user is at the topolgy page
    And one pipeline run is completed with the workload


@regression, @smoke
Scenario: Maximum pipeline runs display in topology page: P-05-TC05
    Given user is at the topolgy page
    And 5 pipeline runs are completed with the workload


@regression, @manual
Scenario: Download the logs from Pipeline Details page after pipleine run: P-05-TC06
    Given user is at the Pipeline Details page


Scenario: Start the pipeline wtih cancelled tasks: P-07- TC04
    Given user is at the Pipeline Details page
    And pi[peline run is available with cancelled tasks


Scenario: Start the pipeline wtih failed tasks: P-07- TC05
    Given user is at the Pipeline Details page
    And pi[peline run is available with failed tasks


Scenario: Start the pipeline wtih successful tasks: P-07- TC06
    Given user is at the Pipeline Details page
    And pi[peline run is available with failed tasks
