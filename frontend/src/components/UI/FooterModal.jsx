import React from "react";

const FooterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl w-96">
        <h2 className="text-xl font-bold text-orange-600 mb-4">
          Connect with Us
        </h2>
        <ul className="space-y-2">
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500"
            >
              Twitter
            </a>
          </li>
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FooterModal;
