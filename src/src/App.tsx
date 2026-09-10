import { Route, Router, Switch, useSearch } from 'wouter';
import { AbaAssetsProvider } from '@workspace/aba-design-system';
import { IMAGES } from './portal/lib/assets';
import { Shell } from './portal/shell/Shell';
import { HomePage } from './portal/pages/Home';
import { BrandPage, VoicePage } from './portal/pages/brand/Brand';
import { LogoPage, PhotographyPage } from './portal/pages/brand/Logo';
import { ColourPage } from './portal/pages/foundations/Colour';
import { TypographyPage } from './portal/pages/foundations/Typography';
import { BreakpointsPage, GridPage, MotionPage, RadiiPage, ShadowsPage, SpacingPage, ZIndexPage } from './portal/pages/foundations/Scales';
import { IconographyPage } from './portal/pages/foundations/Iconography';
import { ComponentIndex } from './portal/pages/ComponentIndex';
import { ComponentPage } from './portal/pages/ComponentPage';
import { ExplodedHomepage, TemplatePage } from './portal/pages/templates/Templates';
import { ChangelogPage, GettingStartedPage, ResourcesPage } from './portal/pages/resources/Resources';
import { RoadmapPage } from './portal/pages/Roadmap';
import { Preview } from './portal/pages/Preview';
import { NotFound } from './portal/pages/NotFound';
import type { Tier } from './portal/registry';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

function PreviewRoute({ params }: { params: { tier: string; slug: string; example: string } }) {
  const search = useSearch();
  const anatomy = new URLSearchParams(search).get('anatomy') === '1';
  return <Preview tier={params.tier as Tier} slug={params.slug} example={params.example} anatomy={anatomy} />;
}

function Docs() {
  return (
    <Shell>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/brand" component={BrandPage} />
        <Route path="/brand/voice" component={VoicePage} />
        <Route path="/brand/logo" component={LogoPage} />
        <Route path="/brand/photography" component={PhotographyPage} />
        <Route path="/foundations" component={ColourPage} />
        <Route path="/foundations/colour" component={ColourPage} />
        <Route path="/foundations/typography" component={TypographyPage} />
        <Route path="/foundations/spacing" component={SpacingPage} />
        <Route path="/foundations/grid" component={GridPage} />
        <Route path="/foundations/radii" component={RadiiPage} />
        <Route path="/foundations/shadows" component={ShadowsPage} />
        <Route path="/foundations/motion" component={MotionPage} />
        <Route path="/foundations/iconography" component={IconographyPage} />
        <Route path="/foundations/z-index" component={ZIndexPage} />
        <Route path="/foundations/breakpoints" component={BreakpointsPage} />
        <Route path="/atoms">{() => <ComponentIndex tier="atoms" />}</Route>
        <Route path="/molecules">{() => <ComponentIndex tier="molecules" />}</Route>
        <Route path="/organisms">{() => <ComponentIndex tier="organisms" />}</Route>
        <Route path="/templates" component={TemplatePage} />
        <Route path="/templates/homepage" component={ExplodedHomepage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/resources/getting-started" component={GettingStartedPage} />
        <Route path="/resources/changelog" component={ChangelogPage} />
        <Route path="/roadmap" component={RoadmapPage} />
        <Route path="/:tier/:slug">{(p: { tier: string; slug: string }) => (['atoms', 'molecules', 'organisms'].includes(p.tier) ? <ComponentPage key={`${p.tier}/${p.slug}`} tier={p.tier as Tier} slug={p.slug} /> : <NotFound />)}</Route>
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

export default function App() {
  return (
    <Router base={base}>
      <AbaAssetsProvider images={IMAGES}>
        <Switch>
          <Route path="/preview/:tier/:slug/:example" component={PreviewRoute} />
          <Route component={Docs} />
        </Switch>
      </AbaAssetsProvider>
    </Router>
  );
}
