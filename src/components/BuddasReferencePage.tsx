import { ArrowRight, ArrowUpRight, BookOpen, MapPin, Phone, Smartphone, Star, UsersRound } from "lucide-react";
import { FaApple, FaFacebookF, FaGooglePlay, FaInstagram, FaTiktok } from "react-icons/fa";
import type { RestaurantProfile } from "@/lib/profile-types";
import { buddasDesign } from "@/lib/buddas-design";
import { safeHref, safeWebUrl } from "@/lib/url-utils";
import { validateImageUrl } from "@/lib/image-utils";
import { BuddasStickyHeader } from "./BuddasStickyHeader";
import { PromoImage } from "./PromoImage";
import { PromoStrip } from "./PromoStrip";
import { TrackedLink } from "./TrackedLink";

export function BuddasReferencePage({ profile, canonicalUrl, preview = false }: {
  profile: RestaurantProfile; canonicalUrl: string; preview?: boolean;
}) {
  const { brand, mainLinks, locations, footer } = profile;
  const tracking = { profileSlug: profile.slug, track: !preview && !profile.isDemo };
  const orderUrl = profile.primaryAction === null ? undefined : safeWebUrl(mainLinks.orderUrl);
  const menuUrl = safeWebUrl(mainLinks.menuUrl);
  const links = profile.linkList.filter((link) => safeHref(link.url));
  const catering = links.find((link) => link.icon === "catering");
  const cateringUrl = safeHref(profile.cateringSection?.ctaUrl) || catering?.url;
  const appLinks = links.filter((link) => link.icon === "apple" || link.icon === "google-play");
  const socialLinks = links.filter((link) => ["tiktok", "instagram", "facebook", "review"].includes(link.icon || ""));
  const facebookUrl = !socialLinks.some((link) => link.icon === "facebook") && safeWebUrl(buddasDesign.facebookUrl);
  const reviewUrl = safeWebUrl(mainLinks.reviewUrl);
  const extraLinks = links.filter((link) => link !== catering && !appLinks.includes(link) && !socialLinks.includes(link));

  return <div className="restaurant-page buddas-reference">
    <BuddasStickyHeader brandName="Budda’s Hawaiian" canonicalUrl={canonicalUrl} {...tracking} />
    {preview && <aside className="profile-state" aria-label="Page status"><p><strong>Draft preview</strong><a href={`/api/exit-preview?slug=${encodeURIComponent(profile.slug)}`}>Exit preview</a></p></aside>}
    <main id="main-content" tabIndex={-1} className="reference-main">
      <header className="reference-hero"><h1 className="sr-only">{brand.name}</h1><div className="reference-hero-image"><PromoImage src={buddasDesign.heroImage} alt={buddasDesign.description} priority /></div></header>
      <nav aria-label="Restaurant actions" className="reference-actions">
        {orderUrl && <TrackedLink href={orderUrl} action="order_tap" linkId="order" placement="hero" {...tracking} className="primary-link reference-order-cta">Order Online<ArrowUpRight key="icon" size={21} aria-hidden="true" /></TrackedLink>}
        <div className="secondary-actions">
          {menuUrl && <TrackedLink href={menuUrl} action="menu_tap" linkId="menu" placement="hero" {...tracking} className="secondary-link"><BookOpen key="icon" size={19} aria-hidden="true" />View Menu</TrackedLink>}
          {locations.length > 0 && <TrackedLink href="#locations" action="locations_tap" linkId="locations" placement="hero" {...tracking} className="secondary-link"><MapPin key="icon" size={19} aria-hidden="true" />Find Locations</TrackedLink>}
        </div>
      </nav>

      {profile.promos.length > 0 && <PromoStrip count={profile.promos.length} title="Featured at Budda’s" seeAllUrl={menuUrl} compact>{profile.promos.map((promo) => {
        const image = validateImageUrl(promo.title.toLowerCase().includes("$9 bento") ? buddasDesign.featuredBentoImage : promo.imageUrl);
        const url = safeHref(promo.url);
        const content = <article key={promo.id} className="promo-card">{image ? <div className="promo-photo"><PromoImage src={image} alt={[promo.title, promo.subtitle].filter(Boolean).join(". ")} /></div> : <div className="promo-copy"><h3>{promo.title}</h3>{promo.subtitle && <p>{promo.subtitle}</p>}</div>}</article>;
        return <div className="promo-slide" key={promo.id}>{url ? <TrackedLink href={url} action="promo_tap" linkId={promo.id} placement="promotion" {...tracking} className="promo-link">{content}</TrackedLink> : content}</div>;
      })}</PromoStrip>}

      <section className="profile-section reference-webstore" aria-label="Budda Rolls online store">
        <h2>Budda Rolls Online</h2>
        <div className="reference-webstore-card">
          <div className="reference-webstore-photo"><PromoImage src={buddasDesign.rollsImage} alt="Golden Hawaiian butter rolls from Budda’s" /></div>
          <div className="reference-webstore-copy">
            <span className="reference-webstore-status">Coming soon</span>
            <p>Our online store is on the way. Soon, you’ll be able to order Budda Rolls for delivery nationwide.</p>
          </div>
        </div>
      </section>

      {locations.length > 0 && <PromoStrip kind="location" count={locations.length} title={<><MapPin size={22} aria-hidden="true" />Our Locations</>} compact headerLink={<TrackedLink href="https://buddashawaiian.com/" action="locations_tap" linkId="all-locations" placement="location" {...tracking} className="reference-section-link">View all locations<ArrowRight key="icon" size={15} aria-hidden="true" /></TrackedLink>}>{locations.map((location) => {
        const photo = validateImageUrl(buddasDesign.locationImages[location.id]);
        return <article id={location.id} className="reference-location promo-slide" key={location.id}><div className="reference-location-details">{photo && <div className="reference-location-photo"><PromoImage src={photo} alt={`${location.name} storefront`} /></div>}<div><h3>{location.name}</h3><address>{location.address.streetAddress}<br />{location.address.addressLocality}, {location.address.addressRegion} {location.address.postalCode}</address>{location.hoursFull ? <p className="reference-location-hours">{location.hoursFull}</p> : location.openingHoursSpecification.length > 0 && <dl className="weekly-hours">{location.openingHoursSpecification.map((hours, index) => <div key={index}><dt>{hours.dayOfWeek.map((day) => day.replace("https://schema.org/", "")).join(", ")}</dt><dd>{hours.opens}–{hours.closes}</dd></div>)}</dl>}</div></div><nav aria-label={`${location.name} actions`} className="reference-location-actions">
          {safeWebUrl(location.directionsUrl) && <TrackedLink href={location.directionsUrl!} action="directions_tap" linkId="directions" locationId={location.id} placement="location" {...tracking} className="secondary-link" aria-label={`Directions to ${location.name}`}><MapPin key="icon" size={17} aria-hidden="true" />Directions</TrackedLink>}
          {location.telephone && <TrackedLink href={`tel:${location.telephone}`} action="call_tap" linkId="call" locationId={location.id} placement="location" {...tracking} className="secondary-link" aria-label={`Call ${location.name}`}><Phone key="icon" size={17} aria-hidden="true" />{location.telephone.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3")}</TrackedLink>}
        </nav></article>;
      })}</PromoStrip>}

      {cateringUrl && <section className="reference-catering"><UsersRound size={30} aria-hidden="true" /><div><h2>{profile.cateringSection?.headline || "Catering for Your Event"}</h2><p>{profile.cateringSection?.description || "Bring the island flavors to your next gathering."}</p></div><TrackedLink href={cateringUrl} action="catering_tap" linkId={catering?.id || "catering"} placement="catering" {...tracking} className="primary-link" aria-label="Details about catering">Details<ArrowUpRight key="icon" size={16} aria-hidden="true" /></TrackedLink></section>}

      {appLinks.length > 0 && <section className="reference-section" aria-labelledby="apps-heading"><div className="reference-icon-heading"><Smartphone size={23} aria-hidden="true" /><div><h2 id="apps-heading">Get the Budda’s App</h2><p>Order, earn rewards, and more.</p></div></div><div className="reference-apps">{appLinks.map((link) => <TrackedLink href={link.url} action="app_download" linkId={link.id} placement="apps" {...tracking} className="reference-app-badge" key={link.id}>{link.icon === "apple" ? <FaApple key="icon" size={28} aria-hidden="true" /> : <FaGooglePlay key="icon" size={26} aria-hidden="true" />}<span key="label"><small>{link.icon === "apple" ? "Download on the" : "Get it on"}</small>{link.icon === "apple" ? "App Store" : "Google Play"}</span></TrackedLink>)}</div></section>}

      {(socialLinks.length > 0 || facebookUrl || reviewUrl) && <section className="reference-section" aria-labelledby="social-heading"><div className="reference-icon-heading"><UsersRound size={23} aria-hidden="true" /><div><h2 id="social-heading">Follow Budda’s</h2><p>Good food. Local stories. Stay connected.</p></div></div><nav aria-label="Follow and review Budda’s" className="reference-socials">{socialLinks.map((link) => {
        const Icon = link.icon === "tiktok" ? FaTiktok : link.icon === "instagram" ? FaInstagram : link.icon === "facebook" ? FaFacebookF : Star;
        const label = link.icon === "tiktok" ? "TikTok" : link.icon === "instagram" ? "Instagram" : link.icon === "facebook" ? "Facebook" : link.label;
        return <TrackedLink href={link.url} action={link.icon === "review" ? "review_tap" : "link_click"} linkId={link.id} placement="social" {...tracking} className="reference-social-link" aria-label={label} title={label} key={link.id}><Icon size={24} aria-hidden="true" /></TrackedLink>;
      })}{facebookUrl && <TrackedLink href={facebookUrl} action="link_click" linkId="facebook" placement="social" {...tracking} className="reference-social-link" aria-label="Facebook" title="Facebook"><FaFacebookF size={24} aria-hidden="true" /></TrackedLink>}{reviewUrl && !socialLinks.some((link) => link.url === reviewUrl || link.icon === "review") && <TrackedLink href={reviewUrl} action="review_tap" linkId="review" placement="social" {...tracking} className="reference-social-link" aria-label="Leave a review" title="Leave a review"><Star size={24} aria-hidden="true" /></TrackedLink>}</nav></section>}

      {extraLinks.length > 0 && <nav className="reference-section link-list" aria-label="More from Budda’s">{extraLinks.map((link) => <TrackedLink href={link.url} action="link_click" linkId={link.id} placement="links" {...tracking} className="link-row" key={link.id}><span key="label">{link.label}</span><ArrowUpRight key="icon" size={18} aria-hidden="true" /></TrackedLink>)}</nav>}
    </main>
    <footer className="profile-footer"><p>© 2026 Budda’s Hawaiian. All rights reserved.</p>{(safeHref(footer?.privacyUrl) || safeHref(footer?.termsUrl)) && <nav aria-label="Legal">{safeHref(footer?.privacyUrl) && <a href={footer!.privacyUrl}>Privacy</a>}{safeHref(footer?.termsUrl) && <a href={footer!.termsUrl}>Terms</a>}</nav>}</footer>
  </div>;
}
