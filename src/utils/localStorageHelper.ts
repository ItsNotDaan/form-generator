/**
 * LocalStorage helper with TTL support for form data persistence
 * Automatically cleans up expired data
 */

const TTL_DAYS = 7;
const STORAGE_KEY_PREFIX = 'form_autosave_';
const STEP_ROUTE_KEY_PREFIX = 'step_route_';

interface StoredData<T> {
  data: T;
  timestamp: number;
}

/**
 * Save data to localStorage with timestamp
 */
export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    const storageData: StoredData<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${key}`,
      JSON.stringify(storageData),
    );
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Load data from localStorage, checking TTL
 * Returns null if expired or not found
 */
export function loadFromLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
    if (!item) return null;

    const storageData: StoredData<T> = JSON.parse(item);
    const now = Date.now();
    const expiryTime = storageData.timestamp + TTL_DAYS * 24 * 60 * 60 * 1000;

    if (now > expiryTime) {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`);
      return null;
    }

    return storageData.data;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
}

/**
 * Remove specific item from localStorage
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

/**
 * Clean up all expired localStorage entries
 */
export function cleanupExpiredStorage(): void {
  try {
    const now = Date.now();
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(STORAGE_KEY_PREFIX)) continue;

      const item = localStorage.getItem(key);
      if (!item) continue;

      try {
        const storageData: StoredData<any> = JSON.parse(item);
        const expiryTime =
          storageData.timestamp + TTL_DAYS * 24 * 60 * 60 * 1000;

        if (now > expiryTime) {
          keysToRemove.push(key);
        }
      } catch {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error cleaning up localStorage:', error);
  }
}

/**
 * Clear all form autosave entries from localStorage
 * Used when starting a new workflow or finishing completely
 */
export function clearAllFormStorage(): void {
  try {
    const formKeys = [
      'newClient',
      'oldClient',
      'checkFoliepas',
      'intakeVLOS',
      'intakeOSA',
      'intakePulman',
      'intakeRebacare',
      'intakeOSB',
      'intakeOVAC',
      'intakeInsoles',
      'shoeDesign',
    ];

    formKeys.forEach(key => removeFromLocalStorage(key));
  } catch (error) {
    console.error('Error clearing all form storage:', error);
  }
}

export function saveStepRoute(step: number, route: string): void {
  saveToLocalStorage(`${STEP_ROUTE_KEY_PREFIX}${step}`, route);
}

export function loadStepRoute(step: number): string | null {
  return loadFromLocalStorage<string>(`${STEP_ROUTE_KEY_PREFIX}${step}`);
}

export function clearStepRoute(step: number): void {
  removeFromLocalStorage(`${STEP_ROUTE_KEY_PREFIX}${step}`);
}
