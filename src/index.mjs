import kleur from 'kleur';
import Browser from './class/Browser.mjs';
import Crawler from './class/Crawler.mjs';

(async ()=>{
	try {
		const startURL = process.argv[2];
		const maxDepth = (1 * process.argv[3]) || 0;
		if (!startURL) {
			throw "Veuillez indiquer l'URL de départ.";
		}
		const browser = new Browser(true);
		const result = await Crawler.getEmailsInPageAndChildPages(browser, startURL, maxDepth);
		console.warn(kleur.bold().green(`${result.length} adresses mail trouvées :`));
		console.info(kleur.bold().cyan(result.join('\n')));
		process.exit(0);
	} catch(err) {
		console.error(kleur.bold().red(err));
		process.exit(1);
	}
})();
