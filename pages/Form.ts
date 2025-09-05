import { expect, Page, Locator } from '@playwright/test';
import { SEL } from '../utils/selectors';

export class ContactPage {
  constructor(private page: Page) {}


  private async waitFormReady() {
    await this.page.locator(SEL.contact.formReady.css).first().waitFor({ state: 'attached', timeout: 5000 });
    await this.page.waitForTimeout(500);
  }

  async openDirect() {
    await this.page.goto('https://www.avodah.com/contact-us', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveURL(/\/contact-us/i);
    await this.waitFormReady();
  }

  // ===== Getters with solid CSS selectors =====

  private L(css: string): Locator { return this.page.locator(css).first(); }

  // step 1
  get firstName() { return this.L(SEL.contact.firstName.css); }
  get lastName()  { return this.L(SEL.contact.lastName.css); }
  get email()     { return this.L(SEL.contact.email.css); }
  get company()   { return this.L(SEL.contact.company.css); }
  get role()      { return this.L(SEL.contact.role.css); }
  get nextBtn()   { return this.L(SEL.contact.nextBtn.css); }

  // step 2
  get phone()     { return this.L(SEL.contact.phone.css); }
  get message()   { return this.L(SEL.contact.message.css); }
  get website()   { return this.L(SEL.contact.website.css); }
  get submitBtn() { return this.L(SEL.contact.submitBtn.css); }

  // ===== Expectations =====
  async expectStep1Loaded() {
    await this.waitFormReady();
    await expect(this.email).toBeVisible({ timeout: 3000 });
  }

  async expectStep2Loaded() {
     await expect(this.message).toBeVisible({ timeout: 5000 });
  }

  // ===== Actions =====
  async fillStep1(data: {
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    role?: string;
    phone?: string;
  }) {
    await this.expectStep1Loaded();

    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    if (data.company) await this.company.fill(data.company);
    if (data.role)    await this.role.fill(data.role);
    if (data.phone)   await this.phone.fill(data.phone);
  }

  async goNext() {
    await Promise.all([
      this.page.waitForLoadState('networkidle').catch(() => {}),
      this.nextBtn.click(),
    ]);
    await this.expectStep2Loaded();
  }

  async fillStep2(data: { message: string; website?: string }) {
    await this.expectStep2Loaded();
    await this.message.fill(data.message);
    if (data.website) await this.website.fill(data.website);
  }
}
