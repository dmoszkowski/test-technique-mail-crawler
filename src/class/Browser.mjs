import IWebBrowser from './interfaces/IWebBrowser.mjs';
import axios from 'axios';
import kleur from 'kleur';

export default class extends IWebBrowser {
    /**
     * Crée un navigateur HTTP
     * @param {boolean} verbose - Si true, affiche des messages dans la console lors du Chargement des pages.
     */
	constructor(verbose = false) {
		super();
		this.verbose = verbose;
	}

	/**
	 * Renvoie le contenu HTML d'une page à partir de son URL
	 * @param {string} url - URL de la page à récupérer
	 * @returns {string|null} - Le contenu de la page ou null si l'URL n'a pas pu être visitée
	 */
	async getHtml(url) {
		if (this.verbose) {
			console.warn(kleur.yellow("Chargement de la page :"),kleur.bold().yellow(url));
		}
		try {
			const {data} = await axios.get(url);
			if (this.verbose) {
				console.warn(kleur.bold().green("Chargement de page réussi :"),kleur.green(url));
			}
			return data;
		} catch(err) {
			if (this.verbose) {
				console.error(kleur.bold().red("Erreur du chargement de la page :"),kleur.red(url),kleur.bold().red(err));
			}
			return null;
		}
	}
};
