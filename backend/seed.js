const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Resource = require('./models/Resource');
const Course = require('./models/Course');
const SecurityTip = require('./models/SecurityTip');
const SupportResource = require('./models/SupportResource');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/safenet');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Resource.deleteMany({});
    await Course.deleteMany({});
    await SecurityTip.deleteMany({});
    await SupportResource.deleteMany({});

    // Seed Users
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@safenet.org',
        password: 'admin123',
        role: 'admin',
        age_group: '26-35'
      },
      {
        name: 'Educator User',
        email: 'educator@safenet.org',
        password: 'educator123',
        role: 'educator',
        age_group: '26-35'
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'user123',
        role: 'user',
        age_group: '18-25'
      }
    ]);
    console.log(`${users.length} users created`);

    // Seed Resources
    const resources = await Resource.create([
      {
        title: 'Understanding Cyberbullying',
        category: 'safety_tips',
        content: 'Cyberbullying is the use of digital platforms to harass, threaten, embarrass, or target another person. This guide helps you understand its forms and how to respond.',
        resource_type: 'article',
        difficulty_level: 'beginner',
        estimated_time: 8
      },
      {
        title: 'Protecting Your Personal Data Online',
        category: 'privacy_guide',
        content: 'Learn essential strategies to protect your personal information, including strong passwords, two-factor authentication, and privacy settings.',
        resource_type: 'article',
        difficulty_level: 'beginner',
        estimated_time: 10
      },
      {
        title: 'Recognizing Phishing Attacks',
        category: 'safety_tips',
        content: 'Phishing is a social engineering attack. Learn how to identify suspicious emails and links that could compromise your security.',
        resource_type: 'article',
        difficulty_level: 'intermediate',
        estimated_time: 7
      },
      {
        title: 'Mental Health Support During Online Harassment',
        category: 'mental_health',
        content: 'If you\'re experiencing online harassment, your mental health matters. Explore coping strategies and when to seek professional help.',
        resource_type: 'article',
        difficulty_level: 'intermediate',
        estimated_time: 12
      }
    ]);
    console.log(`${resources.length} resources created`);

    // Seed Courses
    const courses = await Course.create([
      {
        title: 'Digital Literacy 101',
        description: 'A comprehensive beginner course covering online safety basics, password management, and digital awareness.',
        level: 'beginner',
        duration_hours: 4,
        lessons: [
          {
            lesson_number: 1,
            title: 'Getting Started Online',
            content: 'Learn the basics of safe online behavior and security awareness.',
            quiz_questions: [
              {
                question: 'What is the first step in online safety?',
                options: ['Using strong passwords', 'Sharing your email', 'Ignoring updates', 'Downloading unknown files'],
                correct_answer: 0
              }
            ]
          },
          {
            lesson_number: 2,
            title: 'Password Security',
            content: 'Understand how to create and maintain strong passwords.',
            quiz_questions: [
              {
                question: 'How long should a strong password be?',
                options: ['4 characters', '8+ characters', '2 characters', '1 character'],
                correct_answer: 1
              }
            ]
          }
        ],
        creator_id: users[1]._id
      },
      {
        title: 'Advanced Digital Safety',
        description: 'Dive deeper into cybersecurity, privacy protection, and advanced threat detection.',
        level: 'advanced',
        duration_hours: 8,
        lessons: [
          {
            lesson_number: 1,
            title: 'Encryption Basics',
            content: 'Learn how encryption protects your data and communications.',
            quiz_questions: [
              {
                question: 'What does encryption do?',
                options: ['Slows down your computer', 'Protects data privacy', 'Increases file size', 'Deletes files'],
                correct_answer: 1
              }
            ]
          }
        ],
        creator_id: users[1]._id
      }
    ]);
    console.log(`${courses.length} courses created`);

    // Seed Security Tips
    const tips = await SecurityTip.create([
      {
        title: 'Enable Two-Factor Authentication',
        category: 'password_security',
        tip: 'Always enable 2FA on important accounts like email and social media to add an extra security layer.',
        severity: 'important',
        risk_level: 'high'
      },
      {
        title: 'Verify URLs Before Clicking',
        category: 'phishing',
        tip: 'Check that URLs match the official website domain before entering credentials or sensitive information.',
        severity: 'important',
        risk_level: 'high'
      },
      {
        title: 'Update Your Software Regularly',
        category: 'malware',
        tip: 'Keep your operating system, browsers, and applications updated to protect against known vulnerabilities.',
        severity: 'critical',
        risk_level: 'high'
      },
      {
        title: 'Use Privacy Settings on Social Media',
        category: 'privacy',
        tip: 'Configure your privacy settings to limit who can see your posts and personal information.',
        severity: 'important',
        risk_level: 'medium'
      }
    ]);
    console.log(`${tips.length} security tips created`);

    // Seed Support Resources
    const supportResources = await SupportResource.create([
      {
        name: 'National Cyberbullying Helpline',
        description: 'Free, confidential support for cyberbullying victims and those affected by online harassment.',
        type: 'helpline',
        contact_info: {
          phone: '1-800-CYBER-911',
          email: 'support@cyberbullyinghelp.org',
          website: 'https://cyberbullyinghelp.org'
        },
        availability: '24/7',
        languages: ['English', 'Spanish', 'French'],
        serving_regions: ['USA', 'Canada', 'UK']
      },
      {
        name: 'Digital Safety Counseling',
        description: 'Professional counseling services for those experiencing digital violence or online trauma.',
        type: 'counseling',
        contact_info: {
          phone: '1-800-DIGITAL',
          website: 'https://digitalsafetycounseling.org'
        },
        availability: 'business_hours',
        languages: ['English'],
        serving_regions: ['USA']
      },
      {
        name: 'Legal Rights Organization',
        description: 'Free legal advice and resources for victims of cybercrime and online harassment.',
        type: 'legal_aid',
        contact_info: {
          email: 'legal@legalrights.org',
          website: 'https://legalrights.org'
        },
        availability: 'scheduled',
        languages: ['English', 'Spanish'],
        serving_regions: ['USA', 'Canada']
      }
    ]);
    console.log(`${supportResources.length} support resources created`);

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
