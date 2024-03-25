import { test, expect } from '@playwright/test';
import HomePage from '../pages/login.page';


const flashLogoutText = 'You logged out of the secure area!'
const exampleText='Welcome to the Secure Area. When you are done click logout below.'
const exampleTitle='Secure Area'
const loginData = {
    username: 'tomsmith',
    password: 'SuperSecretPassword!'
}
let homePage: HomePage;


test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.navigate()
    
  });

test.describe('Login', ()=>{
    
    test('Show title', async({page})=>{
        await expect(page).toHaveTitle('The Internet')
    })

    test('Input visible', async({page})=>{
        homePage = new HomePage(page)

        await expect(homePage.loginInput).toBeVisible()
        await expect(homePage.passwordInput).toBeVisible()
    })

    test('Input credits', async({page})=>{
        homePage = new HomePage(page)

        await homePage.loginInput.fill(loginData.username)
        await homePage.passwordInput.fill(loginData.password)
        await homePage.loginBtn.click()
        await page.waitForURL('https://the-internet.herokuapp.com/secure')
        await expect(homePage.flashMessage).toBeVisible()
        await expect(homePage.flashMessage).toHaveClass('flash success')
    })

    test('Log Out page', async({page})=>{
        homePage = new HomePage(page)

        await homePage.loginInput.fill(loginData.username)
        await homePage.passwordInput.fill(loginData.password)
        await homePage.loginBtn.click()
        await expect(homePage.flashMessage).toBeVisible()
        await homePage.verifyFlashClass('flash success')
        await expect(homePage.title).toContainText(exampleTitle)
        await expect(homePage.text).toHaveText(exampleText)
     })

    test('Log Out from page', async({page})=>{
        homePage = new HomePage(page)

        await homePage.loginInput.fill(loginData.username)
        await homePage.passwordInput.fill(loginData.password)
        await homePage.loginBtn.click()

        await expect(homePage.flashMessage).toBeVisible()
        await homePage.verifyFlashClass('flash success')

        await homePage.closeFlashBtn.click()
        await expect(homePage.flashMessage).toBeHidden()
        await homePage.logoutBtn.click()

        await expect(homePage.flashMessage).toBeVisible()
        await homePage.verifyFlashClass('flash success')
        await expect(homePage.flashMessage).toContainText(flashLogoutText)
     })
    
})