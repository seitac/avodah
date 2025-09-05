import { Page, Locator, expect } from '@playwright/test';
import { Header } from './components/Header';

/**
 * BasePage puts together the common stuff for all pages:
 * - Keeps a reference to the Page
 * - Gives you handy helpers like open() and byTestId()
 */
export class BasePage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }
  
  get header(): Header {
   return new Header(this.page);
  }

/**
 * Lets you navigate with relative routes using use.baseURL from the config.
 * Also checks the HTTP response is OK, so it fails fast if there’s a 404/500.
 */
  async open(path: string = '/') {
    const resp = await this.page.goto(path);
    expect(resp?.ok()).toBeTruthy();
  }

/** Quick shortcut for stable selectors using data-testid */
  byTestId(id: string): Locator {
    return this.page.getByTestId(id);
  }
}

