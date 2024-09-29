module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['src/**/*.jsx', 'src/**/*.js', '*.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'simple-import-sort',
    'import',
    'react',
    'prettier',
    'unused-imports',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^\\*|_|yup' },
    ],
    'unused-imports/no-unused-vars': 'warn',
    'import/no-empty-named-blocks': 'warn',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['sibling', 'index', 'parent'],
          'internal',
          'object',
          'type',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '{react*,react-dom/client}',
            group: 'external',
            position: 'before',
          },
          {
            pattern:
              '{,.,..,../..,../../..,../../../..,../../../../..,../../../../../..,../../../../../../..,../../../../../../../..}{,/}{components/**,components}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern:
              '{,.,..,../..,../../..,../../../..,../../../../..,../../../../../..,../../../../../../..,../../../../../../../..}{,/}{routes/**,routes}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern:
              '{,.,..,../..,../../..,../../../..,../../../../..,../../../../../..,../../../../../../..,../../../../../../../..}{,/}{hooks/**,hooks}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern:
              '{,.,..,../..,../../..,../../../..,../../../../..,../../../../../..,../../../../../../..,../../../../../../../..}{,/}{api/**,api}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern:
              '{,.,..,../..,../../..,../../../..,../../../../..,../../../../../..,../../../../../../..,../../../../../../../..}{,/}{{models,enums,shemes,interfaces}/**,{models,enums,shemes,interfaces}}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern:
              '{,.,..,../..,../../..,../../../..,../../../../..,../../../../../..,../../../../../../..,../../../../../../../..}{,/}{utils/**,utils}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern:
              '{,.,..,../..,../../..,../../../..,../../../../..,../../../../../..,../../../../../../..,../../../../../../../..}{,/}{constants/**,constants}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern:
              '{,.,..,../..,../../..,../../../..,../../../../..,../../../../../..,../../../../../../..,../../../../../../../..}{,/}{assets/**,assets}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '*.{css,scss}',
            patternOptions: { matchBase: true },
            group: 'unknown',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'internal'],
        warnOnUnassignedImports: true,
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
