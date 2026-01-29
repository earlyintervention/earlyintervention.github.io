// Configuration: list of milestone files to load
const milestoneFiles = [
    'milestones/6-months.json',
    'milestones/12-months.json',
    'milestones/18-months.json',
    'milestones/2-years.json',
    'milestones/2-5-years.json',
    'milestones/3-years.json'
];

// Function to load a single milestone file
async function loadMilestone(filepath) {
    try {
        const response = await fetch(filepath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filepath}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error loading milestone from ${filepath}:`, error);
        return null;
    }
}

// Function to create HTML for a milestone
function createMilestoneHTML(milestone) {
    const sectionsHTML = milestone.sections.map(section => `
        <div class="section">
            <h3 class="section-title">
                <span class="section-icon">${section.icon}</span>
                ${section.title}
            </h3>
            <div class="section-content">
                <ul>
                    ${section.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    return `
        <div class="milestone">
            <div class="milestone-marker">${milestone.marker}</div>
            <div class="milestone-content">
                <div class="milestone-age">${milestone.age}</div>
                ${sectionsHTML}
            </div>
        </div>
    `;
}

// Function to load and render all milestones
async function loadAllMilestones() {
    const milestonesWrapper = document.getElementById('milestones-wrapper');
    
    // Show loading state
    milestonesWrapper.innerHTML = '<p style="text-align: center; padding: 40px;">Loading milestones...</p>';
    
    try {
        // Load all milestone files in parallel
        const milestonePromises = milestoneFiles.map(file => loadMilestone(file));
        const milestones = await Promise.all(milestonePromises);
        
        // Filter out any failed loads
        const validMilestones = milestones.filter(m => m !== null);
        
        if (validMilestones.length === 0) {
            milestonesWrapper.innerHTML = '<p style="text-align: center; padding: 40px; color: red;">Failed to load milestones. Please check console for errors.</p>';
            return;
        }
        
        // Generate HTML for all milestones
        const milestonesHTML = validMilestones.map(milestone => createMilestoneHTML(milestone)).join('');
        
        // Insert into DOM
        milestonesWrapper.innerHTML = milestonesHTML;
        
    } catch (error) {
        console.error('Error loading milestones:', error);
        milestonesWrapper.innerHTML = '<p style="text-align: center; padding: 40px; color: red;">An error occurred while loading milestones.</p>';
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllMilestones);
} else {
    loadAllMilestones();
}
