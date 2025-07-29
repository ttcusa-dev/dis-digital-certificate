<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Responsive Gauge with HTML Center</title>
  <style>
    /* reset & base */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #121212;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: sans-serif;
    }

    .gauge-wrapper {
      width: 400px;         /* or whatever parent‑container size you want */
      aspect-ratio: 1 / 1;
    }
    .gauge-container {
      width: 100%;
      height: 100%;
      animation: scaleIn 1s ease-out forwards;
    }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    @keyframes scaleIn {
      0%   { transform: scale(0); }
      80%  { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  </style>
</head>
<body>

  <div class="gauge-wrapper">
    <div class="gauge-container">
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        <!-- Outer circle -->
        <circle cx="100" cy="100" r="96" fill="none" stroke="#00BFFF" stroke-width="2"/>

        <!-- Background & progress arcs -->
        <path id="bgArc"    fill="none" stroke="white"    stroke-width="20" />
        <path id="progress" fill="none" stroke="#00BFFF" stroke-width="20" />

        <!-- Pointer -->
        <polygon id="pointer" points="0,0 -4,10 4,10" fill="#00BFFF" />

        <!-- HTML inside SVG: this <div> will scale with the gauge -->
        <foreignObject x="50" y="50" width="100" height="100">
          <div xmlns="http://www.w3.org/1999/xhtml"
               style="
                 width:100%; height:100%;
                 display:flex;
                 align-items:center;
                 justify-content:center;
                 font-size:30px;
                 font-weight:bold;
                 color:white;
                 ">
            <!-- Replace this with any HTML you like -->
             VVS1
          </div>
        </foreignObject>
      </svg>
    </div>
  </div>

  <script>
    function initGauge(bgId, progId, ptrId, percent) {
      const bg   = document.getElementById(bgId);
      const prog = document.getElementById(progId);
      const ptr  = document.getElementById(ptrId);

      const cx            = 100;
      const cy            = 100;
      const radius        = 80;
      const pointerRadius = 70;     // distance from center
      const startAngle    = 225;
      const sweepAngle    = 270;
      const duration      = 2000;

      function polarToCartesian(cx, cy, r, deg) {
        const rad = (deg - 90) * Math.PI/180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
      }

      function describeArc(cx, cy, r, start, end, cw = false) {
        const p1 = polarToCartesian(cx, cy, r, start);
        const p2 = polarToCartesian(cx, cy, r, end);
        const largeArc = Math.abs(end - start) > 180 ? 1 : 0;
        const sweep    = cw ? 1 : 0;
        return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${p2.x} ${p2.y}`;
      }

      // draw full arc
      const endAngle = startAngle + sweepAngle;
      const d        = describeArc(cx, cy, radius, startAngle, endAngle, true);
      bg.setAttribute('d', d);
      prog.setAttribute('d', d);

      // place pointer at start
      const init = polarToCartesian(cx, cy, pointerRadius, startAngle);
      ptr.setAttribute('transform', `translate(${init.x},${init.y}) rotate(${startAngle})`);

      // animate
      setTimeout(() => {
        const L = prog.getTotalLength();
        prog.setAttribute('stroke-dasharray', L);
        prog.setAttribute('stroke-dashoffset', L);

        const t0 = performance.now();
        function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

        function frame(t) {
          const frac = Math.min((t - t0)/duration, 1);
          const cur  = percent * easeOut(frac);

          prog.setAttribute('stroke-dashoffset', L * (1 - cur));

          const ang = startAngle + sweepAngle * cur;
          const pos = polarToCartesian(cx, cy, pointerRadius, ang);
          ptr.setAttribute('transform', `translate(${pos.x},${pos.y}) rotate(${ang})`);

          if (frac < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      }, 300);
    }

    // initialize to 75% on the gauge arc; center HTML remains static
    initGauge('bgArc','progress','pointer', 0.90);
  </script>

</body>
</html>