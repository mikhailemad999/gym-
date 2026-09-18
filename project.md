{
"project": {
"name": "AthleteCare Pro",
"type": "Full-Stack Fitness, Wellness, Coaching & E-Commerce SaaS",
"version": "1.0.0",
"description": "A production-grade web platform for bodybuilding, athletes, general fitness, nutrition, coaching, personalized workout and diet plans, supplement guidance, progress tracking, AI assistance, appointments, subscriptions, and e-commerce for supplements, sportswear, clothing, and fitness accessories.",
"engineering_goal": "Build the system as if it were designed and implemented by a senior software engineering team with 20+ years of combined production experience. Prioritize scalability, security, maintainability, clean architecture, excellent UX, API reliability, observability, and production deployment readiness.",
"primary_users": [
"Guest",
"Client",
"Coach",
"Nutritionist",
"Content Manager",
"Store Manager",
"Support Agent",
"Admin",
"Super Admin"
]
},

"core_concept": {
"business_model": [
"Free user account",
"Premium fitness subscriptions",
"Coach subscription",
"1-to-1 coaching",
"Personalized diet plans",
"Personalized workout plans",
"Supplement recommendations",
"E-commerce sales",
"Sportswear sales",
"Fitness accessories sales",
"Premium AI fitness assistant",
"Coach packages",
"Digital fitness programs",
"Corporate wellness packages"
],
"main_value": "One platform where a client can register, complete a fitness profile, define a goal, receive a personalized diet and workout plan, communicate with a coach, track progress, use an AI assistant, book sessions, and purchase supplements and sportswear."
},

"recommended_architecture": {
"frontend": {
"framework": "Next.js with React and TypeScript",
"styling": "Tailwind CSS",
"ui": "Reusable component system",
"state_management": "Zustand or Redux Toolkit",
"server_state": "TanStack Query",
"forms": "React Hook Form",
"validation": "Zod",
"charts": "Recharts",
"icons": "Lucide React",
"internationalization": [
"English",
"Arabic"
],
"responsive": true,
"mobile_first": true,
"theme": [
"Light",
"Dark"
]
},

```
"backend": {
  "framework": "Django",
  "api": "Django REST Framework",
  "language": "Python",
  "authentication": "JWT access and refresh tokens",
  "authorization": "RBAC with granular permissions",
  "background_jobs": "Celery",
  "cache": "Redis",
  "websocket": "Django Channels",
  "documentation": "OpenAPI / Swagger",
  "file_storage": "Object storage abstraction",
  "email": "SMTP/provider abstraction",
  "notifications": "Email + in-app + push-ready architecture"
},

"database": {
  "primary": "PostgreSQL",
  "search": "PostgreSQL full-text search initially, scalable search adapter later",
  "cache": "Redis",
  "analytics": "PostgreSQL analytics tables/materialized views initially"
},

"deployment": {
  "frontend": "Production Linux environment",
  "backend": "Dockerized Django application",
  "database": "PostgreSQL",
  "reverse_proxy": "Nginx",
  "ssl": "HTTPS",
  "environment_management": ".env files and secure secret storage",
  "ci_cd": "GitHub Actions",
  "containers": [
    "frontend",
    "backend",
    "worker",
    "scheduler",
    "postgres",
    "redis",
    "nginx"
  ]
}
```

},

"design_system": {
"visual_direction": "Premium sports performance and healthcare-inspired modern interface",
"style": [
"Modern",
"Professional",
"Athletic",
"Premium",
"Clean",
"Fast",
"Minimal but information-rich"
],
"ui_requirements": {
"desktop": true,
"tablet": true,
"mobile": true,
"accessibility": true,
"keyboard_navigation": true,
"loading_states": true,
"empty_states": true,
"error_states": true,
"skeleton_loaders": true,
"toast_notifications": true,
"confirmation_dialogs": true
}
},

"roles_and_permissions": {
"guest": {
"can": [
"View homepage",
"View public fitness programs",
"View coaches",
"View public shop",
"View products",
"Search products",
"Read blog",
"Register",
"Login",
"Contact support"
]
},

```
"client": {
  "can": [
    "Create profile",
    "Complete fitness assessment",
    "Define fitness goals",
    "View workout plan",
    "View diet plan",
    "View supplement recommendations",
    "Track measurements",
    "Track workouts",
    "Track calories",
    "Track water",
    "Upload progress photos",
    "Book coach sessions",
    "Chat with coach",
    "Use AI assistant",
    "Purchase products",
    "Manage cart",
    "Place orders",
    "Manage subscriptions",
    "View invoices",
    "Write reviews",
    "Favorite products",
    "Favorite coaches",
    "Receive notifications"
  ]
},

"coach": {
  "can": [
    "Manage profile",
    "Create workout plans",
    "Create diet plans",
    "Create client goals",
    "Assign plans",
    "Review client progress",
    "Track client adherence",
    "Chat with clients",
    "Manage appointments",
    "Add exercises",
    "Add nutrition recommendations",
    "Add notes",
    "Review progress photos",
    "Generate reports",
    "Manage coach availability",
    "Manage coaching packages"
  ]
},

"nutritionist": {
  "can": [
    "Manage nutrition plans",
    "Review client nutrition data",
    "Create meal plans",
    "Manage food database",
    "Set calorie and macro targets",
    "Review nutrition adherence"
  ]
},

"content_manager": {
  "can": [
    "Create blog articles",
    "Edit pages",
    "Manage categories",
    "Manage banners",
    "Manage FAQs",
    "Manage educational content"
  ]
},

"store_manager": {
  "can": [
    "Create products",
    "Edit products",
    "Upload product images",
    "Manage categories",
    "Manage inventory",
    "Manage product variants",
    "Manage orders",
    "Manage coupons",
    "Manage shipping",
    "Manage product reviews"
  ]
},

"support_agent": {
  "can": [
    "View support tickets",
    "Respond to customers",
    "View order information",
    "Escalate issues"
  ]
},

"admin": {
  "can": [
    "Manage clients",
    "Manage coaches",
    "Manage nutritionists",
    "Manage admins",
    "Manage products",
    "Manage categories",
    "Manage orders",
    "Manage subscriptions",
    "Manage payments",
    "Manage appointments",
    "Manage workout content",
    "Manage diet content",
    "Manage AI settings",
    "Manage blog",
    "Manage CMS",
    "View reports",
    "View audit logs",
    "Manage system settings"
  ]
},

"super_admin": {
  "can": [
    "Everything",
    "Create admins",
    "Delete admins",
    "Manage permissions",
    "Manage security settings",
    "Manage integrations",
    "Manage feature flags",
    "Manage system configuration"
  ]
}
```

},

"route_structure": {
"public": [
"/",
"/about",
"/how-it-works",
"/programs",
"/workouts",
"/nutrition",
"/coaches",
"/coach/[slug]",
"/shop",
"/shop/[category]",
"/product/[slug]",
"/cart",
"/checkout",
"/blog",
"/blog/[slug]",
"/faq",
"/contact",
"/terms",
"/privacy",
"/medical-disclaimer"
],

```
"authentication": [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/two-factor",
  "/complete-profile"
],

"client": [
  "/app",
  "/app/dashboard",
  "/app/profile",
  "/app/assessment",
  "/app/goals",
  "/app/workout",
  "/app/workout/today",
  "/app/workout/history",
  "/app/diet",
  "/app/meals",
  "/app/nutrition",
  "/app/supplements",
  "/app/progress",
  "/app/body-measurements",
  "/app/progress-photos",
  "/app/body-weight",
  "/app/appointments",
  "/app/coaching",
  "/app/coach",
  "/app/messages",
  "/app/notifications",
  "/app/ai-coach",
  "/app/favorites",
  "/app/orders",
  "/app/subscriptions",
  "/app/invoices",
  "/app/reviews",
  "/app/settings",
  "/app/security",
  "/app/help"
],

"coach": [
  "/coach",
  "/coach/dashboard",
  "/coach/profile",
  "/coach/clients",
  "/coach/clients/[id]",
  "/coach/clients/[id]/overview",
  "/coach/clients/[id]/workout",
  "/coach/clients/[id]/diet",
  "/coach/clients/[id]/progress",
  "/coach/clients/[id]/measurements",
  "/coach/clients/[id]/photos",
  "/coach/clients/[id]/notes",
  "/coach/workout-plans",
  "/coach/diet-plans",
  "/coach/exercises",
  "/coach/foods",
  "/coach/calendar",
  "/coach/appointments",
  "/coach/messages",
  "/coach/packages",
  "/coach/reports",
  "/coach/settings"
],

"admin": [
  "/admin",
  "/admin/dashboard",
  "/admin/users",
  "/admin/clients",
  "/admin/coaches",
  "/admin/nutritionists",
  "/admin/admins",
  "/admin/roles",
  "/admin/permissions",
  "/admin/products",
  "/admin/products/create",
  "/admin/products/[id]",
  "/admin/categories",
  "/admin/inventory",
  "/admin/orders",
  "/admin/orders/[id]",
  "/admin/coupons",
  "/admin/shipping",
  "/admin/payments",
  "/admin/subscriptions",
  "/admin/plans",
  "/admin/workouts",
  "/admin/exercises",
  "/admin/diets",
  "/admin/foods",
  "/admin/meal-plans",
  "/admin/coaching",
  "/admin/appointments",
  "/admin/blog",
  "/admin/cms",
  "/admin/banners",
  "/admin/faq",
  "/admin/reviews",
  "/admin/support",
  "/admin/notifications",
  "/admin/ai",
  "/admin/analytics",
  "/admin/reports",
  "/admin/audit-logs",
  "/admin/settings",
  "/admin/security",
  "/admin/integrations"
]
```

},

"homepage": {
"sections": [
"Hero",
"Fitness goal selector",
"Personalized plan CTA",
"Workout programs",
"Nutrition programs",
"Featured coaches",
"Transformation stories",
"Shop categories",
"Featured supplements",
"Sportswear",
"AI fitness assistant",
"How the platform works",
"Membership plans",
"Testimonials",
"Educational articles",
"FAQ",
"Newsletter",
"Footer"
],
"primary_ctas": [
"Create My Plan",
"Find a Coach",
"Start Training",
"Shop Now"
]
},

"client_onboarding": {
"steps": [
{
"step": 1,
"name": "Account",
"fields": [
"Full name",
"Email",
"Phone",
"Password",
"Date of birth"
]
},
{
"step": 2,
"name": "Fitness profile",
"fields": [
"Gender",
"Height",
"Weight",
"Activity level",
"Training experience",
"Current fitness level"
]
},
{
"step": 3,
"name": "Goal",
"options": [
"Weight loss",
"Fat loss",
"Muscle gain",
"Bodybuilding",
"Strength",
"Endurance",
"Athletic performance",
"General fitness",
"Body recomposition",
"Maintenance"
]
},
{
"step": 4,
"name": "Training",
"fields": [
"Days per week",
"Session duration",
"Training location",
"Available equipment",
"Preferred training time"
]
},
{
"step": 5,
"name": "Nutrition",
"fields": [
"Diet preference",
"Meals per day",
"Food preferences",
"Food exclusions",
"Allergy information",
"Cooking preference",
"Budget preference"
]
},
{
"step": 6,
"name": "Lifestyle",
"fields": [
"Sleep duration",
"Work schedule",
"Daily steps",
"Stress level",
"Water intake"
]
},
{
"step": 7,
"name": "Health safety",
"fields": [
"Relevant health conditions",
"Current medications",
"Injuries",
"Movement limitations",
"Doctor restrictions"
]
},
{
"step": 8,
"name": "Target",
"fields": [
"Target weight",
"Target date",
"Priority goal"
]
}
]
},

"client_dashboard": {
"widgets": [
"Current weight",
"Target weight",
"Weight trend",
"Calories target",
"Protein target",
"Today's workout",
"Workout completion",
"Today's meals",
"Water intake",
"Steps",
"Sleep",
"Weekly progress",
"Coach messages",
"AI recommendations",
"Upcoming appointment",
"Subscription status",
"Recommended products"
]
},

"workout_system": {
"features": [
"Workout library",
"Exercise library",
"Muscle group classification",
"Equipment classification",
"Difficulty classification",
"Workout templates",
"Personalized workout plans",
"Weekly schedules",
"Warm-up",
"Main workout",
"Cooldown",
"Sets",
"Reps",
"Weight",
"Rest time",
"Tempo",
"RPE",
"Superset",
"Dropset",
"Circuit",
"Failure tracking",
"Exercise video",
"Exercise instructions",
"Coach notes",
"Workout completion"
],
"exercise_fields": [
"name",
"slug",
"description",
"instructions",
"primary_muscle",
"secondary_muscles",
"equipment",
"difficulty",
"exercise_type",
"video_url",
"thumbnail",
"safety_notes",
"contraindications",
"created_by",
"status"
],
"workout_tracking": [
"planned_sets",
"completed_sets",
"planned_reps",
"completed_reps",
"planned_weight",
"actual_weight",
"rest_seconds",
"rpe",
"completed",
"notes"
]
},

"diet_system": {
"features": [
"Nutrition profile",
"Calorie calculation",
"Macro targets",
"Meal plans",
"Daily meals",
"Meal timing",
"Food database",
"Ingredient database",
"Recipe database",
"Portion sizes",
"Calories",
"Protein",
"Carbohydrates",
"Fat",
"Fiber",
"Water goals",
"Meal completion",
"Food substitution",
"Shopping list",
"Coach approval workflow"
],
"meal_fields": [
"meal_type",
"meal_name",
"description",
"ingredients",
"portion",
"calories",
"protein",
"carbs",
"fat",
"fiber",
"preparation_time",
"instructions"
]
},

"supplement_system": {
"features": [
"Supplement database",
"Supplement education",
"Supplement category",
"Suggested usage",
"Timing",
"Serving information",
"Client recommendations",
"Coach recommendations",
"AI recommendations",
"Purchase from store",
"Supplement reminders",
"Product comparison",
"Inventory tracking"
],
"safety": {
"rules": [
"Do not diagnose medical conditions",
"Do not replace a doctor or qualified healthcare professional",
"Do not automatically recommend supplements when contraindications are known",
"Clearly show educational disclaimers",
"Require professional review for sensitive cases",
"Record consent for personalized recommendations"
]
}
},

"ai_system": {
"name": "AthleteCare AI Coach",
"features": [
"AI fitness assistant",
"AI workout plan generation",
"AI meal plan generation",
"AI progress analysis",
"AI habit coaching",
"AI exercise explanations",
"AI meal substitutions",
"AI shopping assistance",
"AI supplement education",
"AI weekly check-in",
"AI adherence analysis",
"AI motivational messaging",
"AI client summary for coaches"
],
"client_chat": {
"route": "/app/ai-coach",
"context": [
"User profile",
"Goal",
"Workout plan",
"Diet plan",
"Progress",
"Measurements",
"Workout history",
"Nutrition history",
"Sleep data",
"Water data",
"Coach instructions"
]
},
"plan_generation_flow": [
"Read onboarding data",
"Validate required data",
"Calculate planning parameters",
"Generate draft plan",
"Run safety rules",
"Present plan to client",
"Allow coach review when required",
"Save approved plan",
"Track adherence",
"Generate weekly adjustments"
],
"guardrails": [
"Never claim to diagnose disease",
"Never present itself as a doctor",
"Flag medical or injury-related issues",
"Recommend professional evaluation when appropriate",
"Do not fabricate scientific citations",
"Do not invent medications",
"Do not recommend unsafe extreme diets",
"Do not create dangerous training protocols",
"Clearly distinguish general wellness guidance from medical advice"
],
"knowledge_base": [
"Exercise library",
"Nutrition library",
"Food database",
"Supplement education database",
"Platform policies",
"Coach-approved knowledge",
"Frequently asked questions"
],
"admin_controls": [
"AI enabled/disabled",
"Model provider",
"Model name",
"Temperature",
"Maximum tokens",
"System prompt",
"Safety rules",
"Usage limits",
"Daily request limits",
"User access levels",
"Prompt templates",
"Knowledge sources"
]
},

"coaching_system": {
"coach_profile": {
"fields": [
"name",
"profile_photo",
"bio",
"certifications",
"specialties",
"experience",
"languages",
"location",
"rating",
"review_count",
"availability",
"pricing",
"social_links"
]
},
"features": [
"Coach discovery",
"Search coaches",
"Filter by specialty",
"Filter by goal",
"View coach profile",
"View packages",
"Book consultation",
"Book training session",
"Messaging",
"Assign clients",
"Create plans",
"Review progress",
"Coach notes",
"Client check-ins",
"Coach reports"
]
},

"appointment_system": {
"features": [
"Coach availability",
"Calendar",
"Available slots",
"Booking",
"Rescheduling",
"Cancellation",
"Reminder notifications",
"Meeting link",
"Appointment notes",
"Appointment status",
"Payment status"
],
"statuses": [
"pending",
"confirmed",
"completed",
"cancelled",
"no_show"
]
},

"ecommerce": {
"store_categories": [
"Protein",
"Creatine",
"Vitamins",
"Pre-workout",
"Recovery",
"Sports nutrition",
"Gym clothing",
"T-shirts",
"Hoodies",
"Shorts",
"Shoes",
"Accessories",
"Bags",
"Shakers",
"Gym equipment"
],
"product_features": [
"Product creation",
"Multiple images",
"Product video",
"SKU",
"Barcode",
"Brand",
"Category",
"Subcategory",
"Variants",
"Sizes",
"Colors",
"Flavors",
"Ingredients",
"Nutrition facts",
"Price",
"Sale price",
"Inventory",
"Low-stock threshold",
"Weight",
"Shipping dimensions",
"Product description",
"SEO metadata",
"Reviews",
"Ratings",
"Related products",
"Recommended products",
"Featured product"
]
},

"shopping_cart": {
"features": [
"Add to cart",
"Update quantity",
"Remove item",
"Save for later",
"Apply coupon",
"Calculate shipping",
"Calculate tax abstraction",
"Order summary",
"Recommended products"
]
},

"checkout": {
"steps": [
"Cart",
"Customer information",
"Shipping address",
"Delivery method",
"Payment method",
"Coupon",
"Order review",
"Order confirmation"
],
"payment_architecture": {
"provider_adapter": true,
"methods": [
"Card",
"Cash on delivery",
"Configured local payment provider",
"Configured online payment provider"
],
"requirements": [
"Never store raw card data",
"Use provider tokens",
"Webhook verification",
"Idempotent payment processing",
"Payment transaction logging"
]
}
},

"order_system": {
"statuses": [
"pending",
"confirmed",
"processing",
"packed",
"shipped",
"delivered",
"cancelled",
"returned",
"refunded"
],
"features": [
"Order creation",
"Order tracking",
"Invoice",
"Shipping information",
"Order history",
"Admin status updates",
"Customer notifications",
"Refund workflow",
"Return workflow"
]
},

"inventory_system": {
"features": [
"Stock quantity",
"Reserved quantity",
"Available quantity",
"Low stock",
"Out of stock",
"Stock adjustment",
"Stock transfer",
"Inventory movement history",
"Supplier reference",
"Purchase cost",
"Selling price",
"Profit estimation",
"Inventory reports"
]
},

"subscription_system": {
"subscription_types": [
"Basic",
"Premium",
"Performance",
"Personal Coaching",
"Nutrition Coaching",
"AI Coach Premium"
],
"features": [
"Plan creation",
"Monthly pricing",
"Annual pricing",
"Trial period",
"Subscription status",
"Renewal date",
"Cancellation",
"Pause",
"Upgrade",
"Downgrade",
"Payment history",
"Invoices"
]
},

"progress_tracking": {
"metrics": [
"Weight",
"Body measurements",
"Body fat percentage",
"Chest",
"Waist",
"Hip",
"Arm",
"Thigh",
"Neck",
"BMI",
"Strength records",
"Workout completion",
"Calories",
"Protein",
"Carbohydrates",
"Fat",
"Water",
"Steps",
"Sleep duration"
],
"features": [
"Progress charts",
"Weekly reports",
"Monthly reports",
"Before/after photos",
"Goal progress",
"Personal records",
"Adherence score",
"Coach comments",
"AI progress summary"
]
},

"check_in_system": {
"frequency": [
"Daily",
"Weekly"
],
"questions": [
"How was your sleep?",
"How was your energy?",
"How was your workout?",
"How hungry were you?",
"How stressed were you?",
"How well did you follow the diet?",
"How motivated were you?",
"Any pain or discomfort?"
],
"actions": [
"Save check-in",
"Notify coach",
"Generate AI summary",
"Identify adherence patterns",
"Trigger review workflow"
]
},

"messaging_system": {
"features": [
"Client-to-coach messaging",
"Coach-to-client messaging",
"Support messaging",
"Conversation list",
"Unread count",
"Read status",
"Typing indicator",
"File attachments",
"Image attachments",
"Message search",
"Conversation archive",
"Block/report workflow where appropriate"
],
"technology": "WebSocket-ready architecture"
},

"notification_system": {
"types": [
"Workout reminder",
"Meal reminder",
"Water reminder",
"Appointment reminder",
"Coach message",
"New plan",
"Plan updated",
"Subscription renewal",
"Order update",
"Payment confirmation",
"Low inventory alert",
"Promotional notification",
"AI weekly report"
],
"channels": [
"In-app",
"Email",
"Push-ready"
]
},

"admin_dashboard": {
"route": "/admin",
"dashboard_widgets": [
"Total users",
"Active clients",
"Active coaches",
"New registrations",
"Active subscriptions",
"Monthly revenue",
"Orders",
"Pending orders",
"Low stock products",
"Appointments today",
"Workout completions",
"Diet adherence",
"Support tickets",
"AI usage",
"Recent activities"
],
"charts": [
"Revenue over time",
"Orders over time",
"New users over time",
"Subscriptions over time",
"Product sales",
"Top product categories",
"Coach activity",
"Client retention",
"Workout completion rate",
"Nutrition adherence"
]
},

"admin_users": {
"features": [
"Search users",
"Filter by role",
"Filter by status",
"View profile",
"Edit profile",
"Deactivate account",
"Reactivate account",
"Reset password workflow",
"Assign role",
"View activity",
"View subscriptions",
"View orders",
"View progress",
"Audit history"
]
},

"admin_product_management": {
"features": [
"Add product",
"Edit product",
"Delete product",
"Archive product",
"Upload images",
"Manage gallery",
"Manage categories",
"Manage brands",
"Manage variants",
"Manage stock",
"Manage prices",
"Manage discounts",
"Manage SEO",
"Manage featured status",
"Manage reviews"
],
"product_create_form": [
"Product name",
"SKU",
"Category",
"Brand",
"Description",
"Short description",
"Price",
"Sale price",
"Cost price",
"Stock",
"Low stock threshold",
"Images",
"Variants",
"Weight",
"Dimensions",
"Ingredients",
"Nutrition facts",
"Usage instructions",
"Warnings",
"SEO title",
"SEO description",
"Slug",
"Active status"
]
},

"cms": {
"pages": [
"Homepage",
"About",
"How it works",
"Programs",
"Nutrition",
"Coaches",
"Contact",
"FAQ",
"Terms",
"Privacy",
"Medical disclaimer"
],
"features": [
"Rich text editor",
"Image upload",
"SEO",
"Draft/publish",
"Scheduled publishing",
"Revision history"
]
},

"blog": {
"features": [
"Articles",
"Categories",
"Tags",
"Author",
"Featured image",
"SEO",
"Draft",
"Published",
"Scheduled publishing",
"Related articles",
"Search"
],
"article_categories": [
"Training",
"Nutrition",
"Bodybuilding",
"Recovery",
"Supplements",
"Sports performance",
"Lifestyle",
"Beginner guides"
]
},

"reviews": {
"features": [
"Product reviews",
"Coach reviews",
"Rating",
"Text review",
"Verified purchase indicator",
"Admin moderation",
"Report review"
]
},

"database_schema": {
"users": {
"fields": [
"id",
"email",
"phone",
"password_hash",
"first_name",
"last_name",
"date_of_birth",
"gender",
"profile_photo",
"role_id",
"is_active",
"is_verified",
"last_login",
"created_at",
"updated_at"
]
},

```
"roles": [
  "id",
  "name",
  "description"
],

"permissions": [
  "id",
  "code",
  "name",
  "module"
],

"user_permissions": [
  "id",
  "user_id",
  "permission_id"
],

"client_profiles": [
  "id",
  "user_id",
  "height",
  "weight",
  "activity_level",
  "fitness_level",
  "training_experience",
  "goal",
  "target_weight",
  "target_date",
  "diet_preference",
  "allergies",
  "food_preferences",
  "food_exclusions",
  "injuries",
  "health_notes",
  "sleep_hours",
  "water_target",
  "steps_target"
],

"coaches": [
  "id",
  "user_id",
  "bio",
  "experience_years",
  "specialties",
  "certifications",
  "languages",
  "rating",
  "review_count",
  "hourly_rate",
  "is_verified",
  "is_active"
],

"coach_clients": [
  "id",
  "coach_id",
  "client_id",
  "start_date",
  "end_date",
  "status"
],

"goals": [
  "id",
  "client_id",
  "goal_type",
  "target_value",
  "current_value",
  "target_date",
  "status",
  "created_at"
],

"exercises": [
  "id",
  "name",
  "slug",
  "description",
  "instructions",
  "primary_muscle",
  "secondary_muscles",
  "equipment",
  "difficulty",
  "video_url",
  "image_url",
  "safety_notes",
  "status"
],

"workout_plans": [
  "id",
  "client_id",
  "coach_id",
  "name",
  "description",
  "goal",
  "duration_weeks",
  "days_per_week",
  "status",
  "start_date",
  "end_date",
  "created_at"
],

"workout_days": [
  "id",
  "workout_plan_id",
  "day_number",
  "name",
  "muscle_groups",
  "notes"
],

"workout_exercises": [
  "id",
  "workout_day_id",
  "exercise_id",
  "order_index",
  "sets",
  "reps",
  "rest_seconds",
  "tempo",
  "rpe",
  "notes"
],

"workout_logs": [
  "id",
  "client_id",
  "workout_exercise_id",
  "date",
  "sets_completed",
  "reps_completed",
  "weight_used",
  "rpe",
  "notes"
],

"foods": [
  "id",
  "name",
  "category",
  "serving_size",
  "calories",
  "protein",
  "carbs",
  "fat",
  "fiber",
  "micronutrients",
  "allergens"
],

"recipes": [
  "id",
  "name",
  "description",
  "instructions",
  "servings",
  "calories",
  "protein",
  "carbs",
  "fat",
  "fiber",
  "image"
],

"diet_plans": [
  "id",
  "client_id",
  "nutritionist_id",
  "coach_id",
  "name",
  "goal",
  "daily_calories",
  "protein_target",
  "carbs_target",
  "fat_target",
  "duration_weeks",
  "status",
  "start_date",
  "end_date"
],

"meal_plans": [
  "id",
  "diet_plan_id",
  "day_number",
  "meal_type",
  "recipe_id",
  "meal_name",
  "portion",
  "calories",
  "protein",
  "carbs",
  "fat"
],

"nutrition_logs": [
  "id",
  "client_id",
  "date",
  "meal_plan_id",
  "meal_completed",
  "calories_consumed",
  "protein_consumed",
  "carbs_consumed",
  "fat_consumed"
],

"body_measurements": [
  "id",
  "client_id",
  "date",
  "weight",
  "body_fat",
  "chest",
  "waist",
  "hip",
  "arm",
  "thigh",
  "neck"
],

"progress_photos": [
  "id",
  "client_id",
  "photo_url",
  "photo_type",
  "date",
  "is_private"
],

"supplements": [
  "id",
  "name",
  "category",
  "description",
  "benefits",
  "usage_information",
  "warnings"
],

"supplement_recommendations": [
  "id",
  "client_id",
  "supplement_id",
  "recommended_by",
  "reason",
  "status",
  "notes"
],

"products": [
  "id",
  "name",
  "slug",
  "sku",
  "brand_id",
  "category_id",
  "description",
  "short_description",
  "price",
  "sale_price",
  "cost_price",
  "stock_quantity",
  "reserved_quantity",
  "low_stock_threshold",
  "weight",
  "status",
  "featured",
  "seo_title",
  "seo_description",
  "created_at",
  "updated_at"
],

"product_variants": [
  "id",
  "product_id",
  "sku",
  "size",
  "color",
  "flavor",
  "price_modifier",
  "stock_quantity"
],

"product_images": [
  "id",
  "product_id",
  "image_url",
  "sort_order",
  "is_primary"
],

"categories": [
  "id",
  "name",
  "slug",
  "description",
  "parent_id",
  "image",
  "status"
],

"carts": [
  "id",
  "user_id",
  "session_id",
  "created_at",
  "updated_at"
],

"cart_items": [
  "id",
  "cart_id",
  "product_id",
  "variant_id",
  "quantity",
  "unit_price"
],

"orders": [
  "id",
  "user_id",
  "order_number",
  "subtotal",
  "discount",
  "shipping_fee",
  "total",
  "currency",
  "payment_status",
  "order_status",
  "shipping_address_id",
  "created_at"
],

"order_items": [
  "id",
  "order_id",
  "product_id",
  "variant_id",
  "quantity",
  "unit_price",
  "total_price"
],

"payments": [
  "id",
  "order_id",
  "user_id",
  "provider",
  "transaction_id",
  "amount",
  "currency",
  "status",
  "paid_at"
],

"subscriptions": [
  "id",
  "user_id",
  "plan_id",
  "provider_subscription_id",
  "status",
  "start_date",
  "renewal_date",
  "cancelled_at"
],

"subscription_plans": [
  "id",
  "name",
  "description",
  "monthly_price",
  "annual_price",
  "features",
  "is_active"
],

"appointments": [
  "id",
  "client_id",
  "coach_id",
  "start_time",
  "end_time",
  "status",
  "appointment_type",
  "meeting_url",
  "notes",
  "payment_status"
],

"messages": [
  "id",
  "conversation_id",
  "sender_id",
  "message",
  "attachment_url",
  "is_read",
  "created_at"
],

"notifications": [
  "id",
  "user_id",
  "type",
  "title",
  "message",
  "is_read",
  "created_at"
],

"reviews": [
  "id",
  "user_id",
  "product_id",
  "coach_id",
  "rating",
  "comment",
  "status",
  "created_at"
],

"coupons": [
  "id",
  "code",
  "discount_type",
  "discount_value",
  "minimum_order",
  "usage_limit",
  "used_count",
  "start_date",
  "end_date",
  "is_active"
],

"support_tickets": [
  "id",
  "user_id",
  "subject",
  "description",
  "priority",
  "status",
  "assigned_agent_id",
  "created_at"
],

"audit_logs": [
  "id",
  "user_id",
  "action",
  "entity_type",
  "entity_id",
  "old_value",
  "new_value",
  "ip_address",
  "user_agent",
  "created_at"
],

"ai_conversations": [
  "id",
  "user_id",
  "title",
  "created_at",
  "updated_at"
],

"ai_messages": [
  "id",
  "conversation_id",
  "role",
  "content",
  "metadata",
  "created_at"
]
```

},

"api_design": {
"base_url": "/api/v1",
"modules": [
"/auth",
"/users",
"/clients",
"/coaches",
"/goals",
"/exercises",
"/workouts",
"/workout-logs",
"/foods",
"/recipes",
"/diets",
"/nutrition",
"/supplements",
"/progress",
"/appointments",
"/messages",
"/notifications",
"/products",
"/categories",
"/cart",
"/checkout",
"/orders",
"/payments",
"/subscriptions",
"/reviews",
"/coupons",
"/support",
"/blog",
"/cms",
"/ai",
"/analytics",
"/admin"
],
"requirements": [
"RESTful endpoints",
"Pagination",
"Filtering",
"Sorting",
"Search",
"Permission checks",
"Validation",
"Consistent error format",
"Rate limiting",
"API versioning",
"OpenAPI documentation"
]
},

"authentication_security": {
"requirements": [
"Secure password hashing",
"JWT access token",
"JWT refresh token",
"Refresh token rotation",
"Email verification",
"Password reset",
"Optional two-factor authentication",
"Login throttling",
"Rate limiting",
"Session management",
"Role-based access",
"Object-level authorization",
"Audit logs",
"Secure HTTP headers",
"CORS configuration",
"CSRF protection where applicable",
"Input validation",
"File upload validation",
"SQL injection protection",
"XSS protection",
"Secure cookies where applicable"
],
"privacy": [
"Explicit consent for sensitive wellness information",
"Private progress photos",
"User data export",
"User account deletion",
"Access controls for coaches",
"Audit access to sensitive client information"
]
},

"file_uploads": {
"supported": [
"Profile photos",
"Progress photos",
"Exercise videos",
"Exercise images",
"Product images",
"Coach certificates",
"Blog images",
"Support attachments"
],
"requirements": [
"File type validation",
"File size validation",
"Secure filenames",
"Image optimization",
"Thumbnail generation",
"Virus scanning integration point",
"Private/public storage separation"
]
},

"search": {
"global_search": [
"Products",
"Exercises",
"Foods",
"Coaches",
"Programs",
"Blog articles"
],
"filters": [
"Goal",
"Difficulty",
"Muscle group",
"Equipment",
"Category",
"Price",
"Rating",
"Brand",
"Availability"
]
},

"analytics": {
"business": [
"Revenue",
"Orders",
"Average order value",
"Subscriptions",
"Churn",
"New customers",
"Repeat customers",
"Top products",
"Top categories"
],
"fitness": [
"Workout adherence",
"Diet adherence",
"Goal completion",
"Average progress",
"Client engagement",
"Check-in completion"
],
"coach": [
"Active clients",
"Completed sessions",
"Appointments",
"Client retention",
"Coach package sales"
],
"ai": [
"AI requests",
"AI sessions",
"Usage by plan",
"Average response time",
"Safety flags",
"Token/cost tracking abstraction"
]
},

"reports": {
"admin": [
"Daily sales report",
"Monthly sales report",
"Inventory report",
"Low stock report",
"User growth report",
"Subscription report",
"Coach performance report",
"Appointment report",
"Client adherence report",
"Product sales report",
"Revenue report",
"Refund report",
"AI usage report",
"Support report"
],
"export_formats": [
"CSV",
"Excel",
"PDF"
]
},

"automations": {
"scheduled_jobs": [
"Workout reminders",
"Meal reminders",
"Water reminders",
"Appointment reminders",
"Subscription renewal notifications",
"Low stock alerts",
"Weekly client progress summaries",
"Inactive user reminders",
"Coach weekly client summaries",
"Cleanup expired sessions"
]
},

"content_features": {
"educational_pages": [
"Muscle building guide",
"Fat loss guide",
"Beginner training",
"Strength training",
"Recovery",
"Sleep",
"Nutrition basics",
"Supplement education",
"Workout technique"
]
},

"client_experience": {
"dashboard_flow": [
"Login",
"View today's overview",
"View workout",
"Complete workout",
"Log sets and weights",
"View today's meals",
"Log meals",
"Track water",
"Track steps",
"Complete check-in",
"Chat with AI",
"Message coach",
"View progress"
]
},

"admin_workflow": {
"product_workflow": [
"Admin login",
"Open /admin",
"Products",
"Create product",
"Upload images",
"Set category",
"Set price",
"Set stock",
"Set variants",
"Publish",
"Monitor sales"
],
"client_workflow": [
"Register",
"Complete assessment",
"Create goal",
"Generate plan",
"Start workout",
"Track nutrition",
"Track progress",
"Use AI",
"Book coach",
"Purchase products"
],
"coach_workflow": [
"Login",
"View dashboard",
"View clients",
"Open client",
"Review assessment",
"Create workout",
"Create diet",
"Assign plan",
"Monitor progress",
"Send feedback",
"Book appointment",
"Generate report"
]
},

"admin_settings": {
"sections": [
"General settings",
"Business information",
"Currency",
"Timezone",
"Languages",
"Email settings",
"Payment settings",
"Shipping settings",
"AI settings",
"Notification settings",
"Security",
"Storage",
"SEO",
"Social media",
"Analytics",
"Feature flags"
]
},

"seo": {
"features": [
"Dynamic metadata",
"Open Graph",
"Twitter cards",
"Canonical URLs",
"XML sitemap",
"Robots.txt",
"Structured data",
"Product schema",
"Article schema",
"Organization schema",
"Breadcrumb schema"
]
},

"performance": {
"requirements": [
"Lazy loading",
"Image optimization",
"Code splitting",
"API caching",
"Database indexing",
"Pagination",
"Background processing",
"CDN-ready assets",
"Optimized SQL queries",
"Avoid N+1 queries",
"Compression",
"Production logging"
]
},

"observability": {
"features": [
"Application logs",
"Error logging",
"API request logging",
"Authentication events",
"Payment events",
"Background job monitoring",
"Database health checks",
"Service health endpoint"
]
},

"testing": {
"backend": [
"Unit tests",
"Model tests",
"Serializer tests",
"API tests",
"Permission tests",
"Authentication tests"
],
"frontend": [
"Component tests",
"Form tests",
"Critical page tests",
"State tests"
],
"e2e": [
"Registration",
"Login",
"Client onboarding",
"Workout completion",
"Diet tracking",
"Coach booking",
"Add to cart",
"Checkout",
"Admin product creation",
"Order management"
],
"security": [
"Unauthorized API access",
"Privilege escalation",
"Invalid uploads",
"Rate-limit tests",
"Authentication abuse tests"
]
},

"seed_data": {
"create": [
"Admin account",
"Coach accounts",
"Nutritionist account",
"Demo clients",
"Exercise library",
"Food library",
"Meal examples",
"Workout examples",
"Product categories",
"Supplement products",
"Clothing products",
"Demo orders",
"Subscription plans",
"Blog articles"
],
"admin_credentials": {
"email": "[admin@example.com](mailto:admin@example.com)",
"password": "CHANGE_ME_BEFORE_PRODUCTION"
}
},

"folder_structure": {
"frontend": [
"src/app",
"src/components",
"src/features",
"src/hooks",
"src/lib",
"src/services",
"src/store",
"src/types",
"src/utils",
"src/styles"
],
"backend": [
"config",
"apps/accounts",
"apps/clients",
"apps/coaches",
"apps/workouts",
"apps/nutrition",
"apps/supplements",
"apps/progress",
"apps/appointments",
"apps/messaging",
"apps/notifications",
"apps/shop",
"apps/orders",
"apps/payments",
"apps/subscriptions",
"apps/blog",
"apps/cms",
"apps/support",
"apps/ai",
"apps/analytics",
"apps/audit",
"common"
]
},

"development_environment": {
"required": [
"Node.js",
"Python",
"PostgreSQL",
"Redis",
"Git",
"Docker"
],
"configuration": {
"database_url": "ENV",
"redis_url": "ENV",
"jwt_secret": "ENV",
"email_credentials": "ENV",
"storage_credentials": "ENV",
"payment_credentials": "ENV",
"ai_provider_credentials": "ENV"
}
},

"docker_services": [
"frontend",
"backend",
"postgres",
"redis",
"celery_worker",
"celery_beat",
"nginx"
],

"production_requirements": [
"HTTPS",
"Secure environment variables",
"Database backups",
"Restore strategy",
"Migration strategy",
"Monitoring",
"Error tracking",
"Logging",
"Rate limiting",
"Access control",
"Audit logging",
"Image optimization",
"Automated deployment",
"Health checks"
],

"business_features_to_add": [
"Referral system",
"Loyalty points",
"Gift cards",
"Promo codes",
"Affiliate system",
"Coach marketplace",
"Challenge system",
"Fitness competitions",
"Badges",
"Achievements",
"Streaks",
"Leaderboards",
"Community discussions",
"Live classes architecture",
"Digital fitness courses",
"Meal shopping lists",
"Coach earnings dashboard",
"Commission management",
"Affiliate earnings",
"Multi-language support",
"Multi-currency-ready architecture"
],

"future_mobile_api": {
"goal": "Build the backend so the same API can later power Android and iOS applications.",
"requirements": [
"Mobile-friendly authentication",
"Push notification tokens",
"API versioning",
"Image upload API",
"Workout offline synchronization architecture",
"Nutrition offline synchronization architecture"
]
},

"important_business_rules": [
"A client can have multiple historical goals but only one active primary goal.",
"A client may have one or more coaches depending on subscription/business configuration.",
"Only authorized coaches can access assigned client data.",
"Sensitive wellness information must not be visible to unrelated staff.",
"Admins can configure role permissions.",
"Every important administrative mutation must create an audit log.",
"Inventory must never become negative unless explicitly enabled by configuration.",
"Payment webhooks must be idempotent.",
"Order totals must be calculated server-side.",
"Product prices must be captured in order items so historical orders remain correct.",
"Deleted products should generally be archived rather than physically deleted when referenced by historical orders.",
"AI-generated plans should support draft/review/approved status.",
"Coach-approved instructions should take precedence over generic AI suggestions where configured.",
"Progress photos must be private by default.",
"Medical or injury-sensitive information must trigger safety handling.",
"The AI is a wellness assistant and must not present itself as a medical professional."
],

"ux_details": {
"client": [
"Simple onboarding",
"Progress dashboard",
"Today's workout card",
"Today's meals",
"One-click completion",
"Large mobile-friendly workout controls",
"Progress graphs",
"Persistent AI button",
"Persistent coach messaging",
"Fast checkout"
],
"coach": [
"Client list",
"At-a-glance adherence",
"Filter clients by status",
"Quick plan editor",
"Calendar",
"Messages",
"Progress comparison",
"Bulk actions where safe"
],
"admin": [
"Sidebar navigation",
"Global search",
"Data tables",
"Filters",
"Bulk actions",
"Export",
"Charts",
"Activity log",
"Notifications",
"Responsive dashboard"
]
},

"error_handling": {
"api_format": {
"success": false,
"message": "Human readable message",
"errors": {},
"code": "ERROR_CODE"
},
"frontend": [
"Do not expose stack traces",
"Show useful validation errors",
"Handle network failures",
"Handle expired sessions",
"Handle permission errors",
"Handle payment failures",
"Handle upload failures"
]
},

"implementation_rules_for_ai_coding_agent": {
"general": [
"Do not create fake functionality.",
"Do not use hardcoded data in production pages.",
"Build reusable components.",
"Use real database models and API integration.",
"Implement server-side validation.",
"Implement authorization on every protected endpoint.",
"Do not trust frontend role checks as security.",
"Use TypeScript strictly.",
"Use Python type hints where practical.",
"Keep business logic out of UI components.",
"Use service layers where appropriate.",
"Avoid duplicate code.",
"Create reusable form components.",
"Create reusable table components.",
"Create reusable modal and confirmation components.",
"Create reusable chart components.",
"Add loading, empty and error states.",
"Write meaningful error messages.",
"Document important architectural decisions."
],
"database": [
"Use migrations.",
"Create foreign keys.",
"Add indexes for common queries.",
"Use database constraints.",
"Use transactions for financial operations.",
"Prevent duplicate payment processing.",
"Prevent duplicate orders.",
"Prevent unauthorized client access."
],
"api": [
"Use consistent response structures.",
"Use pagination.",
"Validate query parameters.",
"Validate request bodies.",
"Return correct HTTP status codes.",
"Document endpoints.",
"Implement rate limiting on authentication and AI endpoints."
],
"admin": [
"Protect /admin with role-based authorization.",
"Do not rely only on hiding menu items.",
"Every mutation requires backend permission validation.",
"Log security-sensitive operations."
]
},

"development_phases": [
{
"phase": 1,
"name": "Foundation",
"deliver": [
"Repository",
"Frontend setup",
"Django backend",
"PostgreSQL",
"Redis",
"Docker",
"Environment configuration",
"Authentication",
"RBAC"
]
},
{
"phase": 2,
"name": "Client Platform",
"deliver": [
"Client registration",
"Onboarding",
"Dashboard",
"Goals",
"Profile"
]
},
{
"phase": 3,
"name": "Workout",
"deliver": [
"Exercise library",
"Workout builder",
"Workout plans",
"Workout tracking",
"Progress"
]
},
{
"phase": 4,
"name": "Nutrition",
"deliver": [
"Food database",
"Recipes",
"Diet planner",
"Meal tracking",
"Nutrition dashboard"
]
},
{
"phase": 5,
"name": "Coaching",
"deliver": [
"Coach profiles",
"Client assignment",
"Appointments",
"Messaging",
"Coach dashboard"
]
},
{
"phase": 6,
"name": "E-Commerce",
"deliver": [
"Products",
"Categories",
"Variants",
"Cart",
"Checkout",
"Orders",
"Inventory"
]
},
{
"phase": 7,
"name": "Subscriptions",
"deliver": [
"Plans",
"Subscription lifecycle",
"Payments",
"Invoices"
]
},
{
"phase": 8,
"name": "AI",
"deliver": [
"AI assistant",
"Personalized workout generation",
"Personalized diet generation",
"Progress analysis",
"Safety rules",
"AI admin controls"
]
},
{
"phase": 9,
"name": "Admin",
"deliver": [
"Dashboard",
"Users",
"Products",
"Orders",
"Subscriptions",
"Content",
"Reports",
"Audit logs",
"Settings"
]
},
{
"phase": 10,
"name": "Production",
"deliver": [
"Testing",
"Security review",
"Performance optimization",
"CI/CD",
"Monitoring",
"Backups",
"Deployment documentation"
]
}
],

"definition_of_done": [
"Frontend builds successfully.",
"Backend migrations run successfully.",
"Authentication works.",
"Role-based permissions work.",
"Client onboarding works.",
"Workout plans can be created and assigned.",
"Clients can complete workouts.",
"Diet plans can be created and assigned.",
"Clients can track meals.",
"Progress measurements work.",
"Coach management works.",
"Appointments work.",
"Messaging works.",
"Products can be created from /admin.",
"Product images can be uploaded.",
"Cart works.",
"Checkout works.",
"Orders are created correctly.",
"Inventory is updated correctly.",
"Subscription architecture works.",
"AI assistant is integrated through a provider abstraction.",
"AI safety controls are implemented.",
"Admin dashboard works.",
"Reports work.",
"Audit logs work.",
"Responsive mobile UI works.",
"Automated tests cover critical workflows.",
"Docker deployment works.",
"Production environment variables are documented.",
"README contains setup, development, testing, deployment and troubleshooting instructions."
],

"final_instruction_to_coding_agent": "Generate the complete project, not a prototype. Start with the architecture and database migrations, then implement backend APIs, authentication, authorization, frontend pages, reusable components, admin dashboard, client dashboard, coach dashboard, e-commerce, subscriptions, progress tracking, AI assistant, notifications, reports, tests, Docker configuration and documentation. Keep the implementation modular and production-ready. Every protected action must be authorized server-side. Do not use placeholder buttons that do nothing. Any feature shown in the UI must be connected to a real API or clearly marked as intentionally disabled. Build mobile-first responsive layouts and make the system ready for future Android/iOS applications through the same versioned API."
}
create it with mysql port :3305 password:1234 with nest.js 