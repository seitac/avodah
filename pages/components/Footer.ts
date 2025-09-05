import { Page, Locator, expect } from '@playwright/test';
import { SEL } from '../../utils/selectors';

export class Footer {
  constructor(private page: Page) {}

  get root(): Locator {
    return this.page.locator('footer');
  }

  async ensureVisible() {
    await this.root.scrollIntoViewIfNeeded().catch(() => {});
    await expect(this.root).toBeVisible({ timeout: 5000 });
  }

  async expectVisible() {
    await this.ensureVisible();
  }

  /** Can be a popup or internal */
  private async clickPopupOrInternal(locator: Locator, expectedUrl: RegExp) {
    await expect(locator).toBeVisible();

    const popupPromise = this.page.waitForEvent('popup', { timeout: 1500 }).catch(() => null);
    const urlPromise   = this.page.waitForURL(expectedUrl, { timeout: 2500 }).catch(() => null);

    await locator.click({ force: true });

    const [popup, url] = await Promise.all([popupPromise, urlPromise]);

    if (popup) {
      await popup.close().catch(() => {});
      return;
    }

    if (url) {
      await expect(this.page.getByRole('heading').first()).toBeVisible({ timeout: 5000 });
      return;
    }

    const latePopup = await this.page.waitForEvent('popup', { timeout: 1000 }).catch(() => null);
    if (latePopup) {
      await latePopup.close().catch(() => {});
      return;
    }

    throw new Error('No popup after clicking the footer');
  }

  private async clickExternal(locator: Locator) {
    await expect(locator).toBeVisible();
    const popup = await Promise.race([
      this.page.waitForEvent('popup', { timeout: 3500 }),
      (async () => { await locator.click({ force: true }); return null as any; })(),
    ]).catch(() => null);
    if (popup) await popup.close().catch(() => {});
  }

  private async clickInternal(locator: Locator, expectedUrl: RegExp) {
    await expect(locator).toBeVisible();
    await Promise.all([
      this.page.waitForURL(expectedUrl),
      locator.click({ force: true }),
    ]);
    await expect(this.page.getByRole('heading').first()).toBeVisible({ timeout: 5000 });
  }

  // ───────── COMPANY (popup o interno) ─────────
  async goToCompanyOurTeam()        { await this.ensureVisible(); await this.clickPopupOrInternal(this.page.locator(SEL.footer.company.ourTeam.css).first(), SEL.footer.company.ourTeam.expectedUrl); }
  async goToCompanyJoinOurTeam()    { await this.ensureVisible(); await this.clickPopupOrInternal(this.page.locator(SEL.footer.company.joinOurTeam.css).first(), SEL.footer.company.joinOurTeam.expectedUrl); }
  async goToCompanyPrivacyPolicy()  { await this.ensureVisible(); await this.clickPopupOrInternal(this.page.locator(SEL.footer.company.privacyPolicy.css).first(), SEL.footer.company.privacyPolicy.expectedUrl); }
  async goToCompanyAdvisoryCouncil(){ await this.ensureVisible(); await this.clickPopupOrInternal(this.page.locator(SEL.footer.company.advisory.css).first(), SEL.footer.company.advisory.expectedUrl); }

  // ───────── PRODUCTS (popup) ─────────
  async goToProductAvodahMed()      { await this.ensureVisible(); await this.clickExternal(this.page.locator(SEL.footer.products.avodahMed.css).first()); }
  async goToProductAvodahConnect()  { await this.ensureVisible(); await this.clickExternal(this.page.locator(SEL.footer.products.avodahConnect.css).first()); }

  // ───────── RESOURCES (interno) ─────────
  async goToResourcesFaqs()         { await this.ensureVisible(); await this.clickInternal(this.page.locator(SEL.footer.resources.faqs.css).first(), SEL.footer.resources.faqs.expectedUrl); }
  async goToResourcesResources()    { await this.ensureVisible(); await this.clickInternal(this.page.locator(SEL.footer.resources.resources.css).first(), SEL.footer.resources.resources.expectedUrl); }
  async goToResourcesContactUs()    { await this.ensureVisible(); await this.clickInternal(this.page.locator(SEL.footer.resources.contactUs.css).first(), SEL.footer.resources.contactUs.expectedUrl); }

  // ───────── SOCIAL (popup) ─────────
  async goToLinkedInAvodahInc()     { await this.ensureVisible(); await this.clickExternal(this.page.locator(SEL.footer.social.liAvodahInc.css).first()); }
  async goToLinkedInAvodahMed()     { await this.ensureVisible(); await this.clickExternal(this.page.locator(SEL.footer.social.liAvodahMed.css).first()); }
  async goToLinkedInAvodahConnect() { await this.ensureVisible(); await this.clickExternal(this.page.locator(SEL.footer.social.liAvodahConnect.css).first()); }
  async goToFacebookAvodahInc()     { await this.ensureVisible(); await this.clickExternal(this.page.locator(SEL.footer.social.fbAvodahInc.css).first()); }
  async goToFacebookAvodahMed()     { await this.ensureVisible(); await this.clickExternal(this.page.locator(SEL.footer.social.fbAvodahMed.css).first()); }
  async goToInstagramAvodahInc()    { await this.ensureVisible(); await this.clickExternal(this.page.locator(SEL.footer.social.igAvodahInc.css).first()); }
  async goToInstagramAvodahMed()    { await this.ensureVisible(); await this.clickExternal(this.page.locator(SEL.footer.social.igAvodahMed.css).first()); }
}
