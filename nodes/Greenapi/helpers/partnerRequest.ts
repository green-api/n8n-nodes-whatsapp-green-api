// helpers/partnerRequest.ts
import { IExecuteFunctions, IHttpRequestMethods } from 'n8n-workflow';

export async function greenApiPartnerRequest(
	ctx: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: unknown,
) {
	const credentials = await ctx.getCredentials('greenApiPartnerAuthApi') as {
		partnerToken: string;
	};

	return ctx.helpers.httpRequest({
		method,
		url: `https://api.green-api.com/partner/${endpoint}/${credentials.partnerToken}`,
		headers: { 'Content-Type': 'application/json' },
		body,
		json: true,
	});
}