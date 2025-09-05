import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/ContactPage';

test('[Contact] Completar Interest', async ({ page }) => {
  const contact = new ContactPage(page);
  await contact.openDirect();

  // step 1
  await contact.fillFirstName('Sacha');
  await contact.fillLastName('Gianelli');
  await contact.fillmail('testing@test.com');
  await contact.expectEmailInvalidError();
  await contact.fillcompanyName('Fligoo');
  await contact.clickNext();

  // step 2
  await contact.selectInterest('Medical');
  await contact.fillPhone('+54 911 2222 3333');
  await contact.fillMessage('Mensaje de prueba automatizada.');

  await contact.submitForm();

  // error verification
  await contact.expectEmailInvalidError();

  // generic error
  await contact.expectAnyErrorAlert(/Please enter a valid email address|some fields contain errors/i);
});
