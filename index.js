const puppeteer = require('puppeteer');
const creds = require('./creds');

async function run() {
	if(creds.username && creds.password) {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
	
		await page.goto('http://github.com/login');
		await page.screenshot({ path: 'screenshots/githubLogin.png' });
		const USERNAME_SELECTOR = '#login_field';
		const PASSWORD_SELECTOR = '#password';
		const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';
		await page.click(USERNAME_SELECTOR);
		await page.keyboard.type(creds.username);
	
		await page.click(PASSWORD_SELECTOR);
		await page.keyboard.type(creds.password);
	
		await page.click(BUTTON_SELECTOR);
		await page.waitForNavigation();
		// await page.goto(`http://github.com/${creds.username}`);
		await page.goto(`http://github.com/mavharsha`);		
		await page.screenshot({ path: 'screenshots/githubProfile.png', fullPage: true });
		await page.pdf({path: 'pdfs/githubProfile.pdf'});
		browser.close();
		console.log('Browser closed.')
	} else{
		console.log('Please add your github creds to creds.js file. Thanks.')
	}
}

run();
