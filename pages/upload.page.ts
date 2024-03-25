import { Locator, Page } from "@playwright/test";


export default class UploadPage {
    page: Page;
    title: Locator;
    chooseBtn: Locator;
    uploadBtn: Locator;
    uploadInput: string

    constructor(page){
        this.page = page;
        this.title = page.locator('//div[@class="example"]/h3')
        this.chooseBtn = page.locator('//input[@id="file-upload"]')
        this.uploadBtn = page.locator('//input[@id="file-submit"]')
        this.uploadInput = '//input[@id="file-upload"]'
    }

    async navigate():Promise<void>{
        await this.page.goto('/upload')
    }
}