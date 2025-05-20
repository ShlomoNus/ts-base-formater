/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import-x';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            prettier: prettierPlugin,
            import: importPlugin,
        },
    },
    {
        ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
    },
    js.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylistic,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
            },
        },
    },
    {
        files: ['src/**/*.ts'],
        rules: {
            ...(Array.isArray(prettierPlugin.configs?.recommended)
                ? {}
                : (prettierPlugin.configs?.recommended?.rules ?? {})),
            ...eslintConfigPrettier.rules,
            'no-control-regex': 'off',
            'prefer-const': 'error',
            'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
            'max-lines': ['warn', { max: 300 }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'no-debugger': 'warn',
            'arrow-body-style': ['error', 'as-needed'],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'class',
                    format: ['PascalCase'],
                },
                {
                    selector: 'typeAlias',
                    format: ['PascalCase'],
                },
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                },
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                    trailingUnderscore: 'allow',
                },
                {
                    selector: 'function',
                    format: ['camelCase'],
                },
                { selector: 'enum', format: ['PascalCase'] },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],
            'capitalized-comments': [
                'warn',
                'always',
                {
                    ignoreConsecutiveComments: true,
                },
            ],
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: 'return' },
                { blankLine: 'always', prev: '*', next: 'block' },
                { blankLine: 'always', prev: 'for', next: '*' },
                { blankLine: 'always', prev: '*', next: 'for' },
                { blankLine: 'always', prev: 'if', next: '*' },
                { blankLine: 'always', prev: '*', next: 'if' },
                {
                    blankLine: 'always',
                    prev: ['const', 'let', 'var'],
                    next: '*',
                },
                {
                    blankLine: 'any',
                    prev: ['const', 'let', 'var'],
                    next: ['const', 'let', 'var'],
                },
                { blankLine: 'always', prev: 'import', next: '*' },
                { blankLine: 'never', prev: 'import', next: 'import' },
                { blankLine: 'always', prev: 'export', next: '*' },
                { blankLine: 'never', prev: 'export', next: 'export' },
                { blankLine: 'always', prev: 'function', next: '*' },
                { blankLine: 'always', prev: '*', next: 'function' },
                { blankLine: 'always', prev: '*', next: 'export' },
            ],
            'lines-between-class-members': ['error', 'always'],
            'lines-around-comment': [
                'error',
                {
                    beforeBlockComment: true,
                    beforeLineComment: true,
                    allowBlockStart: true,
                    allowBlockEnd: true,
                    allowObjectStart: true,
                    allowObjectEnd: true,
                    allowArrayStart: true,
                    allowArrayEnd: true,
                },
            ],
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    checksVoidReturn: false,
                },
            ],
            '@typescript-eslint/promise-function-async': 'error',
            'import/order': [
                'error',
                {
                    'groups': [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index'
                    ],
                    'newlines-between': 'always',
                    'alphabetize': {
                        'order': 'asc',
                        'caseInsensitive': true
                    }
                }
            ],
        },
    }
);
