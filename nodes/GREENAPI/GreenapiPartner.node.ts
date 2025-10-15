import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
}  from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
declare const console: any;

import { createInstance } from './operations/createInstance';
import { getInstances } from './operations/getInstances';
import { deleteInstanceAccount } from './operations/deleteInstanceAccount';

export class GreenapiPartner implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GREEN-API Partner',
		name: 'greenapiPartner',
		icon: 'file:greenapi.svg',
		group: ['transform'],
		version: 1,
		description: 'Starts the workflow on a Green-Api webhook',
		defaults: {
			name: 'GREENAPI Partner',

		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'greenApiPartnerAuthApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Partner',
						value: 'partner',
					},
				],
				noDataExpression: true,
				required: true,
				default: 'partner',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'partner',
						],
					},
				},
				options: [
					{
						name: 'createInstance',
						value: 'createInstance',
						action: 'Create instance'
					},
					{
						name: 'getInstances',
						value: 'getInstances',
						action: 'Get instances'
					},
					{
						name: 'deleteInstanceAccount',
						value: 'deleteInstanceAccount',
						action: 'Delete instance account'
					},
				],
				default: 'getInstances',
			},
			{
				displayName: 'idInstance',
				name: 'idInstance',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						operation: ['deleteInstanceAccount'],
					},
				},
				required:true,
			},
		],
		
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
			const items = this.getInputData();
			let responseData;
			const returnData: INodeExecutionData[] = [];
			const operation = this.getNodeParameter('operation', 0) as string;
	
			switch(operation){
				case 'createInstance':
					responseData = await createInstance.call(this, items);
					returnData.push(...responseData);
					break;
				case 'getInstances':
					responseData = await getInstances.call(this, items);
					returnData.push(...responseData);
					break;
				case 'deleteInstanceAccount':
					responseData = await deleteInstanceAccount.call(this, items);
					returnData.push(...responseData);
					break;
			}
			return [this.helpers.returnJsonArray(returnData)];	
		}
}