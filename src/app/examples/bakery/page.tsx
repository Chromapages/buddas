import { QSRLinkPage } from "../../../components/QSRLinkPage";
import { bakeryDemoProfile } from "../../../lib/buddas-profile";
import { getProfileMetadata } from "../../../lib/profile-metadata";
import { getAbsoluteUrl } from "../../../lib/seo-utils";

export const metadata = getProfileMetadata(bakeryDemoProfile);

export default function BakeryExamplePage() {
  return <QSRLinkPage profile={bakeryDemoProfile} canonicalUrl={getAbsoluteUrl(bakeryDemoProfile.canonicalPath)} />;
}
