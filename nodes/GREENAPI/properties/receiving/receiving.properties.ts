//import { deleteNotificationFields } from './fields/deleteNotification';
import { downloadFileFields } from './fields/downloadFile';
//import { receiveNotificationFields } from './fields/receiveNotification';
import { receivingOperations } from './receivingOperations';


export const accountDescription = [
    ...receivingOperations,
    ...downloadFileFields,
    //...receiveNotificationFields,
    //...deleteNotificationFields
];