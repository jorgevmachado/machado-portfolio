import StyleDictionary from 'style-dictionary';
import fs from 'fs';

const brandsFolder = './src/brands';

const BRANDS = fs
    .readdirSync(brandsFolder)
    .filter((file) => fs.statSync(brandsFolder + '/' + file).isDirectory());

StyleDictionary.registerFormat({
    name: 'json/variables',
    format: ({ dictionary }) => JSON.stringify(dictionary.tokens, null, 2)
});

function builder(brand) {
    const styleDictionary = new StyleDictionary({
        source: [`src/brands/${brand}/**/*.json`, `src/globals/**/*.json`],
        platforms: {
            json: {
                transformGroup: 'css',
                buildPath: `dist/${brand}/json/`,
                files: [
                    {
                        destination: '_variables.json',
                        format: 'json/variables',
                    }
                ]
            },
            css: {
                transformGroup: 'css',
                buildPath: `dist/${brand}/css/`,
                files: [
                    {
                        destination: '_variables.css',
                        format: 'css/variables'
                    }
                ]
            },
            scss: {
                transformGroup: 'scss',
                buildPath: `dist/${brand}/scss/`,
                files: [
                    {
                        destination: '_variables.scss',
                        format: 'scss/variables'
                    }
                ]
            },
            android: {
                transformGroup: 'android',
                buildPath: `dist/${brand}/android/`,
                files: [
                    {
                        destination: 'font_dimens.xml',
                        format: 'android/fontDimens'
                    },
                    {
                        destination: 'colors.xml',
                        format: 'android/colors'
                    }
                ]
            },
            compose: {
                transformGroup: 'compose',
                buildPath: `dist/${brand}/compose/`,
                files: [
                    {
                        destination: 'StyleDictionaryColor.kt',
                        format: 'compose/object',
                        options: {
                            className: 'StyleDictionaryColor',
                            packageName: 'StyleDictionaryColor'
                        },
                        filter: {
                            '$type': 'color'
                        }
                    },
                    {
                        destination: 'StyleDictionarySize.kt',
                        format: 'compose/object',
                        options: {
                            className: 'StyleDictionarySize',
                            packageName: 'StyleDictionarySize',
                            type: 'float'
                        },
                        filter: {
                            '$type': 'dimension'
                        }
                    }
                ]
            },
            ios: {
                transformGroup: 'ios',
                buildPath: `dist/${brand}/ios/`,
                files: [
                    {
                        destination: 'StyleDictionaryColor.h',
                        format: 'ios/colors.h',
                        options: {
                            className: 'StyleDictionaryColor',
                            type: 'StyleDictionaryColorName'
                        },
                        filter: {
                            '$type': 'color'
                        }
                    },
                    {
                        destination: 'StyleDictionaryColor.m',
                        format: 'ios/colors.m',
                        options: {
                            className: 'StyleDictionaryColor',
                            type: 'StyleDictionaryColorName'
                        },
                        filter: {
                            '$type': 'color'
                        }
                    },
                    {
                        destination: 'StyleDictionarySize.h',
                        format: 'ios/static.h',
                        options: {
                            className: 'StyleDictionarySize',
                            type: 'float'
                        },
                        filter: {
                            '$type': 'dimension'
                        }
                    },
                    {
                        destination: 'StyleDictionarySize.m',
                        format: 'ios/static.m',
                        options: {
                            className: 'StyleDictionarySize',
                            type: 'float'
                        },
                        filter: {
                            '$type': 'dimension'
                        }
                    }
                ]
            },
            'ios-swift': {
                transformGroup: 'ios-swift',
                buildPath: `dist/${brand}/ios-swift/`,
                files: [
                    {
                        destination: 'StyleDictionary+Class.swift',
                        format: 'ios-swift/class.swift',
                        options: {
                            className: 'StyleDictionaryClass'
                        }
                    },
                    {
                        destination: 'StyleDictionary+Enum.swift',
                        format: 'ios-swift/enum.swift',
                        options: {
                            className: 'StyleDictionaryEnum'
                        }
                    },
                    {
                        destination: 'StyleDictionary+Struct.swift',
                        format: 'ios-swift/any.swift',
                        options: {
                            className: 'StyleDictionaryStruct',
                            'imports': 'SwiftUI',
                            'objectType': 'struct',
                            'accessControl': 'internal'
                        }
                    }
                ]
            },
            'ios-swift-separate-enums': {
                transformGroup: 'ios-swift-separate',
                buildPath: `dist/${brand}/ios-swift/`,
                files: [
                    {
                        destination: 'StyleDictionaryColor.swift',
                        format: 'ios-swift/enum.swift',
                        options: {
                            className: 'StyleDictionaryColor'
                        },
                        filter: {
                            '$type': 'color'
                        }
                    },
                    {
                        destination: 'StyleDictionarySize.swift',
                        format: 'ios-swift/enum.swift',
                        options: {
                            className: 'StyleDictionarySize'
                        },
                        filter: {
                            '$type': 'dimension'
                        }
                    }
                ]
            }
        }
    });
    return styleDictionary.buildAllPlatforms();
}

await Promise.all((BRANDS.map((brand) => builder(brand))));