import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  ChevronDown,
  Clock3,
  CreditCard,
  Hammer,
  Headphones,
  Home,
  IndianRupee,
  Leaf,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  PiggyBank,
  Power,
  Quote,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const totalCost = 190000;
const subsidy = 108000;
const remainingCost = totalCost - subsidy;
const defaultEmi = 900;
const formatInr = (value) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(Math.round(value));

const navItems = [
  ['Scheme', 'scheme'],
  ['Plans', 'plans'],
  ['Benefits', 'benefits'],
  ['Process', 'process'],
  ['FAQ', 'faq'],
  ['Contact', 'contact'],
];

const painPoints = [
  { icon: TrendingUp, label: 'High electricity bills', detail: 'Monthly costs keep rising without adding comfort.' },
  { icon: Zap, label: 'Rising energy costs', detail: 'Grid power gets expensive year after year.' },
  { icon: Wallet, label: 'No long-term savings', detail: 'Every bill is money leaving the home.' },
];

const solutionPoints = [
  { icon: TrendingDown, label: 'Lower electricity bills', detail: 'Solar generation reduces grid dependency.' },
  { icon: ShieldCheck, label: 'Government subsidy benefits', detail: 'Eligible homeowners can receive subsidy support.' },
  { icon: CreditCard, label: 'Affordable EMI', detail: 'Plans can start around the cost of a family meal out.' },
  { icon: PiggyBank, label: '20+ years of savings', detail: 'Panels keep producing value for the long run.' },
];

const solarPackages = [
  {
    size: '2 kW',
    price: 190000,
    tag: 'Standard home plan',
    ideal: 'Best for small homes with moderate daily usage.',
    highlight: 'Government subsidy eligible plan guidance available.',
  },
  {
    size: '5 kW',
    price: 270000,
    tag: 'Family saver plan',
    ideal: 'Best for larger homes with higher monthly bills.',
    highlight: 'Balanced capacity for long-term bill reduction.',
  },
  {
    size: '10 kW',
    price: 450000,
    tag: 'High usage plan',
    ideal: 'Best for big homes, multiple floors, or heavy appliance usage.',
    highlight: 'Strong generation potential for premium rooftops.',
  },
];

const features = [
  { icon: ShieldCheck, title: 'Government Subsidy Assistance', text: 'Guidance from eligibility to paperwork so the process feels manageable.' },
  { icon: Hammer, title: 'Professional Installation', text: 'Neat rooftop mounting, quality wiring, and careful commissioning.' },
  { icon: CreditCard, title: 'EMI Support', text: 'Financing options explained in simple monthly terms for homeowners.' },
  { icon: Clock3, title: 'Fast Service', text: 'A tight workflow from consultation to activation with clear updates.' },
  { icon: Users, title: 'Trusted Team', text: 'Local support and practical recommendations for your home usage.' },
  { icon: Headphones, title: 'Maintenance Support', text: 'Post-installation help so the system keeps performing confidently.' },
];

const processSteps = [
  { icon: Phone, title: 'Free Consultation', text: 'Share your bill and roof details. Get a simple plan estimate.' },
  { icon: SearchCheck, title: 'Site Inspection', text: 'Roof, meter, shadow, and wiring checks are reviewed by the team.' },
  { icon: Hammer, title: 'Installation', text: 'Panels, inverter, structure, and safety wiring are installed cleanly.' },
  { icon: Power, title: 'Solar Activation', text: 'The system goes live and starts reducing your electricity dependence.' },
];

const testimonials = [
  { name: 'Amit Sharma', place: 'Residential customer', saving: '₹2,700/mo', text: 'The EMI explanation was very clear. We could understand the subsidy and monthly savings before deciding.' },
  { name: 'Priya Patel', place: 'Family home', saving: '₹31,000/yr', text: 'Installation was clean and the team handled the confusing steps patiently.' },
  { name: 'Sanjay Gupta', place: 'Rooftop system', saving: '₹3,200/mo', text: 'The bill reduction made the plan feel practical, especially with the subsidy benefit.' },
  { name: 'Sunita Rao', place: 'Independent house', saving: '₹28,500/yr', text: 'We liked seeing the cost split visually. It made the decision simple for the whole family.' },
];

const faqs = [
  {
    question: 'How does the subsidy work?',
    answer:
      'For eligible residential systems, the government subsidy is returned to the customer after the approved process is completed. Varun Engineering helps you understand the required steps and documentation.',
  },
  {
    question: 'Who is eligible?',
    answer:
      'Eligibility usually depends on residential ownership, approved system capacity, DISCOM requirements, and scheme rules. The team can check your case during the free consultation.',
  },
  {
    question: 'Is EMI available?',
    answer:
      'Yes. The remaining amount after subsidy can be planned through EMI options. A common example shown here is around ₹900/month for 10 years, subject to final approval and plan terms.',
  },
  {
    question: 'How much can I save?',
    answer:
      'Savings depend on your monthly bill, system capacity, roof sunlight, and usage pattern. Homes with bills around ₹3000/month are a strong fit for the sample plan shown on this page.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'After consultation and inspection, the physical installation is usually quick. The complete timeline can vary based on approvals, site readiness, and utility steps.',
  },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Reveal({ children, className = '', delay = 0, y = 28 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0, compact = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    let frame;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  const formatted = compact
    ? Math.round(display).toLocaleString('en-IN', { notation: 'compact' })
    : decimals
      ? display.toFixed(decimals)
      : formatInr(display);

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-2xl">
      <nav className="section-shell flex h-16 items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="group flex min-w-0 items-center gap-3 text-left"
          aria-label="Go to top"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-solar to-amberglow text-ink shadow-glow">
            <Sun className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold text-white sm:text-base">Varun Engineering</span>
            <span className="block truncate text-[11px] font-semibold text-amber-100/80">Residential solar specialists</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className="rounded-full px-4 py-2 text-sm font-bold text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              {label}
            </button>
          ))}
        </div>

        <button type="button" onClick={() => scrollToSection('contact')} className="primary-button hidden lg:inline-flex">
          Get Free Consultation
          <ArrowRight className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/10 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-ink/95 lg:hidden"
          >
            <div className="section-shell grid gap-2 py-4">
              {navItems.map(([label, id]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    scrollToSection(id);
                    setOpen(false);
                  }}
                  className="rounded-lg px-4 py-3 text-left text-sm font-bold text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  scrollToSection('contact');
                  setOpen(false);
                }}
                className="primary-button mt-2"
              >
                Request Callback
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function SolarScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="solar-grid absolute inset-0 opacity-90" />
      <motion.div
        className="absolute -right-16 top-24 h-56 w-56 rounded-full border border-yellow-200/30 bg-gradient-to-br from-yellow-200 via-solar to-orange-500 blur-[1px] sm:right-8 sm:h-72 sm:w-72"
        animate={{ scale: [1, 1.04, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-10 top-40 hidden h-96 w-96 rounded-full border border-yellow-200/20 md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(12)].map((_, index) => (
          <span
            key={index}
            className="absolute left-1/2 top-1/2 h-1 w-20 origin-left rounded-full bg-yellow-200/35"
            style={{ transform: `rotate(${index * 30}deg) translateX(9rem)` }}
          />
        ))}
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-[-8rem] h-[24rem] w-[38rem] max-w-none sm:right-[-5rem] lg:bottom-20 lg:right-[-1rem]"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute bottom-4 left-8 h-28 w-[34rem] skew-x-[-18deg] bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 shadow-2xl" />
        <div className="absolute bottom-20 left-16 grid w-[30rem] grid-cols-4 gap-3 [transform:rotateX(58deg)_rotateZ(-17deg)] [transform-style:preserve-3d]">
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={index}
              className="h-24 rounded-lg border border-cyan-200/20 bg-gradient-to-br from-[#122b4a] via-[#164375] to-[#0b1630] shadow-[0_20px_50px_rgba(0,0,0,0.32)]"
              animate={{ opacity: [0.82, 1, 0.82] }}
              transition={{ delay: index * 0.08, duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="grid h-full grid-cols-3 grid-rows-3 gap-px p-2">
                {[...Array(9)].map((__, cell) => (
                  <span key={cell} className="rounded-[2px] bg-cyan-100/12 shadow-inner" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="absolute bottom-16 left-6 h-10 w-[36rem] skew-x-[-18deg] bg-gradient-to-r from-slate-700 via-slate-800 to-slate-950" />
      </motion.div>

      {[...Array(18)].map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-yellow-200/70"
          style={{
            left: `${8 + ((index * 7) % 84)}%`,
            top: `${18 + ((index * 11) % 64)}%`,
          }}
          animate={{ opacity: [0.1, 0.85, 0.1], y: [0, -18, 0] }}
          transition={{ delay: index * 0.24, duration: 4 + (index % 4), repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  const heroStats = [
    { label: 'Monthly bill?', value: '₹3000', icon: Zap },
    { label: 'EMI starts around', value: '₹900/mo', icon: CreditCard },
    { label: 'Govt subsidy', value: '₹1,08,000', icon: ShieldCheck },
  ];

  return (
    <section id="hero" className="relative min-h-[94svh] overflow-hidden bg-ink pt-24 text-white">
      <SolarScene />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fffaf0] to-transparent" />
      <div className="section-shell relative z-10 grid min-h-[calc(94svh-6rem)] items-center pb-28 pt-8 lg:grid-cols-[1.04fr_0.96fr] lg:pb-20">
        <Reveal className="max-w-3xl">
          <span className="eyebrow border-yellow-200/30 bg-white/10 text-yellow-100">
            <Sparkles className="h-4 w-4" />
            Government subsidy solar made simple
          </span>
          <h1 className="mt-7 text-balance text-4xl font-black leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
            Switch to Solar & Save Thousands Every Month
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base font-medium leading-8 text-slate-200 sm:text-lg">
            Varun Engineering helps homeowners install government-subsidized solar systems with affordable EMI options.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => scrollToSection('contact')} className="primary-button">
              Get Free Consultation
              <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => scrollToSection('plans')} className="secondary-button">
              <IndianRupee className="h-4 w-4" />
              View Solar Plans
            </button>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {heroStats.map((item, index) => (
              <motion.div
                key={item.label}
                className="glass-panel rounded-lg p-4 text-ink"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.12, duration: 0.55 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <item.icon className="mb-3 h-5 w-5 text-orange-500" />
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
                <p className="mt-1 text-xl font-black">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <BatteryCharging className="h-4 w-4" />
            The simple switch
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-normal text-ink sm:text-5xl">
            Your roof can become a monthly savings engine.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-lg border border-red-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-red-50 text-red-600">
                  <TrendingUp className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-red-500">Without Solar</p>
                  <h3 className="text-2xl font-black text-ink">Bills keep winning</h3>
                </div>
              </div>
              <div className="grid gap-4">
                {painPoints.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-4 transition hover:border-red-100 hover:bg-red-50/60"
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  >
                    <div className="flex gap-3">
                      <item.icon className="mt-1 h-5 w-5 shrink-0 text-red-500" />
                      <div>
                        <p className="font-black text-slate-950">{item.label}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-red-100">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-red-400 to-orange-400"
                        initial={{ width: '8%' }}
                        whileInView={{ width: `${58 + index * 15}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.15 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-full rounded-lg border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-5 shadow-glass sm:p-6">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Sun className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">With Varun Engineering Solar</p>
                  <h3 className="text-2xl font-black text-ink">Savings start compounding</h3>
                </div>
              </div>
              <div className="grid gap-4">
                {solutionPoints.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="rounded-lg border border-white bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                    whileHover={{ x: -6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  >
                    <div className="flex gap-3">
                      <item.icon className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                      <div>
                        <p className="font-black text-slate-950">{item.label}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                        initial={{ width: '8%' }}
                        whileInView={{ width: `${46 + index * 13}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.12 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DonutChart() {
  const subsidyShare = Math.round((subsidy / totalCost) * 100);
  const remainingShare = 100 - subsidyShare;

  return (
    <div className="relative mx-auto grid h-64 w-64 place-items-center sm:h-72 sm:w-72">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#ffc83d 0 ${subsidyShare}%, #0f766e ${subsidyShare}% 100%)`,
        }}
        initial={{ rotate: -90, scale: 0.84, opacity: 0 }}
        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
      <div className="absolute inset-8 rounded-full bg-white shadow-inner" />
      <div className="relative text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Subsidy covers</p>
        <p className="text-5xl font-black text-ink">
          <AnimatedCounter value={subsidyShare} suffix="%" />
        </p>
        <p className="mt-1 text-sm font-bold text-teal-700">{remainingShare}% planned by cash or EMI</p>
      </div>
    </div>
  );
}

function CostCard({ icon: Icon, label, value, helper, accent, delay }) {
  return (
    <Reveal delay={delay}>
      <motion.div
        className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm"
        whileHover={{ y: -7 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div className={`grid h-12 w-12 place-items-center rounded-lg ${accent}`}>
          <Icon className="h-6 w-6" />
        </div>
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-black text-ink">{value}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{helper}</p>
      </motion.div>
    </Reveal>
  );
}

function SchemeSection() {
  const bars = [
    { label: 'Total system cost', value: totalCost, width: '100%', color: 'from-slate-900 to-blue-900' },
    { label: 'Government subsidy returned', value: subsidy, width: `${(subsidy / totalCost) * 100}%`, color: 'from-solar to-amberglow' },
    { label: 'Remaining amount', value: remainingCost, width: `${(remainingCost / totalCost) * 100}%`, color: 'from-teal-500 to-emerald-500' },
  ];

  return (
    <section id="scheme" className="relative bg-white py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="eyebrow">
            <IndianRupee className="h-4 w-4" />
            How the solar scheme works
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-normal text-ink sm:text-5xl">
            The numbers, shown like a household budget.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Instead of thinking about one big price, see it as three simple parts: system cost, subsidy returned, and the remaining amount that can be paid by cash or EMI.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <CostCard
            icon={Home}
            label="Total solar system cost"
            value={`₹${formatInr(totalCost)}`}
            helper="Estimated project cost for the example residential plan."
            accent="bg-slate-100 text-slate-900"
            delay={0}
          />
          <CostCard
            icon={ShieldCheck}
            label="Government subsidy"
            value={`₹${formatInr(subsidy)}`}
            helper="Returned to the customer after successful eligible scheme processing."
            accent="bg-amber-100 text-orange-700"
            delay={0.1}
          />
          <CostCard
            icon={CreditCard}
            label="Remaining amount"
            value={`₹${formatInr(remainingCost)}`}
            helper="Can be paid in full cash or planned as EMI around ₹900/month for 10 years."
            accent="bg-teal-100 text-teal-700"
            delay={0.2}
          />
        </div>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="rounded-lg border border-slate-100 bg-gradient-to-b from-white to-amber-50/70 p-5 shadow-sm sm:p-7">
              <DonutChart />
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-bold">
                <div className="rounded-lg bg-amber-100 p-3 text-orange-800">Subsidy: ₹1,08,000</div>
                <div className="rounded-lg bg-teal-100 p-3 text-teal-800">Balance: ₹82,000</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid gap-5">
              {bars.map((bar) => (
                <div key={bar.label} className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <p className="font-black text-ink">{bar.label}</p>
                    <p className="shrink-0 text-lg font-black text-ink">₹{formatInr(bar.value)}</p>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: bar.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm">
                <div className="flex gap-3">
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-orange-600 shadow-sm">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-ink">
                      If your monthly electricity bill is around ₹3000, this plan is ideal for you.
                    </h3>
                    <p className="mt-3 leading-7 text-slate-700">
                      After installation, electricity savings can help offset EMI costs. Over the long term, you gain bill relief, cleaner energy, and a rooftop asset designed to produce value for 20+ years.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  return (
    <section id="plans" className="relative overflow-hidden bg-[#0a1426] py-20 text-white sm:py-24">
      <div className="absolute inset-0 solar-grid opacity-40" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
      <div className="section-shell relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow border-white/20 bg-white/10 text-yellow-100">
            <IndianRupee className="h-4 w-4" />
            Solar package options
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-normal sm:text-5xl">
            Choose a system size that fits your home.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            These standard package cards make the investment easy to compare. Final pricing can be confirmed after consultation and site inspection.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {solarPackages.map((plan, index) => (
            <PackageCard key={plan.size} plan={plan} index={index} />
          ))}
        </div>

        <Reveal delay={0.18}>
          <div className="mt-8 rounded-lg border border-yellow-200/20 bg-white/10 p-5 text-center shadow-glass backdrop-blur-2xl sm:p-6">
            <p className="text-lg font-black text-yellow-100">
              Need help choosing? Call Varun Engineering at 8602674181.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Share your monthly bill and roof details to get the right kW recommendation.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PackageCard({ plan, index }) {
  const accent = index === 1 ? 'from-solar to-amberglow text-ink' : 'from-white/15 to-white/5 text-yellow-100';
  const badge = index === 1 ? 'Popular choice' : plan.tag;

  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        className="group h-full rounded-lg border border-white/10 bg-white p-5 text-ink shadow-glass sm:p-6"
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div className="flex items-start justify-between gap-4">
          <span className={`grid h-14 w-14 place-items-center rounded-lg bg-gradient-to-br ${accent}`}>
            <Sun className="h-7 w-7" />
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-orange-700">
            {badge}
          </span>
        </div>

        <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Solar system size</p>
        <h3 className="mt-2 text-5xl font-black tracking-normal text-ink">{plan.size}</h3>
        <div className="mt-6 rounded-lg bg-slate-950 p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-yellow-200">Package cost</p>
          <p className="mt-1 text-3xl font-black">₹{formatInr(plan.price)}</p>
        </div>

        <div className="mt-6 grid gap-3">
          {[plan.ideal, plan.highlight, 'EMI and subsidy assistance available after eligibility check.'].map((item) => (
            <div key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button type="button" onClick={() => scrollToSection('contact')} className="primary-button mt-7 w-full">
          Ask About {plan.size}
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </Reveal>
  );
}

function BenefitsSection() {
  return (
    <section id="benefits" className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <BadgeCheck className="h-4 w-4" />
            Why choose Varun Engineering
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-normal text-ink sm:text-5xl">
            Practical support from subsidy to service.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.05}>
              <motion.div
                className="group h-full rounded-lg border border-slate-100 bg-white p-6 shadow-sm transition hover:border-amber-200 hover:shadow-glow"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-yellow-300 transition group-hover:bg-gradient-to-br group-hover:from-solar group-hover:to-amberglow group-hover:text-ink">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-black text-ink">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{feature.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="relative py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <Wrench className="h-4 w-4" />
            Process
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-normal text-ink sm:text-5xl">Four clean steps to solar activation.</h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-solar via-teal-300 to-slate-200 md:block lg:left-1/2" />
          <div className="grid gap-6">
            {processSteps.map((step, index) => {
              const isRight = index % 2 === 1;
              return (
                <Reveal key={step.title} delay={index * 0.08}>
                  <div className="relative grid items-center gap-5 lg:grid-cols-2">
                    {isRight && <div className="hidden lg:block" />}
                    <motion.div
                      className="relative rounded-lg border border-slate-100 bg-white p-5 shadow-sm"
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    >
                      <div className="flex gap-4">
                        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-solar to-amberglow text-ink shadow-glow">
                          <step.icon className="h-7 w-7" />
                        </span>
                        <div>
                          <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">Step {index + 1}</p>
                          <h3 className="mt-1 text-2xl font-black text-ink">{step.title}</h3>
                          <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                        </div>
                      </div>
                    </motion.div>
                    {!isRight && <div className="hidden lg:block" />}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const duplicated = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-[#07111f] py-20 text-white sm:py-24">
      <div className="section-shell">
        <Reveal className="max-w-3xl">
          <span className="eyebrow border-white/20 bg-white/10 text-yellow-100">
            <Quote className="h-4 w-4" />
            Homeowner stories
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-normal sm:text-5xl">Savings feel better when the math is clear.</h2>
        </Reveal>
      </div>
      <div className="mt-12 flex overflow-hidden">
        <motion.div
          className="flex min-w-max gap-5 px-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {duplicated.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="w-[20rem] rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur-xl sm:w-[24rem]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-solar to-mint text-lg font-black text-ink">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="font-black">{item.name}</p>
                    <p className="text-sm text-slate-300">{item.place}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-black text-emerald-200">{item.saving}</span>
              </div>
              <Quote className="mt-7 h-7 w-7 text-yellow-300" />
              <p className="mt-4 leading-7 text-slate-200">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <MessageCircle className="h-4 w-4" />
            FAQ
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-normal text-ink sm:text-5xl">Straight answers before you decide.</h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-100 rounded-lg border border-slate-100 bg-white shadow-sm">
          {faqs.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpen(active ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={active}
                >
                  <span className="text-base font-black text-ink sm:text-lg">{item.question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-orange-500 transition ${active ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 leading-7 text-slate-600 sm:px-6">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contactItems = [
    { icon: Phone, title: 'Phone Number', value: '8602674181' },
    { icon: MessageCircle, title: 'WhatsApp', value: '8602674181' },
    { icon: Mail, title: 'Email', value: 'varuneng.co@gmail.com' },
  ];

  return (
    <section id="contact" className="relative bg-[#fffaf0] py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <Phone className="h-4 w-4" />
            Contact
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-normal text-ink sm:text-5xl">Request a free callback.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            Share your details and monthly bill. Varun Engineering can help you understand the right system, subsidy path, and EMI estimate.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-1">
              {contactItems.map((item) => (
                <div key={item.title} className="rounded-lg border border-amber-100 bg-white p-5 shadow-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-amber-100 text-orange-600">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{item.title}</p>
                  <p className="mt-2 font-black text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <form className="rounded-lg border border-white bg-white p-5 shadow-glass sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Name
                  <input
                    type="text"
                    placeholder="Your name"
                    className="rounded-lg border border-slate-200 px-4 py-3 font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Phone
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    className="rounded-lg border border-slate-200 px-4 py-3 font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
                  Message
                  <textarea
                    rows="5"
                    placeholder="Tell us your monthly bill and location"
                    className="resize-none rounded-lg border border-slate-200 px-4 py-3 font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </label>
              </div>
              <button type="button" className="primary-button mt-6 w-full sm:w-auto">
                Request Callback
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                Submit the form to request a consultation, and our team will get in touch with you shortly.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-10 text-white sm:pb-10">
      <div className="section-shell">
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-solar to-amberglow text-ink">
                <Sun className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xl font-black">Varun Engineering</p>
                <p className="text-sm font-semibold text-slate-300">Residential solar installation</p>
              </div>
            </div>
            <p className="mt-5 max-w-md leading-7 text-slate-300">
              Helping homeowners reduce electricity bills through government-subsidized solar systems and affordable EMI planning.
            </p>
          </div>
          <div>
            <p className="font-black">Quick Links</p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-300">
              {navItems.slice(0, 4).map(([label, id]) => (
                <button key={id} type="button" onClick={() => scrollToSection(id)} className="w-fit hover:text-yellow-200">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="pt-6 text-sm text-slate-400">Copyright 2026 Varun Engineering. All rights reserved.</p>
      </div>
    </footer>
  );
}

function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/20 bg-ink/90 p-3 backdrop-blur-2xl sm:hidden">
      <button type="button" onClick={() => scrollToSection('contact')} className="primary-button w-full">
        <Phone className="h-4 w-4" />
        Get Free Consultation
      </button>
    </div>
  );
}

function FloatingMetrics() {
  const metrics = useMemo(
    () => [
      { label: 'Subsidy support', value: subsidy, prefix: '₹', icon: ShieldCheck },
      { label: 'EMI example', value: defaultEmi, prefix: '₹', suffix: '/mo', icon: CreditCard },
      { label: 'Savings life', value: 20, suffix: '+ years', icon: Leaf },
    ],
    [],
  );

  return (
    <section className="-mt-16 relative z-20">
      <div className="section-shell">
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.08}>
              <div className="rounded-lg border border-white bg-white p-5 shadow-glass">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-yellow-300">
                    <metric.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{metric.label}</p>
                    <p className="mt-1 text-3xl font-black text-ink">
                      <AnimatedCounter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <FloatingMetrics />
      <ProblemSolution />
      <SchemeSection />
      <PlansSection />
      <BenefitsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
      <MobileStickyCta />
    </main>
  );
}
