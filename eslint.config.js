let customConfig = [];
let hasIgnoresFile = false;
try {
    require.resolve('./eslint.ignores.js');
    hasIgnoresFile = true;
} catch {
    // eslint.ignores.js doesn't exist
}

if (hasIgnoresFile) {
    const ignores = require('./eslint.ignores.js');
    customConfig = [{ ignores }];
}

// Custom rules configuration
const customRules = {
    rules: {
        // Force using curly on if condition
        curly: 'error',
        // Unused import returned as an error
        // note you must disable the base rule as it can report incorrect errors
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
};

module.exports = [...customConfig, ...require('gts'), customRules];
