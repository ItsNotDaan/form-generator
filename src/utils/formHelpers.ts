/**
 * Form utility for React Hook Form with auto-scroll to first error
 * 
 * This replaces the old warningNavigationMap approach with React Hook Form's
 * built-in shouldFocusError functionality and custom scroll enhancement.
 */

/**
 * Custom error handler for React Hook Form
 * Provides smooth scrolling to the first error field with better UX
 * 
 * Usage:
 * <form onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}>
 * 
 * @param errors - Errors object from React Hook Form
 */
export const scrollToFirstError = (errors: Record<string, any>) => {
    const firstErrorKey = Object.keys(errors)[0];
    if (!firstErrorKey) return;

    // Try to find the element by name attribute (React Hook Form convention)
    let element: HTMLElement | null = document.querySelector(`[name="${firstErrorKey}"]`);

    // If not found by name, try by id
    if (!element) {
        element = document.getElementById(firstErrorKey);
    }

    // If still not found, try to find any input with the error
    if (!element) {
        const formItemId = `${firstErrorKey}-form-item`;
        const formItem = document.getElementById(formItemId);
        if (formItem) {
            element = formItem.querySelector('input, textarea, select, button');
        }
    }

    if (element) {
        // Smooth scroll to center the element in viewport
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Focus the element after scroll animation completes
        setTimeout(() => {
            element?.focus();
        }, 300);
    }
};

/**
 * Get common form configuration for React Hook Form
 * Includes auto-focus on first error by default
 * 
 * @returns Common form configuration object
 */
export const getFormConfig = () => ({
    shouldFocusError: true, // Auto-scroll and focus first error
    mode: 'onSubmit' as const, // Validate on submit
    reValidateMode: 'onChange' as const, // Revalidate on change after first submit
});
