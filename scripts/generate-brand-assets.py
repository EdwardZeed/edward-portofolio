"""Generates the EZ monogram icons and the social preview image in /public.

Run from the repo root: python3 scripts/generate-brand-assets.py
Requires Pillow and macOS system fonts (Helvetica).
"""
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PUBLIC = Path(__file__).resolve().parent.parent / "public"
FONT = "/System/Library/Fonts/Helvetica.ttc"
BOLD = 1  # face index of Helvetica Bold inside the .ttc

PAPER = (251, 250, 248)
INK = (16, 24, 32)
MUTED = (89, 100, 117)
BLUE = (40, 119, 189)
TEAL = (18, 191, 178)


def font(size, index=0):
    return ImageFont.truetype(FONT, size, index=index)


def monogram(size):
    """Ink rounded square with a white EZ and a teal rule, drawn at 4x then downsampled."""
    s = size * 4
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((0, 0, s - 1, s - 1), radius=int(s * 0.22), fill=INK)
    f = font(int(s * 0.46), BOLD)
    box = d.textbbox((0, 0), "EZ", font=f)
    w, h = box[2] - box[0], box[3] - box[1]
    x, y = (s - w) / 2 - box[0], (s - h) / 2 - box[1] - s * 0.04
    d.text((x, y), "EZ", font=f, fill=(255, 255, 255))
    rule_y = y + box[3] + s * 0.07
    d.rectangle((s * 0.3, rule_y, s * 0.7, rule_y + s * 0.045), fill=TEAL)
    return img.resize((size, size), Image.LANCZOS)


def globe(d, cx, cy, radius, scale):
    """Same Fibonacci-sphere network as src/components/ConnectionGlobe.tsx."""
    pts = []
    for i in range(28):
        y = 1 - (i / 27) * 2
        r = math.sqrt(1 - y * y)
        a = i * math.pi * (3 - math.sqrt(5))
        pts.append((math.cos(a) * r, y, math.sin(a) * r))
    angle, tilt = 0.3, -0.12
    proj = []
    for x, y, z in pts:
        x1 = x * math.cos(angle) + z * math.sin(angle)
        z1 = -x * math.sin(angle) + z * math.cos(angle)
        y2 = y * math.cos(tilt) - z1 * math.sin(tilt)
        z2 = y * math.sin(tilt) + z1 * math.cos(tilt)
        proj.append((cx + x1 * radius, cy + y2 * radius, z2))
    d.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), outline=(214, 222, 230), width=2 * scale)
    for i, a in enumerate(pts):
        for j, b in enumerate(pts):
            if j > i and math.dist(a, b) < 0.76:
                depth = (proj[i][2] + proj[j][2] + 2) / 4
                shade = int(230 - depth * 70)
                d.line((proj[i][:2], proj[j][:2]), fill=(shade, shade + 6, shade + 14), width=2 * scale)
    companies = {4, 10, 16, 22}
    for i, (x, y, z) in sorted(enumerate(proj), key=lambda p: p[1][2]):
        size = ((4.2 if i in companies else 2) + (z + 1) * (1.4 if i in companies else 1.05)) * 1.6 * scale
        fill = BLUE if i in companies else (130, 160, 192)
        d.ellipse((x - size, y - size, x + size, y + size), fill=fill)


def og_image():
    scale = 2
    w, h = 1200 * scale, 630 * scale
    img = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(img)
    globe(d, 905 * scale, 315 * scale, 215 * scale, scale)
    left = 80 * scale
    d.text((left, 150 * scale), "SOFTWARE ENGINEER", font=font(20 * scale, BOLD), fill=(95, 109, 124))
    d.text((left, 190 * scale), "Edward Zheng", font=font(84 * scale, BOLD), fill=INK)
    body = font(30 * scale)
    d.text((left, 310 * scale), "Full-stack development, quality", font=body, fill=MUTED)
    d.text((left, 352 * scale), "automation and systems people can trust.", font=body, fill=MUTED)
    d.rectangle((left, 452 * scale, left + 56 * scale, 456 * scale), fill=TEAL)
    d.text((left, 476 * scale), "thecoolestportfolio.com", font=font(24 * scale), fill=BLUE)
    img.resize((1200, 630), Image.LANCZOS).save(PUBLIC / "og-image.png", optimize=True)


if __name__ == "__main__":
    monogram(192).save(PUBLIC / "logo192.png", optimize=True)
    monogram(512).save(PUBLIC / "logo512.png", optimize=True)
    monogram(180).save(PUBLIC / "apple-touch-icon.png", optimize=True)
    monogram(256).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    og_image()
