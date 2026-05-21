# 도보맛집 사진

## 현재 (3장만 유효)

| slug | 파일 | 출처 |
|------|------|------|
| `deungdae-agujjim` | 등대 아구찜 음식 | 다이닝코드 |
| `hallim-kalguksu` | 한림칼국수 | 비짓제주 |
| `sahyungje` | 사형제 횟집 | 비짓제주 |

**나머지 18곳:** 사진 없음. 네이버 지도 타일을 긁어 온 잘못된 파일은 전부 삭제함.

## 호스트 허락본 넣기 (권장)

단골 업체에서 받은 **가게·음식 사진**을 같은 이름으로 저장:

```bash
bun scripts/collect-food-photos.mjs --import ./받은사진.jpg yeongrim-pork
```

`data/food-photo-sources.json`에 slug·상호 목록 있음.

## 자동 수집

지도 스크래핑·무단 다운로드는 하지 않음. 다이닝코드 `profile.php?rid=` 등 **음식 사진 URL**만 `food-photo-sources.json`의 `downloadUrl`에 넣고:

```bash
bun scripts/collect-food-photos.mjs
```
