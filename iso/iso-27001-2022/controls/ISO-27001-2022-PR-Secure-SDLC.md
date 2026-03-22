# ISO-27001-2022-PR-SDLC — Secure SDLC Procedure

**Owner:** 3B Credit Builder (3Boost Club)  
**Version:** v1.0  
**Status:** Approved  
**Last Updated:** 2026-01-17  

---## Required
- Code review for Edge Functions and Analyzer changes
- Secrets never committed (use secrets manager / platform secrets)
- Automated tests for RLS and scoping rules
- Logging requirements for sensitive workflows

## Minimum Tests
- Tenant isolation tests
- Role-based Vault upload/download tests
- Analyzer lock and enforcement tests