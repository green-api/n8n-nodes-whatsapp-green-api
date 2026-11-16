import { callsOperations } from './callsOperations';
import { callsDialFields } from './fields/callsDial';
import { getCallRecordingFields } from './fields/getCallRecording';

export const callsDescription = [
	...callsOperations,
	...callsDialFields,
	...getCallRecordingFields,
];
