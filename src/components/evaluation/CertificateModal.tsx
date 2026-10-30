import React from 'react';
import { Apprentice, Ficha } from '../../types/induction';
import { SenaLogo, SenaEscudo } from '../SenaLogo';
import { X, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

interface Props {
  apprentice: Apprentice;
  ficha: Ficha;
  score: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<Props> = ({ apprentice, ficha, score, onClose }) => {
  const folio = apprentice.certificateFolio || `SENA-IND-${ficha.code}-${apprentice.documentNumber.slice(-4)}`;
  const issueDate = apprentice.assessmentDate
    ? new Date(apprentice.assessmentDate).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Controls Bar (hidden during print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#39A900]" />
            <span className="text-sm font-semibold">Certificado Oficial de Inducción SENA</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#39A900] hover:bg-[#329400] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Imprimir / Guardar PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Area */}
        <div id="certificate-print-area" className="p-8 sm:p-12 bg-white text-slate-900 relative">
          {/* Institutional Border Frame */}
          <div className="border-4 border-double border-[#39A900]/60 p-6 sm:p-10 rounded-xl relative bg-linear-to-b from-white via-emerald-50/20 to-white">
            
            {/* Watermark in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <SenaLogo className="w-80 h-80" monochrome />
            </div>

            {/* Header */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-200">
              <div className="flex items-center justify-center gap-5 mb-2">
                <SenaEscudo className="w-12 h-14 object-contain" />
                <div className="w-px h-10 bg-slate-200" />
                <SenaLogo className="w-12 h-12" />
              </div>
              <h2 className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                Servicio Nacional de Aprendizaje — SENA
              </h2>
              <p className="text-[11px] text-slate-600 font-medium">
                {ficha.regional} · {ficha.centerName}
              </p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-4 tracking-tight">
                CERTIFICADO DE INDUCCIÓN Y APROPIACIÓN
              </h1>
              <p className="text-xs text-[#39A900] font-semibold mt-1">
                Proceso de Inducción a la Formación Profesional Integral
              </p>
            </div>

            {/* Certificate Body */}
            <div className="text-center py-8 space-y-4">
              <p className="text-xs text-slate-600">Hace constar que el (la) aprendiz:</p>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight underline decoration-[#39A900] decoration-2 underline-offset-4">
                {apprentice.fullName}
              </h3>

              <p className="text-xs text-slate-600">
                Identificado(a) con {apprentice.documentType} No. <span className="font-semibold text-slate-900">{apprentice.documentNumber}</span>
              </p>

              <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed pt-2">
                Ha completado satisfactoriamente la totalidad de los módulos de inducción institucional y superó con éxito la evaluación interactiva de apropiación de conocimientos con una calificación del <span className="font-bold text-[#39A900]">{score}%</span>, evidenciando conocimiento íntegro de la Identidad Institucional, Derechos, Deberes, Faltas y Reglamento del Aprendiz SENA (Acuerdo 009 de 2024 con reformas de 2026).
              </p>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg max-w-md mx-auto text-left text-xs">
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-500">Programa de Formación:</span>
                  <span className="font-semibold text-slate-800 text-right">{ficha.programName}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-500">Ficha de Caracterización:</span>
                  <span className="font-mono font-semibold text-slate-800">{ficha.code}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-500">Fecha de Aprobación:</span>
                  <span className="font-medium text-slate-800">{issueDate}</span>
                </div>
              </div>
            </div>

            {/* Footer with Signatures and QR */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-3 items-end text-center gap-4">
              {/* Signature 1 */}
              <div>
                <div className="w-32 h-10 border-b border-slate-400 mx-auto mb-1 flex items-end justify-center">
                  <span className="text-[10px] text-slate-400 italic">Carlos Alberto M.</span>
                </div>
                <p className="text-[11px] font-bold text-slate-800">{ficha.instructorLeader}</p>
                <p className="text-[9px] text-slate-500">Instructor Líder de Ficha</p>
              </div>

              {/* QR Verification Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 border border-slate-300 p-1 rounded flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-full h-full text-slate-800" fill="currentColor">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" />
                    <rect x="4" y="4" width="8" height="8" fill="white" />
                    <rect x="6" y="6" width="4" height="4" fill="currentColor" />
                    <rect x="26" y="2" width="12" height="12" fill="currentColor" />
                    <rect x="28" y="4" width="8" height="8" fill="white" />
                    <rect x="30" y="6" width="4" height="4" fill="currentColor" />
                    <rect x="2" y="26" width="12" height="12" fill="currentColor" />
                    <rect x="4" y="28" width="8" height="8" fill="white" />
                    <rect x="6" y="30" width="4" height="4" fill="currentColor" />
                    <rect x="18" y="4" width="4" height="4" />
                    <rect x="20" y="12" width="4" height="6" />
                    <rect x="18" y="20" width="8" height="4" />
                    <rect x="28" y="28" width="8" height="8" />
                  </svg>
                </div>
                <span className="text-[8px] font-mono text-slate-400 mt-1 uppercase">Folio: {folio}</span>
              </div>

              {/* Signature 2 */}
              <div>
                <div className="w-32 h-10 border-b border-slate-400 mx-auto mb-1 flex items-end justify-center">
                  <span className="text-[10px] text-slate-400 italic">Subdirección Centro</span>
                </div>
                <p className="text-[11px] font-bold text-slate-800">Subdirección de Centro</p>
                <p className="text-[9px] text-slate-500">Coordinación de Formación FPI</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
