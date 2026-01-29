# About us  
This website is written by a parent who has been on the ASD early intervention journey.  

This website aims to provide advice that:  

+ Is short and simple (for time-poor parents)  
+ Prioritises evidence-based findings  
+ Considers the diverse spectrum of ASD.   

> [!IMPORTANT] 
> This website should not be replaced by medical guidance through a Paediatrician or GP (who can refer to a Paediatrician).   

# Website file structure

```
├── index.html              # Main HTML file
├── styles.css              # All styling
├── app.js                  # JavaScript that loads and renders milestones
├── milestones/             # Directory containing milestone data
│   ├── 6-months.json
│   ├── 12-months.json
│   ├── 18-months.json
│   ├── 2-years.json
│   ├── 2-5-years.json
│   └── 3-years.json
└── README.md               # This file
```

## How It Works

### 1. **index.html**
- Main HTML structure
- Links to `styles.css` for styling
- Links to `app.js` for functionality
- Contains empty container `#milestones-wrapper` where milestones are dynamically loaded

### 2. **styles.css**
- All CSS styles for the timeline
- Responsive design
- Animations and transitions
- Color scheme and typography

### 3. **app.js**
- Loads milestone JSON files asynchronously
- Creates HTML elements dynamically
- Renders milestones into the DOM
- Handles errors gracefully

### 4. **milestones/*.json**
- Each milestone is a separate JSON file
- Easy to add, edit, or remove milestones
- Structured data format

## JSON Milestone Structure

Each milestone JSON file follows this structure:

```json
{
    "marker": "6M",              // Short label for timeline marker
    "age": "6 Months",           // Full age display
    "sections": [                // Array of sections
        {
            "icon": "👀",        // Emoji icon
            "title": "What to Look For",
            "items": [           // Array of bullet points
                "Item 1",
                "Item 2"
            ]
        }
    ]
}
```

## Adding a New Milestone

1. Create a new JSON file in the `milestones/` directory (e.g., `4-years.json`)
2. Follow the JSON structure above
3. Add the filename to the `milestoneFiles` array in `app.js`:

```javascript
const milestoneFiles = [
    'milestones/6-months.json',
    'milestones/12-months.json',
    'milestones/18-months.json',
    'milestones/2-years.json',
    'milestones/2-5-years.json',
    'milestones/3-years.json',
    'milestones/4-years.json'  // Add your new file here
];
```

## Editing a Milestone

Simply edit the corresponding JSON file in the `milestones/` directory. Changes will be reflected when you refresh the page.
