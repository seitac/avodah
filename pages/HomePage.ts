import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { SEL } from '../utils/selectors';

export class HomePage extends BasePage {
  constructor(page: Page) { super(page); }

  get anyHeading(): Locator {
    return this.page.getByRole('heading').first();
  }

  get ctaExploreMed(): Locator {
    return this.page.getByRole('link', SEL.home.ctas.exploreMed.roleBtn);
  }
  get ctaExploreConnect(): Locator {
    return this.page.getByRole('link', SEL.home.ctas.exploreConnect.roleBtn);
  }

  get btnLearnMoreMed(): Locator {
    return this.page.locator(`a[aria-label="Learn More"][href*="avodahmed.com"]`).first();
  }
  get btnLearnMoreConnect(): Locator {
    return this.page.locator(`a[aria-label="Learn More"][href*="avodahconnect.com"]`).first();
  }

  async open() {
    await super.open('/');
    await expect(this.page).toHaveTitle(/Avodah/i);
  }

  private async clickCtaAndCapturePopup(cta: Locator) {
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      cta.click(),
    ]);
    await popup.waitForLoadState('domcontentloaded');
    return popup;
  }

  async openAvodahMedFromCTA() {
    const popup = await this.clickCtaAndCapturePopup(this.ctaExploreMed);
    await expect(popup).toHaveURL(SEL.home.ctas.exploreMed.hrefHost);
    return popup;
  }

  async openAvodahConnectFromCTA() {
    const popup = await this.clickCtaAndCapturePopup(this.ctaExploreConnect);
    await expect(popup).toHaveURL(SEL.home.ctas.exploreConnect.hrefHost);
    return popup;
  }

  async openAvodahMedFromLearnMore() {
    const popup = await this.clickCtaAndCapturePopup(this.btnLearnMoreMed);
    await expect(popup).toHaveURL(SEL.home.ctas.learnMoreMed.hrefHost);
    return popup;
  }

  async openAvodahConnectFromLearnMore() {
    const popup = await this.clickCtaAndCapturePopup(this.btnLearnMoreConnect);
    await expect(popup).toHaveURL(SEL.home.ctas.learnMoreConnect.hrefHost);
    return popup;
  }
}
