GSB Community Landing Page - Complete Documentation 
Table of Contents 
1. Project Overview 
2. Tech Stack 
3. Folder Structure 
4. Local Development 
5. Git Setup 
6. Vercel Deployment 
7. Live Site Features 
8. Future Updates 
9. Troubleshooting 
Project Overview 
GSB Community Landing Page is a React-based single-page application built with 
Create React App (CRA). It showcases community information, temples, events, and 
engagement opportunities for the GSB (Gaud Saraswat Brahmin) community. 
Purpose: Information portal with navigation to community details, temple locations, 
events, and contact forms. 
Tech Stack 
text 
Frontend: React.js + Create React App 
Styling: CSS Modules/SCSS 
Build Tool: react-scripts (CRA) 
Deployment: Vercel (Global CDN) 
Version Control: Git + GitHub 
Images: Optimized PNG/JPEG assets 
Folder Structure 
text 
gsb-community/ 
├── public/         
├── src/ 
 # Static assets (favicon, public index.html) 
│   ├── assets/images/     # Community/temple photos (lord.png, FCK.jpeg) 
│   ├── components/       
│   ├── data/              
 # Reusable UI (Navbar.js, Hero.js, Footer.js) 
# Static data (communities.js, temples.js) 
│   ├── pages/            
│   ├── App.js             
│   └── index.js          
├── package.json           
├── .gitignore            
└── build/                 
 # Page components (Home.js, About.js, Community.js) 
# Main app router/container 
 # Entry point 
# Dependencies + scripts 
 # Excludes build/, node_modules/ 
# GENERATED: Don't commit (Vercel rebuilds) 
Local Development 
Prerequisites 
• Node.js 16+ (node --version) 
• npm/yarn (npm --version) 
Setup Commands 
bash 
# 1. Clone/Fork repo 
git clone https://github.com/yourusername/gsb-community.git 
cd gsb-community 
# 2. Install dependencies 
npm install 
# 3. Run development server 
npm start 
Live at: http://localhost:3000 
Build for Production 
bash 
npm run build 
Creates optimized build/ folder for deployment. 
Git Setup 
1. Initialize Repository 
bash 
# In project root (D:\gsb-community) 
git init 
2. Create .gitignore 
text 
# Dependencies 
node_modules/ 
# Build output 
build/ 
# Environment 
.env 
.env.local 
# IDE 
.vscode/ 
.idea/ 
3. First Commit 
bash 
git add . 
git commit -m "Initial commit: GSB Community landing page" 
4. Push to GitHub 
bash 
# Create repo on github.com (gsb-community) 
git remote add origin https://github.com/yourusername/gsb-community.git 
git branch -M main 
git push -u origin main 
Vercel Deployment 
Prerequisites 
bash 
npm install -g vercel 
One-Time Deploy (CLI) 
bash 
cd gsb-community 
vercel login          
vercel               
# Browser authentication 
# Interactive prompts 
CLI Prompts & Answers: 
text 
? Link to existing project? → No 
? What's your project's name? → gsb-community 
? In which directory is your code located? → ./ (Enter) 
? Want to modify project settings? → No 
? Want to add another project setting? → No 
What Vercel Does Automatically 
text 
1. Detects: Create React App framework 
2. Installs: npm ci (clean dependencies) 
3. Builds: npm run build → static files 
4. Optimizes: Images + code splitting 
5. Deploys: Global CDN (35+ locations) 
6. Secures: Automatic HTTPS 
Result 
text 
   Production: https://gsb-community-[random].vercel.app 
   Preview URLs for branches/PRs 
   Auto-deploys on git push 
  Live Site Features 
Pages & Components 
text 
   Home (Hero + NewsTicker) 
   About / Our Story 
   Community List → Detail pages 
   Temples List → Detail pages 
   Events 
   Gallery (Image showcase) 
   Get Involved (CTA forms) 
   News 
   Contact 
   Responsive Navbar + Footer 
Assets Included 
text 
         Images: lord.png, FCK.jpeg, KIFA.jpeg, SNYS.jpg, SVNM.jpeg, SVS.jpeg 
      Data: communities.js, temples.js 
      Styling: CSS modules per page 
       Future Updates Workflow 
bash 
# 1. Edit files (Navbar.js, Hero.js, etc.) 
# 2. Commit changes 
git add . 
git commit -m "Updated hero section with new CTA" 
# 3. Push → Auto-deploy! 
git push 
Live in 30 seconds! No manual redeploy needed. 
  Production Benefits (Vercel) 
text 
   Global CDN: <50ms worldwide 
   Free SSL certificate 
   100GB bandwidth/month (free tier) 
   Unlimited deploys 
   Preview branches/PRs 
   Analytics dashboard 
   Custom domain support 
   Zero server management 
    Troubleshooting 
Common Issues & Fixes 
text 
  "git not recognized" 
→ Install Git: git-scm.com/download/win 
 
  Build fails 
→ Run locally: npm run build 
→ Check package.json scripts 
 
  Images not loading 
→ Verify paths in src/assets/ 
→ Check build/static/media/ 
Deploy fails 
→ vercel logs [deployment-id] 
→ Check dashboard Build Logs tab 
Local vs Production Debug 
bash 
# Test production build locally 
npm install -g serve 
npx serve -s build 
Next Steps 
text 
1. Custom domain: vercel.com → Settings → Domains 
2. Analytics: Enable in dashboard 
3. Add backend: /api folder + vercel.json 
4. Environment vars: Dashboard → Settings → Environment Variables 
5. Team access: vercel.com → Invitations 
