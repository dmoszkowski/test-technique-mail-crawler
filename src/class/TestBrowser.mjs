import IWebBrowser from './interfaces/IWebBrowser.mjs';

export default class extends IWebBrowser {
    /**
     * Crée un navigateur virtuel pour réaliser les tests
     * @param {Object} virtualPages - Objet associant un ensemble d'URL virtuelles à du contenu HTML
     */
	constructor(virtualPages) {
		super();
		this.virtualPages = virtualPages;
	}

	/**
	 * Renvoie le contenu HTML d'une page à partir de son URL
	 * @param {string} url - URL de la page à récupérer
	 * @returns {string|null} - Le contenu de la page ou null si l'URL n'a pas pu être visitée
	 */
	async getHtml(url) {
		if (url in this.virtualPages) {
			return this.virtualPages[url];
		} else {
			return null;
		}
	}
};
