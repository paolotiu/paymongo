# Paymongo for Typescript

A fully typed client for the Paymongo API

![Codecov](https://img.shields.io/codecov/c/github/paolotiu/paymongo?style=flat-square)

**[Link to docs](https://paymongo.paolotiu.com)**

## Features

- Fully typed
- Supports both server and browser

## Roadmap

- [x] Payment Method
- [x] Payment Intent
- [x] Sources
- [x] Payments
- [ ] Helpers

## Installation

Install with npm

```bash
	npm install @paymongo/core
```

Install with yarn

```bash
	yarn install @paymongo/core
```

## Usage

On the server

```typescript
const paymongo = new Paymongo(process.env.PAYMONGO_SECRET_KEY as SecretKey);
```

On the browser

```typescript
const paymongo = new Paymongo(process.env.PAYMONGO_PUBLIC_KEY as PublicKey);
```

- For Javascript users just remove the `as <Public/Private>Key` part

## FAQ

#### Why aren't there methods for tokens and webhooks?

For tokens, I didn't include them since the suggested work flow is now through the [Payment Intent workflow](https://developers.paymongo.com/docs/credit-and-debit-cards).

As for webhooks, you shouldn't create webhooks in code. Use something like [cURL](https://curl.se/docs/manpage.html), [Postman](https://www.postman.com/product/api-client/), or [Insomnia](https://insomnia.rest/)
