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

export const moods = [
  { id: "neutral", label: "Okay", icon: require("../../../assets/icons/okay.png") },
  { id: "happy", label: "Good", icon: require("../../../assets/icons/good.png") },
  { id: "excited", label: "Great", icon: require("../../../assets/icons/great.png") },
  { id: "sad", label: "Sad", icon: require("../../../assets/icons/sad.png") },
  { id: "angry", label: "Angry", icon: require("../../../assets/icons/angry.png") },
];


export const reasons = [
  { id: "me", label: "Me", icon: require("../../../assets/reasons/me.png") },
  { id: "partner", label: "Partner", icon: require("../../../assets/reasons/partner.png") },
  { id: "family", label: "Family", icon: require("../../../assets/reasons/family.png") },
  { id: "friends", label: "Friends", icon: require("../../../assets/reasons/friends.png") },
  { id: "study", label: "Study", icon: require("../../../assets/reasons/study.png") },
  { id: "work", label: "Work", icon: require("../../../assets/reasons/work.png") },
  { id: "health", label: "Health", icon: require("../../../assets/reasons/health.png") },
  { id: "other", label: "Other", icon: require("../../../assets/png/star.png") },
];