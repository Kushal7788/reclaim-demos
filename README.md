# Reclaim Protocol demos (2023)

Demo apps I built in 2023 while working with [Reclaim Protocol](https://www.reclaimprotocol.org/). Each one uses zkTLS proofs of web data in place of document uploads, manual checks or trust-me claims.

Each folder is a self-contained app that was imported from its original repo with commit history kept.

| Demo | Folder | What it shows | Stack | Built |
|---|---|---|---|---|
| Gatekeeper for Discord | [`gatekeeper-discord`](gatekeeper-discord) | A Discord bot that grants server roles only after members prove a claim, using QR-code proof requests and admin/user commands | discord.js, Express, MongoDB, Reclaim SDK | Aug 2023 |
| ScamCheck bot setup | [`scamcheck-bot-landing`](scamcheck-bot-landing) | Landing page and setup flow for adding proof-gated bots to Discord and Telegram groups | React, Tailwind, Express | Sep 2023 |
| Network State ID | [`network-state-id`](network-state-id) | Issues and checks identity claims backed by Reclaim proofs | React, Express, MongoDB | Sep 2023 |
| Loan application | [`loan-app`](loan-app) | Loan KYC that collects identity data as proofs instead of uploaded documents | React, Express, MongoDB | Jul–Aug 2023 |
| WhyTrustYou? scam check | [`scam-check`](scam-check) | Users prove facts such as their email provider and country to show they're legitimate | React, Express, MongoDB | Jul–Aug 2023 |
| Employment verification | [`employment-verification`](employment-verification) | Prove where you work through your company email provider (built with Questbook) | React, Express | Jul 2023 |
| KaggleCoin | [`kagglecoin`](kagglecoin) | A React Native wallet linked to a Kaggle profile proved with Reclaim | React Native, ethers, Reclaim RN SDK | Oct 2023 |

## Note

These demos use the 2023 Reclaim SDKs (`@reclaimprotocol/reclaim-sdk` v4 and early `reclaim-react` / `reclaim-react-native`), whose APIs have changed since. They're kept as a record of the use cases explored, not as current integration examples. For an up-to-date minimal integration, see [reclaim-sdk-backend-demo](https://github.com/Kushal7788/reclaim-sdk-backend-demo).

## Original repos

| Folder | Imported from |
|---|---|
| `gatekeeper-discord` | `gatekeeper-discord` |
| `scamcheck-bot-landing` | `bots-landing-page` |
| `network-state-id` | `Reclaim-NSID` |
| `loan-app` | `reclaim-loanapp` |
| `scam-check` | `reclaim-scamcheck` |
| `employment-verification` | `CompVi` |
| `kagglecoin` | `KaggleCoin` |
