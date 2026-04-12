import { downloadFileFields } from './fields/downloadFile';
import { receivingOperations } from './receivingOperations';


export const accountDescription = [
    ...receivingOperations,
    ...downloadFileFields,
];