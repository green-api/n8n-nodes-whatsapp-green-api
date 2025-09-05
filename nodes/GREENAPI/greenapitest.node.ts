import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
declare const console: any;

export class greenapitest implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'GREEN-API for WhatsApp',
        name: 'GREENAPITEST',
        icon: 'file:greenapi.svg',
        group: ['transform'],
        version: 1,
        description: 'Node description', /// ##### !!!!!!!!
        defaults: {
            name: 'GREENAPI TEST',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        usableAsTool: true,
        credentials: [
            {
                name: 'GreenApiAuth',
                required: true,
            },
        ],
        properties: [
            {
				displayName: 'Restrict to Chat IDs',
				name: 'chatIds',
				type: 'fixedCollection',
				placeholder: 'Add chatId',
				default: {},
                typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						displayName: 'chatId',
						name: 'chatId',
						values: [
							{
								displayName: 'chatId',
                                name: 'chatId',
                                type: 'string',
                                default: '',
                                placeholder: '79000000000@c.us',
							},
						],
					},
				],
			},
        ]
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {


        // это добро в триггер
        const items = this.getInputData();
        const chatsCollection = this.getNodeParameter('chatIds', 0, {}) as {
            chatId: { chatId: string }[];
        };
        const chatIds = (chatsCollection.chatId || []).map(c => c.chatId);


        console.log(chatIds);

        return [items];
    };
};