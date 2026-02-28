export const validateUrl = (url) => {
    if (!url.trim()) return 'URL is required';
    try {
        new URL(url);
        if (!url.match(/^https?:\/\//)) return 'URL must start with http:// or https://';
        return null;
    } catch {
        return 'Invalid URL format';
    }
};

export const validateRequired = (value, fieldName = 'Field') => {
    return value?.trim() ? null : `${fieldName} is required`;
};

export const validateTextLength = (value, min = 10, fieldName = 'Field') => {
    if (!value?.trim()) return `${fieldName} is required`;
    return value.trim().length >= min ? null : `${fieldName} must be at least ${min} characters`;
};
