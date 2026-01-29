// Configuration: list of month files to load
const monthFiles = [
    'months/6-months.json',
    'months/12-months.json',
    'months/18-months.json',
    'months/2-years.json',
    'months/2-5-years.json',
    'months/3-years.json'
];

// Function to load a single month file
async function loadMonth(filepath) {
    try {
        const response = await fetch(filepath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filepath}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error loading month from ${filepath}:`, error);
        return null;
    }
}

// Function to create HTML for a month
function createMonthHTML(month, index) {
    const sectionsHTML = month.sections.map(section => `
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
        <div class="month" data-index="${index}">
            <div class="month-marker">${month.marker}</div>
            <div class="month-content">
                <div class="month-header">
                    <div class="month-age">${month.age}</div>
                    <div class="toggle-icon">▼</div>
                </div>
                <div class="month-details">
                    ${sectionsHTML}
                </div>
            </div>
        </div>
    `;
}

// Function to load and render all months
async function loadAllmonths() {
    const monthsWrapper = document.getElementById('months-wrapper');
    
    // Show loading state
    monthsWrapper.innerHTML = '<p style="text-align: center; padding: 40px;">Loading months...</p>';
    
    try {
        // Load all month files in parallel
        const monthPromises = monthFiles.map(file => loadMonth(file));
        const months = await Promise.all(monthPromises);
        
        // Filter out any failed loads
        const validmonths = months.filter(m => m !== null);
        
        if (validmonths.length === 0) {
            monthsWrapper.innerHTML = '<p style="text-align: center; padding: 40px; color: red;">Failed to load months. Please check console for errors.</p>';
            return;
        }
        
        // Generate HTML for all months
        const monthsHTML = validmonths.map((month, index) => createMonthHTML(month, index)).join('');
        
        // Insert into DOM
        monthsWrapper.innerHTML = monthsHTML;

        // Add click event listeners to toggle months
        addToggleListeners();
        
    } catch (error) {
        console.error('Error loading months:', error);
        monthsWrapper.innerHTML = '<p style="text-align: center; padding: 40px; color: red;">An error occurred while loading months.</p>';
    }
}

// Function to add toggle functionality to months
function addToggleListeners() {
    const months = document.querySelectorAll('.month-content');
    
    months.forEach(month => {
        const header = month.querySelector('.month-header');
        const details = month.querySelector('.month-details');
        const toggleIcon = month.querySelector('.toggle-icon');
        
        header.addEventListener('click', () => {
            const isOpen = details.classList.contains('open');
            
            if (isOpen) {
                // Close
                details.classList.remove('open');
                toggleIcon.textContent = '▼';
                month.classList.remove('expanded');
            } else {
                // Open
                details.classList.add('open');
                toggleIcon.textContent = '▲';
                month.classList.add('expanded');
            }
        });
        
        // Make header look clickable
        header.style.cursor = 'pointer';
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllmonths);
} else {
    loadAllmonths();
}
