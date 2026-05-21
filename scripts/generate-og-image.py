#!/usr/bin/env python3
"""해묘서가 OG / 소셜 공유 이미지 (1200×630) — logo.png + 해묘서가 · BOOKSTAY."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "og-image.png"
LOGO = ROOT / "public" / "assets" / "logo.png"

W, H = 1200, 630

CANVAS = (251, 249, 242)
INK = (23, 42, 77)
INK_SOFT = (58, 74, 108)
ACCENT = (163, 58, 58)

NOTO_SERIF_KR_BOLD = Path("/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc")
NOTO_SERIF_KR = Path("/usr/share/fonts/opentype/noto/NotoSerifCJK-Medium.ttc")
DEJAVU_SERIF_ITALIC = Path("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf")
KR_INDEX = 1

TITLE_KO = "해묘서가"
TITLE_EN = "BOOKSTAY"


def load_font(path: Path, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size, index=index)


def draw_corners(draw: ImageDraw.ImageDraw) -> None:
    inset, arm = 36, 22
    c = (*INK, int(255 * 0.22))
    for x0, y0, dx, dy in [
        (inset, inset, 1, 1),
        (W - inset, inset, -1, 1),
        (inset, H - inset, 1, -1),
        (W - inset, H - inset, -1, -1),
    ]:
        draw.line([(x0, y0), (x0 + dx * arm, y0)], fill=c, width=2)
        draw.line([(x0, y0), (x0, y0 + dy * arm)], fill=c, width=2)


def paste_logo(canvas: Image.Image) -> int:
    """Returns logo width + gap for text x offset."""
    logo = Image.open(LOGO).convert("RGBA")
    size = 380
    logo = logo.resize((size, size), Image.Resampling.LANCZOS)
    x = 88
    y = (H - size) // 2
    canvas.paste(logo, (x, y), logo)
    return x + size + 56


TEXT_GAP = 40
TEXT_RIGHT_MARGIN = 80


def measure_title(
    draw: ImageDraw.ImageDraw,
    font_ko: ImageFont.FreeTypeFont,
    font_en: ImageFont.FreeTypeFont,
) -> tuple[int, int, int, int, int]:
    bbox_ko = draw.textbbox((0, 0), TITLE_KO, font=font_ko)
    bbox_en = draw.textbbox((0, 0), TITLE_EN, font=font_en)
    w_ko = bbox_ko[2] - bbox_ko[0]
    w_en = bbox_en[2] - bbox_en[0]
    h_ko = bbox_ko[3] - bbox_ko[1]
    h_en = bbox_en[3] - bbox_en[1]
    return w_ko, w_en, h_ko, h_en, max(w_ko, w_en)


def draw_titles(
    draw: ImageDraw.ImageDraw,
    text_left: int,
    font_ko: ImageFont.FreeTypeFont,
    font_en: ImageFont.FreeTypeFont,
) -> None:
    w_ko, w_en, h_ko, h_en, _ = measure_title(draw, font_ko, font_en)
    text_right = W - TEXT_RIGHT_MARGIN
    center_x = (text_left + text_right) // 2

    total_h = h_ko + TEXT_GAP + h_en
    y = (H - total_h) // 2

    x_ko = center_x - w_ko // 2
    x_en = center_x - w_en // 2

    draw.text((x_ko, y), TITLE_KO, font=font_ko, fill=INK)
    draw.text((x_en, y + h_ko + TEXT_GAP), TITLE_EN, font=font_en, fill=INK_SOFT)


def main() -> None:
    if not LOGO.exists():
        raise SystemExit(f"Missing logo: {LOGO}")

    kr_path = NOTO_SERIF_KR_BOLD if NOTO_SERIF_KR_BOLD.exists() else NOTO_SERIF_KR
    if not kr_path.exists():
        raise SystemExit("Noto Serif CJK font not found")

    if not DEJAVU_SERIF_ITALIC.exists():
        raise SystemExit("DejaVu Serif Italic not found")

    font_ko = load_font(kr_path, 118, KR_INDEX)
    font_en = load_font(DEJAVU_SERIF_ITALIC, 54)

    canvas = Image.new("RGB", (W, H), CANVAS)
    draw = ImageDraw.Draw(canvas)

    draw.rectangle([(0, 0), (W, 4)], fill=ACCENT)
    draw_corners(draw)

    text_left = paste_logo(canvas)
    draw_titles(draw, text_left, font_ko, font_en)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({W}×{H})")


if __name__ == "__main__":
    main()
