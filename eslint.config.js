const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const n8nPlugin = require('eslint-plugin-n8n-nodes-base');

module.exports = [
	// глобальный ignores
	{
		ignores: ['**/*.js', '**/node_modules/**', '**/dist/**'],
	},

	// credentials
	{
		files: ['credentials/**/*.ts'],
		plugins: { 'n8n-nodes-base': n8nPlugin },
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['./tsconfig.json'],
				sourceType: 'module',
				extraFileExtensions: ['.json'],
			},
		},
		rules: {
			...n8nPlugin.configs.credentials.rules,
			'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
		},
	},

	// nodes
	{
		files: ['nodes/**/*.ts'],
		plugins: {
			'n8n-nodes-base': n8nPlugin,
			'@typescript-eslint': tsPlugin,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['./tsconfig.json'],
				sourceType: 'module',
				extraFileExtensions: ['.json'],
			},
		},
		rules: {
			...n8nPlugin.configs.nodes.rules,
			'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
			'n8n-nodes-base/node-class-description-outputs-wrong': 'off',
		},
	},
];