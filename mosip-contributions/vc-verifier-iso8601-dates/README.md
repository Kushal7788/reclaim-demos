# ISO 8601 microsecond timestamps in MOSIP vc-verifier

This change lets MOSIP's [vc-verifier](https://github.com/inji/vc-verifier), the Kotlin library that validates verifiable credentials, accept ISO 8601 timestamps with **microsecond** precision, such as `2025-03-26T10:15:30.123456Z`.

**Built:** March 2025 · **Base:** [`inji/vc-verifier@e213d7c`](https://github.com/inji/vc-verifier/commit/e213d7c68d733e47fd501a34f5c1ef3e72014013) · **Change:** +1 line in `DateUtils.kt` · **Diff:** [`iso8601-microseconds.diff`](iso8601-microseconds.diff)

## What it changes

`DateUtils` recognised only millisecond (`.SSS`) and whole-second timestamps, so a credential whose `issuanceDate` or `expirationDate` had six fractional digits could not be parsed. This was written alongside the [Inji Wallet Reclaim issuer integration](../inji-wallet-reclaim-issuer). The fix adds the microsecond pattern to the list of accepted formats, ahead of the existing ones:

```kotlin
val dateFormats = listOf(
    ("yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'"),   // added
    ("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
    ("yyyy-MM-dd'T'HH:mm:ss'Z'")
)
```

## Applying the diff

```bash
git clone https://github.com/inji/vc-verifier.git && cd vc-verifier
git checkout e213d7c68d733e47fd501a34f5c1ef3e72014013
git apply /path/to/iso8601-microseconds.diff
```

vc-verifier is licensed under MPL-2.0. This diff modifies an MPL-2.0 file and is shared under the same license.
