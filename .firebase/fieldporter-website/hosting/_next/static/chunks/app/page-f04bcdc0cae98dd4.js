(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [974],
  {
    4353: (e, a, t) => {
      Promise.resolve().then(t.bind(t, 8152));
    },
    8152: (e, a, t) => {
      'use strict';
      t.r(a), t.d(a, { default: () => f });
      var i = t(5155),
        n = t(4420),
        s = t(263),
        r = t(5437),
        l = t(2115);
      let d = {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.15,
              delayChildren: 0.3,
            },
          },
        },
        o = {
          hidden: { opacity: 0, y: 50, rotateX: -90, scale: 0.8 },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: 'spring',
              stiffness: 100,
              damping: 12,
            },
          },
        },
        c = {
          hidden: { opacity: 0, y: 30, scale: 0.9, rotateX: -20 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: 'spring',
              stiffness: 120,
              damping: 15,
            },
          },
        },
        p = {
          scale: 1.05,
          y: -5,
          rotateX: 5,
          rotateY: -2,
          boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 60px rgba(255,255,255,0.15)',
          transition: { type: 'spring', stiffness: 400, damping: 25 },
        },
        g = { scale: 0.98, y: -2, transition: { duration: 0.1, ease: 'easeOut' } };
      function f() {
        let [e, a] = (0, l.useState)({ x: 0, y: 0 }),
          [t, f] = (0, l.useState)(!1),
          m = (0, n.d)(0),
          x = (0, n.d)(0),
          y = { damping: 25, stiffness: 700 },
          b = (0, s.z)(m, y),
          u = (0, s.z)(x, y);
        return (
          (0, l.useEffect)(() => {
            let e = e => {
              a({ x: e.clientX, y: e.clientY }), m.set(e.clientX - 10), x.set(e.clientY - 10);
            };
            return (
              window.addEventListener('mousemove', e),
              () => window.removeEventListener('mousemove', e)
            );
          }, [m, x]),
          (0, i.jsxs)(i.Fragment, {
            children: [
              (0, i.jsx)(r.P.div, {
                className:
                  'fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-50 mix-blend-mode-difference',
                style: { x: b, y: u },
                animate: { scale: t ? 1.5 : 1, opacity: t ? 0.8 : 0.4 },
                transition: { type: 'spring', stiffness: 400, damping: 28 },
              }),
              (0, i.jsx)('div', { className: 'particle particle-1' }),
              (0, i.jsx)('div', { className: 'particle particle-2' }),
              (0, i.jsx)('div', { className: 'particle particle-3' }),
              (0, i.jsx)('div', { className: 'particle particle-4' }),
              (0, i.jsx)('div', { className: 'ambient-light' }),
              (0, i.jsxs)(r.P.div, {
                className: 'container',
                variants: d,
                initial: 'hidden',
                animate: 'visible',
                children: [
                  (0, i.jsx)(r.P.h1, {
                    className: 'logo',
                    children: 'FIELDPORTER'.split('').map((e, a) =>
                      (0, i.jsx)(
                        r.P.span,
                        {
                          variants: o,
                          custom: a,
                          style: {
                            display: 'inline-block',
                            marginRight: ' ' === e ? '0.5em' : '0',
                          },
                          whileHover: {
                            y: -10,
                            rotateZ: 5,
                            color: '#f0f0f0',
                            textShadow: '0 0 30px rgba(255,255,255,0.5)',
                            transition: { type: 'spring', stiffness: 300, damping: 20 },
                          },
                          children: e,
                        },
                        a
                      )
                    ),
                  }),
                  (0, i.jsxs)(r.P.div, {
                    className: 'status',
                    variants: c,
                    whileHover: p,
                    whileTap: g,
                    onHoverStart: () => f(!0),
                    onHoverEnd: () => f(!1),
                    style: { transformStyle: 'preserve-3d' },
                    children: [
                      (0, i.jsx)(r.P.span, {
                        className: 'status-dot',
                        animate: {
                          boxShadow: [
                            '0 0 15px rgba(74, 222, 128, 0.6), 0 0 30px rgba(74, 222, 128, 0.4)',
                            '0 0 25px rgba(74, 222, 128, 0.9), 0 0 50px rgba(74, 222, 128, 0.6)',
                            '0 0 15px rgba(74, 222, 128, 0.6), 0 0 30px rgba(74, 222, 128, 0.4)',
                          ],
                        },
                        transition: { duration: 2.5, repeat: 1 / 0, ease: 'easeInOut' },
                      }),
                      (0, i.jsx)(r.P.span, {
                        animate: { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] },
                        transition: { duration: 3, repeat: 1 / 0, ease: 'linear' },
                        style: {
                          background:
                            'linear-gradient(90deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)',
                          backgroundSize: '200% 100%',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        },
                        children: 'Under Construction',
                      }),
                    ],
                  }),
                ],
              }),
              (0, i.jsx)(r.P.div, {
                className: 'footer',
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] },
                whileHover: {
                  scale: 1.05,
                  y: -2,
                  transition: { type: 'spring', stiffness: 400, damping: 25 },
                },
                children: '\xa9 2025',
              }),
              (0, i.jsx)(r.P.div, {
                className: 'fixed inset-0 pointer-events-none',
                animate: {
                  background: [
                    'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.04) 0%, transparent 50%)',
                    'radial-gradient(circle at 75% 75%, rgba(255,255,255,0.04) 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)',
                    'radial-gradient(circle at 25% 75%, rgba(255,255,255,0.04) 0%, transparent 50%)',
                    'radial-gradient(circle at 75% 25%, rgba(255,255,255,0.04) 0%, transparent 50%)',
                    'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.04) 0%, transparent 50%)',
                  ],
                },
                transition: { duration: 25, repeat: 1 / 0, ease: 'linear' },
              }),
            ],
          })
        );
      }
    },
  },
  e => {
    var a = a => e((e.s = a));
    e.O(0, [163, 441, 517, 358], () => a(4353)), (_N_E = e.O());
  },
]);
