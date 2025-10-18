import { accountOperations } from './accountOperations';
import { getSettingsFields } from './fields/getSettings';
import { setSettingsFields } from './fields/setSettings';
import { getStateInstanceFields } from './fields/getStateInstance';
import { getWaSettingsFields } from './fields/getWaSettings';
import { logoutFields } from './fields/logout';
import { rebootFields } from './fields/reboot';

export const accountDescription = [
	...accountOperations,
	...getSettingsFields,
	...setSettingsFields,
	...getStateInstanceFields,
	...getWaSettingsFields,
	...logoutFields,
	...rebootFields,
];
