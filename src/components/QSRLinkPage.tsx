import { ArrowUpRight, BookOpen, MapPin, Phone, ShoppingBag } from "lucide-react";
import type { RestaurantProfile } from "@/lib/profile-types";
import { safeHref, safeWebUrl } from "@/lib/url-utils";
import { validateImageUrl } from "@/lib/image-utils";
import { BuddasStickyHeader } from "./BuddasStickyHeader";
import { PromoImage } from "./PromoImage";
import { PromoStrip } from "./PromoStrip";
import { TrackedLink } from "./TrackedLink";

export function QSRLinkPage({ profile, canonicalUrl, preview = false }: {
  profile: RestaurantProfile;
  canonicalUrl: string;
  preview?: boolean;
}) {
  const { brand, mainLinks, locations, storySection, cateringSection, footer } = profile;
  const orderUrl = safeWebUrl(mainLinks.orderUrl);
  const menuUrl = safeWebUrl(mainLinks.menuUrl);
  const reviewUrl = safeWebUrl(mainLinks.reviewUrl);
  const configuredPrimary = safeHref(profile.primaryAction?.url);
  const primary = profile.primaryAction === null ? undefined : configuredPrimary
    ? { label: profile.primaryAction!.label, url: configuredPrimary }
    : orderUrl ? { label: "Order online", url: orderUrl }
    : menuUrl ? { label: "View menu", url: menuUrl }
    : locations.length ? { label: "Find a location", url: "#locations" } : undefined;
  const primaryEvent = primary?.url === orderUrl ? "order_tap" : primary?.url === menuUrl ? "menu_tap" : "primary_action";
  const validLinks = profile.linkList.filter((link) => safeHref(link.url));
  const groups = [...new Set(validLinks.map((link) => link.group || "More to explore"))];
  const gallery = profile.galleryImages.filter((item) => validateImageUrl(item.imageUrl));
  const logo = validateImageUrl(brand.logoUrl);
  const track = !preview && !profile.isDemo;
  const tracking = { profileSlug: profile.slug, track };

  return (
    <div className={`restaurant-page theme-${profile.theme}${primary ? " has-primary" : ""}`}>
      <BuddasStickyHeader brandName={brand.name} canonicalUrl={canonicalUrl} {...tracking} />
      {(preview || profile.isDemo) && <aside className="profile-state" aria-label="Page status">
        {preview && <p><strong>Draft preview</strong><a href={`/api/exit-preview?slug=${encodeURIComponent(profile.slug)}`}>Exit preview</a></p>}
        {profile.isDemo && <p><strong>Demo template</strong></p>}
      </aside>}
      <main id="main-content" tabIndex={-1} className="profile-layout">
        <div className="profile-core">
          <header className="profile-identity">
            {logo && <div className="profile-logo"><PromoImage src={logo} alt={`${brand.name} logo`} contain priority /></div>}
            <h1>{brand.name}</h1>
            {brand.tagline && <p className="profile-tagline">{brand.tagline}</p>}
            {brand.subline && <p className="profile-subline">{brand.subline}</p>}
          </header>

          {(primary || menuUrl || reviewUrl || locations.length > 0) && <nav aria-label="Restaurant actions" className="profile-actions">
            {primary && <TrackedLink href={primary.url} action={primaryEvent} linkId="primary" placement="hero" {...tracking} className="primary-link">{primary.label}<ArrowUpRight aria-hidden="true" size={20} /></TrackedLink>}
            <div className="secondary-actions">
              {menuUrl && !(primary && primaryEvent === "menu_tap") && <TrackedLink href={menuUrl} action="menu_tap" linkId="menu" placement="hero" {...tracking} className="secondary-link"><BookOpen aria-hidden="true" size={18} />View menu</TrackedLink>}
              {locations.length > 0 && primary?.url !== "#locations" && <TrackedLink href="#locations" action="locations_tap" linkId="locations" placement="hero" {...tracking} className="secondary-link"><MapPin aria-hidden="true" size={18} />{locations.length === 1 ? "Visit us" : `${locations.length} locations`}</TrackedLink>}
              {reviewUrl && <TrackedLink href={reviewUrl} action="review_tap" linkId="review" placement="hero" {...tracking} className="secondary-link">Leave a review<ArrowUpRight aria-hidden="true" size={16} /></TrackedLink>}
            </div>
          </nav>}

          {profile.promos.length > 0 && <PromoStrip count={profile.promos.length}>
            {profile.promos.map((promo, index) => {
              const image = validateImageUrl(promo.imageUrl);
              const url = safeHref(promo.url);
              const card = <article className="promo-card">
                {image && <div className="promo-photo"><PromoImage src={image} alt={promo.title} priority={index === 0 && !logo} /></div>}
                <div className="promo-copy">
                  {promo.badge && <span className="promo-badge">{promo.badge}</span>}
                  <h3>{promo.title}</h3>
                  {promo.subtitle && <p>{promo.subtitle}</p>}
                  {url && <span className="promo-detail">Learn more <ArrowUpRight aria-hidden="true" size={16} /></span>}
                </div>
              </article>;
              return <div className="promo-slide" key={promo.id}>{url
                ? <TrackedLink href={url} action="promo_tap" linkId={promo.id} placement="promotion" {...tracking} className="promo-link">{card}</TrackedLink>
                : card}</div>;
            })}
          </PromoStrip>}

          {groups.map((group) => <section className="profile-section" key={group}>
            <h2>{group}</h2>
            <nav aria-label={group} className="link-list">{validLinks.filter((link) => (link.group || "More to explore") === group).map((link) =>
              <TrackedLink key={link.id} href={link.url} action="link_click" linkId={link.id} placement="links" {...tracking} className={`link-row${link.emphasize ? " emphasized" : ""}`}>
                <span><span className="link-label">{link.label}</span>{link.description && <span className="link-description">{link.description}</span>}</span><ArrowUpRight aria-hidden="true" size={20} />
              </TrackedLink>)}
            </nav>
          </section>)}

          {storySection?.body && <section className="profile-section story-card">
            {validateImageUrl(storySection.imageUrl) && <figure><div className="section-photo"><PromoImage src={storySection.imageUrl!} alt={storySection.imageCaption || storySection.headline} /></div>{storySection.imageCaption && <figcaption>{storySection.imageCaption}</figcaption>}</figure>}
            <div className="section-copy"><h2>{storySection.headline}</h2><p>{storySection.body}</p></div>
          </section>}

          {gallery.length > 0 && <section className="profile-section"><h2>From our kitchen</h2><div className="profile-gallery">{gallery.map((item) => <figure key={item.id}><div className="gallery-photo"><PromoImage src={item.imageUrl} alt={item.caption || `${brand.name} food`} /></div>{item.caption && <figcaption>{item.caption}</figcaption>}</figure>)}</div></section>}

          {profile.testimonials.length > 0 && <section className="profile-section"><h2>Guest reviews</h2><div className="review-list">{profile.testimonials.map((item) => <figure className="review-card" key={item.id}>
            {typeof item.rating === "number" && <p className="review-rating">{item.rating} out of 5</p>}
            <blockquote>{item.quote}</blockquote><figcaption>{item.name}{safeWebUrl(item.sourceUrl) && <TrackedLink href={item.sourceUrl} action="review_source" linkId={item.id} placement="reviews" {...tracking}>{item.source || "Read original review"}<ArrowUpRight aria-hidden="true" size={14} /></TrackedLink>}</figcaption>
          </figure>)}</div></section>}

          {cateringSection?.description && <section className="profile-section catering-card">
            {validateImageUrl(cateringSection.imageUrl) && <div className="section-photo"><PromoImage src={cateringSection.imageUrl!} alt={cateringSection.headline} /></div>}
            <div className="section-copy"><h2>{cateringSection.headline}</h2><p>{cateringSection.description}</p>{safeHref(cateringSection.ctaUrl) && <TrackedLink href={cateringSection.ctaUrl!} action="catering_tap" linkId="catering" placement="catering" {...tracking} className="secondary-link">{cateringSection.ctaLabel || "Ask about catering"}<ArrowUpRight aria-hidden="true" size={18} /></TrackedLink>}</div>
          </section>}
        </div>

        {locations.length > 0 && <section id="locations" className="location-panel" aria-labelledby="locations-heading">
          <div className="location-heading"><MapPin aria-hidden="true" size={22} /><h2 id="locations-heading">{locations.length === 1 ? "Visit us" : "Find your location"}</h2></div>
          <div className="location-list">{locations.map((location) => <article id={location.id} className="location-card" key={location.id}>
            <h3>{location.name}</h3>
            <address>{location.address.streetAddress}<br />{location.address.addressLocality}, {location.address.addressRegion} {location.address.postalCode}</address>
            {location.hoursFull ? <p className="location-hours">{location.hoursFull}</p> : location.openingHoursSpecification.length > 0 && <dl className="weekly-hours">{location.openingHoursSpecification.map((hours, index) => <div key={index}><dt>{hours.dayOfWeek.map((day) => day.replace("https://schema.org/", "")).join(", ")}</dt><dd>{hours.opens}–{hours.closes}</dd></div>)}</dl>}
            {!location.hoursFull && location.openingHoursSpecification.length > 0 && location.timezone && <p className="location-timezone">Time zone: {location.timezone.replace(/_/g, " ")}</p>}
            <nav aria-label={`${location.name} actions`} className="location-actions">
              {safeWebUrl(location.orderUrl) && <TrackedLink href={location.orderUrl!} action="order_tap" linkId="order" locationId={location.id} placement="location" {...tracking} className="secondary-link" aria-label={`Order from ${location.name}`}><ShoppingBag aria-hidden="true" size={17} />Order</TrackedLink>}
              {safeWebUrl(location.menuUrl) && <TrackedLink href={location.menuUrl!} action="menu_tap" linkId="menu" locationId={location.id} placement="location" {...tracking} className="secondary-link" aria-label={`View menu for ${location.name}`}>Menu</TrackedLink>}
              {safeWebUrl(location.directionsUrl) && <TrackedLink href={location.directionsUrl!} action="directions_tap" linkId="directions" locationId={location.id} placement="location" {...tracking} className="secondary-link" aria-label={`Directions to ${location.name}`}><MapPin aria-hidden="true" size={17} />Directions</TrackedLink>}
              {location.telephone && safeHref(`tel:${location.telephone}`) && <TrackedLink href={`tel:${location.telephone}`} action="call_tap" linkId="call" locationId={location.id} placement="location" {...tracking} className="secondary-link" aria-label={`Call ${location.name} at ${location.telephone}`}><Phone aria-hidden="true" size={17} />{location.telephone.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3")}</TrackedLink>}
              {safeWebUrl(location.reviewUrl) && <TrackedLink href={location.reviewUrl!} action="review_tap" linkId="review" locationId={location.id} placement="location" {...tracking} className="secondary-link" aria-label={`Review ${location.name}`}>Leave a review</TrackedLink>}
            </nav>
          </article>)}</div>
        </section>}
      </main>

      {footer && (footer.text || safeHref(footer.privacyUrl) || safeHref(footer.termsUrl)) && <footer className="profile-footer">{footer.text && <p>{footer.text}</p>}{(safeHref(footer.privacyUrl) || safeHref(footer.termsUrl)) && <nav aria-label="Legal">{safeHref(footer.privacyUrl) && <a href={footer.privacyUrl}>Privacy</a>}{safeHref(footer.termsUrl) && <a href={footer.termsUrl}>Terms</a>}</nav>}</footer>}
      {primary && <div className="mobile-primary"><TrackedLink href={primary.url} action={primaryEvent} linkId="primary" placement="bottom_bar" {...tracking} className="primary-link">{primary.label}<ArrowUpRight aria-hidden="true" size={20} /></TrackedLink></div>}
    </div>
  );
}
