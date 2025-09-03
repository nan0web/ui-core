/**
 * @file Element — модель декларативного UI-блоку.
 * Формат: { Button: [...], $variant: 'info', $onClick: fn }
 * Агностична до фреймворку.
 */
export default class Element {
    /** @type {Record<string, string | ((val: any, key: string) => Record<string, any>)>} */
    static PROP_ALIASES: Record<string, string | ((val: any, key: string) => Record<string, any>)>;
    /**
     * Фабричний метод створення екземплярів.
     * @param {Object} input
     * @returns {Element}
     */
    static from(input: any): Element;
    /**
     * Парсер $-пропсів.
     * Перетворює, наприклад:
     *   - $style="color:red;font-size:14px" → { style: { color: 'red', 'font-size': '14px' } }
     *   - $onClick=fn → { onClick: fn }
     *   - $ariaHidden=true → { 'aria-hidden': true }
     *
     * @param {string} key - Назва пропсу
     * @param {any} value - Значення
     * @returns {Object} - Об’єкт { propName: newVal }
     */
    static parseProp(key: string, value: any): any;
    /**
     * Парсить рядковий стиль (формат CSS).
     * @param {string} styleStr
     * @returns {Object}
     */
    static parseInlineStyle(styleStr: string): any;
    /**
     * Видобуває $-пропси з блоку.
     * @param {Object} block
     * @param {boolean} keep$ - Залишити `$` у ключах
     * @param {Function} [flatMap] - Функція, що перетворює пару (ключ, значення) → { newKey: newVal }
     * @returns {Object}
     */
    static extractProps(block: any, keep$?: boolean, flatMap?: Function | undefined): any;
    /**
     * Видобуває теги (непрефіксовані ключі) з блоку.
     * @param {Object} block
     * @returns {Array<[string, any]>}
     */
    static extractTags(block: any): Array<[string, any]>;
    /**
     * Створює `Element` із декларативного блоку.
     * @param {Object} input - Наприклад, { Button: ["Натисни"], $variant: "primary" }
     */
    constructor(input?: any);
    /**
     * Тип компонента або HTML-тегу (наприклад, "Button", "div")
     * @type {string}
     */
    type: string;
    /**
     * Вміст елемента.
     * Може бути:
     *   - рядок → текст
     *   - true → порожній
     *   - масив → вкладені блоки { Icon } або текстові елементи
     * @type {string | true | any[]}
     */
    content: string | true | any[];
    /**
     * Пропси (властивості), видобуті з $-ключів.
     * Наприклад, { $onClick: fn, $variant: 'info' } → { onClick: fn, variant: 'info' }
     * @type {Object}
     */
    props: any;
    /**
     * Чи містить елемент вкладені елементи (а не тільки текст).
     * @returns {boolean}
     */
    hasChildren(): boolean;
    /**
     * Чи містить вміст текстові фрагменти.
     * @returns {boolean}
     */
    hasText(): boolean;
    /**
     * Повертає масив вкладених елементів (екземплярів `Element`).
     * @returns {Element[]}
     */
    getChildElements(): Element[];
}
