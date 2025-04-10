import { useCallback, useEffect, useState } from 'react';

type ToggleCallback = (isOpen: boolean) => void;

const useAccordionState = (
  isOpen?: boolean,
  onToggle?: ToggleCallback,
) => {
  const [isOpenModel, setIsOpenModel] = useState(isOpen ?? false);

  const toggleOpen = useCallback(() => {
    setIsOpenModel((prev) => {
      const newState = !prev;
      onToggle && onToggle(newState);
      return newState;
    });
  }, [onToggle]);

  useEffect(() => {
    if (isOpen !== undefined && isOpen !== isOpenModel) {
      setIsOpenModel(isOpen);
    }
  }, [isOpen]);

  return { isOpenModel, toggleOpen };
};

export default useAccordionState;