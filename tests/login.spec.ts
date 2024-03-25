import { test, expect } from '@playwright/test';
const loginInput = '//input[@id="username"]'
const passwordInput = '//input[@id="password"]'
const loginBtn = '//button[@type="submit"]'
const logout = '//a[@class="button secondary radius"]'
const flashMessage = '//div[@id="flash"]'
const closeFlash = '//a[@class="close"]'
const flashLogoutText = 'You logged out of the secure area!'
const text = 'div[@id="content"//h4]'
const exampleText='Welcome to the Secure Area. When you are done click logout below.'
const title = 'div[@id="content"//h2]'
const exampleTitle='Secure Area'
const loginData = {
    username: 'tomsmith',
    password: 'SuperSecretPassword!'
}


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
  });

test.describe('Login', ()=>{
    test('Show title', async({page})=>{
        await expect(page).toHaveTitle('The Internet')
    })

    test('Input visible', async({page})=>{
        await expect(page.locator(loginInput)).toBeVisible()
        await expect(page.locator(passwordInput)).toBeVisible()
    })

    test('Input credits', async({page})=>{
       await page.locator(loginInput).fill(loginData.username)
       await page.locator(passwordInput).fill(loginData.password)
       await page.locator(loginBtn).click()
        await expect(page.locator(flashMessage)).toBeVisible()
        await expect(page.locator(flashMessage)).toHaveClass('flash success')
    })

    test('Log Out page', async({page})=>{
        await page.locator(loginInput).fill(loginData.username)
        await page.locator(passwordInput).fill(loginData.password)
        await page.locator(loginBtn).click()
        await expect(page.locator(flashMessage)).toBeVisible()
        await expect(page.locator(flashMessage)).toHaveClass('flash success')
        await expect(page.locator(title)).toContainText(exampleTitle)
        await expect(page.locator(text)).toHaveText(exampleText)
     })

    test('Log Out from page', async({page})=>{
        await page.locator(loginInput).fill(loginData.username)
        await page.locator(passwordInput).fill(loginData.password)
        await page.locator(loginBtn).click()

        await expect(page.locator(flashMessage)).toBeVisible()
        await expect(page.locator(flashMessage)).toHaveClass('flash success')

        await page.locator(closeFlash).click()
        await expect(page.locator(flashMessage)).not.toBeVisible()
        await page.locator(logout).click()

        await expect(page.locator(flashMessage)).toBeVisible()
        await expect(page.locator(flashMessage)).toHaveClass('flash success')
        await expect(page.locator(flashMessage)).toContainText(flashLogoutText)
     })
    
})