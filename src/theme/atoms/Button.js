import Input from "./Input.js"
import { tokens } from "../../tokens.js"

/**
 * Theme definition for Button atom.
 * Inherits common properties from Input and defines colour and shadow.
 */
export default class Button extends Input {
	/** @type {string} */ static color    = tokens.color.text
	/** @type {string} */ static background = tokens.color.primary
	/** @type {string} */ static shadow   = tokens.shadow.sm
	/** @type {string} */ static hoverBackground = "color-mix(in srgb, var(--color-primary) 80%, black)"

	/** Solid variant definitions */
	static solid = {
		primary:   { background: "#0d6efd", color: "#fff", border: "#0d6efd" },
		secondary: { background: "#6c757d", color: "#fff", border: "#6c757d" },
		success:   { background: "#198754", color: "#fff", border: "#198754" },
		warning:   { background: "#ffc107", color: "#212529", border: "#ffc107" },
		danger:    { background: "#dc3545", color: "#fff", border: "#dc3545" },
		info:      { background: "#0dcaf0", color: "#fff", border: "#0dcaf0" },
		light:     { background: "#f8f9fa", color: "#212529", border: "#f8f9fa" },
		dark:      { background: "#212529", color: "#fff", border: "#212529" },
		link:      { background: "transparent", color: "#0d6efd", border: "transparent" },
	}

	/** Outline variant definitions (transparent background) */
	static outline = {
		primary:   { background: "transparent", color: "#0d6efd", border: "#0d6efd" },
		secondary: { background: "transparent", color: "#6c757d", border: "#6c757d" },
		success:   { background: "transparent", color: "#198754", border: "#198754" },
		warning:   { background: "transparent", color: "#ffc107", border: "#ffc107" },
		danger:    { background: "transparent", color: "#dc3545", border: "#dc3545" },
		info:      { background: "transparent", color: "#0dcaf0", border: "#0dcaf0" },
		light:     { background: "transparent", color: "#212529", border: "#212529" },
		dark:      { background: "transparent", color: "#212529", border: "#212529" },
	}

	/** Size definitions – small button */
	static size = {
		sm: {
			fontSize: "0.875rem",
			paddingX: "0.5rem",
			paddingY: "0.25rem",
		},
	}

	/** Simple animation config – can be disabled for reduced-motion users */
	static animation = {
		/** Transition CSS string */
		transition: "background 0.15s ease, transform 0.1s ease",
		/** Lighten amount on hover (hex) */
		hoverAdjust: 20,
		/** Darken amount on active (hex) */
		activeAdjust: -30,
		/** Scale when focused */
		focusScale: 1.02,
		/** Scale when pressed */
		activeScale: 0.98,
		/** Opacity for disabled state */
		disabledOpacity: 0.65,
	}
}