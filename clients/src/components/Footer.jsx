const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="py-1.5 text-white flex items-center justify-center bg-[#111]">
      <p className="text-xs sm:text-sm">{year} @copyright</p>
    </footer>
  );
};

export default Footer;
