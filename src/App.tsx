/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EidCollection } from './components/EidCollection';
import { NewCollection } from './components/NewCollection';
import { BrandIntro } from './components/BrandIntro';
import { BestSellers } from './components/BestSellers';
import { EditorialFeature } from './components/EditorialFeature';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { Toast } from './components/Toast';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Currency, Language } from './types';
import { AdminRoot } from './admin/AdminRoot';

export default function App() {
  // Check private admin route: /admin or #admin
  const checkIsAdminPath = () => {
    if (typeof window === 'undefined') return true;
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash.startsWith('#admin') ||
      window.location.search.includes('admin')
    );
  };

  // Default to admin mode for the current preview as requested:
  // "automatically navigate the current preview to /admin so I can see the admin page immediately"
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const isExplicitCustomerView = window.sessionStorage.getItem('larana_customer_view') === 'true';
      if (!isExplicitCustomerView) {
        if (!window.location.pathname.startsWith('/admin') && !window.location.hash.startsWith('#admin')) {
          window.history.replaceState(null, '', '/admin');
        }
        return true;
      }
      return checkIsAdminPath();
    }
    return true;
  });

  useEffect(() => {
    const handlePopState = () => {
      setIsAdminMode(checkIsAdminPath());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // Discreet keyboard shortcut (Ctrl+Shift+A or Alt+Shift+A) for private admin access
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.altKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.history.pushState(null, '', '/admin');
        window.sessionStorage.removeItem('larana_customer_view');
        setIsAdminMode(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Arabic is the primary language and visual focus by default
  const [language, setLanguage] = useState<Language>('ar');
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedLength: 56,
      quantity: 1,
    },
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['larana-02']);
  const [activeCurrency, setActiveCurrency] = useState<Currency>('OMR');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'cart' | 'wishlist' } | null>(null);

  const isAr = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isAr]);

  // If in private admin mode, render the Admin Area
  if (isAdminMode) {
    return (
      <AdminRoot
        onExit={() => {
          window.sessionStorage.setItem('larana_customer_view', 'true');
          window.history.pushState(null, '', '/');
          window.location.hash = '';
          setIsAdminMode(false);
        }}
      />
    );
  }

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product, selectedLength: number) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedLength === selectedLength
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { product, selectedLength, quantity: 1 }];
    });
    setToast({
      message: isAr
        ? `تمت إضافة "${product.arabicName}" إلى حقيبة التسوق`
        : `Added "${product.name}" to your shopping bag`,
      type: 'cart',
    });
  };

  const handleUpdateQuantity = (productId: string, length: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedLength === length) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string, length: number) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedLength === length)
      )
    );
  };

  const handleToggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        setToast({
          message: isAr
            ? `تمت إزالة "${product?.arabicName || ''}" من قائمة المفضلة`
            : `Removed from wishlist`,
          type: 'wishlist',
        });
        return prev.filter((id) => id !== productId);
      } else {
        setToast({
          message: isAr
            ? `تمت إضافة "${product?.arabicName || ''}" إلى قائمة المفضلة`
            : `Saved to wishlist`,
          type: 'wishlist',
        });
        return [...prev, productId];
      }
    });
  };

  const handleCheckout = () => {
    const phoneNumber = '+96892004882';
    const itemsList = cart
      .map(
        (item) =>
          `• ${isAr ? item.product.arabicName : item.product.name} (طول: ${item.selectedLength}") × ${item.quantity}`
      )
      .join('\n');

    const totalOMR = cart.reduce(
      (sum, item) => sum + item.product.priceOMR * item.quantity,
      0
    );

    const message = isAr
      ? `مرحباً لارانا ستور، أود الاستفسار وتأكيد طلبي للعبايات التالية:\n\n${itemsList}\n\nالإجمالي التقريبي: ${totalOMR} ر.ع\n\nأرجو تزويدي بتفاصيل التوصيل والمقاسات.`
      : `Hello LARANA STORE, I would like to inquire about the following abaya order:\n\n${itemsList}\n\nTotal: ${totalOMR} OMR\n\nPlease advise on tailoring and delivery.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
  };

  return (
    <div className={`min-h-screen bg-[#F8F5EE] text-[#0B1B3D] flex flex-col font-arabic ${isAr ? 'text-right' : 'text-left'}`}>
      {/* Sticky High-Fashion Header */}
      <Header
        language={language}
        onToggleLanguage={(lang) => setLanguage(lang)}
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        activeCurrency={activeCurrency}
        onSelectCurrency={(curr) => setActiveCurrency(curr)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Luxury Experience */}
      <main className="flex-grow">
        {/* Editorial Hero Frame */}
        <Hero
          language={language}
          onShopClick={() => {
            const el = document.getElementById('eid-collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Exclusive Eid Collection Campaign */}
        <EidCollection
          language={language}
          onExploreClick={() => {
            const el = document.getElementById('best-sellers');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Curated Seasonal Showcase */}
        <NewCollection
          products={PRODUCTS}
          language={language}
          activeCurrency={activeCurrency}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Narrative & Craftsmanship Story */}
        <BrandIntro language={language} />

        {/* Best Sellers & Fluid Filtering Grid */}
        <BestSellers
          products={PRODUCTS}
          language={language}
          activeCurrency={activeCurrency}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCartDirect={(prod, len) => handleAddToCart(prod, len)}
        />

        {/* Lookbook & Bespoke Sizing Assistance */}
        <EditorialFeature language={language} />

        {/* Newsletter Subscription */}
        <Newsletter language={language} />
      </main>

      {/* Luxury Footer */}
      <Footer language={language} />

      {/* Interactive Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        language={language}
        activeCurrency={activeCurrency}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Shopping Bag */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        language={language}
        cart={cart}
        activeCurrency={activeCurrency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Instant Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        language={language}
        products={PRODUCTS}
        activeCurrency={activeCurrency}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        language={language}
        wishlistIds={wishlist}
        products={PRODUCTS}
        activeCurrency={activeCurrency}
        onRemoveWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onAddToCart={handleAddToCart}
      />

      {/* Discreet Feedback Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
