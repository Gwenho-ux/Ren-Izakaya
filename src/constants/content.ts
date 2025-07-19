export const CONTENT = {
  header: {
    title: 'Why Am I Here?',
  },
  main: {
    description: 'Mm... Another hungry soul craving answers in neon fog. Starved for food... or just for truth?',
    buttonText: 'Enter With Wonders',
  },
  modals: {
    whyAmIHere: {
      title: 'Why am I here',
      content: `You've wandered into a place that doesn't show up on maps. A bar that only appears when your soul's too loud to ignore. This is the Izakaya Between Worlds. Sit down. Ask something real.`
    },
    whoAreYou: {
      title: 'Who Are You',
      content: `Just someone who listens.
A cook, a keeper of questions, a man who's watched stars burn out and people do the same.
You can call me Ren. I won't promise answers — but I will give you something warm to carry with you.`
    },
    whatShouldIDo: {
      title: 'What Should I do',
      content: `How to Use This Place

Ask your question.
Anything burning inside you — love, work, luck, or that weird dream you keep having.

Let me cook.
While I prepare your answer, keep your eyes on the steam. Some say it shows your soul...

Receive your dish.
Your fate comes as food. Each one has flavor, temperature, and rarity — just like you.

Read your fortune.
Not every answer is sweet. But every one is true, in its own twisted way.

Share if you dare. Some dishes belong in the spotlight. Some… should stay secrets.`
    },
    breakYourCycle: {
      title: 'Break Your Cycle',
      content: `Demo pop-up only:
This page can redirect user to any destination, eg, ask people to join event, play games etc.`
    }
  },
  wonders: {
    quote: '"Another lost soul seeking for nourishment or knowledge? My counter serves both."',
    quickActions: [
      'Who Are You?',
      'What To Do?'
    ],
    inputPlaceholder: 'Or.. Enter your question',
    whisperButton: 'Whisper To Ren',
    backButton: '← Back'
  },
  result: {
    rensAnswer: "Ren's Answer",
    hereIsWhat: "Here's what I got you...",
    attributes: 'Attributes',
    breakCycle: 'Break Your Cycle',
    shareFate: 'Share Your Fate'
  }
} as const; 