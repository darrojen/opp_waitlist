'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle, Moon, Sun } from '@phosphor-icons/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { FAQ } from '@/components/FAQ';
import { FooterLogo } from '@/components/logo/footer-logo';
import { InviteWidget } from '@/components/InviteWidget';
import { Logo } from '@/components/logo/logo';
import NotificationToast from '@/components/NotificationToast';
import WaitlistModal from '@/components/WaitlistModal';
import type { WaitlistUser } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { useTheme } from 'next-themes';

// ─── Static data ──────────────────────────────────────────────────────────────

const WORDS = [
  'Hackathons',
  'Internships',
  'Fellowships',
  'Sidejobs',
  'Partnerships',
  'Opportunities',
];
const LAUNCH_DATE = new Date('2026-08-07T00:00:00');
const BASE_COUNT = 0;

const PILLS = [
  { label: 'Hackathons', style: { top: '14%', left: '6%' }, delay: '0s' },
  { label: 'Fellowships', style: { top: '14%', right: '6%' }, delay: '0.5s' },
  { label: 'Internships', style: { top: '48%', left: '2%' }, delay: '1.1s' },
  { label: 'Partnerships', style: { top: '48%', right: '2%' }, delay: '0.8s' },
  { label: 'Sidejobs', style: { bottom: '20%', left: '7%' }, delay: '0.3s' },
  {
    label: 'Remote Jobs',
    style: { bottom: '20%', right: '7%' },
    delay: '1.4s',
  },
];

const SUPPORTER_CARDS = [
  {
    name: 'Google for Startups',
    href: 'https://startup.google.com',
    size: 'large' as const,
    description:
      'Supporting the next generation of student founders and builders worldwide.',
    logo: (
      <div className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span
          style={{
            fontSize: '19px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          Google for Startups
        </span>
      </div>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com',
    size: 'small' as const,
    logo: (
      <div className="flex items-center gap-3">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
        <span
          style={{
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          GitHub
        </span>
      </div>
    ),
  },
  // {
  //   name: "Microsoft",
  //   href: "https://microsoft.com",
  //   size: "small" as const,
  //   logo: (
  //     <div className="flex items-center gap-3">
  //       <svg width="26" height="26" viewBox="0 0 23 23" aria-hidden="true">
  //         <path fill="#F25022" d="M0 0h11v11H0z"/>
  //         <path fill="#00A4EF" d="M12 0h11v11H12z"/>
  //         <path fill="#7FBA00" d="M0 12h11v11H0z"/>
  //         <path fill="#FFB900" d="M12 12h11v11H12z"/>
  //       </svg>
  //       <span style={{ fontSize:"20px", fontWeight:700, letterSpacing:"-0.02em" }}>Microsoft</span>
  //     </div>
  //   ),
  // },
  {
    name: 'MLH',
    href: 'https://mlh.io',
    size: 'large' as const,
    description:
      "The world's largest student hackathon league, empowering developers to build and compete.",
    logo: (
      <span
        style={{
          fontSize: '36px',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: '#1e40af',
        }}
      >
        MLH
      </span>
    ),
  },
  // {
  //   name: "AWS",
  //   href: "https://aws.amazon.com/startups",
  //   size: "small" as const,
  //   logo: (
  //     <span style={{ fontSize:"30px", fontWeight:800, letterSpacing:"-0.03em", color:"#FF9900" }}>aws</span>
  //   ),
  // },
  // {
  //   name: "Devfolio",
  //   href: "https://devfolio.co",
  //   size: "small" as const,
  //   logo: (
  //     <span style={{ fontSize:"26px", fontWeight:700, letterSpacing:"-0.02em" }}>Devfolio</span>
  //   ),
  // },
  {
    name: 'Product Hunt',
    href: 'https://www.producthunt.com',
    size: 'small' as const,
    logo: (
      <div className="flex items-center gap-3">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="#DA552F"
          aria-hidden="true"
        >
          <path d="M13.604 8.4h-3.405V12h3.405c.993 0 1.8-.806 1.8-1.8 0-.993-.807-1.8-1.8-1.8M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.626 0 12-5.373 12-12S18.626 0 12 0m1.604 14.4H10.2V18H7.8V6h5.804c2.319 0 4.2 1.881 4.2 4.2s-1.881 4.2-4.2 4.2" />
        </svg>
        <span
          style={{
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          Product Hunt
        </span>
      </div>
    ),
  },
  // {
  //   name: "Y Combinator",
  //   href: "https://ycombinator.com",
  //   size: "small" as const,
  //   logo: (
  //     <div className="flex items-center gap-3">
  //       <div style={{ width:28, height:28, background:"#ff6600", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
  //         <span style={{ color:"#fff", fontWeight:900, fontSize:15, lineHeight:1 }}>Y</span>
  //       </div>
  //       <span style={{ fontSize:"20px", fontWeight:700, letterSpacing:"-0.02em" }}>Combinator</span>
  //     </div>
  //   ),
  // },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    size: 'small' as const,
    logo: (
      <div className="flex items-center gap-3">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="#0A66C2"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        <span
          style={{
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          LinkedIn
        </span>
      </div>
    ),
  },
  {
    name: 'Figma',
    href: 'https://figma.com',
    size: 'small' as const,
    logo: (
      <div className="flex items-center gap-3">
        <svg
          width="20"
          height="28"
          viewBox="0 0 16 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 12a4 4 0 0 1 4-4h4a4 4 0 0 1 0 8H8a4 4 0 0 1-4-4z"
            fill="#1ABCFE"
          />
          <path d="M0 20a4 4 0 0 1 4-4h4v4a4 4 0 0 1-8 0z" fill="#0ACF83" />
          <path d="M8 0v8h4a4 4 0 0 0 0-8H8z" fill="#FF7262" />
          <path d="M0 4a4 4 0 0 0 4 4h4V0H4a4 4 0 0 0-4 4z" fill="#F24E1E" />
          <path d="M0 12a4 4 0 0 0 4 4h4V8H4a4 4 0 0 0-4 4z" fill="#A259FF" />
        </svg>
        <span
          style={{
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          Figma
        </span>
      </div>
    ),
  },
  // {
  //   name: "Replit",
  //   href: "https://replit.com",
  //   size: "small" as const,
  //   logo: (
  //     <div className="flex items-center gap-3">
  //       <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  //         <path d="M3 2h7a2 2 0 0 1 2 2v5H3V2zm0 7h12v2H3V9zm0 4h9v5a2 2 0 0 1-2 2H3v-7zm11-2h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4V9z"/>
  //       </svg>
  //       <span style={{ fontSize:"20px", fontWeight:700, letterSpacing:"-0.02em" }}>Replit</span>
  //     </div>
  //   ),
  // },
];

const SOCIAL_LINKS = [
  {
    label: 'X (Twitter)',
    href: 'https://x.com/OfficialOpphex',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/opphex',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// ─── Rolling digit ─────────────────────────────────────────────────────────────

function RollingDigit({ value }: { value: string }) {
  const [curr, setCurr] = useState(value);
  const [prev, setPrev] = useState<string | null>(null);
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (value !== curr) {
      setPrev(curr);
      setCurr(value);
      setKey(k => k + 1);
    }
  }, [value, curr]);
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '0.58em',
        height: '1em',
        overflow: 'hidden',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {prev !== null && (
        <span
          key={`out-${key}`}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'rollOut 0.36s cubic-bezier(0.4,0,1,1) forwards',
          }}
        >
          {prev}
        </span>
      )}
      <span
        key={`in-${key}`}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation:
            prev !== null
              ? 'rollIn 0.36s cubic-bezier(0,0,0.4,1) forwards'
              : 'none',
        }}
      >
        {curr}
      </span>
    </span>
  );
}
function RollingNumber({ value }: { value: string }) {
  return (
    <span style={{ display: 'inline-flex' }}>
      {value.split('').map((d, i) => (
        <RollingDigit key={i} value={d} />
      ))}
    </span>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useTypewriter(
  words: string[],
  typeMs = 75,
  deleteMs = 38,
  pauseMs = 1800,
) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && display === word)
      t = setTimeout(() => setDeleting(true), pauseMs);
    else if (deleting && display === '') {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    } else if (!deleting)
      t = setTimeout(
        () => setDisplay(word.slice(0, display.length + 1)),
        typeMs,
      );
    else t = setTimeout(() => setDisplay(display.slice(0, -1)), deleteMs);
    return () => clearTimeout(t);
  }, [display, deleting, wordIdx, words, typeMs, deleteMs, pauseMs]);
  return display;
}

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const cd = useCountdown(LAUNCH_DATE);
  const typed = useTypewriter(WORDS);
  const pad = (n: number) => String(n).padStart(2, '0');

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = mounted && resolvedTheme === 'dark';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const [count, setCount] = useState(BASE_COUNT);
  const [recentAvatars, setRecentAvatars] = useState<
    { avatar_url: string; name: string | null }[]
  >([]);
  const [modalUser, setModalUser] = useState<WaitlistUser | null>(null);
  const [refCode, setRefCode] = useState<string | null>(null);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const ringsRef = useRef<HTMLDivElement>(null);

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const ref = params.get('ref');
    if (ref) {
      setRefCode(ref);
      localStorage.setItem('opphex_ref', ref);
    } else {
      const s = localStorage.getItem('opphex_ref');
      if (s) setRefCode(s);
    }

    if (params.get('joined') === 'true') {
      window.history.replaceState({}, '', '/');
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user?.email) {
          supabase
            .from('waitlist_users')
            .select()
            .eq('email', session.user.email.toLowerCase())
            .single()
            .then(({ data }) => {
              if (data) setModalUser(data as WaitlistUser);
            });
        }
      });
    }

    supabase
      .from('waitlist_users')
      .select('*', { count: 'exact', head: true })
      .then(({ count: c }) => {
        if (c) setCount(BASE_COUNT + c);
      });

    supabase
      .from('waitlist_users')
      .select('avatar_url, name')
      .not('avatar_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(5)
      .then(({ data }) => {
        if (data && data.length >= 3)
          setRecentAvatars(data as typeof recentAvatars);
      });
  }, []);

  // ── Realtime ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const ch = supabase
      .channel('page-rt')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'waitlist_users' },
        () => setCount(c => c + 1),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  // ── Parallax rings ────────────────────────────────────────────────────────
  useEffect(() => {
    const rings = ringsRef.current;
    if (!rings) return;
    const h = (e: MouseEvent) => {
      rings.style.transform = `translate(${(e.clientX / window.innerWidth - 0.5) * 20}px,${(e.clientY / window.innerHeight - 0.5) * 12}px)`;
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    setErrMsg('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrMsg('Enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, referredBy: refCode }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      if (json.alreadyJoined) {
        setStatus('idle');
        setAlreadyJoined(true);
        setTimeout(() => setAlreadyJoined(false), 4500);
        return;
      }
      setModalUser(json.user as WaitlistUser);
      setStatus('success');
      localStorage.removeItem('opphex_ref');
      setRefCode(null);
    } catch (err) {
      setStatus('idle');
      setErrMsg(
        err instanceof Error ? err.message : 'Something went wrong. Try again.',
      );
    }
  }, [email, refCode]);

  const handleGoogleSignIn = useCallback(async () => {
    if (refCode)
      document.cookie = `opphex_ref=${refCode}; path=/; max-age=300; SameSite=Lax`;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }, [refCode]);

  const displayAvatars = useMemo(
    () =>
      recentAvatars.length >= 3
        ? recentAvatars.slice(0, 5)
        : [
            { avatar_url: 'https://i.pravatar.cc/120?img=11', name: null },
            { avatar_url: 'https://i.pravatar.cc/120?img=32', name: null },
            { avatar_url: 'https://i.pravatar.cc/120?img=45', name: null },
            { avatar_url: 'https://i.pravatar.cc/120?img=56', name: null },
          ],
    [recentAvatars],
  );

  const units = [
    { v: pad(cd.d), label: 'Days' },
    { v: pad(cd.h), label: 'Hrs' },
    { v: pad(cd.m), label: 'Min' },
    { v: pad(cd.s), label: 'Sec' },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {modalUser && (
        <WaitlistModal
          user={modalUser}
          totalCount={count}
          onClose={() => setModalUser(null)}
        />
      )}
      <NotificationToast userReferralCode={modalUser?.referral_code ?? null} />

      {/* Gradient orbs — colors driven by CSS variables, theme-aware */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[640px] rounded-full blur-[130px]"
          style={{ background: 'var(--blob-1)' }}
        />
        <div
          className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full blur-[110px]"
          style={{ background: 'var(--blob-2)' }}
        />
      </div>

      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-12 h-16 backdrop-blur-xl"
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-nav)',
        }}
      >
        <Logo />

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const next = isDark ? 'light' : 'dark';
              const dt = document as typeof document & {
                startViewTransition?: (cb: () => void) => void;
              };
              const apply = () => {
                document.documentElement.classList.toggle(
                  'dark',
                  next === 'dark',
                );
                setTheme(next);
              };
              if (dt.startViewTransition) {
                dt.startViewTransition(apply);
              } else {
                apply();
              }
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-75"
            style={{
              background: 'var(--surface2)',
              color: 'var(--muted)',
              border: '1px solid var(--border)',
            }}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun size={15} weight="fill" style={{ color: 'var(--accent)' }} />
            ) : (
              <Moon size={15} weight="fill" />
            )}
          </button>

          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              border: '1px solid rgba(233,127,59,0.3)',
              background: 'rgba(233,127,59,0.07)',
            }}
          >
            <span
              className="w-[5px] h-[5px] rounded-full"
              style={{
                background: 'var(--accent)',
                animation: 'pulse 2s ease infinite',
              }}
            />
            <span
              className="text-[11px] font-semibold tracking-wider uppercase"
              style={{ color: 'var(--accent)' }}
            >
              Early Access
            </span>
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 overflow-hidden">
        {/* Rings + floating category pills — scoped to hero viewport */}
        <div
          ref={ringsRef}
          className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none transition-transform duration-[400ms] ease-out"
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <div
            className="absolute w-[480px] h-[480px] rounded-full animate-spin-slow"
            style={{ border: '1px dashed var(--border)' }}
          />
          <div
            className="absolute w-[700px] h-[700px] rounded-full animate-spin-reverse"
            style={{ border: '1px dashed var(--border)' }}
          />

          {/* Dashed ">" — two parallel paths for solid/thick look, mirrors the O's double-ring */}
          <svg
            className="absolute pointer-events-none"
            aria-hidden="true"
            style={{ overflow: 'visible', width: 0, height: 0 }}
          >
            <g transform="translate(310, 0)">
              <g
                style={{
                  animation: 'spinCW 62s linear infinite',
                  transformBox: 'fill-box',
                  transformOrigin: '50% 50%',
                }}
              >
                {/* Outer chevron — outer edge of the thick stroke */}
                <polyline
                  points="0,-138 104,0 0,138"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  strokeDasharray="8 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Inner chevron — inner edge (creates the solid/thick appearance) */}
                <polyline
                  points="26,-113 76,0 26,113"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  strokeDasharray="8 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </svg>

          {PILLS.map((p, i) => (
            <div
              key={i}
              className="absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium backdrop-blur-sm"
              style={{
                ...p.style,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--muted)',
                animation: 'floatY 4.2s ease-in-out infinite',
                animationDelay: p.delay,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
              {p.label}
            </div>
          ))}
        </div>

        {/* ── Hero ── */}
        <div className="relative z-10 max-w-2xl w-full mx-auto flex flex-col items-center text-center pt-10 sm:pt-20 pb-12 sm:pb-16">
          {/* Social proof */}
          <div
            className="mb-5 inline-flex items-center gap-3 rounded-full px-4 py-2"
            style={{
              border: '1px solid rgba(233,127,59,0.25)',
              background: 'rgba(233,127,59,0.06)',
            }}
          >
            <div className="flex -space-x-2.5">
              {displayAvatars.map((a, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={a.avatar_url}
                  alt={a.name ?? ''}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full object-cover"
                  style={{ border: '2px solid var(--bg)' }}
                />
              ))}
            </div>
            <p className="text-[13px]" style={{ color: 'var(--muted)' }}>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>
                {count < 1000 ? '500' : count.toLocaleString()}+
              </span>{' '}
              people already joined
            </p>
          </div>

          {/* ── Countdown — card style ── */}
          <div className="mb-9 flex flex-col items-center gap-3">
            <p
              className="text-[10px] uppercase tracking-[0.22em] font-bold"
              style={{ color: 'var(--muted)' }}
            >
              Launching Aug 7, 2026
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              {units.map((u, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  {i > 0 && (
                    <span
                      className="font-black select-none -mt-5"
                      style={{
                        fontSize: '1.5rem',
                        color: 'var(--muted)',
                        opacity: 0.25,
                      }}
                    >
                      :
                    </span>
                  )}
                  <div
                    className="flex flex-col items-center gap-1.5 sm:gap-2 rounded-2xl"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      padding: 'clamp(10px,2vw,14px) clamp(12px,3vw,18px)',
                      minWidth: 'clamp(58px,14vw,76px)',
                    }}
                  >
                    <span
                      className="leading-none font-black"
                      style={{
                        fontSize: 'clamp(1.6rem,5vw,2.4rem)',
                        color: 'var(--text)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      <RollingNumber value={u.v} />
                    </span>
                    <span
                      className="font-bold uppercase"
                      style={{
                        fontSize: 'clamp(7px,1.5vw,9px)',
                        letterSpacing: '0.2em',
                        color: 'var(--muted)',
                      }}
                    >
                      {u.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Headline */}
          <h1
            className="text-[clamp(2.4rem,8vw,5.5rem)] font-black leading-[1.02] tracking-tight"
            style={{ fontFamily: 'var(--font-lora)', color: 'var(--text)' }}
          >
            Discover all
            <br />
            <span className="italic" style={{ color: 'var(--accent)' }}>
              {typed}
              <span
                className="inline-block w-[3px] h-[0.82em] ml-[3px] align-middle rounded-[2px]"
                style={{
                  background: 'var(--accent)',
                  animation: 'blink 1.1s step-end infinite',
                }}
              />
            </span>
            <br />
            in one place.
          </h1>

          <p
            className="mt-6 text-[clamp(0.95rem,1.8vw,1.1rem)] max-w-[480px] leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            The single destination for students, early professionals, and
            founders. Discover hackathons, fellowships, internships, grants,
            sidejobs, and opportunities worldwide.
          </p>

          {/* ── Sign-up form ── */}
          <div className="mt-10 w-full max-w-[500px]">
            <div
              className="flex flex-col xs:flex-row gap-2 rounded-2xl p-1.5"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="name@domain.com"
                className="flex-1 bg-transparent outline-none px-4 py-3 text-[15px] placeholder:opacity-40"
                style={{ color: 'var(--text)' }}
              />
              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className="px-5 py-3 rounded-xl text-[14px] font-semibold cursor-pointer ransition-opacity disabled:opacity-60 whitespace-nowrap hover:opacity-90"
                style={{ background: 'var(--text)', color: 'var(--bg)' }}
              >
                {status === 'loading' ? 'Joining…' : 'Get Early Access →'}
              </button>
            </div>

            {errMsg && (
              <p className="mt-2 text-xs text-red-400 text-left px-1">
                {errMsg}
              </p>
            )}

            {/* Google OAuth — always light background per Google brand guidelines */}
            <button
              onClick={handleGoogleSignIn}
              className="mt-3 w-full flex items-center justify-center gap-3 rounded-2xl py-3.5 text-[14px] font-medium transition-opacity hover:opacity-90"
              style={{
                border: '1px solid #e2e2e2',
                background: '#ffffff',
                color: '#1a1a1a',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5Z"
                />
                <path
                  fill="#FF3D00"
                  d="m6.3 14.7 6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.4 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8L6 33.1C9.4 39.7 16.2 44 24 44Z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.1 5.5l6.2 5.2C42.1 36 44 30.4 44 24c0-1.3-.1-2.3-.4-3.5Z"
                />
              </svg>
              Continue with Google
            </button>

            <p className="mt-3.5 text-[12px]" style={{ color: 'var(--muted)' }}>
              Free to join · Invite friends to unlock early access.{' '}
              {refCode && (
                <span
                  className="font-semibold"
                  style={{ color: 'var(--accent)' }}
                >
                  Referred by a friend ✓
                </span>
              )}
            </p>
          </div>
        </div>

        {/* ── Supporters auto-scroll ── */}
        <section className="relative z-10 mt-4 pb-20 w-full">
          <p
            className="text-center text-[11px] uppercase tracking-[0.22em] font-semibold mb-7 px-6"
            style={{ color: 'var(--muted)' }}
          >
            Built on leading platforms{' '}
          </p>

          {/* overflow hidden + edge fade */}
          <div
            style={{
              overflow: 'hidden',
              maskImage:
                'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            }}
          >
            {/* grid scrolls left infinitely; content duplicated for seamless loop */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(2, 186px)',
                gridAutoFlow: 'column',
                gridAutoColumns: 'max-content',
                gap: '12px',
                width: 'max-content',
                paddingLeft: '6px',
                animation: 'marquee 48s linear infinite',
              }}
            >
              {[...SUPPORTER_CARDS, ...SUPPORTER_CARDS].map((card, i) => (
                <a
                  key={i}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`supporter-card group relative flex flex-col${card.size === 'large' ? ' row-span-2' : ''}`}
                  style={{
                    width: card.size === 'large' ? '340px' : '240px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    padding: '24px',
                    borderRadius: '18px',
                    color: 'var(--text)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e =>
                    (
                      e.currentTarget.closest(
                        'div[style]',
                      ) as HTMLElement | null
                    )?.style.setProperty('animation-play-state', 'paused')
                  }
                  onMouseLeave={e =>
                    (
                      e.currentTarget.closest(
                        'div[style]',
                      ) as HTMLElement | null
                    )?.style.setProperty('animation-play-state', 'running')
                  }
                >
                  {/* Arrow top-right — large cards only */}
                  {card.size === 'large' && (
                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-60 transition-opacity duration-200">
                      <ArrowUpRight
                        size={20}
                        style={{ color: 'var(--muted)' }}
                      />
                    </div>
                  )}

                  {/* Logo — colorful in light, grayscale in dark */}
                  <div
                    className={
                      card.size === 'small'
                        ? 'flex-1 flex items-center justify-center'
                        : ''
                    }
                    style={{
                      filter: isDark ? 'grayscale(1)' : 'none',
                      opacity: isDark ? 0.75 : 1,
                      transition: 'filter 0.4s ease, opacity 0.4s ease',
                    }}
                  >
                    {card.logo}
                  </div>

                  {/* Description — large cards only */}
                  {card.size === 'large' && 'description' in card && (
                    <p
                      className="mt-auto pt-6 text-[13px] leading-relaxed"
                      style={{ color: 'var(--muted)' }}
                    >
                      {card.description}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <FAQ />
      </main>

      {/* ── Footer ── */}
      <footer
        className="relative z-20"
        style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
      >
        <div className="max-w-6xl mx-auto px-8 pt-14 pb-10 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <FooterLogo />
            <p
              className="text-[13px] leading-relaxed pt-5 max-w-[260px]"
              style={{ color: 'var(--muted)' }}
            >
              Connecting talents with hackathons, scholarships, grants,
              internships and global opportunities.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-60"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-widest mb-4"
              style={{ color: 'var(--text)' }}
            >
              Company
            </h4>
            <div
              className="flex flex-col gap-3 text-[13px]"
              style={{ color: 'var(--muted)' }}
            >
              <a href="/about" className="transition-opacity hover:opacity-70">
                About
              </a>
              <a
                href="/contact"
                className="transition-opacity hover:opacity-70"
              >
                Contact
              </a>
            </div>
          </div>

          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-widest mb-4"
              style={{ color: 'var(--text)' }}
            >
              Legal
            </h4>
            <div
              className="flex flex-col gap-3 text-[13px]"
              style={{ color: 'var(--muted)' }}
            >
              <a
                href="/privacy"
                className="transition-opacity hover:opacity-70"
              >
                Privacy Policy
              </a>
              <a href="/terms" className="transition-opacity hover:opacity-70">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div
          className="py-5 px-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px]" style={{ color: 'var(--muted)' }}>
              © 2026 Opphex. Built for students, professionals, and founders.
            </p>
            <div
              className="flex items-center gap-4 text-[12px]"
              style={{ color: 'var(--muted)' }}
            >
              <a
                href="/privacy"
                className="transition-opacity hover:opacity-70"
              >
                Privacy Policy
              </a>
              <span className="opacity-30">·</span>
              <a href="/terms" className="transition-opacity hover:opacity-70">
                Terms of Service
              </a>
              <span className="opacity-30">·</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="transition-opacity hover:opacity-70"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Already-on-waitlist toast ── */}
      <AnimatePresence>
        {alreadyJoined && (
          <motion.div
            initial={{ x: 90, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 90, opacity: 0, transition: { duration: 0.16 } }}
            className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-75 z-[91] flex items-start gap-3 rounded-2xl px-4 py-3.5 shadow-xl overflow-hidden"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--accent)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: 'rgba(233,127,59,0.1)',
                color: 'var(--accent)',
              }}
            >
              <CheckCircle size={16} weight="fill" />
            </div>
            <div>
              <p
                className="text-[12px] font-semibold leading-snug"
                style={{ color: 'var(--text)' }}
              >
                You&apos;re already on the waitlist!
              </p>
              <p
                className="text-[10px] mt-0.5"
                style={{ color: 'var(--muted)' }}
              >
                Use the widget below to see your invite code ↘
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Invite Widget FAB ── */}
      <InviteWidget />

      <style>{`
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes rollOut { from{transform:translateY(0);opacity:1} to{transform:translateY(110%);opacity:0} }
        @keyframes rollIn  { from{transform:translateY(-110%);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes marquee-reverse { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        .animate-spin-slow    { animation: spinCW  40s linear infinite; }
        .animate-spin-reverse { animation: spinCCW 58s linear infinite; }
        @keyframes spinCW  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)}  }
        @keyframes spinCCW { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
      `}</style>
    </div>
  );
}
