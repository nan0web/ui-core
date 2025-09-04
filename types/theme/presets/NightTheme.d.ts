/**
 * Night (dark) theme – overrides solid button colours with darker background
 * while keeping white text for contrast.
 */
export default class NightTheme extends Theme {
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
}
import Theme from "../Theme.js";
