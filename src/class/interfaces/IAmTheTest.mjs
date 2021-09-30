
export default class {
	/**
	 * Crawle les pages liées à la recherche d'adresses mails
	 * @param {IWebBrowser} browser - navigateur à utiliser pour récupérer le contenu des pages
	 * @param {string} url - URL de départ à partir de laquelle on commence à crawler
	 * @param {number} maximumDepth - Profndeur maximum : nombre maximum de liens successifs à suivre à partir de l'URL de départ
	 * @returns {string[]} - Tableau contenant la liste des adresses mail trouvées
	 */
	static async getEmailsInPageAndChildPages(browser,url,maximumDepth) {
		return [];
	}
};
