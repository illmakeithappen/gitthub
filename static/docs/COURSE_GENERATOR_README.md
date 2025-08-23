# AI Course Generator - Setup & Troubleshooting Guide

## 🚀 Quick Start

### Prerequisites
- Python 3.9 or higher
- Node.js 16 or higher
- pip3 and npm installed

### Installation & Running

1. **Make scripts executable:**
```bash
chmod +x start.sh start_backend.sh start_frontend.sh
chmod +x backend/test_course_generator.py
```

2. **Run the application:**

**Option A: Use the startup script (Recommended)**
```bash
./start.sh
```

**Option B: Run manually in two terminals**

Terminal 1 (Backend):
```bash
cd backend
pip3 install -r requirements.txt
python3 -m uvicorn api:app --reload --port 8001
```

Terminal 2 (Frontend):
```bash
cd frontend
npm install
npm run dev
```

3. **Access the application:**
- Frontend: http://localhost:3000
- API Docs: http://localhost:8001/docs
- Course Generator: http://localhost:3000/course-generator

## 🧪 Testing Course Generation

Run the test script to verify everything works:
```bash
cd backend
python3 test_course_generator.py
```

## 🔧 Troubleshooting

### Issue: "Course generation gets stuck in a loop"

**Solution:** The issue has been fixed. The course generator now uses template-based generation that works without external APIs.

### Issue: "Module not found" errors

**Solution:** Install missing dependencies:
```bash
cd backend
pip3 install fastapi uvicorn pydantic aiofiles pandas openpyxl python-multipart
```

### Issue: "Database error"

**Solution:** Create the data directory:
```bash
cd backend
mkdir -p data
```

### Issue: "CORS error in browser"

**Solution:** The backend is configured to accept requests from localhost:3000. Make sure you're accessing the frontend from http://localhost:3000 (not 127.0.0.1 or another port).

### Issue: "Port already in use"

**Solution:** Kill the process using the port:
```bash
# For port 8001 (backend)
lsof -ti:8001 | xargs kill -9

# For port 3000 (frontend)  
lsof -ti:3000 | xargs kill -9
```

## 📝 How Course Generation Works

When you click "Generate Course", the system:

1. **Validates Input**: Checks that you've entered a topic
2. **Creates Course Structure**: Generates modules based on duration and level
3. **Generates Content**: Creates sections, activities, and assessments for each module
4. **Links Resources**: Connects relevant Data Bank resources (if enabled)
5. **Saves to Database**: Stores the course in SQLite database
6. **Returns Course**: Displays the generated course with all modules

### Current Implementation
- ✅ Template-based generation (works without API keys)
- ✅ Generates 4-8 modules based on duration
- ✅ Creates 3 content sections per module
- ✅ Includes activities and assessments
- ✅ Links to Data Bank resources
- ✅ Saves courses to database

### With OpenAI API (Optional Enhancement)
To enable AI-powered generation:

1. Get an OpenAI API key from https://platform.openai.com
2. Create `.env` file:
```bash
echo "OPENAI_API_KEY=your-key-here" > backend/.env
```
3. Update `course_generator.py`:
```python
self.use_ai = True  # Line 19
```

## 📊 Course Structure Example

Generated courses include:
```
Course: Complete Python Programming Beginner Course
├── Module 1: Introduction to Python Programming
│   ├── Understanding Introduction to Python Programming (20 min)
│   ├── Practical Examples (30 min)
│   ├── Interactive Practice (40 min)
│   ├── Hands-on Project (45 min)
│   └── Module Assessment (5 questions)
├── Module 2: Core Concepts of Python Programming
│   └── ... (similar structure)
├── Module 3: Practical Applications
│   └── ... (similar structure)
└── Module 4: Building Your First Project
    └── ... (similar structure)
```

## 🎯 Features Working

- ✅ Course generation with custom topics
- ✅ Multiple difficulty levels (Beginner, Intermediate, Advanced)
- ✅ Flexible duration (weeks or hours)
- ✅ Optional assessments and projects
- ✅ Data Bank resource integration
- ✅ Course viewing interface
- ✅ Export to HTML, Markdown, JSON
- ✅ Embed code generation
- ✅ Course library browsing

## 📚 API Endpoints

- `POST /api/courses/generate` - Generate a new course
- `GET /api/courses/{course_id}` - Get course details
- `GET /api/courses` - List all courses
- `POST /api/courses/search` - Search courses
- `POST /api/courses/{course_id}/export` - Export course
- `GET /api/courses/{course_id}/embed` - Get embed code

## 💡 Tips

1. **Start with simple topics** like "Python Basics" or "Web Development"
2. **Choose appropriate duration**: 4 weeks for comprehensive, 10 hours for quick
3. **Enable Data Bank resources** for richer content
4. **Include assessments** for better learning outcomes
5. **Export courses** for offline use or sharing

## 🐛 Debug Mode

To see detailed logs:

Backend:
```bash
cd backend
python3 -m uvicorn api:app --reload --port 8001 --log-level debug
```

Frontend:
Check browser console (F12) for detailed error messages.

## 📧 Support

If you encounter issues not covered here:
1. Check the browser console for errors
2. Check the backend terminal for Python errors
3. Run the test script to verify basic functionality
4. Review the generated course structure in the database

The course generator is now fully functional and ready to use!
