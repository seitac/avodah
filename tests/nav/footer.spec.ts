import { test } from '../../fixtures/test-fixtures';
import { Footer } from '../../pages/components/Footer';

test.describe('[@smoke] Footer (COMPANY + RESOURCES)', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  // COMPANY (popup/intern)
  test('Company · Our Team', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToCompanyOurTeam();
  });

  test('Company · Join Our Team', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToCompanyJoinOurTeam();
  });

  test('Company · Privacy Policy', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToCompanyPrivacyPolicy();
  });

  test('Company · Advisory Council', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToCompanyAdvisoryCouncil();
  });

  // RESOURCES (intern)
  test('Resources · FAQs', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToResourcesFaqs();
  });

  test('Resources · Resources', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToResourcesResources();
  });

  test('Resources · Contact Us', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToResourcesContactUs();
  });

  // PRODUCTS (popup)
  test('Products - avodahMed', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToProductAvodahMed();
  });

  test('Products - avodahConnect', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToProductAvodahConnect();
  });

  // SOCIAL (popup)
  test('Social - Linkedin AvodahInc', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToLinkedInAvodahInc();
  });

  test('Social - Linkedin AvodahMed', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToLinkedInAvodahMed();
  });

  test('Social - Linkedin AvodahConnect', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToLinkedInAvodahConnect();
  });

  test('Social - Facebook AvodahInc', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToFacebookAvodahInc();
  });

  test('Social - Facebook AvodahMed', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToFacebookAvodahMed();
  });

  test('Social - Instagram AvodahInc', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToInstagramAvodahInc();
  });

  test('Social - Instagram AvodahMed', async ({ page }) => {
    const footer = new Footer(page);
    await footer.expectVisible();
    await footer.goToInstagramAvodahMed();
  });

});
