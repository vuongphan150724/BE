import React, { useState, useEffect } from 'react';

const ProtectedComponent = () => {
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('');

    const fetchProtectedData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3000/protected', {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            });
            const result = await response.json();
            if (response.ok) {
                setData(result);
                setMessage('Dữ liệu đã được truy vấn thành công');
            } else {
                setMessage(result.thongbao || 'Có lỗi xảy ra');
            }
        } catch (error) {
            setMessage('Có lỗi xảy ra khi truy vấn dữ liệu bảo vệ');
        }
    };

    useEffect(() => {
        fetchProtectedData();
    }, []);

    return (
        <div>
            <h1>Protected Data</h1>
            {message && <p>{message}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default ProtectedComponent;
