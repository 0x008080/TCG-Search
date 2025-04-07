import '../gallery.css'

interface ImageGalleryProps {
    imageUrls: string[];
}

const Gallery: React.FC<ImageGalleryProps> = ({ imageUrls }) => {
    if(imageUrls == undefined) {
        console.log('not yet')
        return;
    }

    return (
        <div className="image-gallery">
            {imageUrls.length > 0 ? (
                imageUrls.map((url, index) => (
                    <div key={index} className="image-container">
                        <img
                            src={url}
                            alt={`Search result ${index}`}
                            className="gallery-image"
                            loading="lazy" // Optional: lazy loading
                        />
                    </div>
                ))
            ) : (
                <p className="empty-message">No images found</p>
            )}
        </div>
    );
};

export default Gallery;