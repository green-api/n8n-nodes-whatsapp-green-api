import { IExecuteFunctions, IHttpRequestMethods } from 'n8n-workflow';

export async function greenApiRequest(
  ctx: IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: unknown,
) {
  const credentials = await ctx.getCredentials('greenApiAuthApi') as {
    idInstance: string;
    apiTokenKey: string;
  };

  return ctx.helpers.httpRequest({
    method: method,
    url: `https://api.green-api.com/waInstance${credentials.idInstance}/${endpoint}/${credentials.apiTokenKey}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    json: true,
  });
}