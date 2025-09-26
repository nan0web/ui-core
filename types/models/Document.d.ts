export default class Document {
    /**
     * @param {object} input
     * @returns {Document}
     */
    static from(input: object): Document;
    /**
     * @param {object} [input]
     * @param {Array<object>} [input.$content=[]]
     * @param {string} [input.$lang="en"]
     * @param {any} [input.nav=new Navigation()]
     */
    constructor(input?: {
        $content?: any[] | undefined;
        $lang?: string | undefined;
        nav?: any;
    } | undefined);
    /**
     * Content configuration for the document page.
     * @type {Element[]}
     */
    $content: Element[];
    /** @type {string} */
    $lang: string;
    /** @type {Navigation} */
    nav: Navigation;
    /**
     * @param {string} type
     * @returns {Array<object>}
     */
    getBlocksByType(type: string): Array<object>;
}
import Element from "../Element.js";
import Navigation from "./Navigation.js";
