import kleur from 'kleur';

export default class {
    /**
     * Crée un ensemble de tests
     */
	constructor() {
		this.testIndex = 1;
		this.failed = false;
	}

	/**
	 * Exécute un test et vérifie le résultat
	 * @param {function} testFunc - test à exécuter
	 * @param {Object} expected - résultats attendus
	 * @param {boolean} [expected.error] - si true, le test est censé déclencher une erreur
	 * @param {*} [expected.result] - si défini, le résultat attendu
	 * @param {string} [name] - nom du test (automatique si non défini)
	 */
	async test (testFunc, expected = {}, name = "") {
		const testName = name || `Test N°${this.testIndex}`;
		this.testIndex++;
		const testEnd = (failed = false) => {
			if (failed) {
				this.failed = true;
				console.error(kleur.bold().red(`${testName} - Échec :`), kleur.red(failed));
			} else {
				console.error(kleur.bold().green(`${testName} - Réussi`));
			}
		}
		try {
			const actualResult = await testFunc();
			if (expected.error) {
				testEnd("Erreur attendue non déclenchée");
				return;
			}
			if ('result' in expected) {
				let compare = false;
				if (typeof(expected.result) === 'object') {
					compare = JSON.stringify(expected.result) === JSON.stringify(actualResult);
				} else {
					compare = expected.result === actualResult;
				}
				if (compare) {
					testEnd();
				} else {
					testEnd("Résultat différent du résultat attendu");
					console.log(kleur.bold().red("Résultat attendu :"),expected.result);
					console.log(kleur.bold().red("Résultat obtenu :"),actualResult);
				}
			} else {
				testEnd();
			}
		} catch (err) {
			if (expected.error) {
				testEnd();
			} else {
				testEnd(err);
			}
		}
	}
};
