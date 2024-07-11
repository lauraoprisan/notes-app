import { useState, useEffect } from 'react';

export const useDebounce = <T,>(value: T, delay = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout); // Cleans up the previous timeouts if called again before delay passed

    }, [value, delay]);

    return debouncedValue;
};
