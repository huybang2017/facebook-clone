const ImageGallery = ({ title = "", images = [] }) => {
    const validImages = images.filter((img) => img && img.url); // lọc phần tử undefined hoặc thiếu url

    return (
        <div >
            <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {validImages.map((img, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg overflow-hidden hover:cursor-pointer"
                    >
                        <img
                            src={img.url}
                            alt={img.alt || `Image ${index}`}
                            className="w-full h-48 object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ImageGallery;
