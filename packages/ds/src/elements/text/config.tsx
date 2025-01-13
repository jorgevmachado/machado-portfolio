import React from 'react';
import { isObject } from '@repo/services';
import useGenerateComponentId from '../../utils/use-generate-component-id';

export function isReactNode(value: unknown): boolean {
  return (
    React.isValidElement(value) ||
    (Array.isArray(value) && value.every(isReactNode))
  );
}

export function formattedText(children: unknown) {
  if (isReactNode(children) || isObject(children)) {
    return;
  }
  return textCleaner(children as string).map((paragraph) =>
    formatText(paragraph),
  )[0];
}

function textCleaner(text: string) {
  return text.split(/(?:\r\n){2,}/g) || [];
}

function formatText(paragraph: string) {
  const formatted = applyTextFormatting(paragraph);
  return replaceTextBetween(formatted);
}

function applyTextFormatting(text: string) {
  return text
    .split(/(_.*?_)|(\*.*?\*)|(\++?\++)/g)
    .filter((n) => n)
    .map((str) => applyFormatting(str));
}

function applyFormatting(text: string) {
  switch (text.charAt(0)) {
    case '_':
      return (
        <em key={useGenerateComponentId(`${text}_`)}>
          {applyTextFormatting(text.substring(1, text.length - 1))}
        </em>
      );
    case '*':
      return (
        <strong key={useGenerateComponentId(`${text}*`)}>
          {applyTextFormatting(text.substring(1, text.length - 1))}
        </strong>
      );
    default:
      return text === '++' ? (
        <br key={useGenerateComponentId(`${text}br`)} />
      ) : (
        text
      );
  }
}

function replaceTextBetween(texts: Array<string | React.JSX.Element>) {
  const replaceTagsRegex = /<(.*?)>(.*?)<\/\1>/g;
  return texts.map((text, index) => {
    if (typeof text === 'string' && text.match(replaceTagsRegex)) {
      const value = text.replace(replaceTagsRegex, '$2');
      const className = text.replace(replaceTagsRegex, '$1');
      return (
        <span key={`${text}-${index}`} className={className}>
          {value}
        </span>
      );
    }
    return text;
  });
}
