# AthleteCare Pro — DESIGN.md

## 1. Design Direction

Build the product as a **premium black-and-white sports health platform** with a strong editorial feel and a high-end SaaS interface.

The visual language should feel:

- Premium
- Athletic
- Modern
- Minimal
- Professional
- High contrast
- Technical
- Fast
- Clean
- Confident

Primary inspiration: **ProMax UI / premium modern dashboard aesthetics** with strong typography, generous spacing, sharp hierarchy, subtle borders, compact data cards, large visual hero sections, and polished micro-interactions.

Do **not** make the website look like a generic gym template. It should feel like a serious technology product for athletes, coaches, nutritionists, and health-focused customers.

---

## 2. Color System

The entire interface uses a monochrome palette.

### Core colors

```txt
Black:        #000000
Near Black:   #0A0A0A
Dark Surface: #111111
Surface 2:    #171717
Gray 900:     #202020
Gray 700:     #4A4A4A
Gray 500:     #777777
Gray 300:     #BDBDBD
Gray 200:     #D9D9D9
Gray 100:     #F2F2F2
White:        #FFFFFF
```

### Usage

- Main background: `#FFFFFF` or `#000000` depending on section.
- Primary CTA: black background + white text.
- Secondary CTA: white background + black border/text.
- Cards: white with thin gray border on light mode.
- Dark cards: near-black background with subtle gray border.
- Text: nearly black on light backgrounds and white on dark backgrounds.
- Dividers: low-contrast gray.
- Icons: inherit the text color.

Do not introduce colorful gradients or random accent colors.

For system feedback, keep the monochrome design dominant. Status can use icons, labels, border treatment, and typography; avoid turning the product into a multicolor dashboard.

---

## 3. Typography

Use a modern sans-serif stack.

Preferred:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

For large marketing headlines, use strong weight and tight tracking.

### Scale

```txt
Display:     72 / 76px, 700–800
H1:          56 / 60px, 700–800
H2:          40 / 46px, 700
H3:          30 / 36px, 650–700
H4:          22 / 28px, 600–700
Body Large:  18 / 28px, 400–500
Body:        16 / 25px, 400–500
Small:       14 / 20px, 400–500
Caption:     12 / 16px, 500
```

Use uppercase sparingly for labels, metadata, and compact UI controls.

Headlines should usually be short and visually dominant.

---

## 4. Layout Philosophy

Use a strong grid and consistent spacing.

### Desktop

- Maximum content width: `1440px`
- Main content width: `1200–1320px`
- Page gutters: `32–64px`
- Dashboard sidebar: `260–280px`
- Grid gap: `16–24px`

### Tablet

- Page gutters: `24–32px`
- Reduce sidebar width
- Collapse secondary navigation when necessary

### Mobile

- Page gutters: `16–20px`
- Single-column content
- Sticky bottom navigation for authenticated client areas
- Large touch targets: minimum `44px`
- Horizontal cards can become swipeable carousels

Use CSS Grid for large layouts and Flexbox for component-level alignment.

---

## 5. Border and Radius System

The visual style should be slightly sharp rather than overly rounded.

```txt
Small:   6px
Medium:  10px
Large:   14px
XL:      18px
Pill:    999px
```

Recommended default card radius: `14px`.

Buttons should generally use `10px` radius rather than extreme pill shapes.

Inputs should use `10px` radius.

Avoid excessive rounded containers everywhere.

---

## 6. Shadows

Use shadows very carefully.

Default:

```css
box-shadow: none;
```

Hover/floating surfaces may use subtle shadows such as:

```css
box-shadow: 0 10px 30px rgba(0,0,0,0.08);
```

Dark-mode elevated surfaces should rely more on borders than heavy shadows.

---

## 7. ProMax UI Principles

Apply these principles throughout the product:

1. **Strong visual hierarchy** — users should immediately understand what matters.
2. **Dense but readable information** — dashboards should feel powerful without feeling crowded.
3. **One dominant action per area** — avoid competing CTAs.
4. **Consistent spacing** — use a spacing scale instead of arbitrary margins.
5. **Premium data presentation** — charts and metrics should look refined and simple.
6. **Minimal decoration** — every decorative element must support the product.
7. **Fast perceived performance** — skeletons, transitions, optimistic UI, and progressive loading.
8. **Sharp product identity** — monochrome visuals, typography, borders, and photography carry the brand.

---

# 8. Global Navigation

## Public Header

Desktop:

```txt
[Logo]  Programs  Coaches  Nutrition  Shop  AI Coach  Blog        [Login] [Start Now]
```

Behavior:

- Sticky on scroll.
- Transparent over hero initially.
- Transitions to blurred white/black solid surface after scrolling.
- Subtle bottom border appears on scroll.

Mobile:

```txt
[Logo]                         [Menu]
```

Open a full-screen or large slide-over navigation.

Animation:

- Menu button morphs between hamburger and close icon.
- Navigation items stagger in vertically.
- Background uses subtle blur.

---

# 9. Homepage Design

## Hero

Create a high-impact hero with large typography.

Example structure:

```txt
TRAIN SMART.
EAT BETTER.
PERFORM MORE.

Personalized fitness, nutrition and coaching built around your goal.

[Build My Plan] [Explore Programs]

              [Athlete / training visual]
```

Hero style:

- Black and white only.
- Large editorial typography.
- High-quality athletic photography/video.
- Strong negative space.
- Minimal floating metric cards.

Animation:

- Headline reveals upward line-by-line.
- Image has subtle scale-in from `1.04` to `1`.
- Floating metric cards fade and slide upward.
- CTA buttons have micro-interactions.

Do not use distracting continuous animation in the hero.

---

# 10. Goal Selector

A high-value interactive section immediately after the hero.

```txt
WHAT ARE YOU TRAINING FOR?

[ Muscle Gain ] [ Fat Loss ] [ Strength ]
[ Bodybuilding ] [ Performance ] [ General Fitness ]
```

On hover:

- Border becomes darker.
- Background subtly changes.
- Arrow icon shifts 4px.

On selection:

- Card expands or highlights.
- Selected state is clearly visible.
- Continue button appears with a smooth transition.

---

# 11. Program Cards

Programs should use premium editorial cards.

Card contents:

- Program image
- Goal
- Difficulty
- Duration
- Sessions/week
- Short description
- CTA

Example:

```txt
MUSCLE BUILDING
12 WEEKS
4 DAYS / WEEK

Build strength and muscle with structured progressive training.

[View Program]
```

Hover:

- Image scales from `1` to `1.03`.
- Card moves upward by `4px`.
- Arrow slides horizontally.
- Border contrast increases.

---

# 12. Coach Cards

Coach cards should feel like premium professional profiles.

Include:

- Portrait
- Name
- Verification badge
- Specialties
- Experience
- Rating
- Number of clients
- Starting price
- View profile CTA

Do not overcrowd the card.

---

# 13. Shop Design

The shop should feel like a premium sports-performance store rather than a generic e-commerce template.

## Shop layout

```txt
SHOP

Search products

Categories
-------------------------------------------------
Protein | Creatine | Pre-Workout | Clothing | Accessories

Filters                         Products
---------------------           -------------------------
Category                        [Product] [Product]
Brand                           [Product] [Product]
Price                           [Product] [Product]
Rating                          [Product] [Product]
Size                            [Product] [Product]
```

Product card:

- Large image
- Minimal badge
- Product name
- Brand
- Price
- Compare-at price if applicable
- Rating
- Quick add
- Wishlist

Hover:

- Show second image where available.
- Quick add button slides/fades in.
- Image zoom is subtle.

---

# 14. Product Detail Page

Layout:

```txt
[Image Gallery]       Product Name
                       Rating
                       Price
                       Description
                       Variant selection
                       Quantity
                       [Add to Cart]
                       [Buy Now]
```

Below the product:

- Description
- Nutrition facts
- Ingredients
- Usage information
- Warnings
- Reviews
- Related products
- AI product helper

For supplements, make educational and safety information visually clear.

---

# 15. Client Dashboard

The authenticated client dashboard should be the core product experience.

## Desktop

```txt
-------------------------------------------------------------
Sidebar              Dashboard
-------------------------------------------------------------
Overview              Good morning, Mikhail
My Workout            Goal: Muscle Gain
My Diet
Progress              [Weight] [Calories] [Protein] [Streak]
Coach
AI Coach              Today's Workout
Shop                  ------------------------------
Messages              Exercise cards
Appointments
Settings              Today's Nutrition
                       ------------------------------
                       Meal cards

                       Progress Chart
```

### Dashboard cards

Use compact premium metric cards:

- Current weight
- Goal progress
- Calories
- Protein
- Workout completion
- Water
- Steps
- Sleep

Each card should include:

- Label
- Large number
- Small trend
- Tiny visualization when useful

---

# 16. Client Mobile Dashboard

Mobile should prioritize today's actions.

Order:

1. Greeting
2. Today's workout
3. Today's meals
4. Goal progress
5. Coach message
6. AI Coach
7. Progress
8. Recommended products

Use a sticky bottom navigation:

```txt
Home | Workout | Diet | AI | Profile
```

---

# 17. Workout UI

Workout interface should be optimized for actual gym usage.

Large controls:

```txt
TODAY'S WORKOUT
CHEST + TRICEPS

Bench Press
4 sets × 8 reps
80 kg

[ Start Set ]

Rest Timer
01:32
```

Features:

- Large set completion controls.
- Rest timer.
- RPE selector.
- Weight input.
- Reps input.
- Exercise video.
- Exercise instructions.
- Coach notes.
- Previous performance.

Animation:

- Completed set becomes visually compressed.
- Checkmark draws in.
- Progress indicator updates smoothly.
- Rest timer uses subtle pulse only while active.

---

# 18. Nutrition UI

Show today's nutrition as a clean dashboard.

```txt
TODAY

2,340 / 2,500 kcal

Protein   172g / 190g
Carbs     245g / 280g
Fat       68g / 75g

Breakfast
[Meal Card]

Lunch
[Meal Card]

Snack
[Meal Card]

Dinner
[Meal Card]
```

Use monochrome progress bars/rings.

Avoid rainbow macro charts.

---

# 19. Progress Page

This page should feel like an athlete performance dashboard.

Sections:

- Weight trend
- Measurements
- Strength progression
- Workout adherence
- Nutrition adherence
- Progress photos
- Goal timeline
- Personal records

Charts:

- Clean line charts
- Thin strokes
- Minimal grid lines
- Compact tooltips
- No unnecessary visual noise

---

# 20. AI Coach UI

The AI page should feel like a premium intelligent assistant, not a generic chat app.

Layout:

```txt
---------------------------------------------------------
AI COACH
---------------------------------------------------------

Your goal
Muscle Gain

Suggested today:
- Complete today's workout
- Hit protein target
- Drink 2.5L water

---------------------------------------------------------
Chat area

AI: Based on your recent training...

You: Should I adjust my workout?

AI: ...
---------------------------------------------------------
[Ask your AI Coach...] [Send]
```

Add quick actions:

- Build my workout
- Create meal ideas
- Analyze my progress
- Explain this exercise
- Help me hit my protein target
- Prepare my weekly check-in

Animation:

- Messages fade upward.
- Streaming cursor while AI response is being generated.
- Quick action chips animate on hover.
- Avoid fake robotic bouncing dots when not necessary.

---

# 21. Coach Dashboard

Coach UI should prioritize client management.

Top metrics:

- Active clients
- Today's appointments
- Clients needing check-in
- Average adherence
- Unread messages

Client table:

```txt
Client       Goal         Adherence   Last Check-in   Status
-------------------------------------------------------------
Ahmed        Muscle       91%         Today            Active
Omar         Fat Loss     84%         Yesterday        Active
Ali          Strength     72%         5 days ago      Review
```

Color should remain monochrome; use typography, icons, and labels for status.

---

# 22. Coach Client Detail

Use a command-center layout.

Header:

```txt
[Photo] Ahmed Mohamed
Muscle Gain · 12 weeks

[Message] [Edit Plan] [Book Session]
```

Tabs:

```txt
Overview | Workout | Diet | Progress | Measurements | Photos | Notes
```

Include:

- Current plan
- Recent workouts
- Adherence
- Weight chart
- Nutrition chart
- Coach notes
- Check-in history

---

# 23. Admin UI

The admin dashboard should be visually distinct from the public site while keeping the same design system.

## Sidebar

```txt
ATHLETECARE

Overview
Users
Clients
Coaches
Nutrition
Workouts
Store
Orders
Subscriptions
Appointments
Content
AI
Reports
Audit Logs
Settings
```

## Admin top bar

Include:

- Global search
- Notifications
- Quick create
- User menu

## Tables

Use:

- Sticky headers where appropriate.
- Search.
- Filters.
- Sorting.
- Pagination.
- Column visibility.
- Bulk actions.
- Export.

Avoid oversized tables on mobile; convert rows into stacked cards where necessary.

---

# 24. Admin Product Upload UX

Route:

`/admin/products/create`

Use a 2-column desktop layout.

Left:

- Product details
- Description
- Pricing
- Inventory
- Variants
- Nutrition
- SEO

Right:

- Product image uploader
- Gallery
- Publish controls
- Category
- Featured checkbox

Image uploader:

- Drag and drop.
- Preview.
- Reorder.
- Delete.
- Primary image selection.
- Upload progress.
- Validation errors.

---

# 25. Forms

Forms must look clean and premium.

Input anatomy:

```txt
Label
[ Input value                           ]
Helper text
```

Focused state:

- Black border.
- Subtle outer ring.

Error state:

- Strong border contrast.
- Error icon.
- Concise error message.

Never rely only on placeholder text.

---

# 26. Buttons

### Primary

```txt
Background: Black
Text: White
```

### Secondary

```txt
Background: White
Text: Black
Border: 1px solid #D9D9D9
```

### Ghost

```txt
Background: transparent
Text: currentColor
```

### Destructive

Use a clearly differentiated visual treatment but keep the overall interface monochrome.

Buttons should have:

- Hover transition: `150–200ms`
- Active scale: approximately `0.98`
- Disabled opacity: around `0.5`

---

# 27. Micro-Interactions

Use motion to communicate state, hierarchy, and feedback.

Do not animate everything.

Recommended interaction rules:

```txt
Hover:       150–200ms
Press:       100–150ms
Panel open:  200–300ms
Page enter:  300–500ms
Large hero:  500–800ms
```

Use easing similar to:

```txt
cubic-bezier(0.22, 1, 0.36, 1)
```

Preferred motion:

- Fade
- Slide
- Scale from 0.98–1
- Height expansion
- Border transition
- Image scale 1–1.03
- Staggered list entrance

Avoid:

- Excessive bouncing
- Spinning UI elements except loaders
- Constant floating effects
- Excessive parallax
- Long transitions

---

# 28. Page Transitions

Use subtle transitions between major views.

Default:

```txt
opacity: 0 → 1
transform: translateY(8px) → translateY(0)
duration: 300–450ms
```

For dashboards, transitions should be shorter to maintain a feeling of speed.

---

# 29. Scroll Animations

Marketing pages may use scroll-triggered reveals.

Supported animations:

- Fade in
- Slide up
- Slide from side
- Scale in
- Image reveal
- Text mask reveal

Trigger when roughly `15–25%` of the element enters the viewport.

Do not hide critical content from users who have disabled motion.

---

# 30. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Users who prefer reduced motion must still have full access to content and actions.

---

# 31. Loading States

Never leave empty white screens while data loads.

Use skeleton loaders for:

- Dashboard cards
- Product cards
- Coach cards
- Tables
- Workout sections
- Charts
- Chat history

Skeleton design:

- Low-contrast gray blocks.
- Match final component dimensions.
- Subtle shimmer only when useful.

---

# 32. Empty States

Every major data page needs a useful empty state.

Example:

```txt
NO WORKOUT PLAN YET

Complete your assessment to create a personalized plan.

[Complete Assessment]
```

Never use generic messages like `No data` when the user needs an explanation or action.

---

# 33. Error States

Errors should be actionable.

Example:

```txt
WE COULDN'T LOAD YOUR WORKOUT

Your data is safe. Please try again.

[Retry]
```

Do not expose internal stack traces or technical errors to normal users.

---

# 34. Toasts

Toasts should appear top-right on desktop and near the bottom on mobile.

Examples:

```txt
Workout completed
Product added to cart
Plan updated
Message sent
Payment successful
```

Keep them concise.

---

# 35. Modal Design

Use modals for:

- Confirmations
- Quick edits
- Delete/Archive confirmation
- Product variant selection
- Add measurement
- Add note
- Appointment actions

For complex workflows, use a full page or drawer instead of a massive modal.

---

# 36. Drawers

Useful for:

- Mobile filters
- Cart preview
- Notifications
- Quick edit
- Client details
- Product preview

Drawer animation:

```txt
Desktop: slide from right
Mobile: slide from bottom or right depending on context
Duration: 250–350ms
```

---

# 37. Photography and Visual Assets

Use photography that feels:

- Athletic
- Realistic
- Premium
- High contrast
- Cleanly composed
- Performance-oriented

Avoid overly saturated fitness stock imagery.

Prefer:

- Black-and-white photography
- High-contrast athlete imagery
- Gym environments
- Close-up training details
- Product editorial photography
- Clean studio product shots

---

# 38. Icons

Use a consistent icon family such as Lucide.

Rules:

- Do not mix multiple icon libraries in the same interface.
- Use `1.5–2px` visual stroke weight.
- Align icons optically with typography.
- Avoid icons inside every small piece of text.

---

# 39. Charts

Charts must be simple and readable.

Recommended:

- Line charts
- Area charts with extremely subtle fill
- Bar charts
- Progress rings
- Sparklines

Avoid 3D charts and decorative chart effects.

Examples:

- Weight over time
- Strength progression
- Calories consumed
- Protein adherence
- Workout completion
- Revenue
- Orders

---

# 40. Tables

Desktop table characteristics:

- 48–56px row height.
- Strong column alignment.
- Sticky header when useful.
- Minimal borders.
- Hover state on rows.
- Clear primary field.

Mobile:

- Transform rows into cards or horizontal scroll containers.
- Keep critical information visible first.

---

# 41. Responsive Rules

The application must be fully functional from approximately `320px` width through large desktop screens.

Never solve responsiveness by simply shrinking desktop layouts.

At mobile widths:

- Collapse sidebars.
- Stack cards.
- Convert tables to cards.
- Keep CTAs reachable.
- Increase touch target spacing.
- Maintain readable typography.
- Avoid horizontal overflow.

---

# 42. Accessibility

Required:

- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Proper form labels.
- ARIA only where needed.
- Sufficient contrast.
- Alt text for meaningful images.
- Captions/transcripts where appropriate for instructional media.
- Reduced-motion support.
- Screen-reader friendly status updates.

---

# 43. Internationalization

The product supports:

- English
- Arabic

Arabic requirements:

- Full RTL support.
- Mirrored navigation and spacing where appropriate.
- Correct Arabic typography.
- RTL-aware charts and tables where appropriate.
- Localized dates and numbers.
- No hardcoded English strings in components.

Language switcher:

```txt
EN | AR
```

Switching language must not break layout.

---

# 44. Dark Mode

Dark mode is a first-class theme.

Light:

```txt
Background: #FFFFFF
Surface:    #F7F7F7
Text:       #0A0A0A
Border:     #E1E1E1
```

Dark:

```txt
Background: #000000
Surface:    #0B0B0B
Text:       #FFFFFF
Border:     #242424
```

Avoid simply inverting every color. Define dedicated theme tokens.

---

# 45. Design Tokens

Create centralized tokens for:

```txt
colors
spacing
radius
shadows
font sizes
font weights
line heights
z-index
animation durations
easing
breakpoints
```

Never scatter arbitrary values throughout the application.

---

# 46. Component Library

Create reusable components:

```txt
Button
IconButton
Input
Textarea
Select
Combobox
Checkbox
Radio
Switch
Tabs
Badge
Avatar
Card
StatCard
MetricCard
ChartCard
DataTable
Dropdown
Popover
Tooltip
Modal
Drawer
Toast
Pagination
Breadcrumb
Navbar
Sidebar
BottomNav
FileUploader
ImageUploader
ProgressBar
ProgressRing
Skeleton
EmptyState
ErrorState
ConfirmDialog
DatePicker
TimePicker
Calendar
WorkoutCard
ExerciseCard
MealCard
ProductCard
CoachCard
PlanCard
ReviewCard
ChatMessage
ChatComposer
```

Every component must support loading, disabled, error, and responsive behavior where relevant.

---

# 47. Motion Component Strategy

Recommended animation library:

```txt
Framer Motion / Motion for React
```

Create reusable motion primitives:

```txt
FadeIn
SlideUp
ScaleIn
StaggerContainer
StaggerItem
PageTransition
AccordionMotion
DrawerMotion
ModalMotion
HoverCard
Pressable
```

Do not place ad-hoc animation code in every component.

---

# 48. Brand Logo Direction

The logo should be minimal and monochrome.

Recommended concept:

- Strong geometric wordmark.
- Compact icon inspired by movement, pulse, performance, or an abstract athletic mark.
- White version for dark backgrounds.
- Black version for light backgrounds.
- SVG as the canonical format.

Do not use complicated gradients in the logo.

---

# 49. Footer

Footer sections:

```txt
ATHLETECARE

Programs
Coaching
Nutrition
Shop
AI Coach
Blog

Support
Contact
FAQ
Returns
Shipping

Legal
Privacy
Terms
Medical Disclaimer

Social links
Newsletter
```

Use a large black footer with white typography as the primary branded treatment.

---

# 50. Security UI

Security-sensitive interfaces must look trustworthy and clear.

Examples:

- Login
- Password reset
- 2FA
- Payment
- Account deletion
- Health/wellness data access

Use explicit confirmation text and avoid ambiguous destructive actions.

---

# 51. E-commerce Trust Elements

Checkout should display:

- Order summary
- Delivery information
- Payment status
- Security reassurance
- Return/shipping links
- Clear totals

Avoid clutter.

---

# 52. Health and Wellness Safety UX

Because the product handles health and fitness information:

- Clearly distinguish wellness guidance from medical advice.
- Make safety disclaimers readable but unobtrusive.
- Sensitive health information should never be displayed publicly.
- Progress photos are private by default.
- Users should know when information is shared with a coach.
- The AI should clearly identify itself as an AI assistant.
- Injury/medical-risk situations should provide a clear path to professional help.

---

# 53. SEO / Marketing Visual Style

Landing pages should use:

- Large editorial headlines.
- Minimal copy blocks.
- Strong imagery.
- Clear CTAs.
- Social proof.
- Program comparisons.
- Transformation stories with appropriate consent.
- FAQ sections.

Do not create walls of text.

---

# 54. Performance-Friendly Motion Rules

Animations must not significantly impact performance.

Prefer:

```txt
transform
opacity
filter (sparingly)
```

Avoid animating layout-heavy properties whenever possible.

Lazy-load below-the-fold media.

Use responsive image sizes.

---

# 55. Definition of Visual Done

A page is visually complete only when:

- Desktop looks premium.
- Tablet layout is intentional.
- Mobile layout is intentional.
- Loading state exists.
- Empty state exists where applicable.
- Error state exists where applicable.
- Hover/focus/active states exist.
- Animations are subtle and purposeful.
- Reduced motion is respected.
- Typography hierarchy is clear.
- Spacing is consistent.
- No accidental overflow exists.
- Buttons have obvious hierarchy.
- Forms have clear validation.
- Images have proper cropping.
- Dark mode is correct.
- Arabic RTL is correct.

---

# 56. Final Visual Rule

The interface should communicate this feeling:

> **Professional athletic performance meets premium healthcare technology.**

Every page should look intentional, high-value, and modern.

Use **black, white, grayscale, typography, spacing, photography, borders, and motion** to create the identity rather than adding unnecessary colors or decorative effects.

The final result should look suitable for a premium international fitness technology company and should not resemble a basic gym website or template.
