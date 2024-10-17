document.addEventListener('DOMContentLoaded', () => {
document.addEventListener('DOMContentLoaded', () => {
        fetchMeatsFromServer();  // Fetch from the server when the page loads
    });
    
    let meats = [
        { id: 1, name: 'Beef', img: 'IMAGES/BEEF BUTCHERY.jpeg' },
        { id: 2, name: 'Chicken', img: 'IMAGES/CHICKEN BUTCHERY.jpg' },
        { id: 3, name: 'Seafood', img: 'IMAGES/SEAFOOD BUTCHERY.jpg' },
        { id: 4, name: 'Lamb', img: 'IMAGES/LAMB BUTCHERY.jpg' },
        { id: 5, name: 'Goat', img: 'IMAGES/GOAT BUTCHERY.jpg' }
    ];

    // Function to render meats
    const renderMeats = (meatsArray) => {
        const meatsSection = document.getElementById('meats');
        meatsSection.innerHTML = ''; // Clear the section
        meatsArray.forEach(meat => {
            const meatDiv = document.createElement('div');
            meatDiv.innerHTML = `
                <h3>${meat.name}</h3>
                <img src="${meat.img}" alt="${meat.name}">
                <button class="edit-btn" data-id="${meat.id}">Edit ${meat.name}</button>
                <button class="delete-btn" data-id="${meat.id}">Delete ${meat.name}</button>
            `;
            meatsSection.appendChild(meatDiv);
        });
    };

    // Initial render
    renderMeats(meats);

    // Delete meat
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const meatId = parseInt(event.target.dataset.id);
            meats = meats.filter(meat => meat.id !== meatId);
            renderMeats(meats);
        }
    });

    // Add meat
    const addMeatForm = document.getElementById('add-meat-form');
    addMeatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const meatName = document.getElementById('meat-name').value;
        const meatImg = document.getElementById('meat-img').value;
        const newMeat = {
            id: meats.length + 1, 
            name: meatName,
            img: meatImg
        };
        meats.push(newMeat);
        renderMeats(meats);
        addMeatForm.reset();
        addMeatForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const meatName = document.getElementById('meat-name').value;
            const meatImg = document.getElementById('meat-img').value;
            const newMeat = {
                id: meats.length + 1, 
                name: meatName,
                img: meatImg
            };
        
            meats.push(newMeat);  // Add to the local meats array
            renderMeats(meats);   // Re-render the meats
            addMeatForm.reset();   // Reset the form
            
            addMeatToServer(newMeat);  // Send the new meat to the server
        });
        
    });

    // Search meat
    const searchMeatInput = document.getElementById('search-meat');
    searchMeatInput.addEventListener('input', () => {
        const query = searchMeatInput.value.toLowerCase();
        const filteredMeats = meats.filter(meat => meat.name.toLowerCase().includes(query));
        renderMeats(filteredMeats);
    });

    // Edit meat
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const meatId = parseInt(event.target.dataset.id);
            const meat = meats.find(m => m.id === meatId);
            const newName = prompt(`Edit name for ${meat.name}:`, meat.name);
            if (newName) {
                meat.name = newName;
                renderMeats(meats);
            }
        }
    });

    // Contact form submission
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const description = document.getElementById('description').value;

        alert(`Order placed!\nEmail: ${email}\nDescription: ${description}`);
        // Reset form
        orderForm.reset();
    });
    // Fetch meats from the server and integrate with existing functionality
const fetchMeatsFromServer = () => {
    fetch('http://localhost:3000/meats')  // Adjust the URL to your server
        .then(response => response.json())
        .then(data => {
            // Assuming 'data' is an array of meats, replace local meats array with fetched meats
            meats = data;  // Update the local meats array
            renderMeats(meats);  // Render the meats using your existing function
        })
        .catch(error => console.error('Error fetching meats:', error));
};

// Example: Call fetchMeatsFromServer to load meats from server after the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchMeatsFromServer();
});

// Optional: Add new meat to the server when it's added locally
const addMeatToServer = (newMeat) => {
    fetch('http://localhost:3000/meats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMeat)
    })
    .then(response => response.json())
    .then(data => {
        meats.push(data);  // Push newly added meat from server
        renderMeats(meats);  // Re-render the meats
    })
    .catch(error => console.error('Error adding meat to server:', error));
};

// Example: Call addMeatToServer inside the existing form submit function

});
