/** @format */

module.exports = {
	spacing: {
		'printmark-line-length': '12px',
		'printmark-thickness': '2px',
		'printmark-offset': '10px',
		360: "90rem",
	},
	margin: {
		screen: "100vh",
	},
	backgroundSize: {
		auto: "auto",
		cover: "cover",
		contain: "contain",
		default: "75%",
	},
	clipPath: {
		capped: "ellipse(50px 60px at 0 10% 20%)",
	},
	container: {
		// you can configure the container to be centered
		// center: true,
		// or have default horizontal padding
		// padding: "1rem",
		screens: {
			// MOBILE
			// Anything below tablet size does not get a prefix

			// TABLET
			xs: "420px", // portrait
			sm: "640px", // landscape

			// DESKTOP
			md: "768px", // => @media (min-width: 768px) { ... }
			lg: "1024px", // => @media (min-width: 1024px) { ... }
			xl: "1280px", // => @media (min-width: 1280px) { ... }

			// THE MOOOOOON
			xxl: "1536px", // => @media (min-width: 1536px) { ... }
		},
	},
};
