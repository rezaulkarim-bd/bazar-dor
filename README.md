# 🧺 বাজার দর (BazarDor) — Live Daily Market Price Portal

> **স্বচ্ছ বাজার দর, আপনার হাতের মুঠোয়!**  
> **BazarDor** is a modern, fast, and responsive web portal designed to track daily commodity prices across different markets in Bangladesh. Built with **Next.js 16 (App Router)** and **Tailwind CSS**, it empowers users to monitor price fluctuations, compare market-wise rates, and stay informed about daily essential goods.

---

## 🌟 Why BazarDor? (Unique Highlights)

Unlike generic price listing apps, **BazarDor** offers a real-time, data-driven experience with zero friction:
* ⚡ **Instant Price Analytics:** Real-time percentage shifts and direction indicators (▲ Up / ▼ Down) for every product.
* 🏬 **Multi-Market Comparison:** Aggregated minimum, maximum, and average rates across major national markets.
* 🛡️ **Modern Security:** Powered by **BetterAuth** with MongoDB session persistence for smooth sign-ins.
* 📱 **Pixel-Perfect Responsive UI:** Fully tailored for mobile, tablet, and desktop viewports with zero layout shifts.

---

## 🛠️ Technologies Used

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router with Cache Directives) |
| **Language** | JavaScript (ES6+) / React 19 |
| **Styling & UI** | Tailwind CSS, HeroUI Components |
| **Authentication** | BetterAuth (Email & Social OAuth: Google & GitHub) |
| **Database** | MongoDB (via `@better-auth/mongo-adapter`) |
| **Data Source** | Programming Hero Bazar API |
| **Notifications** | React Hot Toast |

---

## ✨ 5 Key Features

1. **📊 Live Price Tracker & Ticker (আজকের বাজার দর)**
   * Interactive marquee ticker at the top providing real-time commodity updates.
   * Highlighted sections for daily top risers (▲) and top fallers (▼).

2. **🏷️ Dynamic Category Explorer & Instant Sorting**
   * Filter products seamlessly by category (চাল, ডাল, সবজি, মাছ, মাংস, ইত্যাদি).
   * Client-side price sorting (**ডিফল্ট**, **কম থেকে বেশি**, **বেশি থেকে কম**) without page reloads.

3. **🔍 Comprehensive Product Detail Page (`/product/[slug]`)**
   * Detailed price summary: **Minimum**, **Maximum**, and **Average** rate calculations per unit.
   * Full breakdown table listing division-wise market prices across Bangladesh.

4. **🔐 Next-Gen Authentication Flow**
   * Secure Email/Password registration along with one-click **Google** and **GitHub** social logins.
   * Interactive profile management with live session state (`authClient`).

5. **⚡ Lightning Fast & Fully Responsive**
   * Built on Next.js 16 with optimized caching strategies (`cacheLife`) for near-instant rendering.
   * Adaptive grid system ensuring seamless mobile, tablet, and desktop UX.

---

## 🚀 Getting Started Locally

Follow these steps to set up the project on your machine:

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/bazar-dor.git](https://github.com/YOUR_USERNAME/bazar-dor.git)
cd bazar-dor
