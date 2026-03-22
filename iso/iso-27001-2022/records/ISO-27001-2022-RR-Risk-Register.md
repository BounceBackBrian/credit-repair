# ISO-27001-2022-RR — Risk Register

**Owner:** 3B Credit Builder (3Boost Club)  
**Version:** v1.0  
**Status:** Approved  
**Last Updated:** 2026-01-17  

---## Scale
Likelihood: 1 (Low) – 5 (High)  
Impact: 1 (Low) – 5 (High)  
Risk Score = Likelihood × Impact

## Risks
| ID | Risk | Area | Likelihood | Impact | Score | Treatment | Owner | Evidence |
|---|---|---|---:|---:|---:|---|---|---|
| RR-001 | Cross-tenant data exposure | RLS/DB | 2 | 5 | 10 | Enforce viewer_can_see_threeb + RLS tests | Eng | RLS policies + test matrix |
| RR-002 | Unauthorized file access | Vault | 2 | 5 | 10 | Private buckets + signed URLs + role gating | Eng | vault-upload/download |
| RR-003 | Malware upload | Vault | 3 | 4 | 12 | Quarantine lifecycle + scanning blueprint | Eng | vault_files state + scan plan |
| RR-004 | KPI refresh failure undetected | Ops | 3 | 3 | 9 | Logging + alerts to Telegram | Ops | refresh logs + alerts |
| RR-005 | Token/secret leakage | Platform | 2 | 5 | 10 | Secret rotation + least privilege | Ops | secrets policy |
| RR-006 | Improper role escalation | Auth/Roles | 2 | 5 | 10 | Server-side enforcement, audit logs | Eng | Edge checks + system_events |

Approved By: __________________  
Date: __________________