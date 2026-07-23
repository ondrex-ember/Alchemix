import React from 'react';
import { Star, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { LoyalCustomer } from '../types';
import { LOYAL_CHAIN_QUESTS } from '../data';

interface LoyalCustomersTabProps {
  loyalCustomers: Record<string, LoyalCustomer>;
}

export const LoyalCustomersTab: React.FC<LoyalCustomersTabProps> = ({ loyalCustomers }) => {
  const list = Object.entries(loyalCustomers || {}) as [string, LoyalCustomer][];

  if (list.length === 0) {
    return (
      <div className="text-center italic text-[#7a5f35] py-12 text-xs font-serif leading-relaxed">
        Zatím žádní stálí zákazníci.<br /><br />
        Plň řádné zakázky na stole pro stejné postavy a získej si jejich důvěru!
      </div>
    );
  }

  // Sort by visits descending
  const sorted = [...list].sort((a, b) => b[1].visits - a[1].visits);

  return (
    <div className="flex flex-col gap-3">
      {sorted.map(([id, customer]) => {
        const chains = LOYAL_CHAIN_QUESTS[id] || [];
        const maxChain = chains.length;
        const currentChain = customer.chain || 0;

        return (
          <div
            key={id}
            className={`border rounded-xl p-3 flex flex-col gap-2 transition-all ${
              customer.stars >= 3
                ? 'bg-[#c8961e]/5 border-[#c8961e] shadow-md shadow-[#c8961e]/5'
                : 'bg-[#1a1208] border-[#5c3d1a] hover:border-[#7a5128]'
            }`}
          >
            {/* Header info */}
            <div className="flex items-center gap-2.5">
              <span className="text-xl" role="img" aria-label="customer-icon">
                {customer.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-[#e8d5a3] text-xs font-bold truncate">
                  {customer.name}
                </h4>
                <p className="text-[10px] text-[#7a5f35] capitalize">
                  {id === 'CUST_PEASANT'
                    ? 'Místní rolník'
                    : id === 'CUST_KNIGHT'
                    ? 'Chrabrý obránce'
                    : id === 'CUST_MONK'
                    ? 'Klášterní lékárník'
                    : id === 'CUST_MERCHANT'
                    ? 'Vážený velkoobchodník'
                    : 'Stínová síť'}
                </p>
              </div>

              {/* Star rating */}
              <div className="flex gap-0.5 shrink-0">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < customer.stars
                        ? 'text-[#f1c40f] fill-[#f1c40f]'
                        : 'text-[#5c3d1a]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Core Stats */}
            <div className="grid grid-cols-3 gap-1 bg-[#0d0a06]/40 rounded-lg p-1.5 text-[10px] text-[#7a5f35] font-serif border border-[#5c3d1a]/20">
              <div className="text-center border-r border-[#5c3d1a]/20">
                Zájem: <strong className="text-[#e8d5a3] block">{customer.visits}×</strong>
              </div>
              <div className="text-center border-r border-[#5c3d1a]/20">
                Útrata: <strong className="text-[#f0c040] block">{customer.totalSpent} 🪙</strong>
              </div>
              <div className="text-center">
                Zakázky: <strong className="text-green-500 block">{customer.questsDone}</strong>
              </div>
            </div>

            {/* Loyalty bonus notes */}
            {customer.stars >= 2 && (
              <p className="text-[10px] text-[#2ecc71] font-serif italic text-right">
                ✨ +10% finanční odměna (Důvěra)
              </p>
            )}

            {/* Special narrative chain quest track */}
            {maxChain > 0 && (
              <div className="mt-1 border-t border-[#5c3d1a]/30 pt-1.5">
                <div className="flex justify-between items-center text-[10px] text-[#7a5f35] mb-1 font-serif">
                  <span className="flex items-center gap-1">
                    <LinkIcon className="w-3 h-3 text-[#e67e22]" /> Příběhový řetězec:
                  </span>
                  <span className="font-bold text-[#e67e22]">
                    {customer.chainDone ? '✅ Hotov!' : `${currentChain} / ${maxChain}`}
                  </span>
                </div>
                <div className="w-full h-1 bg-[#0d0a06] border border-[#5c3d1a]/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#e67e22] to-[#f0c040] rounded-full transition-all duration-500"
                    style={{ width: `${(currentChain / maxChain) * 100}%` }}
                  />
                </div>
                {customer.chainDone && (
                  <p className="text-[9px] text-[#2ecc71] italic mt-1 text-center font-serif">
                    Všechny příběhové výzvy pro tuto postavu jsou splněné!
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default LoyalCustomersTab;
