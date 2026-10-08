import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-assets-C9zmdWbE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-full px-3 text-xs",
			lg: "h-10 rounded-full px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var fieldRows = "/WhatsApp%20Image%202026-10-07%20at%2016.19.32.jpeg";
var machineField = "/WhatsApp%20Image%202026-10-07%20at%2016.20.51.jpeg";
var fieldSunset = "/WhatsApp%20Image%202026-10-07%20at%2016.21.19.jpeg";
var peaHarvest = "/WhatsApp%20Image%202026-10-07%20at%2016.22.54.jpeg";
var fieldWide = "/WhatsApp%20Image%202026-10-07%20at%2016.19.24.jpeg";
var downloadNine = "/download%20(9).jpg";
var horticultureHero = "/peas_growing-768x1024.jpeg";
var aboutUs = "/WhatsApp%20Image%202026-10-07%20at%2016.23.57.jpeg";
var machineryHero = "/download%20(9).jpg";
var internationalSourcing = "/sugar_snap_peas_with_blue_flower-1-300x284.jpg";
var avocado = "/Fresh%20from%20the%20farm%20%20Ovacado.jpg";
var tomato = "/download%20(10).jpg";
var watermelon = "/download%20(11).jpg";
var chilli = "/chillies-768x411.png";
var assets = {
	logo: "/genesis-logo.png",
	hero: peaHarvest,
	snapPeas: peaHarvest,
	packing: machineField,
	boxedPeas: machineField,
	globalSourcing: internationalSourcing,
	quality: fieldRows,
	sustainability: fieldSunset,
	logistics: machineField,
	mangetout: peaHarvest,
	beans: peaHarvest,
	chillies: chilli,
	babyVegetables: fieldRows,
	passionFruit: fieldSunset,
	countries: fieldRows,
	farm: fieldRows,
	regionHeading: fieldWide,
	regions: fieldRows,
	markets: fieldSunset,
	supply: machineField,
	serve: fieldWide,
	future: fieldSunset,
	footerLogo: "/genesis-logo.png",
	horticultureHero,
	aboutUs,
	machineryHero,
	internationalSourcing,
	avocado,
	tomato,
	watermelon,
	chilli,
	broccoli: "/How%20to%20Plant%20and%20Grow%20Broccoli%20_%20Gardener%E2%80%99s%20Path.jpg",
	carrot: "/carrot%20carrots%20carrot%20cake%20recipe%20carrote%20carrot%20cake%20carrot%20cake%20recipes%20carrot%20cake%20rezept%20color.jpg",
	pepper: "/One%20Month%20Before%20Harvesting%20Peppers%20Do%20This%20To%20Boost%20Flavor%20And%20Heat.jpg",
	plotPackedLabelled: "/WhatsApp%20Image%202026-10-07%20at%2016.19.24.jpeg",
	plotPreparedExport: "/WhatsApp-Image-2026-04-30-at-17.09.47.jpeg",
	downloadNine,
	fieldWide,
	fieldRows,
	machineField,
	fieldSunset,
	peaHarvest
};
//#endregion
export { assets as n, Button as t };
