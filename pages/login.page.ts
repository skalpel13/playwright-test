import {Page, Locator, expect} from '@playwright/test'

export default class HomePage{
    page: Page;
    loginInput: Locator;
    passwordInput: Locator;
    loginBtn: Locator;
    flashMessage: Locator;
    closeFlashBtn: Locator;
    title: Locator;
    text: Locator;
    logoutBtn: Locator;

    constructor(page){
        this.page =page;
        this.loginInput = page.locator('//input[@id="username"]');
        this.passwordInput = page.locator('//input[@id="password"]')
        this.loginBtn = page.locator('//button[@type="submit"]')
        this.flashMessage = page.locator('//div[@id="flash"]')
        this.closeFlashBtn = page.locator('//a[@class="close"]')
        this.title = page.locator('//div[@class="example"]//h2')
        this.text = page.locator('//div[@id="content"]//h4')
        this.logoutBtn = page.locator('//a[@class="button secondary radius"]')
    }

    async navigate():Promise<void>{
        await this.page.goto('https://the-internet.herokuapp.com/login')
    }
    async verifyFlashClass(className: string):Promise<void>{
        await expect(this.flashMessage).toHaveClass(className)
    }
}
