/**
 * Maps warning messages to their corresponding form locations
 * Enables users to navigate directly to the problematic field
 */

export interface WarningNavigation {
    warning: string;
    formType: 'VLOS' | 'OSA' | 'Pulman' | 'Rebacare' | 'OSB' | 'OVAC' | 'Steunzolen' | 'ClientData';
    fieldId: string; // HTML id or section reference for scrolling
    fieldLabel: string; // User-friendly label for the field
}

export const WARNING_NAVIGATION_MAP: Record<string, WarningNavigation> = {
    'VLOS welk paar': {
        warning: 'VLOS welk paar (paartype) is niet ingevuld',
        formType: 'VLOS',
        fieldId: 'vlos-welk-paar',
        fieldLabel: 'VLOS welk paar (paartype)',
    },
    'OSA welk paar': {
        warning: 'OSA welk paar (paartype) is niet ingevuld',
        formType: 'OSA',
        fieldId: 'osa-welk-paar',
        fieldLabel: 'OSA welk paar (paartype)',
    },
    'OSA schachthoogte': {
        warning: 'OSA schachthoogte is niet ingevuld',
        formType: 'OSA',
        fieldId: 'osa-schachthoogte',
        fieldLabel: 'OSA schachthoogte',
    },
    'Ezelsoor links type': {
        warning: 'Ezelsoor links is enabled maar type (mediaal/lateraal) is niet geselecteerd',
        formType: 'VLOS',
        fieldId: 'ezelsoor-links-type',
        fieldLabel: 'Ezelsoor links type (mediaal/lateraal)',
    },
    'Ezelsoor rechts type': {
        warning: 'Ezelsoor rechts is enabled maar type (mediaal/lateraal) is niet geselecteerd',
        formType: 'VLOS',
        fieldId: 'ezelsoor-rechts-type',
        fieldLabel: 'Ezelsoor rechts type (mediaal/lateraal)',
    },
    'Geen client data': {
        warning: 'Geen client data gevonden',
        formType: 'ClientData',
        fieldId: 'client-data',
        fieldLabel: 'Client data',
    },
    'Intake type niet geselecteerd': {
        warning: 'Intake type is niet geselecteerd',
        formType: 'ClientData',
        fieldId: 'intake-type',
        fieldLabel: 'Intake type',
    },
};

/**
 * Find navigation info for a warning message
 */
export function findNavigationForWarning(
    warningMessage: string
): WarningNavigation | null {
    // Try exact match first
    for (const nav of Object.values(WARNING_NAVIGATION_MAP)) {
        if (nav.warning === warningMessage) {
            return nav;
        }
    }

    // Try substring match for partial matches
    for (const nav of Object.values(WARNING_NAVIGATION_MAP)) {
        if (warningMessage.includes(nav.warning.split(' is ')[0])) {
            return nav;
        }
    }

    return null;
}

/**
 * Get the form route based on form type
 */
export function getFormRoute(formType: WarningNavigation['formType']): string {
    const routes: Record<WarningNavigation['formType'], string> = {
        VLOS: '/form-generator/intake-vlos',
        OSA: '/form-generator/intake-osa',
        Pulman: '/form-generator/intake-pulman',
        Rebacare: '/form-generator/intake-rebacare',
        OSB: '/form-generator/intake-osb',
        OVAC: '/form-generator/intake-ovac',
        Steunzolen: '/form-generator/intake-steunzolen',
        ClientData: '/form-generator/old-client',
    };
    return routes[formType];
}

/**
 * Scroll to a specific field by its ID and highlight it
 */
export function scrollToField(fieldId: string): void {
    const element = document.getElementById(fieldId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add visual highlight
        element.classList.add('highlight-field');
        // Remove highlight after 3 seconds
        setTimeout(() => {
            element.classList.remove('highlight-field');
        }, 3000);
    }
}

/**
 * Focus and highlight multiple invalid fields
 * Scrolls to first field, focuses it based on field type, and highlights all invalid fields
 */
export function focusAndHighlightInvalidFields(fieldIds: string[]): void {
    if (fieldIds.length === 0) return;

    if (process.env.NODE_ENV === 'development') {
        console.debug('focusAndHighlightInvalidFields called with fieldIds:', fieldIds);
    }

    // Add highlight to all invalid fields
    fieldIds.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.classList.add('highlight-field');
            if (process.env.NODE_ENV === 'development') {
                console.debug(`Highlighted field: ${fieldId}`, element);
            }
        } else {
            if (process.env.NODE_ENV === 'development') {
                console.warn(`Field element not found: ${fieldId}`);
            }
        }
    });

    // Scroll to and focus the first invalid field
    const firstFieldId = fieldIds[0];
    const firstElement = document.getElementById(firstFieldId);

    if (firstElement) {
        firstElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (process.env.NODE_ENV === 'development') {
            console.debug(`Scrolling to first field: ${firstFieldId}`);
        }

        // Use multiple timing strategies to ensure focus works
        // First attempt after scroll animation (300ms)
        setTimeout(() => {
            focusElement(firstElement);
        }, 300);

        // Fallback attempt in case component wasn't ready
        setTimeout(() => {
            focusElement(firstElement);
        }, 600);
    } else {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`First field element not found: ${firstFieldId}`);
        }
    }

    // Remove all highlights after 3 seconds
    setTimeout(() => {
        fieldIds.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.classList.remove('highlight-field');
            }
        });
    }, 3000);
}

/**
 * Helper function to focus an element, trying different strategies based on element type
 */
function focusElement(element: HTMLElement): void {
    if (process.env.NODE_ENV === 'development') {
        console.debug(`focusElement called on: ${element.id}`, element);
        console.debug(`Element tag: ${element.tagName}`);
        console.debug(`Element children:`, element.children);
    }

    // Check if it's a direct input or textarea
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        (element as HTMLInputElement | HTMLTextAreaElement).focus();
        if (process.env.NODE_ENV === 'development') {
            console.debug(`Direct focus on ${element.tagName}`);
        }
        return;
    }

    let focusableElement: HTMLElement | null = null;

    // Strategy 1: Try input[role="combobox"] first (react-select standard)
    focusableElement = element.querySelector('input[role="combobox"]') as HTMLElement | null;
    if (focusableElement) {
        (focusableElement as HTMLInputElement).focus();
        if (process.env.NODE_ENV === 'development') {
            console.debug(`Focused via role=combobox`);
        }
        return;
    }

    // Strategy 2: Try react-select input with specific class path
    focusableElement = element.querySelector('.react-select__input input') as HTMLElement | null;
    if (focusableElement) {
        (focusableElement as HTMLInputElement).focus();
        if (process.env.NODE_ENV === 'development') {
            console.debug(`Focused via .react-select__input input`);
        }
        return;
    }

    // Strategy 3: Try input[class*="react-select"]
    focusableElement = element.querySelector('input[class*="react-select"]') as HTMLElement | null;
    if (focusableElement) {
        (focusableElement as HTMLInputElement).focus();
        if (process.env.NODE_ENV === 'development') {
            console.debug(`Focused via input[class*="react-select"]`);
        }
        return;
    }

    // Strategy 4: Try regular input (not radio/checkbox)
    focusableElement = element.querySelector('input:not([type="radio"]):not([type="checkbox"])') as HTMLElement | null;
    if (focusableElement) {
        (focusableElement as HTMLInputElement).focus();
        if (process.env.NODE_ENV === 'development') {
            console.debug(`Focused via regular input`);
        }
        return;
    }

    // Strategy 5: Try radio button (for RadioGroup)
    focusableElement = element.querySelector('input[type="radio"]') as HTMLElement | null;
    if (focusableElement) {
        (focusableElement as HTMLInputElement).focus();
        if (process.env.NODE_ENV === 'development') {
            console.debug(`Focused via radio button`);
        }
        return;
    }

    // Strategy 6: Try checkbox
    focusableElement = element.querySelector('input[type="checkbox"]') as HTMLElement | null;
    if (focusableElement) {
        (focusableElement as HTMLInputElement).focus();
        if (process.env.NODE_ENV === 'development') {
            console.debug(`Focused via checkbox`);
        }
        return;
    }

    // Strategy 7: Try textarea
    focusableElement = element.querySelector('textarea') as HTMLElement | null;
    if (focusableElement) {
        (focusableElement as HTMLTextAreaElement).focus();
        if (process.env.NODE_ENV === 'development') {
            console.debug(`Focused via textarea`);
        }
        return;
    }

    // Strategy 8: Last resort - try any input
    focusableElement = element.querySelector('input') as HTMLElement | null;
    if (focusableElement) {
        (focusableElement as HTMLInputElement).focus();
        if (process.env.NODE_ENV === 'development') {
            console.debug(`Focused via fallback input`);
        }
        return;
    }

    // No focusable element found
    if (process.env.NODE_ENV === 'development') {
        console.warn(`No focusable element found in ${element.id}`);
        console.debug('Available inputs:', element.querySelectorAll('input, textarea'));
    }
}
