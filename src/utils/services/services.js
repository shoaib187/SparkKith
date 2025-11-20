export const getEmojiForTask = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();

  // Food & Drink
  if (text.includes('eat') || text.includes('food') || text.includes('apple') || text.includes('banana') || text.includes('saib')) return '🍎';
  if (text.includes('drink') || text.includes('water') || text.includes('juice')) return '🥤';
  if (text.includes('coffee') || text.includes('tea')) return '☕';

  // Sleep & Rest
  if (text.includes('sleep') || text.includes('nap') || text.includes('rest')) return '😴';
  if (text.includes('bedtime')) return '🛏️';

  // Exercise & Fitness
  if (text.includes('exercise') || text.includes('gym') || text.includes('workout') || text.includes('run') || text.includes('jog')) return '🏃‍♂️';
  if (text.includes('yoga') || text.includes('meditate') || text.includes('breath')) return '🧘‍♂️';
  if (text.includes('stretch')) return '🤸‍♂️';
  if (text.includes('dance')) return '💃';

  // Work & Study
  if (text.includes('study') || text.includes('read') || text.includes('homework') || text.includes('learn')) return '📚';
  if (text.includes('work') || text.includes('project') || text.includes('task') || text.includes('meeting')) return '👨🏻‍💻';
  if (text.includes('call') || text.includes('zoom')) return '📞';

  // Daily Life & Chores
  if (text.includes('clean') || text.includes('laundry') || text.includes('wash')) return '🧹';
  if (text.includes('shop') || text.includes('buy') || text.includes('grocery')) return '🛒';
  if (text.includes('cook') || text.includes('bake')) return '👩‍🍳';

  // Social & Entertainment
  if (text.includes('friends') || text.includes('hangout') || text.includes('party')) return '🎉';
  if (text.includes('movie') || text.includes('cinema') || text.includes('tv')) return '🎬';
  if (text.includes('game') || text.includes('play') || text.includes('gaming')) return '🎮';
  if (text.includes('music') || text.includes('song') || text.includes('sing')) return '🎵';

  // Moods & Feelings
  if (text.includes('happy') || text.includes('good') || text.includes('great')) return '😄';
  if (text.includes('sad') || text.includes('tired') || text.includes('down')) return '😢';
  if (text.includes('angry') || text.includes('frustrated')) return '😡';
  if (text.includes('love') || text.includes('romantic')) return '❤️';
  if (text.includes('stress') || text.includes('anxious')) return '😰';
  if (text.includes('relax') || text.includes('chill')) return '😌';

  // Misc / Default
  return '🔥';
};





export const taskSuggestion = [
  { "title": "Morning Energy Boost", "description": "Start your day with 15 minutes of light cardio and dynamic stretching.", "emoji": "☀️" },
  { "title": "Core Strength Fundamentals", "description": "Build a strong foundation with basic core exercises like planks and crunches.", "emoji": "💪" },
  { "title": "Lunchtime Mobility Flow", "description": "Release tension from morning work with 10 minutes of full-body mobility exercises.", "emoji": "🍱" },
  { "title": "Evening Stress Relief Yoga", "description": "Unwind with gentle yoga poses designed to calm your nervous system before bed.", "emoji": "🌙" },
  { "title": "Full Body Strength Circuit", "description": "Complete 3 rounds of compound exercises targeting all major muscle groups.", "emoji": "🏋️" },
  { "title": "Beginner's Running Guide", "description": "Learn proper running form and build endurance with interval walking/jogging.", "emoji": "🏃‍♂️" },
  { "title": "Desk Posture Correction", "description": "Simple exercises to counteract the effects of prolonged sitting and computer work.", "emoji": "🪑" },
  { "title": "High Intensity Interval Training", "description": "Short bursts of maximum effort followed by brief recovery periods for maximum calorie burn.", "emoji": "⚡" },
  { "title": "Flexibility Deep Dive", "description": "Focus on improving your range of motion through static and dynamic stretching.", "emoji": "🤸" },
  { "title": "Balance and Stability Work", "description": "Enhance your coordination and prevent injuries with balance-focused exercises.", "emoji": "🧘" },
  { "title": "Upper Body Sculpting", "description": "Target your arms, chest, and back with resistance training exercises.", "emoji": "💪" },
  { "title": "Lower Body Power", "description": "Build strong legs and glutes with squats, lunges, and deadlift variations.", "emoji": "🦵" },
  { "title": "Mindful Breathing Practice", "description": "Learn breathing techniques to reduce stress and improve mental clarity.", "emoji": "🌬️" },
  { "title": "Cardio Endurance Builder", "description": "Gradually increase your stamina with sustained moderate-intensity cardio.", "emoji": "❤️" },
  { "title": "Quick Office Recharge", "description": "5-minute energy boost exercises you can do at your desk without equipment.", "emoji": "⚡" },
  { "title": "Post-Workout Recovery", "description": "Essential stretching routine to aid muscle recovery and reduce soreness.", "emoji": "🛀" },
  { "title": "Bodyweight Basics", "description": "Master fundamental bodyweight exercises that require no equipment.", "emoji": "🤸‍♂️" },
  { "title": "Swimming for Fitness", "description": "Low-impact full-body workout that improves cardiovascular health and muscle tone.", "emoji": "🏊‍♂️" },
  { "title": "Cycling Endurance", "description": "Build leg strength and cardiovascular fitness through indoor or outdoor cycling.", "emoji": "🚴‍♀️" },
  { "title": "Pilates for Core Control", "description": "Develop deep core strength and improve posture through controlled movements.", "emoji": "🧘‍♀️" },
  { "title": "Jump Rope Cardio", "description": "High-intensity cardio workout that improves coordination and burns calories fast.", "emoji": "⛓️" },
  { "title": "Meditation for Beginners", "description": "Learn basic meditation techniques to reduce anxiety and improve focus.", "emoji": "🕯️" },
  { "title": "Functional Strength Training", "description": "Exercises that mimic everyday movements to make daily activities easier.", "emoji": "🏋️‍♀️" },
  { "title": "Kettlebell Fundamentals", "description": "Learn basic kettlebell swings and lifts for full-body conditioning.", "emoji": "🏋️‍♂️" },
  { "title": "Yoga for Back Pain", "description": "Gentle poses and stretches to alleviate lower back discomfort and improve spinal health.", "emoji": "🧘‍♂️" },
  { "title": "Tabata Sprint", "description": "20-second maximum effort intervals followed by 10-second rest periods for 4 minutes total.", "emoji": "⏱️" },
  { "title": "Posture Perfect Routine", "description": "Exercises specifically designed to correct rounded shoulders and forward head posture.", "emoji": "🪑" },
  { "title": "Dance Cardio Party", "description": "Fun, high-energy dance moves that don't feel like exercise but burn serious calories.", "emoji": "💃" },
  { "title": "Resistance Band Workout", "description": "Full-body strength training using portable resistance bands for travel-friendly workouts.", "emoji": "🟦" },
  { "title": "Mind-Body Connection", "description": "Practice being present in your body and mindful of your movement patterns.", "emoji": "🧘‍♂️" },
  { "title": "Park Bench Workout", "description": "Creative exercises using a park bench for dips, step-ups, and elevated push-ups.", "emoji": "🏞️" },
  { "title": "Pre-Workout Warmup", "description": "Essential dynamic stretches and activation exercises to prepare your body for exercise.", "emoji": "🔥" },
  { "title": "Sleep Quality Yoga", "description": "Restorative poses and breathing exercises to help you fall asleep faster and sleep deeper.", "emoji": "🛌" },
  { "title": "Ankle and Wrist Mobility", "description": "Improve joint health and prevent injuries in commonly neglected areas.", "emoji": "🦶🖐️" },
  { "title": "HIIT for Busy Schedules", "description": "15-minute maximum efficiency workout for when you're short on time but need results.", "emoji": "⏱️" },
  { "title": "Shoulder Stability", "description": "Strengthen the small stabilizer muscles around your shoulder joints for injury prevention.", "emoji": "🏋️‍♀️" },
  { "title": "Breathing for Performance", "description": "Learn how to use your breath to enhance athletic performance and endurance.", "emoji": "🌬️" },
  { "title": "Stair Master Challenge", "description": "Use stairs for an intense lower body and cardiovascular workout anywhere.", "emoji": "🪜" },
  { "title": "Flexibility for Runners", "description": "Specific stretches to improve running efficiency and prevent common running injuries.", "emoji": "🤸‍♀️" },
  { "title": "Core for Back Health", "description": "Strengthen your core to support your spine and reduce lower back pain.", "emoji": "💪" },
  { "title": "Quick Morning Mobility", "description": "5-minute routine to wake up your joints and muscles first thing in the morning.", "emoji": "☀️" },
  { "title": "Partner Exercises", "description": "Fun workout routines you can do with a friend for motivation and added resistance.", "emoji": "🤝" },
  { "title": "Forearm and Grip Strength", "description": "Build crushing grip strength and well-defined forearms with targeted exercises.", "emoji": "✊" },
  { "title": "Aqua Fitness", "description": "Low-impact exercises in water that are easy on joints but challenging for muscles.", "emoji": "💧" },
  { "title": "Postural Restoration", "description": "Correct muscle imbalances caused by modern lifestyle and repetitive movements.", "emoji": "🪑" },
  { "title": "Cardio Boxing", "description": "Learn basic boxing combinations for an intense full-body cardio workout.", "emoji": "🥊" },
  { "title": "Glute Activation", "description": "Wake up your glute muscles before lower body workouts for better performance and shape.", "emoji": "🍑" },
  { "title": "Balance Board Challenge", "description": "Improve your stability and core strength using a balance board or wobble cushion.", "emoji": "🛹" },
  { "title": "Cold Weather Warmup", "description": "Essential preparation exercises for safe and effective workouts in cold conditions.", "emoji": "❄️" },
  { "title": "Office Yoga Flow", "description": "Discreet yoga poses and stretches you can do in your office chair or cubicle.", "emoji": "🪑🧘" }
]
