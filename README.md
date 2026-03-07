# CivicLift — The Local Authority Triage Agent

CivicLift is an autonomous, conversational AI agent built for the **UK AI Agent Hackathon EP4**. It acts as a digital front door for civic and social services, instantly matching residents in need with local food banks, legal aid, and housing support.

## 🏆 Hackathon Alignment & Technologies Used

We built CivicLift from the ground up focusing on **production-readiness**, **live infrastructure integration**, and utilizing the sponsor's ecosystem to its fullest potential:

### 1. FLock.io Integration (`openclaw-plugin-flock`)
CivicLift uses **FLock.io's API Platform** for all of its intelligence. Instead of using generic providers, we're leveraging the official `openclaw-plugin-flock` to run inference via the highly capable `flock/deepseek-v3.2` model. This allows our agent to engage in fast, low-cost conversational reasoning and service retrieval.

### 2. OpenClaw Multi-Agent Framework
The entire agent architecture is driven by **OpenClaw (v2026.3.2)**. 
- Custom **Skills**: We developed bespoke TypeScript skills (`service_finder`, `eligibility_checker`, `plan_builder`).
- **Memory & Storage**: Integrates SQLite to log interactions, measure step completion, and track agent actions.
- **Telegram Integration**: CivicLift connects seamlessly to our live Telegram channel natively via the OpenClaw Gateway.

### 3. RouteBox Compatibility
CivicLift is architected to sit behind **RouteBox**—the intelligent LLM API proxy. In a production environment with heavy citizen traffic, RouteBox manages our traffic routing to FLock.io, providing real-time local monitoring, cost tracking, and automatic failovers if an endpoint goes down.

## 🚀 Try It Live!
You can chat with our live agent right now: **[Try CivicLift on Telegram](https://t.me/civilclift_bot)**

---

## 🛠️ How it Works

1. **User Distress Signal**: A resident messages the bot: *"I lost my job and rent is due. I'm in SW7 2AZ"*
2. **Agent Triage**: The OpenClaw orchestrator uses FLock inference to determine the category of need (Housing, Employment) and urgency level.
3. **Skill Execution (Service Finder)**: CivicLift scans the local database (`data/services.uk.london.json`) and matches the resident with immediate help based on their postcode.
4. **Skill Execution (Eligibility Checker)**: CivicLift analyzes the user's situation to suggest Universal Credit or local council crisis grants.
5. **Action Plan**: It delivers a structured 5-step action plan, including exact phone numbers to call, email scripts, and document checklists.

## 💻 Running the Frontend

The landing page (built with React/Vite/Tailwind) provides an overview of the CivicLift mission and a direct call to action to use the bot.

```sh
npm run dev
```

Visit the local server to explore the interface and impact metrics.

## 🌍 Sustainable Development Goals (SDGs)
CivicLift directly supports:
- **SDG 1**: No Poverty
- **SDG 3**: Good Health and Well-being
- **SDG 10**: Reduced Inequalities
- **SDG 11**: Sustainable Cities and Communities
