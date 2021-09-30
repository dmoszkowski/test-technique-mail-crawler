import IAmTheTest from './interfaces/IAmTheTest.mjs';

const aHrefRegex = /<a\s[^>]*\bhref\s*=\s*('([^']*)'|"([^"]*)")[^>]*>/gi;
const mailtoRegex = /^mailto:([^?]+)/;
const mailRegex = /[^<>@\s]+@[^<>@\s]+/;
const absoluteURLRegex = /^https?:\/\/[^#]+/;

export default class extends IAmTheTest {
	/**
	 * Crawle les pages liées à la recherche d'adresses mails
	 * @param {IWebBrowser} browser - navigateur à utiliser pour récupérer le contenu des pages
	 * @param {string} url - URL de départ à partir de laquelle on commence à crawler
	 * @param {number} maximumDepth - Profndeur maximum : nombre maximum de liens successifs à suivre à partir de l'URL de départ
	 * @returns {string[]} - Tableau contenant la liste des adresses mail trouvées
	 */
	static async getEmailsInPageAndChildPages(browser,url,maximumDepth) {
		const history = {};
		const mails = {};
		async function crawlPages(url,maximumDepth) {
			if ((maximumDepth < 0) || (url in history)) {
				return;
			}
			history[url] = true;
			const htmlData = await(browser.getHtml(url));
			if ((!htmlData) || (typeof(htmlData) !== 'string')) {
				return;
			}

			let match;
			const nextURLs = {};
			aHrefRegex.lastIndex = 0;
			while (match = aHrefRegex.exec(htmlData)) {
				const link = match[2] || match [3];
				if ((!link) || link.startsWith('#') || link.startsWith('javascript:')) {
					continue;
				}
				const mailtoMatch = link.match(mailtoRegex);
				if (mailtoMatch) {
					mailtoMatch[1].split(',').forEach(mail=>{
						const mailMatch = mail.match(mailRegex);
						if (mailMatch) {
							mails[mailMatch[0]] = true;
						}
					});
				} else {
					const nextUrl = new URL(link,url);
					nextUrl.hash = '';
					nextURLs[nextUrl.href] = true;
				}
			}
			const promises = Object.keys(nextURLs).map(oneURL=>crawlPages(oneURL,maximumDepth - 1));
			await Promise.all(promises);
			return;
		}
		await(crawlPages(url,maximumDepth));
		const resultMails = Object.keys(mails);
		resultMails.sort();
		return resultMails;
	}
};
