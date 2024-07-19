import { useEffect, useState } from 'react';

const useDetectClickInsideElement = (ref: React.RefObject<HTMLElement>): boolean => {
    const [isClickInsideElement, setIsClickInsideElement] = useState<boolean>(false);

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (ref?.current?.contains(event.target as Node)) {
                setIsClickInsideElement(true);
            } else {
                setIsClickInsideElement(false);
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, [ref]);

    return isClickInsideElement;
};

export default useDetectClickInsideElement;


