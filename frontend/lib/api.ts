const rawBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8001";
const sanitizedBase = rawBase.replace(/\/+$/, "");

export const API_BASE = `${sanitizedBase}/api`;
