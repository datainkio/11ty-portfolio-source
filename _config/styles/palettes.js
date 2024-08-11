/**
 * Documentation: https://www.tints.dev/?black=252422&blue=06608D&purple=5B8C5A&orange=EB5E28&green=5B8C5A&yellow=FBC30B&ney=3B82F6&midnight=1F3037%29&primary=FBC30B&secondary=06608D&accent=92DCE5&success=5B8C5A&ake=FBC30B&ale=FBC30B&failure=C53D07&confirm=3B82F6&pending=9DB7B0&neutral=1F3037
 *
 * @format
 */

module.exports = {
	dropShadow: {
		centered: "0 0 96px rgba(0, 0, 0, 1)",
		outlined: "0 0 2px rgba(0, 0, 0, 1)",
	},
	bauhaus: {
		/**
		 * Branding colors for playbook plays (assume 8max).
		 * Values assigned to the Play content type via CMS.
		 *
		 * At the moment, these are just a full spectrum from red to blue.
		 * */
		playbook: {
			salsa: "#F94144",
			orange_red: "#F3722C",
			yellow_orange: "#F8961E",
			maize: "#F9C74F",
			pistachio: "#90BE6D",
			steel_teal: "#4D908E",
			queen_blue: "#577590",
			celadon_blue: "#277DA1",
		},
		/**
		 * Branding colors for sets of related tags. (Sets are defined in CMS.)
		 */
		tagging: {
			methods: "#F94144",
			topics: "#F8961E",
			technologies: "#90BE6D",
			industries: "#577590",
		},
		/**
		 * White, black, or different shades of grey for backgrounds or written text.
		 * Useful for accessibility to manage contrast.
		 * */
		neutral: {
			50: "#E5F7FF",
			100: "#D6F3FF",
			200: "#B8EAFF",
			300: "#96DEFD",
			400: "#7CD0F4",
			DEFAULT: "#65C0E7",
			600: "#51AFD7",
			700: "#3A98C0",
			800: "#377995",
			900: "#2D5567",
			950: "#1F3037",
		},
		/**
		 * Branding color that determines the overall look and feel. Showcase identity
		 * and amplify brand awareness.
		 * */
		primary: {
			50: "#FFFAEB",
			100: "#FFF5D6",
			200: "#FFECAD",
			300: "#FFE07A",
			400: "#FFD342",
			DEFAULT: "#FBC30B",
			600: "#E6B000",
			700: "#CC9C00",
			800: "#AD8500",
			900: "#856600",
			950: "#705600",
		},
		/**
		 * Accentuate and complement the primary color. Use in concert with accent.
		 * */
		secondary: {
			50: "#F2F6F7",
			100: "#EAF1F5",
			200: "#D7E7EF",
			300: "#C1DDEB",
			400: "#A6D2E7",
			DEFAULT: "#85C5E5",
			600: "#5EB7E3",
			700: "#2CA5E2",
			800: "#168ECB",
			900: "#0E72A5",
			950: "#06608D",
		},
		/**
		 * Highlight specific UI elements, such as promoted buttons. Best used sparingly.
		 * */
		accent: {
			50: "#F0FDFF",
			100: "#E5FCFF",
			200: "#BDF7FF",
			300: "#9AF2FE",
			400: "#8AE8F4",
			DEFAULT: "#92DCE5",
			600: "#15CDE5",
			700: "#03B7CE",
			800: "#0095A8",
			900: "#007180",
			950: "#004D57",
		},
		/**
		 * Functional colors that serve a particular purpose or communicate a particular
		 * message.
		 * */
		semantic: {
			success: {
				50: "#EAFBEA",
				100: "#DFF6DF",
				200: "#C3EAC2",
				300: "#A5DAA4",
				400: "#8AC789",
				DEFAULT: "#6AAF69",
				600: "#5B8C5A",
				700: "#427B41",
				800: "#326831",
				900: "#1E491D",
				950: "#143913",
			},
			failure: {
				50: "#FEF4F0",
				100: "#FEEAE1",
				200: "#FDD4C4",
				300: "#FCBBA1",
				400: "#FA946B",
				DEFAULT: "#F7652B",
				600: "#C53D07",
				700: "#A73406",
				800: "#942E05",
				900: "#672004",
				950: "#4A1703",
			},
			pending: {
				50: "#F0F9F7",
				100: "#EAF5F2",
				200: "#D3E8E3",
				300: "#C2DBD4",
				400: "#ABCAC1",
				DEFAULT: "#9DB7B0",
				600: "#79AA9D",
				700: "#5A9B89",
				800: "#437F6F",
				900: "#2C5E51",
				950: "#193E34",
			},
			disabled: {
				50: "#E5F7FF",
				100: "#D6F3FF",
				200: "#B8EAFF",
				300: "#96DEFD",
				400: "#7CD0F4",
				DEFAULT: "#65C0E7",
				600: "#51AFD7",
				700: "#3A98C0",
				800: "#377995",
				900: "#2D5567",
				950: "#1F3037",
			},
		},
	},
};
