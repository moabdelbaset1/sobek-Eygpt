'use client';

import { useState, useCallback, useEffect } from 'react';

export interface WishlistItem {
  $id: string;
  product_id: string;
  user_id: string;
  added_at: string;
  $createdAt: string;
}

export interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

export interface UseWishlistReturn {
  wishlist: WishlistState;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

export const useWishlist = (isAuthenticated: boolean = false): UseWishlistReturn => {
  const [wishlist, setWishlist] = useState<WishlistState>({
    items: [],
    isLoading: false,
    error: null,
  });

  // Load wishlist from API
  const refreshWishlist = useCallback(async () => {
    if (!isAuthenticated) return;

    setWishlist(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/wishlist');
      const data = await response.json();

      if (data.success) {
        setWishlist(prev => ({
          ...prev,
          items: data.items || [],
          isLoading: false,
        }));
      } else {
        throw new Error(data.error || 'Failed to load wishlist');
      }
    } catch (error) {
      setWishlist(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load wishlist',
      }));
    }
  }, [isAuthenticated]);

  // Load wishlist on mount and when authentication changes
  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const addToWishlist = useCallback(async (productId: string) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required to add items to wishlist');
    }

    setWishlist(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh wishlist to get updated data
        await refreshWishlist();
      } else {
        throw new Error(data.error || 'Failed to add item to wishlist');
      }
    } catch (error) {
      setWishlist(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to add item to wishlist',
      }));
      throw error;
    }
  }, [isAuthenticated, refreshWishlist]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required to modify wishlist');
    }

    setWishlist(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`/api/wishlist?productId=${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // Refresh wishlist to get updated data
        await refreshWishlist();
      } else {
        throw new Error(data.error || 'Failed to remove item from wishlist');
      }
    } catch (error) {
      setWishlist(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to remove item from wishlist',
      }));
      throw error;
    }
  }, [isAuthenticated, refreshWishlist]);

  const clearWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      throw new Error('Authentication required to clear wishlist');
    }

    setWishlist(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Remove all items one by one
      const promises = wishlist.items.map(item =>
        fetch(`/api/wishlist?productId=${item.product_id}`, {
          method: 'DELETE',
        })
      );

      await Promise.all(promises);

      // Refresh wishlist to get updated data
      await refreshWishlist();
    } catch (error) {
      setWishlist(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to clear wishlist',
      }));
      throw error;
    }
  }, [isAuthenticated, wishlist.items, refreshWishlist]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.items.some(item => item.product_id === productId);
  }, [wishlist.items]);

  const toggleWishlist = useCallback(async (productId: string) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist]);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    toggleWishlist,
    refreshWishlist,
  };
};