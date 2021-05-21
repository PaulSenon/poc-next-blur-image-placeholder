This is a implementation of blur placeholders by plaiceholder lib with next static generation.

* base64: worst looking feature, but super cheap and instant and easy to implement.
* blurhash: not so good if you leave the 4*4 default config hardcodded in plaiceholder lib + it is as heavy as base64, better looking (best looking ?) but you need decode client side...
* css: good looking and easy to implement, but it's quite heavy.
* svg: not even tried...

I will suggest:

* base64 on all the website

OR

* css on LCP then blurhash on the rest
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
