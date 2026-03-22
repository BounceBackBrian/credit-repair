# ISO-27001-2022-AUDIT-QA — Audit Interview Q&A (Operator/Engineer Script)

**Owner:** 3B Credit Builder (3Boost Club)  
**Version:** v1.0  
**Status:** Approved  
**Last Updated:** 2026-01-17  

---## How do you prevent cross-tenant access?
- We enforce threeb_id scoping at the database layer (RLS) and again in Edge Functions (defense-in-depth).
- Policies use viewer_can_see_threeb(threeb_id) for reads/writes.
- Resellers are restricted to portfolio aggregate visibility; no file access.

## How is data protected in storage?
- Buckets are private.
- Access is only via short-lived signed URLs issued by Edge Functions after authorization checks.
- Every access attempt is logged (vault_events + system_events).

## How do you verify uploaded file integrity?
- vault-complete verifies size/checksum and updates vault_files lifecycle state.
- Client downloads can be restricted to verified state.

## How do you detect and respond to failures?
- KPI refresh logs + alerts.
- system_events acts as unified audit pipeline.
- Incident response procedure defines triage, containment, remediation, and evidence retention.

## Where does Analyzer fit?
- Analyzer is in-scope, server-authoritative, produces locked outputs used for enforcement workflows.
- Analyzer outputs and actions are logged and tied to threeb_id.