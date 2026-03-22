# ISO-27001-2022-PR-AC — Access Control Procedure (Roles, RLS, Least Privilege)

**Owner:** 3B Credit Builder (3Boost Club)  
**Version:** v1.0  
**Status:** Approved  
**Last Updated:** 2026-01-17  

---## Roles
- client: documents only (upload/download), no responses
- creditor: responses only (upload), limited download as defined
- operator/system/admin: full operational access per business need
- reseller: aggregate visibility only; no file access

## Enforcement Layers
1) Database RLS: viewer_can_see_threeb
2) Edge Functions: hard role-bucket rules + scope verification
3) Audit: vault_events + system_events

## Evidence
- RLS policies in Postgres
- Edge function source and deployment logs