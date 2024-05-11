# @uniiem/zip-pseudo-encryption

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/HoshinoSuzumi/zip-pseudo-encryption/ci.yml)

![NPM Downloads](https://img.shields.io/npm/dm/%40uniiem%2Fzip-pseudo-encryption)

![NPM Version (with dist tag)](https://img.shields.io/npm/v/%40uniiem%2Fzip-pseudo-encryption/latest)

![npm bundle size](https://img.shields.io/bundlephobia/min/%40uniiem%2Fzip-pseudo-encryption)

![GitHub License](https://img.shields.io/github/license/HoshinoSuzumi/zip-pseudo-encryption)

Zip pseudo-encryption detection and generation in TypeScript.

## Installation

```bash
npm install @uniiem/zip-pseudo-encryption
```

## Usage

```typescript
import { detectZipPseudoEncryption } from '@uniiem/zip-pseudo-encryption';

// receive a File object
const file = new File([...], 'file.zip', { type: 'application/zip' });

detectZipPseudoEncryption(file).then((result) => {
  console.log(result); // "normal" | "encrypted" | "pseudo" | "broken" | "unknown"
});
```

## Sponsor

Buy me a coffee~

[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3D5ANK41%26type%3Dpledges&style=flat)](https://patreon.com/5ANK41)
[![爱发电](https://afdian.moeci.com/11/badge.svg)](https://afdian.net/a/hoshino_suzumi)
