
document.getElementById('order-btn').addEventListener('click', () => {
    const selectedItems = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(checkbox => checkbox.value);
    if (selectedItems.length === 0) {
      alert('Please select at least one item.');
      return;
    }

    
    document.getElementById('click-sound').play();

    
    document.getElementById('loading-message').style.display = 'block';

 
    const orderPromises = selectedItems.map(item => new Promise(resolve => {
      setTimeout(() => resolve(item), Math.random() * 5000);
    }));


    Promise.all(orderPromises).then(readyItems => {
      document.getElementById('loading-message').style.display = 'none';

      const orderId = `ORD-${new Date().getDate()}${new Date().getMonth()}-${Math.floor(Math.random() * 1000)}`;
      document.getElementById('order-id').textContent = `Order ID: ${orderId}`;
      
      const foodImagesDiv = document.getElementById('food-images');
      foodImagesDiv.innerHTML = ''; 
      readyItems.forEach(item => {
        const img = document.createElement('img');
        img.src = `images/${item.toLowerCase()}.jpg`; 
        img.alt = item;
        foodImagesDiv.appendChild(img);
      });

    
      document.getElementById('complete-sound').play();

     
      document.getElementById('feedback').style.display = 'block';
    });
  });

  function submitFeedback(feedback) {
    alert(`Thank you for your feedback: ${feedback}`);
    document.getElementById('feedback').style.display = 'none'; 
  }