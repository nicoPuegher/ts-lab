export default {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    quoteProps: 'consistent',
    singleAttributePerLine: true,
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: ['^@components/(.*)$', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
