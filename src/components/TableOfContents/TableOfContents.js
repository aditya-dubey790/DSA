import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TableOfContents.module.css';  // Importing the CSS Module

// Define the topics that will appear in the table of contents
const topics = [
  { name: 'LINKED LIST', path: '/linked-list' },
  { name: 'STACK', path: '/stack' },
  { name: 'QUEUE', path: '/queue' },
  { name: 'SORTING ALGORITHMS', path: '/sorting-visualizer' },
  { name: 'N-QUEENS ALGORITHM ', path: '/Nqueen' },
  { name: 'CONVEX HULL ', path: '/Convexhull' },
  { name: 'TOWER OF HANOI', path: '/TOH' },
  { name: 'BINARY SEARCH TREE', path: '/bst' },
];

const TableOfContents = () => {
  const navigate = useNavigate();

  // Logout function to clear any authentication data and navigate to the login page
  const logout = () => {
    // Clear any authentication data (e.g., localStorage or context)
    localStorage.removeItem('authToken'); // Example: remove auth token from localStorage

    // Redirect to login page
    navigate('/login');  // Ensure it matches the route defined in App.js
  };

  return (
    <div className={styles['toc-container']}>
      <h1 className={styles['toc-title']}>📘 Data Structures & Algorithms</h1>
      <p className={styles['toc-subtitle']}>
        Data structures define how data is stored, while algorithms define how operations are performed on that data.
      </p>

      {/* Logout Button */}
      <button className={styles['logout-button']} onClick={logout}>
        Logout
      </button>

      {/* Topics Grid */}
      <div className={styles['toc-grid']}>
        {topics.map((topic, index) => (
          <div
            key={index}
            className={`${styles['toc-card']} ${styles['animate-fade-up']}`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate(topic.path)}
          >
            <h2>{topic.name}</h2>
            <p>Learn about {topic.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOfContents;
