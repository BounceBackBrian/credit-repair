# ISO/IEC 27001:2022 — Clause 4.3
## Information Security Management System (ISMS) Scope

### Organization
3B Credit Builder (3Boost Club)

### Scope
The ISMS covers all systems, services, personnel, and processes involved in:

- Credit analysis and enforcement (Analyzer)
- Document and response handling (Vault)
- Entity and document mapping
- Role-based access control
- Audit logging and alerting
- Client, operator, creditor, and reseller access

### In-Scope Assets
- Supabase PostgreSQL (encrypted at rest)
- Supabase Storage (private buckets)
- Edge Functions (vault-upload, vault-download, vault-complete, analyzer)
- Mapping layer (threeb_id, context_type, context_id)
- Monitoring and alerting systems

### Security Boundaries
- TLS encryption for all data in transit
- AES-256 encryption at rest (Supabase managed)
- Row Level Security (RLS)
- Signed URL access to storage
- Full audit logging

No exclusions apply.

Approved By: __________________  
Date: __________________