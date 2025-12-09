import React from 'react';
import { NavItem } from '../types';

interface SidebarProps {
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  navItems, 
  activeTab, 
  onTabChange, 
  isOpen, 
  onClose
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-slate-900/50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-72 bg-white/95 backdrop-blur-xl border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col items-center justify-center h-24 border-b border-slate-200 bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-2xl">💻</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-white tracking-wide">TECCON</span>
              <span className="text-base font-bold text-blue-200 uppercase tracking-wide">CONECTE</span>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu Principal</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 group
                ${activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <span className={`transition-transform duration-200 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}

          <a
            href="https://wa.me/5562999604213"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 text-green-600 hover:bg-green-50 hover:text-green-900 mt-2 border border-green-100 bg-green-50/30"
          >
            <span className="text-xl">💬</span>
            WhatsApp TI
          </a>
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-200 bg-slate-50/50">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-2">
               <span className="text-2xl">📱</span>
               <p className="text-sm font-bold text-slate-800">Versão Mobile</p>
             </div>
             <p className="text-xs text-slate-500 leading-relaxed">
               Escaneie o QR Code na tela inicial para levar este guia no seu celular.
             </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">© 2025 TI-TECCON • v1.2</p>
          </div>
        </div>
      </aside>
    </>
  );
};