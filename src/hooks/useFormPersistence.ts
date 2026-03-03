import {useEffect, useRef, useCallback} from 'react';
import {UseFormWatch, FieldValues} from 'react-hook-form';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
} from '@/utils/localStorageHelper';

const DEBOUNCE_MS = 500;

/**
 * Hook to persist form data to localStorage with debounce
 * @param formKey - Unique identifier for the form
 * @param watch - React Hook Form watch function
 * @param setValue - React Hook Form setValue function (optional, for loading)
 * @returns Object with clearStorage function
 */
export function useFormPersistence<T extends FieldValues>(
  formKey: string,
  watch: UseFormWatch<T>,
  setValue?: (name: any, value: any, options?: any) => void,
) {
  const debounceTimer = useRef<NodeJS.Timeout>();

  const loadSavedData = useCallback(() => {
    if (!setValue) {
      return null;
    }

    const savedData = loadFromLocalStorage<T>(formKey);
    if (savedData) {
      Object.entries(savedData).forEach(([key, value]) => {
        setValue(key as any, value, {
          shouldValidate: false,
          shouldDirty: false,
        });
      });
    }
    return savedData;
  }, [formKey, setValue]);

  const clearStorage = useCallback(() => {
    removeFromLocalStorage(formKey);
  }, [formKey]);

  useEffect(() => {
    loadSavedData();
  }, [loadSavedData]);

  useEffect(() => {
    const subscription = watch(formData => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        saveToLocalStorage(formKey, formData);
      }, DEBOUNCE_MS);
    });

    return () => {
      subscription.unsubscribe();
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [watch, formKey]);

  return {clearStorage, loadSavedData};
}
