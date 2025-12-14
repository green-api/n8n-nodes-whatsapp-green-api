import { IExecuteFunctions } from 'n8n-workflow';

export async function greenApiRequest(
  ctx: IExecuteFunctions,
  endpoint: string,
  body: unknown,
) {
  const credentials = await ctx.getCredentials('greenApiAuthApi') as {
    idInstance: string;
    apiTokenKey: string;
  };

  return ctx.helpers.httpRequest({
    method: 'POST',
    url: `https://api.green-api.com/waInstance${credentials.idInstance}/${endpoint}/${credentials.apiTokenKey}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    json: true,
  });
}
