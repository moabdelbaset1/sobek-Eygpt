import {
    LayoutDashboard,
    Package,
    Users,
    Settings,
    LogOut,
    Newspaper,
    FileText,
    Briefcase
} from 'lucide-react';

export const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { id: 'human-products', label: 'Human Products', icon: Package, href: '/admin/products/human' },
    { id: 'vet-products', label: 'Veterinary Products', icon: Package, href: '/admin/products/veterinary' },
    { id: 'categories', label: 'Categories', icon: Users, href: '/admin/categories' },
    { id: 'applications', label: 'Job Applications', icon: FileText, href: '/admin/applications' },
    { id: 'media', label: 'Media & News', icon: Newspaper, href: '/admin/media' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
];
