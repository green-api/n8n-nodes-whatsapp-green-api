import {
  IExecuteFunctions,
  INodeExecutionData,
  NodeApiError,
  NodeOperationError,
  JsonObject,
} from 'n8n-workflow';

export async function executePerItem<T>(
  ctx: IExecuteFunctions,
  items: INodeExecutionData[],
  getParams: (i: number) => T,
  execute: (params: T) => Promise<any>,
) {
  const returnData: INodeExecutionData[] = [];

  for (let i = 0; i < items.length; i++) {
    try {
      const params = getParams(i);
      const response = await execute(params);

      returnData.push({
        json: response,
        pairedItem: { item: i },
      });
    } catch (error) {
      if (ctx.continueOnFail()) {
        returnData.push({
          json: {
            error: (error as Error).message,
          },
          pairedItem: { item: i },
        });
        continue;
      }

      // Use NodeApiError for HTTP errors to preserve status code and response body
      if ((error as any).response) {
        throw new NodeApiError(ctx.getNode(), error as JsonObject, {
          itemIndex: i,
        });
      }

      throw new NodeOperationError(ctx.getNode(), error as Error, {
        itemIndex: i,
      });
    }
  }

  return returnData;
}