Feature: Apache Camel eventing
   As a user, I want to create camel eventing sources

   Background:
      Given user has installed knative apache camel operator
      And user is at developer perspective
      And user has selected namespace "aut-knative-camel-event-source"


   @regression, @smoke
   Scenario: CamelSource display in event sources add page - Kn-07-TC03
      Given user is at Add page
      When user clicks on "Event Source" card
      Then user will be redirected to page with header name "Event Sources"
      And user is able to see CamelSource event type
