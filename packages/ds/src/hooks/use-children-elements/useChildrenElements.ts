import React from 'react';

export default function useChildrenElements(children: React.ReactNode) {
  const childrenElements = React.useMemo(() => {
    const elements: { [key: string]: JSX.Element } = {};
    React.Children.forEach(children, (element) => {
      if (React.isValidElement<{ 'data-children': string }>(element)) {
        const key = element.props['data-children'];
        if (key) {
          elements[key] = element;
        }
      }
    });
    return elements;
  }, [children]);

  const getChildrenElement = (elementId: string): React.ReactNode | null => {
    const element = Object.values(childrenElements).find(
      (child) =>
        React.isValidElement(child) &&
        (child.props as any)['data-children'] === elementId,
    );
    return element || null;
  };

  return { childrenElements, getChildrenElement };
}
