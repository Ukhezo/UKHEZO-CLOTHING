const R = n => "R" + n.toLocaleString("en-ZA", {minimumFractionDigits:0, maximumFractionDigits:0}).replace(/,/g," ");
const FREE_SHIP = 750, SHIP = 95;

const SHAPES = {
  tee:'<path d="M35 10 L20 16 L8 34 L20 41 L26 33 L26 90 L74 90 L74 33 L80 41 L92 34 L80 16 L65 10 Q50 22 35 10Z"/>',
  shirt:'<path d="M36 9 L20 15 L8 40 L19 45 L26 32 L26 92 L74 92 L74 32 L81 45 L92 40 L80 15 L64 9 L50 22Z"/><path d="M50 22 L50 92" stroke="rgba(0,0,0,.18)" stroke-width="1.5" fill="none"/><path d="M36 9 L44 20 L50 22 L56 20 L64 9" fill="rgba(255,255,255,.18)"/>',
  hoodie:'<path d="M38 12 Q50 0 62 12 L82 20 L94 60 L82 64 L76 40 L76 92 L24 92 L24 40 L18 64 L6 60 L18 20Z"/><path d="M38 12 Q50 32 62 12" fill="rgba(0,0,0,.18)"/><rect x="36" y="64" width="28" height="14" rx="3" fill="rgba(0,0,0,.12)"/>',
  dress:'<path d="M40 6 L40 14 Q36 22 34 34 L18 92 L82 92 L66 34 Q64 22 60 14 L60 6 L54 6 Q50 12 46 6Z"/><path d="M34 38 L66 38" stroke="rgba(0,0,0,.18)" stroke-width="3"/>',
  jeans:'<path d="M26 8 L74 8 L78 92 L56 92 L50 36 L44 92 L22 92Z"/><path d="M26 16 L74 16" stroke="rgba(0,0,0,.2)" stroke-width="2"/><path d="M50 16 L50 34" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/>',
  shorts:'<path d="M24 20 L76 20 L82 74 L56 78 L50 46 L44 78 L18 74Z"/><path d="M24 28 L76 28" stroke="rgba(0,0,0,.2)" stroke-width="2"/>',
  jacket:'<path d="M36 8 L18 16 L8 72 L20 74 L24 36 L24 92 L48 92 L48 22 Z"/><path d="M64 8 L82 16 L92 72 L80 74 L76 36 L76 92 L52 92 L52 22 Z"/><path d="M36 8 L48 22 L44 34Z M64 8 L52 22 L56 34Z" fill="rgba(255,255,255,.2)"/>',
  cap:'<path d="M18 62 Q18 26 50 24 Q82 26 82 62Z"/><path d="M18 62 Q50 56 96 70 Q60 78 18 66Z" fill="rgba(0,0,0,.2)"/><circle cx="50" cy="24" r="3" fill="rgba(0,0,0,.25)"/>',
  sneaker:'<path d="M8 72 L10 50 Q24 50 34 40 L46 34 Q56 46 72 52 Q92 56 94 70 L94 76 L8 76Z"/><path d="M8 72 L94 72 L94 80 L8 80Z" fill="#f4f1ea"/><path d="M38 44 L46 50 M44 40 L52 46" stroke="rgba(255,255,255,.7)" stroke-width="2"/>',
  bag:'<path d="M20 34 L80 34 L84 90 L16 90Z"/><path d="M36 34 Q36 12 50 12 Q64 12 64 34" fill="none" stroke="currentColor" stroke-width="5"/>',
  skirt:'<path d="M32 16 L68 16 L86 86 L14 86Z"/><path d="M32 22 L68 22" stroke="rgba(0,0,0,.2)" stroke-width="2"/>'
};
const art = (shape, color) => `<svg viewBox="0 0 100 100" aria-hidden="true" style="color:${color}"><g fill="${color}">${SHAPES[shape]}</g></svg>`;
const tint = c => `color-mix(in srgb, ${c} 16%, var(--bg))`;
const PHOTO_BG = "#e7e3dc";
const slug = s => s.toLowerCase().replace(/'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const colorName = (p, color) => p.colorNames[p.colors.indexOf(color || p.colors[0])];
const photoOf = (p, color) => `images/products/${slug(p.name)}-${slug(colorName(p, color))}.jpg`;
const picBg = () => PHOTO_BG;
const visual = (p, color) => photoOf(p, color)
  ? `<img src="${photoOf(p, color)}" alt="${p.name} in ${colorName(p, color)}" class="photo" loading="lazy">`
  : art(p.shape, color || p.colors[0]);

const PRODUCTS = [
  {id:1, name:"Sunday Linen Shirt", cat:"Men", shape:"shirt", price:549, was:null, colors:["#d9c7a5","#5f7f9e","#f2efe6"], colorNames:["Sand", "Slate Blue", "Ecru"], sizes:["S","M","L","XL","XXL"], tag:"Bestseller", desc:"A loose, breathable linen-cotton shirt with a soft camp collar. Wears well open over a tee or buttoned up for lunch.", rank:1, added:3},
  {id:2, name:"Everyday Organic Tee", cat:"Men", shape:"tee", price:229, was:null, colors:["#1d2321","#ffffff","#2f6f5c","#b3412f"], colorNames:["Black", "White", "Forest Green", "Brick Red"], sizes:["S","M","L","XL","XXL"], tag:null, desc:"Heavyweight 220gsm organic cotton tee with a relaxed fit that holds its shape wash after wash.", rank:2, added:8},
  {id:3, name:"Drakensberg Hoodie", cat:"Men", shape:"hoodie", price:799, was:999, colors:["#4a5a4f","#1d2321","#c9b79c"], colorNames:["Olive", "Black", "Sand"], sizes:["S","M","L","XL"], tag:"Sale", desc:"Brushed fleece hoodie for cold Highveld mornings, with a lined hood and kangaroo pocket.", rank:5, added:12},
  {id:4, name:"Straight Leg Denim", cat:"Men", shape:"jeans", price:899, was:null, colors:["#2d4a6e","#1e2a3a","#6b86a6"], colorNames:["Mid Blue", "Raw Indigo", "Light Wash"], sizes:["28","30","32","34","36","38"], tag:null, desc:"Rigid 13oz denim with a classic straight leg. Breaks in beautifully over time.", rank:4, added:20},
  {id:5, name:"Umhlanga Wrap Dress", cat:"Women", shape:"dress", price:849, was:null, colors:["#c4553a","#2f6f5c","#e0a42b"], colorNames:["Terracotta", "Emerald", "Mustard"], sizes:["XS","S","M","L","XL"], tag:"New", desc:"Flowing viscose wrap dress with a tie waist and flutter sleeves. Made for long summer afternoons.", rank:3, added:1},
  {id:6, name:"Shweshwe Midi Skirt", cat:"Women", shape:"skirt", price:629, was:null, colors:["#2a4f8a","#8a3b2a","#4a3a6e"], colorNames:["Indigo", "Rust", "Purple"], sizes:["XS","S","M","L","XL"], tag:"Local print", desc:"An A-line midi skirt in traditional indigo shweshwe cotton, with side pockets and a comfortable elastic back.", rank:6, added:5},
  {id:7, name:"Cropped Denim Jacket", cat:"Women", shape:"jacket", price:959, was:1199, colors:["#6b86a6","#2d4a6e","#f2efe6"], colorNames:["Light Wash", "Dark Indigo", "Ecru"], sizes:["XS","S","M","L"], tag:"Sale", desc:"A boxy, cropped jacket in washed denim. Layers over dresses and tees all year round.", rank:8, added:15},
  {id:8, name:"Relaxed Linen Shorts", cat:"Women", shape:"shorts", price:399, was:null, colors:["#d9c7a5","#2f6f5c","#f2efe6"], colorNames:["Sand", "Forest Green", "Off-White"], sizes:["XS","S","M","L","XL"], tag:null, desc:"High-waisted linen shorts with a drawstring waist and deep pockets.", rank:9, added:9},
  {id:9, name:"Kids' Sunny Tee", cat:"Kids", shape:"tee", price:149, was:null, colors:["#e0a42b","#4fb59a","#e07563"], colorNames:["Mustard", "Mint", "Coral"], sizes:["2–3","4–5","6–7","8–9","10–11"], tag:null, desc:"Soft cotton tee for the playground, pre-washed so it won't shrink.", rank:10, added:7},
  {id:10, name:"Kids' Zip Hoodie", cat:"Kids", shape:"hoodie", price:379, was:null, colors:["#2f6f5c","#2a4f8a","#b3412f"], colorNames:["Forest Green", "Navy", "Brick Red"], sizes:["2–3","4–5","6–7","8–9","10–11"], tag:"New", desc:"A cosy zip hoodie for school runs and winter weekends.", rank:11, added:2},
  {id:11, name:"Canvas Court Sneaker", cat:"Shoes", shape:"sneaker", price:699, was:null, colors:["#f2efe6","#1d2321","#2f6f5c"], colorNames:["Off-White", "Black", "Forest Green"], sizes:["5","6","7","8","9","10","11"], tag:"Bestseller", desc:"Low-top canvas sneaker on a natural rubber sole. Goes with everything.", rank:7, added:18},
  {id:12, name:"Cotton Sun Cap", cat:"Accessories", shape:"cap", price:199, was:249, colors:["#1d2321","#d9c7a5","#2f6f5c"], colorNames:["Black", "Sand", "Forest Green"], sizes:["One size"], tag:"Sale", desc:"Six-panel cotton cap with an adjustable strap. Keeps the sun off.", rank:12, added:11},
  {id:13, name:"Market Tote Bag", cat:"Accessories", shape:"bag", price:249, was:null, colors:["#d9c7a5","#2f6f5c","#1d2321"], colorNames:["Natural", "Forest Green", "Black"], sizes:["One size"], tag:null, desc:"Heavy canvas tote with an inside pocket. Fits a week's shopping or a laptop.", rank:13, added:6},
  {id:14, name:"Women's Fitted Tee", cat:"Women", shape:"tee", price:219, was:null, colors:["#ffffff","#1d2321","#c4553a","#e0a42b"], colorNames:["White", "Black", "Terracotta", "Mustard"], sizes:["XS","S","M","L","XL"], tag:null, desc:"A slim-fit organic cotton tee with a scoop neck.", rank:14, added:10}
];
const CATS = ["All","Women","Men","Kids","Shoes","Accessories","Sale"];

let state = {cat:"All", q:"", sort:"featured", cart:[]};
try { state.cart = JSON.parse(localStorage.getItem("ukhezo-cart") || "[]"); } catch(e) { state.cart = []; }
const save = () => { try { localStorage.setItem("ukhezo-cart", JSON.stringify(state.cart)); } catch(e) {} };

const $ = s => document.querySelector(s);
const byId = id => PRODUCTS.find(p => p.id === id);

function renderCats(){
  $("#cats").innerHTML = CATS.map(c => `<button class="chip" aria-pressed="${c===state.cat}" data-cat="${c}">${c}</button>`).join("");
}
function filtered(){
  let list = PRODUCTS.filter(p => state.cat==="All" || (state.cat==="Sale" ? p.was : p.cat===state.cat));
  const q = state.q.trim().toLowerCase();
  if (q) list = list.filter(p => (p.name+" "+p.cat+" "+p.desc).toLowerCase().includes(q));
  const s = {featured:(a,b)=>a.rank-b.rank, low:(a,b)=>a.price-b.price, high:(a,b)=>b.price-a.price, new:(a,b)=>a.added-b.added}[state.sort];
  return list.sort(s);
}
function priceHTML(p){ return `<span class="price">${R(p.price)}${p.was?`<s>${R(p.was)}</s>`:""}</span>`; }
function renderGrid(){
  const list = filtered();
  $("#heading").textContent = state.cat==="All" ? "All clothing" : state.cat;
  $("#meta").textContent = `${list.length} item${list.length===1?"":"s"}${state.q?` matching “${state.q}”`:""}`;
  $("#grid").innerHTML = list.length ? list.map(p => `
    <article class="card">
      <button class="pic" style="background:${picBg(p)}" data-view="${p.id}" aria-label="View ${p.name}">
        ${p.tag?`<span class="badge ${p.was?"sale":""}">${p.tag}</span>`:""}
        ${visual(p)}
      </button>
      <div class="info">
        <h3>${p.name}</h3>
        <div class="sub">${p.cat}</div>
        ${priceHTML(p)}
        <div class="row">
          <div class="swatches">${p.colors.map(c=>`<span class="sw" style="background:${c}"></span>`).join("")}</div>
          <button class="btn small" data-view="${p.id}">Choose size</button>
        </div>
      </div>
    </article>`).join("") : `<div class="empty">No items match that search. Try “linen” or “denim”, or pick another category.</div>`;
}
function renderFeature(){
  const p = byId(5);
  $("#feature").innerHTML = `
    <div class="art" style="background:${picBg(p)};border-radius:8px;aspect-ratio:4/5;display:grid;place-items:center;overflow:hidden">${visual(p)}</div>
    <div><small>New this month</small><h2>${p.name}</h2><p>Three colourways in soft, flowing viscose.</p>
    <button class="btn small" data-view="${p.id}">Shop the dress · ${R(p.price)}</button></div>`;
}

/* Product modal */
let sel = {};
function openProduct(id){
  const p = byId(id);
  sel = {id, size: p.sizes.length===1 ? p.sizes[0] : null, color: p.colors[0]};
  drawProduct();
  openModal();
}
function drawProduct(){
  const p = byId(sel.id);
  $("#panel").innerHTML = `
    <button class="x" data-close aria-label="Close" style="position:absolute;right:10px;top:8px;z-index:2">×</button>
    <div class="pd">
      <div class="pic" style="background:${picBg(p, sel.color)}">${visual(p, sel.color)}</div>
      <div class="body">
        <div class="sub" style="color:var(--muted)">${p.cat}${p.tag?` · ${p.tag}`:""}</div>
        <h2>${p.name}</h2>
        <div style="font-size:20px">${priceHTML(p)}</div>
        <p>${p.desc}</p>
        <div class="opt-label">Colour: <span style="text-transform:none;letter-spacing:0;color:var(--ink)">${colorName(p, sel.color)}</span></div>
        <div class="opts">${p.colors.map((c,i)=>`<button class="color-opt" style="background:${c}" aria-label="${p.colorNames[i]}" title="${p.colorNames[i]}" aria-pressed="${c===sel.color}" data-color="${c}"></button>`).join("")}</div>
        <div class="opt-label">Size</div>
        <div class="opts">${p.sizes.map(s=>`<button class="size" aria-pressed="${s===sel.size}" data-size="${s}">${s}</button>`).join("")}</div>
        <div class="hint" id="hint"></div>
        <button class="btn wide" id="addBtn">Add to cart · ${R(p.price)}</button>
        <p style="font-size:13px">Free delivery over ${R(FREE_SHIP)} · Free returns within 30 days</p>
      </div>
    </div>`;
}
function addToCart(){
  if (!sel.size){ $("#hint").textContent = "Choose a size to add this to your cart."; return; }
  const key = `${sel.id}|${sel.size}|${sel.color}`;
  const line = state.cart.find(l => l.key===key);
  if (line) line.qty++; else state.cart.push({key, id:sel.id, size:sel.size, color:sel.color, qty:1});
  save(); renderCart(); closeModal();
  toast(`${byId(sel.id).name} (${sel.size}) added to your cart`);
}

/* Cart */
function sums(){
  const sub = state.cart.reduce((t,l)=>t+byId(l.id).price*l.qty,0);
  const ship = sub===0 || sub>=FREE_SHIP ? 0 : SHIP;
  return {sub, ship, total: sub+ship, items: state.cart.reduce((t,l)=>t+l.qty,0)};
}
function renderCart(){
  const s = sums();
  $("#count").textContent = s.items;
  if (!state.cart.length){
    $("#lines").innerHTML = `<div class="empty">Your cart is empty.<br><br><button class="btn" data-close>Keep shopping</button></div>`;
    $("#totals").innerHTML = "";
    return;
  }
  $("#lines").innerHTML = state.cart.map(l => { const p = byId(l.id); return `
    <div class="line">
      <div class="thumb" style="background:${picBg(p, l.color)};overflow:hidden">${visual(p, l.color)}</div>
      <div>
        <h4>${p.name}</h4>
        <div class="sub">Size ${l.size} · ${colorName(p, l.color)}</div>
        <div class="qty"><button data-dec="${l.key}" aria-label="Decrease quantity">−</button><span>${l.qty}</span><button data-inc="${l.key}" aria-label="Increase quantity">+</button></div>
        <button class="rm" data-rm="${l.key}">Remove</button>
      </div>
      <div class="price">${R(p.price*l.qty)}</div>
    </div>`; }).join("");
  const left = FREE_SHIP - s.sub;
  $("#totals").innerHTML = `
    <p class="ship-note">${left>0 ? `Add ${R(left)} more for free delivery` : "You've got free delivery"}</p>
    <div class="meter"><i style="width:${Math.min(100, s.sub/FREE_SHIP*100)}%"></i></div>
    <div class="r"><span>Subtotal</span><span>${R(s.sub)}</span></div>
    <div class="r"><span>Delivery</span><span>${s.ship?R(s.ship):"Free"}</span></div>
    <div class="r big"><span>Total</span><span>${R(s.total)}</span></div>
    <button class="btn wide" id="checkout">Checkout</button>`;
}
function openCart(){ $("#drawer").classList.add("on"); $("#drawer").setAttribute("aria-hidden","false"); $("#scrim").classList.add("on"); }
function closeCart(){ $("#drawer").classList.remove("on"); $("#drawer").setAttribute("aria-hidden","true"); if(!$("#modal").classList.contains("on")) $("#scrim").classList.remove("on"); }
function openModal(){ $("#modal").classList.add("on"); $("#scrim").classList.add("on"); }
function closeModal(){ $("#modal").classList.remove("on"); if(!$("#drawer").classList.contains("on")) $("#scrim").classList.remove("on"); }

/* Checkout */
const PROVINCES = ["Eastern Cape","Free State","Gauteng","KwaZulu-Natal","Limpopo","Mpumalanga","North West","Northern Cape","Western Cape"];
let delivery = "courier";
function shipCost(sub){ if (delivery==="collect") return 0; if (delivery==="express") return 180; return sub>=FREE_SHIP?0:SHIP; }
function openCheckout(){
  closeCart();
  drawCheckout();
  openModal();
}
function summaryHTML(){
  const sub = sums().sub, ship = shipCost(sub);
  return `<div class="summary">
    <strong>Order summary</strong>
    ${state.cart.map(l=>{const p=byId(l.id);return `<div class="r"><span>${l.qty} × ${p.name} (${l.size})</span><span>${R(p.price*l.qty)}</span></div>`}).join("")}
    <div class="r"><span>Subtotal</span><span>${R(sub)}</span></div>
    <div class="r"><span>Delivery</span><span>${ship?R(ship):"Free"}</span></div>
    <div class="r big"><span>Total</span><span>${R(sub+ship)}</span></div>
    <div class="r" style="color:var(--muted)"><span>Includes VAT (15%)</span><span>${R((sub+ship)*15/115)}</span></div>
  </div>`;
}
function drawCheckout(){
  $("#panel").innerHTML = `
    <div class="modal-head"><h2>Checkout</h2><button class="x" data-close aria-label="Close checkout">×</button></div>
    <div class="co">
      <form id="coForm" novalidate>
        <fieldset><legend>Contact</legend>
          <div class="two">
            <div class="field"><label for="fn">First name</label><input id="fn" required autocomplete="given-name"></div>
            <div class="field"><label for="ln">Last name</label><input id="ln" required autocomplete="family-name"></div>
          </div>
          <div class="two">
            <div class="field"><label for="em">Email</label><input id="em" type="email" required autocomplete="email"></div>
            <div class="field"><label for="ph">Cellphone</label><input id="ph" type="tel" required placeholder="082 123 4567" autocomplete="tel"></div>
          </div>
        </fieldset>
        <fieldset><legend>Delivery</legend>
          <label class="radio"><input type="radio" name="dl" value="courier" ${delivery==="courier"?"checked":""}><span><b>Courier</b> · ${sums().sub>=FREE_SHIP?"Free":R(SHIP)}<small>2–4 working days to main centres</small></span></label>
          <label class="radio"><input type="radio" name="dl" value="express" ${delivery==="express"?"checked":""}><span><b>Express</b> · ${R(180)}<small>Next working day if ordered before 12:00</small></span></label>
          <label class="radio"><input type="radio" name="dl" value="collect" ${delivery==="collect"?"checked":""}><span><b>Collect in store</b> · Free<small>Greytown or Durban store, ready in 2 days</small></span></label>
          <div id="addr" style="display:${delivery==="collect"?"none":"grid"};gap:10px">
            <div class="field"><label for="st">Street address</label><input id="st" autocomplete="street-address"></div>
            <div class="two">
              <div class="field"><label for="ci">Town or city</label><input id="ci" autocomplete="address-level2"></div>
              <div class="field"><label for="pc">Postal code</label><input id="pc" inputmode="numeric" maxlength="4" autocomplete="postal-code"></div>
            </div>
            <div class="field"><label for="pr">Province</label><select id="pr">${PROVINCES.map(p=>`<option ${p==="KwaZulu-Natal"?"selected":""}>${p}</option>`).join("")}</select></div>
          </div>
        </fieldset>
        <fieldset><legend>Payment</legend>
          <div class="demo">This is a demo store. Placing an order here takes no payment and sends nothing; you'll just see a sample confirmation. Connect a payment provider such as PayFast or Yoco before going live.</div>
        </fieldset>
        <div class="hint" id="coHint"></div>
        <button class="btn wide" type="submit">Place order</button>
      </form>
      <div id="sum">${summaryHTML()}</div>
    </div>`;
}
function submitOrder(e){
  e.preventDefault();
  const need = ["fn","ln","em","ph"].concat(delivery==="collect"?[]:["st","ci","pc"]);
  const missing = need.filter(id => !$("#"+id).value.trim());
  if (missing.length){ $("#coHint").textContent = "Please fill in the highlighted fields."; missing.forEach(id=>$("#"+id).style.borderColor="var(--danger)"); $("#"+missing[0]).focus(); return; }
  if (!/^\S+@\S+\.\S+$/.test($("#em").value)){ $("#coHint").textContent = "Check the email address: it should look like name@example.com."; $("#em").focus(); return; }
  if (delivery!=="collect" && !/^\d{4}$/.test($("#pc").value)){ $("#coHint").textContent = "South African postal codes have 4 digits."; $("#pc").focus(); return; }
  const sub = sums().sub, total = sub + shipCost(sub);
  const num = "UK-" + Math.floor(100000 + Math.random()*900000);
  const name = $("#fn").value.trim();
  state.cart = []; save(); renderCart();
  $("#panel").innerHTML = `
    <button class="x" data-close aria-label="Close" style="position:absolute;right:10px;top:8px">×</button>
    <div class="done">
      ${art("bag","var(--accent)").replace('<svg','<svg width="90"')}
      <h2>Thank you, ${name.replace(/[<>&"]/g,"")}!</h2>
      <p>Sample order <span class="num">${num}</span> for ${R(total)}.</p>
      <p style="color:var(--muted);max-width:44ch">In the live store, a confirmation email and SMS would follow here. This demo took no payment.</p>
      <button class="btn" data-close>Continue shopping</button>
    </div>`;
}

let tt;
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("on"); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove("on"),2200); }

/* Events */
document.addEventListener("click", e => {
  const t = e.target.closest("button, .scrim");
  if (!t) return;
  if (t.dataset.cat){ state.cat = t.dataset.cat; renderCats(); renderGrid(); }
  else if (t.dataset.view){ openProduct(+t.dataset.view); }
  else if (t.dataset.size){ sel.size = t.dataset.size; drawProduct(); }
  else if (t.dataset.color){ sel.color = t.dataset.color; drawProduct(); }
  else if (t.id==="addBtn"){ addToCart(); }
  else if (t.id==="openCart"){ openCart(); }
  else if (t.id==="checkout"){ openCheckout(); }
  else if (t.dataset.inc || t.dataset.dec){
    const l = state.cart.find(x=>x.key===(t.dataset.inc||t.dataset.dec));
    l.qty += t.dataset.inc ? 1 : -1;
    if (l.qty<=0) state.cart = state.cart.filter(x=>x!==l);
    save(); renderCart();
  }
  else if (t.dataset.rm){ state.cart = state.cart.filter(x=>x.key!==t.dataset.rm); save(); renderCart(); }
  else if (t.hasAttribute("data-close") || t.id==="scrim"){ closeModal(); closeCart(); }
});
$("#scrim").addEventListener("click", ()=>{ closeModal(); closeCart(); });
$("#modal").addEventListener("click", e => { if (e.target.id==="modal") closeModal(); });
document.addEventListener("keydown", e => { if (e.key==="Escape"){ closeModal(); closeCart(); } });
document.addEventListener("change", e => {
  if (e.target.name==="dl"){ delivery = e.target.value; $("#addr").style.display = delivery==="collect"?"none":"grid"; $("#sum").innerHTML = summaryHTML(); }
});
document.addEventListener("submit", e => { if (e.target.id==="coForm") submitOrder(e); });
$("#q").addEventListener("input", e => { state.q = e.target.value; renderGrid(); });
$("#sort").addEventListener("change", e => { state.sort = e.target.value; renderGrid(); });

renderCats(); renderFeature(); renderGrid(); renderCart();

/* Footer info pages + sign-ups */
const INFO = {
  about:["About UKHEZO Clothing Co.",`
    <p class="lead">Clothing made the way a good wooden spoon is made: simply, carefully and to last.</p>
    <h3>Who we are</h3>
    <p>UKHEZO Clothing Co. started in 2020 as a small South African label with one goal: everyday clothes that feel good in our climate and hold up to real life. We design breathable cotton shirts, sturdy denim, easy dresses and wear-anywhere layers for women, men and kids.</p>
    <h3>Made here, by people we know</h3>
    <p>Every piece is cut and sewn by partner workshops in Greytown and Kranskop in KwaZulu-Natal. Making locally means shorter supply chains, better quality control and fair, steady work for skilled South African makers.</p>
    <h3>What we stand for</h3>
    <ul class="about-list">
      <li><b>Built to last.</b> Strong stitching, quality fabrics and timeless cuts that you'll wear for years, not one season.</li>
      <li><b>Made for South Africa.</b> Breathable fabrics and fits designed for our sun, our heat and our everyday.</li>
      <li><b>Fair and local.</b> We pay our makers fairly and keep production close to home.</li>
      <li><b>Easy to shop.</b> Free delivery on orders over R750 and 30-day free returns, nationwide.</li>
    </ul>
    <p class="about-sign">Thank you for supporting a proudly South African brand.<br><b>The UKHEZO team</b></p>`],
  makers:["Our makers","<p>Every piece is made by small partner workshops in Greytown and Kranskop in KwaZulu-Natal. We visit each one regularly and pay above the bargaining-council minimum.</p>"],
  impact:["Social responsibility","<ul><li>Locally made, short supply chains</li><li>Offcuts donated to sewing schools</li><li>Recycled, plastic-free packaging</li></ul>"],
  careers:["Careers","<p>We're always keen to meet makers, stylists and customer-care stars. Send your CV to careers@ukhezo.example.</p>"],
  shipping:["Shipping info","<table><tr><th>Option</th><th>Time</th><th>Cost</th></tr><tr><td>Standard courier</td><td>2–4 working days to main centres</td><td>R95, free over R750</td></tr><tr><td>Express</td><td>1–2 working days</td><td>R180</td></tr><tr><td>Click &amp; collect</td><td>Ready in 2 days</td><td>Free</td></tr></table><p>Outlying areas may take 2–3 extra days.</p>"],
  returns:["Returns","<p>Changed your mind? Return unworn items with tags within 30 days for free. Book a courier collection from your order page or drop it at any partner store.</p>"],
  refunds:["Refunds","<p>Refunds go back to your original payment method within 5–7 working days of your return reaching us. Instant EFT refunds are paid to your bank account.</p>"],
  order:["How to order","<ul><li>Pick a size and add items to your cart</li><li>Open the cart and tap Checkout</li><li>Choose delivery, enter your details and pay</li></ul>"],
  track:["How to track","<p>We email and SMS a tracking link as soon as your parcel leaves our warehouse. You can also find it under My Orders.</p>"],
  size:["Size guide","<table><tr><th>Size</th><th>Chest (cm)</th><th>Waist (cm)</th><th>Hip (cm)</th></tr><tr><td>XS</td><td>82–86</td><td>66–70</td><td>88–92</td></tr><tr><td>S</td><td>87–92</td><td>71–76</td><td>93–98</td></tr><tr><td>M</td><td>93–100</td><td>77–84</td><td>99–106</td></tr><tr><td>L</td><td>101–108</td><td>85–92</td><td>107–114</td></tr><tr><td>XL</td><td>109–118</td><td>93–102</td><td>115–124</td></tr></table><p>Between sizes? Size up for a relaxed fit.</p>"],
  club:["UKHEZO Club","<p>Free to join. Earn 1 point per R10 spent, get early access to new drops and a birthday voucher every year.</p>"],
  contact:["Contact us","<p>Email help@ukhezo.example or WhatsApp us on +27 00 000 0000.<br>Mon–Fri 8:00–17:00, Sat 9:00–13:00.</p>"],
  payment:["Payment methods","<p>Visa, Mastercard, Amex, Instant EFT, SnapScan, Zapper, Apple Pay, Samsung Pay, and PayFlex (pay in 4 interest-free instalments).</p>"],
  points:["Reward points","<p>Every 500 points becomes a R50 voucher. Points are valid for 12 months and are added once your order is delivered.</p>"],
  faq:["FAQ","<p><b>Do you deliver outside South Africa?</b> Not yet, but Namibia and Botswana are coming soon.</p><p><b>Can I change my order?</b> Yes, within 1 hour of placing it. Contact us.</p>"],
  privacy:["Privacy centre","<p>Manage your marketing preferences and request a copy or deletion of your data under POPIA.</p>"],
  cookies:["Privacy & cookie policy","<p>We use essential cookies to run the store and, with your consent, analytics cookies to improve it.</p>"],
  terms:["Terms & conditions","<p>Prices include VAT. Stock is reserved only once payment is confirmed.</p>"],
  paia:["PAIA manual","<p>Our Promotion of Access to Information Act manual is available on request from our information officer.</p>"]
};
document.addEventListener("click", e => {
  const b = e.target.closest("[data-info]");
  if (b) {
    const [title, body] = INFO[b.dataset.info];
    closeCart();
    $("#panel").innerHTML = `<div class="modal-head"><h2>${title}</h2><button class="x" data-close aria-label="Close">×</button></div><div class="info-body">${body}</div>`;
    openModal();
    return;
  }
  const s = e.target.closest("[data-soon]");
  if (s) { e.preventDefault(); toast(`${s.dataset.soon} is coming soon`); }
});
document.querySelectorAll(".sub-form").forEach(f => f.addEventListener("submit", e => {
  e.preventDefault();
  toast(`Thanks! You're subscribed by ${f.dataset.sub}.`);
  f.reset();
}));
