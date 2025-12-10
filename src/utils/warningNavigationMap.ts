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

    // Add highlight to all invalid fields
    fieldIds.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.classList.add('highlight-field');
        }
    });

    // Scroll to and focus the first invalid field
    const firstFieldId = fieldIds[0];
    const firstElement = document.getElementById(firstFieldId);
    
    if (firstElement) {
        firstElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Focus based on field type
        setTimeout(() => {
            // Check if it's a direct input or textarea
            if (firstElement.tagName === 'INPUT' || firstElement.tagName === 'TEXTAREA') {
                firstElement.focus();
            } else {
                // For container elements, find the focusable element inside
                // Try DatePickerField (input inside)
                let focusableElement = firstElement.querySelector('input');
                
                // Try DropdownField (react-select)
                if (!focusableElement) {
                    focusableElement = firstElement.querySelector('.react-select__input input');
                }
                
                // Try RadioGroup (first radio button)
                if (!focusableElement) {
                    focusableElement = firstElement.querySelector('input[type="radio"]');
                }
                
                if (focusableElement && focusableElement instanceof HTMLElement) {
                    focusableElement.focus();
                }
            }
        }, 500); // Wait for scroll animation to complete
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
