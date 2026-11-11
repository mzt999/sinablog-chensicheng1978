import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const BLOG_DIR = join(process.cwd(), 'content/blog')

export type MonthEntry = [string, string[]]

export interface YearPicCount {
  year: string
  picCount: number
}

export interface BlogImagesResult {
  yearData: MonthEntry[]
  yearlyCount: YearPicCount[]
}

export interface GroupImagesOptions {
  /** 指定年份；不传则取有图片的最新一年 */
  year?: number
  /** 是否排除 .gif */
  excludeGif?: boolean
}

// ---------- 内部工具（与之前一致） ----------

function parseAttrs(s: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g
  let m: RegExpExecArray | null
  while ((m = re.exec(s))) attrs[m[1].toLowerCase()] = m[3] ?? m[4] ?? m[5] ?? ''
  return attrs
}

function urlToPicFilename(url: string): string {
  if (!url) return ''
  if (/^(data|blob|javascript):/i.test(url)) return ''

  const clean = url.split(/[?#]/)[0]
  let seg = clean.split('/').filter(Boolean).pop() || ''
  if (!seg) return ''

  if (/\.html?$/i.test(seg)) return ''
  if (/&690$/.test(seg)) seg = seg.slice(0, -4)
  if (!/\.[A-Za-z0-9]+$/.test(seg)) seg += '.jpg'

  return `pic/${seg}`
}

function extractImageFilenames(body: string): string[] {
  if (!body) return []
  const urls: string[] = []

  const mdRe = /!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)"']+))(?:\s+["'][^"']*["'])?\s*\)/g
  let m: RegExpExecArray | null
  while ((m = mdRe.exec(body))) urls.push(m[1] || m[2])

  const imgRe = /<img\b([^>]*)>/gi
  while ((m = imgRe.exec(body))) {
    const attrs = parseAttrs(m[1])
    const u = (attrs.real_src || attrs.src || '').trim()
    if (u) urls.push(u)
  }

  return urls.map(urlToPicFilename).filter(Boolean)
}

function parseYearMonth(s: string): { year: number; month: number } | null {
  if (!s) return null
  const m = s.match(/^(\d{4})[-/.](\d{1,2})/)
  if (m) {
    const year = +m[1], month = +m[2]
    if (month >= 1 && month <= 12) return { year, month }
  }
  const d = new Date(s)
  if (!isNaN(d.getTime())) return { year: d.getFullYear(), month: d.getMonth() + 1 }
  return null
}

function splitFrontMatter(raw: string) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  if (!m) return { fm: {} as Record<string, string>, body: raw }

  const fm: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^([\w-]+)\s*:\s*(.*)$/)
    if (!mm) continue
    let v = mm[2].trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    fm[mm[1].toLowerCase()] = v
  }
  return { fm, body: raw.slice(m[0].length) }
}

// ---------- 对外函数 ----------

/**
 * 按年份 → 月份归集博客图片，并统计所有年份的图片数量
 * @returns { yearData, yearlyCount }
 */
export function getImagesByMonth(options: GroupImagesOptions = {}): BlogImagesResult {
  const { year, excludeGif = false } = options

  let files: string[]
  try {
    files = readdirSync(BLOG_DIR).filter(f => /\.(md|markdown)$/i.test(f))
  } catch {
    return { yearData: [], yearlyCount: [] }
  }

  const items: Array<{ year: number; month: number; images: string[] }> = []

  for (const file of files) {
    let raw: string
    try { raw = readFileSync(join(BLOG_DIR, file), 'utf8') } catch { continue }

    const { fm, body } = splitFrontMatter(raw)
    const ym = parseYearMonth(fm.date || '')
    if (!ym) continue

    let imgs = extractImageFilenames(body)
    if (excludeGif) imgs = imgs.filter(u => !/\.gif$/i.test(u))
    if (!imgs.length) continue
    items.unshift({ year: ym.year, month: ym.month, images: imgs })
    // items.push({ year: ym.year, month: ym.month, images: imgs })
  }

  if (!items.length) return { yearData: [], yearlyCount: [] }

  // 按日期升序，保证月内图片顺序稳定
  items.sort((a, b) => (a.year - b.year) || (a.month - b.month))

  // 年份 → 月份 → 图片
  const byYear = new Map<number, Map<number, string[]>>()
  for (const it of items) {
    if (!byYear.has(it.year)) byYear.set(it.year, new Map())
    const mMap = byYear.get(it.year)!
    if (!mMap.has(it.month)) mMap.set(it.month, [])
    mMap.get(it.month)!.push(...it.images)
  }

  // ---- yearlyCount：所有年份的图片总数，年份降序 ----
  const yearlyCount: YearPicCount[] = Array.from(byYear.entries())
    .map(([y, mMap]) => {
      const picCount = Array.from(mMap.values()).reduce((sum, arr) => sum + arr.length, 0)
      return { year: String(y), picCount }
    })
    .sort((a, b) => Number(b.year) - Number(a.year))

  // ---- yearData：目标年份的按月归集 ----
  const targetYear = year ?? Math.max(...byYear.keys())
  const mMap = byYear.get(targetYear)

  const yearData: MonthEntry[] = mMap
    ? Array.from(mMap.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([mo, imgs]) => [String(mo), imgs] as MonthEntry)
    : []

  return { yearData, yearlyCount }
}