import { useEffect, useState } from 'react';

const useClickInsideElement = (ref: React.RefObject<HTMLElement>): boolean => {
    const [isClickInside, setIsClickInside] = useState<boolean>(false);

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (ref.current && ref.current.contains(event.target as Node)) {
                setIsClickInside(true);
            } else {
                setIsClickInside(false);
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, [ref]);

    return isClickInside;
};

export default useClickInsideElement;
