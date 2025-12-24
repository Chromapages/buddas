import { definePlugin } from 'sanity'
import { route } from 'sanity/router'
import { DashboardIcon } from '@sanity/icons'
import { Card, Flex, Grid, Heading, Text, Box, Button, Stack } from '@sanity/ui'

// Custom Component rendered for the tool
const MobileHome = () => {
    const quickActions = [
        {
            title: "Update Menu",
            desc: "Edit items, prices, and availability",
            intent: "structure",
            params: { selectedType: "menuItem" }, // Opens the list
            icon: "🍔",
            tone: "primary"
        },
        {
            title: "New Testimonial",
            desc: "Add a customer review",
            intent: "create",
            params: { type: "testimonial", template: "testimonial" },
            icon: "💬",
            tone: "positive"
        },
        {
            title: "Promotions",
            desc: "Manage banners and deals",
            intent: "structure",
            params: { selectedType: "promotion" },
            icon: "📢",
            tone: "caution"
        },
        {
            title: "Site Settings",
            desc: "Hours, Location, Contact",
            intent: "edit",
            params: { id: "siteSettings", type: "siteSettings" },
            icon: "⚙️",
            tone: "default"
        }
    ]

    return (
        <Flex
            direction="column"
            padding={4}
            className="h-full bg-[#FFF8E8] overflow-y-auto" // Buddas Cream
            style={{ minHeight: '100vh', boxSizing: 'border-box' }}
        >
            {/* Header */}
            <Box marginBottom={5} padding={2}>
                <Text size={1} style={{ color: '#887568' }} className="uppercase tracking-widest font-bold mb-2">
                    Admin Dashboard
                </Text>
                <Heading size={4} style={{ color: '#5A3A1F', fontFamily: 'Poppins' }}>
                    Aloha, Buddas Team
                </Heading>
            </Box>

            {/* Quick Actions Grid */}
            <Grid columns={[1, 2]} gap={3}>
                {quickActions.map((action) => (
                    <a
                        key={action.title}
                        href={getIntentUrl(action.intent, action.params)}
                        style={{ textDecoration: 'none' }}
                    >
                        <Card
                            padding={4}
                            radius={4}
                            shadow={2}
                            style={{
                                backgroundColor: '#FFFFFF',
                                border: '1px solid rgba(90, 58, 31, 0.05)',
                                height: '100%',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            className="hover:shadow-lg hover:-translate-y-1 active:scale-95 touch-manipulation"
                        >
                            <Flex direction="column" height="fill" justify="space-between" gap={4}>
                                <Flex align="center" justify="space-between">
                                    <Text size={4}>{action.icon}</Text>
                                    <div style={{
                                        width: 8, height: 8, borderRadius: '50%',
                                        background: action.tone === 'primary' ? '#54BFA5' :
                                            action.tone === 'positive' ? '#E9C559' : '#D36200'
                                    }} />
                                </Flex>
                                <Stack space={2}>
                                    <Heading size={1} style={{ color: '#5A3A1F', fontWeight: 600 }}>
                                        {action.title}
                                    </Heading>
                                    <Text size={1} style={{ color: '#887568' }}>
                                        {action.desc}
                                    </Text>
                                </Stack>
                            </Flex>
                        </Card>
                    </a>
                ))}
            </Grid>

            {/* Footer / Info */}
            <Box marginTop={6} padding={4} style={{ background: 'rgba(84, 191, 165, 0.1)', borderRadius: '12px' }}>
                <Flex align="center" gap={3}>
                    <Text size={2}>🌺</Text>
                    <Stack space={2}>
                        <Text size={1} weight="bold" style={{ color: '#1C5F56' }}>Quick Tip</Text>
                        <Text size={1} style={{ color: '#1C5F56' }}>
                            Tap "New Testimonial" to quickly add reviews while chatting with customers.
                        </Text>
                    </Stack>
                </Flex>
            </Box>
        </Flex>
    )
}

// Helper to build deep links (Naive implementation for demo, robust one uses router)
// In a real plugin we'd use `useRouter` but for a raw link in a tool:
function getIntentUrl(intent: string, params: any) {
    const baseUrl = '/studio'
    if (intent === 'structure') {
        // e.g. /studio/structure/menuItem
        return `${baseUrl}/structure/${params.selectedType}`
    }
    if (intent === 'create') {
        // e.g. /studio/intent/create/template=testimonial;type=testimonial
        return `${baseUrl}/intent/create/template=${params.template};type=${params.type}`
    }
    if (intent === 'edit') {
        // e.g. /studio/structure/siteSettings (This is simplified, singletons usually live at root of structure or specific path)
        // For Site Settings specifically, it's often a direct mapping
        if (params.id === 'siteSettings') return `${baseUrl}/structure/siteSettings`
        return `${baseUrl}/structure/${params.type}/${params.id}`
    }
    return baseUrl
}


export const mobileHomeTool = definePlugin({
    name: 'mobile-home',
    tools: [
        {
            name: 'home',
            title: 'Home',
            icon: DashboardIcon,
            component: MobileHome,
            options: {}
        }
    ]
})
