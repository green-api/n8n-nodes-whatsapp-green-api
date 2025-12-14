import {
  IExecuteFunctions,
  INodeExecutionData,
  NodeOperationError,
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

      returnData.push({ json: response });
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

      throw new NodeOperationError(ctx.getNode(), error as Error, {
        itemIndex: i,
      });
    }
  }

  return returnData;
}
