import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { W as isRedirect, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DzdyvF_q.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as contactSchema } from "./contact-schema-BkoDvjED.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact.functions-CK1O4Wb5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var submitEnquiry = createServerFn({ method: "POST" }).inputValidator((input) => contactSchema.parse(input)).handler(createSsrRpc("3477bbe8085620ba9289f59e66cf1dd7377291ec33cebc9aefe265ae382244ea"));
//#endregion
export { useServerFn as n, submitEnquiry as t };
