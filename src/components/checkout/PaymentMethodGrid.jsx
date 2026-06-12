'use client'
import { motion } from 'framer-motion'
import { PAYMENT_METHODS } from '@/lib/payment/config'

export const PaymentMethodGrid = ({ selected, onSelect }) => (
  <div className="mb-6">
    <p className="text-white/50 text-[11px] font-bold tracking-[0.15em]
      uppercase mb-4">
      💳 Choose Payment Method
    </p>

    <div className="grid grid-cols-2 gap-3">
      {PAYMENT_METHODS.map((method, i) => {
        const isSelected = selected === method.id
        return (
          <motion.button
            key={method.id}
            onClick={() => method.available && onSelect(method.id)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.97 }}
            className={`
              relative p-4 rounded-2xl border text-left
              transition-all duration-300
              ${isSelected
                ? 'border-[rgba(92,184,92,0.6)] shadow-[0_0_20px_rgba(92,184,92,0.12)]'
                : 'border-white/8 hover:border-white/20'
              }
              ${!method.available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
            style={{
              background: isSelected ? method.bgColor : 'rgba(255,255,255,0.03)',
            }}
          >
            {/* Selected indicator */}
            {isSelected && (
              <motion.div
                className="absolute top-3 right-3 w-5 h-5 rounded-full
                  bg-[#5cb85c] flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className="text-[10px] text-white font-bold">✓</span>
              </motion.div>
            )}

            <span className="text-2xl mb-2 block">{method.icon}</span>
            <p className="text-white text-xs font-bold leading-tight">
              {method.label}
            </p>
            <p style={{ color: method.textColor }}
              className="text-[10px] font-semibold mt-1">
              {method.sublabel}
            </p>
          </motion.button>
        )
      })}
    </div>

    {/* Selected method instructions */}
    {selected && (
      <motion.div
        key={selected}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className="mt-4 p-4 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(45,106,45,0.08)',
          border: '1px solid rgba(92,184,92,0.2)',
        }}
      >
        {/* COD */}
        {selected === 'cod' && (
          <div>
            <p className="text-[#5cb85c] text-xs font-bold mb-2">
              📦 Cash on Delivery — PKR 299 Delivery Charge
            </p>
            <p className="text-white/40 text-[11px] leading-relaxed">
              Our delivery rider will collect the payment at your door.
              Order will be confirmed via WhatsApp within 2 hours.
            </p>
            <div className="mt-3 flex items-center gap-2 p-2.5 rounded-xl
              bg-[rgba(255,183,0,0.1)] border border-[rgba(255,183,0,0.2)]">
              <span>⚠️</span>
              <p className="text-yellow-300/70 text-[10px]">
                Delivery charge PKR 299 added to total
              </p>
            </div>
          </div>
        )}

        {/* JazzCash / Easypaisa */}
        {(selected === 'jazzcash' || selected === 'easypaisa') && (
          <div>
            <p className="text-[#5cb85c] text-xs font-bold mb-2">
              🎁 FREE Delivery — Online Payment
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Account Number:</span>
                <span className="text-white font-mono font-bold">
                  {PAYMENT_METHODS.find(m => m.id === selected)?.accountNumber}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Account Name:</span>
                <span className="text-white/70 font-semibold text-right">
                  {PAYMENT_METHODS.find(m => m.id === selected)?.accountName}
                </span>
              </div>
            </div>
            <p className="text-white/35 text-[11px] mt-3 leading-relaxed">
              After transfer, send payment screenshot to WhatsApp.
              Order dispatched after payment verification.
            </p>
          </div>
        )}

        {/* Meezan Bank */}
        {selected === 'meezan' && (
          <div>
            <p className="text-[#5cb85c] text-xs font-bold mb-2">
              🏦 Bank Transfer — FREE Delivery
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/40">Bank:</span>
                <span className="text-white">Meezan Bank Ltd</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Account:</span>
                <span className="text-white font-mono text-right text-[10px]">
                  {PAYMENT_METHODS.find(m => m.id === 'meezan')?.accountNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Name:</span>
                <span className="text-white/70">Vital Agro Chemical Industries</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    )}
  </div>
)
