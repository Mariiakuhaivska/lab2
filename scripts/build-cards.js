// Генерує картки товарів з data/products.json і вставляє їх в index.html
// між маркерами <!-- cards:start --> і <!-- cards:end -->.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const DATA = path.join(root, "data", "products.json");
const PAGE = path.join(root, "index.html");
const START = "<!-- cards:start -->";
const END = "<!-- cards:end -->";
const REQUIRED = ["title", "image", "alt", "price"];

function fail(message) {
  console.error(`build-cards: ${message}`);
  process.exit(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatPrice(value) {
  return `UAH ${Number(value).toLocaleString("en-US")}`;
}

function readFile(file, label) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return fail(`не вдалося прочитати ${label} (${path.relative(root, file)})`);
  }
}

function readProducts() {
  let products;
  try {
    products = JSON.parse(readFile(DATA, "файл даних"));
  } catch (error) {
    return fail(`у data/products.json некоректний JSON: ${error.message}`);
  }

  if (!Array.isArray(products) || products.length === 0) {
    fail("data/products.json має містити непорожній масив товарів");
  }

  products.forEach((product, index) => {
    for (const field of REQUIRED) {
      if (product[field] === undefined || product[field] === "") {
        fail(`у товару №${index + 1} немає поля "${field}"`);
      }
    }
  });

  return products;
}

function renderCard(product) {
  const title = escapeHtml(product.title);
  const oldPrice = product.oldPrice
    ? `\n              <del>${formatPrice(product.oldPrice)}</del>`
    : "";

  return `          <article class="product-card">
            <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.alt)}" loading="lazy">

            <h3>${title}</h3>

            <p class="product-price">
              ${formatPrice(product.price)}${oldPrice}
            </p>

            <a class="product-link" href="#contacts" aria-label="Ask about ${title}">
              Learn More
            </a>
          </article>`;
}

function injectCards(html, markup) {
  const start = html.indexOf(START);
  const end = html.indexOf(END);

  if (start === -1 || end === -1 || end < start) {
    fail(`в index.html не знайдено маркери ${START} і ${END}`);
  }

  return `${html.slice(0, start + START.length)}\n${markup}\n          ${html.slice(end)}`;
}

const products = readProducts();
const markup = products.map(renderCard).join("\n\n");
const html = readFile(PAGE, "сторінку");

fs.writeFileSync(PAGE, injectCards(html, markup));
console.log(`build-cards: згенеровано карток: ${products.length}`);
