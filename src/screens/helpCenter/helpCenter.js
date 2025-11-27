import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/common/header/header';
import colors from '../../components/constants/colors/colors';
import Button from '../../components/common/button/button';

export default function HelpCenter({ navigation }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const faqItems = [
    {
      id: '1',
      question: 'How do I create a new task?',
      answer: 'Go to the homepage and tap the "+" button to add a new task.'
    },
    {
      id: '2',
      question: 'Can I invite my friends on this app?',
      answer: 'Yes, you can invite team friends via email'
    },
    {
      id: '3',
      question: 'How do I reset my password?',
      answer: 'Go to Settings > Edit profile > and simply change your Password'
    },
    {
      id: '4',
      question: 'Where are my files stored?',
      answer: 'Your files are stored securely in the cloud'
    },
    {
      id: '5',
      question: 'How do I check my weekly daily mood?',
      answer: 'Go to insights page on top right side click on calendar icon you will be redirected to histoy page where you can check your mood by date vise.'
    }
  ];

  const contactOptions = [
    {
      type: 'Email Support',
      details: 'support@sparkkith.com',
      action: () =>
        Linking.openURL(
          'mailto:support@sparkkith.com?subject=Sparkith Support&body=Hello, I need help with...'
        )
    },
    {
      type: 'Community Forum',
      details: 'community.sparkith.com',
      action: () => Linking.openURL('https://community.sparkith.com')
    }
  ];

  const handleSendMessage = () => {
    Linking.openURL(
      'mailto:support@sparkith.com?subject=Sparkith Support Request&body=Dear Support Team,'
    );
  };


  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} title="Help center" showBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          {faqItems.map((item) => (
            <View key={item.id} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.question}
                onPress={() => toggleItem(item.id)}
              >
                <Text style={[styles.questionText, { color: expandedItem === item.id ? colors.buttonColor : "black" }]}>{item.question}</Text>
              </TouchableOpacity>

              {expandedItem === item.id && (
                <View style={styles.answer}>
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>

          {contactOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.contactItem} onPress={option.action}>
              <Text style={styles.contactType}>{option.type}</Text>
              <Text style={styles.contactDetails}>{option.details}</Text>
            </TouchableOpacity>
          ))}

          <Button title="Send Message" onPress={handleSendMessage} />
        </View>

        {/* Quick Help */}
        {/* <View style={styles.quickHelp}>
          <Text style={styles.quickHelpTitle}>Need immediate help?</Text>
          <Text style={styles.quickHelpText}>Our team is ready to assist you</Text>
          <TouchableOpacity
            onPress={handleEmergencySupport}
            style={styles.emergencyButton}
          >
            <Text style={styles.emergencyButtonText}>Emergency Support</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor
  },

  section: {
    backgroundColor: 'white',
    margin: 14,
    padding: 20,
    borderRadius: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15
  },

  faqItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  question: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    paddingRight: 10
  },
  arrow: {
    fontSize: 12,
    color: colors.description
  },
  answer: {
    paddingBottom: 15,
    paddingLeft: 5
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    // lineHeight: 20
  },

  contactItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  contactType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  contactDetails: {
    fontSize: 14,
    color: colors.buttonColor
  },

  quickHelp: {
    backgroundColor: '#FFFBEB',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.buttonColor
  },
  quickHelpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 5
  },
  quickHelpText: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 15
  },
  emergencyButton: {
    backgroundColor: colors.buttonColor,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600'
  }
});
