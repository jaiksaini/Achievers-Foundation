import React, { useEffect, useState } from "react";
import { useProjectAndCategoryStore } from "../store/useProjectandCategoryStore";

const BACKEND_URL = `http://localhost:8000`

const Projects = () => {

  
  const {
    projects,
    categories,
    getProjects,
    getCategories,
    isFetching,
  } = useProjectAndCategoryStore();

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load projects & categories on mount
  useEffect(() => {
    getProjects();
    getCategories();
  }, [getProjects, getCategories]);

  // console.log(projects);
  

  // Filter projects by selected category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => {
          const catName =
            categories.find((c) => c.id === p.categoryId)?.name || "Uncategorized";
          return catName === selectedCategory;
        });

  return (
    
    <div className="container mx-auto px-6 pt-6 pb-12">
      <h2 className="text-4xl font-bold text-center mb-6">Our Projects</h2>

      {/* Category Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-5 py-2 rounded-full font-medium transition ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              selectedCategory === cat.name
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Projects List */}
      {isFetching ? (
        <p className="text-center text-gray-500">Loading projects...</p>
      ) : filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} categories={categories} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No projects available in this category.
        </p>
      )}
    </div>
  );
};

const ProjectCard = ({ project, categories }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryName =
    categories.find((c) => c.id === project.categoryId)?.name || "Uncategorized";

  const shortText =
    project.description?.length > 160
      ? project.description.slice(0, 160) + "..."
      : project.description;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition duration-300">
      {/* Project Image */}
      <img
        src={`${BACKEND_URL}${project.image}`}
        alt={project.name}
        className="w-full h-64 object-cover"
      />

      {/* Project Info */}
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{categoryName}</p>

        <p className="text-gray-600 text-base leading-relaxed mb-4">
          {isExpanded ? project.description : shortText}
        </p>

        {project.description?.length > 160 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:underline mb-6"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}

        {project.link && (
          <div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Visit Project →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
