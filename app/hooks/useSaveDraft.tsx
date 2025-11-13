import { useState, useEffect, useRef, useCallback } from "react";
import { storage } from "@/lib/utils";

interface UseDraftOptions<T> {
  key: string;
  initialData: T;
  expiryMs?: number;
  debounceMs?: number;
  enabled?: boolean;
  onSave?: (data: T) => void;
  onLoad?: (data: T) => void;
}

interface UseDraftReturn<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  clearDraft: () => void;
  saveDraft: () => void;
  hasDraft: boolean;
  isLoading: boolean;
}

export function useDraft<T>({
  key,
  initialData,
  expiryMs = 1 * 24 * 60 * 60 * 1000,
  debounceMs = 1000,
  enabled = true,
  onSave,
  onLoad,
}: UseDraftOptions<T>): UseDraftReturn<T> {
  const [data, setData] = useState<T>(initialData);
  const [hasDraft, setHasDraft] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const saveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isInitialMount = useRef(true);

  // ✅ FIX: Memoize callbacks to prevent infinite loops
  const onSaveRef = useRef(onSave);
  const onLoadRef = useRef(onLoad);

  useEffect(() => {
    onSaveRef.current = onSave;
    onLoadRef.current = onLoad;
  }, [onSave, onLoad]);

  // Load draft from localStorage on mount
  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    const loadDraft = () => {
      try {
        const savedDraft = storage.get(key);
        if (savedDraft) {
          setData(savedDraft);
          setHasDraft(true);
          onLoadRef.current?.(savedDraft);
          console.log(`Draft loaded from localStorage: ${key}`);
        }
      } catch (error) {
        console.error("Failed to load draft:", error);
      } finally {
        setIsLoading(false);
        isInitialMount.current = false;
      }
    };

    loadDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  // Manual save function
  const saveDraft = useCallback(() => {
    if (!enabled) return;

    try {
      const saved = storage.set(key, data, expiryMs);
      if (saved) {
        setHasDraft(true);
        onSaveRef.current?.(data);
        console.log(`Draft manually saved: ${key}`);
      }
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  }, [key, data, expiryMs, enabled]);

  // Auto-save with debouncing
  useEffect(() => {
    // Skip if disabled or on initial mount
    if (!enabled || isInitialMount.current) {
      return;
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(() => {
      try {
        const saved = storage.set(key, data, expiryMs);
        if (saved) {
          setHasDraft(true);
          onSaveRef.current?.(data);
          console.log(`Draft auto-saved: ${key}`);
        }
      } catch (error) {
        console.error("Failed to auto-save draft:", error);
      }
    }, debounceMs);

    // Cleanup
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, key, expiryMs, debounceMs, enabled]); // ✅ Remove onSave from deps

  // Listen for changes from other tabs
  useEffect(() => {
    if (!enabled) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          const item = JSON.parse(e.newValue);
          setData(item.value);
          setHasDraft(true);
          console.log(`Draft synced from another tab: ${key}`);
        } catch (error) {
          console.error("Failed to sync from other tab:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, enabled]);

  // Clear draft function
  const clearDraft = useCallback(() => {
    try {
      storage.remove(key);
      setHasDraft(false);
      console.log(`Draft cleared: ${key}`);
    } catch (error) {
      console.error("Failed to clear draft:", error);
    }
  }, [key]);

  return {
    data,
    setData,
    clearDraft,
    saveDraft,
    hasDraft,
    isLoading,
  };
}