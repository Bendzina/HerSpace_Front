import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'ka';

// ✅ English translations
const enTranslations = {
  common: {
    start: 'Start',
  },
  ai: {
    welcome: "Hello! I'm Dagi, your AI assistant for mental well-being. How can I support you today? 🌟",
    typing: "Dagi is typing...",
    tarot: "Draw Tarot",
  },
  profile: {
    title: 'Profile',
    userName: 'Sophia Carter',
    subtitle: 'Mindful Journey',
    joined: 'Joined 2022',
    settings: 'Settings',
    dayStreak: 'Day Streak',
    ritualsCompleted: 'Rituals Completed',
    journalEntries: 'Journal Entries',
    notifications: 'Notifications',
    accountManagement: 'Account Management',
    helpSupport: 'Help & Support',
    permissionRequired: 'Permission to access gallery is required!',
  },
  rituals: {
    filters: {
      all: 'All',
      gentle: 'Gentle',
      empowering: 'Empowering',
      grounding: 'Grounding',
      uplifting: 'Uplifting',
      healing: 'Healing',
    },
    phases: {
      motherhood: 'Motherhood',
      any: 'Any Phase',
      all: 'All Phases'
    },
    minutes: 'min',
    filterByTone: 'Filter by Tone',
    lifePhase: 'Life Phase',
    sacredRituals: 'Sacred Rituals',
    nurtureYourSoul: 'Nurture your soul with daily rituals',
    noRitualsFound: 'No rituals found',
    searchYourPerfectRitual: 'Search your perfect ritual',
    openHistory: 'Open ritual history',
  },
  notifications: {
    title: 'Notifications',
    reset: 'Reset',
    cancel: 'Cancel',
    resetTitle: 'Reset Settings',
    resetMessage: 'Are you sure you want to reset all notification settings to default?',
    mainNotifications: 'Main Notifications',
    goalsAchievements: 'Goals & Achievements',
    optionalNotifications: 'Optional Notifications',
    dailyReminders: 'Daily Reminders',
    dailyRemindersDesc: 'Get reminded to complete your daily rituals',
    journalReminders: 'Journal Reminders',
    journalRemindersDesc: 'Notifications to write in your journal',
    meditationAlerts: 'Meditation Alerts',
    meditationAlertsDesc: 'Reminders for meditation sessions',
    weeklyGoals: 'Weekly Goals',
    weeklyGoalsDesc: 'Updates on your weekly progress',
    achievementAlerts: 'Achievement Alerts',
    achievementAlertsDesc: 'Celebrate when you reach milestones',
    motivationalQuotes: 'Motivational Quotes',
    motivationalQuotesDesc: 'Daily inspirational messages',
    systemUpdates: 'System Updates',
    systemUpdatesDesc: 'Important app updates and features',
    marketingEmails: 'Marketing Emails',
    marketingEmailsDesc: 'Promotional content and offers',
  },
  help: {
    title: 'Help & Support',
    faqTitle: 'Frequently Asked Questions',
    question1: 'How do I start my daily ritual?',
    answer1: 'Go to the home screen and tap on "Start Ritual". Follow the guided steps to complete your daily practice.',
    question2: 'Can I customize my meditation sessions?',
    answer2: 'Yes! Go to Settings > Meditation Preferences to customize duration, background sounds, and guidance style.',
    question3: 'How do I backup my journal entries?',
    answer3: 'Your journal entries are automatically synced to your account. You can also export them from Settings > Data Management.',
    contactTitle: 'Contact Us',
    email: 'Email Support',
    website: 'Help Website',
    appInfoTitle: 'App Information',
    version: 'Version',
    buildNumber: 'Build Number',
    tipsTitle: 'Pro Tips',
    tip1: 'Set consistent daily reminders to build a strong habit',
    tip2: 'Use the progress tracker to see your growth over time',
    tip3: 'Enable dark mode in settings for better evening use',
  },
  password: {
    title: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    enterCurrentPassword: 'Enter your current password',
    enterNewPassword: 'Enter your new password',
    confirmNewPassword: 'Confirm your new password',
    requirements: 'Password Requirements',
    minLength: 'At least 8 characters',
    hasUpperCase: 'One uppercase letter',
    hasLowerCase: 'One lowercase letter',
    hasNumbers: 'One number',
    hasSpecialChar: 'One special character',
    securityTips: 'Security Tips',
    tip1: 'Use a unique password for this app',
    tip2: 'Change your password regularly',
    tip3: 'Never share your password with others',
    changePassword: 'Change Password',
    error: 'Error',
    success: 'Success',
    fillAllFields: 'Please fill in all fields',
    passwordsDontMatch: 'Passwords do not match',
    weakPassword: 'Password does not meet security requirements',
    passwordChanged: 'Your password has been successfully changed',
    ok: 'OK',
  },
  ritualDetails: {
    helpful: 'Helpful',
    notReally: 'Not really',
    rate: 'Rate effectiveness',
    notes: 'Notes (optional)',
    notesPlaceholder: 'How do you feel now?',
    start: 'Start',
    starting: 'Starting…',
    done: 'Done',
    saving: 'Saving…',
    saved: 'Saved. Thank you for sharing.',
    failedStart: 'Failed to start ritual',
    failedSave: 'Failed to save',
    notFound: 'Ritual not found.',
  },
  ritualHistory: {
    back: 'Back',
    myRituals: 'My Rituals',
    total: 'Total',
    helpful: 'Helpful',
    avgRating: 'Avg Rating',
    notReally: 'Not really',
    noHistory: 'No history yet.',
  },
  journal: 'Journal',
  community: 'Community',
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    darkModeDesc: 'Switch between light and dark themes',
    language: 'Language',
    currentLanguage: 'Language',
    account: 'Account',
    profile: 'Profile',
    profileDesc: 'View and edit your profile',
    notifications: 'Notifications',
    notificationsDesc: 'Manage your notification preferences',
    security: 'Security',
    securityDesc: 'Change password and security settings',
    support: 'Support',
    helpSupport: 'Help & Support',
    helpSupportDesc: 'Get help and contact support',
  },
};

// ✅ Georgian translations (დასრულებული ვერსია)
const kaTranslations: typeof enTranslations = {
  common: {
    start: 'დაწყება',
  },
  ai: {
    welcome: "გამარჯობა! მე ვარ Dagi, შენი AI ასისტენტი მენტალური კეთილდღეობისთვის. როგორ შემიძლია დაგეხმარო დღეს? 🌟",
    typing: "Dagi წერს...",
    tarot: "ტაროს გაშლა",
  },
  profile: {
    title: 'პროფილი',
    userName: 'სოფიო კარტერი',
    subtitle: 'შეგნებული მოგზაურობა',
    joined: 'შეუერთდა 2022',
    settings: 'პარამეტრები',
    dayStreak: 'დღეების სერია',
    ritualsCompleted: 'შესრულებული რიტუალები',
    journalEntries: 'ჩანაწერები',
    notifications: 'შეტყობინებები',
    accountManagement: 'ანგარიშის მართვა',
    helpSupport: 'დახმარება და მხარდაჭერა',
    permissionRequired: 'გალერეაზე წვდომის ნებართვა საჭიროა!',
  },
  rituals: {
    filters: {
      all: 'ყველა',
      gentle: 'ნაზი',
      empowering: 'გამაძლიერებელი',
      grounding: 'დამამშვიდებელი',
      uplifting: 'ამაღლებული',
      healing: 'მკურნალი',
    },
    phases: {
      motherhood: 'დედობა',
      any: 'ნებისმიერი ფაზა',
      all: 'ყველა ფაზა'
    },
    minutes: 'წთ',
    filterByTone: 'გაფილტრე ტონით',
    lifePhase: 'ცხოვრების ფაზა',
    sacredRituals: 'წმინდა რიტუალები',
    nurtureYourSoul: 'გაამხნევე სული ყოველდღიური რიტუალებით',
    noRitualsFound: 'რიტუალები ვერ მოიძებნა',
    searchYourPerfectRitual: 'იპოვე შენთვის შესაფერისი რიტუალი',
    openHistory: 'იხილე რიტუალების ისტორია',
  },
  notifications: {
    title: 'შეტყობინებები',
    reset: 'გადატვირთვა',
    cancel: 'გაუქმება',
    resetTitle: 'პარამეტრების გადატვირთვა',
    resetMessage: 'დარწმუნებული ხარ, რომ გინდა ყველა შეტყობინების პარამეტრის გადატვირთვა?',
    mainNotifications: 'მთავარი შეტყობინებები',
    goalsAchievements: 'მიზნები და მიღწევები',
    optionalNotifications: 'დამატებითი შეტყობინებები',
    dailyReminders: 'ყოველდღიური შეხსენებები',
    dailyRemindersDesc: 'მიიღე შეხსენება ყოველდღიური რიტუალების შესასრულებლად',
    journalReminders: 'დღიურის შეხსენებები',
    journalRemindersDesc: 'შეტყობინებები დღიურში ჩასაწერად',
    meditationAlerts: 'მედიტაციის გაფრთხილებები',
    meditationAlertsDesc: 'შეხსენებები მედიტაციის სესიებისთვის',
    weeklyGoals: 'კვირეული მიზნები',
    weeklyGoalsDesc: 'კვირეული პროგრესის განახლებები',
    achievementAlerts: 'მიღწევების გაფრთხილებები',
    achievementAlertsDesc: 'აღნიშნე როდესაც მიზანს მიაღწევ',
    motivationalQuotes: 'მოტივაციური ციტატები',
    motivationalQuotesDesc: 'ყოველდღიური შთამაგონებელი მესიჯები',
    systemUpdates: 'სისტემის განახლებები',
    systemUpdatesDesc: 'მნიშვნელოვანი აპლიკაციის განახლებები და ფუნქციები',
    marketingEmails: 'მარკეტინგული მეილები',
    marketingEmailsDesc: 'სარეკლამო კონტენტი და შეთავაზებები',
  },
  help: {
    title: 'დახმარება და მხარდაჭერა',
    faqTitle: 'ხშირად დასმული კითხვები',
    question1: 'როგორ დავიწყო ყოველდღიური რიტუალი?',
    answer1: 'გადადი მთავარ გვერდზე და დააჭირე "რიტუალის დაწყება"-ს. მიჰყევი ინსტრუქციას.',
    question2: 'შემიძლია მედიტაციის სესიების პერსონალიზაცია?',
    answer2: 'დიახ! გადადი პარამეტრები > მედიტაციის პარამეტრები და შეცვალე ხანგრძლივობა, ფონური ხმები და სახელმძღვანელო.',
    question3: 'როგორ შევინახო დღიურის ჩანაწერები?',
    answer3: 'შენი ჩანაწერები ავტომატურად სინქრონიზდება. შეგიძლია ექსპორტი გააკეთო პარამეტრები > მონაცემების მართვა-დან.',
    contactTitle: 'დაგვიკავშირდი',
    email: 'ელფოსტის მხარდაჭერა',
    website: 'დახმარების ვებსაიტი',
    appInfoTitle: 'აპლიკაციის ინფორმაცია',
    version: 'ვერსია',
    buildNumber: 'Build ნომერი',
    tipsTitle: 'პროფესიონალური რჩევები',
    tip1: 'დააყენე ყოველდღიური შეხსენებები ძლიერი ჩვევის ჩამოსაყალიბებლად',
    tip2: 'გამოიყენე პროგრესის ტრეკერი შენი ზრდის სანახავად',
    tip3: 'ჩართე მუქი რეჟიმი საღამოს გამოსაყენებლად',
  },
  password: {
    title: 'პაროლის შეცვლა',
    currentPassword: 'მიმდინარე პაროლი',
    newPassword: 'ახალი პაროლი',
    confirmPassword: 'დაადასტურე პაროლი',
    enterCurrentPassword: 'შეიყვანე მიმდინარე პაროლი',
    enterNewPassword: 'შეიყვანე ახალი პაროლი',
    confirmNewPassword: 'დაადასტურე ახალი პაროლი',
    requirements: 'პაროლის მოთხოვნები',
    minLength: 'მინიმუმ 8 სიმბოლო',
    hasUpperCase: 'ერთი დიდი ასო',
    hasLowerCase: 'ერთი პატარა ასო',
    hasNumbers: 'ერთი ციფრი',
    hasSpecialChar: 'ერთი სპეციალური სიმბოლო',
    securityTips: 'უსაფრთხოების რჩევები',
    tip1: 'გამოიყენე უნიკალური პაროლი ამ აპლიკაციისთვის',
    tip2: 'რეგულარულად შეცვალე პაროლი',
    tip3: 'არასდროს გაუზიარო პაროლი სხვებს',
    changePassword: 'პაროლის შეცვლა',
    error: 'შეცდომა',
    success: 'წარმატება',
    fillAllFields: 'გთხოვ შეავსე ყველა ველი',
    passwordsDontMatch: 'პაროლები არ ემთხვევა',
    weakPassword: 'პაროლი არ აკმაყოფილებს უსაფრთხოების მოთხოვნებს',
    passwordChanged: 'შენი პაროლი წარმატებით შეიცვალა',
    ok: 'კარგი',
  },
  ritualDetails: {
    helpful: 'სასარგებლო',
    notReally: 'არა მართლა',
    rate: 'შეაფასე ეფექტურობა',
    notes: 'შენიშვნები (არასავალდებულო)',
    notesPlaceholder: 'როგორ გრძნობ თავს ახლა?',
    start: 'დაწყება',
    starting: 'იწყება...',
    done: 'დასრულდა',
    saving: 'ინახება...',
    saved: 'შენახულია. გმადლობთ გაზიარებისთვის.',
    failedStart: 'რიტუალის დაწყება ვერ მოხერხდა',
    failedSave: 'შენახვა ვერ მოხერხდა',
    notFound: 'რიტუალი ვერ მოიძებნა.',
  },
  ritualHistory: {
    back: 'უკან',
    myRituals: 'ჩემი რიტუალები',
    total: 'სულ',
    helpful: 'სასარგებლო',
    avgRating: 'საშუალო რეიტინგი',
    notReally: 'არა მართლა',
    noHistory: 'ჯერ ისტორია არ არის.',
  },
  journal: 'დღიური',
  community: 'ჩვენი სივრცე',
  settings: {
    title: 'პარამეტრები',
    appearance: 'გარეგნობა',
    darkMode: 'მუქი რეჟიმი',
    darkModeDesc: 'გადართვა ღია და მუქ თემებს შორის',
    language: 'ენა',
    currentLanguage: 'ენა',
    account: 'ანგარიში',
    profile: 'პროფილი',
    profileDesc: 'იხილე და შეცვალე პროფილი',
    notifications: 'შეტყობინებები',
    notificationsDesc: 'მართე შეტყობინების პარამეტრები',
    security: 'უსაფრთხოება',
    securityDesc: 'შეცვალე პაროლი და უსაფრთხოების პარამეტრები',
    support: 'მხარდაჭერა',
    helpSupport: 'დახმარება და მხარდაჭერა',
    helpSupportDesc: 'მიიღე დახმარება და დაუკავშირდი მხარდაჭერას',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof enTranslations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('user_language');
      if (savedLanguage === 'ka' || savedLanguage === 'en') {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Failed to load language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = async (newLang: Language) => {
    try {
      setLanguageState(newLang);
      await AsyncStorage.setItem('user_language', newLang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  if (isLoading) return null;

  const t = language === 'ka' ? kaTranslations : enTranslations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export default LanguageProvider;