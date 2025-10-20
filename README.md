
## 💔 AI Breakup Recovery Companion

**Transform emotional distress into actionable recovery steps using Gemini 2.0 Flash with Multi-Agent Parallel Processing**

A high-performance Next.js application featuring AI-powered emotional support, personalized recovery plans, therapeutic guidance, and multimodal analysis with revolutionary parallel agent coordination for comprehensive healing.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8) ![Gemini AI](https://img.shields.io/badge/Gemini-2.0%20Flash-4285f4)

---

## ✨ Features

### 🔥 Multi-Agent Parallel Processing - The Game Changer

- **4 AI Specialists Working Simultaneously** - All agents analyze your situation at once
- **Zero Sequential Delays** - Parallel execution with `Promise.all()` for maximum speed
- **Comprehensive Perspectives** - Multiple expert viewpoints in one coordinated response
- **Team Leader Synthesis** - Final AI coordinator combines all insights coherently

### 💬 AI-Powered Emotional Support

- **🧠 Therapist Agent** - Empathetic listening, validation, and gentle humor
- **💌 Closure Agent** - Drafts cathartic unsent messages for emotional release
- **📅 Routine Planner Agent** - 7-day recovery challenges with practical steps
- **🔥 Brutal Honesty Agent** - Direct, objective feedback without sugar-coating
- **⭐ Team Leader** - Synthesizes all insights into actionable guidance

### 🎨 Modern User Experience

- **🌙 Dark Mode First** - Beautiful glassmorphism UI with energetic gradients
- **📱 Mobile Optimized** - Responsive design for all screen sizes
- **⚡ Real-Time Processing** - Lightning-fast Gemini 2.0 Flash analysis
- **🖼️ Multimodal Input** - Text feelings + optional chat screenshot analysis

---

## ⚙️ Configuration

### Gemini API Setup

1. **Get API key** from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **The project comes pre-configured** with an API key
3. **To use your own key**, edit `.env.local`:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

### Environment Configuration

The application automatically configures based on your API key:

- **Model**: Gemini 2.0 Flash (optimized for speed and multimodal input)
- **Features**: Multimodal processing, parallel execution, image analysis
- **API Endpoint**: Latest Gemini v1beta endpoint

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **Gemini API key** (Demo included in `.env.local`)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

**Visit http://localhost:3000**

---

## 📖 Usage

### Recovery Journey Navigation

#### 1. **Input Screen**

- **Share your feelings** in the large text area
- **Upload chat screenshot** (optional) - drag & drop or click to browse
- File validation ensures only PNG/JPG/JPEG accepted
- Click **"🚀 Start Recovery Journey"** to begin AI analysis

#### 2. **Processing Phase**

- Beautiful loading animation with agent coordination visual
- All 4 agents analyze simultaneously (parallel processing)
- Team Leader synthesizes results
- Average processing time: 10-15 seconds

#### 3. **Results Dashboard**

- **Team Leader Summary Card** 
  - Comprehensive synthesis at the top
  - Balances empathy with practical action
  - Clear path forward with empowering message

- **Specialist Reports**
  - 4 expandable cards (click to view details)
  - Each agent's unique perspective
  - Color-coded by specialty:
    - 🧠 Blue/Cyan - Therapist (empathy)
    - 💌 Purple/Pink - Closure (emotional release)
    - 📅 Green/Emerald - Routine Planner (action steps)
    - 🔥 Red/Orange - Brutal Honesty (reality check)

#### 4. **Interactive Features**

- **Expandable Agent Cards** - Click any card to read full analysis
- **Multimodal Context** - Screenshot analysis integrated into all responses
- **New Session Button** - Reset to start fresh recovery journey

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router & Turbopack |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling with custom animations |
| **Gemini 2.0 Flash** | Multimodal AI model with parallel processing |
| **FileReader API** | Client-side image to Base64 conversion |
| **React Hooks** | State management and lifecycle handling |

---

## 🔑 Technical Deep Dive

### 🎯 Parallel Multi-Agent System Implementation

**The Revolutionary Pattern:**

```typescript
// All agents execute simultaneously
const [therapist, closure, routine, honesty] = await Promise.all([
  runSingleAgent('therapist', userFeelings, imageBase64),
  runSingleAgent('closure', userFeelings, imageBase64),
  runSingleAgent('routine', userFeelings, imageBase64),
  runSingleAgent('honesty', userFeelings, imageBase64),
]);

// Then synthesize with Team Leader
const teamSummary = await runTeamLeader(agentResults, userFeelings);
```

**Why This Matters:**

| Traditional Approach | Parallel Agent Approach ✨ |
|---------------------|---------------------------|
| Sequential processing (slow) | Parallel execution (4x faster) |
| Single perspective | 4 expert viewpoints |
| Generic responses | Specialized, coordinated advice |
| No synthesis | Team Leader coordination |

**Benefits:**

- ⚡ **Speed**: 4x faster than sequential processing
- 🎯 **Depth**: Multiple specialized perspectives
- 🔄 **Synthesis**: Coordinated, non-contradictory advice
- 💪 **Reliability**: Redundancy and cross-validation

### 🖼️ Multimodal Analysis

**Image Processing Pipeline:**

1. **Client-side conversion** - FileReader API converts to Base64
2. **MIME type extraction** - Dynamic type handling (PNG/JPG/JPEG)
3. **API integration** - Sent with `inlineData` structure
4. **Context grounding** - All agents analyze chat screenshot with text

```typescript
// Multimodal request structure
{
  parts: [
    { text: userFeelings },
    { inlineData: { mimeType: 'image/jpeg', data: base64Data } }
  ]
}
```

### 🏗️ Clean MVC Architecture

```
src/
├── app/
│   ├── page.tsx                # Main view (controller integration)
│   ├── layout.tsx              # App wrapper
│   └── globals.css             # Custom animations
├── components/                 # View layer
│   ├── InputCard.tsx           # User input interface
│   ├── LoadingScreen.tsx       # Processing state
│   ├── AgentCard.tsx           # Individual agent display
│   └── ResultsDashboard.tsx    # Results presentation
├── controllers/
│   └── agentController.ts      # Agent orchestration logic
├── services/
│   └── geminiService.ts        # API abstraction layer
├── utils/
│   └── imageUtils.ts           # Image processing utilities
├── types/
│   └── index.ts                # TypeScript interfaces
└── constants/
    └── agents.ts               # Agent configurations
```

---

## 🎓 Use Cases

**Perfect for:**

- 💔 **Heartbreak Recovery**: Process emotions with multiple therapeutic approaches
- 🗣️ **Emotional Validation**: Get empathy AND honest feedback simultaneously
- 📝 **Closure Writing**: Draft unsent letters with AI guidance
- 📅 **Recovery Planning**: Structured 7-day challenges for moving forward
- 🖼️ **Chat Analysis**: Understand relationship patterns from message history
- 🧘 **Self-Discovery**: Gain multiple perspectives on your situation

---

## 🤝 Why This Implementation Stands Out

### Innovation Highlights

#### 🔥 True Multi-Agent Coordination

- **Not single-agent**: 4 specialized AIs + 1 coordinator
- **Not sequential**: Parallel execution for speed
- **Not isolated**: Team Leader synthesizes all perspectives

#### 🎯 Gemini 2.0 Flash Optimization

- Leverages multimodal capabilities for screenshot analysis
- Fast inference times for real-time user experience
- System instructions create distinct agent personalities

#### 🏗️ Production-Ready Architecture

- **MVC pattern** for maintainability
- **Service layer** abstracts API complexity
- **Type-safe** throughout with TypeScript
- **Error handling** at every layer

#### 🎨 Exceptional User Experience

- Not a prototype - **fully polished interface**
- **Responsive design** tested across devices
- **Accessibility** considerations built-in
- **Energetic, uplifting** color scheme

---

## 👨‍💻 Developer

**IHEB BEN DHAOU**

- 🔗 [LinkedIn](https://linkedin.com/in/iheb-ben-dhaou)
- 🌐 [Portfolio](https://iheb-portfolio.com)

---

## 📄 License

This project is open source and available under the MIT License.

---

## ⚠️ Important Disclaimer

**This is a supportive AI tool and should not replace professional mental health services.**

If you're experiencing severe emotional distress, please seek help from a qualified mental health professional.

- 🇺🇸 **US Crisis Hotline**: 988 (Suicide & Crisis Lifeline)
- 🌍 **International**: [Find Help](https://findahelpline.com)

---

- Inspired by the need for accessible emotional support technology

---

**⭐ Star this repo if it helped you heal!**

