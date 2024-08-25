# Start Template: Gulp + WebPack + ESBuild-Loader

## Для работы используйте такие команды

-   Для установки всех зависимостей: `npm install`;
-   Для запуска сборщика Gulp нужно использовать: `npm run dev`;
-   Для сборки проекта в режиме `"production"`: `npm run build`;
-   Для просмотра финального вариант в режиме `"production"`: `npm run preview`.

## Что делает Gulp?

-   сжимает HTML в режиме `production`;
-   удаляет комментарии из HTML в режиме `production`;
-   собирает SCSS файлы, добавляет вендорные префиксы;
-   удаляет комментарии из SCSS файлов, сортирует и группирует медиа-запросы;
-   в режиме `production` сжимает CSS и делает копию без сжатия;
-   конвертирует шрифты в `.ttf`, и из `.ttf` в `woff/woff2`;
-   создает файл для подключения шрифтов. Данный файл создается по такому пути: `src/scss/config/fonts.scss`, выглядит это так:

```scss
@font-face {
	font-family: Inter;
	font-display: swap;
	src: url("../fonts/Inter-Bold.woff2") format("woff2");
	font-weight: 700;
	font-style: normal;
}
```

### ВНИМАНИЕ!!!

> Если в папке `src/scss/config` - уже есть файл `fonts.scss` - тогда при добавлении новых шрифтов **НУЖНО УДАЛИТЬ** старый файл `fonts.scss`. Не переживай, при повторном запуске сборки - Gulp все новые шрифты сконвертирует и создаст новый файл `fonts.scss`.

Дальше, что еще умеет сборка:

-   сжимает изображения и конвертирует их дополнительно в формат `.webp` и подключает их если браузер поддерживает этот формат;
-   копирует папку `/static` с содержимым в финальную сборку. То есть любые файлы можно поместить в эту папку и она будет добавлена в финальную сборку без лишней обработки;
-   отдельной командой `npm run svgSprive` создает "svg спрайты";
-   перед каждым запуском сборщика чистит папку с финальным проектом, чтобы не собирать мусор;
-   отдельной командой `npm run zip` можно заархивировать финальную папку для заказчика **с именем проекта**;
-   так же для разработки `gulp` запускает сервер с автоматической перезагрузкой окна в браузере при изменении файлов в проекте;
-   отдельной командой `npm run deployFTP` финальный проект выгружается на хостинг. Опции для отправки проекта на нужный хостинг указываются в файле: `gulp/config/ftp.js`;
-   с 18.08.2023 есть поддержка шрифтов с такими названиями например: "`Inter-Regular[ |-|_|__][I|i]talic`" - такие названия Gulp правильно обработает и запишет в стили `font-style: normal/italic`;
-   Конвертация шрифтов происходит в папке `src/fonts` от туда шрифты с расширением `.woff2` переносятся в `dist/fonts`. Если файл для подключения шрифтов уже создан - gulp просто перенесет шрифты `*.woff2` в `dist/fonts` без лишней трудозатратной конвертации.

## Что делает WebPack?

-   именно `webpack` в данной сборке занимается обработкой файлов c JavaScript;
-   поддерживается модульное подключение скриптов `import/export`;
-   позволяет создавать больше одного файла скриптов, чтобы подключать их на отдельные `html` страницы, для этого в корне папки `./src/js` создай нужный тебе файл;
-   при импорте нет необходимости писать расширение файла `.js`, так же если осуществляется импорт из файла `index.js` необязательно это указывать:

```javascript
import * as helpers from "./helpers"; // './helpers/index.js'
```

-   `webpack` c помощью `esbuild-loader` позволяет тебе писать код на любимом **ES6+**;
-   в режиме `"production"` при финальной сборке файлы JS сжимаются, а лишние комментарии удаляются.
-   с 11.2023 в сборке доступна сборка "мульти-файлов". То есть теперь на выходе можно иметь не один файл стилей `main.css`
    и один файл скриптов `main.js` - а столько, сколько тебе нужно. Для этого в папке `./src/js` в корне создай нужные файлы, а на выходе получишь их собранными.
    Для стилей в папке `./src/scss` создай папку `pages` и там создавай новые файлы стилей для новых страниц.

## Финал

Отдельной вишенкой является плагин `gh-pages` для деплоя папки `/dist` на отдельную ветку GitHub,
чтобы красиво развернуть свой проект на GitHub Pages.
Для этого в `package.json` укажи в поле **homepage** ссылку на свою страницу gh-pages:

```json
"homepage": "https://{UserName}.github.io/{NameRepo}",
```

С 05.05.2024 появилась возможность запустить финальный вариант для превью на свой компьютере,
для этого есть команда: `npm run preview`.

По любым вопросам касающихся сборки пишите мне в [Telegram](https://t.me/StarkElessar).
