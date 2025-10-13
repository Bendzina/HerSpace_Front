import { authorizedFetch } from './authService';

export interface MindfulnessActivity {
  id: string | number;
  title: string;
  description: string;
  short_description: string;
  icon: string;
  duration_minutes: number;
  duration: string; // Added for display purposes
  image?: string;
  category: 'breathing' | 'meditation' | 'body_scan' | 'gratitude' | 'visualization' | 'movement';
  category_display: string; // Added for displaying human-readable category
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
  title_ka?: string;
  description_ka?: string;
  short_description_ka?: string;
}

export interface MindfulnessSession {
  id: string | number;
  activity: {
    id: string | number;
    title: string;
    category: string;
  };
  started_at: string;
  duration_minutes: number;
  mood_before?: string;
  mood_after?: string;
  notes?: string;
}

export async function getMindfulnessActivities(language: string = 'en'): Promise<MindfulnessActivity[]> {
  console.log('Fetching mindfulness activities...');
  
  try {
    console.log('Trying to fetch from API...');
    const response = await authorizedFetch(`/wellness/mindfulness/activities/?lang=${language}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('API response:', response);

    if (response && response.ok) {
      console.log('Response OK, parsing JSON...');
      const data = await response.json();
      console.log('Parsed data:', data);
      
      if (Array.isArray(data)) {
        if (data.length > 0) {
          const activities = data.map(processActivity);
          console.log('Processed activities:', activities);
          return activities;
        } else {
          console.warn('API returned empty array, using sample data');
        }
      } else {
        console.warn('API did not return an array:', data);
      }
    } else {
      console.warn('API request failed or response not OK:', response);
    }
  } catch (error) {
    console.warn('Using sample mindfulness activities due to error:', error);
  }

  console.log('Falling back to sample activities...');
  const sampleActivities = getSampleActivities(language);
  console.log('Sample activities:', sampleActivities);
  return sampleActivities;
}

export async function trackMindfulnessActivity(activityId: string | number): Promise<{message: string, activity: MindfulnessActivity}> {
  try {
    const response = await authorizedFetch(`/wellness/mindfulness/activities/${activityId}/track/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn('Tracking endpoint not found, using mock response');
        // Return a mock success response for sample data
        return {
          message: 'Activity started successfully',
          activity: getSampleActivities('en').find(a => a.id === activityId) || getSampleActivities('en')[0]
        };
      }
      const error = await response.json();
      throw new Error(error.detail || 'Failed to track activity');
    }

    return response.json();
  } catch (error) {
    console.warn('Tracking failed, using mock response:', error);
    // Return a mock success response for sample data
    return {
      message: 'Activity started successfully',
      activity: getSampleActivities('en').find(a => a.id === activityId) || getSampleActivities('en')[0]
    };
  }
}

export async function getUserMindfulnessSessions(): Promise<MindfulnessSession[]> {
  try {
    const response = await authorizedFetch('/wellness/mindfulness/sessions/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response && response.ok) {
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } else if (response && response.status === 404) {
      // If no sessions endpoint exists yet, return empty array
      console.log('Sessions endpoint not found, returning empty array');
      return [];
    } else {
      console.warn('Failed to fetch sessions:', response?.status);
      return [];
    }
  } catch (error) {
    console.warn('Error fetching sessions, returning empty array:', error);
    return [];
  }
}

function processActivity(activity: any): MindfulnessActivity {
  return {
    id: activity.id,
    title: activity.title || 'Untitled Activity',
    description: activity.description || '',
    short_description: activity.short_description || '',
    icon: activity.icon || 'help-circle',
    duration_minutes: activity.duration_minutes || 5,
    duration: activity.duration || '5 min',
    category: ['breathing', 'meditation', 'body_scan', 'gratitude', 'visualization', 'movement'].includes(activity.category) 
      ? activity.category 
      : 'meditation',
    category_display: activity.category_display || 'Meditation',
    difficulty: ['beginner', 'intermediate', 'advanced'].includes(activity.difficulty)
      ? activity.difficulty
      : 'beginner',
    created_at: activity.created_at || new Date().toISOString(),
    updated_at: activity.updated_at || new Date().toISOString(),
    title_ka: activity.title_ka,
    description_ka: activity.description_ka,
    short_description_ka: activity.short_description_ka,
  };
}

function getSampleActivities(language: string): MindfulnessActivity[] {
  const sampleActivities = [
    {
      id: 1,
      title: 'Deep Breathing',
      title_ka: 'ღრმა სუნთქვა',
      description: 'Sit or lie down comfortably. Close your eyes. Inhale slowly through your nose — feel your chest and belly expand. Hold for a moment… and gently exhale through your mouth. As you breathe, imagine that peace enters your body with every inhale, and all tension leaves with every exhale. Stay with your breath — it\'s your bridge to the present moment.',
      description_ka: 'დაჯექი ან დაწექი კომფორტულად. დახუჭე თვალები. ჩაისუნთქე ნელა ცხვირით — იგრძენი, როგორ ივსება მკერდი და მუცელი. გაჩერდი წამით... და ნელა ამოისუნთქე პირით. ყოველ ჩასუნთქვაზე წარმოიდგინე, რომ სიმშვიდე შედის შენში, ხოლო ყოველ ამოსუნთქვაზე — ყველაფერი დაძაბული გტოვებს. დარჩი შენს სუნთქვასთან — ის არის ხიდი ამჟამინდელ მომენტთან.',
      short_description: 'Calm your mind with deep breathing',
      short_description_ka: 'დააწყნარეთ გონება ღრმა სუნთქვით',
      icon: 'leaf',
      duration_minutes: 5,
      duration: '5 min',
      category: 'breathing',
      category_display: 'Breathing',
      difficulty: 'beginner',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      id: 2,
      title: 'Morning Meditation',
      title_ka: 'დილის მედიტაცია',
      description: 'Begin your day in stillness. Sit comfortably, place your hand on your heart, and take a deep breath. Ask yourself softly: "What kind of energy do I want to carry today?" Don\'t rush to answer — just feel it. Let your mind become clear like a morning sky. Whatever comes, greet it with presence and kindness.',
      description_ka: 'დაიწყე დღე სიჩუმით. დაჯექი კომფორტულად, მიიდე ხელი გულზე და ღრმად ჩაისუნთქე. ფრთხილად ჰკითხე შენს თავს — „რა ენერგია მინდა, დღეს მატაროს?“ ნუ იჩქარებ პასუხის გაცემას — უბრალოდ იგრძენი. აცავე გონებას გაიწმინდოს, როგორც დილის ცა. რაც არ უნდა მოვიდეს — მიესალმე მშვიდად და კეთილად.',
      short_description: 'Begin your day with clarity',
      short_description_ka: 'დაიწყეთ დღე სიწმინდით',
      icon: 'sunny',
      duration_minutes: 10,
      duration: '10 min',
      category: 'meditation',
      category_display: 'Meditation',
      difficulty: 'beginner',
      created_at: '2023-01-02T00:00:00Z',
      updated_at: '2023-01-02T00:00:00Z'
    },
    {
      id: 3,
      title: 'Body Scan',
      title_ka: 'სხეულის სკანირება',
      description: 'Close your eyes and bring awareness to your body. Start from the top of your head — notice any sensations. Move slowly downward: your neck, shoulders, arms, chest, belly… Then your hips, legs, and feet. If you feel tension, breathe into that place — imagine it softening. Thank your body for holding you through everything.',
      description_ka: 'დახუჭე თვალები და მიმართე ყურადღება შენს სხეულს. დაიწყე თავიდან — შეამჩნია ნებისმიერი შეგრძნება. ნელა გადადი კისერზე, მხრებზე, მკლავებზე, გულმკერდზე, მუცელზე... შემდეგ თეძოებზე, ფეხებზე, ტერფებამდე. თუ სადმე დაძაბულობას იგრძნობ, ჩაისუნთქე იმ ადგილას — წარმოიდგინე, როგორ დნება. მადლობა გადაუხადე შენს სხეულს, რომ დღემდე გატარებს ყველაფერში.',
      short_description: 'Release tension through awareness',
      short_description_ka: 'გაათავისუფლეთ დაძაბულობა ცნობიერების მეშვეობით',
      icon: 'body',
      duration_minutes: 15,
      duration: '15 min',
      category: 'body_scan',
      category_display: 'Body Scan',
      difficulty: 'intermediate',
      created_at: '2023-01-03T00:00:00Z',
      updated_at: '2023-01-03T00:00:00Z'
    },
    {
      id: 4,
      title: 'Gratitude Practice',
      title_ka: 'მადლიერების პრაქტიკა',
      description: 'Pause for a moment. Breathe. Think of three things you\'re grateful for today — they can be small. Feel the warmth that gratitude brings into your heart. Let it expand through your whole body. Whisper softly: "Thank you, for all that I am and all that I have."',
      description_ka: 'შეჩერდი წამით. ჩაისუნთქე. გაიხსენე სამი რამ, რისთვისაც დღეს მადლობელი ხარ — შეიძლება პატარა იყოს. იგრძენი ის სითბო, რასაც მადლიერება გიტოვებს გულში. აცავე ეს სითბო მთელ სხეულში გავრცელდეს. ჩუმად უთხარი საკუთარ თავს: „გმადლობ, ყველაფრისთვის, რაც ვარ და რაც მაქვს.“',
      short_description: 'Focus on the positive',
      short_description_ka: 'ფოკუსირება დადებითზე',
      icon: 'heart',
      duration_minutes: 5,
      duration: '5 min',
      category: 'gratitude',
      category_display: 'Gratitude',
      difficulty: 'beginner',
      created_at: '2023-01-04T00:00:00Z',
      updated_at: '2023-01-04T00:00:00Z'
    },
    {
      id: 5,
      title: 'Loving-Kindness Meditation',
      title_ka: 'სიყვარულისა და სიკეთის მედიტაცია',
      description: 'Place your hand on your heart and breathe softly. Repeat within: "May I be peaceful. May I be free from fear." When you feel ready, bring to mind someone you love — and send them the same wish: "May you be peaceful. May you be free." Feel your heart expand, connecting you with all beings in compassion.',
      description_ka: 'მიიდე ხელი გულზე და ნაზად ისუნთქე. გაიმეორე გულში: „მინდა ვიყო მშვიდი. თავისუფალი შიშისგან.“ როცა მზად იქნები, გაიხსენე ვინმე, ვინც გიყვარს — გაუგზავნე იგივე სურვილი: „იყავი მშვიდად. იყავი თავისუფალი.“ იგრძენი, როგორ ფართოვდება შენი გული და ერთიანდება თანაგრძნობაში ყველაფერთან.',
      short_description: 'Cultivate compassion',
      short_description_ka: 'განავითარეთ თანაგრძნობა',
      icon: 'heart-circle',
      duration_minutes: 10,
      duration: '10 min',
      category: 'meditation',
      category_display: 'Meditation',
      difficulty: 'intermediate',
      created_at: '2023-01-05T00:00:00Z',
      updated_at: '2023-01-05T00:00:00Z'
    }
  ] as const;

  return sampleActivities.map(activity => ({
    ...activity,
    title: language === 'ka' && activity.title_ka ? activity.title_ka : activity.title,
    description: language === 'ka' && activity.description_ka ? activity.description_ka : activity.description,
    short_description: language === 'ka' && activity.short_description_ka ? activity.short_description_ka : activity.short_description,
  }));
}
