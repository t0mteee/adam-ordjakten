#!/bin/bash
# Läser in Ordjaktens röst som ljudfiler på en Mac, med Alva Premium.
#
#     node verktyg/rost-fraser.mjs
#     ./verktyg/gor-rost.sh [--namn Adam] [--takt 145] [--rost "Alva (Premium)"]
#
set -euo pipefail
cd "$(dirname "$0")/.."

TAKT=145; ROST=""; FORMAT="m4a"; NAMN=()
while [ $# -gt 0 ]; do
  case "$1" in
    --namn) NAMN+=("$2"); shift 2;;
    --takt) TAKT="$2"; shift 2;;
    --rost) ROST="$2"; shift 2;;
    *) echo "Okänt val: $1"; exit 1;;
  esac
done

if ! command -v say >/dev/null 2>&1; then
  echo "Det här skriptet behöver macOS: kommandot say saknas."; exit 1
fi

rostnamn(){ sed -E 's/[[:space:]]+(sv_SE|sv-SE).*$//; s/[[:space:]]+$//' | head -1; }
if [ -z "$ROST" ]; then
  LISTA=$(say -v '?' | grep -i '^Alva' || true)
  ROST=$(printf '%s\n' "$LISTA" | grep -i 'premium' | rostnamn || true)
  [ -z "$ROST" ] && ROST=$(printf '%s\n' "$LISTA" | grep -iE 'enhanced|förbättrad' | rostnamn || true)
  [ -z "$ROST" ] && ROST=$(printf '%s\n' "$LISTA" | rostnamn || true)
  if [ -z "$ROST" ]; then
    echo "Ingen svensk röst Alva hittades under Systeminställningar → Hjälpmedel → Uppläst innehåll."
    exit 1
  fi
fi

slug(){
  printf '%s' "$1" | perl -CS -pe '$_ = lc; s/å/aa/g; s/ä/ae/g; s/ö/oe/g; s/é/e/g; s/ü/u/g; s/[^a-z0-9 ]//g; s/ +/-/g; s/^-|-$//g' 2>/dev/null \
    || printf '%s' "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g; s/  */-/g'
}

[ -f verktyg/rost-fraser.txt ] || node verktyg/rost-fraser.mjs

mkdir -p ljud/rost
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
IDS=(); antal=0

las(){
  local id="$1" text="$2" ut="ljud/rost/$1.$FORMAT"
  say -v "$ROST" -r "$TAKT" -o "$TMP/klipp.aiff" "$text"
  afconvert -f m4af -d aac -b 48000 "$TMP/klipp.aiff" "$ut" >/dev/null
  IDS+=("$id"); antal=$((antal + 1))
  printf '\r%4d  %-60.60s' "$antal" "$id"
}

echo "Läser in Ordjakten med \"$ROST\", $TAKT ord/min."
while IFS=$'\t' read -r id text; do
  [ -z "$id" ] && continue
  case "$id" in \#*) continue;; esac
  las "$id" "$text"
done < verktyg/rost-fraser.txt

for n in "${NAMN[@]:-}"; do [ -n "$n" ] && las "$(slug "$n")" "$n"; done

{
  printf '{\n  "rost": "%s",\n  "takt": %s,\n  "format": "%s",\n  "datum": "%s",\n  "klipp": [' "$ROST" "$TAKT" "$FORMAT" "$(date +%F)"
  forsta=1
  for id in "${IDS[@]}"; do
    if [ $forsta = 1 ]; then forsta=0; else printf ','; fi
    printf '\n    "%s"' "$id"
  done
  printf '\n  ]\n}\n'
} > ljud/rost/index.json

printf '\r%-70s\n' "$antal klipp i ljud/rost ($(du -sh ljud/rost | cut -f1))."
