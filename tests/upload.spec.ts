import { test, expect } from '@playwright/test';
import UploadPage from '../pages/upload.page';
import path from 'path';

test.describe('Upload', ()=>{
    let uploadPage: UploadPage;

    test.beforeEach(async ({ page }) => {
        uploadPage = new UploadPage(page)
        await uploadPage.navigate()
        
      });
    
    test('Show page', async({page})=>{
        uploadPage = new UploadPage(page)

        await expect(uploadPage.title).toBeVisible()
        await expect(uploadPage.chooseBtn).toBeVisible()
        await expect(uploadPage.uploadBtn).toBeVisible()
    })

    test('Upload file', async({page})=>{
        uploadPage = new UploadPage(page)
        const filePath = path.join(__dirname, '../data/logo.jpg')

        await page.setInputFiles(uploadPage.uploadInput, filePath)

        await uploadPage.uploadBtn.click()

        await expect(uploadPage.title).toHaveText('File Uploaded!')
        
    })
})