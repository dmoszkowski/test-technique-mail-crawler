import Tests from './class/Tests.mjs';
import Browser from './class/Browser.mjs';
import TestBrowser from './class/TestBrowser.mjs';
import Crawler from './class/Crawler.mjs';

const t = new Tests();
const browser = new Browser();

// Test Navigateur - Adresse non trouvée
await t.test(()=>browser.getHtml('invalidURL'),{result:null});

// Test crawl d'une page non trouvée avec le navigateur normal
await t.test(()=>Crawler.getEmailsInPageAndChildPages(browser,'invalidURL',3),{result:[]});

// Navigateur virtuel :

const testPages = {
	'http://test/index' : `
		<a href="mailto:mail.index@test" />
		<a href="mailto:duplicate@test" />
		<a href="page1" />
		<a href="subdir/page2" />
	`,
	'http://test/page1' : `
		<a href="mailto:mail.page1@test" />
		<a href="page3" />
		<a href="http://othersite/" />
	`,
	'http://test/page2' : `<a href="mailto:thisshouldnotwork@test" />`,
	'http://test/page3' : `<a href="mailto:mail.page3@test" />`,
	'http://test/subdir/page2' : `
		<a href="mailto:mail.page2@test" />
		<a href="mailto:duplicate@test" />
		<a href="page3" />
		<a href="/page4" />
	`,
	'http://test/page4' : `<a href="mailto:mail.page4@test" />`,
	'http://test/subdir/page3' : `<a href="mailto:mail.subdir.page3@test" />`,
	'http://test/subdir/page4' : `<a href="mailto:thisshouldnotwork@test" />`,
	'http://othersite/' : `<a href="mailto:other.site.mail@othersite.test" />`,
	'http://mailFormats' : `
		<a href="mailto:test.mail1@test.test" />
		<a href="mailto:Test%20Mail%20<test.mail2@test.test>" />
		<a href="mailto:test.mail3@test.test?subject=Test%20mail%20test3&body=Ceci%20est%20un%20test" />
		<a href="mailto:test.mail4@test.test,test.mail5@test.test" />
		<a href="mailto:Test%20Mail6%20<test.mail6@test.test>,%20Test%20Mail7%20<test.mail7@test.test>?subject=Test%20mail%20test3&body=Ceci%20est%20un%20test" />
	`,
};

const testBrowser = new TestBrowser(testPages);

// Test Navigateur virtuel - Adresse non trouvée
await t.test(()=>testBrowser.getHtml('http://test/404'),{result:null});

// Test Navigateur virtuel - Adresse trouvée
await t.test(()=>testBrowser.getHtml('http://test/page1'),{result:testPages['http://test/page1']});

// Test crawl d'une page non trouvée avec le navigateur virtuel
await t.test(()=>Crawler.getEmailsInPageAndChildPages(testBrowser,'http://test/404',3),{result:[]});


// Tests crawl à différentes profondeurs à partir de l'index avec le navigateur virtuel
await t.test(()=>Crawler.getEmailsInPageAndChildPages(testBrowser,'http://test/index',-1),{result:[]});

await t.test(()=>Crawler.getEmailsInPageAndChildPages(testBrowser,'http://test/index',0),{
	result:'duplicate@test,mail.index@test'.split(','),
});

await t.test(()=>Crawler.getEmailsInPageAndChildPages(testBrowser,'http://test/index',1),{
	result:'duplicate@test,mail.index@test,mail.page1@test,mail.page2@test'.split(','),
});

await t.test(()=>Crawler.getEmailsInPageAndChildPages(testBrowser,'http://test/index',8),{
	result:'duplicate@test,mail.index@test,mail.page1@test,mail.page2@test,mail.page3@test,mail.page4@test,mail.subdir.page3@test,other.site.mail@othersite.test'.split(','),
});

// Test de différents formats d'adreses mail
await t.test(()=>Crawler.getEmailsInPageAndChildPages(testBrowser,'http://mailFormats',1),{
	result:'test.mail1@test.test,test.mail2@test.test,test.mail3@test.test,test.mail4@test.test,test.mail5@test.test,test.mail6@test.test,test.mail7@test.test'.split(','),
});

process.exit(t.failed ? 1 : 0);
