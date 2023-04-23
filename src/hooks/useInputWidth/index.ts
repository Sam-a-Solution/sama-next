import { RefObject, useEffect, useState } from 'react';

const useInputWidth = (
  inputRef: RefObject<HTMLInputElement> | RefObject<HTMLButtonElement>,
): number | null => {
  const [inputWidth, setInputWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = inputRef.current?.offsetWidth || null;
      setInputWidth(width);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [inputRef]);

  return inputWidth;
};

export default useInputWidth;
