import React from 'react';
import { Link } from 'react-router-dom';
import SubpageHeader from '../components/SubpageHeader';
import ContactFooter from '../components/ContactFooter';
import useDocumentTitle from '../useDocumentTitle';
import { bybitCaseStudy } from '../data/projects';

const stats = [
  { value: '~70%', label: 'of my working day went on manual regression' },
  { value: '32', label: 'app releases in 3 months across Web, Android and iOS' },
  { value: '97%+', label: 'pass rate on the automation suite' },
  { value: '40%', label: 'more efficient regression testing' },
];

const snapshot = [
  { term: 'Role', detail: 'Compliance Quality Assurance' },
  { term: 'Company', detail: 'Bybit' },
  { term: 'Timeframe', detail: 'Nov 2025 – Aug 2026' },
  { term: 'Team', detail: '4 people on the compliance module; I covered the compliance and reporting module' },
  { term: 'Platforms', detail: 'Web, Android, iOS' },
  { term: 'Scope', detail: 'Internal ERP system and compliance module: KYC, KYB, AML, Travel Rule, transaction monitoring, tax reporting' },
  { term: 'Tools', detail: 'Playwright, Midscene (AI, vision-based UI automation), plus AI-assisted triage skills' },
  { term: 'Also tested', detail: 'Database consistency, middleware (Redis, Kafka), third-party integrations (tax identity verification, AML/screening providers)' },
];

function BybitCaseStudy() {
  useDocumentTitle('Bybit case study — Edward Zheng');

  return (
    <>
      <a className="skip-link" href="#case-study-title">Skip to content</a>
      <SubpageHeader />

      <main className="page subpage case-study">
        <header className="cs-hero">
          <Link className="back-link" to={`/projects#${bybitCaseStudy.slug}`}>← All projects</Link>
          <p className="eyebrow">Case study · Bybit</p>
          <h1 id="case-study-title" tabIndex={-1}>{bybitCaseStudy.title}</h1>
          <p className="cs-lede">
            I replaced most of my manual pre-release regression with UI and API automation using Playwright and
            Midscene. The suite held a 97%+ pass rate and regression testing became 40% more efficient. I also led a
            tax pre-control, from requirements to UAT, that stopped a bad user experience before it could happen.
          </p>
          <ul className="cs-stats" aria-label="Key numbers">
            {stats.map(stat => (
              <li key={stat.value}>
                <strong>{stat.value}</strong> {stat.label}
              </li>
            ))}
          </ul>
        </header>

        <section className="cs-section" aria-labelledby="cs-hook">
          <h2 id="cs-hook">The starting point</h2>
          <div className="cs-body">
            <p>
              Every requirement shipped on three platforms: Web, Android and iOS. Before every release, I clicked
              through regression by hand on all of them.
            </p>
            <p>
              That manual regression took up <strong>about 70% of my working day</strong>, and we shipped{' '}
              <strong>32 app releases in 3 months</strong> across Web, Android and iOS.
            </p>
            <p>
              It didn’t scale, and in compliance, where a missed check can block a real person or expose the business,
              “we’ll catch it manually” isn’t good enough.
            </p>
          </div>
        </section>

        <section className="cs-section" aria-labelledby="cs-snapshot">
          <h2 id="cs-snapshot">Snapshot</h2>
          <dl className="cs-snapshot">
            {snapshot.map(row => (
              <div key={row.term}>
                <dt>{row.term}</dt>
                <dd>{row.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="cs-section" aria-labelledby="cs-problem">
          <h2 id="cs-problem">The problem</h2>
          <div className="cs-body">
            <p>Compliance features fail in two directions:</p>
            <ul>
              <li><strong>Too loose</strong>, and the business doesn’t meet its regulatory obligations.</li>
              <li><strong>Too strict or confusing</strong>, and a legitimate user can’t trade, move money or understand why.</li>
            </ul>
            <p>
              So quality here isn’t only “does it work”. It’s also “does it treat the user fairly”. Manual regression
              across three platforms couldn’t cover that well enough or fast enough.
            </p>
          </div>
        </section>

        <section className="cs-section" aria-labelledby="cs-approach">
          <h2 id="cs-approach">My approach</h2>
          <ol className="cs-steps">
            <li>
              <h3>Automate what repeats most: the compliance gate</h3>
              <p>
                I started with the <strong>compliance gate</strong>, the rule-driven checks that gate user actions. It
                was the most repeatable work, so it was the best fit for automation.
              </p>
              <p>
                It was also slow to test by hand: changes to compliance gate strategies often took time to take effect,
                so manual checks meant waiting, re-checking and repeating.
              </p>
            </li>
            <li>
              <h3>Combine scripted and vision-based UI tests</h3>
              <p>
                I built UI and API automation for web and mobile with <strong>Playwright</strong>, alongside{' '}
                <strong>Midscene</strong>. Midscene is an open-source, AI-driven tool that finds and checks interface
                elements from screenshots and natural-language steps, rather than relying on selectors.
              </p>
              <p>
                The goal was a suite the team could trust. Over a 97% pass rate meant a red result usually pointed to a
                real problem.
              </p>
            </li>
            <li>
              <h3>Requirements first, then test plans</h3>
              <p>
                I designed and ran <strong>test plans based on PRDs</strong>, worked with stakeholders to{' '}
                <strong>translate BRDs into actionable PRDs and test plans</strong>, and documented execution records to
                support release readiness.
              </p>
            </li>
            <li>
              <h3>Test below the UI</h3>
              <p>
                A compliance decision passes through many layers. I covered <strong>database-level consistency
                checks</strong>, <strong>Redis and Kafka</strong>, and <strong>third-party integrations</strong> such as
                tax identity verification and AML/screening providers.
              </p>
            </li>
            <li>
              <h3>Own UAT before launch</h3>
              <p>
                I designed and owned <strong>UAT and procedural testing</strong> before new projects launched, and{' '}
                <strong>found and closed all defects with the development team</strong>.
              </p>
            </li>
            <li>
              <h3>AI-assisted skills for the long tail</h3>
              <p>
                I built <strong>AI-assisted skills for log triage, event tracking and finding the root cause of
                issues</strong>. I turned them into reusable workflows that the team adopted, which cut down manual
                triage.
              </p>
            </li>
          </ol>
        </section>

        <section className="cs-section" aria-labelledby="cs-highlight">
          <h2 id="cs-highlight">Highlight: a tax pre-control that protects user trust</h2>
          <div className="cs-body cs-callout">
            <p>
              <strong>The gap:</strong> the compliance module didn’t have controls for the tax module. Under US
              regulation, US users must provide tax information. If they don’t, the exchange must apply{' '}
              <strong>backup withholding at 24%</strong>.
            </p>
            <p>
              <strong>The user problem:</strong> having income held back without warning feels arbitrary to the user,
              and it erodes trust. The regulation itself wasn’t up for debate, but <em>when and how</em> users met it
              was a product choice.
            </p>
            <p>
              <strong>What we built:</strong> a <strong>pre-control</strong>. Before a user could{' '}
              <strong>trade, transfer or claim a promotion</strong>, they were prompted to complete their tax
              information. It was built on the existing <strong>compliance gate</strong>, with new strategy
              configurations for tax compliance control.
            </p>
            <p>
              <strong>Why it matters:</strong> instead of penalising users downstream with surprise withholding, the
              product asks for the information upstream, at the moment it’s relevant. The requirement is the same, but
              the experience is fairer.
            </p>
            <p><strong>My part:</strong> I owned this feature from requirement to release:</p>
            <ul>
              <li><strong>Assessed the requirement.</strong></li>
              <li><strong>Wrote the PRD</strong> for the pre-control.</li>
              <li>
                <strong>Coordinated resources:</strong> the timeline was tight, so I organised the people and resources
                needed to deliver on time.
              </li>
              <li><strong>Wrote the test plan.</strong></li>
              <li><strong>Ran UAT</strong> before launch.</li>
            </ul>
          </div>
        </section>

        <section className="cs-section" aria-labelledby="cs-outcomes">
          <h2 id="cs-outcomes">Outcomes</h2>
          <ul className="cs-body cs-list">
            <li><strong>97%+ pass rate</strong> on the automation suite.</li>
            <li><strong>40% more efficient regression testing</strong>, measured by time saved and issues found.</li>
            <li><strong>All defects found in UAT closed</strong> with the dev team before launch.</li>
            <li>
              <strong>Less manual triage</strong>, through AI-assisted log triage, event tracking and root-cause skills
              that the team adopted.
            </li>
            <li>
              <strong>A tax pre-control I led from requirement assessment and PRD to UAT</strong>, delivered on a tight
              timeline, that made a strict US regulatory requirement into a clear, upfront step for users.
            </li>
          </ul>
        </section>

        <section className="cs-section" aria-labelledby="cs-learned">
          <h2 id="cs-learned">What I learned</h2>
          <ul className="cs-body cs-list">
            <li>
              <strong>Automate the most repeatable, slowest-to-verify work first.</strong> For me that was the
              compliance gate.
            </li>
            <li>
              <strong>People only rely on a test suite they trust.</strong> A stable pass rate mattered more than raw
              test count.
            </li>
            <li>
              <strong>Owning the requirement, not just the test, changes the outcome.</strong> Writing the PRD let me
              shape <em>when</em> users meet the rule, not just check that it works.
            </li>
            <li>
              <strong>QA is part of UX.</strong> The tax pre-control showed that the best fix for a frustrating outcome
              is often upstream: change <em>when</em> the user meets the rule.
            </li>
          </ul>
        </section>

        <nav className="cs-next" aria-label="Case study navigation">
          <Link className="back-link" to={`/projects#${bybitCaseStudy.slug}`}>← Back to all projects</Link>
        </nav>

        <ContactFooter />
      </main>
    </>
  );
}

export default BybitCaseStudy;
