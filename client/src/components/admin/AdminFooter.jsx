const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm">
          © {new Date().getFullYear()} Your Admin Panel. All rights reserved.
        </p>
        <a
          href="/privacy-policy"
          className="text-sm text-blue-300 hover:underline"
        >
          Privacy Policy
        </a>
        <a
          href="/terms-of-service"
          className="text-sm text-blue-300 hover:underline"
        >
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
