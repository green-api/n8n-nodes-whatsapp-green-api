import { groupOperations } from './groupOperations';
import { sharedFields } from './fields/shared';
import { createGroupFields } from './fields/createGroup';
import { updateGroupNameFields } from './fields/updateGroupName';

export const groupDescription = [
	...groupOperations,
	...sharedFields,
	...createGroupFields,
	...updateGroupNameFields,
];