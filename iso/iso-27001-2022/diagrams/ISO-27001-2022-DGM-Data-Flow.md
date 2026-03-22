# ISO-27001-2022-DGM-DFD — System Data Flow (Analyzer + Vault + Dashboards)

**Owner:** 3B Credit Builder (3Boost Club)  
**Version:** v1.0  
**Status:** Approved  
**Last Updated:** 2026-01-17  

---`mermaid
flowchart LR
  U[Client/User] -->|JWT| APP[3B App/UI]
  APP -->|API calls| EF[Edge Functions]
  EF -->|RLS + SQL| DB[(Supabase Postgres)]
  EF -->|Signed URL| ST[(Supabase Storage Private Buckets)]

  APP -->|Reports Upload/Fetch| EF
  EF -->|vault_files/vault_events| DB
  EF -->|upload/download signed URL| ST

  AN[Analyzer] -->|Reads reports| DB
  AN -->|Writes locked outputs + logs| DB

  DB -->|Metrics queries| GF[Grafana Dashboards]
  EF -->|system_events| DB
  DB -->|Ops visibility| GF


Notes:

RLS enforces tenant isolation at DB.

Vault access is signed-URL only.

Analyzer is server-authoritative; outputs are locked and auditable.