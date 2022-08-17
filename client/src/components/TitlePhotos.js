import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function TitlePhotos() {

  const images = [
    "../images/image1.JPG",
    "../images/image2.JPG",
    "../images/image3.JPG",
    "../images/image4.JPG",
    "../images/image5.JPG",
    "../images/image6.JPG",
    "../images/image7.JPG",
    "../images/image8.JPG",
    "../images/image9.jpg",
    "../images/image10.jpg",
    "../images/image11.jpg",
    "../images/image12.jpg",
    "../images/image13.jpg",
    "../images/image15.jpg",
    "../images/image16.jpg"
  ]

  const responsive = {
    desktop: {
      breakpoint: { max: 5000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
            {images.map(image => {
            return <img className="carousel-image" src={image} alt="title" />
        })}
            </Carousel>


        </>
  )
}

export default TitlePhotos