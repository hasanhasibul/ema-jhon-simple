import React from 'react';
const Manage = () => {
    const handleAddInventory = ()=>{
       console.log("inventory click")
}
    return (
        <div>
            <h2>This is order manage</h2>
            <button onClick={handleAddInventory} >Add Inventory</button>
        </div>
    );
};

export default Manage;