
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user", error));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }
 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
      </div>
    </div>
  );
}

export default UserDetail;
