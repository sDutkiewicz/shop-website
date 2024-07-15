document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(productForm);
        const data = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price'))
        };
        
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert('Product added successfully');
                productForm.reset();
            } else {
                alert('Error adding product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding product');
        }
    });
});
