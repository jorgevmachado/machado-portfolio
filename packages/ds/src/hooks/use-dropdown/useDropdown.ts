import { useEffect, useState } from 'react';

export default function useDropdown(isExternalOpen?: boolean) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isExternalOpen !== undefined) {
      setIsOpen(isExternalOpen);
    }
  }, [isExternalOpen]);

  return { isOpen, toggleDropdown, setIsOpen };
}
