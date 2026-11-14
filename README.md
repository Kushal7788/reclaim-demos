# Reclaim Protocol demos and integrations

Apps, SDK examples and integrations I built while working with [Reclaim Protocol](https://www.reclaimprotocol.org/). Each one uses zkTLS proofs of web data in place of document uploads, manual checks or trust-me claims.

Folders imported from standalone repos keep their full commit history. The MOSIP contributions are kept as diffs against the upstream projects, each with a write-up.

## Integrations (2024–2025)

| Project | Folder | What it shows | Stack | Built |
|---|---|---|---|---|
| Inji Wallet: Reclaim issuer | [`mosip-contributions/inji-wallet-reclaim-issuer`](mosip-contributions/inji-wallet-reclaim-issuer) | Adds Reclaim as a credential issuer in MOSIP's Inji Wallet, so a zkTLS proof becomes a verifiable credential in a digital-identity wallet | React Native, XState, Reclaim RN SDK | Mar 2025 |
| vc-verifier: ISO 8601 dates | [`mosip-contributions/vc-verifier-iso8601-dates`](mosip-contributions/vc-verifier-iso8601-dates) | Microsecond-precision timestamp support in MOSIP's verifiable-credential verifier | Kotlin | Mar 2025 |
| SDK backend demo | [`sdk-backend-demo`](sdk-backend-demo) | Minimal server side of a Reclaim integration: creates proof requests with the app secret kept server-side, and receives proofs on a callback | Node.js, Express, Reclaim JS SDK 2.x | Nov–Dec 2024 |

## Demo apps (2023)

| Demo | Folder | What it shows | Stack | Built |
|---|---|---|---|---|
| Gatekeeper for Discord | [`gatekeeper-discord`](gatekeeper-discord) | A Discord bot that grants server roles only after members prove a claim, using QR-code proof requests and admin/user commands | discord.js, Express, MongoDB, Reclaim SDK | Aug 2023 |
| Gatekeeper for Telegram | [`gatekeeper-telegram`](gatekeeper-telegram) | The Telegram counterpart: a bot that admits or removes group members based on the proofs they submit | Node.js, MongoDB, Reclaim SDK | Sep 2023 |
| ScamCheck bot setup | [`scamcheck-bot-landing`](scamcheck-bot-landing) | Landing page and setup flow for adding proof-gated bots to Discord and Telegram groups | React, Tailwind, Express | Sep 2023 |
| Network State ID | [`network-state-id`](network-state-id) | Issues and checks identity claims backed by Reclaim proofs | React, Express, MongoDB | Sep 2023 |
| Loan application | [`loan-app`](loan-app) | Loan KYC that collects identity data as proofs instead of uploaded documents | React, Express, MongoDB | Jul–Aug 2023 |
| WhyTrustYou? scam check | [`scam-check`](scam-check) | Users prove facts such as their email provider and country to show they're legitimate | React, Express, MongoDB | Jul–Aug 2023 |
| Employment verification | [`employment-verification`](employment-verification) | Prove where you work through your company email provider (built with Questbook) | React, Express | Jul 2023 |
| KaggleCoin | [`kagglecoin`](kagglecoin) | A React Native wallet linked to a Kaggle profile proved with Reclaim | React Native, ethers, Reclaim RN SDK | Oct 2023 |

The 2023 demos use the Reclaim SDKs of that time (`@reclaimprotocol/reclaim-sdk` v4 and early `reclaim-react` / `reclaim-react-native`). For a current minimal integration, start with [`sdk-backend-demo`](sdk-backend-demo).

## Where each folder came from

| Folder | Originally |
|---|---|
| `sdk-backend-demo` | `reclaim-sdk-backend-demo` repo (history kept) |
| `mosip-contributions/inji-wallet-reclaim-issuer` | `reclaim-issuer-integration` branch of my `inji-wallet` fork (diff) |
| `mosip-contributions/vc-verifier-iso8601-dates` | `develop` branch of my `vc-verifier` fork (diff) |
| `gatekeeper-discord` | `gatekeeper-discord` |
| `gatekeeper-telegram` | `gatekeeper-telegram` (previously private) |
| `scamcheck-bot-landing` | `bots-landing-page` |
| `network-state-id` | `Reclaim-NSID` |
| `loan-app` | `reclaim-loanapp` |
| `scam-check` | `reclaim-scamcheck` |
| `employment-verification` | `CompVi` |
| `kagglecoin` | `KaggleCoin` |
