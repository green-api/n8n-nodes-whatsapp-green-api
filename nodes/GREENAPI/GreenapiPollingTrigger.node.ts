import type {
    IPollFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
declare const console: any;

export class GreenapiPollingTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'GREEN-API Polling',
        name: 'greenapiPollingTrigger',
        icon: 'file:greenapi.svg',
        group: ['trigger'],
        version: 1,
        polling: true,
        description: 'Starts the workflow on a Green-Api webhook',
        defaults: {
            name: 'GREENAPI Trigger',

        },
        inputs: [],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'greenApiAuthApi',
                required: true,
            },
        ],
        properties: [
            {
				displayName:
					'Applying the settings, which is necessary for trigger node to work, to an instance can take up to 5 minutes.',
				name: 'GreenApiTriggerNotice',
				type: 'notice',
				default: '',
			},
        ],
	};

	async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		const credentials = await this.getCredentials('greenApiAuthApi');
        //const receiveTimeout = this.getNodeParameter('invterval') as number;
		const response = await this.helpers.request({
			method: 'GET',
			//url: `https://api.green-api.com/waInstance${credentials.idInstance}/receiveNotification/${credentials.apiTokenKey}?receiveTimeout=${receiveTimeout}`,
			url: `https://api.green-api.com/waInstance${credentials.idInstance}/receiveNotification/${credentials.apiTokenKey}`,
            json: true,
		});        
        if(response!=null){
            await this.helpers.request({
                method: 'DELETE',
                url: `https://api.green-api.com/waInstance${credentials.idInstance}/deleteNotification/${credentials.apiTokenKey}/${response.receiptId}`,
                json: true,
            });      
            return [this.helpers.returnJsonArray([response.body]),];
        }
        return null;
	};
}