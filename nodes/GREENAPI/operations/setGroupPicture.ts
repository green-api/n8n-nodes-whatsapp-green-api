import { IExecuteFunctions, INodeExecutionData, IDataObject, NodeOperationError, JsonObject } from 'n8n-workflow';
declare const Buffer: any;
declare const require: any;

//доделать

export async function setGroupPicture(
		this: IExecuteFunctions, items: INodeExecutionData[],
	): Promise<any> {
		const groupId = this.getNodeParameter('groupId', items) as string;
		const filePath = this.getNodeParameter('file', items) as string;

		const items = this.getInputData();
		const formData: IDataObject = {
			groupId,
		};

		// Handle binary data
		const binaryPropertyName = 'data';
		const currentItem = items[itemIndex];
		const binaryData = currentItem?.binary;

		if (binaryData && binaryData[binaryPropertyName]) {
			const actualBinaryData = binaryData[binaryPropertyName] as IDataObject;
			formData.file = {
				value: Buffer.from(actualBinaryData.data as string, 'base64'),
				options: {
					filename: actualBinaryData.fileName || 'group_image.jpg',
				},
			};
		} else {
			// Read from file system
			const fs = require('fs');
			const path = require('path');
			const fileName = path.basename(filePath);

			try {
				const fileContent = fs.readFileSync(filePath);
				formData.file = {
					value: fileContent,
					options: {
						filename: fileName,
					},
				};
			} catch (readError) {
				throw new NodeOperationError(
					this.getNode(),
					`Failed to read group image file: ${(readError as Error).message}`,
					{ itemIndex }
				);
			}
		}

		const options = {
			method: 'POST',
			uri: `https://api.green-api.com/waInstance${instanceId}/setGroupPicture/${apiTokenInstance}`,
			formData,
			json: true,
		};

		return await this.helpers.request(options as JsonObject);
	}
