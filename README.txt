AVITO GIG — Netlify Mini App + Telegram HTML Widget 10.4

Contents:
  public/index.html               - existing full map app (same version)
  netlify/functions/telegram.mjs  - Telegram Bot API 10.4 webhook
  netlify.toml                    - publish / functions paths

Deploy options:
A. Easiest without Terminal: connect a GitHub repository to the EXISTING Netlify project,
   then commit this project folder (contents at repository root). Netlify builds the
   function and keeps your Mini App at the same URL.
   Netlify > Project configuration > Developer settings > Continuous deployment
   > Repository > Link repository (or Push to new repository, then upload files).
B. Netlify CLI: log in to Netlify, link existing project, then run netlify deploy --build --prod.
   NOTE: simply dropping ZIP into Netlify Drop is NOT reliable for server functions.

Netlify > Project configuration > Environment variables (scope Functions):
  BOT_TOKEN       - secret bot token from @BotFather
  WEBHOOK_SECRET  - random letters, numbers, hyphens or underscores; 16+ chars
  MAP_URL         - optional full HTTPS URL of existing Mini App; default same site

After deploy, test:
  https://YOUR-SITE.netlify.app/.netlify/functions/telegram?health=1
  expected: {ok:true,...,bot_configured:true,secret_configured:true}

Telegram webhook setup in Mac Terminal (don't send secrets to anyone):

  read -s 'BOT_TOKEN?BotFather token: '; echo
  read -s 'WEBHOOK_SECRET?Webhook secret: '; echo
  SITE_URL='https://YOUR-SITE.netlify.app'
  curl -sS -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
    --data-urlencode "url=${SITE_URL}/.netlify/functions/telegram" \
    --data-urlencode "secret_token=${WEBHOOK_SECRET}" \
    --data-urlencode 'allowed_updates=["message","widget_query"]'
  unset BOT_TOKEN WEBHOOK_SECRET

Note: setWebhook replaces any prior Telegram bot webhook. Telegram widget is
supported in private chats in production. Open @avitogigBot and send /start.
Full Yandex map remains in Mini App opened via the bot's menu.

Source of shifts: public Google Sheets 14sA0J06... (gid 142160930), columns A:N.
Geo coordinates read directly from M/N. Date filters today/tomorrow use Moscow time.
