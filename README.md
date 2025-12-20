<div align="center">
  <h1>🧠⚡ Brain Bounce</h1>
  <p><strong>Where Ideas Take Flight</strong></p>
  <p>Share early-stage ideas, get crystal-clear feedback, and iterate faster with Brain Bounce — the collaborative ideation platform built for innovators.</p>

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Convex](https://img.shields.io/badge/Convex-Backend-FF6B6B?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)

</div>

---

## 🎯 What is Brain Bounce?

Brain Bounce is a modern ideation platform designed to help individuals and teams share early-stage concepts, gather meaningful feedback, and refine their thinking through collaborative discussion. Whether you're brainstorming a product feature, exploring a business idea, or seeking creative input, Brain Bounce provides the perfect space to "bounce" your ideas off others.

### 💡 Why Brain Bounce?

- **Low Barrier to Entry**: Share half-baked ideas without judgment
- **Focused Feedback**: Get clear, constructive comments from your peers
- **Real-Time Collaboration**: See who's engaging with your ideas in real-time
- **Discover & Explore**: Search and browse a growing library of innovative concepts
- **Visual Storytelling**: Enhance your bounces with images to communicate better

---

## ✨ Features

### 🚀 Current Features

#### Core Functionality

- **🎨 Create Bounces**: Post your ideas with titles, detailed descriptions, and supporting images
- **📋 Browse All Bounces**: Explore a beautifully designed grid of ideas from the community
- **🔍 Global Search** _(NEW)_: Instantly search across all bounces by title or content
- **💬 Comment System**: Engage in threaded discussions with detailed feedback
- **👀 Real-Time Presence**: See who's currently viewing each bounce
- **🖼️ Image Uploads**: Upload and attach images to give your ideas visual context

#### User Experience

- **🔐 Secure Authentication**: Email/password authentication powered by Better Auth
- **🌓 Dark/Light Mode**: Seamless theme switching for comfortable viewing
- **📱 Fully Responsive**: Optimized experience across desktop, tablet, and mobile
- **⚡ Lightning Fast**: Server-side rendering with Next.js 16 App Router
- **🎭 Beautiful UI**: Modern design with Radix UI components and smooth animations

#### Technical Excellence

- **🔄 Real-Time Updates**: Convex backend ensures instant data synchronization
- **✅ Form Validation**: Client-side validation with Zod schemas
- **🎪 Loading States**: Skeleton screens and optimistic UI updates
- **🖼️ Optimized Images**: Next.js Image component for performance
- **📊 Type Safety**: Full TypeScript coverage across the stack

---

## 🛣️ Roadmap & Future Features

### 🎯 Phase 1: Enhanced Collaboration (Coming Soon)

- [ ] **Voting System**: Upvote/downvote bounces and comments
- [ ] **Bounce Categories**: Organize ideas by topics (Tech, Business, Creative, etc.)
- [ ] **User Profiles**: Customizable profiles showcasing your bounces and activity
- [ ] **Follow System**: Follow users and get notified of their new bounces
- [ ] **Notifications**: Real-time alerts for comments, votes, and mentions

### 🎯 Phase 2: Advanced Features

- [ ] **Rich Text Editor**: Enhanced formatting with markdown support
- [ ] **Collaborative Editing**: Multiple users can contribute to a bounce
- [ ] **Version History**: Track how ideas evolve over time
- [ ] **Export Options**: Download bounces as PDF or Markdown
- [ ] **Analytics Dashboard**: Insights on your bounce performance

### 🎯 Phase 3: Community & Growth

- [ ] **Social Authentication**: Sign in with Google, GitHub, and more
- [ ] **Email Notifications**: Digest emails and activity summaries
- [ ] **Tags & Filters**: Advanced search with filtering capabilities
- [ ] **Public/Private Bounces**: Control visibility of your ideas
- [ ] **Teams & Workspaces**: Collaborate within private groups
- [ ] **API Access**: Integrate Brain Bounce with external tools

### 🎯 Phase 4: Enterprise & Scale

- [ ] **AI-Powered Suggestions**: Get smart recommendations and insights
- [ ] **Integration Ecosystem**: Connect with Slack, Discord, Notion, etc.
- [ ] **Custom Branding**: White-label options for organizations
- [ ] **Advanced Moderation**: AI-assisted content moderation
- [ ] **Analytics API**: Programmatic access to bounce metrics

---

## 🛠️ Tech Stack

### Frontend

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - Schema validation

### Backend & Infrastructure

- **[Convex](https://convex.dev/)** - Real-time backend platform
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication
- **[@convex-dev/presence](https://www.npmjs.com/package/@convex-dev/presence)** - Real-time presence tracking
- **Convex Storage** - File storage and CDN

### Developer Experience

- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Class name utilities

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** (recommended) or npm
- **Convex Account** - Sign up at [convex.dev](https://convex.dev)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Dev-muse/brain-bounce.git
   cd brain-bounce
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up Convex**

   ```bash
   npx convex dev
   ```

   This will:

   - Create a new Convex project (if needed)
   - Generate your `.env.local` file with `CONVEX_DEPLOYMENT`
   - Start the Convex dev server

4. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   CONVEX_DEPLOYMENT=your-deployment-url
   NEXT_PUBLIC_CONVEX_URL=your-convex-url
   SITE_URL=http://localhost:3000
   CONVEX_SITE_URL=http://localhost:3000
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### 🎬 First Steps

1. **Sign Up**: Create your account at `/auth/sign-up`
2. **Create Your First Bounce**: Navigate to `/create` and share an idea
3. **Explore**: Browse existing bounces at `/bounces`
4. **Search**: Try the new global search feature in the navbar
5. **Engage**: Comment on bounces and see real-time presence

---

## 📁 Project Structure

```
brain-bounce/
├── app/                          # Next.js App Router
│   ├── (shared)/                 # Shared layout routes
│   │   ├── bounces/              # Bounces pages
│   │   │   ├── [bounceId]/       # Individual bounce detail
│   │   │   └── page.tsx          # Bounces list
│   │   ├── create/               # Create bounce page
│   │   └── page.tsx              # Home page
│   ├── auth/                     # Authentication pages
│   │   ├── login/                # Login page
│   │   └── sign-up/              # Sign up page
│   ├── api/                      # API routes
│   ├── schemas/                  # Zod validation schemas
│   └── actions.ts                # Server actions
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   └── web/                      # Feature-specific components
│       ├── CommentSection.tsx    # Comments UI
│       ├── Navbar.tsx            # Navigation bar
│       ├── PostPresence.tsx      # Real-time presence
│       └── SearchInput.tsx       # Global search
├── convex/                       # Convex backend
│   ├── schema.ts                 # Database schema
│   ├── posts.ts                  # Posts queries/mutations
│   ├── comments.ts               # Comments logic
│   ├── presence.ts               # Presence tracking
│   └── auth.ts                   # Auth configuration
├── lib/                          # Utility functions
│   ├── auth-client.ts            # Client-side auth
│   ├── auth-server.ts            # Server-side auth
│   └── utils.ts                  # Helper functions
└── public/                       # Static assets
```

---

## 🧪 Development

### Available Scripts

```bash
# Development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Run Convex functions locally
npx convex dev
```

### Database Schema

Brain Bounce uses Convex with the following schema:

**Posts Table**

- `title`: string
- `content`: string
- `authorId`: string
- `imageStorageId`: optional storage ID
- Search indexes on `title` and `content`

**Comments Table**

- `authorId`: string
- `authorName`: string
- `postId`: reference to posts
- `body`: string

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's a bug report, feature request, or pull request, every contribution helps make Brain Bounce better.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features when applicable
- Update documentation as needed
- Be respectful and constructive in discussions

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Rahman Muse**

- GitHub: [@Dev-muse](https://github.com/Dev-muse)
- Project: [Brain Bounce](https://github.com/Dev-muse/brain-bounce)

---

## 🙏 Acknowledgments

- Built with ❤️ using [Next.js](https://nextjs.org/)
- Backend powered by [Convex](https://convex.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Dev-muse/brain-bounce/issues) page
2. Create a new issue with a detailed description
3. Join discussions in the community

---

<div align="center">
  <p>Made with 🧠 and ⚡ by the Brain Bounce community</p>
  <p>
    <a href="https://github.com/Dev-muse/brain-bounce">⭐ Star us on GitHub</a> •
    <a href="https://github.com/Dev-muse/brain-bounce/issues">🐛 Report Bug</a> •
    <a href="https://github.com/Dev-muse/brain-bounce/issues">💡 Request Feature</a>
  </p>
</div>
