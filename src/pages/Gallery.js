import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaExpand, FaImages, FaTimes } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { galleryCollections } from "../data/galleryImages";

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);

  const totalPhotos = useMemo(
    () => galleryCollections.reduce((sum, collection) => sum + collection.images.length, 0),
    []
  );

  const activeCollection = lightbox ? galleryCollections[lightbox.collectionIndex] : null;
  const activeImage = activeCollection ? activeCollection.images[lightbox.imageIndex] : null;

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const showRelative = useCallback((delta) => {
    setLightbox((current) => {
      if (!current) return current;
      const collection = galleryCollections[current.collectionIndex];
      const nextIndex = (current.imageIndex + delta + collection.images.length) % collection.images.length;
      return { ...current, imageIndex: nextIndex };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showRelative(1);
      if (event.key === "ArrowLeft") showRelative(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, showRelative]);

  return (
    <div>
      <Navbar />
      <main className="gallery-page">
        <section className="gallery-hero">
          <motion.div
            className="gallery-hero-content"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="section-eyebrow">Moments We Cherish</p>
            <h1>Community Gallery</h1>
            <p>
              A living album of our festivals, aarattus, and gatherings. Every event we celebrate together adds a
              new chapter here.
            </p>
          </motion.div>

          {galleryCollections.length > 0 && (
            <motion.div
              className="gallery-hero-panel"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.65, ease: "easeOut" }}
            >
              <div>
                <span>{galleryCollections.length}</span>
                <p>Event{galleryCollections.length === 1 ? "" : "s"} captured so far</p>
              </div>
              <div>
                <span>{totalPhotos}</span>
                <p>Photos preserved in the archive</p>
              </div>
            </motion.div>
          )}
        </section>

        {galleryCollections.length === 0 ? (
          <section className="gallery-empty">
            <FaImages />
            <h2>New memories are on the way</h2>
            <p>Photos from upcoming events will appear here automatically once they are added.</p>
          </section>
        ) : (
          galleryCollections.map((collection, collectionIndex) => (
            <section className="gallery-collection" key={collection.code}>
              <div className="section-container">
                <motion.div
                  className="gallery-collection-header"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <p className="section-eyebrow">{collection.subtitle}</p>
                  <h2 className="gallery-collection-title">{collection.title}</h2>
                  <span className="gallery-collection-count">
                    {collection.images.length} photo{collection.images.length === 1 ? "" : "s"}
                  </span>
                </motion.div>

                <div className="gallery-grid">
                  {collection.images.map((image, imageIndex) => (
                    <motion.button
                      type="button"
                      className="gallery-photo"
                      key={image.fileName}
                      onClick={() => setLightbox({ collectionIndex, imageIndex })}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ delay: (imageIndex % 6) * 0.05, duration: 0.45 }}
                    >
                      <img src={image.src} alt={`${collection.title} - photo ${imageIndex + 1}`} loading="lazy" />
                      <span className="gallery-photo-overlay">
                        <FaExpand />
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>
          ))
        )}
      </main>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button type="button" className="gallery-lightbox-close" onClick={closeLightbox} aria-label="Close">
              <FaTimes />
            </button>

            {activeCollection.images.length > 1 && (
              <>
                <button
                  type="button"
                  className="gallery-lightbox-nav gallery-lightbox-prev"
                  onClick={(event) => {
                    event.stopPropagation();
                    showRelative(-1);
                  }}
                  aria-label="Previous photo"
                >
                  <FaChevronLeft />
                </button>
                <button
                  type="button"
                  className="gallery-lightbox-nav gallery-lightbox-next"
                  onClick={(event) => {
                    event.stopPropagation();
                    showRelative(1);
                  }}
                  aria-label="Next photo"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            <motion.figure
              className="gallery-lightbox-figure"
              key={activeImage.fileName}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <img src={activeImage.src} alt={`${activeCollection.title} - photo ${lightbox.imageIndex + 1}`} />
              <figcaption>
                <strong>{activeCollection.title}</strong>
                <span>
                  {lightbox.imageIndex + 1} / {activeCollection.images.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
