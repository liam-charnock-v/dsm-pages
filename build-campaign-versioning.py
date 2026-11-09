#!/usr/bin/env python3
"""Builds the public copy of the allocation-history prototypes for Vercel.

    python3 build-campaign-versioning.py
    cd campaign-versioning && npx vercel deploy --prod

Pages:   /          MVP (current vs previous)
         /timeline  Timeline panel
         /stepper   Step through with arrows

Only the files the pages use are copied. The public copy also drops the internal
UAT address and replaces the real person's name in the campaign title.
"""
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / 'dsm-campaign_files'
OUT = ROOT / 'campaign-versioning'

PAGES = {
    'index.html': 'dsm-campaign-allocation-compare.html',
    'timeline.html': 'dsm-campaign-version-timeline.html',
    'stepper.html': 'dsm-campaign-version-stepper.html',
}
ASSETS = [
    'main.b74206aab13b89102f35.css',
    'vendor.b74206aab13b89102f35.css',
    'src_components_pages_Planner_PlannerSections_AllocationContentAccordion_tsx-src_components_pa-b19fcc.b74206aab13b89102f35.css',
    'guide-media-e2e92fe1-6e50-4bc8-bd3f-3025c75c0e14',
    'prototype/snapshot-fixes.css',
    'prototype/map.js',
    'prototype/allocation-compare.css',
    'prototype/allocation-compare.js',
    'version-history/core.css',
    'version-history/core.js',
    'version-history/timeline.css',
    'version-history/timeline.js',
    'version-history/stepper.css',
    'version-history/stepper.js',
]


def clean(html):
    html = re.sub(r'<!-- saved from url=\([^)]*\)[^>]*-->\s*', '', html, count=1)
    html = re.sub(r'<link rel="shortcut icon"[^>]*prog\.uat\.develop\.farm[^>]*>', '', html)
    html = html.replace('Ana Catarina Figueiredo', 'Demo Planner')
    assert 'develop.farm' not in html and 'Figueiredo' not in html
    return html


def main():
    for rel in ASSETS:
        dest = OUT / 'dsm-campaign_files' / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(SRC / rel, dest)
    for out_name, src_name in PAGES.items():
        html = (ROOT / src_name).read_text(encoding='utf-8')
        (OUT / out_name).write_text(clean(html), encoding='utf-8')
    # /timeline and /stepper without the .html
    (OUT / 'vercel.json').write_text(json.dumps({'cleanUrls': True}, indent=2) + '\n')
    for p in sorted(OUT.rglob('*')):
        if p.is_file() and '.vercel' not in p.parts:
            print(p.relative_to(ROOT))


if __name__ == '__main__':
    main()
