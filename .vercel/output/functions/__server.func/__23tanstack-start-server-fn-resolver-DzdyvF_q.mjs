//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DzdyvF_q.js
var manifest = { "3477bbe8085620ba9289f59e66cf1dd7377291ec33cebc9aefe265ae382244ea": {
	functionName: "submitEnquiry_createServerFn_handler",
	importer: () => import("./_ssr/contact.functions-CQY3EYWM.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
