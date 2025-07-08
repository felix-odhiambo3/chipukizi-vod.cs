// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

// Initialize Admin Dashboard
function initializeAdmin() {
    setupSidebarToggle();
    setupNavigation();
    setupCharts();
    setupTableFeatures();
    setupModals();
    setupFormHandling();
    setupContentTabs();
    setupMobileResponsive();
    loadDashboardData();
}

// Sidebar Toggle Functionality
function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    sidebarToggle.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            // Mobile: Show/hide sidebar
            sidebar.classList.toggle('mobile-open');
        } else {
            // Desktop: Collapse/expand
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        }
    });

    // Close mobile sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        }
    });
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all nav items and sections
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item and target section
            this.parentElement.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Load section-specific data
            loadSectionData(targetSection);
            
            // Close mobile sidebar after navigation
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('mobile-open');
            }
        });
    });
}

// Charts Setup
function setupCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue (KSh)',
                    data: [320000, 450000, 380000, 520000, 487000, 590000],
                    borderColor: '#0de00d',
                    backgroundColor: 'rgba(13, 224, 13, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'KSh ' + (value / 1000) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }

    // Project Status Chart
    const projectCtx = document.getElementById('projectChart');
    if (projectCtx) {
        new Chart(projectCtx, {
            type: 'doughnut',
            data: {
                labels: ['Active', 'Completed', 'Pending', 'On Hold'],
                datasets: [{
                    data: [12, 8, 3, 1],
                    backgroundColor: ['#0de00d', '#2c5aa0', '#ffc107', '#dc3545'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Finance Chart
    const financeCtx = document.getElementById('financeChart');
    if (financeCtx) {
        new Chart(financeCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: [320000, 450000, 380000, 520000, 487000, 590000],
                    backgroundColor: '#0de00d'
                }, {
                    label: 'Expenses',
                    data: [180000, 220000, 195000, 280000, 245000, 320000],
                    backgroundColor: '#dc3545'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'KSh ' + (value / 1000) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }

    // Project Performance Chart
    const projectPerfCtx = document.getElementById('projectPerformanceChart');
    if (projectPerfCtx) {
        new Chart(projectPerfCtx, {
            type: 'radar',
            data: {
                labels: ['Quality', 'Timeline', 'Budget', 'Client Satisfaction', 'Team Performance'],
                datasets: [{
                    label: 'Current Quarter',
                    data: [85, 78, 92, 88, 90],
                    borderColor: '#0de00d',
                    backgroundColor: 'rgba(13, 224, 13, 0.2)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // Member Growth Chart
    const memberGrowthCtx = document.getElementById('memberGrowthChart');
    if (memberGrowthCtx) {
        new Chart(memberGrowthCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Members',
                    data: [8, 12, 15, 10, 18, 22],
                    borderColor: '#2c5aa0',
                    backgroundColor: 'rgba(44, 90, 160, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Table Features (Search, Filter, Sort)
function setupTableFeatures() {
    // Project Filter
    const projectFilter = document.getElementById('projectFilter');
    if (projectFilter) {
        projectFilter.addEventListener('change', function() {
            filterProjects(this.value);
        });
    }

    // Project Search
    const projectSearch = document.getElementById('projectSearch');
    if (projectSearch) {
        projectSearch.addEventListener('input', function() {
            searchProjects(this.value);
        });
    }

    // Table sorting
    setupTableSorting();
}

function filterProjects(status) {
    const table = document.getElementById('projectsTable');
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const statusCell = row.querySelector('.status-badge');
        if (!statusCell) return;

        const rowStatus = statusCell.textContent.toLowerCase().trim();
        
        if (status === 'all' || rowStatus === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function searchProjects(searchTerm) {
    const table = document.getElementById('projectsTable');
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    const term = searchTerm.toLowerCase();
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
    });
}

function setupTableSorting() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => sortTable(table, index));
        });
    });
}

function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const sortedRows = rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.trim();
        const bText = b.cells[columnIndex].textContent.trim();
        
        // Check if values are numbers
        const aNum = parseFloat(aText);
        const bNum = parseFloat(bText);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum;
        }
        
        return aText.localeCompare(bText);
    });
    
    // Clear tbody and append sorted rows
    tbody.innerHTML = '';
    sortedRows.forEach(row => tbody.appendChild(row));
}

// Modal Functionality
function setupModals() {
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });

    // Setup form submissions for modals
    setupModalForms();
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form if exists
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

function setupModalForms() {
    // Project Modal Form
    const projectForm = document.querySelector('#projectModal form');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addProject(new FormData(this));
            closeModal('projectModal');
        });
    }

    // Member Modal Form
    const memberForm = document.querySelector('#memberModal form');
    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addMember(new FormData(this));
            closeModal('memberModal');
        });
    }
}

// Form Handling
function setupFormHandling() {
    // Settings forms
    const settingsForms = document.querySelectorAll('.settings-form');
    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings(new FormData(this));
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            globalSearch(this.value);
        });
    }
}

// Content Tabs
function setupContentTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show/hide content based on tab
            loadTabContent(tabName);
        });
    });
}

// Mobile Responsive Features
function setupMobileResponsive() {
    // Handle window resize
    window.addEventListener('resize', function() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (window.innerWidth > 768) {
            sidebar.classList.remove('mobile-open');
            if (sidebar.classList.contains('collapsed')) {
                mainContent.classList.add('expanded');
            } else {
                mainContent.classList.remove('expanded');
            }
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        }
    });

    // Touch gestures for mobile
    setupTouchGestures();
}

function setupTouchGestures() {
    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;

        const diffX = startX - endX;
        const diffY = startY - endY;

        // Horizontal swipe
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
            const sidebar = document.getElementById('sidebar');
            
            if (diffX > 0) {
                // Swipe left - close sidebar
                sidebar.classList.remove('mobile-open');
            } else {
                // Swipe right - open sidebar
                if (window.innerWidth <= 768) {
                    sidebar.classList.add('mobile-open');
                }
            }
        }

        startX = 0;
        startY = 0;
    });
}

// Data Management Functions
function loadDashboardData() {
    // Simulate loading dashboard data
    updateStats();
    loadRecentActivities();
}

function loadSectionData(section) {
    switch(section) {
        case 'projects':
            loadProjectsData();
            break;
        case 'training':
            loadTrainingData();
            break;
        case 'members':
            loadMembersData();
            break;
        case 'finance':
            loadFinanceData();
            break;
        case 'marketing':
            loadMarketingData();
            break;
        case 'content':
            loadContentData();
            break;
        case 'messages':
            loadMessagesData();
            break;
        case 'reports':
            loadReportsData();
            break;
    }
}

function updateStats() {
    // Animate counter numbers
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-info h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on original format
            const originalText = counter.textContent;
            if (originalText.includes('K')) {
                counter.textContent = `KSh ${Math.floor(current / 1000)}K`;
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

function loadRecentActivities() {
    // Update activity timestamps
    const activityTimes = document.querySelectorAll('.activity-time');
    activityTimes.forEach(time => {
        // Update relative time
        updateRelativeTime(time);
    });
}

function updateRelativeTime(element) {
    // Simple relative time update
    const timeText = element.textContent;
    // This would normally connect to a real-time system
}

// CRUD Operations
function addProject(formData) {
    const projectsTable = document.querySelector('#projectsTable tbody');
    if (!projectsTable) return;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${formData.get('projectName') || 'New Project'}</td>
        <td>${formData.get('client') || 'Unknown Client'}</td>
        <td>${formData.get('projectType') || 'General'}</td>
        <td><span class="status-badge pending">Pending</span></td>
        <td>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
            <span>0%</span>
        </td>
        <td>${formData.get('deadline') || 'TBD'}</td>
        <td>
            <button class="btn-icon" onclick="editProject(${Date.now()})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon" onclick="deleteProject(${Date.now()})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    projectsTable.appendChild(newRow);
    showNotification('Project added successfully!', 'success');
}

function editProject(projectId) {
    // Open edit modal with project data
    showNotification('Edit project functionality would be implemented here', 'info');
}

function deleteProject(projectId) {
    if (confirm('Are you sure you want to delete this project?')) {
        // Remove project from table
        const row = event.target.closest('tr');
        if (row) {
            row.remove();
            showNotification('Project deleted successfully!', 'success');
        }
    }
}

function addMember(formData) {
    const membersTable = document.querySelector('#members .data-table tbody');
    if (!membersTable) return;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>
            <div class="member-info">
                <img src="../chairperson.jpg" alt="Member">
                <span>${formData.get('firstName')} ${formData.get('lastName')}</span>
            </div>
        </td>
        <td>${formData.get('email')}</td>
        <td>${formData.get('role') || 'Member'}</td>
        <td>${new Date().toISOString().split('T')[0]}</td>
        <td><span class="status-badge active">Active</span></td>
        <td>
            <button class="btn-icon"><i class="fas fa-edit"></i></button>
            <button class="btn-icon"><i class="fas fa-trash"></i></button>
        </td>
    `;
    
    membersTable.appendChild(newRow);
    showNotification('Member added successfully!', 'success');
}

// Additional Data Loading Functions
function loadProjectsData() {
    // Load projects specific data
    console.log('Loading projects data...');
}

function loadTrainingData() {
    // Load training programs data
    console.log('Loading training data...');
}

function loadMembersData() {
    // Load members data
    console.log('Loading members data...');
}

function loadFinanceData() {
    // Load financial data
    console.log('Loading finance data...');
}

function loadMarketingData() {
    // Load marketing campaigns data
    console.log('Loading marketing data...');
}

function loadContentData() {
    // Load content management data
    console.log('Loading content data...');
}

function loadMessagesData() {
    // Load messages and inquiries
    console.log('Loading messages data...');
}

function loadReportsData() {
    // Load reports and analytics
    console.log('Loading reports data...');
}

function loadTabContent(tabName) {
    // Load content based on selected tab
    console.log('Loading tab content for:', tabName);
}

// Utility Functions
function globalSearch(query) {
    // Implement global search functionality
    console.log('Searching for:', query);
}

function saveSettings(formData) {
    // Save settings
    showNotification('Settings saved successfully!', 'success');
}

function generateReport() {
    // Generate and download report
    showNotification('Report generation started. You will be notified when ready.', 'info');
}

function updateReports() {
    // Update reports based on filters
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    const reportType = document.getElementById('reportType').value;
    
    console.log('Updating reports:', { startDate, endDate, reportType });
    showNotification('Reports updated successfully!', 'success');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#0de00d' : type === 'error' ? '#dc3545' : '#17a2b8',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '5px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: '1200',
        opacity: '0',
        transform: 'translateX(300px)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.editProject = editProject;
window.deleteProject = deleteProject;
window.generateReport = generateReport;
window.updateReports = updateReports;

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdmin);
} else {
    initializeAdmin();
}