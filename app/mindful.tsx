import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMindfulnessActivities, MindfulnessActivity, MindfulnessSession } from '../services/mindfulnessService';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
const { width } = Dimensions.get('window');

export default function MindfulScreen() {
  const { colors } = useTheme();
  const { language } = useLanguage();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [activities, setActivities] = useState<MindfulnessActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentSessions, setRecentSessions] = useState<MindfulnessSession[]>([]);

  const loadActivities = useCallback(async () => {
    try {
      console.log('Loading activities...');
      setLoading(true);
      setError(null);
      const data = await getMindfulnessActivities(language);
      console.log('Activities loaded:', data);
      
      if (!data || data.length === 0) {
        console.warn('No activities found in the response');
      }
      
      setActivities(data);
    } catch (err) {
      console.error('Error loading activities:', err);
      setError(language === 'ka' ? 'ვერ ჩაიტვირთა მედიტაციის აქტივობები' : 'Failed to load mindfulness activities');
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const router = useRouter();

  const handleActivityPress = async (activity: MindfulnessActivity) => {
    try {
      setSelectedActivity(activity.id.toString());
      // Track the activity start
      // await trackMindfulnessActivity(activity.id);  // Temporarily disabled
      
      // Navigate to the activity screen
      router.push({
        pathname: '/activity',
        params: { 
          activity: JSON.stringify(activity)
        }
      } as any);
      
      // Reset selection after navigation
      setSelectedActivity(null);
    } catch (error) {
      Alert.alert(
        language === 'ka' ? 'შეცდომა' : 'Error',
        language === 'ka'
          ? 'ვერ მოხერხდა აქტივობის დაწყება. გთხოვთ სცადოთ თავიდან.'
          : 'Failed to start activity. Please try again.'
      );
      setSelectedActivity(null);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      breathing: '#4CAF50',
      meditation: '#9C27B0',
      body_scan: '#2196F3',
      gratitude: '#FF9800',
      visualization: '#E91E63',
      movement: '#607D8B',
    };
    return colors[category as keyof typeof colors] || '#9E9E9E';
  };

  const renderActivityCard = (activity: MindfulnessActivity) => {
    const isSelected = selectedActivity === activity.id.toString();
    const categoryColor = getCategoryColor(activity.category);
    
    return (
      <TouchableOpacity
        key={activity.id.toString()}
        style={[
          styles.activityCard,
          {
            backgroundColor: isSelected ? colors.primary + '20' : colors.surface,
            borderColor: isSelected ? colors.primary : colors.border,
          },
        ]}
        onPress={() => handleActivityPress(activity)}
        disabled={isSelected}
      >
        <View style={styles.activityHeader}>
          <View
            style={[
              styles.activityIcon,
              { backgroundColor: categoryColor + '20' },
            ]}
          >
            <Ionicons
              name={activity.icon as any}
              size={24}
              color={categoryColor}
            />
          </View>
          <View style={styles.activityHeaderText}>
            <Text
              style={[styles.activityTitle, { color: colors.text }]}
              numberOfLines={1}
            >
              {language === 'ka' && activity.title_ka ? activity.title_ka : activity.title}
            </Text>
            <Text style={[styles.activityCategory, { color: colors.textSecondary }]}>
              {activity.category.replace('_', ' ')}
            </Text>
          </View>
          {activity.difficulty === 'intermediate' || activity.difficulty === 'advanced' ? (
            <View style={[styles.difficultyBadge, { backgroundColor: categoryColor + '40' }]}>
              <Text style={[styles.difficultyText, { color: colors.text }]}>
                {activity.difficulty}
              </Text>
            </View>
          ) : null}
        </View>
        
        {activity.image ? (
          <Image 
            source={{ uri: activity.image }} 
            style={styles.activityImage}
            resizeMode="cover"
          />
        ) : null}
        
        <View style={styles.activityFooter}>
          <View style={styles.durationBadge}>
            <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
            <Text style={[styles.durationText, { color: colors.textSecondary }]}>
              {activity.duration_minutes} min
            </Text>
          </View>
        </View>
        
        {isSelected && (
          <View style={styles.selectedOverlay}>
            <Ionicons
              name="checkmark-circle"
              size={32}
              color={colors.primary}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={loadActivities}
        >
          <Text style={styles.retryButtonText}>
            {language === 'ka' ? 'ხელახლა ცდა' : 'Retry'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {language === 'ka' ? 'წუთიერება' : 'Mindfulness'}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {language === 'ka' 
              ? 'იპოვე შენი შინაგანი სიმშვიდე' 
              : 'Find your inner peace'}
          </Text>
        </View>

        <View style={styles.activitiesContainer}>
          {activities.length > 0 ? (
            activities.map((activity) => renderActivityCard(activity))
          ) : (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 32,
            }}>
              <Ionicons name="sad-outline" size={48} color={colors.textSecondary} style={{ marginBottom: 16 }} />
              <Text style={{ 
                color: colors.textSecondary,
                textAlign: 'center',
                fontSize: 16,
              }}>
                {language === 'ka' ? 'არ არის აქტივობები' : 'No activities found'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  activitiesContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  activityCard: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityHeaderText: {
    flex: 1,
    marginRight: 8,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  activityCategory: {
    fontSize: 12,
    opacity: 0.7,
    textTransform: 'capitalize',
    marginTop: 2,
  },
  activityDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
    marginBottom: 12,
  },
  activityImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    fontSize: 12,
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  recentCard: {
    borderRadius: 12,
    padding: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 12,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentDetails: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  recentTime: {
    fontSize: 14,
    opacity: 0.7,
  },
  divider: {
    height: 1,
    width: '100%',
    opacity: 0.2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyState: {
    width: '100%',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  recentText: { 
    marginLeft: 12, 
    fontSize: 14 
  },
});