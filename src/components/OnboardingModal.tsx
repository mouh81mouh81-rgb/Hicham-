/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, CheckCircle2, Sparkles, BookOpen, Clock, Award, Flame } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [goal, setGoal] = useState<'10' | '15' | '20'>('10');
  const [level, setLevel] = useState('intermediate');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#f7f2e4] rounded-2xl border border-[#cfbea0] shadow-2xl p-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dfcfb5] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <div>
              <h3 className="font-amiri font-bold text-lg text-[#2a2016] leading-none">
                Utiliser l'application · ابدأ رحلتك
              </h3>
              <p className="text-[11px] text-[#7d654f]">
                Learn English with classic literature
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#755d46] hover:bg-[#ebdcc4] transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-amiri font-bold text-xl text-[#2a2016] mb-1">
              تم تفعيل التطبيق بنجاح!
            </h4>
            <p className="text-xs text-[#6e553f] mb-4">
              Votre défi quotidien de 10 minutes est prêt. Vous avez débloqué l'accès complet à Edgar Allan Poe et aux audio-livres.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#7a121e] text-white font-semibold text-sm cursor-pointer shadow-md hover:bg-[#8f1826]"
            >
              ابدأ القراءة الآن (Commencer)
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Feature 1: 10 Min Daily Reading */}
            <div>
              <label className="block text-xs font-amiri font-bold text-[#624b37] mb-1.5" dir="rtl">
                الهدف اليومي الموصى به:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: '10', label: '10 min', sub: 'موصى به' },
                  { value: '15', label: '15 min', sub: 'متقدم' },
                  { value: '20', label: '20 min', sub: 'مكثف' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setGoal(item.value as any)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      goal === item.value
                        ? 'bg-[#7a121e] text-white border-[#5c0d16] shadow-sm font-bold'
                        : 'bg-[#ede1cd] text-[#4d3826] border-[#dacbb2] hover:bg-[#e4d6bf]'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold">{item.label}</div>
                    <div className="text-[10px] font-amiri opacity-90">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Feature 2: Features highlight */}
            <div className="bg-[#faeed6] p-3 rounded-xl border border-[#dcc59f] space-y-2 text-xs text-[#523d2e]">
              <div className="flex items-center gap-2" dir="rtl">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-amiri">نصوص قوطية وكلاسيكية مترجمة سطراً بسطر</span>
              </div>
              <div className="flex items-center gap-2" dir="rtl">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-amiri">نطق صوتي تفاعلي لكل كلمة إنجليزية</span>
              </div>
              <div className="flex items-center gap-2" dir="rtl">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-amiri">بطاقات مفردات ومتابعة الاستمرارية اليومية</span>
              </div>
            </div>

            {/* CTA confirmation */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsSuccess(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7a121e] to-[#991b1b] text-white font-amiri font-bold text-base shadow-lg shadow-[#7a121e]/40 hover:from-[#8f1826] hover:to-[#b91c1c] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>ابدأ الآن مجاناً (Commencer Gratuitement)</span>
              </button>
              <div className="text-center text-[10px] text-[#8c745f] mt-2">
                Aucune carte bancaire requise · مجاني 100% بدون أي رسوم
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
