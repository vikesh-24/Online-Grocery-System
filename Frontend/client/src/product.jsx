
    import React from 'react';

    const ProductList = ({ products, handleQuantityChange, handleUpdateClick, handleDeleteProduct }) => {
        return (
            <section className="product-list">
                <h2>Product List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.type}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={product.quantity}
                                        onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleUpdateClick(product)}>Update</button>
                                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        );
    };
    
    export default ProductList;
    

