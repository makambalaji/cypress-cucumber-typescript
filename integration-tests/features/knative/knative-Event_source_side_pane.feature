Feature: Event Sources actions
    As a developer I want to perform actions on event sources

Background:
   Given open shift cluster is installed with Serverless operator
   And user is at developer perspecitve
   And open project namespace "aut-knative-event-source-actions"
   And one service "nodejs-ex-git-1" should be available


@regression, @smoke
Scenario: Side pane display of event source : Kn-12-TC01
   Given knative service, event source and sink connector are present in topology page
   When user clicks on event source "sink-binding"
   Then side pane dsiplays with header name as "sink-binding"


@regression, @smoke
Scenario: Move the sink via Action menu to link knative Service : Kn-12-TC02
   Given knative service, event source and sink connector are present in topology page
   When user clicks on event source "sink-binding"
   And select the "Move Sink" from Action menu present in right side pane
   Then modal displays with the header name "Move Sink" 
   And knative service dropdown is displayed in Move Sink modal
