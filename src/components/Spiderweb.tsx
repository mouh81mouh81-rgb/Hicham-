/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface SpiderwebProps {
  className?: string;
  size?: number;
  opacity?: number;
}

export function SpiderwebCorner({ className = '', size = 110, opacity = 0.22 }: SpiderwebProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Anchor lines originating from the corner (0,0) */}
      <line x1="0" y1="0" x2="120" y2="0" stroke="#4a3728" strokeWidth="0.8" />
      <line x1="0" y1="0" x2="115" y2="28" stroke="#4a3728" strokeWidth="0.75" />
      <line x1="0" y1="0" x2="102" y2="55" stroke="#4a3728" strokeWidth="0.75" />
      <line x1="0" y1="0" x2="80" y2="80" stroke="#4a3728" strokeWidth="0.8" />
      <line x1="0" y1="0" x2="55" y2="102" stroke="#4a3728" strokeWidth="0.75" />
      <line x1="0" y1="0" x2="28" y2="115" stroke="#4a3728" strokeWidth="0.75" />
      <line x1="0" y1="0" x2="0" y2="120" stroke="#4a3728" strokeWidth="0.8" />

      {/* Concentric curved spiral webs connecting the spokes */}
      {/* Arc 1 */}
      <path
        d="M 22,0 Q 20,6 18,10 Q 15,15 12,18 Q 6,20 0,22"
        stroke="#4a3728"
        strokeWidth="0.65"
        fill="none"
      />
      {/* Arc 2 */}
      <path
        d="M 42,0 Q 38,12 34,19 Q 28,28 22,34 Q 12,38 0,42"
        stroke="#4a3728"
        strokeWidth="0.65"
        fill="none"
      />
      {/* Arc 3 */}
      <path
        d="M 64,0 Q 58,18 51,29 Q 42,42 33,51 Q 18,58 0,64"
        stroke="#4a3728"
        strokeWidth="0.65"
        fill="none"
      />
      {/* Arc 4 */}
      <path
        d="M 88,0 Q 80,24 71,40 Q 58,58 46,71 Q 24,80 0,88"
        stroke="#4a3728"
        strokeWidth="0.6"
        fill="none"
      />
      {/* Arc 5 */}
      <path
        d="M 112,0 Q 102,30 90,51 Q 74,74 58,90 Q 30,102 0,112"
        stroke="#4a3728"
        strokeWidth="0.6"
        fill="none"
      />

      {/* Delicate tiny spider dangling from a thread */}
      <line x1="48" y1="48" x2="56" y2="70" stroke="#4a3728" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="56" cy="72" r="1.8" fill="#3a2a1d" />
      <circle cx="56" cy="74.5" r="2.4" fill="#3a2a1d" />
      {/* Tiny legs */}
      <path
        d="M 54,71 Q 50,69 49,72 M 58,71 Q 62,69 63,72 M 54,74 Q 48,74 48,77 M 58,74 Q 64,74 64,77"
        stroke="#3a2a1d"
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  );
}
