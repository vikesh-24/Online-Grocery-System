import React, { useState, useEffect } from 'react'; // Importing necessary modules from React
import axios from 'axios'; // Importing Axios for HTTP requests
import './pages/styles.css'; // Importing CSS styles
import logo from './logo192.png'; // Importing logo image
import product from './product'; // Importing product component (if exists)
import Image from '../src/pages/download.jpg'

const ProductView = () => { // Declaring ProductView functional component
    // State variables using useState hook
    const [products, setProducts] = useState([]); // State for storing products
    const [newProduct, setNewProduct] = useState({ name: '', category: '', hours: '',date:'' }); // State for new product form
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [error, setError] = useState(''); // State for error messages
    const [updateId, setUpdateId] = useState(null); // State to hold the ID of the product to be updated
    
    


    // useEffect hook to fetch products when component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to fetch products from the server
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/product'); // GET request to fetch products
            setProducts(response.data.product); // Update products state with fetched data
        } catch (error) {
            console.error('Error fetching products:', error); // Log error if fetch fails
        }
    };

    // Function to handle creation of a new product
    const handleCreateProduct = async () => {
        // Validation checks for new product fields
        if (!newProduct.name || !newProduct.category || !newProduct.hours || !newProduct.date) {
            setError('Please fill out all fields');
            return;
        }
        if (isNaN(newProduct.hours)) {
            setError('Hours must be a number');
            return;
        }
        try {
            await axios.post('http://localhost:3000/product', newProduct); // POST request to create new product
            setNewProduct({ name: '', category: '', hours: '',date:'' }); // Reset new product form
            setError(''); // Clear error message
            fetchProducts(); // Fetch updated list of products
        } catch (error) {
            console.error('Error creating product:', error); // Log error if creation fails
        }
    };

    // Function to handle updating an existing product
    const handleUpdateProduct = async () => {
        // Validation checks for updated product fields
        if (!newProduct.name || !newProduct.category || !newProduct.hours || !newProduct.date) {
            setError('Please fill out all fields');
            return;
        }
        if (product.date) {
            // Parse the date string into a Date object
            const parts = product.date.split('/');
            const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        
            // Format the Date object into DD/MM/YYYY format
            const formattedDateString = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
        
            console.log(formattedDateString); // Output: 21/4/2024 (formatted date string)
        } else {
            console.log('Date is not available.'); // Handle case where date is not available
        }
        if (isNaN(newProduct.hours)) {
            setError('Hours must be a number');
            return;
        }
        try {
            await axios.put(`http://localhost:3000/product/${updateId}`, newProduct);
            setNewProduct({ name: '', category: '', hours: '',date:'' });
            setError('');
            fetchProducts();
            setUpdateId(null); // Reset update ID after updating
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Function to handle deletion of a product
  
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/product/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Function to handle search term change
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Function to handle click on update button for a product
    const handleUpdateClick = (product) => {
        setNewProduct(product);
        setUpdateId(product._id);
    };

    // Function to handle quantity change for a product
    const handleQuantityChange = (productId, hours) => {
        const updatedProducts = products.map((product) =>
            product._id === productId ? { ...product, quantity: hours } : product
        ); // Map over products and update quantity for the selected product
        setProducts(updatedProducts); // Update products state with updated quantities
    };

    // Filter products based on search term
    const filteredProducts = products.filter((product) =>
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

    // Calculate total quantity of all products
    const totalQuantity = products.reduce((total, product) => total + (parseInt(product.hours) || 0), 0);

    // Calculate total number of products
    const totalProducts = products.length;

    // JSX content to be rendered
    return (
        <div>
            <header className="navbar">
                <nav>
                    <h1>Schedule Management</h1>
                    <img src={Image} alt="Logo" className="logo" /> {/* Add logo here */}
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                    </ul>
                </nav>
            </header>
            <aside className="sidebar">
                <ul>
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Categories</a></li>
                    <li><a href="#">Hours</a></li>
                    <li><a href="#">Users</a></li>
                </ul>
            </aside>
            <div className="container">
                <main>
                    <section className="create-product">
                        <h2>{updateId ? 'Update Product' : 'Create New Form'}</h2>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Category"
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Hours"
                                value={newProduct.hours}
                                onChange={(e) => setNewProduct({ ...newProduct, hours: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Date (DD/MM/YYYY)"
                                value={newProduct.date}
                                onChange={(e) => setNewProduct({ ...newProduct, date: e.target.value })}
                            />
                        </div>
                        <button onClick={updateId ? handleUpdateProduct : handleCreateProduct}>
                            {updateId ? 'Update Product' : 'Add list'}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </section>
                    <section className="search">
                        <h2>Search Name</h2>
                        <input
                            type="text"
                            placeholder="Search by username"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                                    </section>
                                    <section className="product-list">
                    <h2>Form List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Hours</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.hours}</td>
                                    <td>{product.date}</td>
                                    <td>
                                        <button onClick={() => handleUpdateClick(product)}>Update</button>
                                        <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                </main>
            </div>
            <section className="calculation">
                <h2>Calculation</h2>
                <p>Total Hours: {totalQuantity}</p>
                <p>Total Users: {totalProducts}</p>
            </section>
        </div>
    );
};
export default ProductView; // Exporting the ProductView component
