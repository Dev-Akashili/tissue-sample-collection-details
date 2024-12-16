export const Footer = () => {
  return (
    <footer className="h-20 flex items-center justify-center">
      <div className="text-xs md:text-sm font-semibold text-center flex flex-col md:flex-row space-y-1 md:space-y-0 space-x-0 md:space-x-1">
        <p>Digital Research Service developer assessment for RSE role</p>{" "}
        <p className="hidden md:inline-block">-</p>
        <p>Emeka Akashili ({new Date().getFullYear()})</p>
      </div>
    </footer>
  );
};

export default Footer;
