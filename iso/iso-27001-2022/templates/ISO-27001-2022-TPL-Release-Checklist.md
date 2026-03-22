# ISO-27001-2022-TPL-REL — Release Security Checklist

**Owner:** 3B Credit Builder (3Boost Club)  
**Version:** v1.0  
**Status:** Approved  
**Last Updated:** 2026-01-17  

---## Pre-Release
- [ ] RLS test matrix passes (anon/auth/service_role/client/operator/reseller)
- [ ] Vault upload/download rules validated
- [ ] Analyzer lock + enforcement rules validated
- [ ] Secrets rotation reviewed; no tokens in repo
- [ ] system_events logging validated for critical paths
- [ ] Backups/restore path verified (at least quarterly)

## Post-Release
- [ ] Monitor dashboards for anomalies (SLA + failures)
- [ ] Review system_events for errors
- [ ] Confirm scheduled jobs running (KPI refresh)