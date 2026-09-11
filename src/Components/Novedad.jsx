import React from "react";
import PropTypes from "prop-types";

const Novedad = ({ title, description, imageUrl, date, link }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-105 transition"
          />
        </div>
      )}
      <div className="p-4 flex flex-col space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-gray-600">{description}</p>
        {link && (
          <a
            className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver más →
          </a>
        )}
      </div>
    </article>
  );
};

Novedad.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  date: PropTypes.string,
  link: PropTypes.string,
};

Novedad.defaultProps = {
  description: "",
  imageUrl: "",
  date: "",
  link: "",
};

export default Novedad;
