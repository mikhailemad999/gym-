/* ============================================
   AthleteCare Pro — Core TypeScript Types
   ============================================ */

// ---- Enums ----

export enum UserRole {
  GUEST = 'guest',
  CLIENT = 'client',
  COACH = 'coach',
  NUTRITIONIST = 'nutritionist',
  CONTENT_MANAGER = 'content_manager',
  STORE_MANAGER = 'store_manager',
  SUPPORT_AGENT = 'support_agent',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export enum FitnessGoal {
  WEIGHT_LOSS = 'weight_loss',
  FAT_LOSS = 'fat_loss',
  MUSCLE_GAIN = 'muscle_gain',
  BODYBUILDING = 'bodybuilding',
  STRENGTH = 'strength',
  ENDURANCE = 'endurance',
  ATHLETIC_PERFORMANCE = 'athletic_performance',
  GENERAL_FITNESS = 'general_fitness',
  BODY_RECOMPOSITION = 'body_recomposition',
  MAINTENANCE = 'maintenance',
}

export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHTLY_ACTIVE = 'lightly_active',
  MODERATELY_ACTIVE = 'moderately_active',
  VERY_ACTIVE = 'very_active',
  EXTREMELY_ACTIVE = 'extremely_active',
}

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export enum MuscleGroup {
  CHEST = 'chest',
  BACK = 'back',
  SHOULDERS = 'shoulders',
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
  FOREARMS = 'forearms',
  ABS = 'abs',
  QUADS = 'quads',
  HAMSTRINGS = 'hamstrings',
  GLUTES = 'glutes',
  CALVES = 'calves',
  TRAPS = 'traps',
  FULL_BODY = 'full_body',
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  PACKED = 'packed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
  REFUNDED = 'refunded',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  TRIAL = 'trial',
}

export enum MealType {
  BREAKFAST = 'breakfast',
  MORNING_SNACK = 'morning_snack',
  LUNCH = 'lunch',
  AFTERNOON_SNACK = 'afternoon_snack',
  PRE_WORKOUT = 'pre_workout',
  POST_WORKOUT = 'post_workout',
  DINNER = 'dinner',
  EVENING_SNACK = 'evening_snack',
}

// ---- Base Types ----

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// ---- API Response ----

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ---- Auth ----

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  dateOfBirth?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
}

// ---- User ----

export interface User extends BaseEntity {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: Gender;
  profilePhoto?: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  lastLogin?: string;
}

// ---- Client Profile ----

export interface ClientProfile extends BaseEntity {
  userId: string;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevel;
  fitnessLevel?: Difficulty;
  trainingExperience?: string;
  goal?: FitnessGoal;
  targetWeight?: number;
  targetDate?: string;
  dietPreference?: string;
  allergies?: string[];
  foodPreferences?: string[];
  foodExclusions?: string[];
  injuries?: string[];
  healthNotes?: string;
  sleepHours?: number;
  waterTarget?: number;
  stepsTarget?: number;
}

// ---- Coach ----

export interface Coach extends BaseEntity {
  userId: string;
  user?: User;
  bio?: string;
  experienceYears?: number;
  specialties?: string[];
  certifications?: string[];
  languages?: string[];
  rating?: number;
  reviewCount?: number;
  hourlyRate?: number;
  isVerified: boolean;
  isActive: boolean;
}

// ---- Exercise ----

export interface Exercise extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  instructions?: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles?: MuscleGroup[];
  equipment?: string;
  difficulty: Difficulty;
  exerciseType?: string;
  videoUrl?: string;
  imageUrl?: string;
  safetyNotes?: string;
  contraindications?: string[];
  status: 'active' | 'draft' | 'archived';
}

// ---- Workout ----

export interface WorkoutPlan extends BaseEntity {
  clientId: string;
  coachId?: string;
  name: string;
  description?: string;
  goal?: FitnessGoal;
  durationWeeks: number;
  daysPerWeek: number;
  status: 'draft' | 'active' | 'completed' | 'archived';
  startDate?: string;
  endDate?: string;
  days?: WorkoutDay[];
}

export interface WorkoutDay extends BaseEntity {
  workoutPlanId: string;
  dayNumber: number;
  name: string;
  muscleGroups?: string[];
  notes?: string;
  exercises?: WorkoutExercise[];
}

export interface WorkoutExercise extends BaseEntity {
  workoutDayId: string;
  exerciseId: string;
  exercise?: Exercise;
  orderIndex: number;
  sets: number;
  reps: string;
  restSeconds?: number;
  tempo?: string;
  rpe?: number;
  notes?: string;
}

export interface WorkoutLog extends BaseEntity {
  clientId: string;
  workoutExerciseId: string;
  date: string;
  setsCompleted: number;
  repsCompleted: string;
  weightUsed?: number;
  rpe?: number;
  notes?: string;
}

// ---- Nutrition ----

export interface Food extends BaseEntity {
  name: string;
  category: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  allergens?: string[];
}

export interface DietPlan extends BaseEntity {
  clientId: string;
  coachId?: string;
  nutritionistId?: string;
  name: string;
  goal?: FitnessGoal;
  dailyCalories: number;
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
  durationWeeks: number;
  status: 'draft' | 'active' | 'completed' | 'archived';
  startDate?: string;
  endDate?: string;
}

export interface MealPlan extends BaseEntity {
  dietPlanId: string;
  dayNumber: number;
  mealType: MealType;
  mealName: string;
  portion?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// ---- Product ----

export interface Product extends BaseEntity {
  name: string;
  slug: string;
  sku?: string;
  brandId?: string;
  brand?: Brand;
  categoryId?: string;
  category?: Category;
  description?: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  costPrice?: number;
  stockQuantity: number;
  reservedQuantity: number;
  lowStockThreshold: number;
  weight?: number;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  rating?: number;
  reviewCount?: number;
}

export interface ProductImage extends BaseEntity {
  productId: string;
  imageUrl: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductVariant extends BaseEntity {
  productId: string;
  sku?: string;
  size?: string;
  color?: string;
  flavor?: string;
  priceModifier: number;
  stockQuantity: number;
}

export interface Brand extends BaseEntity {
  name: string;
  slug: string;
  logo?: string;
}

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  image?: string;
  status: 'active' | 'inactive';
}

// ---- Cart & Orders ----

export interface CartItem {
  productId: string;
  product?: Product;
  variantId?: string;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export interface Order extends BaseEntity {
  userId: string;
  orderNumber: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  currency: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  items?: OrderItem[];
}

export interface OrderItem extends BaseEntity {
  orderId: string;
  productId: string;
  product?: Product;
  variantId?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// ---- Subscription ----

export interface SubscriptionPlan extends BaseEntity {
  name: string;
  description?: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isActive: boolean;
}

export interface Subscription extends BaseEntity {
  userId: string;
  planId: string;
  plan?: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  renewalDate?: string;
  cancelledAt?: string;
}

// ---- Messaging ----

export interface Conversation extends BaseEntity {
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface Message extends BaseEntity {
  conversationId: string;
  senderId: string;
  sender?: User;
  message: string;
  attachmentUrl?: string;
  isRead: boolean;
}

// ---- Notification ----

export interface Notification extends BaseEntity {
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
}

// ---- Review ----

export interface Review extends BaseEntity {
  userId: string;
  user?: User;
  productId?: string;
  coachId?: string;
  rating: number;
  comment?: string;
  status: 'pending' | 'approved' | 'rejected';
}

// ---- Progress ----

export interface BodyMeasurement extends BaseEntity {
  clientId: string;
  date: string;
  weight?: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  hip?: number;
  arm?: number;
  thigh?: number;
  neck?: number;
}

export interface ProgressPhoto extends BaseEntity {
  clientId: string;
  photoUrl: string;
  photoType: 'front' | 'side' | 'back';
  date: string;
  isPrivate: boolean;
}

// ---- AI ----

export interface AIConversation extends BaseEntity {
  userId: string;
  title?: string;
  messages?: AIMessage[];
}

export interface AIMessage extends BaseEntity {
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: Record<string, unknown>;
}

// ---- Appointment ----

export interface Appointment extends BaseEntity {
  clientId: string;
  coachId: string;
  client?: User;
  coach?: Coach;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  appointmentType?: string;
  meetingUrl?: string;
  notes?: string;
  paymentStatus?: PaymentStatus;
}
