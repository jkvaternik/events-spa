export MIX_ENV=prod
export PORT=4969

CFGD=$(readlink -f ~/.config/events_spa)

if [ ! -e "$CFGD/base" ]; then
    echo "run deploy first"
    exit 1
fi

DB_PASS=$(cat "$CFGD/db_pass")
export DATABASE_URL=ecto://events:$DB_PASS@localhost/events_spa_prod

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE

_build/prod/rel/events/bin/events start