import React, { useState } from "react";
import { Link } from "react-router-dom";

const CategoriesSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    "Software Development",
    "AI",
    "Nature",
    "AI",
    "ML",
    "Software Development",
    "Nature",
    "Data Science",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "Internet of Things",
    "Augmented Reality",
    "Virtual Reality",
    "Robotics",
    "Automation",
    "DevOps",
    "User Experience",
    "Frontend Development",
    "Backend Development",
    "Mobile Development",
    "Game Development",
    "Web Development",
    "Software Engineering",
    "Machine Vision",
    "Natural Language Processing",
    "Computer Vision",
    "Ethical Hacking",
    "Digital Marketing",
    "E-commerce",
    "Content Management",
    "Database Management",
    "Data Analysis",
    "Quantum Computing",
    "Networking",
    "Information Technology",
    "Open Source",
    "Agile Methodology",
    "Scrum",
    "Artificial Neural Networks",
    "Deep Learning",
    "Predictive Analytics",
    "Business Intelligence",
    "Big Data",
    "Smart Cities",
    "5G Technology",
    "Remote Sensing",
    "Renewable Energy",
    "Environmental Science",
    "Biotechnology",

  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>All Categories</h2>
        <button style={styles.closeButton}>
          <Link to="/" style={{
            color:"white",
            textDecoration:"none"
          }}>✖</Link>
        </button>
      </div>
      <input
        type="text"
        placeholder="Search in Categories..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
      <div style={styles.categoriesContainer}>
        {filteredCategories.map((category, index) => (
          <span
            key={index}
            style={styles.category}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}
      </div>

      {selectedCategory && (
        <div style={styles.detailsContainer}>
          <h2 style={styles.modalTitle}>{selectedCategory}</h2>
          <p style={styles.modalDescription}>
            This is the detailed view of {selectedCategory}.
          </p>
          <button
            style={styles.modalCloseButton}
            onClick={() => setSelectedCategory(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px",
    borderRadius: "8px",
    height: "100vh", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  closeButton: {
    fontSize: "24px",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "20px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    margin: "20px 0",
  },
  categoriesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },
  category: {
    padding: "10px 20px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    borderRadius: "20px",
    fontSize: "14px",
    cursor: "pointer",
  },
  detailsContainer: {
    backgroundColor: "#444",
    color: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    marginTop: "20px",
  },
  modalTitle: {
    fontSize: "24px",
    margin: "0 0 10px",
  },
  modalDescription: {
    fontSize: "16px",
    margin: "20px 0",
  },
  modalCloseButton: {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CategoriesSearch;
