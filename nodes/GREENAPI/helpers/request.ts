import { IExecuteFunctions, IHttpRequestMethods, IDataObject } from 'n8n-workflow';

export async function greenApiRequest(
	ctx: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: unknown,
	qs?: IDataObject,
) {
	const credentials = await ctx.getCredentials('greenApiAuthApi') as {
		idInstance: string;
		apiTokenKey: string;
	};

	return ctx.helpers.httpRequest({
		method,
		url: `https://api.green-api.com/waInstance${credentials.idInstance}/${endpoint}/${credentials.apiTokenKey}`,
		headers: { 'Content-Type': 'application/json' },
		qs,
		body,
		json: true,
	});
}