import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

function transformParticipants(raw: any) {
    const participants: string[] = [];

    Object.entries(raw).forEach(([key, arr]) => {
        if (!Array.isArray(arr)) return;

        arr.forEach((item) => {
            if (item && item.participantText) {
                participants.push(item.participantText);
            }
        });
    });

    return participants;
}

export async function sendTextStatus(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const message = this.getNodeParameter('message', i, '') as string;
        const backgroundColor = this.getNodeParameter('backgroundColor', i, '') as string;
        const font = this.getNodeParameter('font', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };
        const participantsRaw = this.getNodeParameter('participants', i, {}) as {
            participant?: { participant: string}[];
        };
        const participants = transformParticipants(participantsRaw);
        
        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendTextStatus/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                    'message': message,
                    'backgroundColor': backgroundColor,
                    'font': font,
                    'participants': participants,
                },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}

export async function sendVoiceStatus(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const urlFile = this.getNodeParameter('urlFile', i, '') as string;
        const fileName = this.getNodeParameter('fileName', i, '') as string;
        const backgroundColor = this.getNodeParameter('backgroundColor', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };
        const participantsRaw = this.getNodeParameter('participants', i, {}) as {
            participant?: { participant: string}[];
        };
        const participants = transformParticipants(participantsRaw);
        
        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendVoiceStatus/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                    'urlFile': urlFile,
                    'fileName': fileName,
                    'backgroundColor': backgroundColor,
                    'participants': participants,
                },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}

export async function sendMediaStatus(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const urlFile = this.getNodeParameter('urlFile', i, '') as string;
        const fileName = this.getNodeParameter('fileName', i, '') as string;
        const caption = this.getNodeParameter('caption', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };
        const participantsRaw = this.getNodeParameter('participants', i, {}) as {
            participant?: { participant: string}[];
        };
        const participants = transformParticipants(participantsRaw);
        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendMediaStatus/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                    'urlFile': urlFile,
                    'fileName': fileName,
                    'caption': caption,
                    'participants': participants,
                },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}

export async function deleteStatus(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const idMessage = this.getNodeParameter('idMessage', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/deleteStatus/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                    'idMessage': idMessage
                },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}

export async function getStatusStatistic(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const idMessage = this.getNodeParameter('idMessage', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'GET',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/getStatusStatistic/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                'idMessage': idMessage,
            },
            json: true,
        });
        returnData.push(response);
    }

    return returnData;
}

export async function getOutgoingStatuses(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const minutes = this.getNodeParameter('minutes', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        let url = `https://api.green-api.com/waInstance${credentials.idInstance}/getOutgoingStatuses/${credentials.apiTokenKey}`;
        if (minutes) {url = url + '?minutes=' + minutes}

        const response = await this.helpers.request({
            method: 'GET',
            url:  url,
            headers: { 'Content-Type': 'application/json' },
            json: true,
        });
        returnData.push(response);
    }

    return returnData;
}


export async function getIncomingStatuses(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const minutes = this.getNodeParameter('minutes', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        let url = `https://api.green-api.com/waInstance${credentials.idInstance}/getIncomingStatuses/${credentials.apiTokenKey}`;
        if (minutes) {url = url + '?minutes=' + minutes}

        const response = await this.helpers.request({
            method: 'GET',
            url:  url,
            headers: { 'Content-Type': 'application/json' },
            json: true,
        });
        returnData.push(response);
    }

    return returnData;
}
