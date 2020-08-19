import { catalogPageObj } from "./catalog_page";

export const yamlPage = {
    clickOnCreateButton:() => cy.get(catalogPageObj.create).click(),
    clickOnCancelButton:() => cy.get(catalogPageObj.mariaDBTemplate.cancel).click(),
  }