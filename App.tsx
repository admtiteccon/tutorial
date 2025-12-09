import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { StepCard } from './components/StepCard';
import { NavItem } from './types';

// Flexible Icon Components
const HomeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);

const LaptopIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

const DesktopIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

const VideoIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);

const NAV_ITEMS: NavItem[] = [
  { id: 'intro', label: 'Início', icon: <HomeIcon className="w-5 h-5" /> },
  { id: 'notebook', label: 'Notebook / PC', icon: <LaptopIcon className="w-5 h-5" /> },
  { id: 'minipc', label: 'Mini-PC Lenovo', icon: <DesktopIcon className="w-5 h-5" /> },
  { id: 'videoconf', label: 'Videoconferência', icon: <VideoIcon className="w-5 h-5" /> },
];

function App() {
  const [activeTab, setActiveTab] = useState('intro');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videoTab, setVideoTab] = useState<'meet' | 'teams'>('meet');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQR = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://tutorial-steel.vercel.app/');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'teccon-qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      // Fallback
      window.open('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://tutorial-steel.vercel.app/', '_blank');
    }
  };

  return (
    <div className="flex h-screen bg-[#e0e7ff] overflow-hidden font-sans text-slate-800">
      
      {/* Background Mesh (Global) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 mesh-bg">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-100 via-purple-50 to-white" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/30 blur-[100px]" />
      </div>

      <Sidebar 
        navItems={NAV_ITEMS} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col relative z-10 h-full overflow-hidden">
        
        {/* Mobile Header */}
        <header className="lg:hidden bg-white/80 border-b border-slate-200 backdrop-blur-md h-16 flex items-center justify-between px-4 flex-shrink-0 no-print">
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <span className="font-bold text-slate-800">{NAV_ITEMS.find(n => n.id === activeTab)?.label}</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 scroll-smooth">
          <div className="max-w-5xl mx-auto pb-20 fade-in relative">
            
            {/* Download/Print Button */}
            <div className="absolute top-0 right-0 z-20 no-print hidden sm:block">
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Salvar Guia (PDF)
              </button>
            </div>

            {/* --- INÍCIO --- */}
            {activeTab === 'intro' && (
              <div className="space-y-8 print:space-y-4">
                <div className="text-center py-12 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl relative overflow-hidden print:shadow-none print:border-none print:bg-white">
                   <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 no-print" />
                   <div className="w-20 h-20 mx-auto bg-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-900/20 z-10 relative print:border print:border-slate-300">
                      <span className="text-4xl">🚀</span>
                   </div>
                   <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">TECCON CONECTE </h1>
                   <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed px-4">
                     Guia rápido e interativo para conexão de TV e Videoconferência (Google Meet & Teams).
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 no-print">
                  {/* Notebook Card */}
                  <button 
                    onClick={() => setActiveTab('notebook')}
                    className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-200 text-left h-full"
                  >
                    {/* Watermark Icon */}
                    <div className="absolute -bottom-6 -right-6 text-slate-100 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <LaptopIcon className="w-48 h-48 opacity-50" />
                    </div>
                    
                    <div className="relative z-10">
                      <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                        <LaptopIcon className="w-8 h-8" />
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">Notebook / PC</h3>
                      <p className="text-slate-500 text-base leading-relaxed pr-8">
                        Conectar seu dispositivo pessoal via transmissão sem fio ou cabo HDMI.
                      </p>
                    </div>
                  </button>

                  {/* Mini-PC Card */}
                  <button 
                    onClick={() => setActiveTab('minipc')}
                    className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-emerald-200 text-left h-full"
                  >
                     {/* Watermark Icon */}
                    <div className="absolute -bottom-6 -right-6 text-emerald-50 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <DesktopIcon className="w-48 h-48 opacity-60" />
                    </div>

                    <div className="relative z-10">
                      <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                        <DesktopIcon className="w-8 h-8" />
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">Mini-PC Lenovo</h3>
                      <p className="text-slate-500 text-base leading-relaxed pr-8">
                        Utilizar o computador dedicado ThinkCentre já conectado à TV.
                      </p>
                    </div>
                  </button>

                  {/* Videoconference Card */}
                   <button 
                    onClick={() => setActiveTab('videoconf')}
                    className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 border border-transparent text-left md:col-span-2"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between relative z-10 gap-6">
                      <div className="flex-1">
                        <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 text-white mb-6 backdrop-blur-sm border border-white/10 shadow-inner">
                          <VideoIcon className="w-8 h-8" />
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-3">Videoconferência</h3>
                        <p className="text-blue-100 text-base max-w-xl leading-relaxed">
                          Guia passo a passo para <strong>Google Meet</strong> e <strong>Microsoft Teams</strong> com configuração de áudio e vídeo integrados.
                        </p>
                      </div>
                      
                      <div className="hidden sm:flex -space-x-4 flex-shrink-0 mr-8">
                         <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl text-2xl border-4 border-indigo-500/50 transform group-hover:translate-x-2 transition-transform">🔵</div>
                         <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl text-2xl border-4 border-indigo-500/50 transform group-hover:-translate-x-2 transition-transform">🔷</div>
                      </div>
                    </div>
                  </button>
                </div>
                
                {/* QR Code Section */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-8 max-w-2xl mx-auto mt-12 break-inside-avoid">
                    <div className="bg-white p-2 rounded-xl shadow-inner border border-slate-100">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tutorial-steel.vercel.app/" alt="QR Code" className="w-32 h-32 rounded-lg" />
                    </div>
                    <div className="text-center sm:text-left flex-1">
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                           <span className="text-2xl">📱</span>
                           <h4 className="font-bold text-slate-900 text-lg">Acesse pelo celular</h4>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">
                          Tenha este guia na palma da mão para consultar as instruções enquanto configura o equipamento.
                        </p>
                        <a 
                          href="#" 
                          onClick={handleDownloadQR}
                          className="inline-flex items-center text-indigo-600 text-sm font-bold hover:text-indigo-800 transition-colors no-print"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                          Baixar imagem do QR Code
                        </a>
                    </div>
                </div>
              </div>
            )}

            {/* --- NOTEBOOK VIEW --- */}
            {activeTab === 'notebook' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 border-b-2 border-slate-200 pb-6 mb-8 break-inside-avoid">
                   <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                     <LaptopIcon className="w-8 h-8" />
                   </div>
                   <div>
                      <h2 className="text-3xl font-bold text-slate-900">Notebook / PC</h2>
                      <p className="text-slate-500">Conexão via transmissão sem fio</p>
                   </div>
                </div>

                <StepCard 
                  badge="1️⃣" 
                  title="LIGUE A TV E CONECTE-SE"
                  note="Use um adaptador USB/Wi-Fi se o seu dispositivo interno de conexão a internet não estiver funcionando."
                >
                  <p>Após ligar a TV, se precisar de acesso à internet, procure pela rede Wi-Fi:</p>
                  <p className="mt-3">
                    <span className="font-mono bg-slate-100 inline-block px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-bold tracking-wide">
                      TRN-WIFI
                    </span>
                    <span className="ml-3 text-sm text-slate-600">
                      <strong>Senha:</strong> <span className="font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200">ke93mt02</span>
                    </span>
                  </p>
                </StepCard>

                <StepCard badge="2️⃣" title="PROJETAR TELA">
                  <p>No seu notebook (Windows), pressione as teclas <strong>⊞ Windows + K</strong> para abrir o menu de conexão no canto inferior direito.</p>
                  <p className="mt-2">Selecione o display correspondente à sala na lista de dispositivos disponíveis (TECCON).
                  (Aguarde...)
                  O Windows irá detectar a TV e se a conexão estiver correta, a tela do notebook começará a ser exibida simultâneamente na TV.
                  <p>Pronto! Agora você já pode utilizar a transmissão de tela do seu notebook, na conexão TECCON/TV.</p> 
                  </p>
                </StepCard>

                <StepCard badge="3️⃣" title="OPÇÃO VIA CABO" note="O cabo HDMI geralmente fica disponível na mesa.">
                  <p>Se preferir ou se a conexão sem fio falhar, conecte o cabo HDMI diretamente na porta do seu notebook.</p>
                  <p className="mt-2">Use o controle remoto da TV pressionando o botão <strong>SOURCE</strong> para selecionar a entrada <strong>HDMI</strong> que está ligada o notebook.</p>
                </StepCard>
              </div>
            )}

            {/* --- MINI-PC VIEW --- */}
            {activeTab === 'minipc' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center gap-4 border-b-2 border-slate-200 pb-6 mb-8 break-inside-avoid">
                   <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                     <DesktopIcon className="w-8 h-8" />
                   </div>
                   <div>
                      <h2 className="text-3xl font-bold text-slate-900">Mini-PC Lenovo</h2>
                      <p className="text-slate-500">Utilizando o computador da sala</p>
                   </div>
                </div>

                <StepCard badge="1️⃣" title="LIGAR O EQUIPAMENTO">
                  <p>Verifique se o Mini-PC (fixado atrás da TV ou na estante) está ligado.</p>
                  <p className="mt-2">Na TV, selecione a entrada <strong>HDMI 1</strong> (ou onde estiver identificado como PC).</p>
                </StepCard>

                <StepCard badge="2️⃣" title="ACESSÓRIOS">
                  <p>Utilize o teclado e mouse sem fio disponíveis na mesa de reunião.</p>
                  <p className="mt-2">Caso não funcionem, verifique se estão ligados (botão na parte inferior) ou se as pilhas precisam ser trocadas.</p>
                </StepCard>

                <StepCard badge="3️⃣" title="LOGIN">
                  <p>Caso o computador esteja bloqueado, utilize as credenciais padrão do setor ou solicite acesso à TI.</p>
                </StepCard>
              </div>
            )}

            {/* --- VIDEOCONFERÊNCIA VIEW --- */}
            {activeTab === 'videoconf' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center gap-4 border-b-2 border-slate-200 pb-6 mb-8 break-inside-avoid">
                   <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                     <VideoIcon className="w-8 h-8" />
                   </div>
                   <div>
                      <h2 className="text-3xl font-bold text-slate-900">Videoconferência</h2>
                      <p className="text-slate-500">Google Meet & Teams</p>
                   </div>
                </div>

                <div className="flex space-x-4 mb-6">
                  <button 
                    onClick={() => setVideoTab('meet')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${videoTab === 'meet' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                  >
                    Google Meet
                  </button>
                  <button 
                    onClick={() => setVideoTab('teams')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${videoTab === 'teams' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                  >
                    Microsoft Teams
                  </button>
                </div>

                {videoTab === 'meet' && (
                  <>
                    <StepCard badge="1️⃣" title="INICIAR REUNIÃO">
                      <p>Acesse <strong>meet.google.com</strong> e inicie ou entre na reunião.</p>
                    </StepCard>
                    <StepCard badge="2️⃣" title="CONFIGURAR ÁUDIO E VÍDEO" note="Sempre teste antes de entrar.">
                      <p>Clique nos 3 pontos (Opções) &gt; Configurações.</p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700">
                        <li><strong>Áudio (Microfone/Alto-falante):</strong> Selecione o dispositivo de sala (ex: Logitech MeetUp ou Polycom).</li>
                        <li><strong>Vídeo (Câmera):</strong> Selecione a câmera da sala.</li>
                      </ul>
                    </StepCard>
                  </>
                )}

                {videoTab === 'teams' && (
                  <>
                    <StepCard badge="1️⃣" title="INICIAR REUNIÃO">
                      <p>Abra o aplicativo <strong>Teams</strong> ou acesse pelo navegador.</p>
                    </StepCard>
                    <StepCard badge="2️⃣" title="CONFIGURAR DISPOSITIVOS" note="Verifique se o mudo está desativado na barra de som.">
                      <p>Antes de entrar, clique na engrenagem (Configurações do dispositivo).</p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700">
                         <li><strong>Dispositivos de áudio:</strong> Escolha a opção correspondente à sala (Custom Setup ou nome da Soundbar).</li>
                         <li><strong>Câmera:</strong> Selecione a câmera de conferência.</li>
                      </ul>
                    </StepCard>
                  </>
                )}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;