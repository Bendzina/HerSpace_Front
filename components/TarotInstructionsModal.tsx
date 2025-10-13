import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/app/ThemeContext';
import { useLanguage } from '@/app/LanguageContext';

const { width } = Dimensions.get('window');

interface TarotInstructionsModalProps {
  visible: boolean;
  onClose: () => void;
}

const TAROT_INSTRUCTIONS = {
  en: {
    title: "✨ Tarot Guidance ✨",
    intro: "Before drawing your cards, take a deep breath and center yourself.",
    philosophy: "Tarot does not show the future — it reflects the energy around you right now.",
    approach: "Ask your question with openness and curiosity, not expectation.",
    examples: [
      "Instead of \"Will this happen?\", try asking:",
      "• \"What energy surrounds this situation?\"",
      "• \"What is the lesson or growth opportunity here?\"",
      "• \"What guidance do I need for this path?\""
    ],
    conclusion: "The cards mirror your inner world — the more sincere your question, the clearer the reflection."
  },
  ka: {
    title: "✨ ტაროს გზამკვლევი ✨",
    intro: "კარტების ამოსვლამდე გააკეთე ღრმა ჩასუნთქვა და შეიგრძენი შენი ცენტრი.",
    philosophy: "ტარო მომავალს არ აჩვენებს — ის გიჩვენებს ენერგიას, რომელიც შენს გარშემოა ამჟამად.",
    approach: "დასვი კითხვა ღიად და ინტერესით, არა მოლოდინით.",
    examples: [
      "ამის ნაცვლად რომ იკითხო \"მომივა თუ არა?\", სცადე ასე:",
      "• \"რა ენერგია არის ამ სიტუაციაში?\"",
      "• \"რა გაკვეთილი ან ზრდის შესაძლებლობა დგას ამ საკითხის უკან?\"",
      "• \"რა გზამკვლევი მჭირდება ამ გზაზე?\""
    ],
    conclusion: "კარტები არის სარკე შენი შინაგანი სამყაროსთვის — რაც უფრო გულწრფელი იქნება კითხვა, მით უფრო ნათელი იქნება პასუხი."
  }
};

export default function TarotInstructionsModal({ visible, onClose }: TarotInstructionsModalProps) {
  const { colors } = useTheme();
  const { language } = useLanguage();

  const instructions = TAROT_INSTRUCTIONS[language as keyof typeof TAROT_INSTRUCTIONS] || TAROT_INSTRUCTIONS.en;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {instructions.title}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.instructionsContainer}>
            {/* Introduction */}
            <View style={[styles.section, { backgroundColor: colors.surface }]}>
              <Text style={[styles.introText, { color: colors.text }]}>
                {instructions.intro}
              </Text>
            </View>

            {/* Philosophy */}
            <View style={[styles.section, { backgroundColor: colors.surface }]}>
              <Text style={[styles.philosophyText, { color: colors.text }]}>
                {instructions.philosophy}
              </Text>
            </View>

            {/* Approach */}
            <View style={[styles.section, { backgroundColor: colors.surface }]}>
              <Text style={[styles.approachText, { color: colors.text }]}>
                {instructions.approach}
              </Text>
            </View>

            {/* Examples */}
            <View style={[styles.section, { backgroundColor: colors.surface }]}>
              <Text style={[styles.examplesTitle, { color: colors.primary }]}>
                {instructions.examples[0]}
              </Text>
              {instructions.examples.slice(1).map((example, index) => (
                <Text key={index} style={[styles.exampleText, { color: colors.text }]}>
                  {example}
                </Text>
              ))}
            </View>

            {/* Conclusion */}
            <View style={[styles.section, { backgroundColor: colors.surface, borderRadius: 16 }]}>
              <Text style={[styles.conclusionText, { color: colors.text }]}>
                {instructions.conclusion}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.closeButtonFooter, { backgroundColor: colors.primary }]}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instructionsContainer: {
    paddingVertical: 20,
  },
  section: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  philosophyText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  approachText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  exampleText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  conclusionText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  closeButtonFooter: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
