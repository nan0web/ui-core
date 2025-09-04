/**
 * Theme definition for Button atom.
 * Inherits common properties from Input and defines colour and shadow.
 */
export default class Button extends Input {
    /** @type {string} */ static color: string;
    /** @type {string} */ static background: string;
    /** @type {string} */ static shadow: string;
    /** @type {string} */ static hoverBackground: string;
    /** Solid variant definitions */
    static solid: {
        primary: {
            background: string;
            color: string;
            border: string;
        };
        secondary: {
            background: string;
            color: string;
            border: string;
        };
        success: {
            background: string;
            color: string;
            border: string;
        };
        warning: {
            background: string;
            color: string;
            border: string;
        };
        danger: {
            background: string;
            color: string;
            border: string;
        };
        info: {
            background: string;
            color: string;
            border: string;
        };
        light: {
            background: string;
            color: string;
            border: string;
        };
        dark: {
            background: string;
            color: string;
            border: string;
        };
        link: {
            background: string;
            color: string;
            border: string;
        };
    };
    /** Outline variant definitions (transparent background) */
    static outline: {
        primary: {
            background: string;
            color: string;
            border: string;
        };
        secondary: {
            background: string;
            color: string;
            border: string;
        };
        success: {
            background: string;
            color: string;
            border: string;
        };
        warning: {
            background: string;
            color: string;
            border: string;
        };
        danger: {
            background: string;
            color: string;
            border: string;
        };
        info: {
            background: string;
            color: string;
            border: string;
        };
        light: {
            background: string;
            color: string;
            border: string;
        };
        dark: {
            background: string;
            color: string;
            border: string;
        };
    };
    /** Size definitions – small button */
    static size: {
        sm: {
            fontSize: string;
            paddingX: string;
            paddingY: string;
        };
    };
    /** Simple animation config – can be disabled for reduced-motion users */
    static animation: {
        /** Transition CSS string */
        transition: string;
        /** Lighten amount on hover (hex) */
        hoverAdjust: number;
        /** Darken amount on active (hex) */
        activeAdjust: number;
        /** Scale when focused */
        focusScale: number;
        /** Scale when pressed */
        activeScale: number;
        /** Opacity for disabled state */
        disabledOpacity: number;
    };
}
import Input from "./Input.js";
