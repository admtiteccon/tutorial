import React, { useState } from 'react';
import { Meeting, MeetingStatus } from '../types';
import { Button } from './Button';

interface MeetingListProps {
  meetings: Meeting[];
  onViewDetails?: (meeting: Meeting) => void;
}

export const MeetingList: React.FC<MeetingListProps> = ({ meetings, onViewDetails }) => {
  const [filter, setFilter] = useState<string>('ALL');

  const filteredMeetings = meetings.filter(m => {
    if (filter === 'ALL') return true;
    return m.status === filter;
  });

  const getStatusBadge = (status: MeetingStatus) => {
    switch (status) {
      case MeetingStatus.SCHEDULED:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Agendada</span>;
      case MeetingStatus.IN_PROGRESS:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Em Andamento</span>;
      case MeetingStatus.COMPLETED:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Concluída</span>;
      case MeetingStatus.CANCELLED:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Cancelada</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">Reuniões Recentes</h3>
        <div className="flex items-center gap-2">
           <select 
             className="form-select block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
             value={filter}
             onChange={(e) => setFilter(e.target.value)}
           >
             <option value="ALL">Todos os Status</option>
             <option value={MeetingStatus.SCHEDULED}>Agendadas</option>
             <option value={MeetingStatus.COMPLETED}>Concluídas</option>
             <option value={MeetingStatus.IN_PROGRESS}>Em Andamento</option>
           </select>
           <Button size="sm" leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
             Nova
           </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assunto</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Data e Hora</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Participantes</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredMeetings.map((meeting) => (
              <tr key={meeting.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">{meeting.title}</span>
                    <span className="text-xs text-slate-500">{meeting.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{new Date(meeting.date).toLocaleDateString('pt-BR')}</div>
                  <div className="text-xs text-slate-500">{meeting.startTime} - {meeting.endTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex -space-x-2 overflow-hidden">
                    {meeting.participants.map((p) => (
                      <img 
                        key={p.id}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                        src={p.avatar}
                        alt={p.name}
                        title={p.name}
                      />
                    ))}
                    {meeting.participants.length > 3 && (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 text-xs text-slate-600 font-medium">
                        +2
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(meeting.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
                    onClick={() => onViewDetails?.(meeting)}
                  >
                    Editar
                  </button>
                  <button 
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => onViewDetails?.(meeting)}
                  >
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredMeetings.length === 0 && (
        <div className="p-10 text-center text-slate-500">
          Nenhuma reunião encontrada com este filtro.
        </div>
      )}
    </div>
  );
};