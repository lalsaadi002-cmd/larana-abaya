import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Store,
} from 'lucide-react';
import { AdminSection, AdminUser } from './types';

interface AdminDashboardProps {
  user: AdminUser;
  onLogout: () => void;
  onViewStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, onViewStore }) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'الرئيسية', icon: <LayoutDashboard size={18} /> },
    { id: 'products', label: 'المنتجات', icon: <Package size={18} /> },
    { id: 'add-product', label: 'إضافة منتج', icon: <PlusCircle size={18} /> },
    { id: 'categories', label: 'التصنيفات', icon: <FolderTree size={18} /> },
    { id: 'orders', label: 'الطلبات', icon: <ShoppingBag size={18} /> },
    { id: 'settings', label: 'إعدادات المتجر', icon: <Settings size={18} /> },
  ];

  const handleNavClick = (section: AdminSection) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  // Section title mapping
  const sectionTitles: Record<AdminSection, { title: string; subtitle: string }> = {
    home: {
      title: 'لوحة إدارة لارانا',
      subtitle: 'نظرة عامة على أداء ومخزون دار أزياء لارانا ستور',
    },
    products: {
      title: 'إدارة المنتجات والعبايات',
      subtitle: 'استعراض كافة العبايات، المقاسات، والأسعار المسجلة',
    },
    'add-product': {
      title: 'إضافة عباية جديدة',
      subtitle: 'إدراج تصميم جديد مع تفاصيل القماش، الطول، والصور',
    },
    categories: {
      title: 'تصنيفات المجموعات',
      subtitle: 'تنظيم أقسام الكولكشن: كوتور، إطلالة يومية، كولكشن العيد، وبشت',
    },
    orders: {
      title: 'سجل الطلبات والمبيعات',
      subtitle: 'متابعة طلبات العملاء وحالات التجهيز والشحن',
    },
    settings: {
      title: 'إعدادات المتجر العامة',
      subtitle: 'خيارات العملات، أرقام الواتساب، وبيانات الشحن في سلطنة عُمان والخليج',
    },
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F5EE] text-[#0B1B3D] flex flex-col font-arabic">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-[#0B1B3D] text-[#F8F5EE] border-b border-[#C6A972]/20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 text-[#F8F5EE]/80 hover:text-[#C6A972] transition-colors cursor-pointer"
            aria-label="القائمة الجانبية"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-2.5">
            <span className="font-serif text-lg tracking-[0.2em] text-[#C6A972] uppercase font-light">
              LARANA
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-[#C6A972]/20 text-[#C6A972] border border-[#C6A972]/40 rounded-xs">
              لوحة الإدارة
            </span>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <button
            onClick={onViewStore}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#08142D] border border-[#C6A972]/30 text-[#F8F5EE]/85 hover:text-[#C6A972] transition-colors cursor-pointer"
            title="مشاهدة المتجر كعميل"
          >
            <Store size={13} className="text-[#C6A972]" />
            <span>عرض المتجر</span>
            <ExternalLink size={11} className="text-[#C6A972]" />
          </button>

          <div className="h-4 w-[1px] bg-[#C6A972]/20 hidden sm:block" />

          {/* Admin Profile */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#08142D] border border-[#C6A972]/40 flex items-center justify-center text-[11px] text-[#C6A972] font-serif uppercase">
              {user.name.charAt(0) || 'L'}
            </div>
            <div className="hidden md:block text-right">
              <span className="text-xs font-medium text-[#F8F5EE] block leading-none">
                {user.name}
              </span>
              <span className="text-[10px] text-[#C6A972] font-light">
                مدير النظام
              </span>
            </div>
          </div>

          {/* Quick Logout */}
          <button
            onClick={onLogout}
            className="p-1.5 text-[#F8F5EE]/70 hover:text-red-400 transition-colors cursor-pointer"
            title="تسجيل الخروج"
            aria-label="تسجيل الخروج"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex relative">
        {/* Sidebar Overlay (Mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-[#08142D]/70 backdrop-blur-xs lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:sticky top-14 bottom-0 right-0 z-40 w-64 bg-[#08142D] text-[#F8F5EE] border-l border-[#C6A972]/20 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
          style={{ height: 'calc(100vh - 53px)' }}
        >
          {/* Nav List */}
          <div className="space-y-1 py-2">
            <div className="px-3 pb-3 mb-2 border-b border-[#C6A972]/15 flex items-center justify-between">
              <span className="text-[11px] text-[#C6A972] font-medium tracking-wide">
                قائمة الإدارة
              </span>
              <span className="text-[10px] text-[#F8F5EE]/50">
                v1.0
              </span>
            </div>

            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-arabic transition-all cursor-pointer text-right ${
                    isActive
                      ? 'bg-[#0B1B3D] text-[#C6A972] border-r-2 border-[#C6A972] font-medium shadow-sm'
                      : 'text-[#F8F5EE]/75 hover:bg-[#0B1B3D]/50 hover:text-[#F8F5EE]'
                  }`}
                >
                  <span className={isActive ? 'text-[#C6A972]' : 'text-[#F8F5EE]/60'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Actions inside Sidebar */}
          <div className="pt-4 border-t border-[#C6A972]/15 space-y-2">
            <button
              onClick={onViewStore}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-[#F8F5EE]/80 hover:text-[#C6A972] hover:bg-[#0B1B3D]/50 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Store size={14} className="text-[#C6A972]" />
                <span>المتجر العام</span>
              </span>
              <ArrowUpRight size={13} className="text-[#C6A972]/70" />
            </button>

            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-red-300/80 hover:text-red-300 hover:bg-red-950/30 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {/* Section Breadcrumb & Header */}
          <div className="mb-8 pb-5 border-b border-[#0B1B3D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#5A534B] mb-1">
                <span>لوحة التحكم</span>
                <span>/</span>
                <span className="text-[#0B1B3D] font-medium">
                  {sectionTitles[activeSection].title}
                </span>
              </div>
              <h1 className="font-arabic text-2xl sm:text-3xl text-[#0B1B3D]">
                {sectionTitles[activeSection].title}
              </h1>
              <p className="text-xs sm:text-sm text-[#5A534B] font-light mt-1">
                {sectionTitles[activeSection].subtitle}
              </p>
            </div>

            {/* Quick action button dependent on section */}
            {activeSection !== 'add-product' && (
              <button
                onClick={() => setActiveSection('add-product')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 text-xs font-arabic hover:bg-[#0E224D] transition-colors cursor-pointer shadow-sm self-start sm:self-auto"
              >
                <PlusCircle size={14} className="text-[#C6A972]" />
                <span>إضافة عباية جديدة</span>
              </button>
            )}
          </div>

          {/* Render Sections */}
          {activeSection === 'home' && <HomeOverview onNavigate={setActiveSection} />}
          {activeSection === 'products' && <ProductsPlaceholder onAddProduct={() => setActiveSection('add-product')} />}
          {activeSection === 'add-product' && <AddProductPlaceholder />}
          {activeSection === 'categories' && <CategoriesPlaceholder />}
          {activeSection === 'orders' && <OrdersPlaceholder />}
          {activeSection === 'settings' && <SettingsPlaceholder />}
        </main>
      </div>
    </div>
  );
};

/* =========================================================================
   Section 1: الرئيسية (Dashboard Home with Required Summary Cards)
   CRITICAL REQUIREMENT: Use 0 or empty states until real data is connected.
   ========================================================================= */
const HomeOverview: React.FC<{ onNavigate: (section: AdminSection) => void }> = ({ onNavigate }) => {
  const summaryCards = [
    {
      id: 'total_products',
      title: 'إجمالي المنتجات',
      count: 0,
      unit: 'منتج مسجل',
      subtitle: 'بانتظار ربط قاعدة بيانات المنتجات',
      icon: <Package size={20} className="text-[#C6A972]" />,
      action: () => onNavigate('products'),
    },
    {
      id: 'available_products',
      title: 'المنتجات المتوفرة',
      count: 0,
      unit: 'متوفر للطلب',
      subtitle: 'القطع المعروضة في المتجر حالياً',
      icon: <CheckCircle size={20} className="text-emerald-600" />,
      action: () => onNavigate('products'),
    },
    {
      id: 'out_of_stock',
      title: 'المنتجات غير المتوفرة',
      count: 0,
      unit: 'نفدت من المخزون',
      subtitle: 'القطع التي تحتاج إعادة تفصيل وتوريد',
      icon: <AlertCircle size={20} className="text-amber-600" />,
      action: () => onNavigate('products'),
    },
    {
      id: 'orders',
      title: 'الطلبات',
      count: 0,
      unit: 'طلب جديد',
      subtitle: 'سجل الطلبات الواردة عبر الموقع والواتساب',
      icon: <ShoppingBag size={20} className="text-[#0B1B3D]" />,
      action: () => onNavigate('orders'),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 4 Required Elegant Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {summaryCards.map((card) => (
          <div
            key={card.id}
            onClick={card.action}
            className="group bg-[#F8F5EE] border border-[#C6A972]/30 p-5 sm:p-6 shadow-xs hover:border-[#0B1B3D] transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs font-arabic text-[#0B1B3D] font-medium flex items-center gap-1.5">
                <span>{card.title}</span>
                <span className="text-[#C6A972] font-semibold">— 0</span>
              </span>
              <div className="p-2 bg-[#EFE8DE] border border-[#C6A972]/20">
                {card.icon}
              </div>
            </div>

            <div className="space-y-1">
              {/* Displaying 0 strictly as required */}
              <div className="flex items-baseline gap-2">
                <span className="font-arabic text-3xl sm:text-4xl font-normal text-[#0B1B3D] tabular-nums">
                  {card.count}
                </span>
                <span className="text-xs text-[#5A534B]">
                  {card.unit}
                </span>
              </div>
              <p className="text-[11px] text-[#5A534B]/80 font-light pt-1">
                {card.subtitle}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#0B1B3D]/10 flex items-center justify-between text-[11px] text-[#0B1B3D] group-hover:text-[#C6A972] transition-colors">
              <span>عرض التفاصيل</span>
              <ArrowUpRight size={12} className="text-[#C6A972]" />
            </div>
          </div>
        ))}
      </div>

      {/* Integration Status & System Ready Banner */}
      <div className="p-6 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#C6A972]">
            <ShieldCheck size={14} />
            <span>نظام الإدارة الداخلي جاهز وآمن</span>
          </div>
          <h3 className="font-arabic text-lg sm:text-xl font-normal text-[#F8F5EE]">
            البنية التحتية للوحة الإدارة مكتملة
          </h3>
          <p className="text-xs text-[#F8F5EE]/75 font-light max-w-2xl leading-relaxed">
            تم إعداد بنية التوثيق وصفحات الإدارة المخصصة لدار أزياء لارانا، وتعمل بنمط البيانات الحقيقية تمهيداً لربط خدمة المصادقة وقاعدة البيانات السحابية (Firebase / Backend API) في المرحلة القادمة.
          </p>
        </div>

        <button
          onClick={() => onNavigate('add-product')}
          className="px-5 py-2.5 bg-[#C6A972] text-[#0B1B3D] text-xs font-arabic font-medium hover:bg-[#D4BC8B] transition-colors cursor-pointer shrink-0"
        >
          تجربة نموذج إضافة منتج
        </button>
      </div>

      {/* Quick Launchpad Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders Placeholder */}
        <div className="p-6 bg-[#EFE8DE] border border-[#C6A972]/30 space-y-4">
          <div className="flex items-center justify-between border-b border-[#C6A972]/20 pb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag size={16} className="text-[#0B1B3D]" />
              <h4 className="font-arabic text-sm font-medium text-[#0B1B3D]">
                آخر الطلبات الواردة
              </h4>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs text-[#0B1B3D] hover:text-[#C6A972] transition-colors"
            >
              عرض الكل
            </button>
          </div>

          {/* Empty State strictly adhered to */}
          <div className="py-10 text-center space-y-2 text-[#5A534B]">
            <div className="w-10 h-10 rounded-full bg-[#F8F5EE] border border-[#C6A972]/30 mx-auto flex items-center justify-center text-[#5A534B]">
              <Clock size={18} />
            </div>
            <p className="text-xs font-arabic text-[#0B1B3D]">
              لا توجد طلبات جديدة مسجلة حالياً
            </p>
            <p className="text-[11px] font-light max-w-xs mx-auto">
              ستظهر هنا الطلبات فور إتمام العملاء للتسوق عبر المتجر أو التواصل بالواتساب.
            </p>
          </div>
        </div>

        {/* Collections Overview */}
        <div className="p-6 bg-[#EFE8DE] border border-[#C6A972]/30 space-y-4">
          <div className="flex items-center justify-between border-b border-[#C6A972]/20 pb-3">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-[#0B1B3D]" />
              <h4 className="font-arabic text-sm font-medium text-[#0B1B3D]">
                المجموعات والتصنيفات الجاهزة
              </h4>
            </div>
            <button
              onClick={() => onNavigate('categories')}
              className="text-xs text-[#0B1B3D] hover:text-[#C6A972] transition-colors"
            >
              إدارة التصنيفات
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { name: 'كولكشن العيد (EID COLLECTION)', tag: 'موسمي خاص', count: 0 },
              { name: 'عبايات الكوتور (Couture)', tag: 'فاخر', count: 0 },
              { name: 'إطلالة يومية راقية (Everyday Luxury)', tag: 'يومي', count: 0 },
              { name: 'عبايات البشت والكاب (Bisht & Capes)', tag: 'أصالة', count: 0 },
            ].map((cat, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#F8F5EE] border border-[#C6A972]/20 flex items-center justify-between"
              >
                <div>
                  <span className="font-arabic text-[#0B1B3D] block">{cat.name}</span>
                  <span className="text-[10px] text-[#C6A972]">{cat.tag}</span>
                </div>
                <span className="text-xs font-arabic text-[#5A534B] tabular-nums">
                  {cat.count} منتج
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   Section 2: المنتجات (Products Placeholder)
   ========================================================================= */
const ProductsPlaceholder: React.FC<{ onAddProduct: () => void }> = ({ onAddProduct }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Filter and Search Bar Placeholder */}
      <div className="p-4 bg-[#EFE8DE] border border-[#C6A972]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="بحث عن عباية باسم التصميم أو القماش..."
            disabled
            className="w-full bg-[#F8F5EE] border border-[#C6A972]/30 pl-3 pr-8 py-2 text-xs text-[#0B1B3D] placeholder-[#5A534B]/60 focus:outline-none"
          />
          <Search size={14} className="absolute right-2.5 top-2.5 text-[#5A534B]" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            disabled
            className="flex-1 sm:flex-none px-3 py-2 bg-[#F8F5EE] border border-[#C6A972]/30 text-xs text-[#5A534B] flex items-center justify-center gap-1.5 cursor-not-allowed opacity-75"
          >
            <Filter size={13} className="text-[#C6A972]" />
            <span>تصفية التصنيفات</span>
          </button>
          <button
            onClick={onAddProduct}
            className="px-4 py-2 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 text-xs font-arabic hover:bg-[#0E224D] transition-colors cursor-pointer"
          >
            + إضافة عباية
          </button>
        </div>
      </div>

      {/* Empty State Container */}
      <div className="py-20 px-6 bg-[#F8F5EE] border border-[#C6A972]/30 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-[#EFE8DE] border border-[#C6A972]/40 mx-auto flex items-center justify-center text-[#0B1B3D]">
          <Package size={24} strokeWidth={1.5} />
        </div>

        <div className="space-y-1">
          <h3 className="font-arabic text-lg text-[#0B1B3D]">
            لم يتم ربط قائمة منتجات حية بعد
          </h3>
          <p className="text-xs text-[#5A534B] font-light max-w-md mx-auto leading-relaxed">
            واجهة إدارة المنتجات جاهزة بالكامل. يمكنك البدء بإضافة أول عباية عبر نموذج الإضافة، وسيتم ربط التخزين الفعلي مع قاعدة البيانات السحابية فور تفعيلها.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onAddProduct}
            className="px-6 py-2.5 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 text-xs font-arabic hover:bg-[#0E224D] transition-colors cursor-pointer"
          >
            فتح نموذج إضافة منتج
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   Section 3: إضافة منتج (Add Product Placeholder)
   ========================================================================= */
const AddProductPlaceholder: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-[#F8F5EE] border border-[#C6A972]/30 p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#0B1B3D]/10 pb-4">
          <h3 className="font-arabic text-lg text-[#0B1B3D]">
            نموذج إدراج عباية جديدة في المتجر
          </h3>
          <p className="text-xs text-[#5A534B] font-light mt-0.5">
            هيكل الإدخال مجهز بجميع متطلبات دار الأزياء والمواصفات الفنية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Arabic */}
          <div className="space-y-1.5">
            <label className="block text-xs font-arabic text-[#0B1B3D] font-medium">
              اسم العباية (بالعربية) *
            </label>
            <input
              type="text"
              placeholder="مثال: عباية أصايل الحريرية"
              className="w-full bg-[#EFE8DE] border border-[#C6A972]/30 px-3.5 py-2.5 text-xs text-[#0B1B3D] focus:outline-none focus:border-[#0B1B3D]"
            />
          </div>

          {/* Name English */}
          <div className="space-y-1.5">
            <label className="block text-xs font-arabic text-[#0B1B3D] font-medium">
              اسم العباية (بالإنجليزية)
            </label>
            <input
              type="text"
              dir="ltr"
              placeholder="e.g. Asayel Silk Abaya"
              className="w-full bg-[#EFE8DE] border border-[#C6A972]/30 px-3.5 py-2.5 text-xs text-[#0B1B3D] focus:outline-none focus:border-[#0B1B3D]"
            />
          </div>

          {/* Price OMR */}
          <div className="space-y-1.5">
            <label className="block text-xs font-arabic text-[#0B1B3D] font-medium">
              السعر بالريال العُماني (OMR) *
            </label>
            <input
              type="number"
              step="0.5"
              placeholder="مثال: 55.0"
              className="w-full bg-[#EFE8DE] border border-[#C6A972]/30 px-3.5 py-2.5 text-xs text-[#0B1B3D] focus:outline-none focus:border-[#0B1B3D]"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-arabic text-[#0B1B3D] font-medium">
              المجموعة / التصنيف *
            </label>
            <select className="w-full bg-[#EFE8DE] border border-[#C6A972]/30 px-3.5 py-2.5 text-xs text-[#0B1B3D] focus:outline-none focus:border-[#0B1B3D]">
              <option>كولكشن العيد (EID COLLECTION)</option>
              <option>عبايات الكوتور (Couture)</option>
              <option>إطلالة يومية راقية (Everyday Luxury)</option>
              <option>بشت وكاب (Bisht & Capes)</option>
            </select>
          </div>

          {/* Fabric */}
          <div className="space-y-1.5">
            <label className="block text-xs font-arabic text-[#0B1B3D] font-medium">
              نوع القماش والتفاصيل *
            </label>
            <input
              type="text"
              placeholder="مثال: كريب ياباني ملكي مع تطريز يدوي"
              className="w-full bg-[#EFE8DE] border border-[#C6A972]/30 px-3.5 py-2.5 text-xs text-[#0B1B3D] focus:outline-none focus:border-[#0B1B3D]"
            />
          </div>

          {/* Color */}
          <div className="space-y-1.5">
            <label className="block text-xs font-arabic text-[#0B1B3D] font-medium">
              اللون الأساسي
            </label>
            <input
              type="text"
              placeholder="مثال: كحلي داكن / أسود ملكي"
              className="w-full bg-[#EFE8DE] border border-[#C6A972]/30 px-3.5 py-2.5 text-xs text-[#0B1B3D] focus:outline-none focus:border-[#0B1B3D]"
            />
          </div>
        </div>

        {/* Lengths Available */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-arabic text-[#0B1B3D] font-medium">
            الأطوال المتوفرة (إنش)
          </label>
          <div className="flex flex-wrap gap-3 text-xs">
            {[52, 54, 56, 58, 60].map((len) => (
              <label
                key={len}
                className="inline-flex items-center gap-2 p-2 bg-[#EFE8DE] border border-[#C6A972]/30 cursor-pointer"
              >
                <input type="checkbox" defaultChecked className="accent-[#0B1B3D]" />
                <span>طول {len}"</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload Area Placeholder */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-arabic text-[#0B1B3D] font-medium">
            صور التصميم التحريرية
          </label>
          <div className="p-8 border-2 border-dashed border-[#C6A972]/40 bg-[#EFE8DE]/50 text-center space-y-2">
            <PlusCircle size={24} className="mx-auto text-[#C6A972]" />
            <p className="text-xs text-[#0B1B3D]">
              اسحبي الصور هنا أو انقري لتحديد ملفات الصور
            </p>
            <p className="text-[11px] text-[#5A534B]">
              يُفضل صور طولية عالية الجودة (نسبة 3:4 أو 4:5)
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 border-t border-[#0B1B3D]/10 flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 bg-[#EFE8DE] text-[#0B1B3D] text-xs font-arabic hover:bg-[#E5DDCF] transition-colors"
          >
            مسح الحقول
          </button>
          <button
            type="button"
            onClick={() => alert('هيكل إضافة المنتجات جاهز، وسيتم تفعيل الحفظ المباشر فور ربط قاعدة البيانات.')}
            className="px-6 py-2.5 bg-[#0B1B3D] text-[#F8F5EE] border border-[#C6A972]/40 text-xs font-arabic hover:bg-[#0E224D] transition-colors cursor-pointer shadow-sm"
          >
            حفظ العباية في المتجر
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   Section 4: التصنيفات (Categories Placeholder)
   ========================================================================= */
const CategoriesPlaceholder: React.FC = () => {
  const categories = [
    {
      id: 'eid',
      title: 'كولكشن العيد (Eid Collection)',
      desc: 'حملة العيد الحصرية بالقصّات الانسيابية والأقمشة الخفيفة',
      badge: 'نشط في الصفحة الرئيسية',
    },
    {
      id: 'couture',
      title: 'عبايات الكوتور (Couture)',
      desc: 'تصاميم المناسبات الخاصة بأقمشة وتطريزات فاخرة',
      badge: 'مجموعة دائمة',
    },
    {
      id: 'everyday',
      title: 'إطلالة يومية راقية (Everyday Luxury)',
      desc: 'عبايات يومية مريحة وعملية بخامات ناعمة وباردة',
      badge: 'مجموعة دائمة',
    },
    {
      id: 'bisht',
      title: 'بشت وكاب (Bisht & Capes)',
      desc: 'قصات البشت الخليجي والعُماني بلمسات عصرية معاصرة',
      badge: 'مجموعة دائمة',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-5 bg-[#F8F5EE] border border-[#C6A972]/30 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-arabic text-base text-[#0B1B3D]">
                  {c.title}
                </h4>
                <span className="text-[10px] px-2 py-0.5 bg-[#C6A972]/20 text-[#0B1B3D] border border-[#C6A972]/30">
                  {c.badge}
                </span>
              </div>
              <p className="text-xs text-[#5A534B] font-light">
                {c.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-[#0B1B3D]/10 flex items-center justify-between text-xs text-[#5A534B]">
              <span>إجمالي القطع: <strong className="text-[#0B1B3D]">0</strong></span>
              <button
                disabled
                className="text-[11px] text-[#0B1B3D] hover:text-[#C6A972] transition-colors cursor-not-allowed opacity-60"
              >
                تعديل التصنيف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   Section 5: الطلبات (Orders Placeholder)
   ========================================================================= */
const OrdersPlaceholder: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs border-b border-[#0B1B3D]/10">
        {['الكل (0)', 'جديد (0)', 'قيد التجهيز (0)', 'تم الشحن (0)', 'مكتمل (0)'].map(
          (tab, idx) => (
            <button
              key={idx}
              className={`px-3 py-2 whitespace-nowrap ${
                idx === 0
                  ? 'border-b-2 border-[#C6A972] text-[#0B1B3D] font-medium'
                  : 'text-[#5A534B]'
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Orders Table Empty State */}
      <div className="bg-[#F8F5EE] border border-[#C6A972]/30 p-12 text-center space-y-3">
        <div className="w-12 h-12 bg-[#EFE8DE] border border-[#C6A972]/30 rounded-full mx-auto flex items-center justify-center text-[#5A534B]">
          <ShoppingBag size={20} />
        </div>
        <h4 className="font-arabic text-base text-[#0B1B3D]">
          لا توجد طلبات مسجلة في المتجر حتى الآن
        </h4>
        <p className="text-xs text-[#5A534B] font-light max-w-sm mx-auto">
          عندما يقوم العملاء بالطلب واختيار المقاس، ستظهر أرقام الطلبات وبيانات العميل وعناوين التوصيل في هذا الجدول مباشرة.
        </p>
      </div>
    </div>
  );
};

/* =========================================================================
   Section 6: إعدادات المتجر (Settings Placeholder)
   ========================================================================= */
const SettingsPlaceholder: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-[#F8F5EE] border border-[#C6A972]/30 p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="font-arabic text-lg text-[#0B1B3D]">
            بيانات وهوية دار الأزياء
          </h3>
          <p className="text-xs text-[#5A534B] font-light">
            إعدادات التواصل الرسمية والعملات المدعومة في المتجر
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="space-y-1.5">
            <label className="text-[#0B1B3D] font-medium block">
              اسم المتجر
            </label>
            <input
              type="text"
              readOnly
              value="LARANA STORE (لارانا ستور)"
              className="w-full bg-[#EFE8DE] border border-[#C6A972]/30 px-3 py-2 text-[#0B1B3D]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#0B1B3D] font-medium block">
              المقر والمدينة
            </label>
            <input
              type="text"
              readOnly
              value="مسقط · سلطنة عُمان"
              className="w-full bg-[#EFE8DE] border border-[#C6A972]/30 px-3 py-2 text-[#0B1B3D]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#0B1B3D] font-medium block">
              رقم الواتساب الرسمي للطلبات
            </label>
            <input
              type="text"
              dir="ltr"
              readOnly
              value="+968 9200 4882"
              className="w-full bg-[#EFE8DE] border border-[#C6A972]/30 px-3 py-2 text-[#0B1B3D]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#0B1B3D] font-medium block">
              العملة الأساسية
            </label>
            <input
              type="text"
              readOnly
              value="ريال عُماني (OMR) مع دعم SAR, AED, USD"
              className="w-full bg-[#EFE8DE] border border-[#C6A972]/30 px-3 py-2 text-[#0B1B3D]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#0B1B3D]/10">
          <p className="text-[11px] text-[#5A534B]">
            جميع إعدادات المتجر متصلة بالواجهة وتُدار وفق أعلى معايير الخصوصية.
          </p>
        </div>
      </div>
    </div>
  );
};
