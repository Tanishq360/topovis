# 🎓 TopoVis - Interactive Topological Sorting Visualizer

A fully functional, interactive, and visually appealing web-based visualizer for understanding **Topological Sorting** in Directed Acyclic Graphs (DAGs).

Perfect for students, educators, and anyone learning graph algorithms!

## ✨ Features

### 🎯 Two Algorithm Implementations
- **Kahn's Algorithm (BFS)** - In-degree based removal approach
- **DFS-based Topological Sort** - Depth-first search with stack

### 🎨 Interactive Graph Editor
- Add, move, and delete nodes visually
- Draw directed edges with drag-and-drop
- Generate random valid DAGs
- Import/Export graphs as JSON
- Real-time in-degree calculation

### 🎬 Step-by-Step Animations
- Highlight current processing node
- Show in-degree updates in real-time
- Visualize algorithm progression
- Adjustable animation speed (0.5x - 3x)
- Manual step-through mode with **Back/Next buttons**
- **NEW:** Step backward to review previous steps!

### 📊 Visual Feedback
- **Color-coded node states:**
  - ⚪ Gray: Unvisited
  - 🟢 Green: Ready (in-degree = 0)
  - 🟡 Yellow: Currently processing
  - 🔵 Blue: Processed/completed
- Live in-degree badges on nodes
- Animated topological order display
- **NEW:** Real-time Queue/Stack visualization
- Enhanced algorithm execution log with color coding
- **NEW:** Queue and Stack state shown at each step

### 🔍 Educational Features
- Cycle detection with warnings
- Detailed algorithm descriptions
- **NEW:** Algorithm complexity information panel (O(V + E))
- **NEW:** 5 Pre-loaded example graphs (including cyclic)
- Step-by-step narration
- Help modal with instructions
- Perfect for learning and teaching
- **NEW:** Data structure visualization (Queue for Kahn's, Stack for DFS)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Quick Start
1. **Load an Example**: Select from 5 pre-loaded graphs (Simple DAG, Course Prerequisites, Build Dependencies, Linear Chain, or Cyclic Graph)
   - OR click **"Generate Random DAG"** to create a random graph
2. Select an algorithm (Kahn's or DFS)
3. Click **"Play"** to watch the visualization
4. Use **"Back"** and **"Next"** buttons to control steps manually
5. Adjust speed with the slider
6. Watch the **Queue/Stack visualization** and **Execution Log** on the right

## 🎮 Controls & Usage

### Graph Building
- **Add Node**: Click the "Add Node" button
- **Add Edge**: Drag from a node's handle to another node
- **Move Node**: Click and drag nodes around the canvas
- **Delete**: Select a node/edge and press Delete key

### Algorithm Controls
- **Play/Pause**: Start or pause the animation
- **Back Button**: Step backward to review previous steps
- **Next Button**: Advance one step forward manually
- **Reset**: Clear animation and return to initial state
- **Speed Slider**: Adjust animation speed (0.5x to 3x)

### Additional Features
- **Example Graphs**: Load from 5 pre-defined graphs
- **Generate Random DAG**: Create a random valid graph
- **Export**: Save your graph as JSON
- **Import**: Load a saved graph
- **Help**: View detailed instructions

## 📚 Algorithm Explanations

### Kahn's Algorithm (BFS)
1. Find all nodes with in-degree = 0
2. Add them to a queue
3. Process nodes from queue one by one
4. Decrease in-degree of neighbors
5. Add newly zero in-degree nodes to queue
6. Repeat until all nodes processed
7. If not all nodes processed → cycle detected!

### DFS-based Topological Sort
1. Start DFS from unvisited nodes
2. Explore all neighbors recursively
3. After exploring a node, push to stack
4. Reverse stack for topological order
5. Detect cycles using recursion stack

## 🎨 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Flow** - Graph visualization
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Modern styling
- **Lucide Icons** - Beautiful icons

## 🏗️ Project Structure

```
topovis/
├── src/
│   ├── algorithms/
│   │   ├── kahn.ts          # Kahn's algorithm implementation
│   │   └── dfs.ts           # DFS-based algorithm
│   ├── components/
│   │   ├── CustomNode.tsx   # Node component
│   │   ├── ControlPanel.tsx # Control buttons & settings
│   │   ├── LogPanel.tsx     # Enhanced execution log
│   │   ├── DataStructurePanel.tsx  # Queue/Stack visualization
│   │   ├── AlgorithmInfo.tsx       # Complexity information
│   │   ├── HelpModal.tsx    # Help & instructions
│   │   └── TopologicalOrderDisplay.tsx
│   ├── utils/
│   │   ├── graphUtils.ts    # Graph utilities
│   │   └── exampleGraphs.ts # Pre-loaded example graphs
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Main application
│   └── main.tsx             # Entry point
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## 🎓 Educational Use

This visualizer is perfect for:
- **Computer Science students** learning graph algorithms
- **Educators** teaching data structures and algorithms
- **Self-learners** exploring topological sorting
- **College labs** demonstrating algorithm concepts
- **Interview preparation** understanding algorithm flow

## 🌟 Key Highlights

✅ **Production-ready** - Clean, modular code  
✅ **Fully typed** - TypeScript for reliability  
✅ **Responsive design** - Works on all screen sizes  
✅ **Modern UI** - Beautiful dark theme with animations  
✅ **Educational focus** - Clear explanations and visual feedback  
✅ **Interactive** - Hands-on learning experience  

## 📝 License

MIT License - Feel free to use for educational purposes!

## 🙏 Acknowledgments

Built with modern web technologies to make graph algorithms accessible and fun to learn!

---

**Made with ❤️ for students and educators**

*TopoVis - Making Topological Sorting Visual and Interactive*
