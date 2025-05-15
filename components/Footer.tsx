export default function Footer() {
  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0F0F0F] to-black" />
      <div className="absolute inset-0 bg-[url('/bnb-pattern.png')] opacity-5" />
      <div className="relative z-10 w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img 
              src="https://i.pinimg.com/736x/b8/a8/b3/b8a8b3b41503ceecb123f7848acbb023.jpg" 
              className="h-14  bg-transparent " 
              alt="Inherify Logo" 
            />
            <span className="self-center text-2xl font-bold bg-gradient-to-r from-[#F3BA2F] via-white to-[#F3BA2F] bg-clip-text text-transparent">
            Legacy Onchain
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
            <li>
              <a href="#" className="hover:text-[#F3BA2F] transition-colors me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F3BA2F] transition-colors me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F3BA2F] transition-colors me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F3BA2F] transition-colors">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-[#F3BA2F]/20 sm:mx-auto lg:my-8" />
        <div className="flex flex-col items-center justify-center space-y-4">
          <span className="block text-sm text-gray-400 text-center">
            © 2025 <a href="#" className="text-[#F3BA2F] hover:underline">Legacy Onchain™</a>. All Rights Reserved.
          </span>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Powered by</span>
            <img 
              src="https://cryptologos.cc/logos/bnb-bnb-logo.png" 
              alt="BNB Chain" 
              className="h-6 w-6"
            />
            <span className="text-sm text-[#F3BA2F] font-medium">BNB Chain</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

