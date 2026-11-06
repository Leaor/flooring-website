import type { NextConfig } from 'next';
import path from 'node:path';
const config: NextConfig = { output: 'standalone', outputFileTracingRoot: path.join(process.cwd(), '../..'), poweredByHeader: false, allowedDevOrigins: ['127.0.0.1'], agentRules: false, experimental: { cpus: 2 }, async headers() { return [{ source: '/:path*', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }, { key: 'X-Frame-Options', value: 'DENY' }, { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }] }]; } };
export default config;
