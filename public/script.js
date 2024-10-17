document.addEventListener('DOMContentLoaded', () => {
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
});
