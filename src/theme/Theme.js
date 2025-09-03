import * as atoms from "./atoms/index.js"
import * as molecules from "./molecules/index.js"
import * as organisms from "./organisms/index.js"

/**
 * Universal UI theme foundation.
 * Holds atoms, molecules, and organisms styling configs.
 */
export default class Theme {
	/** @type {Object} */
	static atoms = atoms
	/** @type {Object} */
	static molecules = molecules
	/** @type {Object} */
	static organisms = organisms
}