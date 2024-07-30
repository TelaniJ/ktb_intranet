console.log("JavaScript is running");

// Slideshow code
let slideIndex = 0;
console.log("Initializing slideshow");

document.addEventListener('DOMContentLoaded', () => {
    showSlides();

    // Fetch and display employee data
    fetch('employees.json') // Adjust the path if your JSON file is in a different directory
        .then(response => response.json())
        .then(data => {
            employeesData = data; // Store the fetched data in the global variable
            displayEmployees(employeesData); // Display the employees
        })
        .catch(error => console.error('Error fetching data:', error));
});

function showSlides() {
    console.log("showSlides function called");
    let i;
    let slides = document.getElementsByClassName("mySlides");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";  
    }

    console.log("Showing slide " + slideIndex);
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Employee directory code
let employeesData = [];

function displayEmployees(employees) {
    const directory = document.getElementById('employeeDirectory');
    directory.innerHTML = ''; // Clear existing content

    employees.forEach(employee => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.setAttribute('data-department', employee.department);

        card.innerHTML = `
            <h3>${employee.name}</h3>
            <p>${employee.position}</p>
            <p>${employee.department}</p>
        `;

        directory.appendChild(card);
    });

    console.log('Employees displayed:', employees);
}

function filterEmployees() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const departmentFilter = document.getElementById('departmentFilter').value;
    const directory = document.getElementById('employeeDirectory');

    directory.innerHTML = ''; // Clear existing content

    employeesData.forEach(employee => {
        const name = employee.name.toLowerCase();
        const department = employee.department;

        if (
            (name.includes(searchInput) || searchInput === '') &&
            (department === departmentFilter || departmentFilter === '')
        ) {
            const card = document.createElement('div');
            card.className = 'employee-card';
            card.setAttribute('data-department', department);

            card.innerHTML = `
                <h3>${employee.name}</h3>
                <p>${employee.position}</p>
                <p>${department}</p>
            `;

            directory.appendChild(card);
        }
    });

    console.log('Employees filtered:', employeesData);
}

function performSearch() {
    const query = document.getElementById('search-bar').value;
    fetch(`/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('search-results');
            resultsDiv.innerHTML = '';
            data.results.forEach(item => {
                const p = document.createElement('p');
                p.textContent = item;
                resultsDiv.appendChild(p);
            });
        })
        .catch(error => console.error('Error:', error));
}

    
/*creating button click show hide navbar*/
var togglebtn=document.querySelector(".togglebtn");
var nav=document.querySelector(".navlinks");
var links=document.querySelector(".navlinks li");

    togglebtn.addEventListener("clickc", function(){
        this.classList.toggle("click");
        nav.classList.toggle("open");
    })

    var typed=new Typed(".input",{
        strings:["Fullstack Developer", "UX Designer","Web Developer"],
        typedSpeed:70,
        backSpeed:55,
        loop:true
    })
   


/*Events*/

const events = [
    { date: '2024-06-15', title: 'Wildlife Conservation Seminar', location: 'Nairobi National Park', description: 'Join us for a seminar on the latest wildlife conservation efforts in Kenya.' },
    { date: '2024-06-22', title: 'Cultural Festival', location: 'Mombasa Beach', description: 'Experience the rich cultural heritage of Kenya with music, dance, and food.' },
    { date: '2024-06-29', title: 'Tourism Awards Night', location: 'Nairobi Hilton Hotel', description: 'Celebrate the achievements in the tourism industry with an awards ceremony.' },
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYear = document.getElementById('month-year');
    
    calendarGrid.innerHTML = '';
    monthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += '<div></div>';
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const event = events.find(event => event.date === dayString);
        
        if (event) {
            calendarGrid.innerHTML += `<div class="event-day" data-date="${dayString}">${day}</div>`;
        } else {
            calendarGrid.innerHTML += `<div>${day}</div>`;
        }
    }
}

function showEventModal(event) {
    const date = event.target.getAttribute('data-date');
    const eventData = events.find(event => event.date === date);
    
    if (eventData) {
        document.getElementById('event-title').textContent = eventData.title;
        document.getElementById('event-date').textContent = `Date: ${eventData.date}`;
        document.getElementById('event-location').textContent = `Location: ${eventData.location}`;
        document.getElementById('event-description').textContent = eventData.description;
        document.getElementById('event-modal').style.display = 'flex';
    }
}

function closeEventModal() {
    document.getElementById('event-modal').style.display = 'none';
}

document.getElementById('prev-month').addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById('calendar-grid').addEventListener('click', showEventModal);
document.getElementById('close-modal').addEventListener('click', closeEventModal);

generateCalendar(currentMonth, currentYear);
