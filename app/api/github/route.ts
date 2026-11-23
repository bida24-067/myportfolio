import { NextRequest, NextResponse } from 'next/server'
import { portfolioData } from '@/src/data/portfolio'



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const repo = searchParams.get('repo')

  if (!repo) {
    return NextResponse.json({ error: 'Missing repo parameter' }, { status: 400 })
  }

  // Check our curated portfolio data first
  const fallbackRepo = portfolioData.repos[repo]

  try {
    // Attempt live fetch from GitHub REST API
    // Using bida24-067 or custom owner
    const owner = 'bida24-067'
    const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Blanc-Portfolio-Safari/1.0',
      },
      next: { revalidate: 3600 }, // Cache on edge for 1 hour
    })

    if (ghRes.ok) {
      const ghData = await ghRes.json()

      // Fetch README if available
      let readmeContent = fallbackRepo?.readmeMarkdown || ''
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
          headers: {
            Accept: 'application/vnd.github.raw',
            'User-Agent': 'Blanc-Portfolio-Safari/1.0',
          },
          next: { revalidate: 3600 },
        })
        if (readmeRes.ok) {
          readmeContent = await readmeRes.text()
        }
      } catch {
        // use fallback readme
      }

      return NextResponse.json({
        slug: repo,
        name: ghData.name || repo,
        description: ghData.description || fallbackRepo?.description || '',
        stars: ghData.stargazers_count ?? fallbackRepo?.stars ?? 0,
        forks: ghData.forks_count ?? fallbackRepo?.forks ?? 0,
        language: ghData.language || fallbackRepo?.language || 'Python',
        languages: fallbackRepo?.languages || { [ghData.language || 'Python']: 100 },
        license: ghData.license?.name || fallbackRepo?.license || 'MIT License',
        defaultBranch: ghData.default_branch || 'main',
        readmeMarkdown: readmeContent,
        tree: fallbackRepo?.tree || [],
        source: 'github-live',
      })
    }
  } catch (err) {
    console.warn(`GitHub API request failed for ${repo}, falling back to curated repo data`, err)
  }

  // Graceful fallback to rich local repository schema
  if (fallbackRepo) {
    return NextResponse.json({
      ...fallbackRepo,
      source: 'curated-fallback',
    })
  }

  // Generic fallback if repo is not found
  return NextResponse.json({
    slug: repo,
    name: repo,
    description: 'Repository for Loago Kevin Montsho (Mov) project.',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    languages: { TypeScript: 100 },
    license: 'MIT License',
    defaultBranch: 'main',
    readmeMarkdown: `# ${repo}\n\nProject repository by Loago Kevin Montsho (@bida24-067).\n\nCheck out [loagomov.blancsociety.co.uk](https://loagomov.blancsociety.co.uk) for full system specifications.`,
    tree: [
      { name: 'README.md', type: 'file', path: 'README.md', size: '1.2 KB' },
    ],
    source: 'generated-fallback',
  })
}
