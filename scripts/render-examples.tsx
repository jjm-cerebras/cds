/**
 * render-examples — server-render the CDS component library to a static gallery
 * at examples/components.html. Because the HTML is produced from the actual
 * components (not hand-authored), it cannot drift from them. The document links
 * the generated src/tokens.css + src/components.css and loads the CDS fonts, so
 * every var(--…) in the inline styles resolves in the browser.
 *
 * Run:  npm run examples   (runs the token build first, then this via tsx)
 */
import { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Search, Filter, Plus, Trash2, MoreHorizontal } from 'lucide-react'
import {
  Breadcrumbs, Heading, Button, SquareButton, IconButton, TextButton, Textbox,
  Checkbox, RadioButton, Switch, SegmentedControl, Badge, Count, Stamp, StatusPill,
  Spinner, Tooltip, Notification, DropdownMenu, Tabs, Table
} from '../src/index'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>{children}</div>
)

type Cluster = { name: string; id: string; status: string; nodes: number }
const clusterData: Cluster[] = [
  { name: 'inference-prod', id: 'clu_a1b2c3', status: 'healthy', nodes: 64 },
  { name: 'training-eu', id: 'clu_d4e5f6', status: 'provisioning', nodes: 128 },
  { name: 'research-01', id: 'clu_g7h8i9', status: 'degraded', nodes: 16 }
]
const clusterColumns = [
  { label: 'Name', field: 'name' as const },
  { label: 'Cluster ID', field: 'id' as const, mono: true },
  {
    label: 'Status',
    field: 'status' as const,
    renderData: (v: unknown) => <StatusPill status={v as never}>{String(v)}</StatusPill>
  },
  { label: 'Nodes', field: 'nodes' as const, numeric: true }
]

const SECTIONS: { title: string; body: ReactNode }[] = [
  {
    title: 'Breadcrumbs',
    body: <Breadcrumbs items={[{ label: 'Organizations', href: '#' }, { label: 'Clusters', href: '#' }, { label: 'inference-prod' }]} />
  },
  {
    title: 'Heading',
    body: (
      <>
        <Heading variant="page" title="Clusters" description="Manage your organization's compute clusters." />
        <Heading variant="section" title="General" description="General information about this cluster." />
      </>
    )
  },
  {
    title: 'Button',
    body: (
      <Row>
        <Button>Create cluster</Button>
        <Button secondary leadingIcon={<Filter size={16} aria-hidden="true" />}>Filter</Button>
        <Button negative leadingIcon={<Trash2 size={16} aria-hidden="true" />}>Delete cluster</Button>
        <Button secondary negative>Cancel</Button>
        <Button small>Small</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Saving</Button>
      </Row>
    )
  },
  {
    title: 'SquareButton / IconButton',
    body: (
      <Row>
        <SquareButton label="Add" icon={<Plus size={16} aria-hidden="true" />} />
        <SquareButton label="Filter" selected icon={<Filter size={16} aria-hidden="true" />} />
        <IconButton label="More actions" icon={<MoreHorizontal size={16} aria-hidden="true" />} />
      </Row>
    )
  },
  {
    title: 'TextButton / PlainButton',
    body: <Row><TextButton>View billing history</TextButton></Row>
  },
  {
    title: 'Textbox',
    body: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <Textbox label="Cluster name" placeholder="inference-prod" helper="Lowercase, digits and dashes." />
        <Textbox label="Search" placeholder="Search clusters" leadingIcon={<Search size={16} aria-hidden="true" />} />
        <Textbox label="Region" required error="Select a region to continue." />
        <Textbox label="Cluster ID" defaultValue="clu_a1b2c3" readOnly />
      </div>
    )
  },
  {
    title: 'Selection controls',
    body: (
      <Row>
        <Checkbox label="Enable autoscaling" defaultChecked />
        <RadioButton name="tier" label="Standard" defaultChecked />
        <RadioButton name="tier" label="Priority" />
        <Switch label="Notifications" checked />
        <Switch label="Paused" />
        <SegmentedControl options={['Day', 'Week', 'Month']} value="Week" />
      </Row>
    )
  },
  {
    title: 'Status & metadata chips',
    body: (
      <Row>
        <Badge role="green">Active</Badge>
        <Badge role="purple" floor>Beta</Badge>
        <Count>3</Count>
        <Count brand>12</Count>
        <Stamp tier={1}>TIER 1</Stamp>
        <StatusPill status="healthy">Healthy</StatusPill>
        <StatusPill status="degraded">Degraded</StatusPill>
        <StatusPill status="provisioning">Provisioning</StatusPill>
        <StatusPill status="error">Failed</StatusPill>
      </Row>
    )
  },
  {
    title: 'Overlays & feedback',
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Row><Spinner /><Tooltip>Copied to clipboard</Tooltip></Row>
        <Notification role="success" onDismiss={() => {}}>Cluster created. It will be ready in a few minutes.</Notification>
        <Notification role="error" onDismiss={() => {}}>Couldn&apos;t reach the region. Check your network and retry.</Notification>
        <Notification role="warning">Deleting a cluster is permanent.</Notification>
        <Notification role="info">Autoscaling is enabled for this cluster.</Notification>
        <DropdownMenu />
      </div>
    )
  },
  {
    title: 'Tabs',
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Tabs variant="primary" value="Usage" />
        <Tabs variant="secondary" value="Overview" />
      </div>
    )
  },
  {
    title: 'Table',
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Table columns={clusterColumns} data={clusterData} />
        <Table columns={clusterColumns} data={[]} emptyText="No clusters yet. Create one to get started." />
      </div>
    )
  }
]

const Gallery = () => (
  <>
    {SECTIONS.map((s, i) => (
      <section
        key={i}
        style={{
          background: 'var(--colors-cds-neutral-0)',
          border: '1px solid var(--colors-divider)',
          borderRadius: 'var(--rounded-lg)',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadows-default)'
        }}
      >
        <h2
          style={{
            fontFamily: 'Sometype Mono, ui-monospace, monospace',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--colors-cds-neutral-500)',
            margin: '0 0 1.5rem'
          }}
        >
          {s.title}
        </h2>
        {s.body}
      </section>
    ))}
  </>
)

const body = renderToStaticMarkup(<Gallery />)

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cerebras Design System — components</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sometype+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../src/tokens.css" />
  <link rel="stylesheet" href="../src/components.css" />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--colors-surface);
      color: var(--colors-foreground);
      font-family: Manrope, ui-sans-serif, system-ui, sans-serif;
      padding: 3rem 2rem;
      max-width: 960px;
      margin-inline: auto;
    }
    h1 { font-family: Manrope; font-size: 1.25rem; font-weight: 500; letter-spacing: -0.02em; margin: 0 0 0.5rem; }
    .lede { color: var(--colors-cds-neutral-500); font-size: 0.875rem; margin: 0 0 2.5rem; }
  </style>
</head>
<body>
  <h1>Cerebras Design System — components</h1>
  <p class="lede">Generated from the component library by scripts/render-examples.tsx — do not edit by hand.</p>
  ${body}
</body>
</html>
`

writeFileSync(join(root, 'examples/components.html'), html)
console.log('render-examples: wrote examples/components.html')
