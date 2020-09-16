import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { addOptions } from '../../constants/add';

When('user selects From Catalog card from add page', () => {
  addPage.selectCardFromOptions(addOptions.Catalog)
});

When('user searches {string} card from catalog page', (a: string) => {
  // TODO: implement step
});

When('user selects {string} option from Type section', (a: string) => {
  // TODO: implement step
});

When('user selects Template card {string} from catalog page', (a: string) => {
  // TODO: implement step
});

When('user clicks create button on Instantiate Template page with default values', () => {
  // TODO: implement step
});

Then('user is ale to see Operator Backed, Helm Charts, Builder Image, Template, Service Class types are not selected by default', () => {
  // TODO: implement step
});

Then('search option is displayed in Developer Catalog page', () => {
  // TODO: implement step
});

Then('GroupBy filter is displayed with options None, Operator', () => {
  // TODO: implement step
});

Then('all cards are displayed in Developer Catalog page', () => {
  // TODO: implement step
});

Then('user is able to see cards with name contains {string}', (a: string) => {
  // TODO: implement step
});

Then('user is able to see cards related to {string}', (a: string) => {
  // TODO: implement step
});

Then('user will be redirected to Developer Catalog page', () => {

});

When('user eneters Name as {string} in Instantiate Template page', (name: string) => {

});