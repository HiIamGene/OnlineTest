const DEFAULT_LANGUAGE = "th"
const NextI18Next = require('next-i18next/dist/commonjs')

module.exports = new NextI18Next({
    browserLanguageDetection:true,
    fallbackLng:DEFAULT_LANGUAGE,
    defaultLanguage: DEFAULT_LANGUAGE,
    otherLanguages: ['en'],
    debug: false,
    defaultNS:"common",
    localePath:"static/locales",
    localeStructure:"{{lng}}/{{ns}}",
    localeSubpaths:"none"
})

module.exports.DEFAULT_LANGUAGE = DEFAULT_LANGUAGE
