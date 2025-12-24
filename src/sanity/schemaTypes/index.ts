import homePage from './homePage'
import aboutPage from './aboutPage'
import benefitNightsPage from './benefitNightsPage'
import buddalinksPage from './buddalinksPage'
import cateringPage from './cateringPage'
import contactPage from './contactPage'
import ctaSection from './ctaSection'
import heroSlide from './heroSlide'
import location from './location'
import menuCategory from './menuCategory'
import menuItem from './menuItem'
import menuPage from './menuPage'
import page from './page'
import program from './program'
import promotion from './promotion'
import rewardsPage from './rewardsPage'
import seo from './seo'
import siteSettings from './siteSettings'
import event from './event'
import testimonial from './testimonial'
import trustedBySection from './trustedBySection'

export const schema = {
    types: [
        // Pages
        homePage,
        aboutPage,
        benefitNightsPage,
        buddalinksPage,
        cateringPage,
        page,
        rewardsPage,
        contactPage,

        // Menu
        menuPage,
        menuCategory,
        menuItem,

        // Programs & Promotions
        program,
        promotion,

        // Components
        ctaSection,
        heroSlide,
        trustedBySection,

        // Settings & Data
        siteSettings,
        location,
        testimonial,
        event,

        // SEO
        seo,
    ],
}
