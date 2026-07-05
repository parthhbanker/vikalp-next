'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Sprout, Target, Wallet, TreeDeciduous, Sparkles, Loader2, CheckCircle2, AlertCircle, Quote, Mail, X } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { trackButtonClick, trackDonation } from '@/lib/analytics';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';

const GOAL_TREES = 70000;
const FUNDED_TREES = 38000;
const GAP_TREES = GOAL_TREES - FUNDED_TREES;
// On-the-ground progress against the funded 38,000 — update as planting proceeds after 7th July.
const PLANTED_TREES = 0;
const PRICE_PER_TREE = 300;
const FUNDED_PERCENT = Math.round((FUNDED_TREES / GOAL_TREES) * 100);
const PLANTED_PERCENT = Math.round((PLANTED_TREES / FUNDED_TREES) * 100);
// Fallback for donors if the embedded checkout can't load (e.g. keys not configured yet)
const DONATE_URL = 'https://pages.razorpay.com/pl_LXR167LW8A3lBt/view';
const BRAND_HEX = '#619C03';

const QUICK_PICKS = [10, 50, 200];

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: 'payment.failed', handler: (response: { error: { description?: string; reason?: string } }) => void) => void;
    };
  }
}

let razorpayScriptPromise: Promise<void> | null = null;

function loadRazorpayScript(): Promise<void> {
  if (typeof window !== 'undefined' && window.Razorpay) return Promise.resolve();
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      razorpayScriptPromise = null;
      reject(new Error('Failed to load Razorpay checkout.'));
    };
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

interface StatTileProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  sublabel: string;
  isVisible: boolean;
  accent: string;
}

function StatTile({ icon, value, label, sublabel, isVisible, accent }: StatTileProps) {
  const count = useCounterAnimation(value, 1600, isVisible);

  return (
    <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-sm">
      <div
        className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${accent}`}
      >
        {icon}
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
        {count.toLocaleString('en-IN')}
      </div>
      <div className="text-sm font-semibold text-foreground mt-0.5">{label}</div>
      <div className="text-xs text-muted mt-1">{sublabel}</div>
    </div>
  );
}

/** One glyph = 1,000 trees. Filled = funded by our current budget, outlined = the gap we're asking donors to help close. */
function TreeGrid({ isVisible }: { isVisible: boolean }) {
  const totalGlyphs = GOAL_TREES / 1000;
  const fundedGlyphs = FUNDED_TREES / 1000;

  return (
    <div>
      <div
        className="flex flex-wrap gap-1.5 sm:gap-2"
        role="img"
        aria-label={`${FUNDED_TREES.toLocaleString('en-IN')} of ${GOAL_TREES.toLocaleString('en-IN')} trees funded so far`}
      >
        {Array.from({ length: totalGlyphs }).map((_, index) => {
          const isFunded = index < fundedGlyphs;
          return (
            <span
              key={index}
              aria-hidden="true"
              className={`flex items-center justify-center w-[13px] h-[13px] sm:w-[15px] sm:h-[15px] rounded-[3px] transition-all duration-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              } ${isFunded ? 'text-brand' : 'text-border-strong'}`}
              style={{ transitionDelay: `${Math.min(index * 10, 700)}ms` }}
            >
              <TreeDeciduous size="100%" strokeWidth={isFunded ? 2.5 : 2} fill={isFunded ? 'currentColor' : 'none'} />
            </span>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-4 text-xs sm:text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-brand" aria-hidden="true" />
          Funded &mdash; 1 square = 1,000 trees
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] border-2 border-border-strong" aria-hidden="true" />
          Needs a donor
        </span>
      </div>
    </div>
  );
}

type DonateStatus = 'idle' | 'loading' | 'success' | 'error';

interface DonationReceipt {
  trees: number;
  amount: number;
  paymentId: string;
}

function DonationSuccessModal({ receipt, onClose }: { receipt: DonationReceipt; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-success-title"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center animate-scale-in"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 p-1.5 rounded-full text-muted hover:bg-surface-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="w-16 h-16 rounded-full bg-brand/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-brand" aria-hidden="true" />
        </div>

        <h3 id="donation-success-title" className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Thank you for your gift!
        </h3>
        <p className="text-sm text-muted mb-6 leading-relaxed">
          You&apos;re putting {receipt.trees.toLocaleString('en-IN')} one-year-old tree{receipt.trees === 1 ? '' : 's'} in the
          hands of tribal farmers in Southern Gujarat this season.
        </p>

        <div className="bg-surface-secondary rounded-xl p-4 mb-6 grid grid-cols-2 gap-4 text-left">
          <div>
            <div className="text-xs text-muted mb-0.5">Amount donated</div>
            <div className="text-lg font-bold text-foreground tabular-nums">
              ₹{receipt.amount.toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted mb-0.5">Trees gifted</div>
            <div className="text-lg font-bold text-brand tabular-nums">{receipt.trees.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm text-muted text-left bg-brand/5 border border-brand/15 rounded-lg p-3 mb-6">
          <Mail size={16} className="text-brand shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            Your donation receipt will be emailed to you within <strong className="text-foreground">2 working days</strong>.
          </span>
        </div>

        <Button variant="primary" size="lg" fullWidth onClick={onClose}>
          Done
        </Button>
      </div>
    </div>,
    document.body
  );
}

function DonationCalculator() {
  const [selected, setSelected] = useState<number>(QUICK_PICKS[1]);
  const [customValue, setCustomValue] = useState<string>('');
  const [status, setStatus] = useState<DonateStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [receipt, setReceipt] = useState<DonationReceipt | null>(null);
  const [wasDeclined, setWasDeclined] = useState(false);
  const isCustom = customValue !== '';

  const treeCount = useMemo(() => {
    if (isCustom) {
      const parsed = parseInt(customValue, 10);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    }
    return selected;
  }, [isCustom, customValue, selected]);

  const total = treeCount * PRICE_PER_TREE;
  const gapCovered = treeCount > 0 ? Math.min((treeCount / GAP_TREES) * 100, 100) : 0;

  const handlePick = (amount: number) => {
    setSelected(amount);
    setCustomValue('');
  };

  const handleDonate = async () => {
    if (treeCount <= 0 || status === 'loading') return;
    setStatus('loading');
    setErrorMessage('');
    setWasDeclined(false);
    trackButtonClick('afforestation_donate_cta', { trees: treeCount, amount: total });

    try {
      const [orderResponse] = await Promise.all([
        fetch('/api/razorpay/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trees: treeCount }),
        }),
        loadRazorpayScript(),
      ]);

      const order = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(order.error || 'Could not start checkout.');

      const razorpay = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: 'VIKALP',
        description: `${treeCount.toLocaleString('en-IN')} Trees · Afforestation Drive 2026`,
        notes: { campaign: 'afforestation_drive_2026', trees: String(treeCount) },
        theme: { color: BRAND_HEX },
        handler: async (paymentResponse: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(paymentResponse),
            });
            const verification = await verifyResponse.json();
            if (!verifyResponse.ok || !verification.verified) {
              throw new Error('Payment verification failed.');
            }
            trackDonation(order.amount / 100, 'INR', {
              campaign: 'afforestation_drive_2026',
              trees: treeCount,
              payment_id: paymentResponse.razorpay_payment_id,
            });
            setReceipt({
              trees: treeCount,
              amount: order.amount / 100,
              paymentId: paymentResponse.razorpay_payment_id,
            });
            setStatus('success');
          } catch {
            setErrorMessage(
              'Payment received but verification failed — if the amount was deducted, please contact us at info@vikalp.org.'
            );
            setStatus('error');
          }
        },
        modal: {
          ondismiss: () => setStatus('idle'),
        },
      });

      razorpay.on('payment.failed', (response) => {
        trackButtonClick('afforestation_donate_declined', {
          trees: treeCount,
          amount: total,
          reason: response.error?.reason,
        });
        setWasDeclined(true);
      });

      setStatus('idle');
      razorpay.open();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  const closeReceipt = () => {
    setReceipt(null);
    setStatus('idle');
  };

  return (
    <div className="bg-gradient-to-br from-brand/8 via-white to-brand/5 rounded-2xl border-2 border-brand/15 shadow-lg p-6 sm:p-8">
      {receipt && <DonationSuccessModal receipt={receipt} onClose={closeReceipt} />}

      <div className="flex items-center gap-2 text-brand font-semibold text-sm mb-1">
        <Sprout size={18} strokeWidth={2.5} aria-hidden="true" />
        Gift a Tree
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
        ₹{PRICE_PER_TREE} gifts one tree to a farmer
      </h3>
      <p className="text-sm text-muted mb-6">
        Choose how many one-year-old trees you&apos;d like to gift to tribal farmers in Southern Gujarat &mdash; {GAP_TREES.toLocaleString('en-IN')} are still waiting on a donor.
      </p>

      {/* Quick picks */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {QUICK_PICKS.map((amount) => {
          const isActive = !isCustom && selected === amount;
          return (
            <button
              key={amount}
              type="button"
              onClick={() => handlePick(amount)}
              className={`rounded-lg border-2 py-2.5 px-2 text-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                isActive
                  ? 'border-brand bg-brand/10 text-brand'
                  : 'border-border bg-white text-foreground hover:border-brand/40'
              }`}
            >
              <div className="font-bold leading-none">{amount}</div>
              <div className="text-[11px] mt-1 text-muted">trees</div>
            </button>
          );
        })}
      </div>

      <Input
        label="Or enter a custom number of trees"
        type="number"
        min={1}
        inputMode="numeric"
        placeholder="e.g. 1000"
        value={customValue}
        onChange={(e) => setCustomValue(e.target.value)}
        fullWidth
        trackingName="afforestation_custom_trees"
        enableTracking
      />

      {/* Summary */}
      <div className="flex items-center justify-between mt-6 mb-5 py-4 border-y border-brand/15">
        <div>
          <div className="text-xs text-muted mb-0.5">Your contribution</div>
          <div className="text-2xl font-bold text-foreground tabular-nums">
            ₹{total.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted mb-0.5">Trees gifted</div>
          <div className="text-2xl font-bold text-brand tabular-nums">
            {treeCount.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleDonate}
        disabled={treeCount <= 0 || status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Preparing checkout...
          </>
        ) : (
          `Donate ₹${total.toLocaleString('en-IN')}`
        )}
      </Button>

      {status === 'error' && (
        <div className="flex items-start gap-2 text-sm text-error mt-3 bg-error/5 border border-error/20 rounded-lg p-3">
          <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            {errorMessage}{' '}
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
              onClick={() => trackButtonClick('afforestation_donate_fallback')}
            >
              Donate here instead.
            </a>
          </span>
        </div>
      )}

      {status === 'idle' && wasDeclined && (
        <div className="flex items-start gap-2 text-sm text-warning mt-3 bg-warning/10 border border-warning/20 rounded-lg p-3">
          <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
          <span>Your last payment attempt didn&apos;t go through and no amount was deducted. Please try again.</span>
        </div>
      )}

      {status !== 'error' && !wasDeclined && treeCount > 0 && (
        <p className="flex items-center gap-1.5 text-xs text-muted mt-3 justify-center text-center">
          <Sparkles size={13} className="text-brand shrink-0" aria-hidden="true" />
          That closes {gapCovered.toFixed(gapCovered < 1 ? 2 : 1)}% of this year&apos;s funding gap.
        </p>
      )}
    </div>
  );
}

function StoryPanel({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={`relative max-w-4xl mx-auto mb-12 md:mb-16 bg-white rounded-2xl border border-border shadow-sm p-6 sm:p-8 md:p-10 overflow-hidden transition-all duration-700 delay-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <Quote className="absolute -top-2 -left-2 text-brand/5 w-28 h-28 sm:w-32 sm:h-32" aria-hidden="true" fill="currentColor" strokeWidth={0} />
      <div className="relative">
        <h3 className="text-sm font-bold text-brand uppercase tracking-wide mb-3">
          Why a one-year-old tree?
        </h3>
        <div className="space-y-4 text-base sm:text-lg text-foreground leading-relaxed">
          <p>
            A tiny sapling handed to a family in the hills of South Gujarat rarely survives its first monsoon &mdash;
            there&apos;s no fence, no water to spare, and no time to nurse it between wage-labour days. So for over
            two decades, VIKALP has done that waiting ourselves: every tree spends its first year growing strong in
            our own nurseries before it ever reaches a farmer&apos;s hands.
          </p>
          <p>
            That head start changes everything downstream. A one-year-old tree establishes faster, shrugs off dry
            spells, and starts giving back &mdash; shade, fodder, fruit, firewood, income &mdash; years sooner than a
            seed ever could. It&apos;s the same principle behind our Bhoomi Producers&apos; Collective, where 5,000+
            indigenous agroforest families across South Gujarat have seen household incomes rise by 30% by growing
            trees on their own land.
          </p>
          <p className="font-semibold text-foreground">
            This July, we want to hand over 70,000 more of these trees to tribal farming families. Our budget
            covers 38,000. The other 32,000 are already growing in our nurseries &mdash; waiting on someone to
            sponsor the family that will take them home.
          </p>
        </div>
      </div>
    </div>
  );
}

function AfforestationDriveSectionComponent() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="afforestation-drive" className="py-16 md:py-24 bg-surface-secondary">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-semibold mb-6">
            <Sprout size={16} strokeWidth={2.5} aria-hidden="true" />
            2026 Afforestation Drive &middot; Begins 7th July
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            70,000 trees is the goal.{' '}
            <span className="text-brand">You&apos;re the gap.</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Our current budget covers {FUNDED_TREES.toLocaleString('en-IN')} one-year-old trees &mdash; that&apos;s {FUNDED_PERCENT}% of
            this year&apos;s target. The remaining {GAP_TREES.toLocaleString('en-IN')} trees still need sponsors before we can hand
            them to tribal farmers across Southern Gujarat.
          </p>
        </div>

        <StoryPanel isVisible={isVisible} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Left: progress + stats */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
          >
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6 sm:p-8 mb-6">
              <TreeGrid isVisible={isVisible} />

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="font-semibold text-foreground">Planted on the ground</span>
                  <span className="text-muted tabular-nums">
                    {PLANTED_TREES.toLocaleString('en-IN')} / {FUNDED_TREES.toLocaleString('en-IN')} funded trees
                  </span>
                </div>
                <div className="h-2.5 bg-surface-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? `${PLANTED_PERCENT}%` : '0%' }}
                  />
                </div>
                <p className="text-xs text-muted mt-2">
                  {PLANTED_TREES === 0
                    ? 'Planting begins 7th July — this counter will track our progress live from there.'
                    : `${PLANTED_PERCENT}% of this year's funded trees are already in the ground.`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatTile
                icon={<Target size={20} className="text-brand" strokeWidth={2} aria-hidden="true" />}
                value={GOAL_TREES}
                label="Trees Goal"
                sublabel="Target for 2026"
                isVisible={isVisible}
                accent="bg-brand/10"
              />
              <StatTile
                icon={<Wallet size={20} className="text-sun" strokeWidth={2} aria-hidden="true" />}
                value={FUNDED_TREES}
                label="Already Funded"
                sublabel={`${FUNDED_PERCENT}% of goal`}
                isVisible={isVisible}
                accent="bg-sun/15"
              />
              <StatTile
                icon={<TreeDeciduous size={20} className="text-earth" strokeWidth={2} aria-hidden="true" />}
                value={GAP_TREES}
                label="Trees Left to Fund"
                sublabel="Waiting on donors"
                isVisible={isVisible}
                accent="bg-earth/15"
              />
            </div>
          </div>

          {/* Right: donation calculator */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
          >
            <DonationCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}

export const AfforestationDriveSection = memo(AfforestationDriveSectionComponent);
