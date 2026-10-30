"use client";

import Problem from "../Problem";
import Solution from "../Solution";
import Picture from "../Picture";
import Note from "../Note";
import { projects } from "@/lib/projects";

function Annotation({ number, title, body }: { number: number; title: string; body: string }) {
  return (
    <div className="flex gap-4 items-start">
      <span className="shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-black text-white text-[11px] font-bold">
        {number}
      </span>
      <div>
        <p className="text-caption font-semibold">{title}</p>
        <p className="text-caption opacity-60 mt-0.5 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function BeforeAfterSection({
  before,
  after,
}: {
  before: { title: string; body: string }[];
  after: { title: string; body: string }[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
      <div className="flex flex-col gap-3">
        <span className="self-start rounded-full px-3 py-1 text-tiny font-semibold gray-title mb-1">Before</span>
        {before.map((c, i) => (
          <Annotation key={i} number={i + 1} title={c.title} body={c.body} />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <span className="self-start rounded-full px-3 py-1 text-tiny font-semibold gray-title mb-1">After</span>
        {after.map((c, i) => (
          <Annotation key={i} number={i + 1} title={c.title} body={c.body} />
        ))}
      </div>
    </div>
  );
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="relative flex flex-col mt-30 mb-10">
      <h2 className="text-display">{title}</h2>
      <span className="rounded-full absolute left-0 -bottom-4 h-[5px] bg-black w-full" />
    </div>
  );
}

export default function ChiLove() {
  const chilove = projects.find((p) => p.id === "chilove");
  if (!chilove) return null;

  return (
    <div className="flex flex-col mt-8 text-black">

      <Picture type="wide" popup useAspectRatio source="/projects/chilove/thumbnail.png" />

      <SectionDivider title="Project Breakdown" />

      <Problem
        problem={chilove.problem}
        subProblem={chilove.subProblem}
        keyProblems={chilove.keyProblems}
        keyProblemDescriptions={chilove.keyProblemDescriptions}
      />

      <div className="mt-20" />
      <Solution solution={chilove.solution} />

      {/* Fusion Site */}
      <SectionDivider title="A Fusion Site: Abstract Art Meets Community Movement" />

      <p className="text-body leading-relaxed max-w-4xl mb-6">
        Chicago Love's site originally started to support the artist Ryan Lessam and build a gallery and sales platform to sell his abstract art.
        Today, the site is evolving to incorporate the Chicago Love initiative through housing a lifestyle brand storefront, a non-profit mission hub, and a community forum. These are four completely
        different user intents all landing on the same domain.
      </p>

      <p className="text-body leading-relaxed max-w-4xl mb-8">
        The challenge was designing a landing page that could speak to all of those visitors without
        watering down any of them. Someone coming to buy a Chicago Love hoodie and someone coming
        to browse original abstract art prints are in totally different headspaces, but both should
        feel like they landed in the right place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">Multiple Entry Points</p>
          <p className="text-caption opacity-60 leading-relaxed">
            I designed the landing page with clear visual wayfinding. Distinct sections with direct paths to the art gallery, the shop, and the mission page let visitors figure out where they're going within a few seconds of landing.
          </p>
        </div>
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">Abstract Art as the Visual Anchor</p>
          <p className="text-caption opacity-60 leading-relaxed">
            Ryan Lessam's abstract art is showcased large and bold as the visual centerpiece of the site. Rather than feeling like a separate thing tacked on, the art sets the tone for the brand's creative identity.
          </p>
        </div>
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">Keeping Commerce Connected to the Cause</p>
          <p className="text-caption opacity-60 leading-relaxed">
            On a site that sells art and apparel alongside a community mission, it's easy for the commercial side to start feeling disconnected from the cause. I made sure the impact of purchasing was always close to the product, so buying something always felt like part of supporting Chicago.
          </p>
        </div>
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">One Design System Across Everything</p>
          <p className="text-caption opacity-60 leading-relaxed">
            Shared typography, color, and spacing made everything feel like it came from the same place even as the content shifted from editorial art to forum posts to product listings.
          </p>
        </div>
      </div>

      <p className="text-subtitle mt-14 mb-6">Home / Landing Page</p>
      <Picture type="captioned" description="(Left) Old Landing Page, (Right) New Landing Page" popup useAspectRatio source="/projects/chilove/landing.png" />
      {/* <BeforeAfterSection
        before={[
          { title: "No clear hero message", body: "Visitors landing on the page had no idea what Chicago Love was, who it was for, or what to do next. There was no headline, tagline, or CTA above the fold." },
          { title: "Weak visual hierarchy", body: "Text sizes, weights, and spacing were all over the place making it hard to know where to look or what mattered most." },
          { title: "Cluttered navigation", body: "Too many top-level nav items with no grouping made the site feel disorganized right from the first interaction." },
          { title: "No footer", body: "There was no footer at all, so visitors had nowhere to go after reaching the bottom of the page. No contact info, no social links, nothing." },
        ]}
        after={[
          { title: "Bold hero with clear CTA", body: "A strong headline, brand tagline, and primary CTA are visible immediately on load so visitors understand the brand and what to do within seconds." },
          { title: "Consistent visual system", body: "Typography, color, and spacing all follow the brand guidelines I set up, making the page feel cohesive and intentional throughout." },
          { title: "Streamlined nav", body: "Nav items are simplified down to what actually matters so visitors can orient themselves quickly and get where they need to go." },
          { title: "Footer built from scratch", body: "The new footer has brand links, social icons, a mission statement snippet, and contact info. It anchors the page and adds the credibility signals that were missing before." },
        ]}
      /> */}

      <p className="text-subtitle mt-14 mb-6">Chicago Love Movement Page</p>
      <p className="text-body leading-relaxed max-w-4xl mb-6">
        This page didn't exist before I built it. The whole point was to give the brand's mission
        its own home so visitors could actually understand why Chicago Love exists and how to get
        involved. Without it the non-profit side of the brand was basically invisible.
      </p>
      <Picture type="wide" popup useAspectRatio  description="New Movement Page" source="/projects/chilove/movement.png" />
      {/* <BeforeAfterSection
        before={[
          { title: "Page did not exist", body: "There was no dedicated space for the brand's mission so the anti-violence and community enrichment angle of Chicago Love was completely invisible to new visitors." },
          { title: "No path to get involved", body: "Visitors who wanted to support the cause had no clear way to do so. No CTA, no donation info, no community entry point." },
        ]}
        after={[
          { title: "Mission-first storytelling", body: "The page leads with the anti-violence mission and the 25% donation pledge so the brand's purpose is the first thing visitors connect with." },
          { title: "Clear ways to support", body: "CTAs for donating, shopping, and sharing are built into the page so any visitor regardless of why they came can easily take action." },
        ]}
      /> */}

      <p className="text-subtitle mt-14 mb-6">Community Page and Forum</p>
      <p className="text-body leading-relaxed max-w-4xl mb-6">
        Another page I built from scratch. A brand centered on Chicago community should have an
        actual place for that community online. I designed the forum UI and also built a review
        and moderation system so the small team could keep the space managed without a lot of overhead.
      </p>
      <Picture type="wide" popup useAspectRatio description="(Left) New Community Page, (Right) New Community Page Popup" source="/projects/chilove/community.png" />
      {/* <BeforeAfterSection
        before={[
          { title: "No community space at all", body: "A brand built around Chicago community had zero online community infrastructure. No forum, no events page, no space for people to connect." },
          { title: "No moderation system", body: "Without any review or moderation tools an open forum would have been completely unmanageable for a small team." },
        ]}
        after={[
          { title: "Forum with organized categories", body: "Posts are organized by topic so the community stays easy to navigate as it grows and members can find and share resources, events, and stories." },
          { title: "Review and moderation system", body: "I built a lightweight review layer that holds posts for admin approval before they go live so the space stays safe without requiring constant oversight." },
        ]}
      /> */}

      <p className="text-subtitle mt-14 mb-6">Product and E-Commerce Pages</p>
      <Picture type="half" popup useAspectRatio description="(Left) Old Product Page, (Right) New Product Page Popup"  description2="(Left) Old Landing Page, (Right) New Landing Page"
      source="/projects/chilove/product.png" source2="/projects/chilove/product 2.png"/>
      {/* <BeforeAfterSection
        before={[
          { title: "Products with no context", body: "Items were listed with no story or brand framing, making the shop feel completely disconnected from the mission and the lifestyle brand identity." },
          { title: "Broken on mobile", body: "Product grids fell apart on mobile with misaligned images, truncated text, and buttons too small to tap comfortably." },
          { title: "No social proof", body: "No reviews, no lifestyle photos, no sense of community around the products. Nothing to build trust with a first-time visitor." },
        ]}
        after={[
          { title: "Brand-forward product pages", body: "Products are presented with brand colors, lifestyle framing, and mission context so each item feels like a real part of the Chicago Love story." },
          { title: "Mobile-optimized layout", body: "Lighthouse mobile audits guided the layout. Touch-friendly buttons, responsive grids, and compressed images brought mobile UX up by 20%." },
          { title: "Review system added", body: "Customers can now leave product reviews, which builds trust and gives first-time visitors the social proof they need to feel confident buying." },
        ]}
      /> */}


      {/* Figma File and Design System */}
      <SectionDivider title="Figma File and Design System" />

      <p className="text-body leading-relaxed max-w-4xl mb-8">
        One of the first things I tackled was setting up and organizing the Figma file so the team
        could actually use it. The previous state of design assets was scattered so I rebuilt the
        file structure from scratch to make it clean, collaborative, and easy to hand off.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">File Structure and Pages</p>
          <p className="text-caption opacity-60 leading-relaxed">I organized the Figma file into clearly labeled pages for each section of the site, a dedicated cover page, a style guide page, and a components page. This made it easy for anyone on the team to jump in and find what they needed without digging around.</p>
        </div>
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">Mobile and Desktop Designs</p>
          <p className="text-caption opacity-60 leading-relaxed">Every page was designed in both mobile and desktop breakpoints so developers had clear references for responsive behavior. Frames were clearly labeled and laid out side by side so the differences were easy to see at a glance.</p>
        </div>
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">Component Library</p>
          <p className="text-caption opacity-60 leading-relaxed">I built out a component library with reusable buttons, cards, nav elements, form fields, and section layouts. Components were set up with variants so the team could swap states without rebuilding anything and everything stayed consistent across pages.</p>
        </div>
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">Typography and Color</p>
          <p className="text-caption opacity-60 leading-relaxed">I set up a formal type scale and color palette as Figma styles so they applied consistently across the whole file. Anyone adding a new section was automatically working within the brand system without having to think about it.</p>
        </div>
      </div>

      <Picture type="wide" popup useAspectRatio source="/projects/chilove/style.png" />


      {/* Designing for a Non-Profit */}
      <SectionDivider title="Designing for a Non-Profit" />

      <p className="text-body leading-relaxed max-w-4xl mb-6">
        Designing for a non-profit is a different mindset than designing for a typical commercial
        product. The audience is wider and includes donors, volunteers, community members, and
        customers all at once.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">Trust Has to Come First</p>
          <p className="text-caption opacity-60 leading-relaxed">
            People give money and their attention to organizations they trust. Every design choice from typography to imagery to copy had to communicate legitimacy. The old site was accidentally undermining this and the team didn't realize it. A more professional presentation directly increases the chance someone donates or makes a purchase.
          </p>
        </div>
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">Keep the Mission Visible</p>
          <p className="text-caption opacity-60 leading-relaxed">
            The 25% donation pledge is Chicago Love's biggest differentiator and the reason someone might choose to buy from them over any other apparel brand. It needed to be front and center, not buried somewhere. I made sure it showed up in the hero, on product pages, and throughout the movement page so visitors couldn't miss it.
          </p>
        </div>
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">Accessibility and Reach</p>
          <p className="text-caption opacity-60 leading-relaxed">
            Community organizations serve a really wide range of people across ages and devices. Lighthouse audits caught things like contrast issues, missing alt text, and tap targets that were too small on mobile. Fixing those isn't just good practice, it's how you make sure the community can actually access what you built.
          </p>
        </div>
        <div className="flex flex-col gap-2 bg-light-gray border border-mid-gray rounded-xl p-6">
          <p className="text-caption font-semibold">Build for a Small Team</p>
          <p className="text-caption opacity-60 leading-relaxed">
            Non-profit web teams are small and the systems you build have to be maintainable without a dedicated developer around. The design library, plugin organization, and moderation tooling all had to be simple enough that the team could keep things running and add new pages without needing a lot of hand-holding.
          </p>
        </div>
      </div>

      <Note
        title="Bounce Rate Impact"
        text="Reducing bounce rate by 30% means more people stayed long enough to read about the mission, explore the community, or complete a purchase. For a non-profit where every visitor is a potential donor or advocate, that's a real difference."
      />

      <div className="mt-20" />
    </div>
  );
}
