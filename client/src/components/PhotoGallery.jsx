import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const galleries = () => {
    fetch("http://localhost:5000/api/galleries")
      .then((response) => response.json())
      .then((data) => {
        setImages(data); // Assuming data is an array of image objects
        // Process the photo data
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });
  };

  const handleImageClick = (image) => {
    setActiveImage(image);
    setShowModal(true);
  };

  useEffect(() => {
    galleries();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setActiveImage(null);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-gradient">📸 Captured Moments</h2>
        <p className="text-muted">
          Snapshots of laughter, hustle, and pure team energy.
        </p>
      </div>

      <div className="row justify-content-center">
        {images.map((image) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={image.id}>
            <div
              className="card shadow border-0 position-relative overflow-hidden"
              style={{ cursor: "pointer" }}
              onClick={() => handleImageClick(image.image)}
            >
              <img
                src={image.image}
                alt=""
                className="img-fluid"
                style={{
                  objectFit: "cover",
                  height: "250px",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.08)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <div className="card-img-overlay d-flex align-items-end bg-dark bg-opacity-50">
                {/* <h6 className="text-white m-0 fw-semibold">{image.alt}</h6> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="border-0">
          <h5 className="m-0">{activeImage?.alt}</h5>
        </Modal.Header>
        <Modal.Body className="text-center bg-light">
          {activeImage && (
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "75vh" }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PhotoGallery;
