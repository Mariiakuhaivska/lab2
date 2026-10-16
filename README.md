Кугаївська Марія
ІСТ 2 курс

# FurniShop. Лабораторна робота 2: npm, Sass, Node.js

Сторінка з лабораторної роботи 1. Вигляд не змінився, змінився спосіб збирання: стилі пишуться на Sass, а картки товарів генеруються скриптом Node.js з `data/products.json`.

- Макет: https://www.figma.com/design/NzfgB5QyJalidCqqmMqKNk/Lab-1--Copy-?node-id=0-1
- Опублікована сторінка: https://mariiakuhaivska.github.io/lab2/
- Репозиторій: https://github.com/Mariiakuhaivska/lab2  

## Версії

- Node.js: v24.22.0
- npm: 11.19.1
- Sass (dart-sass): ^1.105.2 (див. `devDependencies` у `package.json`), встановлюється через `npm install`

## Запуск з нуля

```bash
git clone <адреса репозиторію>
cd <папка>
npm install
npm run build
```

Після цього сторінка відкривається через `index.html`. CSS збирається у читабельному вигляді (`--style=expanded`).

## Команди

| Команда | Що робить |
| --- | --- |
| `npm run scss:build` | Один раз компілює `src/scss/main.scss` у `css/style.css` |
| `npm run scss:watch` | Стежить за файлами в `src/scss` і перекомпілює CSS при кожному збереженні (зупинка: Ctrl+C) |
| `npm run build:cards` | Читає `data/products.json` через `fs` і замінює вміст між `<!-- cards:start -->` та `<!-- cards:end -->` в `index.html` згенерованими картками |
| `npm run build` | Повне збирання: спочатку `build:cards`, потім `scss:build` |

## Структура

```
├── index.html              сторінка; картки між маркерами генеруються
├── css/
│   ├── style.css           зібраний CSS (генерується, руками не правиться)
│   └── img/hero.jpg        фон Hero
├── src/scss/
│   ├── main.scss           точка входу: база, шапка, Hero, секції, підвал
│   ├── _variables.scss     змінні, брейкпоінти, міксини mobile / wide / framed-image
│   └── _catalog.scss       каталог і картки товарів
├── data/products.json      дані 6 товарів
├── scripts/build-cards.js  генерація карток
├── img/                    зображення
├── package.json
└── package-lock.json
```

## Як додати товар

Додайте об'єкт у `data/products.json` (поля `id`, `title`, `price`, `image`, `description`, `link`, необов'язково `oldPrice`; `description` використовується як alt-текст зображення) і виконайте `npm run build:cards`. HTML карток вручну не редагується.

## Важливо

- `css/style.css` генерується з `src/scss`, тому змінюйте тільки scss.
- `node_modules` у репозиторій не потрапляє (`.gitignore`), `package-lock.json` зберігається.
- Скрипт використовує CommonJS (`require`), `"type": "module"` у `package.json` не потрібен.
- Зібраний `css/style.css` залишено в репозиторії, щоб сторінка працювала на GitHub Pages без збирання.

## Застосовані техніки лабораторної 1

Семантична структура HTML, адаптивна верстка (Flexbox, Grid, clamp, медіазапити), мобільне меню на `dialog`, шрифт Saira через Google Fonts, доступність (`aria-*`, `:focus-visible`, `prefers-reduced-motion`).
