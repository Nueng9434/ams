export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">AMS - Apartment Management System</h3>
            <p className="text-gray-300 text-sm mt-1">
              The complete solution for managing your apartment complex
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-gray-300">
              &copy; {currentYear} AMS System. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
