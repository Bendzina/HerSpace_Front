interface TranslationKeys {
  // Common
  appPreferences: string;
  darkMode: string;
  fontSize: string;
  language: string;
  english: string;
  georgian: string;
  error: string;
  cancel: string;
  reset: string;
  
  // Navigation
  motherhood: string;
  community: string;
  anonymousUser: string;
  home: string;
  back: string;
  comments: string;
  addCommentPh: string;
  anonymous: string;
  send: string;
  noComments: string;
  failedLoad: string;
  failedSend: string;
  resources: string;
  routines: string;
  supportGroups: string;
  journal: string;
  rituals: string;
  profile: string;
  help: string;
  preferences: string;
  mindful: string;
  settings: string;
  insights: string;
  login: string;
  notifications: string;
  // Common UI actions & placeholders
  searchPlaceholder: string;
  new: string;
  save: string;
  delete: string;
  openLink: string;
  // Filters
  all: string;
  online: string;
  local: string;
  // Community
  support: string;
  celebration: string;
  advice: string;
  story: string;
  question: string;
  gratitude: string;
  // Moods (shared labels)
  moodHappy: string;
  moodCalm: string;
  moodSad: string;
  moodAnxious: string;

  // Community screen texts
  communityHeroTitle: string;
  communityHeroSubtitle: string;
  communitySearchPlaceholder: string;
  communityLoadingText: string;
  communityCategories: string;
  communityNoPosts: string;
  communityNoPostsDescription: string;

  // Notifications
  notificationSettings: {
    resetTitle: string;
    resetMessage: string;
    resetError: string;
    updateError: string;
    mainNotifications: string;
    goalsAchievements: string;
    optionalNotifications: string;
    dailyReminders: string;
    dailyRemindersDesc: string;
    weeklyGoals: string;
    weeklyGoalsDesc: string;
    achievementAlerts: string;
    achievementAlertsDesc: string;
    journalReminders: string;
    journalRemindersDesc: string;
    meditationAlerts: string;
    meditationAlertsDesc: string;
    motivationalQuotes: string;
    motivationalQuotesDesc: string;
    systemUpdates: string;
    systemUpdatesDesc: string;
    marketingEmails: string;
    marketingEmailsDesc: string;
  };
}

export const translations: { en: TranslationKeys; ka: TranslationKeys } = {
  en: {
    appPreferences: 'App Preferences',
    darkMode: 'Dark Mode',
    fontSize: 'Font Size',
    language: 'Language',
    english: 'English',
    georgian: 'ქართული',
    error: 'Error',
    cancel: 'Cancel',
    reset: 'Reset',
    // Common navigation / sections
    motherhood: 'Motherhood',
    community: 'Community',
    anonymousUser: 'Anonymous User',
    home: 'Home',
    back: 'Back',
    comments: 'Comments',
    addCommentPh: 'Write a comment...',
    anonymous: 'Anonymous',
    send: 'Send',
    noComments: 'No comments yet',
    failedLoad: 'Failed to load',
    failedSend: 'Failed to send',
    resources: 'Resources',
    routines: 'Routines',
    supportGroups: 'Support Groups',
    journal: 'Journal',
    rituals: 'Rituals',
    profile: 'Profile',
    help: 'Help',
    preferences: 'Preferences',
    mindful: 'Mindful',
    settings: 'Settings',
    insights: 'Insights',
    login: 'Login',
    notifications: 'Notifications',
    // Common UI actions & placeholders
    searchPlaceholder: 'Search …',
    new: 'New',
    save: 'Save',
    delete: 'Delete',
    openLink: 'Open Link',
    // Filters
    all: 'All',
    online: 'Online',
    local: 'Local',
    // Community
    support: 'Support',
    celebration: 'Celebration',
    advice: 'Advice',
    story: 'Story',
    question: 'Question',
    gratitude: 'Gratitude',
    // Community screen texts
    communityHeroTitle: '💕 Our Safe Space',
    communityHeroSubtitle: 'Share, support, and grow together',
    communitySearchPlaceholder: 'Search our community stories...',
    communityLoadingText: 'Loading our community...',
    communityCategories: 'Categories',
    communityNoPosts: 'No posts yet',
    communityNoPostsDescription: 'Be the first to share your story',
    // Moods (shared labels)
    moodHappy: 'Happy',
    moodCalm: 'Calm',
    moodSad: 'Sad',
    moodAnxious: 'Anxious',
    notificationSettings: {
      resetTitle: 'Reset Notification Settings',
      resetMessage: 'Are you sure you want to reset all notification settings to default?',
      resetError: 'Failed to reset notification settings',
      updateError: 'Failed to update notification settings',
      mainNotifications: 'Main Notifications',
      goalsAchievements: 'Goals & Achievements',
      optionalNotifications: 'Optional Notifications',
      dailyReminders: 'Daily Reminders',
      dailyRemindersDesc: 'Get reminders to check in with your mood and complete daily tasks',
      weeklyGoals: 'Weekly Goals',
      weeklyGoalsDesc: 'Get updates on your weekly progress and goals',
      achievementAlerts: 'Achievement Alerts',
      achievementAlertsDesc: 'Get notified when you complete achievements',
      journalReminders: 'Journal Reminders',
      journalRemindersDesc: 'Reminders to write in your journal',
      meditationAlerts: 'Meditation Reminders',
      meditationAlertsDesc: 'Reminders for your meditation practice',
      motivationalQuotes: 'Motivational Quotes',
      motivationalQuotesDesc: 'Receive daily motivational quotes',
      systemUpdates: 'System Updates',
      systemUpdatesDesc: 'Important updates about the app',
      marketingEmails: 'Marketing Emails',
      marketingEmailsDesc: 'Receive promotional emails and offers'
    },
  },
  ka: {
    appPreferences: 'აპლიკაციის პარამეტრები',
    darkMode: 'მუქი თემა',
    fontSize: 'ფონტის ზომა',
    language: 'ენა',
    english: 'English',
    georgian: 'ქართული',
    error: 'შეცდომა',
    cancel: 'გაუქმება',
    reset: 'განულება',
    motherhood: 'დედობა',
    community: 'თემა',
    anonymousUser: 'ანონიმური მომხმარებელი',
    home: 'მთავარი',
    back: 'უკან',
    comments: 'კომენტარები',
    addCommentPh: 'დაწერეთ კომენტარი...',
    anonymous: 'ანონიმური',
    send: 'გაგზავნა',
    noComments: 'კომენტარები არ არის',
    failedLoad: 'დაფიქსირდა შეცდომა',
    failedSend: 'ვერ გაიგზავნა',
    resources: 'რესურსები',
    routines: 'ყოველდღიურობა',
    supportGroups: 'დახმარების ჯგუფები',
    journal: 'ჟურნალი',
    rituals: 'რიტუალები',
    profile: 'პროფილი',
    help: 'დახმარება',
    preferences: 'პარამეტრები',
    mindful: 'ჰარმონია',
    settings: 'პარამეტრები',
    insights: 'ანალიტიკა',
    login: 'შესვლა',
    notifications: 'შეტყობინებები',
    searchPlaceholder: 'ძიება...',
    new: 'ახალი',
    save: 'შენახვა',
    delete: 'წაშლა',
    openLink: 'ბმულის გახსნა',
    all: 'ყველა',
    online: 'ონლაინ',
    local: 'ლოკალური',
    support: 'მხარდაჭერა',
    celebration: 'დღესასწაული',
    advice: 'რჩევა',
    story: 'ისტორია',
    question: 'კითხვა',
    gratitude: 'მადლიერება',
    // Community screen texts
    communityHeroTitle: '💕 ჩვენი უსაფრთხო სივრცე',
    communityHeroSubtitle: 'გააზიარეთ, დაუჭირეთ მხარი და გაიზარდეთ ერთად',
    communitySearchPlaceholder: 'მოძებნეთ ჩვენი თემის ისტორიები...',
    communityLoadingText: 'იტვირთება ჩვენი თემი...',
    communityCategories: 'კატეგორიები',
    communityNoPosts: 'ჯერჯერობით პოსტები არ არის',
    communityNoPostsDescription: 'იყავით პირველი ვინც გააზიარებს თქვენს ისტორიას',
    moodHappy: 'ბედნიერი',
    moodCalm: 'მშვიდი',
    moodSad: 'სევდიანი',
    moodAnxious: 'შეწუხებული',
    notificationSettings: {
      resetTitle: 'შეტყობინებების განულება',
      resetMessage: 'დარწმუნებული ხართ, რომ გსურთ ყველა პარამეტრის განულება?',
      resetError: 'შეტყობინებების განულება ვერ მოხერხდა',
      updateError: 'შეტყობინებების განახლება ვერ მოხერხდა',
      mainNotifications: 'მთავარი შეტყობინებები',
      goalsAchievements: 'მიზნები და მიღწევები',
      optionalNotifications: 'დამატებითი შეტყობინებები',
      dailyReminders: 'ყოველდღიური შეხსენებები',
      dailyRemindersDesc: 'მიიღეთ შეხსენებები განწყობის შესახებ და დღიური ამოცანების შესასრულებლად',
      weeklyGoals: 'ყოველკვირეული მიზნები',
      weeklyGoalsDesc: 'მიიღეთ განახლებები თქვენს ყოველკვირეულ პროგრესზე და მიზნებზე',
      achievementAlerts: 'მიღწევების შეტყობინებები',
      achievementAlertsDesc: 'მიიღეთ შეტყობინება, როდესაც დაასრულებთ მიზნებს',
      journalReminders: 'ჟურნალის შეხსენებები',
      journalRemindersDesc: 'შეხსენებები ჟურნალში ჩაწერისთვის',
      meditationAlerts: 'მედიტაციის შეხსენებები',
      meditationAlertsDesc: 'შეხსენებები მედიტაციის პრაქტიკისთვის',
      motivationalQuotes: 'მოტივაციური ციტატები',
      motivationalQuotesDesc: 'მიიღეთ ყოველდღიური მოტივაციური ციტატები',
      systemUpdates: 'სისტემის განახლებები',
      systemUpdatesDesc: 'მნიშვნელოვანი განახლებები აპლიკაციის შესახებ',
      marketingEmails: 'მარკეტინგული ელ.ფოსტა',
      marketingEmailsDesc: 'მიიღეთ სარეკლამო შეტყობინებები და შეთავაზებები'
    },
  },
};