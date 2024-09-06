import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const email = "sidi3430s@gmail.com";
  const linkedInUrl = "https://www.linkedin.com/in/sidi-chaikh-360450219/";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <footer className=" bg-[#121212] text-white py-4 ">
      <div className="flex justify-around gap-10 mx-auto text-center">
        <div className="mb-2 flex items-center justify-center">
          <span> {email} </span>
          <button
            onClick={copyToClipboard}
            className="ml-2 px-2 py-1 bg-[#222] rounded hover:bg-[#0c0c0c]"
          >
            <FontAwesomeIcon icon={copied ? faCheck : faClipboard} />
          </button>
        </div>
        <div>
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" className="w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
