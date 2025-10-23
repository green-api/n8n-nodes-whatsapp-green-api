import { sendTextStatusFields } from './fields/sendTextStatus';
import { sendVoiceStatusFields } from './fields/sendVoiceStatus';
import { sendMediaStatusFields } from './fields/sendMediaStatus';
import { statusesOperations } from './statusesOperations';
import { deleteStatusFields } from './fields/deleteStatus';
import { getOutgoingStatusesFields } from './fields/getOutgoingStatuses';
import { getIncomingStatusesFields } from './fields/getIncomingStatuses';
import { getStatusStatisticFields } from './fields/getStatusStatistic';


export const statusesDescription = [
    ...statusesOperations,
    ...sendTextStatusFields,
    ...sendMediaStatusFields,
    ...sendVoiceStatusFields,
    ...deleteStatusFields,
    ...getOutgoingStatusesFields,
    ...getIncomingStatusesFields,
    ...getStatusStatisticFields,
];
