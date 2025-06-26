import banner from "../images/header_img.jpg";

const Header = () => {
  return (
    <section className="relative max-container px-10 py-4">
      {/* Banner Image */}
      <div className="w-full h-[500px] overflow-hidden rounded-lg relative">
        <img
          src={banner}
          alt="Tech Banner"
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Overlay Layer */}
        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center px-4">
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center leading-snug drop-shadow-lg">
            Craft your tech blogs and connect them with readers.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Header;
