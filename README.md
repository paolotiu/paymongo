# Paymongo for Typescript

A fully typed client for the Paymongo API

![Codecov](https://img.shields.io/codecov/c/github/paolotiu/paymongo?style=flat-square)

## Features

- Fully typed
- Supports both server and browser
- Supports Payment Intent workflow
-

## Roadmap

- [x] Payment Method
- [x] Payment Intent
- [x] Sources
- [x] Payments
- [ ] Helpers

## FAQ

#### Why aren't there methods for tokens and webhooks?

For tokens, I didn't include them since the suggested work flow is now through the [Payment Intent workflow](https://developers.paymongo.com/docs/credit-and-debit-cards).

As for webhooks, you shouldn't create webhooks in code. Use something like [cURL](https://curl.se/docs/manpage.html), [Postman](https://www.postman.com/product/api-client/), or [Insomnia](https://insomnia.rest/)
