# ISO-27001-2022-SOA — Statement of Applicability (SoA)

**Owner:** 3B Credit Builder (3Boost Club)  
**Version:** v1.0  
**Status:** Approved  
**Last Updated:** 2026-01-17  

---## Scope
Applies to 3B Credit Builder including Analyzer, Vault, mapping, dashboards, and operational processes.

## Control Selection Approach
Controls selected based on risk assessment and system architecture:
- Tenant isolation, RLS, signed URLs, audit logging, monitoring, secure development.

## Annex A Control Mapping (High-Level)
> Note: This is a practical SoA starter. Expand with full Annex A list as needed.

| Control Area | Applicable | Rationale | Evidence |
|---|---:|---|---|
| Access control | Yes | Multi-role system; tenant isolation required | RLS policies, viewer_can_see_threeb, Edge role gating |
| Cryptography | Yes | Data protection at rest/in transit | TLS everywhere, encrypted storage, signed URLs |
| Logging & monitoring | Yes | Audit-defensible enforcement | system_events, vault_events, Grafana dashboards |
| Secure development | Yes | Edge functions + analyzer logic | SDLC procedure, reviews, test matrix |
| Supplier relationships | Yes | Hosted platform dependencies | Supplier assessment template, platform docs |
| Incident management | Yes | Required for security events | Incident response procedure + tabletop drills |
| Backup & recovery | Yes | Business continuity | Backup notes, restore tests, runbook |
| Data lifecycle & retention | Yes | Compliance and legal hold | vault_files retention_until/legal_hold |

Approved By: __________________  
Date: __________________