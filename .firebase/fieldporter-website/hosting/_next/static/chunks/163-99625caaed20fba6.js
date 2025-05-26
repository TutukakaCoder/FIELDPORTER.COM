'use strict';
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [163],
  {
    7249: (t, e, i) => {
      i.d(e, { Q: () => n });
      let n = (0, i(2115).createContext)({
        transformPagePoint: t => t,
        isStatic: !1,
        reducedMotion: 'never',
      });
    },
    5437: (t, e, i) => {
      function n(t) {
        return null !== t && 'object' == typeof t && 'function' == typeof t.start;
      }
      function s(t, e, i, n) {
        if (
          'function' == typeof e ||
          ('string' == typeof e && (e = t.variants && t.variants[e]), 'function' == typeof e)
        ) {
          let [s, r] = (function (t) {
            let e = [{}, {}];
            return (
              t?.values.forEach((t, i) => {
                (e[0][i] = t.get()), (e[1][i] = t.getVelocity());
              }),
              e
            );
          })(n);
          e = e(void 0 !== i ? i : t.custom, s, r);
        }
        return e;
      }
      function r(t, e, i) {
        let n = t.getProps();
        return s(n, e, void 0 !== i ? i : n.custom, t);
      }
      function a(t, e) {
        return t?.[e] ?? t?.default ?? t;
      }
      i.d(e, { P: () => ss });
      var o,
        l,
        h = i(3932);
      let u = [
          'transformPerspective',
          'x',
          'y',
          'z',
          'translateX',
          'translateY',
          'translateZ',
          'scale',
          'scaleX',
          'scaleY',
          'rotate',
          'rotateX',
          'rotateY',
          'rotateZ',
          'skew',
          'skewX',
          'skewY',
        ],
        d = new Set(u),
        c = new Set(['width', 'height', 'top', 'left', 'right', 'bottom', ...u]);
      var p = i(9421);
      let m = t => Array.isArray(t);
      var f = i(4148),
        v = i(9356);
      function y(t, e) {
        let i = t.getValue('willChange');
        if ((0, v.S)(i) && i.add) return i.add(e);
        if (!i && f.W.WillChange) {
          let i = new f.W.WillChange('auto');
          t.addValue('willChange', i), i.add(e);
        }
      }
      let g = t => t.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase(),
        x = 'data-' + g('framerAppearId');
      var T = i(1604),
        w = i(6054),
        S = i(5850),
        b = i(6881);
      let P = t => (180 * t) / Math.PI,
        A = t => M(P(Math.atan2(t[1], t[0]))),
        V = {
          x: 4,
          y: 5,
          translateX: 4,
          translateY: 5,
          scaleX: 0,
          scaleY: 3,
          scale: t => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
          rotate: A,
          rotateZ: A,
          skewX: t => P(Math.atan(t[1])),
          skewY: t => P(Math.atan(t[2])),
          skew: t => (Math.abs(t[1]) + Math.abs(t[2])) / 2,
        },
        M = t => ((t %= 360) < 0 && (t += 360), t),
        k = t => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
        E = t => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
        D = {
          x: 12,
          y: 13,
          z: 14,
          translateX: 12,
          translateY: 13,
          translateZ: 14,
          scaleX: k,
          scaleY: E,
          scale: t => (k(t) + E(t)) / 2,
          rotateX: t => M(P(Math.atan2(t[6], t[5]))),
          rotateY: t => M(P(Math.atan2(-t[2], t[0]))),
          rotateZ: A,
          rotate: A,
          skewX: t => P(Math.atan(t[4])),
          skewY: t => P(Math.atan(t[1])),
          skew: t => (Math.abs(t[1]) + Math.abs(t[4])) / 2,
        };
      function C(t) {
        return t.includes('scale') ? 1 : 0;
      }
      function R(t, e) {
        let i, n;
        if (!t || 'none' === t) return C(e);
        let s = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
        if (s) (i = D), (n = s);
        else {
          let e = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
          (i = V), (n = e);
        }
        if (!n) return C(e);
        let r = i[e],
          a = n[1].split(',').map(L);
        return 'function' == typeof r ? r(a) : a[r];
      }
      let j = (t, e) => {
        let { transform: i = 'none' } = getComputedStyle(t);
        return R(i, e);
      };
      function L(t) {
        return parseFloat(t.trim());
      }
      var F = i(2264),
        B = i(3137);
      let O = t => t === F.ai || t === B.px,
        I = new Set(['x', 'y', 'z']),
        U = u.filter(t => !I.has(t)),
        W = {
          width: ({ x: t }, { paddingLeft: e = '0', paddingRight: i = '0' }) =>
            t.max - t.min - parseFloat(e) - parseFloat(i),
          height: ({ y: t }, { paddingTop: e = '0', paddingBottom: i = '0' }) =>
            t.max - t.min - parseFloat(e) - parseFloat(i),
          top: (t, { top: e }) => parseFloat(e),
          left: (t, { left: e }) => parseFloat(e),
          bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
          right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
          x: (t, { transform: e }) => R(e, 'x'),
          y: (t, { transform: e }) => R(e, 'y'),
        };
      (W.translateX = W.x), (W.translateY = W.y);
      let N = new Set(),
        $ = !1,
        G = !1,
        q = !1;
      function X() {
        if (G) {
          let t = Array.from(N).filter(t => t.needsMeasurement),
            e = new Set(t.map(t => t.element)),
            i = new Map();
          e.forEach(t => {
            let e = (function (t) {
              let e = [];
              return (
                U.forEach(i => {
                  let n = t.getValue(i);
                  void 0 !== n && (e.push([i, n.get()]), n.set(i.startsWith('scale') ? 1 : 0));
                }),
                e
              );
            })(t);
            e.length && (i.set(t, e), t.render());
          }),
            t.forEach(t => t.measureInitialState()),
            e.forEach(t => {
              t.render();
              let e = i.get(t);
              e &&
                e.forEach(([e, i]) => {
                  t.getValue(e)?.set(i);
                });
            }),
            t.forEach(t => t.measureEndState()),
            t.forEach(t => {
              void 0 !== t.suspendedScrollY && window.scrollTo(0, t.suspendedScrollY);
            });
        }
        (G = !1), ($ = !1), N.forEach(t => t.complete(q)), N.clear();
      }
      function Y() {
        N.forEach(t => {
          t.readKeyframes(), t.needsMeasurement && (G = !0);
        });
      }
      class K {
        constructor(t, e, i, n, s, r = !1) {
          (this.state = 'pending'),
            (this.isAsync = !1),
            (this.needsMeasurement = !1),
            (this.unresolvedKeyframes = [...t]),
            (this.onComplete = e),
            (this.name = i),
            (this.motionValue = n),
            (this.element = s),
            (this.isAsync = r);
        }
        scheduleResolve() {
          (this.state = 'scheduled'),
            this.isAsync
              ? (N.add(this), $ || (($ = !0), h.Gt.read(Y), h.Gt.resolveKeyframes(X)))
              : (this.readKeyframes(), this.complete());
        }
        readKeyframes() {
          let { unresolvedKeyframes: t, name: e, element: i, motionValue: n } = this;
          if (null === t[0]) {
            let s = n?.get(),
              r = t[t.length - 1];
            if (void 0 !== s) t[0] = s;
            else if (i && e) {
              let n = i.readValue(e, r);
              null != n && (t[0] = n);
            }
            void 0 === t[0] && (t[0] = r), n && void 0 === s && n.set(t[0]);
          }
          !(function (t) {
            for (let e = 1; e < t.length; e++) t[e] ?? (t[e] = t[e - 1]);
          })(t);
        }
        setFinalKeyframe() {}
        measureInitialState() {}
        renderEndStyles() {}
        measureEndState() {}
        complete(t = !1) {
          (this.state = 'complete'),
            this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t),
            N.delete(this);
        }
        cancel() {
          'scheduled' === this.state && (N.delete(this), (this.state = 'pending'));
        }
        resume() {
          'pending' === this.state && this.scheduleResolve();
        }
      }
      var z = i(300),
        H = i(5107);
      let Q = t => t.startsWith('--');
      function Z(t) {
        let e;
        return () => (void 0 === e && (e = t()), e);
      }
      let _ = Z(() => void 0 !== window.ScrollTimeline);
      var J = i(4537),
        tt = i(7971),
        te = i(5853),
        ti = i(6430);
      let tn = {},
        ts = (function (t, e) {
          let i = Z(t);
          return () => tn[e] ?? i();
        })(() => {
          try {
            document.createElement('div').animate({ opacity: 0 }, { easing: 'linear(0, 1)' });
          } catch (t) {
            return !1;
          }
          return !0;
        }, 'linearEasing');
      var tr = i(1432);
      let ta = ([t, e, i, n]) => `cubic-bezier(${t}, ${e}, ${i}, ${n})`,
        to = {
          linear: 'linear',
          ease: 'ease',
          easeIn: 'ease-in',
          easeOut: 'ease-out',
          easeInOut: 'ease-in-out',
          circIn: ta([0, 0.65, 0.55, 1]),
          circOut: ta([0.55, 0, 1, 0.45]),
          backIn: ta([0.31, 0.01, 0.66, -0.59]),
          backOut: ta([0.33, 1.53, 0.69, 0.99]),
        };
      function tl(t) {
        return 'function' == typeof t && 'applyToOptions' in t;
      }
      class th extends J.q {
        constructor(t) {
          if ((super(), (this.finishedTime = null), (this.isStopped = !1), !t)) return;
          let {
            element: e,
            name: i,
            keyframes: n,
            pseudoElement: s,
            allowFlatten: r = !1,
            finalKeyframe: a,
            onComplete: o,
          } = t;
          (this.isPseudoElement = !!s),
            (this.allowFlatten = r),
            (this.options = t),
            (0, H.V)(
              'string' != typeof t.type,
              'animateMini doesn\'t support "type" as a string. Did you mean to import { spring } from "motion"?'
            );
          let l = (function ({ type: t, ...e }) {
            return tl(t) && ts()
              ? t.applyToOptions(e)
              : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = 'easeOut'), e);
          })(t);
          (this.animation = (function (
            t,
            e,
            i,
            {
              delay: n = 0,
              duration: s = 300,
              repeat: r = 0,
              repeatType: a = 'loop',
              ease: o = 'easeOut',
              times: l,
            } = {},
            h
          ) {
            let u = { [e]: i };
            l && (u.offset = l);
            let d = (function t(e, i) {
              if (e)
                return 'function' == typeof e
                  ? ts()
                    ? (0, tr.K)(e, i)
                    : 'ease-out'
                  : (0, ti.D)(e)
                    ? ta(e)
                    : Array.isArray(e)
                      ? e.map(e => t(e, i) || to.easeOut)
                      : to[e];
            })(o, s);
            Array.isArray(d) && (u.easing = d), te.Q.value && tt.q.waapi++;
            let c = {
              delay: n,
              duration: s,
              easing: Array.isArray(d) ? 'linear' : d,
              fill: 'both',
              iterations: r + 1,
              direction: 'reverse' === a ? 'alternate' : 'normal',
            };
            h && (c.pseudoElement = h);
            let p = t.animate(u, c);
            return (
              te.Q.value &&
                p.finished.finally(() => {
                  tt.q.waapi--;
                }),
              p
            );
          })(e, i, n, l, s)),
            !1 === l.autoplay && this.animation.pause(),
            (this.animation.onfinish = () => {
              if (((this.finishedTime = this.time), !s)) {
                let t = (0, b.X)(n, this.options, a, this.speed);
                this.updateMotionValue
                  ? this.updateMotionValue(t)
                  : (function (t, e, i) {
                      Q(e) ? t.style.setProperty(e, i) : (t.style[e] = i);
                    })(e, i, t),
                  this.animation.cancel();
              }
              o?.(), this.notifyFinished();
            });
        }
        play() {
          this.isStopped ||
            (this.animation.play(), 'finished' === this.state && this.updateFinished());
        }
        pause() {
          this.animation.pause();
        }
        complete() {
          this.animation.finish?.();
        }
        cancel() {
          try {
            this.animation.cancel();
          } catch (t) {}
        }
        stop() {
          if (this.isStopped) return;
          this.isStopped = !0;
          let { state: t } = this;
          'idle' !== t &&
            'finished' !== t &&
            (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
            this.isPseudoElement || this.cancel());
        }
        commitStyles() {
          this.isPseudoElement || this.animation.commitStyles?.();
        }
        get duration() {
          let t = this.animation.effect?.getComputedTiming?.().duration || 0;
          return (0, z.X)(Number(t));
        }
        get time() {
          return (0, z.X)(Number(this.animation.currentTime) || 0);
        }
        set time(t) {
          (this.finishedTime = null), (this.animation.currentTime = (0, z.f)(t));
        }
        get speed() {
          return this.animation.playbackRate;
        }
        set speed(t) {
          t < 0 && (this.finishedTime = null), (this.animation.playbackRate = t);
        }
        get state() {
          return null !== this.finishedTime ? 'finished' : this.animation.playState;
        }
        get startTime() {
          return Number(this.animation.startTime);
        }
        set startTime(t) {
          this.animation.startTime = t;
        }
        attachTimeline({ timeline: t, observe: e }) {
          return (this.allowFlatten && this.animation.effect?.updateTiming({ easing: 'linear' }),
          (this.animation.onfinish = null),
          t && _())
            ? ((this.animation.timeline = t), w.l)
            : e(this);
        }
      }
      var tu = i(4407),
        td = i(4162),
        tc = i(9707),
        tp = i(1679);
      let tm = { anticipate: td.b, backInOut: tc.ZZ, circInOut: tp.tn };
      class tf extends th {
        constructor(t) {
          !(function (t) {
            'string' == typeof t.ease && t.ease in tm && (t.ease = tm[t.ease]);
          })(t),
            (0, tu.E)(t),
            super(t),
            t.startTime && (this.startTime = t.startTime),
            (this.options = t);
        }
        updateMotionValue(t) {
          let { motionValue: e, onUpdate: i, onComplete: n, element: s, ...r } = this.options;
          if (!e) return;
          if (void 0 !== t) {
            e.set(t);
            return;
          }
          let a = new T.s({ ...r, autoplay: !1 }),
            o = (0, z.f)(this.finishedTime ?? this.time);
          e.setWithVelocity(a.sample(o - 10).value, a.sample(o).value, 10), a.stop();
        }
      }
      var tv = i(663);
      let ty = (t, e) =>
        'zIndex' !== e &&
        !!(
          'number' == typeof t ||
          Array.isArray(t) ||
          ('string' == typeof t && (tv.f.test(t) || '0' === t) && !t.startsWith('url('))
        );
      function tg(t) {
        return 'object' == typeof t && null !== t;
      }
      function tx(t) {
        return tg(t) && 'offsetHeight' in t;
      }
      let tT = new Set(['opacity', 'clipPath', 'filter', 'transform']),
        tw = Z(() => Object.hasOwnProperty.call(Element.prototype, 'animate'));
      class tS extends J.q {
        constructor({
          autoplay: t = !0,
          delay: e = 0,
          type: i = 'keyframes',
          repeat: n = 0,
          repeatDelay: s = 0,
          repeatType: r = 'loop',
          keyframes: a,
          name: o,
          motionValue: l,
          element: h,
          ...u
        }) {
          super(),
            (this.stop = () => {
              this._animation && (this._animation.stop(), this.stopTimeline?.()),
                this.keyframeResolver?.cancel();
            }),
            (this.createdAt = S.k.now());
          let d = {
              autoplay: t,
              delay: e,
              type: i,
              repeat: n,
              repeatDelay: s,
              repeatType: r,
              name: o,
              motionValue: l,
              element: h,
              ...u,
            },
            c = h?.KeyframeResolver || K;
          (this.keyframeResolver = new c(
            a,
            (t, e, i) => this.onKeyframesResolved(t, e, d, !i),
            o,
            l,
            h
          )),
            this.keyframeResolver?.scheduleResolve();
        }
        onKeyframesResolved(t, e, i, n) {
          this.keyframeResolver = void 0;
          let { name: s, type: r, velocity: a, delay: o, isHandoff: l, onUpdate: h } = i;
          (this.resolvedAt = S.k.now()),
            !(function (t, e, i, n) {
              let s = t[0];
              if (null === s) return !1;
              if ('display' === e || 'visibility' === e) return !0;
              let r = t[t.length - 1],
                a = ty(s, e),
                o = ty(r, e);
              return (
                (0, H.$)(
                  a === o,
                  `You are trying to animate ${e} from "${s}" to "${r}". ${s} is not an animatable value - to enable this animation set ${s} to a value animatable to ${r} via the \`style\` property.`
                ),
                !!a &&
                  !!o &&
                  ((function (t) {
                    let e = t[0];
                    if (1 === t.length) return !0;
                    for (let i = 0; i < t.length; i++) if (t[i] !== e) return !0;
                  })(t) ||
                    (('spring' === i || tl(i)) && n))
              );
            })(t, s, r, a) &&
              ((f.W.instantAnimations || !o) && h?.(b.X(t, i, e)),
              (t[0] = t[t.length - 1]),
              (i.duration = 0),
              (i.repeat = 0));
          let u = {
              startTime: n
                ? this.resolvedAt && this.resolvedAt - this.createdAt > 40
                  ? this.resolvedAt
                  : this.createdAt
                : void 0,
              finalKeyframe: e,
              ...i,
              keyframes: t,
            },
            d =
              !l &&
              (function (t) {
                let {
                  motionValue: e,
                  name: i,
                  repeatDelay: n,
                  repeatType: s,
                  damping: r,
                  type: a,
                } = t;
                if (!tx(e?.owner?.current)) return !1;
                let { onUpdate: o, transformTemplate: l } = e.owner.getProps();
                return (
                  tw() &&
                  i &&
                  tT.has(i) &&
                  ('transform' !== i || !l) &&
                  !o &&
                  !n &&
                  'mirror' !== s &&
                  0 !== r &&
                  'inertia' !== a
                );
              })(u)
                ? new tf({ ...u, element: u.motionValue.owner.current })
                : new T.s(u);
          d.finished.then(() => this.notifyFinished()).catch(w.l),
            this.pendingTimeline &&
              ((this.stopTimeline = d.attachTimeline(this.pendingTimeline)),
              (this.pendingTimeline = void 0)),
            (this._animation = d);
        }
        get finished() {
          return this._animation ? this.animation.finished : this._finished;
        }
        then(t, e) {
          return this.finished.finally(t).then(() => {});
        }
        get animation() {
          return (
            this._animation || (this.keyframeResolver?.resume(), (q = !0), Y(), X(), (q = !1)),
            this._animation
          );
        }
        get duration() {
          return this.animation.duration;
        }
        get time() {
          return this.animation.time;
        }
        set time(t) {
          this.animation.time = t;
        }
        get speed() {
          return this.animation.speed;
        }
        get state() {
          return this.animation.state;
        }
        set speed(t) {
          this.animation.speed = t;
        }
        get startTime() {
          return this.animation.startTime;
        }
        attachTimeline(t) {
          return (
            this._animation
              ? (this.stopTimeline = this.animation.attachTimeline(t))
              : (this.pendingTimeline = t),
            () => this.stop()
          );
        }
        play() {
          this.animation.play();
        }
        pause() {
          this.animation.pause();
        }
        complete() {
          this.animation.complete();
        }
        cancel() {
          this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
        }
      }
      let tb = t => null !== t,
        tP = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
        tA = t => ({
          type: 'spring',
          stiffness: 550,
          damping: 0 === t ? 2 * Math.sqrt(550) : 30,
          restSpeed: 10,
        }),
        tV = { type: 'keyframes', duration: 0.8 },
        tM = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
        tk = (t, { keyframes: e }) =>
          e.length > 2 ? tV : d.has(t) ? (t.startsWith('scale') ? tA(e[1]) : tP) : tM,
        tE =
          (t, e, i, n = {}, s, r) =>
          o => {
            let l = a(n, t) || {},
              u = l.delay || n.delay || 0,
              { elapsed: d = 0 } = n;
            d -= (0, z.f)(u);
            let c = {
              keyframes: Array.isArray(i) ? i : [null, i],
              ease: 'easeOut',
              velocity: e.getVelocity(),
              ...l,
              delay: -d,
              onUpdate: t => {
                e.set(t), l.onUpdate && l.onUpdate(t);
              },
              onComplete: () => {
                o(), l.onComplete && l.onComplete();
              },
              name: t,
              motionValue: e,
              element: r ? void 0 : s,
            };
            !(function ({
              when: t,
              delay: e,
              delayChildren: i,
              staggerChildren: n,
              staggerDirection: s,
              repeat: r,
              repeatType: a,
              repeatDelay: o,
              from: l,
              elapsed: h,
              ...u
            }) {
              return !!Object.keys(u).length;
            })(l) && Object.assign(c, tk(t, c)),
              c.duration && (c.duration = (0, z.f)(c.duration)),
              c.repeatDelay && (c.repeatDelay = (0, z.f)(c.repeatDelay)),
              void 0 !== c.from && (c.keyframes[0] = c.from);
            let p = !1;
            if (
              ((!1 !== c.type && (0 !== c.duration || c.repeatDelay)) ||
                ((c.duration = 0), 0 !== c.delay || (p = !0)),
              (f.W.instantAnimations || f.W.skipAnimations) &&
                ((p = !0), (c.duration = 0), (c.delay = 0)),
              (c.allowFlatten = !l.type && !l.ease),
              p && !r && void 0 !== e.get())
            ) {
              let t = (function (t, { repeat: e, repeatType: i = 'loop' }, n) {
                let s = t.filter(tb),
                  r = e && 'loop' !== i && e % 2 == 1 ? 0 : s.length - 1;
                return s[r];
              })(c.keyframes, l);
              if (void 0 !== t) {
                h.Gt.update(() => {
                  c.onUpdate(t), c.onComplete();
                });
                return;
              }
            }
            return l.isSync ? new T.s(c) : new tS(c);
          };
      function tD(t, e, { delay: i = 0, transitionOverride: n, type: s } = {}) {
        let { transition: o = t.getDefaultTransition(), transitionEnd: l, ...u } = e;
        n && (o = n);
        let d = [],
          f = s && t.animationState && t.animationState.getState()[s];
        for (let e in u) {
          let n = t.getValue(e, t.latestValues[e] ?? null),
            s = u[e];
          if (
            void 0 === s ||
            (f &&
              (function ({ protectedKeys: t, needsAnimating: e }, i) {
                let n = t.hasOwnProperty(i) && !0 !== e[i];
                return (e[i] = !1), n;
              })(f, e))
          )
            continue;
          let r = { delay: i, ...a(o || {}, e) },
            l = n.get();
          if (void 0 !== l && !n.isAnimating && !Array.isArray(s) && s === l && !r.velocity)
            continue;
          let p = !1;
          if (window.MotionHandoffAnimation) {
            let i = t.props[x];
            if (i) {
              let t = window.MotionHandoffAnimation(i, e, h.Gt);
              null !== t && ((r.startTime = t), (p = !0));
            }
          }
          y(t, e), n.start(tE(e, n, s, t.shouldReduceMotion && c.has(e) ? { type: !1 } : r, t, p));
          let m = n.animation;
          m && d.push(m);
        }
        return (
          l &&
            Promise.all(d).then(() => {
              h.Gt.update(() => {
                l &&
                  (function (t, e) {
                    let { transitionEnd: i = {}, transition: n = {}, ...s } = r(t, e) || {};
                    for (let e in (s = { ...s, ...i })) {
                      var a;
                      let i = m((a = s[e])) ? a[a.length - 1] || 0 : a;
                      t.hasValue(e) ? t.getValue(e).set(i) : t.addValue(e, (0, p.OQ)(i));
                    }
                  })(t, l);
              });
            }),
          d
        );
      }
      function tC(t, e, i = {}) {
        let n = r(t, e, 'exit' === i.type ? t.presenceContext?.custom : void 0),
          { transition: s = t.getDefaultTransition() || {} } = n || {};
        i.transitionOverride && (s = i.transitionOverride);
        let a = n ? () => Promise.all(tD(t, n, i)) : () => Promise.resolve(),
          o =
            t.variantChildren && t.variantChildren.size
              ? (n = 0) => {
                  let { delayChildren: r = 0, staggerChildren: a, staggerDirection: o } = s;
                  return (function (t, e, i = 0, n = 0, s = 1, r) {
                    let a = [],
                      o = (t.variantChildren.size - 1) * n,
                      l = 1 === s ? (t = 0) => t * n : (t = 0) => o - t * n;
                    return (
                      Array.from(t.variantChildren)
                        .sort(tR)
                        .forEach((t, n) => {
                          t.notify('AnimationStart', e),
                            a.push(
                              tC(t, e, { ...r, delay: i + l(n) }).then(() =>
                                t.notify('AnimationComplete', e)
                              )
                            );
                        }),
                      Promise.all(a)
                    );
                  })(t, e, r + n, a, o, i);
                }
              : () => Promise.resolve(),
          { when: l } = s;
        if (!l) return Promise.all([a(), o(i.delay)]);
        {
          let [t, e] = 'beforeChildren' === l ? [a, o] : [o, a];
          return t().then(() => e());
        }
      }
      function tR(t, e) {
        return t.sortNodePosition(e);
      }
      function tj(t, e) {
        if (!Array.isArray(e)) return !1;
        let i = e.length;
        if (i !== t.length) return !1;
        for (let n = 0; n < i; n++) if (e[n] !== t[n]) return !1;
        return !0;
      }
      function tL(t) {
        return 'string' == typeof t || Array.isArray(t);
      }
      let tF = [
          'animate',
          'whileInView',
          'whileFocus',
          'whileHover',
          'whileTap',
          'whileDrag',
          'exit',
        ],
        tB = ['initial', ...tF],
        tO = tB.length,
        tI = [...tF].reverse(),
        tU = tF.length;
      function tW(t = !1) {
        return { isActive: t, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
      }
      function tN() {
        return {
          animate: tW(!0),
          whileInView: tW(),
          whileHover: tW(),
          whileTap: tW(),
          whileDrag: tW(),
          whileFocus: tW(),
          exit: tW(),
        };
      }
      class t$ {
        constructor(t) {
          (this.isMounted = !1), (this.node = t);
        }
        update() {}
      }
      class tG extends t$ {
        constructor(t) {
          super(t),
            t.animationState ||
              (t.animationState = (function (t) {
                let e = e =>
                    Promise.all(
                      e.map(({ animation: e, options: i }) =>
                        (function (t, e, i = {}) {
                          let n;
                          if ((t.notify('AnimationStart', e), Array.isArray(e)))
                            n = Promise.all(e.map(e => tC(t, e, i)));
                          else if ('string' == typeof e) n = tC(t, e, i);
                          else {
                            let s = 'function' == typeof e ? r(t, e, i.custom) : e;
                            n = Promise.all(tD(t, s, i));
                          }
                          return n.then(() => {
                            t.notify('AnimationComplete', e);
                          });
                        })(t, e, i)
                      )
                    ),
                  i = tN(),
                  s = !0,
                  a = e => (i, n) => {
                    let s = r(t, n, 'exit' === e ? t.presenceContext?.custom : void 0);
                    if (s) {
                      let { transition: t, transitionEnd: e, ...n } = s;
                      i = { ...i, ...n, ...e };
                    }
                    return i;
                  };
                function o(o) {
                  let { props: l } = t,
                    h =
                      (function t(e) {
                        if (!e) return;
                        if (!e.isControllingVariants) {
                          let i = (e.parent && t(e.parent)) || {};
                          return void 0 !== e.props.initial && (i.initial = e.props.initial), i;
                        }
                        let i = {};
                        for (let t = 0; t < tO; t++) {
                          let n = tB[t],
                            s = e.props[n];
                          (tL(s) || !1 === s) && (i[n] = s);
                        }
                        return i;
                      })(t.parent) || {},
                    u = [],
                    d = new Set(),
                    c = {},
                    p = 1 / 0;
                  for (let e = 0; e < tU; e++) {
                    var f;
                    let r = tI[e],
                      v = i[r],
                      y = void 0 !== l[r] ? l[r] : h[r],
                      g = tL(y),
                      x = r === o ? v.isActive : null;
                    !1 === x && (p = e);
                    let T = y === h[r] && y !== l[r] && g;
                    if (
                      (T && s && t.manuallyAnimateOnMount && (T = !1),
                      (v.protectedKeys = { ...c }),
                      (!v.isActive && null === x) ||
                        (!y && !v.prevProp) ||
                        n(y) ||
                        'boolean' == typeof y)
                    )
                      continue;
                    let w =
                        ((f = v.prevProp),
                        'string' == typeof y ? y !== f : !!Array.isArray(y) && !tj(y, f)),
                      S = w || (r === o && v.isActive && !T && g) || (e > p && g),
                      b = !1,
                      P = Array.isArray(y) ? y : [y],
                      A = P.reduce(a(r), {});
                    !1 === x && (A = {});
                    let { prevResolvedValues: V = {} } = v,
                      M = { ...V, ...A },
                      k = e => {
                        (S = !0), d.has(e) && ((b = !0), d.delete(e)), (v.needsAnimating[e] = !0);
                        let i = t.getValue(e);
                        i && (i.liveStyle = !1);
                      };
                    for (let t in M) {
                      let e = A[t],
                        i = V[t];
                      if (!c.hasOwnProperty(t))
                        (m(e) && m(i) ? tj(e, i) : e === i)
                          ? void 0 !== e && d.has(t)
                            ? k(t)
                            : (v.protectedKeys[t] = !0)
                          : null != e
                            ? k(t)
                            : d.add(t);
                    }
                    (v.prevProp = y),
                      (v.prevResolvedValues = A),
                      v.isActive && (c = { ...c, ...A }),
                      s && t.blockInitialAnimation && (S = !1);
                    let E = !(T && w) || b;
                    S && E && u.push(...P.map(t => ({ animation: t, options: { type: r } })));
                  }
                  if (d.size) {
                    let e = {};
                    if ('boolean' != typeof l.initial) {
                      let i = r(t, Array.isArray(l.initial) ? l.initial[0] : l.initial);
                      i && i.transition && (e.transition = i.transition);
                    }
                    d.forEach(i => {
                      let n = t.getBaseTarget(i),
                        s = t.getValue(i);
                      s && (s.liveStyle = !0), (e[i] = n ?? null);
                    }),
                      u.push({ animation: e });
                  }
                  let v = !!u.length;
                  return (
                    s &&
                      (!1 === l.initial || l.initial === l.animate) &&
                      !t.manuallyAnimateOnMount &&
                      (v = !1),
                    (s = !1),
                    v ? e(u) : Promise.resolve()
                  );
                }
                return {
                  animateChanges: o,
                  setActive: function (e, n) {
                    if (i[e].isActive === n) return Promise.resolve();
                    t.variantChildren?.forEach(t => t.animationState?.setActive(e, n)),
                      (i[e].isActive = n);
                    let s = o(e);
                    for (let t in i) i[t].protectedKeys = {};
                    return s;
                  },
                  setAnimateFunction: function (i) {
                    e = i(t);
                  },
                  getState: () => i,
                  reset: () => {
                    (i = tN()), (s = !0);
                  },
                };
              })(t));
        }
        updateAnimationControlsSubscription() {
          let { animate: t } = this.node.getProps();
          n(t) && (this.unmountControls = t.subscribe(this.node));
        }
        mount() {
          this.updateAnimationControlsSubscription();
        }
        update() {
          let { animate: t } = this.node.getProps(),
            { animate: e } = this.node.prevProps || {};
          t !== e && this.updateAnimationControlsSubscription();
        }
        unmount() {
          this.node.animationState.reset(), this.unmountControls?.();
        }
      }
      let tq = 0;
      class tX extends t$ {
        constructor() {
          super(...arguments), (this.id = tq++);
        }
        update() {
          if (!this.node.presenceContext) return;
          let { isPresent: t, onExitComplete: e } = this.node.presenceContext,
            { isPresent: i } = this.node.prevPresenceContext || {};
          if (!this.node.animationState || t === i) return;
          let n = this.node.animationState.setActive('exit', !t);
          e &&
            !t &&
            n.then(() => {
              e(this.id);
            });
        }
        mount() {
          let { register: t, onExitComplete: e } = this.node.presenceContext || {};
          e && e(this.id), t && (this.unmount = t(this.id));
        }
        unmount() {}
      }
      let tY = { x: !1, y: !1 };
      var tK = i(1607);
      function tz(t, e, i, n = { passive: !0 }) {
        return t.addEventListener(e, i, n), () => t.removeEventListener(e, i);
      }
      let tH = t =>
        'mouse' === t.pointerType
          ? 'number' != typeof t.button || t.button <= 0
          : !1 !== t.isPrimary;
      function tQ(t) {
        return { point: { x: t.pageX, y: t.pageY } };
      }
      let tZ = t => e => tH(e) && t(e, tQ(e));
      function t_(t, e, i, n) {
        return tz(t, e, tZ(i), n);
      }
      function tJ({ top: t, left: e, right: i, bottom: n }) {
        return { x: { min: e, max: i }, y: { min: t, max: n } };
      }
      function t0(t) {
        return t.max - t.min;
      }
      function t1(t, e, i, n = 0.5) {
        (t.origin = n),
          (t.originPoint = (0, tK.k)(e.min, e.max, t.origin)),
          (t.scale = t0(i) / t0(e)),
          (t.translate = (0, tK.k)(i.min, i.max, t.origin) - t.originPoint),
          ((t.scale >= 0.9999 && t.scale <= 1.0001) || isNaN(t.scale)) && (t.scale = 1),
          ((t.translate >= -0.01 && t.translate <= 0.01) || isNaN(t.translate)) &&
            (t.translate = 0);
      }
      function t5(t, e, i, n) {
        t1(t.x, e.x, i.x, n ? n.originX : void 0), t1(t.y, e.y, i.y, n ? n.originY : void 0);
      }
      function t2(t, e, i) {
        (t.min = i.min + e.min), (t.max = t.min + t0(e));
      }
      function t4(t, e, i) {
        (t.min = e.min - i.min), (t.max = t.min + t0(e));
      }
      function t3(t, e, i) {
        t4(t.x, e.x, i.x), t4(t.y, e.y, i.y);
      }
      let t6 = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
        t9 = () => ({ x: t6(), y: t6() }),
        t8 = () => ({ min: 0, max: 0 }),
        t7 = () => ({ x: t8(), y: t8() });
      function et(t) {
        return [t('x'), t('y')];
      }
      function ee(t) {
        return void 0 === t || 1 === t;
      }
      function ei({ scale: t, scaleX: e, scaleY: i }) {
        return !ee(t) || !ee(e) || !ee(i);
      }
      function en(t) {
        return ei(t) || es(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
      }
      function es(t) {
        var e, i;
        return ((e = t.x) && '0%' !== e) || ((i = t.y) && '0%' !== i);
      }
      function er(t, e, i, n, s) {
        return void 0 !== s && (t = n + s * (t - n)), n + i * (t - n) + e;
      }
      function ea(t, e = 0, i = 1, n, s) {
        (t.min = er(t.min, e, i, n, s)), (t.max = er(t.max, e, i, n, s));
      }
      function eo(t, { x: e, y: i }) {
        ea(t.x, e.translate, e.scale, e.originPoint), ea(t.y, i.translate, i.scale, i.originPoint);
      }
      function el(t, e) {
        (t.min = t.min + e), (t.max = t.max + e);
      }
      function eh(t, e, i, n, s = 0.5) {
        let r = (0, tK.k)(t.min, t.max, s);
        ea(t, e, i, r, n);
      }
      function eu(t, e) {
        eh(t.x, e.x, e.scaleX, e.scale, e.originX), eh(t.y, e.y, e.scaleY, e.scale, e.originY);
      }
      function ed(t, e) {
        return tJ(
          (function (t, e) {
            if (!e) return t;
            let i = e({ x: t.left, y: t.top }),
              n = e({ x: t.right, y: t.bottom });
            return { top: i.y, left: i.x, bottom: n.y, right: n.x };
          })(t.getBoundingClientRect(), e)
        );
      }
      let ec = ({ current: t }) => (t ? t.ownerDocument.defaultView : null);
      function ep(t) {
        return t && 'object' == typeof t && Object.prototype.hasOwnProperty.call(t, 'current');
      }
      var em = i(1046);
      let ef = (t, e) => Math.abs(t - e);
      class ev {
        constructor(
          t,
          e,
          { transformPagePoint: i, contextWindow: n, dragSnapToOrigin: s = !1 } = {}
        ) {
          if (
            ((this.startEvent = null),
            (this.lastMoveEvent = null),
            (this.lastMoveEventInfo = null),
            (this.handlers = {}),
            (this.contextWindow = window),
            (this.updatePoint = () => {
              if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
              let t = ex(this.lastMoveEventInfo, this.history),
                e = null !== this.startEvent,
                i =
                  (function (t, e) {
                    return Math.sqrt(ef(t.x, e.x) ** 2 + ef(t.y, e.y) ** 2);
                  })(t.offset, { x: 0, y: 0 }) >= 3;
              if (!e && !i) return;
              let { point: n } = t,
                { timestamp: s } = h.uv;
              this.history.push({ ...n, timestamp: s });
              let { onStart: r, onMove: a } = this.handlers;
              e || (r && r(this.lastMoveEvent, t), (this.startEvent = this.lastMoveEvent)),
                a && a(this.lastMoveEvent, t);
            }),
            (this.handlePointerMove = (t, e) => {
              (this.lastMoveEvent = t),
                (this.lastMoveEventInfo = ey(e, this.transformPagePoint)),
                h.Gt.update(this.updatePoint, !0);
            }),
            (this.handlePointerUp = (t, e) => {
              this.end();
              let { onEnd: i, onSessionEnd: n, resumeAnimation: s } = this.handlers;
              if (
                (this.dragSnapToOrigin && s && s(), !(this.lastMoveEvent && this.lastMoveEventInfo))
              )
                return;
              let r = ex(
                'pointercancel' === t.type
                  ? this.lastMoveEventInfo
                  : ey(e, this.transformPagePoint),
                this.history
              );
              this.startEvent && i && i(t, r), n && n(t, r);
            }),
            !tH(t))
          )
            return;
          (this.dragSnapToOrigin = s),
            (this.handlers = e),
            (this.transformPagePoint = i),
            (this.contextWindow = n || window);
          let r = ey(tQ(t), this.transformPagePoint),
            { point: a } = r,
            { timestamp: o } = h.uv;
          this.history = [{ ...a, timestamp: o }];
          let { onSessionStart: l } = e;
          l && l(t, ex(r, this.history)),
            (this.removeListeners = (0, em.F)(
              t_(this.contextWindow, 'pointermove', this.handlePointerMove),
              t_(this.contextWindow, 'pointerup', this.handlePointerUp),
              t_(this.contextWindow, 'pointercancel', this.handlePointerUp)
            ));
        }
        updateHandlers(t) {
          this.handlers = t;
        }
        end() {
          this.removeListeners && this.removeListeners(), (0, h.WG)(this.updatePoint);
        }
      }
      function ey(t, e) {
        return e ? { point: e(t.point) } : t;
      }
      function eg(t, e) {
        return { x: t.x - e.x, y: t.y - e.y };
      }
      function ex({ point: t }, e) {
        return {
          point: t,
          delta: eg(t, eT(e)),
          offset: eg(t, e[0]),
          velocity: (function (t, e) {
            if (t.length < 2) return { x: 0, y: 0 };
            let i = t.length - 1,
              n = null,
              s = eT(t);
            for (; i >= 0 && ((n = t[i]), !(s.timestamp - n.timestamp > (0, z.f)(0.1))); ) i--;
            if (!n) return { x: 0, y: 0 };
            let r = (0, z.X)(s.timestamp - n.timestamp);
            if (0 === r) return { x: 0, y: 0 };
            let a = { x: (s.x - n.x) / r, y: (s.y - n.y) / r };
            return a.x === 1 / 0 && (a.x = 0), a.y === 1 / 0 && (a.y = 0), a;
          })(e, 0),
        };
      }
      function eT(t) {
        return t[t.length - 1];
      }
      var ew = i(9615),
        eS = i(5821);
      function eb(t, e, i) {
        return {
          min: void 0 !== e ? t.min + e : void 0,
          max: void 0 !== i ? t.max + i - (t.max - t.min) : void 0,
        };
      }
      function eP(t, e) {
        let i = e.min - t.min,
          n = e.max - t.max;
        return e.max - e.min < t.max - t.min && ([i, n] = [n, i]), { min: i, max: n };
      }
      function eA(t, e, i) {
        return { min: eV(t, e), max: eV(t, i) };
      }
      function eV(t, e) {
        return 'number' == typeof t ? t : t[e] || 0;
      }
      let eM = new WeakMap();
      class ek {
        constructor(t) {
          (this.openDragLock = null),
            (this.isDragging = !1),
            (this.currentDirection = null),
            (this.originPoint = { x: 0, y: 0 }),
            (this.constraints = !1),
            (this.hasMutatedConstraints = !1),
            (this.elastic = t7()),
            (this.visualElement = t);
        }
        start(t, { snapToCursor: e = !1 } = {}) {
          let { presenceContext: i } = this.visualElement;
          if (i && !1 === i.isPresent) return;
          let { dragSnapToOrigin: n } = this.getProps();
          this.panSession = new ev(
            t,
            {
              onSessionStart: t => {
                let { dragSnapToOrigin: i } = this.getProps();
                i ? this.pauseAnimation() : this.stopAnimation(),
                  e && this.snapToCursor(tQ(t).point);
              },
              onStart: (t, e) => {
                let { drag: i, dragPropagation: n, onDragStart: s } = this.getProps();
                if (
                  i &&
                  !n &&
                  (this.openDragLock && this.openDragLock(),
                  (this.openDragLock =
                    'x' === i || 'y' === i
                      ? tY[i]
                        ? null
                        : ((tY[i] = !0),
                          () => {
                            tY[i] = !1;
                          })
                      : tY.x || tY.y
                        ? null
                        : ((tY.x = tY.y = !0),
                          () => {
                            tY.x = tY.y = !1;
                          })),
                  !this.openDragLock)
                )
                  return;
                (this.isDragging = !0),
                  (this.currentDirection = null),
                  this.resolveConstraints(),
                  this.visualElement.projection &&
                    ((this.visualElement.projection.isAnimationBlocked = !0),
                    (this.visualElement.projection.target = void 0)),
                  et(t => {
                    let e = this.getAxisMotionValue(t).get() || 0;
                    if (B.KN.test(e)) {
                      let { projection: i } = this.visualElement;
                      if (i && i.layout) {
                        let n = i.layout.layoutBox[t];
                        n && (e = t0(n) * (parseFloat(e) / 100));
                      }
                    }
                    this.originPoint[t] = e;
                  }),
                  s && h.Gt.postRender(() => s(t, e)),
                  y(this.visualElement, 'transform');
                let { animationState: r } = this.visualElement;
                r && r.setActive('whileDrag', !0);
              },
              onMove: (t, e) => {
                let {
                  dragPropagation: i,
                  dragDirectionLock: n,
                  onDirectionLock: s,
                  onDrag: r,
                } = this.getProps();
                if (!i && !this.openDragLock) return;
                let { offset: a } = e;
                if (n && null === this.currentDirection) {
                  (this.currentDirection = (function (t, e = 10) {
                    let i = null;
                    return Math.abs(t.y) > e ? (i = 'y') : Math.abs(t.x) > e && (i = 'x'), i;
                  })(a)),
                    null !== this.currentDirection && s && s(this.currentDirection);
                  return;
                }
                this.updateAxis('x', e.point, a),
                  this.updateAxis('y', e.point, a),
                  this.visualElement.render(),
                  r && r(t, e);
              },
              onSessionEnd: (t, e) => this.stop(t, e),
              resumeAnimation: () =>
                et(
                  t =>
                    'paused' === this.getAnimationState(t) &&
                    this.getAxisMotionValue(t).animation?.play()
                ),
            },
            {
              transformPagePoint: this.visualElement.getTransformPagePoint(),
              dragSnapToOrigin: n,
              contextWindow: ec(this.visualElement),
            }
          );
        }
        stop(t, e) {
          let i = this.isDragging;
          if ((this.cancel(), !i)) return;
          let { velocity: n } = e;
          this.startAnimation(n);
          let { onDragEnd: s } = this.getProps();
          s && h.Gt.postRender(() => s(t, e));
        }
        cancel() {
          this.isDragging = !1;
          let { projection: t, animationState: e } = this.visualElement;
          t && (t.isAnimationBlocked = !1),
            this.panSession && this.panSession.end(),
            (this.panSession = void 0);
          let { dragPropagation: i } = this.getProps();
          !i && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
            e && e.setActive('whileDrag', !1);
        }
        updateAxis(t, e, i) {
          let { drag: n } = this.getProps();
          if (!i || !eE(t, n, this.currentDirection)) return;
          let s = this.getAxisMotionValue(t),
            r = this.originPoint[t] + i[t];
          this.constraints &&
            this.constraints[t] &&
            (r = (function (t, { min: e, max: i }, n) {
              return (
                void 0 !== e && t < e
                  ? (t = n ? (0, tK.k)(e, t, n.min) : Math.max(t, e))
                  : void 0 !== i && t > i && (t = n ? (0, tK.k)(i, t, n.max) : Math.min(t, i)),
                t
              );
            })(r, this.constraints[t], this.elastic[t])),
            s.set(r);
        }
        resolveConstraints() {
          let { dragConstraints: t, dragElastic: e } = this.getProps(),
            i =
              this.visualElement.projection && !this.visualElement.projection.layout
                ? this.visualElement.projection.measure(!1)
                : this.visualElement.projection?.layout,
            n = this.constraints;
          t && ep(t)
            ? this.constraints || (this.constraints = this.resolveRefConstraints())
            : t && i
              ? (this.constraints = (function (t, { top: e, left: i, bottom: n, right: s }) {
                  return { x: eb(t.x, i, s), y: eb(t.y, e, n) };
                })(i.layoutBox, t))
              : (this.constraints = !1),
            (this.elastic = (function (t = 0.35) {
              return (
                !1 === t ? (t = 0) : !0 === t && (t = 0.35),
                { x: eA(t, 'left', 'right'), y: eA(t, 'top', 'bottom') }
              );
            })(e)),
            n !== this.constraints &&
              i &&
              this.constraints &&
              !this.hasMutatedConstraints &&
              et(t => {
                !1 !== this.constraints &&
                  this.getAxisMotionValue(t) &&
                  (this.constraints[t] = (function (t, e) {
                    let i = {};
                    return (
                      void 0 !== e.min && (i.min = e.min - t.min),
                      void 0 !== e.max && (i.max = e.max - t.min),
                      i
                    );
                  })(i.layoutBox[t], this.constraints[t]));
              });
        }
        resolveRefConstraints() {
          var t;
          let { dragConstraints: e, onMeasureDragConstraints: i } = this.getProps();
          if (!e || !ep(e)) return !1;
          let n = e.current;
          (0, H.V)(
            null !== n,
            "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
          );
          let { projection: s } = this.visualElement;
          if (!s || !s.layout) return !1;
          let r = (function (t, e, i) {
              let n = ed(t, i),
                { scroll: s } = e;
              return s && (el(n.x, s.offset.x), el(n.y, s.offset.y)), n;
            })(n, s.root, this.visualElement.getTransformPagePoint()),
            a = { x: eP((t = s.layout.layoutBox).x, r.x), y: eP(t.y, r.y) };
          if (i) {
            let t = i(
              (function ({ x: t, y: e }) {
                return { top: e.min, right: t.max, bottom: e.max, left: t.min };
              })(a)
            );
            (this.hasMutatedConstraints = !!t), t && (a = tJ(t));
          }
          return a;
        }
        startAnimation(t) {
          let {
              drag: e,
              dragMomentum: i,
              dragElastic: n,
              dragTransition: s,
              dragSnapToOrigin: r,
              onDragTransitionEnd: a,
            } = this.getProps(),
            o = this.constraints || {};
          return Promise.all(
            et(a => {
              if (!eE(a, e, this.currentDirection)) return;
              let l = (o && o[a]) || {};
              r && (l = { min: 0, max: 0 });
              let h = {
                type: 'inertia',
                velocity: i ? t[a] : 0,
                bounceStiffness: n ? 200 : 1e6,
                bounceDamping: n ? 40 : 1e7,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...s,
                ...l,
              };
              return this.startAxisValueAnimation(a, h);
            })
          ).then(a);
        }
        startAxisValueAnimation(t, e) {
          let i = this.getAxisMotionValue(t);
          return y(this.visualElement, t), i.start(tE(t, i, 0, e, this.visualElement, !1));
        }
        stopAnimation() {
          et(t => this.getAxisMotionValue(t).stop());
        }
        pauseAnimation() {
          et(t => this.getAxisMotionValue(t).animation?.pause());
        }
        getAnimationState(t) {
          return this.getAxisMotionValue(t).animation?.state;
        }
        getAxisMotionValue(t) {
          let e = `_drag${t.toUpperCase()}`,
            i = this.visualElement.getProps();
          return i[e] || this.visualElement.getValue(t, (i.initial ? i.initial[t] : void 0) || 0);
        }
        snapToCursor(t) {
          et(e => {
            let { drag: i } = this.getProps();
            if (!eE(e, i, this.currentDirection)) return;
            let { projection: n } = this.visualElement,
              s = this.getAxisMotionValue(e);
            if (n && n.layout) {
              let { min: i, max: r } = n.layout.layoutBox[e];
              s.set(t[e] - (0, tK.k)(i, r, 0.5));
            }
          });
        }
        scalePositionWithinConstraints() {
          if (!this.visualElement.current) return;
          let { drag: t, dragConstraints: e } = this.getProps(),
            { projection: i } = this.visualElement;
          if (!ep(e) || !i || !this.constraints) return;
          this.stopAnimation();
          let n = { x: 0, y: 0 };
          et(t => {
            let e = this.getAxisMotionValue(t);
            if (e && !1 !== this.constraints) {
              let i = e.get();
              n[t] = (function (t, e) {
                let i = 0.5,
                  n = t0(t),
                  s = t0(e);
                return (
                  s > n
                    ? (i = (0, ew.q)(e.min, e.max - n, t.min))
                    : n > s && (i = (0, ew.q)(t.min, t.max - s, e.min)),
                  (0, eS.q)(0, 1, i)
                );
              })({ min: i, max: i }, this.constraints[t]);
            }
          });
          let { transformTemplate: s } = this.visualElement.getProps();
          (this.visualElement.current.style.transform = s ? s({}, '') : 'none'),
            i.root && i.root.updateScroll(),
            i.updateLayout(),
            this.resolveConstraints(),
            et(e => {
              if (!eE(e, t, null)) return;
              let i = this.getAxisMotionValue(e),
                { min: s, max: r } = this.constraints[e];
              i.set((0, tK.k)(s, r, n[e]));
            });
        }
        addListeners() {
          if (!this.visualElement.current) return;
          eM.set(this.visualElement, this);
          let t = t_(this.visualElement.current, 'pointerdown', t => {
              let { drag: e, dragListener: i = !0 } = this.getProps();
              e && i && this.start(t);
            }),
            e = () => {
              let { dragConstraints: t } = this.getProps();
              ep(t) && t.current && (this.constraints = this.resolveRefConstraints());
            },
            { projection: i } = this.visualElement,
            n = i.addEventListener('measure', e);
          i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), h.Gt.read(e);
          let s = tz(window, 'resize', () => this.scalePositionWithinConstraints()),
            r = i.addEventListener('didUpdate', ({ delta: t, hasLayoutChanged: e }) => {
              this.isDragging &&
                e &&
                (et(e => {
                  let i = this.getAxisMotionValue(e);
                  i && ((this.originPoint[e] += t[e].translate), i.set(i.get() + t[e].translate));
                }),
                this.visualElement.render());
            });
          return () => {
            s(), t(), n(), r && r();
          };
        }
        getProps() {
          let t = this.visualElement.getProps(),
            {
              drag: e = !1,
              dragDirectionLock: i = !1,
              dragPropagation: n = !1,
              dragConstraints: s = !1,
              dragElastic: r = 0.35,
              dragMomentum: a = !0,
            } = t;
          return {
            ...t,
            drag: e,
            dragDirectionLock: i,
            dragPropagation: n,
            dragConstraints: s,
            dragElastic: r,
            dragMomentum: a,
          };
        }
      }
      function eE(t, e, i) {
        return (!0 === e || e === t) && (null === i || i === t);
      }
      class eD extends t$ {
        constructor(t) {
          super(t),
            (this.removeGroupControls = w.l),
            (this.removeListeners = w.l),
            (this.controls = new ek(t));
        }
        mount() {
          let { dragControls: t } = this.node.getProps();
          t && (this.removeGroupControls = t.subscribe(this.controls)),
            (this.removeListeners = this.controls.addListeners() || w.l);
        }
        unmount() {
          this.removeGroupControls(), this.removeListeners();
        }
      }
      let eC = t => (e, i) => {
        t && h.Gt.postRender(() => t(e, i));
      };
      class eR extends t$ {
        constructor() {
          super(...arguments), (this.removePointerDownListener = w.l);
        }
        onPointerDown(t) {
          this.session = new ev(t, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: ec(this.node),
          });
        }
        createPanHandlers() {
          let { onPanSessionStart: t, onPanStart: e, onPan: i, onPanEnd: n } = this.node.getProps();
          return {
            onSessionStart: eC(t),
            onStart: eC(e),
            onMove: i,
            onEnd: (t, e) => {
              delete this.session, n && h.Gt.postRender(() => n(t, e));
            },
          };
        }
        mount() {
          this.removePointerDownListener = t_(this.node.current, 'pointerdown', t =>
            this.onPointerDown(t)
          );
        }
        update() {
          this.session && this.session.updateHandlers(this.createPanHandlers());
        }
        unmount() {
          this.removePointerDownListener(), this.session && this.session.end();
        }
      }
      var ej = i(5155);
      let { schedule: eL } = (0, i(506).I)(queueMicrotask, !1);
      var eF = i(2115);
      let eB = (0, eF.createContext)(null),
        eO = (0, eF.createContext)({}),
        eI = (0, eF.createContext)({}),
        eU = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
      function eW(t, e) {
        return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
      }
      let eN = {
        correct: (t, e) => {
          if (!e.target) return t;
          if ('string' == typeof t) {
            if (!B.px.test(t)) return t;
            t = parseFloat(t);
          }
          let i = eW(t, e.target.x),
            n = eW(t, e.target.y);
          return `${i}% ${n}%`;
        },
      };
      var e$ = i(7309);
      let eG = {};
      class eq extends eF.Component {
        componentDidMount() {
          let { visualElement: t, layoutGroup: e, switchLayoutGroup: i, layoutId: n } = this.props,
            { projection: s } = t;
          !(function (t) {
            for (let e in t) (eG[e] = t[e]), (0, e$.j)(e) && (eG[e].isCSSVariable = !0);
          })(eY),
            s &&
              (e.group && e.group.add(s),
              i && i.register && n && i.register(s),
              s.root.didUpdate(),
              s.addEventListener('animationComplete', () => {
                this.safeToRemove();
              }),
              s.setOptions({ ...s.options, onExitComplete: () => this.safeToRemove() })),
            (eU.hasEverUpdated = !0);
        }
        getSnapshotBeforeUpdate(t) {
          let { layoutDependency: e, visualElement: i, drag: n, isPresent: s } = this.props,
            { projection: r } = i;
          return (
            r &&
              ((r.isPresent = s),
              n || t.layoutDependency !== e || void 0 === e || t.isPresent !== s
                ? r.willUpdate()
                : this.safeToRemove(),
              t.isPresent === s ||
                (s
                  ? r.promote()
                  : r.relegate() ||
                    h.Gt.postRender(() => {
                      let t = r.getStack();
                      (t && t.members.length) || this.safeToRemove();
                    }))),
            null
          );
        }
        componentDidUpdate() {
          let { projection: t } = this.props.visualElement;
          t &&
            (t.root.didUpdate(),
            eL.postRender(() => {
              !t.currentAnimation && t.isLead() && this.safeToRemove();
            }));
        }
        componentWillUnmount() {
          let { visualElement: t, layoutGroup: e, switchLayoutGroup: i } = this.props,
            { projection: n } = t;
          n &&
            (n.scheduleCheckAfterUnmount(),
            e && e.group && e.group.remove(n),
            i && i.deregister && i.deregister(n));
        }
        safeToRemove() {
          let { safeToRemove: t } = this.props;
          t && t();
        }
        render() {
          return null;
        }
      }
      function eX(t) {
        let [e, i] = (function (t = !0) {
            let e = (0, eF.useContext)(eB);
            if (null === e) return [!0, null];
            let { isPresent: i, onExitComplete: n, register: s } = e,
              r = (0, eF.useId)();
            (0, eF.useEffect)(() => {
              if (t) return s(r);
            }, [t]);
            let a = (0, eF.useCallback)(() => t && n && n(r), [r, n, t]);
            return !i && n ? [!1, a] : [!0];
          })(),
          n = (0, eF.useContext)(eO);
        return (0, ej.jsx)(eq, {
          ...t,
          layoutGroup: n,
          switchLayoutGroup: (0, eF.useContext)(eI),
          isPresent: e,
          safeToRemove: i,
        });
      }
      let eY = {
        borderRadius: {
          ...eN,
          applyTo: [
            'borderTopLeftRadius',
            'borderTopRightRadius',
            'borderBottomLeftRadius',
            'borderBottomRightRadius',
          ],
        },
        borderTopLeftRadius: eN,
        borderTopRightRadius: eN,
        borderBottomLeftRadius: eN,
        borderBottomRightRadius: eN,
        boxShadow: {
          correct: (t, { treeScale: e, projectionDelta: i }) => {
            let n = tv.f.parse(t);
            if (n.length > 5) return t;
            let s = tv.f.createTransformer(t),
              r = 'number' != typeof n[0] ? 1 : 0,
              a = i.x.scale * e.x,
              o = i.y.scale * e.y;
            (n[0 + r] /= a), (n[1 + r] /= o);
            let l = (0, tK.k)(a, o, 0.5);
            return (
              'number' == typeof n[2 + r] && (n[2 + r] /= l),
              'number' == typeof n[3 + r] && (n[3 + r] /= l),
              s(n)
            );
          },
        },
      };
      function eK(t) {
        return tg(t) && 'ownerSVGElement' in t;
      }
      var ez = i(2539),
        eH = i(1555);
      let eQ = (t, e) => t.depth - e.depth;
      class eZ {
        constructor() {
          (this.children = []), (this.isDirty = !1);
        }
        add(t) {
          (0, eH.Kq)(this.children, t), (this.isDirty = !0);
        }
        remove(t) {
          (0, eH.Ai)(this.children, t), (this.isDirty = !0);
        }
        forEach(t) {
          this.isDirty && this.children.sort(eQ), (this.isDirty = !1), this.children.forEach(t);
        }
      }
      function e_(t) {
        return (0, v.S)(t) ? t.get() : t;
      }
      let eJ = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
        e0 = eJ.length,
        e1 = t => ('string' == typeof t ? parseFloat(t) : t),
        e5 = t => 'number' == typeof t || B.px.test(t);
      function e2(t, e) {
        return void 0 !== t[e] ? t[e] : t.borderRadius;
      }
      let e4 = e6(0, 0.5, tp.yT),
        e3 = e6(0.5, 0.95, w.l);
      function e6(t, e, i) {
        return n => (n < t ? 0 : n > e ? 1 : i((0, ew.q)(t, e, n)));
      }
      function e9(t, e) {
        (t.min = e.min), (t.max = e.max);
      }
      function e8(t, e) {
        e9(t.x, e.x), e9(t.y, e.y);
      }
      function e7(t, e) {
        (t.translate = e.translate),
          (t.scale = e.scale),
          (t.originPoint = e.originPoint),
          (t.origin = e.origin);
      }
      function it(t, e, i, n, s) {
        return (
          (t -= e), (t = n + (1 / i) * (t - n)), void 0 !== s && (t = n + (1 / s) * (t - n)), t
        );
      }
      function ie(t, e, [i, n, s], r, a) {
        !(function (t, e = 0, i = 1, n = 0.5, s, r = t, a = t) {
          if (
            (B.KN.test(e) && ((e = parseFloat(e)), (e = (0, tK.k)(a.min, a.max, e / 100) - a.min)),
            'number' != typeof e)
          )
            return;
          let o = (0, tK.k)(r.min, r.max, n);
          t === r && (o -= e), (t.min = it(t.min, e, i, o, s)), (t.max = it(t.max, e, i, o, s));
        })(t, e[i], e[n], e[s], e.scale, r, a);
      }
      let ii = ['x', 'scaleX', 'originX'],
        is = ['y', 'scaleY', 'originY'];
      function ir(t, e, i, n) {
        ie(t.x, e, ii, i ? i.x : void 0, n ? n.x : void 0),
          ie(t.y, e, is, i ? i.y : void 0, n ? n.y : void 0);
      }
      function ia(t) {
        return 0 === t.translate && 1 === t.scale;
      }
      function io(t) {
        return ia(t.x) && ia(t.y);
      }
      function il(t, e) {
        return t.min === e.min && t.max === e.max;
      }
      function ih(t, e) {
        return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
      }
      function iu(t, e) {
        return ih(t.x, e.x) && ih(t.y, e.y);
      }
      function id(t) {
        return t0(t.x) / t0(t.y);
      }
      function ic(t, e) {
        return (
          t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint
        );
      }
      class ip {
        constructor() {
          this.members = [];
        }
        add(t) {
          (0, eH.Kq)(this.members, t), t.scheduleRender();
        }
        remove(t) {
          if (
            ((0, eH.Ai)(this.members, t),
            t === this.prevLead && (this.prevLead = void 0),
            t === this.lead)
          ) {
            let t = this.members[this.members.length - 1];
            t && this.promote(t);
          }
        }
        relegate(t) {
          let e;
          let i = this.members.findIndex(e => t === e);
          if (0 === i) return !1;
          for (let t = i; t >= 0; t--) {
            let i = this.members[t];
            if (!1 !== i.isPresent) {
              e = i;
              break;
            }
          }
          return !!e && (this.promote(e), !0);
        }
        promote(t, e) {
          let i = this.lead;
          if (t !== i && ((this.prevLead = i), (this.lead = t), t.show(), i)) {
            i.instance && i.scheduleRender(),
              t.scheduleRender(),
              (t.resumeFrom = i),
              e && (t.resumeFrom.preserveOpacity = !0),
              i.snapshot &&
                ((t.snapshot = i.snapshot),
                (t.snapshot.latestValues = i.animationValues || i.latestValues)),
              t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
            let { crossfade: n } = t.options;
            !1 === n && i.hide();
          }
        }
        exitAnimationComplete() {
          this.members.forEach(t => {
            let { options: e, resumingFrom: i } = t;
            e.onExitComplete && e.onExitComplete(),
              i && i.options.onExitComplete && i.options.onExitComplete();
          });
        }
        scheduleRender() {
          this.members.forEach(t => {
            t.instance && t.scheduleRender(!1);
          });
        }
        removeLeadSnapshot() {
          this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
        }
      }
      let im = { nodes: 0, calculatedTargetDeltas: 0, calculatedProjections: 0 },
        iv = ['', 'X', 'Y', 'Z'],
        iy = { visibility: 'hidden' },
        ig = 0;
      function ix(t, e, i, n) {
        let { latestValues: s } = e;
        s[t] && ((i[t] = s[t]), e.setStaticValue(t, 0), n && (n[t] = 0));
      }
      function iT({
        attachResizeListener: t,
        defaultParent: e,
        measureScroll: i,
        checkIsScrollRoot: n,
        resetTransform: s,
      }) {
        return class {
          constructor(t = {}, i = e?.()) {
            (this.id = ig++),
              (this.animationId = 0),
              (this.children = new Set()),
              (this.options = {}),
              (this.isTreeAnimating = !1),
              (this.isAnimationBlocked = !1),
              (this.isLayoutDirty = !1),
              (this.isProjectionDirty = !1),
              (this.isSharedProjectionDirty = !1),
              (this.isTransformDirty = !1),
              (this.updateManuallyBlocked = !1),
              (this.updateBlockedByResize = !1),
              (this.isUpdating = !1),
              (this.isSVG = !1),
              (this.needsReset = !1),
              (this.shouldResetTransform = !1),
              (this.hasCheckedOptimisedAppear = !1),
              (this.treeScale = { x: 1, y: 1 }),
              (this.eventHandlers = new Map()),
              (this.hasTreeAnimated = !1),
              (this.updateScheduled = !1),
              (this.scheduleUpdate = () => this.update()),
              (this.projectionUpdateScheduled = !1),
              (this.checkUpdateFailed = () => {
                this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
              }),
              (this.updateProjection = () => {
                (this.projectionUpdateScheduled = !1),
                  te.Q.value &&
                    (im.nodes = im.calculatedTargetDeltas = im.calculatedProjections = 0),
                  this.nodes.forEach(ib),
                  this.nodes.forEach(iD),
                  this.nodes.forEach(iC),
                  this.nodes.forEach(iP),
                  te.Q.addProjectionMetrics && te.Q.addProjectionMetrics(im);
              }),
              (this.resolvedRelativeTargetAt = 0),
              (this.hasProjected = !1),
              (this.isVisible = !0),
              (this.animationProgress = 0),
              (this.sharedNodes = new Map()),
              (this.latestValues = t),
              (this.root = i ? i.root || i : this),
              (this.path = i ? [...i.path, i] : []),
              (this.parent = i),
              (this.depth = i ? i.depth + 1 : 0);
            for (let t = 0; t < this.path.length; t++) this.path[t].shouldResetTransform = !0;
            this.root === this && (this.nodes = new eZ());
          }
          addEventListener(t, e) {
            return (
              this.eventHandlers.has(t) || this.eventHandlers.set(t, new ez.v()),
              this.eventHandlers.get(t).add(e)
            );
          }
          notifyListeners(t, ...e) {
            let i = this.eventHandlers.get(t);
            i && i.notify(...e);
          }
          hasListeners(t) {
            return this.eventHandlers.has(t);
          }
          mount(e) {
            if (this.instance) return;
            (this.isSVG = eK(e) && !(eK(e) && 'svg' === e.tagName)), (this.instance = e);
            let { layoutId: i, layout: n, visualElement: s } = this.options;
            if (
              (s && !s.current && s.mount(e),
              this.root.nodes.add(this),
              this.parent && this.parent.children.add(this),
              this.root.hasTreeAnimated && (n || i) && (this.isLayoutDirty = !0),
              t)
            ) {
              let i;
              let n = () => (this.root.updateBlockedByResize = !1);
              t(e, () => {
                (this.root.updateBlockedByResize = !0),
                  i && i(),
                  (i = (function (t, e) {
                    let i = S.k.now(),
                      n = ({ timestamp: e }) => {
                        let s = e - i;
                        s >= 250 && ((0, h.WG)(n), t(s - 250));
                      };
                    return h.Gt.setup(n, !0), () => (0, h.WG)(n);
                  })(n, 250)),
                  eU.hasAnimatedSinceResize &&
                    ((eU.hasAnimatedSinceResize = !1), this.nodes.forEach(iE));
              });
            }
            i && this.root.registerSharedNode(i, this),
              !1 !== this.options.animate &&
                s &&
                (i || n) &&
                this.addEventListener(
                  'didUpdate',
                  ({ delta: t, hasLayoutChanged: e, hasRelativeLayoutChanged: i, layout: n }) => {
                    if (this.isTreeAnimationBlocked()) {
                      (this.target = void 0), (this.relativeTarget = void 0);
                      return;
                    }
                    let r = this.options.transition || s.getDefaultTransition() || iO,
                      { onLayoutAnimationStart: o, onLayoutAnimationComplete: l } = s.getProps(),
                      h = !this.targetLayout || !iu(this.targetLayout, n),
                      u = !e && i;
                    if (
                      this.options.layoutRoot ||
                      this.resumeFrom ||
                      u ||
                      (e && (h || !this.currentAnimation))
                    ) {
                      this.resumeFrom &&
                        ((this.resumingFrom = this.resumeFrom),
                        (this.resumingFrom.resumingFrom = void 0)),
                        this.setAnimationOrigin(t, u);
                      let e = { ...a(r, 'layout'), onPlay: o, onComplete: l };
                      (s.shouldReduceMotion || this.options.layoutRoot) &&
                        ((e.delay = 0), (e.type = !1)),
                        this.startAnimation(e);
                    } else
                      e || iE(this),
                        this.isLead() &&
                          this.options.onExitComplete &&
                          this.options.onExitComplete();
                    this.targetLayout = n;
                  }
                );
          }
          unmount() {
            this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
            let t = this.getStack();
            t && t.remove(this),
              this.parent && this.parent.children.delete(this),
              (this.instance = void 0),
              this.eventHandlers.clear(),
              (0, h.WG)(this.updateProjection);
          }
          blockUpdate() {
            this.updateManuallyBlocked = !0;
          }
          unblockUpdate() {
            this.updateManuallyBlocked = !1;
          }
          isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
          }
          isTreeAnimationBlocked() {
            return (
              this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1
            );
          }
          startUpdate() {
            !this.isUpdateBlocked() &&
              ((this.isUpdating = !0), this.nodes && this.nodes.forEach(iR), this.animationId++);
          }
          getTransformTemplate() {
            let { visualElement: t } = this.options;
            return t && t.getProps().transformTemplate;
          }
          willUpdate(t = !0) {
            if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
              this.options.onExitComplete && this.options.onExitComplete();
              return;
            }
            if (
              (window.MotionCancelOptimisedAnimation &&
                !this.hasCheckedOptimisedAppear &&
                (function t(e) {
                  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
                  let { visualElement: i } = e.options;
                  if (!i) return;
                  let n = i.props[x];
                  if (window.MotionHasOptimisedAnimation(n, 'transform')) {
                    let { layout: t, layoutId: i } = e.options;
                    window.MotionCancelOptimisedAnimation(n, 'transform', h.Gt, !(t || i));
                  }
                  let { parent: s } = e;
                  s && !s.hasCheckedOptimisedAppear && t(s);
                })(this),
              this.root.isUpdating || this.root.startUpdate(),
              this.isLayoutDirty)
            )
              return;
            this.isLayoutDirty = !0;
            for (let t = 0; t < this.path.length; t++) {
              let e = this.path[t];
              (e.shouldResetTransform = !0),
                e.updateScroll('snapshot'),
                e.options.layoutRoot && e.willUpdate(!1);
            }
            let { layoutId: e, layout: i } = this.options;
            if (void 0 === e && !i) return;
            let n = this.getTransformTemplate();
            (this.prevTransformTemplateValue = n ? n(this.latestValues, '') : void 0),
              this.updateSnapshot(),
              t && this.notifyListeners('willUpdate');
          }
          update() {
            if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
              this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(iV);
              return;
            }
            this.isUpdating || this.nodes.forEach(iM),
              (this.isUpdating = !1),
              this.nodes.forEach(ik),
              this.nodes.forEach(iw),
              this.nodes.forEach(iS),
              this.clearAllSnapshots();
            let t = S.k.now();
            (h.uv.delta = (0, eS.q)(0, 1e3 / 60, t - h.uv.timestamp)),
              (h.uv.timestamp = t),
              (h.uv.isProcessing = !0),
              h.PP.update.process(h.uv),
              h.PP.preRender.process(h.uv),
              h.PP.render.process(h.uv),
              (h.uv.isProcessing = !1);
          }
          didUpdate() {
            this.updateScheduled || ((this.updateScheduled = !0), eL.read(this.scheduleUpdate));
          }
          clearAllSnapshots() {
            this.nodes.forEach(iA), this.sharedNodes.forEach(ij);
          }
          scheduleUpdateProjection() {
            this.projectionUpdateScheduled ||
              ((this.projectionUpdateScheduled = !0),
              h.Gt.preRender(this.updateProjection, !1, !0));
          }
          scheduleCheckAfterUnmount() {
            h.Gt.postRender(() => {
              this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
            });
          }
          updateSnapshot() {
            this.snapshot ||
              !this.instance ||
              ((this.snapshot = this.measure()),
              !this.snapshot ||
                t0(this.snapshot.measuredBox.x) ||
                t0(this.snapshot.measuredBox.y) ||
                (this.snapshot = void 0));
          }
          updateLayout() {
            if (
              !this.instance ||
              (this.updateScroll(),
              !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
            )
              return;
            if (this.resumeFrom && !this.resumeFrom.instance)
              for (let t = 0; t < this.path.length; t++) this.path[t].updateScroll();
            let t = this.layout;
            (this.layout = this.measure(!1)),
              (this.layoutCorrected = t7()),
              (this.isLayoutDirty = !1),
              (this.projectionDelta = void 0),
              this.notifyListeners('measure', this.layout.layoutBox);
            let { visualElement: e } = this.options;
            e && e.notify('LayoutMeasure', this.layout.layoutBox, t ? t.layoutBox : void 0);
          }
          updateScroll(t = 'measure') {
            let e = !!(this.options.layoutScroll && this.instance);
            if (
              (this.scroll &&
                this.scroll.animationId === this.root.animationId &&
                this.scroll.phase === t &&
                (e = !1),
              e && this.instance)
            ) {
              let e = n(this.instance);
              this.scroll = {
                animationId: this.root.animationId,
                phase: t,
                isRoot: e,
                offset: i(this.instance),
                wasRoot: this.scroll ? this.scroll.isRoot : e,
              };
            }
          }
          resetTransform() {
            if (!s) return;
            let t =
                this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
              e = this.projectionDelta && !io(this.projectionDelta),
              i = this.getTransformTemplate(),
              n = i ? i(this.latestValues, '') : void 0,
              r = n !== this.prevTransformTemplateValue;
            t &&
              this.instance &&
              (e || en(this.latestValues) || r) &&
              (s(this.instance, n), (this.shouldResetTransform = !1), this.scheduleRender());
          }
          measure(t = !0) {
            var e;
            let i = this.measurePageBox(),
              n = this.removeElementScroll(i);
            return (
              t && (n = this.removeTransform(n)),
              iW((e = n).x),
              iW(e.y),
              {
                animationId: this.root.animationId,
                measuredBox: i,
                layoutBox: n,
                latestValues: {},
                source: this.id,
              }
            );
          }
          measurePageBox() {
            let { visualElement: t } = this.options;
            if (!t) return t7();
            let e = t.measureViewportBox();
            if (!(this.scroll?.wasRoot || this.path.some(i$))) {
              let { scroll: t } = this.root;
              t && (el(e.x, t.offset.x), el(e.y, t.offset.y));
            }
            return e;
          }
          removeElementScroll(t) {
            let e = t7();
            if ((e8(e, t), this.scroll?.wasRoot)) return e;
            for (let i = 0; i < this.path.length; i++) {
              let n = this.path[i],
                { scroll: s, options: r } = n;
              n !== this.root &&
                s &&
                r.layoutScroll &&
                (s.wasRoot && e8(e, t), el(e.x, s.offset.x), el(e.y, s.offset.y));
            }
            return e;
          }
          applyTransform(t, e = !1) {
            let i = t7();
            e8(i, t);
            for (let t = 0; t < this.path.length; t++) {
              let n = this.path[t];
              !e &&
                n.options.layoutScroll &&
                n.scroll &&
                n !== n.root &&
                eu(i, { x: -n.scroll.offset.x, y: -n.scroll.offset.y }),
                en(n.latestValues) && eu(i, n.latestValues);
            }
            return en(this.latestValues) && eu(i, this.latestValues), i;
          }
          removeTransform(t) {
            let e = t7();
            e8(e, t);
            for (let t = 0; t < this.path.length; t++) {
              let i = this.path[t];
              if (!i.instance || !en(i.latestValues)) continue;
              ei(i.latestValues) && i.updateSnapshot();
              let n = t7();
              e8(n, i.measurePageBox()),
                ir(e, i.latestValues, i.snapshot ? i.snapshot.layoutBox : void 0, n);
            }
            return en(this.latestValues) && ir(e, this.latestValues), e;
          }
          setTargetDelta(t) {
            (this.targetDelta = t),
              this.root.scheduleUpdateProjection(),
              (this.isProjectionDirty = !0);
          }
          setOptions(t) {
            this.options = {
              ...this.options,
              ...t,
              crossfade: void 0 === t.crossfade || t.crossfade,
            };
          }
          clearMeasurements() {
            (this.scroll = void 0),
              (this.layout = void 0),
              (this.snapshot = void 0),
              (this.prevTransformTemplateValue = void 0),
              (this.targetDelta = void 0),
              (this.target = void 0),
              (this.isLayoutDirty = !1);
          }
          forceRelativeParentToResolveTarget() {
            this.relativeParent &&
              this.relativeParent.resolvedRelativeTargetAt !== h.uv.timestamp &&
              this.relativeParent.resolveTargetDelta(!0);
          }
          resolveTargetDelta(t = !1) {
            let e = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = e.isProjectionDirty),
              this.isTransformDirty || (this.isTransformDirty = e.isTransformDirty),
              this.isSharedProjectionDirty ||
                (this.isSharedProjectionDirty = e.isSharedProjectionDirty);
            let i = !!this.resumingFrom || this !== e;
            if (
              !(
                t ||
                (i && this.isSharedProjectionDirty) ||
                this.isProjectionDirty ||
                this.parent?.isProjectionDirty ||
                this.attemptToResolveRelativeTarget ||
                this.root.updateBlockedByResize
              )
            )
              return;
            let { layout: n, layoutId: s } = this.options;
            if (this.layout && (n || s)) {
              if (
                ((this.resolvedRelativeTargetAt = h.uv.timestamp),
                !this.targetDelta && !this.relativeTarget)
              ) {
                let t = this.getClosestProjectingParent();
                t && t.layout && 1 !== this.animationProgress
                  ? ((this.relativeParent = t),
                    this.forceRelativeParentToResolveTarget(),
                    (this.relativeTarget = t7()),
                    (this.relativeTargetOrigin = t7()),
                    t3(this.relativeTargetOrigin, this.layout.layoutBox, t.layout.layoutBox),
                    e8(this.relativeTarget, this.relativeTargetOrigin))
                  : (this.relativeParent = this.relativeTarget = void 0);
              }
              if (this.relativeTarget || this.targetDelta) {
                if (
                  (this.target || ((this.target = t7()), (this.targetWithTransforms = t7())),
                  this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    this.relativeParent &&
                    this.relativeParent.target)
                ) {
                  var r, a, o;
                  this.forceRelativeParentToResolveTarget(),
                    (r = this.target),
                    (a = this.relativeTarget),
                    (o = this.relativeParent.target),
                    t2(r.x, a.x, o.x),
                    t2(r.y, a.y, o.y);
                } else
                  this.targetDelta
                    ? (this.resumingFrom
                        ? (this.target = this.applyTransform(this.layout.layoutBox))
                        : e8(this.target, this.layout.layoutBox),
                      eo(this.target, this.targetDelta))
                    : e8(this.target, this.layout.layoutBox);
                if (this.attemptToResolveRelativeTarget) {
                  this.attemptToResolveRelativeTarget = !1;
                  let t = this.getClosestProjectingParent();
                  t &&
                  !!t.resumingFrom == !!this.resumingFrom &&
                  !t.options.layoutScroll &&
                  t.target &&
                  1 !== this.animationProgress
                    ? ((this.relativeParent = t),
                      this.forceRelativeParentToResolveTarget(),
                      (this.relativeTarget = t7()),
                      (this.relativeTargetOrigin = t7()),
                      t3(this.relativeTargetOrigin, this.target, t.target),
                      e8(this.relativeTarget, this.relativeTargetOrigin))
                    : (this.relativeParent = this.relativeTarget = void 0);
                }
                te.Q.value && im.calculatedTargetDeltas++;
              }
            }
          }
          getClosestProjectingParent() {
            return !this.parent || ei(this.parent.latestValues) || es(this.parent.latestValues)
              ? void 0
              : this.parent.isProjecting()
                ? this.parent
                : this.parent.getClosestProjectingParent();
          }
          isProjecting() {
            return !!(
              (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
              this.layout
            );
          }
          calcProjection() {
            let t = this.getLead(),
              e = !!this.resumingFrom || this !== t,
              i = !0;
            if (
              ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (i = !1),
              e && (this.isSharedProjectionDirty || this.isTransformDirty) && (i = !1),
              this.resolvedRelativeTargetAt === h.uv.timestamp && (i = !1),
              i)
            )
              return;
            let { layout: n, layoutId: s } = this.options;
            if (
              ((this.isTreeAnimating = !!(
                (this.parent && this.parent.isTreeAnimating) ||
                this.currentAnimation ||
                this.pendingAnimation
              )),
              this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
              !this.layout || !(n || s))
            )
              return;
            e8(this.layoutCorrected, this.layout.layoutBox);
            let r = this.treeScale.x,
              a = this.treeScale.y;
            !(function (t, e, i, n = !1) {
              let s, r;
              let a = i.length;
              if (a) {
                e.x = e.y = 1;
                for (let o = 0; o < a; o++) {
                  r = (s = i[o]).projectionDelta;
                  let { visualElement: a } = s.options;
                  (!a || !a.props.style || 'contents' !== a.props.style.display) &&
                    (n &&
                      s.options.layoutScroll &&
                      s.scroll &&
                      s !== s.root &&
                      eu(t, { x: -s.scroll.offset.x, y: -s.scroll.offset.y }),
                    r && ((e.x *= r.x.scale), (e.y *= r.y.scale), eo(t, r)),
                    n && en(s.latestValues) && eu(t, s.latestValues));
                }
                e.x < 1.0000000000001 && e.x > 0.999999999999 && (e.x = 1),
                  e.y < 1.0000000000001 && e.y > 0.999999999999 && (e.y = 1);
              }
            })(this.layoutCorrected, this.treeScale, this.path, e),
              t.layout &&
                !t.target &&
                (1 !== this.treeScale.x || 1 !== this.treeScale.y) &&
                ((t.target = t.layout.layoutBox), (t.targetWithTransforms = t7()));
            let { target: o } = t;
            if (!o) {
              this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
              return;
            }
            this.projectionDelta && this.prevProjectionDelta
              ? (e7(this.prevProjectionDelta.x, this.projectionDelta.x),
                e7(this.prevProjectionDelta.y, this.projectionDelta.y))
              : this.createProjectionDeltas(),
              t5(this.projectionDelta, this.layoutCorrected, o, this.latestValues),
              (this.treeScale.x === r &&
                this.treeScale.y === a &&
                ic(this.projectionDelta.x, this.prevProjectionDelta.x) &&
                ic(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
                ((this.hasProjected = !0),
                this.scheduleRender(),
                this.notifyListeners('projectionUpdate', o)),
              te.Q.value && im.calculatedProjections++;
          }
          hide() {
            this.isVisible = !1;
          }
          show() {
            this.isVisible = !0;
          }
          scheduleRender(t = !0) {
            if ((this.options.visualElement?.scheduleRender(), t)) {
              let t = this.getStack();
              t && t.scheduleRender();
            }
            this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
          }
          createProjectionDeltas() {
            (this.prevProjectionDelta = t9()),
              (this.projectionDelta = t9()),
              (this.projectionDeltaWithTransform = t9());
          }
          setAnimationOrigin(t, e = !1) {
            let i;
            let n = this.snapshot,
              s = n ? n.latestValues : {},
              r = { ...this.latestValues },
              a = t9();
            (this.relativeParent && this.relativeParent.options.layoutRoot) ||
              (this.relativeTarget = this.relativeTargetOrigin = void 0),
              (this.attemptToResolveRelativeTarget = !e);
            let o = t7(),
              l = (n ? n.source : void 0) !== (this.layout ? this.layout.source : void 0),
              h = this.getStack(),
              u = !h || h.members.length <= 1,
              d = !!(l && !u && !0 === this.options.crossfade && !this.path.some(iB));
            (this.animationProgress = 0),
              (this.mixTargetDelta = e => {
                let n = e / 1e3;
                if (
                  (iL(a.x, t.x, n),
                  iL(a.y, t.y, n),
                  this.setTargetDelta(a),
                  this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    this.layout &&
                    this.relativeParent &&
                    this.relativeParent.layout)
                ) {
                  var h, c, p, m;
                  t3(o, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
                    (p = this.relativeTarget),
                    (m = this.relativeTargetOrigin),
                    iF(p.x, m.x, o.x, n),
                    iF(p.y, m.y, o.y, n),
                    i &&
                      ((h = this.relativeTarget), (c = i), il(h.x, c.x) && il(h.y, c.y)) &&
                      (this.isProjectionDirty = !1),
                    i || (i = t7()),
                    e8(i, this.relativeTarget);
                }
                l &&
                  ((this.animationValues = r),
                  (function (t, e, i, n, s, r) {
                    s
                      ? ((t.opacity = (0, tK.k)(0, i.opacity ?? 1, e4(n))),
                        (t.opacityExit = (0, tK.k)(e.opacity ?? 1, 0, e3(n))))
                      : r && (t.opacity = (0, tK.k)(e.opacity ?? 1, i.opacity ?? 1, n));
                    for (let s = 0; s < e0; s++) {
                      let r = `border${eJ[s]}Radius`,
                        a = e2(e, r),
                        o = e2(i, r);
                      (void 0 !== a || void 0 !== o) &&
                        (a || (a = 0),
                        o || (o = 0),
                        0 === a || 0 === o || e5(a) === e5(o)
                          ? ((t[r] = Math.max((0, tK.k)(e1(a), e1(o), n), 0)),
                            (B.KN.test(o) || B.KN.test(a)) && (t[r] += '%'))
                          : (t[r] = o));
                    }
                    (e.rotate || i.rotate) &&
                      (t.rotate = (0, tK.k)(e.rotate || 0, i.rotate || 0, n));
                  })(r, s, this.latestValues, n, d, u)),
                  this.root.scheduleUpdateProjection(),
                  this.scheduleRender(),
                  (this.animationProgress = n);
              }),
              this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
          }
          startAnimation(t) {
            this.notifyListeners('animationStart'),
              this.currentAnimation?.stop(!1),
              this.resumingFrom?.currentAnimation?.stop(!1),
              this.pendingAnimation &&
                ((0, h.WG)(this.pendingAnimation), (this.pendingAnimation = void 0)),
              (this.pendingAnimation = h.Gt.update(() => {
                (eU.hasAnimatedSinceResize = !0),
                  tt.q.layout++,
                  this.motionValue || (this.motionValue = (0, p.OQ)(0)),
                  (this.currentAnimation = (function (t, e, i) {
                    let n = (0, v.S)(t) ? t : (0, p.OQ)(t);
                    return n.start(tE('', n, e, i)), n.animation;
                  })(this.motionValue, [0, 1e3], {
                    ...t,
                    isSync: !0,
                    onUpdate: e => {
                      this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e);
                    },
                    onStop: () => {
                      tt.q.layout--;
                    },
                    onComplete: () => {
                      tt.q.layout--, t.onComplete && t.onComplete(), this.completeAnimation();
                    },
                  })),
                  this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
                  (this.pendingAnimation = void 0);
              }));
          }
          completeAnimation() {
            this.resumingFrom &&
              ((this.resumingFrom.currentAnimation = void 0),
              (this.resumingFrom.preserveOpacity = void 0));
            let t = this.getStack();
            t && t.exitAnimationComplete(),
              (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
              this.notifyListeners('animationComplete');
          }
          finishAnimation() {
            this.currentAnimation &&
              (this.mixTargetDelta && this.mixTargetDelta(1e3), this.currentAnimation.stop(!1)),
              this.completeAnimation();
          }
          applyTransformsToTarget() {
            let t = this.getLead(),
              { targetWithTransforms: e, target: i, layout: n, latestValues: s } = t;
            if (e && i && n) {
              if (
                this !== t &&
                this.layout &&
                n &&
                iN(this.options.animationType, this.layout.layoutBox, n.layoutBox)
              ) {
                i = this.target || t7();
                let e = t0(this.layout.layoutBox.x);
                (i.x.min = t.target.x.min), (i.x.max = i.x.min + e);
                let n = t0(this.layout.layoutBox.y);
                (i.y.min = t.target.y.min), (i.y.max = i.y.min + n);
              }
              e8(e, i), eu(e, s), t5(this.projectionDeltaWithTransform, this.layoutCorrected, e, s);
            }
          }
          registerSharedNode(t, e) {
            this.sharedNodes.has(t) || this.sharedNodes.set(t, new ip()),
              this.sharedNodes.get(t).add(e);
            let i = e.options.initialPromotionConfig;
            e.promote({
              transition: i ? i.transition : void 0,
              preserveFollowOpacity:
                i && i.shouldPreserveFollowOpacity ? i.shouldPreserveFollowOpacity(e) : void 0,
            });
          }
          isLead() {
            let t = this.getStack();
            return !t || t.lead === this;
          }
          getLead() {
            let { layoutId: t } = this.options;
            return (t && this.getStack()?.lead) || this;
          }
          getPrevLead() {
            let { layoutId: t } = this.options;
            return t ? this.getStack()?.prevLead : void 0;
          }
          getStack() {
            let { layoutId: t } = this.options;
            if (t) return this.root.sharedNodes.get(t);
          }
          promote({ needsReset: t, transition: e, preserveFollowOpacity: i } = {}) {
            let n = this.getStack();
            n && n.promote(this, i),
              t && ((this.projectionDelta = void 0), (this.needsReset = !0)),
              e && this.setOptions({ transition: e });
          }
          relegate() {
            let t = this.getStack();
            return !!t && t.relegate(this);
          }
          resetSkewAndRotation() {
            let { visualElement: t } = this.options;
            if (!t) return;
            let e = !1,
              { latestValues: i } = t;
            if (
              ((i.z || i.rotate || i.rotateX || i.rotateY || i.rotateZ || i.skewX || i.skewY) &&
                (e = !0),
              !e)
            )
              return;
            let n = {};
            i.z && ix('z', t, n, this.animationValues);
            for (let e = 0; e < iv.length; e++)
              ix(`rotate${iv[e]}`, t, n, this.animationValues),
                ix(`skew${iv[e]}`, t, n, this.animationValues);
            for (let e in (t.render(), n))
              t.setStaticValue(e, n[e]), this.animationValues && (this.animationValues[e] = n[e]);
            t.scheduleRender();
          }
          getProjectionStyles(t) {
            if (!this.instance || this.isSVG) return;
            if (!this.isVisible) return iy;
            let e = { visibility: '' },
              i = this.getTransformTemplate();
            if (this.needsReset)
              return (
                (this.needsReset = !1),
                (e.opacity = ''),
                (e.pointerEvents = e_(t?.pointerEvents) || ''),
                (e.transform = i ? i(this.latestValues, '') : 'none'),
                e
              );
            let n = this.getLead();
            if (!this.projectionDelta || !this.layout || !n.target) {
              let e = {};
              return (
                this.options.layoutId &&
                  ((e.opacity =
                    void 0 !== this.latestValues.opacity ? this.latestValues.opacity : 1),
                  (e.pointerEvents = e_(t?.pointerEvents) || '')),
                this.hasProjected &&
                  !en(this.latestValues) &&
                  ((e.transform = i ? i({}, '') : 'none'), (this.hasProjected = !1)),
                e
              );
            }
            let s = n.animationValues || n.latestValues;
            this.applyTransformsToTarget(),
              (e.transform = (function (t, e, i) {
                let n = '',
                  s = t.x.translate / e.x,
                  r = t.y.translate / e.y,
                  a = i?.z || 0;
                if (
                  ((s || r || a) && (n = `translate3d(${s}px, ${r}px, ${a}px) `),
                  (1 !== e.x || 1 !== e.y) && (n += `scale(${1 / e.x}, ${1 / e.y}) `),
                  i)
                ) {
                  let {
                    transformPerspective: t,
                    rotate: e,
                    rotateX: s,
                    rotateY: r,
                    skewX: a,
                    skewY: o,
                  } = i;
                  t && (n = `perspective(${t}px) ${n}`),
                    e && (n += `rotate(${e}deg) `),
                    s && (n += `rotateX(${s}deg) `),
                    r && (n += `rotateY(${r}deg) `),
                    a && (n += `skewX(${a}deg) `),
                    o && (n += `skewY(${o}deg) `);
                }
                let o = t.x.scale * e.x,
                  l = t.y.scale * e.y;
                return (1 !== o || 1 !== l) && (n += `scale(${o}, ${l})`), n || 'none';
              })(this.projectionDeltaWithTransform, this.treeScale, s)),
              i && (e.transform = i(s, e.transform));
            let { x: r, y: a } = this.projectionDelta;
            for (let t in ((e.transformOrigin = `${100 * r.origin}% ${100 * a.origin}% 0`),
            n.animationValues
              ? (e.opacity =
                  n === this
                    ? (s.opacity ?? this.latestValues.opacity ?? 1)
                    : this.preserveOpacity
                      ? this.latestValues.opacity
                      : s.opacityExit)
              : (e.opacity =
                  n === this
                    ? void 0 !== s.opacity
                      ? s.opacity
                      : ''
                    : void 0 !== s.opacityExit
                      ? s.opacityExit
                      : 0),
            eG)) {
              if (void 0 === s[t]) continue;
              let { correct: i, applyTo: r, isCSSVariable: a } = eG[t],
                o = 'none' === e.transform ? s[t] : i(s[t], n);
              if (r) {
                let t = r.length;
                for (let i = 0; i < t; i++) e[r[i]] = o;
              } else a ? (this.options.visualElement.renderState.vars[t] = o) : (e[t] = o);
            }
            return (
              this.options.layoutId &&
                (e.pointerEvents = n === this ? e_(t?.pointerEvents) || '' : 'none'),
              e
            );
          }
          clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0;
          }
          resetTree() {
            this.root.nodes.forEach(t => t.currentAnimation?.stop(!1)),
              this.root.nodes.forEach(iV),
              this.root.sharedNodes.clear();
          }
        };
      }
      function iw(t) {
        t.updateLayout();
      }
      function iS(t) {
        let e = t.resumeFrom?.snapshot || t.snapshot;
        if (t.isLead() && t.layout && e && t.hasListeners('didUpdate')) {
          let { layoutBox: i, measuredBox: n } = t.layout,
            { animationType: s } = t.options,
            r = e.source !== t.layout.source;
          'size' === s
            ? et(t => {
                let n = r ? e.measuredBox[t] : e.layoutBox[t],
                  s = t0(n);
                (n.min = i[t].min), (n.max = n.min + s);
              })
            : iN(s, e.layoutBox, i) &&
              et(n => {
                let s = r ? e.measuredBox[n] : e.layoutBox[n],
                  a = t0(i[n]);
                (s.max = s.min + a),
                  t.relativeTarget &&
                    !t.currentAnimation &&
                    ((t.isProjectionDirty = !0),
                    (t.relativeTarget[n].max = t.relativeTarget[n].min + a));
              });
          let a = t9();
          t5(a, i, e.layoutBox);
          let o = t9();
          r ? t5(o, t.applyTransform(n, !0), e.measuredBox) : t5(o, i, e.layoutBox);
          let l = !io(a),
            h = !1;
          if (!t.resumeFrom) {
            let n = t.getClosestProjectingParent();
            if (n && !n.resumeFrom) {
              let { snapshot: s, layout: r } = n;
              if (s && r) {
                let a = t7();
                t3(a, e.layoutBox, s.layoutBox);
                let o = t7();
                t3(o, i, r.layoutBox),
                  iu(a, o) || (h = !0),
                  n.options.layoutRoot &&
                    ((t.relativeTarget = o), (t.relativeTargetOrigin = a), (t.relativeParent = n));
              }
            }
          }
          t.notifyListeners('didUpdate', {
            layout: i,
            snapshot: e,
            delta: o,
            layoutDelta: a,
            hasLayoutChanged: l,
            hasRelativeLayoutChanged: h,
          });
        } else if (t.isLead()) {
          let { onExitComplete: e } = t.options;
          e && e();
        }
        t.options.transition = void 0;
      }
      function ib(t) {
        te.Q.value && im.nodes++,
          t.parent &&
            (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
            t.isSharedProjectionDirty ||
              (t.isSharedProjectionDirty = !!(
                t.isProjectionDirty ||
                t.parent.isProjectionDirty ||
                t.parent.isSharedProjectionDirty
              )),
            t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
      }
      function iP(t) {
        t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
      }
      function iA(t) {
        t.clearSnapshot();
      }
      function iV(t) {
        t.clearMeasurements();
      }
      function iM(t) {
        t.isLayoutDirty = !1;
      }
      function ik(t) {
        let { visualElement: e } = t.options;
        e && e.getProps().onBeforeLayoutMeasure && e.notify('BeforeLayoutMeasure'),
          t.resetTransform();
      }
      function iE(t) {
        t.finishAnimation(),
          (t.targetDelta = t.relativeTarget = t.target = void 0),
          (t.isProjectionDirty = !0);
      }
      function iD(t) {
        t.resolveTargetDelta();
      }
      function iC(t) {
        t.calcProjection();
      }
      function iR(t) {
        t.resetSkewAndRotation();
      }
      function ij(t) {
        t.removeLeadSnapshot();
      }
      function iL(t, e, i) {
        (t.translate = (0, tK.k)(e.translate, 0, i)),
          (t.scale = (0, tK.k)(e.scale, 1, i)),
          (t.origin = e.origin),
          (t.originPoint = e.originPoint);
      }
      function iF(t, e, i, n) {
        (t.min = (0, tK.k)(e.min, i.min, n)), (t.max = (0, tK.k)(e.max, i.max, n));
      }
      function iB(t) {
        return t.animationValues && void 0 !== t.animationValues.opacityExit;
      }
      let iO = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
        iI = t =>
          'undefined' != typeof navigator &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().includes(t),
        iU = iI('applewebkit/') && !iI('chrome/') ? Math.round : w.l;
      function iW(t) {
        (t.min = iU(t.min)), (t.max = iU(t.max));
      }
      function iN(t, e, i) {
        return 'position' === t || ('preserve-aspect' === t && !(0.2 >= Math.abs(id(e) - id(i))));
      }
      function i$(t) {
        return t !== t.root && t.scroll?.wasRoot;
      }
      let iG = iT({
          attachResizeListener: (t, e) => tz(t, 'resize', e),
          measureScroll: () => ({
            x: document.documentElement.scrollLeft || document.body.scrollLeft,
            y: document.documentElement.scrollTop || document.body.scrollTop,
          }),
          checkIsScrollRoot: () => !0,
        }),
        iq = { current: void 0 },
        iX = iT({
          measureScroll: t => ({ x: t.scrollLeft, y: t.scrollTop }),
          defaultParent: () => {
            if (!iq.current) {
              let t = new iG({});
              t.mount(window), t.setOptions({ layoutScroll: !0 }), (iq.current = t);
            }
            return iq.current;
          },
          resetTransform: (t, e) => {
            t.style.transform = void 0 !== e ? e : 'none';
          },
          checkIsScrollRoot: t => 'fixed' === window.getComputedStyle(t).position,
        });
      function iY(t, e) {
        let i = (function (t, e, i) {
            if (t instanceof EventTarget) return [t];
            if ('string' == typeof t) {
              let e = document,
                i = void 0 ?? e.querySelectorAll(t);
              return i ? Array.from(i) : [];
            }
            return Array.from(t);
          })(t),
          n = new AbortController();
        return [i, { passive: !0, ...e, signal: n.signal }, () => n.abort()];
      }
      function iK(t) {
        return !('touch' === t.pointerType || tY.x || tY.y);
      }
      function iz(t, e, i) {
        let { props: n } = t;
        t.animationState && n.whileHover && t.animationState.setActive('whileHover', 'Start' === i);
        let s = n['onHover' + i];
        s && h.Gt.postRender(() => s(e, tQ(e)));
      }
      class iH extends t$ {
        mount() {
          let { current: t } = this.node;
          t &&
            (this.unmount = (function (t, e, i = {}) {
              let [n, s, r] = iY(t, i),
                a = t => {
                  if (!iK(t)) return;
                  let { target: i } = t,
                    n = e(i, t);
                  if ('function' != typeof n || !i) return;
                  let r = t => {
                    iK(t) && (n(t), i.removeEventListener('pointerleave', r));
                  };
                  i.addEventListener('pointerleave', r, s);
                };
              return (
                n.forEach(t => {
                  t.addEventListener('pointerenter', a, s);
                }),
                r
              );
            })(t, (t, e) => (iz(this.node, e, 'Start'), t => iz(this.node, t, 'End'))));
        }
        unmount() {}
      }
      class iQ extends t$ {
        constructor() {
          super(...arguments), (this.isActive = !1);
        }
        onFocus() {
          let t = !1;
          try {
            t = this.node.current.matches(':focus-visible');
          } catch (e) {
            t = !0;
          }
          t &&
            this.node.animationState &&
            (this.node.animationState.setActive('whileFocus', !0), (this.isActive = !0));
        }
        onBlur() {
          this.isActive &&
            this.node.animationState &&
            (this.node.animationState.setActive('whileFocus', !1), (this.isActive = !1));
        }
        mount() {
          this.unmount = (0, em.F)(
            tz(this.node.current, 'focus', () => this.onFocus()),
            tz(this.node.current, 'blur', () => this.onBlur())
          );
        }
        unmount() {}
      }
      let iZ = (t, e) => !!e && (t === e || iZ(t, e.parentElement)),
        i_ = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A']),
        iJ = new WeakSet();
      function i0(t) {
        return e => {
          'Enter' === e.key && t(e);
        };
      }
      function i1(t, e) {
        t.dispatchEvent(new PointerEvent('pointer' + e, { isPrimary: !0, bubbles: !0 }));
      }
      let i5 = (t, e) => {
        let i = t.currentTarget;
        if (!i) return;
        let n = i0(() => {
          if (iJ.has(i)) return;
          i1(i, 'down');
          let t = i0(() => {
            i1(i, 'up');
          });
          i.addEventListener('keyup', t, e), i.addEventListener('blur', () => i1(i, 'cancel'), e);
        });
        i.addEventListener('keydown', n, e),
          i.addEventListener('blur', () => i.removeEventListener('keydown', n), e);
      };
      function i2(t) {
        return tH(t) && !(tY.x || tY.y);
      }
      function i4(t, e, i) {
        let { props: n } = t;
        if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
        t.animationState && n.whileTap && t.animationState.setActive('whileTap', 'Start' === i);
        let s = n['onTap' + ('End' === i ? '' : i)];
        s && h.Gt.postRender(() => s(e, tQ(e)));
      }
      class i3 extends t$ {
        mount() {
          let { current: t } = this.node;
          t &&
            (this.unmount = (function (t, e, i = {}) {
              let [n, s, r] = iY(t, i),
                a = t => {
                  let n = t.currentTarget;
                  if (!i2(t)) return;
                  iJ.add(n);
                  let r = e(n, t),
                    a = (t, e) => {
                      window.removeEventListener('pointerup', o),
                        window.removeEventListener('pointercancel', l),
                        iJ.has(n) && iJ.delete(n),
                        i2(t) && 'function' == typeof r && r(t, { success: e });
                    },
                    o = t => {
                      a(t, n === window || n === document || i.useGlobalTarget || iZ(n, t.target));
                    },
                    l = t => {
                      a(t, !1);
                    };
                  window.addEventListener('pointerup', o, s),
                    window.addEventListener('pointercancel', l, s);
                };
              return (
                n.forEach(t => {
                  (i.useGlobalTarget ? window : t).addEventListener('pointerdown', a, s),
                    tx(t) &&
                      (t.addEventListener('focus', t => i5(t, s)),
                      i_.has(t.tagName) ||
                        -1 !== t.tabIndex ||
                        t.hasAttribute('tabindex') ||
                        (t.tabIndex = 0));
                }),
                r
              );
            })(
              t,
              (t, e) => (
                i4(this.node, e, 'Start'),
                (t, { success: e }) => i4(this.node, t, e ? 'End' : 'Cancel')
              ),
              { useGlobalTarget: this.node.props.globalTapTarget }
            ));
        }
        unmount() {}
      }
      let i6 = new WeakMap(),
        i9 = new WeakMap(),
        i8 = t => {
          let e = i6.get(t.target);
          e && e(t);
        },
        i7 = t => {
          t.forEach(i8);
        },
        nt = { some: 0, all: 1 };
      class ne extends t$ {
        constructor() {
          super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
        }
        startObserver() {
          this.unmount();
          let { viewport: t = {} } = this.node.getProps(),
            { root: e, margin: i, amount: n = 'some', once: s } = t,
            r = {
              root: e ? e.current : void 0,
              rootMargin: i,
              threshold: 'number' == typeof n ? n : nt[n],
            };
          return (function (t, e, i) {
            let n = (function ({ root: t, ...e }) {
              let i = t || document;
              i9.has(i) || i9.set(i, {});
              let n = i9.get(i),
                s = JSON.stringify(e);
              return n[s] || (n[s] = new IntersectionObserver(i7, { root: t, ...e })), n[s];
            })(e);
            return (
              i6.set(t, i),
              n.observe(t),
              () => {
                i6.delete(t), n.unobserve(t);
              }
            );
          })(this.node.current, r, t => {
            let { isIntersecting: e } = t;
            if (this.isInView === e || ((this.isInView = e), s && !e && this.hasEnteredView))
              return;
            e && (this.hasEnteredView = !0),
              this.node.animationState && this.node.animationState.setActive('whileInView', e);
            let { onViewportEnter: i, onViewportLeave: n } = this.node.getProps(),
              r = e ? i : n;
            r && r(t);
          });
        }
        mount() {
          this.startObserver();
        }
        update() {
          if ('undefined' == typeof IntersectionObserver) return;
          let { props: t, prevProps: e } = this.node;
          ['amount', 'margin', 'root'].some(
            (function ({ viewport: t = {} }, { viewport: e = {} } = {}) {
              return i => t[i] !== e[i];
            })(t, e)
          ) && this.startObserver();
        }
        unmount() {}
      }
      let ni = (0, eF.createContext)({ strict: !1 });
      var nn = i(7249);
      let ns = (0, eF.createContext)({});
      function nr(t) {
        return n(t.animate) || tB.some(e => tL(t[e]));
      }
      function na(t) {
        return !!(nr(t) || t.variants);
      }
      function no(t) {
        return Array.isArray(t) ? t.join(' ') : t;
      }
      var nl = i(5687);
      let nh = {
          animation: [
            'animate',
            'variants',
            'whileHover',
            'whileTap',
            'exit',
            'whileInView',
            'whileFocus',
            'whileDrag',
          ],
          exit: ['exit'],
          drag: ['drag', 'dragControls'],
          focus: ['whileFocus'],
          hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
          tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
          pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
          inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
          layout: ['layout', 'layoutId'],
        },
        nu = {};
      for (let t in nh) nu[t] = { isEnabled: e => nh[t].some(t => !!e[t]) };
      let nd = Symbol.for('motionComponentSymbol');
      var nc = i(5403);
      function np(t, { layout: e, layoutId: i }) {
        return (
          d.has(t) ||
          t.startsWith('origin') ||
          ((e || void 0 !== i) && (!!eG[t] || 'opacity' === t))
        );
      }
      let nm = (t, e) => (e && 'number' == typeof t ? e.transform(t) : t),
        nf = { ...F.ai, transform: Math.round },
        nv = {
          rotate: B.uj,
          rotateX: B.uj,
          rotateY: B.uj,
          rotateZ: B.uj,
          scale: F.hs,
          scaleX: F.hs,
          scaleY: F.hs,
          scaleZ: F.hs,
          skew: B.uj,
          skewX: B.uj,
          skewY: B.uj,
          distance: B.px,
          translateX: B.px,
          translateY: B.px,
          translateZ: B.px,
          x: B.px,
          y: B.px,
          z: B.px,
          perspective: B.px,
          transformPerspective: B.px,
          opacity: F.X4,
          originX: B.gQ,
          originY: B.gQ,
          originZ: B.px,
        },
        ny = {
          borderWidth: B.px,
          borderTopWidth: B.px,
          borderRightWidth: B.px,
          borderBottomWidth: B.px,
          borderLeftWidth: B.px,
          borderRadius: B.px,
          radius: B.px,
          borderTopLeftRadius: B.px,
          borderTopRightRadius: B.px,
          borderBottomRightRadius: B.px,
          borderBottomLeftRadius: B.px,
          width: B.px,
          maxWidth: B.px,
          height: B.px,
          maxHeight: B.px,
          top: B.px,
          right: B.px,
          bottom: B.px,
          left: B.px,
          padding: B.px,
          paddingTop: B.px,
          paddingRight: B.px,
          paddingBottom: B.px,
          paddingLeft: B.px,
          margin: B.px,
          marginTop: B.px,
          marginRight: B.px,
          marginBottom: B.px,
          marginLeft: B.px,
          backgroundPositionX: B.px,
          backgroundPositionY: B.px,
          ...nv,
          zIndex: nf,
          fillOpacity: F.X4,
          strokeOpacity: F.X4,
          numOctaves: nf,
        },
        ng = {
          x: 'translateX',
          y: 'translateY',
          z: 'translateZ',
          transformPerspective: 'perspective',
        },
        nx = u.length;
      function nT(t, e, i) {
        let { style: n, vars: s, transformOrigin: r } = t,
          a = !1,
          o = !1;
        for (let t in e) {
          let i = e[t];
          if (d.has(t)) {
            a = !0;
            continue;
          }
          if ((0, e$.j)(t)) {
            s[t] = i;
            continue;
          }
          {
            let e = nm(i, ny[t]);
            t.startsWith('origin') ? ((o = !0), (r[t] = e)) : (n[t] = e);
          }
        }
        if (
          (!e.transform &&
            (a || i
              ? (n.transform = (function (t, e, i) {
                  let n = '',
                    s = !0;
                  for (let r = 0; r < nx; r++) {
                    let a = u[r],
                      o = t[a];
                    if (void 0 === o) continue;
                    let l = !0;
                    if (
                      !(l =
                        'number' == typeof o
                          ? o === (a.startsWith('scale') ? 1 : 0)
                          : 0 === parseFloat(o)) ||
                      i
                    ) {
                      let t = nm(o, ny[a]);
                      if (!l) {
                        s = !1;
                        let e = ng[a] || a;
                        n += `${e}(${t}) `;
                      }
                      i && (e[a] = t);
                    }
                  }
                  return (n = n.trim()), i ? (n = i(e, s ? '' : n)) : s && (n = 'none'), n;
                })(e, t.transform, i))
              : n.transform && (n.transform = 'none')),
          o)
        ) {
          let { originX: t = '50%', originY: e = '50%', originZ: i = 0 } = r;
          n.transformOrigin = `${t} ${e} ${i}`;
        }
      }
      let nw = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
      function nS(t, e, i) {
        for (let n in e) (0, v.S)(e[n]) || np(n, i) || (t[n] = e[n]);
      }
      let nb = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
        nP = { offset: 'strokeDashoffset', array: 'strokeDasharray' };
      function nA(
        t,
        {
          attrX: e,
          attrY: i,
          attrScale: n,
          pathLength: s,
          pathSpacing: r = 1,
          pathOffset: a = 0,
          ...o
        },
        l,
        h,
        u
      ) {
        if ((nT(t, o, h), l)) {
          t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
          return;
        }
        (t.attrs = t.style), (t.style = {});
        let { attrs: d, style: c } = t;
        d.transform && ((c.transform = d.transform), delete d.transform),
          (c.transform || d.transformOrigin) &&
            ((c.transformOrigin = d.transformOrigin ?? '50% 50%'), delete d.transformOrigin),
          c.transform && ((c.transformBox = u?.transformBox ?? 'fill-box'), delete d.transformBox),
          void 0 !== e && (d.x = e),
          void 0 !== i && (d.y = i),
          void 0 !== n && (d.scale = n),
          void 0 !== s &&
            (function (t, e, i = 1, n = 0, s = !0) {
              t.pathLength = 1;
              let r = s ? nb : nP;
              t[r.offset] = B.px.transform(-n);
              let a = B.px.transform(e),
                o = B.px.transform(i);
              t[r.array] = `${a} ${o}`;
            })(d, s, r, a, !1);
      }
      let nV = () => ({ ...nw(), attrs: {} }),
        nM = t => 'string' == typeof t && 'svg' === t.toLowerCase(),
        nk = new Set([
          'animate',
          'exit',
          'variants',
          'initial',
          'style',
          'values',
          'variants',
          'transition',
          'transformTemplate',
          'custom',
          'inherit',
          'onBeforeLayoutMeasure',
          'onAnimationStart',
          'onAnimationComplete',
          'onUpdate',
          'onDragStart',
          'onDrag',
          'onDragEnd',
          'onMeasureDragConstraints',
          'onDirectionLock',
          'onDragTransitionEnd',
          '_dragX',
          '_dragY',
          'onHoverStart',
          'onHoverEnd',
          'onViewportEnter',
          'onViewportLeave',
          'globalTapTarget',
          'ignoreStrict',
          'viewport',
        ]);
      function nE(t) {
        return (
          t.startsWith('while') ||
          (t.startsWith('drag') && 'draggable' !== t) ||
          t.startsWith('layout') ||
          t.startsWith('onTap') ||
          t.startsWith('onPan') ||
          t.startsWith('onLayout') ||
          nk.has(t)
        );
      }
      let nD = t => !nE(t);
      try {
        !(function (t) {
          t && (nD = e => (e.startsWith('on') ? !nE(e) : t(e)));
        })(require('@emotion/is-prop-valid').default);
      } catch {}
      let nC = [
        'animate',
        'circle',
        'defs',
        'desc',
        'ellipse',
        'g',
        'image',
        'line',
        'filter',
        'marker',
        'mask',
        'metadata',
        'path',
        'pattern',
        'polygon',
        'polyline',
        'rect',
        'stop',
        'switch',
        'symbol',
        'svg',
        'text',
        'tspan',
        'use',
        'view',
      ];
      function nR(t) {
        if ('string' != typeof t || t.includes('-'));
        else if (nC.indexOf(t) > -1 || /[A-Z]/u.test(t)) return !0;
        return !1;
      }
      var nj = i(9234);
      let nL = t => (e, i) => {
        let r = (0, eF.useContext)(ns),
          a = (0, eF.useContext)(eB),
          o = () =>
            (function ({ scrapeMotionValuesFromProps: t, createRenderState: e }, i, r, a) {
              return {
                latestValues: (function (t, e, i, r) {
                  let a = {},
                    o = r(t, {});
                  for (let t in o) a[t] = e_(o[t]);
                  let { initial: l, animate: h } = t,
                    u = nr(t),
                    d = na(t);
                  e &&
                    d &&
                    !u &&
                    !1 !== t.inherit &&
                    (void 0 === l && (l = e.initial), void 0 === h && (h = e.animate));
                  let c = !!i && !1 === i.initial,
                    p = (c = c || !1 === l) ? h : l;
                  if (p && 'boolean' != typeof p && !n(p)) {
                    let e = Array.isArray(p) ? p : [p];
                    for (let i = 0; i < e.length; i++) {
                      let n = s(t, e[i]);
                      if (n) {
                        let { transitionEnd: t, transition: e, ...i } = n;
                        for (let t in i) {
                          let e = i[t];
                          if (Array.isArray(e)) {
                            let t = c ? e.length - 1 : 0;
                            e = e[t];
                          }
                          null !== e && (a[t] = e);
                        }
                        for (let e in t) a[e] = t[e];
                      }
                    }
                  }
                  return a;
                })(i, r, a, t),
                renderState: e(),
              };
            })(t, e, r, a);
        return i ? o() : (0, nj.M)(o);
      };
      function nF(t, e, i) {
        let { style: n } = t,
          s = {};
        for (let r in n)
          ((0, v.S)(n[r]) ||
            (e.style && (0, v.S)(e.style[r])) ||
            np(r, t) ||
            i?.getValue(r)?.liveStyle !== void 0) &&
            (s[r] = n[r]);
        return s;
      }
      let nB = { useVisualState: nL({ scrapeMotionValuesFromProps: nF, createRenderState: nw }) };
      function nO(t, e, i) {
        let n = nF(t, e, i);
        for (let i in t)
          ((0, v.S)(t[i]) || (0, v.S)(e[i])) &&
            (n[-1 !== u.indexOf(i) ? 'attr' + i.charAt(0).toUpperCase() + i.substring(1) : i] =
              t[i]);
        return n;
      }
      let nI = { useVisualState: nL({ scrapeMotionValuesFromProps: nO, createRenderState: nV }) },
        nU = t => e => e.test(t),
        nW = [F.ai, B.px, B.KN, B.uj, B.vw, B.vh, { test: t => 'auto' === t, parse: t => t }],
        nN = t => nW.find(nU(t)),
        n$ = t => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),
        nG = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u,
        nq = t => /^0[^.\s]+$/u.test(t);
      var nX = i(4885);
      let nY = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
      function nK(t) {
        let [e, i] = t.slice(0, -1).split('(');
        if ('drop-shadow' === e) return t;
        let [n] = i.match(nX.S) || [];
        if (!n) return t;
        let s = i.replace(n, ''),
          r = nY.has(e) ? 1 : 0;
        return n !== i && (r *= 100), e + '(' + r + s + ')';
      }
      let nz = /\b([a-z-]*)\(.*?\)/gu,
        nH = {
          ...tv.f,
          getAnimatableNone: t => {
            let e = t.match(nz);
            return e ? e.map(nK).join(' ') : t;
          },
        };
      var nQ = i(8207);
      let nZ = {
          ...ny,
          color: nQ.y,
          backgroundColor: nQ.y,
          outlineColor: nQ.y,
          fill: nQ.y,
          stroke: nQ.y,
          borderColor: nQ.y,
          borderTopColor: nQ.y,
          borderRightColor: nQ.y,
          borderBottomColor: nQ.y,
          borderLeftColor: nQ.y,
          filter: nH,
          WebkitFilter: nH,
        },
        n_ = t => nZ[t];
      function nJ(t, e) {
        let i = n_(t);
        return i !== nH && (i = tv.f), i.getAnimatableNone ? i.getAnimatableNone(e) : void 0;
      }
      let n0 = new Set(['auto', 'none', '0']);
      class n1 extends K {
        constructor(t, e, i, n, s) {
          super(t, e, i, n, s, !0);
        }
        readKeyframes() {
          let { unresolvedKeyframes: t, element: e, name: i } = this;
          if (!e || !e.current) return;
          super.readKeyframes();
          for (let i = 0; i < t.length; i++) {
            let n = t[i];
            if ('string' == typeof n && ((n = n.trim()), (0, e$.p)(n))) {
              let s = (function t(e, i, n = 1) {
                (0, H.V)(
                  n <= 4,
                  `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`
                );
                let [s, r] = (function (t) {
                  let e = nG.exec(t);
                  if (!e) return [,];
                  let [, i, n, s] = e;
                  return [`--${i ?? n}`, s];
                })(e);
                if (!s) return;
                let a = window.getComputedStyle(i).getPropertyValue(s);
                if (a) {
                  let t = a.trim();
                  return n$(t) ? parseFloat(t) : t;
                }
                return (0, e$.p)(r) ? t(r, i, n + 1) : r;
              })(n, e.current);
              void 0 !== s && (t[i] = s), i === t.length - 1 && (this.finalKeyframe = n);
            }
          }
          if ((this.resolveNoneKeyframes(), !c.has(i) || 2 !== t.length)) return;
          let [n, s] = t,
            r = nN(n),
            a = nN(s);
          if (r !== a) {
            if (O(r) && O(a))
              for (let e = 0; e < t.length; e++) {
                let i = t[e];
                'string' == typeof i && (t[e] = parseFloat(i));
              }
            else W[i] && (this.needsMeasurement = !0);
          }
        }
        resolveNoneKeyframes() {
          let { unresolvedKeyframes: t, name: e } = this,
            i = [];
          for (let e = 0; e < t.length; e++) {
            var n;
            (null === t[e] ||
              ('number' == typeof (n = t[e])
                ? 0 === n
                : null === n || 'none' === n || '0' === n || nq(n))) &&
              i.push(e);
          }
          i.length &&
            (function (t, e, i) {
              let n,
                s = 0;
              for (; s < t.length && !n; ) {
                let e = t[s];
                'string' == typeof e && !n0.has(e) && (0, tv.V)(e).values.length && (n = t[s]), s++;
              }
              if (n && i) for (let s of e) t[s] = nJ(i, n);
            })(t, i, e);
        }
        measureInitialState() {
          let { element: t, unresolvedKeyframes: e, name: i } = this;
          if (!t || !t.current) return;
          'height' === i && (this.suspendedScrollY = window.pageYOffset),
            (this.measuredOrigin = W[i](
              t.measureViewportBox(),
              window.getComputedStyle(t.current)
            )),
            (e[0] = this.measuredOrigin);
          let n = e[e.length - 1];
          void 0 !== n && t.getValue(i, n).jump(n, !1);
        }
        measureEndState() {
          let { element: t, name: e, unresolvedKeyframes: i } = this;
          if (!t || !t.current) return;
          let n = t.getValue(e);
          n && n.jump(this.measuredOrigin, !1);
          let s = i.length - 1,
            r = i[s];
          (i[s] = W[e](t.measureViewportBox(), window.getComputedStyle(t.current))),
            null !== r && void 0 === this.finalKeyframe && (this.finalKeyframe = r),
            this.removedTransforms?.length &&
              this.removedTransforms.forEach(([e, i]) => {
                t.getValue(e).set(i);
              }),
            this.resolveNoneKeyframes();
        }
      }
      let n5 = [...nW, nQ.y, tv.f],
        n2 = t => n5.find(nU(t)),
        n4 = { current: null },
        n3 = { current: !1 },
        n6 = new WeakMap(),
        n9 = [
          'AnimationStart',
          'AnimationComplete',
          'Update',
          'BeforeLayoutMeasure',
          'LayoutMeasure',
          'LayoutAnimationStart',
          'LayoutAnimationComplete',
        ];
      class n8 {
        scrapeMotionValuesFromProps(t, e, i) {
          return {};
        }
        constructor(
          {
            parent: t,
            props: e,
            presenceContext: i,
            reducedMotionConfig: n,
            blockInitialAnimation: s,
            visualState: r,
          },
          a = {}
        ) {
          (this.current = null),
            (this.children = new Set()),
            (this.isVariantNode = !1),
            (this.isControllingVariants = !1),
            (this.shouldReduceMotion = null),
            (this.values = new Map()),
            (this.KeyframeResolver = K),
            (this.features = {}),
            (this.valueSubscriptions = new Map()),
            (this.prevMotionValues = {}),
            (this.events = {}),
            (this.propEventSubscriptions = {}),
            (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
            (this.render = () => {
              this.current &&
                (this.triggerBuild(),
                this.renderInstance(
                  this.current,
                  this.renderState,
                  this.props.style,
                  this.projection
                ));
            }),
            (this.renderScheduledAt = 0),
            (this.scheduleRender = () => {
              let t = S.k.now();
              this.renderScheduledAt < t &&
                ((this.renderScheduledAt = t), h.Gt.render(this.render, !1, !0));
            });
          let { latestValues: o, renderState: l } = r;
          (this.latestValues = o),
            (this.baseTarget = { ...o }),
            (this.initialValues = e.initial ? { ...o } : {}),
            (this.renderState = l),
            (this.parent = t),
            (this.props = e),
            (this.presenceContext = i),
            (this.depth = t ? t.depth + 1 : 0),
            (this.reducedMotionConfig = n),
            (this.options = a),
            (this.blockInitialAnimation = !!s),
            (this.isControllingVariants = nr(e)),
            (this.isVariantNode = na(e)),
            this.isVariantNode && (this.variantChildren = new Set()),
            (this.manuallyAnimateOnMount = !!(t && t.current));
          let { willChange: u, ...d } = this.scrapeMotionValuesFromProps(e, {}, this);
          for (let t in d) {
            let e = d[t];
            void 0 !== o[t] && (0, v.S)(e) && e.set(o[t], !1);
          }
        }
        mount(t) {
          (this.current = t),
            n6.set(t, this),
            this.projection && !this.projection.instance && this.projection.mount(t),
            this.parent &&
              this.isVariantNode &&
              !this.isControllingVariants &&
              (this.removeFromVariantTree = this.parent.addVariantChild(this)),
            this.values.forEach((t, e) => this.bindToMotionValue(e, t)),
            n3.current ||
              (function () {
                if (((n3.current = !0), nl.B)) {
                  if (window.matchMedia) {
                    let t = window.matchMedia('(prefers-reduced-motion)'),
                      e = () => (n4.current = t.matches);
                    t.addListener(e), e();
                  } else n4.current = !1;
                }
              })(),
            (this.shouldReduceMotion =
              'never' !== this.reducedMotionConfig &&
              ('always' === this.reducedMotionConfig || n4.current)),
            this.parent && this.parent.children.add(this),
            this.update(this.props, this.presenceContext);
        }
        unmount() {
          for (let t in (this.projection && this.projection.unmount(),
          (0, h.WG)(this.notifyUpdate),
          (0, h.WG)(this.render),
          this.valueSubscriptions.forEach(t => t()),
          this.valueSubscriptions.clear(),
          this.removeFromVariantTree && this.removeFromVariantTree(),
          this.parent && this.parent.children.delete(this),
          this.events))
            this.events[t].clear();
          for (let t in this.features) {
            let e = this.features[t];
            e && (e.unmount(), (e.isMounted = !1));
          }
          this.current = null;
        }
        bindToMotionValue(t, e) {
          let i;
          this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
          let n = d.has(t);
          n && this.onBindTransform && this.onBindTransform();
          let s = e.on('change', e => {
              (this.latestValues[t] = e),
                this.props.onUpdate && h.Gt.preRender(this.notifyUpdate),
                n && this.projection && (this.projection.isTransformDirty = !0);
            }),
            r = e.on('renderRequest', this.scheduleRender);
          window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, t, e)),
            this.valueSubscriptions.set(t, () => {
              s(), r(), i && i(), e.owner && e.stop();
            });
        }
        sortNodePosition(t) {
          return this.current && this.sortInstanceNodePosition && this.type === t.type
            ? this.sortInstanceNodePosition(this.current, t.current)
            : 0;
        }
        updateFeatures() {
          let t = 'animation';
          for (t in nu) {
            let e = nu[t];
            if (!e) continue;
            let { isEnabled: i, Feature: n } = e;
            if (
              (!this.features[t] && n && i(this.props) && (this.features[t] = new n(this)),
              this.features[t])
            ) {
              let e = this.features[t];
              e.isMounted ? e.update() : (e.mount(), (e.isMounted = !0));
            }
          }
        }
        triggerBuild() {
          this.build(this.renderState, this.latestValues, this.props);
        }
        measureViewportBox() {
          return this.current ? this.measureInstanceViewportBox(this.current, this.props) : t7();
        }
        getStaticValue(t) {
          return this.latestValues[t];
        }
        setStaticValue(t, e) {
          this.latestValues[t] = e;
        }
        update(t, e) {
          (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
            (this.prevProps = this.props),
            (this.props = t),
            (this.prevPresenceContext = this.presenceContext),
            (this.presenceContext = e);
          for (let e = 0; e < n9.length; e++) {
            let i = n9[e];
            this.propEventSubscriptions[i] &&
              (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
            let n = t['on' + i];
            n && (this.propEventSubscriptions[i] = this.on(i, n));
          }
          (this.prevMotionValues = (function (t, e, i) {
            for (let n in e) {
              let s = e[n],
                r = i[n];
              if ((0, v.S)(s)) t.addValue(n, s);
              else if ((0, v.S)(r)) t.addValue(n, (0, p.OQ)(s, { owner: t }));
              else if (r !== s) {
                if (t.hasValue(n)) {
                  let e = t.getValue(n);
                  !0 === e.liveStyle ? e.jump(s) : e.hasAnimated || e.set(s);
                } else {
                  let e = t.getStaticValue(n);
                  t.addValue(n, (0, p.OQ)(void 0 !== e ? e : s, { owner: t }));
                }
              }
            }
            for (let n in i) void 0 === e[n] && t.removeValue(n);
            return e;
          })(
            this,
            this.scrapeMotionValuesFromProps(t, this.prevProps, this),
            this.prevMotionValues
          )),
            this.handleChildMotionValue && this.handleChildMotionValue();
        }
        getProps() {
          return this.props;
        }
        getVariant(t) {
          return this.props.variants ? this.props.variants[t] : void 0;
        }
        getDefaultTransition() {
          return this.props.transition;
        }
        getTransformPagePoint() {
          return this.props.transformPagePoint;
        }
        getClosestVariantNode() {
          return this.isVariantNode
            ? this
            : this.parent
              ? this.parent.getClosestVariantNode()
              : void 0;
        }
        addVariantChild(t) {
          let e = this.getClosestVariantNode();
          if (e)
            return e.variantChildren && e.variantChildren.add(t), () => e.variantChildren.delete(t);
        }
        addValue(t, e) {
          let i = this.values.get(t);
          e !== i &&
            (i && this.removeValue(t),
            this.bindToMotionValue(t, e),
            this.values.set(t, e),
            (this.latestValues[t] = e.get()));
        }
        removeValue(t) {
          this.values.delete(t);
          let e = this.valueSubscriptions.get(t);
          e && (e(), this.valueSubscriptions.delete(t)),
            delete this.latestValues[t],
            this.removeValueFromRenderState(t, this.renderState);
        }
        hasValue(t) {
          return this.values.has(t);
        }
        getValue(t, e) {
          if (this.props.values && this.props.values[t]) return this.props.values[t];
          let i = this.values.get(t);
          return (
            void 0 === i &&
              void 0 !== e &&
              ((i = (0, p.OQ)(null === e ? void 0 : e, { owner: this })), this.addValue(t, i)),
            i
          );
        }
        readValue(t, e) {
          let i =
            void 0 === this.latestValues[t] && this.current
              ? (this.getBaseTargetFromProps(this.props, t) ??
                this.readValueFromInstance(this.current, t, this.options))
              : this.latestValues[t];
          return (
            null != i &&
              ('string' == typeof i && (n$(i) || nq(i))
                ? (i = parseFloat(i))
                : !n2(i) && tv.f.test(e) && (i = nJ(t, e)),
              this.setBaseTarget(t, (0, v.S)(i) ? i.get() : i)),
            (0, v.S)(i) ? i.get() : i
          );
        }
        setBaseTarget(t, e) {
          this.baseTarget[t] = e;
        }
        getBaseTarget(t) {
          let e;
          let { initial: i } = this.props;
          if ('string' == typeof i || 'object' == typeof i) {
            let n = s(this.props, i, this.presenceContext?.custom);
            n && (e = n[t]);
          }
          if (i && void 0 !== e) return e;
          let n = this.getBaseTargetFromProps(this.props, t);
          return void 0 === n || (0, v.S)(n)
            ? void 0 !== this.initialValues[t] && void 0 === e
              ? void 0
              : this.baseTarget[t]
            : n;
        }
        on(t, e) {
          return this.events[t] || (this.events[t] = new ez.v()), this.events[t].add(e);
        }
        notify(t, ...e) {
          this.events[t] && this.events[t].notify(...e);
        }
      }
      class n7 extends n8 {
        constructor() {
          super(...arguments), (this.KeyframeResolver = n1);
        }
        sortInstanceNodePosition(t, e) {
          return 2 & t.compareDocumentPosition(e) ? 1 : -1;
        }
        getBaseTargetFromProps(t, e) {
          return t.style ? t.style[e] : void 0;
        }
        removeValueFromRenderState(t, { vars: e, style: i }) {
          delete e[t], delete i[t];
        }
        handleChildMotionValue() {
          this.childSubscription && (this.childSubscription(), delete this.childSubscription);
          let { children: t } = this.props;
          (0, v.S)(t) &&
            (this.childSubscription = t.on('change', t => {
              this.current && (this.current.textContent = `${t}`);
            }));
        }
      }
      function st(t, { style: e, vars: i }, n, s) {
        for (let r in (Object.assign(t.style, e, s && s.getProjectionStyles(n)), i))
          t.style.setProperty(r, i[r]);
      }
      class se extends n7 {
        constructor() {
          super(...arguments), (this.type = 'html'), (this.renderInstance = st);
        }
        readValueFromInstance(t, e) {
          if (d.has(e)) return this.projection?.isProjecting ? C(e) : j(t, e);
          {
            let i = window.getComputedStyle(t),
              n = ((0, e$.j)(e) ? i.getPropertyValue(e) : i[e]) || 0;
            return 'string' == typeof n ? n.trim() : n;
          }
        }
        measureInstanceViewportBox(t, { transformPagePoint: e }) {
          return ed(t, e);
        }
        build(t, e, i) {
          nT(t, e, i.transformTemplate);
        }
        scrapeMotionValuesFromProps(t, e, i) {
          return nF(t, e, i);
        }
      }
      let si = new Set([
        'baseFrequency',
        'diffuseConstant',
        'kernelMatrix',
        'kernelUnitLength',
        'keySplines',
        'keyTimes',
        'limitingConeAngle',
        'markerHeight',
        'markerWidth',
        'numOctaves',
        'targetX',
        'targetY',
        'surfaceScale',
        'specularConstant',
        'specularExponent',
        'stdDeviation',
        'tableValues',
        'viewBox',
        'gradientTransform',
        'pathLength',
        'startOffset',
        'textLength',
        'lengthAdjust',
      ]);
      class sn extends n7 {
        constructor() {
          super(...arguments),
            (this.type = 'svg'),
            (this.isSVGTag = !1),
            (this.measureInstanceViewportBox = t7);
        }
        getBaseTargetFromProps(t, e) {
          return t[e];
        }
        readValueFromInstance(t, e) {
          if (d.has(e)) {
            let t = n_(e);
            return (t && t.default) || 0;
          }
          return (e = si.has(e) ? e : g(e)), t.getAttribute(e);
        }
        scrapeMotionValuesFromProps(t, e, i) {
          return nO(t, e, i);
        }
        build(t, e, i) {
          nA(t, e, this.isSVGTag, i.transformTemplate, i.style);
        }
        renderInstance(t, e, i, n) {
          !(function (t, e, i, n) {
            for (let i in (st(t, e, void 0, n), e.attrs))
              t.setAttribute(si.has(i) ? i : g(i), e.attrs[i]);
          })(t, e, 0, n);
        }
        mount(t) {
          (this.isSVGTag = nM(t.tagName)), super.mount(t);
        }
      }
      let ss = (function (t) {
        if ('undefined' == typeof Proxy) return t;
        let e = new Map();
        return new Proxy((...e) => t(...e), {
          get: (i, n) => ('create' === n ? t : (e.has(n) || e.set(n, t(n)), e.get(n))),
        });
      })(
        ((o = {
          animation: { Feature: tG },
          exit: { Feature: tX },
          inView: { Feature: ne },
          tap: { Feature: i3 },
          focus: { Feature: iQ },
          hover: { Feature: iH },
          pan: { Feature: eR },
          drag: { Feature: eD, ProjectionNode: iX, MeasureLayout: eX },
          layout: { ProjectionNode: iX, MeasureLayout: eX },
        }),
        (l = (t, e) => (nR(t) ? new sn(e) : new se(e, { allowProjection: t !== eF.Fragment }))),
        function (t, { forwardMotionProps: e } = { forwardMotionProps: !1 }) {
          return (function (t) {
            var e, i;
            let {
              preloadedFeatures: n,
              createVisualElement: s,
              useRender: r,
              useVisualState: a,
              Component: o,
            } = t;
            function l(t, e) {
              var i;
              let n;
              let l = {
                  ...(0, eF.useContext)(nn.Q),
                  ...t,
                  layoutId: (function (t) {
                    let { layoutId: e } = t,
                      i = (0, eF.useContext)(eO).id;
                    return i && void 0 !== e ? i + '-' + e : e;
                  })(t),
                },
                { isStatic: h } = l,
                u = (function (t) {
                  let { initial: e, animate: i } = (function (t, e) {
                    if (nr(t)) {
                      let { initial: e, animate: i } = t;
                      return {
                        initial: !1 === e || tL(e) ? e : void 0,
                        animate: tL(i) ? i : void 0,
                      };
                    }
                    return !1 !== t.inherit ? e : {};
                  })(t, (0, eF.useContext)(ns));
                  return (0, eF.useMemo)(() => ({ initial: e, animate: i }), [no(e), no(i)]);
                })(t),
                d = a(t, h);
              if (!h && nl.B) {
                (0, eF.useContext)(ni).strict;
                let t = (function (t) {
                  let { drag: e, layout: i } = nu;
                  if (!e && !i) return {};
                  let n = { ...e, ...i };
                  return {
                    MeasureLayout:
                      (null == e ? void 0 : e.isEnabled(t)) || (null == i ? void 0 : i.isEnabled(t))
                        ? n.MeasureLayout
                        : void 0,
                    ProjectionNode: n.ProjectionNode,
                  };
                })(l);
                (n = t.MeasureLayout),
                  (u.visualElement = (function (t, e, i, n, s) {
                    let { visualElement: r } = (0, eF.useContext)(ns),
                      a = (0, eF.useContext)(ni),
                      o = (0, eF.useContext)(eB),
                      l = (0, eF.useContext)(nn.Q).reducedMotion,
                      h = (0, eF.useRef)(null);
                    (n = n || a.renderer),
                      !h.current &&
                        n &&
                        (h.current = n(t, {
                          visualState: e,
                          parent: r,
                          props: i,
                          presenceContext: o,
                          blockInitialAnimation: !!o && !1 === o.initial,
                          reducedMotionConfig: l,
                        }));
                    let u = h.current,
                      d = (0, eF.useContext)(eI);
                    u &&
                      !u.projection &&
                      s &&
                      ('html' === u.type || 'svg' === u.type) &&
                      (function (t, e, i, n) {
                        let {
                          layoutId: s,
                          layout: r,
                          drag: a,
                          dragConstraints: o,
                          layoutScroll: l,
                          layoutRoot: h,
                          layoutCrossfade: u,
                        } = e;
                        (t.projection = new i(
                          t.latestValues,
                          e['data-framer-portal-id']
                            ? void 0
                            : (function t(e) {
                                if (e)
                                  return !1 !== e.options.allowProjection
                                    ? e.projection
                                    : t(e.parent);
                              })(t.parent)
                        )),
                          t.projection.setOptions({
                            layoutId: s,
                            layout: r,
                            alwaysMeasureLayout: !!a || (o && ep(o)),
                            visualElement: t,
                            animationType: 'string' == typeof r ? r : 'both',
                            initialPromotionConfig: n,
                            crossfade: u,
                            layoutScroll: l,
                            layoutRoot: h,
                          });
                      })(h.current, i, s, d);
                    let c = (0, eF.useRef)(!1);
                    (0, eF.useInsertionEffect)(() => {
                      u && c.current && u.update(i, o);
                    });
                    let p = i[x],
                      m = (0, eF.useRef)(
                        !!p &&
                          !window.MotionHandoffIsComplete?.(p) &&
                          window.MotionHasOptimisedAnimation?.(p)
                      );
                    return (
                      (0, nc.E)(() => {
                        u &&
                          ((c.current = !0),
                          (window.MotionIsMounted = !0),
                          u.updateFeatures(),
                          eL.render(u.render),
                          m.current && u.animationState && u.animationState.animateChanges());
                      }),
                      (0, eF.useEffect)(() => {
                        u &&
                          (!m.current && u.animationState && u.animationState.animateChanges(),
                          m.current &&
                            (queueMicrotask(() => {
                              window.MotionHandoffMarkAsComplete?.(p);
                            }),
                            (m.current = !1)));
                      }),
                      u
                    );
                  })(o, d, l, s, t.ProjectionNode));
              }
              return (0, ej.jsxs)(ns.Provider, {
                value: u,
                children: [
                  n && u.visualElement
                    ? (0, ej.jsx)(n, { visualElement: u.visualElement, ...l })
                    : null,
                  r(
                    o,
                    t,
                    ((i = u.visualElement),
                    (0, eF.useCallback)(
                      t => {
                        t && d.onMount && d.onMount(t),
                          i && (t ? i.mount(t) : i.unmount()),
                          e && ('function' == typeof e ? e(t) : ep(e) && (e.current = t));
                      },
                      [i]
                    )),
                    d,
                    h,
                    u.visualElement
                  ),
                ],
              });
            }
            n &&
              (function (t) {
                for (let e in t) nu[e] = { ...nu[e], ...t[e] };
              })(n),
              (l.displayName = 'motion.'.concat(
                'string' == typeof o
                  ? o
                  : 'create('.concat(
                      null !== (i = null !== (e = o.displayName) && void 0 !== e ? e : o.name) &&
                        void 0 !== i
                        ? i
                        : '',
                      ')'
                    )
              ));
            let h = (0, eF.forwardRef)(l);
            return (h[nd] = o), h;
          })({
            ...(nR(t) ? nI : nB),
            preloadedFeatures: o,
            useRender: (function (t = !1) {
              return (e, i, n, { latestValues: s }, r) => {
                let a = (
                    nR(e)
                      ? function (t, e, i, n) {
                          let s = (0, eF.useMemo)(() => {
                            let i = nV();
                            return (
                              nA(i, e, nM(n), t.transformTemplate, t.style),
                              { ...i.attrs, style: { ...i.style } }
                            );
                          }, [e]);
                          if (t.style) {
                            let e = {};
                            nS(e, t.style, t), (s.style = { ...e, ...s.style });
                          }
                          return s;
                        }
                      : function (t, e) {
                          let i = {},
                            n = (function (t, e) {
                              let i = t.style || {},
                                n = {};
                              return (
                                nS(n, i, t),
                                Object.assign(
                                  n,
                                  (function ({ transformTemplate: t }, e) {
                                    return (0, eF.useMemo)(() => {
                                      let i = nw();
                                      return nT(i, e, t), Object.assign({}, i.vars, i.style);
                                    }, [e]);
                                  })(t, e)
                                ),
                                n
                              );
                            })(t, e);
                          return (
                            t.drag &&
                              !1 !== t.dragListener &&
                              ((i.draggable = !1),
                              (n.userSelect = n.WebkitUserSelect = n.WebkitTouchCallout = 'none'),
                              (n.touchAction =
                                !0 === t.drag ? 'none' : `pan-${'x' === t.drag ? 'y' : 'x'}`)),
                            void 0 === t.tabIndex &&
                              (t.onTap || t.onTapStart || t.whileTap) &&
                              (i.tabIndex = 0),
                            (i.style = n),
                            i
                          );
                        }
                  )(i, s, r, e),
                  o = (function (t, e, i) {
                    let n = {};
                    for (let s in t)
                      ('values' !== s || 'object' != typeof t.values) &&
                        (nD(s) ||
                          (!0 === i && nE(s)) ||
                          (!e && !nE(s)) ||
                          (t.draggable && s.startsWith('onDrag'))) &&
                        (n[s] = t[s]);
                    return n;
                  })(i, 'string' == typeof e, t),
                  l = e !== eF.Fragment ? { ...o, ...a, ref: n } : {},
                  { children: h } = i,
                  u = (0, eF.useMemo)(() => ((0, v.S)(h) ? h.get() : h), [h]);
                return (0, eF.createElement)(e, { ...l, children: u });
              };
            })(e),
            createVisualElement: l,
            Component: t,
          });
        })
      );
    },
    5687: (t, e, i) => {
      i.d(e, { B: () => n });
      let n = 'undefined' != typeof window;
    },
    9234: (t, e, i) => {
      i.d(e, { M: () => s });
      var n = i(2115);
      function s(t) {
        let e = (0, n.useRef)(null);
        return null === e.current && (e.current = t()), e.current;
      }
    },
    5403: (t, e, i) => {
      i.d(e, { E: () => s });
      var n = i(2115);
      let s = i(5687).B ? n.useLayoutEffect : n.useEffect;
    },
    4420: (t, e, i) => {
      i.d(e, { d: () => o });
      var n = i(9421),
        s = i(2115),
        r = i(7249),
        a = i(9234);
      function o(t) {
        let e = (0, a.M)(() => (0, n.OQ)(t)),
          { isStatic: i } = (0, s.useContext)(r.Q);
        if (i) {
          let [, i] = (0, s.useState)(t);
          (0, s.useEffect)(() => e.on('change', i), []);
        }
        return e;
      }
    },
    263: (t, e, i) => {
      i.d(e, { z: () => v });
      var n = i(9356),
        s = i(1604),
        r = i(3932);
      function a(t) {
        return 'number' == typeof t ? t : parseFloat(t);
      }
      var o = i(2115),
        l = i(7249),
        h = i(4420),
        u = i(1136),
        d = i(9234),
        c = i(5403);
      function p(t, e) {
        let i = (0, h.d)(e()),
          n = () => i.set(e());
        return (
          n(),
          (0, c.E)(() => {
            let e = () => r.Gt.preRender(n, !1, !0),
              i = t.map(t => t.on('change', e));
            return () => {
              i.forEach(t => t()), (0, r.WG)(n);
            };
          }),
          i
        );
      }
      var m = i(9421);
      function f(t, e) {
        let i = (0, d.M)(() => []);
        return p(t, () => {
          i.length = 0;
          let n = t.length;
          for (let e = 0; e < n; e++) i[e] = t[e].get();
          return e(i);
        });
      }
      function v(t, e = {}) {
        let { isStatic: i } = (0, o.useContext)(l.Q),
          d = () => ((0, n.S)(t) ? t.get() : t);
        if (i)
          return (function (t, e, i, n) {
            if ('function' == typeof t)
              return (function (t) {
                (m.bt.current = []), t();
                let e = p(m.bt.current, t);
                return (m.bt.current = void 0), e;
              })(t);
            let s = (function (...t) {
              let e = !Array.isArray(t[0]),
                i = e ? 0 : -1,
                n = t[0 + i],
                s = t[1 + i],
                r = t[2 + i],
                a = t[3 + i],
                o = (0, u.G)(s, r, a);
              return e ? o(n) : o;
            })(void 0, void 0, void 0);
            return Array.isArray(t) ? f(t, s) : f([t], ([t]) => s(t));
          })(d);
        let c = (0, h.d)(d());
        return (
          (0, o.useInsertionEffect)(
            () =>
              (function (t, e, i) {
                let o, l;
                let h = t.get(),
                  u = null,
                  d = h,
                  c = 'string' == typeof h ? h.replace(/[\d.-]/g, '') : void 0,
                  p = () => {
                    u && (u.stop(), (u = null));
                  },
                  m = () => {
                    p(),
                      (u = new s.s({
                        keyframes: [a(t.get()), a(d)],
                        velocity: t.getVelocity(),
                        type: 'spring',
                        restDelta: 0.001,
                        restSpeed: 0.01,
                        ...i,
                        onUpdate: o,
                      }));
                  };
                return (
                  t.attach(
                    (e, i) => ((d = e), (o = t => i(c ? t + c : t)), r.Gt.postRender(m), t.get()),
                    p
                  ),
                  (0, n.S)(e) &&
                    ((l = e.on('change', e => t.set(c ? e + c : e))), t.on('destroy', l)),
                  l
                );
              })(c, t, e),
            [c, JSON.stringify(e)]
          ),
          c
        );
      }
    },
    1604: (t, e, i) => {
      i.d(e, { s: () => g });
      var n = i(1046),
        s = i(5821),
        r = i(300),
        a = i(5850),
        o = i(7971),
        l = i(9674),
        h = i(3932);
      let u = t => {
        let e = ({ timestamp: e }) => t(e);
        return {
          start: (t = !0) => h.Gt.update(e, t),
          stop: () => (0, h.WG)(e),
          now: () => (h.uv.isProcessing ? h.uv.timestamp : a.k.now()),
        };
      };
      var d = i(1592),
        c = i(8524),
        p = i(5431),
        m = i(6881),
        f = i(4407),
        v = i(4537);
      let y = t => t / 100;
      class g extends v.q {
        constructor(t) {
          super(),
            (this.state = 'idle'),
            (this.startTime = null),
            (this.isStopped = !1),
            (this.currentTime = 0),
            (this.holdTime = null),
            (this.playbackSpeed = 1),
            (this.stop = (t = !0) => {
              if (t) {
                let { motionValue: t } = this.options;
                t && t.updatedAt !== a.k.now() && this.tick(a.k.now());
              }
              (this.isStopped = !0),
                'idle' !== this.state && (this.teardown(), this.options.onStop?.());
            }),
            o.q.mainThread++,
            (this.options = t),
            this.initAnimation(),
            this.play(),
            !1 === t.autoplay && this.pause();
        }
        initAnimation() {
          let { options: t } = this;
          (0, f.E)(t);
          let {
              type: e = c.i,
              repeat: i = 0,
              repeatDelay: s = 0,
              repeatType: r,
              velocity: a = 0,
            } = t,
            { keyframes: o } = t,
            h = e || c.i;
          h !== c.i &&
            'number' != typeof o[0] &&
            ((this.mixKeyframes = (0, n.F)(y, (0, l.j)(o[0], o[1]))), (o = [0, 100]));
          let u = h({ ...t, keyframes: o });
          'mirror' === r &&
            (this.mirroredGenerator = h({ ...t, keyframes: [...o].reverse(), velocity: -a })),
            null === u.calculatedDuration && (u.calculatedDuration = (0, p.t)(u));
          let { calculatedDuration: d } = u;
          (this.calculatedDuration = d),
            (this.resolvedDuration = d + s),
            (this.totalDuration = this.resolvedDuration * (i + 1) - s),
            (this.generator = u);
        }
        updateTime(t) {
          let e = Math.round(t - this.startTime) * this.playbackSpeed;
          null !== this.holdTime ? (this.currentTime = this.holdTime) : (this.currentTime = e);
        }
        tick(t, e = !1) {
          let {
            generator: i,
            totalDuration: n,
            mixKeyframes: r,
            mirroredGenerator: a,
            resolvedDuration: o,
            calculatedDuration: l,
          } = this;
          if (null === this.startTime) return i.next(0);
          let {
            delay: h = 0,
            keyframes: u,
            repeat: c,
            repeatType: p,
            repeatDelay: f,
            type: v,
            onUpdate: y,
            finalKeyframe: g,
          } = this.options;
          this.speed > 0
            ? (this.startTime = Math.min(this.startTime, t))
            : this.speed < 0 && (this.startTime = Math.min(t - n / this.speed, this.startTime)),
            e ? (this.currentTime = t) : this.updateTime(t);
          let x = this.currentTime - h * (this.playbackSpeed >= 0 ? 1 : -1),
            T = this.playbackSpeed >= 0 ? x < 0 : x > n;
          (this.currentTime = Math.max(x, 0)),
            'finished' === this.state && null === this.holdTime && (this.currentTime = n);
          let w = this.currentTime,
            S = i;
          if (c) {
            let t = Math.min(this.currentTime, n) / o,
              e = Math.floor(t),
              i = t % 1;
            !i && t >= 1 && (i = 1),
              1 === i && e--,
              (e = Math.min(e, c + 1)) % 2 &&
                ('reverse' === p ? ((i = 1 - i), f && (i -= f / o)) : 'mirror' === p && (S = a)),
              (w = (0, s.q)(0, 1, i) * o);
          }
          let b = T ? { done: !1, value: u[0] } : S.next(w);
          r && (b.value = r(b.value));
          let { done: P } = b;
          T ||
            null === l ||
            (P = this.playbackSpeed >= 0 ? this.currentTime >= n : this.currentTime <= 0);
          let A =
            null === this.holdTime &&
            ('finished' === this.state || ('running' === this.state && P));
          return (
            A && v !== d.B && (b.value = (0, m.X)(u, this.options, g, this.speed)),
            y && y(b.value),
            A && this.finish(),
            b
          );
        }
        then(t, e) {
          return this.finished.then(t, e);
        }
        get duration() {
          return (0, r.X)(this.calculatedDuration);
        }
        get time() {
          return (0, r.X)(this.currentTime);
        }
        set time(t) {
          (t = (0, r.f)(t)),
            (this.currentTime = t),
            null === this.startTime || null !== this.holdTime || 0 === this.playbackSpeed
              ? (this.holdTime = t)
              : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed),
            this.driver?.start(!1);
        }
        get speed() {
          return this.playbackSpeed;
        }
        set speed(t) {
          this.updateTime(a.k.now());
          let e = this.playbackSpeed !== t;
          (this.playbackSpeed = t), e && (this.time = (0, r.X)(this.currentTime));
        }
        play() {
          if (this.isStopped) return;
          let { driver: t = u, startTime: e } = this.options;
          this.driver || (this.driver = t(t => this.tick(t))), this.options.onPlay?.();
          let i = this.driver.now();
          'finished' === this.state
            ? (this.updateFinished(), (this.startTime = i))
            : null !== this.holdTime
              ? (this.startTime = i - this.holdTime)
              : this.startTime || (this.startTime = e ?? i),
            'finished' === this.state &&
              this.speed < 0 &&
              (this.startTime += this.calculatedDuration),
            (this.holdTime = null),
            (this.state = 'running'),
            this.driver.start();
        }
        pause() {
          (this.state = 'paused'), this.updateTime(a.k.now()), (this.holdTime = this.currentTime);
        }
        complete() {
          'running' !== this.state && this.play(),
            (this.state = 'finished'),
            (this.holdTime = null);
        }
        finish() {
          this.notifyFinished(),
            this.teardown(),
            (this.state = 'finished'),
            this.options.onComplete?.();
        }
        cancel() {
          (this.holdTime = null),
            (this.startTime = 0),
            this.tick(0),
            this.teardown(),
            this.options.onCancel?.();
        }
        teardown() {
          (this.state = 'idle'),
            this.stopDriver(),
            (this.startTime = this.holdTime = null),
            o.q.mainThread--;
        }
        stopDriver() {
          this.driver && (this.driver.stop(), (this.driver = void 0));
        }
        sample(t) {
          return (this.startTime = 0), this.tick(t, !0);
        }
        attachTimeline(t) {
          return (
            this.options.allowFlatten &&
              ((this.options.type = 'keyframes'),
              (this.options.ease = 'linear'),
              this.initAnimation()),
            this.driver?.stop(),
            t.observe(this)
          );
        }
      }
    },
    1592: (t, e, i) => {
      i.d(e, { B: () => r });
      var n = i(7468),
        s = i(262);
      function r({
        keyframes: t,
        velocity: e = 0,
        power: i = 0.8,
        timeConstant: r = 325,
        bounceDamping: a = 10,
        bounceStiffness: o = 500,
        modifyTarget: l,
        min: h,
        max: u,
        restDelta: d = 0.5,
        restSpeed: c,
      }) {
        let p, m;
        let f = t[0],
          v = { done: !1, value: f },
          y = t => (void 0 !== h && t < h) || (void 0 !== u && t > u),
          g = t =>
            void 0 === h ? u : void 0 === u ? h : Math.abs(h - t) < Math.abs(u - t) ? h : u,
          x = i * e,
          T = f + x,
          w = void 0 === l ? T : l(T);
        w !== T && (x = w - f);
        let S = t => -x * Math.exp(-t / r),
          b = t => w + S(t),
          P = t => {
            let e = S(t),
              i = b(t);
            (v.done = Math.abs(e) <= d), (v.value = v.done ? w : i);
          },
          A = t => {
            y(v.value) &&
              ((p = t),
              (m = (0, n.o)({
                keyframes: [v.value, g(v.value)],
                velocity: (0, s.Y)(b, t, v.value),
                damping: a,
                stiffness: o,
                restDelta: d,
                restSpeed: c,
              })));
          };
        return (
          A(0),
          {
            calculatedDuration: null,
            next: t => {
              let e = !1;
              return (m || void 0 !== p || ((e = !0), P(t), A(t)), void 0 !== p && t >= p)
                ? m.next(t - p)
                : (e || P(t), v);
            },
          }
        );
      }
    },
    8524: (t, e, i) => {
      i.d(e, { i: () => T });
      var n = i(5768);
      let s = (0, n.A)(0.42, 0, 1, 1),
        r = (0, n.A)(0, 0, 0.58, 1),
        a = (0, n.A)(0.42, 0, 0.58, 1),
        o = t => Array.isArray(t) && 'number' != typeof t[0];
      var l = i(5107),
        h = i(6054),
        u = i(4162),
        d = i(9707),
        c = i(1679),
        p = i(6430);
      let m = {
          linear: h.l,
          easeIn: s,
          easeInOut: a,
          easeOut: r,
          circIn: c.po,
          circInOut: c.tn,
          circOut: c.yT,
          backIn: d.dg,
          backInOut: d.ZZ,
          backOut: d.Sz,
          anticipate: u.b,
        },
        f = t => 'string' == typeof t,
        v = t => {
          if ((0, p.D)(t)) {
            (0, l.V)(4 === t.length, 'Cubic bezier arrays must contain four numerical values.');
            let [e, i, s, r] = t;
            return (0, n.A)(e, i, s, r);
          }
          return f(t) ? ((0, l.V)(void 0 !== m[t], `Invalid easing type '${t}'`), m[t]) : t;
        };
      var y = i(1136),
        g = i(9615),
        x = i(1607);
      function T({ duration: t = 300, keyframes: e, times: i, ease: n = 'easeInOut' }) {
        let s = o(n) ? n.map(v) : v(n),
          r = { done: !1, value: e[0] },
          l = (
            i && i.length === e.length
              ? i
              : (function (t) {
                  let e = [0];
                  return (
                    (function (t, e) {
                      let i = t[t.length - 1];
                      for (let n = 1; n <= e; n++) {
                        let s = (0, g.q)(0, e, n);
                        t.push((0, x.k)(i, 1, s));
                      }
                    })(e, t.length - 1),
                    e
                  );
                })(e)
          ).map(e => e * t),
          h = (0, y.G)(l, e, {
            ease: Array.isArray(s) ? s : e.map(() => s || a).splice(0, e.length - 1),
          });
        return { calculatedDuration: t, next: e => ((r.value = h(e)), (r.done = e >= t), r) };
      }
    },
    7468: (t, e, i) => {
      i.d(e, { o: () => m });
      var n = i(5821),
        s = i(300),
        r = i(1432),
        a = i(5431),
        o = i(262);
      let l = {
        stiffness: 100,
        damping: 10,
        mass: 1,
        velocity: 0,
        duration: 800,
        bounce: 0.3,
        visualDuration: 0.3,
        restSpeed: { granular: 0.01, default: 2 },
        restDelta: { granular: 0.005, default: 0.5 },
        minDuration: 0.01,
        maxDuration: 10,
        minDamping: 0.05,
        maxDamping: 1,
      };
      var h = i(5107);
      function u(t, e) {
        return t * Math.sqrt(1 - e * e);
      }
      let d = ['duration', 'bounce'],
        c = ['stiffness', 'damping', 'mass'];
      function p(t, e) {
        return e.some(e => void 0 !== t[e]);
      }
      function m(t = l.visualDuration, e = l.bounce) {
        let i;
        let f = 'object' != typeof t ? { visualDuration: t, keyframes: [0, 1], bounce: e } : t,
          { restSpeed: v, restDelta: y } = f,
          g = f.keyframes[0],
          x = f.keyframes[f.keyframes.length - 1],
          T = { done: !1, value: g },
          {
            stiffness: w,
            damping: S,
            mass: b,
            duration: P,
            velocity: A,
            isResolvedFromDuration: V,
          } = (function (t) {
            let e = {
              velocity: l.velocity,
              stiffness: l.stiffness,
              damping: l.damping,
              mass: l.mass,
              isResolvedFromDuration: !1,
              ...t,
            };
            if (!p(t, c) && p(t, d)) {
              if (t.visualDuration) {
                let i = (2 * Math.PI) / (1.2 * t.visualDuration),
                  s = i * i,
                  r = 2 * (0, n.q)(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s);
                e = { ...e, mass: l.mass, stiffness: s, damping: r };
              } else {
                let i = (function ({
                  duration: t = l.duration,
                  bounce: e = l.bounce,
                  velocity: i = l.velocity,
                  mass: r = l.mass,
                }) {
                  let a, o;
                  (0, h.$)(
                    t <= (0, s.f)(l.maxDuration),
                    'Spring duration must be 10 seconds or less'
                  );
                  let d = 1 - e;
                  (d = (0, n.q)(l.minDamping, l.maxDamping, d)),
                    (t = (0, n.q)(l.minDuration, l.maxDuration, (0, s.X)(t))),
                    d < 1
                      ? ((a = e => {
                          let n = e * d,
                            s = n * t;
                          return 0.001 - ((n - i) / u(e, d)) * Math.exp(-s);
                        }),
                        (o = e => {
                          let n = e * d * t,
                            s = Math.pow(d, 2) * Math.pow(e, 2) * t,
                            r = Math.exp(-n),
                            o = u(Math.pow(e, 2), d);
                          return ((n * i + i - s) * r * (-a(e) + 0.001 > 0 ? -1 : 1)) / o;
                        }))
                      : ((a = e => -0.001 + Math.exp(-e * t) * ((e - i) * t + 1)),
                        (o = e => t * t * (i - e) * Math.exp(-e * t)));
                  let c = (function (t, e, i) {
                    let n = i;
                    for (let i = 1; i < 12; i++) n -= t(n) / e(n);
                    return n;
                  })(a, o, 5 / t);
                  if (((t = (0, s.f)(t)), isNaN(c)))
                    return { stiffness: l.stiffness, damping: l.damping, duration: t };
                  {
                    let e = Math.pow(c, 2) * r;
                    return { stiffness: e, damping: 2 * d * Math.sqrt(r * e), duration: t };
                  }
                })(t);
                (e = { ...e, ...i, mass: l.mass }).isResolvedFromDuration = !0;
              }
            }
            return e;
          })({ ...f, velocity: -(0, s.X)(f.velocity || 0) }),
          M = A || 0,
          k = S / (2 * Math.sqrt(w * b)),
          E = x - g,
          D = (0, s.X)(Math.sqrt(w / b)),
          C = 5 > Math.abs(E);
        if (
          (v || (v = C ? l.restSpeed.granular : l.restSpeed.default),
          y || (y = C ? l.restDelta.granular : l.restDelta.default),
          k < 1)
        ) {
          let t = u(D, k);
          i = e =>
            x -
            Math.exp(-k * D * e) * (((M + k * D * E) / t) * Math.sin(t * e) + E * Math.cos(t * e));
        } else if (1 === k) i = t => x - Math.exp(-D * t) * (E + (M + D * E) * t);
        else {
          let t = D * Math.sqrt(k * k - 1);
          i = e => {
            let i = Math.exp(-k * D * e),
              n = Math.min(t * e, 300);
            return x - (i * ((M + k * D * E) * Math.sinh(n) + t * E * Math.cosh(n))) / t;
          };
        }
        let R = {
          calculatedDuration: (V && P) || null,
          next: t => {
            let e = i(t);
            if (V) T.done = t >= P;
            else {
              let n = 0 === t ? M : 0;
              k < 1 && (n = 0 === t ? (0, s.f)(M) : (0, o.Y)(i, t, e));
              let r = Math.abs(n) <= v,
                a = Math.abs(x - e) <= y;
              T.done = r && a;
            }
            return (T.value = T.done ? x : e), T;
          },
          toString: () => {
            let t = Math.min((0, a.t)(R), a.Y),
              e = (0, r.K)(e => R.next(t * e).value, t, 30);
            return t + 'ms ' + e;
          },
          toTransition: () => {},
        };
        return R;
      }
      m.applyToOptions = t => {
        let e = (function (t, e = 100, i) {
          let n = i({ ...t, keyframes: [0, e] }),
            r = Math.min((0, a.t)(n), a.Y);
          return { type: 'keyframes', ease: t => n.next(r * t).value / e, duration: (0, s.X)(r) };
        })(t, 100, m);
        return (t.ease = e.ease), (t.duration = (0, s.f)(e.duration)), (t.type = 'keyframes'), t;
      };
    },
    5431: (t, e, i) => {
      i.d(e, { Y: () => n, t: () => s });
      let n = 2e4;
      function s(t) {
        let e = 0,
          i = t.next(e);
        for (; !i.done && e < n; ) (e += 50), (i = t.next(e));
        return e >= n ? 1 / 0 : e;
      }
    },
    262: (t, e, i) => {
      i.d(e, { Y: () => s });
      var n = i(3700);
      function s(t, e, i) {
        let s = Math.max(e - 5, 0);
        return (0, n.f)(i - t(s), e - s);
      }
    },
    6881: (t, e, i) => {
      i.d(e, { X: () => s });
      let n = t => null !== t;
      function s(t, { repeat: e, repeatType: i = 'loop' }, r, a = 1) {
        let o = t.filter(n),
          l = a < 0 || (e && 'loop' !== i && e % 2 == 1) ? 0 : o.length - 1;
        return l && void 0 !== r ? r : o[l];
      }
    },
    4537: (t, e, i) => {
      i.d(e, { q: () => n });
      class n {
        constructor() {
          this.updateFinished();
        }
        get finished() {
          return this._finished;
        }
        updateFinished() {
          this._finished = new Promise(t => {
            this.resolve = t;
          });
        }
        notifyFinished() {
          this.resolve();
        }
        then(t, e) {
          return this.finished.then(t, e);
        }
      }
    },
    7309: (t, e, i) => {
      i.d(e, { j: () => s, p: () => a });
      let n = t => e => 'string' == typeof e && e.startsWith(t),
        s = n('--'),
        r = n('var(--'),
        a = t => !!r(t) && o.test(t.split('/*')[0].trim()),
        o = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
    },
    4407: (t, e, i) => {
      i.d(e, { E: () => o });
      var n = i(1592),
        s = i(8524),
        r = i(7468);
      let a = { decay: n.B, inertia: n.B, tween: s.i, keyframes: s.i, spring: r.o };
      function o(t) {
        'string' == typeof t.type && (t.type = a[t.type]);
      }
    },
    1432: (t, e, i) => {
      i.d(e, { K: () => n });
      let n = (t, e, i = 10) => {
        let n = '',
          s = Math.max(Math.round(e / i), 2);
        for (let e = 0; e < s; e++) n += t(e / (s - 1)) + ', ';
        return `linear(${n.substring(0, n.length - 2)})`;
      };
    },
    506: (t, e, i) => {
      i.d(e, { I: () => a });
      var n = i(4148);
      let s = [
        'setup',
        'read',
        'resolveKeyframes',
        'preUpdate',
        'update',
        'preRender',
        'render',
        'postRender',
      ];
      var r = i(5853);
      function a(t, e) {
        let i = !1,
          a = !0,
          o = { delta: 0, timestamp: 0, isProcessing: !1 },
          l = () => (i = !0),
          h = s.reduce(
            (t, i) => (
              (t[i] = (function (t, e) {
                let i = new Set(),
                  n = new Set(),
                  s = !1,
                  a = !1,
                  o = new WeakSet(),
                  l = { delta: 0, timestamp: 0, isProcessing: !1 },
                  h = 0;
                function u(e) {
                  o.has(e) && (d.schedule(e), t()), h++, e(l);
                }
                let d = {
                  schedule: (t, e = !1, r = !1) => {
                    let a = r && s ? i : n;
                    return e && o.add(t), a.has(t) || a.add(t), t;
                  },
                  cancel: t => {
                    n.delete(t), o.delete(t);
                  },
                  process: t => {
                    if (((l = t), s)) {
                      a = !0;
                      return;
                    }
                    (s = !0),
                      ([i, n] = [n, i]),
                      i.forEach(u),
                      e && r.Q.value && r.Q.value.frameloop[e].push(h),
                      (h = 0),
                      i.clear(),
                      (s = !1),
                      a && ((a = !1), d.process(t));
                  },
                };
                return d;
              })(l, e ? i : void 0)),
              t
            ),
            {}
          ),
          {
            setup: u,
            read: d,
            resolveKeyframes: c,
            preUpdate: p,
            update: m,
            preRender: f,
            render: v,
            postRender: y,
          } = h,
          g = () => {
            let s = n.W.useManualTiming ? o.timestamp : performance.now();
            (i = !1),
              n.W.useManualTiming ||
                (o.delta = a ? 1e3 / 60 : Math.max(Math.min(s - o.timestamp, 40), 1)),
              (o.timestamp = s),
              (o.isProcessing = !0),
              u.process(o),
              d.process(o),
              c.process(o),
              p.process(o),
              m.process(o),
              f.process(o),
              v.process(o),
              y.process(o),
              (o.isProcessing = !1),
              i && e && ((a = !1), t(g));
          },
          x = () => {
            (i = !0), (a = !0), o.isProcessing || t(g);
          };
        return {
          schedule: s.reduce((t, e) => {
            let n = h[e];
            return (t[e] = (t, e = !1, s = !1) => (i || x(), n.schedule(t, e, s))), t;
          }, {}),
          cancel: t => {
            for (let e = 0; e < s.length; e++) h[s[e]].cancel(t);
          },
          state: o,
          steps: h,
        };
      }
    },
    3932: (t, e, i) => {
      i.d(e, { Gt: () => s, PP: () => o, WG: () => r, uv: () => a });
      var n = i(6054);
      let {
        schedule: s,
        cancel: r,
        state: a,
        steps: o,
      } = (0, i(506).I)(
        'undefined' != typeof requestAnimationFrame ? requestAnimationFrame : n.l,
        !0
      );
    },
    5850: (t, e, i) => {
      let n;
      i.d(e, { k: () => o });
      var s = i(4148),
        r = i(3932);
      function a() {
        n = void 0;
      }
      let o = {
        now: () => (
          void 0 === n &&
            o.set(r.uv.isProcessing || s.W.useManualTiming ? r.uv.timestamp : performance.now()),
          n
        ),
        set: t => {
          (n = t), queueMicrotask(a);
        },
      };
    },
    7971: (t, e, i) => {
      i.d(e, { q: () => n });
      let n = { layout: 0, mainThread: 0, waapi: 0 };
    },
    5853: (t, e, i) => {
      i.d(e, { Q: () => n });
      let n = { value: null, addProjectionMetrics: null };
    },
    1136: (t, e, i) => {
      i.d(e, { G: () => u });
      var n = i(4148),
        s = i(6054),
        r = i(1046),
        a = i(5107),
        o = i(9615),
        l = i(5821),
        h = i(9674);
      function u(t, e, { clamp: i = !0, ease: d, mixer: c } = {}) {
        let p = t.length;
        if (
          ((0, a.V)(p === e.length, 'Both input and output ranges must be the same length'),
          1 === p)
        )
          return () => e[0];
        if (2 === p && e[0] === e[1]) return () => e[1];
        let m = t[0] === t[1];
        t[0] > t[p - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
        let f = (function (t, e, i) {
            let a = [],
              o = i || n.W.mix || h.j,
              l = t.length - 1;
            for (let i = 0; i < l; i++) {
              let n = o(t[i], t[i + 1]);
              if (e) {
                let t = Array.isArray(e) ? e[i] || s.l : e;
                n = (0, r.F)(t, n);
              }
              a.push(n);
            }
            return a;
          })(e, d, c),
          v = f.length,
          y = i => {
            if (m && i < t[0]) return e[0];
            let n = 0;
            if (v > 1) for (; n < t.length - 2 && !(i < t[n + 1]); n++);
            let s = (0, o.q)(t[n], t[n + 1], i);
            return f[n](s);
          };
        return i ? e => y((0, l.q)(t[0], t[p - 1], e)) : y;
      }
    },
    9674: (t, e, i) => {
      i.d(e, { j: () => A });
      var n = i(1046),
        s = i(5107),
        r = i(7309),
        a = i(8207),
        o = i(663),
        l = i(4964),
        h = i(1965);
      function u(t, e, i) {
        return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
          ? t + (e - t) * 6 * i
          : i < 0.5
            ? e
            : i < 2 / 3
              ? t + (e - t) * (2 / 3 - i) * 6
              : t;
      }
      var d = i(4441);
      function c(t, e) {
        return i => (i > 0 ? e : t);
      }
      var p = i(1607);
      let m = (t, e, i) => {
          let n = t * t,
            s = i * (e * e - n) + n;
          return s < 0 ? 0 : Math.sqrt(s);
        },
        f = [l.u, d.B, h.V],
        v = t => f.find(e => e.test(t));
      function y(t) {
        let e = v(t);
        if (
          ((0, s.$)(
            !!e,
            `'${t}' is not an animatable color. Use the equivalent color code instead.`
          ),
          !e)
        )
          return !1;
        let i = e.parse(t);
        return (
          e === h.V &&
            (i = (function ({ hue: t, saturation: e, lightness: i, alpha: n }) {
              (t /= 360), (i /= 100);
              let s = 0,
                r = 0,
                a = 0;
              if ((e /= 100)) {
                let n = i < 0.5 ? i * (1 + e) : i + e - i * e,
                  o = 2 * i - n;
                (s = u(o, n, t + 1 / 3)), (r = u(o, n, t)), (a = u(o, n, t - 1 / 3));
              } else s = r = a = i;
              return {
                red: Math.round(255 * s),
                green: Math.round(255 * r),
                blue: Math.round(255 * a),
                alpha: n,
              };
            })(i)),
          i
        );
      }
      let g = (t, e) => {
          let i = y(t),
            n = y(e);
          if (!i || !n) return c(t, e);
          let s = { ...i };
          return t => (
            (s.red = m(i.red, n.red, t)),
            (s.green = m(i.green, n.green, t)),
            (s.blue = m(i.blue, n.blue, t)),
            (s.alpha = (0, p.k)(i.alpha, n.alpha, t)),
            d.B.transform(s)
          );
        },
        x = new Set(['none', 'hidden']);
      function T(t, e) {
        return i => (0, p.k)(t, e, i);
      }
      function w(t) {
        return 'number' == typeof t
          ? T
          : 'string' == typeof t
            ? (0, r.p)(t)
              ? c
              : a.y.test(t)
                ? g
                : P
            : Array.isArray(t)
              ? S
              : 'object' == typeof t
                ? a.y.test(t)
                  ? g
                  : b
                : c;
      }
      function S(t, e) {
        let i = [...t],
          n = i.length,
          s = t.map((t, i) => w(t)(t, e[i]));
        return t => {
          for (let e = 0; e < n; e++) i[e] = s[e](t);
          return i;
        };
      }
      function b(t, e) {
        let i = { ...t, ...e },
          n = {};
        for (let s in i) void 0 !== t[s] && void 0 !== e[s] && (n[s] = w(t[s])(t[s], e[s]));
        return t => {
          for (let e in n) i[e] = n[e](t);
          return i;
        };
      }
      let P = (t, e) => {
        let i = o.f.createTransformer(e),
          r = (0, o.V)(t),
          a = (0, o.V)(e);
        return r.indexes.var.length === a.indexes.var.length &&
          r.indexes.color.length === a.indexes.color.length &&
          r.indexes.number.length >= a.indexes.number.length
          ? (x.has(t) && !a.values.length) || (x.has(e) && !r.values.length)
            ? (function (t, e) {
                return x.has(t) ? i => (i <= 0 ? t : e) : i => (i >= 1 ? e : t);
              })(t, e)
            : (0, n.F)(
                S(
                  (function (t, e) {
                    let i = [],
                      n = { color: 0, var: 0, number: 0 };
                    for (let s = 0; s < e.values.length; s++) {
                      let r = e.types[s],
                        a = t.indexes[r][n[r]],
                        o = t.values[a] ?? 0;
                      (i[s] = o), n[r]++;
                    }
                    return i;
                  })(r, a),
                  a.values
                ),
                i
              )
          : ((0, s.$)(
              !0,
              `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`
            ),
            c(t, e));
      };
      function A(t, e, i) {
        return 'number' == typeof t && 'number' == typeof e && 'number' == typeof i
          ? (0, p.k)(t, e, i)
          : w(t)(t, e);
      }
    },
    1607: (t, e, i) => {
      i.d(e, { k: () => n });
      let n = (t, e, i) => t + (e - t) * i;
    },
    9421: (t, e, i) => {
      i.d(e, { OQ: () => u, bt: () => l });
      var n = i(2539),
        s = i(3700),
        r = i(5850),
        a = i(3932);
      let o = t => !isNaN(parseFloat(t)),
        l = { current: void 0 };
      class h {
        constructor(t, e = {}) {
          (this.canTrackVelocity = null),
            (this.events = {}),
            (this.updateAndNotify = (t, e = !0) => {
              let i = r.k.now();
              if (
                (this.updatedAt !== i && this.setPrevFrameValue(),
                (this.prev = this.current),
                this.setCurrent(t),
                this.current !== this.prev &&
                  (this.events.change?.notify(this.current), this.dependents))
              )
                for (let t of this.dependents) t.dirty();
              e && this.events.renderRequest?.notify(this.current);
            }),
            (this.hasAnimated = !1),
            this.setCurrent(t),
            (this.owner = e.owner);
        }
        setCurrent(t) {
          (this.current = t),
            (this.updatedAt = r.k.now()),
            null === this.canTrackVelocity &&
              void 0 !== t &&
              (this.canTrackVelocity = o(this.current));
        }
        setPrevFrameValue(t = this.current) {
          (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt);
        }
        onChange(t) {
          return this.on('change', t);
        }
        on(t, e) {
          this.events[t] || (this.events[t] = new n.v());
          let i = this.events[t].add(e);
          return 'change' === t
            ? () => {
                i(),
                  a.Gt.read(() => {
                    this.events.change.getSize() || this.stop();
                  });
              }
            : i;
        }
        clearListeners() {
          for (let t in this.events) this.events[t].clear();
        }
        attach(t, e) {
          (this.passiveEffect = t), (this.stopPassiveEffect = e);
        }
        set(t, e = !0) {
          e && this.passiveEffect
            ? this.passiveEffect(t, this.updateAndNotify)
            : this.updateAndNotify(t, e);
        }
        setWithVelocity(t, e, i) {
          this.set(e),
            (this.prev = void 0),
            (this.prevFrameValue = t),
            (this.prevUpdatedAt = this.updatedAt - i);
        }
        jump(t, e = !0) {
          this.updateAndNotify(t),
            (this.prev = t),
            (this.prevUpdatedAt = this.prevFrameValue = void 0),
            e && this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
        }
        dirty() {
          this.events.change?.notify(this.current);
        }
        addDependent(t) {
          this.dependents || (this.dependents = new Set()), this.dependents.add(t);
        }
        removeDependent(t) {
          this.dependents && this.dependents.delete(t);
        }
        get() {
          return l.current && l.current.push(this), this.current;
        }
        getPrevious() {
          return this.prev;
        }
        getVelocity() {
          let t = r.k.now();
          if (!this.canTrackVelocity || void 0 === this.prevFrameValue || t - this.updatedAt > 30)
            return 0;
          let e = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
          return (0, s.f)(parseFloat(this.current) - parseFloat(this.prevFrameValue), e);
        }
        start(t) {
          return (
            this.stop(),
            new Promise(e => {
              (this.hasAnimated = !0),
                (this.animation = t(e)),
                this.events.animationStart && this.events.animationStart.notify();
            }).then(() => {
              this.events.animationComplete && this.events.animationComplete.notify(),
                this.clearAnimation();
            })
          );
        }
        stop() {
          this.animation &&
            (this.animation.stop(),
            this.events.animationCancel && this.events.animationCancel.notify()),
            this.clearAnimation();
        }
        isAnimating() {
          return !!this.animation;
        }
        clearAnimation() {
          delete this.animation;
        }
        destroy() {
          this.dependents?.clear(),
            this.events.destroy?.notify(),
            this.clearListeners(),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
        }
      }
      function u(t, e) {
        return new h(t, e);
      }
    },
    4964: (t, e, i) => {
      i.d(e, { u: () => s });
      var n = i(4441);
      let s = {
        test: (0, i(8196).$)('#'),
        parse: function (t) {
          let e = '',
            i = '',
            n = '',
            s = '';
          return (
            t.length > 5
              ? ((e = t.substring(1, 3)),
                (i = t.substring(3, 5)),
                (n = t.substring(5, 7)),
                (s = t.substring(7, 9)))
              : ((e = t.substring(1, 2)),
                (i = t.substring(2, 3)),
                (n = t.substring(3, 4)),
                (s = t.substring(4, 5)),
                (e += e),
                (i += i),
                (n += n),
                (s += s)),
            {
              red: parseInt(e, 16),
              green: parseInt(i, 16),
              blue: parseInt(n, 16),
              alpha: s ? parseInt(s, 16) / 255 : 1,
            }
          );
        },
        transform: n.B.transform,
      };
    },
    1965: (t, e, i) => {
      i.d(e, { V: () => o });
      var n = i(2264),
        s = i(3137),
        r = i(8480),
        a = i(8196);
      let o = {
        test: (0, a.$)('hsl', 'hue'),
        parse: (0, a.q)('hue', 'saturation', 'lightness'),
        transform: ({ hue: t, saturation: e, lightness: i, alpha: a = 1 }) =>
          'hsla(' +
          Math.round(t) +
          ', ' +
          s.KN.transform((0, r.a)(e)) +
          ', ' +
          s.KN.transform((0, r.a)(i)) +
          ', ' +
          (0, r.a)(n.X4.transform(a)) +
          ')',
      };
    },
    8207: (t, e, i) => {
      i.d(e, { y: () => a });
      var n = i(4964),
        s = i(1965),
        r = i(4441);
      let a = {
        test: t => r.B.test(t) || n.u.test(t) || s.V.test(t),
        parse: t => (r.B.test(t) ? r.B.parse(t) : s.V.test(t) ? s.V.parse(t) : n.u.parse(t)),
        transform: t =>
          'string' == typeof t ? t : t.hasOwnProperty('red') ? r.B.transform(t) : s.V.transform(t),
      };
    },
    4441: (t, e, i) => {
      i.d(e, { B: () => h });
      var n = i(5821),
        s = i(2264),
        r = i(8480),
        a = i(8196);
      let o = t => (0, n.q)(0, 255, t),
        l = { ...s.ai, transform: t => Math.round(o(t)) },
        h = {
          test: (0, a.$)('rgb', 'red'),
          parse: (0, a.q)('red', 'green', 'blue'),
          transform: ({ red: t, green: e, blue: i, alpha: n = 1 }) =>
            'rgba(' +
            l.transform(t) +
            ', ' +
            l.transform(e) +
            ', ' +
            l.transform(i) +
            ', ' +
            (0, r.a)(s.X4.transform(n)) +
            ')',
        };
    },
    8196: (t, e, i) => {
      i.d(e, { $: () => r, q: () => a });
      var n = i(4885);
      let s =
          /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
        r = (t, e) => i =>
          !!(
            ('string' == typeof i && s.test(i) && i.startsWith(t)) ||
            (e && null != i && Object.prototype.hasOwnProperty.call(i, e))
          ),
        a = (t, e, i) => s => {
          if ('string' != typeof s) return s;
          let [r, a, o, l] = s.match(n.S);
          return {
            [t]: parseFloat(r),
            [e]: parseFloat(a),
            [i]: parseFloat(o),
            alpha: void 0 !== l ? parseFloat(l) : 1,
          };
        };
    },
    663: (t, e, i) => {
      i.d(e, { V: () => u, f: () => m });
      var n = i(8207);
      let s =
        /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
      var r = i(4885),
        a = i(8480);
      let o = 'number',
        l = 'color',
        h =
          /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
      function u(t) {
        let e = t.toString(),
          i = [],
          s = { color: [], number: [], var: [] },
          r = [],
          a = 0,
          u = e
            .replace(
              h,
              t => (
                n.y.test(t)
                  ? (s.color.push(a), r.push(l), i.push(n.y.parse(t)))
                  : t.startsWith('var(')
                    ? (s.var.push(a), r.push('var'), i.push(t))
                    : (s.number.push(a), r.push(o), i.push(parseFloat(t))),
                ++a,
                '${}'
              )
            )
            .split('${}');
        return { values: i, split: u, indexes: s, types: r };
      }
      function d(t) {
        return u(t).values;
      }
      function c(t) {
        let { split: e, types: i } = u(t),
          s = e.length;
        return t => {
          let r = '';
          for (let h = 0; h < s; h++)
            if (((r += e[h]), void 0 !== t[h])) {
              let e = i[h];
              e === o ? (r += (0, a.a)(t[h])) : e === l ? (r += n.y.transform(t[h])) : (r += t[h]);
            }
          return r;
        };
      }
      let p = t => ('number' == typeof t ? 0 : t),
        m = {
          test: function (t) {
            return (
              isNaN(t) &&
              'string' == typeof t &&
              (t.match(r.S)?.length || 0) + (t.match(s)?.length || 0) > 0
            );
          },
          parse: d,
          createTransformer: c,
          getAnimatableNone: function (t) {
            let e = d(t);
            return c(t)(e.map(p));
          },
        };
    },
    2264: (t, e, i) => {
      i.d(e, { X4: () => r, ai: () => s, hs: () => a });
      var n = i(5821);
      let s = { test: t => 'number' == typeof t, parse: parseFloat, transform: t => t },
        r = { ...s, transform: t => (0, n.q)(0, 1, t) },
        a = { ...s, default: 1 };
    },
    3137: (t, e, i) => {
      i.d(e, { KN: () => r, gQ: () => h, px: () => a, uj: () => s, vh: () => o, vw: () => l });
      let n = t => ({
          test: e => 'string' == typeof e && e.endsWith(t) && 1 === e.split(' ').length,
          parse: parseFloat,
          transform: e => `${e}${t}`,
        }),
        s = n('deg'),
        r = n('%'),
        a = n('px'),
        o = n('vh'),
        l = n('vw'),
        h = { ...r, parse: t => r.parse(t) / 100, transform: t => r.transform(100 * t) };
    },
    4885: (t, e, i) => {
      i.d(e, { S: () => n });
      let n = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
    },
    8480: (t, e, i) => {
      i.d(e, { a: () => n });
      let n = t => Math.round(1e5 * t) / 1e5;
    },
    9356: (t, e, i) => {
      i.d(e, { S: () => n });
      let n = t => !!(t && t.getVelocity);
    },
    1555: (t, e, i) => {
      function n(t, e) {
        -1 === t.indexOf(e) && t.push(e);
      }
      function s(t, e) {
        let i = t.indexOf(e);
        i > -1 && t.splice(i, 1);
      }
      i.d(e, { Ai: () => s, Kq: () => n });
    },
    5821: (t, e, i) => {
      i.d(e, { q: () => n });
      let n = (t, e, i) => (i > e ? e : i < t ? t : i);
    },
    4162: (t, e, i) => {
      i.d(e, { b: () => s });
      var n = i(9707);
      let s = t => ((t *= 2) < 1 ? 0.5 * (0, n.dg)(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))));
    },
    9707: (t, e, i) => {
      i.d(e, { Sz: () => a, ZZ: () => l, dg: () => o });
      var n = i(5768),
        s = i(8890),
        r = i(4641);
      let a = (0, n.A)(0.33, 1.53, 0.69, 0.99),
        o = (0, r.G)(a),
        l = (0, s.V)(o);
    },
    1679: (t, e, i) => {
      i.d(e, { po: () => r, tn: () => o, yT: () => a });
      var n = i(8890),
        s = i(4641);
      let r = t => 1 - Math.sin(Math.acos(t)),
        a = (0, s.G)(r),
        o = (0, n.V)(r);
    },
    5768: (t, e, i) => {
      i.d(e, { A: () => r });
      var n = i(6054);
      let s = (t, e, i) => (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t;
      function r(t, e, i, r) {
        if (t === e && i === r) return n.l;
        let a = e =>
          (function (t, e, i, n, r) {
            let a, o;
            let l = 0;
            do (a = s((o = e + (i - e) / 2), n, r) - t) > 0 ? (i = o) : (e = o);
            while (Math.abs(a) > 1e-7 && ++l < 12);
            return o;
          })(e, 0, 1, t, i);
        return t => (0 === t || 1 === t ? t : s(a(t), e, r));
      }
    },
    8890: (t, e, i) => {
      i.d(e, { V: () => n });
      let n = t => e => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2);
    },
    4641: (t, e, i) => {
      i.d(e, { G: () => n });
      let n = t => e => 1 - t(1 - e);
    },
    6430: (t, e, i) => {
      i.d(e, { D: () => n });
      let n = t => Array.isArray(t) && 'number' == typeof t[0];
    },
    5107: (t, e, i) => {
      i.d(e, { $: () => n, V: () => s });
      let n = () => {},
        s = () => {};
    },
    4148: (t, e, i) => {
      i.d(e, { W: () => n });
      let n = {};
    },
    6054: (t, e, i) => {
      i.d(e, { l: () => n });
      let n = t => t;
    },
    1046: (t, e, i) => {
      i.d(e, { F: () => s });
      let n = (t, e) => i => e(t(i)),
        s = (...t) => t.reduce(n);
    },
    9615: (t, e, i) => {
      i.d(e, { q: () => n });
      let n = (t, e, i) => {
        let n = e - t;
        return 0 === n ? 1 : (i - t) / n;
      };
    },
    2539: (t, e, i) => {
      i.d(e, { v: () => s });
      var n = i(1555);
      class s {
        constructor() {
          this.subscriptions = [];
        }
        add(t) {
          return (0, n.Kq)(this.subscriptions, t), () => (0, n.Ai)(this.subscriptions, t);
        }
        notify(t, e, i) {
          let n = this.subscriptions.length;
          if (n) {
            if (1 === n) this.subscriptions[0](t, e, i);
            else
              for (let s = 0; s < n; s++) {
                let n = this.subscriptions[s];
                n && n(t, e, i);
              }
          }
        }
        getSize() {
          return this.subscriptions.length;
        }
        clear() {
          this.subscriptions.length = 0;
        }
      }
    },
    300: (t, e, i) => {
      i.d(e, { X: () => s, f: () => n });
      let n = t => 1e3 * t,
        s = t => t / 1e3;
    },
    3700: (t, e, i) => {
      i.d(e, { f: () => n });
      function n(t, e) {
        return e ? (1e3 / e) * t : 0;
      }
    },
  },
]);
