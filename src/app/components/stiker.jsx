// "use client";

import React from 'react';

const Stiker = async() => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products")
    const data = await res.json()
    const Headlines = data.nameBn
    return (
        <div>
            
        </div>
    );
};

export default Stiker;