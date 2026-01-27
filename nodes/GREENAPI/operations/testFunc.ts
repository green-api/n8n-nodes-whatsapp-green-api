import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';
import { NoParams } from '../types/sending';

export async function getWaSettings2(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
) {
  return executePerItem(
    this,
    items,
    (i) =>
      getParams<NoParams>(this, i, {}),
    (params) =>
      greenApiRequest(this, 'GET', 'getWaSettings', {}),
  );
}