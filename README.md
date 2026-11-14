# UKHEZO Clothing Co.

A front-end ecommerce demo for a South African clothing store. Shoppers can browse, filter, pick a colour and size, fill a cart and go through a demo checkout. Prices are in Rand (ZAR).

> **Demo only:** checkout takes no payment and stores no orders. See [Going live](#going-live).

## Features

- 14 products across Women, Men, Kids, Shoes and Accessories, with a Sale filter
- Search, plus sorting by featured, price and newest
- Product pop-up with colour and size options, and a photo for every colour (44 photos)
- Cart drawer with quantity controls, saved in the browser between visits
- Free-delivery progress bar (free over R750, otherwise R95)
- Checkout with courier, express or collect-in-store delivery, province list, 4-digit postal code check and VAT shown at 15%
- Footer with company, help and customer-care pages (shipping, returns, size guide, FAQ, POPIA and PAIA), newsletter sign-up by email, SMS or WhatsApp, and accepted payment methods
- Light and dark mode, phone-friendly layout, keyboard accessible

## Built with

| Language | File | Purpose |
|---|---|---|
| HTML | `index.html` | Page structure |
| CSS | `css/style.css` | Design, layout, dark mode |
| JavaScript | `js/app.js` | Products, cart, filters, checkout |

No frameworks, build tools or dependencies. Fonts load from Google Fonts.

## Project structure

```
ukhezo-store/
├── index.html
├── favicon.png
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   └── products/        # one photo per product colour, e.g. sunday-linen-shirt-sand.jpg
├── README.md
├── LICENSE
└── .gitignore
```

## Run it locally

Open `index.html` in your browser. Or, to serve it like a real website:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Publish free with GitHub Pages

1. Push this folder to a GitHub repository.
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then **Save**.
4. After a minute your store is live at `https://<your-username>.github.io/<repo-name>/`.

## Edit products

Products are listed at the top of `js/app.js` in the `PRODUCTS` array. Each product has a name, category, price, optional sale price (`was`), colours (`colors` with matching `colorNames`), sizes and a description.

Photos are found by name: `images/products/<product-name>-<colour-name>.jpg`, all lowercase with dashes. For example, the "Umhlanga Wrap Dress" in "Emerald" uses `umhlanga-wrap-dress-emerald.jpg`. If you add a product or colour, add a photo with the matching file name.

## Going live

To take real orders you would need to:

- **Take payments** through a provider such as PayFast, Yoco or Paystack. Never handle card details yourself.
- **Store orders and stock** with a back end (for example Node.js, PHP or Python with a database), or move to a platform such as Shopify or WooCommerce.
- **Send confirmations** to customers by email or SMS.
- **Use your own domain** and add a privacy policy and returns policy.

## Credits

Product photos are AI-generated (Figma AI) for demonstration. UKHEZO Clothing Co. is a demo brand.
