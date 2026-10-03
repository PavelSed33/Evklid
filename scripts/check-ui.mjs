import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';
const server=spawn('python3',['-m','http.server','4173','--bind','127.0.0.1'],{stdio:'ignore'});
let browser;
try{
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4173')).ok)break}catch{}await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch();await mkdir('screenshots',{recursive:true});
 for(const [width,height]of [[320,740],[390,844],[600,900],[768,1024],[844,390],[1024,768],[1440,900],[1920,1080]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const size=await page.evaluate(()=>({actual:document.documentElement.scrollWidth,expected:innerWidth}));assert(size.actual<=width+1,`Overflow ${width}: ${size.actual}`);
  if(width<=1120){assert.equal(await page.locator('.nav').evaluate(el=>el.inert),true);await page.locator('.burger').click();assert.equal(await page.locator('.burger').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.burger').getAttribute('aria-expanded'),'false');await page.locator('.burger').click();await page.locator('.nav a[href="#work"]').click();assert.equal(await page.locator('.burger').getAttribute('aria-expanded'),'false');}
  for(const key of ['one','two','three','four']){await page.locator(`[data-path="${key}"]`).click();assert.equal(await page.locator(`[data-target="${key}"]`).isVisible(),true);assert.equal(await page.locator('[role="tabpanel"]:visible').count(),1);}
  await page.locator('[data-path="one"]').click();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('[data-path="two"]').getAttribute('aria-selected'),'true');
  const question=page.locator('.question-toggle').nth(1);await question.click();assert.equal(await question.getAttribute('aria-expanded'),'true');await page.keyboard.press('Enter');assert.equal(await question.getAttribute('aria-expanded'),'false');
  await page.locator('.search .search_button').click();await page.locator('.search-content-form__input').fill('абракадабра123');await page.locator('.search-content-form__button-submit').click();assert.match(await page.locator('.search-status').textContent(),/Ничего не найдено/);await page.keyboard.press('Escape');assert.equal(await page.locator('.search-content__form').isVisible(),false);
  await page.locator('.hero-content__btn').click();assert.equal(await page.locator('.footer__form [name="name"]').evaluate(el=>el===document.activeElement),true);
  await page.locator('.footer__form [name="name"]').fill('Проверка');await page.locator('.footer__form [name="email"]').fill('invalid');await page.locator('.checkbox-text').click();assert.equal(await page.locator('.checkbox').isChecked(),true);await page.locator('.form__btn').click();assert.equal(await page.locator('.form-status').textContent(),'');
  await page.locator('.footer__form [name="email"]').fill('test@example.com');await page.locator('.form__btn').click();assert.match(await page.locator('.form-status').textContent(),/не отправлена/);
  await page.locator('.work-left__btn--border:visible').click();assert.equal(await page.locator('dialog').isVisible(),true);await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').isVisible(),false);
  await page.locator('[data-path="one"]').click();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`screenshots/${width}x${height}.png`,fullPage:true});assert.deepEqual(errors,[]);console.log(`PASS ${width}x${height}`);await page.close();
 }
}finally{await browser?.close();server.kill();}
