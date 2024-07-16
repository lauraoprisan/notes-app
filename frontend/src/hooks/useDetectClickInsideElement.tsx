import { useEffect, useState } from 'react';

const useDetectClickInsideElement = (ref: React.RefObject<HTMLElement>): boolean => {
    const [isClickInsideElemeny, setIsClickInsideElement] = useState<boolean>(false);

    useEffect(() => {
        console.log("useDetectClickInsideElement hook called")
        const handleDocumentClick = (event: MouseEvent) => {
            if (ref.current && ref.current.contains(event.target as Node)) {
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

    return isClickInsideElemeny;
};

export default useDetectClickInsideElement;


