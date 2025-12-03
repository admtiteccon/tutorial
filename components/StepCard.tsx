import React from 'react';
import { StepProps } from '../types';

export const StepCard: React.FC<StepProps> = ({ badge, title, children, note }) => {
  return (
    <div className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex-shrink-0 pt-1">
        <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-xl text-2xl font-bold text-slate-700 shadow-inner border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
          {badge}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          {title}
        </h4>
        <div className="text-slate-600 space-y-2 leading-relaxed text-base break-words">
          {children}
        </div>
        {note && (
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-sm text-blue-900 flex gap-3 items-start">
            <span className="font-bold whitespace-nowrap">Dica:</span>
            <span className="leading-snug">{note}</span>
          </div>
        )}
      </div>
    </div>
  );
};