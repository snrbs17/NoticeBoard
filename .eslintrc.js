module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react-hooks'],
	extends: [
		'airbnb-base', // or airbnb-base
		'plugin:import/errors', // 설치한 경우
		'plugin:import/warnings', // 설치한 경우
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'prettier/prettier': 0,
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
