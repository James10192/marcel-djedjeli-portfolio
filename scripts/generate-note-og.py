# Génère les images Open Graph des notes African Builder Notes (1200x630)
# dans la grammaire du plan : fond encre + grille, crochets lime, titre en Syne.
# Usage : PYTHONIOENCODING=utf-8 py scripts/generate-note-og.py
# Les fonts TTF sont dérivées des woff2 du site (voir claude-fonts en temp).

from PIL import Image, ImageDraw, ImageFont
import os, textwrap

INK = (10, 10, 8)
PAPER = (240, 237, 232)
MUTED = (136, 136, 128)
LIME = (212, 240, 60)
LINE = (42, 42, 38)

FONTS = 'C:/Users/yabla/AppData/Local/Temp/claude-fonts'
SYNE = os.path.join(FONTS, 'syne-800.ttf')
MONO = os.path.join(FONTS, 'dm-mono-400.ttf')
SERIF = os.path.join(FONTS, 'instrument-serif-400-italic.ttf')

NOTES = [
    ('former-des-batisseurs', '01', "On forme des développeurs. Mais forme-t-on des bâtisseurs ?"),
    ('le-code-n-est-pas-le-produit', '02', "Le code n'est pas le produit."),
]

def brackets(d, x0, y0, x1, y1, arm=34, t=5, color=LIME):
    d.rectangle([x0, y0, x0 + arm, y0 + t], fill=color)
    d.rectangle([x0, y0, x0 + t, y0 + arm], fill=color)
    d.rectangle([x1 - arm, y0, x1, y0 + t], fill=color)
    d.rectangle([x1 - t, y0, x1, y0 + arm], fill=color)
    d.rectangle([x0, y1 - t, x0 + arm, y1], fill=color)
    d.rectangle([x0, y1 - arm, x0 + t, y1], fill=color)
    d.rectangle([x1 - arm, y1 - t, x1, y1], fill=color)
    d.rectangle([x1 - t, y1 - arm, x1, y1], fill=color)

def make(slug, ep, title):
    im = Image.new('RGB', (1200, 630), INK)
    d = ImageDraw.Draw(im)
    # grille d'ingénieur discrète
    for x in range(0, 1200, 60):
        d.line([(x, 0), (x, 630)], fill=(18, 18, 16), width=1)
    for y in range(0, 630, 60):
        d.line([(0, y), (1200, y)], fill=(18, 18, 16), width=1)

    mono_s = ImageFont.truetype(MONO, 22)
    mono_xs = ImageFont.truetype(MONO, 19)
    num_f = ImageFont.truetype(SYNE, 120)

    # cadre viseur
    brackets(d, 48, 48, 1152, 582)

    # bandeau haut : série + épisode
    d.text((96, 88), 'AFRICAN BUILDER NOTES', font=mono_s, fill=LIME)
    w = d.textlength('AFRICAN BUILDER NOTES', font=mono_s)
    d.text((96 + w + 24, 88), f'/  ÉPISODE {ep}', font=mono_s, fill=MUTED)

    # numéro géant
    d.text((92, 150), ep, font=num_f, fill=LIME)

    # titre : wrap sur ~3 lignes, taille adaptée à la longueur
    size = 64 if len(title) > 40 else 76
    tf = ImageFont.truetype(SYNE, size)
    lines = textwrap.wrap(title, width=26 if size == 64 else 22)
    y = 286
    for line in lines[:4]:
        d.text((96, y), line, font=tf, fill=PAPER)
        y += int(size * 1.12)

    # pied : signature + curseur
    d.text((96, 536), 'LeVraiMD_DEV', font=mono_xs, fill=MUTED)
    w2 = d.textlength('LeVraiMD_DEV', font=mono_xs)
    d.rectangle([96 + w2 + 8, 538, 96 + w2 + 20, 556], fill=LIME)
    sig = 'marcel-djedjeli-portfolio.vercel.app/notes'
    w3 = d.textlength(sig, font=mono_xs)
    d.text((1152 - 48 - w3, 536), sig, font=mono_xs, fill=MUTED)

    out = f'public/og/notes/{slug}.png'
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, optimize=True)
    print(out, os.path.getsize(out))

# une image générique pour l'index /notes
def make_index():
    im = Image.new('RGB', (1200, 630), INK)
    d = ImageDraw.Draw(im)
    for x in range(0, 1200, 60):
        d.line([(x, 0), (x, 630)], fill=(18, 18, 16), width=1)
    for y in range(0, 630, 60):
        d.line([(0, y), (1200, y)], fill=(18, 18, 16), width=1)
    brackets(d, 48, 48, 1152, 582)
    mono_s = ImageFont.truetype(MONO, 24)
    big = ImageFont.truetype(SYNE, 92)
    serif = ImageFont.truetype(SERIF, 92)
    mono_xs = ImageFont.truetype(MONO, 19)
    d.text((96, 120), 'LES NOTES DE CHANTIER DE', font=mono_s, fill=MUTED)
    d.text((92, 180), 'African', font=big, fill=PAPER)
    w = d.textlength('African ', font=big)
    d.text((92 + w, 180), 'Builder', font=serif, fill=LIME)
    d.text((92, 290), 'Notes', font=big, fill=PAPER)
    d.text((96, 440), 'Une thèse par épisode, tirée de ce qui casse', font=mono_s, fill=MUTED)
    d.text((96, 475), 'et de ce qui tient en production.', font=mono_s, fill=MUTED)
    d.text((96, 522), 'LeVraiMD_DEV', font=mono_xs, fill=MUTED)
    w2 = d.textlength('LeVraiMD_DEV', font=mono_xs)
    d.rectangle([96 + w2 + 8, 524, 96 + w2 + 20, 542], fill=LIME)
    im.save('public/og/notes/index.png', optimize=True)
    print('public/og/notes/index.png', os.path.getsize('public/og/notes/index.png'))

for slug, ep, title in NOTES:
    make(slug, ep, title)
make_index()
